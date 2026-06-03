/* =============================================================
   PeptiDex — OG card parameter mapping
   -------------------------------------------------------------
   Single source of truth for what {title, eyebrow, stat} each
   page passes to the dynamic OG route (og/template.html →
   Next.js /api/og). Used two ways:

   1. BUILD TIME — the static export rewrites every page's
      <meta og:image>/<twitter:image> to /api/og?…  using
      OGMap.paramsFor(page) + OGMap.url(params).  (See the
      apply pass that imported this file.)

   2. RUNTIME (deploy) — app/api/og/route.tsx reads the SAME
      three params and renders the card with @vercel/og.

   ── PER-PAGE-TYPE RULES ─────────────────────────────────────
   • peptide  (library/*) : title = <h1.pf-name>,  eyebrow = <.class-tag>,
                            stat = first .aeo-facts bullet (the hard stat).
   • compare  (compare/*) : title = <h1>,  eyebrow = "RESEARCH COMPARISON",
                            stat = first .aeo-facts bullet (head-to-head number).
   • stack    (stacks/*)  : title = <h1>,  eyebrow = "RESEARCH STACK",
                            stat = first .aeo-facts bullet.
   • best     (best/*)    : title = <h1>,  eyebrow = "BEST PEPTIDES",     stat = first .aeo-facts | meta desc.
   • vendor   (vendors/*) : title = <h1>,  eyebrow = "VENDOR REVIEW",     stat = first .aeo-facts | meta desc.
   • tool     (tools/*)   : title = <h1>,  eyebrow = "RESEARCH TOOL",     stat = first .aeo-facts | meta desc.
   • root/hub             : hard-coded in ROOT below (no single content stat to scrape).
   • page (anything else) : title = <h1> | cleaned <title>, eyebrow = "PEPTIDEX", stat = meta desc.
   ============================================================= */
;(function (root) {
  "use strict";

  var BASE = "https://peptidex.app/api/og";
  var SITE = "https://peptidex.app";

  var TYPES = {
    peptide: { eyebrow: null,                 statFallback: "COA-verified research peptide" }, // eyebrow from .class-tag
    compare: { eyebrow: "RESEARCH COMPARISON", statFallback: "Head-to-head, side by side" },
    stack:   { eyebrow: "RESEARCH STACK",      statFallback: "Evidence-based research combination" },
    best:    { eyebrow: "BEST PEPTIDES",       statFallback: "Ranked by published evidence" },
    vendor:  { eyebrow: "VENDOR REVIEW",       statFallback: "COA-verified · HPLC + Mass Spec" },
    tool:    { eyebrow: "RESEARCH TOOL",       statFallback: "Free · no account required" },
    page:    { eyebrow: "PEPTIDEX",            statFallback: "The independent peptide research index" }
  };

  // Hub / root pages: explicit params (no single scrapable stat).
  var ROOT = {
    "index.html":        { title: "The Independent Peptide Research Index", eyebrow: "PEPTIDE INTELLIGENCE", stat: "51 profiles · 668+ studies · 99% COA purity" },
    "library.html":      { title: "Peptide Library",            eyebrow: "THE INDEX",              stat: "51 researched peptides, COA-verified" },
    "stacks.html":       { title: "Research Stacks",            eyebrow: "EVIDENCE-BASED",         stat: "12 stacks with full citation trails" },
    "tools.html":        { title: "Research Tools",             eyebrow: "FREE TOOLKIT",           stat: "8 interactive tools · no account" },
    "vendors.html":      { title: "Verified Vendors",           eyebrow: "COA-VERIFIED SOURCING",  stat: "HPLC + Mass Spec · 99% purity threshold" },
    "coupon-codes.html": { title: "Peptide Coupon Codes",       eyebrow: "DISCOUNTS",              stat: "PEPTIDEX code · up to 20% off" },
    "blog.html":         { title: "The Peptide Brief",          eyebrow: "RESEARCH JOURNAL",       stat: "Bi-weekly research summaries" },
    "faq.html":          { title: "Frequently Asked Questions", eyebrow: "FAQ",                    stat: "Peptide research, answered" },
    "glossary.html":     { title: "Peptide Glossary",           eyebrow: "REFERENCE",              stat: "Key research terms, defined" },
    "coa.html":          { title: "COA Library",                eyebrow: "VERIFICATION",           stat: "Third-party HPLC + Mass Spec" },
    "advisor.html":      { title: "PeptiDex Advisor",           eyebrow: "INTELLIGENCE",           stat: "Grounded in 668+ studies" },
    "quiz.html":         { title: "60-Second Stack Quiz",       eyebrow: "PERSONALIZED",           stat: "5 questions → your custom stack" },
    "intro.html":        { title: "Start Here",                 eyebrow: "ONBOARDING",             stat: "From empty vial to safe practice" },
    "about.html":        { title: "Our Mission",                eyebrow: "ABOUT",                  stat: "Independent · evidence-based · ad-free" },
    "disclaimers.html":  { title: "Medical Disclaimer",         eyebrow: "LEGAL",                  stat: "Research use only" },
    "legal.html":        { title: "Privacy & Terms",            eyebrow: "LEGAL",                  stat: "How we operate" },
    "saved.html":        { title: "Saved Compounds",            eyebrow: "WORKSPACE",              stat: "Your research, saved" },
    "404.html":          { title: "Page Not Found",             eyebrow: "404",                    stat: "Back to the index" },
    "about/editorial-policy.html": { title: "Editorial Policy", eyebrow: "ABOUT", stat: "How we research & cite" },
    "about/methodology.html":      { title: "Methodology",      eyebrow: "ABOUT", stat: "How every claim is verified" }
  };

  function typeForPath(path) {
    if (path.indexOf("library/") === 0) return "peptide";
    if (path.indexOf("compare/") === 0) return "compare";
    if (path.indexOf("stacks/") === 0) return "stack";
    if (path.indexOf("best/") === 0) return "best";
    if (path.indexOf("vendors/") === 0) return "vendor";
    if (path.indexOf("tools/") === 0) return "tool";
    return "page";
  }

  function firstSentence(s) {
    if (!s) return "";
    var m = String(s).split(/(?<=[.!?])\s/)[0] || String(s);
    return m.length > 90 ? m.slice(0, 88).trim() + "…" : m;
  }

  // page = { path, h1, classTag, firstFact, description, ogTitle }
  function paramsFor(page) {
    if (ROOT[page.path]) return ROOT[page.path];
    var type = typeForPath(page.path);
    var cfg = TYPES[type] || TYPES.page;
    var title = (page.h1 || page.ogTitle || "").trim();
    var eyebrow = (type === "peptide" && page.classTag) ? page.classTag.trim() : cfg.eyebrow;
    var stat = (page.firstFact && page.firstFact.trim()) ||
               (page.description ? firstSentence(page.description) : "") ||
               cfg.statFallback;
    return { title: title, eyebrow: eyebrow, stat: stat };
  }

  function url(params) {
    var parts = [];
    if (params.title)   parts.push("title="   + encodeURIComponent(params.title));
    if (params.eyebrow) parts.push("eyebrow=" + encodeURIComponent(params.eyebrow));
    if (params.stat)    parts.push("stat="    + encodeURIComponent(params.stat));
    return BASE + "?" + parts.join("&");
  }

  var OGMap = {
    BASE: BASE, SITE: SITE, TYPES: TYPES, ROOT: ROOT,
    typeForPath: typeForPath, paramsFor: paramsFor, url: url
  };

  root.OGMap = OGMap;
  if (typeof module !== "undefined" && module.exports) module.exports = OGMap;
})(typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : this));
