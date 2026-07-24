<?php
/**
 * Plugin Name: Astro Checkout UI
 * Description: Brand card WooCommerce checkout (form + sticky cart) matching the Astro storefront.
 * Author: Astro Store
 * Version: 3.1.2
 * Requires Plugins: woocommerce
 *
 * Install: upload this folder to wp-content/plugins/ and Activate.
 * Requires classic checkout shortcode [woocommerce_checkout] (not Checkout block).
 * Works alongside Astro Headless Checkout (session handoff + Astro return URL).
 * Settings: WooCommerce → Checkout UI
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'ASTRO_CHECKOUT_UI_DIR', plugin_dir_path( __FILE__ ) );
define( 'ASTRO_CHECKOUT_UI_URL', plugin_dir_url( __FILE__ ) );

require_once ASTRO_CHECKOUT_UI_DIR . 'includes/settings.php';

/**
 * Whether the blank checkout UI should replace the theme template.
 */
function astro_checkout_ui_should_load(): bool {
	if ( is_admin() || ! function_exists( 'is_checkout' ) ) {
		return false;
	}

	if ( ! is_checkout() ) {
		return false;
	}

	if ( function_exists( 'is_wc_endpoint_url' ) && is_wc_endpoint_url() ) {
		return false;
	}

	if ( function_exists( 'is_order_received_page' ) && is_order_received_page() ) {
		return false;
	}

	return true;
}

/**
 * Swap the theme template for our blank checkout shell.
 */
add_filter(
	'template_include',
	static function ( $template ) {
		if ( ! astro_checkout_ui_should_load() ) {
			return $template;
		}

		$blank = ASTRO_CHECKOUT_UI_DIR . 'template-checkout.php';
		return file_exists( $blank ) ? $blank : $template;
	},
	99
);

/**
 * Prefer plugin Woo templates (form-checkout, review-order, payment).
 */
add_filter(
	'woocommerce_locate_template',
	static function ( $template, $template_name, $template_path ) {
		if ( ! astro_checkout_ui_should_load() ) {
			return $template;
		}

		$override = ASTRO_CHECKOUT_UI_DIR . 'woocommerce/' . $template_name;
		return file_exists( $override ) ? $override : $template;
	},
	20,
	3
);

/**
 * Assets + brand fonts only on blank checkout.
 */
add_action(
	'wp_enqueue_scripts',
	static function (): void {
		if ( ! astro_checkout_ui_should_load() ) {
			return;
		}

		wp_enqueue_style(
			'astro-checkout-ui-fonts',
			'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap',
			array(),
			null
		);

		$css_path = ASTRO_CHECKOUT_UI_DIR . 'checkout.css';
		$js_path  = ASTRO_CHECKOUT_UI_DIR . 'checkout.js';
		$css_ver  = file_exists( $css_path ) ? (string) filemtime( $css_path ) : '3.1.0';
		$js_ver   = file_exists( $js_path ) ? (string) filemtime( $js_path ) : '3.1.0';

		wp_enqueue_style(
			'astro-checkout-ui',
			ASTRO_CHECKOUT_UI_URL . 'checkout.css',
			array( 'astro-checkout-ui-fonts' ),
			$css_ver
		);

		$custom_css = astro_checkout_ui_get_settings()['custom_css'];
		if ( $custom_css !== '' ) {
			wp_add_inline_style( 'astro-checkout-ui', $custom_css );
		}

		wp_enqueue_script(
			'astro-checkout-ui',
			ASTRO_CHECKOUT_UI_URL . 'checkout.js',
			array(),
			$js_ver,
			true
		);
	},
	100
);

add_filter(
	'body_class',
	static function ( array $classes ): array {
		if ( astro_checkout_ui_should_load() ) {
			$classes[] = 'astro-checkout';
			$classes[] = 'astro-pay';
		}
		return $classes;
	}
);

add_filter(
	'show_admin_bar',
	static function ( $show ) {
		return astro_checkout_ui_should_load() ? false : $show;
	}
);

/**
 * Use custom coupon UI in the cart card - remove default top coupon form.
 */
