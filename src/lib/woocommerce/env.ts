import type { WooClientConfig } from './client';
import { createWooClient } from './client';
import type { CookieAdapter } from './cookies';

type AstroEnv = {
  WORDPRESS_GRAPHQL_URL?: string;
  PUBLIC_WORDPRESS_GRAPHQL_URL?: string;
  PUBLIC_APP_ORIGIN?: string;
  PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
};

/**
 * Build a Woo client from Astro / Vite env vars.
 * Pass `cookies` from the browser adapter or Astro.cookies wrapper when needed.
 *
 * Read `import.meta.env.WORDPRESS_*` with static property access so Vite/Astro
 * can inject values (dynamic `env[key]` access is not replaced).
 *
 * Prefer `PUBLIC_WORDPRESS_GRAPHQL_URL` in the browser; fall back to
 * `WORDPRESS_GRAPHQL_URL` on the server.
 */
export function createWooClientFromEnv(
  env: AstroEnv = {
    WORDPRESS_GRAPHQL_URL: import.meta.env.WORDPRESS_GRAPHQL_URL,
    PUBLIC_WORDPRESS_GRAPHQL_URL: import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL,
    PUBLIC_APP_ORIGIN: import.meta.env.PUBLIC_APP_ORIGIN,
    PUBLIC_STRIPE_PUBLISHABLE_KEY: import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  options: { cookies?: CookieAdapter; fetch?: typeof fetch } = {},
) {
  const endpoint = env.PUBLIC_WORDPRESS_GRAPHQL_URL || env.WORDPRESS_GRAPHQL_URL;
  if (!endpoint) {
    throw new Error('PUBLIC_WORDPRESS_GRAPHQL_URL or WORDPRESS_GRAPHQL_URL is not set.');
  }

  const config: WooClientConfig = {
    endpoint,
    origin: env.PUBLIC_APP_ORIGIN,
    stripePublishableKey: env.PUBLIC_STRIPE_PUBLISHABLE_KEY || null,
    cookies: options.cookies,
    fetch: options.fetch,
  };

  return createWooClient(config);
}
