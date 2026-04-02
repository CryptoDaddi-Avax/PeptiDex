/**
 * Goal-based landing pages for SEO.
 * Each entry generates a page at /best/[slug] e.g. /best/fat-loss
 */

export interface GoalPage {
    slug: string;
    title: string;
    h1: string;
    metaDescription: string;
    intro: string;
    emoji: string;
    peptideSlugs: string[]; // peptides to feature (matches peptides[].slug)
    stackNames: string[];   // stacks to link to
    relatedGoals: string[]; // other goal slugs to cross-link
    faqs: { question: string; answer: string }[];
    keywords: string[];
}

export const goalPages: GoalPage[] = [
    {
        slug: "fat-loss",
        title: "Best Peptides for Fat Loss (2026) — Research Guide | PeptiDex",
        h1: "Best Peptides for Fat Loss",
        emoji: "🔥",
        metaDescription: "Research-backed guide to the best peptides for fat loss in 2026. Compare Semaglutide, Tirzepatide, Retatrutide, AOD-9604, and more with evidence, dosing, and stacks.",
        intro: "The peptide landscape for fat loss has exploded since GLP-1 agonists went mainstream. From FDA-approved options like Semaglutide and Tirzepatide to research compounds like Retatrutide and AOD-9604, there are now multiple evidence-backed pathways to accelerate fat loss.",
        peptideSlugs: ["semaglutide", "tirzepatide", "retatrutide", "aod-9604", "tesamorelin", "mots-c"],
        stackNames: ["Fat Loss Focus Stack", "Body Recomposition Stack", "Metabolic & Insulin Sensitivity Stack"],
        relatedGoals: ["muscle-growth", "metabolic-health", "body-recomposition"],
        keywords: ["best peptides for fat loss", "fat loss peptides", "weight loss peptides 2026", "semaglutide vs tirzepatide", "peptides for weight loss"],
        faqs: [
            { question: "What is the best peptide for fat loss?", answer: "Based on clinical evidence, Tirzepatide (dual GLP-1/GIP agonist) shows the strongest weight loss results at ~21% body weight in Phase 3 trials. Retatrutide (triple agonist) shows ~24% in Phase 2 but is not yet FDA-approved." },
            { question: "Are fat loss peptides safe?", answer: "FDA-approved options like Semaglutide and Tirzepatide have extensive safety data from large clinical trials. Research-only peptides like AOD-9604 and MOTS-c have good preclinical safety profiles but less human data. Always consult a healthcare professional." },
            { question: "How fast do weight loss peptides work?", answer: "Most users see noticeable appetite suppression within the first week. Measurable fat loss typically begins at weeks 4-8. Maximum results are seen at 6-12 months of consistent use." },
        ],
    },
    {
        slug: "muscle-growth",
        title: "Best Peptides for Muscle Growth (2026) — Research Guide | PeptiDex",
        h1: "Best Peptides for Muscle Growth",
        emoji: "💪",
        metaDescription: "Research-backed guide to the best peptides for muscle growth. CJC-1295, Ipamorelin, IGF-1 LR3, Follistatin — evidence, dosing, and optimal stacks.",
        intro: "Growth hormone peptides remain the cornerstone of muscle-building peptide protocols. By optimizing GH secretion through GHRH and ghrelin pathways, these peptides create an anabolic environment that supports lean mass gains, recovery, and body composition improvement.",
        peptideSlugs: ["cjc-1295", "ipamorelin", "sermorelin", "igf-1-lr3", "follistatin-344"],
        stackNames: ["Muscle Growth Stack", "Hormonal Optimization Stack (Male)", "Body Recomposition Stack"],
        relatedGoals: ["fat-loss", "body-recomposition", "sleep-recovery"],
        keywords: ["best peptides for muscle growth", "growth hormone peptides", "muscle building peptides", "CJC-1295 muscle", "Ipamorelin results"],
        faqs: [
            { question: "What is the best peptide for building muscle?", answer: "The CJC-1295 + Ipamorelin stack is the gold standard for GH-based muscle building. For more aggressive protocols, adding IGF-1 LR3 (hyperplasia) and Follistatin-344 (myostatin inhibition) targets additional growth pathways." },
            { question: "Do peptides replace steroids?", answer: "No. GH peptides work through different mechanisms than anabolic steroids. They optimize growth hormone secretion rather than directly providing exogenous testosterone. Results are more subtle but with fewer side effects." },
            { question: "When should I inject GH peptides for muscle?", answer: "Pre-bed injection is most common to amplify the natural nighttime GH surge. Some users add a morning dose. Always inject on an empty stomach (2+ hours after eating) for maximum GH release." },
        ],
    },
    {
        slug: "healing",
        title: "Best Peptides for Injury Recovery & Healing (2026) | PeptiDex",
        h1: "Best Peptides for Injury Recovery",
        emoji: "🩹",
        metaDescription: "Research guide to healing peptides: BPC-157, TB-500, KPV, and more. Evidence for tendon, ligament, muscle, and post-surgical recovery.",
        intro: "Peptide-based healing protocols have become the go-to approach for athletes and individuals recovering from musculoskeletal injuries. BPC-157 and TB-500 form the backbone of most healing stacks, with supporting compounds for inflammation and mitochondrial support.",
        peptideSlugs: ["bpc-157", "tb-500", "kpv", "ss-31", "ghk-cu"],
        stackNames: ["Injury Recovery Stack", "Gut Health & Recovery Stack"],
        relatedGoals: ["gut-health", "sleep-recovery", "skin-aesthetics"],
        keywords: ["best peptides for healing", "injury recovery peptides", "BPC-157 for injuries", "TB-500 healing", "peptides for tendon repair"],
        faqs: [
            { question: "What is the best peptide for healing injuries?", answer: "BPC-157 is the most researched healing peptide with 35+ studies showing benefits for tendons, ligaments, muscles, and gut. Combining with TB-500 creates a synergistic healing stack that addresses both local repair and systemic inflammation." },
            { question: "Can peptides help with post-surgical recovery?", answer: "BPC-157 and TB-500 are commonly used for post-surgical recovery in research settings. BPC-157 promotes angiogenesis (new blood vessel formation) at wound sites, while TB-500 reduces fibrotic scarring." },
            { question: "How long should I use healing peptides?", answer: "Typical healing protocols run 4-12 weeks depending on injury severity. Acute injuries may resolve in 4-6 weeks. Chronic tendon issues or post-surgical recovery may require 8-12 weeks." },
        ],
    },
    {
        slug: "anti-aging",
        title: "Best Peptides for Anti-Aging & Longevity (2026) | PeptiDex",
        h1: "Best Peptides for Anti-Aging",
        emoji: "⏳",
        metaDescription: "Research-backed anti-aging peptides: Epitalon, GHK-Cu, SS-31, MOTS-c. Target telomeres, mitochondria, and gene expression for longevity.",
        intro: "Anti-aging peptides target the fundamental hallmarks of aging: telomere shortening, mitochondrial dysfunction, metabolic decline, and altered gene expression. Unlike cosmetic treatments, these peptides aim to address aging at the cellular level.",
        peptideSlugs: ["epitalon", "ghk-cu", "ss-31", "mots-c"],
        stackNames: ["Longevity & Anti-Aging Stack", "Skin & Aesthetic Rejuvenation Stack"],
        relatedGoals: ["skin-aesthetics", "sleep-recovery", "metabolic-health"],
        keywords: ["anti-aging peptides", "longevity peptides", "Epitalon anti-aging", "GHK-Cu skin", "best peptides for aging"],
        faqs: [
            { question: "Do anti-aging peptides actually work?", answer: "Each targets different aging mechanisms with varying evidence. GHK-Cu has strong clinical evidence for skin rejuvenation. Epitalon has animal studies showing lifespan extension. SS-31 is in human clinical trials for mitochondrial dysfunction. Results are real but vary by compound." },
            { question: "Which anti-aging peptide should I start with?", answer: "GHK-Cu for visible results (skin, hair quality). Epitalon for cellular protection (telomerase activation). MOTS-c for metabolic health. Choose based on your primary aging concern." },
        ],
    },
    {
        slug: "sleep-recovery",
        title: "Best Peptides for Sleep & Recovery (2026) | PeptiDex",
        h1: "Best Peptides for Sleep & Recovery",
        emoji: "🌙",
        metaDescription: "Research-backed peptides for deep sleep and overnight recovery. DSIP, Ipamorelin, Epitalon, Selank — improve sleep quality and nighttime healing.",
        intro: "Quality sleep is the foundation of recovery, hormone production, and longevity. These peptides target different aspects of the sleep cycle — from delta-wave enhancement to anxiety reduction to circadian rhythm optimization.",
        peptideSlugs: ["dsip", "ipamorelin", "epitalon", "selank"],
        stackNames: ["Deep Sleep & Recovery Stack"],
        relatedGoals: ["anti-aging", "muscle-growth", "healing"],
        keywords: ["best peptides for sleep", "sleep peptides", "DSIP peptide", "peptides for recovery", "deep sleep peptides"],
        faqs: [
            { question: "What peptide is best for sleep?", answer: "DSIP (Delta Sleep-Inducing Peptide) is specifically designed to promote deep delta-wave sleep. Selank helps with sleep onset by reducing anxiety. Ipamorelin amplifies the natural nighttime GH surge to improve recovery during sleep." },
            { question: "Are sleep peptides habit-forming?", answer: "No — peptides like DSIP and Selank don't act on the same reward pathways as sleep medications like benzodiazepines. They work with your natural sleep architecture rather than overriding it." },
        ],
    },
    {
        slug: "brain-focus",
        title: "Best Nootropic Peptides for Focus & Brain (2026) | PeptiDex",
        h1: "Best Peptides for Focus & Brain Function",
        emoji: "🧠",
        metaDescription: "Research guide to nootropic peptides: Semax, Selank, Dihexa. Enhance focus, memory, neuroplasticity, and cognitive performance.",
        intro: "Nootropic peptides offer targeted cognitive enhancement through BDNF upregulation, GABA modulation, and synaptogenesis — without the crash or dependency risk of traditional stimulants.",
        peptideSlugs: ["semax", "selank"],
        stackNames: ["Mental Clarity & Cognitive Stack"],
        relatedGoals: ["sleep-recovery", "anti-aging"],
        keywords: ["best nootropic peptides", "brain peptides", "Semax nootropic", "peptides for focus", "cognitive enhancement peptides"],
        faqs: [
            { question: "What is the best peptide for focus?", answer: "Semax is the top choice for focus and cognitive performance. It upregulates BDNF for enhanced neuroplasticity and modulates serotonin/dopamine for improved concentration. Available as a nasal spray for rapid onset." },
            { question: "Are nootropic peptides better than caffeine?", answer: "They work differently. Caffeine blocks adenosine receptors for temporary alertness. Semax enhances BDNF for structural brain improvements. They can be combined, but peptides offer longer-term cognitive benefits without tolerance buildup." },
        ],
    },
    {
        slug: "skin-aesthetics",
        title: "Best Peptides for Skin & Hair (2026) | PeptiDex",
        h1: "Best Peptides for Skin Rejuvenation",
        emoji: "✨",
        metaDescription: "Research guide to skin peptides: GHK-Cu, BPC-157, Epitalon. Collagen production, wrinkle reduction, hair growth, and skin healing.",
        intro: "Skin-targeted peptides work at the cellular level to stimulate collagen, elastin, and glycosaminoglycan synthesis. Unlike topical skincare, injectable peptides can address aging from within.",
        peptideSlugs: ["ghk-cu", "bpc-157", "epitalon"],
        stackNames: ["Skin & Aesthetic Rejuvenation Stack"],
        relatedGoals: ["anti-aging", "healing"],
        keywords: ["best peptides for skin", "skin rejuvenation peptides", "GHK-Cu skin", "collagen peptides", "peptides for wrinkles"],
        faqs: [
            { question: "What is the best peptide for skin?", answer: "GHK-Cu is the gold standard for skin rejuvenation. It stimulates collagen and elastin production, remodels tissue, and resets gene expression toward younger patterns. Available in both injectable and topical forms." },
            { question: "Can peptides help with hair loss?", answer: "GHK-Cu has shown benefits for hair growth by increasing follicle size and stimulating hair follicle stem cells. It's commonly used in topical formulations targeting the scalp." },
        ],
    },
    {
        slug: "gut-health",
        title: "Best Peptides for Gut Health (2026) | PeptiDex",
        h1: "Best Peptides for Gut Health",
        emoji: "🫁",
        metaDescription: "Research guide to gut healing peptides: BPC-157, KPV, Thymosin Alpha-1. Heal gut lining, reduce inflammation, and support digestive health.",
        intro: "Gut health underpins immune function, nutrient absorption, and even mental health via the gut-brain axis. These peptides target mucosal repair, intestinal inflammation, and gut-associated immune tissue.",
        peptideSlugs: ["bpc-157", "kpv", "thymosin-alpha-1"],
        stackNames: ["Gut Health & Recovery Stack"],
        relatedGoals: ["healing", "immune-support"],
        keywords: ["best peptides for gut health", "gut healing peptides", "BPC-157 gut", "peptides for IBS", "leaky gut peptides"],
        faqs: [
            { question: "What is the best peptide for gut healing?", answer: "BPC-157 is derived from a protein found in human gastric juice and is the most studied gut healing peptide. It repairs mucosal damage, heals ulcers, and reduces GI inflammation across numerous preclinical studies." },
            { question: "Can peptides help with IBS?", answer: "BPC-157 and KPV both show promise for inflammatory bowel conditions in research. BPC-157 repairs the gut lining while KPV suppresses NF-κB-driven intestinal inflammation." },
        ],
    },
];

export function getGoalPage(slug: string): GoalPage | undefined {
    return goalPages.find((g) => g.slug === slug);
}
