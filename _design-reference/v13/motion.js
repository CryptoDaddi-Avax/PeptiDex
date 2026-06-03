/* =============================================================
   Peptidex — Shared Motion Foundation (Observer)
   Single IntersectionObserver drives both .fade-up and
   .stagger-children. Idempotent: safe to load once globally.
   Respects prefers-reduced-motion (instant reveal, no transforms).
   ============================================================= */
(function () {
  if (typeof window === "undefined") return;
  if (window.__peptidexMotionInit) return;
  window.__peptidexMotionInit = true;

  var STAGGER_STEP_MS = 90;
  var ROOT_MARGIN = "0px 0px -8% 0px";
  var THRESHOLD = 0.08;
  var TRANSITION_MS = 750; // matches .fade-up CSS duration
  var WATCHDOG_PAD_MS = 120;

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- prepare a single stagger container ---- */
  function prepStagger(container) {
    if (container.__staggerPrepped) return;
    container.__staggerPrepped = true;
    var kids = container.children;
    for (var i = 0; i < kids.length; i++) {
      var child = kids[i];
      child.classList.add("fade-up");
      // Only set --delay if author hasn't supplied one inline.
      var inline = child.style.getPropertyValue("--delay");
      if (!inline) {
        child.style.setProperty("--delay", (i * STAGGER_STEP_MS) + "ms");
      }
    }
  }

  /* ---- reveal a single element ---- */
  function reveal(el) {
    el.classList.add("is-visible");
  }

  /* ---- watchdog: force end-state if transition never runs ----
     In real browsers the CSS transition completes naturally and this
     no-ops (opacity is already 1 by the time we check). In frozen-
     transition environments (some preview iframes, throttled tabs),
     we hard-set the end state so content is never stuck blank. */
  function forceEndState(el) {
    // Disable the transition first so the inline end-state values
    // apply instantly instead of being queued onto the (frozen)
    // transition that necessitated this watchdog.
    el.style.transition = "none";
    el.style.opacity = "1";
    el.style.transform = "none";
    el.style.filter = "none";
  }
  function isIdentityTransform(t) {
    if (!t || t === "none") return true;
    var m = t.match(/^matrix\(([^)]+)\)$/);
    if (!m) {
      // matrix3d or other — fall back to coarse check
      return t.indexOf("matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)") === 0;
    }
    var p = m[1].split(",").map(parseFloat);
    return (
      Math.abs(p[0] - 1) < 0.01 &&
      Math.abs(p[1])     < 0.01 &&
      Math.abs(p[2])     < 0.01 &&
      Math.abs(p[3] - 1) < 0.01 &&
      Math.abs(p[4])     < 0.5  &&
      Math.abs(p[5])     < 0.5
    );
  }
  function hasNonzeroBlur(f) {
    if (!f || f === "none") return false;
    var m = f.match(/blur\(([\d.]+)/);
    if (!m) return false;
    return parseFloat(m[1]) > 0.5;
  }
  function armWatchdog(el) {
    var delayStr = el.style.getPropertyValue("--delay") || "0";
    var delayMs = parseFloat(delayStr) || 0;
    var total = TRANSITION_MS + delayMs + WATCHDOG_PAD_MS;
    setTimeout(function () {
      if (!el.isConnected) return;
      var cs = window.getComputedStyle(el);
      var stuck =
        parseFloat(cs.opacity) < 0.99 ||
        !isIdentityTransform(cs.transform) ||
        hasNonzeroBlur(cs.filter);
      if (stuck) forceEndState(el);
    }, total);
  }
  function revealWithWatchdog(el) {
    reveal(el);
    armWatchdog(el);
  }

  /* ---- viewport hit-test (synchronous fallback) ----
     Some rendering environments (preview iframes, background tabs,
     pages that never get a layout pass before observe) don't fire
     IntersectionObserver callbacks reliably. To guarantee above-the-
     fold content is never stuck at opacity:0, we do an immediate
     getBoundingClientRect check at register time and reveal anything
     already intersecting the viewport. Below-the-fold content still
     uses the shared IO as designed. */
  function inViewport(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var vw = window.innerWidth  || document.documentElement.clientWidth;
    // Match the IO's -8% bottom rootMargin so the two paths agree.
    var bottomPad = vh * 0.08;
    return (
      r.bottom > 0 &&
      r.right  > 0 &&
      r.top    < (vh - bottomPad) &&
      r.left   < vw
    );
  }

  /* ---- shared IntersectionObserver + observed-set tracker ----
     We mirror every io.observe(el) into `observed` so a throttled
     scroll/resize handler can re-check those same elements with our
     synchronous viewport hit-test. In real browsers the IO fires
     first and the scroll path is a no-op; in environments where IO
     callbacks never dispatch, the scroll re-check rescues elements
     as soon as the user actually scrolls them into view. */
  var observed = [];

  function revealEntry(el) {
    if (el.classList.contains("stagger-children")) {
      prepStagger(el);
      var kids = el.children;
      for (var k = 0; k < kids.length; k++) revealWithWatchdog(kids[k]);
    } else {
      revealWithWatchdog(el);
    }
  }
  function track(el) {
    if (observed.indexOf(el) === -1) observed.push(el);
    if (io) io.observe(el);
  }
  function untrack(el) {
    var i = observed.indexOf(el);
    if (i !== -1) observed.splice(i, 1);
    if (io) io.unobserve(el);
  }

  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (!e.isIntersecting) continue;
          var el = e.target;
          revealEntry(el);
          untrack(el);
        }
      },
      { root: null, rootMargin: ROOT_MARGIN, threshold: THRESHOLD }
    );
  }

  /* Scroll/resize re-poll — routed through the shared PeptidexLoop so the
     whole site has exactly ONE rAF. One-shot per scroll burst. Iterates a
     snapshot so untrack() during the loop doesn't shift indices. */
  var pollNeed = false;
  function poll() {
    pollNeed = false;
    if (!observed.length) return false;
    var snapshot = observed.slice();
    for (var i = 0; i < snapshot.length; i++) {
      var el = snapshot[i];
      if (!el.isConnected) { untrack(el); continue; }
      if (inViewport(el)) {
        revealEntry(el);
        untrack(el);
      }
    }
    return false;
  }
  if (window.PeptidexLoop) {
    window.PeptidexLoop.add(function () { return pollNeed ? poll() : false; });
  }
  function schedulePoll() {
    pollNeed = true;
    if (window.PeptidexLoop) window.PeptidexLoop.wake();
    else setTimeout(poll, 16);
  }
  if (!reduced) {
    window.addEventListener("scroll", schedulePoll, { passive: true });
    window.addEventListener("resize", schedulePoll);
  }

  /* ---- register all targets currently in the DOM ---- */
  function register(root) {
    root = root || document;

    // Stagger containers first so their children get .fade-up
    // before we try to count them as standalone fade-ups.
    var staggers = root.querySelectorAll(".stagger-children");
    for (var s = 0; s < staggers.length; s++) {
      var sc = staggers[s];
      prepStagger(sc);
      if (reduced || !io) {
        var rkids = sc.children;
        for (var rk = 0; rk < rkids.length; rk++) reveal(rkids[rk]);
      } else {
        // Synchronous fallback: if already in view at boot, reveal now.
        if (inViewport(sc)) {
          var ikids = sc.children;
          for (var ik = 0; ik < ikids.length; ik++) revealWithWatchdog(ikids[ik]);
        } else {
          track(sc);
        }
      }
    }

    var fades = root.querySelectorAll(".fade-up:not(.is-visible)");
    for (var f = 0; f < fades.length; f++) {
      var el = fades[f];
      // Skip elements already handled as part of a stagger group.
      if (el.parentElement && el.parentElement.classList.contains("stagger-children")) continue;
      if (reduced || !io) {
        reveal(el);
      } else if (inViewport(el)) {
        // Synchronous fallback for above-the-fold content,
        // with a watchdog in case transitions never run.
        revealWithWatchdog(el);
      } else {
        track(el);
      }
    }
  }

  /* ---- public hook for dynamically inserted content ---- */
  window.peptidexMotion = {
    register: register,
    refresh: function () { register(document); }
  };

  /* ---- boot ---- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { register(document); });
  } else {
    register(document);
  }
})();
