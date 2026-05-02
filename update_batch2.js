const fs = require('fs');

const healingContent = {
  whyThesePeptides: `<h2>The Molecular Mechanics of Tissue Regeneration</h2>
<p>The human body's intrinsic healing response to musculoskeletal injury involves a complex cascade of inflammation, cellular proliferation, and extracellular matrix remodeling. While evolutionary optimized for survival, this process is often slow and prone to forming inferior scar tissue (fibrosis) rather than perfectly regenerating the original tissue architecture. Peptides like BPC-157 and TB-500 act as potent signaling molecules to accelerate and refine this process, primarily by upregulating angiogenesis and modulating cellular migration.</p>
<h3>Angiogenesis and Tendon Outgrowth: BPC-157</h3>
<p><strong>BPC-157</strong> (Body Protection Compound-157) is a synthetic 15-amino acid peptide derived from a naturally occurring protective protein found in gastric juice. In the context of healing, its primary mechanism is the profound stimulation of angiogenesis—the formation of new blood vessels from existing ones. Tendons and ligaments are notoriously avascular (having poor blood supply), which is the primary reason they heal so slowly compared to muscle tissue. By upregulating Vascular Endothelial Growth Factor (VEGF) and accelerating the formation of new capillary networks, BPC-157 drastically increases the delivery of oxygen, nutrients, and immune cells to the avascular injury site. Furthermore, *in vitro* studies demonstrate that BPC-157 actively promotes the outgrowth of tendon fibroblasts, the cells responsible for synthesizing new collagen fibers, leading to a denser and structurally superior repair.</p>
<h3>Actin Sequestration and Cellular Migration: TB-500</h3>
<p><strong>TB-500</strong> is a synthetic fraction of Thymosin Beta-4, a naturally occurring peptide present in almost all animal and human cells, particularly in high concentrations in blood platelets. Its defining mechanism of action is its ability to bind to actin, a ubiquitous structural protein that forms the cellular cytoskeleton. By sequestering actin monomers, TB-500 regulates actin polymerization. This dynamic control over the cytoskeleton is crucial for cellular motility. In the presence of TB-500, repair cells (such as macrophages and fibroblasts) can migrate much more rapidly to the site of injury. Additionally, TB-500 exhibits potent anti-inflammatory properties, reducing the excessive acute inflammation that can delay the transition from the inflammatory phase to the proliferative phase of healing.</p>
<h3>Modulating Inflammation: KPV and GHK-Cu</h3>
<p>While BPC-157 and TB-500 drive the physical reconstruction of tissue, other peptides play crucial supporting roles. <strong>KPV</strong> is an ultra-short tripeptide (Lysine-Proline-Valine) that exhibits powerful systemic anti-inflammatory effects by inhibiting the NF-κB pathway, a central hub for inflammatory cytokine production. <strong>GHK-Cu</strong> (Copper Peptide), while famous for aesthetic applications, is vital for wound healing. It modulates the breakdown of damaged collagen (via metalloproteinases) and stimulates the synthesis of new, organized collagen, preventing excessive scar tissue formation.</p>`,

  whatResearchShows: `<h2>Clinical and Preclinical Evidence for Healing Peptides</h2>
<p>The evidence supporting the use of BPC-157 and TB-500 for tissue repair is heavily concentrated in preclinical animal models and *in vitro* cellular studies, as large-scale human clinical trials remain limited due to their status as unpatentable, naturally derived sequences or their primary use in research/veterinary settings.</p>
<h3>BPC-157: Systemic and Localized Repair</h3>
<p>The regenerative capacity of BPC-157 is extraordinarily well-documented in preclinical literature. A foundational 2010 review by Sikiric et al. summarized decades of research demonstrating that BPC-157 accelerates the healing of transected muscles, crushed muscles, and severed Achilles tendons in rat models (PMID: 21030672). Notably, the research highlights its "gastric pentadecapeptide" origins, showing that BPC-157 administered orally, topically, or via injection exerts systemic healing effects, promoting the survival of cells under severe oxidative stress and resolving complex fistulas and anastomoses that otherwise failed to heal.</p>
<h3>Thymosin Beta-4 (TB-500) and Tissue Remodeling</h3>
<p>Research on Thymosin Beta-4 (the parent molecule of TB-500) is extensive, particularly in the fields of cardiology and ophthalmology. Studies have demonstrated its ability to promote the survival of cardiomyocytes following myocardial infarction (heart attack) and accelerate the healing of corneal ulcers by promoting epithelial cell migration (PMID: 17560408). In the context of musculoskeletal injuries, a 2016 study highlighted its ability to significantly improve muscle regeneration and reduce fibrosis following acute skeletal muscle injury in mice, underscoring its dual role in promoting cellular migration and mitigating scar tissue formation.</p>
<h3>KPV and Inflammatory Bowel Disease</h3>
<p>While often used systemically for joint inflammation, KPV's strongest clinical data lies in the treatment of gastrointestinal inflammation. Preclinical models of Inflammatory Bowel Disease (IBD) have shown that KPV significantly reduces mucosal damage and inflammatory infiltrates in the colon. Its mechanism involves penetrating cells and directly interacting with the signaling molecules that trigger the inflammatory cascade, demonstrating a highly targeted anti-inflammatory effect without the immunosuppressive risks of corticosteroids.</p>`,

  howToEvaluate: `<h2>Tracking Healing and Recovery Metrics</h2>
<p>Evaluating a tissue regeneration protocol requires objective measurements of functional recovery and structural integrity.</p>
<ul>
  <li><strong>Diagnostic Imaging (MRI/Ultrasound):</strong> The definitive method for tracking the structural repair of tendons, ligaments, and muscle tears. Follow-up imaging can quantify the reduction in gap size in a torn tendon or the organization of newly formed collagen fibers.</li>
  <li><strong>Range of Motion (ROM) and Functional Testing:</strong> Utilizing goniometers to measure joint ROM and dynamometers to measure localized strength deficits compared to the uninjured baseline. A successful protocol will demonstrate an accelerated return to baseline functional metrics.</li>
  <li><strong>Inflammatory Markers (hs-CRP & ESR):</strong> For protocols utilizing KPV or systemic TB-500 to address chronic, systemic inflammation, tracking high-sensitivity C-Reactive Protein (hs-CRP) and Erythrocyte Sedimentation Rate (ESR) provides quantitative data on the reduction of systemic inflammatory load.</li>
</ul>`,

  alternativeApproaches: `<h2>Alternative Stacks and Tradeoffs</h2>
<p>The 'Wolverine Stack' (BPC-157 + TB-500) is the gold standard for acute injury, but different types of injuries may necessitate alternative approaches.</p>
<h3>The Cartilage/Joint Stack (Pentosan Polysulfate + BPC-157)</h3>
<p>While BPC-157 and TB-500 are excellent for soft tissue (muscle, tendon, ligament), they are less effective at regenerating hyaline cartilage in severe osteoarthritis. <strong>Tradeoff:</strong> For degenerative joint disease, combining BPC-157 (for surrounding tissue inflammation) with Pentosan Polysulfate Sodium (PPS)—a drug that actively stimulates chondrocytes to produce proteoglycans and lubricates the joint capsule—is often a superior, though more complex, approach.</p>
<h3>The Systemic Anti-Inflammatory Protocol (Thymosin Alpha-1 + KPV)</h3>
<p>If the 'injury' is actually a systemic autoimmune flare-up causing widespread joint pain (e.g., Rheumatoid Arthritis), localized soft-tissue peptides are insufficient. <strong>Tradeoff:</strong> This approach shifts away from localized tissue repair toward systemic immune modulation, requiring careful monitoring of immune markers rather than structural joint integrity.</p>`,

  references: [
    { id: 1, text: "Sikiric et al. (2010). Focus on epicatechin, BPC 157, and other compounds for tendon healing.", link: "https://pubmed.ncbi.nlm.nih.gov/21030672/" },
    { id: 2, text: "Goldstein et al. (2007). Thymosin beta4: actin-sequestering protein moonlights to repair injured tissues.", link: "https://pubmed.ncbi.nlm.nih.gov/17560408/" },
    { id: 3, text: "Tkalcevic et al. (2007). Enhancement by PL 14736 (BPC 157) of angiogenesis and tissue granulation.", link: "https://pubmed.ncbi.nlm.nih.gov/17711202/" },
    { id: 4, text: "Kannus (2000). Structure of the tendon connective tissue.", link: "https://pubmed.ncbi.nlm.nih.gov/11142145/" },
    { id: 5, text: "Pickart et al. (2015). GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration.", link: "https://pubmed.ncbi.nlm.nih.gov/26195973/" }
  ]
};

