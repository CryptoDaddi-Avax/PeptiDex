export interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export interface LessonSection {
    title: string;
    content: string;
}

export interface LearningModule {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
    estimatedMinutes: number;
    sections: LessonSection[];
    quiz: QuizQuestion[];
}

export const learningModules: LearningModule[] = [
    {
        id: "what-are-peptides",
        title: "What Are Peptides?",
        subtitle: "The building blocks of life — and modern biohacking",
        icon: "??",
        estimatedMinutes: 8,
        sections: [
            {
                title: "Peptides 101",
                content: "Peptides are short chains of amino acids — the same building blocks that make up proteins. While proteins can be thousands of amino acids long, peptides are typically 2-50 amino acids. Think of them as 'mini-proteins' with very specific biological functions.\n\nYour body naturally produces thousands of peptides. Insulin, oxytocin, and endorphins are all peptides. Therapeutic peptides are lab-synthesized versions of these natural compounds, or slight modifications designed for specific effects."
            },
            {
                title: "Peptides vs. Proteins vs. Amino Acids",
                content: "**Amino Acids** are single molecules — the individual letters.\n**Peptides** are short chains (2-50 amino acids) — like words.\n**Proteins** are long chains (50+ amino acids) — full sentences.\n\nSize matters: smaller peptides can cross membranes more easily, have higher bioavailability, and often target very specific receptors — making them ideal as signaling molecules."
            },
            {
                title: "How Peptides Work",
                content: "Most therapeutic peptides work by mimicking natural signaling molecules. They bind to specific receptors on cell surfaces, triggering a biological response. For example:\n\n• **CJC-1295** mimics your body's Growth Hormone Releasing Hormone (GHRH), telling the pituitary gland to release more GH.\n• **BPC-157** is derived from a stomach-protective protein, accelerating healing by upregulating growth factors and promoting blood vessel formation.\n• **PT-141** mimics alpha-MSH, activating melanocortin receptors in the brain involved in sexual arousal.\n\nBecause they mimic natural molecules, peptides generally have fewer side effects than traditional pharmaceuticals."
            },
            {
                title: "Why Peptides Are Gaining Attention",
                content: "Several converging factors have driven peptide interest:\n\n1. **Precision** — Peptides target specific receptors with high selectivity\n2. **Safety Profile** — Generally well-tolerated since they mimic natural compounds\n3. **Research Volume** — Thousands of published studies on PubMed\n4. **FDA Approvals** — Tesamorelin (Egrifta) and PT-141 (Vyleesi) are FDA-approved peptides\n5. **Personalization** — Different peptides for different goals: healing, cognition, fat loss, muscle growth, longevity"
            }
        ],
        quiz: [
            { question: "How many amino acids typically make up a peptide?", options: ["1", "2-50", "50-500", "500+"], correctIndex: 1, explanation: "Peptides are short chains of 2-50 amino acids. Chains longer than ~50 amino acids are classified as proteins." },
            { question: "Which of these is NOT a natural peptide your body produces?", options: ["Insulin", "Oxytocin", "Caffeine", "Endorphins"], correctIndex: 2, explanation: "Caffeine is an alkaloid, not a peptide. Insulin, oxytocin, and endorphins are all naturally occurring peptides." },
            { question: "Why are many peptides studied by injection rather than by mouth?", options: ["They taste bad", "Stomach acid and digestive enzymes break them down", "Injection is required by law", "Oral forms do not exist"], correctIndex: 1, explanation: "Peptides are chains of amino acids that digestive enzymes and stomach acid break down in the gut, which is why many published studies use subcutaneous or other parenteral routes. Some peptides have also been studied in oral, intranasal, or topical forms." }
        ]
    },
    {
        id: "how-they-work",
        title: "How Peptides Work in the Body",
        subtitle: "Receptors, signaling, and why specificity matters",
        icon: "??",
        estimatedMinutes: 10,
        sections: [
            {
                title: "Receptor Binding",
                content: "Every cell in your body has receptors — protein molecules on its surface that act like locks. Peptides are the keys. When a peptide binds to its target receptor, it triggers a cascade of intracellular signaling that produces a specific biological effect.\n\nThis 'lock and key' mechanism is why peptides are so specific: BPC-157 can accelerate healing without affecting appetite, while Semax can support focus without affecting healing. Each peptide has its own receptor targets."
            },
            {
                title: "The Growth Hormone Axis",
                content: "Many popular peptides work through the GH axis:\n\n**Hypothalamus** ? releases GHRH ? **Pituitary Gland** ? releases GH ? **Liver** ? produces IGF-1\n\n• **GHRH analogs** (CJC-1295, Sermorelin) stimulate the first step\n• **GHRP/Ghrelin mimetics** (Ipamorelin) stimulate GH release through a separate pathway\n• **Combining GHRH + GHRP** creates a synergistic GH pulse much larger than either alone\n• **IGF-1 LR3** skips the entire axis and directly provides the downstream growth factor"
            },
            {
                title: "Half-Life",
                content: "Half-life is how long it takes for half of a peptide to be cleared from circulation. It is one of the core pharmacokinetic properties reported in published research:\n\n• **Very short** (minutes): Sermorelin (about 12 min), DSIP (about 8 min)\n• **Short** (hours): BPC-157, Semax\n• **Long** (days): CJC-1295 with DAC (reported at about 6-8 days)\n\nHalf-life is one reason administration schedules differ between studies. Doses studied in published research varied by model and route; see the cited studies on each compound page.\n\nSome natural hormones, such as growth hormone, are released in pulses, which is why researchers compare short-acting and long-acting analogs."
            },
            {
                title: "Complementary Pathways",
                content: "Some peptides act on different steps of the same biological pathway, and researchers have studied how those mechanisms interact:\n\n• **GHRH analogs + GH secretagogues**: A GHRH analog (such as CJC-1295) and a ghrelin-receptor agonist (such as Ipamorelin) act on separate pituitary receptors. Studies of GHRH combined with GH secretagogues have reported a larger GH response than either signal alone.\n• **BPC-157 and TB-500**: In preclinical models these act through different mechanisms: BPC-157 has been studied for effects on blood vessel formation and growth factors, TB-500 (a thymosin beta-4 fragment) for effects on cell migration.\n\nCompounds that share the same receptor target (for example two GHRPs such as Ipamorelin and GHRP-6, or Melanotan II and PT-141 at melanocortin receptors) overlap in mechanism rather than complement each other."
            }
        ],
        quiz: [
            { question: "What is the 'lock and key' model in peptide pharmacology?", options: ["Peptides unlock cell walls", "Peptides bind to specific receptors", "Peptides are stored under lock", "Peptides need a second molecule to activate"], correctIndex: 1, explanation: "Peptides bind to specific receptors on cells (the 'lock'), triggering biological responses. This specificity is why different peptides have different effects." },
            { question: "Which pair combines a GHRH analog with a ghrelin-receptor agonist?", options: ["BPC-157 + Semax", "CJC-1295 + Ipamorelin", "Melanotan II + PT-141", "DSIP + AOD-9604"], correctIndex: 1, explanation: "CJC-1295 is a GHRH analog and Ipamorelin is a ghrelin-receptor agonist (GHRP). They act on separate receptors in the GH axis, which is why researchers have studied the two mechanisms together." },
            { question: "What mainly distinguishes CJC-1295 with DAC from CJC-1295 without DAC?", options: ["Its receptor target", "Its half-life", "Its amino acid count", "Its FDA status"], correctIndex: 1, explanation: "The Drug Affinity Complex (DAC) binds to albumin in the blood, extending the reported half-life from roughly 30 minutes to about 6-8 days. Both versions target the GHRH receptor." }
        ]
    },
    {
        id: "safety-and-sourcing",
        title: "Safety & Sourcing",
        subtitle: "How to evaluate quality and minimize risk",
        icon: "???",
        estimatedMinutes: 8,
        sections: [
            {
                title: "The Safety Spectrum",
                content: "Not all peptides carry the same risk level:\n\n**FDA-Approved** (Lowest Risk): Tesamorelin, PT-141 — extensive human trial data, known side effects, prescribed by doctors.\n\n**Well-Studied** (Lower Risk): BPC-157, TB-500, CJC-1295, Ipamorelin — extensive preclinical data, long track record of human use, but NOT FDA-approved.\n\n**Emerging Research** (Higher Risk): MOTS-c, SS-31, Dihexa — promising preclinical data but limited human studies. More unknowns.\n\n**Research-Only** (Highest Risk): Follistatin-344, IGF-1 LR3 — potent compounds with limited safety data and higher risk of adverse effects."
            },
            {
                title: "Sourcing Quality",
                content: "Prescription products dispensed by licensed pharmacies are subject to pharmacy quality standards. Research-use peptides are not approved for human use; when evaluating a research supplier, check:\n\n1. **Certificate of Analysis (COA)** — Third-party lab testing confirming identity and purity (≥98% is a common benchmark).\n2. **HPLC + Mass Spectrometry** — The gold standard testing methods. Both should appear on the COA.\n3. **Batch matching** — The COA should match the specific batch/lot number of the product.\n4. **Reputation** — Established vendors with transparent testing, not anonymous sellers.\n5. **Storage and Shipping** — Lyophilized peptides are typically stable at room temperature in transit; reconstituted solutions require cold storage."
            },
            {
                title: "Side Effects and Red Flags",
                content: "Adverse effects reported in published studies and case reports include:\n• Injection-site redness/irritation (subcutaneous administration)\n• Nausea (PT-141, Melanotan II)\n• Fatigue or water retention (GH-axis peptides)\n• Flushing (Melanotan II)\n\n**Serious reactions described in the literature** include severe allergic reactions, cardiovascular symptoms, vision changes, and changes in moles (Melanotan II case reports). Symptoms like these warrant prompt medical care.\n\n**Excluded populations:** pregnancy and breastfeeding are excluded from nearly all peptide studies, and active or suspected cancer is a standard contraindication for approved GH-axis drugs."
            },
            {
                title: "Working With a Doctor",
                content: "The safest approach to peptide therapy:\n\n1. **Find a peptide-knowledgeable provider** — Anti-aging clinics, integrative medicine, functional medicine, or sports medicine doctors often have peptide experience.\n2. **Get baseline blood work** — IGF-1, CMP, CBC, hormones, CRP, HbA1c before starting.\n3. **Get a prescription** — Many peptides can be legally prescribed and obtained from compounding pharmacies.\n4. **Monitor** — Regular blood work during use to track biomarkers.\n5. **Report side effects** — Track everything and communicate with your provider."
            }
        ],
        quiz: [
            { question: "What does a COA verify?", options: ["Peptide taste", "Peptide purity and identity", "Peptide legality", "Peptide shipping date"], correctIndex: 1, explanation: "A Certificate of Analysis (COA) is third-party lab testing that verifies peptide identity and purity. Look for ≥98% purity confirmed by HPLC and mass spectrometry." },
            { question: "Which peptides are FDA-approved?", options: ["BPC-157 and TB-500", "Tesamorelin and PT-141", "All GH peptides", "None"], correctIndex: 1, explanation: "Tesamorelin (Egrifta) and PT-141 (Vyleesi) are FDA-approved peptides with extensive clinical trial data." },
            { question: "Which of these is a red-flag reaction that needs urgent medical attention?", options: ["Mild injection site redness", "Slight nausea", "Severe allergic reaction or chest pain", "Temporary fatigue"], correctIndex: 2, explanation: "Severe allergic reactions, chest pain, or difficulty breathing are medical emergencies. Mild injection site redness is a commonly reported minor reaction in published studies." }
        ]
    },
];
