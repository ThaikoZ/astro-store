import { config } from 'dotenv';
import { createMemoryCookieAdapter, createWooClient } from '../src/lib/woocommerce';

config();

async function main() {
  const endpoint = process.env.WORDPRESS_GRAPHQL_URL;
  if (!endpoint) throw new Error('WORDPRESS_GRAPHQL_URL is required');

  const cookies = createMemoryCookieAdapter();
  const woo = createWooClient({
    endpoint,
    origin: process.env.PUBLIC_APP_ORIGIN,
    cookies,
  });

  const products = await woo.catalog.getProducts({ first: 3 });
  const nodes = products.products?.nodes ?? [];
  console.log(
    'products_ok',
    nodes.length,
    nodes.map((p) => p?.slug).filter(Boolean).slice(0, 3),
  );

  const categories = await woo.catalog.getCategories();
  console.log('categories_ok', categories.productCategories?.nodes?.length ?? 0);

  const summary = await woo.cart.getCartSummary();
  console.log('cart_summary_ok', {
    isEmpty: summary.cart?.isEmpty,
    itemCount: summary.cart?.contents?.itemCount,
  });

  const productId = nodes[0]?.databaseId;
  if (!productId) {
    throw new Error('No product available for addToCart smoke test');
  }

  await woo.cart.addToCart({ productId, quantity: 1 });
  const sessionAfterAdd = woo.session.getSessionToken();
  if (!sessionAfterAdd) {
    throw new Error('Expected woocommerce-session cookie after addToCart');
  }
  console.log('session_ok', Boolean(sessionAfterAdd));

  const cart = await woo.cart.getCart();
  const itemCount = cart.cart?.contents?.itemCount ?? 0;
  if (!itemCount || cart.cart?.isEmpty) {
    throw new Error('Expected non-empty cart after addToCart with persisted session');
  }
  console.log('cart_persist_ok', { itemCount, sessionPresent: Boolean(woo.session.getSessionToken()) });

  await woo.cart.emptyCart();
  console.log('cart_cleared_ok');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
