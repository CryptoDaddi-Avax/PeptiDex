import { vendorPricing } from '../src/data/vendor-pricing.js';

const SLUG_MAP = {
  'Amino Club': 'amino-club',
  'Bio Longevity Labs': 'bio-longevity-labs',
  'Limitless Life': 'limitless-life',
  'Ascension Peptides': 'ascension-peptides',
  'Pantheon Peptides': 'pantheon-peptides',
  'LVLUP Health': 'lvlup-health',
};

const pairs = vendorPricing.flatMap(p =>
  p.vendors.map(v => ({
    peptide: p.slug,
    vendor: SLUG_MAP[v.vendor] ?? v.vendor,
    price: v.price_usd,
  }))
);

console.log('=== pSEO Page Count Report ===');
console.log(`Total pricing-verified pairs: ${pairs.length}`);
console.log(`Unique peptides: ${new Set(pairs.map(p => p.peptide)).size}`);
console.log(`Unique vendors: ${new Set(pairs.map(p => p.vendor)).size}`);
console.log('');
console.log('Breakdown by peptide:');
const byPeptide = {};
pairs.forEach(p => { byPeptide[p.peptide] = (byPeptide[p.peptide] || 0) + 1; });
Object.entries(byPeptide)
  .sort((a, b) => b[1] - a[1])
  .forEach(([k, v]) => console.log(`  ${k}: ${v} vendor${v > 1 ? 's' : ''}`));
console.log('');
console.log('Breakdown by vendor:');
const byVendor = {};
pairs.forEach(p => { byVendor[p.vendor] = (byVendor[p.vendor] || 0) + 1; });
Object.entries(byVendor)
  .sort((a, b) => b[1] - a[1])
  .forEach(([k, v]) => console.log(`  ${k}: ${v} peptide${v > 1 ? 's' : ''}`));
