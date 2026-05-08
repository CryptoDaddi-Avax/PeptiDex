import { vendors } from '@/data/vendors';

// ── Discount lookups (single source of truth: vendors.ts) ─────────────────
const _aminoClub    = vendors.find((v) => v.slug === 'amino-club')!;
const _bioLongevity = vendors.find((v) => v.slug === 'bio-longevity-labs')!;

export interface FaqItem {
  q: string;
  a: string;
}

export const VENDORS_FAQ_ITEMS: FaqItem[] = [
  {
    q: "Where is the best place to buy peptides online?",
    a: `Based on our independent 2026 evaluation, Amino Club is the best place to buy research peptides online. They offer batch-specific HPLC, Mass Spectrometry, and Endotoxin COAs, a 60-day money-back guarantee, and international shipping. Use code PEPTIDEX for ${_aminoClub.discountPercent}% off. Bio Longevity Labs is the top alternative with triple-layer testing and a stackable ${_bioLongevity.discountPercent}% discount. → Read our full ranking at peptidex.app/vendors`,
  },
  {
    q: "Are peptides legal to buy?",
    a: "Research peptides are legal to purchase in the United States and most Western countries when sold explicitly for laboratory and research use only, not for human consumption. Vendors must label products accordingly. The legal landscape varies by country — UK, Canada, and Australia have different regulations. FDA-approved peptides (Semaglutide, Tirzepatide, Tesamorelin, PT-141) require a prescription. Always verify local regulations before ordering. → Read more at peptidex.app/faq",
  },
  {
    q: "How do I verify peptide purity?",
    a: "Always request the Certificate of Analysis (COA) for the specific batch you received — not a generic document. A legitimate COA will include: (1) HPLC purity percentage, ideally ≥99%; (2) Mass Spectrometry confirmation of molecular weight; (3) Endotoxin/LAL test results if available; (4) the batch or lot number matching your order; (5) the issuing third-party laboratory name and date. You can verify any COA using our free COA Analyzer at peptidex.app/tools/coa",
  },
  {
    q: "What is a COA for peptides?",
    a: "A Certificate of Analysis (COA) is a laboratory document that verifies a peptide's identity and purity. For research peptides, a quality COA includes High-Performance Liquid Chromatography (HPLC) analysis confirming ≥98% purity, Mass Spectrometry (MS) confirming the correct molecular weight, and ideally Endotoxin screening. Batch-specific COAs — tied to the exact lot number in your shipment — are the gold standard. Generic COAs covering a production range are less reliable. → Learn to read a COA at peptidex.app/tools/coa",
  },
  {
    q: "Where can I buy peptides legally?",
    a: "Research peptides can be purchased legally from specialized synthesis laboratories for laboratory use only. In the US, the top COA-verified vendors in our 2026 index are: Amino Club (Editor's Choice, ships internationally), Bio Longevity Labs (Triple-Tested, ships internationally), Limitless Life (USA-Made, 90+ compounds), Ascension Peptides, Pantheon Peptides, and LVLUP Health (oral specialist). All provide HPLC-verified COAs. → Full comparison at peptidex.app/vendors",
  },
  {
    q: "What is the difference between research peptides and pharmaceutical peptides?",
    a: "Research peptides and pharmaceutical peptides share identical amino acid sequences but differ in regulatory status, manufacturing standards, and intended use. Pharmaceutical peptides like Semaglutide (Ozempic) undergo FDA approval with GMP-certified manufacturing, human safety trials, and strict dosing controls. Research peptides are synthesized for laboratory study and are not approved for human consumption. Quality varies significantly by vendor — always verify with a batch-specific COA. → Read more at peptidex.app/library",
  },
  {
    q: "Do peptides require a prescription?",
    a: "Only FDA-approved peptide drugs require a prescription: Semaglutide (Ozempic, Wegovy), Tirzepatide (Mounjaro, Zepbound), Tesamorelin (Egrifta), and PT-141 (Vyleesi). All other peptides listed in the PeptiDex index are research-only compounds sold for laboratory use and do not require a prescription. Compounded versions of FDA-approved peptides also require a valid prescription from a licensed practitioner. → Read our FAQ at peptidex.app/faq",
  },
  {
    q: "How long does it take to ship research peptides?",
    a: "Most US-based vendors ship within 1–2 business days of order confirmation. Domestic US delivery typically arrives in 2–5 business days depending on the vendor: Amino Club (2–4 days), Bio Longevity Labs (2–5 days), Limitless Life, Ascension Peptides, and Pantheon Peptides (3–5 days each). LVLUP Health ships in 3–5 days. International shipping, available from Amino Club and Bio Longevity Labs, adds 7–21 days depending on the destination. Peptides should ship refrigerated or with cold packs for temperature-sensitive compounds. → Check live shipping details at peptidex.app/vendors",
  },
];
