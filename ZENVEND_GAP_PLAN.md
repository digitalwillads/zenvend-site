# ZenVend — Marketing-Site Verbiage Refresh (align site to Marketplace OS)

Source: `Marketplace Points.pdf`. Prepared 2026-07-28. **Reframed 2026-07-28** after a
repo hunt + email-trail review — see "Scope correction" below.

## Scope correction (READ FIRST) — "MarketplaceOS" is not a competitor

The PDF was initially read as a competitor comparison. It is not. Findings:

- **`app.zenvend.ai` is live and serves the "Marketplace OS" app** (Next.js 15 /
  React 19 / Supabase / Stripe, on someone else's Vercel). It matches the PDF's
  "MarketplaceOS" screenshots verbatim ("Launch in minutes. Operate forever.",
  21 agents, Intercom). **The "competitor" is ZenVend's own new/upgraded platform.**
- **It was built by Monam Khalid, commissioned by Michael Leto** (per the June 8 2026
  "AI Marketplace OS" brief and Michael's emails to Will). DWA was hired for the
  **marketing site only**; the platform is not our code.
- **The PDF is a verbiage spec, not a build spec.** Michael Leto, Jul 27: "The ZENVEND
  sections are what you currently have — the Marketplace OS notes are what the verbiage
  should be." It contrasts the *current site copy* against the *positioning the site
  should adopt* now that the platform is upgraded.
- **Confirmed 2026-07-28: DWA is NOT working on the platform.**

**Therefore Track B below (build 21 agents, Bug Reports, Backups, GA/SEO admin
modules, in-app Intercom) is OUT OF SCOPE — not "blocked on a missing repo."** The
platform already exists and is owned by Michael Leto's developer. There is no repo for
us to find or build. The whole engagement is: **update `zenvend-site` marketing copy to
describe the Marketplace OS feature set and positioning.**

## What the refresh actually is (the real deliverable)

Rewrite/extend `zenvend-site` copy to match `app.zenvend.ai`'s positioning:

- **CTA — now a real "Deploy Free."** The platform self-provisions (Will confirmed you
  can sign up and build/operate a marketplace immediately at `app.zenvend.ai`), so the
  A1 blocker is gone: the site can lead with "Deploy Free" pointing to `app.zenvend.ai`,
  with "Book a demo" as secondary. (A1 below, reality-check now satisfied.)
- **`agents.html`** currently advertises **"Seven agents. One calm operation"** and
  names 7. The platform now runs the fuller agent roster shown in the PDF — this page's
  copy should be expanded to match. **This is a copy update, not building agents.**
- **Feature/positioning copy** — Bug Reports, Backups, built-in Analytics, SEO controls,
  live chat, "Launch in minutes. Operate forever." messaging: describe these as
  platform capabilities in the marketing copy where useful. Copy only.

### Delivered in this pass (2026-07-28): brand-agnostic copy/CTA refresh ✅

All work is copy/CTA only. The ZenVend name is kept (brand decision still open, see
Open question #1); nothing was renamed to Marketplace OS.

- **CTA → "Deploy free" (A1 done).** Every primary CTA is now **"Deploy free"** linking
  to `https://app.zenvend.ai`, with **"Book a demo"** (→ `contact.html`) demoted to the
  secondary/ghost button. Applied site-wide: nav (single primary, to avoid header
  overflow), mobile menu (primary + secondary stacked), and every hero and final-CTA
  cluster across all 8 pages. The Starter pricing tier CTA is also "Deploy free"; the Pro
  tier keeps "Book a demo" (agency/sales-led). A greppable
  `TODO(deploy-free-url)` comment sits in each page's nav flagging that the **exact
  self-service signup path** still needs client confirmation (using `app.zenvend.ai`;
  may be `/signup`). See Open question #2.
- **`agents.html` expanded 7 → 20+.** Headline is now **"Twenty-plus agents. One calm
  operation."** The 7 detailed core agents are kept; a new "wider roster" grid adds 11
  more (Content Moderation, Review Authenticity, Buyer Recommendations, Cart Recovery,
  CRM, Dispute Analysis, Operational Intelligence, Payments, Seller Performance, SEO,
  Tenant Health Monitor). 18 agents are described; the count badge reads **"20+"** to
  stay honest against the PDF's ~21 without inventing names. A `TODO(client)` comment
  asks to confirm the full roster/exact count against `app.zenvend.ai`. Copy only, no
  agents were built.
- **Count synced site-wide.** "Seven"/"7" agent references on `index.html`, `faq.html`,
  and `pricing.html` were updated to the "twenty-plus" / "full crew" framing so the site
  no longer contradicts itself.
- **Feature/positioning copy.** `product.html` capabilities now mention automated
  backups + one-click restore, built-in live chat, and built-in SEO controls. The
  "Launch in minutes. Operate forever." positioning already ran through the site and was
  left intact.
- **Left untouched (as instructed):** GA4 (`assets/analytics.js`, PR #3, dormant),
  the staged Intercom snippet in `assets/main.js`, and the deferred on-page SEO
  (OG/canonical/sitemap, A4). Note: those live on other branches and are not present in
  this branch's base, so there was nothing to duplicate here.
- **Em dashes:** removed from every line this pass rewrote, plus the mechanical
  site-wide chrome (page `<title>`s, footer tagline, footer brand line) now use the
  site's existing `·` separator. Pre-existing em dashes remain in deeper body prose on
  every page (about/marketplaces/product especially) and are a recommended follow-up if
  a full account-style purge is wanted; they were left to avoid rewriting untouched
  client voice.

**Open brand question for the client:** the app is branded **"Marketplace OS"** while
the site is **"ZenVend."** Is the site being rebranded to Marketplace OS, or keeping the
ZenVend name and just adopting the new positioning? This drives how far the copy pass goes.

---

## Track A — Marketing site (`zenvend-site`) — this IS the engagement

Current state verified in this repo:
- Every primary CTA is **"Book a demo"** (sales-led). No self-service path.
- **No Intercom** live chat on any page.
- **No Google Analytics / gtag** on any page.

### A1. CTA strategy: sales-led vs self-service  — Priority: HIGH  ✅ DONE (copy/CTA)
- **Gap:** MarketplaceOS leads with "Deploy Free" (instant self-service). Zenvend
  leads with "Book a demo" (form → sales follow-up).
- **Reality check:** "Deploy Free" only works if the platform actually supports
  self-service signup + instant provisioning. That is a *platform* capability, not a
  copy change. If the backend can't self-provision, changing the button is misleading.
- **Options:**
  1. Keep "Book a demo" as primary, **add a secondary** "Start free" / "See it live"
     CTA that routes to a lighter path (interactive demo, sandbox, waitlist).
  2. Full "Deploy Free" swap — **only** if platform self-service exists (blocked on
     platform repo / client confirmation).
- **Files:** `index.html`, `product.html`, `pricing.html`, `agents.html`,
  `marketplaces.html` (CTA appears across the site).
- **Effort:** copy/CTA restructure = ~half day. Full self-service flow = platform work.
- **Decision owner:** client. Do not swap the button without confirming provisioning.

### A2. Intercom live chat  — Priority: MEDIUM
- **Gap:** MarketplaceOS has site-wide Intercom; Zenvend has none.
- **Work:** add Intercom widget snippet to a shared include / every page footer.
- **Blockers:** client must provide an Intercom workspace + `app_id`. Confirm GDPR/
  cookie-consent stance before adding a third-party tracker.
- **Files:** all `*.html` (or a shared footer partial if we introduce one).
- **Effort:** ~2 hours once we have the `app_id`.
- **Status (2026-07-28):** boot snippet **staged but INACTIVE** in
  `assets/main.js` (loaded by all 8 pages, so no per-page footer edits needed).
  `APP_ID` is empty, so the block is a no-op and nothing fires. Two items still
  block go-live: (1) client-supplied Intercom `app_id`; (2) cookie-consent
  decision is **on hold** pending client/legal (no consent banner or privacy
  policy exists yet). See the `CONSENT GATE` marker in `assets/main.js`.

### A3. (bonus, implied by PDF) Google Analytics on the marketing site  — Priority: MEDIUM  ✅ DONE
- **Gap:** the PDF's GA item is about an in-admin GA module, but the *marketing site*
  itself also has no analytics at all — we can't measure demo-CTA conversion today.
- **Work:** add GA4 `gtag` with the client's Measurement ID; track demo-form submits.
- **Blockers:** client's GA4 Measurement ID + cookie-consent decision.
- **Effort:** ~1-2 hours.
- **Status (2026-07-28): DONE, shipped dormant (PR #3).** GA4 (gtag) is wired
  into all 8 pages via one self-contained module, `assets/analytics.js`, with
  demo-funnel events (`page_view`, `demo_cta_click`, `generate_lead`) and no PII.
  It ships **dormant**: while the Measurement ID is the placeholder `G-XXXXXXXXXX`
  there is no gtag request, no banner, and nothing sent. The cookie-consent
  decision is resolved in-code with a privacy-first Consent Mode v2 banner
  (storage denied and gtag not requested until the visitor accepts;
  `requireConsent: false` loads unconditionally if the client's review clears it).
  Two client inputs remain to activate: (1) real GA4 Measurement ID; (2) confirm
  the consent stance. See `ANALYTICS_SETUP.md` for the one-line activation.

### A4. On-page SEO pass on the 8 marketing pages  — Priority: LOW/MEDIUM (PENDING, optional)
- **Origin:** the marketing-site slice of the B5 SEO item. B5's *admin module* is
  platform work and stays blocked (see Track B); this is the part we could ship in
  `zenvend-site` independent of the platform repo.
- **Audit (verified 2026-07-28, all 8 pages: index, about, agents, contact, faq,
  marketplaces, pricing, product):**
  - Present on every page: `<title>`, `meta name="description"`, inline-SVG favicon.
  - Missing on every page: Open Graph tags, Twitter card, `canonical`.
  - Missing site-wide: `sitemap.xml`, `robots.txt`, an `og:image` share asset.
- **Work (when picked up):** add OG + Twitter card + canonical to each page, generate
  `sitemap.xml` + `robots.txt`, add a simple OG share image (~2-3 hours).
- **Decision needed first:** canonical / `og:url` / sitemap URLs need a confirmed
  production domain (brand is `ZenVend.ai`; current host is `zenvend-site.fly.dev` —
  not yet confirmed which is live). A relative-path-only pass is possible but weaker.
- **Status (2026-07-28):** reviewed and **deferred by the client owner** — documented
  only, no page changes made this pass. Resume once the production domain is confirmed.

---

## Track B — Platform / admin app — OUT OF SCOPE

**Not our work.** These are features of `app.zenvend.ai` (the Marketplace OS platform),
built by Michael Leto's developer (Monam Khalid), not by DWA. Confirmed 2026-07-28 that
DWA is not working on the platform. The table is kept only as a reference for what the
*marketing copy* should describe — none of it is a build task for us. The earlier
"blocked on a missing repo" framing was based on misreading the PDF as a competitor
comparison; there is no repo for us to find. Where a PDF item has a legitimate
**marketing-site** slice, it is tracked in Track A (e.g. the on-page SEO slice = A4).

| # | Feature (PDF) | What it is | Priority | Notes |
|---|---|---|---|---|
| B1 | **AI agents 7 → 21** | Add analytics, fraud detection, SEO, CRM, payments, content moderation, workflow, seller performance, dispute analysis, tenant-health agents | HIGH | Biggest headline gap (7 vs 21). Each agent = its own build + config UI. Large. |
| B2 | **Bug Reports module** | In-app "report a bug" + admin dashboard (status, notes, filter) | MEDIUM | Self-contained; good early win once repo found. **BLOCKED — re-verified 2026-07-28** (see note below). |
| B3 | **Backup & Restore module** | Admin creates/restores marketplace snapshots (listings, orders, settings; excludes Stripe creds/billing) | MEDIUM | Needs data-model snapshot strategy; test restore carefully. |
| B4 | **Google Analytics admin module** | Admin pastes GA4 Measurement ID; auto-tracks page_view, view_item, begin_checkout, purchase | MEDIUM | Distinct from A3 (this is per-tenant, admin-configured). |
| B5 | **SEO admin module** | Meta tags, Open Graph, XML sitemap, robots.txt, per-page overrides from admin | MEDIUM | Template-driven; moderate. **BLOCKED — re-verified 2026-07-28** (see note below). Marketing-site slice tracked as A4. |
| B6 | **Intercom in-platform** | Live chat inside the tenant app (buyers/sellers/admins) | LOW | Same Intercom snippet as A2, applied in-app. |

### B2 (Bug Reports) — blocker re-verification, 2026-07-28

Picked up B2 as the recommended first platform win. Before scoping, re-checked
whether the platform/admin codebase is reachable anywhere:

- **Local workspace:** only `zenvend-site` and `zenvend-design-concepts` present. Both
  marketing-only. No platform/admin app.
- **`digitalwillads` org (GitHub):** `zenvend-site`, `zenvend-design-concepts`, plus
  unrelated repos (`bracesbar`, `immigration-lawyer-campaign`, `playbooks`). `playbooks`
  is an internal research library, **not** the platform app.
- **`Kneeshaw-Developments` org:** no zenvend platform/admin repo (only `hudson-bearings`,
  `blindsco-services`, and misc `*-admin` repos unrelated to zenvend).

**Conclusion:** the codebase that would host both the in-app reporter and the admin
Bug Reports tab does not exist in any location I can access. B2 cannot be built. PDF
page 5 confirms the requirement (in-platform issue reporting + centralized admin
dashboard with status, internal notes, management); the detail-panel fields — reporter
role, page URL, submit time, IP, user-agent, Status dropdown, Admin notes — come from
the page-5 screenshot.

**Decision (client, 2026-07-28):** log the blocker and move on; do not produce a spec
or scaffold yet. B2 stays blocked pending the platform repo location (Open question #1).

---

### B5 (SEO admin module) — blocker confirmation, 2026-07-28

Final gap-plan item. PDF pages 7-8 show the admin **SEO** tab: global meta (title,
description, keywords), Open Graph & social (OG image URL, Twitter card type, `@site`,
OG site name), sitemap toggles (enable XML sitemap; include active listings / browse /
map pages), robots.txt editor (allow indexing/following, disallow paths, custom lines),
listing-page title/description **templates** with `{title}` / `{description}` /
`{marketplace_name}` / `{category}` / `{price}` tokens, and per-page overrides
(Homepage, Browse listings, Map view).

Every one of those controls writes SEO output for the **tenant marketplace app** —
they template listing/browse/map pages that only exist inside the platform. That
codebase is not in any location we can access (same finding as B1 and B2 above:
only `zenvend-site` + `zenvend-design-concepts` exist for zenvend). So the admin
module itself cannot be built.

**Split out — the one piece we CAN own:** the on-page SEO of the static marketing
site. Audited all 8 `zenvend-site` pages (2026-07-28): each has `<title>` +
`meta description` + a favicon, but **none** have Open Graph / Twitter / canonical,
and the repo has no `sitemap.xml`, `robots.txt`, or `og:image`. That slice is
tracked as **A4** in Track A.

**Decision (client owner, 2026-07-28):** log B5's blocker; **defer** the A4 marketing
pass for now (documented, no page changes) pending a confirmed production domain for
canonical / OG / sitemap URLs. B5's admin module stays blocked on the platform repo
(Open question #1).

---

## Recommended order of operations

All work is Track A (marketing copy in `zenvend-site`). Track B is out of scope.

1. **Get the brand + CTA decision (below).** Whether the site rebrands to Marketplace OS
   drives the size of the copy pass.
2. **A1 CTA → "Deploy Free."** Blocker resolved (platform self-provisions at
   `app.zenvend.ai`). Lead with "Deploy Free" → `app.zenvend.ai`, keep "Book a demo"
   secondary. Confirm the exact signup URL with the client.
3. **`agents.html` + feature/positioning copy** to match Marketplace OS (7→21 agents as
   *copy*, "Launch in minutes" messaging, describe Bug Reports/Backups/Analytics/SEO/chat
   as platform capabilities). This is the core of the refresh.
4. **A2 Intercom + A3 GA4** — already staged/dormant; activate once the client supplies
   the `app_id` / Measurement ID and a consent stance.
5. **A4 on-page SEO pass** once the production domain is confirmed.

## Open questions for the client

1. **Brand:** is the site rebranding **ZenVend → Marketplace OS**, or keeping ZenVend and
   just adopting the new positioning? (The app is branded Marketplace OS.)
2. **CTA target:** confirm the exact self-service signup URL for "Deploy Free"
   (`app.zenvend.ai`?).
3. Intercom **workspace/app_id**, and GA4 **Measurement ID**?
4. Cookie-consent / privacy stance for activating Intercom + GA on the marketing site?
5. **Production domain** — `zenvend.ai` or the current `zenvend-site.fly.dev`? (Needed to
   activate A4's canonical / OG / sitemap URLs.)

> Platform ownership is resolved: `app.zenvend.ai` (Marketplace OS) belongs to Michael
> Leto's developer (Monam Khalid); DWA does not build or maintain it. No "where is the
> repo" question remains.
