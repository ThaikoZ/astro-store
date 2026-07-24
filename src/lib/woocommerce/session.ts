import { COOKIE_NAMES, type CookieAdapter, type CookieOptions } from './cookies';

export const REFRESH_BUFFER_SECONDS = 60;

const defaultCookieOptions: CookieOptions = { path: '/', sameSite: 'lax' };

export function parseJwtExpiry(token?: string | null): number {
  if (!token) return 0;
  try {
    const [, payload] = token.split('.');
    if (!payload) return 0;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const decoded =
      typeof atob === 'function'
        ? JSON.parse(atob(padded))
        : JSON.parse(Buffer.from(padded, 'base64').toString('utf-8'));
    return typeof decoded?.exp === 'number' ? decoded.exp : 0;
  } catch {
    return 0;
  }
}

export function isTokenReusable(token?: string | null, bufferSeconds = REFRESH_BUFFER_SECONDS): boolean {
  if (!token) return false;
  const now = Math.floor(Date.now() / 1000);
  return parseJwtExpiry(token) > now + bufferSeconds;
}

export function isTokenLive(token?: string | null): boolean {
  if (!token) return false;
  const now = Math.floor(Date.now() / 1000);
  return parseJwtExpiry(token) > now;
}

export type SessionStore = {
  getSessionToken: () => string | null;
  setSessionToken: (token: string | null) => void;
  getAuthToken: () => string | null;
  setAuthToken: (token: string | null) => void;
  getRefreshToken: () => string | null;
  setRefreshToken: (token: string | null) => void;
  clearAuth: () => void;
  clearAll: () => void;
  buildHeaders: (origin?: string) => Record<string, string>;
  syncCartToken: (cartToken?: string | null) => void;
};

export function createSessionStore(cookies: CookieAdapter): SessionStore {
  const get = (name: string) => cookies.get(name) ?? null;

  const set = (name: string, value: string | null) => {
    if (!value) {
      cookies.remove(name, defaultCookieOptions);
      return;
    }
    cookies.set(name, value, defaultCookieOptions);
  };

  return {
    getSessionToken: () => get(COOKIE_NAMES.session),
    setSessionToken: (token) => set(COOKIE_NAMES.session, token),
    getAuthToken: () => {
      const token = get(COOKIE_NAMES.authToken);
      return isTokenLive(token) ? token : null;
    },
    setAuthToken: (token) => set(COOKIE_NAMES.authToken, token),
    getRefreshToken: () => get(COOKIE_NAMES.refreshToken),
    setRefreshToken: (token) => set(COOKIE_NAMES.refreshToken, token),
    clearAuth: () => {
      set(COOKIE_NAMES.authToken, null);
      set(COOKIE_NAMES.refreshToken, null);
    },
    clearAll: () => {
      set(COOKIE_NAMES.authToken, null);
      set(COOKIE_NAMES.refreshToken, null);
      set(COOKIE_NAMES.session, null);
    },
    buildHeaders(origin) {
      const headers: Record<string, string> = {};
      if (origin) headers.Origin = origin;
      const session = get(COOKIE_NAMES.session);
      if (session) headers['woocommerce-session'] = `Session ${session}`;
      const auth = get(COOKIE_NAMES.authToken);
      if (auth && isTokenLive(auth)) headers.Authorization = `Bearer ${auth}`;
      return headers;
    },
    syncCartToken(cartToken) {
      if (cartToken) set(COOKIE_NAMES.session, cartToken);
    },
  };
}

export function extractCartToken(payload: {
  cartToken?: string | null;
  customer?: { cartToken?: string | null } | null;
  viewer?: { cartToken?: string | null } | null;
  login?: { cartToken?: string | null; customer?: { cartToken?: string | null } | null } | null;
}): string | null {
  return (
    payload.cartToken ||
    payload.customer?.cartToken ||
    payload.viewer?.cartToken ||
    payload.login?.cartToken ||
    payload.login?.customer?.cartToken ||
    null
  );
}
