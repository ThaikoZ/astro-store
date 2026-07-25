<?php
/**
 * JWT → WordPress session handoff into Tutor lesson URLs.
 *
 * @package CustomTutorGraphQL
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const CUSTOM_TUTOR_HANDOFF_TTL = 60;

/**
 * Create a one-time Tutor handoff code.
 */
function custom_tutor_graphql_create_handoff( int $user_id, string $redirect_to, bool $remember, string $return_to ): string {
	$code = bin2hex( random_bytes( 16 ) );
	set_transient(
		'ctg_handoff_' . $code,
		array(
			'user_id'     => $user_id,
			'redirect_to' => $redirect_to,
			'return_to'   => $return_to,
			'remember'    => $remember,
			'exp'         => time() + CUSTOM_TUTOR_HANDOFF_TTL,
		),
		CUSTOM_TUTOR_HANDOFF_TTL
	);
	return $code;
}

/**
 * Redirect to storefront login when Tutor handoff fails.
 */
function custom_tutor_graphql_auth_error_redirect(): void {
	$origin = custom_tutor_graphql_app_origin();
	if ( $origin === '' ) {
		wp_safe_redirect( home_url( '/' ) );
		exit;
	}

	wp_safe_redirect( $origin . '/logowanie/?redirect=kursy&auth_error=handoff' );
	exit;
}

/**
 * CORS origin for Tutor handoff REST.
 */
function custom_tutor_graphql_cors_origin(): string {
	$origin         = custom_tutor_graphql_app_origin();
	$request_origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? esc_url_raw( wp_unslash( (string) $_SERVER['HTTP_ORIGIN'] ) ) : '';
	if ( $origin !== '' && $request_origin !== '' && untrailingslashit( $request_origin ) === $origin ) {
		return $request_origin;
	}
	return $origin;
}

/**
 * Allow Astro host for wp_safe_redirect back links.
 */
add_filter(
	'allowed_redirect_hosts',
	static function ( array $hosts ): array {
		$origin = custom_tutor_graphql_app_origin();
		if ( $origin === '' ) {
			return $hosts;
		}

		$parts = wp_parse_url( $origin );
		if ( is_array( $parts ) && ! empty( $parts['host'] ) ) {
			$hosts[] = (string) $parts['host'];
		}

		return array_values( array_unique( $hosts ) );
	}
);

add_action(
	'rest_api_init',
	static function (): void {
		register_rest_route(
			'custom-tutor/v1',
			'/handoff',
			array(
				array(
					'methods'             => 'POST',
					'permission_callback' => '__return_true',
					'callback'            => static function ( WP_REST_Request $request ) {
						if ( custom_tutor_graphql_app_origin() === '' ) {
							return new WP_Error(
								'ctg_origin_missing',
								'ASTRO_APP_ORIGIN is not configured.',
								array( 'status' => 503 )
							);
						}

						if ( custom_tutor_graphql_handoff_is_rate_limited() ) {
							return new WP_Error(
								'ctg_handoff_rate_limited',
								'Too many failed handoff attempts. Try again later.',
								array( 'status' => 429 )
							);
						}

						$body = $request->get_json_params();
						if ( ! is_array( $body ) ) {
							$body = array();
						}

						$auth_token  = isset( $body['authToken'] ) ? (string) $body['authToken'] : '';
						$remember    = ! empty( $body['remember'] );
						$redirect_to = isset( $body['redirectTo'] ) ? esc_url_raw( (string) $body['redirectTo'] ) : '';
						$return_to   = isset( $body['returnTo'] ) ? esc_url_raw( (string) $body['returnTo'] ) : '';

						$user_id = custom_tutor_graphql_user_id_from_token( $auth_token );
						if ( $user_id <= 0 ) {
							custom_tutor_graphql_handoff_record_failure();
							return new WP_Error(
								'ctg_handoff_invalid',
								'Invalid or expired auth token.',
								array( 'status' => 401 )
							);
						}

						custom_tutor_graphql_handoff_clear_failures();

						if ( ! custom_tutor_graphql_is_safe_tutor_redirect( $redirect_to ) ) {
							return new WP_Error(
								'ctg_handoff_redirect',
								'Invalid Tutor redirect URL.',
								array( 'status' => 400 )
							);
						}

						if ( $return_to === '' || ! custom_tutor_graphql_is_safe_return_url( $return_to ) ) {
							$return_to = custom_tutor_graphql_account_courses_url();
						}

						if ( ! custom_tutor_graphql_user_enrolled_for_url( $user_id, $redirect_to ) ) {
							return new WP_Error(
								'ctg_handoff_forbidden',
								'User is not enrolled in this course.',
								array( 'status' => 403 )
							);
						}

						// Prefer next unfinished lesson over course landing page.
						$redirect_to = custom_tutor_graphql_resolve_learner_entry_url( $redirect_to, $user_id );

						if ( ! custom_tutor_graphql_is_safe_tutor_redirect( $redirect_to ) ) {
							return new WP_Error(
								'ctg_handoff_redirect',
								'Invalid Tutor lesson redirect URL.',
								array( 'status' => 400 )
							);
						}

						$code = custom_tutor_graphql_create_handoff( $user_id, $redirect_to, $remember, $return_to );
						return rest_ensure_response(
							array(
								'handoff' => $code,
								'url'     => home_url( '/?tutor_handoff=' . rawurlencode( $code ) ),
							)
						);
					},
				),
				array(
					'methods'             => 'OPTIONS',
					'permission_callback' => '__return_true',
					'callback'            => static function () {
						return new WP_REST_Response( null, 204 );
					},
				),
			)
		);
	}
);

