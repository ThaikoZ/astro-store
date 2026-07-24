<?php
/**
 * Plugin Name: Custom Headless Checkout
 * Description: Headless WooCommerce checkout for Astro storefronts - branded checkout UI, session handoff, JWT auth via one-time codes, and return to the storefront account page.
 * Version: 1.0.3
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Requires Plugins: woocommerce
 * Author: Adrian Sudak, AlphaAi Ventures sp. z o.o.
 * Author URI: https://alphaaiventures.com
 * Plugin URI: https://alphaaiventures.com
 * Text Domain: custom-headless-checkout
 *
 * Install: upload this folder to wp-content/plugins/ and Activate.
 * Requires classic checkout shortcode [woocommerce_checkout] (not Checkout block).
 * Settings: WooCommerce → Headless Checkout
 *
 * Configure storefront origin in wp-config.php:
 *   define( 'ASTRO_APP_ORIGIN', 'https://your-astro-site.example' );
 *   // or: define( 'CUSTOM_CHECKOUT_APP_ORIGIN', 'https://your-astro-site.example' );
 *
 * JWT handoff requires WPGraphQL JWT Authentication + GRAPHQL_JWT_AUTH_SECRET_KEY.
 * Auth flow: POST /wp-json/custom-checkout/v1/handoff → /checkout/?handoff=CODE
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CUSTOM_HEADLESS_CHECKOUT_VERSION', '1.0.3' );
define( 'CUSTOM_HEADLESS_CHECKOUT_FILE', __FILE__ );
define( 'CUSTOM_HEADLESS_CHECKOUT_DIR', plugin_dir_path( __FILE__ ) );
define( 'CUSTOM_HEADLESS_CHECKOUT_URL', plugin_dir_url( __FILE__ ) );

require_once CUSTOM_HEADLESS_CHECKOUT_DIR . 'includes/settings.php';
require_once CUSTOM_HEADLESS_CHECKOUT_DIR . 'includes/headless.php';
require_once CUSTOM_HEADLESS_CHECKOUT_DIR . 'includes/checkout-ui.php';

/**
 * Admin notice if legacy split plugins are still active.
 */
add_action(
	'admin_notices',
	static function (): void {
		if ( ! current_user_can( 'activate_plugins' ) ) {
			return;
		}

		if ( ! function_exists( 'is_plugin_active' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$legacy = array();
		if ( is_plugin_active( 'astro-checkout-ui/astro-checkout-ui.php' ) ) {
			$legacy[] = 'Astro Checkout UI';
		}
		if ( is_plugin_active( 'astro-headless-checkout/astro-headless-checkout.php' ) ) {
			$legacy[] = 'Astro Headless Checkout';
		}
		if ( $legacy === array() ) {
			return;
		}

		echo '<div class="notice notice-warning"><p>';
		echo esc_html(
			'Custom Headless Checkout replaces: ' . implode( ' + ', $legacy ) . '. Deactivate the old plugin(s) to avoid conflicts.'
		);
		echo '</p></div>';
	}
);
