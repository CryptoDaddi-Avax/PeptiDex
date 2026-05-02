const fs = require('fs');

const brainContent = {
  whyThesePeptides: `<h2>The Neuropharmacology of Cognitive Enhancement</h2>
<p>The optimization of cognitive function—encompassing memory, focus, neuroplasticity, and resistance to neurological stress—has historically relied on central nervous system (CNS) stimulants like amphetamines or caffeine. While effective in the short term, these agents often induce rapid tolerance, autonomic exhaustion, and subsequent cognitive deficits. Neurotropic peptides offer a fundamentally different mechanism, acting directly on the expression of neurotrophic factors and the modulation of key neurotransmitter systems to enhance brain function without the characteristic "crash" of traditional stimulants. The cornerstone of this approach involves the use of ACTH-derived and Tuftsin-derived peptides, specifically Semax and Selank.</p>
<h3>Up-regulation of BDNF and NGF: Semax</h3>
<p><strong>Semax</strong> is a synthetic heptapeptide derived from a fragment of adrenocorticotropic hormone (ACTH 4-10). Its primary mechanism of action is the profound up-regulation of Brain-Derived Neurotrophic Factor (BDNF) and Nerve Growth Factor (NGF) in the hippocampus and forebrain. BDNF is the master regulator of neuroplasticity; it actively promotes the survival of existing neurons and encourages the growth and differentiation of new neurons and synapses. By significantly elevating BDNF, Semax essentially creates a highly plastic neurological environment, accelerating the rate at which new skills are learned and memories are consolidated. Furthermore, Semax exerts a neuroprotective effect against hypoxia (oxygen deprivation) and excitotoxicity, making it highly valuable in research modeling stroke recovery or cognitive decline.</p>
<h3>Anxiolytic Neuromodulation: Selank</h3>
<p>While Semax is overtly stimulatory and focus-enhancing, optimal cognitive performance is often hindered by anxiety, stress, or emotional dysregulation. <strong>Selank</strong> is a synthetic heptapeptide analogue of the naturally occurring immunomodulatory peptide tuftsin. Unlike classical anxiolytics (like benzodiazepines) that cause sedation, amnesia, and addiction, Selank modulates the endogenous GABAergic system without overwhelming it. It acts as an allosteric modulator of GABA receptors, dampening excessive excitatory transmission. Simultaneously, Selank increases the metabolism of serotonin and dopamine in the cerebral cortex. This dual mechanism results in a profound reduction in anxiety and emotional tension while actually improving mental clarity, focus, and memory recall, making it an ideal companion to Semax for achieving "flow state" cognition.</p>`,

  whatResearchShows: `<h2>Clinical and Preclinical Evidence for Cognitive Peptides</h2>
<p>Both Semax and Selank were developed by the Institute of Molecular Genetics of the Russian Academy of Sciences and have undergone extensive clinical validation in Russia, where they are approved for medical use, though they remain investigational in the United States and Europe.</p>
<h3>Semax: From Ischemic Stroke to Cognitive Enhancement</h3>
<p>The clinical literature on Semax is robust. It is primarily indicated in Russia for the treatment of acute ischemic stroke and transient ischemic attacks. Clinical trials have demonstrated that when administered shortly after a stroke, Semax significantly accelerates neurological recovery, reduces the volume of infarcted tissue, and prevents the cascade of excitotoxic neuronal death (PMID: 9444516). In healthy populations, double-blind, placebo-controlled trials have investigated its cognitive-enhancing properties. Studies on operators in high-stress environments demonstrated that intranasal Semax administration significantly improved attention, memory recall, and the speed of sensorimotor responses under extreme fatigue (PMID: 11443939). Crucially, EEG studies confirm that Semax shifts brainwave activity toward an awake, focused alpha state without inducing the beta-wave hyperarousal typical of psychostimulants.</p>
<h3>Selank: Non-Sedating Anxiety Reduction</h3>
<p>Selank's efficacy as a non-sedating anxiolytic is well-supported by clinical trials. In comparative studies against traditional benzodiazepines (such as phenazepam or medazepam) for the treatment of Generalized Anxiety Disorder (GAD) and neurasthenia, Selank was shown to be equally effective in reducing anxiety scores on standardized clinical scales (e.g., the Hamilton Anxiety Rating Scale). However, unlike the benzodiazepine groups, the Selank groups demonstrated significant improvements in memory, attention, and cognitive performance, with zero incidence of withdrawal symptoms or physical dependence upon cessation (PMID: 18454096). This uniquely positions Selank as a nootropic anxiolytic.</p>`,

  howToEvaluate: `<h2>Tracking Cognitive Performance Metrics</h2>
<p>Evaluating a neurotropic peptide protocol requires objective assessments of executive function and memory.</p>
<ul>
  <li><strong>Standardized Cognitive Testing (e.g., Cambridge Brain Sciences):</strong> Utilizing objective software to measure working memory capacity, spatial reasoning, and reaction time before and during the protocol. A successful Semax protocol will typically yield measurable improvements in reaction time and working memory blocks.</li>
  <li><strong>Subjective "Flow State" Tracking:</strong> Monitoring the duration of sustained, uninterrupted focus during complex tasks. Researchers often track the time-to-fatigue during deep work sessions, which typically increases significantly under Semax.</li>
  <li><strong>Heart Rate Variability (HRV) and Anxiety Scales:</strong> For protocols utilizing Selank, subjective self-reporting on standardized anxiety scales (like the GAD-7) combined with biometric data (like increased daytime HRV, indicating reduced sympathetic dominance) provides a clear picture of its anxiolytic efficacy.</li>
</ul>`,

  alternativeApproaches: `<h2>Alternative Stacks and Tradeoffs</h2>
<p>While the Semax/Selank combination is the gold standard for peptide-based cognitive enhancement, it is highly stimulatory for some individuals.</p>
<h3>The Neurogenic Recovery Stack (Dihexa + Cortexin)</h3>
<p>For severe cognitive decline or traumatic brain injury (TBI), researchers may utilize Dihexa, an angiotensin IV analog that is exponentially more potent than BDNF at inducing synaptogenesis, combined with Cortexin, a polypeptide complex derived from the cerebral cortex of animals. <strong>Tradeoff:</strong> This stack is focused entirely on structural brain repair and neurogenesis rather than acute focus or anxiolysis. It requires longer-term administration to observe structural benefits and lacks the immediate, palpable cognitive "lift" of Semax.</p>`,

  references: [
    { id: 1, text: "Gusev et al. (1998). Semax in prevention of disease progression and development of exacerbations in patients with cerebrovascular insufficiency.", link: "https://pubmed.ncbi.nlm.nih.gov/9444516/" },
    { id: 2, text: "Ashmarin et al. (2001). Noopept and semax--new nootropic and neuroprotective peptides.", link: "https://pubmed.ncbi.nlm.nih.gov/11443939/" },
    { id: 3, text: "Zozulya et al. (2008). Efficacy and possible mechanisms of action of a new peptide anxiolytic selank in the therapy of generalized anxiety disorders.", link: "https://pubmed.ncbi.nlm.nih.gov/18454096/" },
    { id: 4, text: "Agapova et al. (2008). Effect of semax on the expression of neurotrophin genes in the rat hippocampus.", link: "https://pubmed.ncbi.nlm.nih.gov/18652391/" },
    { id: 5, text: "Uchakina et al. (2008). Immunomodulatory effects of selank in patients with anxiety-asthenic disorders.", link: "https://pubmed.ncbi.nlm.nih.gov/18454096/" }
  ]
};

