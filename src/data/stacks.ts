import { Stack } from "./types";

function slugify(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const rawStacks: Omit<Stack, "slug">[] = [
    {
        stack_name: "Body Recomposition Stack",
        goal: "Maximize fat loss while preserving or building lean muscle — the gold standard for total body transformation",
        peptides: [
            { name: "Tesamorelin", role_in_stack: "FDA-approved specifically for targeting stubborn visceral fat — clinically proven to yield 18% trunk fat reduction" },
            { name: "MOTS-c", role_in_stack: "AMPK activator that acts as an 'exercise mimetic' — supercharges cellular energy and fatty acid oxidation" },
            { name: "CJC-1295", role_in_stack: "Stimulates pulsatile GH release to preserve and build lean muscle mass during aggressive caloric deficits" },
        ],
        synergy_rationale: "Tesamorelin directly attacks stubborn visceral fat. MOTS-c acts at the mitochondrial level to boost energy and fatty acid oxidation (an exercise mimetic). CJC-1295 ensures a continuous GH elevation to protect and build muscle tissue while in a caloric deficit. Together, these 3 hit all the required pathways for true body recomposition without relying on GLP-1 agonists.",
        supporting_studies: [
            { description: "Tesamorelin visceral fat reduction", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20554713/" },
            { description: "MOTS-c improves metabolic homeostasis via AMPK", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25710270/" },
            { description: "CJC-1295 sustained GH/IGF-1 elevations in healthy adults", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
        ],
    },
    {
        stack_name: "Fat Loss Focus Stack",
        goal: "Maximum fat loss through targeted metabolic optimization and direct adipose tissue mobilization",
        peptides: [
            { name: "Retatrutide", role_in_stack: "Triple agonist for superior appetite suppression and fat oxidation — the most potent fat-loss peptide currently in trials" },
            { name: "AOD-9604", role_in_stack: "Directly stimulates lipolysis via the GH fat-burning domain without affecting blood glucose or overall growth factors" },
            { name: "MOTS-c", role_in_stack: "Supercharges cellular energy and acts as an 'exercise mimetic' to accelerate fatty acid oxidation" },
        ],
        synergy_rationale: "Retatrutide provides the overwhelming metabolic 'push' via GLP-1/GIP/Glucagon agonism. AOD-9604 directly targets and mobilizes adipose tissue. MOTS-c ensures the mitochondria are primed to burn that mobilized fat for energy. A highly targeted 3-pronged attack on adipose tissue.",
        supporting_studies: [
            { description: "Retatrutide Phase 2: ~24% weight loss at 48 weeks", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38367045/" },
            { description: "AOD-9604 stimulates lipolysis", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11713213/" },
            { description: "MOTS-c improves metabolic homeostasis", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25710270/" },
        ],
    },
    {
        stack_name: "Injury Recovery Stack",
        goal: "Accelerate healing of musculoskeletal injuries including tendons, ligaments, and post-surgical recovery",
        peptides: [
            { name: "BPC-157", role_in_stack: "Primary tissue repair driver — promotes massive angiogenesis, collagen deposition, and cellular migration at injury sites" },
            { name: "TB-500", role_in_stack: "Complements BPC-157 by upregulating actin to rapidly increase cellular motility and reduce fibrotic scar tissue formation" },
        ],
        synergy_rationale: "The undisputed 'Wolverine Stack.' BPC-157 acts systemically to build new blood vessel networks (angiogenesis) to feed injured tissues, while TB-500 hyper-accelerates the movement of repair cells to the site. Taking these two together is the gold standard for musculoskeletal repair.",
        supporting_studies: [
            { description: "BPC-157 tendon, ligament, and gut healing effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030658/" },
            { description: "TB-500 wound healing and inflammation reduction", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14657002/" },
        ],
    },
    {
        stack_name: "Mental Clarity & Cognitive Stack",
        goal: "Enhance focus, memory, learning capacity, and neuroprotection without harsh stimulants",
        peptides: [
            { name: "Semax", role_in_stack: "Primary nootropic — massive BDNF upregulation for structurally enhanced neural plasticity, memory acquisition, and flow-state focus" },
            { name: "Selank", role_in_stack: "Reduces anxiety-related cognitive interference via GABA modulation, providing calm, clear-headed execution" },
        ],
        synergy_rationale: "The ultimate neurotrophic synergy: Semax forces the brain into a highly plastic, focused state for learning and task execution, while Selank clears away the anxiety and stress that often interrupts deep cognitive work. You get the drive of Semax without the edge.",
        supporting_studies: [
            { description: "Semax improves cognition and attention", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20387390/" },
            { description: "Selank anxiolytic and cognitive smoothing effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18454096/" },
        ],
    },
    {
        stack_name: "Muscle Growth Stack",
        goal: "Maximize absolute lean muscle gain through sustained GH optimization and direct muscle cell hyperplasia",
        peptides: [
            { name: "CJC-1295", role_in_stack: "Provides a long-duration, sustained baseline elevation of Growth Hormone and IGF-1" },
            { name: "Ipamorelin", role_in_stack: "Creates massive, selective GH pulses to spike anabolic signaling without simultaneously increasing cortisol or prolactin" },
            { name: "IGF-1 LR3", role_in_stack: "Drives direct muscle cell hyperplasia (creation of entirely new muscle fibers) beyond normal hypertrophy" },
        ],
        synergy_rationale: "Combining a GHRH (CJC-1295) with a GHRP (Ipamorelin) creates a synergistic 10x multiplier on natural GH release compared to taking either alone. Adding IGF-1 LR3 takes advantage of that GH environment by forcing the body to multiply muscle cells, removing the genetic ceiling on muscle size.",
        supporting_studies: [
            { description: "Synergistic GH release from GHRH + GHRP combos", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
            { description: "Ipamorelin highly selective GH pulse", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
            { description: "IGF-1 promotes muscle hyperplasia", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/10218986/" },
        ],
    },
    {
        stack_name: "Immune Support Stack",
        goal: "Strengthen adaptive immune function and provide direct defense against pathogenic threats",
        peptides: [
            { name: "Thymosin Alpha-1", role_in_stack: "The master immune modulator — matures T-cells, activates dendritic cells, and restores systemic immune balance" },
            { name: "LL-37", role_in_stack: "The human body's primary cathelicidin — directly pierces pathogen membranes and destroys biofilms" },
        ],
        synergy_rationale: "A flawless inside-outside defense. Thymosin Alpha-1 upgrades the body's 'software' (adaptive immunity, T-cell maturation) to recognize and fight threats. LL-37 is the 'hardware' (innate immunity) that physically hunts down and rips apart bacteria, viruses, and biofilms on contact.",
        supporting_studies: [
            { description: "Thymosin Alpha-1 in immune-compromised models", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18274638/" },
            { description: "LL-37 direct antimicrobial action", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26601445/" },
        ],
    },
    {
        stack_name: "Deep Sleep & Recovery Stack",
        goal: "Force the brain into restorative deep sleep phases and optimize hormonal output during rest",
        peptides: [
            { name: "DSIP", role_in_stack: "Directly triggers the onset of delta-wave (deep) sleep phases critical for physical recovery" },
            { name: "Epitalon", role_in_stack: "Resets the pineal gland to restore youth-level natural melatonin production and circadian rhythm timing" },
            { name: "MK-677", role_in_stack: "Clinically proven to increase stage IV deep sleep by 50% while sustaining an overnight anabolic GH pulse" },
        ],
        synergy_rationale: "DSIP physically initiates deep sleep onset. Epitalon fixes the underlying circadian clock so you stay asleep. MK-677 taken before bed massively extends the duration of that deep sleep while flooding the body with reparative Growth Hormone. The ultimate overnight recovery protocols.",
        supporting_studies: [
            { description: "DSIP promotes delta sleep", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/6895513/" },
            { description: "MK-677 increases stage IV sleep by 50%", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9349662/" },
            { description: "Epitalon corrects circadian rhythms", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12937682/" },
        ],
    },
    {
        stack_name: "Longevity & Anti-Aging Stack",
        goal: "Target the fundamental hallmarks of aging: telomere attrition, mitochondrial dysfunction, and gene expression",
        peptides: [
            { name: "Epitalon", role_in_stack: "Activates telomerase to protect and lengthen chromosomal telomeres — addressing aging at the DNA level" },
            { name: "MOTS-c", role_in_stack: "Restores youth-level mitochondrial efficiency to combat age-related metabolic and physical decline" },
            { name: "GHK-Cu", role_in_stack: "Epigenetically resets over 4,000 genes to a younger, more regenerative state" },
        ],
        synergy_rationale: "This 3-piece covers the holy trinity of anti-aging. Epitalon protects the cell's lifespan (telomeres). MOTS-c protects the cell's engine (mitochondria). GHK-Cu protects the cell's instruction manual (epigenetic gene expression).",
        supporting_studies: [
            { description: "Epitalon extends lifespan in animal models", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12937682/" },
            { description: "MOTS-c prevents age-dependent physical decline", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25710270/" },
            { description: "GHK-Cu gene reset data", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17703734/" },
        ],
    },
    {
        stack_name: "Skin & Aesthetic Rejuvenation Stack",
        goal: "Radically improve skin elasticity, texture, wrinkle reduction, and stimulate hair regrowth",
        peptides: [
            { name: "GHK-Cu", role_in_stack: "The core aesthetic peptide — massively stimulates collagen, elastin, and glycosaminoglycan synthesis in the skin" },
            { name: "BPC-157", role_in_stack: "Forces new blood vessel formation (angiogenesis) to deliver superior nourishment and oxygen directly to skin cells" },
        ],
        synergy_rationale: "GHK-Cu provides the 'building blocks' by upregulating collagen and elastin production. BPC-157 provides the 'supply lines' by building new capillaries to ensure those skin cells have the blood flow to actually execute the rebuilding process.",
        supporting_studies: [
            { description: "GHK-Cu promotes robust skin regeneration", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17703734/" },
            { description: "BPC-157 angiogenesis and tissue healing", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030658/" },
        ],
    },
    {
        stack_name: "Gut Health & Recovery Stack",
        goal: "Aggressively repair leaky gut damage and halt chronic gastrointestinal inflammation",
        peptides: [
            { name: "BPC-157", role_in_stack: "Originally discovered in gastric juice — uniquely adapted to rapidly repair ulcers, fistulas, and intestinal mucosal damage" },
            { name: "KPV", role_in_stack: "An ultra-potent local anti-inflammatory that specifically suppresses the NF-κB pathways driving inflammatory bowel conditions" },
        ],
        synergy_rationale: "BPC-157 handles the physical, structural repair of the tight junctions in the gut lining (stopping 'leaky gut'). KPV acts as the fire extinguisher, shutting down the chronic localized inflammation (like Crohn's or colitis) that caused the damage in the first place.",
        supporting_studies: [
            { description: "BPC-157 profound gut healing effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030658/" },
            { description: "KPV anti-inflammatory activity in IBD models", pubmed_url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12753158/" },
        ],
    },
    {
        stack_name: "Metabolic & Insulin Sensitivity Stack",
        goal: "Reverse insulin resistance, lower blood glucose, and restore metabolic flexibility",
        peptides: [
            { name: "Tirzepatide", role_in_stack: "The FDA-approved gold standard for enforcing glycemic control and reversing insulin resistance centrally" },
            { name: "MOTS-c", role_in_stack: "Activates AMPK directly in the muscle tissue to force cellular glucose uptake independent of insulin" },
        ],
        synergy_rationale: "Tirzepatide fixes the metabolic hormones from the top down (pancreas/brain). MOTS-c fixes the metabolism from the bottom up (forcing muscle cells to absorb and burn glucose directly). Combining them attacks insulin resistance from every possible cellular angle.",
        supporting_studies: [
            { description: "Tirzepatide Phase 3 metabolic outcomes", pubmed_url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038" },
            { description: "MOTS-c insulin sensitizing effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25710270/" },
        ],
    },
    {
        stack_name: "Hormonal Optimization Stack (Male)",
        goal: "Naturally stimulate the HPG axis to boost testosterone without shutting down natural production",
        peptides: [
            { name: "Kisspeptin-10", role_in_stack: "The master upstream regulator — stimulates the brain to release GnRH, which signals the testes to produce natural testosterone" },
            { name: "CJC-1295", role_in_stack: "Provides the sustained Growth Hormone elevation required to complement testosterone's anabolic effects" },
            { name: "Ipamorelin", role_in_stack: "Triggers GH release without raising cortisol (which would otherwise suppress natural testosterone production)" },
        ],
        synergy_rationale: "Kisspeptin-10 directly turns the body's natural testosterone factory back on (unlike TRT, which shuts it down). CJC and Ipamorelin run in the background to elevate GH/IGF-1 — because testosterone and GH act synergistically to drive male vitality and body composition. Ipamorelin is specifically chosen because it does not spike cortisol.",
        supporting_studies: [
            { description: "Kisspeptin-10 stimulates LH and testosterone", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23440713/" },
            { description: "Synergistic GH release effects", pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/" },
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
