export type TutorEnrolledCourse = {
	databaseId: number;
	title: string;
	slug: string;
	thumbnailUrl: string | null;
	progressPercent: number;
	isCompleted: boolean;
	/** Course landing page on WordPress (handoff target; WP resolves next lesson). */
	tutorPermalink: string;
};
