# WooCommerce GraphQL SDK

Framework-agnostic TypeScript client for WPGraphQL + WooCommerce GraphQL.
Ported from WooNuxt’s commerce layer for use in Astro (server or future islands).

## WordPress plugins

Install and activate these on the WordPress site (plus WooCommerce itself):

| Plugin | Role |
| --- | --- |
| [WPGraphQL](https://wordpress.org/plugins/wp-graphql/) (`wp-graphql`) | GraphQL endpoint at `/graphql` |
| [WPGraphQL for WooCommerce](https://wordpress.org/plugins/wp-graphql-woocommerce/) (`wp-graphql-woocommerce`) | Products, cart, checkout, orders schema |
| [WPGraphQL JWT Authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication) (`wp-graphql-jwt-authentication`) | `login` / `refreshJwtAuthToken` used by `woo.auth` |

Without JWT Authentication, catalog/cart queries may still work for guests, but customer login and authenticated orders will not.

## Hosted WooCommerce checkout

The Astro cart redirects to native WordPress `/checkout/` (payment gateways stay on WooCommerce), then returns to Astro `/moje-konto/?tab=zamowienia`.

### 1. Install the MU-plugins on WordPress

Upload/activate as normal plugins under `wp-content/plugins/` (zips in `wordpress/dist/`):

- [`astro-headless-checkout`](../../../wordpress/plugins/astro-headless-checkout/) - session handoff + return URL
- [`astro-checkout-ui`](../../../wordpress/plugins/astro-checkout-ui/) - Stripe-style blank checkout UI

Activate both in WP Admin → Plugins. Checkout page must use classic `[woocommerce_checkout]` (not the Checkout block).

In `wp-config.php`, set the Astro origin (must match `PUBLIC_APP_ORIGIN` in production):

```php
define( 'ASTRO_APP_ORIGIN', 'https://your-astro-site.example' );
```

Headless checkout plugin:

- Loads the headless cart when `/checkout/?session_id=…` is opened
- Deletes that session after payment
- Redirects successful orders to `{ASTRO_APP_ORIGIN}/moje-konto/?tab=zamowienia&from_checkout=1`

Checkout UI plugin:

- Full-bleed split layout (summary left, form/pay right)
- Overrides `form-checkout.php` + `review-order.php`

### 2. Astro env

```bash
PUBLIC_WORDPRESS_URL=https://your-wordpress-site.example
PUBLIC_APP_ORIGIN=http://localhost:4321
```

Cart CTA **Do kasy** builds `{PUBLIC_WORDPRESS_URL}/checkout/?session_id=…` from the `woocommerce-session` cookie (`src/lib/shop/hostedCheckout.ts`).

## Setup

1. Set env vars (see [`.env.example`](../../../.env.example)):

```bash
WORDPRESS_GRAPHQL_URL=https://your-site.example/graphql
PUBLIC_WORDPRESS_GRAPHQL_URL=/api/graphql
PUBLIC_WORDPRESS_URL=https://your-site.example
PUBLIC_APP_ORIGIN=http://localhost:4321
PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

Browser auth calls same-origin `/api/graphql`, which Vite proxies to `WORDPRESS_GRAPHQL_URL` (see `astro.config.mjs`). That avoids CORS `Failed to fetch` in local/dev. Restart `astro dev` after changing the proxy target.

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

### Browser client (auth / cart islands)

```ts
import { getBrowserWooClient } from '../woocommerce';

const woo = getBrowserWooClient();
await woo.auth.login('user@example.com', 'password');
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

| Cookie | Outgoing request headers |
| --- | --- |
| `woocommerce-session` | `Cart-Token: ${token}` and `woocommerce-session: Session ${token}` |
| `auth-token` | `Authorization: Bearer ${jwt}` |
| `auth-refresh-token` | used by `refreshJwtAuthToken` |

The client syncs the guest session from:

1. Response headers after cart/auth requests (required for guest `addToCart` on this schema; mutation payloads do not return `customer.cartToken`):
   - Prefer modern WooGraphQL `cart-token`
   - Fall back to legacy `woocommerce-session`
2. GraphQL body fields when present: `customer.cartToken` / `viewer.cartToken` / login `cartToken`

For browser islands, WordPress CORS must expose the session header(s):

```http
Access-Control-Expose-Headers: cart-token, woocommerce-session
```

Without that, JS cannot read the header and guest carts will not persist across requests.

## Auth notes

This WordPress instance uses WooGraphQL JWT:

- `login(input: { username, password })`
- `refreshJwtAuthToken(input: { jwtRefreshToken })`
- No GraphQL `logout` mutation - `woo.auth.logout()` clears local cookies only

Browser auth UI routes:

| Page | Path |
| --- | --- |
| Login | `/logowanie/` |
| Register | `/rejestracja/` |
| Forgot password | `/nie-pamietam-hasla/` |
| Reset password | `/ustaw-haslo/?key=…&login=…` |
| Account | `/moje-konto/` |

Password-reset emails from `sendPasswordResetEmail` must deep-link to:

`{PUBLIC_APP_ORIGIN}/ustaw-haslo/?key={key}&login={login}`

Configure the WordPress lost-password email / redirect so those query params reach the Astro page.

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

`confirmStripePayment` only sets `isPaid: true` when PaymentIntent status is `succeeded` or `processing`.
Other statuses throw and must not proceed to checkout as paid.

## Modules

- `woo.catalog` - products, categories, terms, stock
- `woo.auth` - login, register, logout, refresh, password reset
- `woo.cart` - cart CRUD, coupons
- `woo.shipping` - methods, location, countries/states
- `woo.checkout` - update customer, checkout mutation
- `woo.orders` - order list/detail
- `woo.payments` - cod, cheque, paypal redirect helpers, stripe confirm

## Live integration tests

```bash
npm run test:live
```

Tests live under `src/lib/woocommerce/live/` (`*.integration.test.ts`):

| Suite | What it covers |
| --- | --- |
| `shop.integration.test.ts` | Register → login → cart → ship → COD/cheque checkout → orders → admin cleanup |
| `guest-cart.integration.test.ts` | Guest `addToCart` + cart-token persistence across a new client |
| `cart-mutations.integration.test.ts` | Quantity update, remove item, empty cart |
| `shipping.integration.test.ts` | `getAllowedCountries` / `getStates` + location/country updates |
| `variable-product.integration.test.ts` | Variable product `addToCart` with `variationId` |
| `coupons.integration.test.ts` | Apply/remove coupon (opt-in via `WORDPRESS_TEST_COUPON`) |

Required env (see [`.env.example`](../../../.env.example)):

```bash
WORDPRESS_GRAPHQL_URL=...
PUBLIC_APP_ORIGIN=...
WORDPRESS_ADMIN_USER=...      # can deleteOrder + deleteUser (shop suite)
WORDPRESS_ADMIN_PASSWORD=...
# or fallback:
# WORDPRESS_TEST_USER=...
# WORDPRESS_TEST_PASSWORD=...
# Optional coupon suite:
# WORDPRESS_TEST_COUPON=ASTROSDK
```

Shop fixtures expected by the live suites:

- At least one in-stock **simple** product
- Optional: a **variable** product with an in-stock variation (`variable-product` suite skips if missing)
- **Cash on delivery** (or Cheque) enabled for `shop.integration.test.ts`
- Optional: a WooCommerce coupon matching `WORDPRESS_TEST_COUPON`

Unit tests (`npm test`) stay offline and do not create shop data.
