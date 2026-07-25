<?php
/**
 * Plugin Name: LMS Tutor GraphQL
 * Description: Headless Tutor LMS for Astro - enrolled courses via WPGraphQL, JWT handoff into Tutor UI, and back link to the storefront account Kursy tab.
 * Version: 1.0.6
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Author: Adrian Sudak, AlphaAi Ventures sp. z o.o.
 * Author URI: https://alphaaiventures.com
 * Plugin URI: https://alphaaiventures.com
 * Text Domain: custom-tutor-graphql
 *
 * Requires: Tutor LMS, WPGraphQL, WPGraphQL JWT Authentication.
 * Install: upload this folder to wp-content/plugins/ and Activate.
 *
 * Configure storefront origin in wp-config.php (same as checkout):
 *   define( 'ASTRO_APP_ORIGIN', 'https://your-astro-site.example' );
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CUSTOM_TUTOR_GRAPHQL_VERSION', '1.0.6' );
define( 'CUSTOM_TUTOR_GRAPHQL_FILE', __FILE__ );
define( 'CUSTOM_TUTOR_GRAPHQL_DIR', plugin_dir_path( __FILE__ ) );
define( 'CUSTOM_TUTOR_GRAPHQL_URL', plugin_dir_url( __FILE__ ) );

require_once CUSTOM_TUTOR_GRAPHQL_DIR . 'includes/helpers.php';
require_once CUSTOM_TUTOR_GRAPHQL_DIR . 'includes/graphql.php';
require_once CUSTOM_TUTOR_GRAPHQL_DIR . 'includes/handoff.php';
require_once CUSTOM_TUTOR_GRAPHQL_DIR . 'includes/back-link.php';

/**
 * Admin notice when required plugins or ASTRO_APP_ORIGIN are missing.
 */
add_action(
	'admin_notices',
	static function (): void {
		if ( ! current_user_can( 'activate_plugins' ) ) {
			return;
		}

		$missing = array();
		if ( ! function_exists( 'tutor_utils' ) ) {
			$missing[] = 'Tutor LMS';
		}
		if ( ! class_exists( 'WPGraphQL' ) ) {
			$missing[] = 'WPGraphQL';
		}

		if ( $missing !== array() ) {
			echo '<div class="notice notice-warning"><p>';
			echo esc_html(
				'LMS Tutor GraphQL needs: ' . implode( ', ', $missing ) . '.'
			);
			echo '</p></div>';
		}

		if ( custom_tutor_graphql_app_origin() === '' ) {
			echo '<div class="notice notice-error"><p>';
			echo esc_html(
				'LMS Tutor GraphQL: set ASTRO_APP_ORIGIN in wp-config.php (storefront origin). Handoff and exit links will not work until it is configured.'
			);
			echo '</p></div>';
		}
	}
);