add_action(
	'wp',
	static function (): void {
		if ( ! astro_checkout_ui_should_load() ) {
			return;
		}

		remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10 );

		remove_all_actions( 'storefront_header' );
		remove_all_actions( 'storefront_footer' );
		remove_all_actions( 'generate_header' );
		remove_all_actions( 'generate_footer' );
		remove_all_actions( 'astra_header' );
		remove_all_actions( 'astra_footer' );
	},
	20
);

/**
 * Place-order CTA: Zapłać (amount stays in cart totals).
 */
add_filter(
	'woocommerce_order_button_text',
	static function () {
		return 'Zapłać';
	}
);

/**
 * Keep shipping methods + place-order CTA in sync when Woo refreshes order review.
 * Payment methods refresh via Woo's default `.woocommerce-checkout-payment` fragment (payment.php).
 */
add_filter(
	'woocommerce_update_order_review_fragments',
	static function ( $fragments ) {
		if ( ! astro_checkout_ui_should_load() || ! WC()->cart ) {
			return $fragments;
		}

		if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() ) {
			ob_start();
			echo '<div class="astro-pay-section astro-pay-shipping-methods" data-astro-shipping-methods>';
			echo '<h2 class="astro-pay-section__title">' . esc_html__( 'Dostawa', 'woocommerce' ) . '</h2>';
			do_action( 'woocommerce_review_order_before_shipping' );
			wc_cart_totals_shipping_html();
			do_action( 'woocommerce_review_order_after_shipping' );
			echo '</div>';
			$fragments['.astro-pay-shipping-methods'] = ob_get_clean();
		}

		$place = ASTRO_CHECKOUT_UI_DIR . 'woocommerce/checkout/place-order.php';
		if ( file_exists( $place ) ) {
			ob_start();
			include $place;
			$fragments['.astro-pay-place-order'] = ob_get_clean();
		}

		return $fragments;
	}
);

/**
 * Contact + address fields: restore phone, optional company / order notes, Polish labels.
 */
