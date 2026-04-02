import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PeptiDex Editorial Policy | Content Standards & Citation Requirements',
  description: 'PeptiDex editorial policy detailing our content standards, PubMed citation requirements, update frequency, and corrections process for peptide research content.',
  alternates: {
    canonical: 'https://peptidex.app/about/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://peptidex.app/about' },
      { '@type': 'ListItem', position: 3, name: 'Editorial Policy', item: 'https://peptidex.app/about/editorial-policy' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/about" className="hover:text-zinc-300 transition-colors">About</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">Editorial Policy</span>
      </nav>

      {/* Header */}
      <header className="space-y-4">
        <Link href="/about" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to About
        </Link>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          PeptiDex Editorial Policy
        </h1>
        <p className="text-sm text-zinc-500">Last updated: April 1, 2026</p>
      </header>

      {/* Content Standards */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-3">1. Content Standards</h2>
        <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
          <p>
            All content published on PeptiDex adheres to the following non-negotiable standards:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Evidence-Based Only:</strong> Every factual claim regarding peptide mechanisms, efficacy, or safety must be supported by at least one peer-reviewed study from an indexed journal.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Preclinical Framing:</strong> We explicitly identify the research context (in-vitro, animal model, or human trial) for all data presented. Extrapolation from animal data to human outcomes is clearly flagged.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">No Medical Claims:</strong> PeptiDex never states or implies that any research peptide can diagnose, treat, cure, or prevent any medical condition.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Balanced Reporting:</strong> Both benefits and risks/side effects are documented for every compound. We do not suppress negative findings.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Citation Requirements */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-3">2. Citation Requirements</h2>
        <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
          <p>
            PeptiDex maintains strict citation sourcing requirements for all published content:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Primary Sources:</strong> PubMed, ClinicalTrials.gov, and Google Scholar-indexed publications are the only acceptable primary sources for mechanistic and efficacy claims.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Recency:</strong> Studies published within the last 10 years are prioritized. Older seminal studies are included when they remain the foundational reference for a specific mechanism.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Direct Links:</strong> Every peptide profile includes direct PubMed URLs for each cited study, enabling researchers to independently verify all claims.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Evidence Grading:</strong> Each study is tagged with an evidence level (Clinical Trial, Animal Study, In-Vitro, or Review/Meta-Analysis) to help researchers assess the weight of the data.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Update Frequency */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-3">3. Update Frequency</h2>
        <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
          <p>
            PeptiDex content is maintained on a rolling review cycle:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Quarterly Reviews:</strong> All peptide profiles are reviewed every 90 days for new publications, updated dosing data, and regulatory changes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Breaking Research:</strong> Landmark studies or significant regulatory changes (e.g., FDA scheduling decisions) trigger immediate content updates outside the regular cycle.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Date Stamps:</strong> Every page displays a &quot;Last Updated&quot; date so researchers can assess content freshness at a glance.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Corrections Policy */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-3">4. Corrections Policy</h2>
        <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
          <p>
            Accuracy is paramount. When errors are identified:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Factual Errors:</strong> Corrections are applied within 48 hours of identification. The correction is noted at the bottom of the affected page with the original claim and the corrected information.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Retracted Studies:</strong> If a cited study is retracted from its journal, the reference is immediately removed and the affected content is revised to reflect the remaining evidence base.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
              <span><strong className="text-zinc-100">Community Reports:</strong> Researchers can report inaccuracies or outdated information by contacting our editorial team. All reports are investigated and resolved within one business week.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Back to About */}
      <div className="pt-8 border-t border-zinc-800">
        <Link href="/about" className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to About PeptiDex
        </Link>
      </div>
    </div>
  );
}
