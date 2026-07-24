import type { Sdk } from './generated/sdk';
import type { SessionStore } from './session';

export type WooRequest = <T>(
  operation: (sdk: Sdk) => Promise<T>,
  options?: { skipAuthRefresh?: boolean },
) => Promise<T>;

export type WooClientInternals = {
  request: WooRequest;
  session: SessionStore;
  refreshAuthToken: (force?: boolean) => Promise<boolean>;
  stripePublishableKey: string | null;
};
