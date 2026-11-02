import { Stack } from "./types";

export const LAST_UPDATED = '2026-05-06';

function slugify(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const rawStacks: Omit<Stack, "slug">[] = [
    {
        stack_name: "Body Recomposition Stack",
        goal: "Research combination: peptides studied for visceral fat, metabolic signaling and GH/IGF-1 in relation to body composition",
        peptides: [
            { name: "Tesamorelin", role_in_stack: "FDA-approved (Egrifta) for HIV-associated lipodystrophy; phase 3 trials reported visceral fat reduction in that population" },
            { name: "MOTS-c", role_in_stack: "Mitochondrial-derived AMPK activator studied in mice for insulin sensitivity and fatty acid oxidation (described as an 'exercise mimetic')" },
            { name: "CJC-1295", role_in_stack: "GHRH analog shown to raise GH and IGF-1 for days in healthy adults; not studied for body-composition outcomes" },
        ],
        synergy_rationale: "These compounds are grouped because they are studied through different mechanisms: Tesamorelin for visceral fat in HIV-associated lipodystrophy, MOTS-c for mitochondrial and AMPK signaling in mice, and CJC-1295 for GH/IGF-1 elevation in healthy adults. No study has tested them together, and any combined effect on body composition is theoretical.",
        supporting_studies: [
            { description: "Tesamorelin visceral fat reduction in HIV-associated lipodystrophy", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20554713/" },
            { description: "MOTS-c and metabolic homeostasis via AMPK (mouse data)", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
            { description: "CJC-1295 sustained GH/IGF-1 elevations in healthy adults", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
        ],
    },
    {
        stack_name: "Injury Recovery Stack",
        goal: "Research combination: peptides studied in preclinical models of tendon, ligament and soft-tissue injury",
        peptides: [
            { name: "BPC-157", role_in_stack: "Studied in rodent tendon and ligament injury models for angiogenesis, collagen deposition and tendon fibroblast outgrowth" },
            { name: "TB-500", role_in_stack: "Thymosin beta-4 fragment studied in animal wound models for actin-mediated cell migration and reduced fibrosis" },
        ],
        synergy_rationale: "Often called the 'Wolverine Stack' in online communities. BPC-157 research centers on angiogenesis at the injury site in rodent models; TB-500 research centers on the migration of repair cells. The two are frequently discussed together because their mechanisms are complementary in preclinical repair models, but no study has tested the combination and there are no controlled human trials for either in musculoskeletal injury.",
        supporting_studies: [
            { description: "BPC-157 and tendon healing in a rat model", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030672/" },
            { description: "Thymosin beta-4 and cell migration and angiogenesis", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9194528/" },
        ],
    },
    {
        stack_name: "Mental Clarity & Cognitive Stack",
        goal: "Research combination: neuropeptides studied for BDNF signaling, attention and anxiolytic effects",
        peptides: [
            { name: "Semax", role_in_stack: "ACTH(4-10) analog shown to upregulate BDNF in rat hippocampus; studied in Russia for cognitive and neuroprotective endpoints" },
            { name: "Selank", role_in_stack: "Studied in Russian clinical trials for anxiolytic effects, with GABA modulation proposed as a mechanism" },
        ],
        synergy_rationale: "Semax is studied for neurotrophic (BDNF) signaling and Selank for anxiolytic effects, so they are often discussed as complementary. Both are approved in Russia but not in the US, and the combination has not been studied in controlled trials.",
        supporting_studies: [
            { description: "Semax and cognition/attention research", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20387390/" },
            { description: "Selank anxiolytic effects in generalized anxiety disorder", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18454096/" },
        ],
    },
    {
        stack_name: "Muscle Growth Stack",
        goal: "Research combination: GH secretagogues and an IGF-1 analog studied in relation to GH/IGF-1 signaling and lean mass",
        peptides: [
            { name: "CJC-1295", role_in_stack: "GHRH analog that produced sustained GH and IGF-1 elevation in healthy adults" },
            { name: "Ipamorelin", role_in_stack: "Selective GHRP that released GH without raising cortisol or prolactin in its original characterization" },
            { name: "IGF-1 LR3", role_in_stack: "Long-acting IGF-1 analog studied in cell and animal models of muscle growth signaling; no human outcome data" },
        ],
        synergy_rationale: "GHRH analogs (CJC-1295) and GHRPs (Ipamorelin) act on separate receptors, and combined GHRH + GHRP stimulation has been reported to amplify GH release. IGF-1 LR3 acts downstream of GH. No controlled human trial has tested this combination or shown that it increases muscle mass.",
        supporting_studies: [
            { description: "CJC-1295 sustained GH/IGF-1 elevation in healthy adults", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
            { description: "Ipamorelin selective GH release", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
        ],
    },
    {
        stack_name: "Immune Support Stack",
        goal: "Research combination: immune peptides studied for adaptive immune modulation and antimicrobial activity",
        peptides: [
            { name: "Thymosin Alpha-1", role_in_stack: "Immune modulator studied for T-cell and dendritic-cell function; approved outside the US as an adjunct in hepatitis B" },
            { name: "LL-37", role_in_stack: "Human cathelicidin that disrupts microbial membranes and biofilms in vitro" },
        ],
        synergy_rationale: "Thymosin Alpha-1 is studied in adaptive immunity (T-cell maturation), while LL-37 is studied as an innate antimicrobial peptide. They are grouped because they act on different arms of the immune system. No study has tested the combination, and neither is FDA-approved.",
        supporting_studies: [
            { description: "LL-37 antimicrobial activity", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32982998/" },
        ],
    },
    {
        stack_name: "Deep Sleep & Recovery Stack",
        goal: "Research combination: compounds studied for sleep architecture, melatonin regulation and nocturnal GH",
        peptides: [
            { name: "DSIP", role_in_stack: "Studied in small 1980s trials in chronic insomnia for delta-wave sleep and sleep latency" },
            { name: "Epitalon", role_in_stack: "Pineal tetrapeptide studied mainly in Russian research for melatonin and circadian regulation" },
            { name: "MK-677", role_in_stack: "One small study reported increased stage IV and REM sleep alongside enhanced overnight GH secretion" },
        ],
        synergy_rationale: "DSIP has been studied for sleep onset and delta sleep, Epitalon for melatonin and circadian rhythm (mainly in Russian research), and MK-677 for stage IV sleep and nocturnal GH in one small study. They are grouped by mechanism; the combination has not been studied.",
        supporting_studies: [
            { description: "DSIP and delta sleep in chronic insomniacs", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/6895513/" },
            { description: "MK-677 and stage IV sleep in a small study", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9349662/" },
            { description: "Epitalon in animal aging models", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12937682/" },
        ],
    },
    {
        stack_name: "Longevity & Anti-Aging Stack",
        goal: "Research combination: peptides studied in relation to telomeres, mitochondrial function and gene expression",
        peptides: [
            { name: "Epitalon", role_in_stack: "Activated telomerase in human cell culture; lifespan studies are in animals" },
            { name: "MOTS-c", role_in_stack: "Mitochondrial-derived peptide studied in mice for age-related metabolic and physical decline" },
            { name: "GHK-Cu", role_in_stack: "Copper peptide reported to modulate expression of more than 4,000 human genes in gene-expression analyses" },
        ],
        synergy_rationale: "Each compound is studied against a different hallmark of aging: Epitalon (telomeres), MOTS-c (mitochondria) and GHK-Cu (gene expression). The evidence is mostly from cell and animal studies, and none has been shown to extend human lifespan.",
        supporting_studies: [
            { description: "Epitalon and lifespan in animal models", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12937682/" },
            { description: "MOTS-c and age-dependent physical decline in mice", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
            { description: "GHK-Cu gene-expression data", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29986520/" },
        ],
    },
    {
        stack_name: "Skin & Aesthetic Rejuvenation Stack",
        goal: "Research combination: peptides studied for collagen synthesis, skin matrix remodeling and angiogenesis",
        peptides: [
            { name: "GHK-Cu", role_in_stack: "Studied for collagen, elastin and glycosaminoglycan synthesis in skin" },
            { name: "BPC-157", role_in_stack: "Studied in animal models for angiogenesis (new blood vessel formation) in tissue repair" },
        ],
        synergy_rationale: "GHK-Cu research centers on matrix proteins such as collagen and elastin; BPC-157 research centers on angiogenesis in animal repair models. They are grouped by mechanism, but the combination has not been studied for skin outcomes.",
        supporting_studies: [
            { description: "GHK-Cu and skin regeneration research", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29986520/" },
            { description: "BPC-157 angiogenesis and tissue repair in a rat model", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030672/" },
        ],
    },
    {
        stack_name: "Gut Health & Recovery Stack",
        goal: "Research combination: peptides studied in rodent models of gastrointestinal lesions and colitis",
        peptides: [
            { name: "BPC-157", role_in_stack: "Derived from a gastric protein sequence; studied in rat models of ulcers, fistulas and intestinal mucosal lesions" },
            { name: "KPV", role_in_stack: "Alpha-MSH fragment studied in murine colitis models for suppression of NF-κB inflammatory signaling" },
        ],
        synergy_rationale: "BPC-157 research centers on mucosal repair in rodent models, while KPV research centers on epithelial anti-inflammatory signaling in colitis models. Neither has been tested in controlled human trials for any GI condition, and the combination has not been studied.",
        supporting_studies: [
            { description: "BPC-157 preclinical healing research", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030672/" },
            { description: "KPV anti-inflammatory activity in IBD models", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18061177/" },
        ],
    },
    {
        stack_name: "Hormonal Optimization Stack (Male)",
        goal: "Research combination: peptides studied for HPG-axis (LH/testosterone) and GH-axis signaling",
        peptides: [
            { name: "Kisspeptin-10", role_in_stack: "Upstream regulator of GnRH; acute administration increased LH and testosterone in human studies" },
            { name: "CJC-1295", role_in_stack: "GHRH analog that produced sustained GH and IGF-1 elevation in healthy adults" },
            { name: "Ipamorelin", role_in_stack: "Selective GHRP that released GH without raising cortisol in its original characterization" },
        ],
        synergy_rationale: "Kisspeptin-10 acts upstream on the HPG axis, while CJC-1295 and Ipamorelin act on the GH axis, so the compounds are grouped by separate mechanisms. None is approved for testosterone deficiency, the combination has not been studied, and none is a substitute for medically supervised treatment of hypogonadism.",
        supporting_studies: [
            { description: "Kisspeptin-10 stimulates LH and testosterone", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16174713/" },
            { description: "CJC-1295 sustained GH/IGF-1 elevation", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
            { description: "Ipamorelin lacks cortisol elevation", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
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