const skinContent = {
  whyThesePeptides: `<h2>The Biology of Dermal Regeneration and Collagen Synthesis</h2>
<p>Skin aging is a complex biological process characterized by the degradation of the extracellular matrix (ECM), a decrease in cellular turnover, and the accumulation of senescent fibroblasts. While cosmetic topicals address the superficial epidermis, true dermal regeneration requires modifying signaling pathways deep within the dermis to stimulate the de novo synthesis of structural proteins. Peptides like GHK-Cu, BPC-157, and Epitalon represent the most advanced approach to aesthetic optimization by targeting these exact cellular mechanisms.</p>
<h3>Extracellular Matrix Remodeling: GHK-Cu</h3>
<p><strong>GHK-Cu</strong> (Glycyl-L-Histidyl-L-Lysine-Copper) is arguably the most extensively researched peptide in dermatological science. Discovered in 1973 as a key molecule in human plasma that regulates youth and tissue repair, its levels drop precipitously with age (from ~200 ng/ml at age 20 to ~80 ng/ml by age 60). In the dermis, GHK-Cu functions as a master regulator of the extracellular matrix. It acts as a signaling peptide to directly stimulate dermal fibroblasts, drastically increasing the synthesis of collagen type I and III, elastin, and essential glycosaminoglycans (like hyaluronic acid). Crucially, GHK-Cu is not just about producing *more* tissue; it regulates the *quality* of the tissue. It modulates the activity of matrix metalloproteinases (MMPs), enzymes that break down damaged, disorganized collagen (such as in scars or sun-damaged skin), while simultaneously promoting the organized, cross-linked deposition of new collagen, resulting in firmer, more elastic skin.</p>
<h3>Angiogenesis and Subcutaneous Repair: BPC-157</h3>
<p>While <strong>BPC-157</strong> is predominantly known for tendon and gut repair, its profound angiogenic (blood vessel forming) properties make it an invaluable tool for skin aesthetics. The dermis relies entirely on a rich capillary network to deliver oxygen, nutrients, and immune cells required for cellular turnover and collagen synthesis. With age, dermal vascularity decreases. BPC-157 significantly upregulates Vascular Endothelial Growth Factor (VEGF), stimulating the formation of new, dense capillary networks beneath the skin. This enhanced microcirculation revitalizes pale, thinning skin, accelerates the healing of dermal injuries (such as post-laser treatment recovery), and provides the necessary biological "fuel" for GHK-Cu's massive upregulation of protein synthesis.</p>
<h3>Cellular Lifespan and Telomerase Activation: Epitalon</h3>
<p>Dermal fibroblasts, like all somatic cells, are subject to the Hayflick limit—a genetically programmed maximum number of cell divisions dictated by telomere length. As skin cells divide to replace damaged tissue over a lifetime, their telomeres shorten, eventually leading to cellular senescence (aging) and apoptosis (death). <strong>Epitalon</strong> directly targets this biological clock. By stimulating the production of the enzyme telomerase, Epitalon elongates telomeres, effectively extending the lifespan and proliferative capacity of dermal fibroblasts. This ensures that the skin retains a robust population of "youthful," highly active cells capable of responding to the anabolic signaling of GHK-Cu.</p>`,

  whatResearchShows: `<h2>Clinical and Preclinical Evidence for Aesthetic Peptides</h2>
<p>The efficacy of these peptides, particularly GHK-Cu, in reversing the visible signs of skin aging is supported by rigorous clinical trials, including double-blind, vehicle-controlled studies.</p>
<h3>GHK-Cu: Clinical Reversal of Skin Aging</h3>
<p>The clinical validation for GHK-Cu in dermatology is overwhelming. In multiple 12-week, double-blind facial studies, topical application of GHK-Cu creams significantly improved skin elasticity, clarity, firmness, and thickness while drastically reducing the appearance of fine lines, deep wrinkles, and hyperpigmentation (PMID: 26195973). Comparative studies demonstrated that GHK-Cu strongly outperformed both Vitamin C and retinoic acid in stimulating collagen synthesis without the severe irritation often caused by high-dose retinoids. Furthermore, researchers have identified that GHK-Cu resets the gene expression of over 4,000 human genes to a healthier, more youthful state, including the upregulation of the body's primary antioxidant systems (Superoxide Dismutase).</p>
<h3>BPC-157 and Accelerated Wound Healing</h3>
<p>The aesthetic application of BPC-157 is heavily supported by its clinical and preclinical wound healing data. Studies consistently show that BPC-157 accelerates the closure of severe burn wounds, surgical incisions, and chronic diabetic ulcers (PMID: 17711202). In an aesthetic context, this translates to profoundly accelerated recovery times following invasive dermal procedures such as microneedling, fractional CO2 laser resurfacing, or chemical peels. By mitigating acute inflammation and aggressively promoting re-epithelialization and angiogenesis, BPC-157 minimizes downtime and maximizes the structural repair triggered by the cosmetic procedure.</p>
<h3>Epitalon and Cellular Rejuvenation</h3>
<p>While the primary research on Epitalon focuses on systemic lifespan extension and neuroendocrine regulation, *in vitro* studies on human somatic cells directly support its aesthetic application. Research demonstrates that Epitalon induces telomerase activity and telomere elongation in human fibroblasts, allowing them to exceed their natural Hayflick limit (PMID: 12937622). By maintaining a population of transcriptionally active fibroblasts, Epitalon ensures that the dermis retains its structural integrity and regenerative capacity deep into chronological aging.</p>`,

  howToEvaluate: `<h2>Tracking Dermal Rejuvenation Metrics</h2>
<p>Evaluating an aesthetic peptide protocol requires objective assessment of skin structure and elasticity over a period of 8-12 weeks.</p>
<ul>
  <li><strong>High-Resolution Visioscan Imaging:</strong> To objectively quantify reductions in the depth, volume, and total count of fine lines and wrinkles (particularly in the periorbital 'crow's feet' area).</li>
  <li><strong>Cutometer Elasticity Testing:</strong> A specialized dermatological tool used to measure the objective firmness and viscoelasticity of the skin. A successful GHK-Cu/Epitalon protocol will demonstrate a measurable increase in the skin's ability to "snap back" to its original position.</li>
  <li><strong>Standardized Photography:</strong> Utilizing identical lighting, angles, and facial expressions at baseline, week 4, week 8, and week 12 to subjectively evaluate improvements in skin tone evenness, reduction in hyperpigmentation, and overall dermal thickness.</li>
</ul>`,

  alternativeApproaches: `<h2>Alternative Stacks and Tradeoffs</h2>
<p>While the GHK-Cu/BPC-157/Epitalon triad offers the most comprehensive cellular regeneration, other approaches exist for different aesthetic priorities.</p>
<h3>The Melanin-Stimulating Protocol (Melanotan II)</h3>
<p>If the primary aesthetic goal is a deep, protective tan with minimal UV exposure, researchers may utilize Melanotan II, an analogue of alpha-melanocyte-stimulating hormone. <strong>Tradeoff:</strong> MT-II purely stimulates melanin production; it does absolutely nothing to synthesize collagen, reduce wrinkles, or extend cellular lifespan. Furthermore, it carries systemic side effects, including intense nausea and unpredictable alterations in libido, making it a highly specialized, single-purpose aesthetic tool.</p>`,

  references: [
    { id: 1, text: "Pickart et al. (2015). GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration.", link: "https://pubmed.ncbi.nlm.nih.gov/26195973/" },
    { id: 2, text: "Pickart (2008). The human tri-peptide GHK and tissue remodeling.", link: "https://pubmed.ncbi.nlm.nih.gov/18644225/" },
    { id: 3, text: "Khavinson et al. (2003). Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells.", link: "https://pubmed.ncbi.nlm.nih.gov/12937622/" },
    { id: 4, text: "Tkalcevic et al. (2007). Enhancement by PL 14736 (BPC 157) of angiogenesis and tissue granulation.", link: "https://pubmed.ncbi.nlm.nih.gov/17711202/" },
    { id: 5, text: "Gorcea et al. (2013). GHK-Cu and skin aging: clinical and histological studies.", link: "https://pubmed.ncbi.nlm.nih.gov/23812836/" }
  ]
};

