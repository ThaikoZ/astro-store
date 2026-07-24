import { describe, expect, it } from 'vitest';
import { createMemoryCookieAdapter } from './cookies';
import {
  createSessionStore,
  extractCartToken,
  isTokenLive,
  isTokenReusable,
  parseJwtExpiry,
  parseWooSessionHeader,
} from './session';

function makeJwt(expOffsetSeconds: number): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + expOffsetSeconds }),
  ).toString('base64url');
  return `${header}.${payload}.sig`;
}

describe('parseJwtExpiry', () => {
  it('reads exp from a JWT payload', () => {
    const token = makeJwt(120);
    const exp = parseJwtExpiry(token);
    expect(exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it('returns 0 for invalid tokens', () => {
    expect(parseJwtExpiry('not-a-jwt')).toBe(0);
    expect(parseJwtExpiry(null)).toBe(0);
  });
});

describe('token liveness', () => {
  it('treats near-expiry tokens as not reusable', () => {
    const token = makeJwt(30);
    expect(isTokenLive(token)).toBe(true);
    expect(isTokenReusable(token)).toBe(false);
  });

  it('treats fresh tokens as reusable', () => {
    const token = makeJwt(600);
    expect(isTokenReusable(token)).toBe(true);
  });
});

describe('session store headers', () => {
  it('builds Woo session and Bearer headers', () => {
    const cookies = createMemoryCookieAdapter();
    const session = createSessionStore(cookies);
    const auth = makeJwt(600);

    session.setSessionToken('abc123');
    session.setAuthToken(auth);

    expect(session.buildHeaders('http://localhost:4321')).toEqual({
      Origin: 'http://localhost:4321',
      'Cart-Token': 'abc123',
      'woocommerce-session': 'Session abc123',
      Authorization: `Bearer ${auth}`,
    });
  });

  it('clears auth without removing the guest session', () => {
    const cookies = createMemoryCookieAdapter({
      'woocommerce-session': 'guest-session',
      'auth-token': makeJwt(600),
      'auth-refresh-token': 'refresh',
    });
    const session = createSessionStore(cookies);
    session.clearAuth();
    expect(session.getSessionToken()).toBe('guest-session');
    expect(session.getAuthToken()).toBeNull();
    expect(session.getRefreshToken()).toBeNull();
  });
});

describe('extractCartToken', () => {
  it('prefers top-level then customer/viewer/login tokens', () => {
    expect(extractCartToken({ cartToken: 'a' })).toBe('a');
    expect(extractCartToken({ customer: { cartToken: 'b' } })).toBe('b');
    expect(extractCartToken({ viewer: { cartToken: 'c' } })).toBe('c');
    expect(extractCartToken({ login: { cartToken: 'd' } })).toBe('d');
  });
});

describe('parseWooSessionHeader', () => {
  it('strips Session prefix and ignores false/empty', () => {
    expect(parseWooSessionHeader('Session abc123')).toBe('abc123');
    expect(parseWooSessionHeader('abc123')).toBe('abc123');
    expect(parseWooSessionHeader('false')).toBeNull();
    expect(parseWooSessionHeader('')).toBeNull();
    expect(parseWooSessionHeader(null)).toBeNull();
  });
});
