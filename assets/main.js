/* ============================================================
   ZenVend.ai — site-wide interactions
   Mobile nav · sticky-nav shadow · FAQ accordion · scroll reveal
   Lightweight console tracing/timing included per house rules.
   ============================================================ */
(function () {
  "use strict";
  var t0 = performance.now();
  console.log("[zenvend] init — page:", document.title);

  /* ---------- Mobile nav toggle ---------- */
  (function () {
    var btn = document.getElementById("hamburger");
    var menu = document.getElementById("mobileMenu");
    if (!btn || !menu) { console.warn("[zenvend] mobile nav elements missing"); return; }
    function close() {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open menu");
    }
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      console.log("[zenvend] mobile menu", open ? "opened" : "closed");
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
  })();

  /* ---------- Nav shadow on scroll ---------- */
  (function () {
    var nav = document.getElementById("nav");
    if (!nav) return;
    function onScroll() {
      if (window.scrollY > 8) nav.classList.add("is-stuck");
      else nav.classList.remove("is-stuck");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* ---------- FAQ accordion (single-open) ---------- */
  (function () {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;
    console.log("[zenvend] FAQ accordion —", items.length, "items");
    items.forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        items.forEach(function (other) {
          other.classList.remove("is-open");
          var oq = other.querySelector(".faq-q");
          var oa = other.querySelector(".faq-a");
          if (oq) oq.setAttribute("aria-expanded", "false");
          if (oa) oa.style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("is-open");
          q.setAttribute("aria-expanded", "true");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
  })();

  /* ---------- Scroll reveal ---------- */
  (function () {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
    console.log("[zenvend] reveal observing —", els.length, "elements");
  })();

  /* ---------- Demo contact form (no backend yet) ---------- */
  (function () {
    var form = document.getElementById("demoForm");
    if (!form) return;
    var success = document.getElementById("formSuccess");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      // Never log PII values — record only which fields were provided.
      var provided = [];
      data.forEach(function (v, k) { if (String(v).trim()) provided.push(k); });
      console.log("[zenvend] demo form submitted — fields provided:", provided.join(", "));
      console.warn("[zenvend] no form backend wired yet — submission not sent anywhere.");
      form.style.display = "none";
      if (success) success.classList.add("is-shown");
    });
  })();

  /* ---------- Intercom live chat (STAGED, INACTIVE) ----------
     Site-wide live chat, matching MarketplaceOS. This file loads on every
     page (before </body>), so enabling here covers all 8 pages at once
     with no per-page footer duplication.

     NOT LIVE YET. Two things must be resolved before go-live:
       1. APP_ID below is empty. Paste the client's Intercom workspace
          app_id to activate. While empty, this whole block is a no-op.
       2. Cookie consent is UNRESOLVED (on hold pending client/legal).
          Intercom sets first-party cookies (intercom-id, intercom-session),
          and this site has no consent banner or privacy policy today.
          Before activating, gate boot() on the site's consent decision
          at the CONSENT GATE marker below.
     Ref: ZENVEND_GAP_PLAN.md item A2. In-app portal is a separate task (B6).
  */
  (function () {
    var APP_ID = ""; // paste Intercom workspace app_id here to activate

    if (!APP_ID) {
      console.log("[zenvend] intercom staged but inactive: no app_id set");
      return;
    }

    /* CONSENT GATE: cookie-consent handling is not yet decided (on hold).
       Once the stance is settled, wrap the boot() call below in the
       appropriate consent check before shipping live. */

    function boot() {
      window.intercomSettings = { app_id: APP_ID };
      // Standard Intercom loader snippet.
      var w = window;
      var ic = w.Intercom;
      if (typeof ic === "function") {
        ic("reattach_activator");
        ic("update", w.intercomSettings);
      } else {
        var d = document;
        var i = function () { i.c(arguments); };
        i.q = [];
        i.c = function (args) { i.q.push(args); };
        w.Intercom = i;
        var load = function () {
          var s = d.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = "https://widget.intercom.io/widget/" + APP_ID;
          var x = d.getElementsByTagName("script")[0];
          x.parentNode.insertBefore(s, x);
        };
        if (d.readyState === "complete") { load(); }
        else if (w.addEventListener) { w.addEventListener("load", load, false); }
        else { w.attachEvent("onload", load); }
      }
      console.log("[zenvend] intercom booted");
    }

    boot();
  })();

  console.log("[zenvend] ready in", (performance.now() - t0).toFixed(1) + "ms");
})();
