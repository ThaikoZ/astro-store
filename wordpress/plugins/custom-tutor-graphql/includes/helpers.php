<?php
/**
 * Shared helpers for LMS Tutor GraphQL.
 *
 * @package CustomTutorGraphQL
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Storefront (Astro) origin for back links and REST CORS.
 */
function custom_tutor_graphql_app_origin(): string {
	if ( function_exists( 'custom_headless_checkout_app_origin' ) ) {
		$origin = custom_headless_checkout_app_origin();
		if ( $origin !== '' ) {
			return $origin;
		}
	}

	if ( defined( 'ASTRO_APP_ORIGIN' ) && ASTRO_APP_ORIGIN ) {
		return untrailingslashit( (string) ASTRO_APP_ORIGIN );
	}

	if ( defined( 'CUSTOM_CHECKOUT_APP_ORIGIN' ) && CUSTOM_CHECKOUT_APP_ORIGIN ) {
		return untrailingslashit( (string) CUSTOM_CHECKOUT_APP_ORIGIN );
	}

	$option = get_option( 'astro_app_origin', '' );
	if ( is_string( $option ) && $option !== '' ) {
		return untrailingslashit( $option );
	}

	return '';
}

/**
 * Astro account Kursy tab URL.
 */
function custom_tutor_graphql_account_courses_url(): string {
	$origin = custom_tutor_graphql_app_origin();
	if ( $origin === '' ) {
		return '';
	}

	return $origin . '/moje-konto/?tab=kursy';
}

/**
 * Whether a return URL is safe: same host as ASTRO_APP_ORIGIN and under /moje-konto.
 */
function custom_tutor_graphql_is_safe_return_url( string $url ): bool {
	$url = esc_url_raw( $url );
	if ( $url === '' ) {
		return false;
	}

	$origin = custom_tutor_graphql_app_origin();
	if ( $origin === '' ) {
		return false;
	}

	$parts        = wp_parse_url( $url );
	$origin_parts = wp_parse_url( $origin );
	if ( ! is_array( $parts ) || ! is_array( $origin_parts ) || empty( $parts['host'] ) || empty( $origin_parts['host'] ) ) {
		return false;
	}

	$scheme = isset( $parts['scheme'] ) ? strtolower( (string) $parts['scheme'] ) : '';
	if ( $scheme !== '' && $scheme !== 'http' && $scheme !== 'https' ) {
		return false;
	}

	if ( ! empty( $parts['user'] ) || ! empty( $parts['pass'] ) ) {
		return false;
	}

	if ( strtolower( (string) $parts['host'] ) !== strtolower( (string) $origin_parts['host'] ) ) {
		return false;
	}

	$path = isset( $parts['path'] ) ? (string) $parts['path'] : '/';
	if ( $path === '' ) {
		$path = '/';
	}
	$path = '/' . ltrim( $path, '/' );
	$path = rtrim( $path, '/' );
	if ( $path === '' ) {
		$path = '/';
	}

	return $path === '/moje-konto' || str_starts_with( $path . '/', '/moje-konto/' );
}

/**
 * Resolve Tutor course id from a course/lesson/quiz/assignment URL.
 */
function custom_tutor_graphql_course_id_from_url( string $url ): int {
	$url = esc_url_raw( $url );
	if ( $url === '' ) {
		return 0;
	}

	$post_id = url_to_postid( $url );
	if ( $post_id <= 0 ) {
		return 0;
	}

	$post_type   = (string) get_post_type( $post_id );
	$course_type = function_exists( 'tutor' ) && ! empty( tutor()->course_post_type )
		? (string) tutor()->course_post_type
		: 'courses';

	if ( $post_type === $course_type || $post_type === 'courses' ) {
		return $post_id;
	}

	if ( ! function_exists( 'tutor_utils' ) ) {
		return 0;
	}

	foreach ( array( 'lesson', 'quiz', 'assignment' ) as $content_type ) {
		$maybe = tutor_utils()->get_course_id_by( $content_type, $post_id );
		if ( $maybe ) {
			return absint( $maybe );
		}
	}

	return 0;
}

/**
 * Whether the user is enrolled for the Tutor content at $url.
 */
function custom_tutor_graphql_user_enrolled_for_url( int $user_id, string $url ): bool {
	if ( $user_id <= 0 || ! function_exists( 'tutor_utils' ) ) {
		return false;
	}

	$course_id = custom_tutor_graphql_course_id_from_url( $url );
	if ( $course_id <= 0 ) {
		return false;
	}

	return (bool) tutor_utils()->is_enrolled( $course_id, $user_id );
}

/**
 * Client IP for handoff rate limiting.
 */
