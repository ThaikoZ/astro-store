import type { CheckoutOrderInput } from '../checkout';

export function processChequePayment(input: CheckoutOrderInput): CheckoutOrderInput {
  return {
    ...input,
    paymentMethod: 'cheque',
    isPaid: false,
  };
}
