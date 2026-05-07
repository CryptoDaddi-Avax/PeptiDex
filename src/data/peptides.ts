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
    primary_benefits: "Fat loss without GH side effects",
    mechanism:
      "Mimics GH fat-burning domain. Stimulates lipolysis and inhibits lipogenesis by acting on beta-3 adrenergic receptors in fat tissue, without binding to the GH receptor.",
    laypersonSummary:
      "AOD-9604 is a synthetic fragment of human growth hormone studied for its ability to burn fat without the blood sugar or growth side effects of full GH.",
    key_studies: [
      {
        title: "AOD-9604 lipolysis stimulation in preclinical models",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/11146367/",
        summary:
          "Ng et al. demonstrate AOD-9604 stimulates lipolysis and inhibits lipogenesis in adipose tissue without affecting IGF-1 or glucose tolerance.",
        evidence_level: "preclinical",
      },
      {
        title: "AOD-9604 clinical safety   six randomized controlled trials",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19268492/",
        summary:
          "Heffernan et al.: Pooled analysis of 6 RCTs showing AOD-9604 is well-tolerated with a safety profile similar to placebo despite limited efficacy signals.",
        evidence_level: "moderate",
      },
      {
        title: "AOD-9604 Phase IIb trial   short-term fat reduction",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/15655039/",
        summary:
          "12-week Phase IIb trial: 1mg/day AOD-9604 produced 2.6 kg weight loss vs 0.8 kg placebo, with reductions in abdominal fat and improved lipid profiles.",
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
                summary: "A 2003 bibliography documented ongoing clinical trial data for numerous pharmacological compounds, including AOD-9604 and exenatide, utilizing the Prous Science Integrity database. The publication provided a comprehensive reference guide for recent drug discovery and development efforts across various therapeutic categories.",
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
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [300, 300],
      frequency: "7x/wk",
      cycle_weeks: [12, 12],
      timing: "Morning fasted",
      reconstitution_ml: 2.5,
      typical_vial_mg: 5,
      notes: "Take on empty stomach. No effect on blood sugar or IGF-1.",
    },
    interactions: {
      synergies: ["MOTS-c", "Semaglutide"],
      cautions: [],
      contraindicated: [],
      notes:
        "Can be combined with other fat-loss peptides for multi-pathway approach.",
    },
    outcomes_timeline: {
      week_2_4: "Early lipolysis effects, especially in abdominal area",
      month_2_3:
        "Noticeable fat reduction in visceral stores; improved metabolic markers",
      long_term:
        "Sustained fat loss; may preserve muscle mass better than caloric restriction alone",
    },
    side_effects: [
      {
        name: "Injection site reaction",
        incidence: "~5% of users",
        severity: "mild",
      },
      { name: "Mild nausea", incidence: "~3% of users", severity: "mild" },
    ],
  }),

  // ─── MITOCHONDRIAL ───,
  p({
    name: "BPC-157",
    aliases: ["Body Protection Compound-157", "PL 14736"],
    category: "Body Protective Compound",
    category_icon: "\u{1F6E1}\uFE0F",
    primary_benefits:
      "Injury recovery, gut healing, tissue repair, reduced inflammation",
    mechanism:
      "Promotes angiogenesis, collagen deposition, and modulates growth factors for accelerated healing. Acts on multiple repair pathways simultaneously including tendon, ligament, muscle, gut lining, and nerve tissue.",
    laypersonSummary:
      "BPC-157 is a synthetic peptide derived from a protein found in gastric juice, studied in animal research for accelerating injury recovery and gut tissue repair.",
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
          "Stable gastric pentadecapeptide BPC 157   gastrointestinal tract healing",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22300085/",
        summary:
          "Robert et al. demonstrate BPC-157 heals GI ulcers, fistulas, and inflammatory bowel lesions in rats via cytoprotective pathways. Published in Current Pharmaceutical Design.",
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
        title: "BPC-157 and neuroprotection: stroke and spinal cord models",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20225319/",
        summary:
          "Preclinical evidence showing BPC-157 counteracts stroke-induced neuronal damage and improves functional recovery after spinal cord compression in rats.",
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
      "Excellent research safety profile; commonly used for recovery. Not FDA-approved. Most evidence from animal models. FDA restricted use in compounded medications in Sept 2023.",
    half_life_hours: 4,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [250, 500],
      frequency: "7x/wk",
      cycle_weeks: [4, 8],
      timing: "Morning or split AM/PM",
      reconstitution_ml: 2.5,
      typical_vial_mg: 5,
      notes:
        "Often run 250mcg 2x/day for injuries. Can be injected near injury site.",
    },
    interactions: {
      synergies: ["TB-500", "GHK-Cu", "KPV"],
      cautions: [],
      contraindicated: [],
      notes:
        "BPC-157 + TB-500 is the most popular healing stack. Synergistic tissue repair.",
    },
    outcomes_timeline: {
      week_1:
        "Reduced pain/inflammation at injury site; improved GI comfort if used for gut healing",
      week_2_4:
        "Noticeable mobility improvement; significant reduction in injury-site swelling",
      month_2_3:
        "Substantial tissue remodeling; most acute injuries showing measurable repair",
      long_term:
        "Full tendon/ligament functional recovery in most preclinical models; sustained GI remission",
    },
    side_effects: [
      { name: "Lightheadedness", incidence: "~5% of users", severity: "mild" },
      {
        name: "Nausea (especially oral route)",
        incidence: "~3-5% of users",
        severity: "mild",
      },
      { name: "Vivid dreams", incidence: "~5% of users", severity: "mild" },
      {
        name: "Euphoria / mood lift",
        incidence: "~8% of users",
        severity: "mild",
        note: "Often not considered adverse; may reflect CNS activity",
      },
    ],
  }),

  // ─── THYMOSIN ───,
  p({
    name: "Cagrilintide",
    aliases: ["NN9838", "AM833"],
    category: "Metabolic",
    category_icon: "\u{2696}\uFE0F",
    primary_benefits: "Weight loss, appetite reduction, glycemic control",
    mechanism:
      "Long-acting amylin analog that activates amylin receptors in the area postrema and hypothalamus to reduce appetite, slow gastric emptying, and suppress post-meal glucagon secretion. Works on a distinct pathway from GLP-1 agonists, making it ideal for combination therapy.",
    laypersonSummary:
      "Cagrilintide is a long-acting amylin analog investigated for weight loss, studied in Phase 2 trials for achieving over 10% body weight reduction when combined with semaglutide.",
    key_studies: [
      {
        title: "Cagrilintide Phase 2 trial for weight management",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34706170/",
        summary:
          "Lau et al. (Lancet): Phase 2 RCT showing cagrilintide 4.5mg weekly achieved 10.8% weight loss vs 3.0% placebo at 26 weeks, with acceptable safety profile.",
        evidence_level: "strong",
      },
      {
        title: "CagriSema (cagrilintide + semaglutide) Phase 2 results",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37385275/",
        summary:
          "Frias et al. (Lancet): CagriSema combination achieved 15.6% weight loss at 32 weeks in type 2 diabetes patients — superior to either agent alone.",
        evidence_level: "strong",
      },
      {
        title: "Amylin analogs in obesity management: mechanism review",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35150361/",
        summary:
          "Review of amylin's role in energy homeostasis and why dual amylin-calcitonin receptor agonists like cagrilintide represent a new weight loss mechanism distinct from GLP-1.",
        evidence_level: "moderate",
      },
        {
                title: "Efficacy and safety of co-administered cagrilintide and semaglutide versus semaglutide alone in adults with overweight or obesity with or without type 2 diabetes in Japan and Taiwan (REDEFINE 5): a multicentre, randomised, active-controlled, phase 3a trial.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42009015/",
                summary: "A 2026 randomized controlled trial demonstrated that co-administering cagrilintide and semaglutide resulted in a significantly greater bodyweight reduction (-18.4%) compared to semaglutide alone (-11.9%) over 68 weeks in East Asian adults with overweight or obesity.",
                evidence_level: "very-strong"
            },
        {
                title: "Obesity pharmacotherapy reimagined: The era of multi-receptor agonists and next-generation metabolic modulators, perspectives and controversies.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41948476/",
                summary: "Next-generation multi-receptor agonists and amylin analogs demonstrated weight reductions of up to 24% and improved metabolic outcomes beyond traditional GLP-1 therapies. A 2026 review investigated these emerging treatments, highlighting a shift toward integrated neuroendocrine and body-composition-focused disease modification.",
                evidence_level: "emerging"
            },
        {
                title: "Childhood obesity and cardiac risk in youth: Emerging challenges toward 2050.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41933725/",
                summary: "A 2026 review found that childhood obesity significantly increases cardiovascular risks, and demonstrated that emerging therapies like retatrutide and oral GLP-1 agents are currently under clinical evaluation to improve weight management adherence.",
                evidence_level: "emerging"
            },
        {
                title: "New Drugs on the Block: Dietary Management and Nutritional Considerations During the Use of Anti-Obesity Medication.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41901137/",
                summary: "Structured, mechanism-based nutritional counseling may mitigate gastrointestinal adverse events and improve adherence in patients using incretin-based anti-obesity medications, a 2026 review found. The researchers provided a pragmatic framework combining pharmacology with clinical nutrition to optimize tolerability and patient outcomes.",
                evidence_level: "emerging"
            },
        {
                title: "Mitochondrial Adaptations in Skeletal Muscle Following Incretin-Based Therapies: In Vitro.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41852165/",
                summary: "A 2026 in vitro study found that tirzepatide promoted sustained improvements in skeletal muscle mitochondrial respiration under both healthy and lipotoxic conditions. In contrast, semaglutide and cagrilintide demonstrated transient reductions in mitochondrial function that resolved after five days.",
                evidence_level: "preclinical"
            },
        {
                title: "Efficacy and Safety of Cagrilintide and Cagrisema Versus Semaglutide as Anti-Obesity Medications: A Systematic Review, Meta-Analysis and Meta-Regression.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41834765/",
                summary: "A 2026 meta-analysis demonstrated that Cagrisema produced significantly greater weight loss than semaglutide, while cagrilintide monotherapy yielded comparable results. The study found the combination therapy offered superior efficacy with a similar overall safety profile, despite slightly higher rates of nausea.",
                evidence_level: "very-strong"
            },
        {
                title: "CagriSema Versus Semaglutide Monotherapy or Placebo for Obesity: A Systematic Review and Meta-Analysis of Randomized Controlled Trials with GRADE Assessment.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41759565/",
                summary: "A 2026 meta-analysis found that CagriSema demonstrated superior reductions in body weight, waist circumference, and systolic blood pressure compared to semaglutide monotherapy or placebo. However, the dual therapy was also associated with a higher frequency of gastrointestinal adverse events.",
                evidence_level: "very-strong"
            },
        {
                title: "Long-acting amylin-related peptides as therapies for obesity and type 2 diabetes.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41747885/",
                summary: "A 2026 review found that second-generation long-acting amylin receptor agonists, including cagrilintide, demonstrate significant efficacy in clinical trials investigating obesity and type 2 diabetes. These peptides were shown to induce satiety and promote weight loss, particularly alongside GLP-1 receptor agonists.",
                evidence_level: "emerging"
            },
        {
                title: "In vitro metabolic profiling of weight-loss-inducing amylin receptor agonists in the context of preventive doping research.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41702251/",
                summary: "A 2026 preclinical study demonstrated that the amylin receptor agonists pramlintide, cagrilintide, and KBP-066 undergo N- and C-terminal degradation to yield stable metabolites. These findings established a validated LC-MS/MS detection approach for monitoring these peptides in anti-doping programs.",
                evidence_level: "preclinical"
            },
        {
                title: "Bariatric Surgery in the Era of GLP1RA: A Narrative Review.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41627368/",
                summary: "A 2026 review found that bariatric surgery remains a crucial obesity intervention alongside GLP-1 receptor agonists. Researchers demonstrated that real-world limitations of pharmacotherapy, including cost and tolerability, necessitate the continued integration of surgical strategies for sustainable weight management.",
                evidence_level: "emerging"
            },
        {
                title: "Amylin Revisited: A 5-Year Perspective on Its Emerging Role in the Treatment of Diabesity.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41549439/",
                summary: "Clinical studies demonstrated that amylin analogs improved glycemic control and induced weight loss in individuals with diabetes and obesity, according to a 2026 review. The review found that combining these peptides with GLP-1 receptor agonists yielded synergistic weight loss exceeding 15%.",
                evidence_level: "strong"
            },
        {
                title: "Diabetes Mellitus and Chronic Kidney Disease: The Future Is Being Surpassed.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41375628/",
                summary: "Novel peptide agents, including tirzepatide, survodutide, and retatrutide, are being investigated as additions to standard therapies for managing diabetes and chronic kidney disease. A 2025 review highlighted these emerging treatments aimed at slowing renal disease progression and reducing cardiovascular risk.",
                evidence_level: "emerging"
            },
        {
                title: "Amylin receptors as therapeutic targets in obesity: Emerging peptide-based strategies.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41344603/",
                summary: "A 2026 review found that peptide-based amylin receptor agonists demonstrate enhanced pharmacokinetics, synergy with GLP-1 agonists, and favorable impacts on weight regulation. These agents are being investigated for potential disease-modifying effects beyond standard weight loss.",
                evidence_level: "emerging"
            },
        {
                title: "Nutritional Challenges in Post-Massive Weight Loss Body Contouring: Guidance for Plastic Surgeons on GLP-1 Agonists and Sleeve Gastrectomy.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41329155/",
                summary: "A 2025 review found that GLP-1 receptor agonists can exacerbate protein and micronutrient deficiencies in post-bariatric patients undergoing body contouring surgery. Researchers emphasized that tailored perioperative nutritional optimization is necessary to mitigate impaired wound healing risks.",
                evidence_level: "emerging"
            },
        {
                title: "CagriSema Reduces Blood Pressure in Adults With Overweight or Obesity: REDEFINE 1.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41328546/",
                summary: "A 2026 Phase III randomized controlled trial demonstrated that CagriSema (semaglutide and cagrilintide) significantly reduced systolic and diastolic blood pressure compared to placebo in adults with overweight or obesity. The study found that 63% of treated participants reached blood pressure targets at 68 weeks.",
                evidence_level: "very-strong"
            },
        {
                title: "Synthetic target trial emulation and predictive modeling of amylin-pathway therapies for obesity and type 2 diabetes.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41255585/",
                summary: "CagriSema demonstrated superiority over subcutaneous amycretin in a 2025 meta-analysis of seven randomized controlled trials, which also identified an optimal 10-20 mg therapeutic window for amycretin to balance efficacy and tolerability.",
                evidence_level: "very-strong"
            },
        {
                title: "Amylin and the renin-angiotensin system: risk or opportunity in amylin-based therapy?",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41207308/",
                summary: "A 2026 review hypothesized that combining amylin-based therapies with renin-angiotensin system (RAS) inhibitors redirects amylin-induced RAS activation toward a protective alternative pathway. Researchers proposed this mechanism to explain the substantial blood pressure reductions observed in recent clinical trials.",
                evidence_level: "emerging"
            }
    ],
    safety_notes:
      "Generally well-tolerated in Phase 2 trials. Main side effects are GI-related (nausea, vomiting). Novo Nordisk is developing CagriSema (cagrilintide + semaglutide) as next-gen obesity treatment. Research-only peptide.",
    half_life_hours: 168,
    is_fda_approved: false,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [500, 4500],
      frequency: "Weekly",
      cycle_weeks: [12, 24],
      timing: "Any time, consistent day",
      notes:
        "Clinical trial doses: 0.3-4.5mg weekly with dose escalation over 4-8 weeks. Start low (0.3-0.6mg) and increase every 4 weeks to minimize GI side effects.",
    },
    interactions: {
      synergies: ["Semaglutide", "Tirzepatide", "MOTS-c"],
      cautions: ["Retatrutide"],
      contraindicated: [],
      notes:
        "CagriSema (cagrilintide + semaglutide) is the most promising combination — dual amylin + GLP-1 agonism for superior weight loss. Do not stack with Retatrutide (too much receptor overlap).",
    },
    outcomes_timeline: {
      week_1: "Appetite suppression begins; reduced food cravings",
      week_2_4:
        "Measurable weight loss (1-2 lbs/week); improved meal portion control",
      month_2_3:
        "10-11% body weight loss at clinical doses; improved glycemic markers",
      long_term:
        "Clinical trials show sustained weight loss through 26+ weeks; CagriSema in Phase 3 trials",
    },
    side_effects: [
      {
        name: "Nausea",
        incidence: "~25% of users",
        severity: "moderate",
        note: "Most common during dose escalation; typically resolves in 2-4 weeks",
      },
      { name: "Diarrhea", incidence: "~10% of users", severity: "mild" },
      { name: "Vomiting", incidence: "~8% of users", severity: "moderate" },
      {
        name: "Injection site reaction",
        incidence: "~5% of users",
        severity: "mild",
      },
      { name: "Constipation", incidence: "~8% of users", severity: "mild" },
    ],
  }),
  p({
    name: "CJC-1295",
    aliases: ["CJC-1295 DAC", "Mod GRF 1-29"],
    category: "GHRH Analog",
    category_icon: "\u{1F489}",
    primary_benefits: "Muscle growth, fat loss, recovery",
    mechanism:
      "Stimulates prolonged GH and IGF-1 release by mimicking the body's natural GHRH signal to the pituitary gland. Preserves natural pulsatile GH release pattern.",
    laypersonSummary:
      "CJC-1295 is a synthetic growth-hormone-releasing hormone analog studied for its ability to sustainably elevate GH and IGF-1, supporting muscle growth and fat loss.",
    key_studies: [
      {
        title: "CJC-1295 GH/IGF-1 elevation in humans",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16352683/",
        summary:
          "Teichman et al. (J. Clin. Endocrinol. Metab.): Single injection increases GH 2-10x for 6+ days and IGF-1 1.5-3x for 9-11 days in healthy adults. Well-tolerated at 30-60 µg/kg.",
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
      "Often stacked with Ipamorelin; injection site reactions possible. Not FDA-approved.",
    half_life_hours: 168,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [1000, 1000],
      frequency: "3x/week",
      cycle_weeks: [8, 8],
      timing: "Pre-bed or morning fasted",
      reconstitution_ml: 2.5,
      typical_vial_mg: 10,
      notes:
        "CJC-1295 DAC version has 7-day half-life. Mod GRF 1-29 (no DAC) has ~30min half-life.",
    },
    interactions: {
      synergies: ["Ipamorelin", "Sermorelin", "Tesamorelin"],
      cautions: ["Semaglutide"],
      contraindicated: [],
      notes: "CJC-1295 + Ipamorelin is the most popular GH secretagogue stack.",
    },
    outcomes_timeline: {
      week_1:
        "Improved sleep depth; occasional GH flush sensation; increased hunger in morning",
      week_2_4:
        "Elevated energy and faster post-workout recovery; mild water retention",
      month_2_3:
        "Measurable lean mass improvements; visible fat redistribution; IGF-1 elevation confirmed on bloodwork",
      long_term:
        "Sustained GH axis support; anti-aging body composition benefits; improved bone density over 6+ months",
    },
    side_effects: [
      {
        name: "Water retention",
        incidence: "~15% of users",
        severity: "mild",
        note: "Usually resolves after first 2-4 weeks",
      },
      {
        name: "Headache / GH flush",
        incidence: "~8% of users",
        severity: "mild",
      },
      {
        name: "Injection site reaction",
        incidence: "~5% of users",
        severity: "mild",
      },
      {
        name: "Temporary fatigue",
        incidence: "~5% of users",
        severity: "mild",
      },
    ],
  }),
  p({
    name: "DSIP",
    aliases: ["Delta Sleep-Inducing Peptide"],
    category: "Sleep Peptide",
    category_icon: "\u{1F4A4}",
    primary_benefits: "Improved sleep quality, stress reduction",
    mechanism:
      "Modulates sleep-wake cycle. Promotes delta-wave (deep) sleep phases. Interacts with GABA, serotonin, and opioid pathways.",
    laypersonSummary:
      "DSIP (Delta Sleep-Inducing Peptide) is a naturally occurring neuropeptide studied for improving deep sleep quality and reducing nighttime awakenings in people with chronic insomnia.",
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
                title: "Sensing the Bactericidal and Bacteriostatic Antimicrobial Mode of Action Using Raman Deuterium Stable Isotope Probing (DSIP) in Escherichia coli.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38854576/",
                summary: "A 2024 study demonstrated that Raman deuterium stable isotope probing can successfully discriminate between bactericidal and bacteriostatic antibiotic modes of action in Escherichia coli. Researchers found that changes in the C-D band intensity serve as a quantifiable marker for early identification of antimicrobial activity.",
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
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [100, 100],
      frequency: "7x/wk",
      cycle_weeks: [4, 4],
      timing: "30 min before bed",
      reconstitution_ml: 2.5,
      typical_vial_mg: 5,
      notes:
        "Very short half-life. Take immediately before sleep. Cycle to avoid tolerance.",
    },
    interactions: {
      synergies: ["Ipamorelin", "Selank", "Epitalon"],
      cautions: [],
      contraindicated: [],
      notes:
        "DSIP + Ipamorelin taken pre-bed maximizes sleep-phase GH release.",
    },
    outcomes_timeline: {
      week_1: "Improved sleep onset and delta-wave sleep depth",
      week_2_4:
        "More restful sleep; potential pain modulation via opioid pathways",
      month_2_3:
        "Circadian rhythm stabilization; stress resilience improvement",
      long_term:
        "Effects require cycling; cumulative normalization of sleep architecture",
    },
    side_effects: [
      { name: "Headache", incidence: "~3% of users", severity: "mild" },
      {
        name: "Morning grogginess (wrong timing)",
        incidence: "~5% of users",
        severity: "mild",
        note: "Take 30 min before sleep, not earlier",
      },
    ],
  }),

  // ─── NEW ───,
  p({
    name: "Epitalon",
    aliases: ["Epithalon", "AEDG peptide"],
    category: "Telomerase Activator",
    category_icon: "\u{1F9EC}",
    primary_benefits: "Anti-aging, longevity, sleep",
    mechanism:
      "Lengthens telomeres via telomerase activation. May also regulate melatonin production and circadian rhythm, and modulate antioxidant enzyme activity.",
    laypersonSummary:
      "Epitalon is a synthetic tetrapeptide studied for anti-aging effects, investigated for activating telomerase to lengthen telomeres and potentially extend cellular lifespan.",
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
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [1000, 1000],
      frequency: "7x/wk",
      cycle_weeks: [4, 4],
      timing: "Any time",
      reconstitution_ml: 2.5,
      typical_vial_mg: 10,
      notes:
        "Common protocol: 10mg/day for 20 days. Repeat 2-3x/year. Short cycles only.",
    },
    interactions: {
      synergies: ["GHK-Cu", "MOTS-c", "SS-31"],
      cautions: [],
      contraindicated: [],
      notes: "Epitalon + GHK-Cu is a popular longevity/anti-aging stack.",
    },
    outcomes_timeline: {
      week_2_4: "Improved sleep quality and circadian rhythm normalization",
      month_2_3:
        "Antioxidant enzyme upregulation; potential telomere lengthening",
      long_term:
        "Anti-aging effects; melatonin regulation; potential lifespan extension (animal data)",
    },
    side_effects: [
      {
        name: "Generally very well-tolerated",
        incidence: "Based on Russian clinical research",
        severity: "mild",
      },
      { name: "Mild fatigue", incidence: "~3% of users", severity: "mild" },
    ],
  }),

  // ─── IMMUNE ───,
  p({
    name: "Follistatin-344",
    aliases: ["FS-344"],
    category: "Myostatin Inhibitor",
    category_icon: "\u{1F4AA}",
    primary_benefits: "Muscle hypertrophy, strength",
    mechanism:
      "Blocks myostatin (the body's muscle growth limiter) and activin, allowing enhanced muscle development and regeneration beyond normal physiological limits.",
    laypersonSummary:
      "Follistatin-344 is a naturally occurring protein studied for its ability to block myostatin, the body's built-in muscle growth limiter, enabling significantly enhanced muscle development.",
    key_studies: [
      {
        title: "Follistatin gene therapy increases muscle mass and strength",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19208403/",
        summary:
          "Rodino-Klapac et al. (Mol. Ther.): AAV-delivered follistatin 344 increases muscle mass and fiber diameter across multiple animal species without adverse reproductive or endocrine effects.",
        evidence_level: "preclinical",
      },
      {
        title: "Follistatin as myostatin antagonist   therapeutic potential",
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
      "Research-only. Potent effects   potential for unregulated growth. Limited human safety data. Phase I gene therapy trials show safety.",
    half_life_hours: 6,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [100, 100],
      frequency: "7x/wk",
      cycle_weeks: [4, 4],
      timing: "Post-workout or morning",
      reconstitution_ml: 2.5,
      typical_vial_mg: 1,
      notes:
        "Very short cycles. 100mcg/day common. Acts via myostatin/activin inhibition   effects compound over days.",
    },
    interactions: {
      synergies: ["IGF-1 LR3", "CJC-1295", "Ipamorelin"],
      cautions: [],
      contraindicated: [],
      notes:
        "Follistatin + IGF-1 LR3 for maximum growth (hyperplasia + myostatin block). Advanced only.",
    },
    outcomes_timeline: {
      week_2_4: "Initial myostatin inhibition; muscle fullness and pumps",
      month_2_3: "Measurable lean mass increase; strength gains",
      long_term:
        "Very limited long-term human data; Phase I gene therapy shows safety",
    },
    side_effects: [
      {
        name: "Limited human safety data",
        incidence: "Investigational only",
        severity: "mild",
      },
      {
        name: "Injection site reaction",
        incidence: "~5% of users",
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
    primary_benefits: "Skin repair, anti-aging, wound healing",
    mechanism:
      "Copper delivery for collagen/elastin synthesis. Activates tissue remodeling, attracts immune cells to injury sites. Levels decline significantly with age.",
    laypersonSummary:
      "GHK-Cu is a naturally occurring copper peptide studied for stimulating collagen production, accelerating wound healing, and reversing visible signs of skin aging.",
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
          "Pickart et al. show GHK-Cu regulates expression of 4,000+ human genes, shifting patterns from diseased to healthy states   applicable to COPD, cancer, and aging.",
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
                summary: "A 2026 review found that nine therapeutic peptides, including tirzepatide, epitalon, and BPC-157, target diverse aging hallmarks such as metabolic dysfunction and tissue repair. While FDA-approved agents demonstrated robust safety, investigational peptides require further clinical validation to establish long-term efficacy.",
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
      "Topical or injectable; low risk. Long history of safe topical use in cosmetics.",
    half_life_hours: 0.5,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [2000, 2000],
      frequency: "7x/wk",
      cycle_weeks: [8, 8],
      timing: "Any time",
      reconstitution_ml: 2.5,
      typical_vial_mg: 50,
      notes:
        "Also available topically in serums/creams. Injectable provides systemic effects. Often injected near wound sites.",
    },
    interactions: {
      synergies: ["BPC-157", "TB-500", "Epitalon"],
      cautions: [],
      contraindicated: [],
      notes:
        "GHK-Cu + BPC-157 + TB-500 is the ultimate healing/anti-aging combo.",
    },
    outcomes_timeline: {
      week_2_4:
        "Improved skin texture and elasticity (topical); wound healing acceleration",
      month_2_3:
        "Visible collagen synthesis; skin tightening; improved scar appearance",
      long_term:
        "Progressive anti-aging effects; hair follicle stimulation with consistent use",
    },
    side_effects: [
      {
        name: "Skin irritation (topical)",
        incidence: "~5% of users",
        severity: "mild",
      },
      {
        name: "Transient skin flushing",
        incidence: "~8% of users",
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
      "Strongest GH release of standard GHRPs, muscle growth, anti-aging, recovery",
    mechanism:
      "Synthetic hexapeptide GH secretagogue acting on the GHSR1a receptor. GHRP-2 produces the most potent GH release among standard GHRPs (stronger than GHRP-6 or Ipamorelin) but with moderate increases in cortisol and prolactin. Approved in Japan as a diagnostic tool for GH deficiency (trade name: Pralmorelin/GHRP Kaken).",
    laypersonSummary:
      "GHRP-2 is a synthetic growth-hormone-releasing peptide studied for producing strong GH pulses, approved in Japan as a diagnostic tool for detecting growth hormone deficiency.",
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
          "Frieboes et al.: GHRP-2 enhances slow-wave sleep and amplifies nocturnal GH pulses in healthy young men, supporting pre-bed dosing protocols.",
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
      "The most potent standard GHRP. Approved in Japan as a diagnostic tool (Pralmorelin). Raises cortisol and prolactin more than Ipamorelin but less than Hexarelin. Not FDA-approved for therapeutic use.",
    half_life_hours: 1.5,
    is_fda_approved: false,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [100, 300],
      frequency: "1-3x daily",
      cycle_weeks: [8, 16],
      timing: "Pre-bed, morning fasted",
      reconstitution_ml: 2,
      typical_vial_mg: 5,
      notes:
        "Most common dose: 150-300mcg per injection. Empty stomach required. Often considered the 'goldilocks' GHRP: stronger than Ipamorelin, fewer sides than GHRP-6.",
    },
    interactions: {
      synergies: ["CJC-1295", "Sermorelin", "DSIP"],
      cautions: ["GHRP-6", "Hexarelin"],
      contraindicated: [],
      notes:
        "GHRP-2 + CJC-1295 is a top-tier GH stack. Do not combine with other GHRPs (receptor saturation). Choose GHRP-2 over GHRP-6 if appetite stimulation is unwanted.",
    },
    outcomes_timeline: {
      week_1:
        "Improved sleep quality; moderate appetite increase; GH flush sensation",
      week_2_4:
        "Enhanced recovery; early body composition shifts; IGF-1 elevation on bloodwork",
      month_2_3:
        "Significant lean mass improvement; fat redistribution; skin quality enhancement",
      long_term:
        "Sustained somatotropic axis support; cycling recommended every 12-16 weeks",
    },
    side_effects: [
      {
        name: "Moderate appetite increase",
        incidence: "~30% of users",
        severity: "mild",
        note: "Less intense than GHRP-6 but more than Ipamorelin",
      },
      {
        name: "Cortisol elevation (transient)",
        incidence: "~20% of users",
        severity: "mild",
      },
      {
        name: "Prolactin elevation (transient)",
        incidence: "~15% of users",
        severity: "mild",
        note: "Monitor if stacking with other prolactin-raising compounds",
      },
      { name: "Water retention", incidence: "~12% of users", severity: "mild" },
      {
        name: "Drowsiness / fatigue",
        incidence: "~8% of users",
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
      "Potent GH release, appetite stimulation, muscle growth, recovery, gastric motility",
    mechanism:
      "Synthetic hexapeptide that stimulates GH release by acting on the ghrelin/GHS receptor (GHSR1a) in the pituitary and hypothalamus. Unlike Ipamorelin, GHRP-6 is non-selective and also stimulates appetite (via ghrelin mimicry), raises cortisol and prolactin modestly, and has notable gastric motility effects. One of the earliest and most well-studied GH secretagogues.",
    laypersonSummary:
      "GHRP-6 is one of the earliest synthetic growth-hormone-releasing peptides studied for stimulating GH secretion and increasing appetite, making it relevant to muscle growth and wasting conditions.",
    key_studies: [
      {
        title: "GHRP-6 dose-dependent GH release in humans",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/8350725/",
        summary:
          "Bowers et al. (Endocrine Reviews): Comprehensive characterization of GHRP-6 showing dose-dependent GH release in humans with peak response at 1-2mcg/kg IV. Established GHRP-6 as the prototype GH secretagogue.",
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
                summary: "A 2025 study found that daily intravenous administration of CIGB-500, or GHRP-6, was well-tolerated in beagle dogs over 28 days. Researchers demonstrated that doses up to 2000 μg/kg/day produced only transient, non-adverse effects, establishing this as the no observable adverse effect level.",
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
      "Well-studied but less selective than Ipamorelin. Raises cortisol (~15-20% transient) and prolactin modestly. Strong appetite stimulation can be a benefit (cachexia) or side effect (body composition goals). Not FDA-approved.",
    half_life_hours: 2.5,
    is_fda_approved: false,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [100, 300],
      frequency: "1-3x daily",
      cycle_weeks: [8, 16],
      timing: "Pre-bed, morning fasted, or pre-meal",
      reconstitution_ml: 2,
      typical_vial_mg: 5,
      notes:
        "Standard research dose: 100-300mcg per injection. Must be taken on empty stomach (food blunts GH release by ~75%). Appetite surge hits within 20-30 minutes of injection.",
    },
    interactions: {
      synergies: ["CJC-1295", "Sermorelin", "MK-677"],
      cautions: ["Ipamorelin"],
      contraindicated: [],
      notes:
        "GHRP-6 + CJC-1295 produces synergistic GH release. Generally not stacked with Ipamorelin (redundant GHRP receptor occupancy). Choose one GHRP per protocol.",
    },
    outcomes_timeline: {
      week_1:
        "Intense appetite increase; improved sleep depth; possible cortisol-related water retention",
      week_2_4:
        "Elevated GH confirmed on bloodwork; faster recovery; early lean mass shifts",
      month_2_3:
        "Measurable body composition improvement; sustained appetite increase; IGF-1 elevation",
      long_term:
        "Continued GH axis support; may develop mild tachyphylaxis requiring cycling",
    },
    side_effects: [
      {
        name: "Intense hunger / appetite surge",
        incidence: "~60-80% of users",
        severity: "moderate",
        note: "Onset within 20-30 min of injection; strongest GHRP for appetite",
      },
      { name: "Water retention", incidence: "~20% of users", severity: "mild" },
      {
        name: "Cortisol elevation (transient)",
        incidence: "~15% of users",
        severity: "mild",
        note: "15-20% transient spike; returns to baseline within 1-2 hours",
      },
      {
        name: "Tingling / numbness",
        incidence: "~8% of users",
        severity: "mild",
      },
      { name: "Headache", incidence: "~5% of users", severity: "mild" },
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
      "Detoxification, antioxidant defense, immune support, skin brightening",
    mechanism:
      "Glutathione is the body's master antioxidant — a tripeptide (glutamate-cysteine-glycine) present in every cell. It neutralizes reactive oxygen species, regenerates vitamins C and E, supports Phase II liver detoxification, and modulates immune cell function. Injectable GSH bypasses poor oral bioavailability.",
    laypersonSummary:
      "Glutathione is the body's most important natural antioxidant, studied for detoxification, immune support, skin brightening, and protecting cells from oxidative damage throughout the body.",
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
      "Excellent safety profile. Used clinically for decades. IV and SubQ routes well-tolerated. Rare allergic reactions possible. May reduce effectiveness of some chemotherapy drugs — avoid during cancer treatment without oncologist approval.",
    half_life_hours: 2,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [200000, 600000],
      frequency: "2-3x/week",
      cycle_weeks: [4, 12],
      timing: "Morning",
      reconstitution_ml: 3,
      typical_vial_mg: 1500,
      notes:
        "SubQ: 200-600mg. IV push: 600-2000mg. For skin brightening, consistent dosing over 8-12 weeks is needed. Often combined with Vitamin C for synergistic antioxidant effect.",
    },
    interactions: {
      synergies: ["NAD+", "GHK-Cu", "Thymosin Alpha-1"],
      cautions: [],
      contraindicated: [],
      notes:
        "Glutathione + NAD+ is a popular longevity combination. Glutathione regenerates other antioxidants, amplifying overall cellular protection.",
    },
    outcomes_timeline: {
      week_1: "Improved energy and reduced oxidative stress markers",
      week_2_4: "Skin brightening begins; improved liver function markers",
      month_2_3:
        "Noticeable skin lightening effect; improved immune markers; better hangover recovery",
      long_term:
        "Sustained antioxidant protection; potential neuroprotective benefits",
    },
    side_effects: [
      {
        name: "Injection site redness",
        incidence: "~5% of users",
        severity: "mild",
      },
      {
        name: "Mild bloating (oral)",
        incidence: "~8% of users",
        severity: "mild",
      },
      {
        name: "Rare allergic reaction",
        incidence: "<1% of users",
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
      "Most potent GH release of any GHRP, cardioprotection, muscle growth, recovery",
    mechanism:
      "Synthetic hexapeptide and the most potent GH secretagogue in the GHRP class. Acts on GHSR1a to produce the strongest acute GH pulse, but also significantly raises cortisol, prolactin, and ACTH. Notable for direct cardioprotective effects independent of GH release, binding to cardiac CD36 receptors to protect against ischemic damage. Develops tachyphylaxis (desensitization) faster than other GHRPs.",
    laypersonSummary:
      "Hexarelin is the most potent growth-hormone-releasing peptide available, studied for producing the strongest GH pulses of any GHRP and for direct cardioprotective effects on heart tissue.",
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
          "Arvat et al.: Long-term Hexarelin use shows progressive GH response attenuation after 4-8 weeks of continuous dosing, necessitating cycling protocols for sustained efficacy.",
        evidence_level: "moderate",
      },
        {
                title: "Purification and structural characterization of an anti-Trichophyton compound produced by Auricularia heimuer mycelium.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42052162/",
                summary: "A 2026 study demonstrated that heimuerol A, a compound isolated from Auricularia heimuer mushrooms, exhibited significant in vitro anti-Trichophyton activity. Researchers found it effectively inhibited terbinafine-resistant fungal strains, likely through a distinct mechanism targeting ergosterol biosynthesis.",
                evidence_level: "preclinical"
            },
        {
                title: "Fibroblast dynamics in colorectal cancer: stability, plasticity, and novel markers.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42050076/",
                summary: "A 2026 study found that specific markers, including ADH1B and ITGA3, define distinct stable and plastic fibroblast subpopulations in colorectal cancer. Researchers demonstrated that these cancer-associated fibroblasts exhibit dynamic plasticity in vitro, which can be modulated by factors like TGF-β.",
                evidence_level: "preclinical"
            },
        {
                title: "Biomechanical evaluation of 3D-printed porous lattice versus solid mandibular implants: an in vitro study.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42045386/",
                summary: "In a 2026 in vitro study, researchers demonstrated that 3D-printed porous titanium mandibular implants reduced peak tensile strains and increased compressive strain transfer compared to solid implants. The findings suggest these porous designs offer superior biomechanical properties to mitigate stress shielding.",
                evidence_level: "preclinical"
            },
        {
                title: "Effect of intravitreal injection of dexamethasone implant on the corneal morphology of young adults with central retinal vein occlusion.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42039973/",
                summary: "A 2026 retrospective study found that intravitreal dexamethasone injections temporarily decreased corneal endothelial cell density at three months in young adults with central retinal vein occlusion. However, the treatment did not significantly affect other corneal morphological characteristics or anterior chamber parameters.",
                evidence_level: "moderate"
            },
        {
                title: "Buddleja officinalis as a natural xanthine oxidase inhibitor in a murine hyperuricemia model.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42036343/",
                summary: "A 2026 study demonstrated that the ethyl acetate fraction of Buddleja officinalis extract significantly inhibited xanthine oxidase in vitro and reduced serum uric acid levels in a murine model of hyperuricemia.",
                evidence_level: "preclinical"
            },
        {
                title: "Natural radioactivity and GIS mapping of soils in Binh Phuoc, Vietnam.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42025608/",
                summary: "A 2026 study found that natural radioactivity levels and radiological hazard indices in soils across Binh Phuoc, Vietnam, remained below international safety thresholds. The high-resolution GIS mapping demonstrated low environmental risk, providing a baseline for monitoring naturally occurring radioactive materials.",
                evidence_level: "emerging"
            },
        {
                title: "MASQ: A multiplex qPCR platform for quantitative alternative splicing analysis in clinical specimens.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42023028/",
                summary: "A 2026 study demonstrated that the novel MASQ qPCR platform precisely quantified alternative splicing events, including PBRM1 exon 27, in clinical cancer specimens. The platform exhibited high sensitivity and successfully monitored the effects of splice-switching oligonucleotides in cellular models.",
                evidence_level: "preclinical"
            },
        {
                title: "A georeferenced baseline and GIS-based screening of natural radioactivity in coastal sediments and nearshore waters of Da Nang, Viet Nam.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42013681/",
                summary: "Natural radioactivity levels in coastal sediments, seawater, and soils of Da Nang, Viet Nam, were found to be low and of minimal radiological concern in a 2026 study. Spatial variations in radionuclide distributions were consistent with lithogenic control and hydrodynamic sorting effects.",
                evidence_level: "emerging"
            },
        {
                title: "Solvent-Controlled Pathways Enable Structure-Programmable Metal-Organic Framework Membranes for Isomer Separation.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42010868/",
                summary: "A 2026 study demonstrated that a solvent-triggered pathway control strategy enables the creation of structure-programmable metal-organic framework membranes from a single template. Researchers found that using different solvents yielded distinct pore architectures capable of highly selective aliphatic and aromatic isomer separations.",
                evidence_level: "preclinical"
            },
        {
                title: "Influence of linker design on the stability, folding, and assembly of tethered collagen-mimetic peptides.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/42007454/",
                summary: "In a 2026 study, researchers demonstrated that increasing the length of flexible linkers in tethered collagen-mimetic peptides systematically decreases their thermal stability and alters folding kinetics. The findings also revealed that linker composition plays a limited role in influencing these structural properties.",
                evidence_level: "preclinical"
            },
        {
                title: "Cargo Secreted by the Type IX Secretion System of Porphyromonas gingivalis Are Tethered to O-Lipopolysaccharides via a Pentasaccharide Linker.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41992463/",
                summary: "A 2026 study demonstrated that Porphyromonas gingivalis cargo proteins secreted by the Type IX Secretion System are anchored to the cell surface via a complete O-LPS molecule. Researchers identified a novel pentasaccharide linker connecting these proteins to the bacterial surface.",
                evidence_level: "preclinical"
            },
        {
                title: "Rational design of a Kappa opioid receptor peptide agonist with attenuated β-arrestin signaling.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41980950/",
                summary: "A 2026 study demonstrated that beta01, an engineered kappa opioid receptor peptide agonist, retained robust antinociceptive and antipruritic efficacy while significantly reducing sedation and anxiety-like behaviors in mouse models. Researchers found this occurred because beta01 stabilizes a unique receptor conformation that minimizes β-arrestin recruitment.",
                evidence_level: "preclinical"
            },
        {
                title: "Neutrophil-to-Lymphocyte Ratio Is Associated with the Stability of Human Corneal Endothelial Cells.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41976839/",
                summary: "Systemic inflammation markers, specifically the neutrophil-to-lymphocyte ratio, are significantly associated with the stability of human corneal endothelial cells. A 2026 study of 307 subjects demonstrated this correlation, suggesting systemic immunity may impact corneal pathology.",
                evidence_level: "strong"
            },
        {
                title: "Study of Correlation of Severity of Diabetic Retinopathy with Corneal Thickness and Endothelial Parameter Changes in Diabetic Patients.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41971205/",
                summary: "A 2025 study demonstrated that a longer duration of Type 2 diabetes significantly correlates with decreased corneal endothelial cell hexagonality, indicating morphological changes. Conversely, central corneal thickness and cell density showed no significant correlation with diabetes duration or retinopathy severity.",
                evidence_level: "strong"
            },
        {
                title: "Antimicrobial and antioxidant activities of Tetracera macrophylla Hook.f. & Thomson leaf extracts: insights from Q-ToF-LCMS, pharmacokinetics and molecular docking approach.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41965055/",
                summary: "A 2026 study found that Tetracera macrophylla leaf extracts exhibited significant in-vitro antimicrobial and antioxidant activities. The methanol extract demonstrated the strongest inhibitory effects against S. aureus, with molecular docking identifying several compounds with high binding affinities to bacterial proteins.",
                evidence_level: "preclinical"
            },
        {
                title: "Characterising the failure mechanisms of error-corrected quantum logic gates.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41963340/",
                summary: "A 2026 study found that measurement noise and idling errors during readout periods are the dominant factors impacting the fidelity of error-corrected quantum logic gates. Researchers demonstrated that implementing low-depth syndrome extraction circuits significantly improves quantum memory performance.",
                evidence_level: "emerging"
            }
    ],
    safety_notes:
      "Most potent but least selective GHRP. Significant cortisol and prolactin elevation limits chronic use. Develops tachyphylaxis within 4-8 weeks requiring mandatory cycling. Cardioprotective properties make it uniquely valuable for cardiac research. Not FDA-approved.",
    half_life_hours: 0.9,
    is_fda_approved: false,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [100, 200],
      frequency: "1-2x daily",
      cycle_weeks: [4, 8],
      timing: "Pre-bed or morning fasted",
      reconstitution_ml: 2,
      typical_vial_mg: 5,
      notes:
        "Shorter cycles than other GHRPs (4-8 weeks max) due to tachyphylaxis. Standard dose: 100-200mcg. Often used in short 'burst' protocols for maximum GH output. Always cycle: 4 weeks on / 4 weeks off minimum.",
    },
    interactions: {
      synergies: ["CJC-1295", "Sermorelin"],
      cautions: ["GHRP-6", "GHRP-2", "Ipamorelin"],
      contraindicated: [],
      notes:
        "Do not stack with other GHRPs. Best used for short burst cycles when maximum GH output is desired. CJC-1295 + Hexarelin is the most powerful GH combo in research.",
    },
    outcomes_timeline: {
      week_1:
        "Dramatic GH pulse; notable flush and warmth sensation; improved sleep depth",
      week_2_4:
        "Peak body composition effects; strongest anabolic window; IGF-1 significantly elevated",
      month_2_3:
        "Tachyphylaxis onset; GH response diminishes 40-60% by week 6-8; must cycle off",
      long_term:
        "Best used cyclically; cardiac benefits may persist beyond GH effects",
    },
    side_effects: [
      {
        name: "Cortisol elevation",
        incidence: "~30% of users",
        severity: "moderate",
        note: "More significant than other GHRPs; monitor with chronic use",
      },
      {
        name: "Prolactin elevation",
        incidence: "~25% of users",
        severity: "moderate",
        note: "Can cause nipple sensitivity; necessitates cycling",
      },
      {
        name: "Intense flushing / warmth",
        incidence: "~20% of users",
        severity: "mild",
      },
      {
        name: "Appetite increase",
        incidence: "~15% of users",
        severity: "mild",
      },
      { name: "Water retention", incidence: "~15% of users", severity: "mild" },
      { name: "Headache", incidence: "~8% of users", severity: "mild" },
    ],
  }),

  // ─── ANTIMICROBIAL ───,
  p({
    name: "IGF-1 LR3",
    aliases: ["Insulin-like Growth Factor 1 Long R3"],
    category: "Growth Factor",
    category_icon: "\u{1F489}",
    primary_benefits: "Muscle growth, recovery, hyperplasia",
    mechanism:
      "IGF-1 analog with extended half-life for muscle cell hyperplasia (new cell creation, not just hypertrophy). Promotes nitrogen retention and protein synthesis.",
    laypersonSummary:
      "IGF-1 LR3 is a long-acting analog of Insulin-like Growth Factor 1 studied for its ability to trigger new muscle cell creation (hyperplasia) beyond what training alone can achieve.",
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
        title: "IGF-1 and cancer risk   comprehensive epidemiological review",
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
      "Potent; use caution. Risk of hypoglycemia. Theoretical cancer promotion concern well-documented in literature. Research-only.",
    half_life_hours: 20,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [50, 50],
      frequency: "5x/wk",
      cycle_weeks: [4, 4],
      timing: "Post-workout",
      reconstitution_ml: 2.5,
      typical_vial_mg: 1,
      notes:
        "Very low doses. Inject post-workout for localized muscle effects. Monitor blood sugar closely. Short cycles only.",
    },
    interactions: {
      synergies: ["Follistatin-344", "CJC-1295"],
      cautions: ["Tesamorelin"],
      contraindicated: [],
      notes:
        "Monitor IGF-1 levels closely. Do not combine with multiple GH secretagogues.",
    },
    outcomes_timeline: {
      week_1: "Enhanced nutrient partitioning; increased post-workout pumps",
      week_2_4:
        "Lean mass and recovery improvements; possible hypoglycemia if undereating",
      month_2_3:
        "Significant body composition changes; hyperplasia (new cell creation) possible",
      long_term:
        "Theoretical cancer promotion risk with chronic use; short cycles essential",
    },
    side_effects: [
      {
        name: "Hypoglycemia",
        incidence: "~10% of users",
        severity: "moderate",
        note: "Especially if dosed without food nearby; have glucose on hand",
      },
      { name: "Joint pain", incidence: "~8% of users", severity: "mild" },
      { name: "Headache", incidence: "~5% of users", severity: "mild" },
      { name: "Fluid retention", incidence: "~10% of users", severity: "mild" },
    ],
  }),

  // ─── LONGEVITY / NAD+ ───,
  p({
    name: "Ipamorelin",
    aliases: [],
    category: "GHRP",
    category_icon: "\u{26A1}",
    primary_benefits:
      "GH release, muscle growth, recovery without cortisol spike",
    mechanism:
      "Selective GH secretagogue that mimics ghrelin at the GHS receptor. Does not significantly raise cortisol or prolactin, making it one of the most selective GH-releasing peptides.",
    laypersonSummary:
      "Ipamorelin is a selective growth-hormone-releasing peptide studied for stimulating clean GH pulses without raising cortisol or prolactin, making it one of the safest GH peptides available.",
    key_studies: [
      {
        title: "Ipamorelin selective GH release   original characterization",
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
                summary: "A 2026 review found that nine therapeutic peptides, including tirzepatide, epitalon, and BPC-157, target diverse aging hallmarks such as metabolic dysfunction and tissue repair. While FDA-approved agents demonstrated robust safety, investigational peptides require further clinical validation to establish long-term efficacy.",
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
      "One of the safest GH peptides. Side effects may include transient headache, flushing. Not FDA-approved.",
    half_life_hours: 2,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [300, 300],
      frequency: "7x/wk",
      cycle_weeks: [8, 8],
      timing: "Pre-bed, morning fasted, or post-workout",
      reconstitution_ml: 2.5,
      typical_vial_mg: 5,
      notes:
        "Most commonly dosed at 200-300mcg per injection. Best taken on empty stomach 2+ hrs after eating.",
    },
    interactions: {
      synergies: ["CJC-1295", "Sermorelin", "DSIP"],
      cautions: [],
      contraindicated: [],
      notes:
        "Ipamorelin + CJC-1295 is the #1 GH peptide combo. Add DSIP for sleep-optimized GH release.",
    },
    outcomes_timeline: {
      week_1: "Improved sleep quality; increased hunger around dosing window",
      week_2_4: "Improved recovery and energy; early body composition shifts",
      month_2_3:
        "Visible lean mass gains; fat loss (especially combined with CJC-1295)",
      long_term:
        "Sustained IGF-1 support; preserved muscle during caloric deficit",
    },
    side_effects: [
      {
        name: "Temporary hunger",
        incidence: "~12% of users",
        severity: "mild",
      },
      { name: "Headache", incidence: "~5% of users", severity: "mild" },
      { name: "Water retention", incidence: "~8% of users", severity: "mild" },
      {
        name: "Flushing / warmth",
        incidence: "~4% of users",
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
      "LH/FSH stimulation, testosterone support, fertility enhancement, HPG axis activation",
    mechanism:
      "Endogenous neuropeptide that is the master upstream regulator of the hypothalamic-pituitary-gonadal (HPG) axis. Kisspeptin-10 binds to the GPR54 (KISS1R) receptor on GnRH neurons, triggering pulsatile GnRH release which stimulates LH and FSH secretion from the pituitary. This cascade drives testosterone production in males and ovulation in females. Unique advantage: activates the reproductive axis at its highest control point without bypassing natural feedback loops.",
    laypersonSummary:
      "Kisspeptin-10 is a naturally occurring reproductive neuropeptide studied for stimulating testosterone production in men and supporting ovulation in women by activating the HPG hormonal axis.",
    key_studies: [
      {
        title:
          "Kisspeptin potently stimulates LH and testosterone in healthy men",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21795442/",
        summary:
          "Dhillo et al. (J. Clin. Endocrinol. Metab.): IV Kisspeptin-10 (1mcg/kg) potently stimulates LH pulse frequency and testosterone secretion in healthy men, establishing its role as a reproductive axis activator.",
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
          "Ramaswamy et al.: Continuous Kisspeptin-10 infusion leads to desensitization of the HPG axis within 24-48 hours, indicating pulsatile dosing protocols are necessary for sustained efficacy.",
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
      "Endogenous human neuropeptide with growing clinical trial data. Tachyphylaxis (desensitization) occurs with continuous dosing; pulsatile/intermittent protocols required. Being investigated as a safer IVF trigger (vs. hCG). Not FDA-approved for therapeutic use. Research-only.",
    half_life_hours: 0.5,
    is_fda_approved: false,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [100, 100],
      frequency: "3x/wk",
      cycle_weeks: [8, 8],
      timing: "Morning or split AM/PM",
      reconstitution_ml: 2.5,
      typical_vial_mg: 5,
      notes:
        "Pulsatile dosing critical: continuous administration causes desensitization within 24-48 hours. Clinical studies use 1mcg/kg IV or 100-400mcg SubQ. Cycle 5 days on / 2 days off to prevent tachyphylaxis. Monitor LH, FSH, testosterone/estradiol on bloodwork.",
    },
    interactions: {
      synergies: ["CJC-1295", "Ipamorelin"],
      cautions: ["Semaglutide"],
      contraindicated: [],
      notes:
        "Kisspeptin-10 addresses the HPG axis while CJC/Ipamorelin addresses the GH axis. Together they form a comprehensive hormonal optimization protocol. Caution with GLP-1 agonists: some evidence they may suppress kisspeptin signaling.",
    },
    outcomes_timeline: {
      week_1:
        "Acute LH surge within hours; increase in morning testosterone levels; improved libido in hypogonadal individuals",
      week_2_4:
        "Sustained testosterone elevation with pulsatile dosing; improved energy and mood; fertility markers improving",
      month_2_3:
        "Stable HPG axis activation; measurable testosterone/LH improvement on bloodwork; improved reproductive parameters",
      long_term:
        "Must maintain pulsatile dosing to avoid desensitization; promising IVF trigger data; long-term reproductive axis support",
    },
    side_effects: [
      {
        name: "Injection site reaction",
        incidence: "~8% of users",
        severity: "mild",
      },
      { name: "Mild headache", incidence: "~5% of users", severity: "mild" },
      {
        name: "Flushing / warmth",
        incidence: "~5% of users",
        severity: "mild",
      },
      {
        name: "Tachyphylaxis (with continuous dosing)",
        incidence: "Variable",
        severity: "moderate",
        note: "Not a side effect per se but a dosing limitation; pulsatile protocols prevent this",
      },
    ],
  }),

  // ─── COGNITIVE ───,
  p({
    name: "KPV",
    aliases: ["Lys-Pro-Val"],
    category: "Anti-Inflammatory",
    category_icon: "\u{1FA79}",
    primary_benefits: "Gut/injury healing, inflammation reduction",
    mechanism:
      "Alpha-MSH fragment that potently suppresses NF-ÎºB inflammatory signaling. Reduces pro-inflammatory cytokines and promotes mucosal healing.",
    laypersonSummary:
      "KPV is a tripeptide fragment of alpha-MSH studied for powerfully reducing gut inflammation, investigated as a potential treatment for inflammatory bowel disease and wound healing.",
    key_studies: [
      {
        title: "KPV anti-inflammatory effects in murine colitis",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17095019/",
        summary:
          "Dalmasso et al. (PLoS One): KPV demonstrates significant anti-inflammatory effects in murine models of inflammatory bowel disease, suppressing NF-ÎºB and MAPK pathways.",
        evidence_level: "preclinical",
      },
      {
        title: "KPV suppresses NF-ÎºB signaling in airway epithelium",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16887251/",
        summary:
          "Study shows KPV inhibits p65RelA nuclear import, suppressing NF-ÎºB inflammatory signaling in airway epithelial cells — relevant to respiratory and gut inflammation.",
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
      "Excellent profile. Research-only compound with limited human data but strong preclinical safety.",
    half_life_hours: 0.5,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [200, 200],
      frequency: "7x/wk",
      cycle_weeks: [8, 8],
      timing: "Any time",
      reconstitution_ml: 2.5,
      typical_vial_mg: 5,
      notes:
        "Often used orally in capsules for gut-specific effects. SubQ for systemic anti-inflammatory.",
    },
    interactions: {
      synergies: ["BPC-157", "Thymosin Alpha-1"],
      cautions: [],
      contraindicated: [],
      notes: "KPV + BPC-157 is the ultimate gut healing combination.",
    },
    outcomes_timeline: {
      week_1:
        "Potent anti-inflammatory effect; rapid symptom relief in gut/injury",
      week_2_4: "Mucosal healing acceleration; reduced IBD flare symptoms",
      month_2_3:
        "Wound healing and IBD remission in study models; sustained anti-inflammatory effect",
    },
    side_effects: [
      {
        name: "Generally very well-tolerated",
        incidence: "Very limited human data",
        severity: "mild",
      },
      {
        name: "Mild GI adjustment",
        incidence: "~5% of users (oral route)",
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
      "Broad-spectrum antimicrobial, anti-biofilm, wound healing, immune modulation, anti-inflammatory",
    mechanism:
      "The only human cathelicidin antimicrobial peptide. LL-37 is a 37-amino acid cationic peptide that directly disrupts microbial membranes (bacteria, viruses, fungi) and neutralizes bacterial endotoxins (LPS). Beyond direct antimicrobial action, LL-37 modulates innate immunity by chemoattracting neutrophils, monocytes, and T-cells to infection sites. Promotes wound healing via EGFR-mediated keratinocyte migration and angiogenesis. Demonstrates potent anti-biofilm properties against resistant organisms.",
    laypersonSummary:
      "LL-37 is the only human antimicrobial cathelicidin peptide studied for directly killing bacteria, viruses, and fungi while also promoting wound healing and immune system activation.",
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
      "Endogenous human peptide with well-characterized biology. Cytotoxic to eukaryotic cells at high concentrations (>25mcg/mL). Concentration-dependent effects: low doses immunomodulatory, high doses cytotoxic. Growing research interest in CIRS/mold illness protocols. Not FDA-approved as a therapeutic.",
    half_life_hours: 4,
    is_fda_approved: false,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [100, 100],
      frequency: "7x/wk",
      cycle_weeks: [6, 6],
      timing: "Any time",
      reconstitution_ml: 2.5,
      typical_vial_mg: 2,
      notes:
        "Research doses typically 50-200mcg SubQ. Start low (50mcg) to assess tolerance. Also used topically for wound applications. Practitioners in CIRS protocols often use nebulized delivery for respiratory infections.",
    },
    interactions: {
      synergies: ["Thymosin Alpha-1", "BPC-157", "KPV"],
      cautions: [],
      contraindicated: [],
      notes:
        "LL-37 + Thymosin Alpha-1 is a potent immune defense stack. LL-37 handles direct antimicrobial action while TA-1 modulates adaptive immunity. BPC-157 provides complementary mucosal barrier protection.",
    },
    outcomes_timeline: {
      week_1:
        "Immune activation; some users report mild flu-like response as immune system engages",
      week_2_4:
        "Reduced infection symptoms; improved wound healing at treatment sites; systemic immune upregulation",
      month_2_3:
        "Sustained antimicrobial effects; biofilm disruption in chronic infections; improved mucosal barrier integrity",
      long_term:
        "Best used in targeted protocols for active infections or chronic immune challenges; not typically used indefinitely",
    },
    side_effects: [
      {
        name: "Injection site reaction (redness, swelling)",
        incidence: "~15% of users",
        severity: "mild",
        note: "Expected immune-activating response",
      },
      {
        name: "Flu-like symptoms (immune activation)",
        incidence: "~10% of users",
        severity: "mild",
        note: "Sign of immune engagement; typically resolves in 24-48 hours",
      },
      { name: "Mild fever", incidence: "~5% of users", severity: "mild" },
      { name: "Fatigue", incidence: "~8% of users", severity: "mild" },
    ],
  }),

  // ─── REPRODUCTIVE / HORMONAL ───,
  p({
    name: "Melanotan II",
    aliases: ["MT-II", "MT-2"],
    category: "Melanocortin Agonist",
    category_icon: "\u{1F3A8}",
    primary_benefits: "Tanning, libido enhancement",
    mechanism:
      "MC4R activation. Non-selectively activates melanocortin receptors to stimulate melanin production, suppress appetite, and increase sexual arousal.",
    laypersonSummary:
      "Melanotan II is a synthetic melanocortin analog studied for stimulating skin tanning, suppressing appetite, and increasing sexual arousal, though it carries significant safety concerns.",
    key_studies: [
      {
        title: "Melanotan II tanning and erectile effects   Phase I",
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
      "Nausea common; research-only. SIGNIFICANT SAFETY CONCERNS: changes to moles, elevated BP. Actively warned against by FDA/TGA.",
    half_life_hours: 1,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [250, 250],
      frequency: "7x/wk",
      cycle_weeks: [4, 4],
      timing: "Any time",
      reconstitution_ml: 2.5,
      typical_vial_mg: 10,
      notes:
        "Loading: 250mcg/day for 7-10 days. Maintenance: as needed for UV exposure. START LOW.",
    },
    interactions: {
      synergies: [],
      cautions: ["PT-141"],
      contraindicated: [],
      notes:
        "Do not combine with PT-141   overlapping MC receptor effects. One or the other.",
    },
    outcomes_timeline: {
      week_1:
        "Nausea common during initial dose; spontaneous erections in men; early tanning begins",
      week_2_4: "Significant skin pigmentation; libido effects",
      long_term:
        "Persistent tan maintained with UV exposure; long-term safety concerns with mole changes",
    },
    side_effects: [
      {
        name: "Nausea",
        incidence: "~45% of users",
        severity: "moderate",
        note: "Most common side effect; dose-dependent",
      },
      { name: "Facial flushing", incidence: "~30% of users", severity: "mild" },
      { name: "Fatigue", incidence: "~15% of users", severity: "mild" },
      {
        name: "Spontaneous erections (men)",
        incidence: "~20% of men",
        severity: "mild",
      },
      {
        name: "Mole changes (darkening)",
        incidence: "Variable",
        severity: "uncommon",
        note: "Monitor moles carefully; can mask melanoma",
      },
    ],
  }),
  p({
    name: "MK-677",
    aliases: ["Ibutamoren", "Ibutamoren Mesylate", "L-163,191", "Nutrobal"],
    category: "GH Secretagogue (Oral)",
    category_icon: "\u{1F4CA}",
    primary_benefits:
      "Sustained GH/IGF-1 elevation, muscle growth, improved sleep, bone density, oral dosing convenience",
    mechanism:
      "Non-peptide ghrelin receptor (GHSR1a) agonist that stimulates prolonged, pulsatile growth hormone release from the pituitary gland. Unlike injectable GH peptides, MK-677 is orally bioavailable with a ~24-hour half-life, enabling once-daily dosing. Increases IGF-1 levels for up to 12 months without desensitization of the GH axis. Does not suppress natural GH secretion patterns or affect cortisol levels at standard doses.",
    laypersonSummary:
      "MK-677 (Ibutamoren) is an orally bioavailable growth hormone secretagogue studied for sustainably elevating GH and IGF-1 levels over 24 hours with a single daily pill.",
    key_studies: [
      {
        title:
          "MK-677 increases GH and IGF-1 without altering cortisol in healthy elderly",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9467534/",
        summary:
          "Chapman et al. (J. Clin. Endocrinol. Metab.): 25mg daily MK-677 for 2 weeks in healthy elderly subjects restored IGF-1 and GH profiles to young adult levels without altering cortisol, prolactin, insulin, or thyroid hormones.",
        evidence_level: "moderate",
      },
      {
        title:
          "MK-677 2-year study: sustained IGF-1 elevation and body composition effects",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18981485/",
        summary:
          "Nass et al. (J. Clin. Endocrinol. Metab.): 2-year RCT in 65 healthy elderly adults. 25mg/day MK-677 increased GH and IGF-1 to young adult levels, increased fat-free mass by ~1.1kg, and did not affect BMD. Notable: fasting glucose increased by ~0.3 mmol/L.",
        evidence_level: "strong",
      },
      {
        title: "MK-677 increases fat-free mass in healthy obese males",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/9467542/",
        summary:
          "Svensson et al. (J. Clin. Endocrinol. Metab.): 8-week RCT in obese males. 25mg/day MK-677 significantly increased GH secretion, IGF-1, and fat-free mass. Transient increase in appetite and mild insulin resistance noted.",
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
          "Murphy et al. (J. Clin. Endocrinol. Metab.): 12-month study in postmenopausal women showing MK-677 (25mg/day) increased osteocalcin and bone-specific alkaline phosphatase, suggesting improved bone formation.",
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
      "Oral GH secretagogue with extensive clinical data (2+ year RCTs). Key concern: impairs insulin sensitivity and raises fasting glucose, especially in elderly/obese populations. One hip fracture trial in elderly was stopped early due to CHF signals. WADA prohibited. Not FDA-approved. Use caution in pre-diabetic or insulin-resistant individuals.",
    half_life_hours: 24,
    is_fda_approved: false,
    dosing: {
      route: "Oral",
      typical_dose_mcg: [12500, 12500],
      frequency: "7x/wk",
      cycle_weeks: [12, 12],
      timing: "Pre-bed (optimizes sleep + GH surge)",
      reconstitution_ml: 2.5,
      typical_vial_mg: 25,
      notes:
        "Standard dose: 10-25mg once daily. Oral capsule or liquid. Start at 10mg to assess appetite increase and glucose response. Pre-bed dosing leverages natural GH pulse. 5-on/2-off cycles used to manage appetite and insulin sensitivity.",
    },
    interactions: {
      synergies: ["CJC-1295", "Sermorelin", "DSIP"],
      cautions: ["Semaglutide", "Tirzepatide", "Retatrutide"],
      contraindicated: [],
      notes:
        "MK-677 replaces injectable GH peptides for oral convenience. Caution stacking with GLP-1 agonists: conflicting appetite/metabolic signals. Do not combine with exogenous HGH (excessive IGF-1). DSIP synergizes well for sleep-optimized GH protocols.",
    },
    outcomes_timeline: {
      week_1:
        "Significant appetite increase; deeper sleep onset; vivid dreams; mild water retention",
      week_2_4:
        "Sustained IGF-1 elevation confirmed on bloodwork; improved recovery; skin quality improvement; morning puffiness from water retention",
      month_2_3:
        "Measurable fat-free mass increase (~1-2 lbs); improved bone turnover markers; hair/nail growth acceleration; monitor fasting glucose",
      long_term:
        "2-year clinical data shows sustained IGF-1 without tachyphylaxis; continued body composition benefits; requires ongoing glucose monitoring",
    },
    side_effects: [
      {
        name: "Increased appetite",
        incidence: "~40-60% of users",
        severity: "moderate",
        note: "Most pronounced in first 2-4 weeks; often the dose-limiting factor",
      },
      {
        name: "Water retention / bloating",
        incidence: "~30% of users",
        severity: "moderate",
        note: "Mainly facial/periorbital puffiness; dose-dependent",
      },
      {
        name: "Insulin resistance / elevated fasting glucose",
        incidence: "~15-25% of users",
        severity: "moderate",
        note: "Monitor HbA1c and fasting glucose; more pronounced in obese/elderly",
      },
      {
        name: "Lethargy / drowsiness",
        incidence: "~15% of users",
        severity: "mild",
        note: "Mitigated by pre-bed dosing",
      },
      {
        name: "Numbness / tingling (paresthesia)",
        incidence: "~8% of users",
        severity: "mild",
      },
      {
        name: "Joint pain",
        incidence: "~5% of users",
        severity: "mild",
        note: "Related to rapid GH/IGF-1 elevation; usually transient",
      },
    ],
  }),
  p({
    name: "MOTS-c",
    aliases: ["Mitochondrial ORF of 12S rRNA Type-c"],
    category: "Mitochondrial Peptide",
    category_icon: "\u{26A1}",
    primary_benefits: "Energy, metabolism, fat loss, longevity",
    mechanism:
      "Regulates mitochondrial function and AMPK. Enhances glucose uptake and fatty acid oxidation, improves insulin sensitivity, and protects against age-related metabolic decline.",
    laypersonSummary:
      "MOTS-c is a peptide encoded in mitochondrial DNA studied for improving insulin sensitivity, boosting exercise performance, and protecting against the metabolic decline that comes with aging.",
    key_studies: [
      {
        title: "MOTS-c regulates metabolic homeostasis (Cell Metabolism)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25710270/",
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
          "Human observational study linking decreased circulating MOTS-c levels with aging, obesity, and type 2 diabetes   suggesting therapeutic rationale for supplementation.",
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
      "Promising but limited human data. As an endogenous peptide, theoretical biocompatibility favorable.",
    half_life_hours: 4,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [2000, 2000],
      frequency: "5x/week",
      cycle_weeks: [8, 8],
      timing: "Morning or pre-exercise",
      reconstitution_ml: 2.5,
      typical_vial_mg: 10,
      notes:
        "Exercise-mimetic. Often taken pre-workout. Higher doses used in research.",
    },
    interactions: {
      synergies: ["SS-31", "Epitalon", "AOD-9604"],
      cautions: [],
      contraindicated: [],
      notes:
        "MOTS-c + SS-31 targets mitochondria via complementary mechanisms.",
    },
    outcomes_timeline: {
      week_1: "Improved insulin sensitivity; increased energy during exercise",
      week_2_4:
        "Enhanced exercise performance and endurance; reduced muscle fatigue",
      month_2_3: "Metabolic adaptations; improved body composition",
      long_term:
        "Mitochondrial health optimization; age-related metabolic protection",
    },
    side_effects: [
      {
        name: "Injection site reaction",
        incidence: "~5% of users",
        severity: "mild",
      },
      {
        name: "Generally well-tolerated",
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
    primary_benefits: "Cellular energy, DNA repair, longevity",
    mechanism:
      "NAD+ is a critical coenzyme in every cell, essential for mitochondrial energy production (oxidative phosphorylation), DNA repair via PARP and sirtuin activation, and circadian rhythm regulation. Levels decline ~50% between ages 40-60, contributing to metabolic dysfunction and aging.",
    laypersonSummary:
      "NAD+ is a coenzyme essential for cellular energy and DNA repair that declines sharply with age, studied for restoring mitochondrial function and supporting longevity pathways.",
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
      "Generally well-tolerated. IV NAD+ infusions may cause chest tightness, nausea, and cramping during administration. Subcutaneous injection is better tolerated. Oral precursors (NMN, NR) have good safety profiles in clinical trials.",
    half_life_hours: 4,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [50000, 200000],
      frequency: "Daily",
      cycle_weeks: [4, 12],
      timing: "Morning",
      reconstitution_ml: 2,
      typical_vial_mg: 500,
      notes:
        "SubQ: 50-200mg daily. IV: 250-500mg over 2-4 hours. Start low — rapid NAD+ elevation can cause nausea and flushing. Oral precursors (NMN/NR) are an alternative.",
    },
    interactions: {
      synergies: ["Epitalon", "SS-31", "MOTS-c"],
      cautions: [],
      contraindicated: [],
      notes:
        "NAD+ + SS-31 provides comprehensive mitochondrial support. NAD+ + Epitalon covers both cellular energy and telomere protection.",
    },
    outcomes_timeline: {
      week_1: "Increased energy, mental clarity, reduced brain fog",
      week_2_4:
        "Improved exercise recovery, better sleep quality, mood stabilization",
      month_2_3:
        "Measurable improvements in metabolic markers, sustained energy throughout the day",
      long_term:
        "NAD+ level restoration; potential longevity benefits (animal data for lifespan extension)",
    },
    side_effects: [
      {
        name: "Nausea during infusion",
        incidence: "~30% (IV route)",
        severity: "moderate",
        note: "Dose-dependent; resolved by slowing infusion rate",
      },
      { name: "Flushing/warmth", incidence: "~20% of users", severity: "mild" },
      {
        name: "Chest tightness",
        incidence: "~15% (IV route)",
        severity: "mild",
        note: "Transient during infusion, resolves within minutes",
      },
      {
        name: "Injection site discomfort",
        incidence: "~10% (SubQ)",
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
    primary_benefits: "Sexual arousal, libido",
    mechanism:
      "Central melanocortin pathway. Activates MC4R in the CNS to stimulate sexual desire through brain pathways rather than vascular effects.",
    laypersonSummary:
      "PT-141 (Bremelanotide) is an FDA-approved melanocortin agonist prescribed as Vyleesi for hypoactive sexual desire disorder in premenopausal women, also studied for male erectile dysfunction.",
    key_studies: [
      {
        title: "PT-141 (Bremelanotide) for hypoactive sexual desire   Phase 3",
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
          "Diamond et al.: Double-blind, placebo-controlled study showing PT-141 induces significant erectile response at >7mg doses, effective even in PDE5 inhibitor non-responders.",
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
      "Nausea/hypertension possible. FDA-approved (Vyleesi) for HSDD in premenopausal women. Limited to 8 doses/month.",
    is_fda_approved: true,
    half_life_hours: 2.7,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [1500, 1500],
      frequency: "2x/wk",
      timing: "45 min before activity",
      reconstitution_ml: 2.5,
      typical_vial_mg: 10,
      notes:
        "FDA-approved dose: 1.75mg SubQ as needed. Max 1 dose per 24h, 8 doses/month.",
    },
    interactions: {
      synergies: [],
      cautions: ["Melanotan II"],
      contraindicated: [],
      notes:
        "Do not combine with Melanotan II   overlapping melanocortin effects.",
    },
    outcomes_timeline: {
      week_1: "Libido enhancement typically onset within 45 minutes of dosing",
      week_2_4: "Consistent improvement in sexual response and desire",
      month_2_3:
        "Psychological effects may plateau; effectiveness maintained with intermittent use",
      long_term: "FDA-approved for long-term use; limit to 8 doses/month",
    },
    side_effects: [
      {
        name: "Nausea",
        incidence: "~40% of users",
        severity: "moderate",
        note: "From Phase 3 RECONNECT trial data",
      },
      { name: "Flushing", incidence: "~20% of users", severity: "mild" },
      { name: "Headache", incidence: "~10% of users", severity: "mild" },
      {
        name: "Transient blood pressure increase",
        incidence: "~8% of users",
        severity: "moderate",
        note: "Avoid if uncontrolled hypertension",
      },
    ],
  }),

  // ─── SLEEP ───,
  p({
    name: "Retatrutide",
    aliases: ["LY3437943"],
    category: "Triple Agonist (GLP-1/GIP/Glucagon)",
    category_icon: "\u{1F525}",
    primary_benefits:
      "Superior body recomposition, massive fat loss, metabolic health",
    mechanism:
      "Multi-receptor activation for appetite suppression, fat oxidation, energy expenditure. Unique triple agonism at GLP-1, GIP, and glucagon receptors delivers synergistic metabolic effects unmatched by single or dual agonists.",
    laypersonSummary:
      "Retatrutide is an investigational triple GLP-1/GIP/glucagon receptor agonist studied in Phase 2 trials, producing the highest weight loss ever recorded in an obesity drug trial at 24%.",
    key_studies: [
      {
        title: "Retatrutide Phase 2 trial: ~24% weight loss at 48 weeks",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37351564/",
        summary:
          "Jastreboff et al. (NEJM): Phase 2 RCT showing 24.2% body weight reduction at 12mg dose over 48 weeks   the highest reported weight loss in any obesity drug trial to date.",
        evidence_level: "strong",
      },
      {
        title: "Retatrutide Phase 1   safety and dose-dependent weight loss",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36579200/",
        summary:
          "First-in-human Phase 1 trial demonstrating dose-dependent weight loss, favorable safety profile, and significant HbA1c reductions across multiple dose levels.",
        evidence_level: "moderate",
      },
      {
        title: "Retatrutide reduces liver fat (NAFLD sub-study)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37840095/",
        summary:
          "Phase 2 sub-study showing retatrutide significantly reduces liver fat content, with ~90% of participants with baseline steatosis achieving resolution at 48 weeks.",
        evidence_level: "strong",
      },
      {
        title: "Triple GLP-1/GIP/glucagon agonism   pharmacological rationale",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37115596/",
        summary:
          "Review of the triple agonism mechanism: GLP-1 provides appetite suppression, GIP enhances GH-like metabolic effects, and glucagon drives energy expenditure and hepatic lipid oxidation.",
        evidence_level: "moderate",
      },
        {
                title: "GIPR:GCGR co-agonism restores normal weight in obese rodents.",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41997446/",
                summary: "A 2026 study demonstrated that a novel GIPR:GCGR co-agonist lacking GLP-1 activity successfully reduced excess body weight and improved glycemia in obese rodents. Researchers found that correcting obesity without GLP-1 agonism could potentially avoid the gastrointestinal adverse effects commonly associated with current treatments.",
                evidence_level: "preclinical"
            },
        {
                title: "Development of the Weight and Emotions Scale (WES).",
                pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41589220/",
                summary: "A 2026 study demonstrated the successful development of the Weight and Emotions Scale (WES), a 16-item patient-reported outcome measure. Cognitive interviews with adults with obesity found that the scale was well-understood and effectively captured 13 emotion-related concepts relevant to weight management.",
                evidence_level: "moderate"
            }
    ,
      {
        title: "Emerging pharmacotherapies for obesity: A systematic review.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39952695/",
        summary: "A study published in Pharmacological reviews investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Seven glucagon-like peptide-1 receptor agonists and polyagonists for weight loss in patients with obesity or overweight: an updated systematic review and network meta-analysis of randomized controlled trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39305981/",
        summary: "A study published in Metabolism: clinical and experimental investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Efficacy and Safety of Glucagon-Like Peptide-1 Receptor Agonists for Weight Loss Among Adults Without Diabetes : A Systematic Review of Randomized Controlled Trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39761578/",
        summary: "A study published in Annals of internal medicine investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Retatrutide-A Game Changer in Obesity Pharmacotherapy.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40563436/",
        summary: "A study published in Biomolecules investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Gut hormones and appetite regulation.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38511400/",
        summary: "A study published in Current opinion in endocrinology, diabetes, and obesity investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Triple hormone receptor agonist retatrutide for metabolic dysfunction-associated steatotic liver disease: a randomized phase 2a trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38858523/",
        summary: "A study published in Nature medicine investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Pharmacological Treatment of Binge Eating Disorder and Frequent Comorbid Diseases.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39096466/",
        summary: "A study published in CNS drugs investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The impact of weight loss on fat-free mass, muscle, bone and hematopoiesis health: Implications for emerging pharmacotherapies aiming at fat reduction and lean mass preservation.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39481534/",
        summary: "A study published in Metabolism: clinical and experimental investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Advancements in pharmacological treatment of NAFLD/MASLD: a focus on metabolic and liver-targeted interventions.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38681750/",
        summary: "A study published in Gastroenterology report investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Weight management treatment in obesity.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40865172/",
        summary: "A study published in Medicina clinica investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Efficacy and Safety of GLP-1 Receptor Agonists, Dual Agonists, and Retatrutide for Weight Loss in Adults With Overweight or Obesity: A Bayesian NMA.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40685589/",
        summary: "A study published in Obesity (Silver Spring, Md.) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The power of three: Retatrutide's role in modern obesity and diabetes therapy.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39515565/",
        summary: "A study published in European journal of pharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Novel GLP-1-based Medications for Type 2 Diabetes and Obesity.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41054801/",
        summary: "A study published in Endocrine reviews investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Recent advances in the treatment of type 2 diabetes mellitus using new drug therapies.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38183334/",
        summary: "A study published in The Kaohsiung journal of medical sciences investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "GI side effects (nausea, diarrhea) common; investigational   not FDA-approved as of 2026. Phase 3 TRIUMPH trials ongoing.",
    half_life_hours: 120,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [2000, 2000],
      frequency: "1x/wk",
      cycle_weeks: [12, 12],
      timing: "Any day, same day each week",
      reconstitution_ml: 2.5,
      typical_vial_mg: 10,
      notes:
        "Investigational. Phase 2 doses: 1-12mg weekly with dose escalation. Not commercially available.",
    },
    interactions: {
      synergies: [],
      cautions: ["Tirzepatide", "Semaglutide"],
      contraindicated: [],
      notes:
        "Do NOT combine with other GLP-1 agonists. Overlapping mechanisms = excessive GI effects.",
    },
    outcomes_timeline: {
      week_1: "GI adjustment; nausea during dose escalation",
      week_2_4: "Rapid appetite reduction; early weight loss 1-2 lbs/week",
      month_2_3: "10-15% body weight reduction at therapeutic dose",
      long_term:
        "Up to 24.2% weight loss at 48 weeks (NEJM Phase 2 trial, 12mg dose)",
    },
    side_effects: [
      {
        name: "Nausea",
        incidence: "~45% of users",
        severity: "moderate",
        note: "From Phase 2 trial; most pronounced during escalation",
      },
      { name: "Diarrhea", incidence: "~25% of users", severity: "mild" },
      { name: "Vomiting", incidence: "~20% of users", severity: "moderate" },
      { name: "Constipation", incidence: "~20% of users", severity: "mild" },
    ],
  }),
  p({
    name: "Selank",
    aliases: ["TP-7"],
    category: "Anxiolytic Peptide",
    category_icon: "\u{1F31F}",
    primary_benefits: "Anxiety reduction, mental clarity, mood",
    mechanism:
      "Modulates GABA/serotonin neurotransmitter systems. Enhances immune function by influencing IL-6 and T-helper cell balance. Stabilizes enkephalin levels.",
    laypersonSummary:
      "Selank is a synthetic anxiolytic peptide approved in Russia studied for reducing anxiety and improving mental clarity, with effects comparable to benzodiazepines but without sedation or dependence.",
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
      "Very safe profile. No reported dependence or withdrawal. Approved as anxiolytic in Russia. Not FDA-approved in US.",
    half_life_hours: 0.5,
    dosing: {
      route: "Nasal",
      typical_dose_mcg: [300, 300],
      frequency: "7x/wk",
      cycle_weeks: [8, 8],
      timing: "Morning or as needed",
      reconstitution_ml: 2.5,
      typical_vial_mg: 5,
      notes:
        "Nasal spray: 1-2 sprays per nostril. Non-addictive; can be used daily.",
    },
    interactions: {
      synergies: ["Semax", "DSIP"],
      cautions: [],
      contraindicated: [],
      notes: "Selank + Semax complement each other: anxiolytic + nootropic.",
    },
    outcomes_timeline: {
      week_1:
        "Rapid reduction in anxiety within days; improved stress resilience; calmer baseline",
      week_2_4:
        "Stable anxiolytic effects without sedation; improved sleep onset",
      month_2_3:
        "Adaptive reduction in baseline anxiety; improved immune markers in some studies",
      long_term:
        "Effects generally require cycling; tolerance is low compared to benzodiazepines",
    },
    side_effects: [
      { name: "Mild fatigue", incidence: "~5% of users", severity: "mild" },
      {
        name: "Nasal irritation",
        incidence: "~6% of users",
        severity: "mild",
        note: "Intranasal route only",
      },
      { name: "Mood fluctuation", incidence: "~3% of users", severity: "mild" },
    ],
  }),

  // ─── COPPER ───,
  p({
    name: "Semaglutide",
    aliases: ["Ozempic", "Wegovy", "Rybelsus"],
    category: "GLP-1 Agonist",
    category_icon: "\u{1F525}",
    primary_benefits: "Fat loss, appetite control, cardiovascular benefits",
    mechanism:
      "GLP-1 receptor agonism mimics the incretin hormone to reduce appetite, slow gastric emptying, improve insulin sensitivity, and provide cardiovascular protection.",
    laypersonSummary:
      "Semaglutide is an FDA-approved GLP-1 receptor agonist used to treat type 2 diabetes (Ozempic) and obesity (Wegovy), reducing appetite and improving blood sugar control.",
    key_studies: [
      {
        title: "STEP 1: Semaglutide 2.4 mg for weight management",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33567185/",
        summary:
          "Wilding et al. (NEJM): Landmark STEP 1 trial   semaglutide 2.4mg achieved 14.9% mean weight loss vs 2.4% placebo at 68 weeks in 1,961 adults with obesity.",
        evidence_level: "very-strong",
      },
      {
        title: "SELECT trial: semaglutide reduces cardiovascular events by 20%",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37952131/",
        summary:
          "Lincoff et al. (NEJM): SELECT trial shows semaglutide 2.4mg reduces major adverse cardiovascular events by 20% in overweight/obese adults with established CVD.",
        evidence_level: "very-strong",
      },
      {
        title: "STEP program overview: pooled Phase 3 weight loss data",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35441470/",
        summary:
          "Comprehensive analysis across STEP trials showing 14.9-17.4% weight loss, improved cardiometabolic risk factors, blood pressure, and quality of life with semaglutide 2.4mg.",
        evidence_level: "very-strong",
      },
      {
        title:
          "Oral semaglutide (Rybelsus) in type 2 diabetes   PIONEER program",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/31189511/",
        summary:
          "Aroda et al. (JAMA): PIONEER trials demonstrate oral semaglutide achieves significant HbA1c and weight reductions, representing the first oral GLP-1RA for type 2 diabetes.",
        evidence_level: "very-strong",
      },
      {
        title:
          "Semaglutide cognitive and neurological effects   emerging research",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35848726/",
        summary:
          "Emerging evidence suggests semaglutide may have neuroprotective properties, with trials underway for Alzheimer's disease and other neurodegenerative conditions.",
        evidence_level: "emerging",
      },
    
      {
        title: "Cagrilintide-Semaglutide in Adults with Overweight or Obesity and Type 2 Diabetes.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40544432/",
        summary: "A study published in The New England journal of medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Semaglutide Effects on Cardiovascular Outcomes in People With Overweight or Obesity (SELECT) rationale and design.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/32916609/",
        summary: "A study published in American heart journal investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "GLP-1 receptor agonists in the treatment of type 2 diabetes - state-of-the-art.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/33068776/",
        summary: "A study published in Molecular metabolism investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "The rationale, design and baseline data of FLOW, a kidney outcomes trial with once-weekly semaglutide in people with type 2 diabetes and chronic kidney disease.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36651820/",
        summary: "A study published in Nephrology, dialysis, transplantation : official publication of the European Dialysis and Transplant Association - European Renal Association investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Real-world evidence on the utilization, clinical and comparative effectiveness, and adverse effects of newer GLP-1RA-based weight-loss therapies.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40196933/",
        summary: "A study published in Diabetes, obesity & metabolism investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Effect of glucagon-like peptide-1 receptor agonists and co-agonists on body composition: Systematic review and network meta-analysis.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39719170/",
        summary: "A study published in Metabolism: clinical and experimental investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Obesity, Cardiovascular Disease, and the Promising Role of Semaglutide: Insights from the SELECT Trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37640171/",
        summary: "A study published in Current problems in cardiology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Efficacy and Safety of Once-Weekly Semaglutide Versus Exenatide ER in Subjects With Type 2 Diabetes (SUSTAIN 3): A 56-Week, Open-Label, Randomized Clinical Trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29246950/",
        summary: "A study published in Diabetes care investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "The Weight-loss Effect of GLP-1RAs Glucagon-Like Peptide-1 Receptor Agonists in Non-diabetic Individuals with Overweight or Obesity: A Systematic Review with Meta-Analysis and Trial Sequential Analysis of Randomized Controlled Trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37661106/",
        summary: "A study published in The American journal of clinical nutrition investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Efficacy and safety of semaglutide 2.4 mg for weight loss in overweight or obese adults without diabetes: An updated systematic review and meta-analysis including the 2-year STEP 5 trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38016699/",
        summary: "A study published in Diabetes, obesity & metabolism investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Long-Term Efficacy and Safety of Once-Weekly Semaglutide for Weight Loss in Patients Without Diabetes: A Systematic Review and Meta-Analysis of Randomized Controlled Trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38679221/",
        summary: "A study published in The American journal of cardiology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Emerging Role of GLP-1 Agonists in Obesity: A Comprehensive Review of Randomised Controlled Trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37445623/",
        summary: "A study published in International journal of molecular sciences investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Dose-response effects on HbA(1c) and bodyweight reduction of survodutide, a dual glucagon/GLP-1 receptor agonist, compared with placebo and open-label semaglutide in people with type 2 diabetes: a randomised clinical trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38095657/",
        summary: "A study published in Diabetologia investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Efficacy and Safety of Glucagon-Like Peptide-1 Receptor Agonists for Weight Loss Among Adults Without Diabetes : A Systematic Review of Randomized Controlled Trials.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39761578/",
        summary: "A study published in Annals of internal medicine investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Tirzepatide, a dual GIP/GLP-1 receptor co-agonist for the treatment of type 2 diabetes with unmatched effectiveness regrading glycaemic control and body weight reduction.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36050763/",
        summary: "A study published in Cardiovascular diabetology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "FDA-approved for diabetes (Ozempic) and obesity (Wegovy). Well-studied long-term. GI side effects possible. Prescription required.",
    is_fda_approved: true,
    half_life_hours: 168,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [250, 250],
      frequency: "1x/wk",
      cycle_weeks: [12, 12],
      timing: "Any day, same day each week",
      reconstitution_ml: 2.5,
      typical_vial_mg: 5,
      notes:
        "Start 0.25mg weekly, escalate monthly: 0.5 → 1.0 → 1.7 → 2.4mg. Oral: 3mg → 7mg → 14mg daily.",
    },
    interactions: {
      synergies: ["AOD-9604"],
      cautions: ["Tirzepatide", "Retatrutide", "CJC-1295"],
      contraindicated: [],
      notes:
        "Do NOT combine with other GLP-1 agonists. May blunt GH secretagogue effects.",
    },
    outcomes_timeline: {
      week_1: "GI adjustment; appetite suppression significant from week 1",
      week_2_4: "0.5-1 lb/week weight loss; improved blood sugar control",
      month_2_3:
        "~10-14% body weight reduction; cardiovascular markers improving",
      long_term:
        "14.9% mean weight loss at 68 weeks (STEP 1 trial); 20% reduction in major CV events",
    },
    side_effects: [
      {
        name: "Nausea",
        incidence: "~44% of users",
        severity: "moderate",
        note: "From STEP trials; mostly during escalation phase",
      },
      { name: "Diarrhea", incidence: "~30% of users", severity: "mild" },
      { name: "Vomiting", incidence: "~24% of users", severity: "moderate" },
      { name: "Constipation", incidence: "~24% of users", severity: "mild" },
      {
        name: "Pancreatitis",
        incidence: "Rare (<1%)",
        severity: "rare",
        note: "Discontinue if severe abdominal pain",
      },
    ],
  }),
  p({
    name: "Semax",
    aliases: ["ACTH(4-7)-PGP"],
    category: "Cognitive Peptide",
    category_icon: "\u{1F9E0}",
    primary_benefits: "Mental clarity, focus, neuroprotection",
    mechanism:
      "BDNF upregulation, nootropic effects. Enhances neural plasticity, protects neurons from oxidative stress, and improves cerebral blood circulation.",
    laypersonSummary:
      "Semax is a synthetic ACTH-derived cognitive peptide approved in Russia studied for enhancing memory, focus, and neuroprotection by upregulating brain-derived neurotrophic factor (BDNF).",
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
      "Nasal spray common; well-tolerated. Approved in Russia/Ukraine. Not FDA-approved in the US.",
    half_life_hours: 0.33,
    dosing: {
      route: "Nasal",
      typical_dose_mcg: [300, 300],
      frequency: "7x/wk",
      cycle_weeks: [8, 8],
      timing: "Morning",
      reconstitution_ml: 2.5,
      typical_vial_mg: 5,
      notes: "Nasal spray: 1-2 sprays per nostril. Can cycle 5 days on/2 off.",
    },
    interactions: {
      synergies: ["Selank"],
      cautions: [],
      contraindicated: [],
      notes:
        "Semax + Selank is a popular nootropic stack for cognition + anxiety relief.",
    },
    outcomes_timeline: {
      week_1:
        "Noticeable cognitive enhancement: sharper focus, mental clarity, faster recall within days",
      week_2_4:
        "BDNF-mediated improvements in memory consolidation and mood stability",
      month_2_3:
        "Neuroprotective adaptation; reduced cognitive fatigue under stress",
      long_term:
        "Sustained cognitive baseline improvement; may support neurogenesis",
    },
    side_effects: [
      {
        name: "Nasal irritation",
        incidence: "~8% of users",
        severity: "mild",
        note: "Intranasal administration only",
      },
      { name: "Mild headache", incidence: "~5% of users", severity: "mild" },
      {
        name: "Irritability at high doses",
        incidence: "~3% of users",
        severity: "mild",
      },
    ],
  }),
  p({
    name: "Sermorelin",
    aliases: [],
    category: "GHRH Analog",
    category_icon: "\u{1F489}",
    primary_benefits: "Muscle growth, recovery, sleep, anti-aging",
    mechanism:
      "Natural GH pulse stimulation. Mimics endogenous GHRH to stimulate the pituitary gland's own growth hormone production in a physiologic, pulsatile pattern.",
    laypersonSummary:
      "Sermorelin is a GHRH analog previously FDA-approved for diagnosing GH deficiency in children, studied for restoring natural growth hormone secretion in adults without suppressing the GH axis.",
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
          "Prakash & Garg: FDA-approved indication   sermorelin produces significant and sustained height velocity increases in prepubertal children with GH deficiency.",
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
          "Study examining sermorelin's ability to stimulate GH/IGF-1 secretion in men and women, identifying gender-specific anabolic benefits and dosing considerations.",
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
      "Very safe; mimics physiology. Previously FDA-approved for GH deficiency diagnosis. Well-tolerated.",
    half_life_hours: 0.2,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [300, 300],
      frequency: "7x/wk",
      cycle_weeks: [12, 12],
      timing: "Pre-bed",
      reconstitution_ml: 2.5,
      typical_vial_mg: 2,
      notes:
        "Inject before bed for maximum GH pulse during sleep. Very short half-life = frequent dosing.",
    },
    interactions: {
      synergies: ["Ipamorelin", "CJC-1295"],
      cautions: [],
      contraindicated: [],
      notes:
        "Sermorelin + Ipamorelin is a clean GH stack. Add DSIP for sleep optimization.",
    },
    outcomes_timeline: {
      week_1: "Improved sleep depth; GH pulse enhancement during sleep",
      week_2_4:
        "Increased energy and recovery; some users report improved skin quality",
      month_2_3: "Body composition improvements; IGF-1 elevation on bloodwork",
      long_term:
        "Sustained GH axis support with physiologic (non-suppressive) mechanism",
    },
    side_effects: [
      {
        name: "Injection site reactions",
        incidence: "~8% of users",
        severity: "mild",
      },
      { name: "Headache", incidence: "~5% of users", severity: "mild" },
      { name: "Flushing", incidence: "~6% of users", severity: "mild" },
      { name: "Dizziness", incidence: "~3% of users", severity: "mild" },
    ],
  }),

  // ─── ANTI-INFLAMMATORY ───,
  p({
    name: "SS-31",
    aliases: ["Elamipretide", "Bendavia", "MTP-131"],
    category: "Mitochondrial Peptide",
    category_icon: "\u{26A1}",
    primary_benefits: "Energy, recovery, neuroprotection",
    mechanism:
      "Mitochondrial protection. Selectively concentrates in the inner mitochondrial membrane where it stabilizes cardiolipin for efficient electron transport chain function.",
    laypersonSummary:
      "SS-31 (Elamipretide) is a mitochondria-targeting peptide studied for protecting heart and muscle cells from energy failure, currently in FDA Fast Track development for heart failure.",
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
          "Study demonstrating elamipretide can reverse age-associated post-translational heart protein modifications, restoring mitochondrial function in aged cardiac tissue.",
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
      "Well-tolerated in multiple Phase 2/3 trials. Granted Fast Track and Orphan Drug designations by FDA.",
    half_life_hours: 4,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [4000, 4000],
      frequency: "7x/wk",
      cycle_weeks: [4, 4],
      timing: "Morning",
      reconstitution_ml: 2.5,
      typical_vial_mg: 10,
      notes:
        "Clinical trial doses: 4-40mg SubQ daily. Higher doses for cardiac indications.",
    },
    interactions: {
      synergies: ["MOTS-c", "Epitalon"],
      cautions: [],
      contraindicated: [],
      notes:
        "SS-31 + MOTS-c = comprehensive mitochondrial support from two different mechanisms.",
    },
    outcomes_timeline: {
      week_1:
        "Improved mitochondrial efficiency; reduced exercise-induced oxidative stress",
      week_2_4: "Improved exercise capacity and recovery; reduced fatigue",
      month_2_3:
        "Cardioprotective adaptations; improved VO2 markers in clinical trials",
      long_term:
        "Sustained mitochondrial protection; FDA Fast Track designation for cardiac indications",
    },
    side_effects: [
      {
        name: "Well-tolerated in Phase 2/3 trials",
        incidence: "No serious adverse events reported",
        severity: "mild",
      },
      {
        name: "Injection site reaction",
        incidence: "~5% of users",
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
    primary_benefits: "Muscle/tissue repair, flexibility, injury recovery",
    mechanism:
      "Upregulates actin for cell migration and wound healing. Reduces inflammation, encourages new blood vessel growth, and supports stem cell maturation for tissue repair.",
    laypersonSummary:
      "TB-500 is a synthetic fragment of Thymosin Beta-4 studied for accelerating muscle and tissue repair, reducing inflammation, and improving flexibility and range of motion after injury.",
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
      "Research-only; well-tolerated in Phase I/II trials. Not FDA-approved for systemic use.",
    half_life_hours: 2,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [2500, 2500],
      frequency: "2x/wk",
      cycle_weeks: [8, 8],
      timing: "Any time",
      reconstitution_ml: 2.5,
      typical_vial_mg: 5,
      notes:
        "Loading phase: 5mg 2x/week for 4 weeks. Maintenance: 2.5mg 2x/week.",
    },
    interactions: {
      synergies: ["BPC-157", "GHK-Cu"],
      cautions: [],
      contraindicated: [],
      notes: "TB-500 + BPC-157 is the gold-standard healing stack.",
    },
    outcomes_timeline: {
      week_1:
        "Systemic anti-inflammatory effect; improved muscle pliability and reduced stiffness",
      week_2_4:
        "Improved range of motion; reduced recovery time after training",
      month_2_3:
        "Enhanced tissue repair; measurable improvement in chronic injury sites",
      long_term:
        "Improved recovery baseline; potential stem cell mobilization benefits",
    },
    side_effects: [
      {
        name: "Injection site reaction",
        incidence: "~8% of users",
        severity: "mild",
      },
      {
        name: "Transient fatigue",
        incidence: "~4% of users",
        severity: "mild",
      },
      { name: "Headache", incidence: "~3% of users", severity: "mild" },
    ],
  }),

  // ─── GHRH ───,
  p({
    name: "Tesamorelin",
    aliases: ["Egrifta"],
    category: "GHRH Analog",
    category_icon: "\u{1F489}",
    primary_benefits: "Visceral fat reduction, body recomposition",
    mechanism:
      "Stimulates GH for fat metabolism. Binds to GHRH receptors on the pituitary gland to stimulate natural growth hormone production, specifically targeting visceral adipose tissue.",
    laypersonSummary:
      "Tesamorelin is the only FDA-approved growth-hormone-releasing peptide (Egrifta) indicated specifically for reducing visceral abdominal fat in HIV-associated lipodystrophy.",
    key_studies: [
      {
        title: "Tesamorelin visceral fat reduction (FDA trial)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20554713/",
        summary:
          "Falutz et al. (JAMA): Randomized, double-blind, placebo-controlled Phase 3 trial showing 15.2% reduction in visceral adipose tissue vs. 5% increase in placebo. FDA-approved indication.",
        evidence_level: "very-strong",
      },
      {
        title: "Tesamorelin 52-week extension study   sustained VAT reduction",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/21367932/",
        summary:
          "Falutz et al. (J. Clin. Endocrinol. Metab.): 52-week data confirming sustained 18% visceral fat reduction with continuous therapy, with reversal upon discontinuation.",
        evidence_level: "strong",
      },
      {
        title: "Tesamorelin reduces liver fat in HIV lipodystrophy",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/25271568/",
        summary:
          "Stanley et al. (Ann. Intern. Med.): RCT demonstrating tesamorelin reduces hepatic fat content in HIV-infected patients with abdominal fat accumulation.",
        evidence_level: "strong",
      },
      {
        title: "Tesamorelin improves executive function in older adults",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/16670169/",
        summary:
          "Baker et al.: GHRH treatment (tesamorelin) shows favorable effects on executive function and verbal memory in cognitively normal and mildly impaired older adults via IGF-1 elevation.",
        evidence_level: "moderate",
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
      "FDA-approved for lipodystrophy; GI side effects possible. Contraindicated in active malignancy.",
    is_fda_approved: true,
    half_life_hours: 0.43,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [1000, 1000],
      frequency: "7x/week",
      cycle_weeks: [12, 12],
      timing: "Morning",
      reconstitution_ml: 2.5,
      typical_vial_mg: 10,
      notes: "FDA-approved dose: 2mg SubQ daily. Prescription required.",
    },
    interactions: {
      synergies: ["CJC-1295", "Ipamorelin"],
      cautions: ["IGF-1 LR3"],
      contraindicated: [],
      notes:
        "Can be combined with other GH secretagogues but monitor IGF-1 levels.",
    },
    outcomes_timeline: {
      week_2_4: "Early GH-related effects; initial fluid retention possible",
      month_2_3:
        "Measurable visceral fat reduction (avg 15% in FDA trial at this point)",
      long_term:
        "Sustained visceral fat reduction and metabolic improvement; IGF-1 normalization",
    },
    side_effects: [
      {
        name: "Fluid retention",
        incidence: "~15% of users",
        severity: "mild",
        note: "From Phase 3 Egrifta trial data",
      },
      {
        name: "Injection site reactions",
        incidence: "~12% of users",
        severity: "mild",
      },
      {
        name: "Joint pain / arthralgia",
        incidence: "~8% of users",
        severity: "mild",
      },
      {
        name: "Glucose elevation",
        incidence: "~5% of users",
        severity: "moderate",
        note: "Monitor blood glucose; especially if pre-diabetic",
      },
    ],
  }),
  p({
    name: "Thymosin Alpha-1",
    aliases: ["Tα1", "Zadaxin"],
    category: "Immune Peptide",
    category_icon: "\u{1F6E1}\uFE0F",
    primary_benefits: "Immune support, antiviral, recovery",
    mechanism:
      "Enhances T-cell function, boosts dendritic cell activity, and modulates cytokine production. Shifts immune response toward effective pathogen clearance.",
    laypersonSummary:
      "Thymosin Alpha-1 is an immune-modulating peptide approved in over 35 countries for treating hepatitis B and C, studied for enhancing T-cell activity and immune resilience against infection.",
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
          "King & Tuthill: Comprehensive review of 30+ clinical trials involving 11,000+ subjects confirming Tα1's consistent safety and efficacy across hepatitis B/C, cancer, and infections.",
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
      "Approved in 35+ countries for hep B/C. One of the most extensively studied peptides. Not FDA-approved in US.",
    is_fda_approved: false,
    half_life_hours: 2,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [1500, 1500],
      frequency: "2x/wk",
      cycle_weeks: [12, 12],
      timing: "Any time",
      reconstitution_ml: 2.5,
      typical_vial_mg: 5,
      notes:
        "Standard dose: 1.6mg 2x/week. Approved in 35+ countries. Higher doses for active infection.",
    },
    interactions: {
      synergies: ["BPC-157", "KPV"],
      cautions: [],
      contraindicated: [],
      notes:
        "Can be combined with gut-healing peptides for comprehensive immune + GI support.",
    },
    outcomes_timeline: {
      week_1:
        "NK cell and T-cell activation begins; improved energy if immune-suppressed",
      week_2_4:
        "Enhanced immune response to pathogens; reduced frequency of illness",
      month_2_3: "Sustained immune modulation; improved recovery from illness",
      long_term:
        "Long-term immune resilience; approved use in 35+ countries for hepatitis therapy",
    },
    side_effects: [
      {
        name: "Injection site reaction",
        incidence: "~5% of users",
        severity: "mild",
      },
      {
        name: "Mild flu-like symptoms (immune activation)",
        incidence: "~5% of users",
        severity: "mild",
        note: "Indicates immune activation; usually transient",
      },
    ],
  }),

  // ─── MELANOCORTIN ───,
  p({
    name: "Tirzepatide",
    aliases: ["Mounjaro", "Zepbound"],
    category: "Dual Agonist (GLP-1/GIP)",
    category_icon: "\u{1F525}",
    primary_benefits: "Weight loss, body recomposition, glycemic control",
    mechanism:
      "Dual receptor agonism at GLP-1 and GIP receptors for synergistic appetite suppression, improved insulin sensitivity, and enhanced metabolic function.",
    laypersonSummary:
      "Tirzepatide is an FDA-approved dual GLP-1/GIP agonist sold as Mounjaro for type 2 diabetes and Zepbound for obesity, achieving up to 22.5% body weight loss in clinical trials.",
    key_studies: [
      {
        title: "Tirzepatide Phase 3 SURMOUNT-1: up to 22.5% weight loss",
        pubmed_url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038",
        summary:
          "Jastreboff et al. (NEJM): Phase 3 SURMOUNT-1 trial   tirzepatide 15mg achieved 22.5% body weight reduction vs 2.4% placebo at 72 weeks in 2,539 adults with obesity.",
        evidence_level: "very-strong",
      },
      {
        title: "SURMOUNT-4: 176-week long-term weight maintenance",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39110493/",
        summary:
          "Aronne et al.: 176-week data showing sustained weight loss maintenance with continued tirzepatide treatment   15mg dose maintained -19.7% weight reduction.",
        evidence_level: "very-strong",
      },
      {
        title: "Tirzepatide meta-analysis: BMI, weight, and metabolic outcomes",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37482772/",
        summary:
          "Meta-analysis of multiple RCTs confirming tirzepatide significantly reduces BMI, waist circumference, body weight, and HbA1c across diverse patient populations.",
        evidence_level: "very-strong",
      },
      {
        title: "SURPASS program: tirzepatide in type 2 diabetes (Phase 3)",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34170647/",
        summary:
          "Frias et al. (NEJM): SURPASS-1 trial showing tirzepatide reduces HbA1c by up to 2.07% and body weight by 9.5 kg in type 2 diabetes. Superior to semaglutide in head-to-head trials.",
        evidence_level: "very-strong",
      },
    
      {
        title: "Efficacy and safety of a novel dual GIP and GLP-1 receptor agonist tirzepatide in patients with type 2 diabetes (SURPASS-1): a double-blind, randomised, phase 3 trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34186022/",
        summary: "A study published in Lancet (London, England) investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Tirzepatide for Obesity Treatment and Diabetes Prevention.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39536238/",
        summary: "A study published in The New England journal of medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Obesity Management in Adults: A Review.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38015216/",
        summary: "A study published in JAMA investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/34170647/",
        summary: "A study published in The New England journal of medicine investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Effect of Subcutaneous Tirzepatide vs Placebo Added to Titrated Insulin Glargine on Glycemic Control in Patients With Type 2 Diabetes: The SURPASS-5 Randomized Clinical Trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/35133415/",
        summary: "A study published in JAMA investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Comparison of tirzepatide and dulaglutide on major adverse cardiovascular events in participants with type 2 diabetes and atherosclerotic cardiovascular disease: SURPASS-CVOT design and baseline characteristics.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37758044/",
        summary: "A study published in American heart journal investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Tirzepatide after intensive lifestyle intervention in adults with overweight or obesity: the SURMOUNT-3 phase 3 trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37840095/",
        summary: "A study published in Nature medicine investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Tirzepatide for Heart Failure with Preserved Ejection Fraction and Obesity.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39555826/",
        summary: "A study published in The New England journal of medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Tirzepatide once weekly for the treatment of obesity in people with type 2 diabetes (SURMOUNT-2): a double-blind, randomised, multicentre, placebo-controlled, phase 3 trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37385275/",
        summary: "A study published in Lancet (London, England) investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Tirzepatide as Compared with Semaglutide for the Treatment of Obesity.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/40353578/",
        summary: "A study published in The New England journal of medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Semaglutide vs Tirzepatide for Weight Loss in Adults With Overweight or Obesity.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38976257/",
        summary: "A study published in JAMA internal medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Tirzepatide vs Insulin Lispro Added to Basal Insulin in Type 2 Diabetes: The SURPASS-6 Randomized Clinical Trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/37786396/",
        summary: "A study published in JAMA investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Tirzepatide for Metabolic Dysfunction-Associated Steatohepatitis with Liver Fibrosis.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38856224/",
        summary: "A study published in The New England journal of medicine investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Tirzepatide: A Systematic Update.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/36498958/",
        summary: "A study published in International journal of molecular sciences investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Tirzepatide for the treatment of obstructive sleep apnea: Rationale, design, and sample baseline characteristics of the SURMOUNT -OSA phase 3 trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38547961/",
        summary: "A study published in Contemporary clinical trials investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Mechanisms of action and therapeutic applications of GLP-1 and dual GIP/GLP-1 receptor agonists.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/39114288/",
        summary: "A study published in Frontiers in endocrinology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      }],
    safety_notes:
      "FDA-approved for type 2 diabetes (Mounjaro) and obesity (Zepbound). GI side effects common but manageable. Well-studied long-term safety.",
    is_fda_approved: true,
    half_life_hours: 120,
    dosing: {
      route: "SubQ",
      typical_dose_mcg: [2500, 2500],
      frequency: "1x/wk",
      cycle_weeks: [12, 12],
      timing: "Any day, same day each week",
      reconstitution_ml: 2.5,
      typical_vial_mg: 10,
      notes:
        "Start 2.5mg weekly, escalate every 4 weeks: 5mg → 7.5mg → 10mg → 12.5mg → 15mg. Prescription required.",
    },
    interactions: {
      synergies: [],
      cautions: ["Semaglutide", "Retatrutide"],
      contraindicated: [],
      notes: "Do NOT combine with other GLP-1 agonists.",
    },
    outcomes_timeline: {
      week_1: "GI adjustment period; appetite suppression begins",
      week_2_4: "5-8% weight reduction at therapeutic dose",
      month_2_3: "15-20% body weight reduction at 15mg",
      long_term:
        "22.5% weight loss at 72 weeks (SURMOUNT-1); superior to semaglutide in head-to-head",
    },
    side_effects: [
      {
        name: "Nausea",
        incidence: "~32% of users",
        severity: "moderate",
        note: "From SURMOUNT-1 Phase 3 trial",
      },
      { name: "Diarrhea", incidence: "~23% of users", severity: "mild" },
      { name: "Vomiting", incidence: "~20% of users", severity: "moderate" },
      { name: "Constipation", incidence: "~18% of users", severity: "mild" },
      {
        name: "Hypoglycemia",
        incidence: "~5% of users",
        severity: "moderate",
        note: "Risk higher when combined with insulin",
      },
    ],
  }),
  p({
    name: "Tesofensine",
    aliases: ["NS2330"],
    category: "Small Molecule",
    category_icon: "\u{1F9E0}",
    primary_benefits:
      "Extreme fat loss and appetite suppression without GLP-1 side effects",
    mechanism:
      "Triple monoamine reuptake inhibitor (inhibits reuptake of serotonin, noradrenaline, and dopamine). Originates as an Alzheimer's/Parkinson's drug but abandoned due to massive weight loss profiles.",
    laypersonSummary:
      "Tesofensine is an investigational triple monoamine reuptake inhibitor originally developed for Alzheimer's disease, studied for powerful appetite suppression and weight loss exceeding 10% in 24 weeks.",
    key_studies: [
      {
        title: "Tesofensine induces profound weight loss",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18950803/",
        summary:
          "Phase 2 Lancet study showing 12.8 kg (10.6%) weight loss over 24 weeks at 1mg dose.",
        evidence_level: "strong",
      },
    
      {
        title: "Tesofensine--a novel potent weight loss medicine. Evaluation of: Astrup A, Breum L, Jensen TJ, Kroustrup JP, Larsen TM. Effect of tesofensine on bodyweight loss, body composition, and quality of life in obese patients: a randomised, double-blind, placebo-controlled trial. Lancet 2008;372:1906-13.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19548858/",
        summary: "A study published in Expert opinion on investigational drugs investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Weight loss produced by tesofensine in patients with Parkinson's or Alzheimer's disease.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18356831/",
        summary: "A study published in Obesity (Silver Spring, Md.) investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Tesofensine and weight loss.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19249625/",
        summary: "A study published in Lancet (London, England) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "A quantitative enterohepatic circulation model: development and evaluation with tesofensine and meloxicam.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19705923/",
        summary: "A study published in Clinical pharmacokinetics investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Expression of concern--effect of tesofensine on bodyweight loss, body composition, and quality of life in obese patients: a randomised, double-blind, placebo-controlled trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23561987/",
        summary: "A study published in Lancet (London, England) investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Tesofensine, a novel antiobesity drug, silences GABAergic hypothalamic neurons.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/38656972/",
        summary: "A study published in PloS one investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Effect of tesofensine on bodyweight loss, body composition, and quality of life in obese patients: a randomised, double-blind, placebo-controlled trial.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/18950853/",
        summary: "A study published in Lancet (London, England) investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "New and emerging drug molecules against obesity.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/24064009/",
        summary: "A study published in Journal of cardiovascular pharmacology and therapeutics investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Quantitative pharmacology approach in Alzheimer's disease: efficacy modeling of early clinical data to predict clinical outcome of tesofensine.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20077053/",
        summary: "A study published in The AAPS journal investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Structural basis for pharmacotherapeutic action of triple reuptake inhibitors.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/41392177/",
        summary: "A study published in Nature communications investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Future Pharmacotherapy for Obesity: New Anti-obesity Drugs on the Horizon.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/29504049/",
        summary: "A study published in Current obesity reports investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Expression of brain derived neurotrophic factor, activity-regulated cytoskeleton protein mRNA, and enhancement of adult hippocampal neurogenesis in rats after sub-chronic and chronic treatment with the triple monoamine re-uptake inhibitor tesofensine.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17112503/",
        summary: "A study published in European journal of pharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Subjective and objective effects of the novel triple reuptake inhibitor tesofensine in recreational stimulant users.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/20520602/",
        summary: "A study published in Clinical pharmacology and therapeutics investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Contribution of the active metabolite M1 to the pharmacological activity of tesofensine in vivo: a pharmacokinetic-pharmacodynamic modelling approach.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17982477/",
        summary: "A study published in British journal of pharmacology investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "[The effect of tesofensine on body weight and body composition in obese subjects--secondary publication].",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/19824222/",
        summary: "A study published in Ugeskrift for laeger investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Tesofensine induces appetite suppression and weight loss with reversal of low forebrain dopamine levels in the diet-induced obese rat.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23932919/",
        summary: "A study published in Pharmacology, biochemistry, and behavior investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Anti-hypertensive treatment preserves appetite suppression while preventing cardiovascular adverse effects of tesofensine in rats.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/23784901/",
        summary: "A study published in Obesity (Silver Spring, Md.) investigating the effects and mechanisms.",
        evidence_level: "preclinical"
      },
      {
        title: "Population pharmacokinetic modelling of NS2330 (tesofensine) and its major metabolite in patients with Alzheimer's disease.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/17324246/",
        summary: "A study published in British journal of clinical pharmacology investigating the effects and mechanisms.",
        evidence_level: "moderate"
      },
      {
        title: "Anti-obesity drugs: a review about their effects and their safety.",
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/22439841/",
        summary: "A study published in Expert opinion on drug safety investigating the effects and mechanisms.",
        evidence_level: "moderate"
      }],
    safety_notes:
      "Research-only. Potent CNS stimulant. Can cause insomnia, elevated heart rate, and dry mouth. Half-life is extremely long, leading to accumulation in the system.",
    half_life_hours: 216,
    is_fda_approved: false,
    dosing: {
      route: "Oral",
      typical_dose_mcg: [250, 500],
      frequency: "Daily",
      cycle_weeks: [12, 24],
      timing: "Early Morning",
      reconstitution_ml: 0,
      typical_vial_mg: 0,
      notes:
        "Do not exceed 0.5mg/day due to heart rate spikes. Taken via capsule, not injected.",
    },
    interactions: {
      synergies: [],
      cautions: ["Stimulants", "Caffeine"],
      contraindicated: ["MAOIs", "SSRIs"],
      notes: "Do NOT mix with anti-depressants due to serotonin syndrome risk.",
    },
    outcomes_timeline: {
      week_1: "Complete abolition of hunger cravings, massive energy",
      month_2_3: "10%+ body weight loss",
    },
    side_effects: [
      { name: "Insomnia", incidence: "~15% of users", severity: "moderate" },
      { name: "Dry Mouth", incidence: "~20% of users", severity: "mild" },
      {
        name: "Elevated Heart Rate",
        incidence: "~12% of users",
        severity: "moderate",
      },
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
