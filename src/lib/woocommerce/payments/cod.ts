import type { CheckoutOrderInput } from '../checkout';

export function processCodPayment(input: CheckoutOrderInput): CheckoutOrderInput {
  return {
    ...input,
    paymentMethod: 'cod',
    isPaid: false,
  };
}
