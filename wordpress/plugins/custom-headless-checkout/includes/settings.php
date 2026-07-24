<?php
/**
 * Custom Headless Checkout settings (admin + public REST).
 *
 * @package CustomHeadlessCheckout
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Option name for the settings array. */
const CUSTOM_HEADLESS_CHECKOUT_OPTION = 'custom_headless_checkout_settings';

/**
 * Default settings.
 *
 * @return array{auth_required:bool,company_fields_enabled:bool,terms_checkbox:bool,custom_css:string,terms_url:string,privacy_url:string}
 */
function custom_headless_checkout_default_settings(): array {
	return array(
		'auth_required'          => false,
		'company_fields_enabled' => true,
		'terms_checkbox'         => false,
		'custom_css'             => '',
		'terms_url'              => '',
		'privacy_url'            => '',
	);
}

/**
 * Migrates legacy Astro Checkout UI settings once when the new option is empty.
 */
function custom_headless_checkout_maybe_migrate_settings(): void {
	$current = get_option( CUSTOM_HEADLESS_CHECKOUT_OPTION, null );
	if ( $current !== null ) {
		return;
	}

	$legacy = get_option( 'astro_checkout_ui_settings', null );
	if ( ! is_array( $legacy ) ) {
		return;
	}

	$defaults = custom_headless_checkout_default_settings();
	$merged   = array_merge( $defaults, $legacy );
	update_option(
		CUSTOM_HEADLESS_CHECKOUT_OPTION,
		array(
			'auth_required'          => ! empty( $merged['auth_required'] ),
			'company_fields_enabled' => ! empty( $merged['company_fields_enabled'] ),
			'terms_checkbox'         => ! empty( $merged['terms_checkbox'] ),
			'custom_css'             => is_string( $merged['custom_css'] ) ? $merged['custom_css'] : '',
			'terms_url'              => is_string( $merged['terms_url'] ) ? $merged['terms_url'] : '',
			'privacy_url'            => is_string( $merged['privacy_url'] ) ? $merged['privacy_url'] : '',
		),
		false
	);
}

/**
 * Merged settings from the database.
 *
 * @return array{auth_required:bool,company_fields_enabled:bool,terms_checkbox:bool,custom_css:string,terms_url:string,privacy_url:string}
 */
function custom_headless_checkout_get_settings(): array {
	custom_headless_checkout_maybe_migrate_settings();

	$stored = get_option( CUSTOM_HEADLESS_CHECKOUT_OPTION, array() );
	if ( ! is_array( $stored ) ) {
		$stored = array();
	}

	$defaults = custom_headless_checkout_default_settings();
	$merged   = array_merge( $defaults, $stored );

	return array(
		'auth_required'          => ! empty( $merged['auth_required'] ),
		'company_fields_enabled' => ! empty( $merged['company_fields_enabled'] ),
		'terms_checkbox'         => ! empty( $merged['terms_checkbox'] ),
		'custom_css'             => is_string( $merged['custom_css'] ) ? $merged['custom_css'] : '',
		'terms_url'              => is_string( $merged['terms_url'] ) ? $merged['terms_url'] : '',
		'privacy_url'            => is_string( $merged['privacy_url'] ) ? $merged['privacy_url'] : '',
	);
}

/**
 * Whether login is required before checkout.
 */
function custom_headless_checkout_auth_required(): bool {
	return custom_headless_checkout_get_settings()['auth_required'];
}

/**
 * Whether company / NIP fields are enabled.
 */
function custom_headless_checkout_company_fields_enabled(): bool {
	return custom_headless_checkout_get_settings()['company_fields_enabled'];
}

/**
 * Whether checkout shows a required terms checkbox (vs notice-only acceptance).
 */
function custom_headless_checkout_terms_checkbox_enabled(): bool {
	return custom_headless_checkout_get_settings()['terms_checkbox'];
}

/**
 * Legacy aliases used by older templates / snippets.
 */
