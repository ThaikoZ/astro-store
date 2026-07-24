<?php
/**
 * Plugin Name: Astro Headless Checkout
 * Description: Loads a WooGraphQL/headless cart session on WooCommerce checkout, hands off Astro JWT auth, and returns buyers to the Astro account page after payment.
 * Author: Astro Store
 * Version: 1.2.0
 * Requires Plugins: woocommerce
 *
 * Install: upload this folder to wp-content/plugins/ and Activate.
 *
 * Configure Astro return origin in wp-config.php:
 *   define( 'ASTRO_APP_ORIGIN', 'https://your-astro-site.example' );
 *
 * JWT handoff requires WPGraphQL JWT Authentication + GRAPHQL_JWT_AUTH_SECRET_KEY.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Astro site origin used for post-checkout redirects.
 */
function astro_headless_checkout_app_origin(): string {
	if ( defined( 'ASTRO_APP_ORIGIN' ) && ASTRO_APP_ORIGIN ) {
		return untrailingslashit( (string) ASTRO_APP_ORIGIN );
	}

	$option = get_option( 'astro_app_origin', '' );
	if ( is_string( $option ) && $option !== '' ) {
		return untrailingslashit( $option );
	}

	return '';
}

/**
 * Whether checkout UI requires login (shared option).
 */
function astro_headless_checkout_auth_required(): bool {
	if ( function_exists( 'astro_checkout_ui_auth_required' ) ) {
		return astro_checkout_ui_auth_required();
	}

	$settings = get_option( 'astro_checkout_ui_settings', array() );
	return is_array( $settings ) && ! empty( $settings['auth_required'] );
}

/**
 * Surface a checkout notice when the headless session cannot be loaded.
 */
function astro_headless_checkout_session_miss_notice( string $session_id ): void {
	$message = sprintf(
		/* translators: %s: session id query value */
		__( 'Nie znaleziono sesji koszyka (%s). Wróć do sklepu, dodaj produkt ponownie i spróbuj jeszcze raz.', 'astro-headless-checkout' ),
		$session_id
	);

	if ( function_exists( 'wc_add_notice' ) ) {
		wc_add_notice( $message, 'error' );
	}

	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		error_log( 'astro-headless-checkout: could not locate session ' . $session_id );
	}
}

/**
 * Validate an Astro / WPGraphQL JWT and return the WordPress user id, or 0.
 */
function astro_headless_checkout_user_id_from_token( string $token ): int {
	$token = trim( $token );
	if ( $token === '' ) {
		return 0;
	}

	if ( class_exists( '\WPGraphQL\JWT_Authentication\Auth' ) ) {
		$decoded = \WPGraphQL\JWT_Authentication\Auth::validate_token( $token );
		if ( is_wp_error( $decoded ) || empty( $decoded ) ) {
			return 0;
		}
		if ( is_object( $decoded ) && isset( $decoded->data->user->id ) ) {
			return absint( $decoded->data->user->id );
		}
	}

	// Fallback HS256 verify with GRAPHQL_JWT_AUTH_SECRET_KEY when the plugin API is unavailable.
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

	$user_id = 0;
	if ( isset( $payload['data']['user']['id'] ) ) {
		$user_id = absint( $payload['data']['user']['id'] );
	}

	return $user_id;
}

/**
 * Log the buyer into WordPress from a validated user id.
 */
function astro_headless_checkout_login_user( int $user_id ): bool {
	$user = get_user_by( 'id', $user_id );
	if ( ! $user ) {
		return false;
	}

	wp_set_current_user( $user_id );
	wp_set_auth_cookie( $user_id, true );

	if ( function_exists( 'WC' ) && WC()->customer ) {
		WC()->customer->set_id( $user_id );
		if ( method_exists( WC()->customer, 'read' ) ) {
			WC()->customer->read();
		}
	}

	return true;
}

/**
 * Consume ?auth_token= on checkout: validate JWT, set WP cookie, redirect without the token.
 */
add_action(
	'template_redirect',
	static function (): void {
		if ( empty( $_GET['auth_token'] ) || ! function_exists( 'is_checkout' ) || ! is_checkout() ) {
			return;
		}

		if ( function_exists( 'is_wc_endpoint_url' ) && is_wc_endpoint_url() ) {
			return;
		}

		// Do not use sanitize_text_field - it can alter JWT characters.
		$token_raw = wp_unslash( (string) $_GET['auth_token'] );
		$token     = is_string( $token_raw ) ? preg_replace( '/[^A-Za-z0-9._\-]/', '', $token_raw ) : '';
		if ( ! is_string( $token ) || $token === '' ) {
			return;
		}

		$user_id = astro_headless_checkout_user_id_from_token( $token );
		if ( $user_id > 0 ) {
			astro_headless_checkout_login_user( $user_id );
		} else {
			if ( function_exists( 'wc_add_notice' ) ) {
				wc_add_notice(
					__( 'Nie udało się zalogować sesji konta. Zaloguj się ponownie w sklepie i spróbuj jeszcze raz.', 'astro-headless-checkout' ),
					'error'
				);
			}
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				error_log( 'astro-headless-checkout: invalid auth_token on checkout' );
			}
			if ( astro_headless_checkout_auth_required() ) {
				$origin = astro_headless_checkout_app_origin();
				if ( $origin !== '' ) {
					wp_safe_redirect( $origin . '/logowanie/?redirect=checkout' );
					exit;
				}
			}
		}

		$redirect = remove_query_arg( 'auth_token' );
		wp_safe_redirect( $redirect );
		exit;
	},
	1
);

/**
 * Load the headless session into WooCommerce when ?session_id= is present.
 */
add_action(
	'woocommerce_load_cart_from_session',
	static function (): void {
		if ( empty( $_GET['session_id'] ) || ! function_exists( 'WC' ) ) {
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
				astro_headless_checkout_session_miss_notice( $session_id );
				return;
			}

			$session = WC()->session;
			if ( ! $session ) {
				astro_headless_checkout_session_miss_notice( $session_id );
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
			astro_headless_checkout_session_miss_notice( $session_id );
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				error_log( 'astro-headless-checkout: ' . $e->getMessage() );
			}
		}
	}
);

/**
 * Keep the headless session id on the checkout form for cleanup after payment.
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
 * After checkout, send buyers to the Astro account orders tab.
 */
add_filter(
	'woocommerce_get_return_url',
	static function ( $return_url, $order = null ) {
		$origin = astro_headless_checkout_app_origin();
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