const antiAgingContent = {
  whyThesePeptides: `<h2>The Molecular Mechanics of Cellular Senescence and Rejuvenation</h2>
<p>Biological aging is characterized by the progressive accumulation of cellular damage, telomere attrition, mitochondrial dysfunction, and the accumulation of senescent cells. Unlike aesthetic approaches that merely mask the visible signs of aging, advanced peptide protocols target these fundamental hallmarks at the epigenetic and cellular level. Peptides like Epitalon, MOTS-c, and SS-31 represent the vanguard of gerontological research, aiming to restore cellular function and extend healthspan.</p>
<h3>Telomerase Activation and Epigenetic Reset: Epitalon</h3>
<p><strong>Epitalon</strong> (Epithalon) is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) based on a naturally occurring extract from the pineal gland. Its primary and most profound mechanism of action is the upregulation of telomerase, the enzyme responsible for maintaining the length of telomeres (the protective caps at the ends of chromosomes). Every time a cell divides, its telomeres shorten; when they become critically short, the cell enters a state of senescence (arrested division) or apoptosis (programmed death), a primary driver of tissue aging. By stimulating telomerase activity, Epitalon has been shown in *in vitro* human somatic cells to elongate telomeres, effectively resetting the cellular 'clock' and allowing cells to exceed their Hayflick limit (their genetically programmed number of maximum divisions). Furthermore, Epitalon exerts a profound regulatory effect on the neuroendocrine system, specifically by normalizing the circadian rhythm and restoring endogenous melatonin production from the pineal gland, which typically plummets with age.</p>
<h3>Mitochondrial Optimization: SS-31 and MOTS-c</h3>
<p>Mitochondrial dysfunction is another primary hallmark of aging. As mitochondria age, they become less efficient at producing ATP and leak more Reactive Oxygen Species (ROS), leading to systemic oxidative stress. <strong>SS-31</strong> (Elamipretide) is a revolutionary tetrapeptide that selectively targets the inner mitochondrial membrane. It binds specifically to cardiolipin, a structural lipid crucial for the electron transport chain. By stabilizing cardiolipin, SS-31 restores optimal electron flow, drastically reducing ROS leakage and restoring ATP production in failing mitochondria. It is, essentially, a direct 'tune-up' for cellular engines.</p>
<p><strong>MOTS-c</strong> (Mitochondrial Open Reading Frame of the 12S rRNA-c) operates differently. It is a 'mitokine'—a peptide encoded within the mitochondrial DNA itself that travels to the cell nucleus to influence gene expression. MOTS-c promotes metabolic flexibility and systemic insulin sensitivity, counteracting the metabolic slowdown characteristic of aging. It acts as an exercise mimetic, activating the AMPK pathway to promote fatty acid oxidation and cellular energy homeostasis.</p>
<h3>Extracellular Matrix Remodeling: GHK-Cu</h3>
<p>While Epitalon and SS-31 work internally, <strong>GHK-Cu</strong> (Copper Peptide) addresses the systemic degradation of the extracellular matrix (ECM). As we age, collagen synthesis declines and the cross-linking of existing collagen stiffens tissues. GHK-Cu, a naturally occurring tripeptide that declines significantly with age, is a master regulator of tissue remodeling. It signals the breakdown of damaged, fibrotic tissue and stimulates the synthesis of new, organized collagen, elastin, and glycosaminoglycans, restoring elasticity to the skin, blood vessels, and internal organs.</p>`,

  whatResearchShows: `<h2>Clinical and Preclinical Evidence for Gerontological Peptides</h2>
<p>The field of peptide-based gerontology is supported by decades of robust research, particularly originating from the St. Petersburg Institute of Bioregulation and Gerontology in Russia, where much of the foundational work on Epitalon was conducted.</p>
<h3>Epitalon: Lifespan Extension in Animal Models</h3>
<p>The clinical and preclinical data on Epitalon is extensive. Long-term studies conducted by Dr. Vladimir Khavinson on various animal models (mice, rats, fruit flies) consistently demonstrated that Epitalon administration significantly extends maximum lifespan—in some models, by up to 25-30% (PMID: 12937617). Beyond mere lifespan extension, these studies noted profound increases in healthspan; the animals maintained reproductive capacity longer, showed delayed onset of age-related retinal degeneration, and exhibited a significantly lower incidence of spontaneous tumors. While large-scale, decades-long human lifespan trials are logistically impossible, early clinical trials in elderly populations showed that Epitalon significantly improved antioxidant defenses, normalized melatonin secretion, and decreased mortality rates over a 15-year follow-up period compared to control groups.</p>
<h3>SS-31 (Elamipretide): Reversing Mitochondrial Failure</h3>
<p>SS-31 has been rigorously studied in the context of age-related diseases driven by mitochondrial failure. In aged mouse models, SS-31 administration reversed age-related declines in cardiac function by directly restoring mitochondrial bioenergetics and reducing oxidative stress in the myocardium (PMID: 24706522). Clinically, SS-31 is currently in advanced phase human trials for primary mitochondrial myopathies and heart failure, demonstrating its potent, disease-modifying capability to restore energy production in failing tissues.</p>
<h3>MOTS-c and Metabolic Aging</h3>
<p>Research into MOTS-c has illuminated the critical role of mitochondrial signaling in whole-body aging. Studies have shown that MOTS-c levels decline significantly with age. Exogenous administration in aged mice reversed age-dependent skeletal muscle insulin resistance and completely prevented diet-induced obesity (PMID: 25738459). The research suggests MOTS-c acts as a vital systemic signal to coordinate cellular metabolism and counteract the metabolic decline inherent in the aging process.</p>`,

  howToEvaluate: `<h2>Tracking Biological Age and Healthspan Metrics</h2>
<p>Evaluating an anti-aging protocol requires moving beyond subjective feelings and utilizing objective biomarkers of physiological aging.</p>
<ul>
  <li><strong>Epigenetic Clocks (DNA Methylation Testing):</strong> The most accurate modern method for assessing biological age. These tests measure the methylation patterns on DNA, which change predictably with age. A successful Epitalon protocol aims to reduce the biological age score relative to chronological age.</li>
  <li><strong>Telomere Length Testing (qPCR or FISH):</strong> While variable, measuring leukocyte telomere length provides a direct assessment of Epitalon's purported primary mechanism of action. Testing should be done at baseline and several months post-protocol to assess elongation or stabilization.</li>
  <li><strong>Advanced Inflammatory and Metabolic Panels:</strong> Tracking hs-CRP, fasting insulin, HbA1c, and Homocysteine. Effective anti-aging protocols utilizing MOTS-c and SS-31 should demonstrate a significant reduction in systemic inflammation and a dramatic improvement in insulin sensitivity.</li>
</ul>`,

  alternativeApproaches: `<h2>Alternative Stacks and Tradeoffs</h2>
<p>While the Epitalon/Mitochondrial stack targets the deepest roots of aging, other approaches prioritize different hallmarks of senescence.</p>
<h3>The Senolytic Stack (Dasatinib + Quercetin or Fisetin)</h3>
<p>Rather than rejuvenating cells, this approach focuses on destroying senescent ('zombie') cells that have stopped dividing and are secreting inflammatory cytokines (SASP). <strong>Tradeoff:</strong> Senolytics act via controlled toxicity to clear out bad cells, which can induce acute systemic stress and inflammation during the clearing process. It is a "pruning" mechanism, unlike Epitalon's "fertilizing" mechanism, and the two are often cycled sequentially.</p>
<h3>The mTOR Inhibition Protocol (Rapamycin)</h3>
<p>Rapamycin is currently the most robustly proven lifespan-extending pharmacological agent in mammalian models. It works by inhibiting the mTOR pathway, essentially tricking the body into a state of perceived nutrient scarcity, which dramatically upregulates cellular autophagy (self-cleaning). <strong>Tradeoff:</strong> Chronic mTOR inhibition can suppress the immune system and make it exceptionally difficult to build or maintain muscle mass (sarcopenia), a major risk factor in aging.</p>`,

  references: [
    { id: 1, text: "Khavinson et al. (2003). Peptides and ageing.", link: "https://pubmed.ncbi.nlm.nih.gov/12937617/" },
    { id: 2, text: "Lee et al. (2015). The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance.", link: "https://pubmed.ncbi.nlm.nih.gov/25738459/" },
    { id: 3, text: "Szeto (2014). First-in-class cardiolipin-protective compound as a therapeutic agent to restore mitochondrial bioenergetics.", link: "https://pubmed.ncbi.nlm.nih.gov/24706522/" },
    { id: 4, text: "Khavinson et al. (2003). Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells.", link: "https://pubmed.ncbi.nlm.nih.gov/12937622/" },
    { id: 5, text: "Pickart et al. (2015). GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration.", link: "https://pubmed.ncbi.nlm.nih.gov/26195973/" }
  ]
};

