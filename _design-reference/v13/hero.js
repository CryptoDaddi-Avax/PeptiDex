/* =============================================================
   Peptidex — Hero behavior
     1. Generate animated peptide-helix SVG (seamless scroll loop)
     2. Magnetic-button cursor tracking on .magnetic wrappers
     3. Mouse-parallax tilt on .helix-card
     4. prefers-reduced-motion: pause video, freeze helix, no tilt
   Depends on motion.js for fade-up reveals.
   ============================================================= */
(function () {
  if (typeof window === "undefined") return;

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. HELIX SVG GENERATOR ---------- */
  function buildHelix() {
    var svg = document.getElementById("helix");
    if (!svg) return;

    var W = 1200;           // total path width (2× viewBox for seamless loop)
    var VB_W = 600;         // viewBox width
    var H = 280;            // viewBox height
    var cy = H / 2;
    var amp = 78;           // amplitude
    var period = 200;       // one full sine wavelength — loop offset = period
    var samples = 240;      // polyline density across W
    var rungCount = 30;     // total rungs along W

    svg.setAttribute("viewBox", "0 0 " + VB_W + " " + H);

    function strand(phase) {
      var d = "";
      for (var i = 0; i <= samples; i++) {
        var x = (i / samples) * W;
        var y = cy + amp * Math.sin((2 * Math.PI * x) / period + phase);
        d += (i === 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2) + " ";
      }
      return d;
    }

    var d1 = strand(0);
    var d2 = strand(Math.PI);

    var rungs = "";
    var beads1 = "";
    var beads2 = "";
    for (var r = 0; r < rungCount; r++) {
      var x = (r / rungCount) * W + W / rungCount / 2;
      var y1 = cy + amp * Math.sin((2 * Math.PI * x) / period);
      var y2 = cy + amp * Math.sin((2 * Math.PI * x) / period + Math.PI);
      // depth proxy: when strand 1 is on top (y1<y2), it's "in front"
      var front = y1 < y2 ? "front" : "back";
      rungs +=
        '<line x1="' + x.toFixed(2) + '" y1="' + y1.toFixed(2) +
        '" x2="' + x.toFixed(2) + '" y2="' + y2.toFixed(2) +
        '" class="rung ' + front + '" />';
      beads1 +=
        '<circle cx="' + x.toFixed(2) + '" cy="' + y1.toFixed(2) +
        '" r="3.2" class="bead bead-a ' + (y1 < y2 ? "front" : "back") + '" />';
      beads2 +=
        '<circle cx="' + x.toFixed(2) + '" cy="' + y2.toFixed(2) +
        '" r="3.2" class="bead bead-b ' + (y2 < y1 ? "front" : "back") + '" />';
    }

    // Axis hint — faint horizontal line
    var axis =
      '<line x1="0" y1="' + cy + '" x2="' + W + '" y2="' + cy +
      '" class="axis" />';

    svg.innerHTML =
      '<defs>' +
        '<linearGradient id="strandLime" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%"  stop-color="#C4F25C" stop-opacity="0.0"/>' +
          '<stop offset="12%" stop-color="#C4F25C" stop-opacity="0.95"/>' +
          '<stop offset="88%" stop-color="#C4F25C" stop-opacity="0.95"/>' +
          '<stop offset="100%" stop-color="#C4F25C" stop-opacity="0.0"/>' +
        '</linearGradient>' +
        '<linearGradient id="strandPaper" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%"  stop-color="#F2EEE5" stop-opacity="0.0"/>' +
          '<stop offset="12%" stop-color="#F2EEE5" stop-opacity="0.7"/>' +
          '<stop offset="88%" stop-color="#F2EEE5" stop-opacity="0.7"/>' +
          '<stop offset="100%" stop-color="#F2EEE5" stop-opacity="0.0"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<g class="helix-group">' +
        axis +
        '<path d="' + d1 + '" class="strand strand-1" />' +
        '<path d="' + d2 + '" class="strand strand-2" />' +
        rungs +
        beads1 +
        beads2 +
      '</g>';

    // Inject helix-specific styles once
    if (!document.getElementById("helix-style")) {
      var s = document.createElement("style");
      s.id = "helix-style";
      s.textContent =
        ".helix-group { animation: helix-flow 14s linear infinite; transform-origin: 0 0; }" +
        "@keyframes helix-flow { from { transform: translateX(0); } to { transform: translateX(-200px); } }" +
        ".axis { stroke: rgba(242,238,229,0.06); stroke-width: 0.6; stroke-dasharray: 2 4; }" +
        ".strand { fill: none; stroke-width: 1.6; stroke-linecap: round; }" +
        ".strand-1 { stroke: url(#strandLime); filter: drop-shadow(0 0 6px rgba(196,242,92,0.35)); }" +
        ".strand-2 { stroke: url(#strandPaper); opacity: 0.7; }" +
        ".rung { stroke: rgba(242,238,229,0.18); stroke-width: 0.8; }" +
        ".rung.front { stroke: rgba(242,238,229,0.32); }" +
        ".bead { transform-box: fill-box; transform-origin: center; }" +
        ".bead-a { fill: #C4F25C; }" +
        ".bead-b { fill: #F2EEE5; }" +
        ".bead.back { opacity: 0.55; transform: scale(0.78); }" +
        ".bead.front { opacity: 1; transform: scale(1.05); filter: drop-shadow(0 0 4px rgba(196,242,92,0.45)); }" +
        ".helix-paused .helix-group { animation-play-state: paused; }" +
        "@media (prefers-reduced-motion: reduce) { .helix-group { animation: none; } }";
      document.head.appendChild(s);
    }
  }

  /* ---------- 2. MAGNETIC BUTTONS ---------- */
  function initMagnetic() {
    if (reduced) return;
    var wraps = document.querySelectorAll(".magnetic");
    for (var i = 0; i < wraps.length; i++) {
      (function (wrap) {
        var strength = 0.28;
        wrap.addEventListener("mousemove", function (e) {
          var r = wrap.getBoundingClientRect();
          var dx = (e.clientX - (r.left + r.width / 2)) * strength;
          var dy = (e.clientY - (r.top + r.height / 2)) * strength;
          wrap.style.transform = "translate(" + dx.toFixed(2) + "px, " + dy.toFixed(2) + "px)";
          wrap.style.transition = "transform 80ms linear";
        });
        wrap.addEventListener("mouseleave", function () {
          wrap.style.transition = "transform 380ms cubic-bezier(0.22, 1, 0.36, 1)";
          wrap.style.transform = "translate(0, 0)";
        });
      })(wraps[i]);
    }
  }

  /* ---------- 3. PARALLAX TILT ON .helix-card ---------- */
  function initTilt() {
    if (reduced) return;
    var card = document.querySelector(".helix-card");
    var hero = document.querySelector(".hero");
    if (!card || !hero) return;

    var targetX = 0, targetY = 0;
    var currentX = 0, currentY = 0;
    var maxRX = 5, maxRY = 6;

    // Per-frame work routed through the single shared loop.
    function step() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      card.style.transform =
        "perspective(1400px) rotateY(" + currentX.toFixed(2) + "deg) rotateX(" +
        (-currentY).toFixed(2) + "deg)";
      // keep the loop alive only while not settled
      return (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02);
    }
    if (window.PeptidexLoop) window.PeptidexLoop.add(step);

    function wake() { if (window.PeptidexLoop) window.PeptidexLoop.wake(); }

    hero.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      // Normalize over a wider zone than just the card for smoother tracking
      var nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width * 0.9)));
      var ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height * 0.9)));
      targetX = nx * maxRY;
      targetY = ny * maxRX;
      card.classList.add("is-tilting");
      wake();
    });
    hero.addEventListener("mouseleave", function () {
      targetX = 0;
      targetY = 0;
      card.classList.remove("is-tilting");
      wake();
    });
  }

  /* ---------- 4. REDUCED-MOTION VIDEO HANDLING ---------- */
  function handleVideo() {
    var v = document.querySelector(".hero-bg");
    if (!v) return;
    if (reduced) {
      try {
        v.autoplay = false;
        v.removeAttribute("autoplay");
        v.pause();
        // Seek to first frame so something renders as a poster
        v.addEventListener("loadedmetadata", function () { try { v.currentTime = 0; } catch (e) {} }, { once: true });
      } catch (e) {}
    } else {
      // Try to autoplay; some browsers gate it behind a user gesture even with muted.
      var p = v.play && v.play();
      if (p && p.catch) p.catch(function () { /* ignore */ });
    }
  }

  /* ---------- 5. PAUSE OFF-SCREEN WORK ----------
     Pause the (CSS) helix flow animation AND the hero video when the
     hero scrolls out of view, so nothing animates/decodes off-screen. */
  function pauseWhenOffscreen() {
    var hero = document.querySelector(".hero");
    var stage = document.querySelector(".helix-stage");
    var video = document.querySelector(".hero-bg");
    if (!hero) return;
    if (!("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        apply(entries[i].isIntersecting);
      }
    }, { root: null, rootMargin: "0px", threshold: 0 });
    io.observe(hero);

    function apply(visible) {
      if (stage) stage.classList.toggle("helix-paused", !visible);
      if (video && !reduced) {
        if (visible) {
          var p = video.play && video.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          try { video.pause(); } catch (e) {}
        }
      }
    }

    // Scroll fallback for environments where IO callbacks never fire
    // (matches the hardening used elsewhere in the project).
    var lastRun = 0, trailing = null;
    function check() {
      lastRun = Date.now();
      var r = hero.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      apply(r.bottom > 0 && r.top < vh);
    }
    function onScroll() {
      var now = Date.now();
      if (now - lastRun >= 120) check();
      else if (!trailing) {
        trailing = setTimeout(function () { trailing = null; check(); }, 120 - (now - lastRun));
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  /* ---------- BOOT ---------- */
  function boot() {
    buildHelix();
    initMagnetic();
    initTilt();
    handleVideo();
    pauseWhenOffscreen();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
