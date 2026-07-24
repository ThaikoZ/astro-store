<?php
/**
 * Session handoff, JWT one-time codes, return URL.
 *
 * @package CustomHeadlessCheckout
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const CUSTOM_HEADLESS_HANDOFF_TTL = 60;

/**
 * Storefront origin used for post-checkout redirects + REST CORS.
 */
function custom_headless_checkout_app_origin(): string {
	if ( defined( 'CUSTOM_CHECKOUT_APP_ORIGIN' ) && CUSTOM_CHECKOUT_APP_ORIGIN ) {
		return untrailingslashit( (string) CUSTOM_CHECKOUT_APP_ORIGIN );
	}

	if ( defined( 'ASTRO_APP_ORIGIN' ) && ASTRO_APP_ORIGIN ) {
		return untrailingslashit( (string) ASTRO_APP_ORIGIN );
	}

	$option = get_option( 'astro_app_origin', '' );
	if ( is_string( $option ) && $option !== '' ) {
		return untrailingslashit( $option );
	}

	$option = get_option( 'custom_checkout_app_origin', '' );
	if ( is_string( $option ) && $option !== '' ) {
		return untrailingslashit( $option );
	}

	return '';
}

/** @deprecated Legacy alias. */
function astro_headless_checkout_app_origin(): string {
	return custom_headless_checkout_app_origin();
}

/**
 * Redirect to storefront login with a handoff error flag.
 */
function custom_headless_checkout_auth_error_redirect(): void {
	$origin = custom_headless_checkout_app_origin();
	if ( $origin === '' ) {
		return;
	}
	wp_safe_redirect( $origin . '/logowanie/?redirect=checkout&auth_error=handoff' );
	exit;
}

/**
 * Surface a checkout notice when the headless session cannot be loaded.
 */
function custom_headless_checkout_session_miss_notice( string $session_id ): void {
	$message = sprintf(
		/* translators: %s: session id query value */
		__( 'Nie znaleziono sesji koszyka (%s). Wróć do sklepu, dodaj produkt ponownie i spróbuj jeszcze raz.', 'custom-headless-checkout' ),
		$session_id
	);

	if ( function_exists( 'wc_add_notice' ) ) {
		wc_add_notice( $message, 'error' );
	}

	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		error_log( 'custom-headless-checkout: could not locate session ' . $session_id );
	}
}

/**
 * Validate a WPGraphQL JWT and return the WordPress user id, or 0.
 */
function custom_headless_checkout_user_id_from_token( string $token ): int {
	$token = trim( $token );
	if ( $token === '' ) {
		return 0;
	}

	if ( class_exists( '\WPGraphQL\JWT_Authentication\Auth' ) ) {
		$decoded = \WPGraphQL\JWT_Authentication\Auth::validate_token( $token );
		if ( ! is_wp_error( $decoded ) && is_object( $decoded ) && isset( $decoded->data->user->id ) ) {
			return absint( $decoded->data->user->id );
		}
	}

	if ( ! defined( 'GRAPHQL_JWT_AUTH_SECRET_KEY' ) || ! GRAPHQL_JWT_AUTH_SECRET_KEY ) {
		return 0;
	}

	$parts = explode( '.', $token );
	if ( count( $parts ) !== 3 ) {
		return 0;
	}

	list( $header_b64, $payload_b64, $sig_b64 ) = $parts;
	$secret   = (string) GRAPHQL_JWT_AUTH_SECRET_KEY;
	$expected = rtrim( strtr( base64_encode( hash_hmac( 'sha256', $header_b64 . '.' . $payload_b64, $secret, true ) ), '+/', '-_' ), '=' );
	$actual   = rtrim( strtr( $sig_b64, '+/', '-_' ), '=' );
	if ( ! hash_equals( $expected, $actual ) ) {
		return 0;
	}

	$json = base64_decode( strtr( $payload_b64, '-_', '+/' ), true );
	if ( ! is_string( $json ) || $json === '' ) {
		return 0;
	}

	$payload = json_decode( $json, true );
	if ( ! is_array( $payload ) ) {
		return 0;
	}

	if ( isset( $payload['exp'] ) && (int) $payload['exp'] < time() ) {
		return 0;
	}

	if ( isset( $payload['data']['user']['id'] ) ) {
		return absint( $payload['data']['user']['id'] );
	}

	return 0;
}

/**
 * Log the buyer into WordPress from a validated user id.
 */
