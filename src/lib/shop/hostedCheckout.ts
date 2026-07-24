import { COOKIE_NAMES, createBrowserCookieAdapter } from '../woocommerce/cookies';

export type HostedCheckoutBuildResult =
	| { ok: true; url: string; sessionId: string }
	| { ok: false; error: string };

export type HostedCheckoutSettings = {
	authRequired: boolean;
	companyFieldsEnabled: boolean;
};

export type HostedCheckoutSettingsResult =
	| { ok: true; settings: HostedCheckoutSettings }
	| { ok: false; error: string };

const REMEMBER_STORAGE_KEY = 'astro-auth-remember';

let settingsCache: { at: number; value: HostedCheckoutSettings } | null = null;
const SETTINGS_TTL_MS = 30_000;

/** Decode a JWT payload without verifying the signature (browser handoff only). */
export function decodeJwtPayload(token: string): Record<string, unknown> | null {
	const parts = token.split('.');
	if (parts.length < 2 || !parts[1]) return null;

	try {
		const normalized = parts[1].replace(/-/g, '+').replace(/_/g, '/');
		const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
		const json =
			typeof atob === 'function'
				? atob(padded)
				: Buffer.from(padded, 'base64').toString('utf-8');
		const parsed = JSON.parse(json) as unknown;
		return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : null;
	} catch {
		return null;
	}
}

/** Normalize a JWT claim that may be a string or finite number session key. */
function asSessionKey(value: unknown): string | null {
	if (typeof value === 'string' && value.trim()) return value.trim();
	if (typeof value === 'number' && Number.isFinite(value)) return String(value);
	return null;
}

/**
 * Resolve the WooCommerce session key to pass as `?session_id=`.
 * Supports legacy WooGraphQL JWTs (`data.customer_id`) and Store API Cart-Tokens (`user_id`).
 */
export function resolveCheckoutSessionId(sessionToken: string | null | undefined): string | null {
	if (!sessionToken) return null;
	const token = sessionToken.replace(/^Session\s+/i, '').trim();
	if (!token) return null;

	const payload = decodeJwtPayload(token);
	if (payload) {
		const data = payload.data;
		if (data && typeof data === 'object') {
			const fromLegacy = asSessionKey((data as Record<string, unknown>).customer_id);
			if (fromLegacy) return fromLegacy;
		}

		const fromCartToken = asSessionKey(payload.user_id);
		if (fromCartToken) return fromCartToken;
	}

	return token;
}

export function buildHostedCheckoutUrl(
	wordpressUrl: string | null | undefined,
	sessionToken: string | null | undefined,
	handoffCode?: string | null,
): HostedCheckoutBuildResult {
	const origin = (wordpressUrl ?? '').trim().replace(/\/+$/, '');
	if (!origin) {
		return {
			ok: false,
			error: 'Brak adresu sklepu WordPress (PUBLIC_WORDPRESS_URL).',
		};
	}

	const sessionId = resolveCheckoutSessionId(sessionToken);
	if (!sessionId) {
		return {
			ok: false,
			error: 'Brak sesji koszyka. Dodaj produkt i spróbuj ponownie.',
		};
	}

	const url = new URL(`${origin}/checkout/`);
	url.searchParams.set('session_id', sessionId);

	const handoff = (handoffCode ?? '').trim();
	if (handoff) {
		url.searchParams.set('handoff', handoff);
	}

	return { ok: true, url: url.toString(), sessionId };
}

/** Persist remember-me choice for WP handoff (sessionStorage). */
export function setAuthRememberPreference(remember: boolean): void {
	if (typeof sessionStorage === 'undefined') return;
	if (remember) sessionStorage.setItem(REMEMBER_STORAGE_KEY, '1');
	else sessionStorage.removeItem(REMEMBER_STORAGE_KEY);
}

export function getAuthRememberPreference(): boolean {
	if (typeof sessionStorage === 'undefined') return false;
	return sessionStorage.getItem(REMEMBER_STORAGE_KEY) === '1';
}

export function clearAuthRememberPreference(): void {
	if (typeof sessionStorage === 'undefined') return;
	sessionStorage.removeItem(REMEMBER_STORAGE_KEY);
}

