/* =============================================================
   Peptidex — Premium Interaction Layer (consolidated)
   All per-frame work (cursor lerp, tilt follow, scroll-progress)
   routes through the single shared PeptidexLoop. Event-driven work
   (active-nav IO, tilt targets) wakes the loop; nothing spins its
   own requestAnimationFrame.
   ============================================================= */
(function () {
  if (typeof window === "undefined") return;

  var Loop = window.PeptidexLoop || null;
  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine =
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function wake() { if (Loop) Loop.wake(); }

  /* =========================================================
     1. SCROLL PROGRESS  (always on; one-shot per scroll burst)
     ========================================================= */
  (function scrollProgress() {
    var bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    var need = true;

    function calc() {
      var d = document.documentElement;
      var max = d.scrollHeight - window.innerHeight;
      var y = window.pageYOffset || d.scrollTop || 0;
      var p = max > 0 ? y / max : 0;
      if (p < 0) p = 0; else if (p > 1) p = 1;
      bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
      need = false;
      return false; // done until next scroll
    }

    if (Loop) Loop.add(function () { return need ? calc() : false; });

    function poke() { need = true; if (Loop) wake(); else calc(); }
    window.addEventListener("scroll", poke, { passive: true });
    window.addEventListener("resize", poke);
    calc();
  })();

  /* =========================================================
     2. ACTIVE NAV  (IntersectionObserver + sliding indicator)
     ========================================================= */
  (function activeNav() {
    var linkEls = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
    if (!linkEls.length) return;
    var indicator = document.querySelector(".nav-indicator");

    var map = {};
    var sections = [];
    linkEls.forEach(function (a) {
      var h = a.getAttribute("href") || "";
      if (h.charAt(0) === "#" && h.length > 1) {
        var el = document.getElementById(h.slice(1));
        if (el) { map[el.id] = a; sections.push(el); }
      }
    });

    function setActive(a) {
      linkEls.forEach(function (l) { l.classList.toggle("active", l === a); });
      if (indicator && a) {
        indicator.style.width = a.offsetWidth + "px";
        indicator.style.transform = "translateX(" + a.offsetLeft + "px)";
        indicator.classList.add("show");
      }
    }

    if ("IntersectionObserver" in window && sections.length) {
      var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            var a = map[entries[i].target.id];
            if (a) setActive(a);
          }
        }
      }, { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 });
      sections.forEach(function (s) { io.observe(s); });
    }

    /* Scroll fallback: in environments where IO callbacks never fire,
       pick the section whose rect crosses the ~42% viewport line.
       Routed through the shared loop (one-shot per scroll burst). */
    var need = true;
    function pickByScroll() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var line = vh * 0.42;
      var chosen = null;
      for (var i = 0; i < sections.length; i++) {
        var r = sections[i].getBoundingClientRect();
        if (r.top <= line && r.bottom >= line) { chosen = sections[i]; break; }
        // otherwise track the last section that has scrolled above the line
        if (r.top <= line) chosen = sections[i];
      }
      if (chosen && map[chosen.id]) setActive(map[chosen.id]);
      need = false;
      return false;
    }
    if (Loop) Loop.add(function () { return need ? pickByScroll() : false; });
    function pokeNav() { need = true; if (Loop) wake(); else pickByScroll(); }
    window.addEventListener("scroll", pokeNav, { passive: true });
    window.addEventListener("resize", pokeNav);
    pickByScroll();

    window.addEventListener("resize", function () {
      var a = document.querySelector(".nav-links a.active");
      if (a) setActive(a);
    });
  })();

  /* =========================================================
     3. CUSTOM CURSOR  (fine pointer only, not reduced motion)
     ========================================================= */
  if (fine && !reduced) (function cursor() {
    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;
    document.body.classList.add("has-custom-cursor");

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var rx = mx, ry = my;
    var scale = 1, targetScale = 1;
    var downFrames = 0;

    function frame() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      var ts = targetScale * (downFrames > 0 ? 0.82 : 1);
      scale += (ts - scale) * 0.2;
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0) translate(-50%,-50%)";
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0) translate(-50%,-50%) scale(" + scale.toFixed(3) + ")";
      if (downFrames > 0) downFrames--;
      return (
        Math.abs(mx - rx) > 0.1 ||
        Math.abs(my - ry) > 0.1 ||
        Math.abs(ts - scale) > 0.005 ||
        downFrames > 0
      );
    }
    if (Loop) Loop.add(frame);

    function updateState(target) {
      if (!target || !target.closest) return;
      var molecule = target.closest(".helix-stage, #helix, .hero-right");
      var link = target.closest('a, button, .pill-btn, [role="button"], .magnetic');
      var glass = target.closest(".glass, .glass-light, .card-shell, .price-card");
      var light = target.closest('[data-cursor="light"], .glass-light, .tier-light, .card-shell-light');

      ring.classList.toggle("is-molecule", !!molecule);
      ring.classList.toggle("is-link", !!link && !molecule);
      ring.classList.toggle("is-glass", !!glass && !link && !molecule);
      ring.classList.toggle("on-light", !!light);
      dot.classList.toggle("on-light", !!light);

      targetScale = molecule ? 2.4 : (link ? 1.8 : (glass ? 1.4 : 1));
    }

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      // dot tracks 1:1 — set immediately for zero lag
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0) translate(-50%,-50%)";
      updateState(e.target);
      wake();
    }, { passive: true });

    window.addEventListener("mousedown", function () { downFrames = 9; wake(); });
    document.addEventListener("mouseleave", function () { dot.style.opacity = "0"; ring.style.opacity = "0"; });
    document.addEventListener("mouseenter", function () { dot.style.opacity = "1"; ring.style.opacity = "1"; });

    wake();
  })();

  /* =========================================================
     4. 3D CARD TILT  (fine pointer only, not reduced motion)
     Delegated per grid container. Tilt rotation written to
     --rx/--ry on the INNER layer (.card-shell / .price-card) so
     it composes with --lift and never fights the .fade-up entrance.
     ========================================================= */
  if (fine && !reduced) (function tilt() {
    var containers = document.querySelectorAll(".bento-grid, .price-grid, .tools-grid, .vendor-grid, [data-tilt-grid]");
    if (!containers.length) return;

    var states = new Map();      // inner element -> { crx, cry, trx, try, dead }
    var current = null;          // inner element currently under pointer

    function ensure(el) {
      var s = states.get(el);
      if (!s) { s = { crx: 0, cry: 0, trx: 0, tryy: 0, dead: false }; states.set(el, s); }
      s.dead = false;
      return s;
    }

    function flat(el) {
      if (!el) return;
      el.classList.remove("tilting");
      // hand the ease-back to CSS (600ms): set rotation to 0
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      var s = states.get(el);
      if (s) s.dead = true;     // loop will drop it next frame
      wake();
    }

    function tiltFrame() {
      var any = false;
      states.forEach(function (s, el) {
        if (s.dead) { states.delete(el); return; }
        s.crx += (s.trx - s.crx) * 0.22;
        s.cry += (s.tryy - s.cry) * 0.22;
        el.style.setProperty("--rx", s.crx.toFixed(2) + "deg");
        el.style.setProperty("--ry", s.cry.toFixed(2) + "deg");
        any = true;
      });
      return any;
    }
    if (Loop) Loop.add(tiltFrame);

    function accentCard(inner) {
      return (
        inner.classList.contains("featured") ||
        inner.classList.contains("card-shell-light") ||
        inner.classList.contains("tier-light") ||
        inner.classList.contains("is-light")
      );
    }

    Array.prototype.forEach.call(containers, function (container) {
      container.addEventListener("pointermove", function (e) {
        if (e.pointerType === "touch") return;
        var cell = e.target.closest && e.target.closest(".bento-card, .price-cell, [data-tilt-cell]");
        var inner = cell && cell.querySelector(".card-shell, .price-card, [data-tilt]");
        if (!inner) { if (current) { flat(current); current = null; } return; }

        if (current && current !== inner) flat(current);
        current = inner;

        var r = inner.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        px = Math.max(0, Math.min(1, px));
        py = Math.max(0, Math.min(1, py));

        var max = accentCard(inner) ? 4 : 6;
        var s = ensure(inner);
        s.trx = -(py - 0.5) * 2 * max;   // rotateX
        s.tryy = (px - 0.5) * 2 * max;   // rotateY

        inner.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        inner.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        inner.classList.add("tilting");
        wake();
      }, { passive: true });

      container.addEventListener("pointerleave", function () {
        if (current) { flat(current); current = null; }
      });
    });
  })();

})();
