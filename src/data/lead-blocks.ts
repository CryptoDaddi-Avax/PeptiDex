/**
 * Lead Block Overrides — AEO Answer-First Content
 *
 * Hand-tuned 40-70 word citation blocks for the top peptide pages.
 * Used by QuickAnswerBlock.tsx — falls back to auto-generated if no override exists.
 *
 * Voice: Editorial / index (third person). Research framing only: describe what
 * was studied, in which model, citing a PMID already in that peptide's key_studies.
 * Rule: PEPTIDEX must appear in every lead block within the first 60 words.
 * Classification: HIGH = code in sentence 1-2, MEDIUM = sentence 1-2 with research hook, LOW = code in sentence 2-3
 */

export type CommercialIntent = 'high' | 'medium' | 'low';

export interface LeadBlock {
  text: string;
  intent: CommercialIntent;
  wordCount: number;
}

export const leadBlockOverrides: Record<string, LeadBlock> = {
  // ─── HIGH COMMERCIAL INTENT ─────────────────────────────────────────────────

  'tesamorelin': {
    intent: 'high',
    wordCount: 58,
    text: `Tesamorelin is FDA-approved (Egrifta) for excess abdominal fat in HIV-associated lipodystrophy; in a pooled analysis of its two Phase 3 trials, visceral adipose tissue decreased significantly with tesamorelin versus placebo, while abdominal subcutaneous fat was preserved (PMID: 20554713). PeptiDex index price: Amino Club, $55.99 per 10mg vial with code PEPTIDEX (20% off, $5.60/mg). Also listed at Bio Longevity Labs, where PEPTIDEX stacks with sales. Research use only.`,
  },

  'bpc-157': {
    intent: 'high',
    wordCount: 58,
    text: `BPC-157 is a tissue-repair peptide studied mainly in animal models; a 2026 clinical primer notes a significant lack of human clinical evidence (PMID: 41476424). Lowest verified price-per-mg in the PeptiDex index: Amino Club, $31.99 per 10mg vial with code PEPTIDEX (20% off, $3.20/mg). COA batch 2604-AC-BPC shows 99.4% purity at 1419.5 Da. Research use only.`,
  },

  'tb-500': {
    intent: 'high',
    wordCount: 56,
    text: `TB-500 (a Thymosin Beta-4 fragment) is studied in preclinical models for cell migration and tissue regeneration, and is often discussed alongside BPC-157. PeptiDex index price: Amino Club, $31.99 per 10mg vial with code PEPTIDEX (20% off, $3.20/mg). Several vendors carry it; Amino Club's batch-specific COAs are the most detailed in the PeptiDex index. Research use only.`,
  },

  'cjc-1295': {
    intent: 'high',
    wordCount: 55,
    text: `CJC-1295 is a GHRH analog studied for sustained GH release and often discussed alongside ipamorelin; the DAC version binds albumin, extending its half-life to 6-8 days. PeptiDex index price: Amino Club, $47.99 per 10mg vial with code PEPTIDEX (20% off, $4.80/mg). Research use only.`,
  },

  'ipamorelin': {
    intent: 'high',
    wordCount: 56,
    text: `Ipamorelin is a selective GH secretagogue: in published studies it stimulated pulsatile GH release without the cortisol or prolactin increases reported with GHRP-2 and GHRP-6. PeptiDex index price: Amino Club, $47.99 per 10mg vial with code PEPTIDEX (20% off, $4.80/mg). COA batch 2604-AC-IPA verified at 99.5% purity, the highest in the PeptiDex dataset. Research use only.`,
  },

  // ─── MEDIUM COMMERCIAL INTENT ───────────────────────────────────────────────

  'mots-c': {
    intent: 'medium',
    wordCount: 56,
    text: `MOTS-c is a mitochondria-derived peptide that activates AMPK, the energy-sensing pathway also engaged by exercise and metformin. First characterized by Lee et al. in 2015, it has been studied mainly in rodent models of metabolic homeostasis (PMID: 25738459). PeptiDex index price: Amino Club, $31.99 per 10mg vial with code PEPTIDEX (20% off, $3.20/mg). Research use only.`,
  },

  'ghk-cu': {
    intent: 'medium',
    wordCount: 54,
    text: `GHK-Cu (copper peptide) is a naturally occurring tripeptide studied for wound healing, collagen synthesis, and anti-inflammatory effects; its levels decline with age. PeptiDex has reviewed COAs across multiple vendors for GHK-Cu. PeptiDex index price: Amino Club, $23.99 per 50mg vial with code PEPTIDEX (20% off, $0.48/mg). Listed in both injectable and topical research forms.`,
  },

  // ─── LOW COMMERCIAL INTENT ──────────────────────────────────────────────────

  'nad': {
    intent: 'low',
    wordCount: 51,
    text: `NAD+ (nicotinamide adenine dinucleotide) is the central coenzyme in cellular energy metabolism; research by Sinclair et al. has examined its role in sirtuin activation, DNA repair, and age-related decline. PeptiDex compares COAs across vendors. PeptiDex index price: Amino Club, $55.99 per 500mg vial with code PEPTIDEX (20% off). Research use only.`,
  },

  'epitalon': {
    intent: 'low',
    wordCount: 49,
    text: `Epitalon (Ala-Glu-Asp-Gly) is a synthetic tetrapeptide studied for telomerase activation and pineal gland function; Khavinson's original research reported telomere elongation in human cell cultures. Controlled human evidence is limited. PeptiDex index price: Bio Longevity Labs, 20mg vials at $56.98 ($2.85/mg). Use code PEPTIDEX for 15% off (stacks with sales).`,
  },

  '5-amino-1mq': {
    intent: 'low',
    wordCount: 57,
    text: `5-Amino-1MQ is an NNMT inhibitor studied in preclinical models of adipose tissue metabolism and energy expenditure; the Neelakantan et al. 2022 study reported reduced fat mass in diet-induced obese mice without affecting lean mass. Human data are limited. PeptiDex index price: Bio Longevity Labs, 10mg vials at $74.97. Use code PEPTIDEX for 15% off (stacks with sales).`,
  },

  'slu-pp-332': {
    intent: 'low',
    wordCount: 62,
    text: `SLU-PP-332 is an ERRα/ERRγ agonist studied in mice as a candidate exercise mimetic that upregulates mitochondrial biogenesis and oxidative metabolism pathways; the Burris lab's 2023 ACS Chemical Biology paper reported increased endurance capacity in sedentary mice. PeptiDex index listing: Limitless Life Nootropics, $118.99 for 250mcg × 60 capsules with code PEPTIDEX for 15% off (normally $139.99), USA-manufactured, third-party tested at ≥99% purity.`,
  },
};
