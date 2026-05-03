/**
 * restyle-remaining.js
 * Applies editorial design system wrapper to remaining stale pages.
 * Strategy A: Static pages → full page-header + about-content wrapper
 * Strategy B: Client tool pages → slim breadcrumb bar only (preserve inner tool UI)
 */
const fs = require('fs');

// ─────────── Helper ───────────
function read(p) { return fs.readFileSync(p, 'utf8'); }
function write(p, c) { fs.writeFileSync(p, c, 'utf8'); console.log('✓', p); }

// Ensure Link is imported
function ensureLinkImport(c) {
  if (!c.includes("from 'next/link'") && !c.includes('from "next/link"')) {
    // Add after first import line
    c = c.replace(/^(import .+;\n)/, `$1import Link from 'next/link';\n`);
  }
  return c;
}

// ─────────── STRATEGY A: Full editorial page-header wrap ───────────
// Used for static/server content pages
function strategyA(filePath, { title, subtitle, eyebrow, breadcrumbs, containerPattern }) {
  let c = read(filePath);
  c = ensureLinkImport(c);

  // Build breadcrumb JSX
  const bcLinks = breadcrumbs.map((b, i) => {
    if (i === breadcrumbs.length - 1) {
      return `            <span className="current">${b.name}</span>`;
    }
    return `            <Link href="${b.url}">${b.name}</Link>\n            <span className="sep">/</span>`;
  }).join('\n');

  // Split title for italic treatment
  let h1First = title, h1Em = '';
  if (title.includes(':')) {
    const [a, ...b] = title.split(':');
    h1First = a + ':'; h1Em = b.join(':').trim();
  } else if (title.includes(' — ') || title.includes(' - ')) {
    const sep = title.includes(' — ') ? ' — ' : ' - ';
    const [a, ...b] = title.split(sep);
    h1First = a + sep.trimEnd(); h1Em = b.join(sep).trim();
  } else {
    const words = title.split(' ');
    if (words.length > 3) {
      h1First = words.slice(0, Math.ceil(words.length / 2)).join(' ');
      h1Em = words.slice(Math.ceil(words.length / 2)).join(' ');
    }
  }

  const pageHeader = `<main id="main-content">
      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
${bcLinks}
          </nav>
          <div className="section-label">§ ${eyebrow}</div>
          <h1 className="page-title">
            ${h1First}${h1Em ? `<br /><em>${h1Em}</em>` : ''}.
          </h1>
          ${subtitle ? `<p className="page-subtitle">${subtitle}</p>` : ''}
        </div>
      </header>

      <div className="about-content reveal space-y-16">
`;

  // Find and replace the outer container
  const patterns = [
    containerPattern,
    /<div className="max-w-4xl mx-auto px-4 py-8 md:py-12[^"]*">/,
    /<div className="max-w-4xl mx-auto px-4 py-8[^"]*">/,
    /<div className="max-w-3xl mx-auto px-4 py-6[^"]*">/,
    /<div className="max-w-3xl mx-auto px-4 py-8[^"]*">/,
    /<div className="max-w-4xl mx-auto[^"]*">/,
    /<div className="max-w-5xl mx-auto[^"]*">/,
    /<div className="max-w-6xl mx-auto[^"]*">/,
  ].filter(Boolean);

  let replaced = false;
  for (const pat of patterns) {
    if (pat && pat.test(c)) {
      c = c.replace(pat, pageHeader);
      replaced = true;
      break;
    }
  }

  if (!replaced) {
    // Try finding the return ( and first <div
    c = c.replace(/return \(\s*\n\s*(<div)/, `return (\n    ${pageHeader}\n        $1`);
  }

  // Close the about-content div and the main tag
  // Replace the last </div>\n  );\n} with the disclaimer strip + close
  c = c.replace(
    /(\s*<\/div>\s*\n\s*\);\s*\n\}\s*)$/,
    `\n      </div>\n      <div className="disclaimer-strip">\n        ⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved\n      </div>\n    </main>\n  );\n}\n`
  );

  // Remove old breadcrumb nav patterns
  c = c.replace(/<nav className="flex items-center gap-2 text-sm text-zinc-500"[^>]*>[\s\S]*?<\/nav>\s*/g, '');

  write(filePath, c);
}

// ─────────── STRATEGY B: Slim breadcrumb bar only ───────────
// Used for "use client" tool pages that already have internal h1/header
function strategyB(filePath, { breadcrumbs }) {
  let c = read(filePath);
  c = ensureLinkImport(c);

  const bcItems = breadcrumbs.map((b, i) => {
    if (i === breadcrumbs.length - 1) {
      return `        <span className="text-zinc-200 font-medium text-xs">${b.name}</span>`;
    }
    return `        <Link href="${b.url}" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">${b.name}</Link>
        <span className="text-zinc-700 text-xs">/</span>`;
  }).join('\n');

  const breadcrumbBar = `<nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 pt-2">
${bcItems}
      </nav>\n      `;

  // Replace the outer container class and inject breadcrumb
  const patterns = [
    /<div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">/,
    /<div className="max-w-3xl mx-auto px-3 py-4 md:px-4 md:py-6">/,
    /<div className="max-w-4xl mx-auto px-4 py-8[^"]*">/,
    /<div className="max-w-5xl mx-auto[^"]*">/,
    /<div className="max-w-6xl mx-auto[^"]*">/,
  ];

  let replaced = false;
  for (const pat of patterns) {
    if (pat.test(c)) {
      c = c.replace(pat, `<div className="max-w-3xl mx-auto px-4 py-4 md:py-6">\n      ${breadcrumbBar}`);
      replaced = true;
      break;
    }
  }

  if (!replaced) console.warn('⚠ Could not find container in', filePath);

  write(filePath, c);
}

