import { describe, expect, it, vi } from 'vitest';
import { createAuthApi } from './auth';
import { createMemoryCookieAdapter } from './cookies';
import { createSessionStore } from './session';
import type { WooClientInternals } from './types';

function makeJwt(expOffsetSeconds = 600): string {
	const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
	const payload = Buffer.from(
		JSON.stringify({ exp: Math.floor(Date.now() / 1000) + expOffsetSeconds }),
	).toString('base64url');
	return `${header}.${payload}.sig`;
}

describe('auth.login guest cart preservation', () => {
	it('restores the pre-login cart session and reloads the cart', async () => {
		const cookies = createMemoryCookieAdapter({
			'woocommerce-session': 't_guest_cart',
		});
		const session = createSessionStore(cookies);
		const calls: string[] = [];

		const request = vi.fn(async (operation: (sdk: unknown) => Promise<unknown>) => {
			const sdk = {
				login: async () => {
					calls.push('login');
					// Simulate Woo returning an empty customer cart token (the wipe bug).
					session.syncCartToken('42');
					return {
						login: {
							authToken: makeJwt(),
							refreshToken: 'refresh',
							cartToken: '42',
							customer: { cartToken: '42', databaseId: 42 },
						},
					};
				},
				getCart: async () => {
					calls.push('getCart');
					expect(session.getSessionToken()).toBe('t_guest_cart');
					// Server merge rotates to a user session that keeps the cart.
					session.syncCartToken('merged-user-session');
					return { cart: { isEmpty: false, contents: { itemCount: 1, nodes: [] } } };
				},
			};
			return operation(sdk);
		});

		const auth = createAuthApi({
			request: request as WooClientInternals['request'],
			session,
			refreshAuthToken: async () => true,
			stripePublishableKey: null,
		});

		const result = await auth.login('user@example.com', 'secret');

		expect(result.success).toBe(true);
		expect(calls).toEqual(['login', 'getCart']);
		expect(session.getSessionToken()).toBe('merged-user-session');
		expect(session.getAuthToken()).toBeTruthy();
	});

	it('keeps the guest Cart-Token when mergeGuestCart is false (checkout handoff)', async () => {
		const cookies = createMemoryCookieAdapter({
			'woocommerce-session': 't_guest_for_handoff',
		});
		const session = createSessionStore(cookies);
		const getCart = vi.fn(async () => {
			throw new Error('getCart should not run when mergeGuestCart is false');
		});

		const request = vi.fn(async (operation: (sdk: unknown) => Promise<unknown>) => {
			const sdk = {
				login: async () => {
					session.syncCartToken('42');
					return {
						login: {
							authToken: makeJwt(),
							refreshToken: 'refresh',
							cartToken: '42',
							customer: { cartToken: '42', databaseId: 42 },
						},
					};
				},
				getCart,
			};
			return operation(sdk);
		});

		const auth = createAuthApi({
			request: request as WooClientInternals['request'],
			session,
			refreshAuthToken: async () => true,
			stripePublishableKey: null,
		});

		const result = await auth.login('user@example.com', 'secret', {
			mergeGuestCart: false,
		});

		expect(result.success).toBe(true);
		expect(getCart).not.toHaveBeenCalled();
		expect(session.getSessionToken()).toBe('t_guest_for_handoff');
	});

	it('syncs login cartToken when there was no guest session', async () => {
		const session = createSessionStore(createMemoryCookieAdapter());
		const request = vi.fn(async (operation: (sdk: unknown) => Promise<unknown>) => {
			const sdk = {
				login: async () => ({
					login: {
						authToken: makeJwt(),
						refreshToken: 'refresh',
						cartToken: 'customer-token',
						customer: { cartToken: 'customer-token-2', databaseId: 7 },
					},
				}),
				getCart: async () => {
					throw new Error('getCart should not run without a guest session');
				},
			};
			return operation(sdk);
		});

		const auth = createAuthApi({
			request: request as WooClientInternals['request'],
			session,
			refreshAuthToken: async () => true,
			stripePublishableKey: null,
		});

		const result = await auth.login('user@example.com', 'secret');
		expect(result.success).toBe(true);
		expect(session.getSessionToken()).toBe('customer-token-2');
	});
});

describe('auth.register guest cart preservation', () => {
	it('restores the guest cart session after register', async () => {
		const cookies = createMemoryCookieAdapter({
			'woocommerce-session': 't_guest_before_register',
		});
		const session = createSessionStore(cookies);

		const request = vi.fn(async (operation: (sdk: unknown) => Promise<unknown>) => {
			const sdk = {
				registerCustomer: async () => {
					session.syncCartToken('empty-after-register');
					return { registerCustomer: { customer: { databaseId: 9 } } };
				},
				getCart: async () => {
					expect(session.getSessionToken()).toBe('t_guest_before_register');
					session.syncCartToken('merged-after-register');
					return { cart: { isEmpty: false } };
				},
			};
			return operation(sdk);
		});

		const auth = createAuthApi({
			request: request as WooClientInternals['request'],
			session,
			refreshAuthToken: async () => true,
			stripePublishableKey: null,
		});

		await auth.register({
			email: 'new@example.com',
			username: 'newuser',
			password: 'secret',
		});

		expect(session.getSessionToken()).toBe('merged-after-register');
	});
});
