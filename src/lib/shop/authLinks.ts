/** Build an auth page path while keeping the current `redirect` query param. */
export function authHref(path: string, redirect: string | null | undefined): string {
	const normalized = path.endsWith('/') || path.includes('?') ? path : `${path}/`;
	const value = (redirect ?? '').trim();
	if (!value) return normalized;

	const url = new URL(normalized, 'https://astro.local');
	url.searchParams.set('redirect', value);
	return `${url.pathname}${url.search}`;
}

export function getAuthRedirectParam(
	search: string | URLSearchParams | null | undefined,
): string | null {
	const params =
		typeof search === 'string'
			? new URLSearchParams(search.startsWith('?') ? search : `?${search}`)
			: search instanceof URLSearchParams
				? search
				: null;
	const value = params?.get('redirect')?.trim();
	return value || null;
}

/** True when auth flow should continue into hosted checkout after login/register. */
export function isCheckoutAuthRedirect(redirect: string | null | undefined): boolean {
	if (!redirect) return false;
	const normalized = redirect.trim().toLowerCase().replace(/\/+$/, '');
	return normalized === 'checkout' || normalized === '/checkout';
}

/** True when auth should return to the account Kursy tab (Tutor handoff failure recovery). */
export function isKursyAuthRedirect(redirect: string | null | undefined): boolean {
	if (!redirect) return false;
	const normalized = redirect.trim().toLowerCase().replace(/\/+$/, '');
	return normalized === 'kursy' || normalized === 'courses';
}

/** Post-login destination for known auth redirect tokens. */
export function resolveAuthRedirectPath(redirect: string | null | undefined): string {
	if (isCheckoutAuthRedirect(redirect)) return '/moje-konto/';
	if (isKursyAuthRedirect(redirect)) return '/moje-konto/?tab=kursy';
	return '/moje-konto/';
}
