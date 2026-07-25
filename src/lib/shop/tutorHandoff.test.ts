import { afterEach, describe, expect, it, vi } from 'vitest';
import { requestTutorCourseHandoff } from './tutorHandoff';

describe('tutorHandoff', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	it('requires wordpress url', async () => {
		const result = await requestTutorCourseHandoff(
			'',
			'token',
			'https://wp.example/szkoleniaa/course/',
			false,
		);
		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.error).toMatch(/PUBLIC_WORDPRESS_URL/);
	});

	it('requires tutor permalink', async () => {
		const result = await requestTutorCourseHandoff('https://wp.example', 'token', '  ', false);
		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.error).toMatch(/kursu Tutor/);
	});

	it('builds handoff url from REST response', async () => {
		const fetchMock = vi.fn(async () => ({
			ok: true,
			status: 200,
			json: async () => ({
				handoff: 'abc123',
				url: 'https://wp.example/?tutor_handoff=abc123',
			}),
		}));
		vi.stubGlobal('fetch', fetchMock);

		const result = await requestTutorCourseHandoff(
			'https://wp.example/',
			'jwt-token',
			'https://wp.example/szkoleniaa/foxy-eye/',
			true,
			'https://astro.example/moje-konto/?tab=kursy',
		);

		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.url).toBe('https://wp.example/?tutor_handoff=abc123');
		expect(fetchMock).toHaveBeenCalledWith(
			'https://wp.example/wp-json/custom-tutor/v1/handoff',
			expect.objectContaining({
				method: 'POST',
				body: JSON.stringify({
					authToken: 'jwt-token',
					remember: true,
					redirectTo: 'https://wp.example/szkoleniaa/foxy-eye/',
					returnTo: 'https://astro.example/moje-konto/?tab=kursy',
				}),
			}),
		);
	});

	it('falls back to constructing url from handoff code', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => ({
				ok: true,
				status: 200,
				json: async () => ({ handoff: 'deadbeef' }),
			})),
		);

		const result = await requestTutorCourseHandoff(
			'https://wp.example',
			'token',
			'https://wp.example/szkoleniaa/course/',
			false,
		);
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.url).toBe('https://wp.example/?tutor_handoff=deadbeef');
	});

	it('maps 403 to enrollment error', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => ({
				ok: false,
				status: 403,
				json: async () => ({}),
			})),
		);

		const result = await requestTutorCourseHandoff(
			'https://wp.example',
			'token',
			'https://wp.example/szkoleniaa/course/',
			false,
		);
		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.error).toMatch(/dostępu/);
	});
});
