# ZenVend — Gap-Closure Plan (vs MarketplaceOS)

Source: `Marketplace Points.pdf` (competitive comparison, Zenvend vs "MarketplaceOS").
Prepared: 2026-07-28. Status: in progress. A3 (marketing-site GA4) shipped
dormant in PR #3; A2 (Intercom) boot snippet staged but inactive. Track B
remains blocked on the missing platform repo.

## TL;DR

The PDF lists **8 capabilities** MarketplaceOS has that Zenvend lacks. They split
cleanly into two tracks:

- **2 items** are marketing-site work and live in **`zenvend-site`** (the repo we hold).
- **6 items** are product/admin features of the **Zenvend platform app**, whose repo
  is **NOT in this workspace or the `digitalwillads` org** (see "Missing repo" below).
  These cannot be scoped or built until that codebase is located.

Recommended sequence: ship the two `zenvend-site` wins now, in parallel confirm
who owns the platform app, then plan the six platform features once we have the repo.

---

## Missing repo (blocker for 6 of 8 items)

The PDF screenshots show a **tenant marketplace app** (`app.<marketplace>` URLs) and
an **Admin Panel** with tabs: Overview, Transactions & Revenue, Listings, Users,
Orders, Payments, Vendors, Moderation, AI Agents, Activity, Bug Reports, Backups,
Analytics, SEO, Operations.

Nothing like this exists in the workspace. The `digitalwillads` org contains only:
- `zenvend-site` — static marketing site (this repo)
- `zenvend-design-concepts` — 5 home-page concepts, review only

**Action:** confirm with the client where the Zenvend platform/admin codebase lives
(different org, private repo, hosted no-code/SaaS backend?). All "Platform track"
items below are blocked on this answer.

---

## Track A — Marketing site (`zenvend-site`) — actionable now

Current state verified in this repo:
- Every primary CTA is **"Book a demo"** (sales-led). No self-service path.
- **No Intercom** live chat on any page.
- **No Google Analytics / gtag** on any page.

### A1. CTA strategy: sales-led vs self-service  — Priority: HIGH (decision needed)
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

---

## Track B — Platform / admin app — BLOCKED on missing repo

Scope estimates below are indicative only; they cannot start until the platform
codebase is located and its stack is known.

| # | Feature (PDF) | What it is | Priority | Notes |
|---|---|---|---|---|
| B1 | **AI agents 7 → 21** | Add analytics, fraud detection, SEO, CRM, payments, content moderation, workflow, seller performance, dispute analysis, tenant-health agents | HIGH | Biggest headline gap (7 vs 21). Each agent = its own build + config UI. Large. |
| B2 | **Bug Reports module** | In-app "report a bug" + admin dashboard (status, notes, filter) | MEDIUM | Self-contained; good early win once repo found. |
| B3 | **Backup & Restore module** | Admin creates/restores marketplace snapshots (listings, orders, settings; excludes Stripe creds/billing) | MEDIUM | Needs data-model snapshot strategy; test restore carefully. |
| B4 | **Google Analytics admin module** | Admin pastes GA4 Measurement ID; auto-tracks page_view, view_item, begin_checkout, purchase | MEDIUM | Distinct from A3 (this is per-tenant, admin-configured). |
| B5 | **SEO admin module** | Meta tags, Open Graph, XML sitemap, robots.txt, per-page overrides from admin | MEDIUM | Template-driven; moderate. |
| B6 | **Intercom in-platform** | Live chat inside the tenant app (buyers/sellers/admins) | LOW | Same Intercom snippet as A2, applied in-app. |

---

## Recommended order of operations

1. **Now (no blockers):** decide A1 CTA approach with client; ship the secondary-CTA
   version if full self-service isn't ready.
2. **Now (needs one credential each):** A2 Intercom + A3 GA4 on the marketing site —
   both ~cheap, both need a client-supplied ID and a cookie-consent decision.
3. **Parallel:** locate the platform repo / confirm ownership. This unblocks everything
   in Track B.
4. **After repo found:** scope B2 (Bug Reports) and B4 (GA module) first as contained
   wins, then the larger B1 (agents 7→21), B3 (backups), B5 (SEO), B6 (in-app chat).

## Open questions for the client

1. Where does the Zenvend **platform/admin** codebase live? (Track B is fully blocked
   on this.)
2. Does the platform support **self-service signup + instant provisioning** today?
   (Determines whether A1 can become a real "Deploy Free.")
3. Intercom **workspace/app_id**, and GA4 **Measurement ID**?
4. Cookie-consent / privacy stance for adding Intercom + GA to the marketing site?
