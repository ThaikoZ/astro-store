import { describe, expect, it } from 'vitest';
import { createMemoryCookieAdapter } from './cookies';
import { createSessionStore, isTokenReusable, parseJwtExpiry, REFRESH_BUFFER_SECONDS } from './session';

function makeJwt(expOffsetSeconds: number): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({ exp: Math.floor(Date.now() / 1000) + expOffsetSeconds }),
  ).toString('base64url');
  return `${header}.${payload}.sig`;
}

describe('auth refresh single-flight helper behavior', () => {
  it('shares one in-flight refresh promise', async () => {
    let calls = 0;
    let refreshInFlight: Promise<boolean> | null = null;

    const refreshAuthToken = async (): Promise<boolean> => {
      if (refreshInFlight) return refreshInFlight;
      refreshInFlight = (async () => {
        calls += 1;
        await new Promise((resolve) => setTimeout(resolve, 20));
        return true;
      })().finally(() => {
        refreshInFlight = null;
      });
      return refreshInFlight;
    };

    const [a, b, c] = await Promise.all([refreshAuthToken(), refreshAuthToken(), refreshAuthToken()]);
    expect(a && b && c).toBe(true);
    expect(calls).toBe(1);
  });

  it('skips refresh when token is still reusable', () => {
    const cookies = createMemoryCookieAdapter();
    const session = createSessionStore(cookies);
    const token = makeJwt(REFRESH_BUFFER_SECONDS + 120);
    session.setAuthToken(token);

    expect(isTokenReusable(session.getAuthToken())).toBe(true);
    expect(parseJwtExpiry(token)).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });
});
