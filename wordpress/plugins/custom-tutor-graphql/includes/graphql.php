<?php
/**
 * WPGraphQL types for enrolled Tutor courses.
 *
 * @package CustomTutorGraphQL
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'graphql_register_types',
	static function (): void {
		if ( ! function_exists( 'register_graphql_object_type' ) || ! function_exists( 'register_graphql_field' ) ) {
			return;
		}

		register_graphql_object_type(
			'TutorEnrolledCourse',
			array(
				'description' => __( 'A Tutor LMS course the authenticated user is enrolled in.', 'custom-tutor-graphql' ),
				'fields'      => array(
					'databaseId'      => array(
						'type'        => 'Int',
						'description' => __( 'WordPress post ID of the course.', 'custom-tutor-graphql' ),
					),
					'title'           => array(
						'type'        => 'String',
						'description' => __( 'Course title.', 'custom-tutor-graphql' ),
					),
					'slug'            => array(
						'type'        => 'String',
						'description' => __( 'Course slug.', 'custom-tutor-graphql' ),
					),
					'thumbnailUrl'    => array(
						'type'        => 'String',
						'description' => __( 'Course thumbnail URL.', 'custom-tutor-graphql' ),
					),
					'progressPercent' => array(
						'type'        => 'Float',
						'description' => __( 'Completion percent 0-100 for the current user.', 'custom-tutor-graphql' ),
					),
					'isCompleted'     => array(
						'type'        => 'Boolean',
						'description' => __( 'Whether the current user completed the course.', 'custom-tutor-graphql' ),
					),
					'tutorPermalink'    => array(
						'type'        => 'String',
						'description' => __( 'WordPress Tutor course landing URL.', 'custom-tutor-graphql' ),
					),
					'continuePermalink' => array(
						'type'        => 'String',
						'description' => __( 'Next incomplete lesson URL (or course URL if none). Use this for learner handoff.', 'custom-tutor-graphql' ),
					),
				),
			)
		);

		$resolve_enrolled = static function () {
			$user_id = get_current_user_id();
			if ( $user_id <= 0 ) {
				return array();
			}

			return custom_tutor_graphql_enrolled_courses_for_user( $user_id );
		};

		register_graphql_field(
			'RootQuery',
			'tutorEnrolledCourses',
			array(
				'type'        => array( 'list_of' => 'TutorEnrolledCourse' ),
				'description' => __( 'Tutor courses enrolled by the authenticated user.', 'custom-tutor-graphql' ),
				'resolve'     => $resolve_enrolled,
			)
		);

		// Prefer Viewer when the JWT plugin exposes it.
		if ( function_exists( 'register_graphql_field' ) ) {
			register_graphql_field(
				'RootQuery',
				'viewerTutorEnrolledCourses',
				array(
					'type'        => array( 'list_of' => 'TutorEnrolledCourse' ),
					'description' => __( 'Alias of tutorEnrolledCourses for the authenticated viewer.', 'custom-tutor-graphql' ),
					'resolve'     => $resolve_enrolled,
				)
			);
		}
	}
);
