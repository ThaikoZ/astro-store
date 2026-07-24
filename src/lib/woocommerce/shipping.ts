import type {
  ChangeShippingCountyMutationVariables,
  CountriesEnum,
  UpdateCustomerInput,
} from './generated/sdk';
import type { WooClientInternals } from './types';

export type ShippingApi = ReturnType<typeof createShippingApi>;

export function createShippingApi(internals: WooClientInternals) {
  const { request } = internals;

  return {
    updateShippingMethod(shippingMethods: string[]) {
      return request((sdk) => sdk.ChangeShippingMethod({ shippingMethods }));
    },

    /** Convenience: update customer billing/shipping country+state to recalculate rates. */
    updateShippingCountry(variables: ChangeShippingCountyMutationVariables) {
      return request((sdk) => sdk.ChangeShippingCounty(variables));
    },

    async updateShippingLocation(input: UpdateCustomerInput) {
      const customerResult = await request((sdk) => sdk.UpdateCustomer({ input }));
      const cartResult = await request((sdk) => sdk.getCart());
      return { customerResult, cartResult };
    },

    getAllowedCountries() {
      return request((sdk) => sdk.getAllowedCountries());
    },

    getStates(country: CountriesEnum | string) {
      return request((sdk) => sdk.getStates({ country: country as CountriesEnum }));
    },
  };
}
