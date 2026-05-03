/**
 * fix-amino-club-discount.js
 * Updates all hardcoded "15% off" references to Amino Club → "20% off"
 * Files where BLL (Bio Longevity Labs) says "15% off" are left alone (correct).
 * The vendor-pricing.ts generic "15% off" note stays since it's about BLL.
 */
const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) results = results.concat(walk(p));
    else results.push(p);
  }
  return results;
}

// Files that specifically mention Amino Club + 15% off (need update to 20%)
const AC_SPECIFIC_FILES = [
  'src/app/vendors/amino-club/[peptide]/page.tsx',
  'src/app/vendors/amino-club-vs-limitless-life/page.tsx',
  'src/app/vendors/amino-club-vs-ascension/page.tsx',
  'src/app/suppliers/page.tsx',
  'src/app/library/[slug]/client.tsx',
];

// Blog .md files referencing Amino Club with 15%
const BLOG_MD_FILES = [
  'src/content/blog/tirzepatide-vs-semaglutide-which-is-better.md',
  'src/content/blog/research-peptide-safety-explained.md',
  'src/content/blog/bpc-157-dosage-complete-guide.md',
  'src/content/blog/best-peptides-for-muscle-growth.md',
  'src/content/blog/best-peptides-for-fat-loss.md',
  'src/content/blog/best-peptide-vendor-2026.md',
];

// VendorsClient line 242 has "Get 15% off your entire order" generic text
// That's displayed in the Amino Club section, so update it too
const VENDORS_CLIENT = 'src/app/vendors/VendorsClient.tsx';

let totalFixed = 0;

function fixFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ Fixed:', filePath);
    totalFixed++;
  } else {
    console.log('  no match:', filePath);
  }
}

// Fix vendor comparison pages (Amino Club specific mentions)
fixFile('src/app/vendors/amino-club/[peptide]/page.tsx', [
  ['promo code PEPTIDEX at checkout for 15% off', 'promo code PEPTIDEX at checkout for 20% off'],
  ['Get 15% off your entire order with code PEPTIDEX', 'Get 20% off your entire order with code PEPTIDEX'],
  ['for 15% off"', 'for 20% off"'],
]);

// amino-club-vs-limitless-life: "Amino Club: PEPTIDEX for 15% off"
fixFile('src/app/vendors/amino-club-vs-limitless-life/page.tsx', [
  ['Amino Club: <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-amber-300">PEPTIDEX</code> for 15% off', 
   'Amino Club: <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-amber-300">PEPTIDEX</code> for 20% off'],
]);

// amino-club-vs-ascension: "Amino Club: PEPTIDEX for 15% off"
fixFile('src/app/vendors/amino-club-vs-ascension/page.tsx', [
  ['Amino Club: <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-amber-300">PEPTIDEX</code> for 15% off',
   'Amino Club: <code className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-amber-300">PEPTIDEX</code> for 20% off'],
]);

// suppliers page
fixFile('src/app/suppliers/page.tsx', [
  ['Use code PEPTIDEX for 15% off your order', 'Use code PEPTIDEX for 20% off your order'],
]);

// library slug client — "get 15% off your order" in Amino Club context
fixFile('src/app/library/[slug]/client.tsx', [
  ["independently verified Amino Club's third-party testing standards and pricing for {peptide.name}. Read our full analysis and get 15% off your order.",
   "independently verified Amino Club's third-party testing standards and pricing for {peptide.name}. Read our full analysis and get 20% off your order."],
]);

// VendorsClient generic "Get 15% off your entire order" — this appears in AC section
fixFile('src/app/vendors/VendorsClient.tsx', [
  ['Get 15% off your entire order with our exclusive, verified promo code for 2026.',
   'Get 20% off your entire Amino Club order with our exclusive, verified promo code for 2026.'],
]);

// Blog markdown files
for (const f of BLOG_MD_FILES) {
  fixFile(f, [
    ['secure 15% off wholesale pricing', 'secure 20% off wholesale pricing'],
    ['secure an additional 15% off their entire order', 'secure an additional 20% off their entire order'],
    ['secure 15% off wholesale pricing', 'secure 20% off wholesale pricing'],
  ]);
}

console.log(`\n✅ Total files updated: ${totalFixed}`);
