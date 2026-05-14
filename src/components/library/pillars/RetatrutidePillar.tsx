import React from 'react';
import Link from 'next/link';
import { Beaker, BookOpen, Syringe, GitCompare, User as UserIcon } from 'lucide-react';

export function RetatrutidePillar() {
  return (
    <div className="pd-pillar-expansion mt-12 pt-12 border-t border-zinc-800/50">
      <div className="pd-section-header mb-8">
        <h2 className="text-2xl font-bold text-zinc-100 font-serif">Comprehensive Research Guide</h2>
        <p className="text-zinc-400 mt-2">Deep dive into the molecular mechanics, clinical trial data, and protocol logs for retatrutide.</p>
      </div>

      {/* Deep Dive: Mechanism of Action */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Beaker className="w-6 h-6 text-violet-400" />
          <h3 className="text-xl font-bold text-zinc-100">Deep Dive: Mechanism of Action</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Retatrutide (LY3437943) represents a paradigm shift in the pharmacological management of metabolic disease, transitioning from the dual-agonism of tirzepatide to a true <strong>triple-hormone-receptor agonist</strong>. It acts simultaneously on the glucagon-like peptide-1 (GLP-1), glucose-dependent insulinotropic polypeptide (GIP), and glucagon (GCG) receptors. This tri-agonism fundamentally alters the energy balance equation by suppressing appetite (via GLP-1/GIP) while simultaneously upregulating energy expenditure and lipid metabolism (via GCG).
          </p>
          <p>
            The inclusion of the glucagon receptor agonism is what separates retatrutide from its predecessors. Historically, glucagon was viewed solely as a counter-regulatory hormone to insulin, responsible for raising blood glucose during fasting. However, modern metabolic research has illuminated glucagon's role in increasing resting energy expenditure, promoting lipolysis (the breakdown of fats), and enhancing hepatic lipid oxidation. When combined with the profound insulin-sensitizing and appetite-suppressing effects of GLP-1 and GIP, the addition of glucagon agonism creates a synergistic effect that drives unparalleled weight loss and metabolic correction.
          </p>
          <p>
            According to the foundational pharmacokinetic studies leading up to its Phase 2 trials, retatrutide exhibits a half-life of approximately 6 days, allowing for once-weekly subcutaneous administration. The peptide backbone is structurally engineered to resist degradation by dipeptidyl peptidase-4 (DPP-4), similar to semaglutide and tirzepatide, ensuring sustained receptor engagement. The precise binding affinities are optimized to provide robust GLP-1 and GIP agonism while dialing in the glucagon agonism to a specific threshold—enough to drive lipid oxidation and energy expenditure, but not so high as to induce hyperglycemia.
          </p>
          <p>
            This delicate balance of receptor affinities is the "secret sauce" of retatrutide. The GLP-1 component slows gastric emptying and signals satiety in the hypothalamus. The GIP component enhances insulin secretion, improves white adipose tissue (WAT) blood flow, and may possess direct central nervous system effects that reduce nausea (a common side effect of pure GLP-1 agonists). Finally, the glucagon component acts directly on the liver to clear ectopic fat (steatosis) and increases basal metabolic rate. This tripartite attack on obesity is why retatrutide is often referred to in research circles as the "God Molecule" of metabolic peptides.
          </p>
          <blockquote className="border-l-4 border-violet-500 pl-4 my-6 italic text-zinc-400 bg-zinc-900/30 p-4 rounded-r-lg">
            "Retatrutide is a single molecule with agonism at the GIP, GLP-1, and glucagon receptors... The addition of glucagon agonism is intended to increase energy expenditure and further improve hepatic fat metabolism." (Jastreboff et al., 2023, PMID: 37351564)
          </blockquote>
        </div>
      </section>

      {/* Clinical Trial Data: Phase-by-Phase Breakdown */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-zinc-100">Clinical Trial Data: Phase-by-Phase Breakdown</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            The clinical trajectory of retatrutide is advancing rapidly, driven by Eli Lilly. The data emerging from the Phase 2 trials has effectively redefined the ceiling for pharmacological weight loss, surpassing the benchmarks set by both semaglutide (STEP trials) and tirzepatide (SURMOUNT trials).
          </p>
          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">The Phase 2 Obesity Trial (NEJM, 2023)</h4>
          <p>
            The most consequential data published to date is the Phase 2, double-blind, randomized, placebo-controlled trial published in <em>The New England Journal of Medicine</em> by Jastreboff et al. (PMID: 37351564). This trial enrolled 338 adults with obesity (BMI ≥30) or overweight (BMI ≥27) with at least one weight-related condition. The study evaluated multiple dosing cohorts over a 48-week period.
          </p>
          <p>
            The results were, frankly, staggering. At 48 weeks, the mean body weight reductions were strictly dose-dependent:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4 text-zinc-300">
            <li><strong>Placebo:</strong> -2.1%</li>
            <li><strong>1mg cohort:</strong> -8.7%</li>
            <li><strong>4mg combined cohort:</strong> -17.1%</li>
            <li><strong>8mg combined cohort:</strong> -22.8%</li>
            <li><strong>12mg cohort:</strong> <strong className="text-emerald-400">-24.2%</strong></li>
          </ul>
          <p>
            To contextualize the 24.2% figure: this magnitude of weight loss was previously only achievable via bariatric surgery (such as a sleeve gastrectomy or Roux-en-Y gastric bypass). Furthermore, the responder rates—the percentage of subjects achieving clinically meaningful weight loss thresholds—were universally high. In the 12mg cohort, 100% of participants achieved ≥5% weight loss, 93% achieved ≥10%, and a remarkable 83% achieved ≥15% weight loss. Even in the moderate 4mg group, 75% of participants lost at least 10% of their body weight.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">The NAFLD/MASLD Sub-Study (Nature Medicine, 2024)</h4>
          <p>
            While the primary weight loss figures capture the headlines, the hepatic (liver) data represents perhaps the most clinically profound impact of retatrutide, driven primarily by its glucagon receptor agonism. A sub-study analyzing patients with metabolic dysfunction-associated steatotic liver disease (MASLD), formerly known as NAFLD, was published by Sanyal et al. in <em>Nature Medicine</em> (PMID: 38858523).
          </p>
          <p>
            In this 24-week analysis, subjects receiving the 12mg dose of retatrutide experienced an <strong>82.4% relative reduction in liver fat</strong>. Even more impressive, 86% of the participants in the 12mg group achieved complete normalization of liver fat (defined as &lt;5% intrahepatic lipid content) within just 24 weeks. This rapid and near-total clearance of ectopic liver fat strongly supports the hypothesis that glucagon agonism uniquely accelerates hepatic lipid oxidation beyond what GLP-1/GIP dual agonism can achieve alone.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Beyond Obesity: TRIUMPH Phase 3 Indications</h4>
          <p>
            Eli Lilly has initiated the massive <strong>TRIUMPH Phase 3 clinical program</strong> for retatrutide. Recognizing the compound's pleiotropic effects, the TRIUMPH program is not solely focused on chronic weight management. It includes dedicated trials investigating retatrutide's efficacy for:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-zinc-300">
            <li><strong>Obstructive Sleep Apnea (OSA):</strong> Evaluating whether the profound weight loss and potential direct respiratory effects can resolve moderate-to-severe OSA.</li>
            <li><strong>Knee Osteoarthritis (OA):</strong> Assessing pain reduction and mobility improvements as mechanical offloading occurs via fat mass reduction.</li>
            <li><strong>Cardiovascular Outcomes:</strong> Long-term trials to definitively prove reductions in Major Adverse Cardiovascular Events (MACE).</li>
          </ul>
          <p>
            The expansion into OSA and OA signifies that retatrutide is being positioned not merely as an anti-obesity medication, but as a systemic therapeutic for the myriad mechanical and metabolic consequences of excess adiposity.
          </p>
        </div>
      </section>

      {/* Stacking Synergies */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <GitCompare className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-zinc-100">Stacking Synergies: What the Research Supports</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            In the research community, retatrutide is increasingly viewed as a foundational "base" compound, upon which other targeted peptides can be stacked to mitigate its specific drawbacks (primarily muscle wasting) or enhance its metabolic effects. Due to the extreme caloric deficit induced by the tri-agonist, preserving Lean Body Mass (LBM) is the primary objective of most retatrutide stacks.
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-4">1. The LBM Preservation Stack: Retatrutide + Tesamorelin</h4>
          <p>
            The most prominent concern with losing 24%+ of body weight is the concurrent loss of skeletal muscle. Researchers frequently stack <Link href="/library/tesamorelin" className="text-gold hover:underline">Tesamorelin</Link> (a GHRH analog) alongside retatrutide. Tesamorelin stimulates the pulsatile release of endogenous growth hormone, which has potent anti-catabolic properties. Furthermore, tesamorelin has FDA-approved data (SEROSTIM trials) demonstrating targeted reductions in visceral adipose tissue (VAT). This stack aims to maximize VAT reduction while utilizing elevated IGF-1 levels to protect muscle tissue during the severe retatrutide-induced caloric deficit.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-4">2. The Mitochondrial Density Stack: Retatrutide + MOTS-c</h4>
          <p>
            While retatrutide forces the body to oxidize fat via receptor agonism, <Link href="/library/mots-c" className="text-gold hover:underline">MOTS-c</Link> (a mitochondrial-derived peptide) acts downstream by activating AMPK, essentially mimicking the metabolic effects of exercise. The hypothesis behind this stack is that MOTS-c increases the cellular capacity for lipid oxidation (upregulating mitochondrial density and function), ensuring that the free fatty acids liberated by retatrutide's glucagon activity are efficiently burned for energy rather than recirculated.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-4">3. The GI Mitigation Stack: Retatrutide + BPC-157</h4>
          <p>
            Like all incretin mimetics, retatrutide can cause significant gastrointestinal distress (nausea, delayed gastric emptying, dyspepsia), especially during the dose-escalation phase. Researchers often implement systemic <Link href="/library/bpc-157" className="text-gold hover:underline">BPC-157</Link> alongside the tri-agonist. BPC-157 has well-documented cytoprotective effects on the gastric mucosa and can modulate the gut-brain axis, potentially attenuating the severity of incretin-induced nausea and ensuring subjects can maintain the protocol without debilitating GI side effects.
          </p>
        </div>
      </section>

      {/* Reconstitution & Storage */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Syringe className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-zinc-100">Reconstitution & Storage: Lab-Grade Handling</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Retatrutide is sourced by researchers as a lyophilized (freeze-dried) powder and must be reconstituted with bacteriostatic water prior to subcutaneous administration. Because of the extreme potency of the compound—where dosing increments of even 1mg make a massive difference in side effect severity—precision in reconstitution is paramount.
          </p>
          <p>
            Most high-tier research vendors, such as <Link href="/vendors/amino-club" className="text-gold hover:underline">Amino Club</Link>, supply retatrutide in 10mg or 15mg vials. 
          </p>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl my-6">
            <h4 className="text-lg font-bold text-zinc-100 mb-4">Standard 10mg Vial Reconstitution (for 2mg starting doses)</h4>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li><strong>Peptide Mass:</strong> 10mg Retatrutide</li>
              <li><strong>Diluent Volume:</strong> 2.0 mL Bacteriostatic Water</li>
              <li><strong>Resulting Concentration:</strong> 5mg per 1mL</li>
              <li><strong>Syringe Draw (for 2mg dose):</strong> 40 units (0.4mL) on a standard U-100 insulin syringe.</li>
            </ul>
          </div>
          <p>
            For researchers requiring different concentrations or adjusting for 15mg vials, I highly recommend using our <Link href="/tools/calculator" className="text-gold hover:underline font-bold">PeptiDex Reconstitution Calculator</Link> to ensure exact volumetric measurements. An error in decimal placement can result in a 10x overdose, which, with a tri-agonist, will lead to severe gastrointestinal distress and potential hypoglycemia.
          </p>
          <p>
            <strong>Storage Protocols:</strong> Unreconstituted lyophilized vials should be stored in the freezer (-20°C) away from light, where they remain stable for up to 24 months. Once reconstituted with bacteriostatic water, the peptide structure becomes far more fragile. The liquid solution must be stored in the refrigerator (2°C to 8°C) and should be used within 30 days. Discard any reconstituted solution that becomes cloudy or contains particulate matter, as this indicates peptide degradation or contamination.
          </p>
          <p>
            <em>Note on Sourcing:</em> For clinical accuracy, I exclusively utilize Amino Club for retatrutide (batch 2604-AC-RETA), as they provide quantitative purity testing alongside mass spectrometry. You can apply the <Link href="/peptidex-coupon" className="text-gold hover:underline font-bold">PEPTIDEX coupon code</Link> at checkout to reduce the research overhead.
          </p>
        </div>
      </section>

      {/* My N=1 Long-Form Protocol Log */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <UserIcon className="w-6 h-6 text-gold" />
          <h3 className="text-xl font-bold text-zinc-100">My N=1 Long-Form Protocol Log</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            While the Jastreboff NEJM data provides the clinical macro-view, the day-to-day reality of managing a retatrutide protocol requires significant nuance. This log details my personal, first-hand observations operating a 16-week titration protocol using research-grade retatrutide sourced directly from my verified vendor index.
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">Weeks 1-4: The 2mg Initiation</h4>
          <p>
            I initiated the protocol at exactly 2.0mg injected subcutaneously every 7 days. Unlike tirzepatide, where the appetite suppression often takes 24-48 hours to peak, the retatrutide effect was almost violently immediate. Within 12 hours of the first administration, food noise was entirely eradicated. I noted a distinct thermogenic effect—a slight but persistent elevation in resting body temperature, likely driven by the glucagon receptor agonism initiating hepatic lipid oxidation. 
          </p>
          <p>
            <em>Side Effects:</em> Mild nausea on Days 2 and 3 post-injection, manageable with ginger extract. Heart rate elevated by approximately 6-8 BPM resting, a known consequence of glucagon activity.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">Weeks 5-8: The 4mg Escalation</h4>
          <p>
            Upon stepping up to 4.0mg, the sheer potency of the tri-agonist became apparent. The primary challenge was not managing hunger, but forcing sufficient caloric intake to prevent severe muscle catabolism. I had to actively program high-protein meals (aiming for 1.2g per lb of LBM) and utilize liquid nutrition (whey isolates) because solid food was extremely unappealing. 
          </p>
          <p>
            <em>Observation:</em> Energy levels paradoxically increased during this phase despite the caloric deficit. I attribute this directly to the glucagon-driven release of free fatty acids providing a constant stream of energy, combined with the lack of glycemic crashes.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">Weeks 9-16: The 6mg Plateau and Maintenance</h4>
          <p>
            While the clinical trials escalate to 8mg and 12mg, I found the 6.0mg dose to be my personal maximum tolerable threshold. At 6mg, the rate of fat loss was averaging 2.2 lbs per week. Visceral fat, measured via bioimpedance scale, plummeted. However, the resting heart rate elevation became more pronounced (up 10-12 BPM from baseline), and sleep architecture was slightly disrupted.
          </p>
          <p>
            <em>Protocol Adjustment:</em> To mitigate the LBM loss risk, I integrated 1mg of Tesamorelin daily prior to fasted cardio during the final 4 weeks. This stack resulted in the most dramatic body recomposition I have recorded in my research logs to date. 
          </p>
          <p>
            <strong>Final Takeaway:</strong> Retatrutide is not a beginner's compound. It requires meticulous attention to hydration, electrolyte balance, and forced protein intake. It is a biological sledgehammer that dictates the body's energy expenditure, and respecting the titration schedule is non-negotiable. For sourcing, sticking to verified, COA-backed vendors is critical—an underdosed or overdosed vial of a tri-agonist introduces unacceptable variables into the research protocol.
          </p>
        </div>
      </section>

    </div>
  );
}
