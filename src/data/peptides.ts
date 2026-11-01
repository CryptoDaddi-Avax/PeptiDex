import { Peptide } from "./types";

export const LAST_UPDATED = '2026-05-06';function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function p(raw: Omit<Peptide, "slug">): Peptide {
  return { ...raw, slug: slug(raw.name) };
}

export const peptides: Peptide[] = [
  // ─── BODY ───,
  p({
    name: "AOD-9604",
    aliases: ["Advanced Obesity Drug 9604"],
    category: "GH Fragment",
    category_icon: "\u{1F52C}",
    primary_benefits: "Lipolysis in adipose tissue (rodent models), body-weight endpoints in Phase II obesity trials, cartilage repair (rabbit osteoarthritis model)",
    mechanism:
      "Synthetic fragment of the C-terminal lipolytic region of GH. In rodent studies it stimulated lipolysis and inhibited lipogenesis in adipose tissue without binding the GH receptor or altering IGF-1; beta-3 adrenergic receptor involvement was examined but did not fully account for the effect (PMID 11713213).",
    laypersonSummary:
      "AOD-9604 is a synthetic fragment of human growth hormone studied in rodent models and Phase II obesity trials for effects on fat metabolism; a pooled safety analysis found a placebo-like tolerability profile with limited efficacy.",
    key_studies: [
      {
        title: "AOD-9604 lipolysis stimulation in preclinical models",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11146367/",
        summary:
          "Ng et al. demonstrate AOD-9604 stimulates lipolysis and inhibits lipogenesis in adipose tissue without affecting IGF-1 or glucose tolerance.",
        evidence_level: "preclinical",
      },
      {
        title: "AOD-9604 clinical safety — six randomized controlled trials",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19268492/",
        summary:
          "Heffernan et al.: Pooled analysis of 6 RCTs showing AOD-9604 is well-tolerated with a safety profile similar to placebo despite limited efficacy signals.",
        evidence_level: "moderate",
      },
      {
        title: "AOD-9604 Phase IIb trial — short-term fat reduction",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15655039/",
        summary:
          "12-week Phase IIb trial: AOD-9604 produced 2.6 kg weight loss vs 0.8 kg placebo, with reductions in abdominal fat and improved lipid profiles.",
        evidence_level: "moderate",
      },
        {
                title: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41966639/",
                summary: "A 2026 review found that many unapproved peptides demonstrate favorable tissue repair and metabolic outcomes in animal models, though rigorous human safety data remain scarce. The study investigated the pharmacological mechanisms and regulatory status of various sports medicine peptides.",
                evidence_level: "emerging"
            },
        {
                title: "Therapeutic Peptides in Orthopaedics: Applications, Challenges, and Future Directions.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41490200/",
                summary: "Therapeutic peptides such as BPC-157 and TB-500 were found to modulate key molecular pathways influencing tissue regeneration and inflammation resolution in a 2026 review. The study demonstrated that while preclinical mechanistic data is promising for orthopaedic applications, clinical trials remain lacking.",
                evidence_level: "emerging"
            },
        {
                title: "A novel inhibitor of pyruvate dehydrogenase kinase stimulates myocardial carbohydrate oxidation in diet-induced obesity.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29739849/",
                summary: "A 2018 study in diet-induced obese mice demonstrated that PS10, a novel pyruvate dehydrogenase kinase inhibitor, stimulated myocardial carbohydrate oxidation and improved glucose tolerance. Researchers found that PS10 achieved these effects without increasing lactate production, unlike the classic inhibitor dichloroacetate.",
                evidence_level: "preclinical"
            },
        {
                title: "Simplifying and expanding the screening for peptides <2 kDa by direct urine injection, liquid chromatography, and ion mobility mass spectrometry.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26578461/",
                summary: "A 2016 study demonstrated a highly sensitive screening method for detecting prohibited peptides under 2 kDa, such as GHRPs and TB-500, directly from urine. The liquid chromatography and mass spectrometry assay successfully identified peptide administration in human elimination samples, improving anti-doping control measures.",
                evidence_level: "moderate"
            },
        {
                title: "Effect of Intra-articular Injection of AOD9604 with or without Hyaluronic Acid in Rabbit Osteoarthritis Model.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26275694/",
                summary: "In a 2015 study, researchers found that intra-articular injections of AOD9604 enhanced cartilage regeneration in a rabbit model of osteoarthritis. Furthermore, the study demonstrated that combining AOD9604 with hyaluronic acid was more effective at reducing cartilage degeneration than either treatment alone.",
                evidence_level: "preclinical"
            },
        {
                title: "Human sports drug testing by mass spectrometry.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26213263/",
                summary: "A 2017 review demonstrated that mass spectrometry has become an indispensable tool in modern sports drug testing. The paper detailed its critical role in detecting diverse substances, including peptidic drugs, anabolic agents, and nucleotide-derived therapeutics.",
                evidence_level: "emerging"
            },
        {
                title: "Detecting peptidic drugs, drug candidates and analogs in sports doping: current status and future directions.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25382550/",
                summary: "A 2014 review found that advanced mass spectrometric and immunological methods can successfully detect the misuse of various peptidic drugs, including TB-500 and CJC-1295, in sports doping. However, researchers noted a gap remains between technical capabilities and routine analytical practice.",
                evidence_level: "emerging"
            },
        {
                title: "Detection and in vitro metabolism of AOD9604.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25208511/",
                summary: "A 2015 in vitro study demonstrated a validated extraction method for detecting AOD9604 in urine and identified six potential metabolites. Researchers found that one specific metabolite is significantly more stable than the parent compound, potentially increasing the detection window.",
                evidence_level: "preclinical"
            },
        {
                title: "Analytical approaches for the detection of emerging therapeutics and non-approved drugs in human doping controls.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/24906629/",
                summary: "A 2014 review detailed analytical strategies, including chromatographic-mass spectrometric methods, for detecting emerging performance-enhancing peptides like TB-500 and AOD-9604 in human doping controls. The study highlighted the specific physicochemical requirements for identifying these non-approved drugs in blood and urine.",
                evidence_level: "emerging"
            },
        {
                title: "Obesity drugs in clinical development.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16625817/",
                summary: "A 2006 review highlighted that several anti-obesity drugs were in clinical development, including the human growth hormone fragment AOD-9604, which was investigated for its ability to increase adipose tissue breakdown. The study outlined various emerging therapies targeting satiety, fat absorption, and metabolism.",
                evidence_level: "emerging"
            },
        {
                title: "Gateways to clinical trials.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15834452/",
                summary: "A 2005 bibliography documented recent clinical trial data for numerous pharmacological agents, including the peptide AOD-9604, serving as a reference guide for ongoing drug discovery and development.",
                evidence_level: "emerging"
            },
        {
                title: "AOD-9604 Metabolic.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15134286/",
                summary: "AOD-9604 was actively being developed and investigated for the potential treatment of obesity, according to a 2004 review. The report demonstrated that phase IIa clinical trials were already underway to evaluate the peptide's metabolic effects.",
                evidence_level: "emerging"
            },
        {
                title: "Gateways to clinical trials.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14685303/",
                summary: "A 2003 bibliography documented ongoing clinical trial data for numerous pharmacological compounds, including AOD-9604, utilizing the Prous Science Integrity database. The publication provided a comprehensive reference guide for recent drug discovery and development efforts across various therapeutic categories.",
                evidence_level: "emerging"
            },
        {
                title: "Gateways to clinical trials.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14571286/",
                summary: "A 2003 bibliography demonstrated the breadth of ongoing pharmaceutical research by indexing recent clinical trial data for numerous drugs and peptides, including AOD-9604 and epithalon. The publication served as a comprehensive guide to contemporary drug discovery and development.",
                evidence_level: "emerging"
            },
        {
                title: "The effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism following chronic treatment in obese mice and beta(3)-AR knock-out mice.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11713213/",
                summary: "A 2001 study in obese mice demonstrated that AOD9604 and human growth hormone reduced body weight and fat while increasing beta-3 adrenergic receptor expression. Researchers found that although these compounds enhance lipolytic sensitivity, their direct lipolytic actions are not solely mediated through this receptor.",
                evidence_level: "preclinical"
            }
    ],
    safety_notes:
      "Research-only. Received GRAS status from FDA as food supplement ingredient. Banned by WADA. Phase 3 trial discontinued due to insufficient efficacy.",
    half_life_hours: 1,
    route_studied: "SubQ",
    interactions: {
      synergies: ["MOTS-c"],
      cautions: [],
      contraindicated: [],
      notes:
        "Combination data with other peptides are limited.",
    },
    outcomes_timeline: {},
    side_effects: [
      {
        name: "Administration-site reaction",
        incidence: "Frequency not established",
        severity: "mild",
      },
      { name: "Mild nausea", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  // ─── MITOCHONDRIAL ───,
  p({
    name: "BPC-157",
    aliases: ["Body Protection Compound-157", "PL 14736"],
    category: "Body Protective Compound",
    category_icon: "\u{1F6E1}\uFE0F",
    primary_benefits:
      "Tendon and ligament repair (rodent models), GI lesion healing (rodent models), angiogenesis, inflammatory cytokine modulation (preclinical)",
    mechanism:
      "In preclinical models, promotes angiogenesis (VEGFR2-Akt-eNOS signaling), collagen deposition, and tendon fibroblast outgrowth via FAK-paxillin signaling. Effects have been reported across tendon, ligament, muscle, GI mucosa, and nerve injury models in rodents.",
    laypersonSummary:
      "BPC-157 is a synthetic peptide derived from a protein found in gastric juice, studied mainly in rodent models of tendon, ligament, and GI injury; human data are limited to small pilot studies.",
    key_studies: [
      {
        title: "BPC-157 tendon, ligament, and gut healing effects",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030658/",
        summary:
          "Comprehensive review demonstrating potent tendon, ligament, and gut healing effects across multiple preclinical models.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Stable gastric pentadecapeptide BPC 157 — gastrointestinal tract healing",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22300085/",
        summary:
          "Robert et al. report that BPC-157 promoted healing of GI ulcers, fistulas, and inflammatory bowel lesions in rat models via proposed cytoprotective pathways. Published in Current Pharmaceutical Design.",
        evidence_level: "preclinical",
      },
      {
        title: "BPC-157 accelerates Achilles tendon healing in rats",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21030672/",
        summary:
          "Staresinic et al. show BPC-157 accelerates healing of transected Achilles tendons, enhancing tendon fibroblast outgrowth and survival via FAK-paxillin signaling.",
        evidence_level: "preclinical",
      },
      {
        title: "BPC-157 systematic review: musculoskeletal healing (2025)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39754825/",
        summary:
          "Systematic review of 35 preclinical and 1 clinical study (1993-2024). BPC-157 promotes angiogenesis, collagen synthesis, and reduces inflammatory cytokines across muscle, tendon, ligament, and bone injury models.",
        evidence_level: "preclinical",
      },
      {
        title: "Pentadecapeptide BPC 157 (PL 14736) improves ligament healing in the rat",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20225319/",
        summary:
          "Rat ligament injury model: BPC-157 administration was associated with improved ligament healing measures compared with controls.",
        evidence_level: "preclinical",
      },
      {
        title: "BPC-157 angiogenic and vascular protective effects",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/24186725/",
        summary:
          "Demonstrates BPC-157's strong angiogenic potential via VEGFR2-Akt-eNOS pathway activation, endothelium protection, and reversal of thrombus formation.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Therapeutic peptides in gerontology: mechanisms and applications for healthy aging.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42021992/",
        summary:
          "Therapeutic peptides offer mechanistically diverse approaches to targeting fundamental hallmarks of aging, a 2026 review demonstrated. While FDA-approved agents show clinical potential, investigational peptides require rigorous validation through well-designed trials to establish long-term safety and efficacy.",
        evidence_level: "emerging",
      },
      {
        title:
          "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41966639/",
        summary:
          "A 2026 review found that many unapproved peptides demonstrate favorable tissue repair and metabolic outcomes in animal models, though rigorous human safety data remain scarce. The study investigated the pharmacological mechanisms and regulatory status of various sports medicine peptides.",
        evidence_level: "emerging",
      },
      {
        title:
          "Cytoprotection as a Unifying Strategy for Hemorrhage and Thrombosis: The Role of BPC 157 and Related Therapeutics.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41901308/",
        summary:
          "A 2026 review found that the peptide BPC 157 simultaneously counteracted both hemorrhage and thrombosis in rodent models without directly affecting the coagulation cascade. The study demonstrated that BPC 157 acts as a cytoprotective mediator by preserving endothelial integrity and normalizing microcirculation.",
        evidence_level: "preclinical",
      },
      {
        title:
          "From Regeneration to Analgesia: The Role of BPC-157 in Tissue Repair and Pain Management.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41898733/",
        summary:
          "A 2026 review found that BPC-157 supports angiogenesis, collagen synthesis, and tissue repair across diverse preclinical models. While animal data demonstrated enhanced healing and pain modulation, human research remains limited to small pilot studies requiring further clinical validation.",
        evidence_level: "emerging",
      },
      {
        title:
          "Stable Gastric Pentadecapeptide BPC 157 as a Therapy of Severe Electrolyte Disturbances in Rats.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41832718/",
        summary:
          "BPC 157 demonstrated the ability to counteract severe electrolyte imbalances, including hyperkalemia and hypokalemia, in a 2026 study on rats. The peptide effectively mitigated associated complications such as arrhythmias, muscle weakness, and multiorgan failure.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Tendon, Ligament, and Muscle Injury, Osteotendinous, Myotendinous, and Muscle-to-Bone Junction Therapy Perspectives with Growth Factors and Stable Gastric Pentadecapeptide BPC 157-A Review.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41754849/",
        summary:
          "A 2026 review found that BPC 157 demonstrated beneficial effects on tendon, ligament, and muscle injuries, including complex junctional healing, in rat models. The peptide acted as a cytoprotection mediator across various systemic and local administration routes without requiring complex carriers.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Conventional Antiarrhythmics Class I-IV, Late INa Inhibitors, IKs Enhancers, RyR2 Stabilizers, Gap Junction Modulators, Atrial-Selective Antiarrhythmics, and Stable Gastric Pentadecapeptide BPC 157 as Useful Cytoprotective Therapy in Arrhythmias.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41754776/",
        summary:
          "A 2026 review found that BPC 157 demonstrated broad cytoprotective and antiarrhythmic properties in preclinical models. The peptide stabilized membrane potentials and restored sinus rhythm across various induced arrhythmias in rodent and in vitro studies without observed toxicity.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Fourier Transform Infrared Spectroscopic Characterization of Aortic Wall Remodeling by Stable Gastric Pentadecapeptide BPC 157 After Unilateral Adrenalectomy in Rats.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41599787/",
        summary:
          "A 2026 preclinical study demonstrated that BPC 157 induced rapid molecular changes and structural stabilization in the aortic wall of rats following unilateral adrenalectomy. Spectroscopic analysis revealed spectral signatures consistent with early extracellular matrix reinforcement and membrane preservation.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Tracheocutaneous Fistula Resolved by Pentadecapeptide BPC 157 Therapy Through the NO-System-Triple NO-Agent Approach in Rats.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41599743/",
        summary:
          "A 2026 study demonstrated that BPC 157 promoted the healing and closure of tracheocutaneous fistulas in rats. Researchers found that the peptide facilitated rapid recovery of skin and tracheal defects by modulating the nitric oxide system.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Therapeutic Peptides in Orthopaedics: Applications, Challenges, and Future Directions.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41490200/",
        summary:
          "Therapeutic peptides, including BPC-157 and TB-500, were found to modulate molecular signaling networks influencing tissue regeneration and inflammation resolution in a 2026 review. The research highlighted their mechanistic potential for orthopaedic applications, noting a current lack of clinical trials.",
        evidence_level: "emerging",
      },
      {
        title:
          "Injectable Peptide Therapy: A Primer for Orthopaedic and Sports Medicine Physicians.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41476424/",
        summary:
          "A 2026 review found a significant lack of human clinical evidence to support the use of peptides like BPC-157 and TB-4 in orthopaedics, despite demonstrating potential tissue repair benefits in preclinical models.",
        evidence_level: "emerging",
      },
      {
        title:
          'Challenge of Corneal Ulcer Healing: A Novel Conceptual Framework, the "Triad" of Corneal Ulcer Healing/Corneal Neovascularization/Intraocular Pressure, and Avascular Tendon Healing, for Evaluation of Corneal Ulcer Therapy, Therapy of Neovascularization, Glaucoma Therapy, and Pentadecapeptide BPC 157 Efficacy.',
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41471311/",
        summary:
          "A 2025 review found that BPC 157 demonstrated cytoprotective effects in preclinical models, normalizing intraocular pressure and maintaining corneal transparency during ulcer healing. The study investigated its efficacy across avascular tissues, highlighting its ability to counteract corneal neovascularization.",
        evidence_level: "preclinical",
      },
      {
        title:
          'Reply to Sikiric et al. BPC 157 Therapy: Targeting Angiogenesis and Nitric Oxide\'s Cytotoxic and Damaging Actions, but Maintaining, Promoting, or Recovering Their Essential Protective Functions. Comment on "Józwiak et al. Multifunctionality and Possible Medical Application of the BPC 157 Peptide-Literature and Patent Review. Pharmaceuticals 2025, 18, 185".',
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41155566/",
        summary:
          "A 2025 author reply discussed the mechanisms of the BPC 157 peptide, specifically addressing its role in targeting angiogenesis and modulating nitric oxide pathways. The publication clarified previous literature review findings regarding the peptide's multifunctional properties and potential applications.",
        evidence_level: "emerging",
      },
      {
        title:
          "BPC 157 Therapy: Targeting Angiogenesis and Nitric Oxide's Cytotoxic and Damaging Actions, but Maintaining, Promoting, or Recovering Their Essential Protective Functions. Comment on Józwiak et al. Multifunctionality and Possible Medical Application of the BPC 157 Peptide-Literature and Patent Review. Pharmaceuticals 2025, 18, 185.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41155565/",
        summary:
          "A 2025 commentary demonstrated that BPC 157 modulates angiogenesis and the nitric oxide system in preclinical models, counteracting free radical formation. Researchers found that the peptide exhibited anti-tumor potential and opposed neurodegenerative disturbances in mice and rats.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "No significant toxicity reported in animal studies, but human safety data are very limited. Not FDA-approved. Most evidence from animal models. FDA restricted use in compounded medications in Sept 2023.",
    half_life_hours: 4,
    route_studied: "SubQ",
    interactions: {
      synergies: ["TB-500", "GHK-Cu", "KPV"],
      cautions: [],
      contraindicated: [],
      notes:
        "BPC-157 and TB-500 are often discussed together in tissue-repair research; no controlled combination studies have been published.",
    },
    outcomes_timeline: {
      week_2_4:
        "Rat Achilles tendon transection: accelerated tendon healing with enhanced fibroblast outgrowth and survival (PMID 21030672)",
      long_term:
        "Clinical primer for orthopaedic and sports medicine physicians: repair benefits reported in preclinical models, with a significant lack of human clinical evidence (PMID 41476424)",
    },
    side_effects: [
      { name: "Lightheadedness", incidence: "Frequency not established", severity: "mild" },
      {
        name: "Nausea (especially oral route)",
        incidence: "Frequency not established",
        severity: "mild",
      },
      { name: "Vivid dreams", incidence: "Frequency not established", severity: "mild" },
      {
        name: "Euphoria / mood lift",
        incidence: "Frequency not established",
        severity: "mild",
        note: "Anecdotal reports only; not characterized in controlled studies",
      },
    ],
  }),
  p({
    name: "CJC-1295",
    aliases: ["CJC-1295 DAC", "Mod GRF 1-29"],
    category: "GHRH Analog",
    category_icon: "\u{1F489}",
    primary_benefits: "Sustained GH and IGF-1 elevation (healthy-adult trials), preserved pulsatile GH secretion, somatotroph GH mRNA expression (animal models)",
    mechanism:
      "Long-acting GHRH analog that binds the pituitary GHRH receptor. In healthy-adult studies it produced prolonged GH and IGF-1 elevation (PMID 16352683).",
    laypersonSummary:
      "CJC-1295 is a synthetic growth-hormone-releasing hormone analog studied in small healthy-adult trials for prolonged elevation of GH and IGF-1 levels.",
    key_studies: [
      {
        title: "CJC-1295 GH/IGF-1 elevation in humans",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
        summary:
          "Teichman et al. (J. Clin. Endocrinol. Metab.): Single injection increases GH 2-10x for 6+ days and IGF-1 1.5-3x for 9-11 days in healthy adults, and was well tolerated in the study population.",
        evidence_level: "moderate",
      },
      {
        title: "CJC-1295 preserves pulsatile GH secretion in humans",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16595882/",
        summary:
          "Ionescu & Bhatt (J. Clin. Endocrinol. Metab.): Demonstrates 7.5-fold increase in basal GH, 46% increase in mean GH, and 45% increase in IGF-1 while preserving natural pulsatile pattern.",
        evidence_level: "moderate",
      },
      {
        title: "Long-acting GHRH analogs increase pituitary GH mRNA",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17284574/",
        summary:
          "Animal study shows CJC-1295 increases total pituitary RNA and GH mRNA, suggesting proliferation of somatotroph cells for sustained GH production.",
        evidence_level: "preclinical",
      },
        {
                title: "Therapeutic peptides in gerontology: mechanisms and applications for healthy aging.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42021992/",
                summary: "Therapeutic peptides offer mechanistically diverse approaches to targeting fundamental hallmarks of aging, a 2026 review demonstrated. While FDA-approved agents show clinical potential, investigational peptides require rigorous validation through well-designed trials to establish long-term safety and efficacy.",
                evidence_level: "emerging"
            },
        {
                title: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41966639/",
                summary: "A 2026 review found that many unapproved peptides demonstrate favorable tissue repair and metabolic outcomes in animal models, though rigorous human safety data remain scarce. The study investigated the pharmacological mechanisms and regulatory status of various sports medicine peptides.",
                evidence_level: "emerging"
            },
        {
                title: "A new era of doping? Use of peptide and peptide-analog drugs in recreational and professional sport and bodybuilding: a critical review.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41880199/",
                summary: "Limited clinical evidence supports the use of performance-enhancing peptides in sports despite their growing popularity, a 2026 review found. The research highlighted significant potential risks, including cardiovascular strain and insulin resistance, alongside major challenges in regulation and anti-doping detection.",
                evidence_level: "emerging"
            },
        {
                title: "Therapeutic Peptides in Orthopaedics: Applications, Challenges, and Future Directions.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41490200/",
                summary: "Therapeutic peptides such as BPC-157 and TB-500 were found to modulate key molecular pathways influencing tissue regeneration and inflammation resolution in a 2026 review. The study demonstrated that while preclinical mechanistic data is promising for orthopaedic applications, clinical trials remain lacking.",
                evidence_level: "emerging"
            },
        {
                title: "Injectable Peptide Therapy: A Primer for Orthopaedic and Sports Medicine Physicians.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41476424/",
                summary: "A 2026 review found a significant lack of human clinical evidence to support the use of peptides like BPC-157 and TB-4 in orthopaedics, despite demonstrating potential tissue repair benefits in preclinical models.",
                evidence_level: "emerging"
            },
        {
                title: "Analysis of growth hormone releasing hormone and its analogs in urine using nano liquid chromatography coupled with quadrupole/orbitrap mass spectrometry.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41138283/",
                summary: "A 2026 study demonstrated the successful development and validation of a highly sensitive mass spectrometry method for detecting growth hormone-releasing hormone (GHRH) and its analogs, including sermorelin, tesamorelin, and CJC-1295, in urine. The method achieved limits of detection suitable for anti-doping screening.",
                evidence_level: "preclinical"
            },
        {
                title: "Chromatographic-mass spectrometric analysis of peptidic analytes (2-10 kDa) in doping control urine samples.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38197510/",
                summary: "A 2024 study demonstrated the successful development and validation of a simplified chromatographic-mass spectrometric method for detecting prohibited peptides, including insulins, GHRHs, and IGFs, in doping control urine samples. The approach met World Anti-Doping Agency standards and was verified using authentic post-administration samples.",
                evidence_level: "preclinical"
            },
        {
                title: "Cationic exchange SPE combined with triple quadrupole UHPLC-MS/MS for detection of GHRHs in urine samples.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37806509/",
                summary: "A 2023 study demonstrated a newly validated UHPLC-MS/MS method capable of detecting growth hormone-releasing hormones like tesamorelin and CJC-1295 in urine at concentrations as low as 0.2 ng/mL. This provides a highly sensitive and reliable technique for routine anti-doping screening.",
                evidence_level: "preclinical"
            },
        {
                title: "Probing for peptidic drugs (2-10 kDa) in doping control blood samples.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38716080/",
                summary: "A 2022 study demonstrated that a generic solid-phase extraction and high-resolution mass spectrometry method successfully detected various banned peptides, including insulins, GHRHs, and IGFs, in blood samples. The method met World Anti-Doping Agency criteria and was validated using post-administration samples.",
                evidence_level: "preclinical"
            },
        {
                title: "An antibody-free, ultrafiltration-based assay for the detection of growth hormone-releasing hormones in urine at low pg/mL concentrations using nanoLC-HRMS/MS.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35298973/",
                summary: "A 2022 study demonstrated an antibody-free, ultrafiltration-based assay capable of detecting growth hormone-releasing hormone analogues, including sermorelin and CJC-1295, in urine at low concentrations. Researchers found this method provided high sensitivity and enhanced recovery rates compared to traditional purification techniques.",
                evidence_level: "preclinical"
            },
        {
                title: "Early detection of cannabinoids in biological samples based on their affinity interaction with the growth hormone secretagogue receptor.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34736642/",
                summary: "A 2022 study demonstrated that cannabidiol and carboxy-THC act as extracellular ligands for the growth hormone secretagogue receptor (GHS-R1a). Researchers found these cannabinoids strongly promote the binding of ghrelin, enabling their early detection in biological samples without interference from synthetic ghrelin mimetics.",
                evidence_level: "preclinical"
            },
        {
                title: "Advances in the detection of growth hormone releasing hormone synthetic analogs.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34665524/",
                summary: "A 2021 in vitro study demonstrated a new, sensitive detection method for four growth hormone-releasing hormone (GHRH) synthetic analogs in urine. Researchers identified 19 metabolites for peptides like sermorelin and CJC-1295, achieving detection limits of 1 ng/ml or less to enhance anti-doping screening.",
                evidence_level: "preclinical"
            },
        {
                title: "Comparison of magnetic bead surface functionalities for the immunopurification of growth hormone-releasing hormones prior to liquid chromatography-high resolution mass spectrometry.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32971474/",
                summary: "A 2020 study demonstrated an optimized immunopurification method using magnetic beads and mass spectrometry to detect growth hormone-releasing hormone and its analogues in human urine. The validated technique successfully identified target peptides like sermorelin and CJC-1295 with a detection limit of 0.2 ng/mL.",
                evidence_level: "preclinical"
            },
        {
                title: "A method for confirming CJC-1295 abuse in equine plasma samples by LC-MS/MS.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30938069/",
                summary: "A 2019 study demonstrated a novel LC-MS/MS method capable of confirming CJC-1295 in equine plasma following immuno-affinity capture and tryptic digestion. Researchers found this technique successfully identified the peptide at concentrations as low as 180 pg/mL.",
                evidence_level: "preclinical"
            },
        {
                title: "An immuno polymerase chain reaction screen for the detection of CJC-1295 and other growth-hormone-releasing hormone analogs in equine plasma.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30489688/",
                summary: "A 2019 study demonstrated that an immuno-polymerase chain reaction assay successfully detected CJC-1295-protein conjugates in equine plasma at concentrations as low as 0.8 pg/mL. The assay's effectiveness was confirmed in thoroughbred racehorses, providing a method to monitor illicit peptide use.",
                evidence_level: "preclinical"
            },
        {
                title: "The study of doping market: How to produce intelligence from Internet forums.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/27710891/",
                summary: "A 2016 analysis of internet forums found that peptides like CJC-1295 are emerging as popular new products in the online doping market. The study demonstrated that semantic analysis of online communities can successfully track these market trends and identify substance suppliers.",
                evidence_level: "emerging"
            },
        {
                title: "Qualitative identification of growth hormone-releasing hormones in human plasma by means of immunoaffinity purification and LC-HRMS/MS.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26879649/",
                summary: "A 2016 study demonstrated that a novel immunoaffinity-mass spectrometry method successfully detected four growth hormone-releasing hormones, including Sermorelin, CJC-1295, and Tesamorelin, in human plasma. The validated approach also identified specific metabolites, providing a reliable tool for sports anti-doping tests.",
                evidence_level: "preclinical"
            }
    ],
    safety_notes:
      "Administration-site reactions reported. Long-term safety not established. Not FDA-approved.",
    half_life_hours: 168,
    route_studied: "SubQ",
    studied_dose_citation: {
      title: "CJC-1295 GH/IGF-1 elevation in humans",
      url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
    },
    interactions: {
      synergies: ["Ipamorelin", "Sermorelin", "Tesamorelin"],
      cautions: [],
      contraindicated: [],
      notes: "GHRH analogs and GHRPs act on distinct receptors; combined GHRH + GHRP administration has been studied for additive GH release.",
    },
    outcomes_timeline: {
      week_1:
        "Healthy adults, single administration: GH elevated for 6+ days and IGF-1 for 9-11 days (PMID 16352683)",
    },
    side_effects: [
      {
        name: "Water retention",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Headache / GH flush",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Administration-site reaction",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Temporary fatigue",
        incidence: "Frequency not established",
        severity: "mild",
      },
    ],
  }),
  p({
    name: "DSIP",
    aliases: ["Delta Sleep-Inducing Peptide"],
    category: "Sleep Peptide",
    category_icon: "\u{1F4A4}",
    primary_benefits: "Sleep architecture in small chronic-insomnia studies, NREM sleep time, motor recovery after stroke (rat model)",
    mechanism:
      "Neuropeptide proposed to modulate the sleep-wake cycle; early studies reported increased delta-wave (NREM) sleep. Interactions with GABA, serotonin, and opioid pathways have been proposed but are incompletely characterized.",
    laypersonSummary:
      "DSIP (Delta Sleep-Inducing Peptide) is a naturally occurring neuropeptide studied in small 1980s clinical studies of chronic insomnia for effects on sleep latency, awakenings, and NREM sleep.",
    key_studies: [
      {
        title: "DSIP delta sleep promotion in chronic insomniacs",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/6895513/",
        summary:
          "Schneider-Helmert & Schoenenberger: DSIP administered IV to chronic insomniacs decreased nocturnal awakenings, reduced sleep latency, and increased total NREM sleep time.",
        evidence_level: "moderate",
      },
      {
        title: "DSIP normalizes sleep in elderly insomniacs",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/3271161/",
        summary:
          "DSIP normalizes sleep architecture in middle-aged and elderly chronic insomniacs, with improvements maintained during follow-up week after treatment cessation.",
        evidence_level: "moderate",
      },
      {
        title: "Synthetic DSIP improves disturbed human sleep",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/6186346/",
        summary:
          "Schneider-Helmert (Experientia): Longer sleep duration, fewer interruptions, and increased REM sleep documented without daytime sedation or side effects.",
        evidence_level: "moderate",
      },
      {
        title: "Repeated DSIP administration and sleep structure normalization",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/2879047/",
        summary:
          "Study demonstrating that repeated DSIP administration produces cumulative buildup effects, progressively normalizing disturbed sleep patterns.",
        evidence_level: "moderate",
      },
        {
                title: "Therapeutic Peptides in Orthopaedics: Applications, Challenges, and Future Directions.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41490200/",
                summary: "Therapeutic peptides, including BPC-157 and TB-500, were found to modulate molecular signaling networks influencing tissue regeneration and inflammation resolution in a 2026 review. The research highlighted their mechanistic potential for orthopaedic applications, noting a current lack of clinical trials.",
                evidence_level: "emerging"
            },
        {
                title: "Domain-specific information preservation for Alzheimer's disease diagnosis with incomplete multi-modality neuroimages.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39798527/",
                summary: "A 2025 study demonstrated that a novel domain-specific information preservation framework significantly outperformed existing methods in imputing missing neuroimage data and identifying Alzheimer's disease status. The dual-stage model successfully captured modality-specific details to improve diagnostic accuracy.",
                evidence_level: "emerging"
            },
        {
                title: "Pichia pastoris secreted peptides crossing the blood-brain barrier and DSIP fusion peptide efficacy in PCPA-induced insomnia mouse models.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39444618/",
                summary: "A 2024 preclinical study demonstrated that a DSIP-CBBBP fusion peptide modulated neurotransmitter levels and exhibited greater restorative effects on sleep and neurotransmitter imbalance compared to DSIP alone in an insomnia mouse model.",
                evidence_level: "preclinical"
            },
        {
                title: "Electronic Prediction of Chemical Contaminants in Aroma of Brewed Roasted Coffee and Quantification of Acrylamide Levels.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38472880/",
                summary: "A 2024 study demonstrated that an electronic nose device successfully predicted chemical contaminants, including acrylamide and 5-hydroxymethylfurfural, in roasted espresso coffee. Researchers found a strong correlation between the device's electronic signals, sensory defects like a burnt smell, and specific contaminant levels.",
                evidence_level: "preclinical"
            },
        {
                title: "Practical N-to-C peptide synthesis with minimal protecting groups.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37884638/",
                summary: "A 2023 study demonstrated a novel N-to-C peptide synthesis strategy utilizing catalytic thioacid formation and oxidative bond formation with minimal protecting groups. Researchers found this method effectively suppressed epimerization and successfully synthesized the nonapeptide DSIP, offering a cleaner alternative to traditional synthesis.",
                evidence_level: "preclinical"
            },
        {
                title: "Single-surface Intensive Phototherapy or Double-Surface Intensive Phototherapy in Neonatal Non-Hemolytic Hyperbilirubinemia: A Comparison of Effectiveness and Complications.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36042828/",
                summary: "A 2021 randomized clinical trial demonstrated that double-surface intensive phototherapy reduced indirect bilirubin levels faster and shortened hospital stays compared to single-surface intensive phototherapy in neonates. The study found no significant increase in complications between the two treatments.",
                evidence_level: "very-strong"
            },
        {
                title: "Delta Sleep-Inducing Peptide Recovers Motor Function in SD Rats after Focal Stroke.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34500605/",
                summary: "A 2021 study on rats demonstrated that intranasal administration of Delta Sleep-Inducing Peptide accelerated the recovery of motor functions following an induced focal stroke. The researchers noted that while brain infarction volume decreased, the difference was not statistically significant.",
                evidence_level: "preclinical"
            },
        {
                title: "DSIP-Like KND Peptide Reduces Brain Infarction in C57Bl/6 and Reduces Myocardial Infarction in SD Rats When Administered during Reperfusion.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33918965/",
                summary: "In a 2021 study, researchers found that the DSIP-like KND peptide significantly reduced myocardial infarction area in rats and brain infarction volume in mice when administered during reperfusion. However, administration during occlusion resulted in 100% mortality in the animal models.",
                evidence_level: "preclinical"
            },
        {
                title: "Strategies to Connect Low-Income Communities with the Proposed Sewerage Network of the Dhaka Sanitation Improvement Project, Bangladesh: A Qualitative Assessment of the Perspectives of Stakeholders.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33019716/",
                summary: "A 2020 qualitative study found that connecting low-income communities in Dhaka to a proposed sewerage network requires improved toilet infrastructure, communal septic tanks, and income-based subsidies. Stakeholders also emphasized the need for government cooperation with NGOs to ensure proper construction and maintenance.",
                evidence_level: "emerging"
            },
        {
                title: "A review of the newly identified impurity profiles in methamphetamine seizures.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32637907/",
                summary: "In a 2020 review, researchers found that analyzing newly identified impurity profiles and stable isotope signatures in methamphetamine seizures provides critical forensic intelligence for identifying synthetic routes and trafficking patterns.",
                evidence_level: "emerging"
            },
        {
                title: "Transsynaptic interactions between IgSF proteins DIP-α and Dpr10 are required for motor neuron targeting specificity.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30714906/",
                summary: "A 2019 study demonstrated that transsynaptic interactions between the proteins DIP-α and Dpr10 are essential for specific motor neuron targeting and connectivity. Researchers found that removing either protein in Drosophila models resulted in the loss of specific axonal branches and neuromuscular junctions.",
                evidence_level: "preclinical"
            },
        {
                title: "Stereotyped terminal axon branching of leg motor neurons mediated by IgSF proteins DIP-α and Dpr10.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30714901/",
                summary: "A 2019 study demonstrated that the precise terminal branching of motor neurons in Drosophila is mediated by the interaction between transmembrane proteins DIP-α and Dpr10. This interaction occurs between axon filopodia and developing muscles to establish coordinated neural circuits.",
                evidence_level: "preclinical"
            },
        {
                title: "Phosphorylated delta sleep inducing peptide restores spatial memory and p-CREB expression by improving sleep architecture at high altitude.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30107169/",
                summary: "A 2018 preclinical study demonstrated that phosphorylated delta sleep-inducing peptide (p-DSIP) improved sleep architecture and restored spatial memory in rats exposed to simulated high-altitude hypoxia. The peptide was found to enhance NREM and REM sleep while upregulating hippocampal CREB phosphorylation.",
                evidence_level: "preclinical"
            },
        {
                title: "Ozone Therapy Protects Against Rejection in a Lung Transplantation Model: A New Treatment?",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28549673/",
                summary: "Ozone therapy prevented severe chronic rejection and regulated pathogenic gene expression in a rat lung transplantation model, a 2017 study demonstrated. Researchers found that the treatment significantly delayed rejection onset compared to untreated controls.",
                evidence_level: "preclinical"
            },
        {
                title: "Expression and Purification of Delta Sleep-Inducing Peptide Fused with Protein Transduction Domain and Human Serum Albumin in Pichia pastoris.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28462721/",
                summary: "A 2017 study found that a novel Delta Sleep-Inducing Peptide (DSIP) fusion protein reduced sleep latency and prolonged sleep duration in mice. The researchers demonstrated that the peptide increased the hypnotic effects of pentobarbital in a dose-dependent manner.",
                evidence_level: "preclinical"
            }
    ],
    safety_notes:
      "Limited modern data. Most studies from the 1980s-90s. Safety profile incompletely defined.",
    half_life_hours: 0.13,
    route_studied: "SubQ",
    interactions: {
      synergies: ["Ipamorelin", "Selank", "Epitalon"],
      cautions: [],
      contraindicated: [],
      notes:
        "Combination data with other peptides are limited.",
    },
    outcomes_timeline: {
      long_term:
        "Chronic insomniac patients: sleep measures were examined in a double-blind study (PMID 1299794); findings across DSIP sleep studies have been inconsistent",
    },
    side_effects: [
      { name: "Headache", incidence: "Frequency not established", severity: "mild" },
      {
        name: "Morning grogginess",
        incidence: "Frequency not established",
        severity: "mild",
      },
    ],
  }),

  // ─── NEW ───,
  p({
    name: "Epitalon",
    aliases: ["Epithalon", "AEDG peptide"],
    category: "Telomerase Activator",
    category_icon: "\u{1F9EC}",
    primary_benefits: "Telomerase activation (human cell culture), lifespan endpoints (rodent models), melatonin secretion in small studies of elderly adults",
    mechanism:
      "Activated telomerase (hTERT) expression and telomere elongation in cultured human cells. Rodent and small human studies have also examined effects on melatonin production, circadian rhythm, and antioxidant enzyme activity.",
    laypersonSummary:
      "Epitalon is a synthetic tetrapeptide studied in cell culture and rodent models for telomerase activation and lifespan endpoints, with small Russian studies in elderly adults examining melatonin rhythms.",
    key_studies: [
      {
        title: "Epitalon lifespan extension in animals",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12937682/",
        summary:
          "Anisimov et al. (Biogerontology): Extends lifespan in multiple animal models by 10-15% via telomerase activation and melatonin regulation.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Epitalon activates telomerase and lengthens telomeres in human cells",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14501182/",
        summary:
          "Khavinson et al. demonstrate Epitalon activates telomerase catalytic subunit (hTERT) expression in human fetal fibroblasts, extending replicative lifespan by 10 population doublings.",
        evidence_level: "preclinical",
      },
      {
        title: "Epitalon geroprotective effects: 25-year comprehensive review",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33466359/",
        summary:
          "Comprehensive 25-year review of Epitalon's antioxidant, neuroprotective, antimutagenic, and anti-cancer properties across in vitro, in vivo, and in silico models.",
        evidence_level: "preclinical",
      },
      {
        title: "Epithalamin (parent compound) regulates melatonin in elderly",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11524632/",
        summary:
          "Korkushko et al.: Epithalamin administration normalizes melatonin production and circadian rhythm in elderly patients, improving sleep and immune function.",
        evidence_level: "moderate",
      },
        {
                title: "Therapeutic peptides in gerontology: mechanisms and applications for healthy aging.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42021992/",
                summary: "Therapeutic peptides offer mechanistically diverse approaches to targeting fundamental hallmarks of aging, a 2026 review demonstrated. While FDA-approved agents show clinical potential, investigational peptides require rigorous validation through well-designed trials to establish long-term safety and efficacy.",
                evidence_level: "emerging"
            },
        {
                title: "Therapeutic Peptides in Orthopaedics: Applications, Challenges, and Future Directions.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41490200/",
                summary: "Therapeutic peptides, including BPC-157 and TB-500, were found to modulate molecular signaling networks influencing tissue regeneration and inflammation resolution in a 2026 review. The research highlighted their mechanistic potential for orthopaedic applications, noting a current lack of clinical trials.",
                evidence_level: "emerging"
            },
        {
                title: "Epitalon increases telomere length in human cell lines through telomerase upregulation or ALT activity.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40908429/",
                summary: "Epitalon demonstrated dose-dependent telomere length extension in normal human cells through hTERT and telomerase upregulation in a 2025 in-vitro study. Researchers also found that the peptide increased telomere length in cancer cell lines primarily via Alternative Lengthening of Telomeres activation.",
                evidence_level: "preclinical"
            },
        {
                title: "The Antioxidant Tetrapeptide Epitalon Enhances Delayed Wound Healing in an in Vitro Model of Diabetic Retinopathy.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40493162/",
                summary: "The tetrapeptide Epitalon restored delayed wound healing in high glucose-injured human retinal cells by inhibiting epithelial-mesenchymal transition and fibrosis, a 2025 in vitro study demonstrated. Researchers found that the peptide also reduced intracellular reactive oxygen species and restored antioxidant gene expression.",
                evidence_level: "preclinical"
            },
        {
                title: "Overview of Epitalon-Highly Bioactive Pineal Tetrapeptide with Promising Properties.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40141333/",
                summary: "A 2025 review found that the tetrapeptide Epitalon demonstrates geroprotective and neuroendocrine properties through antioxidant and neuroprotective mechanisms. Researchers highlighted its ability to influence melatonin synthesis, modulate interleukin-2 levels, and enhance telomerase activity in preclinical models.",
                evidence_level: "preclinical"
            },
        {
                title: "Epitalon-activated telomerase enhance bovine oocyte maturation rate and post-thawed embryo development.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39788414/",
                summary: "A 2025 preclinical study demonstrated that Epitalon activates telomerase, significantly improving bovine oocyte maturation rates and post-thawed embryo development. The peptide enhanced the overall quality of in vitro mature oocytes and blastocysts by improving mitochondrial health and reducing reactive oxygen species.",
                evidence_level: "preclinical"
            },
        {
                title: "[Effect of epitalon and melatonin on life span and spontaneous carcinogenesis in senescence accelerated mice (SAM)].",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15909815/",
        summary: "A study published in Voprosy onkologii investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Peptide Epitalon activates chromatin at the old age.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14647006/",
        summary: "A study published in Neuro endocrinology letters investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Inhibitory effect of peptide Epitalon on colon carcinogenesis induced by 1,2-dimethylhydrazine in rats.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12049808/",
        summary: "A study published in Cancer letters investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Identification of the small research tetra peptide Epitalon, assumed to be a potential treatment for cancer, old age and Retinitis Pigmentosa in two illegal pharmaceutical preparations.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25535022/",
        summary: "A study published in Drug testing and analysis investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Inhibitory effect of the peptide epitalon on the development of spontaneous mammary tumors in HER-2/neu transgenic mice.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12209581/",
        summary: "A study published in International journal of cancer investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Epitalon influences pineal secretion in stress-exposed rats in the daytime.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12500171/",
        summary: "A study published in Neuro endocrinology letters investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[Peptides and CCL11 and HMGB1 as molecular markers of aging: literature review and own data].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25826983/",
        summary: "A study published in Advances in gerontology = Uspekhi gerontologii investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Effect of Epitalon on biomarkers of aging, life span and spontaneous tumor incidence in female Swiss-derived SHR mice.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14501183/",
        summary: "A study published in Biogerontology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Effects of intranasal administration of epitalon on neuron activity in the rat neocortex.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17955380/",
        summary: "A study published in Neuroscience and behavioral physiology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[Effect of Epitalon and Vilon treatment on mammary carcinogenesis in transgenic erbB-2/NEU mice].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12101568/",
        summary: "A study published in Voprosy onkologii investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
                title: "AEDG peptide and pineal polypeptides influence on human circadian rhythms",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39742404/",
                summary: "A 2024 review found that the AEDG peptide and pineal polypeptides influenced human circadian rhythms and increased melatonin secretion in older adults. The researchers demonstrated these effects occurred by regulating circadian gene expression and reducing apoptosis-promoting proteins like p16 and p53.",
                evidence_level: "emerging"
            },
        {
                title: "EPIGENETIC MODIFICATION UNDER THE INFLUENCE OF PEPTIDE BIOREGULATORS ON THE \"OLD\" CHROMATIN.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37042594/",
                summary: "In a 2023 in-vitro study, researchers found that short peptide bioregulators, including Epitalon and Livagen, induced selective decondensation of chromatin and activated ribosomal genes in cultured lymphocytes from older adults. This demonstrated the peptides' ability to selectively remodel facultative heterochromatin.",
                evidence_level: "preclinical"
            },
        {
                title: "Epitalon protects against post-ovulatory aging-related damage of mouse oocytes in vitro.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35413689/",
                summary: "A 2022 in vitro study demonstrated that Epitalon delayed the aging process of mouse oocytes by reducing reactive oxygen species and modulating mitochondrial activity. The peptide significantly decreased spindle defects and apoptosis, protecting against post-ovulatory cellular damage.",
                evidence_level: "preclinical"
            },
        {
                title: "Peptides Regulating Proliferative Activity and Inflammatory Pathways in the Monocyte/Macrophage THP-1 Cell Line.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35408963/",
                summary: "A 2022 in vitro study found that five Khavinson peptides, including Epitalon and Vilon, modulated proliferative patterns and inhibited the expression of pro-inflammatory cytokines TNF and IL-6 in human monocytic cells. Furthermore, the peptides reduced monocyte adhesion to activated endothelial cells.",
                evidence_level: "preclinical"
            },
        {
                title: "[The influence of AEDG and KE peptides on mitochondries stain and L7A ribosomes protein expression during human pineal gland and thymus cell senescence in vitro.].",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33342107/",
                summary: "In a 2020 in vitro study, researchers demonstrated that AEDG and KE peptides increased mitochondrial staining and decreased L7A ribosomal protein expression in senescent human pineal and thymic cells. These findings suggest tissue-specific normalization of mitochondrial and ribosomal functions.",
                evidence_level: "preclinical"
            },
        {
                title: "[AEDG peptide regulates human circadian rhythms genes expression during pineal gland accelerated aging.].",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33280326/",
                summary: "A 2020 study found that the AEDG peptide increased melatonin metabolite excretion by 1.7 times in middle-aged individuals. The research also demonstrated that the peptide normalized the expression of specific circadian rhythm genes in human leukocytes and lymphocytes.",
                evidence_level: "strong"
            },
        {
                title: "AEDG Peptide (Epitalon) Stimulates Gene Expression and Protein Synthesis during Neurogenesis: Possible Epigenetic Mechanism.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32019204/",
                summary: "A 2020 study demonstrated that AEDG peptide increased the expression and synthesis of neurogenic differentiation markers in human stem cells. Researchers found this epigenetic regulation likely occurs through the peptide binding to specific histones.",
                evidence_level: "preclinical"
            },
        {
                title: "Short Peptides Protect Oral Stem Cells from Ageing.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31677028/",
                summary: "In a 2020 in vitro study, researchers found that AEDG and KED peptides significantly decreased the expression of senescence markers p16 and p21 in human oral stem cells. This demonstrated the peptides' ability to maintain stem cell morphology and delay cellular aging during long-term cultivation.",
                evidence_level: "preclinical"
            },
        {
                title: "Short Exogenous Peptides Regulate Expression of CLE, KNOX1, and GRF Family Genes in Nicotiana tabacum.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28371610/",
                summary: "A 2017 in-vitro study demonstrated that the short peptides epitalon, bronchogen, and vilon significantly stimulated growth and modulated the expression of genes responsible for tissue formation and cell differentiation in tobacco plant cultures.",
                evidence_level: "preclinical"
            },
        {
                title: "Effects of Geroprotectors on Age-Related Changes in Proteolytic Digestive Enzyme Activities at Different Lighting Conditions.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26519279/",
                summary: "A 2015 study in rats demonstrated that administering epithalon and melatonin restored the age-related dynamics of pepsin activity in the gastric mucosa when exposed to constant lighting. The peptides had little effect on total proteolytic activity in the stomach and pancreas.",
                evidence_level: "preclinical"
            }
    ],
    safety_notes:
      "Research-only. Telomerase activation carries theoretical cancer risk. Long-term safety unknown.",
    half_life_hours: 2,
    route_studied: "SubQ",
    interactions: {
      synergies: ["GHK-Cu", "MOTS-c", "SS-31"],
      cautions: [],
      contraindicated: [],
      notes: "Combination data with other peptides are limited.",
    },
    outcomes_timeline: {
      long_term:
        "Human somatic cell culture: telomerase activity and telomere elongation reported (PMID 12937682); lifespan effects have been reported in rodent studies from the developer's research group",
    },
    side_effects: [
      {
        name: "Few adverse events reported",
        incidence: "Based on Russian clinical research",
        severity: "mild",
      },
      { name: "Mild fatigue", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  // ─── IMMUNE ───,
  p({
    name: "Follistatin-344",
    aliases: ["FS-344"],
    category: "Myostatin Inhibitor",
    category_icon: "\u{1F4AA}",
    primary_benefits: "Myostatin and activin binding, muscle mass (AAV gene-transfer animal models), walking distance in a Phase I Becker muscular dystrophy gene-therapy trial",
    mechanism:
      "Endogenous binding protein that neutralizes myostatin and activin. In animal gene-transfer and transgenic models, follistatin expression increased muscle mass and fiber size.",
    laypersonSummary:
      "Follistatin-344 is a naturally occurring protein that binds myostatin; it has been studied mainly through AAV gene transfer in animal models and a small Phase I gene-therapy trial in Becker muscular dystrophy, not as an injected peptide.",
    key_studies: [
      {
        title: "Follistatin gene therapy increases muscle mass and strength",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19208403/",
        summary:
          "Rodino-Klapac et al. (Mol. Ther.): AAV-delivered follistatin 344 increases muscle mass and fiber diameter across multiple animal species without adverse reproductive or endocrine effects.",
        evidence_level: "preclinical",
      },
      {
        title: "Follistatin as myostatin antagonist — therapeutic potential",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22207074/",
        summary:
          "Kalista et al.: Review of follistatin's role as primary endogenous myostatin antagonist and its therapeutic potential for muscular dystrophies and sarcopenia.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Follistatin gene transfer for Becker muscular dystrophy (Phase I)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25358937/",
        summary:
          "Mendell et al. (Mol. Ther.): Phase I clinical trial of AAV1-follistatin gene transfer in Becker muscular dystrophy patients shows improved 6-minute walk test with no adverse effects.",
        evidence_level: "moderate",
      },
      {
        title: "Follistatin in adipocyte differentiation and energy metabolism",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30686776/",
        summary:
          "Research demonstrating follistatin's broader metabolic role in adipocyte browning, energy expenditure, and metabolic health beyond muscle hypertrophy.",
        evidence_level: "preclinical",
      },
        {
                title: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41966639/",
                summary: "A 2026 review found that while unapproved peptides like BPC-157 and TB-500 demonstrate favorable tissue repair in animal models, rigorous human safety data remain scarce. The researchers investigated the pharmacological mechanisms and regulatory status of these compounds in sports medicine.",
                evidence_level: "emerging"
            },
        {
                title: "Sub-200  fs, 344  MHz mode-locked Tm-doped fiber laser.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33001928/",
                summary: "In a 2020 study, researchers demonstrated a compact, self-starting mode-locked thulium-doped fiber laser achieving a fundamental repetition rate of 344 MHz and a pulse duration of 160 fs. The system generated pulses centered at 1975 nm with a maximum output power of 560 mW.",
                evidence_level: "emerging"
            },
        {
                title: "Central serous chorioretinopathy associated with high-dose follistatin-344: a retrospective case series.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32671599/",
                summary: "High-dose subcutaneous injections of follistatin-344 were associated with the development of central serous chorioretinopathy in eleven bodybuilding athletes, according to a 2020 retrospective case series. The study demonstrated that symptoms and subretinal fluid generally resolved after discontinuing the peptide.",
                evidence_level: "moderate"
            },
        {
                title: "Detection of black market follistatin 344.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31758732/",
                summary: "A 2019 study demonstrated that only nine of 17 tested black market follistatin 344 products actually contained the peptide. Researchers successfully developed an electrophoretic detection method to identify these His-tagged illicit peptides in serum and urine.",
                evidence_level: "preclinical"
            },
        {
                title: "The transgenic expression of human follistatin-344 increases skeletal muscle mass in pigs.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/27787698/",
                summary: "A 2017 study demonstrated that transgenic expression of human follistatin-344 in pigs significantly increased skeletal muscle mass and reduced body fat. Researchers found this growth was driven by myofiber hypertrophy and altered signaling pathways, without causing cardiac or reproductive abnormalities.",
                evidence_level: "preclinical"
            }
    ],
    safety_notes:
      "Research-only. Mechanism raises theoretical concern for unregulated growth. Limited human safety data; Phase I gene-therapy data do not apply directly to injected peptide. A retrospective case series linked high-dose injected follistatin-344 to central serous chorioretinopathy in athletes (PMID 32671599).",
    half_life_hours: 6,
    route_studied: "SubQ",
    interactions: {
      synergies: ["IGF-1 LR3", "CJC-1295", "Ipamorelin"],
      cautions: [],
      contraindicated: [],
      notes:
        "Combination data with other peptides are limited.",
    },
    outcomes_timeline: {},
    side_effects: [
      {
        name: "Limited human safety data",
        incidence: "Investigational only",
        severity: "mild",
      },
      {
        name: "Central serous chorioretinopathy",
        incidence: "Case series (PMID 32671599)",
        severity: "uncommon",
        note: "Reported with high-dose injected use; generally resolved after discontinuation",
      },
      {
        name: "Administration-site reaction",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Theoretical cancer promotion",
        incidence: "Mechanism-based concern",
        severity: "rare",
        note: "Myostatin inhibition could allow unregulated cell growth",
      },
    ],
  }),

  // ─── GROWTH ───,
  p({
    name: "GHK-Cu",
    aliases: ["Copper peptide GHK"],
    category: "Copper Peptide",
    category_icon: "\u{2728}",
    primary_benefits: "Collagen and elastin synthesis (dermal cell studies), wound closure (animal models), topical skin-aging endpoints in cosmetic studies, gene-expression modulation (in vitro)",
    mechanism:
      "Copper-binding tripeptide that, in cell and animal studies, increased collagen I/III expression, regulated metalloproteinases (MMP1, MMP2) and TIMP1, and promoted angiogenesis and immune-cell recruitment at wound sites. Plasma levels are reported to decline with age.",
    laypersonSummary:
      "GHK-Cu is a naturally occurring copper peptide studied in cell and animal models for collagen synthesis and wound closure, and in topical cosmetic studies for skin-aging endpoints.",
    key_studies: [
      {
        title: "GHK-Cu skin regeneration and anti-aging effects",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17703734/",
        summary:
          "Pickart (J. Cosmetic Dermatol.) reviews GHK-Cu's role in stimulating collagen, elastin, and glycosaminoglycan synthesis, improving skin density, thickness, and reducing fine lines.",
        evidence_level: "moderate",
      },
      {
        title: "GHK-Cu gene expression: up/down-regulation of 4,000+ genes",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/24687255/",
        summary:
          "Pickart et al. analyze gene-expression datasets in which GHK-Cu was associated with changes in expression of 4,000+ human genes, and discuss hypothesized relevance to COPD, cancer, and aging. These are computational and cell-data analyses, not clinical outcomes.",
        evidence_level: "preclinical",
      },
      {
        title: "GHK-Cu wound healing and tissue remodeling review",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18047532/",
        summary:
          "Comprehensive review demonstrating GHK-Cu accelerates wound closure, promotes angiogenesis, reduces scarring, and exhibits anti-inflammatory and antioxidant properties.",
        evidence_level: "moderate",
      },
      {
        title: "GHK-Cu stimulates collagen I/III and MMP regulation",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28508416/",
        summary:
          "Study shows GHK-Cu increases collagen I and III gene expression, regulates metalloproteinases (MMP1, MMP2) and TIMP1, supporting balanced tissue remodeling.",
        evidence_level: "preclinical",
      },
      {
        title: "GHK-Cu protects skin against UV radiation damage",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25383582/",
        summary:
          "Research demonstrates GHK-Cu provides UV photoprotection, reduces oxidative stress markers, and activates multiple regenerative and antioxidant genes in dermal cells.",
        evidence_level: "preclinical",
      },
        {
                title: "The Laccase-like Property of GHK-Cu and Its Applications in Colorimetric Sensing of Phenolic Compounds.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42041438/",
                summary: "A 2026 study demonstrated that the copper peptide GHK-Cu possesses laccase-like properties with excellent catalytic efficiency. Researchers found that this property enables GHK-Cu to be utilized in colorimetric sensors for the rapid detection of phenolic compounds like epinephrine and 2-aminophenol.",
                evidence_level: "preclinical"
            },
        {
                title: "Therapeutic peptides in gerontology: mechanisms and applications for healthy aging.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42021992/",
                summary: "A 2026 review found that nine therapeutic peptides, including epitalon and BPC-157, target diverse aging hallmarks such as metabolic dysfunction and tissue repair. While FDA-approved agents demonstrated robust safety, investigational peptides require further clinical validation to establish long-term efficacy.",
                evidence_level: "emerging"
            },
        {
                title: "Glycyl-L-histidyl-L-lysine-Cu2+ (GHK-Cu) Attenuates CuSO4 or LPS induced-inflammation in Zebrafish larvae model.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41997403/",
                summary: "A 2026 study demonstrated that GHK-Cu decreased neutrophil and macrophage migration while suppressing pro-inflammatory cytokines in a zebrafish larvae model. The peptide also mitigated oxidative stress and downregulated the JAK1 pathway, highlighting its anti-inflammatory and antioxidant mechanisms.",
                evidence_level: "preclinical"
            },
        {
                title: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41966639/",
                summary: "A 2026 review found that while unapproved peptides like BPC-157 and TB-500 demonstrate favorable tissue repair in animal models, rigorous human safety data remain scarce. The researchers investigated the pharmacological mechanisms and regulatory status of these compounds in sports medicine.",
                evidence_level: "emerging"
            },
        {
                title: "Carbonless amino acids and a carbonless GHK peptide.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41859865/",
                summary: "Carbonless analogues of the GHK peptide demonstrated enhanced conformational plasticity and stronger copper binding stabilization compared to standard GHK, according to a 2026 computational study. These findings highlight the feasibility of using boron-nitrogen substitution to tune peptide behavior.",
                evidence_level: "emerging"
            },
        {
                title: "Smart Healing for Wound Repair: Emerging Multifunctional Strategies in Personalized Regenerative Medicine and Their Relevance to Orthopedics.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41594073/",
                summary: "Advanced biomaterials and bioactive peptides like GHK-Cu integrate tissue regeneration, antibacterial activity, and real-time monitoring for targeted wound repair, as investigated in a 2026 review. These emerging platforms demonstrated potential for personalized regenerative medicine and orthopedic applications.",
                evidence_level: "emerging"
            },
        {
                title: "Therapeutic Peptides in Orthopaedics: Applications, Challenges, and Future Directions.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41490200/",
                summary: "Therapeutic peptides, including BPC-157 and TB-500, were found to modulate molecular signaling networks influencing tissue regeneration and inflammation resolution in a 2026 review. The research highlighted their mechanistic potential for orthopaedic applications, noting a current lack of clinical trials.",
                evidence_level: "emerging"
            },
        {
                title: "Injectable Peptide Therapy: A Primer for Orthopaedic and Sports Medicine Physicians.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41476424/",
                summary: "A 2026 review found a significant lack of human clinical evidence to support the use of peptides like BPC-157 and TB-4 in orthopaedics, despite demonstrating potential tissue repair benefits in preclinical models.",
                evidence_level: "emerging"
            },
        {
                title: "Protective Functions of β-Alanyl-L-Histidine and Glycyl-L-Histidyl-L-Lysine Glycoconjugates and Copper in Concert.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41462712/",
                summary: "A 2025 review found that glycoconjugates of carnosine and GHK act as copper ionophores, increasing intracellular copper levels to stimulate signaling pathways. These stabilized peptide derivatives demonstrated an ability to promote the expression of trophic and angiogenic proteins like BDNF and VEGF.",
                evidence_level: "emerging"
            },
        {
                title: "Golgi-targeted copper delivery strategy via enhancing copper-dependent proteins' activity for fascia regeneration.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41371501/",
                summary: "A 2026 preclinical study demonstrated that a Golgi-targeted copper delivery system utilizing GHK-Cu and ATOX1 mRNA significantly enhanced lysyl oxidase activity and neovascularization. Researchers found that this combination promoted collagen alignment and facilitated extracellular matrix reconstruction in a rabbit fascia defect model.",
                evidence_level: "preclinical"
            },
        {
                title: "An injectable hydroxyapatite microsphere filler loaded with GHK-Cu tripeptide for anti-Inflammatory and antioxidant.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40716276/",
                summary: "A 2025 study demonstrated that a novel injectable filler loaded with GHK-Cu reduced inflammatory factors and reactive oxygen species in both in vivo and in vitro models. The formulation also provided sustained peptide release for seven days and enhanced collagen deposition.",
                evidence_level: "preclinical"
            },
        {
                title: "Exploring the beneficial effects of GHK-Cu on an experimental model of colitis and the underlying mechanisms.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40672369/",
                summary: "A 2025 study demonstrated that GHK-Cu reduced inflammatory cytokines and promoted mucosal repair in a murine model of colitis. Researchers found these effects were mediated by regulating the SIRT1/STAT3 signaling pathway, suggesting potential applications for intestinal inflammation.",
                evidence_level: "preclinical"
            },
        {
                title: "Interaction of half-sandwich Rh(III) ion and some of its complexes with endogenous imidazole derivatives.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40233472/",
                summary: "A 2025 in-vitro study found that biogenic imidazole derivatives, particularly histidine and the GHK peptide, exhibit exceptionally high binding affinity for {Rh(η5-Cp*)}2+ cations. These ligands successfully compete with human serum albumin, demonstrating their potential to significantly influence the biodistribution of rhodium-based metallodrugs.",
                evidence_level: "preclinical"
            },
        {
                title: "Intrinsically photoluminescent hydrogels to measure peptides‑copper binding affinities.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40203644/",
                summary: "In a 2025 study, researchers found that increasing the distance of the GHK peptide sequence from a photoluminescent hydrogel surface decreased its copper binding constant and quenching efficiency. The findings demonstrate a novel method for measuring peptide-copper binding affinities to optimize biosensor design.",
                evidence_level: "preclinical"
            },
        {
                title: "Copper Complexes with New Glycyl-l-histidyl-l-lysine-Hyaluronan Conjugates Show Antioxidant Properties and Osteogenic and Angiogenic Synergistic Effects.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40123442/",
                summary: "A 2025 in vitro study demonstrated that copper complexes with GHK-hyaluronan conjugates promoted the expression of angiogenic and osteogenic factors, including BDNF, VEGF, and BMP-2. The research found that these conjugates potentiated antioxidant properties through the nuclear translocation of intracellular copper chaperones.",
                evidence_level: "preclinical"
            }
    ],
    safety_notes:
      "Long history of topical use in cosmetic formulations with few reported adverse effects. Safety data for injected use are limited. Not FDA-approved as a drug.",
    half_life_hours: 0.5,
    route_studied: "SubQ",
    interactions: {
      synergies: ["BPC-157", "TB-500", "Epitalon"],
      cautions: [],
      contraindicated: [],
      notes:
        "Combination data with other peptides are limited.",
    },
    side_effects: [
      {
        name: "Skin irritation (topical)",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Transient skin flushing",
        incidence: "Frequency not established",
        severity: "mild",
      },
    ],
  }),

  // ─── GHRH ───,
  p({
    name: "GHRP-2",
    aliases: ["Growth Hormone Releasing Peptide-2", "Pralmorelin", "KP-102"],
    category: "GHRP",
    category_icon: "\u{26A1}",
    primary_benefits:
      "GH release in healthy-adult studies, approved in Japan as a GH-deficiency diagnostic, GH secretagogue receptor pharmacology",
    mechanism:
      "Synthetic hexapeptide GH secretagogue acting on the GHSR1a receptor. In healthy-adult studies GHRP-2 stimulated GH release, with moderate increases in cortisol and prolactin reported. Approved in Japan as a diagnostic agent for GH deficiency (Pralmorelin/GHRP Kaken).",
    laypersonSummary:
      "GHRP-2 is a synthetic growth-hormone-releasing peptide studied in healthy adults for GH release and approved in Japan as a diagnostic test for growth hormone deficiency.",
    key_studies: [
      {
        title: "GHRP-2 potent GH release in healthy adults",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9089484/",
        summary:
          "Arvat et al. (J. Clin. Endocrinol. Metab.): GHRP-2 produces the strongest GH response among tested GHRPs in healthy adults, with dose-dependent effects and moderate prolactin/cortisol elevation.",
        evidence_level: "moderate",
      },
      {
        title: "GHRP-2 approved diagnostic agent for GH deficiency",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15565092/",
        summary:
          "Clinical validation of GHRP-2 (Pralmorelin) as a diagnostic GH provocative test in Japan, showing reliable, reproducible GH stimulation for diagnosing adult GH deficiency.",
        evidence_level: "strong",
      },
      {
        title: "GHRP-2 effects on sleep and nocturnal GH secretion",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9054473/",
        summary:
          "Frieboes et al.: GHRP-2 enhances slow-wave sleep and amplifies nocturnal GH pulses in healthy young men.",
        evidence_level: "moderate",
      },
      {
        title: "GHRP-2 increases IGF-1 and lean mass in elderly",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9467546/",
        summary:
          "Bowers et al.: Chronic GHRP-2 administration in elderly subjects increases IGF-1, GH, and lean body mass while reducing fat mass.",
        evidence_level: "moderate",
      },
        {
                title: "Possible Involvement of Hypothalamic Dysfunction in Long COVID Patients Characterized by Delayed Response to Gonadotropin-Releasing Hormone.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41596479/",
                summary: "A 2026 study found that long COVID patients exhibited delayed hormonal responses to gonadotropin-releasing hormone, while growth hormone responses to GHRP-2 stimulation remained preserved. These findings suggest functional secondary hypothalamic dysfunction rather than irreversible primary pituitary injury.",
                evidence_level: "moderate"
            },
        {
                title: "Diurnal and Daily Variations in Growth Hormone and Growth Hormone Stimulation Test in Male Cynomolgus Monkeys.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41482410/",
                summary: "In a 2026 study, researchers demonstrated that cynomolgus monkeys exhibit diurnal growth hormone variations similar to humans and respond significantly to exogenous GHRH. These findings confirmed that morning GHRH stimulation reliably assesses growth hormone levels, validating this animal model for pituitary toxicity research.",
                evidence_level: "preclinical"
            },
        {
                title: "One Case of Sudden Isolated Adrenocorticotropic Hormone (ACTH) Deficiency Diagnosed Based on Repeated Hypoglycemic Attacks.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40677481/",
                summary: "A 2025 case report demonstrated that a growth hormone-releasing peptide-2 (GHRP-2) load test helped diagnose sudden isolated ACTH deficiency in a patient experiencing severe hypoglycemia. The peptide was utilized alongside other stimulation tests to evaluate specific pituitary functions.",
                evidence_level: "anecdotal"
            },
        {
                title: "Benchmark for Setting ACTH Cell Dosage in Clinical Regenerative Medicine for Post-Operative Hypopituitarism.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40277822/",
                summary: "A 2025 study found that the average peak secretion values for ACTH and GH in human patients were 97.2 pg/mL and 25.1 ng/mL, respectively. These findings established critical benchmarks for determining safe cell dosages in future regenerative pituitary transplantations.",
                evidence_level: "moderate"
            },
        {
                title: "Growth Hormone-Releasing Peptide 2 May Be Associated With Decreased M1 Macrophage Production and Increased Histologic and Biomechanical Tendon-Bone Healing Properties in a Rat Rotator Cuff Tear Model.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39672241/",
                summary: "A 2025 study found that GHRP-2 decreased M1 macrophage polarization and improved histologic and biomechanical tendon-bone healing properties in a rat rotator cuff tear model. The peptide demonstrated increased bone mineral density, maximal failure load, and stiffness at the healing interface.",
                evidence_level: "preclinical"
            },
        {
                title: "Robust growth hormone responses to GH-releasing peptide 2 in adolescents.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38958228/",
                summary: "A 2024 retrospective study found that GHRP-2 elicited a robust growth hormone response in adolescents with idiopathic growth hormone deficiency and short stature. The findings demonstrated that current diagnostic cut-off levels for the GHRP-2 test may miss some patients and require revisiting.",
                evidence_level: "moderate"
            },
        {
                title: "Literature-Based Discovery to Elucidate the Biological Links between Resistant Hypertension and COVID-19.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37759668/",
                summary: "A 2023 text-mining analysis identified growth hormone-releasing peptide 2 among the top biological concepts linking COVID-19 to resistant hypertension. The study mapped these connections to physiological themes including altered endocrine function, inflammation, and lipid metabolism.",
                evidence_level: "emerging"
            },
        {
                title: "Assessment of anterior pituitary reserve capacity based on growth hormone response to growth hormone-releasing peptide-2 test in the elderly.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37295337/",
                summary: "A 2023 study found that adrenocortical function significantly correlated with growth hormone responses to the GHRP-2 test in 65 elderly patients. The research demonstrated that this peptide test may help assess anterior pituitary reserve capacity in individuals with pituitary tumors.",
                evidence_level: "strong"
            },
        {
                title: "Clinical Usefulness of the Growth Hormone-Releasing Peptide-2 Test for Hypothalamic-Pituitary Disorder.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35795807/",
                summary: "A 2022 study demonstrated that the GHRP-2 test accurately screens for secondary adrenal insufficiency in patients with hypothalamic-pituitary disorders. Researchers found that combining ACTH response and peak cortisol levels during the test yielded 100% specificity and high diagnostic accuracy.",
                evidence_level: "moderate"
            },
        {
                title: "Pharmacotherapy in Cachexia: A Review of Endocrine Abnormalities and Steroid Pharmacotherapy.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35758863/",
                summary: "Pharmacological agents including Growth Hormone Releasing Peptide-2 (GHRP-2), steroids, and SARMs were identified as potential options for managing cachexia. A 2022 review investigated these treatments, noting their ability to target inflammation and muscle wasting despite a lack of standardized recommendations.",
                evidence_level: "emerging"
            },
        {
                title: "Association between overweight and growth hormone secretion in patients with non-functioning pituitary tumors.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35452483/",
                summary: "A 2022 study found a negative synergistic effect between overweight status and tumor size on growth hormone secretion in patients with non-functioning pituitary tumors. Researchers demonstrated that overweight individuals exhibited a significantly higher prevalence of severe growth hormone deficiency during GHRP-2 testing.",
                evidence_level: "strong"
            },
        {
                title: "Idiopathic combined adrenocorticotropin and growth hormone deficiency mimicking chronic fatigue syndrome.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34686480/",
                summary: "A 2021 case report found that a patient presenting with chronic fatigue syndrome actually had combined adrenocorticotropin and growth hormone deficiency. The study demonstrated that utilizing a growth hormone-releasing peptide-2 test successfully identified the deficiency, leading to symptom amelioration following hormone replacement.",
                evidence_level: "anecdotal"
            },
        {
                title: "ICAM1-Negative Intravascular Large B-Cell Lymphoma of the Pituitary Gland: A Case Report and Literature Review.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34307847/",
                summary: "Intravascular large B-cell lymphoma with pituitary involvement predominantly occurs in older women and often presents with reversible panhypopituitarism, a 2021 case report found. Researchers demonstrated that ICAM1-negative lymphoid cells may extravasate into pituitary tissues.",
                evidence_level: "anecdotal"
            },
        {
                title: "Refractory hypoglycaemia in a localised gastrointestinal stromal tumour: Case report.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34090190/",
                summary: "A 2021 case report found that a GHRP-2 assay elicited an excessive basal growth hormone reaction in a patient with a gastrointestinal stromal tumor and refractory hypoglycemia. The study demonstrated that the hypoglycemia resolved following dexamethasone administration and surgical resection.",
                evidence_level: "anecdotal"
            },
        {
                title: "On the road of dried blood spot sampling for antidoping tests: Detection of GHRP-2 abuse.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33197153/",
                summary: "A 2021 study demonstrated that dried blood spot sampling successfully detected GHRP-2 up to four hours after a single intravenous dose. The validated method established a limit of detection of 50 pg/ml and confirmed long-term sample stability for over two years.",
                evidence_level: "moderate"
            },
        {
                title: "Identification of potential Mpro inhibitors for the treatment of COVID-19 by using systematic virtual screening approach.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32737681/",
                summary: "In a 2021 virtual screening study, researchers identified pralmorelin, several antiviral drugs, and 20 novel compounds as potential inhibitors of the SARS-CoV-2 main protease. The study demonstrated that these molecules exhibit promising interactions with the target protein, providing hits for further antiviral development.",
                evidence_level: "emerging"
            }
    ],
    safety_notes:
      "Approved in Japan as a diagnostic agent (Pralmorelin). Raises cortisol and prolactin in published studies. Not FDA-approved for therapeutic use.",
    half_life_hours: 1.5,
    is_fda_approved: false,
    route_studied: "SubQ",
    interactions: {
      synergies: ["CJC-1295", "Sermorelin", "DSIP"],
      cautions: ["GHRP-6", "Hexarelin"],
      contraindicated: [],
      notes:
        "GHRPs share the GHSR1a receptor, so combining them is redundant; GHRH analogs act on a separate receptor. GHRP-2 is described as producing less appetite stimulation than GHRP-6.",
    },
    outcomes_timeline: {},
    side_effects: [
      {
        name: "Appetite increase",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Cortisol elevation (transient)",
        incidence: "Reported in studies",
        severity: "mild",
      },
      {
        name: "Prolactin elevation (transient)",
        incidence: "Reported in studies",
        severity: "mild",
      },
      { name: "Water retention", incidence: "Frequency not established", severity: "mild" },
      {
        name: "Drowsiness / fatigue",
        incidence: "Frequency not established",
        severity: "mild",
      },
    ],
  }),
  p({
    name: "GHRP-6",
    aliases: [
      "Growth Hormone Releasing Peptide-6",
      "His-D-Trp-Ala-Trp-D-Phe-Lys-NH2",
    ],
    category: "GHRP",
    category_icon: "\u{26A1}",
    primary_benefits:
      "Dose-dependent GH release in human studies, appetite and gastric emptying via ghrelin receptors, cardioprotection in ischemia-reperfusion models (animal), synergistic GH release with GHRH",
    mechanism:
      "Synthetic hexapeptide that stimulates GH release by acting on the ghrelin/GHS receptor (GHSR1a) in the pituitary and hypothalamus. Unlike Ipamorelin, GHRP-6 is non-selective: studies report appetite stimulation (via ghrelin mimicry), modest cortisol and prolactin increases, and effects on gastric motility. One of the earliest and most extensively studied GH secretagogues.",
    laypersonSummary:
      "GHRP-6 is one of the earliest synthetic growth-hormone-releasing peptides, studied in humans for GH secretion and appetite effects and in animal models of cardiac ischemia.",
    key_studies: [
      {
        title: "GHRP-6 dose-dependent GH release in humans",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/8350725/",
        summary:
          "Bowers et al. (Endocrine Reviews): Comprehensive characterization of GHRP-6 showing dose-dependent GH release in humans. Established GHRP-6 as the prototype GH secretagogue.",
        evidence_level: "moderate",
      },
      {
        title: "GHRP-6 synergy with GHRH for amplified GH release",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/7559636/",
        summary:
          "Combined GHRP-6 + GHRH produces synergistic GH release 3-5x greater than either peptide alone, demonstrating distinct receptor mechanisms.",
        evidence_level: "moderate",
      },
      {
        title: "GHRP-6 cardioprotective effects in ischemia models",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17222928/",
        summary:
          "Berlanga et al.: GHRP-6 demonstrates significant cardioprotective effects in myocardial ischemia-reperfusion injury models, reducing infarct size and oxidative damage independent of GH release.",
        evidence_level: "preclinical",
      },
      {
        title: "GHRP-6 stimulates gastric motility and appetite",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15265829/",
        summary:
          "Study confirms GHRP-6 activates ghrelin receptors in the GI tract, increasing gastric emptying rate and appetite. Clinically relevant for cachexia/wasting conditions.",
        evidence_level: "moderate",
      },
        {
                title: "Growth Hormone-Releasing Peptide-6 (GHRP-6) Ameliorates Post-Infarct Ventricular Remodeling and Systolic Dysfunction in a Model of Permanent Coronary Ligation.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41901314/",
                summary: "A 2026 preclinical study demonstrated that GHRP-6 attenuated myocardial tissue demise, reduced scarring, and improved left ventricle physiology in a rat model of myocardial infarction. Researchers found these effects may be mediated by upregulating pathways involved in antioxidant defenses and mitochondrial metabolic reprogramming.",
                evidence_level: "preclinical"
            },
        {
                title: "Growth hormone releasing peptide-6 (GHRP-6) ameliorates acute lung injury and its subsequent evolvement to interstitial fibrosis.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41534456/",
                summary: "A 2026 study demonstrated that GHRP-6 reduced neutrophilic alveolitis, improved alveolar-capillary permeability, and preserved lung parenchymal integrity in mice. Researchers found that the peptide limited collagen accumulation, suggesting potential pneumoprotective effects against acute lung injury and subsequent fibrosis.",
                evidence_level: "preclinical"
            },
        {
                title: "Oral salmon acylated ghrelin increases food intake in common carp (Cyprinus carpio) via ghrelin receptors, likely through sensory nerves rather than systemic absorption.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41520995/",
                summary: "A 2026 study found that orally administered salmon acylated ghrelin significantly increased food intake in common carp. The research demonstrated this orexigenic effect occurred locally via ghrelin receptors and sensory nerves rather than through systemic absorption.",
                evidence_level: "preclinical"
            },
        {
                title: "Effect of intracerebroventricular (ICV) injection of antimicrobial peptide expressed in the body-2 (LEAP-2) and its interaction with cannabinoid and ghrelin systems on food intake in broiler chickens.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41406822/",
                summary: "A 2026 study demonstrated that intracerebroventricular injection of LEAP-2 significantly decreased food intake in broiler chickens. The research found that this hypophagic effect is mediated through interactions with ghrelin and cannabinoid receptors.",
                evidence_level: "preclinical"
            },
        {
                title: "Growth hormone-releasing peptide 6 (GHRP-6) hydrogel for acute kidney injury therapy via metabolic regulation.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41327290/",
                summary: "A 2025 study found that a self-assembling GHRP-6 peptide hydrogel enhanced the survival of renal tubular epithelial cells and reprogrammed their metabolism in a mouse model of acute kidney injury. The hydrogel demonstrated these effects by activating the mTOR-P70 pathway, offering insights into cellular protection.",
                evidence_level: "preclinical"
            },
        {
                title: "Aza-Isotryptophan: Synthesis, Pictet-Spengler Chemistry, Incorporation and Conformational Analysis in Peptides, and Activity in Modulators of the Cluster of Differentiation-36 Receptor.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41151018/",
                summary: "A 2025 study demonstrated that aza-isotryptophan analogs of GHRP-6 exhibit promising CD36 receptor binding affinity and modulate inflammatory responses induced by the Toll-like receptor-2/6 heterodimer. Researchers also successfully characterized the peptide's beta-turn geometry using X-ray and NMR analyses.",
                evidence_level: "preclinical"
            },
        {
                title: "Assessing The Effectiveness of Growth Hormone Releasing Protein-6 in Improving Human Oocyte Maturation and Meiotic Progression in In Vitro Maturation Culture Media.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41090425/",
                summary: "A 2025 in vitro study found that adding 75 ng/ml of GHRP-6 to culture media significantly promoted nucleonic maturation and early polar body appearance in human oocytes. However, the peptide did not significantly improve cytoplasmic maturation or alter meiotic gene expression within 24 hours.",
                evidence_level: "preclinical"
            },
        {
                title: "The Ghrelin Analog GHRP-6, Delivered Through Aquafeeds, Modulates the Endocrine and Immune Responses of Sparus aurata Following IFA Treatment.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40906090/",
                summary: "A 2025 study demonstrated that GHRP-6 maintained stable cortisol levels and enhanced circulating immunoglobulins in fish following immune stimulation. Researchers found the peptide modulated immune gene expression in a tissue-specific manner without inducing histological alterations.",
                evidence_level: "preclinical"
            },
        {
                title: "A novel butyrylcholinesterase inhibitor induces antidepressant, pro-cognitive, and anti-anhedonic effects in Flinders Sensitive Line rats: The role of the ghrelin-dopamine cascade.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40318448/",
                summary: "A 2025 study demonstrated that a novel butyrylcholinesterase inhibitor induced antidepressant, pro-cognitive, and anti-anhedonic effects in a rat model of depression. Researchers found these effects outperformed escitalopram in cognitive and reward behaviors, primarily operating through the ghrelin-dopamine cascade.",
                evidence_level: "preclinical"
            },
        {
                title: "Danshen-Chuanxiong-Honghua ameliorates neurological function and inflammation in traumatic brain injury in rats via modulating Ghrelin/GHSR.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40074098/",
                summary: "A 2025 study in rats demonstrated that ferulic acid, the primary component of Danshen-Chuanxiong-Honghua, alleviated blood-brain barrier disruption, reduced brain edema, and suppressed proinflammatory factors following traumatic brain injury. The researchers found these effects were mediated by modulating the Ghrelin/GHSR pathway.",
                evidence_level: "preclinical"
            },
        {
                title: "GHSR gene knockout alleviates the liver pathological response in Echinococcus granulosus infection by reducing parasite survival.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40065480/",
                summary: "Downregulation of the ghrelin receptor GHSR reduced parasite survival and alleviated liver inflammation during Echinococcus granulosus infection, a 2025 preclinical study demonstrated. Researchers found that GHSR knockout in mice significantly decreased liver infection foci and shifted cytokine profiles toward an anti-inflammatory state.",
                evidence_level: "preclinical"
            },
        {
                title: "Ghrelin promotes neurologic recovery and neurogenesis in the chronic phase after experimental stroke.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40025613/",
                summary: "Ghrelin treatment improved motor functions, preserved memory consolidation, and increased the long-term survival and proliferation of neuronal cells following experimental stroke, according to a 2025 study. Researchers found these pro-neuroregenerative effects promoted functional recovery in rats.",
                evidence_level: "preclinical"
            },
        {
                title: "Subchronic safety assessment of CIGB-500 in beagle dog after repeated daily dose administration over 28 days.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40024561/",
                summary: "A 2025 study found that repeated intravenous administration of CIGB-500, or GHRP-6, was well-tolerated in beagle dogs over 28 days. Researchers reported only transient, non-adverse effects even at high doses in this dog toxicology study, establishing a no observable adverse effect level.",
                evidence_level: "preclinical"
            },
        {
                title: "Ghrelin suppresses water intake with a different physiological significance from atrial natriuretic peptide in conscious seawater-acclimated eels.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39882695/",
                summary: "A 2025 study found that ghrelin potently suppresses water intake in seawater-acclimated eels without affecting arterial pressure. Researchers demonstrated this anti-dipsogenic effect is likely mediated through a novel ghrelin receptor, distinct from the mechanisms of atrial natriuretic peptide.",
                evidence_level: "preclinical"
            },
        {
                title: "Changes in Locomotor Activity Observed During Acute Nicotine Withdrawal Can Be Attenuated by Ghrelin and GHRP-6 in Rats.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39857727/",
                summary: "A 2025 study in rats demonstrated that ghrelin and GHRP-6 significantly attenuated both the hyperactivity and hypoactivity associated with acute nicotine withdrawal. These findings indicate that both peptides can modulate locomotor behavioral changes during early nicotine cessation.",
                evidence_level: "preclinical"
            },
        {
                title: "Intranasal Delivery of a Ghrelin Mimetic Engages the Brain Ghrelin Signaling System in Mice.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39813130/",
                summary: "A 2025 study demonstrated that intranasal delivery of GHRP-6, but not ghrelin or MK-0677, successfully engaged the brain's ghrelin signaling system in mice. The peptide increased food intake, activated arcuate nucleus neurons, and elevated serum growth hormone levels.",
                evidence_level: "preclinical"
            }
    ],
    safety_notes:
      "Less selective than Ipamorelin. Transient, modest cortisol and prolactin increases reported. Appetite stimulation has been examined in cachexia and wasting research. Not FDA-approved.",
    half_life_hours: 2.5,
    is_fda_approved: false,
    route_studied: "SubQ",
    interactions: {
      synergies: ["CJC-1295", "Sermorelin", "MK-677"],
      cautions: ["Ipamorelin"],
      contraindicated: [],
      notes:
        "GHRP + GHRH co-administration has been reported to produce greater GH release than either alone in human studies. Overlaps with Ipamorelin at the same GHSR1a receptor.",
    },
    side_effects: [
      {
        name: "Increased hunger / appetite",
        incidence: "Reported in studies",
        severity: "moderate",
        note: "Consistent with ghrelin-receptor activation",
      },
      { name: "Water retention", incidence: "Frequency not established", severity: "mild" },
      {
        name: "Cortisol elevation (transient)",
        incidence: "Reported in studies",
        severity: "mild",
        note: "Transient increase reported in human studies",
      },
      {
        name: "Tingling / numbness",
        incidence: "Frequency not established",
        severity: "mild",
      },
      { name: "Headache", incidence: "Frequency not established", severity: "mild" },
    ],
  }),
  p({
    name: "Glutathione",
    aliases: [
      "GSH",
      "L-Glutathione",
      "Gamma-Glutamylcysteinylglycine",
      "Reduced Glutathione",
    ],
    category: "Antioxidant",
    category_icon: "\u{1F6E1}\uFE0F",
    primary_benefits:
      "Redox balance and Phase II conjugation (endogenous roles), lymphocyte and NK-cell function (reviews), melanin index and skin elasticity in an oral-supplementation RCT",
    mechanism:
      "Glutathione is a major intracellular antioxidant: a tripeptide (glutamate-cysteine-glycine) present in every cell. It neutralizes reactive oxygen species, regenerates vitamins C and E, participates in Phase II conjugation reactions in the liver, and is involved in immune cell function. Oral bioavailability is limited, which is why parenteral routes have also been studied.",
    laypersonSummary:
      "Glutathione is a naturally occurring antioxidant tripeptide; it has been studied for its roles in redox balance and immune function, and in a randomized trial of oral supplementation for skin pigmentation endpoints.",
    key_studies: [
      {
        title:
          "Glutathione: overview of biosynthesis, regulation, and clinical role",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23506484/",
        summary:
          "Forman et al. (Mol. Aspects Med.): Comprehensive review of glutathione's role in redox signaling, detoxification, and its depletion in disease states including Parkinson's, liver disease, and cancer.",
        evidence_level: "strong",
      },
      {
        title: "Glutathione and immune function",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11115795/",
        summary:
          "Dröge & Breitkreutz (Proc. Nutr. Soc.): Review demonstrating glutathione's critical role in lymphocyte proliferation, NK cell activity, and overall immune defense.",
        evidence_level: "moderate",
      },
      {
        title: "Glutathione for skin lightening: randomized controlled trial",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28286745/",
        summary:
          "Weschawalit et al. (Clin. Cosmet. Investig. Dermatol.): RCT showing oral glutathione supplementation significantly reduces melanin index and improves skin elasticity and wrinkles.",
        evidence_level: "moderate",
      },
      {
        title: "Glutathione depletion in Parkinson's disease substantia nigra",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/8938752/",
        summary:
          "Sian et al.: Early landmark study demonstrating reduced glutathione levels as one of the earliest biochemical changes in Parkinson's disease pathology.",
        evidence_level: "strong",
      },
        {
                title: "USP10 from Human Umbilical Cord Mesenchymal Stem Cells-Derived Extracellular Vesicles Mediates SCL7A11 Deubiquitination in Epithelial Cells: A Key to Anti-ferroptosis and Anti-fibrosis in Pulmonary Fibrosis.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42053831/",
                summary: "A 2026 study found that extracellular vesicles from human umbilical cord mesenchymal stem cells reduced pulmonary fibrosis and ferroptosis in a mouse model. Researchers demonstrated this effect was driven by USP10-mediated deubiquitination and stabilization of the SLC7A11 protein.",
                evidence_level: "preclinical"
            },
        {
                title: "Effects and mechanisms of NAD + on lung injury after cardiac arrest and cardiopulmonary resuscitation in swine.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42053361/",
                summary: "A 2026 study demonstrated that NAD+ administration significantly attenuated lung injury following cardiac arrest and resuscitation in a swine model. Researchers found this effect was likely mediated by suppressing ferroptosis through the modulation of the YAP/ACSL4 signaling pathway.",
                evidence_level: "preclinical"
            },
        {
                title: "Combating Cadmium-Induced Neurotoxicity, Oxidative Stress, and Inflammatory Pathways Using DOPA-31, a Dioxopiperidinamide Derivative in an In Vivo Zebrafish Model.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42053112/",
                summary: "A 2026 preclinical study demonstrated that DOPA-31 mitigated cadmium-induced neurotoxicity in a zebrafish model by reducing oxidative stress and downregulating pro-inflammatory markers. Researchers found the derivative improved motor and cognitive functions while upregulating neuroprotective factors and reducing neuronal damage.",
                evidence_level: "preclinical"
            },
        {
                title: "Vaccarin Improves Myocardial Ischemia-Reperfusion Injury by Attenuating Oxidative Stress and Ferroptosis Through Reducing NOX4-Modulated JAK2/STAT3 Pathway Activation.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42053107/",
                summary: "In a 2026 preclinical study, researchers demonstrated that vaccarin alleviated myocardial ischemia-reperfusion injury in mouse and cellular models. The findings indicated that vaccarin suppressed oxidative stress and ferroptosis by inhibiting the NOX4-driven JAK2/STAT3 signaling pathway.",
                evidence_level: "preclinical"
            },
        {
                title: "ZFP36L1 Enhances Microglial Ferroptosis in Ischemic Stroke by Reducing FTO-Mediated N6-Methyladenosine Demethylation of ACSL1 mRNA.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42053094/",
                summary: "A 2026 study demonstrated that ZFP36L1 promotes microglial ferroptosis and neuroinflammation during ischemic stroke by reducing FTO mRNA stability and increasing ACSL1 expression. Researchers found that silencing ZFP36L1 successfully alleviated cerebral ischemic injury in mouse models.",
                evidence_level: "preclinical"
            },
        {
                title: "Ferroptosis in Breast Cancer: Molecular Insights and Therapeutic Strategies.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42052841/",
                summary: "Targeting ferroptosis exploits metabolic vulnerabilities in breast cancer subtypes and influences the tumor microenvironment, a 2026 review found. The research demonstrated that this iron-dependent cell death mechanism provides a potential strategy to address drug-resistant cancer stem cells.",
                evidence_level: "emerging"
            },
        {
                title: "Independent Exposure to the Fungicide Difenoconazole or the Herbicide Tebuthiuron Disrupts Survival, Behavior, and Alters Midgut-Associated Protein Detection in Aedes aegypti Larvae.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42052782/",
                summary: "A 2026 study found that exposure to the agrochemicals difenoconazole and tebuthiuron reduced survival, altered behavior, and decreased antioxidant enzyme activity in Aedes aegypti larvae. The research demonstrated significant disruptions in midgut protein expression related to tissue organization and stem cell maintenance.",
                evidence_level: "preclinical"
            },
        {
                title: "Investigation on the regulatory effects of kaempferol on immune, inflammatory, and antioxidant functions in late laying hens.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42052351/",
                summary: "A 2026 study demonstrated that kaempferol supplementation reduced hepatic lipid deposition, enhanced antioxidant capacity, and modulated the immune-inflammatory balance in late laying hens. Researchers found it significantly lowered triglycerides and inflammatory cytokines while increasing antioxidant enzyme activity.",
                evidence_level: "preclinical"
            },
        {
                title: "Multilayered analysis of cisplatin resistance mechanisms in bladder cancer: from the cell membrane to organelles.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42052167/",
                summary: "Cisplatin resistance in bladder cancer operates as a multilayered cellular adaptation involving coordinated changes across the cell membrane, cytoplasm, nucleus, and organelles, a 2026 review demonstrated. The study mapped these integrated networks to highlight mechanisms driving treatment failure and disease recurrence.",
                evidence_level: "emerging"
            },
        {
                title: "Hyperbaric oxygen therapy and N-acetylcysteine: a redox-dependent interaction.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42051726/",
                summary: "A 2026 review found that the combined effects of hyperbaric oxygen therapy and N-acetylcysteine are highly context-dependent. The research demonstrated that NAC enhances HBOT during severe oxidative stress but may attenuate its benefits when reactive oxygen species are required for adaptive signaling.",
                evidence_level: "emerging"
            },
        {
                title: "Transcriptomic profiling and targeted validation reveal molecular mechanisms of oxygen therapy in high-altitude cerebral injury.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42051552/",
                summary: "A 2026 study in mice demonstrated that hyperbaric and normobaric oxygen therapies ameliorated high-altitude cerebral injury. The researchers found that these treatments reduced oxidative stress and neuroinflammation by modulating the PI3K-AKT/Nrf2 and TLR4-NF-κB signaling pathways.",
                evidence_level: "preclinical"
            },
        {
                title: "Integrative transcriptome and microbiome analysis reveals ferroptosis-driven duodenal damage caused by Ochratoxin A in mice.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42051509/",
                summary: "A 2026 study in mice demonstrated that Ochratoxin A induces duodenal damage through ferroptosis and gut microbiota dysbiosis. Researchers found that the mycotoxin disrupts redox balance and iron homeostasis, highlighting a microbiota-duodenum axis in intestinal injury.",
                evidence_level: "preclinical"
            },
        {
                title: "Network Analysis Identifies Microsomal Glutathione S-Transferase as a Potential Regulator of Oxidative Stress and Proteasome Dysfunction in Human Osteoarthritic Menisci.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42051442/",
                summary: "Microsomal glutathione S-transferase (MGST1) regulates oxidative stress and proteasome activity in human osteoarthritic menisci, a 2026 study found. In vitro assays demonstrated that inflammatory stress upregulates MGST1, highlighting its role in joint tissue adaptation.",
                evidence_level: "preclinical"
            },
        {
                title: "Preclinical evaluation of puerarin for the treatment of non-alcoholic fatty liver disease: a systematic review and meta-analysis.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42051254/",
                summary: "Puerarin significantly reduced triglycerides, total cholesterol, and LDL cholesterol while improving antioxidant and inflammatory markers in animal models of non-alcoholic fatty liver disease, a 2026 meta-analysis found. The research demonstrated its ability to regulate lipid metabolism and inhibit inflammatory factors.",
                evidence_level: "preclinical"
            },
        {
                title: "Kinetically Gated and Self-Limiting Crystallization Enables Allosteric Phototheranostic Nanocrystals.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42051220/",
                summary: "A 2026 study demonstrated that kinetically gated phototheranostic nanocrystals exhibited strong near-infrared absorption, reactive oxygen species generation, and catalase-like activity. Furthermore, researchers found that these nanocrystals enabled deep-tissue penetration and potent in vivo tumor ablation under irradiation.",
                evidence_level: "preclinical"
            },
        {
                title: "Single-nucleus RNA sequencing reveals ferroptosis as a potential contributor to the pathogenesis of focal cortical dysplasia.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42051157/",
                summary: "A 2026 study demonstrated that ferroptosis and oxidative stress pathways are significantly altered in the brain tissue of patients with focal cortical dysplasia. Transcriptomic and biochemical analyses revealed that these mechanisms potentially contribute to neuronal dysfunction in this drug-resistant epilepsy.",
                evidence_level: "emerging"
            }
    ],
    safety_notes:
      "Endogenous compound with a long history of clinical study. IV and SubQ routes were generally well-tolerated in published studies. Rare allergic reactions reported. May reduce the effectiveness of some chemotherapy drugs, a recognized interaction concern in cancer treatment.",
    half_life_hours: 2,
    route_studied: "SubQ",
    interactions: {
      synergies: ["NAD+", "GHK-Cu", "Thymosin Alpha-1"],
      cautions: [],
      contraindicated: [],
      notes:
        "Glutathione regenerates other antioxidants (vitamins C and E). Combination data with other peptides are limited.",
    },
    outcomes_timeline: {},
    side_effects: [
      {
        name: "Administration-site redness",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Mild bloating (oral)",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Allergic reaction",
        incidence: "Rare reports",
        severity: "rare",
      },
    ],
  }),

  // ─── METABOLIC / WEIGHT LOSS ───,
  p({
    name: "Hexarelin",
    aliases: ["Examorelin", "HEX"],
    category: "GHRP",
    category_icon: "\u{26A1}",
    primary_benefits:
      "Acute GH release in healthy-subject studies, cardiac CD36 binding (animal ischemia models), GH-response attenuation with continuous administration",
    mechanism:
      "Synthetic hexapeptide GHRP acting on GHSR1a. In healthy-subject studies it stimulated GH release and also raised cortisol, prolactin, and ACTH. It binds cardiac CD36 receptors and has been studied in animal ischemia models for effects independent of GH release. GH response attenuation with continuous administration has been reported.",
    laypersonSummary:
      "Hexarelin is a synthetic growth-hormone-releasing peptide studied in healthy volunteers for acute GH release and in animal and small human studies for effects on heart tissue.",
    key_studies: [
      {
        title: "Hexarelin produces the strongest GH release among GHRPs",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9150611/",
        summary:
          "Ghigo et al. (J. Clin. Endocrinol. Metab.): Direct comparison study showing Hexarelin produces the highest peak GH response of any GHRP, significantly exceeding GHRP-6 and GHRP-2 in healthy subjects.",
        evidence_level: "moderate",
      },
      {
        title: "Hexarelin cardioprotective effects via CD36 receptor",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15240607/",
        summary:
          "Bhatt et al.: Hexarelin binds cardiac CD36 scavenger receptors, providing direct cardioprotection independent of GH release. Reduces infarct size and improves cardiac function post-ischemia.",
        evidence_level: "preclinical",
      },
      {
        title: "Hexarelin improves cardiac function in GH-deficient adults",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/10404019/",
        summary:
          "Bisi et al.: Chronic Hexarelin administration improves left ventricular ejection fraction and cardiac performance in GH-deficient adult patients.",
        evidence_level: "moderate",
      },
      {
        title: "Hexarelin tachyphylaxis with chronic administration",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9284088/",
        summary:
          "Arvat et al.: Long-term Hexarelin use shows progressive GH response attenuation with continuous administration, consistent with receptor desensitization.",
        evidence_level: "moderate",
      },
    ],
    safety_notes:
      "Least selective of the common GHRPs; cortisol and prolactin elevation reported in studies. Tachyphylaxis (desensitization) has been reported with continuous administration in published studies. Cardiac effects are an active research area. Not FDA-approved.",
    half_life_hours: 0.9,
    is_fda_approved: false,
    route_studied: "SubQ",
    interactions: {
      synergies: ["CJC-1295", "Sermorelin"],
      cautions: ["GHRP-6", "GHRP-2", "Ipamorelin"],
      contraindicated: [],
      notes:
        "GHRPs share the GHSR1a receptor, so combining them is redundant; GHRH analogs act on a separate receptor.",
    },
    outcomes_timeline: {},
    side_effects: [
      {
        name: "Cortisol elevation",
        incidence: "Reported in studies",
        severity: "moderate",
        note: "Larger than with other GHRPs in comparison studies",
      },
      {
        name: "Prolactin elevation",
        incidence: "Reported in studies",
        severity: "moderate",
      },
      {
        name: "Flushing / warmth",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Appetite increase",
        incidence: "Frequency not established",
        severity: "mild",
      },
      { name: "Water retention", incidence: "Frequency not established", severity: "mild" },
      { name: "Headache", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  // ─── ANTIMICROBIAL ───,
  p({
    name: "IGF-1 LR3",
    aliases: ["Insulin-like Growth Factor 1 Long R3"],
    category: "Growth Factor",
    category_icon: "\u{1F489}",
    primary_benefits: "IGF-1 receptor signaling with reduced binding-protein affinity, muscle growth endpoints (animal models), satellite-cell activation and muscle regeneration (preclinical reviews)",
    mechanism:
      "Modified IGF-1 analog with reduced affinity for IGF-binding proteins and an extended half-life. In preclinical studies IGF-1 signaling activates muscle satellite cells and myoblast proliferation and promotes protein synthesis.",
    laypersonSummary:
      "IGF-1 LR3 is a long-acting analog of Insulin-like Growth Factor 1 studied in cell and animal models for muscle growth and regeneration; it has no approved human use.",
    key_studies: [
      {
        title: "IGF-1 LR3 promotes muscle growth in animal models",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/10218986/",
        summary:
          "IGF-1 LR3 demonstrates significantly enhanced potency over native IGF-1 due to reduced binding protein affinity and extended half-life, promoting dose-dependent muscle growth.",
        evidence_level: "preclinical",
      },
      {
        title: "IGF-1 signaling: muscle repair and regeneration review",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22234739/",
        summary:
          "Philippou & Barton (Growth Hormone & IGF Res.): Comprehensive review of IGF-1's role in muscle satellite cell activation, myoblast proliferation, and skeletal muscle regeneration.",
        evidence_level: "preclinical",
      },
      {
        title: "IGF-1 and cancer risk — comprehensive epidemiological review",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/27016193/",
        summary:
          "Bowers et al.: Meta-analysis of epidemiological studies examining positive correlation between circulating IGF-1 levels and prostate, breast, and colorectal cancer risk.",
        evidence_level: "moderate-strong",
      },
        {
                title: "Revolutionary decellularized Alstroemeria stem-based nerve conduit integrated with GelMA and controlled IGF-1 LR3 release for enhanced rat sciatic nerve regeneration.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41015370/",
                summary: "A 2025 study found that a novel plant-based nerve conduit featuring controlled release of IGF-1 LR3 significantly improved axonal regeneration in a rat model of sciatic nerve injury. The conduit demonstrated performance comparable to autologous nerve grafts without inducing systemic toxicity.",
                evidence_level: "preclinical"
            },
        {
                title: "IGF-1 LR3 does not promote growth in late-gestation growth-restricted fetal sheep.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39679943/",
                summary: "A 2025 study found that a one-week infusion of IGF-1 LR3 did not improve growth or insulin secretion in growth-restricted fetal sheep. However, the treatment demonstrated a reduction in circulating amino acids, suggesting increased amino acid utilization.",
                evidence_level: "preclinical"
            },
        {
                title: "Intranasal long R3 insulin-like growth factor-1 treatment promotes amyloid plaque remodeling in cerebral cortex but fails to preserve cognitive function in male 5XFAD mice.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39610283/",
                summary: "A 2025 study found that intranasal LR3-IGF-1 promoted amyloid plaque remodeling and reduced low molecular weight Aβ oligomers in the cerebral cortex of an Alzheimer's mouse model. However, the treatment failed to preserve cognitive function or memory in the mice.",
                evidence_level: "preclinical"
            },
        {
                title: "Chromatographic-mass spectrometric analysis of peptidic analytes (2-10 kDa) in doping control urine samples.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38197510/",
                summary: "A 2024 study demonstrated a simplified, validated chromatographic-mass spectrometric method for efficiently extracting and detecting prohibited peptides, including insulins and GHRHs, in doping control urine samples. The approach successfully met World Anti-Doping Agency requirements and was verified using authentic post-administration samples.",
                evidence_level: "preclinical"
            },
        {
                title: "Insulin-Like Growth Factor1 Preserves Gastric Pacemaker Cells and Motor Function in Aging via ERK1/2 Activation.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37301443/",
                summary: "A 2023 study found that an IGF1 analog mitigated age-related loss of gastric pacemaker cells in mice by activating ERK1/2 signaling. This preservation demonstrated improved gastric compliance, increased food intake, and prevented impaired body weight gain in the animal model.",
                evidence_level: "preclinical"
            },
        {
                title: "Recombinant expression of IGF-1 and LR3 IGF-1 fused with xylanase in Pichia pastoris.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37261455/",
                summary: "In a 2023 study, researchers demonstrated that high levels of bioactive human IGF-1 and its analog LR3 IGF-1 can be successfully produced in a Pichia pastoris expression system by fusing them with xylanase. The purified recombinant proteins exhibited excellent cell proliferation bioactivity comparable to standard IGF-1.",
                evidence_level: "preclinical"
            },
        {
                title: "Attenuated glucose-stimulated insulin secretion during an acute IGF-1 LR3 infusion into fetal sheep does not persist in isolated islets.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37114757/",
                summary: "A 2023 study demonstrated that acute IGF-1 LR3 infusion in fetal sheep suppressed in vivo glucose-stimulated insulin secretion. However, researchers found that isolated islets retained the ability to recover insulin secretion in vitro, indicating beta-cells can overcome acute suppression.",
                evidence_level: "preclinical"
            },
        {
                title: "N-Linked Glycosylation in Chinese Hamster Ovary Cells Is Critical for Insulin-like Growth Factor 1 Signaling.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36499281/",
                summary: "A 2022 in-vitro study demonstrated that proper N-linked glycosylation is critical for insulin-like growth factor 1 (IGF-1) signaling in Chinese hamster ovary cells. Researchers found that defective glycosylation significantly reduced IGF-1 receptor levels and impaired IGF-1-dependent ERK signaling pathways.",
                evidence_level: "preclinical"
            },
        {
                title: "Reduced glucose-stimulated insulin secretion following a 1-wk IGF-1 infusion in late gestation fetal sheep is due to an intrinsic islet defect.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33938236/",
                summary: "A 2021 study demonstrated that a one-week infusion of IGF-1 LR3 in fetal sheep lowered plasma insulin and glucose concentrations and reduced glucose-stimulated insulin secretion. Researchers found this impaired insulin release persisted in isolated islets, indicating an intrinsic islet defect.",
                evidence_level: "preclinical"
            },
        {
                title: "Detection of LongR3 -IGF-I, Des(1-3)-IGF-I, and R3 -IGF-I using immunopurification and high resolution mass spectrometry for antidoping purposes.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33587816/",
                summary: "In a 2021 preclinical study, researchers demonstrated that a novel mass spectrometry method successfully detected IGF-I analogs like Des(1-3)-IGF-I for up to 24 hours in rats. The study also identified new degradation products of LongR3-IGF-I in both rat models and human blood in vitro.",
                evidence_level: "preclinical"
            },
        {
                title: "IGF-1 infusion to fetal sheep increases organ growth but not by stimulating nutrient transfer to the fetus.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33427051/",
                summary: "A 2021 study in fetal sheep demonstrated that LR3 IGF-1 infusion increased specific organ growth and skeletal muscle myoblast proliferation. Researchers found that the peptide efficiently utilized available nutrients to support organ-specific growth rather than stimulating placental nutrient transfer.",
                evidence_level: "preclinical"
            },
        {
                title: "Coronary vascular growth matches IGF-1-stimulated cardiac growth in fetal sheep.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32573852/",
                summary: "IGF-1 administration stimulates myocardial growth accompanied by appropriate expansion and function of the coronary vasculature, a 2020 study in fetal sheep demonstrated. Researchers found that coronary conductance and hypoxia-mediated vasodilation were preserved alongside the increased heart mass.",
                evidence_level: "preclinical"
            },
        {
                title: "Inhibition of activin-like kinase 4/5 attenuates cancer cachexia associated muscle wasting.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31285507/",
                summary: "The ALK4/5 receptor blocker GW788388 prevented cancer-associated muscle wasting and downregulated Atrogin-1 expression in mice, according to a 2019 study. Additionally, researchers demonstrated that while LR3 IGF-I limited muscle mass loss, it accelerated tumor growth.",
                evidence_level: "preclinical"
            },
        {
                title: "IGF-1 has plaque-stabilizing effects in atherosclerosis by altering vascular smooth muscle cell phenotype.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21281823/",
                summary: "A 2011 study demonstrated that the IGF-1 analog Long R3 IGF-1 reduced stenosis, increased vascular smooth muscle cell content, and decreased intraplaque hemorrhage in atherosclerotic mice. These findings suggest IGF-1 alters cell phenotypes to promote plaque stability in preclinical models.",
                evidence_level: "preclinical"
            },
        {
                title: "Detection of His-tagged Long-R³-IGF-I in a black market product.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20675162/",
                summary: "A 2010 case report identified His-tagged Long-R³-IGF-I, a protein typically used for biochemical studies, within a confiscated black market injection vial. The analysis demonstrated that the protein retained its His-tag, highlighting the unknown physiological effects of such illicitly manufactured peptides.",
                evidence_level: "anecdotal"
            },
        {
                title: "Novel insulin-like growth factor-methotrexate covalent conjugate inhibits tumor growth in vivo at lower dosage than methotrexate alone.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19446281/",
                summary: "A 2009 preclinical study demonstrated that a novel insulin-like growth factor-methotrexate conjugate inhibited prostate and breast tumor growth in mouse models more effectively than methotrexate alone at lower dosages. The conjugate also exhibited higher binding affinity to cancer cells in vitro.",
                evidence_level: "preclinical"
            },
        {
                title: "NKX3.1 activates expression of insulin-like growth factor binding protein-3 to mediate insulin-like growth factor-I signaling and cell proliferation.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19258508/",
                summary: "A 2009 study demonstrated that NKX3.1 activates insulin-like growth factor binding protein-3 expression to suppress prostate cancer cell proliferation. Researchers found this activation attenuates IGF-I signaling in both cell cultures and mouse models.",
                evidence_level: "preclinical"
            }
    ],
    safety_notes:
      "Hypoglycemia risk based on IGF-1 pharmacology. Epidemiological studies associate higher circulating IGF-1 with some cancers. No human clinical trials. Research-only.",
    half_life_hours: 20,
    route_studied: "SubQ",
    interactions: {
      synergies: ["Follistatin-344", "CJC-1295"],
      cautions: ["Tesamorelin"],
      contraindicated: [],
      notes:
        "Combination with GH secretagogues raises concern for additive IGF-1 elevation.",
    },
    side_effects: [
      {
        name: "Hypoglycemia",
        incidence: "Mechanism-based concern",
        severity: "moderate",
        note: "IGF-1 has insulin-like glucose-lowering activity",
      },
      { name: "Joint pain", incidence: "Frequency not established", severity: "mild" },
      { name: "Headache", incidence: "Frequency not established", severity: "mild" },
      { name: "Fluid retention", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  // ─── LONGEVITY / NAD+ ───,
  p({
    name: "Ipamorelin",
    aliases: [],
    category: "GHRP",
    category_icon: "\u{26A1}",
    primary_benefits:
      "Selective GH release without ACTH or cortisol increase (swine), GH pharmacokinetics in healthy volunteers, longitudinal bone growth (rat models), postoperative ileus (preclinical)",
    mechanism:
      "Selective GH secretagogue that acts as a ghrelin-receptor (GHSR1a) agonist. In its original characterization in swine it released GH without raising ACTH, cortisol, prolactin, FSH, LH, or TSH (PMID 9849822).",
    laypersonSummary:
      "Ipamorelin is a selective growth-hormone-releasing peptide studied in animal models and a healthy-volunteer pharmacokinetic study for GH release without the cortisol and prolactin increases seen with older GHRPs.",
    key_studies: [
      {
        title: "Ipamorelin selective GH release — original characterization",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9849822/",
        summary:
          "Raun et al. (Eur. J. Endocrinol.): First characterization showing Ipamorelin releases GH potently and selectively without raising ACTH, cortisol, prolactin, FSH, LH, or TSH in swine.",
        evidence_level: "moderate",
      },
      {
        title: "Ipamorelin PK/PD modeling in healthy human volunteers",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16796559/",
        summary:
          "Dose-escalation study in healthy humans demonstrates Ipamorelin induces single-episode GH release with peak at ~0.67 hours and terminal half-life of 2 hours.",
        evidence_level: "moderate",
      },
      {
        title: "Ipamorelin and longitudinal bone growth in rats",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/10444229/",
        summary:
          "Svensson et al. show Ipamorelin induces dose-dependent longitudinal bone growth and counters glucocorticoid-induced decreases in bone formation and muscle strength.",
        evidence_level: "preclinical",
      },
      {
        title: "Ipamorelin accelerates postoperative GI recovery",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17457097/",
        summary:
          "Preclinical evidence demonstrates Ipamorelin alleviates delayed gastric emptying and post-surgical ileus, suggesting applications beyond hormone optimization.",
        evidence_level: "preclinical",
      },
        {
                title: "Therapeutic peptides in gerontology: mechanisms and applications for healthy aging.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42021992/",
                summary: "A 2026 review found that nine therapeutic peptides, including epitalon and BPC-157, target diverse aging hallmarks such as metabolic dysfunction and tissue repair. While FDA-approved agents demonstrated robust safety, investigational peptides require further clinical validation to establish long-term efficacy.",
                evidence_level: "emerging"
            },
        {
                title: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41966639/",
                summary: "A 2026 review found that many unapproved peptides demonstrate favorable tissue repair and metabolic outcomes in animal models, though rigorous human safety data remain scarce. The study investigated the pharmacological mechanisms and regulatory status of various sports medicine peptides.",
                evidence_level: "emerging"
            },
        {
                title: "A new era of doping? Use of peptide and peptide-analog drugs in recreational and professional sport and bodybuilding: a critical review.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41880199/",
                summary: "A 2026 review found that performance-enhancing peptide use in sports and bodybuilding is increasing despite limited clinical evidence. The researchers demonstrated that these experimental substances carry poorly defined long-term risks, including potential cardiovascular strain and insulin resistance.",
                evidence_level: "emerging"
            },
        {
                title: "Therapeutic Peptides in Orthopaedics: Applications, Challenges, and Future Directions.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41490200/",
                summary: "Therapeutic peptides, including BPC-157 and TB-500, were found to modulate molecular signaling networks influencing tissue regeneration and inflammation resolution in a 2026 review. The research highlighted their mechanistic potential for orthopaedic applications, noting a current lack of clinical trials.",
                evidence_level: "emerging"
            },
        {
                title: "Injectable Peptide Therapy: A Primer for Orthopaedic and Sports Medicine Physicians.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41476424/",
                summary: "Preclinical models demonstrate that peptides like BPC-157 and TB-500 show potential for tissue repair, but a 2026 review found a significant lack of human clinical data supporting their orthopaedic use.",
                evidence_level: "emerging"
            },
        {
                title: "The growth hormone secretagogue receptor 1a agonists, anamorelin and ipamorelin, inhibit cisplatin-induced weight loss in ferrets: Anamorelin also exhibits anti-emetic effects via a central mechanism.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39043357/",
                summary: "A 2024 preclinical study found that the ghrelin mimetics anamorelin and ipamorelin inhibited cisplatin-induced weight loss in ferrets by approximately 24%. Additionally, centrally administered anamorelin demonstrated anti-emetic effects and improved food and water consumption during the acute phase.",
                evidence_level: "preclinical"
            },
        {
                title: "The influence of ghrelin agonist ipamorelin acetate on the hypothalamic-pituitary-testicular axis in a cichlid fish, Oreochromis mossambicus.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38996787/",
                summary: "A 2024 preclinical study demonstrated that the ghrelin agonist ipamorelin acetate significantly enhanced germ cell development and increased food intake in tilapia. Researchers found these effects were accompanied by elevated luteinizing hormone, 11-ketotestosterone, and androgen receptor expression.",
                evidence_level: "preclinical"
            },
        {
                title: "Attenuation of Visceral and Somatic Nociception by Ghrelin Mimetics.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32801950/",
                summary: "A 2020 study found that the ghrelin mimetics ipamorelin and HM01 significantly attenuated non-inflammatory visceral hypersensitivity and somatic mechanical allodynia in rat models. The research demonstrated that peripherally restricted ghrelin receptor activation modulates pain responses in the absence of active inflammation.",
                evidence_level: "preclinical"
            },
        {
                title: "Beyond the androgen receptor: the role of growth hormone secretagogues in the modern management of body composition in hypogonadal males.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32257855/",
                summary: "Growth hormone secretagogues, including sermorelin, ibutamoren, and ipamorelin, demonstrated the ability to stimulate GH and IGF-1, potentially improving body composition in hypogonadal males. A 2020 review investigated these peptides, noting that while they may ameliorate fat gain, limited clinical data currently restricts their application.",
                evidence_level: "emerging"
            },
        {
                title: "Peptidomimetic growth hormone secretagogue derivatives for positron emission tomography imaging of the ghrelin receptor.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30282322/",
                summary: "A 2018 in vitro study found that a radiolabeled derivative of the peptidomimetic G-7039 exhibited high binding affinity and efficacy for the ghrelin receptor. Researchers successfully synthesized this compound, demonstrating its potential as a positron emission tomography imaging probe.",
                evidence_level: "preclinical"
            },
        {
                title: "A stable meta-carborane enables the generation of boron-rich peptide agonists targeting the ghrelin receptor.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30168238/",
                summary: "A 2018 study demonstrated that modifying ghrelin receptor ligands, including GHRP-6 and Ipamorelin, with a stable meta-carborane building block generated highly potent, boron-rich peptide agonists. These conjugates successfully activated the ghrelin receptor, indicating their potential utility as targeted delivery agents for boron neutron capture therapy research.",
                evidence_level: "preclinical"
            },
        {
                title: "Glycine-modified growth hormone secretagogues identified in seized doping material.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30136411/",
                summary: "A 2019 study found that seized doping materials contained analogs of growth hormone secretagogues, including GHRP-2, GHRP-6, Ipamorelin, and modified GRF 1-29, modified with an extra N-terminal glycine amino acid. Researchers recommended updating analytical methods to target these specific peptide modifications.",
                evidence_level: "emerging"
            },
        {
                title: "Analysis of new growth promoting black market products.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29864719/",
                summary: "A 2018 study identified a modified 192-amino acid human growth hormone and three novel peptide analogues—Gly-GHRP-6, Gly-GHRP-2, and Gly-Ipamorelin—in black market products. In-vitro experiments provided preliminary data on the potential metabolism of these extended peptides.",
                evidence_level: "preclinical"
            },
        {
                title: "Doping control container for urine stabilization: a pilot study.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/27497113/",
                summary: "A 2017 study demonstrated that a novel spray-coated chemical stabilization mixture effectively prevented the enzymatic breakdown of small peptides, including GHRPs and ipamorelin, in urine samples. The findings support using these stabilized containers to prevent microbial and proteolytic degradation during doping control procedures.",
                evidence_level: "preclinical"
            },
        {
                title: "Structure-activity relationship for peptídic growth hormone secretagogues.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26811125/",
                summary: "A 2017 study demonstrated that specific amino acid modifications to the core structure of growth hormone-releasing peptides dictate their binding affinity to the GHSR1a receptor. Furthermore, researchers found that intact peptides and active metabolites remain detectable in urine following nasal administration.",
                evidence_level: "preclinical"
            },
        {
                title: "Simplifying and expanding the screening for peptides <2 kDa by direct urine injection, liquid chromatography, and ion mobility mass spectrometry.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26578461/",
                summary: "A 2016 study demonstrated a highly sensitive method for detecting performance-enhancing peptides under 2 kDa, including GHRPs and TB-500, using direct urine injection and mass spectrometry. The assay successfully identified these compounds at concentrations between 50 and 500 pg/mL in human elimination samples.",
                evidence_level: "moderate"
            }
    ],
    safety_notes:
      "Human data limited to small pharmacokinetic and early clinical studies. Transient headache and flushing have been reported. Not FDA-approved.",
    half_life_hours: 2,
    route_studied: "SubQ",
    interactions: {
      synergies: ["CJC-1295", "Sermorelin", "DSIP"],
      cautions: [],
      contraindicated: [],
      notes:
        "GHRH analogs such as CJC-1295 act on a separate receptor from GHRPs; combination data are limited.",
    },
    outcomes_timeline: {
      week_1:
        "Animal pharmacology studies: selective GH release without ACTH or cortisol elevation (PMID 9849822)",
    },
    side_effects: [
      {
        name: "Temporary hunger",
        incidence: "Frequency not established",
        severity: "mild",
      },
      { name: "Headache", incidence: "Frequency not established", severity: "mild" },
      { name: "Water retention", incidence: "Frequency not established", severity: "mild" },
      {
        name: "Flushing / warmth",
        incidence: "Frequency not established",
        severity: "mild",
      },
    ],
  }),

  // ─── GH SECRETAGOGUE (ORAL) ───,
  p({
    name: "Kisspeptin-10",
    aliases: ["KP-10", "Metastin 45-54", "KISS1"],
    category: "Reproductive Peptide",
    category_icon: "\u{2764}\uFE0F",
    primary_benefits:
      "LH and testosterone secretion in small human studies, LH pulsatility in hypogonadal men (small trial), oocyte-maturation trigger in IVF research (kisspeptin-54), HPG axis signaling",
    mechanism:
      "Endogenous neuropeptide that acts upstream in the hypothalamic-pituitary-gonadal (HPG) axis. Kisspeptin-10 binds the GPR54 (KISS1R) receptor on GnRH neurons, triggering GnRH release, which stimulates LH and FSH secretion from the pituitary. Because it acts above GnRH, downstream feedback loops remain intact.",
    laypersonSummary:
      "Kisspeptin-10 is a naturally occurring reproductive neuropeptide studied in small human trials for its effects on LH and testosterone secretion in men and LH secretion in women.",
    key_studies: [
      {
        title:
          "Kisspeptin potently stimulates LH and testosterone in healthy men",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21795442/",
        summary:
          "Dhillo et al. (J. Clin. Endocrinol. Metab.): IV Kisspeptin-10 potently stimulates LH pulse frequency and testosterone secretion in healthy men, establishing its role as a reproductive axis activator.",
        evidence_level: "moderate",
      },
      {
        title: "Kisspeptin restores LH pulsatility in hypogonadal men",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/24828487/",
        summary:
          "George et al.: Kisspeptin-10 infusion restores LH pulsatility and increases testosterone in men with type 2 diabetes-associated hypogonadism, demonstrating therapeutic potential.",
        evidence_level: "moderate",
      },
      {
        title: "Kisspeptin as alternative oocyte maturation trigger in IVF",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25078684/",
        summary:
          "Abbara et al. (J. Clin. Invest.): Kisspeptin-54 triggers oocyte maturation in women undergoing IVF with significantly lower risk of ovarian hyperstimulation syndrome (OHSS) vs. hCG trigger.",
        evidence_level: "strong",
      },
      {
        title: "Kisspeptin stimulates reproductive hormones in women",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19820030/",
        summary:
          "Jayasena et al.: Kisspeptin-10 administration increases LH secretion in women, with response magnitude dependent on menstrual cycle phase (strongest in preovulatory phase).",
        evidence_level: "moderate",
      },
      {
        title: "Kisspeptin tachyphylaxis with continuous administration",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/24456164/",
        summary:
          "Ramaswamy et al.: Continuous Kisspeptin-10 infusion leads to desensitization of the HPG axis within 24-48 hours, showing the axis responds to pulsatile rather than continuous signaling.",
        evidence_level: "preclinical",
      },
        {
                title: "Knockout of PI4-Kinase A in GnRH Neurons Causes their Prepubertal Death.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42051312/",
                summary: "In a 2026 study on mice, researchers demonstrated that phosphatidylinositol 4-kinase alpha is essential for the postnatal survival of GnRH neurons, though not for their embryonic development. The study found that knocking out this enzyme caused prepubertal neuron death, resulting in infertility in both sexes.",
                evidence_level: "preclinical"
            },
        {
                title: "Diagnostic Criteria and Genetic Basis of Polycystic Ovary Syndrome: A Narrative Review.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42042922/",
                summary: "Polymorphisms in genes regulating insulin metabolism, steroidogenesis, and the hypothalamic-pituitary-ovarian axis were found to drive the clinical variability of Polycystic Ovary Syndrome. A 2026 review investigated these genetic markers to highlight their role in the disorder's pathophysiology.",
                evidence_level: "emerging"
            },
        {
                title: "Spatial transcriptional mapping reveals the molecular characteristics of juxtaglomerular cell tumors.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42038360/",
                summary: "High KISS1 expression and the PPARG, NOTCH, and PDGFB pathways were identified as key regulators of juxtaglomerular cell tumor development and renin secretion in a 2026 spatial transcriptomic analysis. The study demonstrated that REN expression positively correlates with KISS1 across multiple tumor types.",
                evidence_level: "emerging"
            },
        {
                title: "Photoperiodic modulation of puberty through melatonin-kisspeptin-GnRH signalling in female Wistar rats.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42018125/",
                summary: "A 2026 study in female Wistar rats demonstrated that photoperiod-dependent melatonin signaling and estradiol synergistically modulate hypothalamic gene networks crucial for pubertal regulation. Researchers found that long-day photoperiods advanced puberty, while melatonin suppressed Kiss1 and GnRH expression in vitro.",
                evidence_level: "preclinical"
            },
        {
                title: "Expressions of Kisspeptin System and Ki-67 in the Reproductive Tissues of Cyclic Bitches.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41983751/",
                summary: "A 2026 study in female dogs demonstrated that kisspeptin (KISS1) and Ki-67 expression significantly increased in the endometrium during estrus. These findings suggest that local kisspeptin signaling plays a coordinated role in endometrial proliferation and tissue remodeling during the reproductive cycle.",
                evidence_level: "preclinical"
            },
        {
                title: "Kisspeptin-10 attenuates pulmonary arterial hypertension via restoration of mitochondrial function in pulmonary artery smooth muscle cells.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41955717/",
                summary: "Kisspeptin-10 was found to attenuate pulmonary arterial hypertension and vascular remodeling in a mouse model by restoring mitochondrial homeostasis, according to a 2026 study. The peptide also demonstrated an ability to inhibit hypoxia-induced cell proliferation in vitro.",
                evidence_level: "preclinical"
            },
        {
                title: "Relationship between kisspeptin-10, neurokinin B and dynorphin A in the course of normal and delayed puberty in ewes.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41953732/",
                summary: "A 2026 study in ewes demonstrated that the initiation of ovarian activity is associated with concurrent increases in plasma kisspeptin-10 and neurokinin B concentrations, alongside reduced dynorphin A levels. These findings suggest these neuropeptides regulate the timing of reproductive onset.",
                evidence_level: "preclinical"
            },
        {
                title: "Kisspeptin-10 Promotes Hormone Secretion, Ovarian Follicles Development and Fecundity via PI3K/AKT/ERK Signal Pathway in Mice.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41952615/",
                summary: "A 2026 study demonstrated that Kisspeptin-10 promoted ovarian follicle development, enhanced hormone secretion, and increased follicular cell proliferation in mice. The peptide was found to suppress apoptosis and autophagy by activating the PI3K/AKT/ERK signaling pathway.",
                evidence_level: "preclinical"
            },
        {
                title: "Serum kisspeptin levels in women with polycystic ovary syndrome: A systematic review and meta-analysis.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41914593/",
                summary: "A 2026 meta-analysis demonstrated significantly higher serum kisspeptin levels in women with polycystic ovary syndrome compared to controls. Researchers found this elevation was most pronounced in overweight and obese patients, highlighting a potential interaction between metabolic status and reproductive neuroendocrine regulation.",
                evidence_level: "very-strong"
            },
        {
                title: "GABA receptor modulation of arcuate kisspeptin neuron bursting and synchronization activity in female mice.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41912143/",
                summary: "A 2026 study in female mice demonstrated that sustained GABAergic input suppresses the burst firing and synchronization of arcuate kisspeptin neurons through both GABAA and GABAB receptors. These findings suggest GABAergic inputs can modulate the frequency of reproductive hormone pulse generator activity.",
                evidence_level: "preclinical"
            },
        {
                title: "Effects of contraceptive (gestodene) on hatching, embryo development, and reproduction in Oryzias latipes.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41905662/",
                summary: "A 2026 study found that gestodene reduced post-hatching survival, decreased egg production, and inhibited the spawning ability of female Japanese medaka. The contraceptive adversely affected overall reproduction without altering the expression of genes associated with female mating receptivity.",
                evidence_level: "preclinical"
            },
        {
                title: "Idiopathic Hypogonadotropic Hypogonadism with a Rare Hemi-Arrhinia: A Case Report with Nasal Reconstruction.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41902607/",
                summary: "A 2026 case report identified inherited missense mutations in the GNRHR and KISS1 genes in a patient with idiopathic hypogonadotropic hypogonadism and congenital hemi-arrhinia. The study demonstrated that a four-stage surgical reconstruction successfully improved aesthetic outcomes without altering nasal airflow.",
                evidence_level: "anecdotal"
            },
        {
                title: "Cadmium-Induced Neuroendocrine Alterations: Gene Expression of the Kisspeptin-GnRH Axis and Delayed Puberty in Male Rats.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41893538/",
                summary: "A 2026 study in male rats demonstrated that cadmium exposure delayed pubertal onset and reduced serum testosterone levels. The research found that this disruption was linked to decreased hypothalamic expression of Kiss1, Kiss1r, and Gnrh1 genes within the kisspeptin-GnRH axis.",
                evidence_level: "preclinical"
            },
        {
                title: "Asprosin infusion modulates central circuits to rescue selective serotonin reuptake inhibitor-induced male dysfunction.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41873723/",
                summary: "A 2026 study found that central infusion of the adipokine asprosin restored erectile function, copulatory behavior, and testicular morphology in rats treated with selective serotonin reuptake inhibitors. The research demonstrated that asprosin improved sperm concentration and motility while modulating central reproductive circuits.",
                evidence_level: "preclinical"
            },
        {
                title: "Leptin Receptor b (LEPRb) Mutations Disrupt Hypothalamic Control of the Reproductive Axis.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41828698/",
                summary: "A 2026 review found that LEPRb mutations disrupt hypothalamic circuitry upstream of GnRH neurons, impairing reproductive function and causing hypogonadotropic hypogonadism. The study investigated the central role of kisspeptin-mediated signaling in leptin-dependent reproductive regulation.",
                evidence_level: "emerging"
            }
    ],
    safety_notes:
      "Endogenous human neuropeptide with growing clinical trial data. Tachyphylaxis (desensitization) has been reported with continuous administration in published studies. Kisspeptin-54 has been investigated as an IVF oocyte-maturation trigger in women at risk of OHSS. Not FDA-approved for therapeutic use. Research-only.",
    half_life_hours: 0.5,
    is_fda_approved: false,
    route_studied: "SubQ",
    studied_dose_citation: {
      title: "Direct comparison of the effects of intravenous kisspeptin-10, kisspeptin-54 and GnRH on gonadotrophin secretion in healthy men",
      url: "https://pubmed.ncbi.nlm.nih.gov/26089302/",
    },
    interactions: {
      synergies: ["CJC-1295", "Ipamorelin"],
      cautions: [],
      contraindicated: [],
      notes:
        "Kisspeptin-10 acts on the HPG axis, while GHRH analogs and GHRPs act on the GH axis.",
    },
    outcomes_timeline: {},
    side_effects: [
      {
        name: "Administration-site reaction",
        incidence: "Frequency not established",
        severity: "mild",
      },
      { name: "Mild headache", incidence: "Frequency not established", severity: "mild" },
      {
        name: "Flushing / warmth",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Tachyphylaxis (with continuous exposure)",
        incidence: "Variable",
        severity: "moderate",
        note: "Not a side effect per se; HPG-axis desensitization observed with continuous infusion in studies",
      },
    ],
  }),

  // ─── COGNITIVE ───,
  p({
    name: "KPV",
    aliases: ["Lys-Pro-Val"],
    category: "Anti-Inflammatory",
    category_icon: "\u{1FA79}",
    primary_benefits: "Intestinal inflammation in mouse colitis models, inflammatory cytokine suppression (cell studies), NF-kB pathway inhibition, oral nanoparticle delivery research",
    mechanism:
      "Alpha-MSH fragment that suppresses NF-κB inflammatory signaling in cell studies. In mouse colitis models it reduced pro-inflammatory cytokines and intestinal inflammation.",
    laypersonSummary:
      "KPV is a tripeptide fragment of alpha-MSH studied in mouse colitis models and cell cultures for anti-inflammatory effects; it has not been tested in controlled human trials.",
    key_studies: [
      {
        title: "KPV anti-inflammatory effects in murine colitis",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17095019/",
        summary:
          "Dalmasso et al. (PLoS One): KPV demonstrates significant anti-inflammatory effects in murine models of inflammatory bowel disease, suppressing NF-κB and MAPK pathways.",
        evidence_level: "preclinical",
      },
      {
        title: "KPV suppresses NF-κB signaling in airway epithelium",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16887251/",
        summary:
          "Study shows KPV inhibits p65RelA nuclear import, suppressing NF-κB inflammatory signaling in airway epithelial cells — relevant to respiratory and gut inflammation.",
        evidence_level: "preclinical",
      },
      {
        title: "KPV-loaded nanoparticles for oral IBD treatment",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25656709/",
        summary:
          "Hyaluronic acid-functionalized nanoparticle delivery of KPV enhances oral bioavailability and anti-inflammatory efficacy in colitis models, supporting clinical translation.",
        evidence_level: "preclinical",
      },
      {
        title: "KPV reduces pro-inflammatory cytokines (IL-1β, IL-6, TNF-α)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21640730/",
        summary:
          "KPV selectively suppresses production of IL-1β, IL-6, IL-12, TNF-α, and IFN-γ in colonic epithelial and immune cells, with effects mediated via intracellular PepT1 transport.",
        evidence_level: "preclinical",
      },
        {
                title: "A new era of doping? Use of peptide and peptide-analog drugs in recreational and professional sport and bodybuilding: a critical review.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41880199/",
                summary: "Limited clinical evidence supports the use of performance-enhancing peptides in sports despite their growing popularity, a 2026 review found. The research highlighted significant potential risks, including cardiovascular strain and insulin resistance, alongside major challenges in regulation and anti-doping detection.",
                evidence_level: "emerging"
            },
        {
                title: "Diagnostic Yield and Safety of Medical Thoracoscopic Biopsy in Undiagnosed Exudative Pleural Effusion: A Five-Year Retrospective Study From a Tertiary Care Center in South India.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41769616/",
                summary: "A 2026 retrospective study demonstrated that medical thoracoscopy achieved a 99.4% diagnostic yield in patients with undiagnosed exudative pleural effusions. The procedure showed an excellent safety profile, with malignancy identified as the most common underlying etiology.",
                evidence_level: "strong"
            },
        {
                title: "Inflammation-triggered self-immolative conjugates enable oral peptide delivery by overcoming gastrointestinal barriers.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41533788/",
                summary: "A 2026 study demonstrated that a self-immolative peptide prodrug conjugate platform enabled the oral delivery of anti-inflammatory peptides KPV, Ac-QAW, and IRW. Researchers found that these conjugates exhibited high gastrointestinal stability and significantly increased targeted accumulation in mice with colitis and acute lung injury.",
                evidence_level: "preclinical"
            },
        {
                title: "Application of AI for the functional elucidation of rice associated microbial community for the improved productivity.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41502473/",
                summary: "A 2026 machine learning analysis of rice-associated bacteria demonstrated that ABC-type oligopeptide transport systems are abundantly distributed in beneficial strains. The study found that AI models can accurately classify these microbes based on genetic markers responsible for nutrient transport and metabolic versatility.",
                evidence_level: "emerging"
            },
        {
                title: "Host defense peptides as a new drug lead to a strategy for inflammatory bowel disease.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41241376/",
                summary: "A 2025 review demonstrated that host defense peptides, such as cathelicidins and defensins, exhibit immunomodulatory properties that may benefit inflammatory bowel disease research. The study found these peptides downregulate the NF-κB pathway and modulate cytokine release to help restore intestinal homeostasis.",
                evidence_level: "emerging"
            },
        {
                title: "Exploring the Role of Tripeptides in Wound Healing and Skin Regeneration: A Comprehensive Review.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41209547/",
                summary: "A 2025 review found that tripeptides demonstrate the ability to stimulate fibroblast migration, enhance collagen deposition, and modulate inflammation. Researchers investigated specific peptides like GHK and KPV, highlighting their mechanisms in supporting extracellular matrix remodeling and angiogenesis during tissue repair.",
                evidence_level: "emerging"
            },
        {
                title: "Challenges in clinical nutrition research in Latin America: A narrative review.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41176232/",
                summary: "A 2025 narrative review found that clinical nutrition research in Latin America faces significant structural and financial barriers that hinder the management of disease-related malnutrition. The authors outlined practical strategies and highlighted successful regional initiatives to strengthen evidence-based nutritional policies.",
                evidence_level: "emerging"
            },
        {
                title: "NLRP3 autophagic degradation disruption in melanocytes contributes to vitiligo development.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40935835/",
                summary: "A 2026 preclinical study demonstrated that delivering Nlrp3 shRNA via lysine-proline-valine (KPV)-modified liposomes significantly alleviated vitiligo progression in a mouse model. The researchers found that targeting NLRP3 reduced excessive inflammation and melanocyte pyroptosis caused by disrupted autophagic degradation.",
                evidence_level: "preclinical"
            },
        {
                title: "Enhanced magnetic properties through tailoring of morphology of electrospun strontium hexaferrite nanofibers.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40603893/",
                summary: "A 2025 study demonstrated that adjusting the calcination temperature and heating rate during the synthesis of strontium hexaferrite nanofibers successfully tailored their morphology and significantly enhanced their magnetic properties. Specifically, calcination at 800°C yielded the most optimal magnetic characteristics.",
                evidence_level: "preclinical"
            },
        {
                title: "Clinical efficacy and safety of two highly purified human menopausal gonadotropins in women undergoing in vitro fertilization.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40445794/",
                summary: "A 2025 study demonstrated that Gynogen HP is noninferior to Menopur for controlled ovarian stimulation during in vitro fertilization. Researchers found both human menopausal gonadotropin preparations yielded a similar number of retrieved oocytes and exhibited comparable safety profiles.",
                evidence_level: "very-strong"
            },
        {
                title: "Lysine-Proline-Valine peptide mitigates fine dust-induced keratinocyte apoptosis and inflammation by regulating oxidative stress and modulating the MAPK/NF-κB pathway.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40073467/",
                summary: "A 2025 preclinical study demonstrated that the peptide KPV mitigated fine dust-induced cell death and inflammation in human keratinocytes and a 3D skin model. Researchers found that KPV reduced oxidative stress and modulated the MAPK/NF-κB pathway to protect against environmental damage.",
                evidence_level: "preclinical"
            },
        {
                title: "Multicompartmental Hydrogel Microspheres with a Concentric Thin Oil Layer: Protecting and Targeting Therapeutic Agents for Inflammatory Bowel Disease.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40030207/",
                summary: "A 2025 study demonstrated that encapsulating the peptide KPV in multicompartmental hydrogel microspheres preserved its anti-inflammatory activity under simulated stomach conditions. The delivery system successfully maintained KPV's effects on colonic epithelial cell migration and proliferation in vitro.",
                evidence_level: "preclinical"
            },
        {
                title: "Accurate Intramyocardial Hemorrhage Assessment with Fast, Free-running, Cardiac Quantitative Susceptibility Mapping.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39665631/",
                summary: "A 2024 study demonstrated that a high-dynamic-range quantitative susceptibility mapping cardiac MRI technique accurately detected intramyocardial hemorrhage and quantified iron content in canine models. The technique outperformed conventional mapping methods, completing whole-heart assessments within five minutes without requiring breath holding.",
                evidence_level: "preclinical"
            },
        {
                title: "The Efficacy and Safety of Probiotic Combinations Lobun Forte® Versus Renadyl® in Patients With Chronic Kidney Disease: A Comparative, Phase IV, Randomized, Open-Label, Active-Controlled, Parallel Study.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39347194/",
                summary: "A 2024 randomized clinical trial demonstrated that two multi-strain probiotic supplements significantly improved quality of life and estimated glomerular filtration rate in patients with stage 3-4 chronic kidney disease. The study found both formulations effectively reduced uremic toxins and modulated renal parameters.",
                evidence_level: "very-strong"
            },
        {
                title: "KPV and RAPA Self-Assembled into Carrier-Free Nanodrugs for Vascular Calcification Therapy.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39252648/",
                summary: "In a 2024 study, researchers found that carrier-free nanoparticles self-assembled from the peptide KPV and rapamycin significantly inhibited vascular calcification in mice. The study demonstrated that these nanoparticles worked by suppressing inflammatory responses and activating autophagy in both in vitro and in vivo models.",
                evidence_level: "preclinical"
            }
    ],
    safety_notes:
      "Research-only compound. No significant toxicity reported in preclinical studies; human safety data are lacking.",
    half_life_hours: 0.5,
    route_studied: "SubQ",
    interactions: {
      synergies: ["BPC-157", "Thymosin Alpha-1"],
      cautions: [],
      contraindicated: [],
      notes: "Combination data with other peptides are limited.",
    },
    side_effects: [
      {
        name: "Human tolerability not characterized",
        incidence: "Very limited human data",
        severity: "mild",
      },
      {
        name: "Mild GI upset (oral route)",
        incidence: "Frequency not established",
        severity: "mild",
      },
    ],
  }),

  // ─── MYOSTATIN ───,
  p({
    name: "LL-37",
    aliases: ["Cathelicidin", "CAP-18", "hCAP-18"],
    category: "Antimicrobial Peptide",
    category_icon: "\u{1F6E1}\uFE0F",
    primary_benefits:
      "Antimicrobial membrane disruption (in vitro), biofilm inhibition (in vitro), keratinocyte migration and re-epithelialization (cell and wound models), innate immune modulation",
    mechanism:
      "The only human cathelicidin antimicrobial peptide. LL-37 is a 37-amino acid cationic peptide that directly disrupts microbial membranes (bacteria, viruses, fungi) and neutralizes bacterial endotoxins (LPS). Beyond direct antimicrobial action, LL-37 modulates innate immunity by chemoattracting neutrophils, monocytes, and T-cells to infection sites. In wound models it stimulated keratinocyte migration via EGFR transactivation, and in vitro it inhibited Pseudomonas aeruginosa biofilm formation at sub-MIC concentrations.",
    laypersonSummary:
      "LL-37 is the only human cathelicidin antimicrobial peptide, studied mainly in laboratory and animal models for antimicrobial, anti-biofilm, wound re-epithelialization, and immune-signaling effects.",
    key_studies: [
      {
        title:
          "LL-37 broad-spectrum antimicrobial and immunomodulatory effects",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/24828484/",
        summary:
          "Comprehensive review of LL-37's dual antimicrobial and immunomodulatory functions, including membrane disruption, chemotaxis, cytokine regulation, and wound healing promotion.",
        evidence_level: "moderate",
      },
      {
        title: "LL-37 anti-biofilm activity against resistant pathogens",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18955434/",
        summary:
          "Overhage et al.: LL-37 inhibits biofilm formation by Pseudomonas aeruginosa at sub-MIC concentrations, affecting bacterial attachment, migration, and quorum sensing.",
        evidence_level: "preclinical",
      },
      {
        title: "LL-37 promotes wound healing via EGFR transactivation",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15557175/",
        summary:
          "Tokumaru et al.: LL-37 promotes wound re-epithelialization by stimulating keratinocyte migration through EGFR transactivation, providing mechanistic basis for wound-healing applications.",
        evidence_level: "preclinical",
      },
      {
        title: "Cathelicidin deficiency increases susceptibility to infection",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16239543/",
        summary:
          "Chromek et al.: Studies in CAMP-knockout models demonstrate that cathelicidin deficiency significantly increases susceptibility to urinary tract and skin infections, validating LL-37's critical role in host defense.",
        evidence_level: "preclinical",
      },
      {
        title: "LL-37 in chronic inflammatory conditions and immune regulation",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23838041/",
        summary:
          "Kahlenberg et al.: Review of LL-37's role in autoimmune and chronic inflammatory conditions including psoriasis, lupus, and rosacea. LL-37 acts as a danger signal activating dendritic cells and driving type I interferon production.",
        evidence_level: "moderate",
      },
    
      {
        title: "Vitamin D-inducible antimicrobial peptide LL-37 binds SARS-CoV-2 Spike and accessory proteins ORF7a and ORF8.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41064641/",
        summary: "A study published in Frontiers in cellular and infection microbiology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Antimicrobial peptide LL-37 and its pro-form, hCAP18, in desquamated epithelial cells of human whole saliva.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31825534/",
        summary: "A study published in European journal of oral sciences investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Insight into the Mechanism of Interactions between the LL-37 Peptide and Model Membranes of Legionella gormanii Bacteria.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37569419/",
        summary: "A study published in International journal of molecular sciences investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The Antimicrobial Peptide LL-37 as a Predictor Biomarker for Periodontitis with the Presence and Absence of Smoking: A Case-Control Study.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37711877/",
        summary: "A study published in BioMed research international investigating the effects and mechanisms.",
        evidence_level: "anecdotal"
      },
      {
        title: "Antimicrobial peptide CRAMP/LL-37 mediates ferroptosis resistance in cardiomyocytes by inhibiting cathepsin L.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40517353/",
        summary: "A study published in Basic research in cardiology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Cathelicidin peptide LL-37: A multifunctional peptide involved in heart disease.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39615616/",
        summary: "A study published in Pharmacological research investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The roles of cathelicidin LL-37 in immune defences and novel clinical applications.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19068548/",
        summary: "A study published in Current opinion in hematology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Associations of Serum Antimicrobial Peptide LL-37 with Longitudinal Cognitive Decline and Neurodegeneration Among Older Adults with Memory Complaints.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37066916/",
        summary: "A study published in Journal of Alzheimer's disease : JAD investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Synergistic effect of antimicrobial peptide LL-37 and colistin combination against multidrug-resistant Escherichia coli isolates.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33646013/",
        summary: "A study published in Future microbiology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Evaluation of LL-37 antimicrobial peptide derivatives alone and in combination with vancomycin against S. aureus.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30120393/",
        summary: "A study published in The Journal of antibiotics investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Roles and Mechanisms of Human Cathelicidin LL-37 in Cancer.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29843147/",
        summary: "A study published in Cellular physiology and biochemistry : international journal of experimental cellular physiology, biochemistry, and pharmacology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Cathelicidin LL-37 peptide regulates endothelial cell stiffness and endothelial barrier permeability.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20943960/",
        summary: "A study published in American journal of physiology. Cell physiology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Acute salivary antimicrobial peptide secretion response to different exercise intensities and durations.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39155711/",
        summary: "A study published in American journal of physiology. Regulatory, integrative and comparative physiology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Antifungal properties of cathelicidin LL-37: current knowledge and future research directions.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38057654/",
        summary: "A study published in World journal of microbiology & biotechnology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Smoking reduces cathelicidin LL-37 and human neutrophil peptide 1-3 levels in the gingival crevicular fluid of patients with periodontitis.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32820828/",
        summary: "A study published in Journal of periodontology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      }],
    safety_notes:
      "Endogenous human peptide with well-characterized biology. Cytotoxic to eukaryotic cells at high concentrations (>25mcg/mL). Concentration-dependent effects: low doses immunomodulatory, high doses cytotoxic. Also described as a pro-inflammatory danger signal in psoriasis, lupus, and rosacea research. Not FDA-approved as a therapeutic.",
    half_life_hours: 4,
    is_fda_approved: false,
    route_studied: "SubQ",
    interactions: {
      synergies: ["Thymosin Alpha-1", "BPC-157", "KPV"],
      cautions: [],
      contraindicated: [],
      notes:
        "LL-37 acts on innate immunity while Thymosin Alpha-1 has been studied for adaptive immune modulation; combination data are limited.",
    },
    side_effects: [
      {
        name: "Administration-site reaction (redness, swelling)",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Flu-like symptoms",
        incidence: "Frequency not established",
        severity: "mild",
      },
      { name: "Mild fever", incidence: "Frequency not established", severity: "mild" },
      { name: "Fatigue", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  // ─── REPRODUCTIVE / HORMONAL ───,
  p({
    name: "Melanotan II",
    aliases: ["MT-II", "MT-2"],
    category: "Melanocortin Agonist",
    category_icon: "\u{1F3A8}",
    primary_benefits: "Skin pigmentation in a Phase I trial, erectile response in small trials of men with erectile dysfunction, melanocortin receptor pharmacology",
    mechanism:
      "Non-selective melanocortin receptor agonist (MC1R, MC3R, MC4R and others). Studies report increased melanin production, reduced food intake in rodents, and erectile responses in men.",
    laypersonSummary:
      "Melanotan II is a synthetic melanocortin analog studied in small early-phase trials for skin pigmentation and erectile response; case reports describe serious adverse events and regulators have warned against its use.",
    key_studies: [
      {
        title: "Melanotan II tanning and erectile effects — Phase I",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12851303/",
        summary:
          "Dorr et al. (J. Investigative Dermatol.): Phase I trial in normal male volunteers confirming tanning activity and spontaneous penile erections. Side effects: nausea, somnolence.",
        evidence_level: "moderate",
      },
      {
        title: "Melanotan II as potent initiator of penile erection",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/10834511/",
        summary:
          "Wessells et al. (J. Urology): Double-blind study showing MT-II initiates erection in men with erectile dysfunction even without sexual stimulation.",
        evidence_level: "moderate",
      },
      {
        title: "Melanotan II as skin cancer chemopreventive peptide",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16611568/",
        summary:
          "Hadley & Dorr (Peptides): Review of MT-II as potential chemopreventive agent for UV-induced skin cancer through enhanced eumelanin synthesis.",
        evidence_level: "preclinical",
      },
      {
        title: "Development of selective MC4R agonists from Melanotan II",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19958036/",
        summary:
          "Hruby et al. describe development of functionally selective melanocortin receptor agonists derived from MT-II to separate desired from unwanted pharmacological effects.",
        evidence_level: "preclinical",
      },
    
      {
        title: "Melanotan-induced priapism: a hard-earned tan.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30796078/",
        summary: "A study published in BMJ case reports investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Use of melanotan I and II in the general population.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19224885/",
        summary: "A study published in BMJ (Clinical research ed.) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "CLIPSing Melanotan-II to Discover Multiple Functionally Selective hMCR Agonists.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35188390/",
        summary: "A study published in Journal of medicinal chemistry investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Combining MALDI mass spectrometry imaging and droplet-base surface sampling analysis for tissue distribution, metabolite profiling, and relative quantification of cyclic peptide melanotan II.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32674774/",
        summary: "A study published in Analytica chimica acta investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Melanotan-II reverses memory impairment induced by a short-term HF diet.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37478579/",
        summary: "A study published in Biomedicine & pharmacotherapy = Biomedecine & pharmacotherapie investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Discovery and development of novel melanogenic drugs. Melanotan-I and -II.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9760697/",
        summary: "A study published in Pharmaceutical biotechnology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "A liquid chromatographic/tandem mass spectroscopic method for quantification of the cyclic peptide melanotan-II. Plasma and brain tissue concentrations following administration in mice.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17610239/",
        summary: "A study published in Rapid communications in mass spectrometry : RCM investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "A glimpse into the underground market of melanotan.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30142729/",
        summary: "A study published in Dermatology online journal investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Melanocortin receptor agonist melanotan-II microinjected in the nucleus accumbens decreases appetitive and consumptive responding for food.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36155088/",
        summary: "A study published in Neuropeptides investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "5-HT(2C) receptor activation is a common mechanism on proerectile effects of apomorphine, oxytocin and melanotan-II in rats.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18582863/",
        summary: "A study published in European journal of pharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Melanotan-II: Investigation of the inducer and facilitator effects on penile erection in anaesthetized rat.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16360286/",
        summary: "A study published in Neuroscience investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Melanocortin peptide therapeutics: historical milestones, clinical studies and commercialization.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16412534/",
        summary: "A study published in Peptides investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Melanotan-associated melanoma.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21564053/",
        summary: "A study published in The British journal of dermatology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Melanotan II injection resulting in systemic toxicity and rhabdomyolysis.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23121206/",
        summary: "A study published in Clinical toxicology (Philadelphia, Pa.) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Melanotan II User Experience: A Qualitative Study of Online Discussion Forums.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34464955/",
        summary: "A study published in Dermatology (Basel, Switzerland) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Falsification of biotechnology drugs: current dangers and/or future disasters?",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30165334/",
        summary: "A study published in Journal of pharmaceutical and biomedical analysis investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "Research-only. Nausea reported in the Phase I trial (PMID 12851303). Case reports describe mole changes and melanoma (PMID 21564053), priapism (PMID 30796078), and systemic toxicity with rhabdomyolysis (PMID 23121206). Regulators including FDA and TGA have warned against its use.",
    half_life_hours: 1,
    route_studied: "SubQ",
    interactions: {
      synergies: [],
      cautions: ["PT-141"],
      contraindicated: [],
      notes:
        "Overlapping melanocortin receptor activity with PT-141 (bremelanotide).",
    },
    side_effects: [
      {
        name: "Nausea",
        incidence: "Reported in studies (PMID 12851303)",
        severity: "moderate",
      },
      { name: "Facial flushing", incidence: "Frequency not established", severity: "mild" },
      {
        name: "Fatigue / somnolence",
        incidence: "Reported in studies (PMID 12851303)",
        severity: "mild",
      },
      {
        name: "Spontaneous erections (men)",
        incidence: "Reported in studies (PMID 12851303)",
        severity: "mild",
      },
      {
        name: "Mole changes (darkening)",
        incidence: "Case reports (PMID 21564053)",
        severity: "uncommon",
        note: "Pigmentation changes may complicate melanoma detection",
      },
    ],
  }),
  p({
    name: "MK-677",
    aliases: ["Ibutamoren", "Ibutamoren Mesylate", "L-163,191", "Nutrobal"],
    category: "GH Secretagogue (Oral)",
    category_icon: "\u{1F4CA}",
    primary_benefits:
      "GH and IGF-1 elevation in elderly-adult RCTs, orally active GH secretagogue, fat-free mass endpoints (RCTs), sleep-stage changes (small human study), bone turnover markers",
    mechanism:
      "Non-peptide ghrelin receptor (GHSR1a) agonist that stimulates pulsatile growth hormone release from the pituitary gland. Orally active, with a ~24-hour half-life. In a 2-year RCT in healthy older adults, GH and IGF-1 elevation was sustained (PMID 18981485); cortisol was not altered at the doses studied (PMID 9467534).",
    laypersonSummary:
      "MK-677 (Ibutamoren) is an orally active, non-peptide growth hormone secretagogue studied in randomized trials in older and obese adults for GH and IGF-1 elevation, body composition, and sleep; trials also reported increased fasting glucose.",
    key_studies: [
      {
        title:
          "MK-677 increases GH and IGF-1 without altering cortisol in healthy elderly",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9467534/",
        summary:
          "Chapman et al. (J. Clin. Endocrinol. Metab.): two weeks of MK-677 in healthy elderly subjects restored IGF-1 and GH profiles to young adult levels without altering cortisol, prolactin, insulin, or thyroid hormones.",
        evidence_level: "moderate",
      },
      {
        title:
          "MK-677 2-year study: sustained IGF-1 elevation and body composition effects",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18981485/",
        summary:
          "Nass et al. (J. Clin. Endocrinol. Metab.): 2-year RCT in 65 healthy elderly adults. MK-677 increased GH and IGF-1 to young adult levels, increased fat-free mass by ~1.1kg, and did not affect BMD. Notable: fasting glucose increased by ~0.3 mmol/L.",
        evidence_level: "strong",
      },
      {
        title: "MK-677 increases fat-free mass in healthy obese males",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9467542/",
        summary:
          "Svensson et al. (J. Clin. Endocrinol. Metab.): 8-week RCT in obese males. MK-677 significantly increased GH secretion, IGF-1, and fat-free mass. Transient increase in appetite and mild insulin resistance noted.",
        evidence_level: "moderate",
      },
      {
        title: "MK-677 reverses diet-induced nitrogen wasting",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9771856/",
        summary:
          "Murphy et al. (J. Clin. Endocrinol. Metab.): MK-677 reversed diet-induced nitrogen wasting in healthy young volunteers on caloric restriction, demonstrating potent anti-catabolic properties.",
        evidence_level: "moderate",
      },
      {
        title: "MK-677 improves sleep quality in healthy young and elderly",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9349662/",
        summary:
          "Copinschi et al. (Neuroendocrinology): MK-677 increased duration of stage IV (deep) sleep by 50% and REM sleep by 20% in both young and older subjects, correlating with enhanced overnight GH secretion.",
        evidence_level: "moderate",
      },
      {
        title: "MK-677 increases bone turnover markers in postmenopausal women",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/10404017/",
        summary:
          "Murphy et al. (J. Clin. Endocrinol. Metab.): 12-month study in postmenopausal women showing MK-677 increased osteocalcin and bone-specific alkaline phosphatase, suggesting improved bone formation.",
        evidence_level: "moderate",
      },
    
      {
        title: "Orally active growth hormone secretagogues: state of the art and clinical perspectives.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9667794/",
        summary: "A study published in Annals of medicine investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Growth hormone-releasing hormone and growth hormone-releasing peptide as therapeutic agents to enhance growth hormone secretion in disease and aging.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9238854/",
        summary: "A study published in Recent progress in hormone research investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Effect of alendronate and MK-677 (a growth hormone secretagogue), individually and in combination, on markers of bone turnover and bone mineral density in postmenopausal osteoporotic women.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11238495/",
        summary: "A study published in The Journal of clinical endocrinology and metabolism investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Growth hormone-releasing peptides and the cardiovascular system.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/10790589/",
        summary: "A study published in Annales d'endocrinologie investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Nonpeptide and peptide growth hormone secretagogues act both as ghrelin receptor agonist and as positive or negative allosteric modulators of ghrelin signaling.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15905359/",
        summary: "A study published in Molecular endocrinology (Baltimore, Md.) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Effects of an oral ghrelin mimetic on body composition and clinical outcomes in healthy older adults: a randomized trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18981485/",
        summary: "A study published in Annals of internal medicine investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Oral administration of growth hormone (GH) releasing peptide-mimetic MK-677 stimulates the GH/insulin-like growth factor-I axis in selected GH-deficient adults.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9329386/",
        summary: "A study published in The Journal of clinical endocrinology and metabolism investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Two-month treatment of obese subjects with the oral growth hormone (GH) secretagogue MK-677 increases GH secretion, fat-free mass, and energy expenditure.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9467542/",
        summary: "A study published in The Journal of clinical endocrinology and metabolism investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Discrepancy between serum leptin values and total body fat in response to the oral growth hormone secretagogue MK-677.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/10468903/",
        summary: "A study published in Clinical endocrinology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Effects of a 7-day treatment with a novel, orally active, growth hormone (GH) secretagogue, MK-677, on 24-hour GH profiles, insulin-like growth factor I, and adrenocortical function in normal young men.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/8768828/",
        summary: "A study published in The Journal of clinical endocrinology and metabolism investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Treatment with the oral growth hormone secretagogue MK-677 increases markers of bone formation and bone resorption in obese young males.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9661080/",
        summary: "A study published in Journal of bone and mineral research : the official journal of the American Society for Bone and Mineral Research investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Brain and kidney GHS-R1a underexpression is associated with changes in renal function and hemodynamics during neurogenic hypertension.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32814069/",
        summary: "A study published in Molecular and cellular endocrinology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Prolonged oral treatment with MK-677, a novel growth hormone secretagogue, improves sleep quality in man.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9349662/",
        summary: "A study published in Neuroendocrinology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Pharmacological profile of a new orally active growth hormone secretagogue, SM-130686.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11739014/",
        summary: "A study published in The Journal of endocrinology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "Oral GH secretagogue studied in randomized trials of up to 2 years. Key concern: reduced insulin sensitivity and raised fasting glucose reported in trials of elderly and obese participants. One hip fracture trial in elderly participants was stopped early due to congestive heart failure signals. WADA prohibited. Not FDA-approved.",
    half_life_hours: 24,
    is_fda_approved: false,
    route_studied: "Oral",
    interactions: {
      synergies: ["CJC-1295", "Sermorelin", "DSIP"],
      cautions: [],
      contraindicated: [],
      notes:
        "Combination with exogenous GH raises concern for additive IGF-1 elevation.",
    },
    outcomes_timeline: {
      week_2_4:
        "Healthy elderly adults, two weeks: GH and IGF-1 profiles raised to young-adult levels without changes in cortisol or prolactin (PMID 9467534)",
      month_2_3:
        "Obese men, 8-week RCT: increased GH secretion, IGF-1, and fat-free mass, with transient appetite increase and mild insulin resistance (PMID 9467542)",
      long_term:
        "Healthy older adults, 2-year RCT: sustained GH and IGF-1 elevation, fat-free mass increase of ~1.1 kg, no effect on bone mineral density, and fasting glucose increase of ~0.3 mmol/L (PMID 18981485)",
    },
    side_effects: [
      {
        name: "Increased appetite",
        incidence: "Reported in studies (PMID 9467542)",
        severity: "moderate",
        note: "Described as transient in an 8-week trial",
      },
      {
        name: "Water retention / bloating",
        incidence: "Frequency not established",
        severity: "moderate",
      },
      {
        name: "Insulin resistance / elevated fasting glucose",
        incidence: "Reported in studies (PMID 18981485)",
        severity: "moderate",
        note: "Fasting glucose rose in the 2-year trial in older adults",
      },
      {
        name: "Lethargy / drowsiness",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Numbness / tingling (paresthesia)",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Joint pain",
        incidence: "Frequency not established",
        severity: "mild",
      },
    ],
  }),
  p({
    name: "MOTS-c",
    aliases: ["Mitochondrial ORF of 12S rRNA Type-c"],
    category: "Mitochondrial Peptide",
    category_icon: "\u{26A1}",
    primary_benefits: "Insulin sensitivity and AMPK activation (mouse models), skeletal muscle glucose metabolism (preclinical), diet-induced obesity models (mouse), circulating levels in human observational studies",
    mechanism:
      "Mitochondrial-derived peptide that activates AMPK. In mouse studies it enhanced skeletal muscle glucose uptake and fatty acid oxidation and prevented age-dependent and high-fat-diet-induced insulin resistance (PMID 25738459).",
    laypersonSummary:
      "MOTS-c is a peptide encoded in mitochondrial DNA studied in mouse models for effects on insulin sensitivity and metabolism; human data are limited to observational studies of circulating levels.",
    key_studies: [
      {
        title: "MOTS-c regulates metabolic homeostasis (Cell Metabolism)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25738459/",
        summary:
          "Lee et al. (Cell Metabolism): Discovery paper showing MOTS-c is a mitochondrial-derived peptide that regulates insulin sensitivity and metabolic homeostasis via AMPK activation.",
        evidence_level: "emerging",
      },
      {
        title: "MOTS-c prevents age-related insulin resistance in mice",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30975990/",
        summary:
          "Lee et al.: MOTS-c treatment prevents both age-dependent and high-fat-diet-induced insulin resistance and diet-induced obesity in mouse models.",
        evidence_level: "preclinical",
      },
      {
        title: "MOTS-c improves skeletal muscle glucose metabolism",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31577362/",
        summary:
          "Study demonstrating MOTS-c specifically targets skeletal muscle glucose metabolism, providing molecular basis for metabolic benefits and exercise-mimetic properties.",
        evidence_level: "preclinical",
      },
      {
        title: "Circulating MOTS-c levels decline with age and obesity",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29474084/",
        summary:
          "Human observational study linking decreased circulating MOTS-c levels with aging, obesity, and type 2 diabetes — suggesting therapeutic rationale for supplementation.",
        evidence_level: "emerging",
      },
    
      {
        title: "The Mitochondrial-Encoded Peptide MOTS-c Translocates to the Nucleus to Regulate Nuclear Gene Expression in Response to Metabolic Stress.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29983246/",
        summary: "A study published in Cell metabolism investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Mitochondrial-Encoded Peptide MOTS-c, Diabetes, and Aging-Related Diseases.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36824008/",
        summary: "A study published in Diabetes & metabolism journal investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The mitochondrial-derived peptide MOTS-c suppresses ferroptosis and alleviates acute lung injury induced by myocardial ischemia reperfusion via PPARγ signaling pathway.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37290680/",
        summary: "A study published in European journal of pharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "MOTS-c attenuates lung ischemia-reperfusion injury via MYH9-Dependent nuclear translocation and transcriptional activation of antioxidant genes.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40403491/",
        summary: "A study published in Redox biology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "MOTS-c attenuates mitochondrial dysfunction induces pyroptosis and cartilage degradation in osteoarthritis via an Nrf2-Dependent Mechanism.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41043625/",
        summary: "A study published in Free radical biology & medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Mitochondria-derived peptide MOTS-c: effects and mechanisms related to stress, metabolism and aging.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36670507/",
        summary: "A study published in Journal of translational medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "MOTS-c: A novel mitochondrial-derived peptide regulating muscle and fat metabolism.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/27216708/",
        summary: "A study published in Free radical biology & medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "MOTS-c Functionally Prevents Metabolic Disorders.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36677050/",
        summary: "A study published in Metabolites investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "MOTS-c, the Most Recent Mitochondrial Derived Peptide in Human Aging and Age-Related Diseases.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36233287/",
        summary: "A study published in International journal of molecular sciences investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Mitochondria-derived peptide MOTS-c and its role in OSA pathogenesis: a potential therapeutic target?",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40538382/",
        summary: "A study published in Sleep and biological rhythms investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The mitochondrial genome-encoded peptide MOTS-c interacts with Bcl-2 to alleviate nonalcoholic steatohepatitis progression.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38206815/",
        summary: "A study published in Cell reports investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "MOTS-c regulates the ROS/TXNIP/NLRP3 pathway to alleviate diabetic cardiomyopathy.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39616938/",
        summary: "A study published in Biochemical and biophysical research communications investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Circulating PGC-1α and MOTS-c Peptide as Potential Mitochondrial Biomarkers in Patients Undergoing Aortic Valve Replacement.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40104672/",
        summary: "A study published in Biologics : targets & therapy investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Mitochondrial-derived peptides and exercise.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34520826/",
        summary: "A study published in Biochimica et biophysica acta. General subjects investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Mitochondrial-Derived Peptides Exacerbate Senescence.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30058454/",
        summary: "A study published in Rejuvenation research investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "MOTS-c: A promising mitochondrial-derived peptide for therapeutic exploitation.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36761202/",
        summary: "A study published in Frontiers in endocrinology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "Endogenous peptide; no controlled human safety data for administered MOTS-c. Research-only.",
    half_life_hours: 4,
    route_studied: "SubQ",
    interactions: {
      synergies: ["SS-31", "Epitalon", "AOD-9604"],
      cautions: [],
      contraindicated: [],
      notes:
        "MOTS-c and SS-31 act on mitochondria through different mechanisms; combination data are limited.",
    },
    side_effects: [
      {
        name: "Administration-site reaction",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Human tolerability not characterized",
        incidence: "Very limited human data",
        severity: "mild",
      },
    ],
  }),

  // ─── TELOMERASE ───,
  p({
    name: "NAD+",
    aliases: [
      "Nicotinamide Adenine Dinucleotide",
      "NAD Plus",
      "Beta-Nicotinamide Adenine Dinucleotide",
    ],
    category: "Longevity",
    category_icon: "\u{26A1}",
    primary_benefits: "Mitochondrial and muscle stem-cell function (aged mouse models), age-related NAD+ decline via CD38, blood NAD+ elevation with precursors (NMN, NR) in human trials",
    mechanism:
      "NAD+ is a coenzyme present in every cell, required for mitochondrial energy production (oxidative phosphorylation), PARP-mediated DNA repair, sirtuin activity, and circadian regulation. Tissue levels decline with age, in part due to increased CD38 activity (PMID 27304511).",
    laypersonSummary:
      "NAD+ is a coenzyme involved in cellular energy and DNA repair whose levels decline with age; NAD+ repletion has been studied in aged mouse models, and precursors such as NMN and NR have been tested in small human trials.",
    key_studies: [
      {
        title: "NAD+ decline is a driver of aging",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32686947/",
        summary:
          "Rajman et al. (Cell Metabolism): Comprehensive review demonstrating NAD+ decline as a hallmark of aging, with restoration improving mitochondrial function, stem cell renewal, and lifespan in animal models.",
        evidence_level: "strong",
      },
      {
        title: "NAD+ repletion improves mitochondrial and stem cell function",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/27127236/",
        summary:
          "Zhang et al. (Science): NAD+ supplementation restores mitochondrial function in aged mice, improving muscle stem cell function and extending lifespan.",
        evidence_level: "preclinical",
      },
      {
        title:
          "CD38 dictates age-related NAD decline and mitochondrial dysfunction",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/27304511/",
        summary:
          "Camacho-Pereira et al. (Cell Metabolism): Identifies CD38 as the primary NAD-consuming enzyme that increases with age, explaining the progressive NAD+ decline.",
        evidence_level: "preclinical",
      },
      {
        title: "NAD+ intermediates: NMN and NR clinical trial overview",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29514064/",
        summary:
          "Yoshino et al.: Review of human clinical trials for NAD+ precursors (NMN, NR) showing safe elevation of blood NAD+ levels with improvements in insulin sensitivity and muscle function.",
        evidence_level: "moderate",
      },
    
      {
        title: "Lopinavir/ritonavir (ABT-378/r).",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11866671/",
        summary: "A study published in Expert opinion on pharmacotherapy investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Nicotinamide riboside activates SIRT5 deacetylation.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37289138/",
        summary: "A study published in The FEBS journal investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "NAD(+) Metabolism and Diseases with Motor Dysfunction.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34828382/",
        summary: "A study published in Genes investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Multiple domain interfaces mediate SARM1 autoinhibition.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33468661/",
        summary: "A study published in Proceedings of the National Academy of Sciences of the United States of America investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Progresses in both basic research and clinical trials of NAD+ in Parkinson's disease.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33989633/",
        summary: "A study published in Mechanisms of ageing and development investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "An Upstream Open Reading Frame in Phosphatase and Tensin Homolog Encodes a Circuit Breaker of Lactate Metabolism.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33406399/",
        summary: "A study published in Cell metabolism investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Decreased plasma nicotinamide and altered NAD(+) metabolism in glial cells surrounding Aβ plaques in a mouse model of Alzheimer's disease.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39374707/",
        summary: "A study published in Neurobiology of disease investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Peptide backbone modifications in lanthipeptides.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34325799/",
        summary: "A study published in Methods in enzymology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The Role of Nicotinamide in Cancer Chemoprevention and Therapy.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32245130/",
        summary: "A study published in Biomolecules investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "L-Glutamine in sickle cell disease.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32309821/",
        summary: "A study published in Drugs of today (Barcelona, Spain : 1998) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Cangrelor versus crushed ticagrelor in patients with acute myocardial infarction and cardiogenic shock: rationale and design of the randomised, double-blind DAPT-SHOCK-AMI trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39432252/",
        summary: "A study published in EuroIntervention : journal of EuroPCR in collaboration with the Working Group on Interventional Cardiology of the European Society of Cardiology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Implications of NAD(+) boosters in translational medicine.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32594513/",
        summary: "A study published in European journal of clinical investigation investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Visfatin: A Possible Role in Cardiovasculo-Metabolic Disorders.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33182523/",
        summary: "A study published in Cells investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Effects of Nicotinamide Mononucleotide on Glucose and Lipid Metabolism in Adults: A Systematic Review and Meta-analysis of Randomised Controlled Trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39531138/",
        summary: "A study published in Current diabetes reports investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "SS-31, a Mitochondria-Targeting Peptide, Ameliorates Kidney Disease.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35707274/",
        summary: "A study published in Oxidative medicine and cellular longevity investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Selective amide bond formation in redox-active coacervate protocells.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38129391/",
        summary: "A study published in Nature communications investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "IV NAD+ infusions have been associated with chest tightness, nausea, and cramping during administration; reported tolerability varies by route. Oral precursors (NMN, NR) raised blood NAD+ and were generally well-tolerated in clinical trials (PMID 29514064).",
    half_life_hours: 4,
    route_studied: "SubQ",
    interactions: {
      synergies: ["Epitalon", "SS-31", "MOTS-c"],
      cautions: [],
      contraindicated: [],
      notes:
        "NAD+ and SS-31 act on mitochondria through different mechanisms; combination data are limited.",
    },
    outcomes_timeline: {
      long_term:
        "Aged mice: NAD+ repletion restored mitochondrial and muscle stem-cell function and extended lifespan (PMID 27127236)",
    },
    side_effects: [
      {
        name: "Nausea during infusion",
        incidence: "Frequency not established (IV route)",
        severity: "moderate",
        note: "Reported as rate-related during IV infusion",
      },
      { name: "Flushing/warmth", incidence: "Frequency not established", severity: "mild" },
      {
        name: "Chest tightness",
        incidence: "Frequency not established (IV route)",
        severity: "mild",
        note: "Reported as transient during infusion",
      },
      {
        name: "Administration-site discomfort",
        incidence: "Frequency not established (SubQ)",
        severity: "mild",
      },
    ],
  }),

  // ─── ANTIOXIDANT ───,
  p({
    name: "PT-141",
    aliases: ["Bremelanotide", "Vyleesi"],
    category: "Melanocortin Agonist",
    category_icon: "\u{1F3A8}",
    primary_benefits: "Hypoactive sexual desire disorder in premenopausal women (FDA-approved as Vyleesi), erectile response in small trials of men with erectile dysfunction, central MC4R signaling",
    mechanism:
      "Melanocortin receptor agonist acting centrally at MC4R; its effects on sexual desire are attributed to CNS pathways rather than vascular effects.",
    laypersonSummary:
      "PT-141 (bremelanotide) is a melanocortin agonist that is FDA-approved as Vyleesi for hypoactive sexual desire disorder in premenopausal women; it has also been studied in small trials for male erectile dysfunction.",
    key_studies: [
      {
        title: "PT-141 (Bremelanotide) for hypoactive sexual desire — Phase 3",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30689646/",
        summary:
          "Kingsberg et al. (Obstet. & Gynecol.): Two identical Phase 3 RECONNECT trials showing bremelanotide significantly improves sexual desire and reduces distress in premenopausal women with HSDD.",
        evidence_level: "very-strong",
      },
      {
        title: "Bremelanotide Phase 3 efficacy and safety in HSDD",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31145980/",
        summary:
          "Clayton et al.: Phase 3 data confirming statistically significant improvements in desire metrics with favorable safety profile (nausea, flushing, headache). Led to FDA approval.",
        evidence_level: "very-strong",
      },
      {
        title: "PT-141 induces erection in men with erectile dysfunction",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18206919/",
        summary:
          "Diamond et al.: Double-blind, placebo-controlled study showing PT-141 induces significant erectile response, effective even in PDE5 inhibitor non-responders.",
        evidence_level: "strong",
      },
      {
        title: "Bremelanotide mechanism of action and pharmacology review",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31385737/",
        summary:
          "Comprehensive review of bremelanotide's MC4R mechanism, pharmacokinetics, clinical trial efficacy, and safety data across male and female sexual dysfunction studies.",
        evidence_level: "strong",
      },
        {
                title: "Strategies for Treating Sexual Health Concerns After Breast and Gynecologic Cancer.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41419078/",
                summary: "A 2025 review found that pharmacological agents like bremelanotide demonstrated efficacy for managing low sexual desire in breast and gynecologic cancer survivors. The analysis investigated multimodal treatment strategies, emphasizing the need for individualized care to address treatment-related sexual dysfunction.",
                evidence_level: "moderate"
            }
    ,
      {
        title: "Gateways to clinical trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15319808/",
        summary: "A study published in Methods and findings in experimental and clinical pharmacology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Gateways to clinical trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16082427/",
        summary: "A study published in Methods and findings in experimental and clinical pharmacology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Gateways to clinical trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15349141/",
        summary: "A study published in Methods and findings in experimental and clinical pharmacology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Gateways to clinical trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16395422/",
        summary: "A study published in Methods and findings in experimental and clinical pharmacology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Gateways to clinical trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16179960/",
        summary: "A study published in Methods and findings in experimental and clinical pharmacology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Double-blind, placebo-controlled evaluation of the safety, pharmacokinetic properties and pharmacodynamic effects of intranasal PT-141, a melanocortin receptor agonist, in healthy males and patients with mild-to-moderate erectile dysfunction.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14963471/",
        summary: "A study published in International journal of impotence research investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "PT-141: a melanocortin agonist for the treatment of sexual dysfunction.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12851303/",
        summary: "A study published in Annals of the New York Academy of Sciences investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Evaluation of the safety, pharmacokinetics and pharmacodynamic effects of subcutaneously administered PT-141, a melanocortin receptor agonist, in healthy male subjects and in patients with an inadequate response to Viagra.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14999221/",
        summary: "A study published in International journal of impotence research investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Co-administration of low doses of intranasal PT-141, a melanocortin receptor agonist, and sildenafil to men with erectile dysfunction results in an enhanced erectile response.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15833522/",
        summary: "A study published in Urology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[Therapy of erectile dysfunction in 2005].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14569381/",
        summary: "A study published in Der Urologe. Ausg. A investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Gateways to clinical trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15672123/",
        summary: "A study published in Methods and findings in experimental and clinical pharmacology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Melanocortin receptors, melanotropic peptides and penile erection.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17584130/",
        summary: "A study published in Current topics in medicinal chemistry investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Selective facilitation of sexual solicitation in the female rat by a melanocortin receptor agonist.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15226502/",
        summary: "A study published in Proceedings of the National Academy of Sciences of the United States of America investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "An effect on the subjective sexual response in premenopausal women with sexual arousal disorder by bremelanotide (PT-141), a melanocortin receptor agonist.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16839319/",
        summary: "A study published in The journal of sexual medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "Nausea and transient blood-pressure increases reported in trials. FDA-approved (Vyleesi) for HSDD in premenopausal women; approved use is defined by the prescribing label.",
    is_fda_approved: true,
    half_life_hours: 2.7,
    route_studied: "SubQ",
    studied_dose_citation: {
      title: "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials",
      url: "https://pubmed.ncbi.nlm.nih.gov/31599840/",
    },
    interactions: {
      synergies: [],
      cautions: ["Melanotan II"],
      contraindicated: [],
      notes:
        "Overlapping melanocortin receptor activity with Melanotan II.",
    },
    outcomes_timeline: {
      long_term:
        "Premenopausal women with acquired, generalized HSDD: the two Phase 3 RECONNECT trials supported FDA approval (Vyleesi) for this indication",
    },
    side_effects: [
      {
        name: "Nausea",
        incidence: "Reported in Phase 3 trials",
        severity: "moderate",
      },
      { name: "Flushing", incidence: "Reported in Phase 3 trials", severity: "mild" },
      { name: "Headache", incidence: "Reported in Phase 3 trials", severity: "mild" },
      {
        name: "Transient blood pressure increase",
        incidence: "Reported in studies",
        severity: "moderate",
        note: "The prescribing label lists uncontrolled hypertension as a contraindication",
      },
    ],
  }),
  p({
    name: "Selank",
    aliases: ["TP-7"],
    category: "Anxiolytic Peptide",
    category_icon: "\u{1F31F}",
    primary_benefits: "Anxiolytic effects in small Russian clinical trials, GABA-A receptor gene expression (preclinical), hippocampal BDNF (rat models), cytokine and IL-6 modulation (preclinical)",
    mechanism:
      "Synthetic tuftsin analog. Preclinical studies report effects on GABA-A receptor subunit gene expression, serotonin signaling, enkephalin degradation, hippocampal BDNF, and inflammation-related cytokines such as IL-6.",
    laypersonSummary:
      "Selank is a synthetic peptide registered in Russia as an anxiolytic; small Russian clinical trials in generalized anxiety disorder compared it with benzodiazepines, reporting anxiolytic effects without sedation.",
    key_studies: [
      {
        title: "Selank anxiolytic effects in humans",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18454096/",
        summary:
          "Clinical trial demonstrates Selank's anxiolytic efficacy in patients with generalized anxiety disorder, comparable to benzodiazepines but without sedation or dependence.",
        evidence_level: "moderate",
      },
      {
        title: "Selank anti-anxiety effects comparable to benzodiazepines",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19487070/",
        summary:
          "Study confirms Selank provides significant anti-anxiety effects comparable to benzodiazepine treatment, with added cognitive enhancement and no addictive potential.",
        evidence_level: "moderate",
      },
      {
        title: "Selank increases BDNF in hippocampus and prefrontal cortex",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23946087/",
        summary:
          "Selank increases BDNF production in the rat hippocampus and prefrontal cortex, preventing ethanol-induced memory impairment and enhancing synaptic plasticity.",
        evidence_level: "preclinical",
      },
      {
        title: "Selank modulates GABA receptor gene expression",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25109699/",
        summary:
          "Molecular study showing Selank influences GABA-A receptor subunit gene expression, providing mechanism for its anxiolytic effects without sedation.",
        evidence_level: "preclinical",
      },
    
      {
        title: "GABA, Selank, and Olanzapine Affect the Expression of Genes Involved in GABAergic Neurotransmission in IMR-32 Cells.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28293190/",
        summary: "A study published in Frontiers in pharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Functional Connectomic Approach to Studying Selank and Semax Effects.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32342318/",
        summary: "A study published in Doklady biological sciences : proceedings of the Academy of Sciences of the USSR, Biological sciences sections investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Peptide-based Anxiolytics: The Molecular Aspects of Heptapeptide Selank Biological Activity.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30255741/",
        summary: "A study published in Protein and peptide letters investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[Efficacy and possible mechanisms of action of a new peptide anxiolytic selank in the therapy of generalized anxiety disorders and neurasthenia].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18454096/",
        summary: "A study published in Zhurnal nevrologii i psikhiatrii imeni S.S. Korsakova investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Selank Administration Affects the Expression of Some Genes Involved in GABAergic Neurotransmission.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26924987/",
        summary: "A study published in Frontiers in pharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The temporary dynamics of inflammation-related genes expression under tuftsin analog Selank action.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/24291245/",
        summary: "A study published in Molecular immunology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The Influence of Selank on the Level of Cytokines Under the Conditions of \"Social\" Stress.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32621722/",
        summary: "A study published in Current reviews in clinical and experimental pharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[Comparison of anticoagulant effects of regulatory proline-containing oligopeptides. Specificity of glyprolines, semax, and selank and potential of their practical application].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16634437/",
        summary: "A study published in Izvestiia Akademii nauk. Seriia biologicheskaia investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[Optimization of the treatment of anxiety disorders with selank].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26356395/",
        summary: "A study published in Zhurnal nevrologii i psikhiatrii imeni S.S. Korsakova investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[Effects of the new peptide anxiolytic drug selank on the cardiovascular system functioning and respiration in cats].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16193654/",
        summary: "A study published in Eksperimental'naia i klinicheskaia farmakologiia investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Peptide Selank Enhances the Effect of Diazepam in Reducing Anxiety in Unpredictable Chronic Mild Stress Conditions in Rats.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28280289/",
        summary: "A study published in Behavioural neurology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[COMPARISON OF PHARMACOLOGICAL EFFECTS OF HEPTAPEPTIDE SELANK AFTER INTRANASAL AND INTRAPERITONEAL ADMINISTRATION TO BALB/c AND C57BL/6 MICE.].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29787664/",
        summary: "A study published in Eksperimental'naia i klinicheskaia farmakologiia investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Effect of Selank on Morphological Parameters of Rat Liver in Chronic Foot-Shock Stress.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31243679/",
        summary: "A study published in Bulletin of experimental biology and medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "State of Colon Microbiota in Rats during Chronic Restraint Stress and Selank Treatment.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31236882/",
        summary: "A study published in Bulletin of experimental biology and medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Expression of inflammation-related genes in mouse spleen under tuftsin analog Selank.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21609736/",
        summary: "A study published in Regulatory peptides investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Morphological Changes in the Large Intestine of Rats Subjected to Chronic Restraint Stress and Treated with Selank.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32651826/",
        summary: "A study published in Bulletin of experimental biology and medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "Few adverse events reported in published Russian trials; no dependence or withdrawal reported (PMID 18454096). Approved as an anxiolytic in Russia. Not FDA-approved in the US.",
    half_life_hours: 0.5,
    route_studied: "Nasal",
    interactions: {
      synergies: ["Semax", "DSIP"],
      cautions: [],
      contraindicated: [],
      notes: "Selank and Semax are related Russian peptides often studied side by side (PMID 32342318).",
    },
    outcomes_timeline: {
      week_2_4:
        "Patients with generalized anxiety disorder and neurasthenia: anxiolytic effects comparable to a benzodiazepine comparator, without sedation (PMID 18454096)",
    },
    side_effects: [
      { name: "Mild fatigue", incidence: "Frequency not established", severity: "mild" },
      {
        name: "Nasal irritation",
        incidence: "Frequency not established",
        severity: "mild",
        note: "Intranasal route only",
      },
      { name: "Mood fluctuation", incidence: "Frequency not established", severity: "mild" },
    ],
  }),
  p({
    name: "Semax",
    aliases: ["ACTH(4-7)-PGP"],
    category: "Cognitive Peptide",
    category_icon: "\u{1F9E0}",
    primary_benefits: "Hippocampal BDNF and TrkB expression (rat models), acute ischemic stroke outcomes in Russian clinical studies, attention and memory endpoints in small human studies, brain functional connectivity (fMRI)",
    mechanism:
      "Synthetic ACTH(4-7)-PGP analog. In rat studies it upregulated BDNF and its receptor TrkB in the hippocampus (PMID 16996037) and modulated neurotrophin gene expression after experimental cerebral ischemia.",
    laypersonSummary:
      "Semax is a synthetic ACTH-derived peptide registered in Russia, studied in rat models for neurotrophin (BDNF) expression and in Russian clinical studies of acute ischemic stroke and small human cognition studies.",
    key_studies: [
      {
        title: "Semax cognitive improvement in humans",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20387390/",
        summary:
          "Human trial showing cognitive improvement including enhanced attention, memory formation, and learning capacity.",
        evidence_level: "moderate",
      },
      {
        title: "Semax increases BDNF and TrkB expression in hippocampus",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16996037/",
        summary:
          "Dolotov et al. demonstrate Semax significantly upregulates BDNF and its receptor TrkB in the rat hippocampus, providing mechanistic basis for its nootropic effects.",
        evidence_level: "preclinical",
      },
      {
        title: "Semax high efficacy in acute ischemic stroke",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9286003/",
        summary:
          "Clinical-electrophysiologic studies report high efficacy of Semax in acute ischemic stroke patients, with significant neuroprotective effects and improved functional recovery.",
        evidence_level: "moderate-strong",
      },
      {
        title: "Semax modulates neurotrophin gene expression (NGF, BDNF)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18726049/",
        summary:
          "Molecular study showing Semax modulates expression of multiple neurotrophin genes including BDNF and nerve growth factor, supporting its broad neuroprotective mechanism.",
        evidence_level: "preclinical",
      },
      {
        title: "Semax effects on brain functional connectivity (fMRI)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25772008/",
        summary:
          "fMRI study in healthy individuals demonstrates Semax modulates brain functional connectivity networks, providing imaging evidence for its nootropic effects.",
        evidence_level: "moderate",
      },
    
      {
        title: "The Potential of the Peptide Drug Semax and Its Derivative for Correcting Pathological Impairments in the Animal Model of Alzheimer's Disease.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41479572/",
        summary: "A study published in Acta naturae investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The effect of Semax and its C-end peptide PGP on the morphology and proliferative activity of rat brain cells during experimental ischemia: a pilot study.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20617398/",
        summary: "A study published in Journal of molecular neuroscience : MN investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "ACTH-like Peptides Compensate Rat Brain Gene Expression Profile Disrupted by Ischemia a Day After Experimental Stroke.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39767736/",
        summary: "A study published in Biomedicines investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Semax and Pro-Gly-Pro activate the transcription of neurotrophins and their receptor genes after cerebral ischemia.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19633950/",
        summary: "A study published in Cellular and molecular neurobiology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Semax, an ACTH4-10 peptide analog with high affinity for copper(II) ion and protective ability against metal induced cell toxicity.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25310602/",
        summary: "A study published in Journal of inorganic biochemistry investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Semax, a Copper Chelator Peptide, Decreases the Cu(II)-Catalyzed ROS Production and Cytotoxicity of aβ by Metal Ion Stripping and Redox Silencing.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40496623/",
        summary: "A study published in Bioinorganic chemistry and applications investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[The effect of semax and its C-end peptide PGP on expression of the neurotrophins and their receptors in the rat brain during incomplete global ischemia].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22295573/",
        summary: "A study published in Molekuliarnaia biologiia investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Trophic effects of nootropic peptide preparations cerebrolysin and semax on cultured rat pheochromocytoma.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12124658/",
        summary: "A study published in Bulletin of experimental biology and medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Semax, synthetic ACTH(4-10) analogue, attenuates behavioural and neurochemical alterations following early-life fluvoxamine exposure in white rats.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33418449/",
        summary: "A study published in Neuropeptides investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[Comparison of anticoagulant effects of regulatory proline-containing oligopeptides. Specificity of glyprolines, semax, and selank and potential of their practical application].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16634437/",
        summary: "A study published in Izvestiia Akademii nauk. Seriia biologicheskaia investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Functional Connectomic Approach to Studying Selank and Semax Effects.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32342318/",
        summary: "A study published in Doklady biological sciences : proceedings of the Academy of Sciences of the USSR, Biological sciences sections investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[Effectiveness of semax in acute period of hemispheric ischemic stroke (a clinical and electrophysiological study)].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11517472/",
        summary: "A study published in Zhurnal nevrologii i psikhiatrii imeni S.S. Korsakova investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "[The effect of semax and its C-end peptide PGP on Vegfa gene expression in the rat brain during incomplete global ischemia].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23888777/",
        summary: "A study published in Molekuliarnaia biologiia investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[EFFECT OF PEPTIDE SEMAX ON SYNAPTIC ACTIVITY AND SHORT-TERM PLASTICITY OF GLUTAMATERGIC SYNAPSES OF CO-CULTURED DORSAL ROOT GANGLION AND DORSAL HORN NEURONS].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26552305/",
        summary: "A study published in Fiziolohichnyi zhurnal (Kiev, Ukraine : 1994) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Antidepressant-like and antistress effects of the ACTH(4-10) synthetic analogs Semax and Melanotan II on male rats in a model of chronic unpredictable stress.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39442746/",
        summary: "A study published in European journal of pharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "Studied mainly as an intranasal formulation; well-tolerated in published research. Approved in Russia/Ukraine. Not FDA-approved in the US.",
    half_life_hours: 0.33,
    route_studied: "Nasal",
    interactions: {
      synergies: ["Selank"],
      cautions: [],
      contraindicated: [],
      notes:
        "Semax and Selank are related Russian peptides often studied side by side (PMID 32342318); combination data are limited.",
    },
    side_effects: [
      {
        name: "Nasal irritation",
        incidence: "Frequency not established",
        severity: "mild",
        note: "Intranasal administration only",
      },
      { name: "Mild headache", incidence: "Frequency not established", severity: "mild" },
      {
        name: "Irritability",
        incidence: "Frequency not established",
        severity: "mild",
      },
    ],
  }),
  p({
    name: "Sermorelin",
    aliases: [],
    category: "GHRH Analog",
    category_icon: "\u{1F489}",
    primary_benefits: "Endogenous GH and IGF-1 secretion (human studies), lean body mass in older adults (clinical studies), pediatric GH deficiency (formerly FDA-approved)",
    mechanism:
      "GHRH analog. Binds pituitary GHRH receptors to stimulate the gland's own growth hormone release in a physiologic, pulsatile pattern.",
    laypersonSummary:
      "Sermorelin is a GHRH analog that was previously FDA-approved for use in children with GH deficiency; it has been studied in older adults for its effects on growth hormone and IGF-1 secretion.",
    key_studies: [
      {
        title: "Sermorelin increases lean mass in older adults",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9141536/",
        summary:
          "Vittone et al.: Sermorelin treatment significantly increases lean body mass, improves body composition, and enhances GH/IGF-1 levels in older adults.",
        evidence_level: "moderate-strong",
      },
      {
        title:
          "Sermorelin for idiopathic GH deficiency in children (FDA study)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/10334586/",
        summary:
          "Prakash & Garg: FDA-approved indication — sermorelin produces significant and sustained height velocity increases in prepubertal children with GH deficiency.",
        evidence_level: "strong",
      },
      {
        title: "Sermorelin restores GH and IGF-1 in aging men",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9467542/",
        summary:
          "Veldhuis et al. (J. Clin. Endocrinol. Metab.): Demonstrates sermorelin injections effectively restore GH and IGF-1 levels in older men with age-related GH decline.",
        evidence_level: "moderate-strong",
      },
      {
        title: "Sermorelin gender-specific anabolic responses",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9324408/",
        summary:
          "Study examining sermorelin's ability to stimulate GH/IGF-1 secretion in men and women, identifying gender-specific anabolic responses.",
        evidence_level: "moderate",
      },
    
      {
        title: "Cationic exchange SPE combined with triple quadrupole UHPLC-MS/MS for detection of GHRHs in urine samples.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37806509/",
        summary: "A study published in Analytical biochemistry investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Growth Hormone-Releasing Hormone Antagonists Increase Radiosensitivity in Non-Small Cell Lung Cancer Cells.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40244089/",
        summary: "A study published in International journal of molecular sciences investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "In-house standards derived from doping peptides: Enzymatic and serum stability and degradation profile of GHRP and GHRH-related peptides.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37688464/",
        summary: "A study published in Biomedical chromatography : BMC investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "A potentially effective drug for patients with recurrent glioma: sermorelin.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33842627/",
        summary: "A study published in Annals of translational medicine investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Growth hormone releasing hormone.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/2429796/",
        summary: "A study published in Clinics in endocrinology and metabolism investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Probing for peptidic drugs (2-10 kDa) in doping control blood samples.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38716080/",
        summary: "A study published in Analytical science advances investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "An antibody-free, ultrafiltration-based assay for the detection of growth hormone-releasing hormones in urine at low pg/mL concentrations using nanoLC-HRMS/MS.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35298973/",
        summary: "A study published in Journal of pharmaceutical and biomedical analysis investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Online large volume sample staking preconcentration and separation of enantiomeric GHRH analogs by capillary electrophoresis.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36787346/",
        summary: "A study published in Electrophoresis investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Sermorelin: a better approach to management of adult-onset growth hormone insufficiency?",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18046908/",
        summary: "A study published in Clinical interventions in aging investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "New agonist- and antagonist-based treatment approaches for advanced prostate cancer.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22971474/",
        summary: "A study published in The Journal of international medical research investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Sermorelin: a review of its use in the diagnosis and treatment of children with idiopathic growth hormone deficiency.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18031173/",
        summary: "A study published in BioDrugs : clinical immunotherapeutics, biopharmaceuticals and gene therapy investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "GHRH agonist MR-409 protects β-cells from streptozotocin-induced diabetes.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37307472/",
        summary: "A study published in Proceedings of the National Academy of Sciences of the United States of America investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "PEGylation of growth hormone-releasing hormone (GRF) analogues.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14499707/",
        summary: "A study published in Advanced drug delivery reviews investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Chromatographic-mass spectrometric analysis of peptidic analytes (2-10 kDa) in doping control urine samples.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38197510/",
        summary: "A study published in Journal of mass spectrometry : JMS investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Growth hormone-releasing hormone receptor antagonist MIA-602 attenuates cardiopulmonary injury induced by BSL-2 rVSV-SARS-CoV-2 in hACE2 mice.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37983492/",
        summary: "A study published in Proceedings of the National Academy of Sciences of the United States of America investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Growth Hormone Secretagogue Treatment in Hypogonadal Men Raises Serum Insulin-Like Growth Factor-1 Levels.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28830317/",
        summary: "A study published in American journal of men's health investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "Previously FDA-approved for the diagnosis and treatment of pediatric GH deficiency and generally well tolerated in published clinical studies. Not currently FDA-approved for other uses. Research use only.",
    half_life_hours: 0.2,
    route_studied: "SubQ",
    interactions: {
      synergies: ["Ipamorelin", "CJC-1295"],
      cautions: [],
      contraindicated: [],
      notes:
        "Sermorelin + Ipamorelin pairs a GHRH analog with a selective GHRP. DSIP is sometimes discussed alongside them in sleep research.",
    },
    side_effects: [
      {
        name: "Administration-site reactions",
        incidence: "Reported in studies",
        severity: "mild",
      },
      { name: "Headache", incidence: "Reported in studies", severity: "mild" },
      { name: "Flushing", incidence: "Reported in studies", severity: "mild" },
      { name: "Dizziness", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  // ─── ANTI-INFLAMMATORY ───,
  p({
    name: "SS-31",
    aliases: ["Elamipretide", "Bendavia", "MTP-131"],
    category: "Mitochondrial Peptide",
    category_icon: "\u{26A1}",
    primary_benefits: "Cardiolipin binding and cristae stabilization (preclinical), cardiac and skeletal muscle function in aged mice, heart failure and mitochondrial myopathy (clinical trials)",
    mechanism:
      "Mitochondria-targeted tetrapeptide. Selectively concentrates in the inner mitochondrial membrane, where it binds cardiolipin; in preclinical studies this was associated with stabilized cristae, reduced ROS, and improved oxidative phosphorylation.",
    laypersonSummary:
      "SS-31 (elamipretide) is a mitochondria-targeting peptide that binds cardiolipin; it has been studied in heart and muscle models of aging and in clinical trials for heart failure and mitochondrial myopathy.",
    key_studies: [
      {
        title: "SS-31 (Elamipretide) clinical trials overview",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30430350/",
        summary:
          "Szeto (Br. J. Pharmacol.): Comprehensive review of elamipretide mechanism and clinical trial results in heart failure, mitochondrial myopathy, and ischemia-reperfusion injury.",
        evidence_level: "moderate",
      },
      {
        title: "Elamipretide stabilizes cardiolipin and cristae structure",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32102697/",
        summary:
          "Birk et al. (Pharmaceuticals): Detailed mechanism review showing elamipretide binds cardiolipin, stabilizes mitochondrial cristae, reduces ROS, and improves oxidative phosphorylation.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Elamipretide attenuates age-related cardiac protein modifications",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31637556/",
        summary:
          "Animal study in which elamipretide reduced age-associated post-translational heart protein modifications and improved mitochondrial function measures in aged cardiac tissue.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Elamipretide improves mitochondrial dysfunction and memory impairment",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31089179/",
        summary:
          "SS-31 improves LPS-induced mitochondrial dysfunction, oxidative stress, and memory impairment in mice via BDNF signaling regulation.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Elamipretide rescues muscle force and cardiac function in aging",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30155950/",
        summary:
          "Treatment improves ADP sensitivity in aged mitochondria by increasing ANT uptake, rescuing skeletal muscle force and cardiac systolic function.",
        evidence_level: "preclinical",
      },
    
      {
        title: "Comprehensive dry eye therapy: overcoming ocular surface barrier and combating inflammation, oxidation, and mitochondrial damage.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38725011/",
        summary: "A study published in Journal of nanobiotechnology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Effect of Aficamten on Health Status Outcomes in Obstructive Hypertrophic Cardiomyopathy: Results From SEQUOIA-HCM.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39217569/",
        summary: "A study published in Journal of the American College of Cardiology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Reprogramming of Treg cell-derived small extracellular vesicles effectively prevents intestinal inflammation from PANoptosis by blocking mitochondrial oxidative stress.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39689981/",
        summary: "A study published in Trends in biotechnology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "SS-31, a Mitochondria-Targeting Peptide, Ameliorates Kidney Disease.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35707274/",
        summary: "A study published in Oxidative medicine and cellular longevity investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Elamipretide alleviates pyroptosis in traumatically injured spinal cord by inhibiting cPLA2-induced lysosomal membrane permeabilization.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36609266/",
        summary: "A study published in Journal of neuroinflammation investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "New insight for SS‑31 in treating diabetic cardiomyopathy: Activation of mitoGPX4 and alleviation of mitochondria‑dependent ferroptosis.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39364755/",
        summary: "A study published in International journal of molecular medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41966639/",
        summary: "A study published in Sports medicine (Auckland, N.Z.) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Post-sepsis chronic muscle weakness can be prevented by pharmacological protection of mitochondria.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39563237/",
        summary: "A study published in Molecular medicine (Cambridge, Mass.) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "SS-31@Fer-1 Alleviates ferroptosis in hypoxia/reoxygenation cardiomyocytes via mitochondrial targeting.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39848110/",
        summary: "A study published in Biomedicine & pharmacotherapy = Biomedecine & pharmacotherapie investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Mitochondrial dysfunction and beneficial effects of mitochondria-targeted small peptide SS-31 in Diabetes Mellitus and Alzheimer's disease.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34302976/",
        summary: "A study published in Pharmacological research investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Polyphosphate- and Antioxidant Peptide-Based Coacervate Delivers miRNA.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40478241/",
        summary: "A study published in ACS applied materials & interfaces investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The mitochondria-targeted peptide SS-31 binds lipid bilayers and modulates surface electrostatics as a key component of its mechanism of action.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32273339/",
        summary: "A study published in The Journal of biological chemistry investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "A multifunctional mitochondria-protective gene delivery platform promote intervertebral disc regeneration.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39742837/",
        summary: "A study published in Biomaterials investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Mitochondrial protein interaction landscape of SS-31.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32554501/",
        summary: "A study published in Proceedings of the National Academy of Sciences of the United States of America investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Peptide SS-31 upregulates frataxin expression and improves the quality of mitochondria: implications in the treatment of Friedreich ataxia.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28852135/",
        summary: "A study published in Scientific reports investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "Reported as generally well tolerated in Phase 2/3 trials. Has received FDA Fast Track and Orphan Drug designations; not FDA-approved for the uses discussed here. Research use only.",
    half_life_hours: 4,
    route_studied: "SubQ",
    interactions: {
      synergies: ["MOTS-c", "Epitalon"],
      cautions: [],
      contraindicated: [],
      notes:
        "SS-31 and MOTS-c act on mitochondria through different mechanisms (cardiolipin binding vs. AMPK signaling); the combination has not been studied.",
    },
    side_effects: [
      {
        name: "Overall tolerability",
        incidence: "Generally well tolerated in reported trials",
        severity: "mild",
      },
      {
        name: "Administration-site reaction",
        incidence: "Reported in clinical trials",
        severity: "mild",
      },
    ],
  }),

  // ─── NEUROTROPHIC ───,
  p({
    name: "TB-500",
    aliases: ["Thymosin Beta-4 fragment", "Tβ4"],
    category: "Thymosin Beta-4 Fragment",
    category_icon: "\u{1F9EC}",
    primary_benefits: "Dermal wound healing (thymosin beta-4, animal models), cardiac repair after myocardial infarction (mouse models), cell migration and angiogenesis",
    mechanism:
      "Thymosin beta-4 binds G-actin and promotes cell migration. In animal models it has been associated with reepithelialization, angiogenesis, reduced inflammation, and activation of cardiac progenitor cells. Most published data come from full-length thymosin beta-4 rather than the TB-500 fragment.",
    laypersonSummary:
      "TB-500 is a synthetic fragment of thymosin beta-4. The parent protein has been studied in animal models of wound healing and cardiac injury, and recombinant thymosin beta-4 has been tested in early-phase human trials.",
    key_studies: [
      {
        title: "Thymosin Beta-4 wound healing and inflammation",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/14657002/",
        summary:
          "Malinda et al. demonstrate Tβ4 promotes wound healing via enhanced reepithelialization, collagen deposition, angiogenesis, and keratinocyte migration in animal models.",
        evidence_level: "preclinical",
      },
      {
        title:
          "Thymosin β4 activates cardiac progenitor cells for myocardial repair",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17379810/",
        summary:
          "Smart et al. (Nature) show Tβ4 activates endogenous cardiac progenitor cells, initiating myocardial and vascular regeneration after systemic administration in mice.",
        evidence_level: "preclinical",
      },
      {
        title: "Thymosin β4 Phase I safety study in healthy volunteers",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20552046/",
        summary:
          "Phase I clinical trial demonstrates recombinant Tβ4 is well-tolerated at multiple IV doses in healthy volunteers, with no dose-limiting toxicities or serious adverse events.",
        evidence_level: "moderate",
      },
      {
        title: "Thymosin β4 promotes dermal healing in diverse models",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22092785/",
        summary:
          "Tβ4 accelerates dermal healing in normal, diabetic, steroid-treated, and aged animal models. Phase 2 results show modest efficacy in venous stasis and pressure ulcers.",
        evidence_level: "moderate",
      },
      {
        title: "Thymosin β4 reduces cardiac fibrosis and scar formation",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20018825/",
        summary:
          "Wei et al. show Tβ4 reduces scar formation post-myocardial infarction by inhibiting ROCK1 signaling, promoting neovascularization, and activating cardioprotective pathways.",
        evidence_level: "preclinical",
      },
    
      {
        title: "Therapeutic peptides in gerontology: mechanisms and applications for healthy aging.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42021992/",
        summary: "A study published in Frontiers in aging investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Adsorption effects of the doping relevant peptides Insulin Lispro, Synachten, TB-500 and GHRP 5.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28887173/",
        summary: "A study published in Analytical biochemistry investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Synthesis and characterization of the N-terminal acetylated 17-23 fragment of thymosin beta 4 identified in TB-500, a product suspected to possess doping potential.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22962027/",
        summary: "A study published in Drug testing and analysis investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Doping control analysis of seven bioactive peptides in horse plasma by liquid chromatography-mass spectrometry.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23318763/",
        summary: "A study published in Analytical and bioanalytical chemistry investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Detecting peptidic drugs, drug candidates and analogs in sports doping: current status and future directions.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25382550/",
        summary: "A study published in Expert review of proteomics investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "In vitro models for metabolic studies of small peptide hormones in sport drug testing.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25469748/",
        summary: "A study published in Journal of peptide science : an official publication of the European Peptide Society investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Comparison of various in vitro model systems of the metabolism of synthetic doping peptides: Proteolytic enzymes, human blood serum, liver and kidney microsomes and liver S9 fraction.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/27569051/",
        summary: "A study published in Journal of proteomics investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Simplifying and expanding the screening for peptides <2 kDa by direct urine injection, liquid chromatography, and ion mobility mass spectrometry.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26578461/",
        summary: "A study published in Journal of separation science investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Comparative effects of dietary sodium butyrate and tributyrin on broiler chickens' performance, gene expression, intestinal histomorphometry, blood indices, and litter.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40681595/",
        summary: "A study published in Scientific reports investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Solid-phase extraction of small biologically active peptides on cartridges and microelution 96-well plates from human urine.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26472487/",
        summary: "A study published in Drug testing and analysis investigating the effects and mechanisms.",
        evidence_level: "moderate"
      }],
    safety_notes:
      "Research use only. Recombinant thymosin beta-4 (not the TB-500 fragment) was well tolerated in a Phase I study in healthy volunteers. Not FDA-approved.",
    half_life_hours: 2,
    route_studied: "SubQ",
    interactions: {
      synergies: ["BPC-157", "GHK-Cu"],
      cautions: [],
      contraindicated: [],
      notes: "TB-500 and BPC-157 are frequently discussed together; no published study has evaluated the combination.",
    },
    side_effects: [
      {
        name: "Administration-site reaction",
        incidence: "Frequency not established",
        severity: "mild",
      },
      {
        name: "Transient fatigue",
        incidence: "Frequency not established",
        severity: "mild",
      },
      { name: "Headache", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  // ─── GHRH ───,
  p({
    name: "Tesamorelin",
    aliases: ["Egrifta"],
    category: "GHRH Analog",
    category_icon: "\u{1F489}",
    primary_benefits: "Visceral adipose tissue reduction in HIV-associated lipodystrophy (FDA-approved), liver fat in HIV (RCT), IGF-1 elevation",
    mechanism:
      "GHRH analog. Binds GHRH receptors on the pituitary gland to stimulate endogenous growth hormone release; in Phase 3 trials this was associated with reduced visceral adipose tissue.",
    laypersonSummary:
      "Tesamorelin (Egrifta) is a GHRH analog that is FDA-approved to reduce excess abdominal fat in adults with HIV-associated lipodystrophy.",
    key_studies: [
      {
        title: "Tesamorelin visceral fat reduction (FDA trial)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20554713/",
        summary:
          "Falutz et al. (J. Clin. Endocrinol. Metab.): Pooled analysis of two randomized, double-blind, placebo-controlled Phase 3 trials in HIV-infected patients with excess abdominal fat. Visceral adipose tissue decreased significantly with tesamorelin versus placebo at 26 weeks, abdominal subcutaneous fat was preserved, the reduction was maintained through 52 weeks with continued treatment in the extension phase, and no clinically meaningful changes in glucose parameters were reported. Basis of the FDA-approved indication.",
        evidence_level: "very-strong",
      },
      {
        title: "Tesamorelin IGF-1 effects and body composition (Phase 3)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19776232/",
        summary:
          "Phase 3 trial showing ~80% increase in IGF-1 levels, improved body image distress scores, and significant trunk fat reduction across multiple patient populations.",
        evidence_level: "strong",
      },
    
      {
        title: "Untitled Study",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30920787/",
        summary: "A study published in  investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Spotlight on tesamorelin in HIV-associated lipodystrophy.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22050344/",
        summary: "A study published in BioDrugs : clinical immunotherapeutics, biopharmaceuticals and gene therapy investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Tesamorelin: a review of its use in the management of HIV-associated lipodystrophy.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21668043/",
        summary: "A study published in Drugs investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Tesamorelin.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21283099/",
        summary: "A study published in Nature reviews. Drug discovery investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Safety and Efficacy of Approved and Unapproved Peptide Therapies for Musculoskeletal Injuries and Athletic Performance.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41966639/",
        summary: "A study published in Sports medicine (Auckland, N.Z.) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Drug evaluation: tesamorelin, a synthetic human growth hormone releasing factor.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17086939/",
        summary: "A study published in Current opinion in investigational drugs (London, England : 2000) investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Effect of tesamorelin in people with HIV with and without dorsocervical fat: Post hoc analysis of phase III double-blind placebo-controlled trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36845310/",
        summary: "A study published in Journal of clinical and translational science investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Metabolic dysfunction-associated steatotic liver disease in people with HIV.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40397552/",
        summary: "A study published in Current opinion in HIV and AIDS investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Approach to the Patient With Lipodystrophy.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35137140/",
        summary: "A study published in The Journal of clinical endocrinology and metabolism investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Effect of tesamorelin on visceral fat and liver fat in HIV-infected patients with abdominal fat accumulation: a randomized clinical trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25038357/",
        summary: "A study published in JAMA investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Tesamorelin improves fat quality independent of changes in fat quantity.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33756511/",
        summary: "A study published in AIDS (London, England) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Tesamorelin: a growth hormone-releasing factor analogue for HIV-associated lipodystrophy.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22298602/",
        summary: "A study published in The Annals of pharmacotherapy investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Effects of Tesamorelin on Neurocognitive Impairment in Persons With HIV and Abdominal Obesity.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39813152/",
        summary: "A study published in The Journal of infectious diseases investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Tesamorelin, a human growth hormone releasing factor analogue.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19243281/",
        summary: "A study published in Expert opinion on investigational drugs investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Effects of tesamorelin on hepatic transcriptomic signatures in HIV-associated NAFLD.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32701508/",
        summary: "A study published in JCI insight investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "FDA-approved (Egrifta) only for HIV-associated lipodystrophy; not approved for other uses. Contraindicated in active malignancy. Fluid retention and glucose elevation have been reported in clinical trials.",
    is_fda_approved: true,
    half_life_hours: 0.43,
    route_studied: "SubQ",
    studied_dose_citation: {
      title: "Tesamorelin visceral fat reduction (FDA trial)",
      url: "https://pubmed.ncbi.nlm.nih.gov/20554713/",
    },
    interactions: {
      synergies: ["CJC-1295", "Ipamorelin"],
      cautions: ["IGF-1 LR3"],
      contraindicated: [],
      notes:
        "Combining with other GH secretagogues may raise IGF-1 additively.",
    },
    outcomes_timeline: {
      long_term:
        "52-week Phase 3 extension in HIV-associated lipodystrophy: visceral fat reduction was maintained with continued treatment (pubmed 20554713)",
    },
    side_effects: [
      {
        name: "Fluid retention",
        incidence: "Reported in clinical trials",
        severity: "mild",
        note: "From Phase 3 Egrifta trial data",
      },
      {
        name: "Administration-site reactions",
        incidence: "Reported in clinical trials",
        severity: "mild",
      },
      {
        name: "Joint pain / arthralgia",
        incidence: "Reported in clinical trials",
        severity: "mild",
      },
      {
        name: "Glucose elevation",
        incidence: "Reported in clinical trials",
        severity: "moderate",
        note: "Glucose increases were observed in clinical trials",
      },
    ],
  }),
  p({
    name: "Thymosin Alpha-1",
    aliases: ["Tα1", "Zadaxin"],
    category: "Immune Peptide",
    category_icon: "\u{1F6E1}\uFE0F",
    primary_benefits: "T-cell and dendritic cell modulation, adjunct to interferon in chronic hepatitis B (clinical trials), sepsis and critical illness (clinical studies)",
    mechanism:
      "Immunomodulatory thymic peptide. Reported in clinical and preclinical studies to enhance T-cell maturation and dendritic cell activity and to modulate cytokine production.",
    laypersonSummary:
      "Thymosin alpha-1 (thymalfasin, Zadaxin) is an immunomodulating peptide approved outside the US for viral hepatitis and studied as an immune adjunct in hepatitis, cancer, and sepsis trials. It is not FDA-approved.",
    key_studies: [
      {
        title: "Thymosin Alpha-1 in immune-compromised patients",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18274638/",
        summary:
          "Garaci et al.: Review of Tα1 use in immune-compromised patients showing enhanced T-cell function, improved dendritic cell activity, and cytokine modulation.",
        evidence_level: "moderate-strong",
      },
      {
        title:
          "Thymosin Alpha-1 safety/efficacy: review of 30+ clinical trials",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31279456/",
        summary:
          "King & Tuthill: Review of 30+ clinical trials involving 11,000+ subjects that studied Tα1 in hepatitis B/C, cancer, and infections, summarizing its reported tolerability and trial outcomes. Not FDA-approved.",
        evidence_level: "strong",
      },
      {
        title: "Thymosin Alpha-1 as adjunct in hepatitis B treatment",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9246721/",
        summary:
          "Mutchnick et al. (Hepatology): Randomized trial showing Tα1 combined with interferon significantly improves virologic response in chronic hepatitis B vs. interferon alone.",
        evidence_level: "strong",
      },
      {
        title: "Thymosin Alpha-1 in sepsis and critical care",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32145828/",
        summary:
          "Evidence review of Tα1 in septic shock, ARDS, and peritonitis showing improved survival and immune recovery in critically ill patients.",
        evidence_level: "moderate-strong",
      },
      {
        title: "Thymosin Alpha-1 as cancer immunotherapy adjuvant",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17936025/",
        summary:
          "Garaci et al. (Ann. N.Y. Acad. Sci.): Review of Tα1 as cancer immunotherapy adjunct, showing enhanced chemotherapy tolerance and improved immune recovery in multiple tumor types.",
        evidence_level: "moderate",
      },
    
      {
        title: "Mechanism and clinical application of thymosin in the treatment of lung cancer.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37701432/",
        summary: "A study published in Frontiers in immunology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Serum thymosin alpha 1 levels in normal and pathological conditions.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30063864/",
        summary: "A study published in Expert opinion on biological therapy investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Thymosin α-1 in cancer therapy: Immunoregulation and potential applications.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36812669/",
        summary: "A study published in International immunopharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Thymosin α1 reverses oncolytic adenovirus-induced M2 polarization of macrophages to improve antitumor immunity and therapeutic efficacy.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39357524/",
        summary: "A study published in Cell reports. Medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Thymosin alpha 1 and HIV-1: recent advances and future perspectives.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28106477/",
        summary: "A study published in Future microbiology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Thymosin alpha 1: past clinical experience and future promise.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20536460/",
        summary: "A study published in Annals of the New York Academy of Sciences investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Clinical applications of thymosin alpha-1.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/7922712/",
        summary: "A study published in Cancer investigation investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Thymosin alpha-1 treatment in chronic hepatitis B.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25640173/",
        summary: "A study published in Expert opinion on biological therapy investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "A Pilot Trial of Thymalfasin (Thymosin-α-1) to Treat Hospitalized Patients With Hypoxemia and Lymphocytopenia Due to Coronavirus Disease 2019 Infection.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36056913/",
        summary: "A study published in The Journal of infectious diseases investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Bioactive Thymosin Alpha-1 Does Not Influence F508del-CFTR Maturation and Activity.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31311979/",
        summary: "A study published in Scientific reports investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Structures of Thymosin Proteins.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/27450728/",
        summary: "A study published in Vitamins and hormones investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Thymosin alpha(1) in combination with cytokines and chemotherapy for the treatment of cancer.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12860169/",
        summary: "A study published in International immunopharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Thymosin alpha 1 for treatment of hepatitis C virus: promise and proof.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20536461/",
        summary: "A study published in Annals of the New York Academy of Sciences investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Unmet needs in cystic fibrosis.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30063865/",
        summary: "A study published in Expert opinion on biological therapy investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Thymic endocrinology.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/1618588/",
        summary: "A study published in International journal of immunopharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "Reported as well tolerated across 30+ clinical trials (King & Tuthill review). Approved outside the US for viral hepatitis; not FDA-approved. Research use only.",
    is_fda_approved: false,
    half_life_hours: 2,
    route_studied: "SubQ",
    studied_dose_citation: {
      title: "A Pilot Trial of Thymalfasin (Thymosin-α-1) to Treat Hospitalized Patients With Hypoxemia and Lymphocytopenia Due to Coronavirus Disease 2019 Infection.",
      url: "https://pubmed.ncbi.nlm.nih.gov/36056913/",
    },
    interactions: {
      synergies: ["BPC-157", "KPV"],
      cautions: [],
      contraindicated: [],
      notes:
        "Frequently discussed alongside BPC-157 and KPV; no published study has evaluated these combinations.",
    },
    side_effects: [
      {
        name: "Administration-site reaction",
        incidence: "Reported in clinical trials",
        severity: "mild",
      },
      {
        name: "Mild flu-like symptoms",
        incidence: "Frequency not established",
        severity: "mild",
      },
    ],
  }),
  p({
    name: "Argireline",
    aliases: ["Acetyl Hexapeptide-3", "Acetyl Hexapeptide-8", "AH-3"],
    category: "Cosmetic Peptide",
    category_icon: "✨",
    primary_benefits: "Periorbital wrinkle depth (topical cosmetic study), SNAP-25 competition at the SNARE complex, topical cosmetic ingredient",
    mechanism:
      "Competes with SNAP-25 (synaptosomal-associated protein 25) for binding at the SNARE complex, partially inhibiting acetylcholine release at the neuromuscular junction, reducing repeated facial muscle contractions that cause dynamic wrinkles. Applied topically, it does not cross to the dermis at meaningful concentrations.",
    laypersonSummary:
      "Argireline is a synthetic hexapeptide used as a cosmetic skincare ingredient. It was designed to interfere with the same SNARE complex targeted by botulinum toxin, and a controlled study reported reduced periorbital wrinkle depth with topical use.",
    key_studies: [
      {
        title: "Evaluation of the efficacy and tolerance of a cosmetic formulation with Argireline",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11697020/",
        summary:
          "Blanes-Mira et al.: A topical Argireline solution used over 30 days reduced wrinkle depth by up to 30% in the periorbital region in a controlled study.",
        evidence_level: "moderate",
      },
    ],
    safety_notes:
      "Generally well tolerated as a topical cosmetic ingredient; systemic absorption is considered minimal. Not approved for injection. Not an FDA-classified drug — classified as a cosmetic ingredient.",
    is_fda_approved: false,
    half_life_hours: undefined,
    route_studied: "Topical",
    interactions: {
      synergies: ["GHK-Cu", "Matrixyl", "Leuphasyl"],
      cautions: [],
      contraindicated: [],
    },
    side_effects: [
      { name: "Mild skin irritation", incidence: "Rare reports", severity: "mild" },
    ],
  }),

  // ─── NEW PEPTIDES 2026 BATCH 1 ───

  p({
    name: "5-Amino-1MQ",
    aliases: ["5-amino-1-methylquinolinium", "5A1MQ"],
    category: "NNMT Inhibitor",
    category_icon: "🔬",
    primary_benefits: "NNMT inhibition, fat mass in diet-induced obese mice, adipose NAD+ levels (rodent models)",
    mechanism:
      "Selectively inhibits nicotinamide N-methyltransferase (NNMT), an enzyme that consumes SAM and is implicated in NAD+ depletion and fat storage. In cell and rodent studies, NNMT inhibition increased intracellular NAD+; in diet-induced obese mice it reduced fat mass and increased energy expenditure without changes in food intake.",
    laypersonSummary:
      "5-Amino-1MQ is a small-molecule NNMT inhibitor that has been studied in diet-induced obese mice, where it reduced fat mass and raised NAD+ levels. It has not been tested in human clinical trials.",
    key_studies: [
      {
        title: "NNMT inhibition induces browning of white adipose tissue and reduces fat mass",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29382845/",
        summary:
          "Neelakantan et al. demonstrate that selective NNMT inhibitor treatment in obese mice significantly reduces fat mass, increases energy expenditure, and upregulates brown adipose tissue markers without affecting food intake.",
        evidence_level: "preclinical",
      },
      {
        title: "NNMT inhibition protects against diet-induced obesity",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25662115/",
        summary:
          "Kraus et al. (Nature Communications): NNMT inhibition in mice prevents diet-induced obesity and improves insulin sensitivity by increasing NAD+ and methylation capacity in adipose tissue.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "⚠ PRECLINICAL RESEARCH ONLY. No completed human clinical trials. All efficacy and safety data derived from rodent models and should not be extrapolated to humans. Oral bioavailability and pharmacokinetics in humans are not established.",
    is_fda_approved: false,
    half_life_hours: 2,
    route_studied: "Oral",
    interactions: {
      synergies: ["NAD+", "MOTS-c", "AOD-9604"],
      cautions: [],
      contraindicated: [],
      notes: "Often discussed alongside NAD+ precursors (NMN/NR) because both are proposed to raise NAD+ through different pathways; the combination has not been studied.",
    },
    side_effects: [
      { name: "Unknown in humans", incidence: "Not established", severity: "rare", note: "No human safety data available" },
    ],
  }),

  p({
    name: "ARA-290",
    aliases: ["Cibinetide", "ARA290", "Cyclic helix B peptide"],
    category: "EPO Receptor Agonist",
    category_icon: "🧬",
    primary_benefits: "Small-fiber neuropathy symptoms (small Phase 2 trials), corneal nerve fiber density (small trials), innate repair receptor signaling",
    mechanism:
      "Selectively activates the innate repair receptor (IRR), a heterodimer of the erythropoietin receptor (EPOR) and CD131 (βc receptor). Unlike full erythropoietin, ARA-290 binds only the IRR and not the classical erythropoietic homodimer receptor; tissue-protective and anti-inflammatory effects have been reported in preclinical models without effects on red blood cell production. In small trials it was associated with changes in corneal nerve fiber density and neuropathy symptom scores.",
    laypersonSummary:
      "ARA-290 (cibinetide) is a peptide derived from erythropoietin that targets the innate repair receptor without stimulating red blood cell production; it has been studied in small Phase 2 trials for small-fiber neuropathy symptoms.",
    key_studies: [
      {
        title: "ARA 290 improves symptoms in patients with sarcoidosis-associated small fiber neuropathy",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/24510175/",
        summary:
          "Culver et al. (Molecular Medicine): Phase 2 RCT — ARA-290 significantly improved neuropathic pain scores, fatigue, and corneal nerve fiber density in sarcoidosis patients with small fiber neuropathy vs placebo.",
        evidence_level: "moderate",
      },
      {
        title: "ARA-290 reduces corneal nerve fiber density loss in painful diabetic neuropathy",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25662851/",
        summary:
          "Van Velzen et al.: ARA-290 treatment stabilized corneal nerve fiber loss and reduced neuropathic pain scores in a diabetic neuropathy cohort, demonstrating nerve-protective effects.",
        evidence_level: "moderate",
      },
      {
        title: "The innate repair receptor mediates the anti-inflammatory and tissue-protective actions of EPO",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18843799/",
        summary:
          "Brines et al.: Defines the IRR as the mechanistic target for tissue protection, distinguishing it from the erythropoietic receptor and proposing selective IRR agonists as a way to separate tissue-protective from erythropoietic effects.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "Has completed Phase 2 human trials. Very short plasma half-life (~2 minutes) but prolonged pharmacodynamic effect. No erythropoietic activity — does not raise hematocrit. Well tolerated in trials. Not FDA-approved. Research only.",
    is_fda_approved: false,
    half_life_hours: 0.033,
    route_studied: "SubQ",
    studied_dose_citation: {
      title: "Safety and efficacy of ARA 290 in sarcoidosis patients with symptoms of small fiber neuropathy: a randomized, double-blind pilot study",
      url: "https://pubmed.ncbi.nlm.nih.gov/23168581/",
    },
    interactions: {
      synergies: ["BPC-157", "TB-500"],
      cautions: [],
      contraindicated: [],
    },
    side_effects: [
      { name: "Administration-site reaction", incidence: "Reported in clinical trials", severity: "mild" },
      { name: "Mild headache", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  p({
    name: "Gonadorelin",
    aliases: ["GnRH", "LHRH", "Gonadorelin acetate", "Factrel"],
    category: "GnRH Analog",
    category_icon: "⚙️",
    primary_benefits: "Pituitary LH/FSH release (GnRH receptor agonist), pulsatile GnRH in hypogonadotropic hypogonadism (clinical studies), HPG axis diagnostic testing (formerly FDA-approved as Factrel)",
    mechanism:
      "Synthetic decapeptide identical to endogenous gonadotropin-releasing hormone (GnRH). Binds GnRH receptors in the anterior pituitary, stimulating pulsatile release of luteinizing hormone (LH) and follicle-stimulating hormone (FSH). It appears in some compounded protocols alongside testosterone therapy, but that use has not been evaluated in the controlled trials cited here. Physiologic GnRH signaling is pulsatile — continuous exposure causes receptor downregulation.",
    laypersonSummary:
      "Gonadorelin is a synthetic version of the body's GnRH that stimulates the pituitary to release LH and FSH. Pulsatile GnRH has been studied for restoring gonadotropin secretion in hypogonadotropic hypogonadism, and gonadorelin was formerly FDA-approved (Factrel) as a diagnostic agent.",
    key_studies: [
      {
        title: "Pulsatile GnRH treatment restores gonadotropin secretion and fertility",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/3510431/",
        summary:
          "Leyendecker et al.: Pulsatile GnRH administration effectively restores LH/FSH pulsatility and fertility in hypogonadotropic hypogonadism patients, establishing the importance of pulsatile administration in that study population.",
        evidence_level: "strong",
      },
      {
        title: "Low-dose hCG maintains intratesticular testosterone during testosterone replacement (LH-pathway study, not gonadorelin)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23211033/",
        summary:
          "Hsieh et al.: Low-dose hCG (mechanistically analogous to gonadorelin for LH stimulation) maintains intratesticular testosterone and sperm production during TRT. This is a study of hCG, not gonadorelin; it is listed for the shared LH-pathway mechanism only.",
        evidence_level: "moderate",
      },
    ],
    safety_notes:
      "FDA-approved as Factrel (historical, for diagnostic testing of HPG axis). Compounded gonadorelin used as TRT adjunct is not itself FDA-approved for this indication. Very short half-life. Continuous infusion causes pituitary desensitization.",
    is_fda_approved: true,
    half_life_hours: 0.05,
    route_studied: "SubQ",
    interactions: {
      synergies: ["Kisspeptin-10", "CJC-1295", "Ipamorelin"],
      cautions: [],
      contraindicated: [],
      notes: "Discussed in the context of testosterone therapy; no controlled trial of gonadorelin for that use is cited here. Not to be confused with GnRH agonist analogs (Lupron) which suppress the HPG axis via continuous stimulation.",
    },
    side_effects: [
      { name: "Administration-site reaction", incidence: "Frequency not established", severity: "mild" },
      { name: "Headache", incidence: "Frequency not established", severity: "mild" },
      { name: "Nausea", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  p({
    name: "Larazotide",
    aliases: ["Larazotide acetate", "AT-1001", "INN-202"],
    category: "Zonulin Antagonist",
    category_icon: "🧱",
    primary_benefits: "Tight-junction regulation (epithelial cell studies), tested in celiac disease trials (Phase 2b/3, adjunct to gluten-free diet), gliadin-induced intestinal permeability",
    mechanism:
      "Synthetic octapeptide developed as a tight-junction regulator. Zonulin, which can be released in response to gliadin, is a regulator of intestinal tight-junction permeability, and larazotide was designed as a zonulin antagonist. In epithelial cell studies it reduced gliadin-induced tight-junction disruption and permeability (one study describes a zonulin-independent mechanism). It acts locally in the gut lumen with minimal systemic absorption.",
    laypersonSummary:
      "Larazotide is an investigational oral peptide designed to regulate intestinal tight junctions. It has been tested in Phase 2b and Phase 3 trials as an adjunct to a gluten-free diet in celiac disease, with mixed results.",
    key_studies: [
      {
        title: "Larazotide acetate in persistent symptoms of celiac disease: Phase 2b trial",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26055953/",
        summary:
          "Leffler et al. (JAMA Internal Medicine): Phase 2b RCT — larazotide significantly reduced overall celiac disease symptom severity vs placebo in patients on a gluten-free diet and was reported as well tolerated.",
        evidence_level: "strong",
      },
      {
        title: "Larazotide acetate regulates epithelial tight junctions via a zonulin-independent mechanism",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18824503/",
        summary:
          "Paterson et al.: Larazotide stabilizes tight junctions and reduces epithelial permeability induced by gliadin, demonstrating its molecular mechanism of action in intestinal barrier protection.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "Reported as well tolerated in a Phase 2b trial. Minimal systemic absorption (acts locally in gut lumen). Investigational; not FDA-approved. Phase 3 results have been mixed.",
    is_fda_approved: false,
    half_life_hours: 1.5,
    route_studied: "Oral",
    studied_dose_citation: {
      title: "Larazotide acetate for persistent symptoms of celiac disease despite a gluten-free diet: a randomized controlled trial",
      url: "https://pubmed.ncbi.nlm.nih.gov/25683116/",
    },
    interactions: {
      synergies: ["BPC-157", "KPV"],
      cautions: [],
      contraindicated: [],
      notes: "Often discussed alongside BPC-157 and KPV in GI research; these combinations have not been studied.",
    },
    side_effects: [
      { name: "Headache", incidence: "Frequency not established", severity: "mild" },
      { name: "Diarrhea", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  p({
    name: "VIP",
    aliases: ["Vasoactive Intestinal Peptide", "Vasoactive Intestinal Polypeptide"],
    category: "Neuropeptide",
    category_icon: "🧠",
    primary_benefits: "Anti-inflammatory signaling in macrophages (cell studies), vasodilatory and bronchodilatory effects, CIRS (small uncontrolled case series)",
    mechanism:
      "28-amino acid neuropeptide that binds VPAC1 and VPAC2 receptors, activating cAMP pathways to produce broad anti-inflammatory effects. Inhibits TNF-alpha, IL-6, and IL-12 production while promoting Th2/Treg tolerance. Pulmonary vasodilator and bronchodilator. It is used in some clinician-directed protocols for chronic inflammatory response syndrome (CIRS); evidence for that use is limited to small uncontrolled series.",
    laypersonSummary:
      "VIP is an endogenous neuropeptide studied for anti-inflammatory and vasodilatory effects. It is used in some clinician-directed protocols, but evidence is limited to small uncontrolled series.",
    key_studies: [
      {
        title: "VIP is an autocrine growth factor for normal lung epithelium and as a growth factor and vasoactive compound for inflammatory conditions",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23209310/",
        summary:
          "Shoemaker et al.: Uncontrolled case series of intranasal VIP in CIRS patients, reporting changes in TGF-beta 1, MMP-9, VEGF, pulmonary arterial pressure, and NeuroQuant brain imaging measures.",
        evidence_level: "emerging",
      },
      {
        title: "Vasoactive intestinal peptide inhibits TLR4-induced inflammatory signaling in macrophages",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12370357/",
        summary:
          "Delgado et al.: VIP potently inhibits TLR4-mediated NF-kB activation and subsequent cytokine production (TNF-alpha, IL-6, IL-12) in macrophages, establishing its role as an endogenous immunomodulator.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "Not FDA-approved. Use in CIRS is limited to clinician-directed protocols supported by small uncontrolled series. Very short plasma half-life (~2 min). Facial flushing and hypotension are known effects of VIP. Research use only.",
    is_fda_approved: false,
    half_life_hours: 0.033,
    route_studied: "Nasal",
    interactions: {
      synergies: ["Thymosin Alpha-1", "BPC-157"],
      cautions: [],
      contraindicated: [],
      notes: "Combinations with other peptides have not been studied.",
    },
    side_effects: [
      { name: "Facial flushing", incidence: "Frequency not established", severity: "mild" },
      { name: "Hypotension", incidence: "Frequency not established", severity: "mild" },
      { name: "Nasal irritation", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  p({
    name: "Oxytocin",
    aliases: ["OXT", "Pitocin (IV form)", "Syntocinon"],
    category: "Neuropeptide",
    category_icon: "💛",
    primary_benefits: "Cortisol and anxiety response to social stress (human RCT), social cognition, gastric motility (clinical research), FDA-approved obstetric uses (IV/IM form)",
    mechanism:
      "Nonapeptide produced in the hypothalamus and released by the posterior pituitary. Binds oxytocin receptors (OXTR) broadly expressed in brain, heart, gut, and immune cells. Studied for modulation of the HPA-axis stress response, social behavior, and GI motility. Intranasal administration is used in research to study central effects.",
    laypersonSummary:
      "Oxytocin is an endogenous hypothalamic neuropeptide, FDA-approved in IV/IM form for obstetric uses. Intranasal oxytocin has been studied in human trials for effects on stress-related cortisol and social cognition.",
    key_studies: [
      {
        title: "Intranasal oxytocin reduces cortisol and enhances social cognition",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18498743/",
        summary:
          "Heinrichs et al.: Intranasal oxytocin reduced cortisol response to social stress and anxiety compared to placebo in a double-blind RCT.",
        evidence_level: "moderate",
      },
      {
        title: "Oxytocin improves gastrointestinal motility in functional dyspepsia",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30218869/",
        summary:
          "Clinical research demonstrating oxytocin's role in accelerating gastric emptying and improving symptoms in functional gastrointestinal disorders.",
        evidence_level: "moderate",
      },
    ],
    safety_notes:
      "IV/IM oxytocin (Pitocin/Syntocinon) is FDA-approved for obstetric indications only. Intranasal oxytocin as a research compound is NOT FDA-approved. Research use only. Short half-life. Water retention has been reported.",
    is_fda_approved: false,
    half_life_hours: 0.083,
    route_studied: "Nasal",
    studied_dose_citation: {
      title: "Oxytocin shapes the neural circuitry of trust and trust adaptation in humans",
      url: "https://pubmed.ncbi.nlm.nih.gov/18498743/",
    },
    interactions: {
      synergies: ["Selank", "DSIP"],
      cautions: [],
      contraindicated: [],
    },
    side_effects: [
      { name: "Water retention", incidence: "Frequency not established", severity: "mild" },
      { name: "Nasal irritation", incidence: "Frequency not established", severity: "mild" },
      { name: "Mild headache", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  // ─── NEW PEPTIDES 2026 BATCH 2 ───

  p({
    name: "Thymalin",
    aliases: ["Thymus extract", "TFX", "Thymic factor X"],
    category: "Thymic Peptide",
    category_icon: "🛡️",
    primary_benefits: "Immune markers in elderly patients (Russian cohort studies), long-term mortality in an elderly cohort (with Epithalamin), T-cell differentiation",
    mechanism:
      "Polypeptide extract from animal thymus gland containing a mixture of thymic hormones including thymulin, thymosin, and thymopoietin. Reported in Russian studies to promote T-cell differentiation and to modulate the balance between Th1/Th2 responses. Khavinson-group publications describe effects on neuroendocrine and immune markers in aging; independent replication is limited.",
    laypersonSummary:
      "Thymalin is a polypeptide extract of animal thymus studied mainly in Russian cohort studies of elderly patients for effects on immune markers; independent Western trials are lacking.",
    key_studies: [
      {
        title: "Thymalin reduces mortality and extends lifespan in elderly patients: 6-year follow-up",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/12930627/",
        summary:
          "Morozov et al.: 6-year study in elderly patients showed Thymalin + Epithalamin administration reduced annual mortality by 2.0–2.4× compared to controls, with improved immune and endocrine function markers.",
        evidence_level: "emerging",
      },
      {
        title: "Thymic peptides in aging and immune restoration",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9226264/",
        summary:
          "Khavinson et al.: Reviews the role of thymic bioregulatory peptides in restoring T-cell function and neuroendocrine homeostasis in aging, documenting consistent immune improvement across cohort studies.",
        evidence_level: "emerging",
      },
    ],
    safety_notes:
      "Based primarily on Russian clinical cohort studies (Khavinson et al.). Limited Western RCT validation. Generally well tolerated in published research. Not FDA-approved. Research only. Caution: Russian bioregulatory research base has limited reproducibility in Western trials.",
    is_fda_approved: false,
    half_life_hours: undefined,
    route_studied: "IM",
    interactions: {
      synergies: ["Thymosin Alpha-1", "Epitalon"],
      cautions: [],
      contraindicated: [],
    },
    outcomes_timeline: {},
    side_effects: [
      { name: "Administration-site reaction", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  p({
    name: "Humanin",
    aliases: ["HN", "Humanin-G", "S14G-Humanin"],
    category: "Mitochondrial Peptide",
    category_icon: "⚡",
    primary_benefits: "Neuroprotection against amyloid-beta toxicity (cell models), insulin sensitivity (rodent models), anti-apoptotic signaling",
    mechanism:
      "21-amino acid mitochondrial-derived peptide (MOTS-c sibling peptide) encoded in the 16S rRNA gene of mitochondrial DNA. Binds formyl peptide receptor-like 1 (FPRL1/FPR2) and the gp130 co-receptor complex, activating STAT3 and PI3K/Akt survival signaling. In cell and rodent studies it inhibited Bax-mediated apoptosis, reduced amyloid-beta neurotoxicity, and improved insulin sensitivity. Circulating levels decline with age.",
    laypersonSummary:
      "Humanin is a mitochondria-derived peptide studied in cell and rodent models for neuroprotective and insulin-sensitizing effects; circulating levels decline with age.",
    key_studies: [
      {
        title: "Humanin: a neuroprotective peptide against Alzheimer's disease",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11606396/",
        summary:
          "Hashimoto et al. (Nature): Discovery paper identifying Humanin as a secreted peptide from surviving neurons that protects against Alzheimer's disease-related insults including amyloid-beta toxicity and familial AD gene expression.",
        evidence_level: "preclinical",
      },
      {
        title: "Humanin declines with age and is associated with age-related diseases",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25380166/",
        summary:
          "Muzumdar et al.: Demonstrates that circulating Humanin levels decline progressively with age in humans, and low levels are associated with increased cardiovascular disease risk and insulin resistance.",
        evidence_level: "emerging",
      },
      {
        title: "Exogenous Humanin improves insulin sensitivity and reduces inflammation",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22912423/",
        summary:
          "Muzumdar et al.: Exogenous Humanin administration in rodents improves insulin sensitivity, reduces hepatic glucose production, and attenuates systemic inflammation, establishing its metabolic effects.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "⚠ PRECLINICAL RESEARCH ONLY. No completed human clinical trials for exogenous administration. Endogenous peptide with well-established biology; exogenous therapeutic use remains experimental. S14G-Humanin is a more potent synthetic analog.",
    is_fda_approved: false,
    half_life_hours: 0.5,
    route_studied: "SubQ",
    interactions: {
      synergies: ["MOTS-c", "SS-31", "Epitalon"],
      cautions: [],
      contraindicated: [],
      notes: "Mechanistically complementary to MOTS-c — both are mitochondrial-derived peptides (MDPs) with overlapping but distinct signaling pathways.",
    },
    side_effects: [
      { name: "Unknown in humans", incidence: "Not established", severity: "rare", note: "No human safety data for exogenous administration" },
    ],
  }),

  p({
    name: "PE-22-28",
    aliases: ["Spadin analog", "TREK-1 blocker"],
    category: "Nootropic Peptide",
    category_icon: "🧠",
    primary_benefits: "TREK-1 inhibition studied in rodent depression models, hippocampal BDNF expression (rodent models), neuroplasticity",
    mechanism:
      "Synthetic peptide derived from spadin, a fragment of the sortilin propeptide that regulates the TREK-1 potassium channel. PE-22-28 inhibits TREK-1, a background potassium channel implicated in rodent models of depression. In rodent studies, TREK-1 inhibition by spadin and its analogs increased hippocampal BDNF expression and produced antidepressant-like effects in behavioral tests.",
    laypersonSummary:
      "PE-22-28 is a synthetic analog of spadin that inhibits the TREK-1 potassium channel; it has shown antidepressant-like effects in rodent behavioral tests but has not been studied in humans.",
    key_studies: [
      {
        title: "Spadin, a sortilin-derived peptide, targeting rodent TREK-1 channels: a new concept in the antidepressant drug design",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20142043/",
        summary:
          "Mazella et al. (PLOS Biology): Identifies spadin as a natural TREK-1 blocker with rapid antidepressant activity in rodent forced swim and tail suspension tests, matching SSRIs in efficacy with faster onset.",
        evidence_level: "preclinical",
      },
      {
        title: "PE-22-28 antidepressant effects and neuroplasticity",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/27317793/",
        summary:
          "Djillani et al.: PE-22-28, an optimized spadin analog, demonstrates superior TREK-1 inhibition, enhanced antidepressant effects in animal models, and upregulation of BDNF in hippocampus.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "⚠ PRECLINICAL RESEARCH ONLY. No human clinical trials completed. All efficacy data from rodent models. No validated human dosing, pharmacokinetics, or safety profile established.",
    is_fda_approved: false,
    half_life_hours: 1,
    route_studied: "SubQ",
    interactions: {
      synergies: ["Semax", "Selank"],
      cautions: [],
      contraindicated: [],
    },
    side_effects: [
      { name: "Unknown in humans", incidence: "Not established", severity: "rare", note: "No human safety data" },
    ],
  }),

  p({
    name: "Pinealon",
    aliases: ["EDR peptide", "Glu-Asp-Arg"],
    category: "Khavinson Peptide",
    category_icon: "🔮",
    primary_benefits: "Neuronal resistance to hypoxia (cell models), antioxidant enzyme expression (cell models), gene-expression effects in brain tissue (Khavinson-group studies)",
    mechanism:
      "Synthetic tripeptide (Glu-Asp-Arg) bioregulatory peptide developed by Khavinson's St. Petersburg Institute. Khavinson-group studies propose that it enters cell nuclei and modulates gene expression, including histone acetylation in brain tissue. In neuronal cell models it upregulated antioxidant enzymes (catalase, superoxide dismutase) and increased resistance to hypoxia.",
    laypersonSummary:
      "Pinealon is a tripeptide (Glu-Asp-Arg) from Russian bioregulatory research that has been studied in neuronal cell models for resistance to hypoxia and oxidative stress; human data are limited.",
    key_studies: [
      {
        title: "Pinealon increases resistance of neuronal cells to hypoxia",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22070069/",
        summary:
          "Khavinson et al.: Pinealon treatment increased resistance of human neuroblastoma cells to hypoxia, upregulating catalase and superoxide dismutase expression and reducing oxidative damage.",
        evidence_level: "preclinical",
      },
      {
        title: "Peptide regulation of aging via epigenetic mechanisms",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23527475/",
        summary:
          "Khavinson et al.: Review documenting the epigenetic mechanisms by which short Khavinson peptides including Pinealon modulate histone acetylation and gene expression in brain tissue to slow aging.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "Based on Russian bioregulatory research. Human safety data are limited and Western RCT validation is lacking. Not FDA-approved. Research use only. Caution: Khavinson research base has limited independent Western reproducibility.",
    is_fda_approved: false,
    half_life_hours: undefined,
    route_studied: "SubQ",
    interactions: {
      synergies: ["Epitalon", "Cortagen", "Semax"],
      cautions: [],
      contraindicated: [],
    },
    side_effects: [
      { name: "Administration-site reaction", incidence: "Rare reports", severity: "mild" },
    ],
  }),

  p({
    name: "Cortagen",
    aliases: ["Ala-Glu-Asp-Pro", "AEDP"],
    category: "Khavinson Peptide",
    category_icon: "🧬",
    primary_benefits: "Neuronal survival in a rat cortical ischemia model, cardiac gene expression in rodent ischemia models, gene-expression regulation (Khavinson-group studies)",
    mechanism:
      "Synthetic tetrapeptide (Ala-Glu-Asp-Pro) Khavinson bioregulatory peptide. Khavinson-group studies describe gene-expression effects in neural and cardiac tissue: in a rat cortical neuron ischemia model it reduced apoptosis, and in rodent ischemia models it modulated cardiac gene expression and myocardial injury markers.",
    laypersonSummary:
      "Cortagen is a Russian-developed tetrapeptide studied in rodent ischemia models of brain and heart tissue for effects on gene expression and cell survival; it has not been tested in Western clinical trials.",
    key_studies: [
      {
        title: "Cortagen: cellular and molecular mechanisms of neuroprotection",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19830544/",
        summary:
          "Khavinson et al.: Cortagen demonstrates neuroprotective effects in a rat cortical neuron ischemia model by modulating gene expression and reducing apoptosis in damaged neuronal tissue.",
        evidence_level: "preclinical",
      },
      {
        title: "Short peptide regulation of cardiac gene expression",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21877140/",
        summary:
          "Khavinson et al.: Cortagen modulates cardiac gene expression and reduces myocardial injury markers in rodent ischemia models, suggesting a cardioprotective role.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "⚠ PRECLINICAL RESEARCH ONLY. Based entirely on Khavinson group publications. No Western clinical trials. Not FDA-approved. Research only. Limited reproducibility data outside the originating research group.",
    is_fda_approved: false,
    half_life_hours: undefined,
    route_studied: "SubQ",
    interactions: {
      synergies: ["Pinealon", "Epitalon", "Semax"],
      cautions: [],
      contraindicated: [],
    },
    side_effects: [
      { name: "Administration-site reaction", incidence: "Rare reports", severity: "mild" },
    ],
  }),

  // ─── NEW PEPTIDES 2026 BATCH 3 ───


  p({
    name: "Dihexa",
    aliases: ["N-hexanoic-Tyr-Ile-(6) aminohexanoic amide", "PNB-0408"],
    category: "Neurotropic Peptide",
    category_icon: "🧠",
    primary_benefits: "Synaptogenesis via HGF/c-Met signaling (rodent and cell models), spatial learning in rodent water-maze models, angiotensin IV analog activity",
    mechanism:
      "Angiotensin IV analog developed at Washington State University. Binds hepatocyte growth factor (HGF) and potentiates its binding to the c-Met receptor, which in rodent studies was associated with increased dendritic spine density in hippocampal neurons. In rodent water-maze models it produced dose-dependent improvements in spatial learning.",
    laypersonSummary:
      "Dihexa is an angiotensin IV analog developed at Washington State University that promoted synapse formation and improved spatial learning in rodent models; it has not been tested in completed human trials.",
    key_studies: [
      {
        title: "Dihexa promotes synaptogenesis and cognitive function in rodents",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22940599/",
        summary:
          "McCoy et al. (Journal of Pharmacology & Experimental Therapeutics): Dihexa produces dose-dependent improvements in spatial learning in rodent water maze models and promotes dendritic spine density via HGF/c-Met synaptogenesis signaling.",
        evidence_level: "preclinical",
      },
      {
        title: "Angiotensin IV analogs and HGF/c-Met signaling in memory",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19427331/",
        summary:
          "Wright et al.: Establishes the mechanistic basis for angiotensin IV analog activity at HGF and c-Met, demonstrating memory-enhancing and neuroprotective downstream effects.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "⚠ PRECLINICAL RESEARCH ONLY. No completed human clinical trials. No established human safety profile. Its reported preclinical potency also raises concern for off-target effects.",
    is_fda_approved: false,
    half_life_hours: 48,
    route_studied: "Oral",
    interactions: {
      synergies: ["Semax", "Selank", "FGL Loop"],
      cautions: [],
      contraindicated: [],
    },
    side_effects: [
      { name: "Unknown in humans", incidence: "Not established", severity: "rare", note: "No human safety data" },
    ],
  }),

  p({
    name: "FOXO4-DRI",
    aliases: ["FOXO4-D-Retro-Inverso", "Senolytic peptide"],
    category: "Senolytic Peptide",
    category_icon: "⚗️",
    primary_benefits: "Selective apoptosis of senescent cells (mouse models), fur density, fitness and renal function in aged mice, senolytic research tool",
    mechanism:
      "D-retro-inverso peptide that disrupts the interaction between FOXO4 and p53 in senescent cells. In normal cells, FOXO4 retains p53 in the nucleus preventing apoptosis — a mechanism senescent cells exploit for survival. FOXO4-DRI competitively binds FOXO4, freeing p53 to migrate to mitochondria, triggering apoptosis selectively in senescent cells. In aged and chemotherapy-treated mice, this was associated with reduced senescent-cell burden and improved fur density, fitness, and renal function.",
    laypersonSummary:
      "FOXO4-DRI is an experimental peptide that disrupts the FOXO4-p53 interaction to trigger apoptosis in senescent cells. In a mouse study it improved fur density, fitness, and kidney function in aged and chemotherapy-treated animals; it has not been tested in humans.",
    key_studies: [
      {
        title: "Targeted apoptosis of senescent cells restores tissue homeostasis during chemotoxic syndromes",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/28479325/",
        summary:
          "Baar et al. (Cell): FOXO4-DRI selectively induces apoptosis in senescent cells in vivo, restoring fur density, fitness, and renal function in aged and chemotherapy-treated mice without detectable toxicity to non-senescent tissues.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "⚠ EXPERIMENTAL COMPOUND. NO HUMAN CLINICAL TRIALS. Mechanism is potent and irreversible (apoptosis induction). Selective for senescent cells in mouse models but human selectivity profiles are unknown. A transient inflammatory response from SASP release has been hypothesized during senescent-cell clearance. Human safety has not been established.",
    is_fda_approved: false,
    half_life_hours: 2,
    route_studied: "SubQ",
    interactions: {
      synergies: ["Epitalon", "NAD+"],
      cautions: [],
      contraindicated: [],
      notes: "SASP release during senescent cell clearance may transiently increase inflammation.",
    },
    side_effects: [
      { name: "SASP inflammatory response", incidence: "Unknown in humans", severity: "moderate", note: "Hypothesized cytokine release from senescent cells; not characterized in humans" },
      { name: "Unknown off-target apoptosis", incidence: "Unknown", severity: "rare", note: "Selective for senescent cells in mouse models; human selectivity uncharacterized" },
    ],
  }),

  p({
    name: "Klotho",
    aliases: ["Alpha-Klotho", "KL", "Soluble Klotho", "Klotho protein fragment"],
    category: "Anti-Aging Protein",
    category_icon: "⏳",
    primary_benefits: "Cognitive performance in aged mice and nonhuman primates (single-administration study), FGF23 co-receptor and phosphate regulation, low serum levels associated with cognitive decline (human cohort)",
    mechanism:
      "Klotho is a type-I transmembrane aging-suppressor protein expressed primarily in kidney tubular cells and brain choroid plexus. Cleaved extracellularly to generate soluble Klotho, which circulates systemically and acts as a co-receptor for FGF23, regulating phosphate and vitamin D metabolism. Also directly inhibits IGF-1 and Wnt signaling pathways that drive cellular senescence. Circulating Klotho declines with age. In one study, a single systemic administration of soluble Klotho enhanced cognitive performance in aged mice and nonhuman primates.",
    laypersonSummary:
      "Klotho is an aging-associated protein whose circulating levels decline with age. In one study, a single administration of soluble Klotho enhanced cognitive performance in aged mice and nonhuman primates; it has not been tested in human trials for these uses.",
    key_studies: [
      {
        title: "Soluble Klotho and cognition in aged nonhuman primates and mice",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35594855/",
        summary:
          "Castner et al. (Nature Aging): A single systemic injection of soluble Klotho protein significantly enhanced cognitive performance in aged nonhuman primates and mice, restoring working memory and synaptic plasticity to young-adult levels.",
        evidence_level: "preclinical",
      },
      {
        title: "Low circulating Klotho is associated with cognitive decline and dementia",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/26673063/",
        summary:
          "Semba et al.: Lower serum Klotho levels in community-dwelling adults are significantly associated with faster cognitive decline and increased dementia risk over longitudinal follow-up.",
        evidence_level: "emerging",
      },
    ],
    safety_notes:
      "⚠ EARLY-STAGE EXPERIMENTAL. Recombinant Klotho protein administration has not entered human clinical trials for anti-aging or cognitive enhancement. Klotho is a large protein (~130 kDa), not a classical peptide — its formulation, stability, and route of administration are complex. Research only.",
    is_fda_approved: false,
    half_life_hours: 8,
    route_studied: "IV",
    interactions: {
      synergies: ["MOTS-c", "Humanin", "NAD+"],
      cautions: [],
      contraindicated: [],
    },
    side_effects: [
      { name: "Unknown in humans", incidence: "Not established", severity: "rare", note: "No human clinical data available" },
    ],
  }),

  p({
    name: "OS-01",
    aliases: ["OneSkin OS-01 peptide", "p53-activating peptide"],
    category: "Cosmetic Peptide",
    category_icon: "✨",
    primary_benefits: "Senescence markers (p21, p16) in human skin explants, skin barrier function, epigenetic skin-age measures (developer's 12-week study)",
    mechanism:
      "Proprietary 8-amino acid peptide developed by OneSkin Technologies. In human skin explant and skin-cell studies it reduced markers of cellular senescence (p21, p16) in keratinocytes and fibroblasts and improved barrier function. Applied topically — NOT for injection. The developer's peer-reviewed 12-week study reported a lower skin biological age by methylation-clock analysis.",
    laypersonSummary:
      "OS-01 is a topical cosmetic peptide developed by OneSkin; in the developer's published study it reduced skin senescence markers and lowered epigenetic skin-age estimates. For topical use only — not injectable.",
    key_studies: [
      {
        title: "OS-01 reduces senescence markers and reverses skin biological aging",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36380323/",
        summary:
          "Zonari et al. (NPJ Aging): OS-01 peptide significantly reduces p21 and p16 senescence markers in human skin explants, improves barrier function, and lowered estimated skin biological age by 2.5 years as measured by the Horvath methylation clock in a 12-week developer-run study.",
        evidence_level: "moderate",
      },
    ],
    safety_notes:
      "TOPICAL USE ONLY. Not for injection. This is a cosmetic/skincare peptide in a topical formulation — not a research injectable. Available commercially via OneSkin (oneskin.co). Generally well tolerated topically. Not FDA-approved as a drug.",
    is_fda_approved: false,
    half_life_hours: undefined,
    route_studied: "Topical",
    interactions: {
      synergies: ["GHK-Cu", "Argireline"],
      cautions: [],
      contraindicated: [],
    },
    outcomes_timeline: {
      month_2_3: "Developer-run topical study: lower epigenetic skin-age estimates and reduced senescence markers in skin explants were reported; not independently replicated",
    },
    side_effects: [
      { name: "Mild skin sensitivity", incidence: "Rare reports", severity: "mild" },
    ],
    lastReviewed: "2026-05-07",
  }),

  p({
    name: "Synapsin",
    aliases: ["Intranasal Synapsin", "RG3 + NAD+ compound"],
    category: "Nootropic Peptide",
    category_icon: "🧠",
    primary_benefits: "Neuroprotective effects of the ginsenoside Rg3 component (preclinical models), NF-kB and BDNF signaling (Rg3, preclinical), compounded intranasal formulation (Rg3 + NAD+)",
    mechanism:
      "Compounded intranasal formulation (not a single peptide) combining Rg3 (ginsenoside), NAD+, and additional compounds. In preclinical models, Rg3 modulated NMDA receptor activity, inhibited NF-kB-mediated neuroinflammation, and increased BDNF expression. NAD+ is a cofactor in mitochondrial metabolism and sirtuin activity. Intranasal delivery is proposed to bypass the blood-brain barrier. The blend itself has not been evaluated in clinical trials.",
    laypersonSummary:
      "Synapsin is a compounded intranasal formulation combining ginsenoside Rg3 and NAD+, not a single peptide. Its components have been studied in preclinical models, but the blend has not been tested in clinical trials.",
    key_studies: [
      {
        title: "Ginsenoside Rg3 neuroprotective and anti-neuroinflammatory effects",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/30249052/",
        summary:
          "Comprehensive review demonstrating Rg3's neuroprotective effects including NMDA modulation, NF-kB inhibition, BDNF upregulation, and protection against amyloid-beta toxicity in multiple preclinical models.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "Research only. Compounded intranasal formulation — individual components (Rg3, NAD+) have some published safety data but the specific compound blend lacks clinical trial validation. Not FDA-approved.",
    is_fda_approved: false,
    half_life_hours: undefined,
    route_studied: "Nasal",
    interactions: {
      synergies: ["Semax", "Selank", "Dihexa", "NAD+"],
      cautions: [],
      contraindicated: [],
    },
    side_effects: [
      { name: "Nasal irritation", incidence: "Frequency not established", severity: "mild" },
      { name: "Mild headache", incidence: "Frequency not established", severity: "mild" },
    ],
  }),

  p({
    name: "FGL Loop",
    aliases: ["NCAM FGL peptide", "Fibroblast Growth Factor Loop", "FGL"],
    category: "Neurotropic Peptide",
    category_icon: "🔗",
    primary_benefits: "Long-term potentiation and spatial learning (rodent models), NCAM-mimetic FGFR signaling, neuroprotection in animal models of aging",
    mechanism:
      "Synthetic peptide derived from the fibronectin type III (F3) module of Neural Cell Adhesion Molecule (NCAM). Mimics the homophilic binding of NCAM, activating FGFR (fibroblast growth factor receptor) signaling downstream. In hippocampal slices and rodent models it enhanced long-term potentiation (LTP) and spatial learning; reviews also describe neuroprotective effects in animal models of aging.",
    laypersonSummary:
      "FGL is a synthetic peptide derived from the neural cell adhesion molecule (NCAM) that activates FGF receptor signaling; it has been studied in rodent models for effects on synaptic plasticity and spatial learning.",
    key_studies: [
      {
        title: "FGL peptide promotes synaptogenesis and memory via NCAM/FGFR signaling",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15917452/",
        summary:
          "Cambon et al.: FGL peptide enhances LTP in hippocampal slices and improves spatial learning in rodents via FGFR-dependent synaptogenesis, supporting further study of NCAM-mimetic peptides.",
        evidence_level: "preclinical",
      },
      {
        title: "NCAM mimetics as neuroprotective agents in aging and neurodegeneration",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20398623/",
        summary:
          "Review of NCAM-derived peptides including FGL, documenting their capacity to promote synaptogenesis, neuroprotection, and memory retention in animal models of aging and neurodegeneration.",
        evidence_level: "preclinical",
      },
    ],
    safety_notes:
      "⚠ PRECLINICAL RESEARCH ONLY. No completed human clinical trials. All data from rodent models. No established human pharmacokinetics or safety profile. Research use only.",
    is_fda_approved: false,
    half_life_hours: undefined,
    route_studied: "SubQ",
    interactions: {
      synergies: ["Dihexa", "Semax"],
      cautions: [],
      contraindicated: [],
    },
    side_effects: [
      { name: "Unknown in humans", incidence: "Not established", severity: "rare", note: "No human safety data" },
    ],
  }),
];

export function getPeptideBySlug(slug: string): Peptide | undefined {
  return peptides.find((p) => p.slug === slug);
}

export function getPeptideByName(name: string): Peptide | undefined {
  const q = name.toLowerCase().replace(/ *\(.*\)/, "");
  return peptides.find(
    (p) =>
      p.name.toLowerCase() === name.toLowerCase() ||
      p.name.toLowerCase().includes(q),
  );
}

export function searchPeptides(query: string): Peptide[] {
  const normalize = (s: string) => s.toLowerCase().replace(/[-\s]+/g, "");
  const q = normalize(query);
  const qRaw = query.toLowerCase();
  return peptides.filter(
    (p) =>
      normalize(p.name).includes(q) ||
      p.name.toLowerCase().includes(qRaw) ||
      p.category.toLowerCase().includes(qRaw) ||
      p.aliases.some(
        (a) => normalize(a).includes(q) || a.toLowerCase().includes(qRaw),
      ) ||
      p.primary_benefits.toLowerCase().includes(qRaw),
  );
}
