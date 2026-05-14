import React from 'react';
import Link from 'next/link';
import { Beaker, BookOpen, Syringe, GitCompare, User as UserIcon } from 'lucide-react';

export function TirzepatidePillar() {
  return (
    <div className="pd-pillar-expansion mt-12 pt-12 border-t border-zinc-800/50">
      <div className="pd-section-header mb-8">
        <h2 className="text-2xl font-bold text-zinc-100 font-serif">Comprehensive Research Guide</h2>
        <p className="text-zinc-400 mt-2">Deep dive into the dual-agonism mechanics, SURMOUNT clinical trial data, and protocol logs for tirzepatide.</p>
      </div>

      {/* Deep Dive: Mechanism of Action */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Beaker className="w-6 h-6 text-violet-400" />
          <h3 className="text-xl font-bold text-zinc-100">Deep Dive: Mechanism of Action</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Tirzepatide (LY3298176), developed by Eli Lilly and marketed under the brand names Mounjaro and Zepbound, represents the first-in-class <strong>dual GIP and GLP-1 receptor agonist</strong> (a "twincretin"). Its creation marked a monumental leap over first-generation GLP-1 agonists like semaglutide by addressing multiple pathways of metabolic dysfunction simultaneously.
          </p>
          <p>
            Structurally, tirzepatide is a 39-amino-acid synthetic peptide based on the native GIP sequence. It is heavily modified: it includes a C20 fatty diacid moiety attached via a hydrophilic linker. This lipid tail binds tightly to serum albumin, shielding the peptide from renal clearance and degradation by DPP-4, resulting in a half-life of approximately 5 days and enabling once-weekly dosing. 
          </p>
          <p>
            The mechanism of action relies on an imbalanced dual-agonism. Tirzepatide is heavily biased toward the GIP receptor (binding with an affinity similar to native GIP) while acting as a biased, weaker agonist at the GLP-1 receptor. This specific tuning is brilliant by design. 
          </p>
          <p>
            The GLP-1 component handles the heavy lifting of appetite suppression via the hypothalamus and delays gastric emptying, leading to profound early satiety. The GIP component acts synergistically to amplify insulin secretion in a glucose-dependent manner, aggressively clearing glucose from the blood. However, the most critical role of the GIP agonism is its effect on adipose tissue. GIP increases lipid buffering capacity and improves white adipose tissue (WAT) blood flow, fundamentally changing how the body stores and utilizes fat, while notably mitigating the intense nausea commonly associated with pure GLP-1 agonism.
          </p>
          <blockquote className="border-l-4 border-violet-500 pl-4 my-6 italic text-zinc-400 bg-zinc-900/30 p-4 rounded-r-lg">
            "Tirzepatide is a novel, investigational, once-weekly, dual GIP and GLP-1 receptor agonist that integrates the actions of both incretins into a single novel molecule..." (Frias et al., 2018, PMID: 30293770)
          </blockquote>
        </div>
      </section>

      {/* Clinical Trial Data: Phase-by-Phase Breakdown */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-zinc-100">Clinical Trial Data: The SURMOUNT Program</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            The clinical efficacy of tirzepatide is backed by the colossal SURMOUNT phase 3 clinical trial program. This program has systematically dismantled previous benchmarks for pharmacological weight loss and glycemic control.
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">SURMOUNT-1: Obesity Outcomes (NEJM, 2022)</h4>
          <p>
            Published in <em>The New England Journal of Medicine</em> (PMID: 35658024), this trial enrolled 2,539 adults with obesity or overweight with weight-related complications (excluding diabetes). Subjects were administered either 5mg, 10mg, or 15mg of tirzepatide over 72 weeks.
          </p>
          <p>
            The mean percentage weight reductions were paradigm-shifting:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4 text-zinc-300">
            <li><strong>5mg cohort:</strong> -15.0%</li>
            <li><strong>10mg cohort:</strong> -19.5%</li>
            <li><strong>15mg cohort:</strong> <strong className="text-emerald-400">-20.9%</strong> (with many individuals exceeding 25% weight loss)</li>
            <li><strong>Placebo:</strong> -3.1%</li>
          </ul>
          <p>
            At the 15mg dose, an astounding 50% of participants achieved ≥20% body weight loss, a threshold previously strictly reserved for bariatric surgery. Furthermore, cardiometabolic risk factors—including blood pressure, triglycerides, and fasting insulin—plummeted across all dosage groups.
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">SURMOUNT-4: The Rebound Effect (JAMA, 2023)</h4>
          <p>
            The SURMOUNT-4 trial addressed a critical question: what happens when treatment stops? Participants underwent a 36-week open-label lead-in with tirzepatide (achieving a mean 20.9% weight reduction). They were then randomized to either continue tirzepatide or switch to placebo for an additional 52 weeks.
          </p>
          <p>
            Those who continued tirzepatide lost an additional 5.5% of their body weight. Those switched to placebo <strong>regained 14% of their body weight</strong>. This definitively proved that obesity is a chronic, relapsing metabolic disease, and that tirzepatide acts as a treatment that manages the pathology rather than curing it. Long-term maintenance dosing is a biological requirement for sustained results.
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
            Because tirzepatide induces a severe, prolonged caloric deficit, stacking protocols are almost exclusively designed to preserve Lean Body Mass (LBM) and prevent metabolic down-regulation during rapid weight loss.
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-4">1. The Hypertrophy/Preservation Stack: Tirzepatide + Ipamorelin/CJC-1295</h4>
          <p>
            Losing 20% of your body weight often results in a 25-30% loss of muscle mass alongside the fat. Stacking a GHRP/GHRH combo like <Link href="/library/ipamorelin" className="text-gold hover:underline">Ipamorelin</Link> and CJC-1295 forces the pulsatile release of endogenous growth hormone. This provides a potent anti-catabolic shield, keeping the body in a positive nitrogen balance despite the massive caloric restriction imposed by the tirzepatide, ensuring the weight lost is almost exclusively adipose tissue.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-4">2. The Metabolic Amplifier Stack: Tirzepatide + AOD-9604</h4>
          <p>
            For subjects stalling on lower doses of tirzepatide who wish to avoid the GI side effects of stepping up to the 10mg or 15mg doses, stacking AOD-9604 (a lipolytic fragment of hGH) provides a non-incretin pathway to accelerate fat burning. AOD-9604 directly upregulates beta-3 adrenergic receptors on fat cells, augmenting the fat-mobilizing effects of the GIP receptor without increasing systemic nausea.
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
            Tirzepatide requires highly accurate dosing due to the severe gastrointestinal consequences of accidental over-administration. It is sourced as a lyophilized powder and reconstituted with bacteriostatic water.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl my-6">
            <h4 className="text-lg font-bold text-zinc-100 mb-4">Standard 10mg Vial Reconstitution (for 2.5mg starting doses)</h4>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li><strong>Peptide Mass:</strong> 10mg Tirzepatide</li>
              <li><strong>Diluent Volume:</strong> 2.0 mL Bacteriostatic Water</li>
              <li><strong>Resulting Concentration:</strong> 5mg per 1mL (or 2.5mg per 0.5mL)</li>
              <li><strong>Syringe Draw (for 2.5mg dose):</strong> 50 units (0.5mL) on a standard U-100 insulin syringe.</li>
            </ul>
          </div>
          <p>
            <strong>Titration Schedule:</strong> The clinical protocol is rigid: begin at 2.5mg weekly for 4 weeks. After 4 weeks, step up to 5.0mg weekly. Do not escalate doses faster than the 4-week window. The peptide has a 5-day half-life; the serum concentration builds sequentially with each weekly injection, meaning the drug is actively compounding in your system during the first month.
          </p>
          <p>
            <strong>Storage Protocols:</strong> Unreconstituted vials must be kept frozen (-20°C). Once reconstituted, the liquid must be refrigerated (2°C to 8°C) and used within 30 days. Tirzepatide is sensitive to light and agitation—store in a dark box and roll the vial gently to mix; never shake.
          </p>
          <p>
            <em>Note on Sourcing:</em> Given the massive commercial demand, tirzepatide is frequently under-dosed by low-tier suppliers. I mandate the use of <Link href="/vendors/amino-club" className="text-gold hover:underline">Amino Club</Link> (batch 2604-AC-TIRZ) or Ascension for verifiable HPLC/MS purity testing. The <Link href="/peptidex-coupon" className="text-gold hover:underline font-bold">PEPTIDEX coupon</Link> applies.
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
            This log tracks a 12-week protocol utilizing tirzepatide specifically for aggressive body recomposition and resolving minor insulin resistance, stepping through the 2.5mg, 5.0mg, and 7.5mg dosages.
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">Weeks 1-4: The 2.5mg Loading Phase</h4>
          <p>
            Administered 2.5mg sub-q into the abdomen every Sunday morning. Within 24 hours of the first injection, the 'food noise'—the constant subconscious desire to snack or eat—was entirely silenced. The GIP agonism was evident: unlike pure GLP-1s, I experienced almost zero nausea, just a profound sense of fullness after consuming half a normal meal portion.
          </p>
          <p>
            <em>Observation:</em> Fasting blood glucose dropped from a baseline of 94 mg/dL to 81 mg/dL by the end of Week 2. Lost 7 lbs of mostly glycogen and systemic water weight.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">Weeks 5-8: The 5.0mg Therapeutic Threshold</h4>
          <p>
            Stepping up to 5.0mg marked the beginning of true, rapid lipolysis. The delayed gastric emptying became very noticeable. Eating large, heavy meals (especially high-fat or high-fiber) resulted in severe dyspepsia and bloating. I shifted entirely to 5-6 small, protein-dense meals.
          </p>
          <p>
            <em>Side Effects:</em> Mild fatigue on Day 2 post-injection, likely a result of the extreme caloric deficit rather than the peptide itself. Implemented daily electrolyte supplementation (sodium, potassium, magnesium) which completely resolved the lethargy. Total weight loss hit 16 lbs.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">Weeks 9-12: The 7.5mg Aggression and Recomp</h4>
          <p>
            At 7.5mg, the appetite suppression was so severe that hitting my basal metabolic rate (BMR) calorie target became a chore. I integrated 300mcg of Ipamorelin nightly to preserve muscle mass. This stack was incredibly effective. The tirzepatide stripped the visceral fat, while the Ipamorelin maintained muscle fullness and strength in the gym despite the deficit.
          </p>
          <p>
            <strong>Final Takeaway:</strong> Tirzepatide is a vastly superior compound to semaglutide in terms of side-effect profile (due to the GIP agonism mitigating nausea) and sheer weight loss power. However, it will strip muscle mass aggressively if you do not force-feed protein and continue resistance training. It is the ultimate metabolic reset button, but requires disciplined nutritional management.
          </p>
        </div>
      </section>

    </div>
  );
}
