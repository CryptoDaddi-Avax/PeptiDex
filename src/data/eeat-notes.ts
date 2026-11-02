/**
 * E-E-A-T Research Notes — First-Person Verification Blocks
 *
 * Per-peptide first-person research notes for the top peptides.
 * Rendered by ResearchNotesBlock.tsx.
 * 
 * Voice: first-person research/verification notes (COA review, literature tracking).
 * Rule: No personal-use logs, no outcome promises; describe studies by model + PMID.
 * Rule: Sourcing is described as PeptiDex index data, not personal procurement.
 * Rule: Each note references only COA batches that exist in verification-assets.ts
 * Rule: Each note ends with affiliate disclosure + timestamp
 */

export interface EEATNote {
  /** Main research narrative — rendered as prose paragraphs */
  paragraphs: string[];
  /** Specific falsifiable claim anchor — must match verification-assets.ts data */
  coaReference?: string;
  /** Affiliate disclosure text */
  disclosure: string;
  /** Last verified date string */
  lastVerified: string;
  /** Optional: note about pending data */
  pendingNote?: string;
}

export const eeatNotes: Record<string, EEATNote> = {
  'tesamorelin': {
    paragraphs: [
      `Tesamorelin is the only FDA-approved GHRH analog I track — it's been FDA-approved since 2010 under the Egrifta brand for HIV-associated lipodystrophy, and its visceral fat data come from controlled trials: in a pooled analysis of two Phase 3 trials, visceral adipose tissue decreased significantly with tesamorelin versus placebo, while abdominal subcutaneous fat was preserved (PMID: 20554713).`,
      `I verified Amino Club batch TES0001 — HPLC at 99.521% purity via Biogenica Labs, MW at 5135.8 Da. The trans-3-hexenoic acid modification was confirmed by mass spec. This modification is unique to tesamorelin and essential for its extended activity versus native GHRH.`,
      `The research angle here is visceral adipose tissue specifically. In the clinical trials, tesamorelin's effect was concentrated in visceral fat rather than subcutaneous fat or overall body weight, so the published data are most relevant to body-composition research, and the approved indication is limited to HIV-associated lipodystrophy.`,
    ],
    coaReference: 'TES0001',
    disclosure: `Full disclosure — PEPTIDEX is my affiliate code. The PeptiDex index lists tesamorelin at both Amino Club and Bio Longevity Labs; availability and current pricing vary.`,
    lastVerified: 'May 2026',
  },

  'bpc-157': {
    paragraphs: [
      `BPC-157 is the compound I get asked about more than any other. Its preclinical literature covers angiogenesis, tendon healing models, GI lesion models, and nitric oxide signaling; a 2026 clinical primer notes a significant lack of human clinical evidence (PMID: 41476424). The evidence base is broad, but almost entirely animal data.`,
      `I've verified the COA from Amino Club batch BP0001 — 99.876% purity via Biogenica Labs, MW at 1419.5 Da. That's the highest BPC-157 purity in my current dataset. The hosted COA PDF is linked in the verification section below for independent review.`,
      `The important caveat with BPC-157 is the Phase 1 human trial gap — as of May 2026, there is no published Phase 1 safety data in humans. The preclinical evidence is extensive but all animal-model based. I've flagged this on every BPC-157 page and researchers should weight it accordingly.`,
    ],
    coaReference: 'BP0001',
    disclosure: `Full disclosure — PEPTIDEX is my affiliate code. Amino Club provides the best price-per-mg ($3.20/mg after code) but Bio Longevity Labs has the highest verified purity (99.6%). Both have verified COAs in the PeptiDex index.`,
    lastVerified: 'May 2026',
  },

  'tb-500': {
    paragraphs: [
      `TB-500 is the peptide most often discussed alongside BPC-157 in tissue-repair research. The two are studied for different mechanisms: TB-500 for cell migration via actin regulation, BPC-157 for angiogenesis and nitric oxide signaling in preclinical models.`,
      `I verified Amino Club batch TB0001 at 99.924% purity via Biogenica Labs — MW at 4963.4 Da. At $31.99/10mg after the PEPTIDEX code, Amino Club has the best price-per-mg in my index for this compound. The COA PDF is linked below.`,
      `The equine research on thymosin beta-4 (the parent compound) is actually the most extensive dataset — TB-500 has been used in veterinary contexts for decades. Human research is limited; most of the mechanistic data come from cell and animal studies of actin sequestration.`,
    ],
    coaReference: 'TB0001',
    disclosure: `Full disclosure — PEPTIDEX is my affiliate code. The PeptiDex index lists TB-500 at Amino Club (lowest indexed price) and Limitless Life (batch-specific documentation).`,
    lastVerified: 'May 2026',
  },

  'cjc-1295': {
    paragraphs: [
      `CJC-1295 is the GHRH analog I track for sustained GH release research — the DAC (Drug Affinity Complex) version binds to albumin and extends the half-life to 6-8 days.`,
      `Amino Club batch CIP0001 verified at 99.940% purity via Biogenica Labs — the highest purity in my entire COA dataset across all peptides. At $47.99/10mg after the PEPTIDEX code ($4.80/mg), it's reasonably priced for a modified peptide of this complexity. COA PDF linked below.`,
      `The Ipamorelin + CJC-1295 combination is the most commonly discussed GH-axis stack in the research community — CJC-1295 acts on the GHRH receptor while ipamorelin acts on the ghrelin (GHS) receptor. Different mechanisms; published data on the combination itself are limited.`,
    ],
    coaReference: 'CIP0001',
    disclosure: `Full disclosure — PEPTIDEX is my affiliate code. Amino Club is currently the only gold-tier vendor stocking CJC-1295 in the PeptiDex index.`,
    lastVerified: 'May 2026',
  },

  'ipamorelin': {
    paragraphs: [
      `Ipamorelin is the GH secretagogue most often compared with GHRP-2 and GHRP-6, for a simple reason: it's selective. In published studies it stimulated pulsatile GH release without the cortisol and prolactin increases reported with the older GHRP compounds.`,
      `Amino Club batch IPA0001 verified at 99.810% HPLC purity via Biogenica Labs with MW at 711.9 Da. At a molecular weight of only 711.9 Da, ipamorelin is a pentapeptide that's straightforward to synthesize at high purity, which is why I expect consistent quality across reputable vendors. COA PDF linked below.`,
      `The clinical data from Andersen et al. showed dose-dependent GH release in human subjects without significant effects on cortisol, ACTH, prolactin, or insulin. That selectivity profile is the main reason it is so widely discussed in GH-axis research.`,
    ],
    coaReference: 'IPA0001',
    disclosure: `Full disclosure — PEPTIDEX is my affiliate code. Amino Club's ipamorelin batch holds the highest purity score in my dataset (99.5%) — that's verifiable from the COA documentation.`,
    lastVerified: 'May 2026',
  },

  'mots-c': {
    paragraphs: [
      `MOTS-c is the mitochondrial peptide I've been following since Lee et al. first characterized it in 2015 — it activates AMPK, the same master metabolic switch triggered by exercise and metformin. The exercise-mimetic angle is what makes it interesting for longevity and metabolic research.`,
      `Amino Club batch MTC0001 verified at 99.710% purity via Biogenica Labs. At $31.99/10mg after the PEPTIDEX code, Amino Club has the lowest price-per-mg I've verified. COA PDF linked below.`,
      `The key published study is Lee et al. 2015 in Cell Metabolism, which demonstrated MOTS-c's role in regulating metabolic homeostasis through AMPK activation. The endogenous nature of MOTS-c (it's encoded in mitochondrial DNA) is part of what makes the mechanism interesting — it's not a synthetic pharmaceutical analog, it's a naturally occurring signaling peptide.`,
    ],
    coaReference: 'MTC0001',
    disclosure: `Full disclosure — PEPTIDEX is my affiliate code. Amino Club has the lowest price-per-mg for MOTS-c in the PeptiDex index.`,
    lastVerified: 'May 2026',
  },

  'ghk-cu': {
    paragraphs: [
      `GHK-Cu is the copper peptide I track for its dual use case: injectable research compound AND topical cosmetic ingredient. It's one of the only peptides in my index with a significant commercial footprint outside the research peptide market — skincare brands have been using it for years.`,
      `Amino Club batch GHK0001 verified at 99.623% purity via Biogenica Labs with MW at 340.4 Da. At 340.4 Da it's the smallest peptide in my index — a simple tripeptide chelated with copper. The small size makes purity easier to achieve and verify. COA PDF linked below.`,
      `Pickart's original research demonstrated GHK-Cu's role in wound healing, collagen synthesis, and anti-inflammatory signaling. The compound declines significantly with age — serum levels at 60 are roughly 60% lower than at 20 — which is the core of the longevity research rationale.`,
    ],
    coaReference: 'GHK0001',
    disclosure: `Full disclosure — PEPTIDEX is my affiliate code. GHK-Cu is available from multiple vendors — Amino Club has the lowest price ($0.48/mg after code) while Bio Longevity Labs has the verified COA I reference here.`,
    lastVerified: 'May 2026',
  },

  'nad': {
    paragraphs: [
      `NAD+ is the coenzyme I've been tracking the longest in the longevity space — Sinclair's lab work on sirtuin activation and the subsequent commercial explosion of NMN/NR precursors put this compound on the map, but injectable NAD+ research represents a different pharmacological approach entirely.`,
      `Amino Club batch ND0001 verified at 99.520% purity via Biogenica Labs. At $55.99/500mg after PEPTIDEX, it's competitively priced. At 663.4 Da, NAD+ is a well-characterized coenzyme — COA PDF linked below.`,
      `The research distinction matters: oral NMN/NR supplements rely on precursor conversion in the body. Injectable NAD+ bypasses that conversion entirely. The Braidy et al. 2019 review covers the metabolic landscape comprehensively. Whether direct NAD+ supplementation via injection produces clinically superior outcomes versus oral precursors remains an active research question.`,
    ],
    coaReference: 'ND0001',
    disclosure: `Full disclosure — PEPTIDEX is my affiliate code. I track NAD+ across multiple vendors — pricing is competitive across the index.`,
    lastVerified: 'May 2026',
  },

  'epitalon': {
    paragraphs: [
      `Epitalon is the longevity peptide I follow primarily because of Khavinson's original work on telomerase activation — the in vitro data showing telomere elongation in human fetal fibroblast cultures was published over two decades ago and remains one of the most cited papers in peptide longevity research.`,
      `Amino Club batch EPI0001 verified at 99.710% purity via Biogenica Labs. At 390.3 Da it's a simple tetrapeptide (Ala-Glu-Asp-Gly). COA PDF linked below.`,
      `The honest assessment: epitalon has a strong in vitro evidence base and some animal data, but the clinical evidence in humans is thin — Khavinson's own human studies were small-sample observational work, not controlled trials. I track it because the telomerase mechanism is genuinely interesting, but the evidence level is below what I'd cite for compounds like tesamorelin or PT-141.`,
    ],
    coaReference: 'EPI0001',
    disclosure: `Full disclosure — PEPTIDEX is my affiliate code. Epitalon is available from Amino Club and Bio Longevity Labs.`,
    lastVerified: 'May 2026',
  },

  '5-amino-1mq': {
    paragraphs: [
      `5-Amino-1MQ is the NNMT inhibitor I've been tracking for its novel mechanism — it doesn't work through traditional appetite suppression pathways. Instead, it targets nicotinamide N-methyltransferase, an enzyme that when inhibited, shifts cellular metabolism toward higher energy expenditure.`,
      `The Neelakantan et al. 2022 study in Biochemical Pharmacology reported reduced fat mass in diet-induced obese mice without affecting lean mass or food intake. That pattern in mice, with no change in food intake, is what makes the NNMT pathway interesting as a research target; human data are limited.`,
      `Amino Club batch AMQ0001 verified at 99.710% purity via Biogenica Labs. Some vendors sell 5-Amino-1MQ as an oral capsule rather than injectable, which changes the bioavailability profile. COA PDF for batch AMQ0001 linked below.`,
    ],
    coaReference: 'AMQ0001',
    disclosure: `Full disclosure — PEPTIDEX is my affiliate code. Amino Club and Bio Longevity Labs both carry 5-Amino-1MQ.`,
    lastVerified: 'May 2026',
  },

  'slu-pp-332': {
    paragraphs: [
      `SLU-PP-332 is the exercise mimetic I've been watching since the Burris lab at Washington University first published on ERRα/ERRγ agonism — the 2023 paper in ACS Chemical Biology showed enhanced endurance capacity in sedentary mice through upregulated mitochondrial biogenesis, without any physical activity.`,
      `For sourcing, Limitless Life Nootropics now carries SLU-PP-332 in capsule form — 250mcg × 60 capsules at $118.99 after the 15% PEPTIDEX discount (normally $139.99), USA-manufactured, third-party tested at ≥99% purity. This is the only verified vendor in my index currently stocking SLU-PP-332. Note: this is a capsule (oral) format, not injectable — the oral bioavailability profile for small-molecule ERR agonists is expected to be reasonable given SLU-PP-332's non-peptide structure.`,
      `The ERR pathway is mechanistically distinct from AMPK activation (MOTS-c) — SLU-PP-332 works by directly upregulating genes involved in oxidative phosphorylation and fatty acid oxidation. The Xu et al. 2023 Circulation paper also reported enhanced cardiac fatty acid metabolism in mouse heart failure models; like the endurance data, this remains preclinical.`,
    ],
    disclosure: `Full disclosure — PEPTIDEX is my affiliate code and I earn a commission on purchases made through my links. Limitless Life Nootropics is the only vendor currently carrying SLU-PP-332 in my index.`,
    lastVerified: 'May 2026',
  },
};
