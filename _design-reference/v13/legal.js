/* =============================================================
   Peptidex — Research-Use-Only banner behavior
   Session-gated, dismissible. Shows once per session until the
   visitor acknowledges. Path-agnostic (no asset fetches).
   ============================================================= */
(function () {
  if (typeof window === "undefined") return;
  var KEY = "peptidex_rou_ack";
  var banner = document.getElementById("rouBanner");
  if (!banner) return;

  var ack = false;
  try { ack = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
  if (ack) return; // already acknowledged this session

  banner.classList.add("mounted");
  // reveal after first paint so the slide-up transition runs
  setTimeout(function () { banner.classList.add("show"); }, 600);

  function dismiss() {
    banner.classList.remove("show");
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    setTimeout(function () { banner.classList.remove("mounted"); }, 460);
  }

  var ackBtn = document.getElementById("rouAck");
  var closeBtn = document.getElementById("rouClose");
  if (ackBtn) ackBtn.addEventListener("click", dismiss);
  if (closeBtn) closeBtn.addEventListener("click", dismiss);
})();