/** Fetch public checkout settings - fails closed (no silent authRequired: false). */
export async function fetchHostedCheckoutSettings(
	wordpressUrl: string | null | undefined = import.meta.env.PUBLIC_WORDPRESS_URL,
): Promise<HostedCheckoutSettingsResult> {
	const origin = (wordpressUrl ?? '').trim().replace(/\/+$/, '');
	if (!origin) {
		return {
			ok: false,
			error: 'Brak adresu sklepu WordPress (PUBLIC_WORDPRESS_URL).',
		};
	}

	const now = Date.now();
	if (settingsCache && now - settingsCache.at < SETTINGS_TTL_MS) {
		return { ok: true, settings: settingsCache.value };
	}

	try {
		const res = await fetch(`${origin}/wp-json/custom-checkout/v1/settings`, {
			credentials: 'omit',
			headers: { Accept: 'application/json' },
		});
		if (!res.ok) {
			return {
				ok: false,
				error: 'Nie udało się sprawdzić ustawień kasy. Spróbuj ponownie za chwilę.',
			};
		}
		const data = (await res.json()) as Partial<HostedCheckoutSettings>;
		const value: HostedCheckoutSettings = {
			authRequired: Boolean(data.authRequired),
			companyFieldsEnabled:
				typeof data.companyFieldsEnabled === 'boolean'
					? data.companyFieldsEnabled
					: true,
		};
		settingsCache = { at: now, value };
		return { ok: true, settings: value };
	} catch {
		return {
			ok: false,
			error: 'Nie udało się sprawdzić ustawień kasy. Spróbuj ponownie za chwilę.',
		};
	}
}

/** Exchange Astro JWT for a short-lived WP handoff code (never put JWT in the checkout URL). */
export async function requestCheckoutHandoff(
	wordpressUrl: string | null | undefined,
	authToken: string,
	sessionId: string,
	remember: boolean,
): Promise<{ ok: true; handoff: string } | { ok: false; error: string }> {
	const origin = (wordpressUrl ?? '').trim().replace(/\/+$/, '');
	if (!origin) {
		return { ok: false, error: 'Brak adresu sklepu WordPress (PUBLIC_WORDPRESS_URL).' };
	}

	try {
		const res = await fetch(`${origin}/wp-json/custom-checkout/v1/handoff`, {
			method: 'POST',
			credentials: 'omit',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				authToken,
				sessionId,
				remember,
			}),
		});
		if (!res.ok) {
			return {
				ok: false,
				error: 'Nie udało się przygotować logowania do kasy. Zaloguj się ponownie.',
			};
		}
		const data = (await res.json()) as { handoff?: string };
		const handoff = typeof data.handoff === 'string' ? data.handoff.trim() : '';
		if (!handoff) {
			return {
				ok: false,
				error: 'Nie udało się przygotować logowania do kasy. Zaloguj się ponownie.',
			};
		}
		return { ok: true, handoff };
	} catch {
		return {
			ok: false,
			error: 'Nie udało się przygotować logowania do kasy. Sprawdź połączenie.',
		};
	}
}

/**
 * Build hosted checkout redirect: guests use session_id; logged-in users exchange JWT for handoff.
 */
export async function getHostedCheckoutRedirectUrl(
	wordpressUrl: string | null | undefined = import.meta.env.PUBLIC_WORDPRESS_URL,
): Promise<HostedCheckoutBuildResult> {
	const cookies = createBrowserCookieAdapter();
	const sessionToken = cookies.get(COOKIE_NAMES.session) ?? null;
	const authToken = cookies.get(COOKIE_NAMES.authToken) ?? null;

	const sessionId = resolveCheckoutSessionId(sessionToken);
	if (!sessionId) {
		return {
			ok: false,
			error: 'Brak sesji koszyka. Dodaj produkt i spróbuj ponownie.',
		};
	}

	if (authToken?.trim()) {
		const handoff = await requestCheckoutHandoff(
			wordpressUrl,
			authToken.trim(),
			sessionId,
			getAuthRememberPreference(),
		);
		if (!handoff.ok) return handoff;
		return buildHostedCheckoutUrl(wordpressUrl, sessionToken, handoff.handoff);
	}

	return buildHostedCheckoutUrl(wordpressUrl, sessionToken, null);
}

/** Clear the local headless cart session cookie (after WP checkout return). */
export function clearLocalCartSessionCookie(): void {
	const cookies = createBrowserCookieAdapter();
	cookies.remove(COOKIE_NAMES.session, { path: '/' });
}