add_filter(
	'woocommerce_checkout_fields',
	static function ( $fields ) {
		if ( ! astro_checkout_ui_should_load() ) {
			return $fields;
		}

		if ( isset( $fields['billing']['billing_email'] ) ) {
			$fields['billing']['billing_email']['priority'] = 10;
			$fields['billing']['billing_email']['label']    = 'Email';
			$fields['billing']['billing_email']['class']    = array( 'form-row-wide', 'astro-pay-field-email' );
		}

		if ( isset( $fields['billing']['billing_phone'] ) ) {
			$fields['billing']['billing_phone']['priority'] = 15;
			$fields['billing']['billing_phone']['label']    = 'Telefon';
			$fields['billing']['billing_phone']['required'] = false;
			$fields['billing']['billing_phone']['class']    = array( 'form-row-wide' );
		}

		if ( isset( $fields['billing']['billing_first_name'] ) ) {
			$fields['billing']['billing_first_name']['priority'] = 20;
			$fields['billing']['billing_first_name']['label']    = 'Imię';
			$fields['billing']['billing_first_name']['class']    = array( 'form-row-first' );
		}

		if ( isset( $fields['billing']['billing_last_name'] ) ) {
			$fields['billing']['billing_last_name']['priority'] = 30;
			$fields['billing']['billing_last_name']['label']    = 'Nazwisko';
			$fields['billing']['billing_last_name']['class']    = array( 'form-row-last' );
		}

		if ( astro_checkout_ui_company_fields_enabled() ) {
			$fields['billing']['billing_buy_as_company'] = array(
				'type'     => 'checkbox',
				'label'    => 'Kupuję jako firma',
				'required' => false,
				'class'    => array( 'form-row-wide', 'astro-pay-buy-as-company' ),
				'priority' => 35,
				'clear'    => true,
			);

			$fields['billing']['billing_company'] = array(
				'type'         => 'text',
				'label'        => 'Firma',
				'placeholder'  => 'Nazwa firmy',
				'required'     => false,
				'class'        => array( 'form-row-wide', 'astro-pay-company-field' ),
				'priority'     => 40,
				'autocomplete' => 'organization',
				'clear'        => true,
			);

			$fields['billing']['billing_nip'] = array(
				'type'         => 'text',
				'label'        => 'NIP',
				'placeholder'  => 'Numer NIP',
				'required'     => false,
				'class'        => array( 'form-row-wide', 'astro-pay-company-field' ),
				'priority'     => 41,
				'autocomplete' => 'off',
				'clear'        => true,
			);
		} else {
			unset(
				$fields['billing']['billing_buy_as_company'],
				$fields['billing']['billing_company'],
				$fields['billing']['billing_nip']
			);
		}

		if ( isset( $fields['billing']['billing_address_1'] ) ) {
			$fields['billing']['billing_address_1']['priority']    = 50;
			$fields['billing']['billing_address_1']['label']       = 'Adres';
			$fields['billing']['billing_address_1']['placeholder'] = 'Ulica i numer';
		}

		if ( isset( $fields['billing']['billing_address_2'] ) ) {
			$fields['billing']['billing_address_2']['priority']    = 60;
			$fields['billing']['billing_address_2']['label']       = 'Mieszkanie, lokal';
			$fields['billing']['billing_address_2']['placeholder'] = 'Opcjonalnie';
		}

		if ( isset( $fields['billing']['billing_postcode'] ) ) {
			$fields['billing']['billing_postcode']['priority'] = 70;
			$fields['billing']['billing_postcode']['label']    = 'Kod pocztowy';
		}

		if ( isset( $fields['billing']['billing_city'] ) ) {
			$fields['billing']['billing_city']['priority'] = 80;
			$fields['billing']['billing_city']['label']    = 'Miasto';
		}

		if ( isset( $fields['billing']['billing_country'] ) ) {
			$fields['billing']['billing_country']['priority'] = 90;
			$fields['billing']['billing_country']['label']    = 'Kraj';
		}

		if ( isset( $fields['billing']['billing_state'] ) ) {
			$fields['billing']['billing_state']['priority'] = 100;
			$fields['billing']['billing_state']['label']    = 'Województwo';
		}

		if ( isset( $fields['order']['order_comments'] ) ) {
			$fields['order']['order_comments']['priority']    = 110;
			$fields['order']['order_comments']['label']       = 'Opis';
			$fields['order']['order_comments']['placeholder'] = 'Opcjonalnie';
			$fields['order']['order_comments']['required']    = false;
			$fields['order']['order_comments']['class']       = array( 'form-row-wide', 'notes' );
		}

		if ( isset( $fields['shipping']['shipping_first_name'] ) ) {
			$fields['shipping']['shipping_first_name']['label'] = 'Imię';
		}
		if ( isset( $fields['shipping']['shipping_last_name'] ) ) {
			$fields['shipping']['shipping_last_name']['label'] = 'Nazwisko';
		}
		if ( isset( $fields['shipping']['shipping_company'] ) ) {
			$fields['shipping']['shipping_company']['label']       = 'Firma';
			$fields['shipping']['shipping_company']['placeholder'] = 'Opcjonalnie';
			$fields['shipping']['shipping_company']['required']    = false;
		}
		if ( isset( $fields['shipping']['shipping_address_1'] ) ) {
			$fields['shipping']['shipping_address_1']['priority']    = 50;
			$fields['shipping']['shipping_address_1']['label']       = 'Adres';
			$fields['shipping']['shipping_address_1']['placeholder'] = 'Ulica i numer';
		}
		if ( isset( $fields['shipping']['shipping_address_2'] ) ) {
			$fields['shipping']['shipping_address_2']['priority']    = 60;
			$fields['shipping']['shipping_address_2']['label']       = 'Mieszkanie, lokal';
			$fields['shipping']['shipping_address_2']['placeholder'] = 'Opcjonalnie';
		}
		if ( isset( $fields['shipping']['shipping_postcode'] ) ) {
			$fields['shipping']['shipping_postcode']['priority'] = 70;
			$fields['shipping']['shipping_postcode']['label']    = 'Kod pocztowy';
		}
		if ( isset( $fields['shipping']['shipping_city'] ) ) {
			$fields['shipping']['shipping_city']['priority'] = 80;
			$fields['shipping']['shipping_city']['label']    = 'Miasto';
		}
		if ( isset( $fields['shipping']['shipping_country'] ) ) {
			$fields['shipping']['shipping_country']['priority'] = 90;
			$fields['shipping']['shipping_country']['label']    = 'Kraj';
		}
		if ( isset( $fields['shipping']['shipping_state'] ) ) {
			$fields['shipping']['shipping_state']['priority'] = 100;
			$fields['shipping']['shipping_state']['label']    = 'Województwo';
		}

		return $fields;
	},
	20
);

