/**
 * Vendor Editorial Data — Supplemental prose layer for /vendors listicle.
 * =========================================================================
 * This file intentionally does NOT modify vendors.ts (the canonical data source).
 * It provides: shortPitch, pros, cons, and a long editorial blurb per vendor.
 *
 * Keyed by Vendor.slug (string).
 * Created: 2026-05-06 — SEO listicle rebuild for "best place to buy peptides 2026"
 *
 * DISCOUNT PERCENTAGES: All percentage values are derived from `vendors.ts`
 * (the single source of truth) via the `getDiscountPct` helper below.
 * Do NOT hardcode percentages in this file.
 */
import { vendors } from './vendors';

/** Returns the discountPercent for a given vendor slug, e.g. 20 or 15. */
function getDiscountPct(slug: string): number {
  return vendors.find((v) => v.slug === slug)?.discountPercent ?? 0;
}

export interface VendorEditorial {
  /** 1-sentence differentiator used in H2 subtitle and comparison table */
  shortPitch: string;
  /** 3–5 bullet-point pros. Plain strings. */
  pros: string[];
  /** 2–3 bullet-point cons. Plain strings. */
  cons: string[];
  /**
   * 200–400 word editorial blurb. Plain text with \n\n for paragraph breaks.
   * Avoid markdown — rendered as <p> tags by VendorRankCard.
   */
  blurb: string;
}