function custom_tutor_graphql_client_ip(): string {
	$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? (string) wp_unslash( $_SERVER['REMOTE_ADDR'] ) : '';
	$ip = trim( $ip );
	return $ip !== '' ? $ip : '0.0.0.0';
}

/**
 * Transient key for failed handoff auth attempts.
 */
function custom_tutor_graphql_handoff_fail_key(): string {
	return 'ctg_handoff_fail_' . hash( 'sha256', custom_tutor_graphql_client_ip() );
}

/**
 * Whether handoff auth is currently rate-limited for this client.
 */
function custom_tutor_graphql_handoff_is_rate_limited(): bool {
	$count = (int) get_transient( custom_tutor_graphql_handoff_fail_key() );
	return $count >= 20;
}

/**
 * Record a failed handoff JWT validation.
 */
function custom_tutor_graphql_handoff_record_failure(): void {
	$key   = custom_tutor_graphql_handoff_fail_key();
	$count = (int) get_transient( $key );
	set_transient( $key, $count + 1, 15 * MINUTE_IN_SECONDS );
}

/**
 * Clear failed handoff counter after successful auth.
 */
function custom_tutor_graphql_handoff_clear_failures(): void {
	delete_transient( custom_tutor_graphql_handoff_fail_key() );
}

/**
 * Return URL for Tutor back control (cookie override, then default Kursy tab).
 */
function custom_tutor_graphql_return_url(): string {
	if ( ! empty( $_COOKIE['ctg_return_to'] ) ) {
		$cookie = esc_url_raw( wp_unslash( (string) $_COOKIE['ctg_return_to'] ) );
		if ( custom_tutor_graphql_is_safe_return_url( $cookie ) ) {
			return $cookie;
		}
	}

	return custom_tutor_graphql_account_courses_url();
}

/**
 * Persist return URL for the WP session (read by the Tutor back bar).
 */
function custom_tutor_graphql_set_return_cookie( string $return_to ): void {
	if ( ! custom_tutor_graphql_is_safe_return_url( $return_to ) ) {
		$return_to = custom_tutor_graphql_account_courses_url();
	}
	if ( $return_to === '' ) {
		return;
	}

	$expire = time() + WEEK_IN_SECONDS;
	setcookie(
		'ctg_return_to',
		$return_to,
		array(
			'expires'  => $expire,
			'path'     => '/',
			'secure'   => is_ssl(),
			'httponly' => true,
			'samesite' => 'Lax',
		)
	);
	$_COOKIE['ctg_return_to'] = $return_to;
}

/**
 * Continue URL: first incomplete lesson for the user, else course permalink.
 */
function custom_tutor_graphql_continue_url( int $course_id, int $user_id ): string {
	$course_id = absint( $course_id );
	$user_id   = absint( $user_id );
	$fallback  = $course_id > 0 ? (string) get_permalink( $course_id ) : '';

	if ( $course_id <= 0 || $user_id <= 0 || ! function_exists( 'tutor_utils' ) ) {
		return $fallback;
	}

	$previous = get_current_user_id();
	wp_set_current_user( $user_id );
	$lesson_url = tutor_utils()->get_course_first_lesson( $course_id );
	wp_set_current_user( $previous );

	if ( is_string( $lesson_url ) && $lesson_url !== '' ) {
		return $lesson_url;
	}

	return $fallback;
}

/**
 * If $url points at a course, upgrade to the continue/lesson URL for $user_id.
 */
function custom_tutor_graphql_resolve_learner_entry_url( string $url, int $user_id ): string {
	$url = esc_url_raw( $url );
	if ( $url === '' || $user_id <= 0 ) {
		return $url;
	}

	$post_id = url_to_postid( $url );
	if ( $post_id <= 0 ) {
		return $url;
	}

	$post_type   = (string) get_post_type( $post_id );
	$course_type = function_exists( 'tutor' ) && ! empty( tutor()->course_post_type )
		? (string) tutor()->course_post_type
		: 'courses';

	if ( $post_type !== $course_type && $post_type !== 'courses' ) {
		// Already a lesson/quiz/assignment URL.
		return $url;
	}

	$continue = custom_tutor_graphql_continue_url( $post_id, $user_id );
	return $continue !== '' ? $continue : $url;
}

/**
 * Validate a WPGraphQL JWT and return the WordPress user id, or 0.
 */
function custom_tutor_graphql_user_id_from_token( string $token ): int {
	if ( function_exists( 'custom_headless_checkout_user_id_from_token' ) ) {
		return custom_headless_checkout_user_id_from_token( $token );
	}

	$token = trim( $token );
	if ( $token === '' ) {
		return 0;
	}

	if ( class_exists( '\WPGraphQL\JWT_Authentication\Auth' ) ) {
		$decoded = \WPGraphQL\JWT_Authentication\Auth::validate_token( $token );
		if ( ! is_wp_error( $decoded ) && is_object( $decoded ) && isset( $decoded->data->user->id ) ) {
			return absint( $decoded->data->user->id );
		}
	}

	return 0;
}

