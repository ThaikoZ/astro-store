import { describe, expect, it } from 'vitest';
import { authHref, getAuthRedirectParam, isCheckoutAuthRedirect } from './authLinks';

describe('authLinks', () => {
	it('preserves redirect when building auth hrefs', () => {
		expect(authHref('/rejestracja/', 'checkout')).toBe('/rejestracja/?redirect=checkout');
		expect(authHref('/logowanie/', 'checkout')).toBe('/logowanie/?redirect=checkout');
		expect(authHref('/nie-pamietam-hasla/', 'checkout')).toBe(
			'/nie-pamietam-hasla/?redirect=checkout',
		);
	});

	it('returns plain paths when redirect is missing', () => {
		expect(authHref('/logowanie/', null)).toBe('/logowanie/');
		expect(authHref('/logowanie/', '')).toBe('/logowanie/');
	});

	it('reads redirect from search params', () => {
		expect(getAuthRedirectParam('?redirect=checkout')).toBe('checkout');
		expect(getAuthRedirectParam(new URLSearchParams('redirect=checkout'))).toBe('checkout');
		expect(getAuthRedirectParam('')).toBeNull();
	});

	it('detects checkout redirect values', () => {
		expect(isCheckoutAuthRedirect('checkout')).toBe(true);
		expect(isCheckoutAuthRedirect('/checkout')).toBe(true);
		expect(isCheckoutAuthRedirect('/checkout/')).toBe(true);
		expect(isCheckoutAuthRedirect('moje-konto')).toBe(false);
	});
});
