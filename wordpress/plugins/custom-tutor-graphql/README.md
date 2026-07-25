# LMS Tutor GraphQL

Headless bridge between Astro and Tutor LMS Free.

## What it does

1. Exposes enrolled courses on WPGraphQL (`tutorEnrolledCourses`) for the JWT user.
2. Issues a one-time SSO handoff so Astro can open Tutor course URLs as a logged-in WP user.
3. Injects **Wróć do konta** on Tutor course/lesson screens → Astro `/moje-konto/?tab=kursy`.

Purchase stays in WooCommerce on Astro.
Learning stays in Tutor on WordPress.

## Requirements

- Tutor LMS (Free is enough)
- WPGraphQL
- WPGraphQL JWT Authentication
- Same `GRAPHQL_JWT_AUTH_SECRET_KEY` / `ASTRO_APP_ORIGIN` as Custom Headless Checkout

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
2. Stores `returnTo` in a cookie for the Tutor back bar
3. If `redirectTo` is a **course** URL, upgrades it to the **next unfinished lesson** (`tutor_utils()->get_course_first_lesson`)
4. Redirects into that lesson player

Failed handoff → `{ASTRO_APP_ORIGIN}/logowanie/?redirect=kursy&auth_error=handoff`.

## Back / exit from lesson player

Tutor’s built-in lesson header exit controls (X and mobile back) are overridden to open the handoff `returnTo` URL instead of the course page / kokpit.

Astro sends the **current page** as `returnTo` (e.g. `/moje-konto/?tab=kursy`).
Fallback if missing/invalid: `{ASTRO_APP_ORIGIN}/moje-konto/?tab=kursy`.

Implementation:

- Template override: `templates/single/common/header.php` via `tutor_get_template_path`
- Filter `tutor_dashboard_url` on learner screens
- Small JS fallback for other Tutor exit/home controls

Set origin in `wp-config.php` (required for back link + CORS):

```php
define( 'ASTRO_APP_ORIGIN', 'https://your-astro-site.example' );
```