const sleepContent = {
  whyThesePeptides: `<h2>The Neuroendocrinology of Sleep Architecture and Recovery</h2>
<p>Optimal sleep is not merely the absence of wakefulness; it is a highly active, multiphasic physiological state characterized by distinct shifts in neurochemistry, brainwave patterns, and systemic hormonal secretion. Disorders of sleep architecture—such as insufficient slow-wave (deep) sleep or disrupted REM cycles—severely impair central nervous system recovery, memory consolidation, and muscular repair. Peptides like DSIP, Epitalon, and Ipamorelin modulate the precise neuroendocrine pathways required to initiate, maintain, and maximize the restorative capacity of sleep.</p>
<h3>Delta Sleep-Inducing Peptide (DSIP)</h3>
<p><strong>DSIP</strong> is a naturally occurring nonapeptide first isolated from the venous blood of rabbits induced into deep sleep. True to its name, DSIP's primary physiological role is the promotion of slow-wave sleep (delta wave sleep), the deepest and most restorative phase of the sleep cycle. During delta sleep, the brain consolidates physical memory and the body executes its most critical tissue repair processes. DSIP crosses the blood-brain barrier and interacts with diverse neurotransmitter systems, modulating the activity of GABAergic neurons (which promote relaxation and sleep) while suppressing activating pathways. Crucially, DSIP acts as an amphiphilic neuromodulator; it does not force sedation like a pharmaceutical hypnotic (e.g., Ambien), but rather normalizes the sleep-wake cycle, facilitating the natural transition into deeper, more organized sleep architecture.</p>
<h3>Circadian Rhythm Normalization: Epitalon</h3>
<p>The master regulator of the human sleep-wake cycle is the circadian rhythm, driven by the cyclical release of melatonin from the pineal gland. With age or chronic stress, the pineal gland's function degrades, leading to erratic melatonin secretion and severe sleep fragmentation. <strong>Epitalon</strong> (Epithalon) exerts a profound regulatory effect on the neuroendocrine system by acting directly on the pineal gland. Clinical research demonstrates that Epitalon administration normalizes the circadian rhythm by restoring endogenous melatonin production to youthful levels. By resetting this master clock, Epitalon helps establish a robust, synchronized sleep drive, ensuring that sleep onset is rapid and sleep maintenance is stable throughout the night.</p>
<h3>The Nocturnal Anabolic Pulse: Ipamorelin</h3>
<p>While DSIP and Epitalon orchestrate the neurological and circadian aspects of sleep, <strong>Ipamorelin</strong> maximizes the physical recovery that occurs *during* sleep. In a healthy physiological state, the largest pulse of Growth Hormone (GH) is secreted by the pituitary gland shortly after the onset of deep, slow-wave sleep. This GH pulse is the primary driver of systemic tissue repair and cellular regeneration. Ipamorelin, a highly selective Growth Hormone Secretagogue, administered prior to bed, perfectly mimics and amplifies this natural nocturnal pulse. By driving a massive, clean release of GH during delta sleep, Ipamorelin ensures that the body's repair mechanisms operate at maximum capacity, significantly reducing delayed onset muscle soreness (DOMS) and accelerating recovery from physical and neurological stress.</p>`,

  whatResearchShows: `<h2>Clinical and Preclinical Evidence for Sleep Optimization</h2>
<p>The research surrounding sleep peptides focuses heavily on their ability to modulate EEG patterns, normalize hormonal secretion profiles, and reduce the physiological markers of stress, differentiating them significantly from traditional sedative-hypnotic medications.</p>
<h3>DSIP: Normalizing EEG Architecture</h3>
<p>Since its discovery in the 1970s, DSIP has been the subject of extensive neurophysiological research. Early clinical studies demonstrated its profound impact on sleep architecture. In double-blind, placebo-controlled trials involving patients with chronic insomnia, intravenous and intranasal administration of DSIP significantly increased total sleep time and, crucially, increased the percentage of time spent in REM and Slow-Wave Sleep (delta sleep) without causing morning grogginess or rebound insomnia (PMID: 6149463). Furthermore, preclinical research has consistently highlighted DSIP's role as a potent stress-modulating peptide. It has been shown to significantly decrease the stress-induced activation of the sympathetic nervous system and normalize corticotropin-releasing factor (CRF) levels, demonstrating a protective effect against severe physiological and psychological stress (PMID: 6100589).</p>
<h3>Epitalon: Restoring the Pineal Gland</h3>
<p>The gerontological research on Epitalon, primarily conducted by the St. Petersburg Institute of Bioregulation and Gerontology, provides robust evidence for its circadian-regulating properties. In clinical trials involving elderly patients with severely disrupted sleep-wake cycles, Epitalon administration was shown to significantly normalize the diurnal rhythm of melatonin secretion. Patients reported marked improvements in sleep quality, reduced sleep latency, and an overall improvement in perceived vitality. The research underscores Epitalon's ability to correct the fundamental neuroendocrine dysfunction driving age-related insomnia, rather than merely treating the symptom.</p>
<h3>Ipamorelin and the Nocturnal GH Pulse</h3>
<p>The clinical validation of Ipamorelin lies in its highly specific, targeted effect on the GH axis. Unlike older GH secretagogues (like GHRP-2 or GHRP-6) that simultaneously spike cortisol and prolactin—stress hormones that can actively disrupt sleep—Ipamorelin is uniquely selective. Preclinical and early clinical models demonstrate that Ipamorelin administration elicits a massive, dose-dependent release of Growth Hormone without elevating ACTH, cortisol, or prolactin (PMID: 9849822). This selectivity makes it the ideal candidate for nocturnal administration, ensuring that the anabolic GH pulse is amplified without triggering stress pathways that would cause wakefulness or night sweats.</p>`,

  howToEvaluate: `<h2>Tracking Sleep Architecture and Recovery Metrics</h2>
<p>Evaluating a sleep and recovery protocol requires precise data on both neurological sleep stages and systemic physical readiness.</p>
<ul>
  <li><strong>Polysomnography or Advanced Wearables (Oura/Whoop):</strong> The critical metric is not just 'time in bed,' but the specific percentages of REM and Deep (Slow-Wave) sleep. A successful DSIP/Epitalon protocol will demonstrate a measurable, sustained increase in Deep sleep duration and a reduction in nocturnal awakenings.</li>
  <li><strong>Heart Rate Variability (HRV):</strong> HRV is the gold standard for measuring autonomic nervous system recovery. Improved sleep architecture should translate to a significant increase in morning HRV, indicating that the parasympathetic nervous system has successfully restored systemic balance.</li>
  <li><strong>Morning Cortisol and Melatonin Profiles:</strong> For protocols utilizing Epitalon to reset the circadian rhythm, a salivary hormone panel (often a 4-point cortisol/melatonin test) can definitively confirm that the cortisol 'awakening response' has been restored and nocturnal melatonin secretion has been normalized.</li>
</ul>`,

  alternativeApproaches: `<h2>Alternative Stacks and Tradeoffs</h2>
<p>While the DSIP/Epitalon stack targets the neuroendocrine architecture of sleep, other approaches may be necessary for acute or severe stress-induced insomnia.</p>
<h3>The Anxiolytic Stack (Selank + DSIP)</h3>
<p>If sleep disruption is primarily driven by acute anxiety, racing thoughts, or a hyperactive sympathetic nervous system, Epitalon (which takes weeks to reset the circadian rhythm) may be too slow. <strong>Tradeoff:</strong> Adding Selank, a potent anxiolytic peptide that modulates GABA receptors, provides rapid, acute relief from anxiety, allowing DSIP to initiate sleep. However, Selank addresses the symptom (anxiety) rather than the underlying circadian clock.</p>
<h3>The Anti-Inflammatory Recovery Stack (BPC-157 + Ipamorelin)</h3>
<p>For athletes where 'poor sleep' is actually secondary to severe physical pain or localized inflammation, neurological sleep peptides may be insufficient. <strong>Tradeoff:</strong> Substituting DSIP with a localized, potent anti-inflammatory like BPC-157 addresses the physical pain preventing sleep, while Ipamorelin drives systemic repair. This approach focuses on physical regeneration rather than strictly neurological sleep architecture.</p>`,

  references: [
    { id: 1, text: "Khavinson et al. (2001). Pineal peptides and regulation of aging.", link: "https://pubmed.ncbi.nlm.nih.gov/11756779/" },
    { id: 2, text: "Graf et al. (1984). Delta-sleep-inducing peptide (DSIP): an update.", link: "https://pubmed.ncbi.nlm.nih.gov/6149463/" },
    { id: 3, text: "Svensson et al. (2000). Ipamorelin, a new lead in GHRP research.", link: "https://pubmed.ncbi.nlm.nih.gov/10828840/" },
    { id: 4, text: "Raevsky et al. (1999). Stress-protective properties of delta-sleep-inducing peptide.", link: "https://pubmed.ncbi.nlm.nih.gov/10420556/" },
    { id: 5, text: "Raun et al. (1998). Ipamorelin, the first selective growth hormone secretagogue.", link: "https://pubmed.ncbi.nlm.nih.gov/9849822/" }
  ]
};

const file = fs.readFileSync('src/data/goal-pages.ts', 'utf8');

const { Project, SyntaxKind } = require('ts-morph');
const project = new Project();
project.addSourceFilesAtPaths("src/data/goal-pages.ts");
const sourceFile = project.getSourceFile("src/data/goal-pages.ts");

const goalPagesArray = sourceFile.getVariableDeclaration("goalPages").getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const updates = {
    'healing': healingContent,
    'anti-aging': antiAgingContent,
    'sleep-recovery': sleepContent
};

goalPagesArray.getElements().forEach(element => {
    if (element.getKind() === SyntaxKind.ObjectLiteralExpression) {
        const slugProp = element.getProperty("slug");
        if (slugProp) {
            const slugValue = slugProp.getInitializer().getText().replace(/['"]/g, '');
            if (updates[slugValue]) {
                const content = updates[slugValue];
                // Remove existing ones if any just in case
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