/**
 * Log the learner into WordPress.
 */
function custom_tutor_graphql_login_user( int $user_id, bool $remember = false ): bool {
	if ( function_exists( 'custom_headless_checkout_login_user' ) ) {
		return custom_headless_checkout_login_user( $user_id, $remember );
	}

	$user = get_user_by( 'id', $user_id );
	if ( ! $user ) {
		return false;
	}

	wp_set_current_user( $user_id );
	wp_set_auth_cookie( $user_id, $remember );

	return true;
}

/**
 * Whether a redirect target is a safe same-site Tutor learning URL.
 */
function custom_tutor_graphql_is_safe_tutor_redirect( string $url ): bool {
	$url = esc_url_raw( $url );
	if ( $url === '' ) {
		return false;
	}

	$parts = wp_parse_url( $url );
	if ( ! is_array( $parts ) || empty( $parts['host'] ) ) {
		return false;
	}

	$home = wp_parse_url( home_url( '/' ) );
	if ( ! is_array( $home ) || empty( $home['host'] ) ) {
		return false;
	}

	if ( strtolower( (string) $parts['host'] ) !== strtolower( (string) $home['host'] ) ) {
		return false;
	}

	$path = isset( $parts['path'] ) ? (string) $parts['path'] : '/';
	if ( $path === '' || $path === '/' ) {
		return false;
	}

	// Resolve to a post and ensure it is a Tutor content type.
	$post_id = url_to_postid( $url );
	if ( $post_id <= 0 ) {
		return false;
	}

	$post_type = get_post_type( $post_id );
	$allowed   = array( 'courses', 'lesson', 'tutor_quiz', 'tutor_assignments', 'topics' );
	if ( function_exists( 'tutor' ) ) {
		$tutor = tutor();
		if ( is_object( $tutor ) ) {
			if ( ! empty( $tutor->course_post_type ) ) {
				$allowed[] = (string) $tutor->course_post_type;
			}
			if ( ! empty( $tutor->lesson_post_type ) ) {
				$allowed[] = (string) $tutor->lesson_post_type;
			}
		}
	}

	return in_array( (string) $post_type, array_unique( $allowed ), true );
}

/**
 * Progress percent for a course/user (0-100).
 */
function custom_tutor_graphql_course_progress( int $course_id, int $user_id ): float {
	if ( $course_id <= 0 || $user_id <= 0 || ! function_exists( 'tutor_utils' ) ) {
		return 0.0;
	}

	$percent = tutor_utils()->get_course_completed_percent( $course_id, $user_id, false );
	if ( is_array( $percent ) && isset( $percent['completed_percent'] ) ) {
		return (float) $percent['completed_percent'];
	}

	return (float) $percent;
}

/**
 * Build enrolled-course payload for GraphQL.
 *
 * @return array<int, array<string, mixed>>
 */
function custom_tutor_graphql_enrolled_courses_for_user( int $user_id ): array {
	if ( $user_id <= 0 || ! function_exists( 'tutor_utils' ) ) {
		return array();
	}

	$course_ids = tutor_utils()->get_enrolled_courses_ids_by_user( $user_id );
	if ( ! is_array( $course_ids ) || $course_ids === array() ) {
		return array();
	}

	$items = array();
	foreach ( $course_ids as $course_id ) {
		$course_id = absint( $course_id );
		if ( $course_id <= 0 ) {
			continue;
		}

		$post = get_post( $course_id );
		if ( ! $post || $post->post_status !== 'publish' ) {
			continue;
		}

		$thumb_id  = (int) get_post_thumbnail_id( $course_id );
		$thumb_url = $thumb_id > 0 ? wp_get_attachment_image_url( $thumb_id, 'medium_large' ) : '';
		$progress  = custom_tutor_graphql_course_progress( $course_id, $user_id );
		$completed = function_exists( 'tutor_utils' )
			? (bool) tutor_utils()->is_completed_course( $course_id, $user_id )
			: $progress >= 100;

		$course_url = (string) get_permalink( $course_id );
		$continue   = custom_tutor_graphql_continue_url( $course_id, $user_id );

		$items[] = array(
			'databaseId'        => $course_id,
			'title'             => get_the_title( $course_id ),
			'slug'              => $post->post_name,
			'thumbnailUrl'      => is_string( $thumb_url ) ? $thumb_url : '',
			'progressPercent'   => $progress,
			'isCompleted'       => $completed,
			'tutorPermalink'    => $course_url,
			'continuePermalink' => $continue !== '' ? $continue : $course_url,
		);
	}

	return $items;
}
