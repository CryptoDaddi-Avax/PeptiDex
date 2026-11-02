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
    vial_composition?: string;   // pre-mixed vial contents (product data), when a blended vial is sold
    key_studies: Study[];
    safety_notes: string;
    popular_vendors: string[];
    // Time course reported in published studies of the individual components (each entry cites a key_studies PMID).
    // No study has evaluated these combinations; leave empty when no component study reports a time course.
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
        nickname: "Tissue-repair research pairing",
        components: ["BPC-157", "TB-500"],
        category: "Healing & Recovery",
        category_icon: "\u{1FA79}",
        primary_benefits: "Tendon, ligament and GI lesion healing (BPC-157, rodent models), dermal wound healing and angiogenesis (thymosin beta-4, animal models), combination not studied",
        why_blend: "BPC-157 has been studied mainly for local tissue repair via angiogenesis and growth-factor signaling in rodent models, while thymosin beta-4 (the parent protein of TB-500) has been studied for cell migration and wound healing in animal models. They are paired because their proposed mechanisms differ; no published study has evaluated the combination.",
        mechanism: "BPC-157 has been reported to promote angiogenesis and collagen deposition at injury sites in rodent models. Thymosin beta-4 binds actin and promotes cell migration and wound healing in animal models. Whether the two act additively has not been tested.",
        vial_composition: "Vial: BPC-157 10mg + TB-500 10mg",
        key_studies: [
            { title: "BPC-157 tendon and gut healing effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030658/", summary: "Review of BPC-157 tissue-healing findings across multiple preclinical models.", evidence_level: "preclinical" },
            { title: "Thymosin Beta-4 wound healing and inflammation", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14657002/", summary: "Tβ4 promoted wound healing via enhanced reepithelialization and angiogenesis in animal models.", evidence_level: "preclinical" },
        ],
        safety_notes: "Human safety data are limited for both components (BPC-157 is largely preclinical; thymosin beta-4 has early-phase trial data). The combination has not been studied. Not FDA-approved. Research use only.",
        popular_vendors: ["Elyria Bio", "Bio Longevity Labs"],
        outcomes_timeline: {}
    },
    {
        name: "CJC-1295 / Ipamorelin",
        slug: slug("CJC-1295-Ipamorelin"),
        nickname: "GHRH + GHRP research pairing",
        components: ["CJC-1295", "Ipamorelin"],
        category: "Growth Hormone",
        category_icon: "\u{1F489}",
        primary_benefits: "GH and IGF-1 secretion (CJC-1295, healthy-adult study), selective GH release without cortisol or prolactin rise (Ipamorelin, animal and human studies), combination not studied",
        why_blend: "CJC-1295 acts at the GHRH receptor and produced sustained GH elevation in a study of healthy adults, while Ipamorelin acts at the ghrelin (GHS) receptor and produced selective GH release in animal studies. The pairing is discussed because GHRH and GHS receptor agonists act through different receptors; the combination has not been evaluated in published trials.",
        mechanism: "CJC-1295 is a GHRH analog; the DAC version has an extended half-life. Ipamorelin is a ghrelin mimetic that acts at the GHS receptor. Co-activation of GHRH and GHS receptors has been proposed to increase GH release, but this specific pairing has not been studied.",
        vial_composition: "Vial: CJC-1295 (no DAC) 5mg + Ipamorelin 5mg",
        key_studies: [
            { title: "CJC-1295 sustained GH/IGF-1 elevation", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/", summary: "Single injection increases GH 2-10x for 6+ days and IGF-1 1.5-3x.", evidence_level: "moderate" },
            { title: "Ipamorelin selective GH release", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9849822/", summary: "Releases GH potently and selectively without raising cortisol or prolactin.", evidence_level: "moderate" },
        ],
        safety_notes: "Ipamorelin did not raise cortisol or prolactin in the cited animal study. Changes in blood glucose have been reported with GH secretagogues. The combination has not been studied. Not FDA-approved. Research use only.",
        popular_vendors: ["Elyria Bio", "Bio Longevity Labs"],
        outcomes_timeline: {
            week_1: "CJC-1295 alone, healthy adults: GH elevated for 6+ days after a single administration (pubmed 16352683)"
        }
    },
    {
        name: "BPC-157 / TB-500 / GHK-Cu",
        slug: slug("BPC-157-TB-500-GHK-Cu"),
        nickname: "Tissue-repair research trio",
        components: ["BPC-157", "TB-500", "GHK-Cu"],
        category: "Healing & Recovery",
        category_icon: "\u{2728}",
        primary_benefits: "Musculoskeletal healing (BPC-157, preclinical systematic review), collagen and gene-expression effects (GHK-Cu, cell studies), combination not studied",
        why_blend: "Adds GHK-Cu, studied for collagen and elastin synthesis and gene-expression effects, to the BPC-157 / TB-500 pairing. Each component acts through a different proposed mechanism; no published study has evaluated the three together.",
        mechanism: "BPC-157 has been associated with angiogenesis in rodent models, thymosin beta-4 with cell migration in animal models, and GHK-Cu with collagen and elastin synthesis and changes in the expression of 4,000+ genes in cell studies.",
        vial_composition: "Vial: GHK-Cu 50mg + BPC-157 10mg + TB-500 10mg",
        key_studies: [
            { title: "BPC-157 systematic review: musculoskeletal healing", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39754825/", summary: "Systematic review of 35 preclinical studies showing BPC-157 promotes healing.", evidence_level: "preclinical" },
            { title: "GHK-Cu gene expression regulation", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/24687255/", summary: "GHK-Cu regulates 4,000+ human genes, shifting patterns to healthy states.", evidence_level: "preclinical" },
        ],
        safety_notes: "Human safety data are limited for all three components, and the triple combination has not been studied. Not FDA-approved. Research use only.",
        popular_vendors: ["Elyria Bio", "Bio Longevity Labs"],
        outcomes_timeline: {}
    },
    {
        name: "Semax / Selank",
        slug: slug("Semax-Selank"),
        nickname: "Cognitive research pairing",
        components: ["Semax", "Selank"],
        category: "Cognitive Enhancement",
        category_icon: "\u{1F9E0}",
        primary_benefits: "Attention and memory measures (Semax, human trial), anxiolytic effects (Selank, Russian clinical studies), BDNF expression (Semax, preclinical), combination not studied",
        why_blend: "Semax has been studied for cognitive effects and BDNF upregulation, while Selank has been studied for anxiolytic effects without sedation. They are paired because of these different research profiles; the combination has not been evaluated in published trials.",
        mechanism: "Semax has been reported to upregulate BDNF and neurotrophin expression. Selank has been reported to modulate GABAergic and serotonergic signaling and enkephalin levels. The two act through different proposed pathways.",
        key_studies: [
            { title: "Semax cognitive improvement in humans", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20387390/", summary: "Human trial showing cognitive improvement including enhanced attention and memory.", evidence_level: "moderate" },
            { title: "Selank anxiolytic effects in a clinical study", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19487070/", summary: "Anxiolytic effects reported without sedation in the studied patients.", evidence_level: "moderate" },
        ],
        safety_notes: "Both are approved in Russia; neither is FDA-approved. Studied mainly as intranasal formulations. The combination has not been studied. Research use only.",
        popular_vendors: ["Elyria Bio", "Bio Longevity Labs"],
        outcomes_timeline: {}
    },
    {
        name: "CJC-1295 / Ipamorelin / GHRP-6",
        slug: slug("CJC-1295-Ipamorelin-GHRP-6"),
        nickname: "Three-secretagogue GH research combination",
        components: ["CJC-1295", "Ipamorelin", "GHRP-6"],
        category: "Growth Hormone",
        category_icon: "\u{1F4AA}",
        primary_benefits: "Basal and pulsatile GH secretion (CJC-1295, human studies), single-episode GH release (Ipamorelin, healthy volunteers), ghrelin-like appetite effects (GHRP-6), combination not studied",
        why_blend: "Combines three GH secretagogues: CJC-1295 (GHRH receptor), Ipamorelin (selective GHS receptor agonist), and GHRP-6 (GHS receptor agonist with ghrelin-like appetite effects). The three-way combination has not been evaluated in published studies.",
        mechanism: "Stimulation of GH release via the GHRH receptor (CJC-1295) and the GHS receptor (Ipamorelin, GHRP-6). GHRP-6 also has ghrelin-like effects on appetite.",
        key_studies: [
            { title: "CJC-1295 preserves pulsatile GH secretion", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16595882/", summary: "7.5-fold increase in basal GH while preserving natural pulsatile pattern.", evidence_level: "moderate" },
            { title: "Ipamorelin PK/PD in healthy volunteers", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16796559/", summary: "Dose-escalation study showing single-episode GH release.", evidence_level: "moderate" },
        ],
        safety_notes: "GHRP-6 increases appetite and may raise cortisol slightly. Changes in blood glucose have been reported with GH secretagogues. The combination has not been studied. Not FDA-approved. Research use only.",
        popular_vendors: ["Elyria Bio", "Bio Longevity Labs"],
        outcomes_timeline: {
            week_1: "Ipamorelin alone, healthy volunteers: a single GH release episode peaking at about 0.67 hours"
        }
    },
    {
        name: "BPC-157 / KPV",
        slug: slug("BPC-157-KPV"),
        nickname: "GI research pairing",
        components: ["BPC-157", "KPV"],
        category: "Gut Health",
        category_icon: "\u{1F6E1}️",
        primary_benefits: "GI lesion healing (BPC-157, rat models), intestinal inflammation in colitis models (KPV, mouse models), NF-kB signaling, combination not studied",
        why_blend: "BPC-157 has been studied for GI mucosal healing in rat models, while KPV has been studied for NF-κB suppression in mouse colitis models. They are paired because of these different preclinical findings; no published study has evaluated the combination.",
        mechanism: "BPC-157 has been reported to promote GI mucosal healing via cytoprotective pathways and angiogenesis in rodent models. KPV (an alpha-MSH fragment) suppressed NF-κB signaling and reduced pro-inflammatory cytokines (IL-1β, IL-6, TNF-α) in intestinal epithelium in preclinical studies.",
        key_studies: [
            { title: "BPC-157 GI tract healing", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22300085/", summary: "BPC-157 promoted healing of GI ulcers, fistulas, and inflammatory bowel lesions in rat models.", evidence_level: "preclinical" },
            { title: "KPV anti-inflammatory effects in colitis", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17095019/", summary: "KPV suppresses NF-κB and MAPK pathways in inflammatory bowel disease models.", evidence_level: "preclinical" },
        ],
        safety_notes: "Both components are supported mainly by preclinical data; human safety data are limited. KPV has been studied orally in animal models of colitis. Not FDA-approved. Research use only.",
        popular_vendors: ["Elyria Bio", "Bio Longevity Labs"],
        outcomes_timeline: {}
    },
    {
        name: "Epitalon / GHK-Cu",
        slug: slug("Epitalon-GHK-Cu"),
        nickname: "Aging-biology research pairing",
        components: ["Epitalon", "GHK-Cu"],
        category: "Anti-Aging & Longevity",
        category_icon: "\u{1F9EC}",
        primary_benefits: "Telomerase activation in human fibroblasts (Epitalon, cell studies), collagen and elastin synthesis (GHK-Cu, cell and skin studies), combination not studied",
        why_blend: "Epitalon has been studied for telomerase activation in cultured human cells, while GHK-Cu has been studied for collagen synthesis and gene-expression effects. They are paired because both are studied in aging biology; the combination has not been evaluated.",
        mechanism: "Epitalon activated telomerase (hTERT) expression in human fibroblasts in cell studies and has been studied for effects on melatonin production. GHK-Cu stimulated collagen, elastin, and glycosaminoglycan synthesis in skin studies and altered gene-expression patterns in cell studies.",
        key_studies: [
            { title: "Epitalon telomerase activation in human cells", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14501182/", summary: "Epitalon activated telomerase and extended replicative lifespan in cultured human cells.", evidence_level: "preclinical" },
            { title: "GHK-Cu skin regeneration and anti-aging", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17703734/", summary: "GHK-Cu stimulates collagen, elastin, and glycosaminoglycan synthesis.", evidence_level: "moderate" },
        ],
        safety_notes: "Both reported as well tolerated in published research, though human data are limited. The combination has not been studied. Not FDA-approved. Research use only.",
        popular_vendors: ["Elyria Bio", "Bio Longevity Labs"],
        outcomes_timeline: {}
    },
    {
        name: "Thymosin Alpha-1 / BPC-157",
        slug: slug("Thymosin-Alpha-1-BPC-157"),
        nickname: "Immune and GI research pairing",
        components: ["Thymosin Alpha-1", "BPC-157"],
        category: "Immune Support",
        category_icon: "\u{1F6E1}️",
        primary_benefits: "T-cell and dendritic cell modulation (Thymosin Alpha-1, clinical trials), GI lesion healing (BPC-157, rat models), combination not studied",
        why_blend: "Thymosin alpha-1 has been studied as an immune modulator (T-cells, NK cells, dendritic cells) in clinical trials, while BPC-157 has been studied for GI mucosal healing in rat models. They are paired because of the proposed link between gut-associated lymphoid tissue and immune function; the combination has not been studied.",
        mechanism: "Tα1 has been reported to enhance T-cell maturation, NK cell activity, and dendritic cell function. BPC-157 has been reported to support gut mucosal integrity in rodent models; the gut-associated lymphoid tissue (GALT) is a major site of immune tissue.",
        key_studies: [
            { title: "Thymosin Alpha-1 safety and efficacy review", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31279456/", summary: "Review of 30+ clinical trials with 11,000+ subjects confirming safety and efficacy.", evidence_level: "strong" },
            { title: "BPC-157 gastrointestinal healing", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22300085/", summary: "BPC-157 promoted healing of GI ulcers and inflammatory bowel lesions in rat models.", evidence_level: "preclinical" },
        ],
        safety_notes: "Thymosin alpha-1 is approved outside the US for viral hepatitis and was reported as well tolerated across 30+ clinical trials. BPC-157 human data are limited. The combination has not been studied. Not FDA-approved. Research use only.",
        popular_vendors: ["Elyria Bio", "Bio Longevity Labs"],
        outcomes_timeline: {}
    },
    {
        name: "MOTS-c / SS-31",
        slug: slug("MOTS-c-SS-31"),
        nickname: "Mitochondrial research pairing",
        components: ["MOTS-c", "SS-31"],
        category: "Energy & Mitochondrial",
        category_icon: "\u{26A1}",
        primary_benefits: "Insulin sensitivity and AMPK signaling (MOTS-c, rodent models), cardiolipin binding and cristae stabilization (SS-31, preclinical), combination not studied",
        why_blend: "MOTS-c has been studied for AMPK activation and metabolic regulation, while SS-31 (elamipretide) binds cardiolipin in the inner mitochondrial membrane. They are paired because they act on mitochondria through different mechanisms; the combination has not been studied.",
        mechanism: "MOTS-c is a mitochondrial-derived peptide reported to activate AMPK and regulate insulin sensitivity in rodent models. SS-31 targets cardiolipin in the inner mitochondrial membrane and, in preclinical studies, stabilized cristae and improved oxidative phosphorylation.",
        key_studies: [
            { title: "MOTS-c regulates metabolic homeostasis", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25738459/", summary: "MOTS-c regulates insulin sensitivity and metabolic homeostasis via AMPK.", evidence_level: "emerging" },
            { title: "Elamipretide stabilizes cardiolipin", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32102697/", summary: "SS-31 binds cardiolipin, stabilizes cristae, reduces ROS, improves oxidative phosphorylation.", evidence_level: "preclinical" },
        ],
        safety_notes: "SS-31 has been evaluated in Phase 2/3 trials. MOTS-c is endogenous but has limited human data. The combination has not been studied. Not FDA-approved for the uses discussed here. Research use only.",
        popular_vendors: ["Elyria Bio", "Bio Longevity Labs"],
        outcomes_timeline: {}
    },
    {
        name: "Ipamorelin / DSIP",
        slug: slug("Ipamorelin-DSIP"),
        nickname: "Sleep research pairing",
        components: ["Ipamorelin", "DSIP"],
        category: "Sleep & Recovery",
        category_icon: "\u{1F4A4}",
        primary_benefits: "NREM sleep and nocturnal awakenings (DSIP, insomnia study), selective GH release (Ipamorelin, animal studies), combination not studied",
        why_blend: "DSIP has been studied for effects on deep (delta-wave) sleep, the phase associated with the natural nocturnal GH pulse, and Ipamorelin for selective GH release. They are paired because of this physiological link; the combination has not been studied.",
        mechanism: "DSIP has been studied for modulation of the sleep-wake cycle and delta-wave (deep) sleep, with proposed GABAergic and serotonergic involvement. Ipamorelin triggers selective GH release via the GHS receptor; the pairing is discussed in the context of the body's natural nocturnal GH pulse during deep sleep.",
        key_studies: [
            { title: "DSIP promotes delta sleep in insomniacs", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/6895513/", summary: "DSIP decreased nocturnal awakenings and increased total NREM sleep.", evidence_level: "moderate" },
            { title: "Ipamorelin selective GH release", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9849822/", summary: "Potent, selective GH release without cortisol or prolactin elevation.", evidence_level: "moderate" },
        ],
        safety_notes: "Both reported as well tolerated in the cited studies; human data are limited. The combination has not been studied. Not FDA-approved. Research use only.",
        popular_vendors: ["Elyria Bio", "Bio Longevity Labs"],
        outcomes_timeline: {}
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
