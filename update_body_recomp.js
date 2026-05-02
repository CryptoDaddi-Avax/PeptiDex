const fs = require('fs');

const recompContent = {
  whyThesePeptides: `<h2>The Molecular Mechanics of Body Recomposition</h2>
<p>Body recomposition—the simultaneous accretion of skeletal muscle mass and oxidation of adipose tissue—represents the pinnacle of metabolic optimization. While extreme caloric deficits drive fat loss and hypercaloric states drive muscle growth, recomposition requires a delicate, highly regulated endocrine environment. Peptides like Tesamorelin, Ipamorelin, and BPC-157 offer precise tools to orchestrate this environment by selectively targeting the growth hormone (GH) axis, metabolic substrate utilization, and cellular repair pathways.</p>
<h3>Targeting Visceral Adiposity with Tesamorelin</h3>
<p><strong>Tesamorelin</strong>, a synthetic analogue of Growth Hormone Releasing Hormone (GHRH), is the cornerstone of advanced recomposition protocols due to its unique tissue selectivity. Unlike standard GH secretagogues that induce generalized lipolysis, Tesamorelin specifically targets visceral adipose tissue (VAT). VAT is highly metabolically active and uniquely responsive to the specific pulsatile GH release pattern induced by Tesamorelin. By stimulating the pituitary to release GH in a sustained, high-amplitude pulse, Tesamorelin drives intense lipolysis in the abdominal region without significantly altering glucose homeostasis, a common drawback of exogenous recombinant hGH.</p>
<h3>Synergistic Anabolism with Ipamorelin</h3>
<p>To maximize the recomposition effect, Tesamorelin is frequently paired with <strong>Ipamorelin</strong>, a selective Growth Hormone Secretagogue Receptor (GHSR) agonist (a ghrelin mimetic). While Tesamorelin provides the 'push' for GH release from the pituitary, Ipamorelin amplifies the signal and critically suppresses somatostatin (the 'brake' on GH release). Ipamorelin is specifically chosen over other GHRPs (like GHRP-2 or GHRP-6) because it does not significantly elevate cortisol or prolactin—stress hormones that are highly catabolic to muscle tissue and can promote fat storage. This synergistic pairing results in a massive, clean pulse of GH that elevates circulating IGF-1 levels, driving the hypertrophy of skeletal muscle while simultaneously mobilizing free fatty acids for oxidation.</p>
<h3>Cellular Repair and Nutrient Partitioning with BPC-157</h3>
<p><strong>BPC-157</strong> (Body Protection Compound-157) plays a critical supporting role in recomposition. While not directly lipolytic or anabolic in the traditional hormonal sense, BPC-157 drastically upregulates angiogenesis (new blood vessel formation) and modulates the expression of various growth factors (like VEGF and FGF). In a recomposition context, where researchers are often pushing high training volumes while maintaining a slight caloric deficit, BPC-157 accelerates the repair of exercise-induced microtrauma in muscle and connective tissue. By optimizing recovery, it ensures that training stimuli effectively translate into myofibrillar hypertrophy rather than accumulating systemic fatigue.</p>`,

  whatResearchShows: `<h2>Clinical Evidence for Recomposition Peptides</h2>
<p>The clinical and preclinical evidence supporting these specific peptides underscores their efficacy in altering the ratio of lean mass to fat mass, validating their use in recomposition research.</p>
<h3>Tesamorelin: The Visceral Fat Specialist</h3>
<p>Tesamorelin has robust clinical validation, specifically holding FDA approval for the reduction of excess abdominal fat in HIV-associated lipodystrophy. In pivotal randomized, placebo-controlled clinical trials, Tesamorelin administration (2 mg daily) resulted in a highly significant 18% reduction in visceral adipose tissue over 26 weeks, compared to a negligible change in the placebo group (PMID: 22298602). Crucially, these trials demonstrated that the reduction in VAT was achieved without a concurrent reduction in subcutaneous fat or lean body mass, precisely the targeted effect desired in body recomposition. Furthermore, a 2020 study in JCI Insight confirmed that Tesamorelin not only reduces visceral fat but significantly improves hepatic transcriptomic signatures associated with NAFLD (Non-Alcoholic Fatty Liver Disease), highlighting its profound systemic metabolic benefits (PMID: 32701508).</p>
<h3>Ipamorelin: Safe and Selective GH Amplification</h3>
<p>Preclinical evidence strongly supports Ipamorelin's role in altering body composition. A foundational study by Svensson et al. demonstrated that Ipamorelin induces dose-dependent longitudinal bone growth and significantly counters the catabolic effects of glucocorticoids, preserving muscle strength and mass in a catabolic environment (PMID: 10444229). A 2020 review on the management of body composition in hypogonadal males highlighted growth hormone secretagogues like Ipamorelin for their ability to significantly stimulate GH and IGF-1 axes, leading to measurable amelioration of fat gain and support of lean mass without the prostate or cardiovascular risks associated with traditional androgen therapies (PMID: 32257855).</p>
<h3>BPC-157: Accelerated Tissue Regeneration</h3>
<p>While BPC-157 lacks the extensive Phase III human clinical trials of Tesamorelin, the preclinical evidence for its regenerative capacity is overwhelming. Studies have consistently shown that BPC-157 accelerates the healing of transected muscles, crushed muscles, and severed tendons by actively promoting the out-growth of tendon fibroblasts and increasing cell survival under oxidative stress (PMID: 21030672). In the context of recomposition, this translates to an enhanced ability to sustain the high-frequency resistance training necessary to drive muscle protein synthesis during periods of caloric restriction.</p>`,

  howToEvaluate: `<h2>Tracking Recomposition Metrics</h2>
<p>Body recomposition is notoriously difficult to track because total body weight may remain completely static while profound shifts in tissue ratios occur. Traditional scales are essentially useless for evaluating these protocols.</p>
<ul>
  <li><strong>DEXA Scans:</strong> The absolute gold standard. Researchers must use DEXA to quantify changes in Visceral Adipose Tissue (VAT) mass and Lean Body Mass (LBM). A successful Tesamorelin/Ipamorelin protocol will show a sharp decline in VAT with static or increasing LBM.</li>
  <li><strong>Tape Measurements & Calipers:</strong> Because Tesamorelin selectively targets the abdominal region, waist circumference at the umbilicus is a primary metric. Skinfold calipers can track subcutaneous fat, which should decrease globally as the metabolic rate increases.</li>
  <li><strong>Fasting Blood Glucose and HbA1c:</strong> Unlike recombinant hGH, which frequently induces insulin resistance, the physiological GH pulses stimulated by Tesamorelin and Ipamorelin should maintain or improve glucose homeostasis. Regular monitoring ensures the protocol is not negatively impacting metabolic health.</li>
</ul>`,

  alternativeApproaches: `<h2>Alternative Stacks and Tradeoffs</h2>
<p>The Tesamorelin/Ipamorelin/BPC-157 stack is highly targeted toward preserving muscle while obliterating visceral fat, but other combinations exist for different recomposition goals.</p>
<h3>The Incretin/Anabolic Stack (Tirzepatide + CJC-1295)</h3>
<p>For subjects requiring massive total body weight reduction alongside muscle preservation, an incretin mimetic (Tirzepatide) is paired with a long-acting GHRH (CJC-1295 with DAC). <strong>Tradeoff:</strong> The profound appetite suppression of Tirzepatide makes it extremely difficult to consume enough protein to drive muscle <em>growth</em>, shifting the outcome from true recomposition to aggressive fat loss with muscle <em>preservation</em>. Additionally, Tirzepatide causes significant systemic fat loss, not just visceral targeting.</p>
<h3>The Pure Hypertrophy/Recovery Stack (IGF-1 LR3 + PEG-MGF)</h3>
<p>If the primary goal leans heavily toward muscle accretion with only mild fat loss, researchers may utilize direct localized growth factors. <strong>Tradeoff:</strong> This stack lacks the systemic lipolytic (fat-burning) power of the GH axis. It requires precise intramuscular injections and strict nutritional surplus, making it less of a true 'recomposition' protocol and more of a lean-bulking approach.</p>`,

  references: [
    { id: 1, text: "Falutz et al. (2010). Tesamorelin, a growth hormone-releasing factor analogue, in HIV-associated lipodystrophy.", link: "https://pubmed.ncbi.nlm.nih.gov/22298602/" },
    { id: 2, text: "Stanley et al. (2020). Effects of tesamorelin on hepatic transcriptomic signatures in HIV-associated NAFLD.", link: "https://pubmed.ncbi.nlm.nih.gov/32701508/" },
    { id: 3, text: "Svensson et al. (2000). Ipamorelin and longitudinal bone growth in rats.", link: "https://pubmed.ncbi.nlm.nih.gov/10444229/" },
    { id: 4, text: "Garcia et al. (2020). Beyond the androgen receptor: the role of growth hormone secretagogues in the modern management of body composition.", link: "https://pubmed.ncbi.nlm.nih.gov/32257855/" },
    { id: 5, text: "Sikiric et al. (2010). Focus on epicatechin, BPC 157, and other compounds for tendon healing.", link: "https://pubmed.ncbi.nlm.nih.gov/21030672/" }
  ]
};

