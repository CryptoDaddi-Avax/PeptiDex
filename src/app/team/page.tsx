import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, AlertCircle } from 'lucide-react';
import { getAllAuthors } from '@/lib/authors';
import { MedicalDisclaimer } from '@/components/medical-disclaimer';

export const metadata: Metadata = {
  title: 'About the Researcher | PeptiDex',
  description:
    'PeptiDex is an independent, one-person research project — not a clinical service, not a medical authority, and not staffed by physicians. Here is who runs it and how.',
  alternates: { canonical: 'https://peptidex.app/team' },
  openGraph: {
    title: 'About the Researcher Behind PeptiDex',
    description: 'Independent, one-person peptide research project. Not medical advice.',
    url: 'https://peptidex.app/team',
    type: 'website',
  },
};

export default function TeamPage() {
  const [author] = getAllAuthors();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'About the Researcher', item: 'https://peptidex.app/team' },
    ],
  };

  const firstParagraph = author.bio.split('\n\n')[0];

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">About the Researcher</span>
      </nav>

      <header className="space-y-4">
        <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">§ About</p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          About the Researcher Behind PeptiDex
        </h1>
        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
          PeptiDex is a one-person, independent research project. There is no editorial board, no
          medical staff, and no clinical reviewers. This page is honest about that.
        </p>
      </header>

      <aside
        aria-label="Important notice"
        className="rounded-xl bg-amber-950/30 border border-amber-500/30 p-5 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-sm text-amber-100/90 leading-relaxed">
          <strong className="text-amber-300">The researcher behind PeptiDex is not a medical
          professional</strong> — not a doctor, pharmacist, nurse practitioner, or licensed
          clinician. Nothing on this site is medical advice. Decisions about peptides must be made
          with a licensed physician who knows your individual medical history.
        </div>
      </aside>

      <section className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-violet-500/30 flex-shrink-0 relative bg-zinc-800">
            {author.photo ? (
              <Image
                src={author.photo}
                alt={author.imageAlt}
                fill
                className="object-cover"
                sizes="112px"
                unoptimized
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-zinc-400">
                PR
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <h2 className="text-2xl font-bold text-zinc-100">{author.name}</h2>
            <p className="text-sm text-violet-400 font-medium">{author.title}</p>
            <p className="text-sm text-zinc-300 leading-relaxed pt-2">{firstParagraph}</p>
            <div className="pt-3">
              <Link
                href={`/team/${author.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300"
              >
                Read full bio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100">How content is made</h2>
        <div className="space-y-3 text-sm md:text-[15px] text-zinc-300 leading-relaxed">
          <p>
            Every peptide profile, stack page, and article on PeptiDex starts with a literature
            review against peer-reviewed primary sources — PubMed, ClinicalTrials.gov, FDA filings,
            and the like. Each citation links directly to its source so you can verify the claim
            yourself. Evidence is tagged transparently as clinical trial, animal study, in-vitro,
            case report, or review.
          </p>
          <p>
            Because this is a one-person project, there is no second pair of expert eyes on each
            page. The mitigations: rigorous primary-source citation, explicit evidence grading, a
            public {' '}
            <Link href="/corrections" className="text-violet-400 underline hover:text-violet-300">corrections log</Link>{' '}
            for errors, and a six-month re-review cycle on every published page. Read the full {' '}
            <Link href="/editorial-process" className="text-violet-400 underline hover:text-violet-300">editorial process</Link>{' '}
            for details.
          </p>
          <p>
            If you spot an error, please report it — corrections are logged publicly with the
            original statement and the corrected version, never silently overwritten.
          </p>
        </div>
      </section>

      <MedicalDisclaimer variant="callout" />
    </main>
  );
}
