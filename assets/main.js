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

  console.log("[zenvend] ready in", (performance.now() - t0).toFixed(1) + "ms");
})();
