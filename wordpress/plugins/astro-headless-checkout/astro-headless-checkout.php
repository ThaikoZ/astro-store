<?php
/**
 * Plugin Name: Astro Headless Checkout
 * Description: Loads a WooGraphQL/headless cart session on WooCommerce checkout and returns buyers to the Astro account page after payment.
 * Author: Astro Store
 * Version: 1.0.0
 * Requires Plugins: woocommerce
 *
 * Install: upload this folder to wp-content/plugins/ and Activate.
 *
 * Configure Astro return origin in wp-config.php:
 *   define( 'ASTRO_APP_ORIGIN', 'https://your-astro-site.example' );
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
				return;
			}

			$session = WC()->session;
			if ( ! $session ) {
				return;
			}

			foreach ( $session_data as $key => $value ) {
				$session->set( $key, maybe_unserialize( $value ) );
			}

			if ( method_exists( $session, 'set_customer_session_cookie' ) ) {
				$session->set_customer_session_cookie( true );
			}
		} catch ( Throwable $e ) {
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
