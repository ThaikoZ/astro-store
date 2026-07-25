<?php
/**
 * Point Tutor exit controls at the Astro return URL.
 *
 * Tutor v4 learning area: "Back to dashboard" uses tutor_dashboard_url() → /kopkit/.
 * Legacy spotlight: X / mobile back use course permalink (rewritten via header bridge + JS).
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

	if ( function_exists( 'tutor_utils' ) && method_exists( tutor_utils(), 'is_learning_area' ) && tutor_utils()->is_learning_area() ) {
		return true;
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
 * Tutor v4 learning-area back button calls tutor_dashboard_url() with an empty sub-path.
 * Send that home link to Astro returnTo instead of WP /kopkit/.
 *
 * Sub-routes (e.g. my-courses, settings) are left alone.
 */
add_filter(
	'tutor_dashboard_url',
	static function ( $url, $sub_url = '' ) {
		if ( is_string( $sub_url ) && $sub_url !== '' ) {
			return $url;
		}

		if ( ! custom_tutor_graphql_is_tutor_learner_screen() ) {
			return $url;
		}

		$back = custom_tutor_graphql_return_url();
		return $back !== '' ? $back : $url;
	},
	10,
	2
);

/**
 * Legacy spotlight header bridge (Tutor learning_mode = legacy).
 */
add_filter(
	'tutor_get_template_path',
	static function ( $template_location, $template ) {
		$normalized = str_replace( '\\', '/', (string) $template );
		if ( $normalized !== 'single/common/header' ) {
			return $template_location;
		}

		$bridge = CUSTOM_TUTOR_GRAPHQL_DIR . 'templates/single/common/header-bridge.php';
		if ( ! file_exists( $bridge ) ) {
			return $template_location;
		}

		if ( custom_tutor_graphql_return_url() === '' ) {
			static $logged = false;
			if ( ! $logged ) {
				error_log( 'LMS Tutor GraphQL: ASTRO_APP_ORIGIN is empty; exit controls cannot return to Astro.' );
				$logged = true;
			}
			return $template_location;
		}

		return $bridge;
	},
	10,
	2
);

add_action(
	'wp_footer',
	static function (): void {
		if ( ! custom_tutor_graphql_is_tutor_learner_screen() ) {
			return;
		}

		$back_url = custom_tutor_graphql_return_url();
		if ( $back_url === '' ) {
			static $logged = false;
			if ( ! $logged ) {
				error_log( 'LMS Tutor GraphQL: ASTRO_APP_ORIGIN is empty; exit controls cannot return to Astro.' );
				$logged = true;
			}
			return;
		}

		$back_json = wp_json_encode( $back_url );
		if ( ! is_string( $back_json ) || $back_json === '' ) {
			return;
		}

		echo "<script id=\"custom-tutor-graphql-back\">\n";
		echo '(function(){';
		echo 'var back=' . $back_json . ';'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo 'if(!back)return;';
		// Keep Tutor JS globals aligned with the Astro return URL.
		echo 'try{';
		echo 'if(window._tutorobject){window._tutorobject.tutor_frontend_dashboard_url=back;}';
		echo 'if(window.TutorCore&&window.TutorCore.config&&window.TutorCore.config.tutorConfig){window.TutorCore.config.tutorConfig.tutor_frontend_dashboard_url=back;}';
		echo '}catch(e){}';
		echo 'function tag(){';
		// Tutor v4 learning area: Back to dashboard.
		echo 'var v4=document.querySelectorAll(".tutor-learning-header-back a");';
		echo 'for(var v=0;v<v4.length;v++){';
		echo 'v4[v].setAttribute("href",back);';
		echo 'v4[v].setAttribute("data-ctg-back","1");';
		echo 'v4[v].setAttribute("aria-label","Wróć do konta");';
		echo '}';
		// Legacy spotlight X / mobile back.
		echo 'var bar=document.querySelector(".tutor-single-page-top-bar,.tutor-course-topic-single-header");';
		echo 'if(bar){';
		echo 'var links=bar.querySelectorAll("a");';
		echo 'for(var i=0;i<links.length;i++){';
		echo 'var a=links[i];';
		echo 'if(!a||a.getAttribute("data-ctg-back")==="1")continue;';
		echo 'if(a.querySelector(".tutor-icon-times")||a.querySelector(".tutor-icon-previous")){';
		echo 'a.setAttribute("href",back);';
		echo 'a.setAttribute("data-ctg-back","1");';
		echo 'a.setAttribute("aria-label","Wróć do konta");';
		echo '}}}';
		echo '}';
		echo 'tag();';
		echo 'document.addEventListener("click",function(e){';
		echo 'var a=e.target&&e.target.closest?e.target.closest("a[data-ctg-back=\'1\'],.tutor-learning-header-back a"):null;';
		echo 'if(!a)return;';
		echo 'e.preventDefault();';
		echo 'e.stopPropagation();';
		echo 'window.location.href=back;';
		echo '},true);';
		echo 'if(window.MutationObserver){';
		echo 'var mo=new MutationObserver(function(){tag();});';
		echo 'mo.observe(document.documentElement,{childList:true,subtree:true});';
		echo '}';
		echo '})();';
		echo "\n</script>\n";
	},
	5
);
