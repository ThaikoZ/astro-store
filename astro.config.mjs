// @ts-check
import 'dotenv/config';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const wpGraphql =
	process.env.WORDPRESS_GRAPHQL_URL || process.env.PUBLIC_WORDPRESS_GRAPHQL_URL || '';

/** @type {{ target: string, path: string } | null} */
let wpProxy = null;
try {
	if (wpGraphql.startsWith('http')) {
		const url = new URL(wpGraphql);
		wpProxy = {
			target: url.origin,
			path: url.pathname || '/graphql',
		};
	}
} catch {
	wpProxy = null;
}

const graphqlProxy = wpProxy
	? {
			'/api/graphql': {
				target: wpProxy.target,
				changeOrigin: true,
				secure: false,
				rewrite: () => wpProxy.path,
			},
		}
	: undefined;

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		server: {
			proxy: graphqlProxy,
		},
		preview: {
			proxy: graphqlProxy,
		},
	},
});
