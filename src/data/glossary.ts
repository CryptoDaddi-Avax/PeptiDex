export interface GlossaryTerm {
    term: string;
    definition: string;
    category: "administration" | "biology" | "pharmacology" | "chemistry" | "clinical" | "general";
    related_peptides?: string[];
}

export const glossary: GlossaryTerm[] = [
    // â”€â”€â”€ ADMINISTRATION â”€â”€â”€
    { term: "SubQ", definition: "Subcutaneous: administration into the tissue layer beneath the skin; a common route in peptide studies.", category: "administration" },
    { term: "IM", definition: "Intramuscular: administration directly into muscle tissue. Used in some peptide studies, less often than the subcutaneous route.", category: "administration" },
    { term: "IV", definition: "Intravenous injection   injecting directly into a vein for immediate systemic delivery. Primarily used in clinical/hospital settings.", category: "administration" },
    { term: "Intranasal", definition: "Administration through the nasal mucosa via a spray. Used for peptides that need to reach the brain quickly (e.g., Semax, Selank).", category: "administration", related_peptides: ["Semax", "Selank"] },
    { term: "Sublingual", definition: "Placing a substance under the tongue for absorption through the oral mucosa, bypassing first-pass liver metabolism.", category: "administration" },
    { term: "Topical", definition: "Application directly to the skin surface. Some peptides like GHK-Cu are formulated as creams or serums for localized skin benefits.", category: "administration", related_peptides: ["GHK-Cu"] },
    { term: "Reconstitution", definition: "The process of dissolving a lyophilized (freeze-dried) peptide powder in a sterile diluent to create a liquid solution.", category: "administration" },
    { term: "Lyophilized", definition: "Freeze-dried. Many peptides are supplied as lyophilized powder in vials, a stable form for storage and shipping.", category: "administration" },

    // â”€â”€â”€ BIOLOGY â”€â”€â”€
    { term: "Growth Hormone (GH)", definition: "A 191-amino acid protein hormone produced by the anterior pituitary gland. Regulates growth, body composition, metabolism, and repair. Many peptides work by stimulating natural GH release.", category: "biology" },
    { term: "IGF-1", definition: "Insulin-like Growth Factor 1   a hormone produced primarily in the liver in response to GH. Mediates many of GH's anabolic effects including muscle growth and tissue repair.", category: "biology", related_peptides: ["IGF-1 LR3", "CJC-1295", "Ipamorelin"] },
    { term: "GHRH", definition: "Growth Hormone Releasing Hormone   a hypothalamic hormone that stimulates the pituitary to release GH. CJC-1295 and Sermorelin are GHRH analogs.", category: "biology", related_peptides: ["CJC-1295", "Sermorelin", "Tesamorelin"] },
    { term: "GHRP", definition: "Growth Hormone Releasing Peptide   synthetic peptides that stimulate GH release through the ghrelin/GHS receptor, complementary to GHRH.", category: "biology", related_peptides: ["Ipamorelin"] },
    { term: "Ghrelin Mimetic", definition: "A compound that mimics ghrelin (the hunger hormone) at the GHS-R1a receptor to stimulate GH release. Ipamorelin is a selective ghrelin mimetic.", category: "biology", related_peptides: ["Ipamorelin"] },
    { term: "Melanocortin System", definition: "A family of receptors (MC1R-MC5R) involved in skin pigmentation, appetite, sexual function, and inflammation. Melanotan II and PT-141 act on these receptors.", category: "biology", related_peptides: ["Melanotan II", "PT-141", "KPV"] },
    { term: "NF-ÎºB", definition: "Nuclear Factor kappa-light-chain-enhancer of activated B cells. A key pro-inflammatory transcription factor. BPC-157 and KPV suppress NF-ÎºB to reduce inflammation.", category: "biology", related_peptides: ["BPC-157", "KPV"] },
    { term: "AMPK", definition: "AMP-activated Protein Kinase   a cellular energy sensor that regulates metabolism. MOTS-c activates AMPK to improve glucose uptake and fat oxidation.", category: "biology", related_peptides: ["MOTS-c"] },
    { term: "Mitochondria", definition: "The 'powerhouses' of cells   organelles that produce ATP (cellular energy). SS-31 and MOTS-c target mitochondrial function.", category: "biology", related_peptides: ["SS-31", "MOTS-c"] },
    { term: "Cardiolipin", definition: "A phospholipid found in the inner mitochondrial membrane, essential for electron transport chain function. SS-31 stabilizes cardiolipin.", category: "biology", related_peptides: ["SS-31"] },
    { term: "Telomeres", definition: "Protective caps at the ends of chromosomes that shorten with age. Epitalon activates telomerase to maintain telomere length.", category: "biology", related_peptides: ["Epitalon"] },
    { term: "Telomerase", definition: "An enzyme that adds DNA sequence repeats to telomere ends, counteracting age-related telomere shortening. Epitalon is the only known peptide telomerase activator.", category: "biology", related_peptides: ["Epitalon"] },
    { term: "Myostatin", definition: "A protein that limits muscle growth. Follistatin-344 blocks myostatin, allowing greater muscle development beyond normal limits.", category: "biology", related_peptides: ["Follistatin-344"] },
    { term: "Satellite Cells", definition: "Muscle stem cells that can divide and fuse with existing muscle fibers for repair and growth. IGF-1 activates satellite cells.", category: "biology", related_peptides: ["IGF-1 LR3"] },
    { term: "Angiogenesis", definition: "Formation of new blood vessels. BPC-157 promotes angiogenesis to accelerate tissue healing.", category: "biology", related_peptides: ["BPC-157"] },
    { term: "BDNF", definition: "Brain-Derived Neurotrophic Factor   a protein that supports neuron survival and growth. Semax increases BDNF levels in the brain.", category: "biology", related_peptides: ["Semax", "Selank"] },
    { term: "Pineal Gland", definition: "A brain structure that produces melatonin and regulates sleep-wake cycles. Epitalon acts on the pineal gland.", category: "biology", related_peptides: ["Epitalon"] },

    // â”€â”€â”€ PHARMACOLOGY â”€â”€â”€
    { term: "Half-Life", definition: "The time required for the concentration of a peptide in the body to decrease by 50%. A core pharmacokinetic property reported in published studies; half-lives range from minutes to days.", category: "pharmacology" },
    { term: "Bioavailability", definition: "The percentage of an administered peptide that reaches systemic circulation. SubQ injection has high bioavailability; oral peptides have low bioavailability.", category: "pharmacology" },
    { term: "Receptor Agonist", definition: "A substance that binds to a receptor and activates it, producing a biological response. PT-141 is a melanocortin receptor agonist.", category: "pharmacology", related_peptides: ["PT-141", "Melanotan II"] },
    { term: "Receptor Antagonist", definition: "A substance that binds to a receptor and blocks its activation, preventing a biological response.", category: "pharmacology" },
    { term: "IC50", definition: "The concentration of a drug needed to inhibit a biological process by 50%. Lower IC50 = more potent compound.", category: "pharmacology" },
    { term: "Dose-Response", definition: "The relationship between the amount of a compound administered and the magnitude of the biological effect produced.", category: "pharmacology" },
    { term: "Tachyphylaxis", definition: "Rapid decrease in response to a drug after repeated administration. It has been reported with repeated exposure to some receptor agonists.", category: "pharmacology" },
    { term: "Desensitization", definition: "Reduced receptor sensitivity after prolonged exposure to an agonist. Researchers study it when evaluating repeated or continuous exposure to a compound.", category: "pharmacology" },
    { term: "First-Pass Metabolism", definition: "The liver's processing of a drug before it reaches systemic circulation. Orally taken peptides are largely broken down before reaching circulation, which is why many are studied by injection.", category: "pharmacology" },
    { term: "DAC", definition: "Drug Affinity Complex   a modification (like in CJC-1295 with DAC) that extends half-life by binding to albumin in the blood.", category: "pharmacology", related_peptides: ["CJC-1295"] },
    { term: "Analog", definition: "A synthetic compound structurally similar to a natural molecule but modified for improved properties (stability, potency, half-life). Sermorelin is a GHRH analog.", category: "pharmacology", related_peptides: ["Sermorelin", "CJC-1295"] },

    // â”€â”€â”€ CHEMISTRY â”€â”€â”€
    { term: "Amino Acid", definition: "The building blocks of peptides and proteins. There are 20 standard amino acids. Peptides are chains of 2-50 amino acids.", category: "chemistry" },
    { term: "Peptide Bond", definition: "The chemical bond linking amino acids together in a peptide chain. Formed between the carboxyl group of one amino acid and the amino group of the next.", category: "chemistry" },
    { term: "Peptide", definition: "A short chain of amino acids (typically 2-50) linked by peptide bonds. Shorter than proteins but biologically active. Most therapeutic peptides are 5-40 amino acids.", category: "chemistry" },
    { term: "Sequence", definition: "The specific order of amino acids in a peptide chain, which determines its 3D structure and biological function.", category: "chemistry" },
    { term: "Disulfide Bond", definition: "A covalent bond between two cysteine amino acids that stabilizes peptide structure. Important for maintaining biological activity.", category: "chemistry" },
    { term: "Molecular Weight", definition: "The mass of a molecule, measured in Daltons (Da). Peptides typically range from 500 to 5,000 Da (vs. proteins which are >5,000 Da).", category: "chemistry" },

    // â”€â”€â”€ CLINICAL â”€â”€â”€
    { term: "RCT", definition: "Randomized Controlled Trial   the gold standard study design. Participants are randomly assigned to treatment or placebo groups to minimize bias.", category: "clinical" },
    { term: "Double-Blind", definition: "A study design where neither the participants nor researchers know who receives the treatment vs. placebo, eliminating bias.", category: "clinical" },
    { term: "Placebo-Controlled", definition: "A study where the control group receives an inactive substance, allowing researchers to determine the true effect of the treatment.", category: "clinical" },
    { term: "Meta-Analysis", definition: "A statistical analysis that combines results from multiple studies to draw stronger conclusions than any individual study.", category: "clinical" },
    { term: "Phase I Trial", definition: "First stage of human testing, focused on safety and dosing in a small group (20-100 people).", category: "clinical" },
    { term: "Phase II Trial", definition: "Second stage testing efficacy and side effects in a larger group (100-300 people).", category: "clinical" },
    { term: "Phase III Trial", definition: "Large-scale testing (1,000-3,000+ people) required for FDA approval. Compares the drug to existing treatments.", category: "clinical" },
    { term: "FDA Approval", definition: "Formal authorization by the U.S. Food and Drug Administration that a drug is safe and effective for its intended use. Very few peptides have FDA approval.", category: "clinical" },
    { term: "Off-Label Use", definition: "Using an FDA-approved medication for a purpose, population, or dosage not specified on its approved labeling.", category: "clinical" },
    { term: "Investigational", definition: "A drug or compound that is being studied in clinical trials but has not yet received FDA approval.", category: "clinical", related_peptides: ["SS-31"] },
    { term: "Preclinical", definition: "Research stage before human testing, conducted in cell cultures (in vitro) or animal models (in vivo).", category: "clinical" },
    { term: "In Vitro", definition: "Experiments conducted outside of a living organism, typically in cell cultures or test tubes. Latin: 'in glass'.", category: "clinical" },
    { term: "In Vivo", definition: "Experiments conducted in living organisms (animal models or humans). Latin: 'in the living'.", category: "clinical" },
    { term: "Biomarker", definition: "A measurable indicator of a biological state. IGF-1 level is a biomarker for growth hormone activity. CRP is a biomarker for inflammation.", category: "clinical" },
    { term: "Contraindication", definition: "A condition or factor that makes a particular treatment inadvisable. E.g., GH secretagogues are contraindicated with active cancer.", category: "clinical" },

    // â”€â”€â”€ GENERAL â”€â”€â”€
    { term: "Stack", definition: "A combination of two or more peptides. Some combinations, such as CJC-1295 with Ipamorelin, have been studied because they act on complementary mechanisms.", category: "general", related_peptides: ["CJC-1295", "Ipamorelin"] },
    { term: "Protocol", definition: "In research, the written plan for a study, describing its methods, endpoints, and the regimen being tested.", category: "general" },
    { term: "Research Chemical", definition: "A compound sold 'for research purposes only' and not approved for human consumption. Most non-FDA-approved peptides are legally sold this way.", category: "general" },
    { term: "Compounding Pharmacy", definition: "A pharmacy that custom-prepares medications, including peptides, per a doctor's prescription. A legal and regulated way to obtain peptides.", category: "general" },
    { term: "COA", definition: "Certificate of Analysis   a document from a third-party lab verifying the identity, purity, and potency of a peptide product.", category: "general" },
    { term: "HPLC", definition: "High-Performance Liquid Chromatography   the standard analytical method for verifying peptide purity. Look for ≥98% purity on a COA.", category: "general" },
    { term: "Mass Spectrometry", definition: "An analytical technique that measures molecular mass to confirm peptide identity. Used alongside HPLC on quality COAs.", category: "general" },
    { term: "Purity", definition: "The percentage of a sample that is the intended peptide (vs. degradation products or impurities). Research-grade peptides should be ≥98% pure.", category: "general" },
];
