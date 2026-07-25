<?php
/**
 * Thin bridge over Tutor's single/common/header.php.
 *
 * Loads upstream markup (no logic fork), then rewrites the native exit
 * controls (mobile back / desktop X) to the Astro return URL.
 *
 * @package CustomTutorGraphQL
 */

defined( 'ABSPATH' ) || exit;

$ctg_upstream = trailingslashit( tutor()->path ) . 'templates/single/common/header.php';
if ( ! file_exists( $ctg_upstream ) ) {
	return;
}

$ctg_back = function_exists( 'custom_tutor_graphql_return_url' )
	? custom_tutor_graphql_return_url()
	: '';

ob_start();
include $ctg_upstream;
$ctg_html = (string) ob_get_clean();

if ( $ctg_back === '' || $ctg_html === '' ) {
	echo $ctg_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	return;
}

$ctg_back_esc = esc_url( $ctg_back );

/**
 * Rewrite exit anchors that wrap a Tutor icon span.
 *
 * @param string $html       Header HTML.
 * @param string $icon_class Icon class (e.g. tutor-icon-previous).
 * @param string $href       Escaped absolute return URL.
 */
$ctg_rewrite_icon_link = static function ( string $html, string $icon_class, string $href ): string {
	$pattern = '/<a\b([^>]*)>(\s*<span\b[^>]*\b'
		. preg_quote( $icon_class, '/' )
		. '\b[^>]*>\s*<\/span>\s*)<\/a>/i';

	$replaced = preg_replace_callback(
		$pattern,
		static function ( array $m ) use ( $href ): string {
			$attrs = $m[1];
			$inner = $m[2];

			if ( preg_match( '/\bhref\s*=\s*(["\'])([^"\']*)\1/i', $attrs ) ) {
				$attrs = (string) preg_replace(
					'/\bhref\s*=\s*(["\'])([^"\']*)\1/i',
					'href="' . $href . '"',
					$attrs,
					1
				);
			} else {
				$attrs .= ' href="' . $href . '"';
			}

			if ( ! preg_match( '/\bdata-ctg-back\s*=/', $attrs ) ) {
				$attrs .= ' data-ctg-back="1"';
			}

			if ( ! preg_match( '/\baria-label\s*=/', $attrs ) ) {
				$attrs .= ' aria-label="' . esc_attr__( 'Wróć do konta', 'custom-tutor-graphql' ) . '"';
			}

			return '<a' . $attrs . '>' . $inner . '</a>';
		},
		$html,
		1
	);

	return is_string( $replaced ) ? $replaced : $html;
};

$ctg_html = $ctg_rewrite_icon_link( $ctg_html, 'tutor-icon-previous', $ctg_back_esc );
$ctg_html = $ctg_rewrite_icon_link( $ctg_html, 'tutor-icon-times', $ctg_back_esc );

echo $ctg_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
