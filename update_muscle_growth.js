const fs = require('fs');

const muscleGrowthContent = {
  whyThesePeptides: `<h2>The Physiology of Peptide-Induced Muscle Hypertrophy</h2>
<p>Muscle growth is a complex physiological process governed by mechanical tension, metabolic stress, and a highly orchestrated hormonal cascade. Peptides, particularly those modulating the growth hormone (GH) axis and specific local growth factors, have emerged as potent tools in research settings for optimizing these processes.</p>
<h3>The Growth Hormone Secretagogue (GHS) Pathway</h3>
<p>The foundation of peptide-mediated muscle growth relies on amplifying endogenous growth hormone secretion. This is typically achieved through the synergistic use of a Growth Hormone Releasing Hormone (GHRH) analog, such as <strong>CJC-1295</strong>, and a Growth Hormone Secretagogue Receptor (GHSR) agonist, like <strong>Ipamorelin</strong>. CJC-1295 directly stimulates the pituitary gland to release GH, providing a prolonged, steady state of elevated GH. Ipamorelin, a selective ghrelin mimetic, acts on a different receptor pathway to also stimulate GH release, while crucially suppressing somatostatin (the hormone that inhibits GH release). The co-administration creates an amplified GH pulse that closely mimics physiological patterns but at a heightened magnitude.</p>
<p>Elevated systemic GH exerts its anabolic effects primarily by stimulating the liver to produce Insulin-like Growth Factor 1 (IGF-1). IGF-1 binds to the IGF-1 receptor (IGF-1R) on muscle cells, activating the PI3K/Akt/mTOR pathway, the master regulator of protein synthesis. Furthermore, IGF-1 stimulates the proliferation of satellite cells—the resident stem cells of skeletal muscle—which donate their nuclei to sustain long-term hypertrophy.</p>
<h3>Targeting Hyperplasia: IGF-1 LR3</h3>
<p>While GH secretagogues primarily drive hypertrophy, research into <strong>IGF-1 LR3</strong> (Long Arg3 IGF-1) focuses on muscle hyperplasia. IGF-1 LR3 is a synthetic analogue with an extended half-life and significantly reduced binding affinity for IGF-binding proteins (IGFBPs). By evading these binding proteins, IGF-1 LR3 remains active in the bloodstream longer. The critical distinction is its purported ability to strongly drive satellite cell proliferation to the point where they may fuse to form entirely new, nascent muscle fibers, expanding the genetic potential for overall muscle mass.</p>
<h3>Myostatin Inhibition: Follistatin-344</h3>
<p>A completely different approach involves inhibiting the negative regulators of muscle mass, notably myostatin (GDF-8). <strong>Follistatin-344</strong> is a potent antagonist that binds directly to myostatin, preventing it from interacting with the ActRIIB receptor on muscle cells. By neutralizing myostatin, Follistatin-344 effectively removes the physiological limits on muscle growth, allowing for dramatic increases in both muscle fiber size and number, independent of the GH/IGF-1 axis.</p>`,

  whatResearchShows: `<h2>Clinical and Preclinical Evidence for Muscle Growth</h2>
<p>The evidence supporting the use of peptides for muscle growth is robust across preclinical and clinical domains. The scientific community has extensively investigated their potential to upregulate anabolic signaling and improve body composition.</p>
<h3>Clinical Validation of GH Secretagogues</h3>
<p>The clinical efficacy of CJC-1295 and Ipamorelin is well-documented. Early phase clinical trials for CJC-1295 demonstrated its profound impact on GH secretion, showing that a single injection can increase basal GH levels and maintain elevated IGF-1 levels for up to 28 days (PMID: 16822960). In animal models, Ipamorelin induces dose-dependent longitudinal bone growth and counters glucocorticoid-induced decreases in muscle strength (PMID: 10444229). A 2020 review of growth hormone secretagogues highlighted their ability to stimulate GH and IGF-1, resulting in significant improvements in body composition and lean mass accrual in hypogonadal males (PMID: 32257855).</p>
<h3>Preclinical Research on IGF-1 LR3 and Follistatin</h3>
<p>Research surrounding IGF-1 LR3 relies heavily on *in vitro* cellular studies. In skeletal muscle cell cultures, IGF-1 LR3 is significantly more potent than native IGF-1 in stimulating protein synthesis and inhibiting protein degradation due to its decreased affinity for IGF binding proteins. Animal studies have shown localized administration induces significant muscle hypertrophy and satellite cell activity (PMID: 11252465).</p>
<p>The evidence for Follistatin is profound in animal models. The discovery of the "mighty mouse"—mice genetically engineered to lack myostatin—first highlighted this pathway. Subsequent studies utilizing Follistatin-344 in various animal models (including primates) consistently demonstrated dramatic increases in muscle mass and strength, up to 30% over control groups in specific experimental protocols (PMID: 19430480). While human trials are primarily focused on muscular dystrophy, the preclinical data establishes Follistatin as a master regulator of muscle mass.</p>`,

  howToEvaluate: `<h2>Tracking Hypertrophy and Anabolic Response</h2>
<p>Evaluating a muscle growth peptide protocol requires precise measurement of anabolism and recovery metrics.</p>
<ul>
  <li><strong>DEXA Scans:</strong> To accurately quantify Fat-Free Mass (FFM) and Lean Body Mass (LBM) gains versus fluid retention, which can sometimes occur with GH secretagogues.</li>
  <li><strong>IGF-1 Serum Levels:</strong> The most direct biomarker for the efficacy of the CJC-1295/Ipamorelin stack. Baseline IGF-1 should be compared against mid-cycle levels (typically week 4-6) to ensure the secretagogues are successfully stimulating hepatic production.</li>
  <li><strong>Strength and Recovery Metrics:</strong> Tracking 1RM (One Rep Maximum), total training volume, and time-to-recovery between intense sessions. An effective peptide protocol should noticeably decrease DOMS (Delayed Onset Muscle Soreness) and increase workout frequency capacity.</li>
</ul>`,

  alternativeApproaches: `<h2>Alternative Stacks and Tradeoffs</h2>
<p>While the standard GH secretagogue stack is highly effective, specific research goals may dictate alternative approaches.</p>
<h3>The Localized Hyperplasia Protocol (IGF-1 LR3)</h3>
<p>For researchers focusing on lagging muscle groups, IGF-1 LR3 is often administered bilaterally post-workout into the trained muscle. <strong>Tradeoff:</strong> This requires precise intramuscular injections and carries theoretical risks of localized insulin resistance or unwanted cellular proliferation if overused. It lacks the systemic restorative benefits of GH secretagogues.</p>
<h3>The Recomposition Stack (Sermorelin + Ipamorelin)</h3>
<p>Sermorelin has a much shorter half-life than CJC-1295. This stack provides a sharper, more physiological pulse of GH without elevating baseline levels as high as CJC-1295 with DAC. <strong>Tradeoff:</strong> It requires more frequent injections (often 2-3x daily) to match the total anabolic output of CJC-1295, but is often considered to carry a lower risk of pituitary desensitization and water retention.</p>`,

  references: [
    { id: 1, text: "Teichman et al. (2006). Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295.", link: "https://pubmed.ncbi.nlm.nih.gov/16822960/" },
    { id: 2, text: "Svensson et al. (2000). Ipamorelin and longitudinal bone growth in rats.", link: "https://pubmed.ncbi.nlm.nih.gov/10444229/" },
    { id: 3, text: "Garcia et al. (2020). Beyond the androgen receptor: the role of growth hormone secretagogues.", link: "https://pubmed.ncbi.nlm.nih.gov/32257855/" },
    { id: 4, text: "Tomas et al. (2001). IGF-I analogues in the treatment of muscle wasting conditions.", link: "https://pubmed.ncbi.nlm.nih.gov/11252465/" },
    { id: 5, text: "Kota et al. (2009). Follistatin gene delivery enhances muscle growth and strength in nonhuman primates.", link: "https://pubmed.ncbi.nlm.nih.gov/19430480/" }
  ]
};

const file = fs.readFileSync('src/data/goal-pages.ts', 'utf8');

const muscleGrowthRegex = /slug:\s*"muscle-growth",[\s\S]*?deepDive:[\s\S]*?clinicalEvidence:[\s\S]*?protocolGuidelines:.*?\n\s*},/g;

const newMuscleGrowthString = file.replace(muscleGrowthRegex, (match) => {
    const prefixMatch = match.match(/([\s\S]*?)(deepDive:)/);
    if (!prefixMatch) return match;
    const prefix = prefixMatch[1];
    
    return prefix + 
        'whyThesePeptides: `' + muscleGrowthContent.whyThesePeptides + '`,\n        ' +
        'whatResearchShows: `' + muscleGrowthContent.whatResearchShows + '`,\n        ' +
        'howToEvaluate: `' + muscleGrowthContent.howToEvaluate + '`,\n        ' +
        'alternativeApproaches: `' + muscleGrowthContent.alternativeApproaches + '`,\n        ' +
        'references: ' + JSON.stringify(muscleGrowthContent.references, null, 12) + '\n    },';
});

fs.writeFileSync('src/data/goal-pages.ts', newMuscleGrowthString);
console.log("Updated muscle-growth");
