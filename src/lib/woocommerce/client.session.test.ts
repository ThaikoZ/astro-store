import { describe, expect, it } from 'vitest';
import { createMemoryCookieAdapter } from './cookies';
import { applySessionFromResponseHeaders, createSessionStore } from './session';

describe('applySessionFromResponseHeaders', () => {
  it('persists cart-token from response headers (modern WooGraphQL)', () => {
    const cookies = createMemoryCookieAdapter();
    const session = createSessionStore(cookies);
    const headers = new Headers({ 'cart-token': 'guest-token-xyz' });

    const token = applySessionFromResponseHeaders(session, headers);

    expect(token).toBe('guest-token-xyz');
    expect(cookies.get('woocommerce-session')).toBe('guest-token-xyz');
    expect(session.buildHeaders()['Cart-Token']).toBe('guest-token-xyz');
  });

  it('falls back to legacy woocommerce-session header', () => {
    const cookies = createMemoryCookieAdapter();
    const session = createSessionStore(cookies);
    const headers = new Headers({ 'woocommerce-session': 'Session legacy-token' });

    expect(applySessionFromResponseHeaders(session, headers)).toBe('legacy-token');
    expect(cookies.get('woocommerce-session')).toBe('legacy-token');
  });

  it('ignores false/missing session headers', () => {
    const cookies = createMemoryCookieAdapter();
    const session = createSessionStore(cookies);

    expect(applySessionFromResponseHeaders(session, new Headers({ 'woocommerce-session': 'false' }))).toBeNull();
    expect(applySessionFromResponseHeaders(session, new Headers())).toBeNull();
    expect(cookies.get('woocommerce-session')).toBeNull();
  });
});
