import { config as loadEnv } from 'dotenv';
import {
  COOKIE_NAMES,
  createMemoryCookieAdapter,
  createWooClient,
  type CookieAdapter,
  type WooClient,
} from '../index';
import type { CountriesEnum, ProductTypesEnum, StockStatusEnum } from '../generated/sdk';

loadEnv();

export type LiveTestEnv = {
  endpoint: string;
  origin?: string;
  adminUser?: string;
  adminPassword?: string;
  testCoupon?: string;
};

export type SimpleProductFixture = {
  databaseId: number;
  slug: string | null;
  name: string | null;
};

export type VariableProductFixture = {
  databaseId: number;
  slug: string;
  name: string | null;
  variationId: number;
  variation: Array<{ attributeName: string; attributeValue: string }>;
};

export function getLiveTestEnv(): LiveTestEnv {
  const endpoint = process.env.WORDPRESS_GRAPHQL_URL;
  if (!endpoint) {
    throw new Error('WORDPRESS_GRAPHQL_URL is required for live integration tests.');
  }

  return {
    endpoint,
    origin: process.env.PUBLIC_APP_ORIGIN,
    adminUser: process.env.WORDPRESS_ADMIN_USER || process.env.WORDPRESS_TEST_USER || undefined,
    adminPassword: process.env.WORDPRESS_ADMIN_PASSWORD || process.env.WORDPRESS_TEST_PASSWORD || undefined,
    testCoupon: process.env.WORDPRESS_TEST_COUPON || undefined,
  };
}

export function createLiveClient(
  env: LiveTestEnv = getLiveTestEnv(),
  cookies: CookieAdapter = createMemoryCookieAdapter(),
): WooClient {
  return createWooClient({
    endpoint: env.endpoint,
    origin: env.origin,
    cookies,
  });
}

/** Snapshot session cookies so a new client can resume the same guest cart. */
export function snapshotSessionCookies(woo: WooClient): Record<string, string> {
  const cookies: Record<string, string> = {};
  const session = woo.session.getSessionToken();
  const auth = woo.session.getAuthToken();
  const refresh = woo.session.getRefreshToken();
  if (session) cookies[COOKIE_NAMES.session] = session;
  if (auth) cookies[COOKIE_NAMES.authToken] = auth;
  if (refresh) cookies[COOKIE_NAMES.refreshToken] = refresh;
  return cookies;
}

export function uniqueTestIdentity(prefix = 'astro-sdk') {
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const username = `${prefix}_${stamp}`.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 50);
  return {
    username,
    // example.com often yields empty registerCustomer payloads on this WP setup
    email: `${username}@mailinator.com`,
    password: `Test-${stamp}-Aa1!`,
  };
}

export function testBillingAddress(email: string, firstName = 'Astro', lastName = 'Tester') {
  return {
    firstName,
    lastName,
    email,
    phone: '500600700',
    address1: 'Testowa 1',
    city: 'Warszawa',
    postcode: '00-001',
    country: 'PL' as CountriesEnum,
    state: '',
  };
}

function isInStock(status: StockStatusEnum | null | undefined): boolean {
  return status === 'IN_STOCK' || status == null;
}

export async function findSimpleProduct(woo: WooClient): Promise<SimpleProductFixture> {
  const result = await woo.catalog.getProducts({ first: 50 });
  const nodes = result.products?.nodes ?? [];

  for (const node of nodes) {
    if (!node?.databaseId) continue;
    const type = (node as { type?: ProductTypesEnum | null }).type;
    if (type && type !== 'SIMPLE') continue;
    // Variable/external fragments also match getProducts; prefer nodes without variations.
    const maybeVariable = node as { variations?: { nodes?: unknown[] | null } | null };
    if (maybeVariable.variations?.nodes?.length) continue;
    const stockStatus = (node as { stockStatus?: StockStatusEnum | null }).stockStatus;
    if (!isInStock(stockStatus)) continue;
    return {
      databaseId: node.databaseId,
      slug: node.slug ?? null,
      name: node.name ?? null,
    };
  }

  throw new Error(
    'No purchasable simple product found in the catalog. Publish at least one in-stock simple product for live tests.',
  );
}

export async function findVariableProductWithVariation(
  woo: WooClient,
): Promise<VariableProductFixture | null> {
  const result = await woo.catalog.getProducts({ first: 50 });
  const candidates =
    result.products?.nodes?.filter((node) => {
      if (!node?.slug || !node.databaseId) return false;
      const type = (node as { type?: ProductTypesEnum | null }).type;
      if (type === 'VARIABLE') return true;
      const variations = (node as { variations?: { nodes?: unknown[] | null } | null }).variations;
      return Boolean(variations?.nodes?.length);
    }) ?? [];

  for (const candidate of candidates) {
    if (!candidate?.slug) continue;
    const detail = await woo.catalog.getProduct(candidate.slug);
    const product = detail.product as {
      databaseId?: number;
      slug?: string | null;
      name?: string | null;
      type?: ProductTypesEnum | null;
      variations?: {
        nodes?: Array<{
          databaseId: number;
          stockStatus?: StockStatusEnum | null;
          attributes?: {
            nodes?: Array<{
              name?: string | null;
              value?: string | null;
            } | null> | null;
          } | null;
        } | null> | null;
      } | null;
    } | null;

    if (!product?.databaseId || !product.slug) continue;
    if (product.type && product.type !== 'VARIABLE') continue;

    const variation = product.variations?.nodes?.find(
      (node) => node?.databaseId && isInStock(node.stockStatus),
    );
    if (!variation?.databaseId) continue;

    const attributes =
      variation.attributes?.nodes
        ?.filter((attr): attr is { name: string; value: string } =>
          Boolean(attr?.name && attr?.value),
        )
        .map((attr) => ({
          attributeName: attr.name,
          attributeValue: attr.value,
        })) ?? [];

    return {
      databaseId: product.databaseId,
      slug: product.slug,
      name: product.name ?? null,
      variationId: variation.databaseId,
      variation: attributes,
    };
  }

  return null;
}

export async function loginAsAdmin(env: LiveTestEnv = getLiveTestEnv()): Promise<WooClient> {
  if (!env.adminUser || !env.adminPassword) {
    throw new Error(
      'Set WORDPRESS_ADMIN_USER/WORDPRESS_ADMIN_PASSWORD (or WORDPRESS_TEST_USER/WORDPRESS_TEST_PASSWORD) for cleanup. The account must be able to deleteOrder and deleteUser.',
    );
  }

  const admin = createLiveClient(env);
  const result = await admin.auth.login(env.adminUser, env.adminPassword);
  if (!result.success) {
    throw new Error(`Admin login failed: ${result.error}`);
  }
  return admin;
}

export async function cleanupOrderAndUser(options: {
  orderId?: string | number | null;
  userId?: string | number | null;
  env?: LiveTestEnv;
}) {
  const env = options.env ?? getLiveTestEnv();
  const admin = await loginAsAdmin(env);
  const errors: string[] = [];

  if (options.orderId != null && options.orderId !== '') {
    try {
      await admin.orders.deleteOrder({ id: String(options.orderId), forceDelete: true });
    } catch (error) {
      errors.push(`deleteOrder(${options.orderId}): ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (options.userId != null && options.userId !== '') {
    try {
      await admin.auth.deleteUser({ id: String(options.userId) });
    } catch (error) {
      errors.push(`deleteUser(${options.userId}): ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (errors.length) {
    throw new Error(`Cleanup incomplete:\n${errors.join('\n')}`);
  }
}
