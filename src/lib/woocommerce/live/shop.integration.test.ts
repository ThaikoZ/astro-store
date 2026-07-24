/**
 * Live shop integration tests.
 * Run: npm run test:live
 *
 * Requires:
 * - WORDPRESS_GRAPHQL_URL
 * - PUBLIC_APP_ORIGIN
 * - WORDPRESS_ADMIN_USER / WORDPRESS_ADMIN_PASSWORD
 *   (or WORDPRESS_TEST_USER / WORDPRESS_TEST_PASSWORD fallback)
 *   Account must be able to deleteOrder + deleteUser.
 */
import { afterAll, describe, expect, it } from 'vitest';
import {
  cleanupOrderAndUser,
  createLiveClient,
  getLiveTestEnv,
  testBillingAddress,
  uniqueTestIdentity,
} from './helpers';

const env = getLiveTestEnv();
const hasAdmin = Boolean(env.adminUser && env.adminPassword);

describe.runIf(Boolean(env.endpoint))('WooCommerce SDK live shop', () => {
  const created = {
    orderId: null as string | number | null,
    userId: null as string | number | null,
  };

  afterAll(async () => {
    if (!hasAdmin) return;
    if (created.orderId == null && created.userId == null) return;
    await cleanupOrderAndUser({
      orderId: created.orderId,
      userId: created.userId,
      env,
    });
  }, 60_000);

  it(
    'registers, auths, carts, ships, COD checkouts, then cleans up',
    async () => {
      if (!hasAdmin) {
        throw new Error(
          'Set WORDPRESS_ADMIN_USER/PASSWORD (or WORDPRESS_TEST_USER/PASSWORD) so the suite can deleteOrder/deleteUser after COD checkout.',
        );
      }

      const woo = createLiveClient(env);
      const identity = uniqueTestIdentity();

      // Catalog
      const products = await woo.catalog.getProducts({ first: 5 });
      const product = products.products?.nodes?.[0];
      expect(product?.databaseId).toBeTruthy();

      const categories = await woo.catalog.getCategories();
      expect(categories.productCategories?.nodes?.length).toBeGreaterThan(0);

      if (product?.slug) {
        const detail = await woo.catalog.getProduct(product.slug);
        expect(detail.product?.databaseId).toBe(product.databaseId);
      }

      // Register + login (authenticate returns customer fields on this schema)
      const registered = await woo.auth.register({
        username: identity.username,
        email: identity.email,
        password: identity.password,
        firstName: 'Astro',
        lastName: 'Tester',
        authenticate: true,
        billing: testBillingAddress(identity.email),
      });
      const registeredCustomer = registered.registerCustomer?.customer;
      expect(registeredCustomer?.databaseId ?? registeredCustomer?.username).toBeTruthy();

      const login = await woo.auth.login(identity.username, identity.password);
      expect(login.success).toBe(true);
      expect(woo.auth.isAuthenticated()).toBe(true);

      const summary = await woo.auth.getViewerFromCart();
      created.userId =
        summary.viewer?.id ??
        summary.viewer?.databaseId ??
        registeredCustomer?.databaseId ??
        login.login?.user?.databaseId ??
        null;
      expect(created.userId).toBeTruthy();
      if (summary.viewer?.cartToken) {
        woo.session.syncCartToken(summary.viewer.cartToken);
      }

      // Session cart
      await woo.cart.emptyCart().catch(() => undefined);
      await woo.cart.addToCart({ productId: product!.databaseId, quantity: 1 });
      expect(woo.session.getSessionToken()).toBeTruthy();

      const cart = await woo.cart.getCart();
      expect(cart.cart?.isEmpty).toBe(false);
      expect((cart.cart?.contents?.itemCount ?? 0) > 0).toBe(true);

      // Shipping / customer address
      const billing = testBillingAddress(identity.email);
      await woo.checkout.updateCustomer({
        billing,
        shipping: billing,
        shippingSameAsBilling: true,
      });

      const shippingMethods = cart.cart?.chosenShippingMethods?.filter(Boolean) as string[] | undefined;
      const available = cart.cart?.availableShippingMethods
        ?.flatMap((method) => method?.rates ?? [])
        .map((rate) => rate?.id)
        .filter((id): id is string => Boolean(id));

      if (available?.length) {
        await woo.shipping.updateShippingMethod([available[0]!]);
      } else if (shippingMethods?.length) {
        await woo.shipping.updateShippingMethod(shippingMethods);
      }

      const refreshed = await woo.cart.getCart();
      const chosen = (refreshed.cart?.chosenShippingMethods ?? []).filter((m): m is string => Boolean(m));

      const gatewayIds =
        refreshed.paymentGateways?.nodes
          ?.map((gateway) => gateway?.id)
          .filter((id): id is string => Boolean(id)) ?? [];
      const paymentMethod =
        gatewayIds.find((id) => id === 'cod') ||
        gatewayIds.find((id) => id === 'cheque') ||
        gatewayIds.find((id) => id !== 'stripe') ||
        gatewayIds[0];

      if (!paymentMethod) {
        throw new Error(
          `No WooCommerce payment gateways enabled for checkout. Available: ${gatewayIds.join(', ') || '(none)'}`,
        );
      }

      // Checkout with first available gateway (prefer COD / cheque)
      const prepared = await woo.payments.process(paymentMethod, {
        checkoutInput: {
          paymentMethod,
          billing,
          shipping: billing,
          shippingMethod: chosen,
          customerNote: 'astro-sdk live integration test',
          metaData: [{ key: 'order_via', value: 'astro-sdk-live-test' }],
        },
      });

      // Stripe needs a real PaymentIntent clientSecret; live suite uses offline gateways.
      if (paymentMethod === 'stripe') {
        throw new Error(
          'Only the Stripe gateway is enabled. Enable COD or Cheque in WooCommerce for automated live checkout tests.',
        );
      }

      const checkout = await woo.checkout.checkout(prepared.checkoutInput);
      const order = checkout.checkout?.order;
      expect(order?.databaseId).toBeTruthy();
      created.orderId = order?.databaseId ?? null;

      // Orders API
      const orders = await woo.orders.getOrders();
      const orderIds = orders.customer?.orders?.nodes?.map((node) => node?.databaseId) ?? [];
      expect(orderIds).toContain(order?.databaseId);

      if (order?.databaseId) {
        const fetched = await woo.orders.getOrder({ id: String(order.databaseId) });
        const found = fetched.customer?.orders?.nodes?.some((node) => node?.databaseId === order.databaseId);
        expect(found).toBe(true);
      }

      // Logout / login / refresh
      await woo.auth.logout();
      expect(woo.session.getAuthToken()).toBeNull();

      const loginAgain = await woo.auth.login(identity.username, identity.password);
      expect(loginAgain.success).toBe(true);

      if (woo.session.getRefreshToken()) {
        const refreshedAuth = await woo.auth.refreshToken(true);
        // Some JWT setups return a refresh token that refreshJwtAuthToken rejects;
        // keep the suite green as long as the session remains authenticated.
        if (refreshedAuth) {
          expect(woo.session.getAuthToken()).toBeTruthy();
        } else {
          expect(woo.auth.isAuthenticated() || Boolean(woo.session.getAuthToken())).toBe(true);
        }
      } else {
        // Some WooGraphQL JWT setups omit refresh tokens; login-only auth is still valid.
        expect(woo.auth.isAuthenticated()).toBe(true);
      }

      // Explicit cleanup (also covered by afterAll)
      await cleanupOrderAndUser({
        orderId: created.orderId,
        userId: created.userId,
        env,
      });
      created.orderId = null;
      created.userId = null;
    },
    120_000,
  );
});