function custom_headless_checkout_login_user( int $user_id, bool $remember = false ): bool {
	$user = get_user_by( 'id', $user_id );
	if ( ! $user ) {
		return false;
	}

	wp_set_current_user( $user_id );
	wp_set_auth_cookie( $user_id, $remember );

	if ( function_exists( 'WC' ) && WC()->customer ) {
		WC()->customer->set_id( $user_id );
		if ( method_exists( WC()->customer, 'read' ) ) {
			WC()->customer->read();
		}
	}

	return true;
}

/**
 * Whether the session key is already the logged-in customer's Woo session.
 */
function custom_headless_checkout_is_customer_session_key( string $session_id, int $user_id ): bool {
	if ( $user_id <= 0 || $session_id === '' ) {
		return false;
	}

	return (string) $user_id === $session_id
		|| ( ctype_digit( $session_id ) && absint( $session_id ) === $user_id );
}

/**
 * Merge a guest Woo session into the logged-in user session.
 * Deletes only guest keys (e.g. t_…) - never the customer's own session id.
 *
 * @return true|WP_Error
 */
function custom_headless_checkout_merge_guest_session( string $session_id, int $user_id ) {
	if ( $session_id === '' || $user_id <= 0 || ! function_exists( 'WC' ) ) {
		return new WP_Error( 'chc_handoff_session', 'Missing session or user.' );
	}

	try {
		$handler       = new WC_Session_Handler();
		$source_id     = $session_id;
		$session_data  = $handler->get_session( $source_id );
		$is_own_session = custom_headless_checkout_is_customer_session_key( $source_id, $user_id );

		// Guest key may already be gone after GraphQL login transfer - fall back to user session.
		if ( ( empty( $session_data ) || ! is_array( $session_data ) ) && ! $is_own_session ) {
			$user_data = $handler->get_session( (string) $user_id );
			if ( ! empty( $user_data ) && is_array( $user_data ) ) {
				$session_data   = $user_data;
				$source_id      = (string) $user_id;
				$is_own_session = true;
			}
		}

		if ( empty( $session_data ) || ! is_array( $session_data ) ) {
			// Own session key with no DB row yet - let Woo load the cookie session as-is.
			if ( $is_own_session ) {
				return true;
			}
			return new WP_Error( 'chc_handoff_session', 'Guest session not found.' );
		}

		if ( isset( $session_data['customer'] ) ) {
			$customer = maybe_unserialize( $session_data['customer'] );
			if ( is_array( $customer ) && ! empty( $customer['id'] ) ) {
				$existing = absint( $customer['id'] );
				if ( $existing > 0 && $existing !== $user_id ) {
					return new WP_Error( 'chc_handoff_conflict', 'Session belongs to another customer.' );
				}
			}
		}

		$session = WC()->session;
		if ( ! $session ) {
			return new WP_Error( 'chc_handoff_session', 'WC session missing.' );
		}

		if ( method_exists( $session, 'set_customer_id' ) ) {
			$session->set_customer_id( (string) $user_id );
		}

		foreach ( $session_data as $key => $value ) {
			$session->set( $key, maybe_unserialize( $value ) );
		}

		if ( WC()->customer ) {
			WC()->customer->set_id( $user_id );
			if ( method_exists( WC()->customer, 'read' ) ) {
				WC()->customer->read();
			}
		}

		if ( method_exists( $session, 'set_customer_session_cookie' ) ) {
			$session->set_customer_session_cookie( true );
		}

		if ( method_exists( $session, 'save_data' ) ) {
			$session->save_data();
		}

		// Never delete the customer's own session - that emptied checkout after login→handoff.
		if ( ! $is_own_session && $source_id !== (string) $user_id ) {
			$handler->delete_session( $source_id );
		}

		return true;
	} catch ( Throwable $e ) {
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			error_log( 'custom-headless-checkout merge: ' . $e->getMessage() );
		}
		return new WP_Error( 'chc_handoff_session', $e->getMessage() );
	}
}

/**
 * Create a one-time handoff code for a validated JWT.
 */
function custom_headless_checkout_create_handoff( int $user_id, string $session_id, bool $remember ): string {
	$code = bin2hex( random_bytes( 16 ) );
	set_transient(
		'chc_handoff_' . $code,
		array(
			'user_id'    => $user_id,
			'session_id' => $session_id,
			'remember'   => $remember,
			'exp'        => time() + CUSTOM_HEADLESS_HANDOFF_TTL,
		),
		CUSTOM_HEADLESS_HANDOFF_TTL
	);
	return $code;
}

/**
 * CORS origin helper for public REST routes.
 */
