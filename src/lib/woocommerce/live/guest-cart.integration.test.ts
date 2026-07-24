/**
 * Live guest cart + session persistence.
 * Run: npm run test:live
 */
import { describe, expect, it } from 'vitest';
import { createMemoryCookieAdapter } from '../index';
import {
  createLiveClient,
  findSimpleProduct,
  getLiveTestEnv,
  snapshotSessionCookies,
} from './helpers';

const hasEndpoint = Boolean(process.env.WORDPRESS_GRAPHQL_URL);

describe.runIf(hasEndpoint)('WooCommerce SDK live guest cart', () => {
  it(
    'persists guest cart-token across a new client with the same session cookie',
    async () => {
      const env = getLiveTestEnv();
      const clientA = createLiveClient(env);
      const product = await findSimpleProduct(clientA);

      await clientA.cart.emptyCart().catch(() => undefined);
      await clientA.cart.addToCart({ productId: product.databaseId, quantity: 1 });

      const cartA = await clientA.cart.getCart();
      expect(cartA.cart?.isEmpty).toBe(false);
      const itemCountA = cartA.cart?.contents?.itemCount ?? 0;
      expect(itemCountA).toBeGreaterThan(0);

      // Capture after getCart: response headers may rotate cart-token.
      const sessionToken = clientA.session.getSessionToken();
      expect(sessionToken).toBeTruthy();

      const clientB = createLiveClient(env, createMemoryCookieAdapter(snapshotSessionCookies(clientA)));
      expect(clientB.session.getSessionToken()).toBe(sessionToken);

      const cartB = await clientB.cart.getCart();
      expect(cartB.cart?.isEmpty).toBe(false);
      expect(cartB.cart?.contents?.itemCount ?? 0).toBe(itemCountA);

      const clientC = createLiveClient(env);
      const cartC = await clientC.cart.getCart();
      expect(cartC.cart?.isEmpty ?? true).toBe(true);
    },
    60_000,
  );
});
