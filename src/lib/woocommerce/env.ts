import type { WooClientConfig } from './client';
import { createWooClient } from './client';
import type { CookieAdapter } from './cookies';

type AstroEnv = {
  WORDPRESS_GRAPHQL_URL?: string;
  PUBLIC_APP_ORIGIN?: string;
  PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
};

/**
 * Build a Woo client from Astro / Vite env vars.
 * Pass `cookies` from the browser adapter or Astro.cookies wrapper when needed.
 */
export function createWooClientFromEnv(
  env: AstroEnv = import.meta.env as AstroEnv,
  options: { cookies?: CookieAdapter; fetch?: typeof fetch } = {},
) {
  const endpoint = env.WORDPRESS_GRAPHQL_URL;
  if (!endpoint) {
    throw new Error('WORDPRESS_GRAPHQL_URL is not set.');
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
