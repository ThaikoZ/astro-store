<?php
/**
 * Payment methods only - terms + place order render in the cart card.
 *
 * Woo AJAX refreshes `.woocommerce-checkout-payment` from this template.
 *
 * @package AstroCheckoutUI
 * @version 3.0.0
 */

defined( 'ABSPATH' ) || exit;

$methods = ASTRO_CHECKOUT_UI_DIR . 'woocommerce/checkout/payment-methods.php';
if ( file_exists( $methods ) ) {
	include $methods;
}
