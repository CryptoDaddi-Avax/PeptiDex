/* =============================================================
   Peptidex — Cinematic Interstitial behavior
     1. Scroll parallax — video translateY based on band progress
        through the viewport. rAF-throttled. Single scroll handler.
     2. Lazy play/pause via IntersectionObserver — pause when fully
        off-screen, also pause when document is hidden.
     3. prefers-reduced-motion: pause, seek to first frame, no parallax.
   ============================================================= */
(function () {
  if (typeof window === "undefined") return;

  var band  = document.querySelector(".interstitial");
  var video = document.querySelector(".interstitial-bg");
  if (!band || !video) return;

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var MAX_SHIFT = 60;   // px, per spec
  var BG_SCALE  = 1.2;  // matches CSS transform: scale(1.2)

  /* ---------- VIDEO DEFAULTS ---------- */
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.removeAttribute("autoplay"); // IO controls play/pause
  try { video.pause(); } catch (e) {}

  if (reduced) {
    // Show first frame as poster; never play.
    if (video.readyState >= 1) {
      try { video.currentTime = 0; } catch (e) {}
    } else {
      video.addEventListener("loadedmetadata", function () {
        try { video.currentTime = 0; } catch (e) {}
      }, { once: true });
    }
  }

  /* ---------- 2. LAZY PLAY/PAUSE ---------- */
  if (!reduced) {
    if ("IntersectionObserver" in window) {
      var pio = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (e.isIntersecting) {
            var p = video.play && video.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            try { video.pause(); } catch (err) {}
          }
        }
      }, { root: null, rootMargin: "240px 0px 240px 0px", threshold: 0 });
      pio.observe(band);
    } else {
      var pp = video.play && video.play();
      if (pp && pp.catch) pp.catch(function () {});
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        try { video.pause(); } catch (e) {}
      } else {
        var r = band.getBoundingClientRect();
        var vh = window.innerHeight || document.documentElement.clientHeight;
        if (r.bottom > -240 && r.top < vh + 240) {
          var pr = video.play && video.play();
          if (pr && pr.catch) pr.catch(function () {});
        }
      }
    });
  }

  /* ---------- 1. SCROLL PARALLAX (rAF-throttled) ---------- */
  if (reduced) return;

  var needsUpdate = true;

  function update() {
    var rect = band.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;

    // Skip work when fully off-screen (with a small buffer) — pauses the
    // loop contribution until the next scroll wakes it.
    if (rect.bottom < -120 || rect.top > vh + 120) { needsUpdate = false; return false; }

    var bandCenter     = rect.top + rect.height / 2;
    var viewportCenter = vh / 2;
    var range          = (rect.height + vh) / 2;
    var t = Math.max(-1, Math.min(1, (bandCenter - viewportCenter) / range));

    var shift = -t * MAX_SHIFT;
    video.style.transform =
      "translate3d(0, " + shift.toFixed(2) + "px, 0) scale(" + BG_SCALE + ")";

    // One-shot per scroll burst: done until the next scroll/resize wakes us.
    needsUpdate = false;
    return false;
  }

  // Register with the single shared loop instead of a private rAF.
  if (window.PeptidexLoop) {
    window.PeptidexLoop.add(function () { return needsUpdate ? update() : false; });
  }

  function onScroll() {
    needsUpdate = true;
    if (window.PeptidexLoop) window.PeptidexLoop.wake();
    else update();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  // Initial paint
  update();
})();
