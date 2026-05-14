import React from 'react';
import Link from 'next/link';
import { Beaker, BookOpen, Syringe, GitCompare, User as UserIcon } from 'lucide-react';

export function MotscPillar() {
  return (
    <div className="pd-pillar-expansion mt-12 pt-12 border-t border-zinc-800/50">
      <div className="pd-section-header mb-8">
        <h2 className="text-2xl font-bold text-zinc-100 font-serif">Comprehensive Research Guide</h2>
        <p className="text-zinc-400 mt-2">Deep dive into the mitochondrial-derived mechanisms, AMPK activation data, and specific protocol logs for MOTS-c.</p>
      </div>

      {/* Deep Dive: Mechanism of Action */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Beaker className="w-6 h-6 text-violet-400" />
          <h3 className="text-xl font-bold text-zinc-100">Deep Dive: Mechanism of Action</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Unlike the vast majority of peptides which are encoded by nuclear DNA, MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA-c) is a <strong>mitochondrial-derived peptide (MDP)</strong>. It is encoded deep within the mitochondrial genome itself. This fundamental difference classifies MOTS-c not merely as a signaling peptide, but as a direct mitochondrial regulator that governs cellular metabolic homeostasis.
          </p>
          <p>
            The primary biological role of MOTS-c is to serve as an <strong>exercise mimetic</strong> at the cellular level. Its central mechanism of action is the robust activation of AMPK (AMP-activated protein kinase). AMPK is the master energy sensor of the cell; when cellular energy (ATP) is depleted—such as during intense cardiovascular exercise—AMPK is activated to shift the cell from energy-consuming processes to energy-producing processes.
          </p>
          <p>
            By artificially agonizing AMPK, MOTS-c forces skeletal muscle cells to dramatically increase glucose uptake (independent of insulin) and upregulates fatty acid oxidation (beta-oxidation). It signals the cell that it is in a depleted state, prompting an increase in mitochondrial biogenesis—the creation of new, healthy mitochondria. 
          </p>
          <p>
            Furthermore, MOTS-c possesses the unique ability to translocate from the mitochondria into the nucleus under metabolic stress. Once in the nucleus, it binds directly to DNA, regulating the expression of antioxidant and stress-response genes, thereby acting as a retrograde signaling molecule that protects the cell against metabolic dysfunction.
          </p>
          <blockquote className="border-l-4 border-violet-500 pl-4 my-6 italic text-zinc-400 bg-zinc-900/30 p-4 rounded-r-lg">
            "MOTS-c targets skeletal muscle and its cellular actions inhibit the folate cycle and its tethered de novo purine biosynthesis, leading to AMPK activation... MOTS-c prevented age-dependent and high-fat-diet-induced insulin resistance..." (Lee et al., 2015, PMID: 25738459)
          </blockquote>
        </div>
      </section>

      {/* Clinical Trial Data: Phase-by-Phase Breakdown */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-zinc-100">Research Data: Metabolic Syndrome and Exercise Capacity</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            While human clinical trials are still in early phases (largely driven by CohBar, Inc. researching analogues like CB4211), the foundational in-vivo research on MOTS-c provides a compelling map of its metabolic capabilities, specifically regarding obesity, insulin resistance, and physical endurance.
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Reversal of Diet-Induced Obesity</h4>
          <p>
            The landmark 2015 study by Lee et al. published in <em>Cell Metabolism</em> demonstrated that systemic administration of MOTS-c in murine models completely prevented diet-induced obesity and insulin resistance, even when subjects were fed a high-fat diet. Crucially, MOTS-c administration reversed existing age-dependent insulin resistance. The mechanism was traced to the direct targeting of skeletal muscle, enhancing glucose clearance and driving fatty acid utilization.
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Enhancement of Physical Endurance</h4>
          <p>
            Research published in <em>Nature Communications</em> (PMID: 33473109) evaluated the effects of MOTS-c on physical capacity. The study found that MOTS-c administration significantly improved running capacity and endurance in both young and aged models. The peptide fundamentally altered skeletal muscle metabolism, promoting metabolic flexibility (the ability to efficiently switch between burning carbohydrates and fats). This solidifies its classification as a true exercise mimetic, enhancing the systemic response to metabolic stress.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Osteogenesis and Bone Density</h4>
          <p>
            Emerging research indicates that MOTS-c regulates bone metabolism. It has been shown to promote the differentiation of bone marrow stem cells into osteoblasts (bone-forming cells) while inhibiting osteoclastogenesis (bone resorption) via the AMPK pathway. This suggests significant therapeutic potential for osteoporosis and age-related bone density loss.
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
            Due to its unique mechanism targeting mitochondrial function and AMPK activation, MOTS-c stacks exceptionally well with peptides that drive lipolysis or require high cellular energy turnover.
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-4">1. The Extreme Metabolic Stack: MOTS-c + Retatrutide</h4>
          <p>
            When utilizing potent incretins like <Link href="/library/retatrutide" className="text-gold hover:underline">Retatrutide</Link>, the body is forced into profound lipolysis, flooding the bloodstream with free fatty acids. MOTS-c acts as the perfect downstream counterpart. By upregulating mitochondrial density and activating AMPK, MOTS-c ensures that the mitochondria have the capacity to actually <em>burn</em> (oxidize) these liberated fatty acids for energy, preventing them from recirculating or causing cellular stress.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-4">2. The Longevity & Repair Stack: MOTS-c + BPC-157 + NAD+</h4>
          <p>
            For protocols focused on cellular rejuvenation and mitochondrial repair, MOTS-c is frequently stacked with systemic <Link href="/library/bpc-157" className="text-gold hover:underline">BPC-157</Link> and NAD+ precursors. BPC-157 manages systemic inflammation and vascular repair, while MOTS-c and NAD+ synergistically restore mitochondrial respiratory capacity, reversing age-related mitochondrial dysfunction.
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
            MOTS-c is a 16-amino acid peptide that typically requires higher milligram dosing compared to signaling peptides, meaning vials run out quickly and reconstitution must account for larger fluid volumes.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl my-6">
            <h4 className="text-lg font-bold text-zinc-100 mb-4">Standard 10mg Vial Reconstitution (for 5mg protocol doses)</h4>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li><strong>Peptide Mass:</strong> 10mg MOTS-c</li>
              <li><strong>Diluent Volume:</strong> 2.0 mL Bacteriostatic Water</li>
              <li><strong>Resulting Concentration:</strong> 5mg per 1mL</li>
              <li><strong>Syringe Draw (for 5mg dose):</strong> 100 units (1.0mL) on a standard U-100 insulin syringe.</li>
            </ul>
          </div>
          <p>
            Because the typical dose of MOTS-c is between 5mg to 10mg administered acutely before exercise, researchers often inject a full 1mL or 2mL volume. It is highly recommended to split this volume into two separate subcutaneous injection sites (e.g., left and right abdomen) to prevent tissue distension and pooling.
          </p>
          <p>
            <strong>Storage Protocols:</strong> Lyophilized MOTS-c should be stored at -20°C. Once reconstituted, store at 2°C to 8°C and use within 14 to 20 days.
          </p>
          <p>
            <em>Note on Sourcing:</em> High-purity MOTS-c is difficult to synthesize due to its mitochondrial origins. I rely on <Link href="/vendors/amino-club" className="text-gold hover:underline">Amino Club</Link> (batch 2604-AC-MOTS) for verifiable purity and accurate mass via HPLC/MS testing. The <Link href="/peptidex-coupon" className="text-gold hover:underline font-bold">PEPTIDEX coupon</Link> applies to their metabolic catalog.
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
            This log tracks a 4-week intensive MOTS-c protocol designed specifically to assess its efficacy as a performance-enhancing exercise mimetic and metabolic accelerator during a caloric deficit.
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">The Protocol Design</h4>
          <p>
            The protocol consisted of 10mg of MOTS-c administered exactly 30 minutes prior to Zone 2 cardiovascular training, three times per week (M/W/F). Administration was performed sub-q, split into two 5mg (1.0mL) injections to avoid site irritation. The protocol was run in a fasted state to maximize AMPK activation.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">Weeks 1-2: The Thermogenic Shift</h4>
          <p>
            The immediate acute effect of a 10mg MOTS-c administration is a profound wave of thermogenesis. Roughly 20 minutes post-injection, core body temperature noticeably elevated, accompanied by mild flushing. Entering the cardiovascular session, perceived exertion (RPE) dropped dramatically. My heart rate stayed pinned precisely in the target Zone 2 bracket, but the muscular fatigue associated with fasted cardio was entirely absent.
          </p>
          <p>
            <em>Observation:</em> Post-exercise glucose readings plummeted faster than baseline, confirming the rapid, insulin-independent clearing of blood glucose into the skeletal muscle. 
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">Weeks 3-4: Endurance Ceiling Breakthrough</h4>
          <p>
            By the third week, the cumulative mitochondrial adaptations became evident. The total power output capable at the same heart rate threshold increased by roughly 15%. Furthermore, recovery between intense intervals (when testing VO2 max bursts) was cut in half. The mitochondria were simply processing oxygen and clearing lactate with superior efficiency.
          </p>
          <p>
            <em>Side Effects:</em> Very mild site irritation at the injection points due to the high volume of fluid (1mL per site). No systemic adverse effects noted. Sleep remained deep and uninterrupted, likely due to the massive energy expenditure during the day.
          </p>
          <p>
            <strong>Final Takeaway:</strong> MOTS-c is arguably the most potent non-hormonal endurance enhancer available. It fundamentally shifts how the body produces and utilizes ATP under stress. It is not a passive fat burner; its true value is unlocked when utilized precisely prior to cardiovascular or metabolic conditioning to hyper-charge the adaptive response.
          </p>
        </div>
      </section>

    </div>
  );
}