/**
 * Polish NIP checksum (10 digits).
 */
function astro_checkout_ui_is_valid_nip( string $nip ): bool {
	if ( ! preg_match( '/^\d{10}$/', $nip ) ) {
		return false;
	}

	$weights = array( 6, 5, 7, 2, 3, 4, 5, 6, 7 );
	$sum     = 0;
	for ( $i = 0; $i < 9; $i++ ) {
		$sum += (int) $nip[ $i ] * $weights[ $i ];
	}

	return ( $sum % 11 ) === (int) $nip[9];
}

/**
 * Require Firma + NIP when "Kupuję jako firma" is checked.
 */
add_action(
	'woocommerce_checkout_process',
	static function (): void {
		if ( ! astro_checkout_ui_should_load() || ! astro_checkout_ui_company_fields_enabled() ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Missing -- Woo handles checkout nonce.
		if ( empty( $_POST['billing_buy_as_company'] ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Missing
		$company = isset( $_POST['billing_company'] ) ? trim( wp_unslash( (string) $_POST['billing_company'] ) ) : '';
		if ( $company === '' ) {
			wc_add_notice( 'Podaj nazwę firmy.', 'error' );
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Missing
		$nip_raw = isset( $_POST['billing_nip'] ) ? wp_unslash( (string) $_POST['billing_nip'] ) : '';
		$nip     = preg_replace( '/\D+/', '', $nip_raw );
		if ( ! is_string( $nip ) || ! astro_checkout_ui_is_valid_nip( $nip ) ) {
			wc_add_notice( 'Podaj prawidłowy NIP (10 cyfr).', 'error' );
		}
	}
);

/**
 * Persist company purchase flag + NIP on the order.
 */
add_action(
	'woocommerce_checkout_create_order',
	static function ( $order ): void {
		if ( ! $order instanceof WC_Order || ! astro_checkout_ui_company_fields_enabled() ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Missing
		$buy_as_company = ! empty( $_POST['billing_buy_as_company'] );
		$order->update_meta_data( '_billing_buy_as_company', $buy_as_company ? 'yes' : 'no' );

		if ( ! $buy_as_company ) {
			$order->delete_meta_data( '_billing_nip' );
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Missing
		$nip_raw = isset( $_POST['billing_nip'] ) ? wp_unslash( (string) $_POST['billing_nip'] ) : '';
		$nip     = preg_replace( '/\D+/', '', $nip_raw );
		if ( is_string( $nip ) && $nip !== '' ) {
			$order->update_meta_data( '_billing_nip', $nip );
		}
	}
);

/**
 * Show NIP in admin order billing block.
 */
add_action(
	'woocommerce_admin_order_data_after_billing_address',
	static function ( $order ): void {
		if ( ! $order instanceof WC_Order ) {
			return;
		}
		$nip = $order->get_meta( '_billing_nip' );
		if ( ! is_string( $nip ) || $nip === '' ) {
			return;
		}
		echo '<p><strong>NIP:</strong> ' . esc_html( $nip ) . '</p>';
	}
);

/**
 * Polish checkout strings.
 */
add_filter(
	'gettext',
	static function ( $translation, $text, $domain ) {
		if ( 'woocommerce' !== $domain || ! astro_checkout_ui_should_load() ) {
			return $translation;
		}

		$map = array(
			'Ship to a different address?' => 'Dostawa na inny adres?',
			'Billing details'              => 'Adres rozliczeniowy',
			'Billing &amp; Shipping'       => 'Dane rozliczeniowe',
			'Your order'                   => 'Twój koszyk',
			'Order notes'                  => 'Opis',
			'Notes about your order, e.g. special notes for delivery.' => 'Opcjonalnie',
			'Country / Region'             => 'Kraj',
			'Country'                      => 'Kraj',
		);

		return $map[ $text ] ?? $translation;
	},
	20,
	3
);
