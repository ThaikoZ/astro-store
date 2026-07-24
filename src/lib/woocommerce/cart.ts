import type { AddToCartInput } from './generated/sdk';
import type { WooClientInternals } from './types';

export type CartApi = ReturnType<typeof createCartApi>;

export function createCartApi(internals: WooClientInternals) {
  const { request } = internals;

  return {
    getCart() {
      return request((sdk) => sdk.getCart());
    },

    getCartSummary() {
      return request((sdk) => sdk.getCartSummary());
    },

    addToCart(input: AddToCartInput) {
      return request((sdk) => sdk.addToCart({ input }));
    },

    updateItemQuantity(key: string, quantity: number) {
      return request((sdk) => sdk.UpDateCartQuantity({ key, quantity }));
    },

    removeItem(key: string) {
      return request((sdk) => sdk.UpDateCartQuantity({ key, quantity: 0 }));
    },

    emptyCart() {
      return request((sdk) => sdk.EmptyCart());
    },

    applyCoupon(code: string) {
      return request((sdk) => sdk.applyCoupon({ code }));
    },

    removeCoupon(codes: string[]) {
      return request((sdk) => sdk.removeCoupons({ codes }));
    },
  };
}
