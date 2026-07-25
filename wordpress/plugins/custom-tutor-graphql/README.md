# LMS Tutor GraphQL

Headless bridge between Astro and Tutor LMS Free.

## What it does

1. Exposes enrolled courses on WPGraphQL (`tutorEnrolledCourses`) for the JWT user.
2. Issues a one-time SSO handoff so Astro can open Tutor course URLs as a logged-in WP user.
3. Rewrites Tutor’s native lesson exit controls (X / mobile back) to the Astro `returnTo` URL under `/moje-konto`.

Purchase stays in WooCommerce on Astro.
Learning stays in Tutor on WordPress.

## Requirements

- Tutor LMS (Free is enough)
- WPGraphQL
- WPGraphQL JWT Authentication
- **`ASTRO_APP_ORIGIN`** (required - same value as Custom Headless Checkout)

Without `ASTRO_APP_ORIGIN`, the plugin shows an admin error notice and handoff REST returns `503` (`ctg_origin_missing`).

## Install

### Option A - zip

Upload [`../../dist/lms-tutor-graphql.zip`](../../dist/lms-tutor-graphql.zip) via Plugins → Add New → Upload Plugin → Activate **LMS Tutor GraphQL**.

### Option B - folder

1. Copy this folder to `wp-content/plugins/custom-tutor-graphql/`
2. Activate **LMS Tutor GraphQL**
3. Keep Tutor LMS active (needed for enrollment + player)

## Tutor + WooCommerce setup

1. Tutor LMS → Settings → Monetization → eCommerce Engine = **WooCommerce**
2. Enable **Automatically Complete WooCommerce Orders**
3. Link each sellable Woo product to its Tutor course (Free: manual product link on the course)
4. Complete a test order → confirm the buyer appears as enrolled in Tutor

## GraphQL

Authenticated query (Bearer JWT):

```graphql
query TutorEnrolledCourses {
  tutorEnrolledCourses {
    databaseId
    title
    slug
    thumbnailUrl
    progressPercent
    isCompleted
    tutorPermalink
  }
}
```

Astro opens courses via `tutorPermalink`.
WordPress handoff resolves the next unfinished lesson.
`continuePermalink` may still exist on newer schemas but is not required by Astro.

Unauthenticated callers receive an empty list.

## Handoff REST

```http
POST /wp-json/custom-tutor/v1/handoff
Content-Type: application/json

{
  "authToken": "<WPGraphQL JWT>",
  "remember": true,
  "redirectTo": "https://your-wordpress.example/szkolenia/course-slug/",
  "returnTo": "https://your-astro-site.example/moje-konto/?tab=kursy"
}
```

Response:

```json
{
  "handoff": "hexcode",
  "url": "https://your-wordpress.example/?tutor_handoff=hexcode"
}
```

Opening `url`:

1. Logs the user into WordPress
2. Re-checks enrollment for the target course (fails → storefront login error redirect)
3. Stores `returnTo` in a cookie for the Tutor exit rewrite
4. If `redirectTo` is a **course** URL, upgrades it to the **next unfinished lesson** (`tutor_utils()->get_course_first_lesson`)
5. Redirects into that lesson player

Failed handoff → `{ASTRO_APP_ORIGIN}/logowanie/?redirect=kursy&auth_error=handoff`.

Invalid JWT attempts are rate-limited per client IP (20 failures / 15 minutes → `429`).
Successful auth clears the failure counter.

## Return URL rules

`returnTo` must:

- Use `http` or `https`
- Match the host of `ASTRO_APP_ORIGIN`
- Have a path under `/moje-konto` (e.g. `/moje-konto/?tab=kursy`)

Other Astro paths are rejected.
Fallback: `{ASTRO_APP_ORIGIN}/moje-konto/?tab=kursy`.

## Back / exit from lesson player

Exit controls use the handoff `returnTo` cookie (fallback `{ASTRO_APP_ORIGIN}/moje-konto/?tab=kursy`).

**Tutor v4 learning area** (default): the header “Back to dashboard” control calls `tutor_dashboard_url()`.
On learner screens that empty-path URL is rewritten to Astro `returnTo` (so `/kopkit/` is not used).

**Legacy spotlight mode**: thin PHP bridge + JS rewrite the X / mobile-back icons.

Dashboard sub-routes (`tutor_dashboard_url( 'settings' )`, etc.) are not rewritten.

Set origin in `wp-config.php` (required for back link + CORS + handoff):

```php
define( 'ASTRO_APP_ORIGIN', 'https://your-astro-site.example' );
```
