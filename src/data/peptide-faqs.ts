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
      a: 'Lyophilized (dry powder) BPC-157 should be stored in a cool, dry place away from light — refrigeration is recommended. Once reconstituted with bacteriostatic water, it should be refrigerated and used within 28–30 days. Avoid freezing the reconstituted solution.',
    },
    {
      q: 'Can BPC-157 be taken orally?',
      a: 'BPC-157 has been studied in both oral and injectable forms in animal models. Oral administration has shown systemic effects in rodent studies, but injectable (subcutaneous or intramuscular) protocols are more commonly used in research contexts for predictable bioavailability.',
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

  'tirzepatide': [
    {
      q: 'What is the difference between tirzepatide and semaglutide?',
      a: 'Tirzepatide is a dual GIP/GLP-1 receptor agonist, meaning it activates both incretin pathways simultaneously. Semaglutide only activates the GLP-1 receptor. In the SURMOUNT-5 trial, tirzepatide produced significantly greater weight loss (47% vs 25% achieving ≥25% weight reduction) compared to semaglutide. Tirzepatide is FDA-approved under the brand names Mounjaro (diabetes) and Zepbound (weight management).',
    },
    {
      q: 'How long does it take for tirzepatide to work?',
      a: 'Most clinical trial participants report appetite reduction within the first 1–4 weeks. Meaningful weight loss (5%+) typically occurs within 4–8 weeks at therapeutic doses. Maximum efficacy is generally observed at 36+ weeks of sustained treatment at the target maintenance dose.',
    },
    {
      q: 'Is tirzepatide a peptide?',
      a: 'Yes. Tirzepatide is a synthetic 39-amino acid polypeptide. It is a dual glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptor agonist, FDA-approved for type 2 diabetes and chronic weight management.',
    },
  ],

  'semaglutide': [
    {
      q: 'What is the difference between semaglutide and Ozempic, Wegovy, and Rybelsus?',
      a: 'All three are brand names for semaglutide. Ozempic (injectable, weekly) is FDA-approved for type 2 diabetes. Wegovy (injectable, weekly, higher dose) is FDA-approved for chronic weight management. Rybelsus is the oral form, approved for type 2 diabetes. The active molecule is the same in all three.',
    },
    {
      q: 'Is compounded semaglutide the same as Ozempic?',
      a: 'Compounded semaglutide is produced by licensed compounding pharmacies and contains the same active molecule but is not manufactured under the same FDA oversight as branded products. Compounding was allowed during the FDA-declared Ozempic/Wegovy shortage (2022–2025) but faced new restrictions in 2025. Always verify regulatory status before sourcing.',
    },
  ],

  'retatrutide': [
    {
      q: 'What is retatrutide?',
      a: 'Retatrutide (LY3437943) is an investigational triple agonist peptide (GLP-1/GIP/glucagon receptor) currently in Phase 3 clinical trials (TRIUMPH program) by Eli Lilly. It is not yet FDA-approved. Phase 2 data showed mean weight loss of up to 24.2% body weight at 48 weeks at the 12mg dose — the highest reported for any anti-obesity candidate in a controlled trial. It is a research compound only.',
    },
    {
      q: 'How does retatrutide compare to tirzepatide?',
      a: 'Retatrutide adds glucagon receptor agonism to the dual GIP/GLP-1 mechanism of tirzepatide. The glucagon component drives higher resting energy expenditure — subjects in the Phase 2 trial didn\'t just eat less, they burned more at baseline. The NAFLD sub-study (Nature Medicine 2024) showed ~90% steatosis resolution at 48 weeks, which tirzepatide hasn\'t matched. Head-to-head trials have not yet been completed.',
    },
    {
      q: 'What is the research dosing protocol for retatrutide?',
      a: 'In the Phase 2 trial, subjects received escalating weekly subcutaneous injections starting at 0.5mg and titrating up to 12mg over several weeks. The reconstitution protocol for research-grade vials typically uses 2.5ml bacteriostatic water per 10mg vial. This is not medical advice — all dosing information is from published clinical trial protocols for educational reference only. Source: Jastreboff et al., NEJM 2023, PMID 37351564.',
    },
    {
      q: 'What is the best coupon code for retatrutide?',
      a: 'The code PEPTIDEX provides 20% off retatrutide at Amino Club ($69.99 → $55.99 per 10mg vial, or $5.60/mg). At Ascension Peptides, PEPTIDEX gives 50% off list price. Other codes circulating (THANKYOU, AMINOS, CLUB40) typically provide 10–15% off and don\'t stack with sales — PEPTIDEX is the only code I\'ve verified at 20% flat at Amino Club with consistent availability. Full disclosure — PEPTIDEX is my affiliate code and I earn a commission. I use these vendors because they provide batch-specific third-party COA documentation that I can independently verify.',
    },
    {
      q: 'How long does retatrutide take to work?',
      a: 'Based on the Phase 2 trial timeline, subjects typically experienced appetite reduction within the first 1–2 weeks. Measurable weight loss was observed by weeks 2–4, with the trajectory accelerating through the dose-escalation phase. By months 2–3, subjects at therapeutic doses had achieved 10–15% body weight reduction. Maximum efficacy (24.2% mean body weight loss) was observed at 48 weeks at the 12mg dose level. Source: Jastreboff et al., NEJM 2023.',
    },
    {
      q: 'Can I trust the COAs from research peptide vendors?',
      a: 'COAs are only trustworthy when they\'re batch-specific, recent, and from a reputable third-party lab. I cross-reference every vendor COA against three criteria: (1) batch ID matches the vial received, (2) testing lab is independent — MZ Biolabs, Janoshik, Anresco, not in-house — and (3) molecular weight matches the reference compound. For retatrutide, the reference MW is 4731.4 Da. Vendors offering only generic "purity certificates" without batch IDs are not verified sources — I exclude them from my index regardless of pricing.',
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
      a: 'Ipamorelin is often preferred in research protocols because it produces clean GH release without significant cortisol or prolactin elevation — a key advantage over GHRP-2 (which raises cortisol) and GHRP-6 (which causes pronounced hunger). This makes ipamorelin a popular choice for longer research cycles.',
    },
    {
      q: 'Is ipamorelin often combined with CJC-1295?',
      a: 'Yes — the ipamorelin + CJC-1295 combination is one of the most commonly researched GH secretagogue protocols. Ipamorelin triggers pulsatile GH release, while CJC-1295 (DAC) extends the GH release window by binding to albumin. The combination amplifies GH output more than either compound alone.',
    },
  ],

  'cjc-1295': [
    {
      q: 'What is the difference between CJC-1295 with DAC and without DAC (mod GRF 1-29)?',
      a: 'CJC-1295 with DAC (Drug Affinity Complex) binds to albumin in the bloodstream, extending its half-life to approximately 6–8 days and producing sustained GH release. CJC-1295 without DAC (also called Mod GRF 1-29) has a half-life of ~30 minutes and produces a more pulsatile, natural GH pattern. The choice depends on the protocol goals.',
    },
  ],

  'pt-141': [
    {
      q: 'Is PT-141 the same as bremelanotide?',
      a: 'Yes — PT-141 is the research name for bremelanotide, which is FDA-approved under the brand name Vyleesi for hypoactive sexual desire disorder (HSDD) in premenopausal women. It is a melanocortin receptor agonist that acts centrally (on the brain), unlike PDE5 inhibitors which act peripherally.',
    },
    {
      q: 'How long does PT-141 take to work?',
      a: 'In clinical trials, PT-141 (bremelanotide) typically produces effects within 45–90 minutes of subcutaneous administration. The recommended clinical dose (Vyleesi) is 1.75mg approximately 45 minutes before anticipated sexual activity, with effects lasting up to 12–24 hours in some subjects.',
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
      a: 'Semax is not FDA-approved or commercially available in the US. It is an approved pharmaceutical in Russia (for stroke recovery and cognitive enhancement). In the US, it is available only as a research chemical from peptide research vendors and is not legal for human use. Always verify local regulatory status.',
    },
  ],

  // ── Stubs for remaining peptides — populate when content is written ────────

  'aod-9604': [
    // TODO: Add custom FAQs for AOD-9604 (e.g., "Is AOD-9604 legal?", "Does AOD-9604 raise insulin?")
  ],
  'cagrilintide': [
    {
      q: 'What is cagrilintide and how does CagriSema work?',
      a: 'Cagrilintide (NN9838) is a long-acting amylin analog developed by Novo Nordisk. CagriSema is the investigational combination of cagrilintide + semaglutide, targeting both amylin and GLP-1 receptors simultaneously. Early data suggests CagriSema achieves greater weight loss than semaglutide alone because amylin and GLP-1 work through distinct, non-overlapping mechanisms — amylin slows gastric emptying and reduces glucagon, while GLP-1 suppresses appetite centrally.',
    },
    {
      q: 'Where can I buy cagrilintide for research?',
      a: 'Cagrilintide is available from Amino Club at $69.99/10mg (use code PEPTIDEX for 20% off → $55.99, or $5.60/mg) and Ascension Peptides at $115/10mg on sale. It is a research compound only — not FDA-approved. CagriSema Phase 3 (REDEFINE program) data is expected in 2026.',
    },
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
      a: 'Yes — tesamorelin is the only FDA-approved GHRH analog, marketed as Egrifta by Theratechnologies. It is approved specifically for reduction of excess abdominal fat in HIV-infected patients with lipodystrophy. Research-grade tesamorelin is also available from peptide research vendors for off-label investigation.',
    },
    {
      q: 'How does tesamorelin reduce visceral fat specifically?',
      a: 'Tesamorelin stimulates pulsatile growth hormone release from the pituitary, which preferentially targets visceral adipose tissue (VAT) over subcutaneous fat. The Phase 3 SEROSTIM trials showed a 17.5% reduction in trunk fat. This selectivity for visceral vs. subcutaneous fat is unique among GH-axis compounds and is the primary reason tesamorelin is studied for body composition beyond just scale weight.',
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
