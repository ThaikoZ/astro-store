/**
 * Live coupon apply/remove (opt-in via WORDPRESS_TEST_COUPON).
 * Run: npm run test:live
 */
import { describe, expect, it } from 'vitest';
import { createLiveClient, findSimpleProduct, getLiveTestEnv } from './helpers';

const hasEndpoint = Boolean(process.env.WORDPRESS_GRAPHQL_URL);
const couponCode = process.env.WORDPRESS_TEST_COUPON;

describe.runIf(hasEndpoint && Boolean(couponCode))('WooCommerce SDK live coupons', () => {
  it(
    'applies and removes a known test coupon',
    async () => {
      const env = getLiveTestEnv();
      const code = env.testCoupon!;
      const woo = createLiveClient(env);
      const product = await findSimpleProduct(woo);

      await woo.cart.emptyCart().catch(() => undefined);
      await woo.cart.addToCart({ productId: product.databaseId, quantity: 1 });

      const applied = await woo.cart.applyCoupon(code);
      const appliedCodes =
        applied.applyCoupon?.cart?.appliedCoupons?.map((coupon) => coupon?.code?.toLowerCase()) ?? [];
      expect(appliedCodes).toContain(code.toLowerCase());
      expect(applied.applyCoupon?.applied?.code?.toLowerCase()).toBe(code.toLowerCase());
      expect(applied.applyCoupon?.cart?.discountTotal != null || applied.applyCoupon?.applied?.discountAmount).toBeTruthy();

      const removed = await woo.cart.removeCoupon([code]);
      const remaining =
        removed.removeCoupons?.cart?.appliedCoupons?.map((coupon) => coupon?.code?.toLowerCase()) ?? [];
      expect(remaining).not.toContain(code.toLowerCase());
    },
    60_000,
  );
});
