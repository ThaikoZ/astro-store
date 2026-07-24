import type {
  DeleteOrderMutationVariables,
  GetOrderQueryVariables,
  GetOrdersQueryVariables,
} from './generated/sdk';
import type { WooClientInternals } from './types';

export type OrdersApi = ReturnType<typeof createOrdersApi>;

export function createOrdersApi(internals: WooClientInternals) {
  const { request } = internals;

  return {
    getOrders(variables?: GetOrdersQueryVariables) {
      return request((sdk) => sdk.getOrders(variables));
    },
    getOrder(variables: GetOrderQueryVariables) {
      return request((sdk) => sdk.getOrder(variables));
    },
    deleteOrder(variables: DeleteOrderMutationVariables) {
      return request((sdk) => sdk.deleteOrder(variables));
    },
  };
}
