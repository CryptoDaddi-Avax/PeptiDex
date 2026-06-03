/* =============================================================
   Peptidex — Entrance Loader sequence + hero handoff
   MUST load BEFORE motion.js so it can park hero .fade-up elements
   into .hero-pending before motion.js's observer ever sees them.
   ============================================================= */
(function () {
  if (typeof window === "undefined") return;

  var SESSION_KEY = "peptidex_loaded";
  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. PARK HERO ENTRANCE (runs synchronously now) ----------
     Convert hero .fade-up -> .hero-pending so motion.js skips them.
     We preserve the inline --delay so the eventual rise keeps its stagger. */
  var heroFades = [];
  (function parkHero() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var nodes = hero.querySelectorAll(".fade-up");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      el.classList.remove("fade-up", "is-visible");
      el.classList.add("hero-pending");
      heroFades.push(el);
    }
  })();

  /* ---------- release the hero (rise through the dissolving loader) ---------- */
  var TRANSITION_MS = 750; // matches .fade-up CSS duration
  function forceEndState(el) {
    el.style.transition = "none";
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.filter = "none";
  }
  // A hero element may carry .pill-btn, whose transition omits opacity —
  // opacity snaps to 1 while transform/filter stay parked. So the watchdog
  // must inspect transform + filter too, not just opacity (mirrors motion.js).
  function isIdentityTransform(t) {
    if (!t || t === "none") return true;
    var m = t.match(/^matrix\(([^)]+)\)$/);
    if (!m) return false;
    var p = m[1].split(",").map(parseFloat);
    return (
      Math.abs(p[0] - 1) < 0.01 && Math.abs(p[1]) < 0.01 &&
      Math.abs(p[2]) < 0.01 && Math.abs(p[3] - 1) < 0.01 &&
      Math.abs(p[4]) < 0.5 && Math.abs(p[5]) < 0.5
    );
  }
  function hasNonzeroBlur(f) {
    if (!f || f === "none") return false;
    var m = f.match(/blur\(([\d.]+)/);
    return m ? parseFloat(m[1]) > 0.5 : false;
  }
  function revealHero() {
    document.body.classList.add("loaded");
    if (!heroFades.length) return;

    // Swap parked -> fade-up base (identical visual values, no jump)…
    for (var i = 0; i < heroFades.length; i++) {
      heroFades[i].classList.remove("hero-pending");
      heroFades[i].classList.add("fade-up");
    }
    // …force reflow so the base state is committed before we flip…
    void document.body.offsetWidth;
    // …then flip to is-visible SYNCHRONOUSLY (do NOT gate behind rAF — some
    // preview environments freeze requestAnimationFrame). In real browsers
    // the transition still runs because the reflow above committed the base.
    for (var j = 0; j < heroFades.length; j++) {
      heroFades[j].classList.add("is-visible");
    }

    // Watchdog: if the CSS transition never advances (frozen-transition
    // environments), hard-set the end state so the hero is never blank.
    // setTimeout fires in these environments even when rAF does not.
    for (var k = 0; k < heroFades.length; k++) {
      (function (el) {
        var delayStr = el.style.getPropertyValue("--delay") || "0";
        var delayMs = parseFloat(delayStr) || 0;
        setTimeout(function () {
          if (!el.isConnected) return;
          var cs = window.getComputedStyle(el);
          if (parseFloat(cs.opacity) < 0.99 ||
              !isIdentityTransform(cs.transform) ||
              hasNonzeroBlur(cs.filter)) {
            forceEndState(el);
          }
        }, TRANSITION_MS + delayMs + 140);
      })(heroFades[k]);
    }
  }

  /* ---------- 2. LOADER SEQUENCE ---------- */
  function run() {
    var loader = document.getElementById("loader");

    // Already shown this session — skip loader entirely.
    var seen = false;
    try { seen = sessionStorage.getItem(SESSION_KEY) === "1"; } catch (e) {}

    if (seen || !loader) {
      if (loader) loader.classList.add("is-hidden");
      revealHero();
      return;
    }

    var caption = document.getElementById("loaderCaption");

    function markSeen() {
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
    }
    function exit() {
      loader.classList.add("is-exiting");
      // Hero begins rising WHILE the loader dissolves.
      revealHero();
      var fadeMs = reduced ? 260 : 600;
      setTimeout(function () { loader.classList.add("is-hidden"); }, fadeMs + 40);
      markSeen();
    }

    if (reduced) {
      // Static loader, brief hold, then reveal.
      if (caption) caption.textContent = "ready.";
      setTimeout(exit, 300);
      return;
    }

    // Kick off CSS-driven mark / bar / wordmark animations.
    loader.classList.add("is-animating");

    // Caption ticks across the 1100ms fill (which starts at +300ms).
    var captions = [
      { t: 0,    text: "indexing compounds\u2026" },
      { t: 560,  text: "verifying sources\u2026" },
      { t: 1180, text: "ready." }
    ];
    captions.forEach(function (c) {
      setTimeout(function () {
        if (!caption) return;
        caption.style.opacity = "0";
        setTimeout(function () {
          caption.textContent = c.text;
          caption.style.opacity = "1";
        }, 160);
      }, c.t);
    });

    // Bar fill: starts +300ms, runs 1100ms => done ~1400ms. Exit just after.
    setTimeout(exit, 1480);
  }

  if (document.readyState === "loading") {
    // parkHero already ran synchronously above; run sequence on ready.
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
