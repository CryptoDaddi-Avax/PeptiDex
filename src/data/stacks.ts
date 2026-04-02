import { Stack } from "./types";

function slugify(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const rawStacks: Omit<Stack, "slug">[] = [
    {
        stack_name: "Body Recomposition Stack",
        goal: "Maximize fat loss while preserving or building lean muscle   the gold standard for total body transformation",
        peptides: [
            { name: "Retatrutide", role_in_stack: "Lead compound   triple GLP-1/GIP/glucagon agonism delivers ~24% weight loss while preserving muscle via glucagon-driven fat oxidation" },
            { name: "Tirzepatide", role_in_stack: "FDA-approved dual agonist alternative   21% weight loss with superior glycemic control; the proven clinical backbone" },
            { name: "CJC-1295", role_in_stack: "Stimulates pulsatile GH release to maintain lean mass during aggressive caloric deficits" },
            { name: "Ipamorelin", role_in_stack: "Selective GH amplifier   pairs with CJC-1295 for synergistic muscle-sparing effects without cortisol spikes" },
            { name: "Tesamorelin", role_in_stack: "FDA-approved for visceral fat specifically   clinically proven 18% trunk fat reduction" },
        ],
        synergy_rationale: "GLP-1 agonists drive powerful fat loss through appetite suppression and metabolic remodeling, while GH peptides preserve and build muscle. Retatrutide's triple agonism provides the strongest fat-loss signal; CJC-1295 + Ipamorelin maintain anabolic drive. Tesamorelin specifically targets stubborn visceral fat. Together, they attack body composition from both sides   maximizing fat loss while minimizing muscle catabolism.",
        supporting_studies: [
            { description: "Retatrutide Phase 2: ~24% weight loss at 48 weeks   highest reported in any trial", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38367045/" },
            { description: "Tirzepatide SURMOUNT Phase 3: up to 21% weight loss", pubmed_url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038" },
            { description: "CJC-1295 sustained GH/IGF-1 elevations in healthy adults", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
        ],
    },
    {
        stack_name: "Fat Loss Focus Stack",
        goal: "Maximum fat loss through multi-pathway metabolic optimization",
        peptides: [
            { name: "Retatrutide", role_in_stack: "Triple agonist for superior appetite suppression and fat oxidation   the most potent fat-loss peptide in trials" },
            { name: "Semaglutide", role_in_stack: "FDA-approved GLP-1 agonist with proven long-term weight loss and cardiovascular benefits" },
            { name: "AOD-9604", role_in_stack: "Directly stimulates lipolysis via GH fat-burning domain without affecting blood glucose or growth" },
            { name: "MOTS-c", role_in_stack: "Activates AMPK for enhanced fatty acid oxidation and cellular energy metabolism" },
        ],
        synergy_rationale: "Multi-pathway metabolism boost: GLP-1 agonists suppress appetite centrally, AOD-9604 attacks fat directly at the adipose tissue level, and MOTS-c improves the underlying metabolic machinery. Strong GLP-1 trial results combined with complementary fat-loss mechanisms.",
        supporting_studies: [
            { description: "Retatrutide Phase 2: ~24% weight loss at 48 weeks", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38367045/" },
            { description: "Semaglutide strong weight loss and metabolic effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41723034/" },
            { description: "MOTS-c improves metabolic homeostasis via AMPK", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25710270/" },
        ],
    },
    {
        stack_name: "Injury Recovery Stack",
        goal: "Accelerate healing of musculoskeletal injuries including tendons, ligaments, muscles, and post-surgical recovery",
        peptides: [
            { name: "BPC-157", role_in_stack: "Primary tissue repair driver   promotes angiogenesis, collagen deposition, and growth factor upregulation at injury sites" },
            { name: "TB-500", role_in_stack: "Complements BPC-157 by promoting cell migration via actin upregulation and reducing fibrotic scar formation" },
            { name: "KPV", role_in_stack: "Potent anti-inflammatory   suppresses NF-κB signaling to create optimal healing environment" },
            { name: "SS-31", role_in_stack: "Protects mitochondria in stressed/injured cells, ensuring energy supply for tissue repair" },
        ],
        synergy_rationale: "Synergistic repair + anti-inflammation + mitochondrial support. BPC-157 and TB-500 work through distinct but complementary repair mechanisms. KPV reduces the inflammatory cascade that impedes healing. SS-31 ensures damaged cells maintain energy production needed for repair.",
        supporting_studies: [
            { description: "BPC-157 tendon, ligament, and gut healing effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030658/" },
            { description: "TB-500 wound healing and inflammation reduction", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14657002/" },
            { description: "SS-31 improves mitochondrial function in clinical trials", pubmed_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7108996/" },
        ],
    },
    {
        stack_name: "Mental Clarity & Cognitive Stack",
        goal: "Enhance focus, memory, learning capacity, neurogenesis, and neuroprotection",
        peptides: [
            { name: "Semax", role_in_stack: "Primary nootropic   BDNF upregulation for enhanced neural plasticity, memory, and focus" },
            { name: "Selank", role_in_stack: "Reduces anxiety-related cognitive interference via GABA modulation without sedation" },
        ],
        synergy_rationale: "Neurotrophic/nootropic synergy: Semax enhances BDNF for learning and plasticity, and Selank clears anxiety-based cognitive interference. Together they address cognitive acquisition (Semax) and emotional interference (Selank).",
        supporting_studies: [
            { description: "Semax improves cognition in human trials", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20387390/" },
            { description: "Selank anxiolytic effects in humans", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18454096/" },
        ],
    },
    {
        stack_name: "Muscle Growth Stack",
        goal: "Maximize lean muscle gain through GH optimization, growth factor signaling, and myostatin inhibition",
        peptides: [
            { name: "CJC-1295", role_in_stack: "Sustained GH release for anabolic environment and protein synthesis" },
            { name: "Ipamorelin", role_in_stack: "Selective GH amplifier without cortisol   the cleanest GH secretagogue" },
            { name: "MK-677", role_in_stack: "Oral GH secretagogue for 24hr sustained IGF-1 elevation   convenient daily oral dosing alternative" },
            { name: "Sermorelin", role_in_stack: "Natural GH pulse stimulation   proven to increase lean mass in clinical trials" },
            { name: "Follistatin-344", role_in_stack: "Blocks myostatin to remove the body's natural ceiling on muscle growth" },
            { name: "IGF-1 LR3", role_in_stack: "Drives muscle cell hyperplasia (new fiber creation) beyond normal hypertrophy" },
        ],
        synergy_rationale: "Multi-pathway anabolic stack: GH peptides (CJC/Ipamorelin/Sermorelin) create the hormonal environment, Follistatin removes the myostatin brake, and IGF-1 LR3 drives new muscle cell creation. This addresses all three growth limiters simultaneously.",
        supporting_studies: [
            { description: "CJC-1295 sustained GH/IGF-1 elevations", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
            { description: "Sermorelin increases lean mass in older adults", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9141536/" },
            { description: "IGF-1 promotes muscle in models", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/10218986/" },
        ],
    },
    {
        stack_name: "Immune Support Stack",
        goal: "Strengthen and modulate immune function for enhanced pathogen defense",
        peptides: [
            { name: "Thymosin Alpha-1", role_in_stack: "Primary immune enhancer   matures T-cells, activates dendritic cells, modulates cytokine balance" },
            { name: "LL-37", role_in_stack: "The only human cathelicidin   direct antimicrobial, anti-biofilm, and endotoxin neutralization" },
            { name: "Selank", role_in_stack: "Supports balanced immune gene expression and reduces stress-related immunosuppression" },
            { name: "BPC-157", role_in_stack: "Anti-inflammatory support and mucosal barrier protection   first line of immune defense" },
        ],
        synergy_rationale: "Thymosin Alpha-1 directly enhances adaptive immune cell function. LL-37 provides broad-spectrum direct antimicrobial action and biofilm disruption. Selank reduces the immunosuppressive effects of chronic stress. BPC-157 protects mucosal barriers (where 70% of immune cells reside). Combined: adaptive immunity + direct pathogen killing + stress protection + barrier integrity.",
        supporting_studies: [
            { description: "Thymosin Alpha-1 in immune-compromised patients", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18274638/" },
            { description: "Selank anxiolytic and immune effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18454096/" },
            { description: "BPC-157 gut healing effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030658/" },
        ],
    },
    {
        stack_name: "Deep Sleep & Recovery Stack",
        goal: "Optimize sleep quality, enhance nightly recovery, and improve hormonal output during sleep",
        peptides: [
            { name: "DSIP", role_in_stack: "Directly promotes delta-wave (deep) sleep phases critical for recovery" },
            { name: "MK-677", role_in_stack: "Increases stage IV deep sleep by 50% and REM by 20%   oral pre-bed dosing for overnight GH optimization" },
            { name: "Ipamorelin", role_in_stack: "Enhances natural nighttime GH surge for improved overnight tissue repair" },
            { name: "Epitalon", role_in_stack: "Supports melatonin production and circadian rhythm regulation via pineal gland" },
            { name: "Selank", role_in_stack: "Reduces anxiety and racing thoughts that interfere with sleep onset" },
        ],
        synergy_rationale: "DSIP targets delta-wave sleep directly. MK-677 (oral, pre-bed) clinically increases deep sleep duration by 50% while sustaining overnight GH release. Epitalon supports melatonin production for circadian timing. Selank addresses the anxiety component disrupting sleep onset. Ipamorelin amplifies the natural nighttime GH pulse, turning better sleep into better recovery.",
        supporting_studies: [
            { description: "DSIP promotes delta sleep in models", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/6895513/" },
            { description: "Ipamorelin selective GH release", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
            { description: "Epitalon lifespan and neuroendocrine effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12937682/" },
        ],
    },
    {
        stack_name: "Longevity & Anti-Aging Stack",
        goal: "Target fundamental aging mechanisms: telomeres, mitochondria, metabolism, and cellular protection",
        peptides: [
            { name: "Epitalon", role_in_stack: "Activates telomerase to maintain telomere length   addresses cellular aging at the chromosomal level" },
            { name: "MOTS-c", role_in_stack: "AMPK-mediated metabolic optimization   combats age-related metabolic decline" },
            { name: "SS-31", role_in_stack: "Stabilizes mitochondrial membranes   addresses the energy crisis of aging cells" },
            { name: "GHK-Cu", role_in_stack: "Resets gene expression toward younger patterns across 4,000+ genes" },
        ],
        synergy_rationale: "Multi-hallmark anti-aging approach: Epitalon targets telomere attrition, MOTS-c and SS-31 target mitochondrial dysfunction through complementary mechanisms, and GHK-Cu broadly shifts gene expression toward regeneration.",
        supporting_studies: [
            { description: "Epitalon extends lifespan in animal models", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12937682/" },
            { description: "MOTS-c improves metabolic homeostasis", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25710270/" },
            { description: "GHK-Cu skin regeneration", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17703734/" },
        ],
    },
    {
        stack_name: "Skin & Aesthetic Rejuvenation Stack",
        goal: "Improve skin quality, texture, elasticity, and promote hair growth",
        peptides: [
            { name: "GHK-Cu", role_in_stack: "Core skin peptide   stimulates collagen, elastin, and glycosaminoglycan synthesis" },
            { name: "BPC-157", role_in_stack: "Enhances blood vessel formation for improved skin nourishment and healing" },
            { name: "Epitalon", role_in_stack: "Addresses cellular senescence in skin cells via telomerase activation" },
        ],
        synergy_rationale: "GHK-Cu rebuilds the extracellular matrix (structure), BPC-157 enhances vascularity (nourishment), and Epitalon addresses cellular aging (longevity of skin cells).",
        supporting_studies: [
            { description: "GHK-Cu promotes skin regeneration", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17703734/" },
            { description: "BPC-157 tissue healing effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030658/" },
            { description: "Epitalon telomerase activation", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12937682/" },
        ],
    },
    {
        stack_name: "Gut Health & Recovery Stack",
        goal: "Repair and protect the gastrointestinal lining and reduce GI inflammation",
        peptides: [
            { name: "BPC-157", role_in_stack: "Primary gut-healing peptide   derived from gastric juice, repairs mucosal damage from NSAIDs, stress, and inflammation" },
            { name: "KPV", role_in_stack: "Potent NF-κB suppressor   specifically effective for intestinal inflammation and IBD models" },
            { name: "LL-37", role_in_stack: "Antimicrobial defense for the GI tract   disrupts pathogenic biofilms and neutralizes endotoxins in the gut lumen" },
            { name: "Thymosin Alpha-1", role_in_stack: "Modulates gut-associated immune tissue (GALT) for balanced intestinal immune response" },
        ],
        synergy_rationale: "BPC-157 directly heals gut lining. KPV suppresses the inflammatory pathways driving intestinal damage. LL-37 provides direct antimicrobial and anti-biofilm action against pathogenic gut organisms. Thymosin Alpha-1 balances the gut immune system. Together: repair + anti-inflammation + pathogen defense + immune balance.",
        supporting_studies: [
            { description: "BPC-157 gut healing effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030658/" },
            { description: "KPV anti-inflammatory activity", pubmed_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12753158/" },
            { description: "Thymosin Alpha-1 immune modulation", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18274638/" },
        ],
    },
    {
        stack_name: "Metabolic & Insulin Sensitivity Stack",
        goal: "Improve metabolic health, insulin sensitivity, and cellular energy production",
        peptides: [
            { name: "Tirzepatide", role_in_stack: "FDA-approved dual agonist   gold standard for glycemic control and metabolic improvement" },
            { name: "MOTS-c", role_in_stack: "AMPK activator for enhanced glucose uptake and fatty acid oxidation at the cellular level" },
            { name: "Tesamorelin", role_in_stack: "Reduces visceral fat (a primary driver of insulin resistance) with strong clinical evidence" },
            { name: "SS-31", role_in_stack: "Restores mitochondrial efficiency   the root cause of metabolic dysfunction" },
        ],
        synergy_rationale: "Tirzepatide provides the strongest clinical metabolic improvement. MOTS-c addresses AMPK signaling. Tesamorelin removes visceral fat driving inflammation. SS-31 fixes the mitochondrial dysfunction underlying metabolic disease.",
        supporting_studies: [
            { description: "Tirzepatide Phase 3 metabolic outcomes", pubmed_url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038" },
            { description: "MOTS-c metabolic homeostasis", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25710270/" },
            { description: "Tesamorelin visceral fat reduction", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20554713/" },
        ],
    },
    {
        stack_name: "Hormonal Optimization Stack (Male)",
        goal: "Support healthy testosterone levels and hormonal balance while preserving fertility",
        peptides: [
            { name: "Kisspeptin-10", role_in_stack: "Master HPG axis activator   stimulates pulsatile GnRH to drive natural LH, FSH, and testosterone production" },
            { name: "CJC-1295", role_in_stack: "Supports GH axis which synergizes with testosterone signaling for anabolic environment" },
            { name: "Ipamorelin", role_in_stack: "Selective GH without cortisol   chronic cortisol suppresses testosterone production" },
            { name: "Sermorelin", role_in_stack: "Natural GH pulse mimicry   proven clinical lean mass and recovery benefits" },
        ],
        synergy_rationale: "Kisspeptin-10 is the master upstream HPG axis regulator, directly stimulating natural testosterone production via GnRH signaling without bypassing feedback loops. GH optimization via CJC-1295 and Ipamorelin supports testosterone's anabolic effects across two receptor systems. Sermorelin adds physiologic GH pulsing. The avoidance of cortisol spikes (Ipamorelin's key advantage) protects the HPG axis.",
        supporting_studies: [
            { description: "CJC-1295 sustained GH/IGF-1 elevations", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
            { description: "Ipamorelin selective GH release", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
            { description: "Sermorelin lean mass benefits", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9141536/" },
        ],
    },
];

export const stacks: Stack[] = rawStacks.map(s => ({ ...s, slug: slugify(s.stack_name) }));

export function getStackByName(name: string): Stack | undefined {
    return stacks.find((s) => s.stack_name === name);
}

export function getStackBySlug(slug: string): Stack | undefined {
    return stacks.find((s) => s.slug === slug);
}