add_filter(
	'rest_pre_serve_request',
	static function ( $served, $result, $request, $server ) {
		unset( $result, $server );
		if ( ! $request instanceof WP_REST_Request ) {
			return $served;
		}

		if ( $request->get_route() !== '/custom-tutor/v1/handoff' ) {
			return $served;
		}

		$allow = custom_tutor_graphql_cors_origin();
		if ( $allow !== '' ) {
			header( 'Access-Control-Allow-Origin: ' . $allow );
			header( 'Access-Control-Allow-Methods: POST, OPTIONS' );
			header( 'Access-Control-Allow-Headers: Content-Type, Accept' );
			header( 'Vary: Origin' );
		}

		return $served;
	},
	10,
	4
);

/**
 * Consume ?tutor_handoff=CODE: login, set return cookie, redirect into lesson.
 */
add_action(
	'template_redirect',
	static function (): void {
		if ( empty( $_GET['tutor_handoff'] ) ) {
			return;
		}

		$code = sanitize_text_field( wp_unslash( (string) $_GET['tutor_handoff'] ) );
		$code = preg_replace( '/[^a-f0-9]/', '', strtolower( $code ) );
		if ( ! is_string( $code ) || $code === '' ) {
			custom_tutor_graphql_auth_error_redirect();
		}

		$payload = get_transient( 'ctg_handoff_' . $code );
		delete_transient( 'ctg_handoff_' . $code );

		if ( ! is_array( $payload ) || empty( $payload['user_id'] ) || empty( $payload['redirect_to'] ) ) {
			custom_tutor_graphql_auth_error_redirect();
		}

		$user_id     = absint( $payload['user_id'] );
		$remember    = ! empty( $payload['remember'] );
		$redirect_to = esc_url_raw( (string) $payload['redirect_to'] );
		$return_to   = isset( $payload['return_to'] ) ? esc_url_raw( (string) $payload['return_to'] ) : '';

		if ( $user_id <= 0 || ! custom_tutor_graphql_login_user( $user_id, $remember ) ) {
			custom_tutor_graphql_auth_error_redirect();
		}

		if ( ! custom_tutor_graphql_user_enrolled_for_url( $user_id, $redirect_to ) ) {
			custom_tutor_graphql_auth_error_redirect();
		}

		// Re-resolve after login so progress uses the real session user.
		$redirect_to = custom_tutor_graphql_resolve_learner_entry_url( $redirect_to, $user_id );

		if ( ! custom_tutor_graphql_is_safe_tutor_redirect( $redirect_to ) ) {
			custom_tutor_graphql_auth_error_redirect();
		}

		custom_tutor_graphql_set_return_cookie(
			$return_to !== '' ? $return_to : custom_tutor_graphql_account_courses_url()
		);

		wp_safe_redirect( $redirect_to );
		exit;
	},
	1
);
