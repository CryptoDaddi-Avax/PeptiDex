/* =============================================================
   Peptidex — Database Bento behavior
     1. Lazy-play .card-video via IntersectionObserver
        (play when entering viewport, pause when fully off-screen)
     2. Animate audit bars + count-up numbers on card B entry
     3. prefers-reduced-motion: never play; seek to first frame
   ============================================================= */
(function () {
  if (typeof window === "undefined") return;

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. LAZY VIDEO ---------- */
  function initVideos() {
    var vids = document.querySelectorAll(".card-video");
    if (!vids.length) return;

    // Defensive setup — guarantee muted/inline/loop regardless of attrs.
    for (var i = 0; i < vids.length; i++) {
      var v = vids[i];
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      v.removeAttribute("autoplay"); // we control play/pause via IO
      try { v.pause(); } catch (e) {}
      if (reduced) {
        // Show first frame as poster; never play.
        if (v.readyState >= 1) {
          try { v.currentTime = 0; } catch (e) {}
        } else {
          v.addEventListener("loadedmetadata", function (ev) {
            try { ev.target.currentTime = 0; } catch (e) {}
          }, { once: true });
        }
      }
    }

    if (reduced) return;
    if (!("IntersectionObserver" in window)) {
      // No IO available — just play everything.
      for (var k = 0; k < vids.length; k++) {
        var p = vids[k].play && vids[k].play();
        if (p && p.catch) p.catch(function () {});
      }
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        var vid = e.target;
        if (e.isIntersecting) {
          var pr = vid.play && vid.play();
          if (pr && pr.catch) pr.catch(function () {});
        } else {
          try { vid.pause(); } catch (err) {}
        }
      }
    }, {
      root: null,
      rootMargin: "240px 0px 240px 0px", // start a little before in view
      threshold: 0
    });

    for (var j = 0; j < vids.length; j++) io.observe(vids[j]);

    // Pause when tab is hidden, resume visibility-aware on return
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        for (var i = 0; i < vids.length; i++) {
          try { vids[i].pause(); } catch (e) {}
        }
      } else {
        for (var i = 0; i < vids.length; i++) {
          // Only restart videos whose card is currently in viewport.
          var r = vids[i].getBoundingClientRect();
          var vh = window.innerHeight || document.documentElement.clientHeight;
          if (r.bottom > -240 && r.top < vh + 240) {
            var pr = vids[i].play && vids[i].play();
            if (pr && pr.catch) pr.catch(function () {});
          }
        }
      }
    });
  }

  /* ---------- 2. AUDIT BARS + COUNT-UP ---------- */
  function decimalsOf(n) {
    var s = String(n);
    var dot = s.indexOf(".");
    return dot < 0 ? 0 : (s.length - dot - 1);
  }

  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    var suffix = el.dataset.suffix || "";
    var decimals = el.dataset.decimals != null
      ? parseInt(el.dataset.decimals, 10)
      : decimalsOf(target);

    if (reduced) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }

    var start = Date.now();
    var dur = 1400;
    var stepMs = 16;
    // setTimeout stepping (not rAF) so it animates even where rAF is frozen.
    (function tick() {
      var p = Math.min(1, (Date.now() - start) / dur);
      var e = 1 - Math.pow(1 - p, 4);   // easeOutQuart
      el.textContent = (target * e).toFixed(decimals) + suffix;
      if (p < 1) setTimeout(tick, stepMs);
      else el.textContent = target.toFixed(decimals) + suffix;
    })();
  }

  function fillBar(bar) {
    var fillEl = bar.querySelector(".audit-fill");
    if (!fillEl) return;
    var target = parseFloat(fillEl.dataset.fill);
    if (isNaN(target)) return;
    bar.style.setProperty("--target", target + "%");
    bar.classList.add("entered");
    if (reduced) {
      // Skip transition — set inline width.
      fillEl.style.transition = "none";
      fillEl.style.width = target + "%";
    }
  }

  function initAuditCard() {
    var card = document.querySelector(".card-b");
    if (!card) return;
    var bars = card.querySelectorAll(".audit-bar");
    var nums = card.querySelectorAll(".audit-num[data-count]");

    function trigger() {
      for (var i = 0; i < bars.length; i++) {
        // Stagger the bar fills slightly for richness.
        (function (b, idx) {
          setTimeout(function () { fillBar(b); }, idx * 140);
        })(bars[i], i);
      }
      for (var j = 0; j < nums.length; j++) {
        (function (n, idx) {
          setTimeout(function () { countUp(n); }, idx * 140);
        })(nums[j], j);
      }
    }

    if (!("IntersectionObserver" in window)) {
      trigger();
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          trigger();
          io.disconnect();
          break;
        }
      }
    }, { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.25 });
    io.observe(card);

    // Fallback: if IO never fires (frozen env), trigger after a beat.
    setTimeout(function () {
      var anyEntered = card.querySelector(".audit-bar.entered");
      if (!anyEntered) trigger();
    }, 2400);
  }

  /* ---------- BOOT ---------- */
  function boot() {
    initVideos();
    initAuditCard();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
