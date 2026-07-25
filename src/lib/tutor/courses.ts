import type { WooClient } from '../woocommerce';
import { TUTOR_ENROLLED_COURSES_QUERY } from './queries';
import type { TutorEnrolledCourse } from './types';

type TutorEnrolledCoursesResponse = {
	tutorEnrolledCourses?: Array<Partial<TutorEnrolledCourse> | null> | null;
};

function normalizeCourse(raw: Partial<TutorEnrolledCourse> | null | undefined): TutorEnrolledCourse | null {
	if (!raw) return null;
	const databaseId = Number(raw.databaseId);
	const title = typeof raw.title === 'string' ? raw.title.trim() : '';
	const tutorPermalink =
		typeof raw.tutorPermalink === 'string' ? raw.tutorPermalink.trim() : '';
	if (!Number.isFinite(databaseId) || databaseId <= 0 || !title || !tutorPermalink) {
		return null;
	}

	const continuePermalink =
		typeof raw.continuePermalink === 'string' && raw.continuePermalink.trim()
			? raw.continuePermalink.trim()
			: tutorPermalink;

	const progress = Number(raw.progressPercent);
	return {
		databaseId,
		title,
		slug: typeof raw.slug === 'string' ? raw.slug : '',
		thumbnailUrl:
			typeof raw.thumbnailUrl === 'string' && raw.thumbnailUrl.trim()
				? raw.thumbnailUrl.trim()
				: null,
		progressPercent: Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : 0,
		isCompleted: Boolean(raw.isCompleted),
		tutorPermalink,
		continuePermalink,
	};
}

/** Fetch Tutor courses enrolled by the authenticated GraphQL user. */
export async function getTutorEnrolledCourses(client: WooClient): Promise<TutorEnrolledCourse[]> {
	const data = await client.query<TutorEnrolledCoursesResponse>(TUTOR_ENROLLED_COURSES_QUERY);
	return (data.tutorEnrolledCourses ?? [])
		.map(normalizeCourse)
		.filter((course): course is TutorEnrolledCourse => Boolean(course));
}
