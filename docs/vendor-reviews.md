# Vendor Review Pages — Documentation

## Overview

Vendor review pages live at `/vendors/[slug]` and are dynamically generated from structured data files in `src/data/reviews/`. Each vendor has a dedicated TypeScript data file that conforms to the `VendorReviewData` interface.

## Architecture

```
src/
├── data/
│   ├── vendor-review-types.ts    ← Type definitions (VendorReviewData, SubPage, etc.)
│   └── reviews/
│       ├── index.ts              ← Registry + getVendorReview() helper
│       ├── amino-club.ts         ← Amino Club review data
│       ├── bio-longevity-labs.ts  ← Bio Longevity Labs review data
│       ├── ascension-peptides.ts  ← Ascension Peptides review data
│       ├── limitless-life.ts      ← Limitless Life review data
│       ├── pantheon-peptides.ts   ← Pantheon Peptides review data
│       └── lvlup-health.ts       ← LVLUP Health review data
├── app/
│   └── vendors/
│       └── [slug]/
│           ├── page.tsx          ← Dynamic template (SSG)
│           └── vendor-review.css ← Scoped styles
```

## How to Add a New Vendor Review

### Step 1: Create the Data File

Create `src/data/reviews/{vendor-slug}.ts`:

```typescript
import type { VendorReviewData } from '../vendor-review-types';

export const myVendorReview: VendorReviewData = {
  slug: 'my-vendor',          // Must match the vendor slug in vendors.ts
  name: 'My Vendor',
  tagline: 'Short tagline',
  affiliateUrl: 'https://...',
  discountCode: 'PEPTIDEX',
  discountPercent: 15,
  discountStackable: false,
  websiteDisplay: 'myvendor.com',
  location: 'United States',

  // Scores (editorial)
  overallRating: 4.7,
  coaScore: '8.5/10',
  purityScore: '9.0/10',
  shippingScore: '8.0/10',
  valueScore: '8.5/10',
  supportScore: '8.0/10',

  // Quick verdict
  verdictHeadline: 'Is My Vendor Legit?',
  verdictBody: '60-word answer...',

  // Stats
  purity: '99%+',
  coaType: 'Batch-specific',
  testingMethods: ['HPLC', 'Mass Spec'],
  catalogSize: '50+ compounds',
  shippingSpeed: '3–5 business days',
  shippingCost: 'Free over $100',
  shipsTo: ['USA'],
  paymentMethods: ['Credit Card', 'Crypto'],
  returnPolicy: '30-day return policy',
  ratingCount: '200+',

  // Sections
  pros: [{ point: 'Pro title', detail: 'Detail...' }],
  cons: [{ point: 'Con title', detail: 'Detail...' }],
  coaDescription: 'How they test...',
  coaUrl: 'https://...',  // optional
  pricing: [
    { peptide: 'BPC-157', slug: 'bpc-157', listPrice: '$49.99', withCode: '~$42.49', vial: '10mg' },
  ],
  sentiment: [
    { platform: 'Trustpilot', rating: '4.7', count: '200+', summary: '...', positives: [], negatives: [], url: '...' },
  ],
  shippingDetail: 'Paragraph 1\n\nParagraph 2',
  bestFor: ['Researcher persona 1', 'Researcher persona 2'],
  alternatives: [
    { name: 'Alt Vendor', slug: 'alt-slug', rating: 4.8, bestFor: 'What they excel at', href: '/vendors/alt-slug' },
  ],
  faqs: [
    { q: 'Is My Vendor legit?', a: 'Answer...' },
    // 5+ questions recommended
  ],
  scoreBreakdown: [
    { category: 'COA & Testing', score: '8.5/10', note: 'Explanation' },
  ],
  finalVerdictBody: 'Concluding paragraph...',

  // SEO
  titleTag: 'My Vendor Review (2026): Pricing, COA & Quality | PeptiDex',
  metaDescription: '140-155 char meta description...',
  datePublished: '2026-05-15',
  dateModified: '2026-05-15',

  // Internal links to peptide profiles
  libraryLinks: [
    { name: 'BPC-157', slug: 'bpc-157' },
  ],

  // Optional: sub-page cluster
  subPages: [
    { type: 'faq', slug: 'my-vendor-faq', label: 'My Vendor FAQ' },
    { type: 'discount', slug: 'my-vendor-discount-code', label: 'My Vendor Discount Code' },
  ],
};
```

