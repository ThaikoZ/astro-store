<?php
/**
 * Astro Checkout UI settings (admin + option helpers).
 *
 * @package AstroCheckoutUI
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Option name for the settings array. */
const ASTRO_CHECKOUT_UI_OPTION = 'astro_checkout_ui_settings';

/**
 * Default settings.
 *
 * @return array{auth_required:bool,company_fields_enabled:bool,custom_css:string,terms_url:string,privacy_url:string}
 */
function astro_checkout_ui_default_settings(): array {
	return array(
		'auth_required'          => false,
		'company_fields_enabled' => true,
		'custom_css'             => '',
		'terms_url'              => '',
		'privacy_url'            => '',
	);
}

/**
 * Merged settings from the database.
 *
 * @return array{auth_required:bool,company_fields_enabled:bool,custom_css:string,terms_url:string,privacy_url:string}
 */
function astro_checkout_ui_get_settings(): array {
	$stored = get_option( ASTRO_CHECKOUT_UI_OPTION, array() );
	if ( ! is_array( $stored ) ) {
		$stored = array();
	}

	$defaults = astro_checkout_ui_default_settings();
	$merged   = array_merge( $defaults, $stored );

	return array(
		'auth_required'          => ! empty( $merged['auth_required'] ),
		'company_fields_enabled' => ! empty( $merged['company_fields_enabled'] ),
		'custom_css'             => is_string( $merged['custom_css'] ) ? $merged['custom_css'] : '',
		'terms_url'              => is_string( $merged['terms_url'] ) ? $merged['terms_url'] : '',
		'privacy_url'            => is_string( $merged['privacy_url'] ) ? $merged['privacy_url'] : '',
	);
}

/**
 * Whether login is required before checkout.
 */
function astro_checkout_ui_auth_required(): bool {
	return astro_checkout_ui_get_settings()['auth_required'];
}

/**
 * Whether company / NIP fields are enabled.
 */
function astro_checkout_ui_company_fields_enabled(): bool {
	return astro_checkout_ui_get_settings()['company_fields_enabled'];
}

/**
 * Register settings + WooCommerce submenu.
 */
add_action(
	'admin_menu',
	static function (): void {
		add_submenu_page(
			'woocommerce',
			'Checkout UI',
			'Checkout UI',
			'manage_woocommerce',
			'astro-checkout-ui',
			'astro_checkout_ui_render_settings_page'
		);
	}
);

add_action(
	'admin_init',
	static function (): void {
		register_setting(
			'astro_checkout_ui_settings_group',
			ASTRO_CHECKOUT_UI_OPTION,
			array(
				'type'              => 'array',
				'sanitize_callback' => 'astro_checkout_ui_sanitize_settings',
				'default'           => astro_checkout_ui_default_settings(),
			)
		);
	}
);

/**
 * @param mixed $input Raw POST settings.
 * @return array{auth_required:bool,company_fields_enabled:bool,custom_css:string,terms_url:string,privacy_url:string}
 */
function astro_checkout_ui_sanitize_settings( $input ): array {
	$defaults = astro_checkout_ui_default_settings();
	if ( ! is_array( $input ) ) {
		return $defaults;
	}

	$custom_css = isset( $input['custom_css'] ) ? (string) $input['custom_css'] : '';
	// Keep CSS as text; strip tags that are not CSS.
	$custom_css = wp_strip_all_tags( $custom_css );

	$terms_url   = isset( $input['terms_url'] ) ? esc_url_raw( trim( (string) $input['terms_url'] ) ) : '';
	$privacy_url = isset( $input['privacy_url'] ) ? esc_url_raw( trim( (string) $input['privacy_url'] ) ) : '';

	return array(
		'auth_required'          => ! empty( $input['auth_required'] ),
		'company_fields_enabled' => ! empty( $input['company_fields_enabled'] ),
		'custom_css'             => $custom_css,
		'terms_url'              => $terms_url,
		'privacy_url'            => $privacy_url,
	);
}

/**
 * Admin settings page markup.
 */
