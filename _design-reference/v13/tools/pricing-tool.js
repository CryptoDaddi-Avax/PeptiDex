/* =============================================================
   Peptidex — Price Comparison tool logic
   Functional demo over a small hardcoded dataset:
   peptide select + autocomplete, vial-size scaling, PEPTIDEX
   discount toggle, sort, 90-day SVG price chart, cycle-cost
   calculator, and a quick-compare rail. No dependencies.
   ============================================================= */
(function () {
  "use strict";

  /* ---------- DATA ---------- */
  var VENDORS = [
    { id: "amino",     name: "Amino Club",          short: "AC", rating: 4.8, disc: 0.20, purity: 99.2, url: "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&code=PEPTIDEX" },
    { id: "bio",       name: "Bio Longevity Labs",  short: "BL", rating: 4.6, disc: 0.15, purity: 99.0, url: "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443" },
    { id: "limitless", name: "Limitless Life",      short: "LL", rating: 4.5, disc: 0.15, purity: 99.0, url: "https://www.kb6dp3dq.com/PEPTIDEX/" },
    { id: "pantheon",  name: "Pantheon Peptides",   short: "PP", rating: 4.4, disc: 0.15, purity: 98.2, url: "https://pantheonpeptides.com/partner/PeptiDex/" }
  ];
  var VMAP = {}; VENDORS.forEach(function (v) { VMAP[v.id] = v; });

  // base = LIST price for a 10mg vial, per vendor. defaultDose = weekly mg.
  var PEPTIDES = {
    "retatrutide": { name: "Retatrutide", form: "lyophilized", defaultDose: 4, base: { amino: 109, bio: 110, limitless: 127, pantheon: 115 }, stock: { amino: "live", bio: "live", limitless: "live", pantheon: "low" } },
    "tirzepatide": { name: "Tirzepatide", form: "lyophilized", defaultDose: 5, base: { amino: 89,  bio: 95,  limitless: 105, pantheon: 92 },  stock: { amino: "live", bio: "live", limitless: "low",  pantheon: "live" } },
    "semaglutide": { name: "Semaglutide", form: "lyophilized", defaultDose: 1, base: { amino: 65,  bio: 72,  limitless: 78,  pantheon: 69 },  stock: { amino: "live", bio: "live", limitless: "live", pantheon: "live" } },
    "bpc-157":     { name: "BPC-157",     form: "lyophilized", defaultDose: 3.5, base: { amino: 39, bio: 42, limitless: 45, pantheon: 40 },   stock: { amino: "live", bio: "live", limitless: "live", pantheon: "out" } },
    "tb-500":      { name: "TB-500",      form: "lyophilized", defaultDose: 4, base: { amino: 55,  bio: 59,  limitless: 64,  pantheon: 57 },  stock: { amino: "live", bio: "low",  limitless: "live", pantheon: "live" } },
    "tesamorelin": { name: "Tesamorelin", form: "lyophilized", defaultDose: 14, base: { amino: 79, bio: 85, limitless: 92, pantheon: 82 },   stock: { amino: "live", bio: "live", limitless: "live", pantheon: "low" } }
  };

  var SIZE_FACTOR = { 5: 1.08, 10: 1.0, 15: 0.95, 30: 0.88 }; // per-mg bulk scaling
  var CHART_COLORS = { amino: "#C4F25C", bio: "#6FC3B8", limitless: "#C7613B", pantheon: "#E9E4D6" };

  // peptides shown in the quick-compare rail (some without full table data)
  var QUICK = [
    { slug: "tirzepatide", name: "Tirzepatide" },
    { slug: "semaglutide", name: "Semaglutide" },
    { slug: "bpc-157",     name: "BPC-157" },
    { slug: "tb-500",      name: "TB-500" },
    { slug: "tesamorelin", name: "Tesamorelin" },
    { slug: "ipamorelin",  name: "Ipamorelin",  cheap: 4.10 },
    { slug: "cjc-1295",    name: "CJC-1295",    cheap: 6.85 },
    { slug: "ghk-cu",      name: "GHK-Cu",      cheap: 2.40 },
    { slug: "epitalon",    name: "Epitalon",    cheap: 3.55 },
    { slug: "mots-c",      name: "MOTS-c",      cheap: 7.90 }
  ];

  /* ---------- STATE ---------- */
  var state = {
    peptide: "retatrutide",
    size: 10,
    discount: true,
    sort: "permg",
    hidden: {}   // chart vendor lines toggled off
  };

  /* ---------- HELPERS ---------- */
  function r2(n) { return Math.round(n * 100) / 100; }
  function money(n) { return "$" + n.toFixed(2); }
  function stars(rating) {
    var full = Math.round(rating);
    return "\u2605\u2605\u2605\u2605\u2605".slice(0, full) + "\u2606\u2606\u2606\u2606\u2606".slice(0, 5 - full);
  }

  // compute per-vendor pricing for a peptide + size + discount flag
  function computeRows(pepKey, size, discOn) {
    var pep = PEPTIDES[pepKey];
    return VENDORS.map(function (v) {
      var perMgList = (pep.base[v.id] / 10) * SIZE_FACTOR[size];
      var list = perMgList * size;
      var disc = list * (1 - v.disc);
      var eff = discOn ? disc : list;
      return {
        vendor: v,
        list: r2(list),
        disc: r2(disc),
        eff: r2(eff),
        perMg: r2(eff / size),
        savePerVial: r2(list - disc),
        purity: v.purity,
        stock: pep.stock[v.id]
      };
    });
  }

  function cheapestPerMg(pepKey) {
    var rows = computeRows(pepKey, 10, true);
    return Math.min.apply(null, rows.map(function (r) { return r.perMg; }));
  }

  /* ---------- ELEMENTS ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var searchInput = $("pepSearch");
  var autocomplete = $("autocomplete");
  var sortSelect = $("sortSelect");
  var discToggle = $("discToggle");
  var cmpBody = $("cmpBody");
  var chartBox = $("chartBox");
  var chartLegend = $("chartLegend");
  var chartTitle = $("chartTitle");

  /* ============================================================
     TABLE
     ============================================================ */
  function renderTable() {
    var rows = computeRows(state.peptide, state.size, state.discount);
    var pep = PEPTIDES[state.peptide];

    // best = lowest per-mg (independent of current sort)
    var minPerMg = Math.min.apply(null, rows.map(function (r) { return r.perMg; }));

    // sort
    rows.sort(function (a, b) {
      if (state.sort === "permg") return a.perMg - b.perMg;
      if (state.sort === "price") return a.eff - b.eff;
      if (state.sort === "rating") return b.vendor.rating - a.vendor.rating;
      return 0;
    });

    cmpBody.innerHTML = rows.map(function (r) {
      var isBest = r.perMg === minPerMg;
      var stockLabel = r.stock === "live" ? "Live" : r.stock === "low" ? "Low" : "Out";
      var shopDisabled = r.stock === "out";
      var listCell = state.discount
        ? '<span class="num-mono price-list struck">' + money(r.list) + "</span>"
        : '<span class="num-mono price-list">' + money(r.list) + "</span>";
      var discCell = '<span class="num-mono price-disc' + (state.discount ? " on" : "") + '">' + money(r.eff) + "</span>";

      return '<tr class="cmp-row' + (isBest ? " best" : "") + '">' +
        '<td class="td-vendor">' +
          '<div class="v-cell">' +
            '<span class="v-logo">' + r.vendor.short + "</span>" +
            '<div class="v-meta">' +
              '<span class="v-name">' + r.vendor.name + "</span>" +
              '<span class="v-rating"><span class="stars">' + stars(r.vendor.rating) + "</span>" + r.vendor.rating.toFixed(1) + "</span>" +
              (isBest ? '<span class="best-badge">BEST PRICE</span>' : "") +
            "</div>" +
          "</div>" +
        "</td>" +
        '<td class="p-cell" data-label="Product">' + state.size + "mg / " + pep.form + "</td>" +
        '<td class="num" data-label="List">' + listCell + "</td>" +
        '<td class="num" data-label="PEPTIDEX">' + discCell + "</td>" +
        '<td class="num td-permg" data-label="Per-mg"><span class="permg">' + money(r.perMg) + "<small>/mg</small></span></td>" +
        '<td data-label="Purity">' +
          '<div class="purity"><span class="pv">' + r.purity.toFixed(1) + '%</span>' +
          '<span class="ptrack"><span class="pfill" style="width:' + ((r.purity - 95) / 5 * 100).toFixed(0) + '%"></span></span></div>' +
        "</td>" +
        '<td data-label="Stock"><span class="stock ' + r.stock + '"><span class="dot"></span>' + stockLabel + "</span></td>" +
        '<td class="shop-cell" data-label="">' +
          '<a class="pill-btn pill-lime shop-btn' + (shopDisabled ? " disabled" : "") + '" href="' + r.vendor.url + '" target="_blank" rel="noopener sponsored">' +
            (shopDisabled ? "Sold out" : "Shop") +
          "</a>" +
        "</td>" +
      "</tr>";
    }).join("");
  }

  /* ============================================================
     PRICE CHART (90-day per-mg, 4 vendor lines, SVG)
     ============================================================ */
  // deterministic pseudo-random so a peptide's chart is stable
  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s |= 0; s = (s + 0x6D2B79F5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  function buildSeries() {
    // anchor each vendor at its current effective per-mg, walk backwards 90d
    var rows = computeRows(state.peptide, state.size, state.discount);
    var DAYS = 90;
    var series = {};
    rows.forEach(function (r, idx) {
      var rand = rng(hash(state.peptide + r.vendor.id) + idx);
      var end = r.perMg;
      var pts = new Array(DAYS);
      // generate a gently downward-trending random walk ending at `end`
      var vol = end * 0.018;
      var drift = end * 0.0009;
      var val = end * (1.06 + rand() * 0.06); // started ~6-12% higher 90d ago
      for (var d = 0; d < DAYS; d++) {
        val += (rand() - 0.5) * 2 * vol - drift;
        pts[d] = val;
      }
      // pin the last point to the true current price
      pts[DAYS - 1] = end;
      series[r.vendor.id] = pts;
    });
    return { series: series, days: DAYS };
  }

  function renderChart() {
    var data = buildSeries();
    var series = data.series, DAYS = data.days;
    var W = 312, H = 168, padL = 30, padR = 8, padT = 12, padB = 22;
    var plotW = W - padL - padR, plotH = H - padT - padB;

    // y-domain over VISIBLE lines
    var vals = [];
    VENDORS.forEach(function (v) { if (!state.hidden[v.id]) series[v.id].forEach(function (p) { vals.push(p); }); });
    if (!vals.length) VENDORS.forEach(function (v) { series[v.id].forEach(function (p) { vals.push(p); }); });
    var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
    var pad = (max - min) * 0.18 || 1;
    min -= pad; max += pad;

    function x(i) { return padL + (i / (DAYS - 1)) * plotW; }
    function y(val) { return padT + (1 - (val - min) / (max - min)) * plotH; }

    var svg = '<svg class="price-chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="90-day per-mg price chart">';

    // horizontal grid + y labels (4 ticks)
    for (var t = 0; t <= 3; t++) {
      var yv = min + (max - min) * (t / 3);
      var yy = y(yv);
      svg += '<line class="chart-grid-line" x1="' + padL + '" y1="' + yy.toFixed(1) + '" x2="' + (W - padR) + '" y2="' + yy.toFixed(1) + '"/>';
      svg += '<text class="chart-axis-label" x="' + (padL - 5) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end">$' + yv.toFixed(1) + "</text>";
    }
    // x labels: -90d, -45d, today
    svg += '<text class="chart-axis-label" x="' + padL + '" y="' + (H - 6) + '" text-anchor="start">-90d</text>';
    svg += '<text class="chart-axis-label" x="' + (padL + plotW / 2) + '" y="' + (H - 6) + '" text-anchor="middle">-45d</text>';
    svg += '<text class="chart-axis-label" x="' + (W - padR) + '" y="' + (H - 6) + '" text-anchor="end">today</text>';

    // lines
    VENDORS.forEach(function (v) {
      if (state.hidden[v.id]) return;
      var pts = series[v.id];
      var d = pts.map(function (p, i) { return (i === 0 ? "M" : "L") + x(i).toFixed(1) + " " + y(p).toFixed(1); }).join(" ");
      svg += '<path class="chart-line" d="' + d + '" stroke="' + CHART_COLORS[v.id] + '"/>';
    });

    // annotation: biggest single-day drop among visible cheapest line
    var visible = VENDORS.filter(function (v) { return !state.hidden[v.id]; });
    var target = visible.reduce(function (best, v) {
      return series[v.id][DAYS - 1] < series[best.id][DAYS - 1] ? v : best;
    }, visible[0] || VENDORS[0]);
    if (target) {
      var tp = series[target.id];
      var dropIdx = 1, dropAmt = 0;
      for (var i = 1; i < DAYS; i++) { var diff = tp[i - 1] - tp[i]; if (diff > dropAmt) { dropAmt = diff; dropIdx = i; } }
      var ax = x(dropIdx), ay = y(tp[dropIdx]);
      svg += '<circle class="chart-anno-dot" cx="' + ax.toFixed(1) + '" cy="' + ay.toFixed(1) + '" r="3"/>';
      svg += '<circle cx="' + ax.toFixed(1) + '" cy="' + ay.toFixed(1) + '" r="6" fill="none" stroke="#C4F25C" stroke-width="1" opacity="0.5"/>';
      var lx = Math.min(ax + 5, W - 54);
      svg += '<text class="chart-anno-label" x="' + lx.toFixed(1) + '" y="' + (ay - 7).toFixed(1) + '">\u2193 -' + money(dropAmt).slice(1) + "/mg</text>";
    }

    svg += "</svg>";
    chartBox.innerHTML = svg;

    // legend
    chartLegend.innerHTML = VENDORS.map(function (v) {
      var off = state.hidden[v.id] ? " off" : "";
      return '<button class="legend-item' + off + '" type="button" data-vendor="' + v.id + '">' +
        '<span class="lg-dot" style="background:' + CHART_COLORS[v.id] + ';color:' + CHART_COLORS[v.id] + '"></span>' + v.name +
      "</button>";
    }).join("");
    chartLegend.querySelectorAll(".legend-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-vendor");
        // keep at least one line visible
        var visibleCount = VENDORS.filter(function (v) { return !state.hidden[v.id]; }).length;
        if (!state.hidden[id] && visibleCount <= 1) return;
        state.hidden[id] = !state.hidden[id];
        renderChart();
      });
    });

    chartTitle.textContent = PEPTIDES[state.peptide].name + " " + state.size + "mg \u2014 90-day per-mg price";
  }

  /* ============================================================
     CALCULATOR
     ============================================================ */
  function renderCalc() {
    var dose = parseFloat($("calcDose").value) || 0;
    var weeks = parseFloat($("calcWeeks").value) || 0;
    var totalMg = dose * weeks;
    var vials = totalMg > 0 ? Math.ceil(totalMg / state.size) : 0;

    var rows = computeRows(state.peptide, state.size, state.discount);
    // cheapest & dearest by effective price
    var sorted = rows.slice().sort(function (a, b) { return a.eff - b.eff; });
    var cheap = sorted[0], dear = sorted[sorted.length - 1];

    var cheapTotal = vials * cheap.eff;
    var dearTotal = vials * dear.eff;
    var saveTotal = vials * cheap.savePerVial; // PEPTIDEX savings vs list on cheapest

    $("outTotalMg").textContent = totalMg ? totalMg.toFixed(1).replace(/\.0$/, "") + " mg" : "\u2014";
    $("outVials").textContent = vials ? vials + " \u00d7 " + state.size + "mg" : "\u2014";
    $("outCheapest").textContent = vials ? money(cheapTotal) : "\u2014";
    $("outCheapestVia").textContent = vials ? "via " + cheap.vendor.name + (state.discount ? " (PEPTIDEX)" : "") : "";
    $("outExpensive").textContent = vials ? money(dearTotal) : "\u2014";
    $("outSave").textContent = vials ? money(saveTotal) : "\u2014";

    var shop = $("calcShop");
    shop.href = cheap.vendor.url;
    shop.querySelector(".shop-vendor").textContent = cheap.vendor.name.split(" ")[0];
  }

  /* ============================================================
     QUICK COMPARE RAIL
     ============================================================ */
  function renderQuick() {
    var wrap = $("qcScroll");
    wrap.innerHTML = QUICK.map(function (q) {
      var known = !!PEPTIDES[q.slug];
      var cheap = known ? cheapestPerMg(q.slug) : q.cheap;
      var active = known && q.slug === state.peptide ? " active" : "";
      var tag = known ? "button" : "a";
      var attrs = known
        ? ' type="button" data-peptide="' + q.slug + '"'
        : ' href="/library"';
      return "<" + tag + ' class="qc-card' + active + '"' + attrs + ">" +
        '<span class="qc-name">' + q.name + "</span>" +
        '<span class="qc-cheap">' + money(cheap) + "/mg <span>CHEAPEST</span></span>" +
      "</" + tag + ">";
    }).join("");
    wrap.querySelectorAll(".qc-card[data-peptide]").forEach(function (btn) {
      btn.addEventListener("click", function () { selectPeptide(btn.getAttribute("data-peptide")); });
    });
  }

  /* ============================================================
     AUTOCOMPLETE
     ============================================================ */
  var acIndex = -1;
  function renderAutocomplete(q) {
    var query = (q || "").trim().toLowerCase();
    var matches = Object.keys(PEPTIDES).filter(function (k) {
      return PEPTIDES[k].name.toLowerCase().indexOf(query) !== -1;
    });
    if (!matches.length) {
      autocomplete.innerHTML = '<div class="ac-empty">No tracked peptides match \u201c' + (q || "") + "\u201d</div>";
      autocomplete.classList.add("open");
      return;
    }
    autocomplete.innerHTML = matches.map(function (k, i) {
      return '<button class="ac-item' + (i === acIndex ? " active" : "") + '" type="button" data-key="' + k + '">' +
        "<span>" + PEPTIDES[k].name + "</span>" +
        '<span class="ac-cheap">' + money(cheapestPerMg(k)) + "/mg</span>" +
      "</button>";
    }).join("");
    autocomplete.classList.add("open");
    autocomplete.querySelectorAll(".ac-item").forEach(function (btn) {
      btn.addEventListener("mousedown", function (e) { e.preventDefault(); selectPeptide(btn.getAttribute("data-key")); });
    });
  }
  function closeAutocomplete() { autocomplete.classList.remove("open"); acIndex = -1; }

  /* ============================================================
     SELECTION + WIRING
     ============================================================ */
  function selectPeptide(key) {
    if (!PEPTIDES[key]) return;
    state.peptide = key;
    state.hidden = {};
    searchInput.value = PEPTIDES[key].name;
    $("calcDose").value = PEPTIDES[key].defaultDose;
    closeAutocomplete();
    renderAll();
  }

  function renderAll() {
    renderTable();
    renderChart();
    renderCalc();
    renderQuick();
  }

  function init() {
    // search
    searchInput.value = PEPTIDES[state.peptide].name;
    searchInput.addEventListener("focus", function () { renderAutocomplete(""); });
    searchInput.addEventListener("input", function () { acIndex = -1; renderAutocomplete(searchInput.value); });
    searchInput.addEventListener("blur", function () { setTimeout(closeAutocomplete, 120); });
    searchInput.addEventListener("keydown", function (e) {
      var items = autocomplete.querySelectorAll(".ac-item");
      if (!items.length) return;
      if (e.key === "ArrowDown") { e.preventDefault(); acIndex = Math.min(acIndex + 1, items.length - 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); acIndex = Math.max(acIndex - 1, 0); }
      else if (e.key === "Enter") { e.preventDefault(); var pick = items[acIndex < 0 ? 0 : acIndex]; if (pick) selectPeptide(pick.getAttribute("data-key")); return; }
      else if (e.key === "Escape") { closeAutocomplete(); return; }
      renderAutocomplete(searchInput.value);
    });

    // vial size
    document.querySelectorAll(".size-pill").forEach(function (pill) {
      pill.addEventListener("click", function () {
        document.querySelectorAll(".size-pill").forEach(function (p) { p.classList.remove("active"); });
        pill.classList.add("active");
        state.size = parseInt(pill.getAttribute("data-size"), 10);
        renderAll();
      });
    });

    // discount toggle
    discToggle.addEventListener("click", function () {
      state.discount = !state.discount;
      discToggle.classList.toggle("off", !state.discount);
      renderAll();
    });

    // sort
    sortSelect.addEventListener("change", function () { state.sort = sortSelect.value; renderTable(); });

    // calculator
    $("calcDose").value = PEPTIDES[state.peptide].defaultDose;
    $("calcDose").addEventListener("input", renderCalc);
    $("calcWeeks").addEventListener("input", renderCalc);

    renderAll();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
