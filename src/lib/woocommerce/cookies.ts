export type CookieOptions = {
  path?: string;
  sameSite?: 'lax' | 'strict' | 'none';
  maxAge?: number;
  domain?: string;
  secure?: boolean;
};

export type CookieAdapter = {
  get: (name: string) => string | null | undefined;
  set: (name: string, value: string, options?: CookieOptions) => void;
  remove: (name: string, options?: CookieOptions) => void;
};

export const COOKIE_NAMES = {
  session: 'woocommerce-session',
  authToken: 'auth-token',
  refreshToken: 'auth-refresh-token',
} as const;

const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  path: '/',
  sameSite: 'lax',
};

function parseDocumentCookies(): Record<string, string> {
  if (typeof document === 'undefined') return {};
  return document.cookie.split(';').reduce<Record<string, string>>((acc, part) => {
    const [rawKey, ...rest] = part.trim().split('=');
    if (!rawKey) return acc;
    acc[decodeURIComponent(rawKey)] = decodeURIComponent(rest.join('=') || '');
    return acc;
  }, {});
}

function serializeCookie(name: string, value: string, options: CookieOptions = {}): string {
  const opts = { ...DEFAULT_COOKIE_OPTIONS, ...options };
  const chunks = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];
  if (opts.path) chunks.push(`Path=${opts.path}`);
  if (opts.maxAge != null) chunks.push(`Max-Age=${opts.maxAge}`);
  if (opts.domain) chunks.push(`Domain=${opts.domain}`);
  if (opts.sameSite) chunks.push(`SameSite=${opts.sameSite}`);
  if (opts.secure) chunks.push('Secure');
  return chunks.join('; ');
}

/** Browser cookie adapter using `document.cookie`. */
export function createBrowserCookieAdapter(): CookieAdapter {
  return {
    get(name) {
      return parseDocumentCookies()[name] ?? null;
    },
    set(name, value, options) {
      if (typeof document === 'undefined') return;
      document.cookie = serializeCookie(name, value, options);
    },
    remove(name, options) {
      if (typeof document === 'undefined') return;
      document.cookie = serializeCookie(name, '', { ...options, maxAge: 0 });
    },
  };
}

/** In-memory adapter for tests or server contexts without Astro cookies. */
export function createMemoryCookieAdapter(initial: Record<string, string> = {}): CookieAdapter {
  const store = new Map(Object.entries(initial));
  return {
    get(name) {
      return store.get(name) ?? null;
    },
    set(name, value) {
      store.set(name, value);
    },
    remove(name) {
      store.delete(name);
    },
  };
}
