/**
 * Per-peptide custom FAQ overrides.
 * 
 * These supplement the auto-generated FAQs in PeptideFAQExpanded.
 * For the top 12 high-traffic peptides, add custom questions here.
 * For the rest, a TODO stub is included — populate when content is written.
 * 
 * Format: Record<peptide-slug, Array<{q, a}>>
 * These are ADDED to the standard 8 auto-generated questions, not replacing them.
 */

export interface FAQItem {
  q: string;
  a: string;
}

export const peptideFAQOverrides: Record<string, FAQItem[]> = {
  'bpc-157': [
    {
      q: 'Does BPC-157 need to be refrigerated?',
      a: 'Like most research peptides, lyophilized (dry powder) BPC-157 is generally stored in a cool, dry place away from light, and refrigeration is standard. Storage specifications vary by product, so check the vendor\'s documentation for the specific batch.',
    },
    {
      q: 'Has BPC-157 been studied by the oral route?',
      a: 'Yes. BPC-157 has been studied by both oral and injected routes in animal models, and rodent studies have reported systemic effects with oral administration. Human data for any route remain limited.',
    },
    {
      q: 'How does BPC-157 compare to TB-500?',
      a: 'BPC-157 primarily promotes tissue healing through angiogenesis (new blood vessel formation) and growth factor upregulation. TB-500 (Thymosin Beta-4) promotes cell migration and regeneration. Many research protocols combine both for synergistic injury recovery effects.',
    },
  ],

  'tb-500': [
    {
      q: 'What is the difference between TB-500 and Thymosin Beta-4?',
      a: 'TB-500 is a synthetic peptide derived from the active region of Thymosin Beta-4 (Tβ4), specifically the actin-binding domain. It is considered functionally similar but easier to synthesize. Full-length Thymosin Beta-4 is a naturally occurring protein; TB-500 is the research-grade fragment most commonly studied.',
    },
    {
      q: 'Can TB-500 and BPC-157 be combined?',
      a: 'Yes — stacking TB-500 with BPC-157 is one of the most common research protocols for injury recovery. BPC-157 targets angiogenesis and growth factor pathways, while TB-500 focuses on actin regulation and cell migration. The mechanisms are complementary and the combination is widely studied.',
    },
  ],

  'ghk-cu': [
    {
      q: 'What is GHK-Cu and what does it do?',
      a: 'GHK-Cu (copper peptide) is a naturally occurring tripeptide found in human plasma, saliva, and urine. It binds copper ions and has been studied for wound healing, skin remodeling, anti-inflammatory effects, and collagen synthesis stimulation. It naturally declines with age.',
    },
    {
      q: 'Can GHK-Cu be applied topically?',
      a: 'Yes — GHK-Cu is widely used in topical skincare formulations and has been studied in cream and serum forms for wound healing and skin regeneration. It is also studied as a subcutaneous injectable in research settings. Topical application is the most accessible form.',
    },
  ],

  'ipamorelin': [
    {
      q: 'Is ipamorelin better than GHRP-2 or GHRP-6?',
      a: 'Ipamorelin is often preferred in research protocols because it produces clean GH release without significant cortisol or prolactin elevation — a key advantage over GHRP-2 (which raises cortisol) and GHRP-6 (which causes pronounced hunger). This selectivity is a key reason ipamorelin is frequently studied.',
    },
    {
      q: 'Is ipamorelin often combined with CJC-1295?',
      a: 'Yes — the ipamorelin + CJC-1295 combination is one of the most commonly researched GH secretagogue protocols. Ipamorelin triggers pulsatile GH release, while CJC-1295 (DAC) extends the GH release window by binding to albumin. The combination amplifies GH output more than either compound alone.',
    },
  ],

  'cjc-1295': [
    {
      q: 'What is the difference between CJC-1295 with DAC and without DAC (mod GRF 1-29)?',
      a: 'CJC-1295 with DAC (Drug Affinity Complex) binds to albumin in the bloodstream, extending its half-life to approximately 6–8 days and producing sustained GH release. CJC-1295 without DAC (also called Mod GRF 1-29) has a half-life of ~30 minutes and produces a more pulsatile, natural GH pattern.',
    },
  ],

  'pt-141': [
    {
      q: 'Is PT-141 the same as bremelanotide?',
      a: 'Yes — PT-141 is the research name for bremelanotide, which is FDA-approved under the brand name Vyleesi for hypoactive sexual desire disorder (HSDD) in premenopausal women. It is a melanocortin receptor agonist that acts centrally (on the brain), unlike PDE5 inhibitors which act peripherally.',
    },
    {
      q: 'How was PT-141 studied in clinical trials?',
      a: 'In its Phase 3 clinical trials, PT-141 (bremelanotide) was given subcutaneously to premenopausal women with HSDD, with outcomes measured against placebo. FDA-approved labeling for Vyleesi specifies the dose; see the prescribing information.',
    },
  ],

  'epitalon': [
    {
      q: 'Is epitalon the same as epithalon?',
      a: 'Yes — "epitalon" and "epithalon" are both common spellings for the same tetrapeptide (Ala-Glu-Asp-Gly), also referred to as Epithalamin. It is derived from the pineal gland peptide extract Epithalamin and is most studied for its purported effects on telomerase activation and longevity.',
    },
  ],

  'sermorelin': [
    {
      q: 'Is sermorelin still available by prescription?',
      a: 'Sermorelin was previously FDA-approved (as Geref) for growth hormone deficiency in children but was voluntarily withdrawn from the market in 2008. It is currently available as a compounded prescription medication from licensed compounding pharmacies in the US, commonly prescribed for adult GH deficiency and anti-aging applications.',
    },
  ],

  'semax': [
    {
      q: 'Is semax available in the United States?',
      a: 'Semax is not FDA-approved or commercially available in the US. It is an approved pharmaceutical in Russia (for stroke recovery and cognitive enhancement). In the US, it is sold only as a research compound labeled for laboratory use and is not approved for human use. Always verify local regulatory status.',
    },
  ],

  // ── Stubs for remaining peptides — populate when content is written ────────

  'aod-9604': [
    // TODO: Add custom FAQs for AOD-9604 (e.g., "Is AOD-9604 legal?", "Does AOD-9604 raise insulin?")
  ],
  'dsip': [
    // TODO: Add custom FAQs for DSIP
  ],
  'follistatin-344': [
    // TODO: Add custom FAQs for Follistatin-344
  ],
  'ghrp-2': [
    // TODO: Add custom FAQs for GHRP-2
  ],
  'ghrp-6': [
    // TODO: Add custom FAQs for GHRP-6
  ],
  'glutathione': [
    // TODO: Add custom FAQs for Glutathione
  ],
  'hexarelin': [
    // TODO: Add custom FAQs for Hexarelin
  ],
  'igf-1-lr3': [
    // TODO: Add custom FAQs for IGF-1-LR3
  ],
  'kisspeptin-10': [
    // TODO: Add custom FAQs for Kisspeptin-10
  ],
  'kpv': [
    // TODO: Add custom FAQs for KPV
  ],
  'melanotan-ii': [
    // TODO: Add custom FAQs for Melanotan II
  ],
  'mots-c': [
    {
      q: 'What does MOTS-c do and why is it called an exercise mimetic?',
      a: 'MOTS-c is a mitochondria-derived peptide that activates AMPK — the same metabolic master switch triggered by exercise and metformin. Lee et al. (Cell Metabolism, 2015) first characterized MOTS-c\'s role in metabolic homeostasis. It\'s called an exercise mimetic because it upregulates genes involved in glucose metabolism and fatty acid oxidation without physical activity, though it is not a replacement for exercise.',
    },
    {
      q: 'Where can I buy MOTS-c for research?',
      a: 'MOTS-c is available from Amino Club at $39.99/10mg (use code PEPTIDEX for 20% off → $31.99, or $3.20/mg), Bio Longevity Labs at $65.98/10mg, and Ascension Peptides at $75/10mg. Amino Club has the lowest verified price-per-mg in my index. Research compound only.',
    },
  ],
  'nad': [
    {
      q: 'What is the difference between injectable NAD+ and oral NMN/NR supplements?',
      a: 'Oral NMN and NR are NAD+ precursors — they must be converted to NAD+ in the body through enzymatic pathways. Injectable NAD+ bypasses this conversion entirely, delivering the active coenzyme directly. Whether injectable NAD+ produces clinically superior outcomes versus oral precursors remains an active research question (Braidy et al., 2019 review covers the landscape). Both forms are used in longevity research contexts.',
    },
    {
      q: 'Where can I buy NAD+ for research?',
      a: 'Injectable NAD+ is available from Amino Club at $55.99/500mg after the PEPTIDEX code (20% off), and Ascension Peptides at competitive pricing with PEPTIDEX 50% off. At 663.4 Da, NAD+ is a well-characterized coenzyme and vendor testing is typically standard HPLC. Research compound only.',
    },
  ],
  'selank': [
    // TODO: Add custom FAQs for Selank
  ],
  'ss-31': [
    // TODO: Add custom FAQs for SS-31
  ],
  'tesamorelin': [
    {
      q: 'Is tesamorelin FDA-approved?',
      a: 'Yes — tesamorelin is the only FDA-approved GHRH analog, marketed as Egrifta by Theratechnologies. It is approved specifically for reduction of excess abdominal fat in HIV-infected patients with lipodystrophy. Research-grade tesamorelin sold by peptide vendors is labeled for laboratory research use only.',
    },
    {
      q: 'What did the tesamorelin visceral fat trials find?',
      a: 'Tesamorelin stimulates pulsatile growth hormone release from the pituitary. In a pooled analysis of two Phase 3 trials in HIV-associated lipodystrophy, visceral adipose tissue decreased significantly with tesamorelin versus placebo, while abdominal subcutaneous fat was preserved (PMID: 20554713). That trial supports its FDA-approved indication (Egrifta); effects on visceral fat outside that population are investigational.',
    },
    {
      q: 'Where can I buy tesamorelin for research?',
      a: 'Tesamorelin is available from Amino Club at $69.99/10mg (use code PEPTIDEX for 20% off → $55.99, $5.60/mg), Ascension Peptides at $80/5mg, and Bio Longevity Labs at $89.98/10mg. Amino Club has the lowest verified price-per-mg. Full disclosure — PEPTIDEX is my affiliate code.',
    },
  ],
  'thymosin-alpha-1': [
    // TODO: Add custom FAQs for Thymosin Alpha-1
  ],
};
