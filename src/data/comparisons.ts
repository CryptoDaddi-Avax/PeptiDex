export interface Comparison {
  slug: string;
  peptideA: string;
  peptideB: string;
  title: string;
  subtitle: string;
  seoDescription: string;
  recommendation: string;
  tags: string[];
  color: 'violet' | 'emerald' | 'blue' | 'amber' | 'teal';
}

export const comparisons: Comparison[] = [
  {
    slug: 'bpc-157-vs-tb-500',
    peptideA: 'bpc-157',
    peptideB: 'tb-500',
    title: 'BPC-157 vs TB-500',
    subtitle: 'Healing & Recovery',
    seoDescription: 'Side-by-side research comparison of BPC-157 and TB-500: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `BPC-157 is better for localized, acute injuries like tendon tears or gut issues, while TB-500 is preferred for widespread muscle recovery and systemic inflammation. BPC-157 works primarily by upregulating growth factors (like VEGF) to build new blood vessels and collagen at the injury site. TB-500 works by regulating actin, allowing repair cells to migrate more easily through the body to damaged tissue. Choose BPC-157 if you have a specific joint, tendon, or ligament injury, or gastrointestinal distress. Choose TB-500 if you have general muscle damage, whole-body inflammation, or need to improve endurance and flexibility. For most researchers dealing with a specific injury, BPC-157 is the more targeted, evidence-backed default.`,
    tags: ['Healing', 'Research'],
    color: 'amber'
  },
  {
    slug: 'semaglutide-vs-tirzepatide',
    peptideA: 'semaglutide',
    peptideB: 'tirzepatide',
    title: 'Semaglutide vs Tirzepatide',
    subtitle: 'Weight Loss & GLP-1',
    seoDescription: 'Side-by-side research comparison of Semaglutide and Tirzepatide: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `Tirzepatide is better for maximizing total weight loss, while Semaglutide is a proven, often more affordable starting point for metabolic research. Semaglutide is a single-agonist that mimics only the GLP-1 hormone to reduce appetite and lower blood sugar. Tirzepatide is a dual-agonist that mimics both GLP-1 and GIP, creating a synergistic effect that typically results in greater fat loss and better tolerability. Choose Semaglutide if you are new to metabolic research and want the most established safety profile with solid results. Choose Tirzepatide if you want maximum efficacy, need to break through a plateau, or struggle with the gastrointestinal side effects of GLP-1 alone. For advanced weight loss research, Tirzepatide is the superior, more modern default.`,
    tags: ['Weight Loss', 'Research'],
    color: 'emerald'
  },
  {
    slug: 'tirzepatide-vs-retatrutide',
    peptideA: 'tirzepatide',
    peptideB: 'retatrutide',
    title: 'Tirzepatide vs Retatrutide',
    subtitle: 'Advanced Weight Loss',
    seoDescription: 'Side-by-side research comparison of Tirzepatide and Retatrutide: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `Retatrutide is better for extreme weight loss and lipid metabolism, while Tirzepatide remains the gold standard for balanced, well-tolerated metabolic research. Tirzepatide activates two receptors (GLP-1 and GIP) to reduce appetite and improve insulin sensitivity. Retatrutide activates three receptors (GLP-1, GIP, and Glucagon), adding a direct thermogenic effect that increases basal metabolic rate and burns stored fat. Choose Tirzepatide for a highly predictable, effective intervention with a strong safety profile. Choose Retatrutide if you are researching severe obesity, stubborn liver fat, or need to exceed the 20% weight loss threshold seen with dual-agonists. Tirzepatide remains the safer, more established default for general metabolic use.`,
    tags: ['Advanced', 'Research'],
    color: 'emerald'
  },
  {
    slug: 'cjc-1295-vs-sermorelin',
    peptideA: 'cjc-1295',
    peptideB: 'sermorelin',
    title: 'CJC-1295 vs Sermorelin',
    subtitle: 'Growth Hormone Secretagogues',
    seoDescription: 'Side-by-side research comparison of CJC-1295 and Sermorelin: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `CJC-1295 is better for sustained, steady growth hormone release, while Sermorelin is preferred for brief, highly natural pulses. Both are Growth Hormone Releasing Hormone (GHRH) analogs that signal the pituitary gland to produce more endogenous GH. However, Sermorelin has a very short half-life (minutes), creating a rapid spike and drop. CJC-1295 (especially with DAC) extends this half-life dramatically, elevating basal GH levels for days. Choose Sermorelin if your primary goal is improving sleep architecture with minimal disruption to natural hormone rhythms. Choose CJC-1295 if you want continuous 24/7 elevation of IGF-1 for maximum recovery and anti-aging benefits. For most researchers wanting noticeable body composition changes, CJC-1295 without DAC is the preferred middle-ground default.`,
    tags: ['Growth', 'Research'],
    color: 'violet'
  },
  {
    slug: 'cjc-1295-vs-ipamorelin',
    peptideA: 'cjc-1295',
    peptideB: 'ipamorelin',
    title: 'CJC-1295 vs Ipamorelin',
    subtitle: 'Growth Hormone Release',
    seoDescription: 'Side-by-side research comparison of CJC-1295 and Ipamorelin: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `These peptides are better used together than compared, but Ipamorelin is safer for mitigating side effects, while CJC-1295 provides a stronger basal GH elevation. They operate on completely different pathways: CJC-1295 is a GHRH analog that increases the amplitude of GH pulses, whereas Ipamorelin is a GHRP that mimics ghrelin to initiate the pulse itself. Choose Ipamorelin if you want a mild, safe GH boost without raising cortisol or prolactin. Choose CJC-1295 if you need a longer-acting signal. Because they are synergistic, the undisputed recommendation is to stack them (often sold as a blend) to maximize the pituitary's GH output safely.`,
    tags: ['Growth', 'Research'],
    color: 'violet'
  },
  {
    slug: 'ipamorelin-vs-ghrp-2',
    peptideA: 'ipamorelin',
    peptideB: 'ghrp-2',
    title: 'Ipamorelin vs GHRP-2',
    subtitle: 'GHRP Comparison',
    seoDescription: 'Side-by-side research comparison of Ipamorelin and GHRP-2: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `Ipamorelin is better for clean, side-effect-free anti-aging, while GHRP-2 is better for maximum GH release when hunger stimulation is acceptable. Both are Growth Hormone Releasing Peptides that mimic ghrelin. GHRP-2 is significantly more potent at stimulating GH but also causes a moderate increase in cortisol, prolactin, and appetite. Ipamorelin is unique among GHRPs because it does not increase cortisol or prolactin at any dose. Choose Ipamorelin for long-term use, sleep improvement, and gentle anti-aging. Choose GHRP-2 if you need aggressive recovery, appetite stimulation for bulking, or a stronger IGF-1 response. For the average researcher, Ipamorelin is the highly recommended default due to its pristine safety profile.`,
    tags: ['GHRP', 'Research'],
    color: 'violet'
  },
  {
    slug: 'ipamorelin-vs-ghrp-6',
    peptideA: 'ipamorelin',
    peptideB: 'ghrp-6',
    title: 'Ipamorelin vs GHRP-6',
    subtitle: 'GHRP Comparison',
    seoDescription: 'Side-by-side research comparison of Ipamorelin and GHRP-6: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `Ipamorelin is better for fat loss and clean GH elevation, while GHRP-6 is specifically preferred for stimulating extreme appetite. GHRP-6 is notorious for causing intense gastric motility and hunger within 20 minutes of administration, alongside moderate increases in cortisol and prolactin. Ipamorelin delivers a slower, smoother GH pulse without the intense hunger or stress hormone elevation. Choose Ipamorelin for body recomposition, anti-aging, and sleep. Choose GHRP-6 almost exclusively if you are researching cachexia (muscle wasting) or need massive appetite stimulation to gain weight. Ipamorelin is the overwhelmingly superior default for general research.`,
    tags: ['GHRP', 'Research'],
    color: 'violet'
  },
  {
    slug: 'ghrp-2-vs-ghrp-6',
    peptideA: 'ghrp-2',
    peptideB: 'ghrp-6',
    title: 'GHRP-2 vs GHRP-6',
    subtitle: 'First-Gen GHRPs',
    seoDescription: 'Side-by-side research comparison of GHRP-2 and GHRP-6: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `GHRP-2 is better for maximizing growth hormone output, while GHRP-6 is better for maximizing appetite. Both are first-generation GHRPs that elevate cortisol and prolactin alongside GH. However, GHRP-2 is roughly 30% more potent at stimulating the pituitary to release GH. Conversely, GHRP-6 acts much more strongly on the ghrelin receptors in the stomach, causing extreme hunger. Choose GHRP-2 if you want strong GH elevation and can tolerate mild hunger. Choose GHRP-6 only if your primary goal is appetite stimulation. For strictly GH-related research, GHRP-2 is the much more effective default of the two.`,
    tags: ['First-Gen', 'Research'],
    color: 'violet'
  },
  {
    slug: 'bpc-157-vs-ghk-cu',
    peptideA: 'bpc-157',
    peptideB: 'ghk-cu',
    title: 'BPC-157 vs GHK-Cu',
    subtitle: 'Tissue Repair & Anti-Aging',
    seoDescription: 'Side-by-side research comparison of BPC-157 and GHK-Cu: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `BPC-157 is better for deep structural injuries (tendons, gut), while GHK-Cu is better for superficial tissue repair, skin health, and systemic anti-aging. BPC-157 drives angiogenesis to bring blood flow to avascular tissues like ligaments. GHK-Cu is a copper-binding peptide that acts systemically to reset gene expression, upregulate collagen and elastin production, and reduce oxidative stress. Choose BPC-157 to rapidly heal a torn muscle or leaking gut. Choose GHK-Cu to improve skin elasticity, heal superficial wounds, grow hair, or reduce whole-body inflammation. For acute injuries, BPC-157 is the default; for longevity and aesthetics, GHK-Cu wins.`,
    tags: ['Repair', 'Research'],
    color: 'blue'
  },
  {
    slug: 'tesamorelin-vs-cjc-1295',
    peptideA: 'tesamorelin',
    peptideB: 'cjc-1295',
    title: 'Tesamorelin vs CJC-1295',
    subtitle: 'Fat Loss & GH',
    seoDescription: 'Side-by-side research comparison of Tesamorelin and CJC-1295: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `Tesamorelin is better for targeted visceral fat loss, while CJC-1295 is better for general anti-aging and recovery. Both are GHRH analogs. Tesamorelin is an FDA-approved formulation specifically designed to reduce visceral adipose tissue (hard belly fat) by creating massive, sharp spikes in GH that strongly trigger lipolysis. CJC-1295 provides a more moderate, sustained elevation of GH suitable for long-term use. Choose Tesamorelin if your primary goal is aggressive fat loss or reversing metabolic syndrome. Choose CJC-1295 if you want a cost-effective, long-term protocol for sleep, skin, and mild body recomposition. For pure fat loss, Tesamorelin is the premium default.`,
    tags: ['Fat', 'Research'],
    color: 'violet'
  },
  {
    slug: 'semaglutide-vs-retatrutide',
    peptideA: 'semaglutide',
    peptideB: 'retatrutide',
    title: 'Semaglutide vs Retatrutide',
    subtitle: 'Weight Loss Progression',
    seoDescription: 'Side-by-side research comparison of Semaglutide and Retatrutide: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `Retatrutide is better for maximizing total weight loss and resolving fatty liver, while Semaglutide is a proven, gentler starting point. Semaglutide is a single-agonist (GLP-1) that works primarily by delaying gastric emptying and signaling fullness to the brain. Retatrutide is a triple-agonist (GLP-1, GIP, Glucagon) that adds direct fat-burning via increased energy expenditure (thermogenesis). Choose Semaglutide if you are new to GLP-1s and want the most established safety profile. Choose Retatrutide if you have severe obesity, need to lose >20% of body weight, or want to avoid the extreme fatigue sometimes associated with Semaglutide. Tirzepatide is often the best middle ground between the two.`,
    tags: ['Progression', 'Research'],
    color: 'emerald'
  },
  {
    slug: 'tirzepatide-vs-semaglutide',
    peptideA: 'tirzepatide',
    peptideB: 'semaglutide',
    title: 'Tirzepatide vs Semaglutide',
    subtitle: 'GLP-1 vs Dual Agonist',
    seoDescription: 'Side-by-side research comparison of Tirzepatide and Semaglutide: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `Tirzepatide is generally superior for both total weight loss and tolerability, while Semaglutide is often more accessible and highly proven. Tirzepatide’s addition of GIP receptor agonism acts synergistically with GLP-1, buffering the nausea often caused by GLP-1 alone while enhancing insulin sensitivity. Semaglutide relies solely on the GLP-1 pathway. Choose Semaglutide for a cost-effective, highly studied intervention for moderate weight loss. Choose Tirzepatide for superior fat loss, better energy levels, and fewer GI side effects. In modern research protocols, Tirzepatide is increasingly considered the preferred default over Semaglutide.`,
    tags: ['GLP-1', 'Research'],
    color: 'emerald'
  },
  {
    slug: 'selank-vs-semax',
    peptideA: 'selank',
    peptideB: 'semax',
    title: 'Selank vs Semax',
    subtitle: 'Nootropics & Cognition',
    seoDescription: 'Side-by-side research comparison of Selank and Semax: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `Selank is better for anxiety relief and focus under stress, while Semax is better for pure cognitive stimulation and energy. Both are Russian-developed neuropeptides administered via nasal spray. Selank modulates the expression of BDNF and balances enkephalin degradation, producing a calm, clear-headed focus without sedation. Semax strongly stimulates the central nervous system and increases dopamine and serotonin, acting more like a clean stimulant. Choose Selank if you suffer from generalized anxiety, ADHD, or stress-induced brain fog. Choose Semax if you need intense focus for studying, combating sleep deprivation, or stroke recovery. Selank is the safer default for daily use.`,
    tags: ['Nootropics', 'Research'],
    color: 'teal'
  },
  {
    slug: 'bpc-157-vs-kpv',
    peptideA: 'bpc-157',
    peptideB: 'kpv',
    title: 'BPC-157 vs KPV',
    subtitle: 'Gut Health & Inflammation',
    seoDescription: 'Side-by-side research comparison of BPC-157 and KPV: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `BPC-157 is better for physically repairing damaged tissue, while KPV is better for halting acute autoimmune and allergic inflammation. BPC-157 rebuilds the gut lining by promoting angiogenesis and cellular migration. KPV (a tripeptide fragment of alpha-MSH) is a potent anti-inflammatory that works inside the cell to downregulate NF-kB, the master switch for inflammation, and also possesses antimicrobial properties. Choose BPC-157 to heal a leaky gut, ulcer, or structural injury. Choose KPV to calm an active autoimmune flare-up, mast cell activation, or severe skin inflammation. They are highly synergistic when stacked for severe GI issues.`,
    tags: ['Gut', 'Research'],
    color: 'amber'
  },
  {
    slug: 'ghk-cu-vs-bpc-157',
    peptideA: 'ghk-cu',
    peptideB: 'bpc-157',
    title: 'GHK-Cu vs BPC-157',
    subtitle: 'Anti-Aging vs Recovery',
    seoDescription: 'Side-by-side research comparison of GHK-Cu and BPC-157: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `GHK-Cu is the superior choice for cosmetic anti-aging and systemic longevity, whereas BPC-157 is the undisputed king of acute injury recovery. GHK-Cu operates at the epigenetic level, resetting thousands of genes to a younger state to improve skin, hair, and oxidative resilience. BPC-157 operates at the physiological level, driving blood vessel formation to rapidly heal torn connective tissue and gut lesions. Choose GHK-Cu for a long-term longevity protocol, wound healing, or skin tightening. Choose BPC-157 to recover from a sports injury or surgery. BPC-157 is the default for athletes, while GHK-Cu is the default for biohackers.`,
    tags: ['Anti-Aging', 'Research'],
    color: 'blue'
  },
  {
    slug: 'mots-c-vs-aod-9604',
    peptideA: 'mots-c',
    peptideB: 'aod-9604',
    title: 'MOTS-c vs AOD-9604',
    subtitle: 'Mitochondrial vs Fat Loss',
    seoDescription: 'Side-by-side research comparison of MOTS-c and AOD-9604: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `MOTS-c is better for improving metabolic function and exercise capacity, while AOD-9604 is specifically targeted at direct fat mobilization. MOTS-c is a mitochondrial-derived peptide that activates AMPK (the body's energy sensor), mimicking the effects of intense exercise to improve insulin sensitivity and energy production. AOD-9604 is a GH fragment that directly stimulates lipolysis in fat cells without affecting blood sugar. Choose MOTS-c if you want to improve endurance, reverse insulin resistance, and gain "exercise in a bottle" benefits. Choose AOD-9604 if your sole goal is lipolysis, particularly of stubborn visceral fat. MOTS-c offers broader, more profound metabolic health benefits.`,
    tags: ['Mitochondrial', 'Research'],
    color: 'teal'
  },
  {
    slug: 'hexarelin-vs-ipamorelin',
    peptideA: 'hexarelin',
    peptideB: 'ipamorelin',
    title: 'Hexarelin vs Ipamorelin',
    subtitle: 'Strong vs Mild GHRP',
    seoDescription: 'Side-by-side research comparison of Hexarelin and Ipamorelin: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `Hexarelin is the most potent GHRP for massive growth hormone spikes, but Ipamorelin is the safest and most sustainable for long-term use. Hexarelin induces a massive surge of GH but rapidly desensitizes receptors (limiting use to a few weeks) and significantly raises cortisol and prolactin. Ipamorelin provides a mild, clean GH pulse with zero desensitization and zero elevation of stress hormones. Choose Hexarelin only for very short, intensive recovery protocols or cardiac repair research. Choose Ipamorelin for a sustainable, side-effect-free anti-aging protocol. Ipamorelin is the highly recommended default for 99% of researchers.`,
    tags: ['Strong', 'Research'],
    color: 'violet'
  },
  {
    slug: 'll-37-vs-thymosin-alpha-1',
    peptideA: 'll-37',
    peptideB: 'thymosin-alpha-1',
    title: 'LL-37 vs Thymosin Alpha-1',
    subtitle: 'Immune System Support',
    seoDescription: 'Side-by-side research comparison of LL-37 and Thymosin Alpha-1: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `LL-37 is a direct antimicrobial agent that attacks pathogens, while Thymosin Alpha-1 (TA1) is an immune modulator that trains your body to fight infections itself. LL-37 binds to and breaks down the membranes of bacteria, viruses, and biofilms, making it highly effective against active, stubborn infections (like Lyme or SIBO). TA1 enhances the function of T-cells and dendritic cells, balancing an underactive or overactive immune system. Choose LL-37 as a targeted "smart bomb" for a specific chronic infection. Choose TA1 for long-term immune support, viral clearance, or autoimmune modulation. TA1 is the safer, more fundamental default.`,
    tags: ['Immune', 'Research'],
    color: 'blue'
  },
  {
    slug: 'epitalon-vs-mots-c',
    peptideA: 'epitalon',
    peptideB: 'mots-c',
    title: 'Epitalon vs MOTS-c',
    subtitle: 'Anti-Aging & Longevity',
    seoDescription: 'Side-by-side research comparison of Epitalon and MOTS-c: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `Epitalon is better for deep cellular aging (telomeres and sleep), while MOTS-c is better for metabolic aging (energy and insulin). Epitalon works in the pineal gland to dramatically upregulate melatonin production and has been shown to lengthen telomeres, fundamentally extending cellular lifespan. MOTS-c works in the mitochondria to activate AMPK, restoring youthful energy metabolism and exercise capacity. Choose Epitalon (typically run twice a year) to improve circadian rhythms and target genetic aging. Choose MOTS-c to improve daily energy, insulin sensitivity, and athletic performance. They target completely different pillars of longevity.`,
    tags: ['Anti-Aging', 'Research'],
    color: 'blue'
  },
  {
    slug: 'pt-141-vs-melanotan-ii',
    peptideA: 'pt-141',
    peptideB: 'melanotan-ii',
    title: 'PT-141 vs Melanotan II',
    subtitle: 'Libido vs Tanning',
    seoDescription: 'Side-by-side research comparison of PT-141 and Melanotan II: dosing, half-life, side effects, and mechanism of action.',
    recommendation: `PT-141 is strictly for enhancing libido and sexual function, while Melanotan II (MT2) is primarily for skin tanning with libido enhancement as a side effect. PT-141 is actually a synthetic derivative of MT2 that was isolated specifically for its strong aphrodisiac effects via the melanocortin receptors in the brain, without causing significant skin pigmentation. MT2 strongly stimulates melanin production while also providing some arousal effects. Choose PT-141 (an FDA-approved formulation) if your sole goal is treating sexual dysfunction in men or women. Choose MT2 if your primary goal is tanning. PT-141 is the much safer default for sexual health.`,
    tags: ['Libido', 'Research'],
    color: 'amber'
  }
];
