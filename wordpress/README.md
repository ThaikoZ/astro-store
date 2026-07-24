# WordPress extras for the Astro store

## Plugins (use these)

Install as normal WordPress plugins under `wp-content/plugins/`, then **Activate** them in WP Admin → Plugins.

| Path | Purpose |
| --- | --- |
| [`plugins/astro-checkout-ui/`](plugins/astro-checkout-ui/) | Brand card checkout UI (form left, sticky cart right) |
| [`plugins/astro-headless-checkout/`](plugins/astro-headless-checkout/) | Headless session handoff + return to Astro `/moje-konto/` |

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
```

Astro `.env`:

```bash
PUBLIC_WORDPRESS_URL=https://your-wordpress-site.example
PUBLIC_APP_ORIGIN=https://your-astro-site.example
```

### Smoke test (redeploy)

1. Upload/replace `astro-checkout-ui` plugin (**v3** brand cards) and keep it **Active**
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
8. Complete test payment → `/moje-konto/?tab=zamowienia` (with headless plugin)

## UI notes

- Classic checkout shortcode required (`[woocommerce_checkout]`). Block checkout is not supported.
- v3 brand cards: paper page, foam cards, ink CTA, Playfair + Montserrat (site tokens).
- Payment methods stay on the left; terms + place order stay on the right.
- Express wallets appear only if your Stripe/Woo gateway outputs them (hook: `astro_checkout_express_payment`).

See also [`src/lib/woocommerce/README.md`](../src/lib/woocommerce/README.md#hosted-woocommerce-checkout).
