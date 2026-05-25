/**
 * Coupon & Deal Data Layer
 * ========================
 * Single source of truth for /coupon-codes hub and [vendor-slug] sub-pages.
 * Update weekly: change dealOfTheWeek slug + refresh expiresLabel.
 */

// â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface VendorDeal {
  vendorSlug: string;           // matches vendors.ts slug
  vendorName: string;
  code: string;
  discountPercent: number;
  discountType: "percent" | "flat";
  headline: string;             // short CTA line
  /** What the code does NOT apply to */
  exclusions?: string[];
  /** Can be combined with active site sales? */
  stackable: boolean;
  stackNote?: string;           // e.g. "Stacks with 25% Summer Sale â†’ 40%+ total"
  /** ISO date or human label */
  expiresLabel: string;         // "No expiry", "May 31 2026", etc.
  /** Affiliate link with code pre-applied */
  affiliateUrl: string;
  /** Editorial tip shown in expanded section */
  proTip?: string;
  /** min order for free shipping */
  freeShippingThreshold?: number;
  /** Star rating */
  rating: number;
}

export interface PeptideBestDeal {
  peptideSlug: string;
  peptideName: string;
  vendorName: string;
  vendorSlug: string;
  price: number;
  vialMg: number;
  /** Price per mg */
  perMg: number;
  code: string;
  /** Price after code applied */
  discountedPrice: number;
  affiliateUrl: string;
}

// â”€â”€ Deal of the Week â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Change `dealOfTheWeekSlug` each Monday to rotate the highlighted vendor.

export const dealOfTheWeekSlug = "bio-longevity-labs"; // reassigned 2026-05-24 (was ascension-peptides, deactivated due to economics)
export const dealOfTheWeekRefreshedDate = "2026-05-11";

// ——————————————————————————————————————————————————————————————————————————————————————

export const vendorDeals: VendorDeal[] = [
  // DEACTIVATED 2026-05-24 — ascension-peptides removed from customer-facing surfaces
  // { vendorSlug: "ascension-peptides", discountPercent: 50, code: "PEPTIDEX", affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/" }
  {
    vendorSlug: "amino-club",
    vendorName: "Amino Club",
    code: "PEPTIDEX",
    discountPercent: 20,
    discountType: "percent",
    headline: "20% off â€” Editor's Choice with 60-day guarantee",
    exclusions: [],
    stackable: false,
    expiresLabel: "No expiry â€” verified May 2026",
    affiliateUrl: "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=data_layer&code=PEPTIDEX",
    proTip: "Amino Club is our #1 pick for quality/price balance. PEPTIDEX gives 20% off all orders. Backed by a 60-day money-back guarantee â€” the longest in the industry.",
    freeShippingThreshold: 100,
    rating: 4.9,
  },
  {
    vendorSlug: "bio-longevity-labs",
    vendorName: "Bio Longevity Labs",
    code: "PEPTIDEX",
    discountPercent: 15,
    discountType: "percent",
    headline: "15% off â€” stacks with active sales for 40%+ total",
    exclusions: [],
    stackable: true,
    stackNote: "Stacks with their frequent 25â€“30% sitewide sales â†’ up to 40â€“45% combined",
    expiresLabel: "No expiry â€” verified May 2026",
    affiliateUrl: "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
    proTip: "Bio Longevity Labs regularly runs 25â€“30% sitewide sales. Because PEPTIDEX stacks on top, you can hit 40%+ total savings during a sale â€” check their homepage before ordering.",
    freeShippingThreshold: 150,
    rating: 4.8,
  },
  {
    vendorSlug: "limitless-life",
    vendorName: "Limitless Life",
    code: "PEPTIDEX",
    discountPercent: 15,
    discountType: "percent",
    headline: "15% off â€” largest catalog (90+ compounds), USA made",
    exclusions: [],
    stackable: false,
    expiresLabel: "No expiry â€” verified May 2026",
    affiliateUrl: "https://www.kb6dp3dq.com/PEPTIDEX/",
    proTip: "Limitless Life has the widest catalog of any vendor we list (90+ compounds). Best choice when you need harder-to-find peptides.",
    freeShippingThreshold: 100,
    rating: 4.8,
  },
  {
    vendorSlug: "pantheon-peptides",
    vendorName: "Pantheon Peptides",
    code: "PEPTIDEX",
    discountPercent: 15,
    discountType: "percent",
    headline: "15% off â€” competitive pricing, COA verified",
    exclusions: [],
    stackable: false,
    expiresLabel: "No expiry â€” verified May 2026",
    affiliateUrl: "https://pantheonpeptides.com/partner/PeptiDex/",
    proTip: "Pantheon Peptides offers competitive per-mg pricing, especially on GH peptides. Good alternative when Amino Club is out of stock on specific compounds.",
    freeShippingThreshold: 100,
    rating: 4.6,
  },
  {
    vendorSlug: "lvlup-health",
    vendorName: "LVLUP Health",
    code: "PEPTIDEX",
    discountPercent: 15,
    discountType: "percent",
    headline: "15% off oral peptides â€” no injection required",
    exclusions: ["Injectable formulations"],
    stackable: false,
    expiresLabel: "No expiry â€” verified May 2026",
    affiliateUrl: "https://lvluphealth.com/?ref=PEPTIDEX",
    proTip: "LVLUP is the only oral peptide specialist on our list. If you want BPC-157, Semax, or Selank without needles, this is the vendor. Code applies to all oral capsule products.",
    freeShippingThreshold: 75,
    rating: 4.5,
  },
];

