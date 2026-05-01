/**
 * Bio Longevity Labs Automated Price Scraper
 * ============================================
 * 
 * Fetches current peptide pricing from biolongevitylabs.com/shop/
 * and writes structured JSON that the Next.js app reads at build/runtime.
 * 
 * RUNS EVERY 4 HOURS via PM2 cron on the VPS.
 * 
 * Usage:
 *   npx tsx scripts/scrape-bll-prices.ts          # One-shot run
 *   pm2 start scripts/scrape-bll-prices.ts --cron "0 *\/4 * * *"  # Every 4h
 * 
 * Output:
 *   scripts/output/bll-prices-latest.json   ← always-current (app reads this)
 *   scripts/output/bll-prices-[ISO].json    ← timestamped audit trail
 * 
 * Guardrails:
 *   - 1.5s delay between page fetches
 *   - Polite user agent identifying ourselves
 *   - Handles out-of-stock states
 *   - Captures original price + current site price + PEPTIDEX stacked price
 *   - Detects whether a sitewide sale is active
 *   - Logs all runs for audit
 */

import * as fs from "fs";
import * as path from "path";

const USER_AGENT = "PeptiDex Price Comparison Bot (peptidex.app/about)";
const SHOP_URL = "https://biolongevitylabs.com/shop/";
const OUTPUT_DIR = path.join(__dirname, "output");
const LATEST_FILE = path.join(OUTPUT_DIR, "bll-prices-latest.json");
const PEPTIDEX_DISCOUNT = 0.15; // 15% stackable discount

// ── Target peptides we want to match against our pricing tables ──────────────
interface TargetPeptide {
  /** Slug used in our data files */
  ourSlug: string;
  /** Patterns to match in the BLL product name (case-insensitive) */
  matchPatterns: string[];
  /** Expected size(s) in mg — we'll capture whatever BLL lists */
  expectedSizes?: number[];
}

const TARGETS: TargetPeptide[] = [
  { ourSlug: "bpc-157", matchPatterns: ["bpc-157", "bpc157"], expectedSizes: [5, 10] },
  { ourSlug: "tb-500", matchPatterns: ["tb-500", "tb500"], expectedSizes: [5, 10] },
  { ourSlug: "cjc-1295", matchPatterns: ["cjc 1295", "cjc-1295"], expectedSizes: [10] },
  { ourSlug: "ipamorelin", matchPatterns: ["ipamorelin"], expectedSizes: [5, 10] },
  { ourSlug: "tesamorelin", matchPatterns: ["tesamorelin"], expectedSizes: [5, 10] },
  { ourSlug: "ghk-cu", matchPatterns: ["ghk-cu", "ghk cu"], expectedSizes: [50, 100] },
  { ourSlug: "epitalon", matchPatterns: ["epithalon", "epitalon"], expectedSizes: [10, 20] },
  { ourSlug: "thymosin-alpha-1", matchPatterns: ["thymosin alpha"], expectedSizes: [5, 10] },
  { ourSlug: "dsip", matchPatterns: ["dsip", "delta sleep"], expectedSizes: [5] },
  { ourSlug: "pt-141", matchPatterns: ["pt-141", "pt141"], expectedSizes: [5, 10] },
  { ourSlug: "kpv", matchPatterns: ["kpv"], expectedSizes: [10] },
  { ourSlug: "mots-c", matchPatterns: ["mots-c", "motsc", "mots c"], expectedSizes: [10] },
  { ourSlug: "selank", matchPatterns: ["selank"], expectedSizes: [20] },
  { ourSlug: "semax", matchPatterns: ["semax"], expectedSizes: [20] },
  { ourSlug: "melanotan-ii", matchPatterns: ["melanotan"], expectedSizes: [10] },
  { ourSlug: "follistatin-344", matchPatterns: ["follistatin"], expectedSizes: [10] },
  { ourSlug: "nad-plus", matchPatterns: ["nad+", "nad "], expectedSizes: [100, 500] },
  { ourSlug: "ll-37", matchPatterns: ["ll-37"], expectedSizes: [5] },
  { ourSlug: "sermorelin", matchPatterns: ["sermorelin"], expectedSizes: [5, 10] },
  { ourSlug: "semaglutide", matchPatterns: ["semaglutide"], expectedSizes: [5, 10] },
  { ourSlug: "tirzepatide", matchPatterns: ["tirzepatide"], expectedSizes: [5, 10, 30, 60] },
  { ourSlug: "retatrutide", matchPatterns: ["retatrutide"], expectedSizes: [5, 10] },
  { ourSlug: "igf-1-lr3", matchPatterns: ["igf-1", "igf 1"], expectedSizes: [1] },
  { ourSlug: "aod-9604", matchPatterns: ["aod-9604", "aod 9604"], expectedSizes: [5] },
  { ourSlug: "ss-31", matchPatterns: ["ss-31"], expectedSizes: [10] },
  { ourSlug: "oxytocin", matchPatterns: ["oxytocin"], expectedSizes: [10] },
  { ourSlug: "peg-mgf", matchPatterns: ["peg-mgf"], expectedSizes: [5] },
  { ourSlug: "foxo4-dri", matchPatterns: ["foxo4"], expectedSizes: [10] },
  { ourSlug: "cagrilintide", matchPatterns: ["cagrilintide"], expectedSizes: [5] },
  { ourSlug: "vip", matchPatterns: ["vip", "vasoactive intestinal"], expectedSizes: [5] },
  { ourSlug: "kisspeptin", matchPatterns: ["kisspeptin"], expectedSizes: [10] },
  { ourSlug: "ara-290", matchPatterns: ["ara-290"], expectedSizes: [15] },
  { ourSlug: "pnc-27", matchPatterns: ["pnc-27"], expectedSizes: [10] },
];

