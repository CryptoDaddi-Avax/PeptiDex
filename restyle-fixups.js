/**
 * restyle-fixups.js — Fix the two missed files: halflife + buy
 */
const fs = require('fs');

// halflife: main component starts at export default function HalfLifePage()
// Its return is `return (\n        <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">`
{
  const p = 'src/app/tools/halflife/page.tsx';
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes("from 'next/link'")) {
    c = c.replace(`"use client";\n`, `"use client";\nimport Link from 'next/link';\n`);
  }
  const breadcrumbBar = `<div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 pt-2">
        <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Home</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <Link href="/tools" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Tools</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <span className="text-zinc-200 font-medium text-xs">Half-Life Calculator</span>
      </nav>
      `;
  c = c.replace(
    /return \(\s*\n\s*<div className="max-w-3xl mx-auto px-4 py-6 md:py-8">/,
    `return (\n    ${breadcrumbBar}`
  );
  fs.writeFileSync(p, c, 'utf8');
  console.log('✓ halflife fixed');
}

// buy: main export is BuyPage (not a small helper)
// Find "export default function BuyPage" and then its return
{
  const p = 'src/app/buy/page.tsx';
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes("from 'next/link'") && !c.includes('from "next/link"')) {
    c = c.replace(`"use client";\n`, `"use client";\nimport Link from 'next/link';\n`);
  }
  const breadcrumbBar = `<div className="max-w-4xl mx-auto px-4 py-4 md:py-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 pt-2">
        <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Home</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <span className="text-zinc-200 font-medium text-xs">Buy Peptides</span>
      </nav>
      `;
  // Find the BuyPage function's return
  c = c.replace(
    /export default function BuyPage\(\)[^{]*\{([\s\S]*?)return \(\s*\n\s*(<div)/,
    (match, before, div) => {
      return `export default function BuyPage() {${before}return (\n    ${breadcrumbBar}${div}`;
    }
  );
  fs.writeFileSync(p, c, 'utf8');
  console.log('✓ buy fixed');
}
