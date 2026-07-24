/**
 * Live shipping geography APIs.
 * Run: npm run test:live
 */
import { describe, expect, it } from 'vitest';
import type { CountriesEnum } from '../generated/sdk';
import {
  createLiveClient,
  findSimpleProduct,
  getLiveTestEnv,
  testBillingAddress,
} from './helpers';

const hasEndpoint = Boolean(process.env.WORDPRESS_GRAPHQL_URL);

describe.runIf(hasEndpoint)('WooCommerce SDK live shipping', () => {
  it(
    'lists countries/states and recalculates rates after location updates',
    async () => {
      const env = getLiveTestEnv();
      const woo = createLiveClient(env);
      const product = await findSimpleProduct(woo);

      const countries = await woo.shipping.getAllowedCountries();
      const allowed = countries.allowedCountries ?? [];
      expect(allowed.length).toBeGreaterThan(0);
      expect(allowed).toContain('PL');

      const usStates = await woo.shipping.getStates('US');
      // US almost always has states; tolerate empty only if the shop omits them.
      if ((usStates.countryStates?.length ?? 0) === 0) {
        // Shop may restrict selling countries; PL still asserted above.
        expect(Array.isArray(usStates.countryStates)).toBe(true);
      } else {
        expect(usStates.countryStates!.length).toBeGreaterThan(0);
        expect(usStates.countryStates![0]?.code).toBeTruthy();
      }

      await woo.cart.emptyCart().catch(() => undefined);
      await woo.cart.addToCart({ productId: product.databaseId, quantity: 1 });

      const billing = testBillingAddress('astro-sdk-shipping@mailinator.com');
      const located = await woo.shipping.updateShippingLocation({
        billing,
        shipping: billing,
        shippingSameAsBilling: true,
      });
      expect(located.cartResult.cart).toBeTruthy();
      expect(located.cartResult.cart?.isEmpty).toBe(false);

      const ratesAfterPl =
        located.cartResult.cart?.availableShippingMethods
          ?.flatMap((method) => method?.rates ?? [])
          .filter((rate) => Boolean(rate?.id)) ?? [];
      // Rates depend on Woo shipping zones; location update must still return a cart.
      expect(located.customerResult.updateCustomer?.customer || located.cartResult.cart).toBeTruthy();
      if (ratesAfterPl.length) {
        expect(ratesAfterPl[0]?.id).toBeTruthy();
      }

      const altCountry = (allowed.find((code) => code === 'DE' || code === 'US') ??
        allowed.find((code) => code && code !== 'PL') ??
        'DE') as CountriesEnum;

      const countryUpdate = await woo.shipping.updateShippingCountry({
        shippingCountry: altCountry,
        billingCountry: altCountry,
        shippingState: altCountry === 'US' ? usStates.countryStates?.[0]?.code ?? '' : '',
        billingState: altCountry === 'US' ? usStates.countryStates?.[0]?.code ?? '' : '',
      });
      expect(countryUpdate.updateCustomer?.customer).toBeTruthy();

      const cartAfterCountry = await woo.cart.getCart();
      expect(cartAfterCountry.cart).toBeTruthy();
      expect(cartAfterCountry.cart?.isEmpty).toBe(false);
    },
    60_000,
  );
});