// ════════════════════════════════════════════════
// PROCESS EACH TARGET PAGE
// ════════════════════════════════════════════════

// ── TOOLS (Strategy B — interactive client components) ──

const toolPages = [
  { path: 'src/app/tools/calculator/page.tsx', name: 'Reconstitution Calculator' },
  { path: 'src/app/tools/halflife/page.tsx', name: 'Half-Life Calculator' },
  { path: 'src/app/tools/bloodwork/page.tsx', name: 'Bloodwork Analyzer' },
  { path: 'src/app/tools/coa/page.tsx', name: 'COA Verification' },
  { path: 'src/app/tools/interactions/page.tsx', name: 'Interaction Checker' },
  { path: 'src/app/tools/pk/page.tsx', name: 'PK Curve Simulator' },
  { path: 'src/app/tools/evidence-map/page.tsx', name: 'Evidence Map' },
];

for (const t of toolPages) {
  strategyB(t.path, {
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Tools', url: '/tools' },
      { name: t.name },
    ],
  });
}

// ── LIBRARY ──

strategyB('src/app/library/blends/page.tsx', {
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Library', url: '/library' },
    { name: 'Peptide Blends' },
  ],
});

// ── GLOSSARY / BUY / PRACTITIONERS (Strategy B — client pages) ──

strategyB('src/app/glossary/page.tsx', {
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Glossary' },
  ],
});

strategyB('src/app/buy/page.tsx', {
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Buy Peptides' },
  ],
});

strategyB('src/app/practitioners/page.tsx', {
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Find a Practitioner' },
  ],
});

// ── LEGAL (Strategy A) ──

strategyA('src/app/legal/page.tsx', {
  title: 'Privacy Policy & Terms',
  subtitle: 'How we handle your data and the terms governing use of our educational research platform.',
  eyebrow: 'Legal',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Legal' },
  ],
  containerPattern: /<div className="max-w-3xl mx-auto px-4 py-6 md:py-8">/,
});

// ── ABOUT / EDITORIAL POLICY (Strategy A) ──

strategyA('src/app/about/editorial-policy/page.tsx', {
  title: 'Editorial Policy',
  subtitle: 'Content standards, PubMed citation requirements, update frequency, and corrections process.',
  eyebrow: 'Policy',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Editorial Policy' },
  ],
  containerPattern: /<div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12">/,
});

// ── COMPARE INDEX (Strategy A) ──

strategyA('src/app/compare/page.tsx', {
  title: 'Peptide Comparisons',
  subtitle: 'Evidence-based head-to-head compound analysis with cited sources and data tables.',
  eyebrow: 'Analysis',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Compare' },
  ],
  containerPattern: /<div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10">/,
});

// ── COMPARE / ORAL-VS-INJECTABLE (Strategy A) ──

strategyA('src/app/compare/oral-vs-injectable-peptides/page.tsx', {
  title: 'Oral vs Injectable Peptides',
  subtitle: 'A research comparison of bioavailability, stability, and efficacy between delivery methods.',
  eyebrow: 'Comparison',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Compare', url: '/compare' },
    { name: 'Oral vs Injectable' },
  ],
  containerPattern: null,
});

// ── BEGINNERS GUIDE (Strategy A) ──

strategyA('src/app/beginners-guide/page.tsx', {
  title: "Beginner's Guide to Peptides",
  subtitle: 'Everything you need to know to start your peptide research journey, from mechanisms to safety.',
  eyebrow: 'Guide',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: "Beginner's Guide" },
  ],
  containerPattern: /<div className="max-w-4xl mx-auto px-4 py-8 md:py-12">/,
});

// ── DISCLAIMER (Strategy A) ──

{
  let c = read('src/app/disclaimer/page.tsx');
  c = ensureLinkImport(c);
  // Simple container replacement for disclaimer (likely short page)
  c = c.replace(
    /return \(\s*\n/,
    `return (\n    <main id="main-content">\n      <header className="page-header">\n        <div className="page-header-grid" />\n        <div className="page-header-wrap">\n          <nav className="breadcrumb"><Link href="/">Home</Link><span className="sep">/</span><span className="current">Disclaimer</span></nav>\n          <div className="section-label">§ Legal</div>\n          <h1 className="page-title">Research<br /><em>disclaimer</em>.</h1>\n          <p className="page-subtitle">Educational use only. Not medical advice.</p>\n        </div>\n      </header>\n      <div className="about-content reveal space-y-10">\n`
  );
  c = c.replace(
    /(\s*<\/div>\s*\n\s*\);\s*\n\}\s*)$/,
    `\n      </div>\n      <div className="disclaimer-strip">⚠ Educational only · Not medical advice · Most peptides are research-only / not FDA-approved</div>\n    </main>\n  );\n}\n`
  );
  write('src/app/disclaimer/page.tsx', c);
}

// ── BLOG INDEX (Strategy A) ──

strategyA('src/app/blog/page.tsx', {
  title: 'Research Blog',
  subtitle: 'Long-form, evidence-based articles on peptide science, vendor analysis, and regulatory updates.',
  eyebrow: 'Blog',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Blog' },
  ],
  containerPattern: null,
});

console.log('\nDone. Run: npm run build');