function astro_checkout_ui_get_settings(): array {
	return custom_headless_checkout_get_settings();
}

function astro_checkout_ui_auth_required(): bool {
	return custom_headless_checkout_auth_required();
}

function astro_checkout_ui_company_fields_enabled(): bool {
	return custom_headless_checkout_company_fields_enabled();
}

/**
 * Register settings + WooCommerce submenu.
 */
add_action(
	'admin_menu',
	static function (): void {
		add_submenu_page(
			'woocommerce',
			'Headless Checkout',
			'Headless Checkout',
			'manage_woocommerce',
			'custom-headless-checkout',
			'custom_headless_checkout_render_settings_page'
		);
	}
);

add_action(
	'admin_init',
	static function (): void {
		register_setting(
			'custom_headless_checkout_settings_group',
			CUSTOM_HEADLESS_CHECKOUT_OPTION,
			array(
				'type'              => 'array',
				'sanitize_callback' => 'custom_headless_checkout_sanitize_settings',
				'default'           => custom_headless_checkout_default_settings(),
			)
		);
	}
);

/**
 * @param mixed $input Raw POST settings.
 * @return array{auth_required:bool,company_fields_enabled:bool,terms_checkbox:bool,custom_css:string,terms_url:string,privacy_url:string}
 */
function custom_headless_checkout_sanitize_settings( $input ): array {
	$defaults = custom_headless_checkout_default_settings();
	if ( ! is_array( $input ) ) {
		return $defaults;
	}

	$custom_css = isset( $input['custom_css'] ) ? (string) $input['custom_css'] : '';
	$custom_css = wp_strip_all_tags( $custom_css );

	$terms_url   = isset( $input['terms_url'] ) ? esc_url_raw( trim( (string) $input['terms_url'] ) ) : '';
	$privacy_url = isset( $input['privacy_url'] ) ? esc_url_raw( trim( (string) $input['privacy_url'] ) ) : '';

	return array(
		'auth_required'          => ! empty( $input['auth_required'] ),
		'company_fields_enabled' => ! empty( $input['company_fields_enabled'] ),
		'terms_checkbox'         => ! empty( $input['terms_checkbox'] ),
		'custom_css'             => $custom_css,
		'terms_url'              => $terms_url,
		'privacy_url'            => $privacy_url,
	);
}

/**
 * Admin settings page markup.
 */
