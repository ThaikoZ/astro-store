import { describe, expect, it } from 'vitest';
import { buildCheckoutVariables } from './checkout';
import type { CountriesEnum } from './generated/sdk';

describe('buildCheckoutVariables', () => {
  it('builds a guest checkout payload', () => {
    const vars = buildCheckoutVariables({
      paymentMethod: 'cod',
      billing: {
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        address1: '1 Analytical Engine',
        city: 'London',
        country: 'GB' as CountriesEnum,
        postcode: 'SW1A 1AA',
      },
      shippingMethod: ['flat_rate:1'],
      customerNote: 'Please leave at door',
    });

    expect(vars.paymentMethod).toBe('cod');
    expect(vars.isPaid).toBe(false);
    expect(vars.account).toBeNull();
    expect(vars.shippingMethod).toEqual(['flat_rate:1']);
    expect(vars.metaData).toEqual([{ key: 'order_via', value: 'astro-store' }]);
    expect(vars.createdVia).toBe('astro-store');
    expect(vars.billing?.email).toBe('ada@example.com');
  });

  it('includes account when createAccount is set', () => {
    const vars = buildCheckoutVariables({
      paymentMethod: 'cheque',
      createAccount: true,
      account: { username: 'ada', password: 'secret' },
      shipToDifferentAddress: true,
      billing: { email: 'billing@example.com', country: 'US' as CountriesEnum },
      shipping: { email: 'ship@example.com', country: 'US' as CountriesEnum },
    });

    expect(vars.account).toEqual({ username: 'ada', password: 'secret' });
    expect(vars.shipToDifferentAddress).toBe(true);
    expect(vars.shipping?.email).toBe('ship@example.com');
  });

  it('marks paid Stripe-style checkouts', () => {
    const vars = buildCheckoutVariables({
      paymentMethod: 'stripe',
      isPaid: true,
      transactionId: 'pi_123',
      metaData: [
        { key: 'order_via', value: 'astro-store' },
        { key: '_stripe_payment_intent_id', value: 'pi_123' },
      ],
    });

    expect(vars.isPaid).toBe(true);
    expect(vars.transactionId).toBe('pi_123');
  });
});
