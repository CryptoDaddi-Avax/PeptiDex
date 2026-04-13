import { Peptide, Study } from "./types";

export interface PeptideBlend {
    name: string;
    slug: string;
    nickname: string;
    components: string[];
    category: string;
    category_icon: string;
    primary_benefits: string;
    why_blend: string;
    mechanism: string;
    typical_ratio: string;
    key_studies: Study[];
    safety_notes: string;
    dosing_notes: string;
    popular_vendors: string[];
    outcomes_timeline: {
        week_1?: string;
        week_2_4?: string;
        month_2_3?: string;
        long_term?: string;
    };
}

function slug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const peptideBlends: PeptideBlend[] = [
    {
        name: "BPC-157 / TB-500",
        slug: slug("BPC-157-TB-500"),
        nickname: "The Wolverine Stack",
        components: ["BPC-157", "TB-500"],
        category: "Healing & Recovery",
        category_icon: "\u{1FA79}",
        primary_benefits: "Accelerated injury healing, tissue repair, reduced inflammation, enhanced recovery",
        why_blend: "BPC-157 targets local tissue repair via angiogenesis and growth factors, while TB-500 provides systemic anti-inflammatory and cell migration support. Together they deliver complementary healing pathways — BPC works at the injury site, TB-500 works system-wide.",
        mechanism: "BPC-157 promotes angiogenesis and collagen deposition at injury sites via FAK-paxillin signaling. TB-500 upregulates actin for cell migration and wound healing systemically. The combination creates a dual-pathway healing response significantly more effective than either peptide alone.",
        typical_ratio: "BPC-157 500mcg + TB-500 2.5mg per dose",
        key_studies: [
            { title: "BPC-157 tendon and gut healing effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030658/", summary: "Comprehensive review of BPC-157's tissue healing across multiple preclinical models.", evidence_level: "preclinical" },
            { title: "Thymosin Beta-4 wound healing and inflammation", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14657002/", summary: "Tβ4 promotes wound healing via enhanced reepithelialization and angiogenesis.", evidence_level: "preclinical" },
        ],
        safety_notes: "Both peptides have excellent safety profiles individually. The combination is the most widely used peptide stack. Not FDA-approved. Research-only.",
        dosing_notes: "Common protocol: BPC-157 250-500mcg + TB-500 2-5mg, injected SubQ 1-2x daily. BPC near injury site, TB-500 anywhere. Cycle 4-12 weeks.",
        popular_vendors: ["Amino Club", "Ascension Peptides"],
        outcomes_timeline: {
            week_1: "Reduced inflammation and pain at injury site; improved mobility",
            week_2_4: "Significant tissue repair; noticeable reduction in swelling and stiffness",
            month_2_3: "Substantial healing of tendons, ligaments, and soft tissue injuries",
            long_term: "Complete functional recovery for most acute/subacute injuries"
        }
    },
    {
        name: "CJC-1295 / Ipamorelin",
        slug: slug("CJC-1295-Ipamorelin"),
        nickname: "The GH Stack",
        components: ["CJC-1295", "Ipamorelin"],
        category: "Growth Hormone",
        category_icon: "\u{1F489}",
        primary_benefits: "Optimized GH release, lean muscle growth, fat loss, improved sleep and recovery",
        why_blend: "CJC-1295 provides sustained GHRH signaling (extended GH elevation), while Ipamorelin triggers acute, clean GH pulses without raising cortisol or prolactin. Together, they amplify the GH response beyond what either achieves alone.",
        mechanism: "CJC-1295 mimics GHRH to maintain elevated baseline GH via the GHRH receptor, with a 7-day half-life (DAC version). Ipamorelin mimics ghrelin at the GHS receptor for acute, selective GH release. Dual-receptor activation produces a synergistic GH pulse.",
        typical_ratio: "CJC-1295 1000-2000mcg + Ipamorelin 200-300mcg per injection",
        key_studies: [
            { title: "CJC-1295 sustained GH/IGF-1 elevation", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/", summary: "Single injection increases GH 2-10x for 6+ days and IGF-1 1.5-3x.", evidence_level: "moderate" },
            { title: "Ipamorelin selective GH release", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9849822/", summary: "Releases GH potently and selectively without raising cortisol or prolactin.", evidence_level: "moderate" },
        ],
        safety_notes: "One of the safest GH peptide combinations. No significant cortisol or prolactin elevation. Not FDA-approved.",
        dosing_notes: "Inject together SubQ, pre-bed or morning fasted. CJC-1295 DAC: 2x/week. Mod GRF 1-29 (no DAC): 1-3x daily with Ipamorelin. Cycle 8-16 weeks.",
        popular_vendors: ["Amino Club", "Ascension Peptides"],
        outcomes_timeline: {
            week_1: "Improved sleep depth; GH flush sensation; increased appetite",
            week_2_4: "Enhanced recovery and energy; early body composition changes",
            month_2_3: "Measurable lean mass gain; visible fat loss; elevated IGF-1 on bloodwork",
            long_term: "Sustained anti-aging benefits; improved body composition; better bone density"
        }
    },
    {
        name: "BPC-157 / TB-500 / GHK-Cu",
        slug: slug("BPC-157-TB-500-GHK-Cu"),
        nickname: "The Ultimate Healing Trifecta",
        components: ["BPC-157", "TB-500", "GHK-Cu"],
        category: "Healing & Recovery",
        category_icon: "\u{2728}",
        primary_benefits: "Maximum tissue repair, anti-aging, scar reduction, collagen synthesis",
        why_blend: "Adds GHK-Cu's collagen/elastin synthesis and gene expression modulation to the proven BPC-157/TB-500 healing combo. Three distinct repair mechanisms working simultaneously.",
        mechanism: "BPC-157 drives local angiogenesis, TB-500 enables systemic cell migration, and GHK-Cu delivers copper for collagen/elastin production while modulating 4,000+ genes toward a healthier expression pattern.",
        typical_ratio: "BPC-157 500mcg + TB-500 2.5mg + GHK-Cu 200-500mcg",
        key_studies: [
            { title: "BPC-157 systematic review: musculoskeletal healing", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39754825/", summary: "Systematic review of 35 preclinical studies showing BPC-157 promotes healing.", evidence_level: "preclinical" },
            { title: "GHK-Cu gene expression regulation", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/24687255/", summary: "GHK-Cu regulates 4,000+ human genes, shifting patterns to healthy states.", evidence_level: "preclinical" },
        ],
        safety_notes: "All three peptides have excellent individual safety profiles. Triple combination is popular among advanced users. Not FDA-approved.",
        dosing_notes: "BPC-157 250-500mcg + TB-500 2-5mg + GHK-Cu 200-500mcg. SubQ daily or split. Cycle 4-12 weeks. GHK-Cu also available topically.",
        popular_vendors: ["Amino Club", "Ascension Peptides"],
        outcomes_timeline: {
            week_1: "Rapid reduction in inflammation; improved wound healing",
            week_2_4: "Visible tissue repair; improved skin quality from GHK-Cu",
            month_2_3: "Substantial healing; collagen remodeling; reduced scarring",
            long_term: "Full tissue recovery; anti-aging skin benefits; sustained repair"
        }
    },
    {
        name: "Semax / Selank",
        slug: slug("Semax-Selank"),
        nickname: "The Nootropic Duo",
        components: ["Semax", "Selank"],
        category: "Cognitive Enhancement",
        category_icon: "\u{1F9E0}",
        primary_benefits: "Enhanced focus, anxiety reduction, neuroprotection, mental clarity",
        why_blend: "Semax provides potent cognitive enhancement and BDNF upregulation, while Selank delivers anxiolytic effects comparable to benzodiazepines without sedation. Together, they create calm focus — enhanced cognition without overstimulation.",
        mechanism: "Semax upregulates BDNF and neurotrophin expression for cognitive enhancement. Selank modulates GABA/serotonin for anxiety reduction and stabilizes enkephalin levels. Complementary pathways: nootropic + anxiolytic.",
        typical_ratio: "Semax 200-600mcg + Selank 250-500mcg per dose",
        key_studies: [
            { title: "Semax cognitive improvement in humans", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20387390/", summary: "Human trial showing cognitive improvement including enhanced attention and memory.", evidence_level: "moderate" },
            { title: "Selank anxiolytic effects comparable to benzodiazepines", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19487070/", summary: "Significant anti-anxiety effects without sedation or dependence.", evidence_level: "moderate" },
        ],
        safety_notes: "Both approved in Russia. Excellent safety profiles. Non-addictive. Nasal spray administration.",
        dosing_notes: "Both administered as nasal sprays. Semax AM for focus, Selank AM/PM for anxiety. Can be used together or alternated. Cycle 4-12 weeks.",
        popular_vendors: ["Amino Club", "Ascension Peptides"],
        outcomes_timeline: {
            week_1: "Rapid cognitive enhancement from Semax; anxiety relief from Selank within days",
            week_2_4: "Stable nootropic effects; improved stress resilience; better sleep onset",
            month_2_3: "BDNF-mediated memory improvements; sustained anxiolytic effects",
            long_term: "Neuroprotective benefits; improved baseline cognition and mood stability"
        }
    },
    {
        name: "CJC-1295 / Ipamorelin / GHRP-6",
        slug: slug("CJC-1295-Ipamorelin-GHRP-6"),
        nickname: "The Triple GH Amplifier",
        components: ["CJC-1295", "Ipamorelin", "GHRP-6"],
        category: "Growth Hormone",
        category_icon: "\u{1F4AA}",
        primary_benefits: "Maximum GH output, muscle hypertrophy, accelerated fat loss, appetite stimulation",
        why_blend: "Combines three GH pathways: CJC-1295 for sustained GHRH, Ipamorelin for clean GH pulses, and GHRP-6 for powerful ghrelin-mimetic action with appetite stimulation — ideal for those seeking maximum growth.",
        mechanism: "Triple-axis GH stimulation via GHRH receptor (CJC-1295), GHS receptor selective (Ipamorelin), and GHS receptor with ghrelin-like appetite effects (GHRP-6). Creates the most potent non-HGH growth hormone response.",
        typical_ratio: "CJC-1295 1000mcg + Ipamorelin 200mcg + GHRP-6 100mcg",
        key_studies: [
            { title: "CJC-1295 preserves pulsatile GH secretion", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16595882/", summary: "7.5-fold increase in basal GH while preserving natural pulsatile pattern.", evidence_level: "moderate" },
            { title: "Ipamorelin PK/PD in healthy volunteers", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16796559/", summary: "Dose-escalation study showing single-episode GH release.", evidence_level: "moderate" },
        ],
        safety_notes: "More aggressive than CJC/Ipa alone. GHRP-6 increases appetite and may raise cortisol slightly. Monitor blood glucose. Not FDA-approved.",
        dosing_notes: "Inject SubQ pre-bed or morning fasted. GHRP-6 adds hunger — useful for bulking. Cycle 8-16 weeks. More advanced protocol.",
        popular_vendors: ["Amino Club", "Ascension Peptides"],
        outcomes_timeline: {
            week_1: "Pronounced GH flush; increased appetite from GHRP-6; deeper sleep",
            week_2_4: "Rapid recovery; early lean mass gains; noticeable hunger increase",
            month_2_3: "Significant body recomposition; elevated IGF-1; muscle fullness",
            long_term: "Maximum non-HGH body composition optimization; monitor bloodwork"
        }
    },
    {
        name: "BPC-157 / KPV",
        slug: slug("BPC-157-KPV"),
        nickname: "The Gut Healer",
        components: ["BPC-157", "KPV"],
        category: "Gut Health",
        category_icon: "\u{1F6E1}\uFE0F",
        primary_benefits: "Gut healing, IBD relief, reduced intestinal inflammation, mucosal repair",
        why_blend: "BPC-157's tissue repair meets KPV's potent NF-κB suppression. BPC-157 heals the physical damage while KPV turns off the inflammatory signaling causing it. The ultimate gut restoration protocol.",
        mechanism: "BPC-157 promotes GI mucosal healing via cytoprotective pathways and angiogenesis. KPV (alpha-MSH fragment) powerfully suppresses NF-κB inflammatory signaling and reduces pro-inflammatory cytokines (IL-1β, IL-6, TNF-α) in intestinal epithelium.",
        typical_ratio: "BPC-157 500mcg + KPV 200-500mcg",
        key_studies: [
            { title: "BPC-157 GI tract healing", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22300085/", summary: "BPC-157 heals GI ulcers, fistulas, and inflammatory bowel lesions.", evidence_level: "preclinical" },
            { title: "KPV anti-inflammatory effects in colitis", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17095019/", summary: "KPV suppresses NF-κB and MAPK pathways in inflammatory bowel disease models.", evidence_level: "preclinical" },
        ],
        safety_notes: "Both peptides have excellent safety profiles. KPV can be taken orally for gut-specific effects. Not FDA-approved.",
        dosing_notes: "BPC-157 250-500mcg SubQ + KPV 200-500mcg orally or SubQ. KPV oral capsules target gut directly. Cycle 4-12 weeks.",
        popular_vendors: ["Amino Club", "Ascension Peptides"],
        outcomes_timeline: {
            week_1: "Rapid reduction in gut inflammation; improved GI comfort",
            week_2_4: "Mucosal healing; reduced bloating and IBS/IBD symptoms",
            month_2_3: "Significant GI restoration; normalized bowel function",
            long_term: "Sustained gut health; potential remission of chronic GI conditions"
        }
    },
    {
        name: "Epitalon / GHK-Cu",
        slug: slug("Epitalon-GHK-Cu"),
        nickname: "The Age Reversal Stack",
        components: ["Epitalon", "GHK-Cu"],
        category: "Anti-Aging & Longevity",
        category_icon: "\u{1F9EC}",
        primary_benefits: "Telomere support, anti-aging, skin rejuvenation, circadian rhythm optimization",
        why_blend: "Epitalon activates telomerase to protect DNA aging markers while GHK-Cu rejuvenates tissue at the cellular level by modulating 4,000+ genes. One protects the clock; the other reverses its effects.",
        mechanism: "Epitalon activates telomerase (hTERT) for telomere maintenance and regulates melatonin production. GHK-Cu stimulates collagen/elastin synthesis, promotes wound healing, and shifts gene expression from aged to youthful patterns.",
        typical_ratio: "Epitalon 5-10mg + GHK-Cu 200-500mcg per dose",
        key_studies: [
            { title: "Epitalon telomere lengthening in human cells", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14501182/", summary: "Epitalon activates telomerase and extends replicative lifespan in human cells.", evidence_level: "preclinical" },
            { title: "GHK-Cu skin regeneration and anti-aging", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17703734/", summary: "GHK-Cu stimulates collagen, elastin, and glycosaminoglycan synthesis.", evidence_level: "moderate" },
        ],
        safety_notes: "Both well-tolerated. Epitalon cycles should be short (2-4 weeks, 2-3x/year). GHK-Cu can be used longer term.",
        dosing_notes: "Epitalon 10mg/day for 20 days, repeat 2-3x/year. GHK-Cu 200-500mcg daily ongoing. Both SubQ.",
        popular_vendors: ["Amino Club", "Ascension Peptides"],
        outcomes_timeline: {
            week_2_4: "Improved sleep quality and circadian rhythm; skin texture improvement",
            month_2_3: "Visible anti-aging effects; collagen synthesis from GHK-Cu; antioxidant upregulation",
            long_term: "Telomere maintenance; progressive skin rejuvenation; longevity support"
        }
    },
    {
        name: "Thymosin Alpha-1 / BPC-157",
        slug: slug("Thymosin-Alpha-1-BPC-157"),
        nickname: "The Immune Fortress",
        components: ["Thymosin Alpha-1", "BPC-157"],
        category: "Immune Support",
        category_icon: "\u{1F6E1}\uFE0F",
        primary_benefits: "Enhanced immunity, faster illness recovery, gut-immune axis support",
        why_blend: "Thymosin Alpha-1 supercharges immune cell function (T-cells, NK cells, dendritic cells), while BPC-157 heals the gut lining where 70% of the immune system resides. Attacking immune weakness from both sides.",
        mechanism: "Tα1 enhances T-cell maturation, NK cell activity, and dendritic cell function for improved pathogen response. BPC-157 repairs gut mucosal integrity, supporting the gut-associated lymphoid tissue (GALT) — the body's largest immune organ.",
        typical_ratio: "Thymosin Alpha-1 1.6mg + BPC-157 500mcg",
        key_studies: [
            { title: "Thymosin Alpha-1 safety and efficacy review", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31279456/", summary: "Review of 30+ clinical trials with 11,000+ subjects confirming safety and efficacy.", evidence_level: "strong" },
            { title: "BPC-157 gastrointestinal healing", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22300085/", summary: "BPC-157 heals GI ulcers and inflammatory bowel lesions.", evidence_level: "preclinical" },
        ],
        safety_notes: "Thymosin Alpha-1 approved in 35+ countries. Both peptides well-tolerated. Excellent safety profiles.",
        dosing_notes: "Tα1 1.6mg SubQ 2x/week + BPC-157 250-500mcg SubQ daily. Cycle 8-24 weeks. Ideal during cold/flu season or post-illness.",
        popular_vendors: ["Amino Club", "Ascension Peptides"],
        outcomes_timeline: {
            week_1: "Immune activation; NK cell and T-cell enhancement begins",
            week_2_4: "Improved immune response; gut healing supports immune function",
            month_2_3: "Sustained immune modulation; reduced frequency of illness",
            long_term: "Long-term immune resilience; gut-immune axis restoration"
        }
    },
    {
        name: "MOTS-c / SS-31",
        slug: slug("MOTS-c-SS-31"),
        nickname: "The Mitochondrial Duo",
        components: ["MOTS-c", "SS-31"],
        category: "Energy & Mitochondrial",
        category_icon: "\u{26A1}",
        primary_benefits: "Cellular energy optimization, exercise performance, metabolic health, anti-aging",
        why_blend: "MOTS-c activates AMPK for metabolic optimization from the outside in, while SS-31 (Elamipretide) stabilizes the inner mitochondrial membrane from within. Together they attack mitochondrial decline from both directions.",
        mechanism: "MOTS-c is a mitochondrial-derived peptide that activates AMPK and enhances glucose uptake. SS-31 targets cardiolipin in the inner mitochondrial membrane to stabilize cristae and optimize electron transport chain efficiency.",
        typical_ratio: "MOTS-c 5-10mg + SS-31 5-10mg per dose",
        key_studies: [
            { title: "MOTS-c regulates metabolic homeostasis", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25710270/", summary: "MOTS-c regulates insulin sensitivity and metabolic homeostasis via AMPK.", evidence_level: "emerging" },
            { title: "Elamipretide stabilizes cardiolipin", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32102697/", summary: "SS-31 binds cardiolipin, stabilizes cristae, reduces ROS, improves oxidative phosphorylation.", evidence_level: "preclinical" },
        ],
        safety_notes: "Both well-tolerated. SS-31 has been through multiple Phase 2/3 trials. MOTS-c has limited human data but is endogenous.",
        dosing_notes: "MOTS-c 5-10mg SubQ 3-5x/week (morning/pre-exercise). SS-31 5-10mg SubQ daily. Cycle 4-12 weeks.",
        popular_vendors: ["Amino Club", "Ascension Peptides"],
        outcomes_timeline: {
            week_1: "Improved insulin sensitivity; reduced exercise fatigue",
            week_2_4: "Enhanced exercise capacity; improved endurance and recovery",
            month_2_3: "Metabolic optimization; improved body composition; better VO2",
            long_term: "Sustained mitochondrial protection; cellular energy optimization"
        }
    },
    {
        name: "Ipamorelin / DSIP",
        slug: slug("Ipamorelin-DSIP"),
        nickname: "The Sleep & Recovery Stack",
        components: ["Ipamorelin", "DSIP"],
        category: "Sleep & Recovery",
        category_icon: "\u{1F4A4}",
        primary_benefits: "Optimized sleep-phase GH release, deep sleep induction, recovery amplification",
        why_blend: "DSIP promotes deep delta-wave sleep, the phase when GH is naturally released. Ipamorelin amplifies that GH pulse. Together, they maximize the body's most important recovery window.",
        mechanism: "DSIP modulates the sleep-wake cycle to promote delta-wave (deep) sleep via GABA and serotonin pathways. Ipamorelin triggers selective GH release during this deep sleep phase, amplifying the body's natural nocturnal GH pulse.",
        typical_ratio: "Ipamorelin 200-300mcg + DSIP 100-300mcg per dose",
        key_studies: [
            { title: "DSIP promotes delta sleep in insomniacs", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/6895513/", summary: "DSIP decreased nocturnal awakenings and increased total NREM sleep.", evidence_level: "moderate" },
            { title: "Ipamorelin selective GH release", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9849822/", summary: "Potent, selective GH release without cortisol or prolactin elevation.", evidence_level: "moderate" },
        ],
        safety_notes: "Both individually well-tolerated. Take together right before bed. Not FDA-approved.",
        dosing_notes: "Inject both SubQ 30 minutes before bed. Ipamorelin 200-300mcg + DSIP 100-300mcg. Cycle DSIP 2-4 weeks; Ipamorelin can run longer.",
        popular_vendors: ["Amino Club", "Ascension Peptides"],
        outcomes_timeline: {
            week_1: "Improved sleep onset and depth; enhanced GH release during sleep",
            week_2_4: "Restorative sleep; better recovery; potential pain modulation from DSIP",
            month_2_3: "Optimized sleep architecture; body composition benefits from enhanced GH",
            long_term: "Sustained sleep quality improvement; cycle DSIP to maintain effect"
        }
    },
];

export function getBlendBySlug(slug: string): PeptideBlend | undefined {
    return peptideBlends.find((b) => b.slug === slug);
}

export function searchBlends(query: string): PeptideBlend[] {
    const q = query.toLowerCase();
    return peptideBlends.filter(
        (b) =>
            b.name.toLowerCase().includes(q) ||
            b.nickname.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q) ||
            b.components.some((c) => c.toLowerCase().includes(q)) ||
            b.primary_benefits.toLowerCase().includes(q)
    );
}
