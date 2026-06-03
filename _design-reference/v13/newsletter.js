/* =============================================================
   PeptiDex — "The Peptide Brief" newsletter (shared handler)
   -------------------------------------------------------------
   ONE component for EVERY .newsletter-form on the site
   (homepage §10, intro, quiz, advisor waitlist, and the
   "Get notified" modal on stub pages). Configure the endpoint
   here once and every instance posts to it.

   ── HOW TO GO LIVE ──────────────────────────────────────────
   1. Pick a provider below (ConvertKit/Kit or Beehiiv).
   2. Drop your real Form ID / embed action into CONFIG.
   Until you do, forms run in PREVIEW mode: they validate and
   show the success state but make NO network call, so the UX
   is fully demonstrable before the endpoint is wired.

   ── DEPLOY NOTE ─────────────────────────────────────────────
   This is a pure client-side post to the provider's public
   embed endpoint — no backend required. If you'd rather proxy
   through the Next.js app (to add the `peptide-brief` tag,
   double-opt-in, or hide the form id), point CONFIG.customEndpoint
   at an /api/subscribe route and set provider:"custom".
   ============================================================= */
(function () {
  "use strict";

  // ▼▼▼ ============ DROP IN YOUR REAL DETAILS ============ ▼▼▼
  var CONFIG = {
    provider: "convertkit",          // "convertkit" | "beehiiv" | "custom"

    // ConvertKit / Kit — numeric Form ID from the form's embed URL:
    //   https://app.convertkit.com/forms/XXXXXXX/subscriptions
    convertkitFormId: "YOUR_CONVERTKIT_FORM_ID",

    // Beehiiv — the action URL from Publication → Embed → Custom HTML:
    //   https://embeds.beehiiv.com/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
    beehiivAction: "https://embeds.beehiiv.com/YOUR_PUBLICATION_ID",

    // Optional: your own Next.js route (provider:"custom") that takes { email }.
    customEndpoint: "/api/subscribe",

    successText: "You're in — first issue lands soon.",
    errorText: "Something went wrong — please try again."
  };
  // ▲▲▲ ============ DROP IN YOUR REAL DETAILS ============ ▲▲▲

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isConfigured() {
    if (CONFIG.provider === "convertkit") return !!CONFIG.convertkitFormId && CONFIG.convertkitFormId.indexOf("YOUR_") !== 0;
    if (CONFIG.provider === "beehiiv") return !!CONFIG.beehiivAction && CONFIG.beehiivAction.indexOf("YOUR_") === -1;
    if (CONFIG.provider === "custom") return !!CONFIG.customEndpoint;
    return false;
  }

  /* Public API: subscribe(email) -> Promise (resolve on success, reject on failure). */
  function subscribe(email) {
    email = (email || "").trim();
    if (!EMAIL_RE.test(email)) return Promise.reject(new Error("invalid-email"));

    // PREVIEW MODE — no endpoint configured yet. Simulate a successful round-trip.
    if (!isConfigured()) {
      return new Promise(function (resolve) { setTimeout(resolve, 650); });
    }

    if (CONFIG.provider === "convertkit") {
      var ckUrl = "https://app.convertkit.com/forms/" + CONFIG.convertkitFormId + "/subscriptions";
      var ckBody = new URLSearchParams();
      ckBody.set("email_address", email);
      return fetch(ckUrl, { method: "POST", headers: { "Accept": "application/json" }, body: ckBody })
        .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json().catch(function () { return {}; }); });
    }

    if (CONFIG.provider === "beehiiv") {
      var bBody = new URLSearchParams();
      bBody.set("email", email);
      // Beehiiv embed endpoint doesn't send CORS headers → opaque response; assume queued on resolve.
      return fetch(CONFIG.beehiivAction, { method: "POST", mode: "no-cors", body: bBody }).then(function () { return {}; });
    }

    if (CONFIG.provider === "custom") {
      return fetch(CONFIG.customEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email: email })
      }).then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json().catch(function () { return {}; }); });
    }

    return Promise.reject(new Error("no-provider"));
  }

  /* ---- one-time injected styling (token-based; works on every page) ---- */
  function injectStyles() {
    if (document.getElementById("nl-style")) return;
    var s = document.createElement("style");
    s.id = "nl-style";
    s.textContent =
      ".newsletter-input.invalid{border-color:var(--rust)!important;}" +
      ".nl-msg{margin-top:12px;font-family:'Geist Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.04em;color:var(--rust);}" +
      ".nl-success{display:flex;align-items:center;gap:11px;margin-top:6px;font-family:'Geist',sans-serif;font-size:15px;line-height:1.4;color:var(--paper);opacity:1;" +
      "animation:nlIn 420ms cubic-bezier(0.22,1,0.36,1);}" +
      ".nl-success .nl-tick{flex:0 0 auto;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;" +
      "background:var(--lime);color:var(--ink);box-shadow:0 0 0 4px color-mix(in srgb,var(--lime) 20%,transparent);}" +
      ".nl-success .nl-tick svg{width:15px;height:15px;}" +
      "@keyframes nlIn{from{transform:translateY(8px);}to{transform:none;}}" +
      "@media (prefers-reduced-motion: reduce){.nl-success{animation:none;}}";
    document.head.appendChild(s);
  }

  function buildSuccess(msg) {
    var d = document.createElement("div");
    d.className = "nl-success";
    d.setAttribute("role", "status");
    d.setAttribute("aria-live", "polite");
    d.innerHTML =
      '<span class="nl-tick" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none">' +
      '<path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '<span>' + msg + '</span>';
    return d;
  }

  /* Wire a single .newsletter-form with the validate → subscribe → inline state flow. */
  function wire(form) {
    if (form.__nlWired) return;
    form.__nlWired = true;

    var scope = form.parentNode || form;
    var input = form.querySelector('input[type="email"], .newsletter-input');
    if (!input) return;
    if (!input.name) input.name = "email_address";

    var btn = form.querySelector('button[type="submit"]') || form.querySelector("button");
    var btnLabel = btn ? btn.textContent : "Subscribe";

    // Reuse an existing status line if the page provides one; create one lazily otherwise.
    var fine = scope.querySelector(".newsletter-fine, .conv-fine, .wl-fine, .notify-fine");
    var fineText = fine ? fine.textContent : "";
    var fineColor = fine ? fine.style.color : "";
    // Reuse a dedicated success element if present (e.g. quiz's .conv-ok).
    var okEl = scope.querySelector(".conv-ok, [data-newsletter-ok]");
    var msgEl = null; // lazily-created error line when no .*-fine exists

    function showError(text) {
      input.classList.add("invalid");
      if (fine) {
        fine.textContent = text;
        fine.style.color = "var(--rust)";
      } else {
        if (!msgEl) {
          msgEl = document.createElement("p");
          msgEl.className = "nl-msg";
          msgEl.setAttribute("role", "alert");
          form.parentNode.insertBefore(msgEl, form.nextSibling);
        }
        msgEl.textContent = text;
      }
      input.focus();
    }

    function clearError() {
      input.classList.remove("invalid");
      if (fine) { fine.textContent = fineText; fine.style.color = fineColor; }
      if (msgEl) { msgEl.textContent = ""; }
    }

    input.addEventListener("input", clearError);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!EMAIL_RE.test(email)) { showError("Please enter a valid email address."); return; }

      clearError();
      if (btn) { btn.disabled = true; btn.setAttribute("aria-busy", "true"); btn.textContent = "Subscribing…"; }

      subscribe(email).then(function () {
        if (okEl) {
          okEl.style.display = "block";
          okEl.style.color = "var(--lime)";
          form.style.display = "none";
        } else {
          form.style.display = "none";
          if (msgEl) { msgEl.textContent = ""; }
          form.parentNode.insertBefore(buildSuccess(CONFIG.successText), form.nextSibling);
        }
      }).catch(function () {
        if (btn) { btn.disabled = false; btn.removeAttribute("aria-busy"); btn.textContent = btnLabel; }
        showError(CONFIG.errorText);
      });
    });
  }

  function init() {
    injectStyles();
    // Auto-wire every newsletter form EXCEPT those that opt out (data-newsletter-skip),
    // which keep a bespoke handler that calls window.PeptidexNewsletter.subscribe() itself.
    var forms = document.querySelectorAll(".newsletter-form:not([data-newsletter-skip])");
    Array.prototype.forEach.call(forms, wire);
  }

  // Expose the shared API so bespoke flows (e.g. the stub "Get notified" modal) can
  // route their capture through the single configured endpoint.
  window.PeptidexNewsletter = { subscribe: subscribe, wire: wire, isConfigured: isConfigured, config: CONFIG };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
