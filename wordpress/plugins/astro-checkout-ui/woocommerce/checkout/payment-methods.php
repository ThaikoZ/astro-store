<?php
/**
 * Payment methods list only (place-order lives in the cart card).
 *
 * @package AstroCheckoutUI
 */

defined( 'ABSPATH' ) || exit;

if ( WC()->cart && WC()->cart->needs_payment() ) {
	$available_gateways = WC()->payment_gateways()->get_available_payment_gateways();
	WC()->payment_gateways()->set_current_gateway( $available_gateways );
} else {
	$available_gateways = array();
}
?>
<div id="payment" class="woocommerce-checkout-payment astro-pay-payment-methods">
	<?php if ( WC()->cart && WC()->cart->needs_payment() ) : ?>
		<ul class="wc_payment_methods payment_methods methods">
			<?php
			if ( ! empty( $available_gateways ) ) {
				foreach ( $available_gateways as $gateway ) {
					wc_get_template( 'checkout/payment-method.php', array( 'gateway' => $gateway ) );
				}
			} else {
				echo '<li>';
				wc_print_notice(
					apply_filters(
						'woocommerce_no_available_payment_methods_message',
						WC()->customer->get_billing_country()
							? esc_html__( 'Sorry, it seems that there are no available payment methods. Please contact us if you require assistance or wish to make alternate arrangements.', 'woocommerce' )
							: esc_html__( 'Please fill in your details above to see available payment methods.', 'woocommerce' )
					),
					'notice'
				);
				echo '</li>';
			}
			?>
		</ul>
	<?php endif; ?>
</div>
