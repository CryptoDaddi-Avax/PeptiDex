/* =============================================================
   Peptidex — Pricing price count-up
   Reuses the stats easeOutQuart easing. Driven by setTimeout steps
   (NOT requestAnimationFrame) so it animates even in preview
   environments that freeze rAF. Triggers when the featured card
   enters the viewport; reduced-motion shows the final value at once.
   ============================================================= */
(function () {
  if (typeof window === "undefined") return;

  var el = document.querySelector(".price-value[data-to]");
  if (!el) return;

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var target = parseFloat(el.getAttribute("data-to"));
  if (isNaN(target)) return;
  var prefix = el.getAttribute("data-prefix") || "";

  function setVal(v) { el.textContent = prefix + Math.round(v); }

  var done = false;
  function animate() {
    if (done) return;
    done = true;

    if (reduced) { setVal(target); return; }

    var dur = 1400;            // matches stats counter duration
    var start = Date.now();
    var step = 16;
    (function tick() {
      var p = Math.min(1, (Date.now() - start) / dur);
      var e = 1 - Math.pow(1 - p, 4);   // easeOutQuart
      setVal(target * e);
      if (p < 1) setTimeout(tick, step);
      else setVal(target);
    })();
  }

  // Trigger when the featured card scrolls into view.
  var card = el.closest(".price-card") || el;
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) { animate(); io.disconnect(); break; }
      }
    }, { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.3 });
    io.observe(card);

    // Fallback for environments where IO callbacks never fire:
    // if already in view at load, or after a grace period, run anyway.
    function inView() {
      var r = card.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.9 && r.bottom > 0;
    }
    if (inView()) animate();
    var poll = function () { if (!done && inView()) animate(); };
    window.addEventListener("scroll", poll, { passive: true });
    setTimeout(function () { if (!done && inView()) animate(); }, 1200);
  } else {
    animate();
  }
})();
