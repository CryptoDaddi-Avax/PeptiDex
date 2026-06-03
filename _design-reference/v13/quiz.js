/* =============================================================
   Peptidex — Stack quiz routing + results logic
   No backend. State persists to sessionStorage so Back works.
   ============================================================= */
(function () {
  "use strict";

  /* ---------- STACK DATA (mirrors stacks.html) ---------- */
  var STACKS = {
    recomp:    { name: "The Recomp Stack",     slug: "the-recomp-stack",     goal: "Body Recomp",   diff: "Intermediate", comps: [["Retatrutide","4mg/wk"],["CJC-1295/Ipamorelin","300mcg 5x/wk"],["BPC-157","250mcg 2x/day"]], cycle: "12 weeks", studies: "18", monthly: "$220", blurb: "Simultaneous fat loss + lean mass via GLP-1 agonist + GH secretagogue.", alts: ["cutting","mass"] },
    cutting:   { name: "The Cutting Stack",    slug: "the-cutting-stack",    goal: "Fat Loss",      diff: "Beginner",     comps: [["Semaglutide","1mg/wk"],["AOD-9604","300mcg/day"],["L-Carnitine","500mg/day"]], cycle: "10 weeks", studies: "14", monthly: "$120", blurb: "Appetite control plus lipolytic support for a clean, gradual cut.", alts: ["recomp","recovery"] },
    mass:      { name: "The Mass Stack",       slug: "the-mass-stack",       goal: "Muscle Growth", diff: "Advanced",     comps: [["Tesamorelin","2mg/day"],["Ipamorelin","200mcg 3x/day"],["IGF-1 LR3","40mcg/day"]], cycle: "16 weeks", studies: "21", monthly: "$340", blurb: "Maximal GH/IGF-1 axis stimulation for advanced hypertrophy protocols.", alts: ["recomp","recovery"] },
    recovery:  { name: "The Recovery Protocol",slug: "the-recovery-protocol",goal: "Recovery",      diff: "Beginner",     comps: [["BPC-157","250mcg 2x/day"],["TB-500","2mg 2x/wk"],["KPV","500mcg/day"]], cycle: "8 weeks", studies: "26", monthly: "$140", blurb: "Soft-tissue and gut repair to accelerate return from hard training.", alts: ["healing","longevity"] },
    longevity: { name: "The Longevity Stack",  slug: "the-longevity-stack",  goal: "Longevity",     diff: "Intermediate", comps: [["Epitalon","10mg cycles"],["NAD+","100mg 3x/wk"],["GHK-Cu","2mg/day"]], cycle: "12 weeks", studies: "16", monthly: "$110", blurb: "Telomere, NAD+, and copper-tripeptide support for healthspan research.", alts: ["sleep","skin"] },
    cognitive: { name: "The Cognitive Stack",  slug: "the-cognitive-stack",  goal: "Cognitive",     diff: "Intermediate", comps: [["Semax","600mcg/day"],["Selank","300mcg/day"],["Cerebrolysin","5ml 5x/wk"]], cycle: "8 weeks", studies: "19", monthly: "$240", blurb: "BDNF/NGF upregulation with anxiolytic balance for focus and clarity.", alts: ["sleep","longevity"] },
    sleep:     { name: "The Sleep Stack",      slug: "the-sleep-stack",      goal: "Sleep",         diff: "Beginner",     comps: [["DSIP","100mcg before bed"],["Epitalon","5mg cycles"],["Glycine","3g"]], cycle: "6 weeks", studies: "12", monthly: "$80", blurb: "Deep-sleep induction and circadian regulation for restorative nights.", alts: ["longevity","recovery"] },
    healing:   { name: "The Healing Stack",    slug: "the-healing-stack",    goal: "Healing",       diff: "Beginner",     comps: [["BPC-157","500mcg 2x/day"],["TB-500","5mg 1x/wk"],["GHK-Cu","2mg/day"]], cycle: "8 weeks", studies: "28", monthly: "$150", blurb: "Angiogenesis and tissue remodeling for injury and wound research.", alts: ["recovery","skin"] },
    immune:    { name: "The Immune Stack",     slug: "the-immune-stack",     goal: "Immune",        diff: "Intermediate", comps: [["Thymosin Alpha-1","1.6mg 2x/wk"],["LL-37","100mcg/day"],["KPV","500mcg/day"]], cycle: "10 weeks", studies: "17", monthly: "$260", blurb: "T-cell modulation and antimicrobial peptides for immune resilience.", alts: ["recovery","longevity"] },
    hormonal:  { name: "The Hormonal Reset",   slug: "the-hormonal-reset",   goal: "Hormonal",      diff: "Advanced",     comps: [["Gonadorelin","100mcg 2x/wk"],["Kisspeptin-10","100mcg 3x/wk"],["Tesamorelin","1mg/day"]], cycle: "12 weeks", studies: "13", monthly: "$260", blurb: "HPG-axis restart via GnRH pulsing plus GHRH-driven IGF-1 support.", alts: ["recomp","immune"] },
    skin:      { name: "The Skin Protocol",    slug: "the-skin-protocol",    goal: "Skin",          diff: "Beginner",     comps: [["GHK-Cu","2mg topical"],["BPC-157","250mcg/day"],["Epitalon","5mg cycles"]], cycle: "12 weeks", studies: "20", monthly: "$90", blurb: "Collagen synthesis and dermal repair from topical + systemic peptides.", alts: ["longevity","healing"] }
  };

  // component class membership for constraint filtering
  var GH_AXIS = ["CJC-1295/Ipamorelin", "Ipamorelin", "Tesamorelin", "IGF-1 LR3", "CJC-1295"];
  var GLP_APPETITE = ["Retatrutide", "Semaglutide", "AOD-9604", "Tirzepatide"];
  var HORMONAL = ["Gonadorelin", "Kisspeptin-10", "PT-141"];
  function classOf(name) {
    if (GH_AXIS.indexOf(name) !== -1) return "gh";
    if (GLP_APPETITE.indexOf(name) !== -1) return "glp";
    if (HORMONAL.indexOf(name) !== -1) return "hormonal";
    return null;
  }

  // beginner fallback when a matched stack is too advanced
  var BEGINNER_SWAP = { mass: "recovery", hormonal: "recovery" };

  /* ---------- QUESTIONS ---------- */
  var QUESTIONS = [
    {
      key: "q1", type: "single", title: "What research area interests you most?", grid: "cols2",
      options: [
        { id: "recomp",    icon: "🏋️", title: "Body Recomposition", desc: "Fat loss + lean mass", stack: "recomp" },
        { id: "fatloss",   icon: "🔥", title: "Fat Loss", desc: "Pure fat reduction", stack: "cutting" },
        { id: "muscle",    icon: "💪", title: "Muscle Growth", desc: "Lean mass + strength", stack: "mass" },
        { id: "recovery",  icon: "🩹", title: "Recovery & Healing", desc: "Injury recovery, joint health", stack: "recovery" },
        { id: "longevity", icon: "⏳", title: "Longevity", desc: "Anti-aging, cellular health", stack: "longevity" },
        { id: "cognitive", icon: "🧠", title: "Cognitive", desc: "Focus, memory, neuroprotection", stack: "cognitive" },
        { id: "sleep",     icon: "🌙", title: "Sleep", desc: "Quality, recovery", stack: "sleep" },
        { id: "hormonal",  icon: "⚡", title: "Hormonal", desc: "Natural hormone support", stack: "hormonal" }
      ]
    },
    {
      key: "q2", type: "single", title: "Your research methodology familiarity?",
      options: [
        { id: "beginner",     title: "Beginner", desc: "First peptide cycle. Need clear guidance." },
        { id: "intermediate", title: "Intermediate", desc: "I've done 2–5 cycles. Comfortable with reconstitution." },
        { id: "advanced",     title: "Advanced", desc: "Experienced. Comfortable with stacks and complex protocols." }
      ]
    },
    {
      key: "q3", type: "single", title: "How long do you want to cycle?",
      options: [
        { id: "4",  title: "4 weeks", desc: "Short trial cycle", cycle: "4 weeks" },
        { id: "8",  title: "8 weeks", desc: "Standard cycle", cycle: "8 weeks" },
        { id: "12", title: "12 weeks", desc: "Full optimization cycle", cycle: "12 weeks" },
        { id: "16", title: "16+ weeks", desc: "Long protocol", cycle: "16+ weeks" }
      ]
    },
    {
      key: "q4", type: "single", title: "Research budget range you're exploring?",
      options: [
        { id: "u100",    title: "Under $100", desc: "Minimal viable stack" },
        { id: "100-250", title: "$100–250", desc: "Mid-tier stack" },
        { id: "250-500", title: "$250–500", desc: "Comprehensive stack" },
        { id: "500",     title: "$500+", desc: "No constraints" }
      ]
    },
    {
      key: "q5", type: "multi", optional: true, title: "Any constraints?", hint: "Multi-select · optional",
      options: [
        { id: "fewer",          icon: "💉", title: "Want fewer injections" },
        { id: "avoid-gh",       icon: "🚫", title: "Avoid GH-axis peptides" },
        { id: "avoid-glp",      icon: "🚫", title: "Avoid GLP-1 / appetite suppressants" },
        { id: "avoid-hormonal", icon: "🚫", title: "Avoid hormonal peptides" },
        { id: "none",           icon: "✓",  title: "No constraints", exclusive: true }
      ]
    }
  ];

  /* ---------- STATE ---------- */
  var SKEY = "peptidex_quiz";
  var answers = {};
  try { answers = JSON.parse(sessionStorage.getItem(SKEY)) || {}; } catch (e) { answers = {}; }
  function persist() { try { sessionStorage.setItem(SKEY, JSON.stringify(answers)); } catch (e) {} }
  var idx = 0;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- ELEMENTS ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var overlay = $("quizOverlay");
  var screens = { landing: $("screenLanding"), quiz: $("screenQuiz"), loading: $("screenLoading") };
  var resultsScreen = $("screenResults");
  var qcBody = $("qcBody"), qcCount = $("qcCount"), qcBack = $("qcBack"), qcSkip = $("qcSkip"), qcNext = $("qcNext");
  var segs = document.querySelectorAll("#qcProgress .qc-seg");

  /* ---------- SCREEN SWITCH ---------- */
  function showScreen(name) {
    Object.keys(screens).forEach(function (k) { screens[k].classList.toggle("is-active", k === name); });
  }
  function lock(on) { document.body.classList.toggle("quiz-locked", on); }

  /* ---------- RENDER A QUESTION ---------- */
  function renderQuestion() {
    var q = QUESTIONS[idx];
    var isMulti = q.type === "multi";
    qcCount.textContent = "Question " + (idx + 1) + " of 5";
    qcBack.classList.toggle("hide", idx === 0);
    qcSkip.classList.toggle("hide", !q.optional);

    // progress segments
    segs.forEach(function (s, i) { s.classList.toggle("filled", i <= idx); });

    // current selection
    var cur = answers[q.key];
    if (isMulti && !Array.isArray(cur)) cur = [];

    var html = '<h2 class="q-question">' + q.title + "</h2>";
    if (q.hint) html += '<p class="q-hint">' + q.hint + "</p>";
    html += '<div class="ans-grid' + (q.grid === "cols2" ? " cols2" : "") + '" id="ansGrid">';
    q.options.forEach(function (o, i) {
      var selected = isMulti ? (cur.indexOf(o.id) !== -1) : (cur === o.id);
      html += '<button class="ans-card' + (selected ? " selected" : "") + '" type="button" data-id="' + o.id + '" data-i="' + i + '">';
      if (o.icon) html += '<span class="ans-ico">' + o.icon + "</span>";
      else html += '<span class="ans-key">' + (i + 1) + "</span>";
      html += '<span class="ans-text"><span class="ans-title">' + o.title + "</span>" + (o.desc ? '<span class="ans-desc">' + o.desc + "</span>" : "") + "</span>";
      if (isMulti) html += '<span class="ans-check"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
      html += "</button>";
    });
    html += "</div>";
    qcBody.innerHTML = html;

    // wire option clicks
    qcBody.querySelectorAll(".ans-card").forEach(function (btn) {
      btn.addEventListener("click", function () { pick(btn.getAttribute("data-id")); });
    });

    updateNext();
  }

  function pick(id) {
    var q = QUESTIONS[idx];
    if (q.type === "multi") {
      var arr = Array.isArray(answers[q.key]) ? answers[q.key].slice() : [];
      var opt = q.options.filter(function (o) { return o.id === id; })[0];
      if (opt && opt.exclusive) {
        arr = (arr.indexOf(id) !== -1) ? [] : [id];
      } else {
        // toggle; remove any exclusive option
        arr = arr.filter(function (x) {
          var oo = q.options.filter(function (o) { return o.id === x; })[0];
          return !(oo && oo.exclusive);
        });
        var p = arr.indexOf(id);
        if (p === -1) arr.push(id); else arr.splice(p, 1);
      }
      answers[q.key] = arr;
    } else {
      answers[q.key] = id;
    }
    persist();
    // reflect selection
    var isMulti = q.type === "multi";
    var cur = answers[q.key];
    qcBody.querySelectorAll(".ans-card").forEach(function (b) {
      var bid = b.getAttribute("data-id");
      var sel = isMulti ? (cur.indexOf(bid) !== -1) : (cur === bid);
      b.classList.toggle("selected", sel);
    });
    updateNext();
  }

  function answered() {
    var q = QUESTIONS[idx];
    if (q.type === "multi") return q.optional ? true : (Array.isArray(answers[q.key]) && answers[q.key].length > 0);
    return !!answers[q.key];
  }
  function updateNext() {
    var ok = answered();
    qcNext.classList.toggle("disabled", !ok);
    qcNext.disabled = !ok;
  }

  /* ---------- NAV ---------- */
  function next() {
    if (!answered()) return;
    if (idx < QUESTIONS.length - 1) { idx++; renderQuestion(); }
    else finish();
  }
  function back() { if (idx > 0) { idx--; renderQuestion(); } }
  function skip() { if (idx < QUESTIONS.length - 1) { idx++; renderQuestion(); } else finish(); }

  /* ---------- FINISH → LOADING → RESULTS ---------- */
  function finish() {
    showScreen("loading");
    var ticks = ["Analyzing 668+ studies…", "Matching to vendors…", "Building your stack…"];
    var ticker = $("qTicker");
    var t = 0; ticker.textContent = ticks[0];
    var iv = setInterval(function () { t++; if (t < ticks.length) ticker.textContent = ticks[t]; }, reduced ? 280 : 500);
    setTimeout(function () {
      clearInterval(iv);
      renderResults();
      lock(false);
      overlay.classList.add("hidden");
      resultsScreen.classList.add("is-active");
      window.scrollTo(0, 0);
    }, reduced ? 700 : 1500);
  }

  /* ---------- RESULTS ---------- */
  function diffClass(d) { return "res-diff-" + d.toLowerCase().replace(/[^a-z]/g, ""); }

  function renderResults() {
    var goalOpt = QUESTIONS[0].options.filter(function (o) { return o.id === answers.q1; })[0] || QUESTIONS[0].options[0];
    var exp = answers.q2 || "intermediate";
    var cycleOpt = QUESTIONS[2].options.filter(function (o) { return o.id === answers.q3; })[0];
    var cycleLabel = cycleOpt ? cycleOpt.cycle : null;
    var constraints = Array.isArray(answers.q5) ? answers.q5 : [];

    var stackKey = goalOpt.stack;
    var beginnerAdjusted = false;
    if (exp === "beginner" && STACKS[stackKey].diff !== "Beginner" && BEGINNER_SWAP[stackKey]) {
      stackKey = BEGINNER_SWAP[stackKey];
      beginnerAdjusted = true;
    }
    var stack = STACKS[stackKey];

    // a second, lighter form of beginner adjustment: trim the most advanced
    // component for Intermediate stacks rather than swapping the whole stack.
    var comps = stack.comps.slice();
    var trimNote = false;
    if (exp === "beginner" && !beginnerAdjusted && stack.diff === "Intermediate" && comps.length > 2) {
      comps = comps.slice(0, 2);
      trimNote = true;
    }

    // constraint flagging
    var avoid = {};
    if (constraints.indexOf("avoid-gh") !== -1) avoid.gh = true;
    if (constraints.indexOf("avoid-glp") !== -1) avoid.glp = true;
    if (constraints.indexOf("avoid-hormonal") !== -1) avoid.hormonal = true;
    var flagged = [];
    var chipsHtml = comps.map(function (c) {
      var cls = classOf(c[0]);
      var muted = cls && avoid[cls];
      if (muted) flagged.push(c[0]);
      return '<span class="res-chip' + (muted ? " muted" : "") + '"><span class="rc-name">' + c[0] + '</span><span class="rc-dose">' + c[1] + "</span></span>";
    }).join("");

    var diffLabel = beginnerAdjusted ? stack.diff : (trimNote ? "Beginner-adjusted" : stack.diff);

    // subhead
    var sub = "Stacks most studied for " + goalOpt.title.toLowerCase() + ". Cycle lengths reflect published trial durations.";
    $("resSub").textContent = sub;

    // notes
    var notes = "";
    if (beginnerAdjusted) notes += '<div class="res-note"><span class="rn-ico">✓</span><span>Adjusted for a beginner-friendly protocol — we swapped in a simpler, lower-risk stack to start.</span></div>';
    else if (trimNote) notes += '<div class="res-note"><span class="rn-ico">✓</span><span>Adjusted for beginner-friendly protocol — the most advanced component is held back until your next cycle.</span></div>';
    if (flagged.length) {
      var fl = flagged.join(", ");
      notes += '<div class="res-note constraint"><span class="rn-ico">⚠</span><span>Flagged from your constraints: <strong>' + fl + '</strong>. See alternatives below — our advisor can suggest swaps in the same class.</span></div>';
    }
    if (constraints.indexOf("fewer") !== -1) {
      notes += '<div class="res-note"><span class="rn-ico">✓</span><span>Fewer-injection preference noted — we favor longer-ester and weekly-dosed components where available.</span></div>';
    }

    var cycleStat = cycleLabel || stack.cycle;
    $("resCard").innerHTML =
      '<div class="res-card-top"><span class="res-goal-tag">' + stack.goal + '</span><span class="res-diff-tag ' + diffClass(stack.diff) + '">' + diffLabel + "</span></div>" +
      '<h2 class="res-stack-name">' + stack.name + "</h2>" +
      '<p class="res-sub" style="margin-top:8px;">' + stack.blurb + "</p>" +
      notes +
      '<div class="res-chips">' + chipsHtml + "</div>" +
      '<div class="res-stats">' +
        '<div class="res-stat"><span class="s-label">Cycle</span><span class="s-val">' + cycleStat + "</span></div>" +
        '<div class="res-stat"><span class="s-label">Studies</span><span class="s-val">' + stack.studies + "</span></div>" +
        '<div class="res-stat"><span class="s-label">Est. monthly</span><span class="s-val">' + stack.monthly + "</span></div>" +
      "</div>" +
      '<div class="res-ctas">' +
        '<span class="magnetic"><a class="btn-inner pill-btn pill-lime" href="/stacks">View documented combination' +
          ' <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a></span>' +
        '<a class="pill-btn pill-outline" href="/tools/pricing">See vendor pricing' +
          ' <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>' +
      "</div>";

    // alternatives
    $("altGrid").innerHTML = stack.alts.map(function (key) {
      var a = STACKS[key];
      if (!a) return "";
      return '<a class="alt-card glass-light" href="/stacks/' + a.slug + '">' +
        '<div class="alt-top"><span class="alt-name">' + a.name + '</span><span class="alt-goal">' + a.goal + "</span></div>" +
        '<p class="alt-desc">' + a.blurb + "</p>" +
        '<span class="alt-meta">' + a.cycle + " · " + a.studies + " studies · " + a.monthly + "/mo</span>" +
      "</a>";
    }).join("");
  }

  /* ---------- KEYBOARD ---------- */
  document.addEventListener("keydown", function (e) {
    if (!screens.quiz.classList.contains("is-active")) return;
    if (e.key === "Enter") { e.preventDefault(); if (answered()) next(); return; }
    if (e.key === "Backspace" && idx > 0) { e.preventDefault(); back(); return; }
    var n = parseInt(e.key, 10);
    if (!isNaN(n) && n >= 1) {
      var q = QUESTIONS[idx];
      if (n <= q.options.length) { e.preventDefault(); pick(q.options[n - 1].id); }
    }
  });

  /* ---------- WIRING ---------- */
  $("startBtn").addEventListener("click", function () {
    idx = 0;
    lock(true);
    showScreen("quiz");
    renderQuestion();
  });
  qcNext.addEventListener("click", next);
  qcBack.addEventListener("click", back);
  qcSkip.addEventListener("click", skip);

  // conversion form
  var convForm = $("convForm");
  convForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var input = $("convEmail");
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    if (!ok) {
      input.classList.add("invalid");
      $("convFine").textContent = "Please enter a valid email address.";
      input.focus();
      return;
    }
    input.classList.remove("invalid");
    $("convFine").style.display = "none";
    $("convOk").classList.add("show");
    convForm.style.display = "none";
  });
  $("convEmail").addEventListener("input", function () {
    this.classList.remove("invalid");
  });

  // retake
  $("retakeBtn").addEventListener("click", function () {
    answers = {}; persist(); idx = 0;
    resultsScreen.classList.remove("is-active");
    overlay.classList.remove("hidden");
    $("convForm").style.display = "";
    $("convOk").classList.remove("show");
    $("convFine").style.display = "";
    $("convFine").textContent = "We'll email your results. Unsubscribe anytime.";
    showScreen("landing");
    window.scrollTo(0, 0);
  });

  // share
  $("shareBtn").addEventListener("click", function () {
    var btn = this;
    var url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: "My Peptidex stack", url: url }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () {
        var label = btn.lastChild;
        btn.childNodes[btn.childNodes.length - 1].textContent = " Link copied ✓";
        setTimeout(function () { btn.childNodes[btn.childNodes.length - 1].textContent = " Share results"; }, 1800);
      }).catch(function () {});
    }
  });
})();
