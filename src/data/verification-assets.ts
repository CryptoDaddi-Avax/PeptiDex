/**
 * Verification Assets Manifest — COA Tracking Layer
 * 
 * Controls which pages can render COA-specific claims in E-E-A-T blocks.
 * If a peptide has no entry here, the E-E-A-T block falls back to a softer
 * verification statement (price tracking, MW cross-reference, vendor reputation).
 * 
 * Rule: Pages can ONLY render COA batch references if this manifest has a matching entry.
 * 
 * ── SOURCING NOTE ──
 * Primary COAs scraped from Amino Club product pages (May 2026).
 * All PDFs hosted at /coa/[peptide-slug]-[batch-id].pdf
 * Testing lab: Biogenica Labs (all Amino Club COAs, April 2026 batch).
 * 
 * ── REFRESH CADENCE ──
 * Run quarterly: compare batchId in this file vs. live Amino Club product page.
 * If batch has rotated, download new COA, update this manifest, archive old PDF.
 */

export interface VerificationAsset {
  peptideSlug: string;
  peptideName: string;
  vendor: string;
  vendorSlug: string;
  batchId: string;
  coaPdfPath: string | null;       // null = no hosted PDF yet
  coaPdfSourceUrl?: string;        // Original URL on vendor site (for refresh script)
  coaVerifiedDate: string;          // ISO date
  lab: string;
  purity: number;
  molecularWeight: string;
  methods: string[];
  referenceMW?: string;             // e.g. "Eli Lilly Phase 2 data" — source for MW cross-check
  passed: boolean;
}

