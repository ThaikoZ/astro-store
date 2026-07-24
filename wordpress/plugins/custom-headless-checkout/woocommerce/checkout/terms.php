<?php
/**
 * Checkout terms / privacy notice with configurable URLs.
 * Checkbox vs notice-only is controlled in WooCommerce → Headless Checkout.
 *
 * @package CustomHeadlessCheckout
 */

defined( 'ABSPATH' ) || exit;

$settings    = function_exists( 'custom_headless_checkout_get_settings' ) ? custom_headless_checkout_get_settings() : array();
$terms_url   = isset( $settings['terms_url'] ) ? (string) $settings['terms_url'] : '';
$privacy_url = isset( $settings['privacy_url'] ) ? (string) $settings['privacy_url'] : '';
$want_checkbox = function_exists( 'custom_headless_checkout_terms_checkbox_enabled' )
	? custom_headless_checkout_terms_checkbox_enabled()
	: ! empty( $settings['terms_checkbox'] );

if ( $terms_url === '' && function_exists( 'wc_terms_and_conditions_page_id' ) ) {
	$terms_id = wc_terms_and_conditions_page_id();
	if ( $terms_id ) {
		$permalink = get_permalink( $terms_id );
		if ( is_string( $permalink ) ) {
			$terms_url = $permalink;
		}
	}
}

if ( $privacy_url === '' && function_exists( 'wc_privacy_policy_page_id' ) ) {
	$privacy_id = wc_privacy_policy_page_id();
	if ( $privacy_id ) {
		$permalink = get_permalink( $privacy_id );
		if ( is_string( $permalink ) ) {
			$privacy_url = $permalink;
		}
	}
}

$has_custom_links = $terms_url !== '' || $privacy_url !== '';
$woo_checkbox     = function_exists( 'wc_terms_and_conditions_checkbox_enabled' ) && wc_terms_and_conditions_checkbox_enabled();
$show_terms       = apply_filters( 'woocommerce_checkout_show_terms', true );
$show_notice      = $show_terms && $has_custom_links;
$show_checkbox    = $show_terms && $want_checkbox && ( $has_custom_links || $woo_checkbox );

if ( ! $show_notice && ! $show_checkbox ) {
	return;
}

$parts = array();
if ( $terms_url !== '' ) {
	$parts[] = '<a href="' . esc_url( $terms_url ) . '" class="woocommerce-terms-and-conditions-link" target="_blank" rel="noopener noreferrer">' . esc_html__( 'regulamin', 'woocommerce' ) . '</a>';
}
if ( $privacy_url !== '' ) {
	$parts[] = '<a href="' . esc_url( $privacy_url ) . '" class="woocommerce-privacy-policy-link" target="_blank" rel="noopener noreferrer">' . esc_html__( 'politykę prywatności', 'woocommerce' ) . '</a>';
}

$links_html = '';
if ( count( $parts ) === 2 ) {
	$links_html = $parts[0] . ' oraz ' . $parts[1];
} elseif ( count( $parts ) === 1 ) {
	$links_html = $parts[0];
}

$checked = apply_filters( 'woocommerce_terms_is_checked_default', isset( $_POST['terms'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
?>
<div class="woocommerce-terms-and-conditions-wrapper astro-pay-terms">
	<?php do_action( 'woocommerce_checkout_before_terms_and_conditions' ); ?>

	<?php if ( $show_notice && $links_html !== '' && ! $show_checkbox ) : ?>
		<p class="form-row astro-pay-terms__text">
			<?php
			echo wp_kses_post(
				sprintf(
					/* translators: %s: linked terms / privacy policy labels */
					'Składając zamówienie, akceptujesz %s.',
					$links_html
				)
			);
			?>
		</p>
	<?php endif; ?>

	<?php if ( $show_checkbox ) : ?>
		<p class="form-row validate-required">
			<label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">
				<input
					type="checkbox"
					class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox"
					name="terms"
					<?php checked( $checked, true ); ?>
					id="terms"
				/>
				<span class="woocommerce-terms-and-conditions-checkbox-text">
					<?php
					if ( $links_html !== '' ) {
						echo wp_kses_post(
							sprintf(
								/* translators: %s: linked terms / privacy */
								'Przeczytałem/am i akceptuję %s',
								$links_html
							)
						);
					} elseif ( function_exists( 'wc_terms_and_conditions_checkbox_text' ) ) {
						wc_terms_and_conditions_checkbox_text();
					} else {
						esc_html_e( 'Przeczytałem/am i akceptuję regulamin', 'woocommerce' );
					}
					?>
				</span>&nbsp;<abbr class="required" title="<?php esc_attr_e( 'required', 'woocommerce' ); ?>">*</abbr>
			</label>
			<input type="hidden" name="terms-field" value="1" />
		</p>
	<?php endif; ?>

	<?php do_action( 'woocommerce_checkout_after_terms_and_conditions' ); ?>
</div>
