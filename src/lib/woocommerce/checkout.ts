import type {
  CheckoutMutationVariables,
  CreateAccountInput,
  CustomerAddressInput,
  MetaDataInput,
  UpdateCustomerInput,
} from './generated/sdk';
import type { WooClientInternals } from './types';

export type CheckoutOrderInput = {
  paymentMethod: string;
  billing?: CustomerAddressInput | null;
  shipping?: CustomerAddressInput | null;
  shippingMethod?: Array<string | null> | null;
  customerNote?: string | null;
  shipToDifferentAddress?: boolean;
  metaData?: MetaDataInput[] | null;
  transactionId?: string | null;
  isPaid?: boolean;
  createAccount?: boolean;
  account?: CreateAccountInput | null;
  createdVia?: string;
};

export type CheckoutApi = ReturnType<typeof createCheckoutApi>;

export function buildCheckoutVariables(input: CheckoutOrderInput): CheckoutMutationVariables {
  const paymentMethod = input.paymentMethod;
  const shipToDifferentAddress = Boolean(input.shipToDifferentAddress);
  const billing = input.billing ?? undefined;
  const shipping = shipToDifferentAddress ? (input.shipping ?? billing) : billing;

  const variables: CheckoutMutationVariables = {
    paymentMethod,
    billing: billing ?? {},
    shipping: shipping ?? {},
    shippingMethod: (input.shippingMethod ?? []).filter((method): method is string => Boolean(method)),
    customerNote: input.customerNote ?? '',
    shipToDifferentAddress,
    metaData: input.metaData ?? [{ key: 'order_via', value: 'astro-store' }],
    transactionId: input.transactionId ?? '',
    isPaid: Boolean(input.isPaid),
    createdVia: input.createdVia ?? 'astro-store',
  };

  if (input.createAccount && input.account) {
    variables.account = input.account;
  } else {
    variables.account = null;
  }

  return variables;
}

export function createCheckoutApi(internals: WooClientInternals) {
  const { request } = internals;

  return {
    updateCustomer(input: UpdateCustomerInput) {
      return request((sdk) => sdk.UpdateCustomer({ input }));
    },

    checkout(input: CheckoutOrderInput) {
      const variables = buildCheckoutVariables(input);
      return request((sdk) => sdk.Checkout(variables));
    },

    buildCheckoutVariables,
  };
}