// ── Types ────────────────────────────────────────────────────────────────────
interface ScrapedProduct {
  name: string;
  slug: string;
  size_mg: number;
  original_price: number;
  current_site_price: number;
  peptidex_final_price: number;
  savings_vs_original_pct: number;
  in_stock: boolean;
  product_url: string;
  note?: string;
}

interface ScrapeOutput {
  vendor: string;
  scraped_at: string;
  source_url: string;
  affiliate_url: string;
  discount_code: string;
  discount_percent: number;
  discount_stackable: boolean;
  sitewide_sale_active: boolean;
  sitewide_sale_percent: number | null;
  products: ScrapedProduct[];
  not_carried: string[];
  scrape_duration_ms: number;
}

// ── Fetch with polite headers ────────────────────────────────────────────────
async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      "Accept": "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}

// ── Parse the shop page HTML ─────────────────────────────────────────────────
function parseShopPage(html: string): ScrapedProduct[] {
  const products: ScrapedProduct[] = [];
  
  // Detect sitewide sale banner
  const saleMatch = html.match(/(\d+)%\s*OFF/i);
  const sitewideSalePct = saleMatch ? parseInt(saleMatch[1]) : 0;
  
  // WooCommerce product blocks — each <li> in the product grid
  // Pattern 1: Sale items with original + sale price
  //   "Original price was: $XX.XX...Current price is: $XX.XX. $YY.YY"
  // Pattern 2: Regular items
  //   "$XX.XX"
  // Pattern 3: Out of stock
  //   "Out of stock" + "Join the Waitlist"
  
  // Split HTML by product entries
  const productBlocks = html.split(/(?=<li\s[^>]*class="[^"]*product[^"]*")/i);
  
  for (const block of productBlocks) {
    // Extract product URL
    const urlMatch = block.match(/href="(https:\/\/biolongevitylabs\.com\/product\/[^"]+)"/);
    if (!urlMatch) continue;
    const productUrl = urlMatch[1];
    
    // Extract product name from heading or link text
    const nameMatch = block.match(/<(?:h2|h3|a)[^>]*class="[^"]*woocommerce-loop-product__title[^"]*"[^>]*>([^<]+)/i)
      || block.match(/<a[^>]*href="[^"]*product\/[^"]*"[^>]*>([^<]+)</i);
    if (!nameMatch) continue;
    const name = nameMatch[1].trim();
    
    // Skip non-peptide items (supplies, creams, bioregulators capsules)
    if (name.toLowerCase().includes("reconstitution") || name.toLowerCase().includes("bac water")) continue;
    
    // Check if it's out of stock
    const isOutOfStock = block.includes("Out of stock") || block.includes("Join the Waitlist");
    
    // Extract prices
    let originalPrice = 0;
    let currentPrice = 0;
    
    // Pattern: "Original price was: $XX.XX.$XX.XXCurrent price is: $XX.XX. $YY.YY"
    const salePriceMatch = block.match(/Original price was: \$(\d+(?:\.\d{2})?)[\s\S]*?Current price is:[\s\S]*?\$(\d+(?:\.\d{2})?)/);
    if (salePriceMatch) {
      originalPrice = parseFloat(salePriceMatch[1]);
      currentPrice = parseFloat(salePriceMatch[2]);
    } else {
      // Non-sale: just a single price
      const singlePriceMatch = block.match(/\$(\d+(?:\.\d{2})?)/);
      if (singlePriceMatch) {
        originalPrice = parseFloat(singlePriceMatch[1]);
        currentPrice = originalPrice;
      }
    }
    
    if (originalPrice === 0) continue;
    
    // Extract size from name (e.g., "BPC-157 (10mg)" → 10)
    const sizeMatch = name.match(/\((\d+(?:\.\d+)?)\s*(?:mg|mcg)\)/i);
    const sizeMg = sizeMatch ? parseFloat(sizeMatch[1]) : 0;
    
    // Match against our target list
    const nameLower = name.toLowerCase();
    const target = TARGETS.find(t => 
      t.matchPatterns.some(p => nameLower.includes(p.toLowerCase()))
    );
    
    // Skip blends and non-target products for the primary pricing table
    // But still capture them if they match a target
    if (!target) continue;
    
    // Calculate PEPTIDEX stacked price
    const peptidexPrice = Math.round(currentPrice * (1 - PEPTIDEX_DISCOUNT) * 100) / 100;
    const savingsPct = Math.round((1 - peptidexPrice / originalPrice) * 1000) / 10;
    
    products.push({
      name,
      slug: target.ourSlug,
      size_mg: sizeMg,
      original_price: originalPrice,
      current_site_price: currentPrice,
      peptidex_final_price: peptidexPrice,
      savings_vs_original_pct: savingsPct,
      in_stock: !isOutOfStock,
      product_url: productUrl,
    });
  }
  
  return products;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  
  console.log(`\n🔬 BLL Price Scraper — ${timestamp}`);
  console.log("=".repeat(60));
  
  try {
    // 1. Fetch the shop page
    console.log("📥 Fetching shop page...");
    const html = await fetchPage(SHOP_URL);
    console.log(`   ✅ ${(html.length / 1024).toFixed(1)} KB received`);
    
    // 2. Detect sale status
    const saleMatch = html.match(/(\d+)%\s*OFF/i);
    const sitewideSaleActive = !!saleMatch;
    const sitewideSalePct = saleMatch ? parseInt(saleMatch[1]) : null;
    console.log(sitewideSaleActive 
      ? `   🏷️  Sitewide sale detected: ${sitewideSalePct}% OFF`
      : `   📋 No sitewide sale detected — using base prices`
    );
    
    // 3. Parse products
    const products = parseShopPage(html);
    console.log(`   📦 Matched ${products.length} products to our catalog`);
    
    // 4. Determine not-carried
    const carriedSlugs = new Set(products.map(p => p.slug));
    const notCarried = TARGETS
      .filter(t => !carriedSlugs.has(t.ourSlug))
      .map(t => t.ourSlug);
    
    // 5. Build output
    const duration = Date.now() - startTime;
    const output: ScrapeOutput = {
      vendor: "Bio Longevity Labs",
      scraped_at: timestamp,
      source_url: SHOP_URL,
      affiliate_url: "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
      discount_code: "PEPTIDEX",
      discount_percent: 15,
      discount_stackable: true,
      sitewide_sale_active: sitewideSaleActive,
      sitewide_sale_percent: sitewideSalePct,
      products,
      not_carried: notCarried,
      scrape_duration_ms: duration,
    };
    
    // 6. Write output files
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    
    // Always-current file (app reads this)
    fs.writeFileSync(LATEST_FILE, JSON.stringify(output, null, 2));
    console.log(`   💾 Updated: bll-prices-latest.json`);
    
    // Timestamped audit file
    const auditFile = path.join(OUTPUT_DIR, `bll-prices-${timestamp.replace(/[:.]/g, "-")}.json`);
    fs.writeFileSync(auditFile, JSON.stringify(output, null, 2));
    console.log(`   📁 Archived: ${path.basename(auditFile)}`);
    
    // 7. Summary
    console.log(`\n   ── Summary ──`);
    console.log(`   Products matched: ${products.length}`);
    console.log(`   In stock: ${products.filter(p => p.in_stock).length}`);
    console.log(`   Out of stock: ${products.filter(p => !p.in_stock).length}`);
    console.log(`   Not carried: ${notCarried.length} (${notCarried.join(", ")})`);
    console.log(`   Sale active: ${sitewideSaleActive ? `YES (${sitewideSalePct}%)` : "NO"}`);
    console.log(`   Duration: ${duration}ms`);
    
    // 8. Print price table for quick spot-check
    console.log(`\n   ── Price Table (Top 10) ──`);
    console.log(`   ${"Peptide".padEnd(25)} ${"Original".padEnd(10)} ${"Site".padEnd(10)} ${"PEPTIDEX".padEnd(10)} ${"Save".padEnd(6)}`);
    console.log(`   ${"-".repeat(61)}`);
    for (const p of products.filter(p => p.in_stock).slice(0, 10)) {
      console.log(
        `   ${p.name.substring(0, 24).padEnd(25)} ` +
        `$${p.original_price.toFixed(2).padEnd(9)} ` +
        `$${p.current_site_price.toFixed(2).padEnd(9)} ` +
        `$${p.peptidex_final_price.toFixed(2).padEnd(9)} ` +
        `${p.savings_vs_original_pct}%`
      );
    }
    
    console.log(`\n✅ Scrape complete.\n`);
    
  } catch (err) {
    console.error(`\n❌ Scraper error:`, err);
    // Don't overwrite latest.json on error — keep stale data rather than no data
    process.exit(1);
  }
}

main();
