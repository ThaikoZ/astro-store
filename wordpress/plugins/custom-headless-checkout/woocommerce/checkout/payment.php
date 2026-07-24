<?php
/**
 * Payment methods only - terms + place order render in the cart card.
 *
 * Woo AJAX refreshes `.woocommerce-checkout-payment` from this template.
 *
 * @package CustomHeadlessCheckout
 * @version 3.0.0
 */

defined( 'ABSPATH' ) || exit;

$methods = CUSTOM_HEADLESS_CHECKOUT_DIR . 'woocommerce/checkout/payment-methods.php';
if ( file_exists( $methods ) ) {
	include $methods;
}
