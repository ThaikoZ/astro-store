import type { CheckoutOrderInput } from '../checkout';
import type { WooClientInternals } from '../types';
import { processChequePayment } from './cheque';
import { processCodPayment } from './cod';
import { buildPayPalRedirectUrl, isPayPalGateway } from './paypal';
import {
  confirmStripePayment,
  createPaymentIntentUnavailableError,
  loadStripeClient,
  resolveStripeAmount,
} from './stripe';

export type PaymentProcessContext = {
  checkoutInput: CheckoutOrderInput;
  /** Required for Stripe confirm */
  stripeClientSecret?: string;
  stripeElements?: Parameters<typeof confirmStripePayment>[0]['elements'];
  stripePaymentMethodId?: string;
  /** PayPal post-checkout redirect helpers */
  paypal?: {
    redirectUrl: string;
    orderId: string;
    orderKey: string;
    frontEndUrl: string;
  };
};

export type PaymentsApi = ReturnType<typeof createPaymentsApi>;

export function createPaymentsApi(internals: WooClientInternals) {
  return {
    isPayPalGateway,

    async process(gatewayId: string, ctx: PaymentProcessContext) {
      switch (gatewayId) {
        case 'cod':
          return { kind: 'checkout' as const, checkoutInput: processCodPayment(ctx.checkoutInput) };
        case 'cheque':
          return { kind: 'checkout' as const, checkoutInput: processChequePayment(ctx.checkoutInput) };
        case 'paypal':
        case 'ppcp-gateway':
          return {
            kind: 'checkout' as const,
            checkoutInput: { ...ctx.checkoutInput, paymentMethod: gatewayId, isPaid: false },
          };
        case 'stripe': {
          if (!internals.stripePublishableKey) {
            throw createPaymentIntentUnavailableError();
          }
          if (!ctx.stripeClientSecret) {
            throw createPaymentIntentUnavailableError();
          }
          const confirmed = await confirmStripePayment({
            publishableKey: internals.stripePublishableKey,
            clientSecret: ctx.stripeClientSecret,
            elements: ctx.stripeElements,
            paymentMethodId: ctx.stripePaymentMethodId,
            checkoutInput: ctx.checkoutInput,
          });
          return { kind: 'checkout' as const, checkoutInput: confirmed.checkoutInput, stripe: confirmed };
        }
        default:
          return {
            kind: 'checkout' as const,
            checkoutInput: { ...ctx.checkoutInput, paymentMethod: gatewayId },
          };
      }
    },

    buildPayPalRedirectUrl,

    loadStripe() {
      if (!internals.stripePublishableKey) return Promise.resolve(null);
      return loadStripeClient(internals.stripePublishableKey);
    },

    resolveStripeAmount,
  };
}

export { processCodPayment, processChequePayment, buildPayPalRedirectUrl, confirmStripePayment, resolveStripeAmount };
