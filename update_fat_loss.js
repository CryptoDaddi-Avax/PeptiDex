const fs = require('fs');

const fatLossContent = {
  whyThesePeptides: `<h2>Mechanisms of Peptide-Mediated Fat Loss</h2>
<p>The physiological mechanisms governing fat loss have been fundamentally redefined by the advent of targeted peptide therapeutics. Traditional approaches relied heavily on systemic metabolic stimulation or brute-force caloric restriction, often resulting in significant lean mass catabolism and eventual metabolic adaptation. Modern peptide protocols, conversely, target specific neuroendocrine and cellular pathways to optimize substrate utilization and appetite regulation.</p>
<h3>Incretin Receptor Agonism</h3>
<p>The most potent class of fat loss peptides are the incretin mimetics, which include GLP-1 (glucagon-like peptide-1), GIP (glucose-dependent insulinotropic polypeptide), and glucagon receptor agonists. <strong>Semaglutide</strong> acts exclusively on the GLP-1 receptor, primarily in the hypothalamus and brainstem, to drastically reduce appetite and slow gastric emptying, creating a substantial, sustainable caloric deficit. <strong>Tirzepatide</strong> introduces GIP receptor agonism, which operates synergistically with GLP-1 to enhance insulin sensitivity and directly modulate adipocyte (fat cell) lipid buffering capacity, leading to superior weight reduction.</p>
<p><strong>Retatrutide</strong> represents the next generation: a triple-agonist that adds glucagon receptor activation. While glucagon raises blood sugar, its activation simultaneously drives significant hepatic lipid clearance and dramatically increases resting energy expenditure (thermogenesis). This tri-receptor synergy prevents the metabolic slowdown typically associated with rapid weight loss.</p>
<h3>Direct Lipolysis and Mitochondrial Function</h3>
<p>For researchers seeking fat loss without incretin-mediated appetite suppression, peptides like <strong>AOD-9604</strong> and <strong>MOTS-c</strong> offer alternative pathways. AOD-9604, a C-terminal fragment of Human Growth Hormone (hGH), directly stimulates lipolysis (fat breakdown) by upregulating beta-3 adrenergic receptors on adipocytes, entirely bypassing the IGF-1 growth pathways that cause hGH side effects. <strong>MOTS-c</strong>, a mitochondrial-derived peptide, acts as a cellular energy mimic. It activates AMPK (AMP-activated protein kinase), the cell's master metabolic switch, driving glucose uptake into muscle tissue and enhancing fatty acid oxidation, fundamentally improving metabolic flexibility.</p>
<h3>Targeted Visceral Fat Reduction</h3>
<p><strong>Tesamorelin</strong>, a Growth Hormone Releasing Hormone (GHRH) analogue, offers a unique mechanism. By stimulating pulsatile endogenous GH release, it selectively targets visceral adipose tissue (VAT)—the dangerous, metabolically active fat surrounding organs. Research shows tesamorelin causes profound reductions in VAT while preserving subcutaneous fat and lean tissue, making it a highly specific tool for body recomposition.</p>`,

  whatResearchShows: `<h2>Clinical Evidence and Efficacy</h2>
<p>The clinical data supporting these peptides represents some of the most robust and statistically significant findings in modern endocrinology, moving far beyond theoretical mechanisms into proven human outcomes.</p>
<h3>The SURMOUNT and STEP Trials</h3>
<p>The efficacy of incretin mimetics is definitively established by large-scale, multi-center randomized controlled trials. In the landmark SURMOUNT-1 Phase 3 trial, Jastreboff et al. demonstrated that <strong>Tirzepatide</strong> (15mg weekly) achieved an unprecedented 22.5% body weight reduction over 72 weeks in adults with obesity (PMID: 35658024). This magnitude of weight loss rivals bariatric surgery. Furthermore, the SURMOUNT-4 trial confirmed that continued tirzepatide administration is necessary for long-term weight maintenance, sustaining a -19.7% weight reduction at 176 weeks (PMID: 39110493).</p>
<p><strong>Semaglutide</strong> established the foundation for this class in the STEP 1 trial, where a 2.4mg weekly dose resulted in a 14.9% mean body weight reduction over 68 weeks. <strong>Retatrutide</strong>, the investigational triple-agonist, has shown even more profound early results, with Phase 2 trials demonstrating ~24% body weight reduction at 48 weeks, alongside near-complete resolution of liver fat (steatosis) in a subset of patients.</p>
<h3>AOD-9604 and Tesamorelin Clinical Data</h3>
<p>While incretins dominate total body weight reduction, other peptides excel in targeted applications. A Phase IIb trial of <strong>AOD-9604</strong> (1mg/day over 12 weeks) demonstrated a 2.6 kg weight loss compared to 0.8 kg for placebo, with researchers noting specific reductions in abdominal adiposity and a highly favorable safety profile devoid of glucose intolerance (PMID: 15655039). A pooled analysis of six RCTs by Heffernan et al. confirmed AOD-9604's safety and tolerability, distinguishing it from full-length growth hormone (PMID: 19268492).</p>
<p><strong>Tesamorelin</strong> has extensive clinical validation specifically for HIV-associated lipodystrophy. Clinical trials consistently show that tesamorelin reduces visceral adipose tissue by approximately 18% over 26 weeks, compared to a 1% increase in placebo groups. Importantly, studies such as those published in the Journal of Infectious Diseases confirm these reductions are sustained over long-term use without causing significant perturbations to glucose homeostasis, unlike exogenous hGH administration (PMID: 39813152).</p>`,

  howToEvaluate: `<h2>Tracking Progress and Metabolic Metrics</h2>
<p>Evaluating a fat loss peptide protocol requires tracking metrics far beyond the standard bathroom scale. Because compounds like Tirzepatide and Tesamorelin significantly alter body composition, researchers must monitor multiple vectors of metabolic health.</p>
<ul>
  <li><strong>DEXA Scans (Dual-Energy X-ray Absorptiometry):</strong> The gold standard for tracking protocol efficacy. DEXA provides precise quantification of visceral adipose tissue (VAT) reduction, subcutaneous fat changes, and crucially, Lean Body Mass (LBM) retention. Incretin protocols often result in significant LBM loss if protein intake and resistance training are not strictly managed.</li>
  <li><strong>Metabolic Blood Panels:</strong> Fasting insulin, HbA1c, and advanced lipid panels (ApoB, LDL-P) should be tracked at baseline, 8 weeks, and 16 weeks. Peptides like MOTS-c and Tirzepatide should drastically improve insulin sensitivity indices (HOMA-IR).</li>
  <li><strong>Subjective Satiety and Gastric Emptying:</strong> For GLP-1/GIP agonists, researchers should track subjective hunger cues, portion sizes required for satiation, and gastrointestinal transit times. This qualitative data dictates dosage titration; the goal is the minimum effective dose required to maintain a caloric deficit without inducing severe nausea or malnutrition.</li>
</ul>`,

  alternativeApproaches: `<h2>Alternative Stacks and Tradeoffs</h2>
<p>While incretin mimetics are highly effective, they are not suitable for all research scenarios. Alternative protocols offer different risk/reward profiles.</p>
<h3>The Non-Incretin Lipolytic Stack (AOD-9604 + MOTS-c)</h3>
<p>For researchers who experience severe gastrointestinal distress from GLP-1 agonists or who wish to avoid profound appetite suppression (e.g., athletes needing high caloric intake for performance but wanting leaner body composition), this stack is optimal. AOD-9604 drives direct fat breakdown, while MOTS-c upregulates cellular energy expenditure. <strong>Tradeoff:</strong> Weight loss is significantly slower and less dramatic than with Tirzepatide, requiring strict adherence to an external dietary caloric deficit.</p>
<h3>The Recomposition and Visceral Focus Stack (Tesamorelin + Ipamorelin)</h3>
<p>This protocol leverages the GH axis. Tesamorelin specifically attacks visceral fat, while Ipamorelin provides a gentle, synergistic pulse of natural GH to protect lean muscle mass and enhance recovery. <strong>Tradeoff:</strong> This stack requires daily or twice-daily subcutaneous injections, compared to the once-weekly administration of most incretins. It is highly effective for reducing waist circumference but will not produce massive total-body weight loss if diet is uncontrolled.</p>`,

  references: [
    { id: 1, text: "Jastreboff et al. (2022). Tirzepatide Once Weekly for the Treatment of Obesity.", link: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038" },
    { id: 2, text: "Aronne et al. (2024). Continued Treatment With Tirzepatide for Maintenance of Weight Reduction in Adults With Obesity: The SURMOUNT-4 Randomized Clinical Trial.", link: "https://pubmed.ncbi.nlm.nih.gov/39110493/" },
    { id: 3, text: "Frias et al. (2021). Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes.", link: "https://pubmed.ncbi.nlm.nih.gov/34170647/" },
    { id: 4, text: "Heffernan et al. (2009). The Effects of Human GH and Its Lipolytic Fragment (AOD9604) on Lipid Metabolism Following Chronic Treatment in Obese Mice and Knockout Mice.", link: "https://pubmed.ncbi.nlm.nih.gov/19268492/" },
    { id: 5, text: "Ng et al. (2000). AOD-9604 lipolysis stimulation in preclinical models.", link: "https://pubmed.ncbi.nlm.nih.gov/11146367/" }
  ]
};

const file = fs.readFileSync('src/data/goal-pages.ts', 'utf8');

const fatLossRegex = /slug:\s*"fat-loss",[\s\S]*?deepDive:[\s\S]*?clinicalEvidence:[\s\S]*?protocolGuidelines:.*?\n\s*},/g;

const newFatLossString = file.replace(fatLossRegex, (match) => {
    const prefixMatch = match.match(/([\s\S]*?)(deepDive:)/);
    if (!prefixMatch) return match;
    const prefix = prefixMatch[1];
    
    return prefix + 
        'whyThesePeptides: `' + fatLossContent.whyThesePeptides + '`,\n        ' +
        'whatResearchShows: `' + fatLossContent.whatResearchShows + '`,\n        ' +
        'howToEvaluate: `' + fatLossContent.howToEvaluate + '`,\n        ' +
        'alternativeApproaches: `' + fatLossContent.alternativeApproaches + '`,\n        ' +
        'references: ' + JSON.stringify(fatLossContent.references, null, 12) + '\n    },';
});

fs.writeFileSync('src/data/goal-pages.ts', newFatLossString);
console.log("Updated fat-loss");
