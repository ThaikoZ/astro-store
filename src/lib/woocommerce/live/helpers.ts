import { config as loadEnv } from 'dotenv';
import { createMemoryCookieAdapter, createWooClient, type WooClient } from '../index';
import type { CountriesEnum } from '../generated/sdk';

loadEnv();

export type LiveTestEnv = {
  endpoint: string;
  origin?: string;
  adminUser?: string;
  adminPassword?: string;
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
  };
}

export function createLiveClient(env: LiveTestEnv = getLiveTestEnv()): WooClient {
  return createWooClient({
    endpoint: env.endpoint,
    origin: env.origin,
    cookies: createMemoryCookieAdapter(),
  });
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
