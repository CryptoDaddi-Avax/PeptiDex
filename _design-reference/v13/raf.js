/* =============================================================
   Peptidex — Shared animation loop
   ONE rAF loop for the whole site. Every per-frame system (cursor
   lerp, card tilt, scroll-progress, hero helix tilt, interstitial
   parallax) registers a callback here instead of spinning its own
   requestAnimationFrame. The loop idles (stops) when no callback
   needs another frame, and any event handler calls wake() to resume.

   Hybrid driver: schedules BOTH requestAnimationFrame and a 32ms
   setTimeout each cycle; whichever fires first runs the frame and
   cancels the other. This keeps it smooth in real browsers AND
   alive in preview environments that freeze rAF.

   API:
     PeptidexLoop.add(fn)   fn(now) -> return true to request another frame
     PeptidexLoop.wake()    ensure at least one more frame runs
   ============================================================= */
(function () {
  if (typeof window === "undefined") return;
  if (window.PeptidexLoop) return;

  var cbs = [];
  var running = false;
  var pending = false;
  var rafId = null;
  var toId = null;

  var raf = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : null;
  var caf = window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : null;

  function frame(now) {
    if (!pending) return;       // already handled this cycle
    pending = false;
    if (rafId && caf) { caf(rafId); }
    rafId = null;
    if (toId) { clearTimeout(toId); toId = null; }

    var t = (typeof now === "number") ? now : Date.now();
    var want = false;
    for (var i = 0; i < cbs.length; i++) {
      try { if (cbs[i](t)) want = true; } catch (e) { /* keep loop alive */ }
    }

    if (want) schedule();
    else running = false;
  }

  function schedule() {
    pending = true;
    running = true;
    if (raf) rafId = raf(frame);
    toId = setTimeout(function () { frame(Date.now()); }, 32);
  }

  window.PeptidexLoop = {
    add: function (fn) { if (typeof fn === "function") cbs.push(fn); },
    wake: function () { if (!running) schedule(); },
    get running() { return running; }
  };
})();
