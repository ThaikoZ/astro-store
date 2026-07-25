import { describe, expect, it, vi } from 'vitest';
import { getTutorEnrolledCourses } from './courses';
import type { WooClient } from '../woocommerce';

describe('getTutorEnrolledCourses', () => {
	it('normalizes GraphQL course nodes', async () => {
		const query = vi.fn(async () => ({
			tutorEnrolledCourses: [
				{
					databaseId: 10,
					title: 'Foxy Eye',
					slug: 'foxy-eye',
					thumbnailUrl: 'https://cdn.example/a.jpg',
					progressPercent: 40,
					isCompleted: false,
					tutorPermalink: 'https://wp.example/szkoleniaa/foxy-eye/',
				},
				{
					databaseId: 0,
					title: 'Broken',
					tutorPermalink: '',
				},
				null,
			],
		}));

		const courses = await getTutorEnrolledCourses({ query } as unknown as WooClient);
		expect(courses).toEqual([
			{
				databaseId: 10,
				title: 'Foxy Eye',
				slug: 'foxy-eye',
				thumbnailUrl: 'https://cdn.example/a.jpg',
				progressPercent: 40,
				isCompleted: false,
				tutorPermalink: 'https://wp.example/szkoleniaa/foxy-eye/',
			},
		]);
		expect(query).toHaveBeenCalledOnce();
		expect(String(query.mock.calls[0]?.[0] ?? '')).not.toContain('continuePermalink');
	});

	it('clamps progress percent', async () => {
		const query = vi.fn(async () => ({
			tutorEnrolledCourses: [
				{
					databaseId: 1,
					title: 'Course',
					slug: 'course',
					thumbnailUrl: '',
					progressPercent: 140,
					isCompleted: true,
					tutorPermalink: 'https://wp.example/szkoleniaa/course/',
				},
			],
		}));

		const courses = await getTutorEnrolledCourses({ query } as unknown as WooClient);
		expect(courses[0]?.progressPercent).toBe(100);
		expect(courses[0]?.thumbnailUrl).toBeNull();
		expect(courses[0]?.tutorPermalink).toBe('https://wp.example/szkoleniaa/course/');
	});
});
