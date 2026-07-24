<?php
/**
 * Checkout terms / privacy notice with configurable Astro URLs.
 *
 * @package AstroCheckoutUI
 */

defined( 'ABSPATH' ) || exit;

$settings    = function_exists( 'astro_checkout_ui_get_settings' ) ? astro_checkout_ui_get_settings() : array();
$terms_url   = isset( $settings['terms_url'] ) ? (string) $settings['terms_url'] : '';
$privacy_url = isset( $settings['privacy_url'] ) ? (string) $settings['privacy_url'] : '';

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

if ( $terms_url === '' && $privacy_url === '' ) {
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
} else {
	$links_html = $parts[0];
}
?>
<div class="woocommerce-terms-and-conditions-wrapper astro-pay-terms">
	<?php do_action( 'woocommerce_checkout_before_terms_and_conditions' ); ?>

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

	<?php do_action( 'woocommerce_checkout_after_terms_and_conditions' ); ?>
</div>