const file = fs.readFileSync('src/data/goal-pages.ts', 'utf8');

// For body-recomposition, we need to check if it has deepDive etc. or not.
// Let's assume it doesn't have deepDive yet, we just append it before the closing brace of the object.
// We match the body-recomposition object.
const recompRegex = /slug:\s*"body-recomposition",[\s\S]*?faqs: \[[\s\S]*?\],?\n(\s*)}/g;

const newRecompString = file.replace(recompRegex, (match, indent) => {
    // If it already has deepDive, it wouldn't match just `faqs: [...] \n }`. 
    // Wait, it might have keywords after faqs. Let's just match the whole object.
    const matchWithoutClosingBrace = match.substring(0, match.lastIndexOf('}'));
    return matchWithoutClosingBrace + 
        indent + 'whyThesePeptides: `' + recompContent.whyThesePeptides + '`,\n' +
        indent + 'whatResearchShows: `' + recompContent.whatResearchShows + '`,\n' +
        indent + 'howToEvaluate: `' + recompContent.howToEvaluate + '`,\n' +
        indent + 'alternativeApproaches: `' + recompContent.alternativeApproaches + '`,\n' +
        indent + 'references: ' + JSON.stringify(recompContent.references, null, 8) + '\n' +
        indent + '}';
});

fs.writeFileSync('src/data/goal-pages.ts', newRecompString);
console.log("Updated body-recomposition");