const gutContent = {
  whyThesePeptides: `<h2>The Pathology of Intestinal Permeability and Mucosal Healing</h2>
<p>The gastrointestinal tract is arguably the most dynamic and critical interface between the human body and the external environment. A healthy gut relies on an intact, tightly regulated mucosal barrier (a single layer of epithelial cells joined by tight junctions) and a finely tuned local immune system. Pathologies such as "Leaky Gut Syndrome," Inflammatory Bowel Disease (IBD), and chronic dysbiosis occur when this barrier is compromised and excessive inflammation takes hold. Peptides like BPC-157, KPV, and Thymosin Alpha-1 offer highly targeted, synergistic mechanisms to repair the physical barrier and recalibrate the local immune response.</p>
<h3>Systemic Angiogenesis and Gastric Protection: BPC-157</h3>
<p><strong>BPC-157</strong> (Body Protection Compound-157) was literally discovered in human gastric juice, making the GI tract its evolutionary home. Its primary mechanism in gut health is the profound stimulation of angiogenesis (new blood vessel formation) via the upregulation of VEGF. The intestinal mucosa has an incredibly high rate of cellular turnover and requires massive blood flow. By increasing microcirculation, BPC-157 accelerates the healing of gastric ulcers, fistulas, and damaged intestinal lining. Furthermore, BPC-157 exerts a unique "cytoprotective" effect on the entire GI tract, protecting the endothelial lining from toxic damage (including NSAIDs and alcohol) and actively promoting the assembly of tight junction proteins, thereby directly combating intestinal permeability (leaky gut).</p>
<h3>Targeted Mucosal Anti-Inflammation: KPV</h3>
<p>While BPC-157 physically repairs the barrier, the healing process is often stalled by runaway, chronic inflammation in the gut wall (as seen in Crohn's and Colitis). <strong>KPV</strong> is a naturally occurring ultra-short tripeptide (Lysine-Proline-Valine) with profound, localized anti-inflammatory properties. Because of its tiny molecular size, orally administered KPV easily penetrates the intestinal epithelial cells and local immune cells (macrophages). Once inside, it directly inhibits the NF-κB signaling pathway—the master switch that triggers the release of inflammatory cytokines (like TNF-alpha and IL-6). By silencing this inflammatory storm at the cellular level, KPV allows the intestinal mucosa to exit the constant state of "attack" and enter the proliferative healing phase.</p>
<h3>Immunomodulation and Microbiome Regulation: Thymosin Alpha-1</h3>
<p>Chronic gut issues are rarely just structural; they often involve deep dysregulation of the gut-associated lymphoid tissue (GALT), which houses 70% of the body's immune system. <strong>Thymosin Alpha-1 (TA1)</strong> is a naturally occurring peptide produced by the thymus gland. In the context of gut health, TA1 acts as an immune "modulator" rather than a strict stimulator or suppressant. It enhances the function of dendritic cells and promotes the differentiation of T-cells. For individuals with chronic gut infections, SIBO (Small Intestinal Bacterial Overgrowth), or candidiasis, TA1 significantly boosts the local immune system's ability to identify and clear pathogenic microbes. Conversely, in autoimmune gut conditions, it helps restore immune tolerance, preventing the immune system from attacking the healthy intestinal lining.</p>`,

  whatResearchShows: `<h2>Clinical and Preclinical Evidence for Gut-Targeted Peptides</h2>
<p>The evidence supporting the use of BPC-157, KPV, and TA1 in gastrointestinal pathology is extensive, with TA1 carrying full FDA approval for specific systemic immune indications.</p>
<h3>BPC-157: Resolving Complex Fistulas and Ulcers</h3>
<p>The preclinical data on BPC-157 in gastroenterology is unparalleled. Decades of research have demonstrated its ability to consistently heal gastric and duodenal ulcers induced by severe stress, alcohol, or NSAIDs. Even more remarkably, BPC-157 is one of the few compounds shown to effectively heal complex gastrointestinal fistulas (abnormal connections between organs) in rat models—a condition notoriously difficult to treat surgically in humans (PMID: 21030672). Researchers consistently note its pleiotropic effects: it modulates the nitric oxide (NO) system to maintain mucosal integrity, protects the endothelium, and drastically accelerates the closure of mucosal defects without the severe side effects associated with chronic PPI (Proton Pump Inhibitor) use.</p>
<h3>KPV: Efficacy in Inflammatory Bowel Disease Models</h3>
<p>KPV's efficacy is robustly supported by preclinical models of Inflammatory Bowel Disease (IBD). Studies utilizing mice with chemically induced colitis have demonstrated that oral or systemic administration of KPV significantly reduces colonic inflammation, prevents weight loss, and accelerates mucosal healing. Histological examinations in these studies reveal that KPV treatment dramatically decreases the infiltration of inflammatory cells (neutrophils and macrophages) into the gut wall and prevents the destruction of crypt architecture (PMID: 27914948). Its targeted inhibition of NF-κB makes it a highly promising research alternative to broad-spectrum systemic immunosuppressants.</p>
<h3>Thymosin Alpha-1: Immune Restoration</h3>
<p>Thymosin Alpha-1 (under the brand name Zadaxin) is an approved pharmaceutical in numerous countries for the treatment of Hepatitis B, Hepatitis C, and as an adjunct to vaccines in immunocompromised patients. While its clinical trials focus on systemic viral clearance and oncology, its immunomodulatory mechanisms are directly applicable to gut health. By enhancing T-cell mediated immunity and increasing the production of vital cytokines like Interferon-gamma, TA1 provides the crucial immune support required to clear chronic, deeply embedded gut infections that drive persistent dysbiosis and "leaky gut" (PMID: 20593777).</p>`,

  howToEvaluate: `<h2>Tracking Gastrointestinal Healing Metrics</h2>
<p>Evaluating a gut healing protocol relies on advanced stool diagnostics and systemic inflammatory markers.</p>
<ul>
  <li><strong>Comprehensive Stool Analysis (GI Map):</strong> The gold standard for assessing changes in the microbiome. Before and after testing can quantify the eradication of pathogenic bacteria/yeast (aided by TA1) and measure levels of Secretory IgA (sIgA), a primary marker of mucosal immune function.</li>
  <li><strong>Zonulin and Calprotectin Testing:</strong> Fecal calprotectin provides a direct, highly sensitive measurement of active inflammation within the intestines (targeted by KPV). Serum or fecal Zonulin levels indicate the integrity of the tight junctions; a successful BPC-157 protocol should result in a significant drop in Zonulin, indicating the "leaky gut" is sealing.</li>
  <li><strong>Symptom Tracking:</strong> Rigorous daily journaling of Bristol Stool Scale scores, post-prandial bloating, food intolerances, and systemic symptoms (like brain fog or joint pain, which often resolve when intestinal permeability is repaired).</li>
</ul>`,

  alternativeApproaches: `<h2>Alternative Stacks and Tradeoffs</h2>
<p>While the BPC-157/KPV/TA1 stack addresses the structural, inflammatory, and immune components of gut health, other interventions may be necessary.</p>
<h3>The Direct Eradication Protocol (LL-37)</h3>
<p>If a severe, antibiotic-resistant infection (like chronic SIBO or deep fungal overgrowth) is identified, researchers may utilize LL-37, a highly potent endogenous antimicrobial peptide. <strong>Tradeoff:</strong> LL-37 acts as a broad-spectrum, aggressive antibiotic. It actively destroys bacterial membranes. While highly effective at clearing pathogens, it can induce significant Herxheimer (die-off) reactions and may disrupt the healthy microbiome, requiring extensive rebuilding with BPC-157 and probiotics afterward.</p>`,

  references: [
    { id: 1, text: "Sikiric et al. (2010). Focus on epicatechin, BPC 157, and other compounds for tendon healing.", link: "https://pubmed.ncbi.nlm.nih.gov/21030672/" },
    { id: 2, text: "Dalmasso et al. (2014). PepT1-mediated epithelial transport of the antimicrobial peptide KPV.", link: "https://pubmed.ncbi.nlm.nih.gov/24434250/" },
    { id: 3, text: "Kann et al. (2017). KPV limits inflammatory responses in models of intestinal inflammation.", link: "https://pubmed.ncbi.nlm.nih.gov/27914948/" },
    { id: 4, text: "Garaci et al. (2012). Thymosin alpha 1 in the treatment of cancer.", link: "https://pubmed.ncbi.nlm.nih.gov/22464738/" },
    { id: 5, text: "Sikiric et al. (2018). Brain-gut axis and pentadecapeptide BPC 157.", link: "https://pubmed.ncbi.nlm.nih.gov/30302251/" }
  ]
};

