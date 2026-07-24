# WordPress extras for the Astro store

## Plugins (use these)

Install as normal WordPress plugins under `wp-content/plugins/`, then **Activate** them in WP Admin → Plugins.

| Path | Purpose |
| --- | --- |
| [`plugins/astro-checkout-ui/`](plugins/astro-checkout-ui/) | Brand card checkout UI + settings (auth, company fields, CSS) |
| [`plugins/astro-headless-checkout/`](plugins/astro-headless-checkout/) | Session + JWT auth handoff + return to Astro `/moje-konto/` |

Ready-made zips: [`dist/astro-checkout-ui.zip`](dist/astro-checkout-ui.zip), [`dist/astro-headless-checkout.zip`](dist/astro-headless-checkout.zip).

## Install

### Option A - WP Admin

1. Plugins → Add New → Upload Plugin
2. Upload `astro-checkout-ui.zip` → Install → **Activate**
3. Upload `astro-headless-checkout.zip` → Install → **Activate**

### Option B - FTP / File Manager

Unzip into `wp-content/plugins/` so you get:

```text
wp-content/plugins/astro-checkout-ui/astro-checkout-ui.php
wp-content/plugins/astro-checkout-ui/checkout.css
...
wp-content/plugins/astro-headless-checkout/astro-headless-checkout.php
```

Then activate both in Plugins.

### Checkout page must be classic WooCommerce

1. Deactivate Tutor LMS (or stop using Tutor checkout)
2. Pages → Checkout → Transform Checkout **block** → **Classic Shortcode** → Save  
   Or put `[woocommerce_checkout]` on the page
3. Hard-refresh `/checkout/`

You should see paper-background card checkout: form left, sticky cart right, **Zapłać**.

### Config

In `wp-config.php`:

```php
define( 'ASTRO_APP_ORIGIN', 'https://your-astro-site.example' );
define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'your-long-random-secret' );
```

Astro `.env`:

```bash
PUBLIC_WORDPRESS_URL=https://your-wordpress-site.example
PUBLIC_APP_ORIGIN=https://your-astro-site.example
```

`ASTRO_APP_ORIGIN` must match `PUBLIC_APP_ORIGIN` (used for return URL + REST CORS).

JWT handoff requires **WPGraphQL JWT Authentication** and the same `GRAPHQL_JWT_AUTH_SECRET_KEY` used for GraphQL login.

### Checkout UI settings

WP Admin → **WooCommerce → Checkout UI** (`astro-checkout-ui` **v3.1.0+**):

- Require login before checkout
- Enable/disable company + NIP fields
- Terms of use + privacy policy URLs (override Woo page links in checkout consent)
- Custom CSS (checkout only)

Public REST for Astro: `GET /wp-json/astro-checkout/v1/settings` → `{ authRequired, companyFieldsEnabled }`.

### Smoke test (redeploy)

1. Upload/replace `astro-checkout-ui` (**v3.1.0+**) and `astro-headless-checkout` (**v1.2.0+**) and keep both **Active**
2. Classic checkout: `[woocommerce_checkout]` (not Checkout block)
3. Hard-refresh `/checkout/` (bypass cache)
4. Confirm `…/wp-content/plugins/astro-checkout-ui/checkout.css` returns **200**
5. **Virtual course cart:** add a digital/course product → `/checkout/`
   - Paper page (`#f3f3f3`), two white cards
   - Left: **Dane zamawiającego**, fields (incl. phone), optional **Opis**, **Metoda płatności**
   - Right sticky: **Twój koszyk**, line items + qty badge, coupon, totals, ink **Zapłać**
   - Playfair headings, Montserrat body/CTA
6. Apply a coupon from the cart card (**Kod rabatowy** / Zastosuj) - totals refresh
7. **Physical cart (if available):** shipping address + **Dostawa** method cards on the left; cart totals show Dostawa line
8. Complete test payment → `/moje-konto/?tab=zamowienia`
9. Headless handoff: from Astro cart **Do kasy** → `/checkout/?session_id=t_…` (short key)
10. Logged-in handoff: URL briefly includes `auth_token`, then redirects to clean `?session_id=` with WP session logged in; order is assigned to that customer
11. With **Wymagane konto** enabled: guest **Do kasy** → Astro `/logowanie/?redirect=checkout`

## UI notes

- Classic checkout shortcode required (`[woocommerce_checkout]`). Block checkout is not supported.
- v3 brand cards: paper page, foam cards, ink CTA, Playfair + Montserrat (site tokens).
- Payment methods stay on the left; terms + place order stay on the right.
- Express wallets appear only if your Stripe/Woo gateway outputs them (hook: `astro_checkout_express_payment`).

See also [`src/lib/woocommerce/README.md`](../src/lib/woocommerce/README.md#hosted-woocommerce-checkout).
