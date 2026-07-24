<?php
/**
 * Blank checkout shell (card layout lives in form-checkout.php).
 *
 * @package AstroCheckoutUI
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'astro-checkout astro-pay' ); ?>>
	<main class="astro-pay-root" id="astro-checkout-main">
		<?php
		while ( have_posts() ) {
			the_post();
			the_content();
		}
		?>
	</main>
	<?php wp_footer(); ?>
</body>
</html>
