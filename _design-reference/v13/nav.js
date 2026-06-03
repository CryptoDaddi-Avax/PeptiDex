/* =============================================================
   Peptidex — Nav behavior
     1. .scrolled state after passing ~80vh (rAF-throttled scroll)
     2. Mobile hamburger toggle (glass slide-down + link stagger)
   ============================================================= */
(function () {
  if (typeof window === "undefined") return;

  var nav = document.getElementById("siteNav");
  if (!nav) return;

  /* ---------- 1. SCROLL STATE ----------
     Timestamp-throttled and calls update() DIRECTLY — does not depend on
     requestAnimationFrame, which is frozen in some preview environments. */
  var lastRun = 0;
  var trailing = null;
  function threshold() {
    return (window.innerHeight || document.documentElement.clientHeight) * 0.8;
  }
  function update() {
    lastRun = Date.now();
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (y > threshold()) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  function onScroll() {
    var now = Date.now();
    if (now - lastRun >= 80) {
      update();
    } else if (!trailing) {
      // ensure a trailing call so the final position is captured
      trailing = setTimeout(function () {
        trailing = null;
        update();
      }, 80 - (now - lastRun));
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  /* ---------- 2. MOBILE MENU ---------- */
  var burger = document.getElementById("navBurger");
  if (burger) {
    function setOpen(open) {
      nav.classList.toggle("menu-open", open);
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    }
    burger.addEventListener("click", function () {
      setOpen(!nav.classList.contains("menu-open"));
    });
    // Close when a mobile link is tapped
    var mobileLinks = nav.querySelectorAll(".nav-mobile a");
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener("click", function () { setOpen(false); });
    }
    // Close on escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("menu-open")) setOpen(false);
    });
    // Close when resizing up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && nav.classList.contains("menu-open")) setOpen(false);
    });
  }
})();
