import React from 'react';
import Link from 'next/link';
import { Beaker, BookOpen, Syringe, GitCompare } from 'lucide-react';

export function Bpc157Pillar() {
  return (
    <div className="pd-pillar-expansion mt-12 pt-12 border-t border-zinc-800/50">
      <div className="pd-section-header mb-8">
        <h2 className="text-2xl font-bold text-zinc-100 font-serif">Comprehensive Research Guide</h2>
        <p className="text-zinc-400 mt-2">A summary of the proposed mechanisms, the preclinical tissue-repair and gastrointestinal research, and storage notes for BPC-157. Most of the evidence below comes from animal and cell studies.</p>
      </div>

      {/* Deep Dive: Mechanism of Action */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Beaker className="w-6 h-6 text-violet-400" />
          <h3 className="text-xl font-bold text-zinc-100">Deep Dive: Mechanism of Action</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide (15 amino acids) based on a sequence from a protein found in human gastric juice. The literature describes it as a gastric peptide studied in the context of the stomach&apos;s mucosal-protective environment (PMID: 27138887).
          </p>
          <p>
            The mechanism most often proposed for BPC-157&apos;s effects in preclinical tendon, ligament, muscle, bone, and gastrointestinal models is <strong>angiogenic</strong> signaling. In rodent and cell studies, BPC-157 has been reported to activate the VEGFR2-Akt-eNOS pathway and promote new blood-vessel formation.
          </p>
          <p>
            Tendons and ligaments are poorly vascularized, which is one reason researchers have examined whether increased angiogenesis could support repair in these tissues. Whether these animal findings translate to humans has not been established in controlled trials.
          </p>
          <p>
            In tendon explant and fibroblast studies, BPC-157 has been reported to enhance tendon fibroblast outgrowth and survival via FAK-paxillin signaling (PMID: 21030672). Other preclinical work has examined its interaction with dopaminergic and serotonergic signaling, its effects in neurological injury models, and its effects in gastric and intestinal lesion models (PMID: 22300085).
          </p>
        </div>
      </section>

      {/* Research Data */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-zinc-100">Research Data: Tissue Repair and Cytoprotection Models</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            Most of the evidence on BPC-157 comes from animal models, chiefly rats. A recent clinical primer for orthopaedic and sports medicine physicians notes that the evidence is overwhelmingly preclinical, with a significant lack of human clinical evidence (PMID: 41476424).
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Tendon and Ligament Models</h4>
          <p>
            The most cited studies of BPC-157 use rat models of Achilles tendon transection and ligament injury. In these models, BPC-157-treated animals showed faster healing measures than controls, including increased tendon fibroblast outgrowth (PMID: 21030672) and improved ligament healing (PMID: 20225319). A review summarizes tendon, ligament, and gut findings across preclinical models. These are animal results and have not been confirmed in human trials.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Gastrointestinal Lesion Models</h4>
          <p>
            As a gastric-derived peptide, BPC-157 has been studied in rat models of gastrointestinal injury, including ulcers, fistulas, and inflammatory bowel lesions (PMID: 22300085). Proposed mechanisms include preservation of mucosal blood vessels and reduced inflammatory signaling. BPC-157 has not been evaluated as a treatment for inflammatory bowel disease in human trials.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-2">Central Nervous System Models</h4>
          <p>
            Rodent studies have examined BPC-157 in stroke and spinal cord injury models. Other preclinical work has looked at dopaminergic signaling and behavioral models. These findings are preliminary and limited to animals.
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
            BPC-157 is frequently discussed alongside other peptides studied in tissue-repair models. We are not aware of a published controlled study evaluating these combinations, so the rationale below is mechanistic only.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-4">1. BPC-157 + TB-500</h4>
          <p>
            BPC-157 has been studied mainly for angiogenic signaling and tendon fibroblast activity (PMID: 21030672), while <Link href="/library/tb-500" className="text-gold hover:underline">TB-500</Link> (a Thymosin Beta-4 fragment) is studied for actin regulation and cell migration. The two mechanisms are distinct, which is why they are often discussed together; whether they interact in vivo has not been tested in a published trial.
          </p>

          <h4 className="text-lg font-bold text-zinc-200 mt-4">2. BPC-157 + KPV in Gut-Inflammation Models</h4>
          <p>
            BPC-157 has been studied in rodent gastrointestinal lesion models (PMID: 22300085), and KPV, a tripeptide fragment of alpha-MSH, has been studied separately for anti-inflammatory signaling in preclinical intestinal models. The two have not been studied together, and neither has been evaluated as a treatment for Crohn&apos;s disease or ulcerative colitis in human trials.
          </p>
        </div>
      </section>

      {/* Administration in Studies & Storage */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Syringe className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-zinc-100">Administration in Studies &amp; Storage</h3>
        </div>
        <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4">
          <p>
            BPC-157 is relatively stable compared to larger peptides (like GH or Tesamorelin), which simplifies storage and transport.
          </p>
          <p>
            <strong>Systemic vs. Local Administration:</strong> Preclinical studies have compared systemic and local administration in rodent injury models; see cited studies.
          </p>
          <p>
            <strong>Storage:</strong> Lyophilized BPC-157 is stable at room temperature for weeks but should be kept frozen (-20°C) for long-term storage, in a sealed vial protected from light.
          </p>
          <p>
            <em>Note on Sourcing:</em> PeptiDex&apos;s reference sample (batch 2604-AC-BPC) was sourced from <Link href="/vendors/amino-club" className="text-gold hover:underline">Amino Club</Link> for purity/cold-chain verification. Because BPC-157 is frequently counterfeited, third-party mass spectrometry data is the key item to check on any vendor&apos;s COA. The <Link href="/peptidex-coupon" className="text-gold hover:underline font-bold">PEPTIDEX coupon</Link> applies at checkout.
          </p>
        </div>
      </section>

    </div>
  );
}
