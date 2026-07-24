import { createBrowserCookieAdapter } from './cookies';
import { createWooClient, type WooClient } from './client';

let browserClient: WooClient | null = null;

/**
 * Same-origin GraphQL path proxied by Vite/Astro to WordPress.
 * Avoids browser CORS failures against the remote WP endpoint.
 */
export const BROWSER_GRAPHQL_PATH = '/api/graphql';

/**
 * Singleton Woo client for browser islands / client scripts.
 * Always hits the same-origin proxy (`/api/graphql`) so login works without WP CORS.
 */
export function getBrowserWooClient(): WooClient {
	if (typeof window === 'undefined') {
		throw new Error('getBrowserWooClient() can only be used in the browser.');
	}

	if (browserClient) return browserClient;

	const configured = import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL as string | undefined;
	// Relative proxy path preferred - graphql-request requires an absolute URL.
	const path =
		configured && configured.startsWith('/')
			? configured
			: BROWSER_GRAPHQL_PATH;
	const endpoint = new URL(path, window.location.origin).toString();

	browserClient = createWooClient({
		endpoint,
		// Do not force a custom Origin - browser sends the page origin (same-origin to proxy).
		origin: undefined,
		stripePublishableKey: import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY || null,
		cookies: createBrowserCookieAdapter(),
	});

	return browserClient;
}
