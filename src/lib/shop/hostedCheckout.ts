import { COOKIE_NAMES, createBrowserCookieAdapter } from '../woocommerce/cookies';

export type HostedCheckoutBuildResult =
	| { ok: true; url: string; sessionId: string }
	| { ok: false; error: string };

export type HostedCheckoutSettings = {
	authRequired: boolean;
	companyFieldsEnabled: boolean;
};

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
	authToken?: string | null,
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

	const auth = (authToken ?? '').trim();
	if (auth) {
		url.searchParams.set('auth_token', auth);
	}

	return { ok: true, url: url.toString(), sessionId };
}

/** Fetch public checkout settings from the WordPress REST API (short TTL cache). */
export async function fetchHostedCheckoutSettings(
	wordpressUrl: string | null | undefined = import.meta.env.PUBLIC_WORDPRESS_URL,
): Promise<HostedCheckoutSettings> {
	const defaults: HostedCheckoutSettings = {
		authRequired: false,
		companyFieldsEnabled: true,
	};

	const origin = (wordpressUrl ?? '').trim().replace(/\/+$/, '');
	if (!origin) return defaults;

	const now = Date.now();
	if (settingsCache && now - settingsCache.at < SETTINGS_TTL_MS) {
		return settingsCache.value;
	}

	try {
		const res = await fetch(`${origin}/wp-json/astro-checkout/v1/settings`, {
			credentials: 'omit',
			headers: { Accept: 'application/json' },
		});
		if (!res.ok) return defaults;
		const data = (await res.json()) as Partial<HostedCheckoutSettings>;
		const value: HostedCheckoutSettings = {
			authRequired: Boolean(data.authRequired),
			companyFieldsEnabled:
				typeof data.companyFieldsEnabled === 'boolean'
					? data.companyFieldsEnabled
					: true,
		};
		settingsCache = { at: now, value };
		return value;
	} catch {
		return defaults;
	}
}

/** Read browser cart + auth cookies and build the WP checkout URL. */
export function getHostedCheckoutRedirectUrl(
	wordpressUrl: string | null | undefined = import.meta.env.PUBLIC_WORDPRESS_URL,
): HostedCheckoutBuildResult {
	const cookies = createBrowserCookieAdapter();
	const sessionToken = cookies.get(COOKIE_NAMES.session) ?? null;
	const authToken = cookies.get(COOKIE_NAMES.authToken) ?? null;
	return buildHostedCheckoutUrl(wordpressUrl, sessionToken, authToken);
}

/** Clear the local headless cart session cookie (after WP checkout return). */
export function clearLocalCartSessionCookie(): void {
	const cookies = createBrowserCookieAdapter();
	cookies.remove(COOKIE_NAMES.session, { path: '/' });
}