function astro_checkout_ui_render_settings_page(): void {
	if ( ! current_user_can( 'manage_woocommerce' ) ) {
		return;
	}

	$settings = astro_checkout_ui_get_settings();
	?>
	<div class="wrap">
		<h1>Astro Checkout UI</h1>
		<p>Ustawienia branded checkout używanego przez headless Astro.</p>
		<form method="post" action="options.php">
			<?php settings_fields( 'astro_checkout_ui_settings_group' ); ?>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row">Wymagane konto</th>
					<td>
						<label>
							<input
								type="checkbox"
								name="<?php echo esc_attr( ASTRO_CHECKOUT_UI_OPTION ); ?>[auth_required]"
								value="1"
								<?php checked( $settings['auth_required'] ); ?>
							/>
							Wymagaj logowania przed checkoutem (Astro + WordPress)
						</label>
					</td>
				</tr>
				<tr>
					<th scope="row">Pola firmowe</th>
					<td>
						<label>
							<input
								type="checkbox"
								name="<?php echo esc_attr( ASTRO_CHECKOUT_UI_OPTION ); ?>[company_fields_enabled]"
								value="1"
								<?php checked( $settings['company_fields_enabled'] ); ?>
							/>
							Pokaż „Kupuję jako firma”, Firma i NIP
						</label>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="astro_terms_url">URL regulaminu</label></th>
					<td>
						<input
							type="url"
							class="large-text"
							id="astro_terms_url"
							name="<?php echo esc_attr( ASTRO_CHECKOUT_UI_OPTION ); ?>[terms_url]"
							value="<?php echo esc_attr( $settings['terms_url'] ); ?>"
							placeholder="https://twoja-domena.pl/regulamin/"
						/>
						<p class="description">Używany w tekście zgody przy zamówieniu (zamiast strony WooCommerce).</p>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="astro_privacy_url">URL polityki prywatności</label></th>
					<td>
						<input
							type="url"
							class="large-text"
							id="astro_privacy_url"
							name="<?php echo esc_attr( ASTRO_CHECKOUT_UI_OPTION ); ?>[privacy_url]"
							value="<?php echo esc_attr( $settings['privacy_url'] ); ?>"
							placeholder="https://twoja-domena.pl/polityka-prywatnosci/"
						/>
						<p class="description">Używany w tekście zgody przy zamówieniu (zamiast strony WooCommerce).</p>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="astro_custom_css">Własny CSS</label></th>
					<td>
						<textarea
							class="large-text code"
							rows="12"
							id="astro_custom_css"
							name="<?php echo esc_attr( ASTRO_CHECKOUT_UI_OPTION ); ?>[custom_css]"
						><?php echo esc_textarea( $settings['custom_css'] ); ?></textarea>
						<p class="description">Wstrzykiwany tylko na stronie checkoutu Astro.</p>
					</td>
				</tr>
			</table>
			<?php submit_button( 'Zapisz ustawienia' ); ?>
		</form>
	</div>
	<?php
}

/**
 * Public REST: settings for Astro before hosted checkout redirect.
 */
add_action(
	'rest_api_init',
	static function (): void {
		register_rest_route(
			'astro-checkout/v1',
			'/settings',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => static function () {
					$settings = astro_checkout_ui_get_settings();
					return rest_ensure_response(
						array(
							'authRequired'         => $settings['auth_required'],
							'companyFieldsEnabled' => $settings['company_fields_enabled'],
						)
					);
				},
			)
		);
	}
);

/**
 * CORS for Astro origin on the public settings route.
 */
add_filter(
	'rest_pre_serve_request',
	static function ( $served, $result, $request, $server ) {
		unset( $result, $server );
		if ( ! $request instanceof WP_REST_Request ) {
			return $served;
		}
		if ( $request->get_route() !== '/astro-checkout/v1/settings' ) {
			return $served;
		}

		$origin = '';
		if ( function_exists( 'astro_headless_checkout_app_origin' ) ) {
			$origin = astro_headless_checkout_app_origin();
		}
		if ( $origin === '' ) {
			$option = get_option( 'astro_app_origin', '' );
			if ( is_string( $option ) ) {
				$origin = untrailingslashit( $option );
			}
		}
		if ( $origin === '' && defined( 'ASTRO_APP_ORIGIN' ) && ASTRO_APP_ORIGIN ) {
			$origin = untrailingslashit( (string) ASTRO_APP_ORIGIN );
		}

		$request_origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? esc_url_raw( wp_unslash( (string) $_SERVER['HTTP_ORIGIN'] ) ) : '';
		$allow          = '';
		if ( $origin !== '' && $request_origin !== '' && untrailingslashit( $request_origin ) === $origin ) {
			$allow = $request_origin;
		} elseif ( $origin !== '' ) {
			$allow = $origin;
		}

		if ( $allow !== '' ) {
			header( 'Access-Control-Allow-Origin: ' . $allow );
			header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
			header( 'Access-Control-Allow-Credentials: true' );
			header( 'Vary: Origin' );
		}

		return $served;
	},
	10,
	4
);

add_action(
	'rest_api_init',
	static function (): void {
		// Answer CORS preflight for the settings route.
		add_filter(
			'rest_pre_dispatch',
			static function ( $result, $server, $request ) {
				unset( $server );
				if ( ! $request instanceof WP_REST_Request ) {
					return $result;
				}
				if ( $request->get_route() !== '/astro-checkout/v1/settings' ) {
					return $result;
				}
				if ( $request->get_method() === 'OPTIONS' ) {
					return new WP_REST_Response( null, 204 );
				}
				return $result;
			},
			10,
			3
		);
	}
);
