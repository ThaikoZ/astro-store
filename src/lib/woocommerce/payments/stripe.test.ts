import { describe, expect, it } from 'vitest';
import { isStripePaymentPaid } from './stripe';

describe('isStripePaymentPaid', () => {
  it('returns true only for succeeded and processing', () => {
    expect(isStripePaymentPaid('succeeded')).toBe(true);
    expect(isStripePaymentPaid('processing')).toBe(true);
    expect(isStripePaymentPaid('requires_action')).toBe(false);
    expect(isStripePaymentPaid('requires_payment_method')).toBe(false);
    expect(isStripePaymentPaid('canceled')).toBe(false);
    expect(isStripePaymentPaid(null)).toBe(false);
    expect(isStripePaymentPaid(undefined)).toBe(false);
  });
});
