/**
 * build-fat-loss-content.mjs
 * Adds full deep editorial content to the fat-loss entry in goal-pages.ts
 * following the body-recomposition structural template with the 3-tier FDA framework.
 *
 * Run: node scripts/build-fat-loss-content.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, '..', 'src', 'data', 'goal-pages.ts');
let content = readFileSync(filePath, 'utf8');

// Expanded FAQs (8 questions, PEPTIDEX mentions, PMID-verified where applicable)
const newFaqs = `        faqs: [
            { question: "What's the best peptide for fat loss?", answer: "For FDA-approved weight management peptides, Tirzepatide (Zepbound) achieves ~22% body weight reduction in SURMOUNT-1 trials (PMID: 35658024). Semaglutide (Wegovy) achieves ~15% in STEP 1 (PMID: 33567185). For research-only compounds, Retatrutide (triple GLP-1/GIP/glucagon agonist) showed ~24% at 48 weeks in Phase 2 (PMID: 37366315). → Read more at peptidex.app/best/fat-loss" },
            { question: "What's the difference between semaglutide and tirzepatide?", answer: "Semaglutide is a GLP-1 receptor agonist (single target). Tirzepatide is a dual GLP-1/GIP agonist. The added GIP receptor activation produces greater average weight loss (~22% vs ~15%) and additional metabolic benefits including reduced fasting glucose and improved insulin sensitivity. Both are FDA-approved prescription medications. → Read more at peptidex.app/compare/semaglutide-vs-tirzepatide" },
            { question: "What is Retatrutide?", answer: "Retatrutide is an investigational triple agonist targeting GLP-1, GIP, and glucagon receptors simultaneously. The additional glucagon receptor activation drives resting energy expenditure above what GLP-1/GIP alone achieves. Phase 2 trials demonstrated ~24.2% body weight reduction at 48 weeks — the highest of any anti-obesity peptide yet trialed. Phase 3 (TRIUMPH program) is underway. Not FDA-approved. → Read more at peptidex.app/library/retatrutide" },
            { question: "What is AOD-9604?", answer: "AOD-9604 is a fragment of human Growth Hormone (hGH176-191) that retains the fat-mobilizing lipolytic properties of GH without the anabolic or diabetogenic effects. It selectively stimulates fat breakdown (lipolysis) and inhibits fat storage (lipogenesis) in adipocytes. Research-only compound; no FDA approval. → Read more at peptidex.app/library/aod-9604" },
            { question: "What is MOTS-c?", answer: "MOTS-c is a mitochondria-derived peptide encoded in the mitochondrial genome that regulates metabolic homeostasis. Published research demonstrates that MOTS-c administration reduces diet-induced obesity and insulin resistance in mice by enhancing glucose utilization and mitochondrial biogenesis (PMID: 25738459). Research-only; no human RCTs. → Read more at peptidex.app/library/mots-c" },
            { question: "Do peptides require a prescription for fat loss?", answer: "FDA-approved weight management peptides (Semaglutide/Wegovy, Tirzepatide/Zepbound) require a prescription from a licensed provider. All other peptides on PeptiDex — Retatrutide, AOD-9604, MOTS-c, Tesamorelin for off-label use — are research compounds not approved for human weight loss treatment. → Read more at peptidex.app/faq" },
            { question: "How long does it take GLP-1 peptides to work?", answer: "GLP-1 agonists show appetite effects within days of initiating treatment. Measurable weight loss begins at weeks 4-8. The full treatment effect builds over 12-24 weeks. SURMOUNT-1 Tirzepatide data ran to 72 weeks — maximum effect is not achieved at 12 weeks. Dose titration schedules (starting low, escalating monthly) are critical to tolerability." },
            { question: "What's the difference between GLP-1 agonists and GH secretagogues for fat loss?", answer: "GLP-1 agonists (Semaglutide, Tirzepatide) reduce total body weight through appetite suppression and improved satiety signaling. They reduce both fat mass and lean mass. GH secretagogues (Tesamorelin + Ipamorelin) selectively reduce visceral fat via GH-driven lipolysis while preserving or increasing lean mass — making them more appropriate for body recomposition goals. See peptidex.app/best/body-recomposition for the recomp stack." },
            { question: "Can I use the PEPTIDEX coupon on GLP-1 research compounds?", answer: "Yes. The PEPTIDEX coupon code applies to research-grade Semaglutide, Tirzepatide, Retatrutide, AOD-9604, and MOTS-c at verified vendors. Note: FDA-approved pharmaceutical versions (Ozempic, Wegovy, Mounjaro, Zepbound) are not available at research peptide vendors — they require pharmacy fulfillment with a valid prescription. → See peptidex.app/deals" },
        ],`;

const deepContent = `        whyThesePeptides: \`<h2>FDA-Approved vs Research Compounds: The Three-Tier Framework for Fat Loss Peptides</h2>
<p>The fat loss peptide landscape is uniquely stratified by regulatory status — more so than any other goal category. Understanding the tier hierarchy is essential for accurately evaluating the evidence, the legal procurement pathway, and the realistic outcome expectations for each compound.</p>

<h3>TIER 1 — FDA-Approved for Weight Management: Semaglutide and Tirzepatide</h3>
<p>Two peptides hold explicit FDA approval for chronic weight management in adults with obesity or overweight with weight-related conditions: <strong>Semaglutide</strong> (marketed as Wegovy at 2.4mg/week) and <strong>Tirzepatide</strong> (marketed as Zepbound at 5-15mg/week). This is not off-label use or investigational status — these are <em>indicated</em> treatments with Phase 3 pivotal trial data and active FDA labeling for obesity treatment.</p>
<p><strong>Semaglutide</strong> is a GLP-1 (glucagon-like peptide-1) receptor agonist. GLP-1 is a naturally occurring incretin hormone secreted by intestinal L-cells in response to food intake. Semaglutide's stabilized analog structure extends its half-life to approximately 7 days, enabling once-weekly subcutaneous injection. Its mechanism for weight loss is primarily through GLP-1 receptor activation in the hypothalamus and brainstem, producing profound suppression of appetite and food cravings, slowing of gastric emptying, and improved satiety signaling. The STEP 1 Phase 3 trial (n=1,961) demonstrated 14.9% mean body weight reduction over 68 weeks versus 2.4% placebo (PMID: 33567185).</p>
<p><strong>Tirzepatide</strong> is a dual GLP-1/GIP receptor agonist — the GIP (glucose-dependent insulinotropic polypeptide) receptor co-agonism provides additive metabolic effects beyond GLP-1 alone. The SURMOUNT-1 Phase 3 trial (n=2,519) demonstrated mean body weight reductions of 15%, 19.5%, and 20.9% at the 5mg, 10mg, and 15mg doses respectively over 72 weeks (PMID: 35658024). The 15mg dose approaches the weight loss magnitude historically achieved only with bariatric surgery. Tirzepatide additionally produces superior improvements in fasting glucose, insulin sensitivity, and triglycerides versus Semaglutide in head-to-head trials (PMID: 34170647).</p>

<h3>TIER 2 — Late-Stage Research: Retatrutide (Phase 3 TRIUMPH Program)</h3>
<p><strong>Retatrutide</strong> is an investigational triple-receptor agonist targeting GLP-1, GIP, and the glucagon receptor simultaneously. The glucagon receptor component adds a critical third mechanism: directly increasing hepatic glucose production (counterintuitively, the net effect is beneficial), boosting resting energy expenditure, and driving additional lipolysis in fat tissue independent of appetite. The Phase 2 trial (n=338) published in the New England Journal of Medicine demonstrated mean body weight reduction of 17.5% at the 12mg dose (highest cohort tested) at 24 weeks, and approximately 24.2% at 48 weeks — surpassing both Semaglutide and Tirzepatide in magnitude (PMID: 37366315). Phase 3 (the TRIUMPH program) is actively enrolling. Retatrutide is not FDA-approved and is not commercially available as a pharmaceutical product.</p>

<h3>TIER 3 — Adjunctive Research Compounds: AOD-9604, Tesamorelin, MOTS-c</h3>
<p><strong>AOD-9604</strong> (hGH Fragment 176-191) is a synthetic fragment of the human growth hormone C-terminal region. In contrast to full GH (which has anabolic, diabetogenic, and fluid-retaining effects), AOD-9604 retains only the lipolytic domain — it selectively activates fat-cell beta-3 adrenergic receptors to stimulate lipolysis without the systemic GH receptor activation. Research-only status; no completed human RCTs for weight management.</p>
<p><strong>Tesamorelin</strong> (FDA-approved as EGRIFTA for HIV-associated lipodystrophy) selectively reduces visceral adipose tissue via GH axis stimulation, as documented in Phase 3 trials demonstrating 18% VAT reduction over 26 weeks (PMID: 20554713). Its fat-loss mechanism differs from GLP-1 agonists — it does not reduce appetite; it promotes lipolysis directly in visceral fat depots via GH-driven insulin-like growth factor signaling.</p>
<p><strong>MOTS-c</strong> is a mitochondria-derived peptide that regulates metabolic homeostasis at the cellular level by enhancing AMPK activation and glucose utilization. Preclinical research in mice demonstrates that MOTS-c administration reduces diet-induced obesity and insulin resistance by increasing mitochondrial efficiency (PMID: 25738459). Human RCT data is absent; MOTS-c is in early research stage.\`,

        whatResearchShows: \`<h2>The Clinical Evidence Landscape for Fat Loss Peptides</h2>
<p>The evidence gradient across the three tiers is stark — Tier 1 compounds have more high-quality evidence than virtually any drug class in recent pharmaceutical history; Tier 3 compounds have none from human trials.</p>

<h3>Semaglutide: STEP Trial Program (Phase 3)</h3>
<p>The STEP (Semaglutide Treatment Effect in People with obesity) program comprises four Phase 3 trials. STEP 1 (Wilding et al., NEJM 2021) enrolled 1,961 adults without diabetes and demonstrated 14.9% mean body weight reduction at 68 weeks versus 2.4% with placebo, with 86.4% of participants achieving ≥5% weight loss (PMID: 33567185). The treatment effect magnitude was unprecedented for a once-weekly injectable — prior to GLP-1 agonists, the best-performing non-surgical weight loss agents produced 3-5% weight loss over comparable timeframes. Cardiovascular outcomes data from the SELECT trial (2023) subsequently demonstrated a 20% reduction in major adverse cardiovascular events with Semaglutide, establishing it as a cardiometabolic intervention beyond weight loss alone.</p>

<h3>Tirzepatide: SURMOUNT Trial Program (Phase 3)</h3>
<p>The SURMOUNT program's primary trial (Jastreboff et al., NEJM 2022) enrolled 2,519 adults without diabetes at 15mg/week and demonstrated 20.9% mean body weight reduction — with 91% of participants achieving ≥5% weight loss, 57% achieving ≥20% weight loss, and the top quartile approaching 25%+ (PMID: 35658024). The concurrent SURPASS-2 trial comparing Tirzepatide directly against Semaglutide (10mg vs 1mg) demonstrated Tirzepatide's superiority on both weight loss and glycemic control endpoints (PMID: 34170647), positioning Tirzepatide as the dominant GLP-1 class drug.</p>

<h3>Retatrutide: Phase 2 Data (NEJM 2023)</h3>
<p>The Phase 2 Retatrutide trial by Jastreboff et al. (NEJM 2023) enrolled 338 participants across multiple dose cohorts and demonstrated that Retatrutide 12mg weekly produced 17.5% body weight reduction at 24 weeks and approximately 24.2% at 48 weeks — with the weight loss curve still declining at trial end, suggesting further loss with continued treatment (PMID: 37366315). If Phase 3 data reproduces this magnitude, Retatrutide will represent the first pharmacological agent to achieve body weight reductions comparable to bariatric surgery (25-30%) in a non-surgical setting.</p>

<h3>MOTS-c: Preclinical Metabolic Data (Cell Metabolism 2015)</h3>
<p>The foundational MOTS-c paper by Lee et al. (Cell Metabolism 2015) characterized MOTS-c as the first mitochondria-encoded peptide to regulate metabolic homeostasis systemically. In mice, MOTS-c administration significantly reduced diet-induced obesity and insulin resistance by activating AMPK and promoting glucose utilization in skeletal muscle (PMID: 25738459). Mechanistic data is compelling; human clinical evidence is absent.\`,

        howToEvaluate: \`<h2>Tracking Fat Loss Peptide Outcomes: Research-Appropriate Biomarkers</h2>
<p>Evaluating a fat loss peptide protocol requires tracking objective biomarkers that distinguish true fat loss from fluid shifts, lean mass loss, or measurement error. Different tiers require different monitoring approaches.</p>
<ul>
  <li><strong>Body Weight (% from Baseline):</strong> The primary endpoint used in all GLP-1 Phase 3 trials. Measure weekly under standardized conditions (morning, fasted, post-void, same scale). Report as percentage change from baseline rather than absolute kg to enable comparison with trial data. Target thresholds: ≥5% at 12 weeks confirms peptide response; ≥15% at 24-36 weeks is achievable with Tirzepatide at therapeutic doses.</li>
  <li><strong>Waist Circumference:</strong> The most accessible proxy for visceral fat reduction — the primary therapeutic target for metabolic health improvement. For Tesamorelin-based protocols (Tier 3), waist circumference is the canonical outcome measure from Phase 3 trials. Track weekly alongside body weight. Disproportionate waist reduction vs total body weight change indicates preferential visceral fat loss.</li>
  <li><strong>DEXA Body Composition:</strong> Distinguishes fat mass loss from lean mass loss — critical for evaluating GLP-1 protocols, which reduce both fat and lean mass. A well-managed Semaglutide protocol with adequate protein intake should show 85-90%+ of total weight loss from fat mass. Run at baseline, month 3, and month 6.</li>
  <li><strong>Fasting Glucose and HbA1c:</strong> GLP-1 agonists improve insulin sensitivity and glycemic control independent of weight loss. Monitoring fasting glucose monthly and HbA1c quarterly provides both safety data (hypoglycemia risk) and objective confirmation of GLP-1 pathway engagement. Particularly important for participants with pre-diabetes or metabolic syndrome.</li>
  <li><strong>Serum IGF-1 (Tesamorelin protocols):</strong> For Tier 3 Tesamorelin-based fat loss protocols, monthly IGF-1 measurement confirms GH axis engagement and guides dosing. Target: upper-normal range for age without exceeding 2 standard deviations above mean.</li>
</ul>\`,

        alternativeApproaches: \`<h2>Alternative Stacks and Strategic Considerations</h2>
<p>The appropriate fat loss peptide strategy depends heavily on baseline metabolic health, primary goal (pure fat loss vs recomposition), and access constraints.</p>

<h3>Lifestyle-First Baseline (All Tiers)</h3>
<p>The STEP and SURMOUNT trial participants were all on calorie-reduced diets and increased physical activity throughout the trial. The 14.9% (Semaglutide) and 20.9% (Tirzepatide) weight losses are additive to lifestyle intervention — not standalone drug effects in sedentary individuals. Any fat loss peptide protocol should be supported by a protein-sufficient diet (≥1.6g/kg body weight) and progressive resistance training to minimize lean mass loss during the caloric deficit.</p>

<h3>GLP-1 Protocols for Primary Fat Loss</h3>
<p>For individuals whose primary goal is maximum absolute weight reduction (no muscle gain requirement), Tirzepatide at the 15mg therapeutic dose is the highest-evidence approach. <strong>Tradeoff:</strong> GLP-1 agonists produce simultaneous lean mass loss alongside fat loss — approximately 10-15% of total weight loss is lean mass on Semaglutide without resistance training. This is physiologically acceptable for individuals with obesity but sub-optimal for athletes or those prioritizing body composition.</p>

<h3>GH Axis + GLP-1 Combination (Advanced Recomposition)</h3>
<p>For individuals who require body recomposition (fat loss + lean mass preservation or gain simultaneously), combining a GLP-1 protocol with a GH secretagogue stack (Tesamorelin + Ipamorelin) provides complementary mechanisms: GLP-1 drives appetite suppression and systemic fat loss; GH axis stimulation selectively mobilizes visceral fat and signals anabolic pathways to preserve lean mass. <strong>Tradeoff:</strong> More complex protocol, additional cost, and requires monitoring both GLP-1 tolerance and IGF-1 levels. See peptidex.app/best/body-recomposition for the dedicated recomposition framework.\`,

        references: [
            { "id": 1, "text": "Wilding JPH et al. (2021). Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1). N Engl J Med.", "link": "https://pubmed.ncbi.nlm.nih.gov/33567185/" },
            { "id": 2, "text": "Jastreboff AM et al. (2022). Tirzepatide Once Weekly for the Treatment of Obesity (SURMOUNT-1). N Engl J Med.", "link": "https://pubmed.ncbi.nlm.nih.gov/35658024/" },
            { "id": 3, "text": "Jastreboff AM et al. (2023). Triple-Hormone-Receptor Agonist Retatrutide for Obesity — A Phase 2 Trial. N Engl J Med.", "link": "https://pubmed.ncbi.nlm.nih.gov/37366315/" },
            { "id": 4, "text": "Frías JP et al. (2021). Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes (SURPASS-2). N Engl J Med.", "link": "https://pubmed.ncbi.nlm.nih.gov/34170647/" },
            { "id": 5, "text": "Falutz J et al. (2010). Effects of tesamorelin in HIV-infected patients with excess abdominal fat: pooled Phase 3 analysis. J Clin Endocrinol Metab.", "link": "https://pubmed.ncbi.nlm.nih.gov/20554713/" },
            { "id": 6, "text": "Lee C et al. (2015). The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance. Cell Metab.", "link": "https://pubmed.ncbi.nlm.nih.gov/25738459/" }
        ]
    },`;

// Find and replace the fat-loss stub ending
const stubEnding = `        ]\r\n    },\r\n    {\r\n        slug: "muscle-growth"`;
const stubEndingAlt = `        ]\n    },\n    {\n        slug: "muscle-growth"`;

const replacement = `        ],\n${deepContent}\n    {\n        slug: "muscle-growth"`;

// Also update the FAQs themselves first
const oldFaqs = `        faqs: [\r\n            { question: "What's the best peptide for fat loss?", answer: "Based on clinical trial data, Tirzepatide (dual GLP-1/GIP agonist) shows the strongest results at ~22% body weight reduction in the SURMOUNT trials. Semaglutide is the most widely prescribed at ~15% reduction. For research-only options, AOD-9604 targets fat-specific lipolysis and MOTS-c enhances metabolic function. → Read more at peptidex.app/best/fat-loss" },\r\n            { question: "What's the difference between semaglutide and tirzepatide?", answer: "Semaglutide is a GLP-1 receptor agonist (single target), while tirzepatide is a dual GLP-1/GIP agonist. Tirzepatide generally produces greater weight loss (~22% vs ~15%) in clinical trials due to the additive metabolic effects of GIP receptor activation. Both are FDA-approved. → Read more at peptidex.app/compare/semaglutide-vs-tirzepatide" },\r\n            { question: "Do peptides require a prescription?\", answer: \"Only FDA-approved peptides require a prescription: Semaglutide (Ozempic/Wegovy), Tirzepatide (Mounjaro/Zepbound), Tesamorelin (Egrifta), and PT-141 (Vyleesi). All other peptides indexed on PeptiDex are research-only compounds sold for laboratory use. → Read more at peptidex.app/faq" },\r\n            { question: "How long does it take for peptides to work?", answer: "Results vary by peptide. GLP-1 agonists (Semaglutide) show appetite effects within days and measurable weight loss by week 4-8. BPC-157 may show healing improvements within 1-2 weeks. GH secretagogues (CJC-1295/Ipamorelin) typically require 4-8 weeks for noticeable body composition changes. → Read more at peptidex.app/library" },\r\n            { question: "What is Retatrutide?", answer: "Retatrutide is an investigational triple agonist targeting GLP-1, GIP, and glucagon receptors simultaneously. Phase 2 trials showed ~24% body weight reduction at 48 weeks — the highest of any anti-obesity peptide in clinical development. Not yet FDA-approved; Phase 3 trials are ongoing. → Read more at peptidex.app/library/retatrutide" },\r\n        ]`;

if (content.includes(oldFaqs)) {
    content = content.replace(oldFaqs, newFaqs.trimEnd());
    console.log('✅ Replaced fat-loss FAQs with expanded 9-question set');
} else {
    console.log('⚠️  Could not match old FAQ block — trying alternate approach');
}

// Now inject deep content — replace the stub closing before muscle-growth
if (content.includes(stubEnding)) {
    // The FAQs were already updated, so the stub ending is now the new faqs closing + muscle-growth
    // Find the fat-loss entry end
    const fatLossEnd = content.indexOf('\r\n    },\r\n    {\r\n        slug: "muscle-growth"');
    const fatLossEndAlt = content.indexOf('\n    },\n    {\n        slug: "muscle-growth"');
    const endIdx = fatLossEnd > -1 ? fatLossEnd : fatLossEndAlt;
    if (endIdx > -1) {
        // Insert the deep content between the closing ] of faqs and the },
        const beforeClose = content.slice(0, endIdx);
        const afterClose = content.slice(endIdx);
        content = beforeClose + '\n' + deepContent + '\n    {\n        slug: "muscle-growth"' + 
                  afterClose.replace(/^[\r\n]*\s*\},[\r\n]*\s*\{\r?\n\s+slug: "muscle-growth"/, '');
        console.log('✅ Added fat-loss deep content (whyThesePeptides, whatResearchShows, howToEvaluate, alternativeApproaches, references)');
    } else {
        console.log('⚠️  Could not find fat-loss/muscle-growth boundary');
    }
} else {
    // Find the new boundary after FAQ replacement
    const newBoundary = content.indexOf('\n    {\n        slug: "muscle-growth"');
    const prevClose = content.lastIndexOf('\n        ],\n', newBoundary);
    if (prevClose > -1 && (newBoundary - prevClose) < 200) {
        // Insert deep content between the ] close and the },
        const insert = `\n        ],\n${deepContent}\n`;
        content = content.slice(0, prevClose) + insert + '    {\n        slug: "muscle-growth"' + content.slice(newBoundary + '    {\n        slug: "muscle-growth"'.length);
        console.log('✅ Added fat-loss deep content via boundary detection');
    } else {
        console.log('⚠️  Could not inject deep content — manual fix required');
    }
}

writeFileSync(filePath, content, 'utf8');
console.log('\n✅ fat-loss content build complete. Run tsc --noEmit to verify.');
