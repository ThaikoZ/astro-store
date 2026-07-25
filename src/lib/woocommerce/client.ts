import { GraphQLClient } from 'graphql-request';
import { getSdk, type Sdk } from './generated/sdk';
import { createBrowserCookieAdapter, createMemoryCookieAdapter, type CookieAdapter } from './cookies';
import { extractGraphQLDataFromError, toWooGraphQLError } from './errors';
import {
  applySessionFromResponseHeaders,
  createSessionStore,
  extractCartToken,
  isTokenReusable,
  type SessionStore,
} from './session';
import type { WooClientInternals, WooRequest } from './types';
import { createCatalogApi, type CatalogApi } from './catalog';
import { createAuthApi, type AuthApi } from './auth';
import { createCartApi, type CartApi } from './cart';
import { createShippingApi, type ShippingApi } from './shipping';
import { createCheckoutApi, type CheckoutApi } from './checkout';
import { createOrdersApi, type OrdersApi } from './orders';
import { createPaymentsApi, type PaymentsApi } from './payments';

export type WooClientConfig = {
  endpoint: string;
  origin?: string;
  cookies?: CookieAdapter;
  stripePublishableKey?: string | null;
  fetch?: typeof fetch;
};

export type WooClient = {
  config: {
    endpoint: string;
    origin?: string;
    stripePublishableKey?: string | null;
  };
  session: SessionStore;
  sdk: Sdk;
  request: WooRequest;
  /** Run a raw GraphQL document with the same auth/session middleware as the SDK. */
  query: <TData>(
    document: string,
    variables?: Record<string, unknown>,
  ) => Promise<TData>;
  catalog: CatalogApi;
  auth: AuthApi;
  cart: CartApi;
  shipping: ShippingApi;
  checkout: CheckoutApi;
  orders: OrdersApi;
  payments: PaymentsApi;
};

function resolveCookieAdapter(cookies?: CookieAdapter): CookieAdapter {
  if (cookies) return cookies;
  if (typeof document !== 'undefined') return createBrowserCookieAdapter();
  return createMemoryCookieAdapter();
}

export function createWooClient(config: WooClientConfig): WooClient {
  if (!config.endpoint) {
    throw new Error('createWooClient requires an endpoint (WORDPRESS_GRAPHQL_URL).');
  }

  const cookies = resolveCookieAdapter(config.cookies);
  const session = createSessionStore(cookies);
  let refreshInFlight: Promise<boolean> | null = null;

  const graphQLClient = new GraphQLClient(config.endpoint, {
    credentials: 'include',
    fetch: config.fetch,
    requestMiddleware: (request) => {
      const headers = new Headers(request.headers as HeadersInit);
      const dynamic = session.buildHeaders(config.origin);
      for (const [key, value] of Object.entries(dynamic)) {
        headers.set(key, value);
      }
      return { ...request, headers };
    },
    responseMiddleware: (response) => {
      if (!response || typeof response !== 'object' || !('headers' in response)) return;
      applySessionFromResponseHeaders(session, (response as { headers?: Headers }).headers);
    },
  });

  const sdk = getSdk(graphQLClient);

  const refreshAuthToken = async (force = false): Promise<boolean> => {
    if (refreshInFlight) return refreshInFlight;

    const refreshToken = session.getRefreshToken();
    if (!refreshToken) {
      if (!session.getAuthToken()) session.clearAuth();
      return false;
    }

    if (!force && isTokenReusable(session.getAuthToken())) return true;

    refreshInFlight = (async () => {
      try {
        const result = await sdk.refreshJwtAuthToken({ jwtRefreshToken: refreshToken });
        const authToken = result.refreshJwtAuthToken?.authToken;
        if (!authToken) {
          if (!isTokenReusable(session.getAuthToken(), 0)) session.clearAuth();
          return false;
        }
        session.setAuthToken(authToken);
        return true;
      } catch {
        if (!isTokenReusable(session.getAuthToken(), 0)) session.clearAuth();
        return false;
      } finally {
        refreshInFlight = null;
      }
    })();

    return refreshInFlight;
  };

  const ensureAuthToken = async (): Promise<void> => {
    if (isTokenReusable(session.getAuthToken())) return;
    if (session.getRefreshToken()) {
      await refreshAuthToken(false);
    }
  };

  const request: WooRequest = async (operation, options = {}) => {
    if (!options.skipAuthRefresh) {
      await ensureAuthToken();
    }

    const run = async () => {
      try {
        return await operation(sdk);
      } catch (error) {
        const recovered = extractGraphQLDataFromError(error);
        if (recovered != null) return recovered as Awaited<ReturnType<typeof operation>>;
        throw error;
      }
    };

    try {
      const result = await run();
      syncSessionFromResult(session, result);
      return result;
    } catch (error) {
      const wooError = toWooGraphQLError(error);
      if (!options.skipAuthRefresh && wooError.isAuthError && session.getRefreshToken()) {
        const refreshed = await refreshAuthToken(true);
        if (refreshed) {
          try {
            const retryResult = await run();
            syncSessionFromResult(session, retryResult);
            return retryResult;
          } catch (retryError) {
            const retryWooError = toWooGraphQLError(retryError);
            if (retryWooError.isAuthError) {
              session.clearAuth();
            }
            throw retryWooError;
          }
        }
        session.clearAuth();
      }
      throw wooError;
    }
  };

  const query = async <TData>(
    document: string,
    variables?: Record<string, unknown>,
  ): Promise<TData> => {
    return request(async () => {
      return graphQLClient.request<TData>(document, variables);
    });
  };

  const internals: WooClientInternals = {
    request,
    session,
    refreshAuthToken,
    stripePublishableKey: config.stripePublishableKey ?? null,
  };

  return {
    config: {
      endpoint: config.endpoint,
      origin: config.origin,
      stripePublishableKey: config.stripePublishableKey ?? null,
    },
    session,
    sdk,
    request,
    query,
    catalog: createCatalogApi(internals),
    auth: createAuthApi(internals),
    cart: createCartApi(internals),
    shipping: createShippingApi(internals),
    checkout: createCheckoutApi(internals),
    orders: createOrdersApi(internals),
    payments: createPaymentsApi(internals),
  };
}

function syncSessionFromResult(session: SessionStore, result: unknown): void {
  if (!result || typeof result !== 'object') return;
  const record = result as Record<string, unknown>;

  const cartToken = extractCartToken({
    cartToken: typeof record.cartToken === 'string' ? record.cartToken : null,
    customer: record.customer as { cartToken?: string | null } | null,
    viewer: record.viewer as { cartToken?: string | null } | null,
    login: record.login as { cartToken?: string | null; customer?: { cartToken?: string | null } | null } | null,
  });

  if (cartToken) session.syncCartToken(cartToken);

  for (const value of Object.values(record)) {
    if (value && typeof value === 'object' && 'customer' in (value as object)) {
      const nestedCustomer = (value as { customer?: { cartToken?: string | null } }).customer;
      if (nestedCustomer?.cartToken) session.syncCartToken(nestedCustomer.cartToken);
    }
  }
}

export type { CookieAdapter };
export type { WooClientInternals } from './types';
