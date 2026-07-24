import { COOKIE_NAMES, createBrowserCookieAdapter } from '../woocommerce/cookies';

export type HostedCheckoutBuildResult =
	| { ok: true; url: string; sessionId: string }
	| { ok: false; error: string };

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

/**
 * Resolve the WooCommerce session key to pass as `?session_id=`.
 * WooGraphQL JWT sessions expose `data.customer_id`; otherwise use the raw token.
 */
export function resolveCheckoutSessionId(sessionToken: string | null | undefined): string | null {
	if (!sessionToken) return null;
	const token = sessionToken.replace(/^Session\s+/i, '').trim();
	if (!token) return null;

	const payload = decodeJwtPayload(token);
	if (payload) {
		const data = payload.data;
		if (data && typeof data === 'object') {
			const customerId = (data as Record<string, unknown>).customer_id;
			if (typeof customerId === 'string' && customerId.trim()) return customerId.trim();
			if (typeof customerId === 'number' && Number.isFinite(customerId)) {
				return String(customerId);
			}
		}
	}

	return token;
}

export function buildHostedCheckoutUrl(
	wordpressUrl: string | null | undefined,
	sessionToken: string | null | undefined,
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

	return { ok: true, url: url.toString(), sessionId };
}

/** Read the browser cart session cookie and build the WP checkout URL. */
export function getHostedCheckoutRedirectUrl(
	wordpressUrl: string | null | undefined = import.meta.env.PUBLIC_WORDPRESS_URL,
): HostedCheckoutBuildResult {
	const cookies = createBrowserCookieAdapter();
	const sessionToken = cookies.get(COOKIE_NAMES.session) ?? null;
	return buildHostedCheckoutUrl(wordpressUrl, sessionToken);
}

/** Clear the local headless cart session cookie (after WP checkout return). */
export function clearLocalCartSessionCookie(): void {
	const cookies = createBrowserCookieAdapter();
	cookies.remove(COOKIE_NAMES.session, { path: '/' });
}
