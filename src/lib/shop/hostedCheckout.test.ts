import { describe, expect, it } from 'vitest';
import {
	buildHostedCheckoutUrl,
	decodeJwtPayload,
	resolveCheckoutSessionId,
} from './hostedCheckout';

function makeJwt(payload: Record<string, unknown>): string {
	const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
	const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
	return `${header}.${body}.sig`;
}

describe('hostedCheckout', () => {
	it('decodes a JWT payload', () => {
		const token = makeJwt({ data: { customer_id: 't_abc123' } });
		expect(decodeJwtPayload(token)).toEqual({ data: { customer_id: 't_abc123' } });
	});

	it('resolves customer_id from a WooGraphQL JWT', () => {
		const token = makeJwt({ data: { customer_id: 't_abc123' } });
		expect(resolveCheckoutSessionId(token)).toBe('t_abc123');
	});

	it('resolves user_id from a Store API Cart-Token JWT', () => {
		const token = makeJwt({
			user_id: 't_cart456',
			exp: 9999999999,
			iss: 'store-api',
		});
		expect(resolveCheckoutSessionId(token)).toBe('t_cart456');
	});

	it('prefers legacy customer_id when both shapes are present', () => {
		const token = makeJwt({
			data: { customer_id: 't_legacy' },
			user_id: 't_store',
			iss: 'store-api',
		});
		expect(resolveCheckoutSessionId(token)).toBe('t_legacy');
	});

	it('builds checkout URL from a Cart-Token session key', () => {
		const result = buildHostedCheckoutUrl(
			'https://shop.example/',
			makeJwt({ user_id: 't_abc', iss: 'store-api', exp: 9999999999 }),
		);
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.url).toBe('https://shop.example/checkout/?session_id=t_abc');
		expect(result.sessionId).toBe('t_abc');
	});

	it('falls back to the raw token when not a JWT', () => {
		expect(resolveCheckoutSessionId('plain-session-token')).toBe('plain-session-token');
	});

	it('strips a Session prefix', () => {
		expect(resolveCheckoutSessionId('Session plain-session-token')).toBe('plain-session-token');
	});

	it('builds a checkout URL with session_id', () => {
		const result = buildHostedCheckoutUrl(
			'https://shop.example/',
			makeJwt({ data: { customer_id: 't_abc123' } }),
		);
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.url).toBe('https://shop.example/checkout/?session_id=t_abc123');
		expect(result.sessionId).toBe('t_abc123');
	});

	it('adds auth_token when an auth JWT is provided', () => {
		const auth = makeJwt({ data: { user: { id: '42' } } });
		const result = buildHostedCheckoutUrl(
			'https://shop.example/',
			makeJwt({ data: { customer_id: 't_abc123' } }),
			auth,
		);
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		const parsed = new URL(result.url);
		expect(parsed.searchParams.get('session_id')).toBe('t_abc123');
		expect(parsed.searchParams.get('auth_token')).toBe(auth);
	});

	it('omits auth_token for guests', () => {
		const result = buildHostedCheckoutUrl(
			'https://shop.example/',
			makeJwt({ data: { customer_id: 't_guest' } }),
			null,
		);
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.url).not.toContain('auth_token');
	});

	it('errors when WordPress URL is missing', () => {
		const result = buildHostedCheckoutUrl('', 'token');
		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.error).toMatch(/PUBLIC_WORDPRESS_URL/);
	});

	it('errors when session is missing', () => {
		const result = buildHostedCheckoutUrl('https://shop.example', null);
		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.error).toMatch(/sesji koszyka/);
	});
});