function custom_headless_checkout_cors_origin(): string {
	$origin         = custom_headless_checkout_app_origin();
	$request_origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? esc_url_raw( wp_unslash( (string) $_SERVER['HTTP_ORIGIN'] ) ) : '';
	if ( $origin !== '' && $request_origin !== '' && untrailingslashit( $request_origin ) === $origin ) {
		return $request_origin;
	}
	return $origin;
}

/**
 * REST: exchange JWT for one-time handoff code.
 *
 * @param string $namespace REST namespace.
 */
function custom_headless_checkout_register_handoff_route( string $namespace ): void {
	register_rest_route(
		$namespace,
		'/handoff',
		array(
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => static function ( WP_REST_Request $request ) {
					$body = $request->get_json_params();
					if ( ! is_array( $body ) ) {
						$body = array();
					}
					$auth_token = isset( $body['authToken'] ) ? (string) $body['authToken'] : '';
					$session_id = isset( $body['sessionId'] ) ? sanitize_text_field( (string) $body['sessionId'] ) : '';
					$remember   = ! empty( $body['remember'] );

					$user_id = custom_headless_checkout_user_id_from_token( $auth_token );
					if ( $user_id <= 0 ) {
						return new WP_Error(
							'chc_handoff_invalid',
							'Invalid or expired auth token.',
							array( 'status' => 401 )
						);
					}

					$code = custom_headless_checkout_create_handoff( $user_id, $session_id, $remember );
					return rest_ensure_response( array( 'handoff' => $code ) );
				},
			),
			array(
				'methods'             => 'OPTIONS',
				'permission_callback' => '__return_true',
				'callback'            => static function () {
					return new WP_REST_Response( null, 204 );
				},
			),
		)
	);
}

add_action(
	'rest_api_init',
	static function (): void {
		custom_headless_checkout_register_handoff_route( 'custom-checkout/v1' );
		custom_headless_checkout_register_handoff_route( 'astro-checkout/v1' );
	}
);

add_filter(
	'rest_pre_serve_request',
	static function ( $served, $result, $request, $server ) {
		unset( $result, $server );
		if ( ! $request instanceof WP_REST_Request ) {
			return $served;
		}

		$route = $request->get_route();
		if ( $route !== '/custom-checkout/v1/handoff' && $route !== '/astro-checkout/v1/handoff' ) {
			return $served;
		}

		$allow = custom_headless_checkout_cors_origin();
		if ( $allow !== '' ) {
			header( 'Access-Control-Allow-Origin: ' . $allow );
			header( 'Access-Control-Allow-Methods: POST, OPTIONS' );
			header( 'Access-Control-Allow-Headers: Content-Type, Accept' );
			header( 'Vary: Origin' );
		}

		return $served;
	},
	10,
	4
);

/**
 * Consume ?handoff= on checkout: login, merge guest cart, redirect clean URL.
 */
add_action(
	'template_redirect',
	static function (): void {
		if ( empty( $_GET['handoff'] ) || ! function_exists( 'is_checkout' ) || ! is_checkout() ) {
			return;
		}

		if ( function_exists( 'is_wc_endpoint_url' ) && is_wc_endpoint_url() ) {
			return;
		}

		$code = sanitize_text_field( wp_unslash( (string) $_GET['handoff'] ) );
		$code = preg_replace( '/[^a-f0-9]/', '', strtolower( $code ) );
		if ( ! is_string( $code ) || $code === '' ) {
			custom_headless_checkout_auth_error_redirect();
		}

		$payload = get_transient( 'chc_handoff_' . $code );
		if ( ! is_array( $payload ) ) {
			// Accept codes issued by the previous plugin version during migration.
			$payload = get_transient( 'astro_handoff_' . $code );
			delete_transient( 'astro_handoff_' . $code );
		}
		delete_transient( 'chc_handoff_' . $code );

		if ( ! is_array( $payload ) || empty( $payload['user_id'] ) ) {
			custom_headless_checkout_auth_error_redirect();
		}

		$user_id    = absint( $payload['user_id'] );
		$session_id = isset( $payload['session_id'] ) ? sanitize_text_field( (string) $payload['session_id'] ) : '';
		$remember   = ! empty( $payload['remember'] );

		if ( $user_id <= 0 || ! custom_headless_checkout_login_user( $user_id, $remember ) ) {
			custom_headless_checkout_auth_error_redirect();
		}

		if ( $session_id !== '' ) {
			$merged = custom_headless_checkout_merge_guest_session( $session_id, $user_id );
			if ( is_wp_error( $merged ) ) {
				custom_headless_checkout_auth_error_redirect();
			}
			wp_safe_redirect( wc_get_checkout_url() );
			exit;
		}

		wp_safe_redirect( remove_query_arg( 'handoff' ) );
		exit;
	},
	1
);

