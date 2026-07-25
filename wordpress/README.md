# WordPress extras for the Astro store

## Plugin (use this)

Install as a normal WordPress plugin under `wp-content/plugins/`, then **Activate** it in WP Admin → Plugins.

| Path | Purpose |
| --- | --- |
| [`plugins/custom-headless-checkout/`](plugins/custom-headless-checkout/) | Custom Headless Checkout - branded UI + session/JWT handoff + return to Astro `/moje-konto/` |
| [`plugins/custom-tutor-graphql/`](plugins/custom-tutor-graphql/) | LMS Tutor GraphQL - enrolled courses for Astro **Kursy** tab, SSO into Tutor LMS, back link to Astro |

Ready-made zips:

- [`dist/custom-headless-checkout.zip`](dist/custom-headless-checkout.zip)
- [`dist/lms-tutor-graphql.zip`](dist/lms-tutor-graphql.zip)

Tutor learner details: [`plugins/custom-tutor-graphql/README.md`](plugins/custom-tutor-graphql/README.md).

**Author:** Adrian Sudak, AlphaAi Ventures sp. z o.o. · [alphaaiventures.com](https://alphaaiventures.com)

This single plugin replaces the older split pair (`astro-checkout-ui` + `astro-headless-checkout`). Deactivate those if still installed.

## Install

### Option A - WP Admin

1. Plugins → Add New → Upload Plugin
2. Upload `custom-headless-checkout.zip` → Install → **Activate**

### Option B - FTP / File Manager

Unzip into `wp-content/plugins/` so you get:

```text
wp-content/plugins/custom-headless-checkout/custom-headless-checkout.php
wp-content/plugins/custom-headless-checkout/checkout.css
...
```

Then activate in Plugins. You may rename the folder before upload if you prefer a different slug.

### Checkout page must be classic WooCommerce

1. Keep Tutor LMS for course delivery, but do **not** use Tutor's checkout UI for the Astro shop
2. Pages → Checkout → Transform Checkout **block** → **Classic Shortcode** → Save  
   Or put `[woocommerce_checkout]` on the page
3. Hard-refresh `/checkout/`

You should see paper-background card checkout: form left, sticky cart right, **Zapłać**.

### Tutor LMS learner (account Kursy tab)

1. Activate **LMS Tutor GraphQL** (+ Tutor LMS, WPGraphQL, JWT auth)
2. Tutor → Settings → Monetization → WooCommerce; enable automatic order completion
3. Link each Woo product to its Tutor course
4. Astro `/moje-konto/?tab=kursy` lists enrolled courses via GraphQL
5. **Otwórz** exchanges JWT for `POST /wp-json/custom-tutor/v1/handoff` and opens Tutor logged-in
6. Tutor **Wróć do konta** returns to Astro `/moje-konto/?tab=kursy`

### Config

In `wp-config.php`:

```php
define( 'ASTRO_APP_ORIGIN', 'https://your-astro-site.example' );
// optional alias:
// define( 'CUSTOM_CHECKOUT_APP_ORIGIN', 'https://your-astro-site.example' );
define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'your-long-random-secret' );
```

Astro `.env`:

```bash
PUBLIC_WORDPRESS_URL=https://your-wordpress-site.example
PUBLIC_APP_ORIGIN=https://your-astro-site.example
```

`ASTRO_APP_ORIGIN` / `CUSTOM_CHECKOUT_APP_ORIGIN` must match `PUBLIC_APP_ORIGIN` (used for return URL + REST CORS).

JWT handoff requires **WPGraphQL JWT Authentication** and the same `GRAPHQL_JWT_AUTH_SECRET_KEY` used for GraphQL login.

Logged-in flow (never put the JWT in the checkout URL):

1. Astro `POST /wp-json/custom-checkout/v1/handoff` with `{ authToken, sessionId, remember }`
2. WP returns a one-time `{ handoff }` code (60s TTL)
3. Browser opens `/checkout/?session_id=…&handoff=CODE`
4. WP consumes the code once, sets the auth cookie (`remember`), merges the guest cart into the user session, deletes the guest session key, then redirects to clean `/checkout/`

Invalid/expired handoff → `{ASTRO_APP_ORIGIN}/logowanie/?redirect=checkout&auth_error=handoff`.

Legacy REST namespace `astro-checkout/v1` is still registered for compatibility.

### Checkout settings

WP Admin → **WooCommerce → Headless Checkout** (`custom-headless-checkout` **v1.0.0+**):

- Require login before checkout
- Enable/disable company + NIP fields
- Terms of use + privacy policy URLs; choose notice-only acceptance or a required checkbox
- Custom CSS (checkout only)

Public REST for Astro: `GET /wp-json/custom-checkout/v1/settings` → `{ authRequired, companyFieldsEnabled }`.

### Smoke test (redeploy)

1. Upload/replace `custom-headless-checkout` (**v1.0.0+**) and keep it **Active**; deactivate old Astro split plugins
2. Classic checkout: `[woocommerce_checkout]` (not Checkout block)
3. Hard-refresh `/checkout/` (bypass cache)
4. Confirm `…/wp-content/plugins/custom-headless-checkout/checkout.css` returns **200**
5. **Virtual course cart:** add a digital/course product → `/checkout/`
   - Paper page (`#f3f3f3`), two white cards
   - Left: **Dane zamawiającego**, fields (incl. phone), optional **Opis**, **Metoda płatności**
   - Right sticky: **Twój koszyk**, line items + qty badge, coupon, totals, ink **Zapłać**
   - Playfair headings, Montserrat body/CTA
6. Apply a coupon from the cart card (**Kod rabatowy** / Zastosuj) - totals refresh
7. **Physical cart (if available):** shipping address + **Dostawa** method cards on the left; cart totals show Dostawa line
8. Complete test payment → `/moje-konto/?tab=zamowienia`
9. Guest handoff: from Astro cart **Do kasy** → `/checkout/?session_id=t_…` (short key)
10. Logged-in handoff: Astro exchanges JWT for `handoff` via REST, opens `/checkout/?session_id=…&handoff=…`, then lands on clean `/checkout/` with WP session logged in and cart merged
11. With **Wymagane konto** enabled: guest **Do kasy** → Astro `/logowanie/?redirect=checkout`

## UI notes

- Classic checkout shortcode required (`[woocommerce_checkout]`). Block checkout is not supported.
- Brand cards: paper page, foam cards, ink CTA, Playfair + Montserrat (site tokens).
- Payment methods stay on the left; terms + place order stay on the right.
- Express wallets appear only if your Stripe/Woo gateway outputs them (hook: `astro_checkout_express_payment`).

See also [`src/lib/woocommerce/README.md`](../src/lib/woocommerce/README.md#hosted-woocommerce-checkout).
