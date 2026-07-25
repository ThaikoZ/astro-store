import { COOKIE_NAMES, createBrowserCookieAdapter } from '../woocommerce/cookies';
import { getAuthRememberPreference } from './hostedCheckout';

export type TutorHandoffResult =
	| { ok: true; url: string }
	| { ok: false; error: string };

/** Current Astro page (path + query) - used as Tutor "Wróć" target. */
export function currentReturnTo(): string {
	if (typeof window === 'undefined') return '';
	return `${window.location.origin}${window.location.pathname}${window.location.search}`;
}

/**
 * Exchange Astro JWT for a Tutor SSO handoff URL on WordPress.
 * Never put the JWT in the course URL.
 */
export async function requestTutorCourseHandoff(
	wordpressUrl: string | null | undefined,
	authToken: string,
	redirectTo: string,
	remember: boolean,
	returnTo?: string | null,
): Promise<TutorHandoffResult> {
	const origin = (wordpressUrl ?? '').trim().replace(/\/+$/, '');
	if (!origin) {
		return { ok: false, error: 'Brak adresu sklepu WordPress (PUBLIC_WORDPRESS_URL).' };
	}

	const target = redirectTo.trim();
	if (!target) {
		return { ok: false, error: 'Brak adresu kursu Tutor.' };
	}

	const back = (returnTo ?? '').trim() || currentReturnTo();

	try {
		const res = await fetch(`${origin}/wp-json/custom-tutor/v1/handoff`, {
			method: 'POST',
			credentials: 'omit',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				authToken,
				remember,
				redirectTo: target,
				returnTo: back,
			}),
		});

		if (!res.ok) {
			if (res.status === 403) {
				return {
					ok: false,
					error: 'Nie masz dostępu do tego kursu. Sprawdź, czy zakup został zrealizowany.',
				};
			}
			if (res.status === 401) {
				return {
					ok: false,
					error: 'Sesja wygasła. Zaloguj się ponownie.',
				};
			}
			return {
				ok: false,
				error: 'Nie udało się otworzyć kursu. Spróbuj ponownie.',
			};
		}

		const data = (await res.json()) as { handoff?: string; url?: string };
		const handoff = typeof data.handoff === 'string' ? data.handoff.trim() : '';
		const url =
			typeof data.url === 'string' && data.url.trim()
				? data.url.trim()
				: handoff
					? `${origin}/?tutor_handoff=${encodeURIComponent(handoff)}`
					: '';

		if (!url) {
			return {
				ok: false,
				error: 'Nie udało się otworzyć kursu. Spróbuj ponownie.',
			};
		}

		return { ok: true, url };
	} catch {
		return {
			ok: false,
			error: 'Nie udało się otworzyć kursu. Sprawdź połączenie.',
		};
	}
}

/**
 * Build Tutor handoff redirect using the browser auth cookie.
 * Pass the course tutorPermalink; WordPress resolves the next unfinished lesson.
 */
export async function getTutorCourseHandoffUrl(
	tutorPermalink: string,
	wordpressUrl: string | null | undefined = import.meta.env.PUBLIC_WORDPRESS_URL,
	returnTo?: string | null,
): Promise<TutorHandoffResult> {
	const cookies = createBrowserCookieAdapter();
	const authToken = cookies.get(COOKIE_NAMES.authToken)?.trim() ?? '';
	if (!authToken) {
		return {
			ok: false,
			error: 'Musisz być zalogowany, aby otworzyć kurs.',
		};
	}

	return requestTutorCourseHandoff(
		wordpressUrl,
		authToken,
		tutorPermalink,
		getAuthRememberPreference(),
		returnTo ?? currentReturnTo(),
	);
}
