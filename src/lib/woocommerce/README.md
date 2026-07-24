# WooCommerce GraphQL SDK

Framework-agnostic TypeScript client for WPGraphQL + WooCommerce GraphQL.
Ported from WooNuxt’s commerce layer for use in Astro (server or future islands).

## Setup

1. Set env vars (see [`.env.example`](../../../.env.example)):

```bash
WORDPRESS_GRAPHQL_URL=https://your-site.example/graphql
PUBLIC_APP_ORIGIN=http://localhost:4321
PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

2. Regenerate types after schema or query changes:

```bash
npm run graphql:codegen
```

## Quick start

```ts
import { createWooClientFromEnv, createMemoryCookieAdapter } from '../woocommerce';

const woo = createWooClientFromEnv(import.meta.env, {
  cookies: createMemoryCookieAdapter(),
});

// Catalog (server-safe)
const { products } = await woo.catalog.getProducts({ first: 20 });
const product = await woo.catalog.getProduct('my-product-slug');

// Auth (WooGraphQL JWT)
const login = await woo.auth.login('user@example.com', 'password');
if (!login.success) throw new Error(login.error);

// Cart
await woo.cart.addToCart({ productId: 123, quantity: 1 });
const { cart, paymentGateways } = await woo.cart.getCart();

// Shipping
await woo.shipping.updateShippingMethod(['flat_rate:1']);
await woo.shipping.updateShippingLocation({
  shipping: { country: 'PL', postcode: '00-001', city: 'Warsaw' },
  billing: { country: 'PL', postcode: '00-001', city: 'Warsaw' },
});

// Payments + checkout
const prepared = await woo.payments.process('cod', {
  checkoutInput: {
    paymentMethod: 'cod',
    billing: { /* address */ },
    shippingMethod: cart?.chosenShippingMethods,
  },
});
const result = await woo.checkout.checkout(prepared.checkoutInput);
```

### Astro cookies (SSR later)

```ts
import { createAstroCookieAdapter } from '../woocommerce/astroCookies';
import { createWooClientFromEnv } from '../woocommerce';

const woo = createWooClientFromEnv(import.meta.env, {
  cookies: createAstroCookieAdapter(Astro.cookies),
});
```

## Session contract

| Cookie | Header |
| --- | --- |
| `woocommerce-session` | `woocommerce-session: Session ${cartToken}` |
| `auth-token` | `Authorization: Bearer ${jwt}` |
| `auth-refresh-token` | used by `refreshJwtAuthToken` |

Cart responses sync `customer.cartToken` / `viewer.cartToken` into the session cookie.

## Auth notes

This WordPress instance uses WooGraphQL JWT:

- `login(input: { username, password })`
- `refreshJwtAuthToken(input: { jwtRefreshToken })`
- No GraphQL `logout` mutation - `woo.auth.logout()` clears local cookies only

## Stripe notes

`stripePaymentIntent` is not on the current schema.
Obtain a PaymentIntent `clientSecret` from your WooCommerce Stripe setup, then:

```ts
const prepared = await woo.payments.process('stripe', {
  checkoutInput: { paymentMethod: 'stripe', /* ... */ },
  stripeClientSecret: clientSecret,
  stripeElements, // or stripePaymentMethodId
});
await woo.checkout.checkout(prepared.checkoutInput);
```

## Modules

- `woo.catalog` - products, categories, terms, stock
- `woo.auth` - login, register, logout, refresh, password reset
- `woo.cart` - cart CRUD, coupons
- `woo.shipping` - methods, location, countries/states
- `woo.checkout` - update customer, checkout mutation
- `woo.orders` - order list/detail
- `woo.payments` - cod, cheque, paypal redirect helpers, stripe confirm

## Queries

GraphQL documents live in [`queries/`](./queries/). Generated SDK: [`generated/sdk.ts`](./generated/sdk.ts).
