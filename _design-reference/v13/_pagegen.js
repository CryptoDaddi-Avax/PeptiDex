/* Shared chrome builder for promoted/new PeptiDex pages.
   CHROME.head(o) + CHROME.tail(o), o.p = "" (root) or "../" (subdir).
   o.title,o.desc,o.keywords,o.canon (full url path after domain),
   o.ogimg (slug or "og-default"), o.active ("Library"|"Stacks"|"Tools"|"Vendors"|"") */
globalThis.CHROME = (function(){
  function nav(p, active){
    function a(href,label){ return '<a href="/'+href.replace(/\.html$/,"")+'"'+(active===label?' class="active"':'')+'>'+label+'</a>'; }
    return `<header class="site-nav" id="siteNav">
  <div class="nav-inner">
    <a class="nav-logo" href="/" aria-label="Peptidex home">
      <svg class="nav-mark" viewBox="0 0 70 28" fill="none" aria-hidden="true">
        <line class="nm-bond" x1="10" y1="19" x2="27" y2="9" /><line class="nm-bond" x1="27" y1="9" x2="44" y2="19" /><line class="nm-bond" x1="44" y1="19" x2="60" y2="9" />
        <circle class="nm-node lime" cx="10" cy="19" r="5" /><circle class="nm-node paper" cx="27" cy="9" r="5" /><circle class="nm-node paper" cx="44" cy="19" r="5" /><circle class="nm-node lime" cx="60" cy="9" r="5" />
      </svg>
      <span class="nav-wordmark">Peptidex</span>
    </a>
    <nav class="nav-links" aria-label="Primary">
      ${a("library.html","Library")}
      ${a("stacks.html","Stacks")}
      ${a("tools.html","Tools")}
      ${a("vendors.html","Vendors")}
      <a href="/coupon-codes">Coupons</a>
      <a href="/blog">Blog</a>
      <span class="nav-indicator" aria-hidden="true"></span>
    </nav>
    <div class="nav-actions">
      <button class="nav-search" type="button" aria-label="Search">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.4"/><path d="M10.5 10.5 14 14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        <span class="label-text">Search</span><span class="kbd">⌘K</span>
      </button>
      <span class="magnetic"><a class="btn-inner pill-btn pill-lime" href="/intro">Start
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a></span>
      <button class="nav-burger" id="navBurger" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="nav-mobile">
    ${a("library.html","Library")}${a("stacks.html","Stacks")}${a("tools.html","Tools")}${a("vendors.html","Vendors")}<a href="/coupon-codes">Coupons</a><a href="/blog">Blog</a>
    <span class="nav-mobile-cta"><a class="btn-inner pill-btn pill-lime" href="/intro">Start
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></a></span>
  </div>
</header>`;
  }

  function head(o){
    var p=o.p, img="https://peptidex.app/og/"+(o.ogimg||"og-default")+".png", url="https://peptidex.app/"+o.canon;
    var ld = o.jsonld ? ('<script type="application/ld+json">\n'+o.jsonld+'\n</'+'script>\n') : "";
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>${o.title}</title>
<meta name="description" content="${o.desc}" />
<meta name="keywords" content="${o.keywords}" />
<meta name="author" content="PeptiDex" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="${url}" />
<link rel="alternate" type="application/llms-full+txt" href="https://peptidex.app/llms-full.txt" title="PeptiDex full content index for LLMs" />
<!-- Open Graph -->
<meta property="og:type" content="${o.ogtype||'website'}" />
<meta property="og:site_name" content="PeptiDex" />
<meta property="og:title" content="${o.title}" />
<meta property="og:description" content="${o.desc}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${img}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@peptidex" />
<meta name="twitter:title" content="${o.title}" />
<meta name="twitter:description" content="${o.desc}" />
<meta name="twitter:image" content="${img}" />
${ld}<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${p}base.css" />
<link rel="stylesheet" href="${p}motion.css" />
<link rel="stylesheet" href="${p}nav.css" />
<link rel="stylesheet" href="${p}loader.css" />
<link rel="stylesheet" href="${p}interaction.css" />
<link rel="stylesheet" href="${p}sections.css" />
<link rel="stylesheet" href="${p}interior.css" />
<link rel="stylesheet" href="${p}aeo.css" />
<link rel="stylesheet" href="${p}content.css" />
<link rel="stylesheet" href="${p}legal.css" />
</head>
<body>

<div class="scroll-progress" aria-hidden="true"></div>
<div class="cursor-dot" aria-hidden="true"></div>
<div class="cursor-ring" aria-hidden="true"><span class="cursor-label">explore</span></div>

<div class="disclaimer-bar" role="note">
  <span class="warn">⚠ Research Use Only</span>
  <span class="dim verbose">— Not FDA-approved for human use. Not medical advice.</span>
  <a href="/disclaimers">Full disclaimers →</a>
</div>

<div class="loader" id="loader" role="status" aria-label="Loading Peptidex">
  <div class="loader-stage">
    <svg class="loader-mark" viewBox="0 0 200 82" fill="none" aria-hidden="true">
      <line class="lm-bond" x1="26" y1="54" x2="74" y2="28" /><line class="lm-bond" x1="74" y1="28" x2="122" y2="54" /><line class="lm-bond" x1="122" y1="54" x2="170" y2="28" />
      <circle class="lm-node lime" cx="26" cy="54" r="13" /><circle class="lm-node paper" cx="74" cy="28" r="13" /><circle class="lm-node paper" cx="122" cy="54" r="13" /><circle class="lm-node lime" cx="170" cy="28" r="13" />
    </svg>
    <div class="loader-wordmark">Peptidex</div>
    <div class="loader-progress"><div class="loader-bar"></div></div>
    <div class="loader-caption" id="loaderCaption">indexing compounds…</div>
  </div>
</div>

${nav(p, o.active||"")}

`;
  }

  function tail(o){
    var p=o.p;
    return `
<div class="legal-band">
  <p>PeptiDex is an independent research reference. We are not a pharmacy, clinic, or medical provider. We do not sell, ship, or handle controlled substances. We provide educational reference material for researchers studying peptide pharmacology. All efficacy claims attributed to published peer-reviewed sources.</p>
</div>

<footer class="site-footer">
  <p class="affiliate-disclosure"><strong>Affiliate Disclosure:</strong> Some links earn PeptiDex a small commission at no extra cost to you. This keeps the site free and ad-free. We only feature products we've independently verified.</p>
  <div class="footer-inner">
    <p class="footer-tagline">The independent, evidence-based peptide research index.</p>
    <div class="footer-cols">
      <div class="footer-col"><h4>§ Learn</h4><ul>
        <li><a href="/intro">Peptide 101</a></li><li><a href="/library">Library</a></li><li><a href="/tools/evidence">Evidence Dashboard</a></li><li><a href="/blog">Blog</a></li><li><a href="/faq">FAQ</a></li></ul></div>
      <div class="footer-col"><h4>§ Tools</h4><ul>
        <li><a href="/tools/cycle-planner">Cycle Planner</a></li><li><a href="/tools/pricing">Pricing</a></li><li><a href="/advisor">Advisor</a></li><li><a href="/coa">COA Library</a></li><li><a href="/saved">Saved</a></li></ul></div>
      <div class="footer-col"><h4>§ Source</h4><ul>
        <li><a href="/vendors">Vendor Reviews</a></li><li><a href="/coupon-codes">Coupon Codes</a></li><li><a href="/coa">COA Library</a></li><li><a href="/stacks">Stacks</a></li></ul></div>
      <div class="footer-col"><h4>§ About</h4><ul>
        <li><a href="/about">Our Mission</a></li><li><a href="/about/editorial-policy">Editorial Policy</a></li><li><a href="/disclaimers">Medical Disclaimer</a></li><li><a href="/legal">Privacy &amp; Terms</a></li></ul></div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">© 2026 PeptiDex</span>
      <span class="footer-legal"><a href="/legal">Privacy</a><a href="/legal">Terms</a><a href="/disclaimers">Disclosures</a></span>
    </div>
  </div>
</footer>

<div class="rou-banner glass-light" id="rouBanner" role="dialog" aria-label="Research use only notice">
  <span class="rou-ico" aria-hidden="true">⚠</span>
  <p class="rou-body"><strong>RESEARCH USE ONLY.</strong> This site provides educational information about research chemicals not approved for human use. Nothing here is medical advice, a prescription, or a recommendation for self-administration. By continuing, you acknowledge you are a researcher accessing reference material.</p>
  <span class="rou-actions">
    <a class="rou-read" href="/disclaimers">Read full disclaimers</a>
    <button class="pill-btn pill-lime" id="rouAck" type="button">Acknowledge &amp; continue</button>
  </span>
  <button class="rou-close" id="rouClose" type="button" aria-label="Dismiss"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></button>
</div>

<script src="${p}loader.js"></script>
<script src="${p}raf.js"></script>
<script src="${p}motion.js"></script>
<script src="${p}hero.js"></script>
<script src="${p}nav.js"></script>
<script src="${p}interaction.js"></script>
<script src="${p}legal.js"></script>
${o.extraJs||""}
</body>
</html>`;
  }

  return { head: head, tail: tail };
})();
