import type { CookieAdapter, CookieOptions } from './cookies';

type AstroCookiesLike = {
  get: (name: string) => { value: string } | undefined;
  set: (name: string, value: string, options?: Record<string, unknown>) => void;
  delete: (name: string, options?: Record<string, unknown>) => void;
};

/** Adapt Astro.cookies to the SDK CookieAdapter interface. */
export function createAstroCookieAdapter(astroCookies: AstroCookiesLike): CookieAdapter {
  return {
    get(name) {
      return astroCookies.get(name)?.value ?? null;
    },
    set(name, value, options) {
      astroCookies.set(name, value, toAstroOptions(options));
    },
    remove(name, options) {
      astroCookies.delete(name, toAstroOptions(options));
    },
  };
}

function toAstroOptions(options?: CookieOptions): Record<string, unknown> {
  if (!options) return { path: '/' };
  return {
    path: options.path ?? '/',
    sameSite: options.sameSite,
    maxAge: options.maxAge,
    domain: options.domain,
    secure: options.secure,
  };
}
