/**
 * Coupon Landing Page Configuration
 * ==================================
 * Central config for /peptidex-coupon — all data is hand-verified.
 * Update weekly when running vendor price checks.
 * 
 * Last updated: 2026-05-14
 */

export interface CouponVendorRow {
  vendor: string;
  slug: string;
  discountPercent: number;
  stackable: boolean;
  code: string;
  verifiedDate: string;
  applyUrl: string;
  category: 'injectable' | 'oral';
  badge?: string;
}

export const couponVendorTable: CouponVendorRow[] = [
  {
    vendor: 'Amino Club',
    slug: 'amino-club',
    discountPercent: 20,
    stackable: false,
    code: 'PEPTIDEX',
    verifiedDate: '2026-05-14',
    applyUrl: 'https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX',
    category: 'injectable',
    badge: "Editor's Choice",
  },
  {
    vendor: 'Bio Longevity Labs',
    slug: 'bio-longevity-labs',
    discountPercent: 15,
    stackable: true,
    code: 'PEPTIDEX',
    verifiedDate: '2026-05-14',
    applyUrl: 'https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443',
    category: 'injectable',
    badge: 'Triple-Tested',
  },
  {
    vendor: 'Limitless Life',
    slug: 'limitless-life',
    discountPercent: 15,
    stackable: false,
    code: 'PEPTIDEX',
    verifiedDate: '2026-05-14',
    applyUrl: 'https://www.kb6dp3dq.com/PEPTIDEX/',
    category: 'injectable',
    badge: 'USA Made',
  },
  {
    vendor: 'Ascension Peptides',
    slug: 'ascension-peptides',
    discountPercent: 50,
    stackable: false,
    code: 'PEPTIDEX',
    verifiedDate: '2026-05-14',
    applyUrl: 'https://ascensionpeptides.com/ref/PeptiDex/',
    category: 'injectable',
    badge: '50% Off',
  },
  {
    vendor: 'Pantheon Peptides',
    slug: 'pantheon-peptides',
    discountPercent: 15,
    stackable: false,
    code: 'PEPTIDEX',
    verifiedDate: '2026-05-14',
    applyUrl: 'https://pantheonpeptides.com/partner/PeptiDex/',
    category: 'injectable',
  },
  {
    vendor: 'LVLUP Health',
    slug: 'lvlup-health',
    discountPercent: 15,
    stackable: false,
    code: 'PEPTIDEX',
    verifiedDate: '2026-05-14',
    applyUrl: 'https://lvluphealth.com/?ref=PEPTIDEX',
    category: 'oral',
    badge: 'Oral Specialist',
  },
];

// ── HowTo Steps ────────────────────────────────────────────────────────────
export interface HowToStep {
  position: number;
  name: string;
  text: string;
  imageSlot: string; // placeholder path for screenshot
}

export const howToSteps: HowToStep[] = [
  {
    position: 1,
    name: 'Choose your vendor and add peptides to cart',
    text: 'Visit any partner vendor from the table above. Browse their catalog and add your chosen research peptides to the shopping cart.',
    imageSlot: '/images/howto/step-1-add-to-cart.png',
  },
  {
    position: 2,
    name: 'Proceed to checkout',
    text: 'Click the cart icon and proceed to the checkout page. Create an account or check out as a guest — both work with PEPTIDEX.',
    imageSlot: '/images/howto/step-2-checkout.png',
  },
  {
    position: 3,
    name: 'Enter code PEPTIDEX in the coupon field',
    text: 'Look for the "Coupon Code", "Discount Code", or "Promo Code" field on the checkout page. Type PEPTIDEX (all caps) and click Apply.',
    imageSlot: '/images/howto/step-3-enter-code.png',
  },
  {
    position: 4,
    name: 'Verify discount and complete purchase',
    text: 'Confirm the discount is reflected in your order total. The percentage off varies by vendor (15%–50%). Complete your purchase — the discount applies instantly.',
    imageSlot: '/images/howto/step-4-verify.png',
  },
];

// ── FAQ Items ──────────────────────────────────────────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

