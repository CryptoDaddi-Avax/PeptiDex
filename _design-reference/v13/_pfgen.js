/* Peptidex profile generator — internal build tool (not shipped).
   PFGEN(templateHtml) -> { build(data) -> fullHtml }
   Reuses the static chrome from library/retatrutide.html and swaps
   head meta/schema, <main>, and the inline <script>. */
globalThis.PFGEN = function (tpl) {
  var iTitle = tpl.indexOf("<title>");
  var iPre = tpl.indexOf('<link rel="preconnect" href="https://fonts.googleapis.com"');
  var iMain = tpl.indexOf("<main>");
  var iMainEnd = tpl.indexOf("</main>") + "</main>".length;
  var iScriptOpen = tpl.indexOf("<script>\n  /* ---------- Sticky tabs");
  var iScriptEnd = tpl.indexOf("</script>", iScriptOpen) + "</script>".length;
  var seg0 = tpl.slice(0, iTitle);
  var seg1 = tpl.slice(iPre, iMain);
  var seg2 = tpl.slice(iMainEnd, iScriptOpen);
  var seg3 = tpl.slice(iScriptEnd);

  var VEND = {
    amino:     { short:"AC", name:"Amino Club",         rating:"4.8", purity:"99.2%", disc:"20%", url:function(s){return "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content="+s+"&code=PEPTIDEX";}, band:function(s){return "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content="+s+"_band&code=PEPTIDEX";} },
    bll:       { short:"BL", name:"Bio Longevity Labs", rating:"4.6", purity:"99.0%", disc:"15%", url:function(){return "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443";}, band:function(){return "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443";} },
    limitless: { short:"LL", name:"Limitless Life",     rating:"4.5", purity:"99.0%", disc:"15%", url:function(){return "https://www.kb6dp3dq.com/PEPTIDEX/";}, band:function(){return "https://www.kb6dp3dq.com/PEPTIDEX/";} },
    pantheon:  { short:"PP", name:"Pantheon Peptides",  rating:"4.4", purity:"98.2%", disc:"15%", url:function(){return "https://pantheonpeptides.com/partner/PeptiDex/";}, band:function(){return "https://pantheonpeptides.com/partner/PeptiDex/";} }
  };
  var ARROW = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CHK = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5l4 4 8-9"/></svg>';

  function mechSVG(center, sub, nodes) {
    var ys = {1:[140],2:[100,180],3:[64,140,216],4:[54,114,174,234]}[nodes.length];
    var s = '<svg viewBox="0 0 640 280" fill="none" aria-hidden="true" role="img" aria-label="'+center+' mechanism diagram">';
    nodes.forEach(function(nd,i){ s += '<line class="mech-arrow" x1="200" y1="140" x2="420" y2="'+ys[i]+'"/>'; });
    nodes.forEach(function(nd,i){ var ny=ys[i]; s += '<path class="mech-arrow" d="M412 '+(ny-4)+'l10 4-10 4"/>'; });
    s += '<circle cx="160" cy="140" r="46" fill="var(--lime)"/>';
    s += '<text class="mech-center-label" x="160" y="'+(sub?136:142)+'" text-anchor="middle">'+center+'</text>';
    if (sub) s += '<text class="mech-center-label" x="160" y="152" text-anchor="middle" style="font-weight:500;font-size:9px;">'+sub+'</text>';
    nodes.forEach(function(nd,i){ var ny=ys[i];
      s += '<circle cx="470" cy="'+ny+'" r="34" fill="var(--teal-2)" stroke="var(--lime)" stroke-width="1"/>';
      s += '<text class="mech-node-label" x="470" y="'+(ny+4)+'" text-anchor="middle">'+nd.label+'</text>';
      var ef=nd.effects, base=ny-(ef.length-1)*6;
      ef.forEach(function(e,j){ s += '<text class="mech-effect" x="516" y="'+(base+j*12)+'" text-anchor="start">'+e+'</text>'; });
    });
    s += '</svg>';
    return s;
  }

  function newHead(d){
    var offers = d.vendors.map(function(v){ var reg=VEND[v.key]; var price=(v.perMg*10).toFixed(2);
      return '      { "@type": "Offer", "name": "'+reg.name+' — 10mg", "price": "'+price+'", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }'; }).join(",\n");
    var lows=d.vendors.map(function(v){return v.perMg*10;}), low=Math.min.apply(null,lows).toFixed(2), high=Math.max.apply(null,lows).toFixed(2);
    return '<title>'+d.name+' — '+d.titleTag+' | Peptidex</title>\n'
      +'<meta name="description" content="'+d.metaDesc+'" />\n'
      +'<link rel="canonical" href="https://peptidex.example/library/'+d.slug+'" />\n\n'
      +'<!-- Open Graph -->\n'
      +'<meta property="og:type" content="article" />\n'
      +'<meta property="og:title" content="'+d.name+' — '+d.titleTag+' | Peptidex" />\n'
      +'<meta property="og:description" content="'+d.ogDesc+'" />\n'
      +'<meta property="og:url" content="https://peptidex.example/library/'+d.slug+'" />\n'
      +'<meta property="og:site_name" content="Peptidex" />\n'
      +'<meta name="twitter:card" content="summary_large_image" />\n'
      +'<meta name="twitter:title" content="'+d.name+' — '+d.titleTag+' | Peptidex" />\n'
      +'<meta name="twitter:description" content="'+d.ogDesc+'" />\n\n'
      +'<!-- Product schema -->\n'
      +'<script type="application/ld+json">\n'
      +'{\n'
      +'  "@context": "https://schema.org",\n'
      +'  "@type": "Product",\n'
      +'  "name": "'+d.schemaName+'",\n'
      +'  "category": "Research Peptide — '+d.category+'",\n'
      +'  "description": "'+d.schemaDesc+'",\n'
      +'  "brand": { "@type": "Brand", "name": "'+d.brand+'" },\n'
      +'  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "'+d.rating+'", "reviewCount": "'+d.reviews+'", "bestRating": "5" },\n'
      +'  "offers": {\n'
      +'    "@type": "AggregateOffer",\n'
      +'    "priceCurrency": "USD",\n'
      +'    "lowPrice": "'+low+'",\n'
      +'    "highPrice": "'+high+'",\n'
      +'    "offerCount": "'+d.vendors.length+'",\n'
      +'    "offers": [\n'+offers+'\n    ]\n'
      +'  },\n'
      +'  "review": {\n'
      +'    "@type": "Review",\n'
      +'    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },\n'
      +'    "author": { "@type": "Organization", "name": "Peptidex Editorial" },\n'
      +'    "reviewBody": "'+d.reviewBody+'"\n'
      +'  }\n'
      +'}\n'
      +'</'+'script>\n\n';
  }

  function newMain(d){
    var best = d.vendors[0];
    var metrics = d.metrics.map(function(m){return '        <div class="pf-metric"><span class="m-label">'+m[0]+'</span><span class="m-val">'+m[1]+'</span></div>';}).join("\n");
    var why = d.why.map(function(w){return '            <li>'+CHK+'<span>'+w+'</span></li>';}).join("\n");
    var facts = d.facts.map(function(f){return '            <div class="pf-fact"><span class="f-label">'+f[0]+'</span><span class="f-val">'+f[1]+'</span></div>';}).join("\n");
    var seMax = Math.max.apply(null, d.sideEffects.map(function(s){return s.pct;}));
    var sideRows = d.sideEffects.map(function(s){return '          <div class="se-row"><span class="se-name">'+s.name+(s.note?' <small>('+s.note+')</small>':'')+'</span><span class="se-bar"><span style="width:'+Math.round(s.pct/seMax*100)+'%"></span></span><span class="se-pct">'+s.pct+'%</span></div>';}).join("\n");
    var excl = d.exclusions.map(function(e){return '            <li>'+e+'</li>';}).join("\n");
    var stackPills = d.stacks.map(function(s){return '              <a class="pf-stack-pill" href="/stacks">'+s+' '+ARROW+'</a>';}).join("\n");
    var vwRows = d.vendors.map(function(v,i){ var reg=VEND[v.key];
      return '            <a class="vw-row" href="'+reg.url(d.slug)+'" target="_blank" rel="noopener noreferrer sponsored">\n'
        +'              <span class="vw-rank">'+(i+1)+'</span>\n'
        +'              <span class="vw-info"><span class="vw-name">'+reg.name+'</span><span class="vw-line"><span class="code">PEPTIDEX '+reg.disc+'</span></span></span>\n'
        +'              <span class="vw-permg">$'+v.perMg.toFixed(2)+'<small>/mg</small></span>\n'
        +'            </a>'; }).join("\n");
    var bandCards = d.vendors.map(function(v){ var reg=VEND[v.key];
      return '        <div class="pf-vendor-card">\n'
        +'          <div class="pf-vc-top"><span class="pf-vc-logo">'+reg.short+'</span><div><div class="pf-vc-name">'+reg.name+'</div><div class="pf-vc-rating"><span class="stars">★★★★★</span> '+reg.rating+'</div></div></div>\n'
        +'          <div class="pf-vc-meta"><span>'+reg.purity+' purity</span><span class="code">PEPTIDEX '+reg.disc+'</span></div>\n'
        +'          <span class="magnetic"><a class="btn-inner pill-btn pill-lime" href="'+reg.band(d.slug)+'" target="_blank" rel="noopener noreferrer sponsored">Shop →</a></span>\n'
        +'        </div>'; }).join("\n");
    var related = d.related.map(function(r){return '          <a class="pf-rel-card glass-light" href="/library/'+r[2]+'"><span class="pf-rel-class">'+r[0]+'</span><span class="pf-rel-name">'+r[1]+'</span><span class="pf-rel-arrow">'+ARROW+'</span></a>';}).join("\n");
    var effects = d.effects.map(function(e){return '        <div class="pf-effect-card glass-light">\n          <h4>'+e[0]+'</h4>\n          <p>'+e[1]+'</p>\n        </div>';}).join("\n");
    var doseRows = d.doseTable.map(function(r){return '            <tr><td class="d-week">'+r[0]+'</td><td class="d-dose">'+r[1]+'</td><td class="d-phase">'+r[2]+'</td></tr>';}).join("\n");
    var studies = d.studies.map(function(st){return '        <article class="pf-study-card glass-light" data-cat="'+st[5]+'">\n'
      +'          <span class="study-journal">'+st[0]+'</span>\n'
      +'          <h3 class="study-title">'+st[1]+'</h3>\n'
      +'          <p class="study-finding">'+st[2]+'</p>\n'
      +'          <div class="study-foot"><span class="study-cohort">'+st[3]+'</span><a class="study-link" href="'+st[4]+'" target="_blank" rel="noopener">Read summary '+ARROW+'</a></div>\n'
      +'        </article>';}).join("\n\n");
    var sources = d.sources.map(function(s){return '        <li><span>'+s+'</span></li>';}).join("\n");
    var fdaCard = d.fda ? ('\n          <div class="pf-disclaimer glass-light" style="margin:0 0 24px;">\n            <span class="pfd-ico" aria-hidden="true">⚠</span>\n            <p><strong>Note:</strong> '+d.fda+'</p>\n          </div>\n') : "";
    var overviewParas = d.overview.map(function(p){return '          <p class="pf-p">'+p+'</p>';}).join("\n");
    var mechParas = d.mech.map(function(p){return '      <p class="pf-p">'+p+'</p>';}).join("\n");

    return '<main>\n'
+'  <div class="pf-wrap">\n'
+'    <!-- META BAR -->\n'
+'    <div class="pf-meta">\n'
+'      <p class="pf-crumb">\n'
+'        <a href="/library">Library</a><span class="sep">/</span><a href="/library">'+d.crumbClass+'</a><span class="sep">/</span><span>'+d.name+'</span>\n'
+'      </p>\n'
+'      <div class="pf-meta-actions">\n'
+'        <button class="pf-icon-btn" id="shareBtn" type="button" aria-label="Share">\n'
+'          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M11 5a2 2 0 1 0-1.9-1.4L6 5.4a2 2 0 1 0 0 5.2l3.1 1.8A2 2 0 1 0 11 11l-3.1-1.8a2 2 0 0 0 0-1.4L11 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>\n'
+'        </button>\n'
+'        <button class="pf-icon-btn" id="saveBtn" type="button" aria-label="Save" aria-pressed="false">\n'
+'          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 3h8v11l-4-2.6L4 14V3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\n'
+'        </button>\n'
+'      </div>\n'
+'    </div>\n\n'
+'    <!-- HEADER CARD -->\n'
+'    <header class="pf-header glass-light fade-up">\n'
+'      <span class="class-tag">'+d.classTag+'</span>\n'
+'      <h1 class="pf-name">'+d.name+'</h1>\n'
+'      <p class="pf-subtitle">'+d.subtitle+'</p>\n'
+'      <p class="pf-hero-desc">'+d.hero+'</p>\n\n'
+'      <div class="pf-metrics">\n'+metrics+'\n      </div>\n\n'
+'      <div class="pf-cta-row">\n'
+'        <span class="magnetic"><a class="btn-inner pill-btn pill-lime" href="/tools/pricing">Shop best price ($'+best.perMg.toFixed(2)+'/mg)\n          '+ARROW+'</a></span>\n'
+'        <button class="pill-btn pill-outline" type="button">Add to stack</button>\n'
+'        <button class="pill-btn pill-outline" type="button">Compare with another peptide</button>\n'
+'      </div>\n'
+'    </header>\n\n'
+'    <!-- ABOVE-FOLD RESEARCH DISCLAIMER -->\n'
+'    <div class="pf-disclaimer glass-light">\n'
+'      <span class="pfd-ico" aria-hidden="true">⚠</span>\n'
+'      <p><strong>Research chemical reference.</strong> '+d.name+' is not FDA-approved for human use. All data shown describes published research, not personal use guidance.</p>\n'
+'    </div>\n'
+'    <div class="pf-tabs-wrap">\n'
+'      <div class="pf-tabs" id="pfTabs">\n'
+'        <a class="pf-tab active" href="#overview" data-tab="overview">Overview</a>\n'
+'        <a class="pf-tab" href="#mechanism" data-tab="mechanism">Mechanism</a>\n'
+'        <a class="pf-tab" href="#dosing" data-tab="dosing">Dosing</a>\n'
+'        <a class="pf-tab" href="#studies" data-tab="studies">Studies</a>\n'
+'        <a class="pf-tab" href="#sideeffects" data-tab="sideeffects">Side Effects</a>\n'
+'        <a class="pf-tab" href="#sources" data-tab="sources">Sources</a>\n'
+'      </div>\n'
+'    </div>\n\n'
+'    <!-- ===== OVERVIEW ===== -->\n'
+'    <section class="pf-section" id="overview" data-section>\n'
+'      <div class="pf-overview">\n'
+'        <div class="pf-main">\n'
+'          <h2 class="pf-h2">What it <span class="em">does</span></h2>\n'+overviewParas+'\n'+fdaCard+'\n'
+'          <h3 class="pf-h3">Why researchers study it</h3>\n'
+'          <ul class="pf-check-list">\n'+why+'\n          </ul>\n\n'
+'          <h3 class="pf-h3">Quick facts</h3>\n'
+'          <div class="pf-facts">\n'+facts+'\n          </div>\n'
+'        </div>\n\n'
+'        <aside class="pf-side">\n'
+'          <div class="pf-side-card glass">\n'
+'            <h3 class="pf-side-title">Best price</h3>\n'
+'            <p class="pf-side-sub">per-mg, ranked · code PEPTIDEX</p>\n'+vwRows+'\n'
+'            <p class="vw-verified">Last verified: 2 days ago</p>\n'
+'          </div>\n\n'
+'          <div class="pf-side-card glass-light light">\n'
+'            <h3 class="pf-side-title">Pairs well with</h3>\n'
+'            <p class="pf-side-sub">common stacks</p>\n'
+'            <div class="pf-stack-pills">\n'+stackPills+'\n            </div>\n'
+'          </div>\n'
+'        </aside>\n'
+'      </div>\n'
+'    </section>\n\n'
+'    <!-- ===== MECHANISM ===== -->\n'
+'    <section class="pf-section" id="mechanism" data-section>\n'
+'      <h2 class="pf-h2">Mechanism</h2>\n'+mechParas+'\n\n'
+'      <div class="pf-mech-diagram glass">\n        '+mechSVG(d.mechCenter,d.mechSub,d.mechNodes)+'\n      </div>\n\n'
+'      <div class="pf-effects">\n'+effects+'\n      </div>\n'
+'    </section>\n\n'
+'    <!-- ===== DOSING ===== -->\n'
+'    <section class="pf-section" id="dosing" data-section>\n'
+'      <h2 class="pf-h2">Documented dosing in <span class="em">published trials</span></h2>\n'
+'      <div class="pf-dose-table glass-light">\n'
+'        <table>\n'
+'          <thead><tr><th>Period</th><th>Dose</th><th>Phase</th></tr></thead>\n'
+'          <tbody>\n'+doseRows+'\n          </tbody>\n'
+'        </table>\n'
+'      </div>\n\n'
+'      <div class="pf-dose-grid">\n'
+'        <div class="pf-pk-card glass">\n'
+'          <p class="pk-title">Plasma concentration — '+d.pk.title+'</p>\n'
+'          <p class="pk-sub">'+d.pk.sub+'</p>\n'
+'          <div id="pkChart"></div>\n'
+'        </div>\n\n'
+'        <div class="pf-calc glass">\n'
+'          <p class="pk-title">Reconstitution calculator</p>\n'
+'          <p class="pk-sub">methodology reference</p>\n'
+'          <div class="pf-calc-fields">\n'
+'            <div class="pf-calc-field"><label for="pfVial">Vial (mg)</label><input type="number" id="pfVial" min="0" step="1" value="10" /></div>\n'
+'            <div class="pf-calc-field"><label for="pfBac">BAC water (mL)</label><input type="number" id="pfBac" min="0" step="0.5" value="2" /></div>\n'
+'          </div>\n'
+'          <div class="pf-calc-out">\n'
+'            <div class="pf-calc-row hero"><span class="ck">Concentration</span><span class="cv" id="pfConc">5 mg/mL</span></div>\n'
+'            <div class="pf-calc-row"><span class="ck">Per 10 units</span><span class="cv" id="pf10">0.5 mg</span></div>\n'
+'            <div class="pf-calc-row"><span class="ck">Per 20 units</span><span class="cv" id="pf20">1.0 mg</span></div>\n'
+'            <div class="pf-calc-row"><span class="ck">Doses per vial <small>@'+d.pk.doseMg+'mg</small></span><span class="cv" id="pfDoses">—</span></div>\n'
+'          </div>\n'
+'          <a class="pf-calc-link" href="/tools">Open full Reconstitution Calculator\n            '+ARROW+'\n          </a>\n'
+'        </div>\n'
+'      </div>\n'
+'    </section>\n\n'
+'    <!-- ===== STUDIES ===== -->\n'
+'    <section class="pf-section" id="studies" data-section>\n'
+'      <h2 class="pf-h2">Published <span class="em">findings</span></h2>\n'
+'      <div class="pf-filter" id="studyFilter">\n'
+'        <button class="filter-pill active" type="button" data-filter="all">All</button>\n'
+'        <button class="filter-pill" type="button" data-filter="phase1">Phase 1</button>\n'
+'        <button class="filter-pill" type="button" data-filter="phase2">Phase 2</button>\n'
+'        <button class="filter-pill" type="button" data-filter="phase3">Phase 3</button>\n'
+'        <button class="filter-pill" type="button" data-filter="mechanism">Mechanism</button>\n'
+'        <button class="filter-pill" type="button" data-filter="safety">Safety</button>\n'
+'      </div>\n\n'
+'      <div class="pf-study-grid" id="studyGrid">\n'+studies+'\n      </div>\n'
+'      <a class="pf-viewall" href="/library">View all '+d.studiesCount+' studies\n        '+ARROW+'\n      </a>\n'
+'    </section>\n\n'
+'    <!-- ===== SIDE EFFECTS ===== -->\n'
+'    <section class="pf-section" id="sideeffects" data-section>\n'
+'      <h2 class="pf-h2">Adverse events reported in trials</h2>\n'
+'      <div class="pf-se-grid">\n'
+'        <div class="pf-se-table glass-light">\n'+sideRows+'\n        </div>\n\n'
+'        <div class="pf-cautions glass-light">\n'
+'          <h4>⚠ Trial exclusion criteria</h4>\n'
+'          <ul>\n'+excl+'\n          </ul>\n'
+'          <p class="caution-foot">Trial exclusion criteria, reported in the published literature. Consult licensed medical professionals before any research use.</p>\n'
+'        </div>\n'
+'      </div>\n'
+'    </section>\n\n'
+'    <!-- ===== SOURCES ===== -->\n'
+'    <section class="pf-section" id="sources" data-section>\n'
+'      <h2 class="pf-h2">Sources &amp; citations</h2>\n'
+'      <ol class="pf-sources">\n'+sources+'\n      </ol>\n'
+'    </section>\n\n'
+'    <!-- ===== BOTTOM CTA BAND ===== -->\n'
+'    <section class="pf-cta-band glass">\n'
+'      <h2>Ready to source <span style="color:var(--lime);">'+d.name+'</span>?</h2>\n'
+'      <div class="pf-vendor-cards">\n'+bandCards+'\n      </div>\n\n'
+'      <div class="pf-related">\n'
+'        <h2 class="pf-h2" style="margin-bottom:18px;">Similar <span class="em">mechanisms</span></h2>\n'
+'        <div class="pf-rel-grid">\n'+related+'\n        </div>\n'
+'      </div>\n'
+'    </section>\n\n'
+'    <div class="pf-tail"></div>\n'
+'  </div>\n'
+'</main>';
  }

  function newScript(d){
    return '<script>\n'
+'  /* sticky tabs scroll-spy */\n'
+'  (function () {\n'
+'    var tabs = document.querySelectorAll(".pf-tab");\n'
+'    var sections = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));\n'
+'    var map = {}; tabs.forEach(function (t) { map[t.getAttribute("data-tab")] = t; });\n'
+'    var current = "overview";\n'
+'    function setActive(id){ if(id===current||!map[id])return; current=id; tabs.forEach(function(t){t.classList.toggle("active",t.getAttribute("data-tab")===id);}); }\n'
+'    if ("IntersectionObserver" in window) {\n'
+'      var vis = {};\n'
+'      var obs = new IntersectionObserver(function (entries) {\n'
+'        entries.forEach(function (e) { vis[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });\n'
+'        var best = current, bestR = -1;\n'
+'        Object.keys(vis).forEach(function (k) { if (vis[k] > bestR) { bestR = vis[k]; best = k; } });\n'
+'        if (bestR > 0) setActive(best);\n'
+'      }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] });\n'
+'      sections.forEach(function (s) { obs.observe(s); });\n'
+'    }\n'
+'  })();\n\n'
+'  /* PK plasma curve */\n'
+'  (function () {\n'
+'    var box = document.getElementById("pkChart"); if (!box) return;\n'
+'    var W=360,H=168,padL=30,padR=8,padT=10,padB=22, plotW=W-padL-padR, plotH=H-padT-padB;\n'
+'    var HL='+d.pk.hl+', SPAN='+d.pk.span+', INT='+d.pk.int+';\n'
+'    var k=Math.LN2/HL, doses=[0];\n'
+'    if (INT>0){ for(var t=INT;t<=SPAN-0.001;t+=INT) doses.push(t); }\n'
+'    var N=120, pts=[], maxC=0;\n'
+'    for(var i=0;i<=N;i++){ var tt=SPAN*i/N, c=0; for(var di=0;di<doses.length;di++){ if(tt>=doses[di]) c+=Math.exp(-k*(tt-doses[di])); } pts.push([tt,c]); if(c>maxC)maxC=c; }\n'
+'    var yMax=maxC*1.12||1, useDays=SPAN>=48;\n'
+'    function x(t){return padL+(t/SPAN)*plotW;} function y(c){return padT+(1-c/yMax)*plotH;}\n'
+'    function lab(t){return useDays?("d"+Math.round(t/24)):(Math.round(t)+"h");}\n'
+'    var svg=\'<svg viewBox="0 0 \'+W+\' \'+H+\'" role="img" aria-label="Plasma concentration">\';\n'
+'    for(var g=0;g<=3;g++){ var yy=padT+(g/3)*plotH; svg+=\'<line class="pk-grid-line" x1="\'+padL+\'" y1="\'+yy.toFixed(1)+\'" x2="\'+(W-padR)+\'" y2="\'+yy.toFixed(1)+\'"/>\'; }\n'
+'    if(doses.length<=6){ doses.forEach(function(dd){ svg+=\'<line class="pk-dose-mark" x1="\'+x(dd).toFixed(1)+\'" y1="\'+padT+\'" x2="\'+x(dd).toFixed(1)+\'" y2="\'+(H-padB)+\'"/>\'; svg+=\'<text class="pk-axis" x="\'+x(dd).toFixed(1)+\'" y="\'+(padT+8)+\'" text-anchor="middle">dose</text>\'; }); }\n'
+'    [0,SPAN/2,SPAN].forEach(function(dx,idx){ svg+=\'<text class="pk-axis" x="\'+x(dx).toFixed(1)+\'" y="\'+(H-6)+\'" text-anchor="\'+(idx===0?"start":idx===2?"end":"middle")+\'">\'+lab(dx)+\'</text>\'; });\n'
+'    var line=pts.map(function(p,i){return (i===0?"M":"L")+x(p[0]).toFixed(1)+" "+y(p[1]).toFixed(1);}).join(" ");\n'
+'    var area=line+" L"+x(SPAN).toFixed(1)+" "+(H-padB)+" L"+x(0).toFixed(1)+" "+(H-padB)+" Z";\n'
+'    svg+=\'<path class="pk-area" d="\'+area+\'"/>\'; svg+=\'<path class="pk-line" d="\'+line+\'"/>\'; svg+="</svg>";\n'
+'    box.innerHTML=svg;\n'
+'  })();\n\n'
+'  /* reconstitution calculator */\n'
+'  (function () {\n'
+'    var vial=document.getElementById("pfVial"), bac=document.getElementById("pfBac");\n'
+'    function fmtMg(n){return (Math.round(n*100)/100).toFixed(n<1?2:1)+" mg";}\n'
+'    function fmtConc(n){var v=Math.round(n*100)/100; return (Number.isInteger(v)?v:v.toFixed(2).replace(/0$/,""))+" mg/mL";}\n'
+'    function recompute(){ var mg=parseFloat(vial.value)||0, ml=parseFloat(bac.value)||0, conc=ml>0?mg/ml:0;\n'
+'      document.getElementById("pfConc").textContent = ml>0?fmtConc(conc):"—";\n'
+'      document.getElementById("pf10").textContent = ml>0?fmtMg(conc*0.1):"—";\n'
+'      document.getElementById("pf20").textContent = ml>0?fmtMg(conc*0.2):"—";\n'
+'      document.getElementById("pfDoses").textContent = mg>0?Math.floor(mg/'+d.pk.doseMg+'):"—";\n'
+'    }\n'
+'    vial.addEventListener("input",recompute); bac.addEventListener("input",recompute); recompute();\n'
+'  })();\n\n'
+'  /* study filter */\n'
+'  (function () {\n'
+'    var pills=document.querySelectorAll("#studyFilter .filter-pill"), cards=document.querySelectorAll("#studyGrid .pf-study-card");\n'
+'    pills.forEach(function(p){ p.addEventListener("click",function(){ pills.forEach(function(x){x.classList.remove("active");}); p.classList.add("active"); var f=p.getAttribute("data-filter"); cards.forEach(function(c){ var cats=c.getAttribute("data-cat")||""; c.classList.toggle("hide", f!=="all"&&cats.indexOf(f)===-1); }); }); });\n'
+'  })();\n\n'
+'  /* save + share */\n'
+'  (function () {\n'
+'    var save=document.getElementById("saveBtn");\n'
+'    if(save) save.addEventListener("click",function(){ var on=save.getAttribute("aria-pressed")==="true"; save.setAttribute("aria-pressed",on?"false":"true"); save.querySelector("path").setAttribute("fill",on?"none":"var(--lime)"); save.style.borderColor=on?"":"var(--lime)"; save.style.color=on?"":"var(--lime)"; });\n'
+'    var share=document.getElementById("shareBtn");\n'
+'    if(share) share.addEventListener("click",function(){ var url=window.location.href; if(navigator.share) navigator.share({title:"'+d.name+' — Peptidex",url:url}).catch(function(){}); else if(navigator.clipboard) navigator.clipboard.writeText(url).catch(function(){}); });\n'
+'  })();\n'
+'</'+'script>';
  }

  return { build: function(d){ return seg0 + newHead(d) + seg1 + newMain(d) + seg2 + newScript(d) + seg3; } };
};
