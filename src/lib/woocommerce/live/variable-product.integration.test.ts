/**
 * Live variable product add-to-cart (variationId path).
 * Run: npm run test:live
 *
 * Requires at least one VARIABLE product with an in-stock variation in the shop.
 * Skips (does not fail) when the catalog has none.
 */
import { describe, expect, it } from 'vitest';
import {
  createLiveClient,
  findVariableProductWithVariation,
  getLiveTestEnv,
} from './helpers';

const hasEndpoint = Boolean(process.env.WORDPRESS_GRAPHQL_URL);

describe.runIf(hasEndpoint)('WooCommerce SDK live variable product', () => {
  it(
    'adds a variation to the cart via variationId',
    async ({ skip }) => {
      const env = getLiveTestEnv();
      const woo = createLiveClient(env);
      const variable = await findVariableProductWithVariation(woo);
      if (!variable) {
        skip(
          'No VARIABLE product with an in-stock variation in the catalog. Publish one to enable this suite.',
        );
        return;
      }

      await woo.cart.emptyCart().catch(() => undefined);

      const input = {
        productId: variable.databaseId,
        variationId: variable.variationId,
        quantity: 1,
        ...(variable.variation.length ? { variation: variable.variation } : {}),
      };

      await woo.cart.addToCart(input);

      const cart = await woo.cart.getCart();
      expect(cart.cart?.isEmpty).toBe(false);
      expect((cart.cart?.contents?.itemCount ?? 0) > 0).toBe(true);

      const line = cart.cart?.contents?.nodes?.find((node) => {
        const productId = node?.product?.node?.databaseId;
        return productId === variable.databaseId;
      });
      expect(line?.key).toBeTruthy();
      expect(line?.quantity).toBe(1);
    },
    60_000,
  );
});