function custom_headless_checkout_render_settings_page(): void {
	if ( ! current_user_can( 'manage_woocommerce' ) ) {
		return;
	}

	$settings = custom_headless_checkout_get_settings();
	$option   = CUSTOM_HEADLESS_CHECKOUT_OPTION;
	?>
	<div class="wrap">
		<h1>Custom Headless Checkout</h1>
		<p>Ustawienia branded checkout dla sklepu headless (Astro).</p>
		<p class="description">AlphaAi Ventures sp. z o.o. · <a href="https://alphaaiventures.com" target="_blank" rel="noopener noreferrer">alphaaiventures.com</a></p>
		<form method="post" action="options.php">
			<?php settings_fields( 'custom_headless_checkout_settings_group' ); ?>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row">Wymagane konto</th>
					<td>
						<label>
							<input
								type="checkbox"
								name="<?php echo esc_attr( $option ); ?>[auth_required]"
								value="1"
								<?php checked( $settings['auth_required'] ); ?>
							/>
							Wymagaj logowania przed checkoutem (storefront + WordPress)
						</label>
					</td>
				</tr>
				<tr>
					<th scope="row">Pola firmowe</th>
					<td>
						<label>
							<input
								type="checkbox"
								name="<?php echo esc_attr( $option ); ?>[company_fields_enabled]"
								value="1"
								<?php checked( $settings['company_fields_enabled'] ); ?>
							/>
							Pokaż „Kupuję jako firma”, Firma i NIP
						</label>
					</td>
				</tr>
				<tr>
					<th scope="row">Zgoda na regulamin</th>
					<td>
						<fieldset>
							<label style="display:block;margin-bottom:8px;">
								<input
									type="radio"
									name="<?php echo esc_attr( $option ); ?>[terms_checkbox]"
									value="0"
									<?php checked( ! $settings['terms_checkbox'] ); ?>
								/>
								Tylko tekst (akceptacja przez złożenie zamówienia)
							</label>
							<label style="display:block;">
								<input
									type="radio"
									name="<?php echo esc_attr( $option ); ?>[terms_checkbox]"
									value="1"
									<?php checked( $settings['terms_checkbox'] ); ?>
								/>
								Wymagany checkbox „Przeczytałem/am i akceptuję…”
							</label>
						</fieldset>
						<p class="description">
							Tekst: „Składając zamówienie, akceptujesz regulamin oraz politykę prywatności.”
							Linki biorą się z pól poniżej.
						</p>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="chc_terms_url">URL regulaminu</label></th>
					<td>
						<input
							type="url"
							class="large-text"
							id="chc_terms_url"
							name="<?php echo esc_attr( $option ); ?>[terms_url]"
							value="<?php echo esc_attr( $settings['terms_url'] ); ?>"
							placeholder="https://twoja-domena.pl/regulamin/"
						/>
						<p class="description">Używany w tekście zgody przy zamówieniu (zamiast strony WooCommerce).</p>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="chc_privacy_url">URL polityki prywatności</label></th>
					<td>
						<input
							type="url"
							class="large-text"
							id="chc_privacy_url"
							name="<?php echo esc_attr( $option ); ?>[privacy_url]"
							value="<?php echo esc_attr( $settings['privacy_url'] ); ?>"
							placeholder="https://twoja-domena.pl/polityka-prywatnosci/"
						/>
						<p class="description">Używany w tekście zgody przy zamówieniu (zamiast strony WooCommerce).</p>
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="chc_custom_css">Własny CSS</label></th>
					<td>
						<textarea
							class="large-text code"
							rows="12"
							id="chc_custom_css"
							name="<?php echo esc_attr( $option ); ?>[custom_css]"
						><?php echo esc_textarea( $settings['custom_css'] ); ?></textarea>
						<p class="description">Wstrzykiwany tylko na stronie checkoutu.</p>
					</td>
				</tr>
			</table>
			<?php submit_button( 'Zapisz ustawienia' ); ?>
		</form>
	</div>
	<?php
}

/**
 * Public REST: settings for the storefront before hosted checkout redirect.
 * Registers both custom-checkout/v1 and legacy astro-checkout/v1.
 *
 * @param string $namespace REST namespace.
 */
function custom_headless_checkout_register_settings_route( string $namespace ): void {
	register_rest_route(
		$namespace,
		'/settings',
		array(
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => static function () {
					$settings = custom_headless_checkout_get_settings();
					return rest_ensure_response(
						array(
							'authRequired'         => $settings['auth_required'],
							'companyFieldsEnabled' => $settings['company_fields_enabled'],
						)
					);
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
		custom_headless_checkout_register_settings_route( 'custom-checkout/v1' );
		custom_headless_checkout_register_settings_route( 'astro-checkout/v1' );
	}
);

/**
 * CORS for the storefront origin on public settings routes.
 */
add_filter(
	'rest_pre_serve_request',
	static function ( $served, $result, $request, $server ) {
		unset( $result, $server );
		if ( ! $request instanceof WP_REST_Request ) {
			return $served;
		}

		$route = $request->get_route();
		if ( $route !== '/custom-checkout/v1/settings' && $route !== '/astro-checkout/v1/settings' ) {
			return $served;
		}

		$allow = custom_headless_checkout_cors_origin();
		if ( $allow !== '' ) {
			header( 'Access-Control-Allow-Origin: ' . $allow );
			header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
			header( 'Vary: Origin' );
		}

		return $served;
	},
	10,
	4
);
