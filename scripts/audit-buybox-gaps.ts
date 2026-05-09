import { peptides } from "../src/data/peptides";
import { vendorPricing } from "../src/data/vendor-pricing";

interface GapEntry { slug: string; name: string; reason: string; }
interface CoveredEntry { slug: string; name: string; vendorCount: number; vendors: string[]; }

const gaps: GapEntry[] = [];
const covered: CoveredEntry[] = [];

for (const p of peptides) {
  const entry = vendorPricing.find(v => v.slug === p.slug);
  const inStockVendors = entry
    ? entry.vendors.filter(v => v.inStock && v.price_usd > 0)
    : [];

  if (inStockVendors.length === 0) {
    gaps.push({
      slug: p.slug,
      name: p.name,
      reason: entry ? "no_in_stock_price" : "no_entry",
    });
  } else {
    covered.push({
      slug: p.slug,
      name: p.name,
      vendorCount: inStockVendors.length,
      vendors: inStockVendors.map(v => v.vendor),
    });
  }
}

console.log(`=== BUYBOX COVERED (${covered.length}/${peptides.length}) ===`);
for (const p of covered) {
  console.log(`  ✓  ${p.slug.padEnd(35)} ${p.vendorCount}v  [${p.vendors.join(", ")}]`);
}

console.log(`\n=== EMPTY BUYBOX — DATA GAPS (${gaps.length}) ===`);
for (const g of gaps) {
  console.log(`  ✗  [${g.reason.padEnd(22)}] ${g.slug.padEnd(35)} ${g.name}`);
}

console.log(`\nSummary: ${covered.length} with data · ${gaps.length} show empty state`);
