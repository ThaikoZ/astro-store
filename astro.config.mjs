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

/** Rewrite /moje-konto/zamowienie/:id → /moje-konto/zamowienie/?id=:id (static site). */
function orderDetailRewrite() {
	/** @param {import('vite').ViteDevServer | import('vite').PreviewServer} server */
	const attach = (server) => {
		server.middlewares.use((req, _res, next) => {
			const url = req.url ?? '';
			const match = url.match(/^\/moje-konto\/zamowienie\/([^/?#]+)\/?(\?.*)?$/);
			if (match && match[1] && match[1] !== 'index.html') {
				const qs = new URLSearchParams(match[2]?.startsWith('?') ? match[2].slice(1) : '');
				qs.set('id', decodeURIComponent(match[1]));
				req.url = `/moje-konto/zamowienie/?${qs.toString()}`;
			}
			next();
		});
	};

	return {
		name: 'order-detail-rewrite',
		configureServer: attach,
		configurePreviewServer: attach,
	};
}

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss(), orderDetailRewrite()],
		server: {
			proxy: graphqlProxy,
		},
		preview: {
			proxy: graphqlProxy,
		},
	},
});
