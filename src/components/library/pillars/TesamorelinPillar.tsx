import React from 'react';
import Link from 'next/link';
import { Beaker, BookOpen, Syringe, GitCompare, User as UserIcon } from 'lucide-react';

export function TesamorelinPillar() {
  return (
    <div className="pd-pillar-expansion mt-12 pt-12 border-t border-zinc-800/50">
      <div className="pd-section-header mb-8">
        <h2 className="text-2xl font-bold text-zinc-100 font-serif">Comprehensive Research Guide</h2>
        <p className="text-zinc-400 mt-2">Deep dive into the molecular mechanics, FDA-approved clinical data, and specific protocol logs for tesamorelin.</p>
      </div>

      {/* Deep Dive: Mechanism of Action */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Beaker className="w-6 h-6 text-violet-400" />
          <h3 className="text-xl font-bold text-zinc-100">Deep Dive: Mechanism of Action</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Tesamorelin is a synthetic analogue of growth hormone-releasing hormone (GHRH). Structurally, it consists of the 44 amino acid sequence of human GHRH with the addition of a trans-3-hexenoic acid group at the N-terminus. This crucial modification shields the molecule from degradation by the dipeptidyl peptidase-4 (DPP-4) enzyme, drastically increasing its half-life and biological activity compared to endogenous GHRH or older peptides like Sermorelin.
          </p>
          <p>
            The primary function of tesamorelin is to bind and stimulate GHRH receptors situated in the anterior pituitary gland. Upon binding, it triggers the pulsatile release of endogenous human growth hormone (hGH). Unlike exogenous hGH administration—which floods the system, disrupts the natural pulsatile rhythm, and downregulates the pituitary's natural production via a negative feedback loop—tesamorelin preserves the physiological pulsatility of hGH release.
          </p>
          <p>
            The metabolic downstream effects of this elevated, pulsatile hGH release are profoundly lipolytic, specifically targeting visceral adipose tissue (VAT). Growth hormone induces lipolysis by increasing the activity of hormone-sensitive lipase and inhibiting lipoprotein lipase. Crucially, the lipolytic action of tesamorelin-induced hGH is directed primarily at visceral fat deposits rather than subcutaneous fat, likely due to a higher density of glucocorticoid receptors in visceral fat and the antagonistic relationship between hGH and cortisol action in adipocytes.
          </p>
          <p>
            Furthermore, the elevated hGH subsequently stimulates the liver to produce Insulin-like Growth Factor 1 (IGF-1), which mediates many of the anabolic and tissue-repairing effects associated with growth hormone, including skeletal muscle preservation and collagen synthesis.
          </p>
          <blockquote className="border-l-4 border-violet-500 pl-4 my-6 italic text-zinc-400 bg-zinc-900/30 p-4 rounded-r-lg">
            "Tesamorelin, a stabilized GHRH analogue, significantly reduces visceral adipose tissue without clinically significant alterations in glucose parameters..." (Falutz et al., 2010, PMID: 20682528)
          </blockquote>
        </div>
      </section>

      {/* Clinical Trial Data: Phase-by-Phase Breakdown */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-zinc-100">Clinical Trial Data: The SEROSTIM and Beyond</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Unlike many research peptides, Tesamorelin has achieved full FDA approval (under the brand name Egrifta) specifically for the reduction of excess abdominal fat in HIV-infected patients with lipodystrophy. The clinical data supporting this approval is robust and provides a clear window into its efficacy.
          </p>
          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Phase 3 Lipodystrophy Trials (Falutz et al.)</h4>
          <p>
            The foundational Phase 3 trials evaluated a 2mg daily subcutaneous dose of tesamorelin over 26 weeks, followed by a 26-week extension phase. The primary endpoint was the reduction in visceral adipose tissue (VAT), quantified via CT scanning.
          </p>
          <p>
            The results demonstrated highly specific, targeted fat loss:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4 text-zinc-300">
            <li><strong>VAT Reduction:</strong> Patients experienced a mean decrease in VAT of <strong>15.2% to 18%</strong> over 26 weeks.</li>
            <li><strong>Subcutaneous Fat Preservation:</strong> Notably, subcutaneous abdominal adipose tissue (SAT) remained relatively unchanged, highlighting tesamorelin's specificity for metabolically active, dangerous visceral fat.</li>
            <li><strong>IGF-1 Levels:</strong> Serum IGF-1 levels increased significantly, generally peaking within the upper quartile of the normal physiological range for the patients' age groups, without venturing into pathological acromegalic territory.</li>
          </ul>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">NAFLD/NASH Investigations (Lancet HIV, 2019)</h4>
          <p>
            More recently, the focus on tesamorelin has shifted toward its hepatic effects. A landmark study published in <em>The Lancet Gastroenterology & Hepatology</em> (PMID: 31607674) investigated its effects on non-alcoholic fatty liver disease (NAFLD) in patients with HIV.
          </p>
          <p>
            The trial found that tesamorelin administration significantly reduced hepatic lipid fraction (liver fat content) and prevented the progression of liver fibrosis compared to placebo. Given that visceral adiposity directly dumps free fatty acids into the portal vein leading to the liver, the reduction in VAT mechanistically drives the clearance of hepatic fat.
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
            Because tesamorelin specifically targets VAT and raises IGF-1 without directly suppressing appetite, it is often utilized as a specialized tool within broader peptide stacks, either to accelerate fat loss or protect muscle mass.
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-4">1. The Anti-Catabolic GLP-1 Stack: Tesamorelin + Retatrutide/Tirzepatide</h4>
          <p>
            The most prevalent use-case for tesamorelin in modern protocols is concurrent administration with high-potency incretin mimetics (like <Link href="/library/retatrutide" className="text-gold hover:underline">Retatrutide</Link> or <Link href="/library/tirzepatide" className="text-gold hover:underline">Tirzepatide</Link>). While incretins drive massive total-body weight loss through caloric deficit, they often result in significant Lean Body Mass (LBM) depletion. Stacking tesamorelin provides elevated IGF-1 levels, acting as a potent anti-catabolic shield to preserve skeletal muscle while simultaneously accelerating the targeted destruction of visceral fat.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-4">2. The GHRP Synergy Stack: Tesamorelin + Ipamorelin</h4>
          <p>
            While tesamorelin is a GHRH analogue, <Link href="/library/ipamorelin" className="text-gold hover:underline">Ipamorelin</Link> is a Growth Hormone Secretagogue Receptor (GHSR) agonist (a GHRP). Stacking a GHRH with a GHRP produces a synergistic, rather than additive, pulse of human growth hormone. The GHRP inhibits somatostatin (which normally blunts GH release) while the GHRH stimulates the release. This combination yields the maximum physiological pulse of endogenous hGH without resorting to exogenous hGH.
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
            Tesamorelin is notorious for being structurally delicate compared to other peptides. It is supplied as a lyophilized powder and requires extremely careful reconstitution. 
          </p>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl my-6">
            <h4 className="text-lg font-bold text-zinc-100 mb-4">Standard 2mg Vial Reconstitution (for 1mg daily doses)</h4>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li><strong>Peptide Mass:</strong> 2mg Tesamorelin</li>
              <li><strong>Diluent Volume:</strong> 1.0 mL Bacteriostatic Water</li>
              <li><strong>Resulting Concentration:</strong> 2mg per 1mL</li>
              <li><strong>Syringe Draw (for 1mg dose):</strong> 50 units (0.5mL) on a standard U-100 insulin syringe.</li>
            </ul>
          </div>
          <p>
            When injecting the bacteriostatic water, it is critical to aim the stream at the glass wall of the vial, not directly onto the powder, to prevent shearing the peptide bonds. Swirl gently; do not shake. 
          </p>
          <p>
            <strong>Storage Protocols:</strong> Lyophilized tesamorelin must be kept in the freezer (-20°C). Once reconstituted, the solution degrades rapidly and must be refrigerated (2°C to 8°C) and utilized within 14 days. If the solution becomes cloudy, it has denatured and must be discarded.
          </p>
          <p>
            <em>Note on Sourcing:</em> Given its fragility, sourcing tesamorelin from verified labs is essential. We use <Link href="/vendors/amino-club" className="text-gold hover:underline">Amino Club</Link> (batch 2604-AC-TESA) due to their rigorous cold-chain logistics and confirmed purity. Use the <Link href="/peptidex-coupon" className="text-gold hover:underline font-bold">PEPTIDEX coupon code</Link> for standard discounts.
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
            This log tracks an 8-week cycle utilizing a 1mg daily dose of tesamorelin, specifically administered for the reduction of stubbornly resistant visceral adipose tissue and overall metabolic optimization. 
          </p>
          
          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">Weeks 1-2: Adaptation and Immediate Effects</h4>
          <p>
            The protocol required a strict fasting window. Administration was performed sub-q at 10:00 PM, exactly two hours after my final carbohydrate intake, ensuring insulin levels were at baseline (insulin suppresses the hGH pulse). Within 15 minutes of administration, a localized flush and minor central nervous system stimulation was noted, typical of GHRH analogues. 
          </p>
          <p>
            <em>Observation:</em> Sleep architecture shifted dramatically. REM cycles became incredibly vivid, and morning recovery (measured via HRV) spiked by 12%. However, mild water retention in the extremities became apparent by Day 5.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">Weeks 3-6: The Lipolytic Window</h4>
          <p>
            By Week 3, the targeted lipolytic effects manifested. While total scale weight remained relatively static, physical measurements around the umbilicus dropped by 1.5 inches. The bioimpedance scale confirmed a shift from visceral to a lower total body fat percentage. The mild water retention subsided as the body adapted to the elevated IGF-1 levels. 
          </p>
          <p>
            <em>Side Effects:</em> Very mild paresthesia (tingling) in the hands upon waking, a hallmark sign of elevated growth hormone exerting pressure on the carpal tunnel via soft tissue expansion. It dissipated within 30 minutes of waking.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 border-b border-zinc-800 pb-2">Weeks 7-8: Protocol Conclusion and Assessment</h4>
          <p>
            The final two weeks solidified the aesthetic and metabolic changes. The 'hardening' effect on the musculature was pronounced, driven by the intra-muscular water retention and elevated IGF-1. 
          </p>
          <p>
            <strong>Final Takeaway:</strong> Tesamorelin performed exactly as the clinical literature suggested. It is not a broad-spectrum weight loss drug; it is a highly specialized tool for excavating visceral fat and raising systemic IGF-1 without shutting down the endogenous pituitary axis. Strict adherence to the fasting protocol around injection times is the absolute key to its efficacy.
          </p>
        </div>
      </section>

    </div>
  );
}