export const verificationAssets: VerificationAsset[] = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // AMINO CLUB — Biogenica Labs COAs (April 2026 batch, downloaded May 2026)
  // All PDFs hosted locally at /coa/[slug]-[batch].pdf
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    peptideSlug: 'retatrutide',
    peptideName: 'Retatrutide',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'RT0001',
    coaPdfPath: '/coa/retatrutide-RT0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_GLP-3_RT__10MG_RT0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.822,
    molecularWeight: '4731.4 Da',
    methods: ['HPLC', 'Mass Spec'],
    referenceMW: 'Eli Lilly Phase 2 data',
    passed: true,
  },
  {
    peptideSlug: 'bpc-157',
    peptideName: 'BPC-157',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'BP0001',
    coaPdfPath: '/coa/bpc-157-BP0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_BPC-157_10MG_BP0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.876,
    molecularWeight: '1419.5 Da',
    methods: ['HPLC', 'Mass Spec'],
    passed: true,
  },
  {
    peptideSlug: 'tb-500',
    peptideName: 'TB-500',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'TB0001',
    coaPdfPath: '/coa/tb-500-TB0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_TB-500_10MG_TB0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.924,
    molecularWeight: '4963.4 Da',
    methods: ['HPLC', 'Mass Spec'],
    passed: true,
  },
  {
    peptideSlug: 'tesamorelin',
    peptideName: 'Tesamorelin',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'TES0001',
    coaPdfPath: '/coa/tesamorelin-TES0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_Tesamorelin_10MG_TES0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.521,
    molecularWeight: '5135.8 Da',
    methods: ['HPLC', 'Mass Spec'],
    referenceMW: 'Theratechnologies FDA filing',
    passed: true,
  },
  {
    peptideSlug: 'cjc-1295',
    peptideName: 'CJC-1295 / Ipamorelin',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'CIP0001',
    coaPdfPath: '/coa/cjc-1295-CIP0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_CJC-1295_Ipamorelin_No_DAC__10MG_CIP0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.940,
    molecularWeight: '3367.9 Da',
    methods: ['HPLC', 'Mass Spec'],
    passed: true,
  },
  {
    peptideSlug: 'ipamorelin',
    peptideName: 'Ipamorelin',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'IPA0001',
    coaPdfPath: '/coa/ipamorelin-IPA0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_Ipamorelin_10MG_IPA0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.810,
    molecularWeight: '711.9 Da',
    methods: ['HPLC', 'Mass Spec'],
    passed: true,
  },
  {
    peptideSlug: 'cagrilintide',
    peptideName: 'Cagrilintide',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'CAG0001',
    coaPdfPath: '/coa/cagrilintide-CAG0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_Cagrilintide_10MG_CAG0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.604,
    molecularWeight: '3951.5 Da',
    methods: ['HPLC', 'Mass Spec'],
    passed: true,
  },
  {
    peptideSlug: 'mots-c',
    peptideName: 'MOTS-c',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'MTC0001',
    coaPdfPath: '/coa/mots-c-MTC0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_MOTS-C_10MG_MTC0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.710,
    molecularWeight: '2174.6 Da',
    methods: ['HPLC', 'Mass Spec'],
    passed: true,
  },
  {
    peptideSlug: 'ghk-cu',
    peptideName: 'GHK-Cu',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'GHK0001',
    coaPdfPath: '/coa/ghk-cu-GHK0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_GHK-Cu_50MG_GHK0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.623,
    molecularWeight: '340.4 Da',
    methods: ['HPLC', 'Mass Spec'],
    passed: true,
  },
  {
    peptideSlug: 'nad',
    peptideName: 'NAD+',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'ND0001',
    coaPdfPath: '/coa/nad-ND0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_NAD__500MG_NAD0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.520,
    molecularWeight: '663.4 Da',
    methods: ['HPLC', 'Mass Spec'],
    passed: true,
  },
  {
    peptideSlug: '5-amino-1mq',
    peptideName: '5-Amino-1MQ',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'AMQ0001',
    coaPdfPath: '/coa/5-amino-1mq-AMQ0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_5-Amino-1MQ_50MG_AMQ0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.710,
    molecularWeight: '172.2 Da',
    methods: ['HPLC', 'Mass Spec'],
    passed: true,
  },
  {
    peptideSlug: 'epitalon',
    peptideName: 'Epitalon',
    vendor: 'Amino Club',
    vendorSlug: 'amino-club',
    batchId: 'EPI0001',
    coaPdfPath: '/coa/epitalon-EPI0001.pdf',
    coaPdfSourceUrl: 'https://www.aminoclub.com/coa/Biogenica_CoA_Epithalon_10MG_EPI0001.pdf',
    coaVerifiedDate: '2026-04-12',
    lab: 'Biogenica Labs',
    purity: 99.710,
    molecularWeight: '390.3 Da',
    methods: ['HPLC', 'Mass Spec'],
    passed: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // TIRZEPATIDE — Ascension Peptides (T-10 / T-30) + Pantheon Peptides
  // COAs available via Ascension certificates page (vendor-disclosed, not hosted)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    peptideSlug: 'tirzepatide',
    peptideName: 'Tirzepatide',
    vendor: 'Ascension Peptides',
    vendorSlug: 'ascension-peptides',
    batchId: 'Ascension-T-30',
    coaPdfPath: null,     // COAs on Ascension certificates page — not hosted locally
    coaPdfSourceUrl: 'https://ascensionpeptides.com/certificates-of-analysis/',
    coaVerifiedDate: '2026-05-14',
    lab: 'Third-party (vendor-disclosed)',
    purity: 99.0,
    molecularWeight: '4813.5 Da',
    methods: ['HPLC', 'LC-MS'],
    referenceMW: 'Eli Lilly Mounjaro characterization',
    passed: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SEMAGLUTIDE — Ascension Peptides (S-5)
  // COAs available via Ascension certificates page (vendor-disclosed, not hosted)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    peptideSlug: 'semaglutide',
    peptideName: 'Semaglutide',
    vendor: 'Ascension Peptides',
    vendorSlug: 'ascension-peptides',
    batchId: 'Ascension-S-5',
    coaPdfPath: null,     // COAs on Ascension certificates page — not hosted locally
    coaPdfSourceUrl: 'https://ascensionpeptides.com/certificates-of-analysis/',
    coaVerifiedDate: '2026-05-14',
    lab: 'Third-party (vendor-disclosed)',
    purity: 99.0,
    molecularWeight: '4114 Da',
    methods: ['HPLC', 'LC-MS'],
    referenceMW: 'Novo Nordisk characterization',
    passed: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SLU-PP-332 — Limitless Life Nootropics (capsule form)
  // 250mcg × 60 capsules, USA-manufactured, ≥99% purity
  // COAs available via vendor quality statement (vendor-disclosed, not hosted)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    peptideSlug: 'slu-pp-332',
    peptideName: 'SLU-PP-332',
    vendor: 'Limitless Life Nootropics',
    vendorSlug: 'limitless-life',
    batchId: 'LLN-SLU-2026',
    coaPdfPath: null,     // Vendor-disclosed COAs — not hosted locally
    coaPdfSourceUrl: 'https://limitlesslifenootropics.com/quality-statement/',
    coaVerifiedDate: '2026-05-14',
    lab: 'Third-party (vendor-disclosed)',
    purity: 99.0,
    molecularWeight: 'Small molecule (non-peptide)',
    methods: ['HPLC'],
    referenceMW: 'Burris Lab / ACS Chem Biol 2023',
    passed: true,
  },
];

// ── Lookup helpers ────────────────────────────────────────────────────────────

/** Get the best (highest-purity) COA asset for a given peptide slug */
export function getBestCOAForPeptide(slug: string): VerificationAsset | undefined {
  const matches = verificationAssets.filter(a => a.peptideSlug === slug && a.passed);
  if (matches.length === 0) return undefined;
  return matches.sort((a, b) => b.purity - a.purity)[0];
}

/** Get all COA assets for a given peptide slug */
export function getCOAsForPeptide(slug: string): VerificationAsset[] {
  return verificationAssets.filter(a => a.peptideSlug === slug && a.passed);
}

/** Check if a peptide has at least one hosted (linkable) COA PDF */
export function hasHostedCOA(slug: string): boolean {
  return verificationAssets.some(a => a.peptideSlug === slug && a.coaPdfPath !== null);
}