/**
 * Load the headless session into WooCommerce when ?session_id= is present (guests / no handoff).
 */
add_action(
	'woocommerce_load_cart_from_session',
	static function (): void {
		if ( empty( $_GET['session_id'] ) || ! empty( $_GET['handoff'] ) || ! function_exists( 'WC' ) ) {
			return;
		}

		if ( is_user_logged_in() ) {
			return;
		}

		$session_id = sanitize_text_field( wp_unslash( (string) $_GET['session_id'] ) );
		if ( $session_id === '' ) {
			return;
		}

		try {
			$handler      = new WC_Session_Handler();
			$session_data = $handler->get_session( $session_id );

			if ( empty( $session_data ) || ! is_array( $session_data ) ) {
				custom_headless_checkout_session_miss_notice( $session_id );
				return;
			}

			$session = WC()->session;
			if ( ! $session ) {
				custom_headless_checkout_session_miss_notice( $session_id );
				return;
			}

			if ( method_exists( $session, 'set_customer_id' ) ) {
				$session->set_customer_id( $session_id );
			}

			foreach ( $session_data as $key => $value ) {
				$session->set( $key, maybe_unserialize( $value ) );
			}

			if ( method_exists( $session, 'set_customer_session_cookie' ) ) {
				$session->set_customer_session_cookie( true );
			}
		} catch ( Throwable $e ) {
			custom_headless_checkout_session_miss_notice( $session_id );
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				error_log( 'custom-headless-checkout: ' . $e->getMessage() );
			}
		}
	}
);

/**
 * Keep the headless session id on the checkout form for cleanup after payment (guest path).
 */
add_action(
	'woocommerce_checkout_after_customer_details',
	static function (): void {
		if ( empty( $_GET['session_id'] ) ) {
			return;
		}

		$session_id = sanitize_text_field( wp_unslash( (string) $_GET['session_id'] ) );
		printf(
			'<input type="hidden" name="headless-session" value="%s" />',
			esc_attr( $session_id )
		);
	}
);

/**
 * Store session id on the order for gateways that rewrite POST (e.g. PayPal).
 */
add_action(
	'woocommerce_checkout_update_order_meta',
	static function ( $order_id ): void {
		if ( empty( $_POST['headless-session'] ) ) {
			return;
		}

		$session_id = sanitize_text_field( wp_unslash( (string) $_POST['headless-session'] ) );
		if ( $session_id === '' ) {
			return;
		}

		update_post_meta( (int) $order_id, '_headless_session', $session_id );
	}
);

/**
 * Delete the headless session after payment completes.
 */
add_action(
	'woocommerce_payment_complete',
	static function ( $order_id ): void {
		$session_id = '';

		if ( ! empty( $_POST['headless-session'] ) ) {
			$session_id = sanitize_text_field( wp_unslash( (string) $_POST['headless-session'] ) );
		}

		if ( $session_id === '' && $order_id ) {
			$session_id = (string) get_post_meta( (int) $order_id, '_headless_session', true );
		}

		if ( $session_id === '' || ! function_exists( 'WC' ) || ! WC()->session ) {
			return;
		}

		WC()->session->delete_session( $session_id );
		delete_post_meta( (int) $order_id, '_headless_session' );
	}
);

/**
 * PayPal Standard thank-you fallback cleanup.
 */
add_action(
	'woocommerce_thankyou_paypal',
	static function ( $order_id ): void {
		$session_id = (string) get_post_meta( (int) $order_id, '_headless_session', true );
		if ( $session_id === '' || ! function_exists( 'WC' ) || ! WC()->session ) {
			return;
		}

		WC()->session->delete_session( $session_id );
		delete_post_meta( (int) $order_id, '_headless_session' );
	}
);

/**
 * Avoid restoring a paid cart for logged-in customers.
 */
add_filter( 'woocommerce_persistent_cart_enabled', '__return_false' );

/**
 * After checkout, send buyers to the storefront account orders tab.
 */
add_filter(
	'woocommerce_get_return_url',
	static function ( $return_url, $order = null ) {
		$origin = custom_headless_checkout_app_origin();
		if ( $origin === '' ) {
			return $return_url;
		}

		$url = $origin . '/moje-konto/?tab=zamowienia&from_checkout=1';

		if ( $order && is_a( $order, 'WC_Order' ) ) {
			$url = add_query_arg(
				array(
					'order_id'  => $order->get_id(),
					'order_key' => $order->get_order_key(),
				),
				$url
			);
		}

		return $url;
	},
	10,
	2
);
