export const TUTOR_ENROLLED_COURSES_QUERY = /* GraphQL */ `
	query TutorEnrolledCourses {
		tutorEnrolledCourses {
			databaseId
			title
			slug
			thumbnailUrl
			progressPercent
			isCompleted
			tutorPermalink
			continuePermalink
		}
	}
`;
