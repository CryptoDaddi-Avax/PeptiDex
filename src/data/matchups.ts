/**
 * Head-to-head matchups for SEO comparison pages.
 * Each entry generates a page at /vs/[slug] e.g. /vs/bpc-157-vs-tb-500
 */

export interface Matchup {
    slug: string;
    peptideA: string; // must match peptides[].name
    peptideB: string;
    title: string;
    metaDescription: string;
    verdict: string;
    verdictDetail: string;
    comparisonPoints: {
        category: string;
        a: string;
        b: string;
        winner?: "a" | "b" | "tie";
    }[];
    faqs: { question: string; answer: string }[];
}

export const matchups: Matchup[] = [
    {
        slug: "bpc-157-vs-tb-500",
        peptideA: "BPC-157", peptideB: "TB-500",
        title: "BPC-157 vs TB-500: Which Healing Peptide Is Better?",
        metaDescription: "Detailed comparison of BPC-157 and TB-500 for injury recovery. Mechanisms, dosing, evidence, side effects, and which to choose for your specific injury type.",
        verdict: "Use both together for best results",
        verdictDetail: "BPC-157 excels at localized tissue repair (tendons, gut, ligaments) while TB-500 provides systemic anti-inflammatory and cell migration benefits. The combination is the most popular healing stack in the peptide community.",
        comparisonPoints: [
            { category: "Primary Use", a: "Localized tissue repair, gut healing", b: "Systemic healing, flexibility, inflammation", winner: "tie" },
            { category: "Mechanism", a: "Angiogenesis, collagen synthesis, growth factor modulation", b: "Actin upregulation, cell migration, stem cell maturation", winner: "tie" },
            { category: "Evidence Level", a: "Strong preclinical (35+ studies)", b: "Moderate preclinical", winner: "a" },
            { category: "Half-Life", a: "~4 hours", b: "~6-8 hours", winner: "b" },
            { category: "Injection Frequency", a: "1-2x daily", b: "2-3x per week", winner: "b" },
            { category: "Typical Dose", a: "250-500 mcg", b: "2-5 mg (2x/week)", winner: "tie" },
            { category: "Cost", a: "~$44-55/vial (5mg)", b: "~$58-72/vial (5mg)", winner: "a" },
            { category: "Side Effects", a: "Minimal (lightheadedness, nausea)", b: "Minimal (head rush, lethargy)", winner: "tie" },
            { category: "Best For", a: "Tendon/ligament injuries, gut issues, specific injury sites", b: "Whole-body recovery, muscle injuries, flexibility", winner: "tie" },
        ],
        faqs: [
            { question: "Can I take BPC-157 and TB-500 together?", answer: "Yes — this is the most popular healing stack. They work through different mechanisms and are highly synergistic. BPC-157 repairs locally while TB-500 reduces systemic inflammation." },
            { question: "Which is better for tendon injuries?", answer: "BPC-157 has stronger evidence for tendon and ligament repair specifically. TB-500 complements by reducing inflammation and improving overall mobility." },
            { question: "How long should I run BPC-157 vs TB-500?", answer: "Typical BPC-157 cycles are 4-12 weeks. TB-500 is often run 4-6 weeks for loading, then 2x/month for maintenance." },
        ],
    },
    {
        slug: "semaglutide-vs-tirzepatide",
        peptideA: "Semaglutide", peptideB: "Tirzepatide",
        title: "Semaglutide vs Tirzepatide: Which Weight Loss Peptide Wins?",
        metaDescription: "Head-to-head comparison of Semaglutide (Ozempic/Wegovy) vs Tirzepatide (Mounjaro). Weight loss results, side effects, cost, and which is right for you.",
        verdict: "Tirzepatide shows superior weight loss results",
        verdictDetail: "While both are FDA-approved GLP-1 agonists, Tirzepatide's dual GLP-1/GIP mechanism delivers ~21% weight loss vs Semaglutide's ~15%. However, Semaglutide has more long-term safety data and cardiovascular benefits.",
        comparisonPoints: [
            { category: "FDA Approved", a: "Yes (Wegovy/Ozempic)", b: "Yes (Mounjaro/Zepbound)", winner: "tie" },
            { category: "Mechanism", a: "GLP-1 agonist (single)", b: "GLP-1 + GIP dual agonist", winner: "b" },
            { category: "Weight Loss", a: "~15% body weight", b: "~21% body weight", winner: "b" },
            { category: "Injection Frequency", a: "Weekly", b: "Weekly", winner: "tie" },
            { category: "Cardiovascular Data", a: "SELECT trial: 20% CV risk reduction", b: "SURPASS trials: promising but less data", winner: "a" },
            { category: "GI Side Effects", a: "Nausea ~20%, vomiting ~10%", b: "Nausea ~18%, vomiting ~8%", winner: "b" },
            { category: "Cost (Research)", a: "~$110-118/vial", b: "~$125-135/vial", winner: "a" },
            { category: "Long-term Data", a: "6+ years of real-world data", b: "~3 years clinical data", winner: "a" },
        ],
        faqs: [
            { question: "Which causes more weight loss?", answer: "Tirzepatide consistently shows greater weight loss (~21% vs ~15%) in head-to-head clinical trials, due to its dual GLP-1/GIP mechanism." },
            { question: "Can I switch from Semaglutide to Tirzepatide?", answer: "Yes, but consult your physician. Typically you'd taper off one before starting the other. Don't combine them as they act on overlapping pathways." },
            { question: "Which has fewer side effects?", answer: "Both have similar GI side effect profiles. Tirzepatide may have slightly lower nausea rates in trials. Most side effects resolve within 4-8 weeks." },
        ],
    },
    {
        slug: "cjc-1295-vs-ipamorelin",
        peptideA: "CJC-1295", peptideB: "Ipamorelin",
        title: "CJC-1295 vs Ipamorelin: GH Secretagogue Comparison",
        metaDescription: "CJC-1295 vs Ipamorelin detailed comparison. Why they're better together, dosing protocols, mechanisms, and which to choose for GH optimization.",
        verdict: "Best used together — they're synergistic",
        verdictDetail: "CJC-1295 (GHRH analog) and Ipamorelin (ghrelin mimetic) act on different receptors. Combined, they amplify GH release 2-3x more than either alone. This is the gold standard GH peptide stack.",
        comparisonPoints: [
            { category: "Class", a: "GHRH analog", b: "Ghrelin mimetic (GHRP)", winner: "tie" },
            { category: "Mechanism", a: "Amplifies GH releasing hormone signal", b: "Mimics ghrelin at GH secretagogue receptor", winner: "tie" },
            { category: "Half-Life", a: "~30 min (with DAC: 8 days)", b: "~2 hours", winner: "a" },
            { category: "Cortisol Impact", a: "None", b: "None (unique among GHRPs)", winner: "tie" },
            { category: "Hunger Increase", a: "No", b: "Minimal vs other GHRPs", winner: "tie" },
            { category: "Typical Dose", a: "100-300 mcg", b: "200-300 mcg", winner: "tie" },
            { category: "Cost", a: "~$42-48/vial (2mg)", b: "~$44-50/vial (5mg)", winner: "tie" },
            { category: "Best Solo", a: "Sustained baseline GH elevation", b: "Clean GH pulses without side effects", winner: "tie" },
        ],
        faqs: [
            { question: "Should I take CJC-1295 and Ipamorelin together?", answer: "Yes — this is the most recommended GH peptide stack. They work on different receptor systems (GHRH vs GHSR) creating synergistic amplification of growth hormone release." },
            { question: "When should I inject CJC-1295 + Ipamorelin?", answer: "Most protocols recommend pre-bed injection to amplify the natural nighttime GH surge. Some users add a morning dose. Always inject on an empty stomach." },
            { question: "Do I need both or can I use just one?", answer: "Either works alone, but the combination is significantly more effective. If choosing one, Ipamorelin is often preferred for its clean side effect profile." },
        ],
    },
    {
        slug: "semax-vs-selank",
        peptideA: "Semax", peptideB: "Selank",
        title: "Semax vs Selank: Which Nootropic Peptide Is Better?",
        metaDescription: "Semax vs Selank comparison for cognitive enhancement. Focus, anxiety, mechanism, dosing, and which brain peptide to choose.",
        verdict: "Semax for focus, Selank for anxiety — or use both",
        verdictDetail: "Semax enhances BDNF for neuroplasticity and focus. Selank modulates GABA for anxiety reduction without sedation. They complement each other perfectly and are often stacked.",
        comparisonPoints: [
            { category: "Primary Effect", a: "Focus, memory, neuroplasticity", b: "Anxiety reduction, calm focus", winner: "tie" },
            { category: "Mechanism", a: "BDNF upregulation, serotonin/dopamine modulation", b: "GABA modulation, enkephalinase inhibition", winner: "tie" },
            { category: "Route", a: "Nasal spray", b: "Nasal spray", winner: "tie" },
            { category: "Onset", a: "10-15 minutes", b: "10-15 minutes", winner: "tie" },
            { category: "Duration", a: "4-6 hours", b: "4-8 hours", winner: "b" },
            { category: "Best For", a: "Studying, deep work, cognitive recovery", b: "Social anxiety, stress, calm productivity", winner: "tie" },
            { category: "Side Effects", a: "Rare (irritability at high doses)", b: "Very rare (fatigue in some)", winner: "tie" },
            { category: "Cost", a: "~$68-78/vial (30mg)", b: "~$68-78/vial (30mg)", winner: "tie" },
        ],
        faqs: [
            { question: "Can I use Semax and Selank together?", answer: "Yes — they're commonly stacked. Semax handles focus and neuroplasticity while Selank removes anxiety that interferes with performance. Use Semax in the morning, Selank as needed for anxiety." },
            { question: "Which is better for studying?", answer: "Semax, due to its BDNF-enhancing effects that improve memory formation and focus. Add Selank if test anxiety is a factor." },
            { question: "Are these peptides addictive?", answer: "No. Neither Semax nor Selank shows addictive potential. They don't act on reward pathways like traditional stimulants." },
        ],
    },
    {
        slug: "ghk-cu-vs-bpc-157",
        peptideA: "GHK-Cu", peptideB: "BPC-157",
        title: "GHK-Cu vs BPC-157: Skin & Healing Comparison",
        metaDescription: "GHK-Cu vs BPC-157 for skin rejuvenation and healing. Collagen, anti-aging, wound healing, and which peptide to choose.",
        verdict: "GHK-Cu for skin/anti-aging, BPC-157 for injury repair",
        verdictDetail: "GHK-Cu resets gene expression toward younger patterns and rebuilds the skin matrix. BPC-157 is better for acute injuries and gut healing. For skin specifically, GHK-Cu is superior.",
        comparisonPoints: [
            { category: "Primary Use", a: "Skin rejuvenation, anti-aging, hair", b: "Injury repair, gut healing, tissue recovery", winner: "tie" },
            { category: "Mechanism", a: "Gene expression reset (4000+ genes), copper delivery", b: "Angiogenesis, collagen deposition, growth factors", winner: "tie" },
            { category: "Route", a: "SubQ, topical, or both", b: "SubQ (near injury site)", winner: "a" },
            { category: "Evidence for Skin", a: "Strong (collagen, elastin, GAG synthesis)", b: "Moderate (wound healing, not cosmetic)", winner: "a" },
            { category: "Evidence for Injuries", a: "Limited", b: "Strong (35+ preclinical studies)", winner: "b" },
            { category: "Anti-Aging", a: "Yes — reverses gene expression age markers", b: "Limited anti-aging evidence", winner: "a" },
            { category: "Cost", a: "~$48-58/vial (50mg)", b: "~$44-55/vial (5mg)", winner: "tie" },
        ],
        faqs: [
            { question: "Which is better for wrinkles and skin quality?", answer: "GHK-Cu is significantly better for cosmetic skin improvement. It stimulates collagen, elastin, and glycosaminoglycan synthesis while resetting gene expression toward younger patterns." },
            { question: "Can I use both GHK-Cu and BPC-157?", answer: "Yes — they're synergistic. BPC-157 enhances blood vessel formation for better skin nourishment, while GHK-Cu rebuilds the structural matrix." },
            { question: "Can I apply GHK-Cu topically?", answer: "Yes — GHK-Cu is available in topical formulations (creams, serums). Topical application is effective for facial skin. SubQ injection provides more systemic anti-aging effects." },
        ],
    },
    {
        slug: "retatrutide-vs-tirzepatide",
        peptideA: "Retatrutide", peptideB: "Tirzepatide",
        title: "Retatrutide vs Tirzepatide: Triple vs Dual Agonist",
        metaDescription: "Retatrutide vs Tirzepatide comparison for weight loss. Triple agonist vs dual agonist mechanisms, clinical results, and which shows more promise.",
        verdict: "Retatrutide shows more weight loss but is newer",
        verdictDetail: "Retatrutide's triple GLP-1/GIP/glucagon agonism delivered ~24% weight loss vs Tirzepatide's ~21%. However, Tirzepatide is FDA-approved with more safety data.",
        comparisonPoints: [
            { category: "Mechanism", a: "Triple: GLP-1 + GIP + Glucagon", b: "Dual: GLP-1 + GIP", winner: "a" },
            { category: "Weight Loss", a: "~24% at 48 weeks (Phase 2)", b: "~21% (Phase 3, approved)", winner: "a" },
            { category: "FDA Status", a: "Phase 3 trials (not yet approved)", b: "FDA approved (Mounjaro/Zepbound)", winner: "b" },
            { category: "Glucagon Component", a: "Yes — drives fat oxidation", b: "No", winner: "a" },
            { category: "Safety Data", a: "Phase 2 only (~1,000 patients)", b: "Extensive Phase 3 + real-world", winner: "b" },
            { category: "Cost (Research)", a: "~$165-178/vial", b: "~$125-135/vial", winner: "b" },
            { category: "Availability", a: "Research only", b: "Prescription available", winner: "b" },
        ],
        faqs: [
            { question: "Is Retatrutide better than Tirzepatide?", answer: "For pure weight loss, early data suggests yes (~24% vs ~21%). But Tirzepatide has FDA approval, more safety data, and is more accessible. Retatrutide is still in Phase 3 trials." },
            { question: "What makes Retatrutide different?", answer: "It's the first triple agonist — adding glucagon receptor activation on top of GLP-1/GIP. Glucagon drives fat oxidation directly, which may explain the superior weight loss." },
            { question: "When will Retatrutide be FDA approved?", answer: "Eli Lilly's Phase 3 trials are ongoing. Best estimates are 2026-2027 for potential FDA approval, pending trial results." },
        ],
    },
    {
        slug: "epitalon-vs-ghk-cu",
        peptideA: "Epitalon", peptideB: "GHK-Cu",
        title: "Epitalon vs GHK-Cu: Which Anti-Aging Peptide Is Better?",
        metaDescription: "Epitalon vs GHK-Cu for anti-aging and longevity. Telomerase activation vs gene expression reset — mechanisms, evidence, and which to choose.",
        verdict: "Different targets — use both for maximum anti-aging",
        verdictDetail: "Epitalon activates telomerase to protect chromosomes from aging. GHK-Cu resets gene expression across 4,000+ genes. They target completely different aging mechanisms and are ideal together.",
        comparisonPoints: [
            { category: "Anti-Aging Mechanism", a: "Telomerase activation (telomere protection)", b: "Gene expression reset (4,000+ genes)", winner: "tie" },
            { category: "Visible Effects", a: "Subtle (melatonin, sleep quality improvement)", b: "More visible (skin, hair, nails)", winner: "b" },
            { category: "Evidence", a: "Animal studies (lifespan extension in rats)", b: "Clinical (skin regeneration, wound healing)", winner: "tie" },
            { category: "Route", a: "SubQ", b: "SubQ or topical", winner: "b" },
            { category: "Cycle Pattern", a: "10-day cycles, 2-3x per year", b: "Continuous daily use", winner: "a" },
            { category: "Cost", a: "~$55-62/vial (10mg)", b: "~$48-58/vial (50mg)", winner: "tie" },
        ],
        faqs: [
            { question: "Which anti-aging peptide should I start with?", answer: "GHK-Cu for visible results (skin, hair). Epitalon for foundational cellular aging protection. If budget allows, use both — they target completely different aging mechanisms." },
            { question: "How long until I see results?", answer: "GHK-Cu: skin improvements in 4-6 weeks. Epitalon: effects are cellular-level (telomere protection) — you won't 'see' results, but blood work may show improved melatonin and biomarkers." },
        ],
    },
    {
        slug: "sermorelin-vs-ipamorelin",
        peptideA: "Sermorelin", peptideB: "Ipamorelin",
        title: "Sermorelin vs Ipamorelin: Which GH Peptide to Choose?",
        metaDescription: "Sermorelin vs Ipamorelin comparison for growth hormone optimization. Clinical evidence, dosing, side effects, and which is right for your goals.",
        verdict: "Sermorelin for clinical backing, Ipamorelin for cleaner profile",
        verdictDetail: "Sermorelin has been used clinically since the 1990s with proven lean mass benefits. Ipamorelin is newer with fewer side effects (no cortisol/prolactin spikes). Both are excellent entry points.",
        comparisonPoints: [
            { category: "Class", a: "GHRH analog (natural pathway)", b: "Ghrelin mimetic (GHRP)", winner: "tie" },
            { category: "Clinical History", a: "FDA-approved diagnostic, used since 1990s", b: "Newer, research phase", winner: "a" },
            { category: "Cortisol Impact", a: "Minimal", b: "None", winner: "b" },
            { category: "Prolactin Impact", a: "Minimal", b: "None", winner: "b" },
            { category: "Hunger Increase", a: "No", b: "Minimal to none", winner: "tie" },
            { category: "Half-Life", a: "~10-20 minutes", b: "~2 hours", winner: "b" },
            { category: "Cost", a: "~$36-40/vial (2mg)", b: "~$44-50/vial (5mg)", winner: "a" },
        ],
        faqs: [
            { question: "Which is better for beginners?", answer: "Both are great entry-level GH peptides. Ipamorelin has fewer potential side effects. Sermorelin is more affordable and has longer clinical history." },
            { question: "Can I combine Sermorelin and Ipamorelin?", answer: "You can, but CJC-1295 + Ipamorelin is the more common stack since CJC-1295 provides long-acting GHRH stimulation that pairs better with Ipamorelin's ghrelin-axis action." },
        ],
    },
];

export function getMatchup(slug: string): Matchup | undefined {
    return matchups.find((m) => m.slug === slug);
}
