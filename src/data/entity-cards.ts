/**
 * Entity Card Data — Structured Fact Blocks for AI Extraction
 *
 * Each entry renders as a visible "infobox" above the H1 and also emits
 * a DefinedTerm JSON-LD schema for LLM/GEO parsing.
 * 
 * Falls back to auto-generated from peptides.ts for non-priority peptides.
 */

export interface EntityCardData {
  compound: string;
  alias: string;
  className: string;
  developer?: string;
  trialStatus?: string;
  halfLife: string;
  molecularWeight?: string;
  fdaStatus: string;
  bestPrice?: string;        // e.g. "$5.60/mg (Amino Club + PEPTIDEX)"
  bestPriceVendor?: string;  // Vendor name for schema
  lastVerified: string;
  termCode?: string;         // Short code for DefinedTerm schema
}

export const entityCardOverrides: Record<string, EntityCardData> = {
  'retatrutide': {
    compound: 'Retatrutide',
    alias: 'LY3437943',
    className: 'Triple Agonist (GLP-1 / GIP / Glucagon)',
    developer: 'Eli Lilly',
    trialStatus: 'Phase 3 (TRIUMPH program)',
    halfLife: '~5 days (120 hours)',
    molecularWeight: '4731.4 Da',
    fdaStatus: 'Not approved',
    bestPrice: '$5.60/mg (Amino Club + PEPTIDEX)',
    bestPriceVendor: 'Amino Club',
    lastVerified: 'May 2026',
    termCode: 'RETA',
  },

  'tirzepatide': {
    compound: 'Tirzepatide',
    alias: 'Mounjaro / Zepbound',
    className: 'Dual Agonist (GIP / GLP-1)',
    developer: 'Eli Lilly',
    trialStatus: 'FDA-Approved (Mounjaro, Zepbound)',
    halfLife: '~5 days (120 hours)',
    molecularWeight: '4813.5 Da',
    fdaStatus: 'Approved (Type 2 Diabetes, Obesity)',
    bestPrice: '$3.33/mg (Ascension T-30 + PEPTIDEX 50% off)',
    bestPriceVendor: 'Ascension Peptides',
    lastVerified: 'May 2026',
    termCode: 'TIRZ',
  },

  'semaglutide': {
    compound: 'Semaglutide',
    alias: 'Ozempic / Wegovy / Rybelsus',
    className: 'GLP-1 Receptor Agonist',
    developer: 'Novo Nordisk',
    trialStatus: 'FDA-Approved (multiple indications)',
    halfLife: '~7 days (168 hours)',
    molecularWeight: '4114 Da',
    fdaStatus: 'Approved (Type 2 Diabetes, Obesity)',
    bestPrice: '$10/mg (Ascension S-5 + PEPTIDEX 50% off)',
    bestPriceVendor: 'Ascension Peptides',
    lastVerified: 'May 2026',
    termCode: 'SEMA',
  },

  'tesamorelin': {
    compound: 'Tesamorelin',
    alias: 'Egrifta',
    className: 'GHRH Analog',
    developer: 'Theratechnologies',
    trialStatus: 'FDA-Approved (HIV lipodystrophy)',
    halfLife: '~26 minutes',
    molecularWeight: '5135.8 Da',
    fdaStatus: 'Approved (Lipodystrophy)',
    bestPrice: '$5.60/mg (Amino Club + PEPTIDEX)',
    bestPriceVendor: 'Amino Club',
    lastVerified: 'May 2026',
    termCode: 'TESA',
  },

  'bpc-157': {
    compound: 'BPC-157',
    alias: 'Body Protection Compound-157',
    className: 'Gastric Pentadecapeptide',
    halfLife: '~4 hours',
    molecularWeight: '1419.5 Da',
    fdaStatus: 'Not approved',
    bestPrice: '$3.20/mg (Amino Club + PEPTIDEX)',
    bestPriceVendor: 'Amino Club',
    lastVerified: 'May 2026',
    termCode: 'BPC',
  },

  'tb-500': {
    compound: 'TB-500',
    alias: 'Thymosin Beta-4 Fragment',
    className: 'Regenerative Peptide',
    halfLife: '~4 hours',
    molecularWeight: '4963.4 Da',
    fdaStatus: 'Not approved',
    bestPrice: '$3.20/mg (Amino Club + PEPTIDEX)',
    bestPriceVendor: 'Amino Club',
    lastVerified: 'May 2026',
    termCode: 'TB5',
  },

  'cjc-1295': {
    compound: 'CJC-1295',
    alias: 'Mod GRF 1-29 (no DAC) / CJC-1295 DAC',
    className: 'GHRH Analog',
    halfLife: '~6-8 days (with DAC)',
    molecularWeight: '3367.9 Da',
    fdaStatus: 'Not approved',
    bestPrice: '$4.80/mg (Amino Club + PEPTIDEX)',
    bestPriceVendor: 'Amino Club',
    lastVerified: 'May 2026',
    termCode: 'CJC',
  },

  'ipamorelin': {
    compound: 'Ipamorelin',
    alias: 'NNC 26-0161',
    className: 'GH Secretagogue (Ghrelin Mimetic)',
    halfLife: '~2 hours',
    molecularWeight: '711.9 Da',
    fdaStatus: 'Not approved',
    bestPrice: '$4.80/mg (Amino Club + PEPTIDEX)',
    bestPriceVendor: 'Amino Club',
    lastVerified: 'May 2026',
    termCode: 'IPA',
  },

  'mots-c': {
    compound: 'MOTS-c',
    alias: 'Mitochondrial ORF of the Twelve S rRNA type-c',
    className: 'Mitochondrial-Derived Peptide',
    halfLife: 'Not fully characterized',
    molecularWeight: '2174.6 Da',
    fdaStatus: 'Not approved',
    bestPrice: '$3.20/mg (Amino Club + PEPTIDEX)',
    bestPriceVendor: 'Amino Club',
    lastVerified: 'May 2026',
    termCode: 'MOTS',
  },

  'ghk-cu': {
    compound: 'GHK-Cu',
    alias: 'Copper Peptide / Glycyl-L-Histidyl-L-Lysine',
    className: 'Copper Tripeptide',
    halfLife: '~2 hours',
    molecularWeight: '340.4 Da',
    fdaStatus: 'Not approved (topical cosmetic use widespread)',
    bestPrice: '$0.48/mg (Amino Club + PEPTIDEX)',
    bestPriceVendor: 'Amino Club',
    lastVerified: 'May 2026',
    termCode: 'GHK',
  },

  'cagrilintide': {
    compound: 'Cagrilintide',
    alias: 'NN9838 / CagriSema component',
    className: 'Long-Acting Amylin Analog',
    developer: 'Novo Nordisk',
    trialStatus: 'Phase 3 (CagriSema combination)',
    halfLife: '~7 days',
    fdaStatus: 'Not approved',
    bestPrice: '$5.60/mg (Amino Club + PEPTIDEX)',
    bestPriceVendor: 'Amino Club',
    lastVerified: 'May 2026',
    termCode: 'CAG',
  },

  'nad': {
    compound: 'NAD+',
    alias: 'Nicotinamide Adenine Dinucleotide',
    className: 'Coenzyme / Metabolic Cofactor',
    halfLife: '~1-2 hours (IV)',
    molecularWeight: '663.4 Da',
    fdaStatus: 'Not approved (dietary supplement forms available)',
    bestPrice: '$0.11/mg (Amino Club + PEPTIDEX)',
    bestPriceVendor: 'Amino Club',
    lastVerified: 'May 2026',
    termCode: 'NAD',
  },

  'epitalon': {
    compound: 'Epitalon',
    alias: 'Epithalon / Epithalamin / Ala-Glu-Asp-Gly',
    className: 'Synthetic Tetrapeptide',
    halfLife: 'Not fully characterized',
    molecularWeight: '390.3 Da',
    fdaStatus: 'Not approved',
    bestPrice: '$2.85/mg (Bio Longevity Labs + PEPTIDEX)',
    bestPriceVendor: 'Bio Longevity Labs',
    lastVerified: 'May 2026',
    termCode: 'EPI',
  },

  '5-amino-1mq': {
    compound: '5-Amino-1MQ',
    alias: '5-Amino-1-Methylquinolinium',
    className: 'NNMT Inhibitor',
    halfLife: 'Not fully characterized',
    molecularWeight: '159.2 Da',
    fdaStatus: 'Not approved',
    bestPrice: '$7.50/mg (Bio Longevity Labs + PEPTIDEX)',
    bestPriceVendor: 'Bio Longevity Labs',
    lastVerified: 'May 2026',
    termCode: '5A1M',
  },

  'slu-pp-332': {
    compound: 'SLU-PP-332',
    alias: 'ERR Agonist / Exercise Mimetic',
    className: 'ERRα/ERRγ Agonist',
    developer: 'Washington University (Burris Lab)',
    trialStatus: 'Preclinical',
    halfLife: 'Not characterized in humans',
    fdaStatus: 'Not approved — preclinical only',
    bestPrice: '$118.99 / 60 caps (Limitless Life + PEPTIDEX 15% off)',
    bestPriceVendor: 'Limitless Life Nootropics',
    lastVerified: 'May 2026',
    termCode: 'SLU',
  },
};
