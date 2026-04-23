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
        subtitle: "The building blocks of life   and modern biohacking",
        icon: "??",
        estimatedMinutes: 8,
        sections: [
            {
                title: "Peptides 101",
                content: "Peptides are short chains of amino acids   the same building blocks that make up proteins. While proteins can be thousands of amino acids long, peptides are typically 2-50 amino acids. Think of them as 'mini-proteins' with very specific biological functions.\n\nYour body naturally produces thousands of peptides. Insulin, oxytocin, and endorphins are all peptides. Therapeutic peptides are lab-synthesized versions of these natural compounds, or slight modifications designed for specific effects."
            },
            {
                title: "Peptides vs. Proteins vs. Amino Acids",
                content: "**Amino Acids** are single molecules   the individual letters.\n**Peptides** are short chains (2-50 amino acids)   like words.\n**Proteins** are long chains (50+ amino acids)   full sentences.\n\nSize matters: smaller peptides can cross membranes more easily, have higher bioavailability, and often target very specific receptors   making them ideal as signaling molecules."
            },
            {
                title: "How Peptides Work",
                content: "Most therapeutic peptides work by mimicking natural signaling molecules. They bind to specific receptors on cell surfaces, triggering a biological response. For example:\n\n• **CJC-1295** mimics your body's Growth Hormone Releasing Hormone (GHRH), telling the pituitary gland to release more GH.\n• **BPC-157** is derived from a stomach-protective protein, accelerating healing by upregulating growth factors and promoting blood vessel formation.\n• **Semaglutide** mimics the gut hormone GLP-1, reducing appetite and improving insulin sensitivity.\n\nBecause they mimic natural molecules, peptides generally have fewer side effects than traditional pharmaceuticals."
            },
            {
                title: "Why Peptides Are Gaining Attention",
                content: "Several converging factors have driven peptide interest:\n\n1. **Precision**   Peptides target specific receptors with high selectivity\n2. **Safety Profile**   Generally well-tolerated since they mimic natural compounds\n3. **Research Volume**   Thousands of published studies on PubMed\n4. **FDA Approvals**   Semaglutide (Ozempic/Wegovy), PT-141 (Vyleesi), and Tirzepatide (Mounjaro) are FDA-approved peptides\n5. **Personalization**   Different peptides for different goals: healing, cognition, fat loss, muscle growth, longevity"
            }
        ],
        quiz: [
            { question: "How many amino acids typically make up a peptide?", options: ["1", "2-50", "50-500", "500+"], correctIndex: 1, explanation: "Peptides are short chains of 2-50 amino acids. Chains longer than ~50 amino acids are classified as proteins." },
            { question: "Which of these is NOT a natural peptide your body produces?", options: ["Insulin", "Oxytocin", "Caffeine", "Endorphins"], correctIndex: 2, explanation: "Caffeine is an alkaloid, not a peptide. Insulin, oxytocin, and endorphins are all naturally occurring peptides." },
            { question: "Why do most peptides need to be injected?", options: ["They taste bad", "Stomach acid destroys them (first-pass metabolism)", "They work faster that way", "Legal requirements"], correctIndex: 1, explanation: "Peptides are chains of amino acids that get broken down by digestive enzymes and stomach acid if taken orally, which is why most are administered via SubQ injection." }
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
                content: "Every cell in your body has receptors   protein molecules on its surface that act like locks. Peptides are the keys. When a peptide binds to its target receptor, it triggers a cascade of intracellular signaling that produces a specific biological effect.\n\nThis 'lock and key' mechanism is why peptides are so specific: BPC-157 can accelerate healing without affecting appetite, while Semaglutide can reduce appetite without affecting healing. Each peptide has its own receptor targets."
            },
            {
                title: "The Growth Hormone Axis",
                content: "Many popular peptides work through the GH axis:\n\n**Hypothalamus** ? releases GHRH ? **Pituitary Gland** ? releases GH ? **Liver** ? produces IGF-1\n\n• **GHRH analogs** (CJC-1295, Sermorelin) stimulate the first step\n• **GHRP/Ghrelin mimetics** (Ipamorelin) stimulate GH release through a separate pathway\n• **Combining GHRH + GHRP** creates a synergistic GH pulse much larger than either alone\n• **IGF-1 LR3** skips the entire axis and directly provides the downstream growth factor"
            },
            {
                title: "Half-Life and Dosing",
                content: "Half-life is how long it takes for half of the peptide to be cleared from your body. This determines dosing frequency:\n\n• **Very short** (minutes): Sermorelin (12 min), DSIP (8 min)   need daily dosing\n• **Short** (hours): BPC-157 (4h), Semax (1h)   daily dosing\n• **Medium** (days): CJC-1295 with DAC (8 days)   2x/week dosing\n• **Long** (1 week): Semaglutide (7 days), Tirzepatide (5 days)   weekly dosing\n\nLonger isn't always better   some peptides work best in pulsatile patterns that mimic natural hormone release."
            },
            {
                title: "Synergies and Stacking",
                content: "Certain peptides amplify each other's effects when used together:\n\n• **CJC-1295 + Ipamorelin**: The most popular GH stack. CJC provides a sustained GHRH signal while Ipamorelin provides a clean GH pulse   together they produce 3-5x more GH than either alone.\n• **BPC-157 + TB-500**: Combined tissue repair   BPC works locally on blood vessels and growth factors, TB-500 works systemically on inflammation and cell migration.\n• **Semaglutide + AOD-9604**: GLP-1 appetite reduction + targeted fat metabolism.\n\nHowever, some combinations should be avoided (e.g., don't stack multiple GLP-1 agonists, or combine Melanotan II with PT-141)."
            }
        ],
        quiz: [
            { question: "What is the 'lock and key' model in peptide pharmacology?", options: ["Peptides unlock cell walls", "Peptides bind to specific receptors", "Peptides are stored under lock", "Peptides require two doses"], correctIndex: 1, explanation: "Peptides bind to specific receptors on cells (the 'lock'), triggering biological responses. This specificity is why different peptides have different effects." },
            { question: "Which combination is a popular GH stack?", options: ["BPC-157 + Semaglutide", "CJC-1295 + Ipamorelin", "Melanotan II + PT-141", "DSIP + AOD-9604"], correctIndex: 1, explanation: "CJC-1295 (GHRH analog) + Ipamorelin (GHRP) is the gold standard GH stack, producing synergistic growth hormone release." },
            { question: "A peptide with a 7-day half-life would be dosed:", options: ["Multiple times daily", "Daily", "Weekly", "Monthly"], correctIndex: 2, explanation: "A 7-day half-life means the peptide stays active for about a week, so weekly dosing maintains therapeutic levels. Semaglutide is a real example." }
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
                content: "Not all peptides carry the same risk level:\n\n**FDA-Approved** (Lowest Risk): Semaglutide, Tirzepatide, PT-141   extensive human trial data, known side effects, prescribed by doctors.\n\n**Well-Studied** (Lower Risk): BPC-157, TB-500, CJC-1295, Ipamorelin   extensive preclinical data, long track record of human use, but NOT FDA-approved.\n\n**Emerging Research** (Higher Risk): MOTS-c, SS-31, Dihexa   promising preclinical data but limited human studies. More unknowns.\n\n**Research-Only** (Highest Risk): Follistatin-344, IGF-1 LR3   potent compounds with limited safety data and higher risk of adverse effects."
            },
            {
                title: "Sourcing Quality",
                content: "If obtaining peptides legally (through a doctor or compounding pharmacy), quality is assured. For research-use peptides, evaluate:\n\n1. **Certificate of Analysis (COA)**   Third-party lab testing confirming identity and purity. Demand =98% purity.\n2. **HPLC + Mass Spectrometry**   The gold standard testing methods. Both should appear on the COA.\n3. **Batch matching**   The COA should match the specific batch/lot number on your vial.\n4. **Reputation**   Established vendors with transparent testing, not anonymous sellers.\n5. **Storage and Shipping**   Lyophilized peptides shipped at room temp are fine; reconstituted solutions should be cold-shipped."
            },
            {
                title: "Side Effects and Red Flags",
                content: "Common manageable side effects:\n• Injection site redness/irritation (SubQ)\n• Nausea (GLP-1 agonists   Semaglutide, Tirzepatide)\n• Fatigue or water retention (GH peptides)\n• Flushing (Melanotan II)\n\n**Stop immediately if you experience:**\n• Severe allergic reaction (hives, swelling, difficulty breathing)\n• Chest pain or heart palpitations\n• Vision changes\n• Unexplained lumps or rapid changes in moles\n\n**Never:**\n• Use peptides during pregnancy/breastfeeding\n• Use GH secretagogues with active/suspected cancer\n• Mix multiple injectable vials in one syringe (unless specifically directed)"
            },
            {
                title: "Working With a Doctor",
                content: "The safest approach to peptide therapy:\n\n1. **Find a peptide-knowledgeable provider**   Anti-aging clinics, integrative medicine, functional medicine, or sports medicine doctors often have peptide experience.\n2. **Get baseline blood work**   IGF-1, CMP, CBC, hormones, CRP, HbA1c before starting.\n3. **Get a prescription**   Many peptides can be legally prescribed and obtained from compounding pharmacies.\n4. **Monitor**   Regular blood work during use to track biomarkers.\n5. **Report side effects**   Track everything and communicate with your provider."
            }
        ],
        quiz: [
            { question: "What does a COA verify?", options: ["Peptide taste", "Peptide purity and identity", "Peptide legality", "Peptide dosing schedule"], correctIndex: 1, explanation: "A Certificate of Analysis (COA) is third-party lab testing that verifies peptide identity and purity. Look for =98% purity confirmed by HPLC and mass spectrometry." },
            { question: "Which peptides are FDA-approved?", options: ["BPC-157 and TB-500", "Semaglutide, Tirzepatide, and PT-141", "All GH peptides", "None"], correctIndex: 1, explanation: "Semaglutide (Ozempic/Wegovy), Tirzepatide (Mounjaro/Zepbound), and PT-141 (Vyleesi) are FDA-approved peptides with extensive clinical trial data." },
            { question: "When should you STOP using a peptide immediately?", options: ["Mild injection site redness", "Slight nausea", "Severe allergic reaction or chest pain", "Temporary fatigue"], correctIndex: 2, explanation: "Severe allergic reactions, chest pain, or breathing difficulty require immediate discontinuation and medical attention. Mild side effects like injection site redness are usually normal." }
        ]
    },
    {
        id: "your-first-stack",
        title: "Your First Stack",
        subtitle: "Beginner-friendly protocols for common goals",
        icon: "??",
        estimatedMinutes: 10,
        sections: [
            {
                title: "Choosing by Goal",
                content: "Different goals call for different peptides. Here are the most common starting points:\n\n**Recovery & Healing**: BPC-157 (250-500mcg/day SubQ)   The most popular 'starter' peptide. Well-studied, excellent safety profile, works locally on injuries.\n\n**Sleep & Recovery**: CJC-1295 + Ipamorelin (100-300mcg each, before bed)   Enhances natural GH pulse during deep sleep. Improves recovery, skin quality, and body composition.\n\n**Fat Loss**: Semaglutide (prescription)   FDA-approved, well-studied, dramatic results. Start low and titrate up with medical supervision.\n\n**Cognitive Enhancement**: Semax (200-600mcg intranasal)   BDNF boost, neuroprotection, improved focus. Very safe with decades of use in Russia."
            },
            {
                title: "The Reconstitution Process",
                content: "Most peptides arrive as freeze-dried powder that you reconstitute:\n\n1. **Gather supplies**: Peptide vial, BAC water, graduated pipette, alcohol swabs\n2. **Clean both vial tops** with alcohol swabs\n3. **Draw BAC water** — typically 1-2ml per vial (this determines your concentration)\n4. **Add BAC water into peptide vial** — aim the stream at the glass wall, NOT directly on powder\n5. **Gently swirl** — never shake! Let it dissolve naturally (1-5 minutes)\n6. **Store reconstituted peptide** in the refrigerator (36-46°F / 2-8°C)\n7. **Use within 28 days** of reconstitution\n\n**Pro tip**: Use PeptiDex's Reconstitution Calculator to automatically calculate your solution concentration based on vial size and diluent volume."
            },
            {
                title: "Injection Technique (SubQ)",
                content: "For subcutaneous injections:\n\n1. **Wash hands** thoroughly\n2. **Draw your dose** from the reconstituted vial using a sterile subcutaneous needle (29-31 gauge)\n3. **Choose injection site**   belly (2 inches from navel), thigh, or upper arm\n4. **Clean site** with alcohol swab, let dry\n5. **Pinch skin** gently to create a fold of fat\n6. **Insert needle** at 45-90° angle\n7. **Inject slowly** and steadily\n8. **Remove needle** and apply light pressure (don't rub)\n9. **Rotate sites**   never inject in the exact same spot consecutively\n\n**Common mistakes**: Injecting too fast, not rotating sites, injecting into muscle instead of fat."
            },
            {
                title: "Cycling and Duration",
                content: "Most peptides benefit from cycling   periods of use followed by periods of rest:\n\n**Why cycle?**\n• Prevents receptor desensitization (your body stops responding)\n• Maintains the peptide's effectiveness long-term\n• Allows the body to re-establish baseline function\n\n**Typical cycles:**\n• BPC-157: 4-6 weeks on, 2-4 weeks off\n• CJC-1295 + Ipamorelin: 8-12 weeks on, 4 weeks off\n• GH peptides: 3-6 months on, 1-2 months off\n• Semaglutide: Continuous (per doctor's guidance)\n\n**Important**: Track your start date, note any side effects, and get blood work before and after each cycle."
            }
        ],
        quiz: [
            { question: "What is the most common 'starter' peptide for healing?", options: ["Semaglutide", "IGF-1 LR3", "BPC-157", "Follistatin-344"], correctIndex: 2, explanation: "BPC-157 is widely considered the best 'starter' peptide   excellent safety profile, well-studied, effective for a wide range of healing applications." },
            { question: "When reconstituting, you should:", options: ["Shake the vial vigorously", "Aim BAC water directly at the powder", "Gently swirl and let dissolve naturally", "Microwave to speed dissolving"], correctIndex: 2, explanation: "Gentle swirling is critical   shaking can denature (break) the peptide bonds, reducing effectiveness. Let the powder dissolve naturally." },
            { question: "Why do most peptides require cycling?", options: ["They expire after a few weeks", "To prevent receptor desensitization", "Legal requirements", "To save money"], correctIndex: 1, explanation: "Cycling prevents receptor desensitization   your body can become less responsive to a peptide with continuous use. Rest periods allow receptors to 'reset'." }
        ]
    },
    {
        id: "advanced-protocols",
        title: "Advanced Protocols",
        subtitle: "Stacking strategies, biomarkers, and optimization",
        icon: "??",
        estimatedMinutes: 12,
        sections: [
            {
                title: "Advanced Stacking Strategies",
                content: "Beyond basic stacks, experienced users build multi-peptide protocols:\n\n**The Complete Recovery Stack:**\nBPC-157 (500mcg/day) + TB-500 (750mcg 2x/week) + CJC-1295 + Ipamorelin (pre-bed)\n? Covers local healing, systemic repair, and GH-driven recovery\n\n**The Longevity Stack:**\nEpitalon (5mg/day × 20 days) + MOTS-c (5mg 3x/week) + SS-31 (research doses)\n? Telomere maintenance + mitochondrial optimization\n\n**The Cognitive Stack:**\nSemax (600mcg intranasal AM) + Selank (300mcg intranasal PM) + Dihexa (low dose)\n? BDNF + anxiolysis + synaptogenesis\n\n**Important**: Multi-peptide protocols require more vigilant monitoring. Get blood work before, during, and after."
            },
            {
                title: "Biomarker Tracking",
                content: "Blood work is your roadmap. Key markers to track:\n\n**GH Peptides**: IGF-1 (target: upper-normal range, ~200-300 ng/mL), fasting glucose, insulin\n**Fat Loss Peptides**: HbA1c, lipid panel, fasting glucose, CRP\n**Healing Peptides**: CRP (C-reactive protein), ESR, CBC\n**General**: CBC, CMP, testosterone (total + free), thyroid panel (TSH, T3, T4)\n\n**Timing**: \n• Baseline blood work BEFORE starting any peptide\n• Mid-cycle check at 4-6 weeks\n• Post-cycle check 2-4 weeks after stopping\n• Compare all three to see the full picture"
            },
            {
                title: "Timing Optimization",
                content: "When you take peptides matters:\n\n**Morning**: Cognitive peptides (Semax, Selank), mitochondrial peptides (SS-31, MOTS-c)\n**Pre-Workout**: BPC-157 (for targeted healing), IGF-1 LR3 (post-workout for growth)\n**Pre-Bed**: GH peptides (CJC-1295 + Ipamorelin, Sermorelin)   GH is naturally highest during deep sleep\n**With Food**: Oral peptides (Dihexa sublingual, KPV capsules)\n**Fasted**: Most injectable peptides absorb better on an empty stomach\n\n**GH Peptide Rule**: Avoid eating 30-60 minutes before and after injection   insulin inhibits GH release."
            },
            {
                title: "When to Stop or Adjust",
                content: "Signs you need to modify your protocol:\n\n**Reduce dose if**: Water retention, carpal tunnel symptoms, joint ache (signs of excess GH), persistent nausea\n**Extend cycle rest if**: Effects are diminishing despite consistent dosing (receptor desensitization)\n**Stop and consult a doctor if**: Any severe side effect, abnormal blood work, new or changing moles (melanocortin peptides), persistent blood sugar changes\n\n**The golden rule**: More is not always better. Peptides follow a dose-response curve   there's a therapeutic window where you get maximum benefit with minimal risk. Going above that window doesn't improve results but increases side effects."
            }
        ],
        quiz: [
            { question: "Why should GH peptides be taken pre-bed?", options: ["They cause drowsiness", "GH is naturally highest during deep sleep", "They need to be taken with food", "Injection is easier lying down"], correctIndex: 1, explanation: "Growth hormone has its largest natural release during deep sleep (Stage 3/4 NREM). Taking GH peptides pre-bed amplifies this natural pulse." },
            { question: "What does it mean if a GH peptide is causing water retention?", options: ["It's working perfectly", "The dose may be too high", "You need more BAC water", "You should switch peptides"], correctIndex: 1, explanation: "Water retention is a common sign of excessive GH stimulation. The first step is to reduce the dose, not stop entirely." },
            { question: "Why should you avoid eating near GH peptide injections?", options: ["Food reduces absorption", "Insulin inhibits GH release", "Peptides taste bad", "It causes nausea"], correctIndex: 1, explanation: "Insulin (released in response to eating) directly inhibits growth hormone release. A 30-60 minute fasting window around GH peptide injections maximizes effectiveness." }
        ]
    },
];
