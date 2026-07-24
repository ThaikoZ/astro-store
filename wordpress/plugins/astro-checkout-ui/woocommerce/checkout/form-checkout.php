<?php
/**
 * Brand card checkout: form left, cart right.
 *
 * @package AstroCheckoutUI
 * @version 3.1.0
 */

defined( 'ABSPATH' ) || exit;

$brand_url = home_url( '/' );
if ( function_exists( 'astro_headless_checkout_app_origin' ) ) {
	$astro_origin = astro_headless_checkout_app_origin();
	if ( $astro_origin !== '' ) {
		$brand_url = trailingslashit( $astro_origin );
	}
}

$needs_shipping = WC()->cart && WC()->cart->needs_shipping();
$show_shipping  = $needs_shipping && WC()->cart->show_shipping();

do_action( 'woocommerce_before_checkout_form', $checkout );

$auth_required = function_exists( 'astro_checkout_ui_auth_required' ) && astro_checkout_ui_auth_required();
$woo_requires_login = ! $checkout->is_registration_enabled() && $checkout->is_registration_required();

if ( ( $auth_required || $woo_requires_login ) && ! is_user_logged_in() ) {
	$login_url = $brand_url . 'logowanie/?redirect=checkout';
	echo '<div class="astro-pay-shell">';
	echo '<div class="astro-pay-card astro-pay-card--form">';
	echo '<p>Aby przejść do kasy, zaloguj się na swoje konto.</p>';
	echo '<p><a class="button" href="' . esc_url( $login_url ) . '">Zaloguj się</a></p>';
	echo '</div></div>';
	return;
}
?>

<form class="checkout_coupon woocommerce-form-coupon astro-pay-coupon-native" method="post" aria-hidden="true" tabindex="-1">
	<input type="text" name="coupon_code" class="input-text" id="astro_native_coupon_code" value="" />
	<button type="submit" name="apply_coupon" value="<?php esc_attr_e( 'Zastosuj', 'woocommerce' ); ?>"><?php esc_html_e( 'Zastosuj', 'woocommerce' ); ?></button>
</form>

<form name="checkout" method="post" class="checkout woocommerce-checkout astro-pay-checkout" action="<?php echo esc_url( wc_get_checkout_url() ); ?>" enctype="multipart/form-data" aria-label="<?php echo esc_attr__( 'Checkout', 'woocommerce' ); ?>">

	<div class="astro-pay-shell">
		<div class="astro-pay-notices" data-astro-notices aria-live="polite"></div>
		<div class="astro-pay-layout">

			<section class="astro-pay-card astro-pay-card--form" aria-label="<?php echo esc_attr__( 'Dane i płatność', 'woocommerce' ); ?>">
				<a class="astro-pay-back" href="<?php echo esc_url( $brand_url ); ?>">
					<span aria-hidden="true">&larr;</span>
					<span>Klaudia Jaranowska</span>
				</a>

				<?php if ( $checkout->get_checkout_fields() ) : ?>
					<?php do_action( 'woocommerce_checkout_before_customer_details' ); ?>

					<div class="astro-pay-section" id="customer_details">
						<h2 class="astro-pay-card__title"><?php esc_html_e( 'Dane zamawiającego', 'woocommerce' ); ?></h2>
						<div class="astro-pay-billing">
							<?php do_action( 'woocommerce_checkout_billing' ); ?>
						</div>
					</div>

					<div class="astro-pay-section astro-pay-shipping<?php echo $needs_shipping ? '' : ' astro-pay-shipping--notes-only'; ?>">
						<?php if ( $needs_shipping ) : ?>
							<h2 class="astro-pay-section__title"><?php esc_html_e( 'Adres dostawy', 'woocommerce' ); ?></h2>
						<?php endif; ?>
						<?php do_action( 'woocommerce_checkout_shipping' ); ?>
					</div>

					<?php if ( $show_shipping ) : ?>
						<div class="astro-pay-section astro-pay-shipping-methods" data-astro-shipping-methods>
							<h2 class="astro-pay-section__title"><?php esc_html_e( 'Dostawa', 'woocommerce' ); ?></h2>
							<?php
							do_action( 'woocommerce_review_order_before_shipping' );
							wc_cart_totals_shipping_html();
							do_action( 'woocommerce_review_order_after_shipping' );
							?>
						</div>
					<?php endif; ?>

					<?php do_action( 'woocommerce_checkout_after_customer_details' ); ?>
				<?php endif; ?>

				<div class="astro-pay-section astro-pay-section--payment">
					<h2 class="astro-pay-section__title"><?php esc_html_e( 'Metoda płatności', 'woocommerce' ); ?></h2>
					<?php wc_get_template( 'checkout/payment.php' ); ?>
				</div>
			</section>

			<aside class="astro-pay-card astro-pay-card--cart" aria-label="<?php echo esc_attr__( 'Twój koszyk', 'woocommerce' ); ?>">
				<h2 class="astro-pay-card__title"><?php esc_html_e( 'Twój koszyk', 'woocommerce' ); ?></h2>

				<?php do_action( 'woocommerce_checkout_before_order_review_heading' ); ?>
				<?php do_action( 'woocommerce_checkout_before_order_review' ); ?>

				<div id="order_review" class="woocommerce-checkout-review-order astro-pay-review">
					<?php woocommerce_order_review(); ?>
				</div>

				<?php do_action( 'woocommerce_checkout_after_order_review' ); ?>

				<div class="astro-pay-coupon" data-astro-coupon>
					<div class="astro-pay-coupon__panel">
						<input
							type="text"
							class="astro-pay-coupon__input"
							data-astro-coupon-input
							placeholder="<?php esc_attr_e( 'Kod rabatowy', 'woocommerce' ); ?>"
							autocomplete="off"
						/>
						<button type="button" class="astro-pay-coupon__apply" data-astro-coupon-apply>
							<?php esc_html_e( 'Zastosuj', 'woocommerce' ); ?>
						</button>
					</div>
				</div>

				<?php
				$place = ASTRO_CHECKOUT_UI_DIR . 'woocommerce/checkout/place-order.php';
				if ( file_exists( $place ) ) {
					include $place;
				}
				?>
			</aside>

		</div>
	</div>

</form>

<?php
do_action( 'woocommerce_after_checkout_form', $checkout );