export const vendorEditorial: Record<string, VendorEditorial> = {

  // ── #1 Amino Club ──────────────────────────────────────────────────────────
  "amino-club": {
    shortPitch: "The industry's most generous guarantee — 60-day MBG, batch-specific COAs, and Zelle payments accepted.",
    pros: [
      "Batch-specific HPLC + Mass Spec + Endotoxin COA on every order",
      "Industry-leading 60-day money-back guarantee",
      "Ships internationally (rare among research peptide vendors)",
      `${getDiscountPct('amino-club')}% discount with code PEPTIDEX`,
      "Accepts Zelle in addition to crypto and credit card",
    ],
    cons: [
      "Catalog of 40+ compounds is smaller than some competitors",
      "Free shipping threshold ($100) requires a minimum order",
    ],
    blurb: `Amino Club has held the top spot on PeptiDex's independent ranking since Q1 2026 — and it has earned it. Where most vendors stop at HPLC purity testing, Amino Club layers in Mass Spectrometry for molecular identity verification and Endotoxin screening for biological safety. Every batch gets its own dedicated Certificate of Analysis, not a generic batch-range document, so you can trace the exact lot you receive back to the raw test data.\n\nThe 60-day money-back guarantee is the longest in the industry and speaks to the company's confidence in its product quality. Most research peptide vendors cap returns at 30 days or offer none at all. That extra buffer matters when you're planning a multi-week protocol.\n\nFor researchers outside the United States, Amino Club is one of only two vendors in this index that ships internationally. Domestic orders typically arrive in 2–4 business days. Payment options are broader than most competitors: major credit cards, crypto, and Zelle are all accepted — no surprises at checkout.\n\nUse code PEPTIDEX for ${getDiscountPct('amino-club')}% off your first and every subsequent order. The discount does not stack with sitewide sales, but at ${getDiscountPct('amino-club')}% it rarely needs to.`,
  },

  // ── #2 Bio Longevity Labs ───────────────────────────────────────────────────
  "bio-longevity-labs": {
    shortPitch: "Triple-tested with HPLC, LC-MS, and Endotoxin screening — and the PEPTIDEX code stacks with active sales for up to 40% savings.",
    pros: [
      "Three-layer testing: HPLC + LC-MS molecular ID + Endotoxin screening",
      `PEPTIDEX discount (${getDiscountPct('bio-longevity-labs')}%) stacks with sitewide sales — up to 40%+ combined`,
      "Ships internationally",
      "Widest catalog in the injectable segment: 80+ compounds",
      "Batch-specific COA on every product",
    ],
    cons: [
      "Free shipping threshold ($150) is higher than most competitors",
      "30-day return window is good but shorter than Amino Club's 60-day MBG",
    ],
    blurb: `Bio Longevity Labs earns its "Triple-Tested" badge through a rigorous three-stage analytical protocol that goes well beyond the industry standard. HPLC confirms purity percentage (≥99% on all products we've reviewed). LC-MS — Liquid Chromatography Mass Spectrometry — provides independent molecular identity confirmation, verifying that what's in the vial is chemically identical to the labeled peptide sequence. Endotoxin screening, the third layer, screens for bacterial lipopolysaccharides that can contaminate improperly synthesized batches.\n\nThe stackable discount structure is genuinely unusual. Most affiliate codes are either-or with sitewide promotions. Bio Longevity Labs explicitly allows both to run simultaneously, which means during a 25% sitewide sale plus the ${getDiscountPct('bio-longevity-labs')}% PEPTIDEX code, the effective discount approaches 40% off. For researchers buying bulk, this compounds meaningfully.\n\nThe catalog of 80+ compounds is the largest injectable offering in this index. Whether you're researching obscure GH secretagogues or established peptides like BPC-157, TB-500, and Ipamorelin, the inventory is consistently deep. Shipping hits 2–5 business days domestically with international delivery available — a meaningful differentiator in the research peptide market.\n\nThe only meaningful trade-off is the $150 free-shipping threshold, which pushes you toward a larger initial order. That said, with the stackable discount, the per-unit value calculation often makes the minimum worthwhile.`,
  },

  // ── #3 Limitless Life ──────────────────────────────────────────────────────
  "limitless-life": {
    shortPitch: "Made in the USA with the largest catalog in this index — 90+ compounds with HPLC and LC-MS verification.",
    pros: [
      "Largest catalog in this index: 90+ compounds",
      "USA-manufactured — domestic synthesis, shorter supply chain",
      "HPLC + LC-MS + Endotoxin testing",
      `${getDiscountPct('limitless-life')}% discount with code PEPTIDEX`,
      "Free shipping on orders over $100",
    ],
    cons: [
      "Ships to USA only — no international delivery",
      "Silver verification tier (vs. gold for top two vendors)",
    ],
    blurb: `Limitless Life Nootropics is a USA-based manufacturer — meaning synthesis, quality control, and fulfillment all happen domestically. For researchers prioritizing supply chain transparency and shorter cold-chain transit times, this is a meaningful structural advantage over vendors that import bulk peptides for repackaging.\n\nThe 90+ compound catalog is the broadest in this index. Peptides that routinely go out-of-stock elsewhere tend to stay available at Limitless Life. Testing follows a robust three-method protocol: HPLC purity analysis, LC-MS molecular identity verification, and Endotoxin screening — each order ships with a batch-specific COA.\n\nCode PEPTIDEX takes ${getDiscountPct('limitless-life')}% off your order. With free shipping on orders above $100, you can reach effective total savings in the 15–20% range without much planning. Domestic delivery runs 3–5 business days, which is standard for US-only vendors.\n\nThe primary limitation is geography: Limitless Life ships exclusively within the United States. International researchers will need to look at Amino Club or Bio Longevity Labs. Additionally, the vendor carries a Silver verification tier on PeptiDex's independent dashboard — COA documentation is solid but does not yet include the full third-party audit trail that earns a Gold designation.`,
  },

  // ── #4 Ascension Peptides ─────────────────────────────────────────────────
  "ascension-peptides": {
    shortPitch: `Reliable COA-verified source with 60+ compounds and a straightforward ${getDiscountPct('ascension-peptides')}% PEPTIDEX discount.`,
    pros: [
      "COA available for all products (HPLC + Mass Spec)",
      `${getDiscountPct('ascension-peptides')}% discount with code PEPTIDEX`,
      "Consistent inventory across 60+ compounds",
      "Sample COA publicly viewable before purchase",
      "30-day return policy",
    ],
    cons: [
      "Ships to USA only",
      "Purity floor is 98%+ vs. 99%+ for top-ranked vendors",
      "Free shipping threshold ($150) is among the higher minimums",
    ],
    blurb: `Ascension Peptides occupies a reliable middle-tier position in the research peptide market. HPLC and Mass Spectrometry documentation is provided for all products, and crucially, sample COAs are publicly accessible on their website before you commit to a purchase — a transparency practice that not all vendors follow.\n\nThe 60+ compound catalog covers the most-researched peptides including BPC-157, TB-500, CJC-1295 without DAC, Ipamorelin, GHK-Cu, and Semaglutide variants. Inventory depth is generally consistent, and order fulfillment for US customers runs 3–5 business days.\n\nUse code PEPTIDEX for ${getDiscountPct('ascension-peptides')}% off your order. Free shipping kicks in at $150, which is on the higher end among the vendors in this index — factor that into your ordering math. The 30-day return policy is standard for the category.\n\nThe purity specification is 98%+ rather than the 99%+ standard achieved by the top three vendors. In practice, individual batch COAs often show higher values, but the contractual specification matters for reproducible research conditions. Silver verification tier on the PeptiDex dashboard reflects solid but not top-tier documentation depth.`,
  },

  // ── #5 Pantheon Peptides ──────────────────────────────────────────────────
  "pantheon-peptides": {
    shortPitch: "Competitively priced emerging vendor with COA verification and a clean 50-compound catalog.",
    pros: [
      "Competitive pricing across the catalog",
      "COA available for all products",
      "Free shipping on orders over $100",
      "30-day return policy",
      "Growing catalog now at 50+ compounds",
    ],
    cons: [
      "No affiliate discount code currently available",
      "Ships to USA only",
      "Bronze verification tier — fewer independent audits than top vendors",
      "Smaller review base (150+ vs. 300–400+ for higher-ranked vendors)",
    ],
    blurb: `Pantheon Peptides is the newest entrant in this index to earn COA-verified status. HPLC and Mass Spectrometry documentation is provided across the 50+ compound catalog, and the pricing structure is generally 5–10% below the industry midpoint — a meaningful advantage for researchers running extended protocols.\n\nFree shipping on orders above $100 is competitive with the market average. Domestic US delivery runs 3–5 business days, consistent with the segment. A 30-day return window is in place, though it has not yet been tested at scale relative to established vendors.\n\nThe vendor currently holds a Bronze verification tier on PeptiDex's independent dashboard, reflecting fewer independent audits and a smaller documented review history than top-ranked options. There is no exclusive discount code for PeptiDex readers at this time.\n\nFor researchers who prioritize cost efficiency and are comfortable with a shorter public track record, Pantheon Peptides offers solid value. We recommend confirming stock availability for specific compounds before planning a multi-compound purchase, as the 50+ catalog has some gaps in edge-case research peptides.`,
  },

  // ── #6 LVLUP Health ──────────────────────────────────────────────────────
  "lvlup-health": {
    shortPitch: "The only oral peptide specialist in this index — capsules, sublingual tablets, and nasal sprays for needle-free research.",
    pros: [
      "Specialist in oral delivery: capsules, sublingual, and nasal spray formats",
      "COA-verified with HPLC + Mass Spec documentation",
      "Lowest free-shipping threshold ($75) in the index",
      "30-day return policy",
      "Ideal for protocols where injectable administration is not viable",
    ],
    cons: [
      "Ships to USA only",
      "Oral bioavailability is inherently lower than injectable formats",
      "Catalog limited to 20+ compounds (oral-format specialist, not broad)",
      "Bronze verification tier",
    ],
    blurb: `LVLUP Health occupies a unique position in this index as the only vendor specializing in oral peptide delivery formats. Capsules, sublingual tablets, and nasal spray preparations cover the most common oral-bioavailability applications. For research contexts where injectable administration presents logistical constraints, LVLUP Health fills a gap that no other vendor in this ranking addresses.\n\nAll products carry COA documentation verified by HPLC and Mass Spectrometry. The free-shipping threshold of $75 is the lowest in this index — a practical benefit for smaller or more frequent orders that don't hit the $100–$150 minimums required by injectable vendors.\n\nIt is important to understand that oral peptide bioavailability is meaningfully lower than injectable formats for most peptide sequences. Gastric degradation, hepatic first-pass metabolism, and molecular size all affect absorption. LVLUP Health provides dosing guidance calibrated for oral delivery, but researchers should account for these pharmacokinetic differences in their experimental design.\n\nThe catalog of 20+ compounds reflects the oral format focus rather than breadth of coverage. If your protocol involves any injectable compounds, you will need a second vendor from this index. For oral-only research contexts, LVLUP Health is the clear specialist choice.`,
  },
};
