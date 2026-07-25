<?php
/**
 * Point Tutor's built-in lesson exit controls at the Astro return URL.
 *
 * Tutor header X / mobile back normally go to the course page (or dashboard).
 * We override the header template and keep a small JS fallback.
 *
 * @package CustomTutorGraphQL
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Whether the current request is a Tutor learner content screen.
 */
function custom_tutor_graphql_is_tutor_learner_screen(): bool {
	if ( ! function_exists( 'tutor' ) ) {
		return false;
	}

	$tutor = tutor();
	$types = array_filter(
		array(
			! empty( $tutor->course_post_type ) ? (string) $tutor->course_post_type : 'courses',
			! empty( $tutor->lesson_post_type ) ? (string) $tutor->lesson_post_type : 'lesson',
			'tutor_quiz',
			'tutor_assignments',
		)
	);

	return is_singular( $types );
}

/**
 * Override Tutor lesson header so exit buttons use Astro returnTo.
 */
add_filter(
	'tutor_get_template_path',
	static function ( $template_location, $template ) {
		$normalized = str_replace( '\\', '/', (string) $template );
		if ( $normalized !== 'single/common/header' ) {
			return $template_location;
		}

		$custom = CUSTOM_TUTOR_GRAPHQL_DIR . 'templates/single/common/header.php';
		return file_exists( $custom ) ? $custom : $template_location;
	},
	20,
	2
);

/**
 * If something still links to Tutor dashboard / course exit, send learners to Astro.
 */
add_filter(
	'tutor_dashboard_url',
	static function ( $url ) {
		if ( ! custom_tutor_graphql_is_tutor_learner_screen() ) {
			return $url;
		}

		$back = custom_tutor_graphql_return_url();
		return $back !== '' ? $back : $url;
	},
	20
);

add_action(
	'wp_enqueue_scripts',
	static function (): void {
		if ( ! custom_tutor_graphql_is_tutor_learner_screen() ) {
			return;
		}

		$back_url = custom_tutor_graphql_return_url();
		if ( $back_url === '' ) {
			return;
		}

		// Fallback: rewrite Tutor exit / home controls that still point at course or kokpit.
		$js = sprintf(
			<<<'JS'
(function () {
  var back = %s;
  if (!back) return;

  function shouldRewrite(a) {
    if (!a || !a.getAttribute) return false;
    if (a.getAttribute("data-ctg-back") === "1") return true;
    var cls = (a.className || "").toString();
    if (cls.indexOf("tutor-topbar-home-btn") !== -1) return true;
    if (cls.indexOf("tutor-course-spotlight-close") !== -1) return true;
    var icon = a.querySelector(".tutor-icon-times, .tutor-icon-previous");
    var inHeader = a.closest(".tutor-single-page-top-bar, .tutor-course-topic-single-header");
    return Boolean(icon && inHeader);
  }

  document.addEventListener(
    "click",
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!shouldRewrite(a)) return;
      e.preventDefault();
      window.location.href = back;
    },
    true
  );
})();
JS
			,
			wp_json_encode( $back_url )
		);

		wp_register_script( 'custom-tutor-graphql-back', false, array(), CUSTOM_TUTOR_GRAPHQL_VERSION, true );
		wp_enqueue_script( 'custom-tutor-graphql-back' );
		wp_add_inline_script( 'custom-tutor-graphql-back', $js );
	}
);
