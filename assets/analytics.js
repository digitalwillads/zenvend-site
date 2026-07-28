/* ============================================================
   ZenVend.ai analytics (GA4 / gtag)
   ------------------------------------------------------------
   Self-contained: config, Google Consent Mode v2, a privacy-first
   cookie-consent banner, and event tracking for the demo funnel.
   Loaded early (in <head>) on every page.

   HANDOFF (two things the client controls):
     1. MEASUREMENT ID. Set CONFIG.measurementId below to the real
        GA4 ID (looks like "G-XXXXXXXXXX"). Until then GA stays
        completely dormant: no gtag.js request, no banner, nothing
        sent anywhere. The site is safe to ship as-is today.
     2. CONSENT UX. CONFIG.requireConsent = true (default) shows an
        accept/decline banner and loads analytics only after the
        visitor accepts (Consent Mode v2, storage denied until then).
        Set it to false only if the client's privacy review clears
        loading GA unconditionally (e.g. no EU/UK visitors).

   No PII is ever sent. Only funnel events (page_view, demo CTA
   clicks, demo-form submit) are recorded.
   ============================================================ */
(function () {
  "use strict";

  var CONFIG = {
    // TODO(client): replace with the real GA4 Measurement ID.
    measurementId: "G-XXXXXXXXXX",
    // Privacy-first. See handoff note above.
    requireConsent: true,
    // localStorage key that remembers the visitor's choice.
    consentStorageKey: "zenvend_analytics_consent"
  };

  var PLACEHOLDER_ID = "G-XXXXXXXXXX";
  var ENABLED = !!CONFIG.measurementId && CONFIG.measurementId !== PLACEHOLDER_ID;

  // dataLayer + gtag shim are always defined so event calls elsewhere
  // never throw, even when analytics is dormant or consent is denied.
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // Public no-op-safe helper other scripts can call to record events.
  // Queues into dataLayer regardless; only forwarded to GA once loaded.
  window.zenvendTrack = function (name, params) {
    try { gtag("event", name, params || {}); }
    catch (e) { /* never let tracking break the page */ }
  };

  if (!ENABLED) {
    console.log("[zenvend] analytics dormant. Set a real GA4 Measurement ID in assets/analytics.js to activate.");
    // Still wire the funnel listeners so events land in dataLayer for
    // debugging; they simply go nowhere until a real ID is set.
    wireFunnelEvents();
    return;
  }

  gtag("js", new Date());

  var loaded = false;
  function loadGtagLibrary() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(CONFIG.measurementId);
    document.head.appendChild(s);
    gtag("config", CONFIG.measurementId, { anonymize_ip: true });
    console.log("[zenvend] analytics active:", CONFIG.measurementId);
  }

  function storedConsent() {
    try { return window.localStorage.getItem(CONFIG.consentStorageKey); }
    catch (e) { return null; }
  }
  function rememberConsent(value) {
    try { window.localStorage.setItem(CONFIG.consentStorageKey, value); }
    catch (e) { /* private mode etc.; just don't persist */ }
  }

  function grantAndLoad() {
    gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted"
    });
    loadGtagLibrary();
  }

  if (!CONFIG.requireConsent) {
    // Client has cleared unconditional analytics; load immediately.
    loadGtagLibrary();
  } else {
    // Consent Mode v2: deny storage by default until the visitor opts in.
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500
    });

    var choice = storedConsent();
    if (choice === "granted") {
      grantAndLoad();
    } else if (choice !== "denied") {
      // Undecided: ask.
      document.addEventListener("DOMContentLoaded", showConsentBanner);
    }
    // choice === "denied": stay dormant, no banner, no gtag request.
  }

  wireFunnelEvents();

  /* ---------- Consent banner (injected; no styles.css edits) ---------- */
  function showConsentBanner() {
    if (document.getElementById("zv-consent")) return;

    var style = document.createElement("style");
    style.textContent = [
      "#zv-consent{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);",
      "z-index:9999;max-width:640px;width:calc(100% - 32px);background:#FBFAF6;",
      "color:#3A352C;border:1px solid #D9CFBC;border-radius:14px;",
      "box-shadow:0 8px 22px rgba(58,53,44,.07),0 34px 80px rgba(58,53,44,.12);",
      "padding:18px 20px;font:400 15px/1.5 Inter,system-ui,sans-serif;",
      "display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;",
      "animation:zvUp .35s cubic-bezier(.22,.61,.36,1) both}",
      "@keyframes zvUp{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}",
      "@media(prefers-reduced-motion:reduce){#zv-consent{animation:none}}",
      "#zv-consent p{margin:0;flex:1 1 260px;color:#6B6457}",
      "#zv-consent a{color:#8F5C39;text-decoration:underline}",
      "#zv-consent .zv-actions{display:flex;gap:10px;flex:0 0 auto}",
      "#zv-consent button{font:600 14px/1 Inter,system-ui,sans-serif;cursor:pointer;",
      "border-radius:10px;padding:11px 18px;border:1px solid transparent;transition:filter .15s}",
      "#zv-consent button:hover{filter:brightness(.96)}",
      "#zv-consent .zv-accept{background:#A8714B;color:#FBFAF6}",
      "#zv-consent .zv-decline{background:transparent;color:#6B6457;border-color:#D9CFBC}"
    ].join("");
    document.head.appendChild(style);

    var bar = document.createElement("div");
    bar.id = "zv-consent";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-live", "polite");
    bar.setAttribute("aria-label", "Cookie consent");
    bar.innerHTML =
      '<p>We use privacy-friendly analytics to understand how the site is used. ' +
      'No data is collected until you accept. <a href="contact.html">Privacy</a></p>' +
      '<div class="zv-actions">' +
      '<button type="button" class="zv-decline">Decline</button>' +
      '<button type="button" class="zv-accept">Accept</button>' +
      '</div>';
    document.body.appendChild(bar);

    function dismiss() { if (bar.parentNode) bar.parentNode.removeChild(bar); }

    bar.querySelector(".zv-accept").addEventListener("click", function () {
      rememberConsent("granted");
      grantAndLoad();
      dismiss();
      console.log("[zenvend] analytics consent granted");
    });
    bar.querySelector(".zv-decline").addEventListener("click", function () {
      rememberConsent("denied");
      dismiss();
      console.log("[zenvend] analytics consent declined");
    });
  }

  /* ---------- Demo-funnel event wiring ---------- */
  function wireFunnelEvents() {
    document.addEventListener("DOMContentLoaded", function () {
      // Demo CTAs: links pointing at the contact/demo page. Tracked
      // generically so no per-link markup edits are needed.
      var ctas = document.querySelectorAll('a[href$="contact.html"]');
      ctas.forEach(function (a) {
        a.addEventListener("click", function () {
          window.zenvendTrack("demo_cta_click", {
            link_text: (a.textContent || "").trim().slice(0, 80),
            page_path: location.pathname
          });
        });
      });

      // Demo form submit (contact.html). Fires alongside main.js's own
      // handler; we only record the event, we don't touch the form.
      var form = document.getElementById("demoForm");
      if (form) {
        form.addEventListener("submit", function () {
          // GA4 recommended lead event. No field values sent.
          window.zenvendTrack("generate_lead", {
            form_id: "demoForm",
            page_path: location.pathname
          });
        });
      }
    });
  }
})();