### Step 2: Register in the Index

Edit `src/data/reviews/index.ts`:

```typescript
export { myVendorReview } from './my-vendor';
import { myVendorReview } from './my-vendor';
// ...
export const allVendorReviews: VendorReviewData[] = [
  // ... existing vendors
  myVendorReview,
];
```

### Step 3: Add Vendor to vendors.ts (if new)

If this is a brand-new vendor, also add it to `src/data/vendors.ts`. The review page template reads verification data and vendor metadata from there.

### Step 4: Build & Verify

```bash
npm run build
# Verify the page was statically generated:
# Look for "○ /vendors/my-vendor" in the build output
```

## Page Structure (10 Sections)

The template renders these sections in order:

1. **H1**: `{Vendor Name} Review ({year}): Pricing, COA & Quality`
2. **Summary Card**: Score, rating, tier badge, purity, COA type, ships from
3. **TL;DR**: Top 3 score breakdown items as scannable bullets
4. **Pros / Cons**: Two-column balanced grid
5. **COA Verification**: Testing methods + verified COA data table from `verification-data.ts`
6. **Pricing Breakdown**: Table with cost/vial, cost/mg, and w/PEPTIDEX price
7. **Shipping & Service**: Specs grid + prose detail
8. **How {Vendor} Compares**: Top 3 alternative vendor cards with internal links
9. **Related** (optional): Sub-page links (FAQ, discount, legitimacy)
10. **FAQ**: 5+ questions with FAQPage schema
11. **Final Verdict + CTA**: Affiliate button with discount code

## JSON-LD Schemas

Each page injects 4 schema.org types:

| Schema | Purpose |
|---|---|
| `Review` | Review of the vendor as an Organization |
| `Product` | Product schema with aggregateRating |
| `FAQPage` | FAQ section for rich results |
| `BreadcrumbList` | Home → Vendors → {Vendor Name} |

## Sub-Pages

The `subPages` field allows linking long-tail keyword pages from the main review:

```typescript
subPages: [
  { type: 'faq', slug: 'amino-club-faq', label: 'Amino Club FAQ' },
  { type: 'discount', slug: 'amino-club-discount-code', label: 'Amino Club Discount Code' },
  { type: 'legitimacy', slug: 'is-amino-club-legit', label: 'Is Amino Club Legit?' },
  { type: 'alternatives', slug: 'amino-club-vs-ascension', label: 'Amino Club vs Ascension' },
]
```

Sub-page types:
- `faq` — Common questions page
- `discount` — Discount/coupon code page
- `legitimacy` — "Is X legit?" trust page
- `alternatives` — Head-to-head comparison page

When defined, a "Related" section renders after the comparison section with internal links to each sub-page.

## Redirects

Old review pages at `/vendors/{slug}-review` are 301-redirected to `/vendors/{slug}` via `next.config.ts`. The redirect rules are:

| Old URL | New URL |
|---|---|
| `/vendors/amino-club-review` | `/vendors/amino-club` |
| `/vendors/bio-longevity-labs-review` | `/vendors/bio-longevity-labs` |
| `/vendors/ascension-peptides-review` | `/vendors/ascension-peptides` |
| `/vendors/limitless-life-review` | `/vendors/limitless-life` |
| `/vendors/pantheon-peptides-review` | `/vendors/pantheon-peptides` |
| `/vendors/lvlup-health-review` | `/vendors/lvlup-health` |

All redirects use `permanent: true` (HTTP 301) for full SEO credit transfer.

## Affiliate Links

All outbound vendor links use the `<AffiliateLink>` component which:
- Applies `rel="sponsored nofollow"` automatically
- Fires GA4 tracking events
- Uses the vendor's affiliate URL from `vendors.ts`
