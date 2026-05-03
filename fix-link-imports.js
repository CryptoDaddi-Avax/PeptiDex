/**
 * fix-missing-link-imports.js
 * Scans all files modified by restyle-remaining.js and adds Link import if missing
 */
const fs = require('fs');
const path = require('path');

const targets = [
  'src/app/tools/calculator/page.tsx',
  'src/app/tools/halflife/page.tsx',
  'src/app/tools/bloodwork/page.tsx',
  'src/app/tools/coa/page.tsx',
  'src/app/tools/interactions/page.tsx',
  'src/app/tools/pk/page.tsx',
  'src/app/tools/evidence-map/page.tsx',
  'src/app/library/blends/page.tsx',
  'src/app/glossary/page.tsx',
  'src/app/buy/page.tsx',
  'src/app/practitioners/page.tsx',
  'src/app/legal/page.tsx',
  'src/app/about/editorial-policy/page.tsx',
  'src/app/compare/page.tsx',
  'src/app/compare/oral-vs-injectable-peptides/page.tsx',
  'src/app/beginners-guide/page.tsx',
  'src/app/blog/page.tsx',
];

for (const f of targets) {
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes("from 'next/link'") && !c.includes('from "next/link"')) {
    // Find first import line and add after it
    const hasUseClient = c.startsWith('"use client"');
    if (hasUseClient) {
      // Add after "use client"; line
      c = c.replace(/"use client";(\r?\n)/, `"use client";$1import Link from 'next/link';\n`);
    } else {
      // Add as first line
      const firstImport = c.indexOf('import ');
      if (firstImport !== -1) {
        c = c.slice(0, firstImport) + "import Link from 'next/link';\n" + c.slice(firstImport);
      }
    }
    fs.writeFileSync(f, c, 'utf8');
    console.log('✓ Added Link import to', f);
  } else {
    console.log('  already has Link:', f);
  }
}