// â”€â”€ Per-peptide best deals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Manually curated â€” update when vendor pricing changes.
// discountedPrice = price * (1 - discountPercent/100)

export const peptideBestDeals: PeptideBestDeal[] = [
  // DEACTIVATED 2026-05-24 — BPC-157 and TB-500 were cheapest at Ascension; replace with verified active-vendor data before re-adding
  // { peptideSlug: "bpc-157", vendorSlug: "ascension-peptides", price: 70, discountedPrice: 35 }
  // { peptideSlug: "tb-500",  vendorSlug: "ascension-peptides", price: 65, discountedPrice: 32.5 }
  {
    peptideSlug: "semaglutide",
    peptideName: "Semaglutide",
    vendorName: "Amino Club",
    vendorSlug: "amino-club",
    price: 149.99,
    vialMg: 5,
    perMg: 30,
    code: "PEPTIDEX",
    discountedPrice: 119.99,
    affiliateUrl: "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=data_layer&code=PEPTIDEX",
  },
  {
    peptideSlug: "tirzepatide",
    peptideName: "Tirzepatide",
    vendorName: "Amino Club",
    vendorSlug: "amino-club",
    price: 179.99,
    vialMg: 10,
    perMg: 18,
    code: "PEPTIDEX",
    discountedPrice: 143.99,
    affiliateUrl: "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=data_layer&code=PEPTIDEX",
  },
  // DEACTIVATED 2026-05-24 — Ipamorelin and CJC-1295 were cheapest at Ascension; replace with verified active-vendor data before re-adding
  // { peptideSlug: "ipamorelin", vendorSlug: "ascension-peptides", price: 55, discountedPrice: 27.5 }
  // { peptideSlug: "cjc-1295",  vendorSlug: "ascension-peptides", price: 55, discountedPrice: 27.5 }
  {
    peptideSlug: "ghk-cu",
    peptideName: "GHK-Cu",
    vendorName: "Limitless Life",
    vendorSlug: "limitless-life",
    price: 29.99,
    vialMg: 50,
    perMg: 0.6,
    code: "PEPTIDEX",
    discountedPrice: 25.49,
    affiliateUrl: "https://www.kb6dp3dq.com/PEPTIDEX/",
  },
  {
    peptideSlug: "epithalon",
    peptideName: "Epithalon",
    vendorName: "Limitless Life",
    vendorSlug: "limitless-life",
    price: 39.99,
    vialMg: 10,
    perMg: 4,
    code: "PEPTIDEX",
    discountedPrice: 33.99,
    affiliateUrl: "https://www.kb6dp3dq.com/PEPTIDEX/",
  },
  {
    peptideSlug: "retatrutide",
    peptideName: "Retatrutide",
    vendorName: "Bio Longevity Labs",
    vendorSlug: "bio-longevity-labs",
    price: 249.99,
    vialMg: 10,
    perMg: 25,
    code: "PEPTIDEX",
    discountedPrice: 212.49,
    affiliateUrl: "https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443",
  },
  // DEACTIVATED 2026-05-24 — PT-141 was cheapest at Ascension; replace with verified active-vendor data before re-adding
  // { peptideSlug: "pt-141", vendorSlug: "ascension-peptides", price: 60, discountedPrice: 30 }
];

// â”€â”€ Schema.org helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function buildCouponSchema(deal: VendorDeal) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": `${deal.vendorName} Discount Code â€” ${deal.discountPercent}% Off`,
    "description": deal.headline,
    "url": deal.affiliateUrl,
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "priceType": "https://schema.org/SalePrice",
    },
    "seller": {
      "@type": "Organization",
      "name": deal.vendorName,
    },
    "discount": deal.discountPercent,
    "discountCode": deal.code,
    "eligibleQuantity": {
      "@type": "QuantitativeValue",
      "minValue": 1,
    },
  };
}

export function buildFaqSchema(deals: VendorDeal[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best peptide vendor discount code right now?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `For the best value, use PEPTIDEX at Bio Longevity Labs for 15% off that stacks with site-wide sales — the only vendor where the code stacks with promotions. For Editor's Choice quality, use PEPTIDEX at Amino Club for 20% off. All codes are verified as of May 2026.`,
        },
      },
      ...deals.map((d) => ({
        "@type": "Question",
        "name": `Does ${d.vendorName} have a discount code?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes â€” use code ${d.code} at ${d.vendorName} for ${d.discountPercent}% off. ${d.stackNote ?? ""} ${d.expiresLabel}.`,
        },
      })),
    ],
  };
}

