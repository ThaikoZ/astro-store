/**
 * Live cart mutation coverage (qty / remove / empty).
 * Run: npm run test:live
 */
import { describe, expect, it } from 'vitest';
import { createLiveClient, findSimpleProduct, getLiveTestEnv } from './helpers';

const hasEndpoint = Boolean(process.env.WORDPRESS_GRAPHQL_URL);

describe.runIf(hasEndpoint)('WooCommerce SDK live cart mutations', () => {
  it(
    'updates quantity, removes items, and empties the cart',
    async () => {
      const env = getLiveTestEnv();
      const woo = createLiveClient(env);
      const product = await findSimpleProduct(woo);

      // WooGraphQL errors when emptying an already-empty cart.
      await woo.cart.emptyCart().catch(() => undefined);
      let cart = await woo.cart.getCart();
      expect(cart.cart?.isEmpty ?? true).toBe(true);

      await woo.cart.addToCart({ productId: product.databaseId, quantity: 1 });
      cart = await woo.cart.getCart();
      expect(cart.cart?.isEmpty).toBe(false);
      expect(cart.cart?.contents?.itemCount).toBe(1);

      const line = cart.cart?.contents?.nodes?.[0];
      expect(line?.key).toBeTruthy();
      const key = line!.key;

      await woo.cart.updateItemQuantity(key, 3);
      cart = await woo.cart.getCart();
      const updated = cart.cart?.contents?.nodes?.find((node) => node?.key === key);
      expect(updated?.quantity).toBe(3);
      expect(cart.cart?.contents?.itemCount).toBe(3);

      await woo.cart.removeItem(key);
      cart = await woo.cart.getCart();
      const remaining = cart.cart?.contents?.nodes?.find((node) => node?.key === key);
      expect(remaining).toBeFalsy();
      expect(cart.cart?.isEmpty ?? true).toBe(true);

      await woo.cart.addToCart({ productId: product.databaseId, quantity: 1 });
      cart = await woo.cart.getCart();
      expect(cart.cart?.isEmpty).toBe(false);

      await woo.cart.emptyCart();
      cart = await woo.cart.getCart();
      expect(cart.cart?.isEmpty).toBe(true);
      expect(cart.cart?.contents?.nodes?.length ?? 0).toBe(0);
    },
    60_000,
  );
});
