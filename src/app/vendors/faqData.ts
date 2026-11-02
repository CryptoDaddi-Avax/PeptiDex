import { injectableVendors, vendorsSorted } from '@/data/vendors';

// ── Ranking lookups (order = published criteria score, src/lib/vendor-criteria.ts) ──
const _top    = injectableVendors[0];
const _second = injectableVendors[1];
const _listed = vendorsSorted
  .map((v) => `${v.name} (${v.criteria.total}/100${v.ownedByFounder ? ", owned by PeptiDex's founder" : ""}${v.category === 'oral' ? ", oral" : ""})`)
  .join(", ");

export interface FaqItem {
  q: string;
  a: string;
}

export const VENDORS_FAQ_ITEMS: FaqItem[] = [
  {
    q: "Where is the best place to buy peptides online?",
    a: `On our published criteria (COA availability, third-party lab testing, price per mg, shipping, payment options and returns), ${_top.name} scores highest at ${_top.criteria.total}/100, followed by ${_second.name} at ${_second.criteria.total}/100. Scores use each vendor's own published information; PeptiDex does not test products. Use code PEPTIDEX for ${_top.discountPercent}% off at ${_top.name} or ${_second.discountPercent}% off at ${_second.name}${_second.discountStackable ? ' (stacks with sales)' : ''}. PeptiDex earns affiliate commission from these vendors and its founder owns Elyria Bio. → See every score at peptidex.app/vendors`,
  },
  {
    q: "Are peptides legal to buy?",
    a: "Research peptides are legal to purchase in the United States and most Western countries when sold explicitly for laboratory and research use only, not for human consumption. Vendors must label products accordingly. The legal landscape varies by country — UK, Canada, and Australia have different regulations. FDA-approved peptides (e.g. Tesamorelin, PT-141) require a prescription. Always verify local regulations before ordering. → Read more at peptidex.app/faq",
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
    a: `Research peptides can be purchased legally from specialized synthesis laboratories for laboratory use only. The vendors in our 2026 index, in order of their published-criteria score, are: ${_listed}. Each states that it provides HPLC COAs. → Full comparison at peptidex.app/vendors`,
  },
  {
    q: "What is the difference between research peptides and pharmaceutical peptides?",
    a: "Research peptides and pharmaceutical peptides share identical amino acid sequences but differ in regulatory status, manufacturing standards, and intended use. Pharmaceutical peptides like Tesamorelin (Egrifta) undergo FDA approval with GMP-certified manufacturing, human safety trials, and strict dosing controls. Research peptides are synthesized for laboratory study and are not approved for human consumption. Quality varies significantly by vendor — always verify with a batch-specific COA. → Read more at peptidex.app/library",
  },
  {
    q: "Do peptides require a prescription?",
    a: "Only FDA-approved peptide drugs require a prescription — for example, Tesamorelin (Egrifta) and PT-141 (Vyleesi). All other peptides listed in the PeptiDex index are research-only compounds sold for laboratory use and do not require a prescription. Compounded versions of FDA-approved peptides also require a valid prescription from a licensed practitioner. → Read our FAQ at peptidex.app/faq",
  },
  {
    q: "How long does it take to ship research peptides?",
    a: "Most US-based vendors ship within 1–2 business days of order confirmation. Domestic US delivery typically arrives in 2–5 business days depending on the vendor: Amino Club (2–4 days), Bio Longevity Labs (2–5 days), Limitless Life, Ascension Peptides, and Pantheon Peptides (3–5 days each). LVLUP Health ships in 3–5 days. International shipping, available from Amino Club and Bio Longevity Labs, adds 7–21 days depending on the destination. Peptides should ship refrigerated or with cold packs for temperature-sensitive compounds. → Check live shipping details at peptidex.app/vendors",
  },
];
