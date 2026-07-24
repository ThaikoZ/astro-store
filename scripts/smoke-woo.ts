import { config } from 'dotenv';
import { createMemoryCookieAdapter, createWooClient } from '../src/lib/woocommerce';

config();

async function main() {
  const endpoint = process.env.WORDPRESS_GRAPHQL_URL;
  if (!endpoint) throw new Error('WORDPRESS_GRAPHQL_URL is required');

  const woo = createWooClient({
    endpoint,
    origin: process.env.PUBLIC_APP_ORIGIN,
    cookies: createMemoryCookieAdapter(),
  });

  const products = await woo.catalog.getProducts({ first: 3 });
  const nodes = products.products?.nodes ?? [];
  console.log('products_ok', nodes.length, nodes.map((p) => p?.slug).filter(Boolean).slice(0, 3));

  const categories = await woo.catalog.getCategories();
  console.log('categories_ok', categories.productCategories?.nodes?.length ?? 0);

  const cart = await woo.cart.getCartSummary();
  console.log('cart_summary_ok', { isEmpty: cart.cart?.isEmpty, itemCount: cart.cart?.contents?.itemCount });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
