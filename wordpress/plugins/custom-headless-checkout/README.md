# Custom Headless Checkout

Headless WooCommerce checkout for Astro (or similar) storefronts.

Branded blank checkout UI, guest session handoff, JWT login via one-time codes, and return to the storefront account page after payment.

**Version:** 1.0.1  
**Author:** Adrian Sudak, AlphaAi Ventures sp. z o.o.  
**Website:** [alphaaiventures.com](https://alphaaiventures.com)

---

## Requirements

- WordPress 6.0+
- PHP 8.0+
- WooCommerce (classic checkout shortcode `[woocommerce_checkout]` - not the Checkout block)
- For logged-in handoff: [WPGraphQL JWT Authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication) and matching `GRAPHQL_JWT_AUTH_SECRET_KEY`

---

## Install

1. Upload this folder to `wp-content/plugins/` (or install the zip via Plugins → Add New → Upload).
2. You may rename the folder before upload if you prefer a different slug.
3. Activate **Custom Headless Checkout** in WP Admin → Plugins.
4. If you previously used `astro-checkout-ui` and/or `astro-headless-checkout`, deactivate those.
   This plugin replaces both.
5. Ensure the Checkout page uses classic `[woocommerce_checkout]`.

---

## Configuration

### Storefront origin (`wp-config.php`)

Used for post-payment return URL and CORS on public REST routes.

```php
define( 'ASTRO_APP_ORIGIN', 'https://your-astro-site.example' );
// Optional alias (checked first if both are set):
// define( 'CUSTOM_CHECKOUT_APP_ORIGIN', 'https://your-astro-site.example' );
```

Also supported: WordPress options `astro_app_origin` or `custom_checkout_app_origin`.

The origin must match the storefront `PUBLIC_APP_ORIGIN` (no trailing slash mismatch).

### JWT secret

Same secret as GraphQL login on the storefront:

```php
define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'your-long-random-secret' );
```

### Admin settings

**WooCommerce → Headless Checkout**

| Setting | Purpose |
| --- | --- |
| Wymagane konto | Require login before checkout (storefront gates on this via REST) |
| Pola firmowe | Show “Kupuję jako firma”, company name, NIP |
| URL regulaminu | Terms link in checkout consent |
| URL polityki prywatności | Privacy link in checkout consent |
| Własny CSS | Injected only on the blank checkout page |

Existing settings from the old option `astro_checkout_ui_settings` are migrated once into `custom_headless_checkout_settings`.

---

## How checkout works

### Guest

1. Storefront cart builds `/checkout/?session_id={woo_session_key}`.
2. This plugin loads that Woo session into the checkout cart.
3. After payment, the guest session is deleted and the buyer is sent to the storefront account orders tab.

### Logged-in (one-time handoff)

Never put the JWT in the checkout URL.

1. Storefront `POST /wp-json/custom-checkout/v1/handoff` with JSON body:

```json
{
  "authToken": "<wpgraphql-jwt>",
  "sessionId": "t_…",
  "remember": true
}
```

2. Plugin validates the JWT, stores a single-use code (60s TTL), returns `{ "handoff": "<hex>" }`.
3. Browser opens `/checkout/?session_id=…&handoff=<hex>`.
4. Plugin consumes the code once, sets the WordPress auth cookie (`remember` flag), merges the guest cart into the logged-in user session, deletes only the guest session key (`t_…` - never the customer’s own session id), then redirects to clean `/checkout/`.

Invalid or expired handoff redirects to:

`{APP_ORIGIN}/logowanie/?redirect=checkout&auth_error=handoff`

### Return URL after payment

Successful orders return to:

`{APP_ORIGIN}/moje-konto/?tab=zamowienia&from_checkout=1`

Optional query args: `order_id`, `order_key`.

---

## REST API

Primary namespace: `custom-checkout/v1`  
Legacy alias (same handlers): `astro-checkout/v1`

| Method | Route | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/wp-json/custom-checkout/v1/settings` | Public | `{ authRequired, companyFieldsEnabled }` |
| `OPTIONS` | same | Public | CORS preflight |
| `POST` | `/wp-json/custom-checkout/v1/handoff` | Public (JWT in body) | Exchange JWT for one-time handoff code |
| `OPTIONS` | same | Public | CORS preflight |

CORS `Access-Control-Allow-Origin` is set only for the configured storefront origin.

### Settings response

```json
{
  "authRequired": false,
  "companyFieldsEnabled": true
}
```

### Handoff response

```json
{
  "handoff": "a1b2c3…64 hex chars"
}
```

Errors: `401` with code `chc_handoff_invalid` when the token is missing, invalid, or expired.

---

## File layout

```text
custom-headless-checkout/
├── custom-headless-checkout.php   # Bootstrap, plugin header
├── README.md                      # This file
├── checkout.css                   # Blank checkout styles
├── checkout.js                    # Checkout UI behaviour
├── template-checkout.php          # Blank theme shell
├── includes/
│   ├── settings.php               # Admin UI + settings REST
│   ├── headless.php               # Session load, handoff, return URL
│   └── checkout-ui.php            # Templates, fields, assets
└── woocommerce/checkout/          # Woo template overrides
    ├── form-checkout.php
    ├── review-order.php
    ├── payment.php
    ├── payment-methods.php
    ├── place-order.php
    └── terms.php
```

---

## UI notes

- Classic shortcode checkout only.
- Layout: form left, sticky cart right, paper background, Playfair + Montserrat.
- Place order button label: **Zapłać**.
- Terms: custom copy plus required `terms` / `terms-field` checkbox when terms/privacy URLs (or Woo terms) apply.
- Express wallets only appear if your payment gateway outputs them (action: `astro_checkout_express_payment`).

---

## Smoke test

1. Activate this plugin; deactivate legacy Astro checkout plugins.
2. Open `/checkout/` with a cart - branded cards, fonts, **Zapłać**.
3. Confirm `…/wp-content/plugins/<folder>/checkout.css` returns HTTP 200.
4. Guest: storefront **Do kasy** → `/checkout/?session_id=t_…` with cart lines.
5. Logged-in: handoff REST → `/checkout/?session_id=…&handoff=…` → clean `/checkout/` with cart and WP session.
6. With **Wymagane konto** on: guest is sent to storefront login before checkout.
7. Complete a test payment → land on storefront `/moje-konto/?tab=zamowienia`.

---

## Migration from split plugins

| Old | New |
| --- | --- |
| `astro-checkout-ui` + `astro-headless-checkout` | This plugin only |
| Option `astro_checkout_ui_settings` | Migrated to `custom_headless_checkout_settings` |
| REST `astro-checkout/v1/*` | Still works; prefer `custom-checkout/v1/*` |
| Transient prefix `astro_handoff_` | New codes use `chc_handoff_` (old prefix still accepted once) |

---

## Support

AlphaAi Ventures sp. z o.o.  
https://alphaaiventures.com
