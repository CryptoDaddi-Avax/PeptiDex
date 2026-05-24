/**
 * Onboarding Guide â€” Data & Configuration
 * =========================================
 * Supply links, step metadata, and localStorage keys
 * for the "New to Peptides?" onboarding stepper.
 */



import { SITE_STATS } from '@/data/site-stats';

// â”€â”€ Supply Products â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export interface SupplyProduct {
  id: string;
  name: string;
  description: string;
  href: string;
  vendor: 'amino_club' | 'amazon';
  /** Used for GA4 event payload */
  gaProductKey: string;
  /** Whether this is the featured/highlighted product */
  featured?: boolean;
  /** FTC-required: is this an affiliate link? */
  isAffiliate: true;
}

export const SUPPLY_PRODUCTS: SupplyProduct[] = [
  {
    id: 'bac-water',
    name: 'Amino H₂O — Bacteriostatic Water',
    description: 'Pharmaceutical-grade BAC water with 0.9% benzyl alcohol. The only safe diluent for reconstituting multi-dose peptide vials.',
    href: 'https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=onboarding_supplies&code=PEPTIDEX',
    vendor: 'amino_club',
    gaProductKey: 'bac_water',
    featured: true,
    isAffiliate: true,
  },
  {
    id: 'mixing-syringe',
    name: '3ml Reconstitution Syringes',
    description: '22Gâ€“25G luer-lock syringes for transferring BAC water into vials. These are for mixing only â€” never used for injection.',
    href: 'https://amzn.to/4nmTvqh',
    vendor: 'amazon',
    gaProductKey: 'mixing_syringe',
    isAffiliate: true,
  },
  {
    id: 'insulin-syringe',
    name: '1ml Insulin Syringes (31G)',
    description: 'U-100 insulin syringes with ultra-fine 31G needles. The standard for painless subcutaneous injection in research protocols.',
    href: 'https://amzn.to/4uNcJbf',
    vendor: 'amazon',
    gaProductKey: 'insulin_syringe',
    isAffiliate: true,
  },
  {
    id: 'alcohol-swabs',
    name: 'Alcohol Prep Pads (70% ISO)',
    description: 'Sterile 70% isopropyl alcohol wipes. Swab every rubber stopper and every injection site, every time â€” no exceptions.',
    href: 'https://amzn.to/433Gqc0',
    vendor: 'amazon',
    gaProductKey: 'alcohol_swabs',
    isAffiliate: true,
  },
  {
    id: 'sharps-container',
    name: 'Sharps Disposal Container',
    description: 'FDA-cleared biohazard container. Never re-cap, bend, or reuse a needle. Dispose immediately after each use.',
    href: 'https://amzn.to/4d5c0MA',
    vendor: 'amazon',
    gaProductKey: 'sharps_container',
    isAffiliate: true,
  },
  {
    id: 'storage-case',
    name: 'Peptide Storage & Travel Case',
    description: 'Insulated, lockable case for transporting reconstituted vials, syringes, and BAC water. Keeps peptides at stable temperature between fridge and injection site.',
    href: 'https://amzn.to/4djqt6b',
    vendor: 'amazon',
    gaProductKey: 'storage_case',
    isAffiliate: true,
  },
];

// â”€â”€ Step Metadata â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export interface StepMeta {
  number: number;
  title: string;
  subtitle: string;
  /** GA4 event name suffix */
  gaKey: string;
}

export const STEPS: StepMeta[] = [
  { number: 1, title: 'Your Supplies Checklist', subtitle: 'Everything you need before your first vial', gaKey: 'supplies' },
  { number: 2, title: 'Trusted Vendor Sources', subtitle: 'COA-verified vendors we independently review', gaKey: 'vendors' },
  { number: 3, title: 'How to Reconstitute', subtitle: 'Turn powder into injectable solution â€” safely', gaKey: 'reconstitution' },
  { number: 4, title: 'Dosing & Safe Injection', subtitle: 'SubQ protocol, syringe math, and injection sites', gaKey: 'dosing' },
  { number: 5, title: 'Explore the Full Toolkit', subtitle: 'Free calculators, comparisons, and planners', gaKey: 'toolkit' },
];

// â”€â”€ Reconstitution steps (reused from beginners-guide) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const RECON_STEPS = [
  { step: '1', title: 'Sanitize Everything', desc: 'Wipe the rubber stoppers of both the BAC water vial and your peptide vial with an alcohol prep pad. Let air dry completely.' },
  { step: '2', title: 'Determine Volume', desc: 'Use the Reconstitution Calculator below to compute your target concentration. A common starting point: 2 mL BAC water for a 5 mg vial.' },
  { step: '3', title: 'Equalize Pressure', desc: 'Pull air into your mixing syringe equal to the BAC water volume you need. Inject this air into the BAC water vial to prevent a vacuum.' },
  { step: '4', title: 'Draw BAC Water', desc: 'Invert the BAC water vial and carefully draw the exact required volume into the mixing syringe.' },
  { step: '5', title: 'Inject Down the Glass', desc: 'Insert the needle into the peptide vial at an angle so the water trickles down the glass wall. Slow and steady â€” never force it.' },
  { step: '6', title: 'Roll, Never Shake', desc: 'Gently roll the vial between your palms for 60â€“90 seconds. The powder should dissolve clear within minutes. If cloudy after 20 minutes, the peptide may be degraded â€” do not use.' },
];

// â”€â”€ Toolkit cross-sell items â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const TOOLKIT_ITEMS = [
  { href: '/tools/calculator', title: 'Reconstitution Calculator', desc: 'Calculate BAC water volumes, solution concentrations, and exact syringe-unit draw marks â€” from vial to needle in one step.', badge: 'ESSENTIAL' },
  { href: '/tools/cycle-planner', title: 'Cycle Planner', desc: 'Map your full research protocol end-to-end â€” vial counts, dosing schedules, total cost, and vendor sourcing on a single timeline.', badge: 'POPULAR' },
  { href: '/tools/interactions', title: 'Interaction Checker', desc: 'Cross-reference any peptide stack against known synergies, cautions, and contraindications before you combine compounds.' },
  { href: '/tools/evidence', title: 'Evidence Dashboard', desc: `Browse ${SITE_STATS.peptides.count} peptides ranked by published clinical evidence â€” filterable by research goal, trial phase, and mechanism of action.` },
  { href: '/tools/coa', title: 'COA Analyzer', desc: "Upload or paste any vendor's Certificate of Analysis and get an instant purity and molecular weight verification against reference data." },
  { href: '/tools/pricing', title: 'Price Comparison', desc: `Compare pricing across all ${SITE_STATS.vendors.count} verified vendors â€” with automatic discount codes, cost-per-dose math, and bulk savings calculations.` },
];

