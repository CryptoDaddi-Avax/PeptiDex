import React from 'react';
import Link from 'next/link';
import { Beaker, BookOpen, Syringe, GitCompare } from 'lucide-react';

export function TesamorelinPillar() {
  return (
    <div className="pd-pillar-expansion mt-12 pt-12 border-t border-zinc-800/50">
      <div className="pd-section-header mb-8">
        <h2 className="text-2xl font-bold text-zinc-100 font-serif">Comprehensive Research Guide</h2>
        <p className="text-zinc-400 mt-2">A summary of the molecular mechanism, the clinical trial data behind its FDA approval, and storage notes for tesamorelin.</p>
      </div>

      {/* Deep Dive: Mechanism of Action */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Beaker className="w-6 h-6 text-violet-400" />
          <h3 className="text-xl font-bold text-zinc-100">Deep Dive: Mechanism of Action</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Tesamorelin is a synthetic analogue of growth hormone-releasing hormone (GHRH). Structurally, it consists of the 44 amino acid sequence of human GHRH with the addition of a trans-3-hexenoic acid group at the N-terminus. This modification protects the molecule from degradation by the dipeptidyl peptidase-4 (DPP-4) enzyme, increasing its stability and activity compared to endogenous GHRH or older analogues like Sermorelin.
          </p>
          <p>
            Tesamorelin binds GHRH receptors in the anterior pituitary gland, stimulating the release of endogenous growth hormone (GH). Because it acts through the pituitary, it is described as preserving the pulsatile pattern of GH release, in contrast to direct administration of exogenous GH, which bypasses the pituitary and its feedback regulation.
          </p>
          <p>
            In clinical trials, the main downstream endpoint has been visceral adipose tissue (VAT). GH promotes lipolysis, and in the Phase 3 trials tesamorelin reduced VAT relative to placebo (PMID: 20554713). Why the effect concentrates in visceral rather than subcutaneous fat is not fully established.
          </p>
          <p>
            Elevated GH also stimulates the liver to produce Insulin-like Growth Factor 1 (IGF-1). In a Phase 3 trial, IGF-1 levels rose substantially with tesamorelin.
          </p>
          <blockquote className="border-l-4 border-violet-500 pl-4 my-6 italic text-zinc-400 bg-zinc-900/30 p-4 rounded-r-lg">
            In the pooled analysis of the two Phase 3 trials, tesamorelin was reported as overall well tolerated, without clinically meaningful changes in glucose parameters (Falutz et al., 2010, PMID: 20554713).
          </blockquote>
        </div>
      </section>

      {/* Clinical Trial Data */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-zinc-100">Clinical Trial Data: Egrifta Phase 3 and Beyond</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Unlike most research peptides, tesamorelin is FDA-approved (as Egrifta) for the reduction of excess abdominal fat in HIV-infected patients with lipodystrophy. It is not approved for general weight loss or other uses. The trials behind that approval are the strongest human evidence for any compound covered in this guide.
          </p>
          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Phase 3 Lipodystrophy Trials (Falutz et al.)</h4>
          <p>
            The Phase 3 trials evaluated tesamorelin over 26 weeks, followed by a 26-week extension phase. The primary endpoint was the change in visceral adipose tissue (VAT), measured by CT scanning.
          </p>
          <p>
            Reported results:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4 text-zinc-300">
            <li><strong>VAT:</strong> in a pooled analysis of two Phase 3 trials, visceral adipose tissue decreased significantly with tesamorelin versus placebo, while abdominal subcutaneous fat was preserved (PMID: 20554713). The same report included 52-week extension data in which the reduction was maintained with continued treatment (PMID: 20554713).</li>
            <li><strong>Subcutaneous fat:</strong> subcutaneous abdominal adipose tissue (SAT) remained relatively unchanged, consistent with a selective effect on visceral fat.</li>
            <li><strong>IGF-1:</strong> serum IGF-1 levels increased significantly.</li>
          </ul>
          <p>
            In these trials the effect was specific to visceral fat rather than overall body weight. Tesamorelin was studied, and is approved, for HIV-associated abdominal fat accumulation; it has not been evaluated as a general weight-loss treatment.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Liver Fat Studies in HIV</h4>
          <p>
            Later research has examined tesamorelin&apos;s hepatic effects. A randomized controlled trial in HIV-infected patients with abdominal fat accumulation reported reduced hepatic fat content with tesamorelin (PMID: 25038357), and a follow-up analysis examined hepatic transcriptomic signatures in HIV-associated NAFLD (PMID: 32701508).
          </p>
          <p>
            These studies were conducted in people with HIV. Tesamorelin is not FDA-approved for fatty liver disease.
          </p>
        </div>
      </section>

      {/* Combination Research */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <GitCompare className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-zinc-100">Combination Research: What Has and Hasn&apos;t Been Studied</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Tesamorelin&apos;s clinical evidence comes from monotherapy trials. We are not aware of published controlled trials evaluating it in combination with other GH secretagogues.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-4">Tesamorelin + Ipamorelin (Mechanistic Rationale Only)</h4>
          <p>
            Tesamorelin is a GHRH analogue, while <Link href="/library/ipamorelin" className="text-gold hover:underline">Ipamorelin</Link> is a Growth Hormone Secretagogue Receptor (GHSR) agonist (a GHRP). In GH physiology research, GHRH and GHS-receptor agonists act through different pathways, and GHS-receptor agonists also counteract the inhibitory tone of somatostatin, which is why the pairing is discussed. The effects of this specific combination have not been characterized in a published trial.
          </p>
        </div>
      </section>

      {/* Storage & Handling */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Syringe className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-zinc-100">Storage &amp; Handling</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Tesamorelin is notorious for being structurally delicate compared to other peptides. It is supplied as a lyophilized powder and is sensitive to temperature and agitation.
          </p>
          <p>
            <strong>Storage Protocols:</strong> Lyophilized tesamorelin must be kept in the freezer (-20°C). Once reconstituted, the solution degrades rapidly and must be refrigerated (2°C to 8°C) and utilized within 14 days. If the solution becomes cloudy, it has denatured and must be discarded.
          </p>
          <p>
            <em>Note on Sourcing:</em> Given its fragility, cold-chain handling and verified purity data matter for tesamorelin. PeptiDex&apos;s reference sample (batch 2604-AC-TESA) was sourced from <Link href="/vendors/amino-club" className="text-gold hover:underline">Amino Club</Link> for purity/cold-chain verification. Use the <Link href="/peptidex-coupon" className="text-gold hover:underline font-bold">PEPTIDEX coupon code</Link> for standard discounts.
          </p>
        </div>
      </section>

    </div>
  );
}
