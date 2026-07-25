export type TutorEnrolledCourse = {
	databaseId: number;
	title: string;
	slug: string;
	thumbnailUrl: string | null;
	progressPercent: number;
	isCompleted: boolean;
	/** Course landing page on WordPress. */
	tutorPermalink: string;
	/** Next unfinished lesson (preferred handoff target). */
	continuePermalink: string;
};