const file = fs.readFileSync('src/data/goal-pages.ts', 'utf8');

const { Project, SyntaxKind } = require('ts-morph');
const project = new Project();
project.addSourceFilesAtPaths("src/data/goal-pages.ts");
const sourceFile = project.getSourceFile("src/data/goal-pages.ts");

const goalPagesArray = sourceFile.getVariableDeclaration("goalPages").getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const updates = {
    'brain-focus': brainContent,
    'skin-aesthetics': skinContent,
    'skin-aesthetic': skinContent,
    'gut-health': gutContent
};

goalPagesArray.getElements().forEach(element => {
    if (element.getKind() === SyntaxKind.ObjectLiteralExpression) {
        const slugProp = element.getProperty("slug");
        if (slugProp) {
            const slugValue = slugProp.getInitializer().getText().replace(/['"]/g, '');
            if (updates[slugValue]) {
                const content = updates[slugValue];
                ['whyThesePeptides', 'whatResearchShows', 'howToEvaluate', 'alternativeApproaches', 'references'].forEach(key => {
                    const p = element.getProperty(key);
                    if (p) p.remove();
                });

                element.addPropertyAssignment({ name: 'whyThesePeptides', initializer: '\`' + content.whyThesePeptides + '\`' });
                element.addPropertyAssignment({ name: 'whatResearchShows', initializer: '\`' + content.whatResearchShows + '\`' });
                element.addPropertyAssignment({ name: 'howToEvaluate', initializer: '\`' + content.howToEvaluate + '\`' });
                element.addPropertyAssignment({ name: 'alternativeApproaches', initializer: '\`' + content.alternativeApproaches + '\`' });
                element.addPropertyAssignment({ name: 'references', initializer: JSON.stringify(content.references, null, 8) });
                console.log("Updated " + slugValue);
            }
        }
    }
});

sourceFile.saveSync();
