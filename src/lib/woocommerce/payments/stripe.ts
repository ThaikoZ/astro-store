import { loadStripe, type Stripe, type StripeElements } from '@stripe/stripe-js';
import type { MetaDataInput } from '../generated/sdk';
import type { CheckoutOrderInput } from '../checkout';
import { WooGraphQLError } from '../errors';

export const STRIPE_META_KEYS = new Set([
  '_stripe_payment_intent_id',
  '_stripe_payment_method_id',
  '_stripe_source_id',
  '_stripe_fee',
  '_stripe_net',
  '_stripe_currency',
  '_stripe_charge_captured',
  '_wc_stripe_payment_method_type',
  '_stripe_intent_id',
]);

export function resolveStripeAmount(rawTotal: string | number | null | undefined, currency: string): number {
  const parsed = Number.parseFloat(String(rawTotal ?? '0'));
  if (!Number.isFinite(parsed)) return 0;

  const fractionDigits =
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).resolvedOptions().maximumFractionDigits ?? 2;

  return Math.round(parsed * 10 ** fractionDigits);
}

export function upsertMeta(metaData: MetaDataInput[], key: string, value: string): MetaDataInput[] {
  const next = [...metaData];
  const existing = next.find((entry) => entry.key === key);
  if (existing) {
    existing.value = value;
    return next;
  }
  next.push({ key, value });
  return next;
}

export function resetStripeMeta(metaData: MetaDataInput[] = []): MetaDataInput[] {
  return metaData.filter((entry) => !entry.key || !STRIPE_META_KEYS.has(entry.key));
}

export type StripeConfirmResult = {
  paymentIntentId: string;
  paymentMethodId?: string;
  checkoutInput: CheckoutOrderInput;
};

/**
 * Confirm a Stripe PaymentIntent client-side.
 * Your WordPress schema does not expose `stripePaymentIntent`; obtain `clientSecret`
 * from your Stripe/WooCommerce backend, then call this before `checkout`.
 */
export async function confirmStripePayment(options: {
  publishableKey: string;
  clientSecret: string;
  elements?: StripeElements;
  paymentMethodId?: string;
  checkoutInput: CheckoutOrderInput;
}): Promise<StripeConfirmResult> {
  const stripe = await loadStripe(options.publishableKey);
  if (!stripe) {
    throw new WooGraphQLError('Failed to load Stripe.js. Check PUBLIC_STRIPE_PUBLISHABLE_KEY.');
  }

  let paymentIntentId = '';
  let paymentMethodId = options.paymentMethodId;

  if (options.elements) {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements: options.elements,
      redirect: 'if_required',
      confirmParams: {},
    });
    if (error) throw new WooGraphQLError(error.message ?? 'Stripe confirmation failed');
    paymentIntentId = paymentIntent?.id ?? '';
    paymentMethodId = typeof paymentIntent?.payment_method === 'string' ? paymentIntent.payment_method : paymentMethodId;
  } else if (options.paymentMethodId) {
    const { error, paymentIntent } = await stripe.confirmCardPayment(options.clientSecret, {
      payment_method: options.paymentMethodId,
    });
    if (error) throw new WooGraphQLError(error.message ?? 'Stripe confirmation failed');
    paymentIntentId = paymentIntent?.id ?? '';
  } else {
    throw new WooGraphQLError('Stripe confirmation requires Elements or a paymentMethodId.');
  }

  if (!paymentIntentId) {
    throw new WooGraphQLError('Stripe confirmation did not return a PaymentIntent id.');
  }

  let metaData = resetStripeMeta(options.checkoutInput.metaData ?? []);
  metaData = upsertMeta(metaData, '_stripe_payment_intent_id', paymentIntentId);
  metaData = upsertMeta(metaData, '_stripe_intent_id', paymentIntentId);
  if (paymentMethodId) {
    metaData = upsertMeta(metaData, '_stripe_payment_method_id', paymentMethodId);
  }

  return {
    paymentIntentId,
    paymentMethodId,
    checkoutInput: {
      ...options.checkoutInput,
      paymentMethod: 'stripe',
      isPaid: true,
      transactionId: paymentIntentId,
      metaData,
    },
  };
}

export async function loadStripeClient(publishableKey: string): Promise<Stripe | null> {
  if (!publishableKey) return null;
  return loadStripe(publishableKey);
}

export function createPaymentIntentUnavailableError(): WooGraphQLError {
  return new WooGraphQLError(
    'stripePaymentIntent is not available on this WordPress schema. Create a PaymentIntent via your WooCommerce Stripe gateway / custom endpoint, then call confirmStripePayment().',
  );
}
