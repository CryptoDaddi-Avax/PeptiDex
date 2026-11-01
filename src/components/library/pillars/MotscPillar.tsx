import React from 'react';
import Link from 'next/link';
import { Beaker, BookOpen, Syringe, GitCompare } from 'lucide-react';

export function MotscPillar() {
  return (
    <div className="pd-pillar-expansion mt-12 pt-12 border-t border-zinc-800/50">
      <div className="pd-section-header mb-8">
        <h2 className="text-2xl font-bold text-zinc-100 font-serif">Comprehensive Research Guide</h2>
        <p className="text-zinc-400 mt-2">A summary of the mitochondrial-derived mechanism, AMPK activation data, and storage notes for MOTS-c. Interventional evidence comes mainly from rodent and cell studies.</p>
      </div>

      {/* Deep Dive: Mechanism of Action */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Beaker className="w-6 h-6 text-violet-400" />
          <h3 className="text-xl font-bold text-zinc-100">Deep Dive: Mechanism of Action</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Unlike the vast majority of peptides, which are encoded by nuclear DNA, MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA-c) is a <strong>mitochondrial-derived peptide (MDP)</strong>, encoded within the mitochondrial genome itself. Its discovery paper described it as a regulator of insulin sensitivity and metabolic homeostasis acting via AMPK (PMID: 25738459).
          </p>
          <p>
            MOTS-c is often described as an <strong>exercise mimetic</strong> because, in cell and rodent studies, it activates AMPK (AMP-activated protein kinase). AMPK is the cell&apos;s main energy sensor: when cellular energy (ATP) is depleted, as during exercise, AMPK activation shifts the cell from energy-consuming toward energy-producing processes.
          </p>
          <p>
            In rodent studies, MOTS-c targeted skeletal muscle and increased glucose uptake and handling. Increased fatty acid oxidation and mitochondrial adaptations have also been proposed as downstream effects of AMPK activation, though these have been characterized mainly in preclinical models.
          </p>
          <p>
            Cell studies have also reported that MOTS-c can translocate from the mitochondria to the nucleus under metabolic stress and regulate nuclear gene expression (PMID: 29983246), which is why it is described as a retrograde (mitochondria-to-nucleus) signaling molecule.
          </p>
          <blockquote className="border-l-4 border-violet-500 pl-4 my-6 italic text-zinc-400 bg-zinc-900/30 p-4 rounded-r-lg">
            "MOTS-c targets skeletal muscle and its cellular actions inhibit the folate cycle and its tethered de novo purine biosynthesis, leading to AMPK activation... MOTS-c prevented age-dependent and high-fat-diet-induced insulin resistance..." (Lee et al., 2015, PMID: 25738459)
          </blockquote>
        </div>
      </section>

      {/* Research Data */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-zinc-100">Research Data: Metabolic and Exercise-Capacity Models</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Human data on MOTS-c are largely observational: circulating MOTS-c levels have been reported to be lower with aging, obesity, and type 2 diabetes. Interventional evidence comes mainly from rodent and cell models, summarized below.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Diet-Induced Obesity and Insulin Resistance in Mice</h4>
          <p>
            In mouse studies, MOTS-c treatment prevented both age-dependent and high-fat-diet-induced insulin resistance, as well as diet-induced obesity. The effect was traced to skeletal muscle, where MOTS-c increased glucose handling. Equivalent human trial data are not available.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Physical Capacity in Rodent Models</h4>
          <p>
            MOTS-c&apos;s skeletal-muscle effects resemble some metabolic responses to exercise, the basis for its &quot;exercise mimetic&quot; label. Rodent studies have also examined physical performance and metabolic flexibility (the ability to switch between carbohydrate and fat use) in young and older animals. Human performance data are not available.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Bone Metabolism (Cell and Animal Studies)</h4>
          <p>
            Early preclinical studies have examined MOTS-c in bone-cell models, including osteoblast differentiation and osteoclast signaling via the AMPK pathway. These findings are preliminary, and MOTS-c has not been studied as a treatment for osteoporosis in humans.
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
            MOTS-c is sometimes discussed alongside other compounds studied for mitochondrial and metabolic endpoints. We are not aware of a published controlled study evaluating MOTS-c in combination with other peptides.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-4">MOTS-c, BPC-157, and NAD+</h4>
          <p>
            <Link href="/library/bpc-157" className="text-gold hover:underline">BPC-157</Link> has been studied mainly in preclinical tissue-repair and vascular models, while NAD+ precursors are studied for cellular energy metabolism. Pairing them with MOTS-c rests on mechanistic reasoning only; the combination has not been tested in a published study.
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
            MOTS-c is a 16-amino acid mitochondrial-derived peptide supplied as a lyophilized powder. Like most research peptides, it is sensitive to heat and should be kept cold.
          </p>
          <p>
            <strong>Storage Protocols:</strong> Lyophilized MOTS-c should be stored at -20°C. Once reconstituted, store at 2°C to 8°C and use within 14 to 20 days.
          </p>
          <p>
            <em>Note on Sourcing:</em> High-purity MOTS-c can be difficult to synthesize, so batch-level HPLC/MS data matter. PeptiDex&apos;s reference sample (batch 2604-AC-MOTS) was sourced from <Link href="/vendors/amino-club" className="text-gold hover:underline">Amino Club</Link> for purity/cold-chain verification. The <Link href="/peptidex-coupon" className="text-gold hover:underline font-bold">PEPTIDEX coupon</Link> applies to their metabolic catalog.
          </p>
        </div>
      </section>

    </div>
  );
}
