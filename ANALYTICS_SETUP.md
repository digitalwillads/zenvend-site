# ZenVend site analytics setup (GA4)

Google Analytics 4 (gtag) is wired into every page but ships **dormant**. No
analytics loads and nothing is sent until the two client decisions below are made.
This closes item **A3** of `ZENVEND_GAP_PLAN.md` (marketing-site analytics).

All of it lives in one file: [`assets/analytics.js`](assets/analytics.js). It is
included in the `<head>` of all 8 pages (index, product, pricing, agents,
marketplaces, contact, about, faq).

## 1. Add the GA4 Measurement ID (required to activate)

In `assets/analytics.js`, set:

```js
measurementId: "G-XXXXXXXXXX",   // replace with the real GA4 ID
```

While it stays `G-XXXXXXXXXX` the site behaves exactly as today: no gtag.js
request, no cookie banner, no data collected. The console logs a one-line notice.
The moment a real ID is set, analytics + the consent flow activate everywhere.

Find the ID in Google Analytics: Admin → Data streams → your web stream → it looks
like `G-XXXXXXXXXX`.

## 2. Choose the consent behaviour

`requireConsent` in the same config controls the cookie stance:

- **`true` (default, privacy-first):** shows a small accept/decline banner and
  uses Google Consent Mode v2. Storage stays denied and gtag.js is not even
  requested until the visitor clicks Accept. Recommended for any EU/UK traffic.
- **`false`:** loads GA immediately on every page with no banner. Only use this
  if a privacy review has cleared unconditional analytics.

The banner is injected by the script (styled to match the site); it needs no HTML
or CSS changes. The visitor's choice is remembered in `localStorage`.

## What is tracked

- `page_view`: automatic (standard GA4).
- `demo_cta_click`: any "Book a demo" / "Start building" link to `contact.html`.
  Records the link text and page path only.
- `generate_lead`: the demo form submit on `contact.html`. Records `form_id` and
  page path only.

**No PII is ever sent.** Form field values are never read or transmitted; only the
fact that the form was submitted.

## Note on the in-admin GA module (platform)

The PDF also shows a per-tenant GA module inside MarketplaceOS admin (item **B4**).
That is a platform feature in a codebase not held in this workspace, and is
tracked as blocked in `ZENVEND_GAP_PLAN.md`. This setup covers the marketing site
only.