export const couponFAQs: FAQItem[] = [
  {
    question: 'Is PEPTIDEX a legitimate coupon code?',
    answer: 'Yes. PEPTIDEX is an official affiliate discount code verified across 6 partner peptide vendors. I verify each code monthly by completing test checkouts. The code has been active since January 2026 and has been used over 10,000 times.',
  },
  {
    question: 'Does PEPTIDEX stack with sale prices?',
    answer: 'It depends on the vendor. At Bio Longevity Labs, PEPTIDEX stacks with site-wide sales for up to 40%+ total savings. At Amino Club, Ascension Peptides, Limitless Life, and Pantheon Peptides, the PEPTIDEX code does not stack with other promotions — it applies to the regular price.',
  },
  {
    question: 'Does the PEPTIDEX code expire?',
    answer: 'PEPTIDEX is a permanent affiliate code with no expiration date. I verify it monthly across all 6 vendors. The discount percentages (15%–50%) are set by each vendor and could change, but the code itself does not expire.',
  },
  {
    question: 'Which peptides does PEPTIDEX work on?',
    answer: 'PEPTIDEX works on all products in each partner vendor\'s catalog — injectable peptides, capsules, blends, and supplies. There are no product exclusions. It applies to BPC-157, TB-500, Retatrutide, Tirzepatide, Semaglutide, CJC-1295, Ipamorelin, and every other compound each vendor carries.',
  },
  {
    question: 'What is the refund policy if I use PEPTIDEX?',
    answer: 'Using PEPTIDEX does not affect refund eligibility. Amino Club offers a 60-day money-back guarantee. Bio Longevity Labs and Ascension Peptides offer 30-day return policies. Pantheon Peptides offers a 30-day return policy. Check each vendor\'s specific policy for details.',
  },
  {
    question: 'Do these vendors provide COA (Certificate of Analysis) documentation?',
    answer: 'Yes. All 6 partner vendors provide third-party COA documentation. Amino Club and Bio Longevity Labs provide batch-specific COAs with HPLC, LC-MS, and endotoxin testing. Ascension, Limitless Life, and Pantheon provide COAs available on their respective lab testing pages.',
  },
  {
    question: 'How fast is shipping?',
    answer: 'Domestic US shipping is typically 2–5 business days across all vendors. Amino Club and Bio Longevity Labs offer free shipping on orders over $100 and $150 respectively. Ascension offers free shipping over $250. Pantheon and Limitless Life offer free shipping over $100.',
  },
  {
    question: 'Do these vendors ship internationally?',
    answer: 'Amino Club and Bio Longevity Labs ship internationally. Limitless Life, Ascension Peptides, Pantheon Peptides, and LVLUP Health currently ship within the USA only. International shipping availability may change — check each vendor\'s shipping page for the latest.',
  },
  {
    question: 'Can I use PEPTIDEX on mobile checkout?',
    answer: 'Yes. PEPTIDEX works on desktop, mobile, and tablet checkouts across all partner vendors. The coupon field is available on every vendor\'s mobile checkout flow. No app is required.',
  },
  {
    question: 'How many vendors accept PEPTIDEX?',
    answer: 'PEPTIDEX is accepted at 6 partner vendors: Amino Club (20% off), Bio Longevity Labs (15% off, stackable), Limitless Life (15% off), Ascension Peptides (50% off), Pantheon Peptides (15% off), and LVLUP Health (15% off).',
  },
  {
    question: 'Is PEPTIDEX an affiliate code? Do you earn a commission?',
    answer: 'Yes — full transparency. PEPTIDEX is an affiliate code. I (The Crypto Daddi) earn a commission on purchases made through PEPTIDEX links. This is how PeptiDex funds ongoing research, COA verification, and free tools. The discount you receive is real and identical whether you use my link or enter the code directly.',
  },
  {
    question: 'Why is PEPTIDEX better than codes like THANKYOU, AMINOS, or CLUB40?',
    answer: 'PEPTIDEX is the only code verified across 6 vendors simultaneously. Codes like THANKYOU, AMINOS, and CLUB40 are vendor-specific and may be expired or offer lower discounts. PEPTIDEX gives you 20% at Amino Club (vs. THANKYOU\'s 10%), 50% at Ascension (vs. no public alternative), and 15% at Bio Longevity Labs that stacks with sales. I verify every code monthly.',
  },
];
