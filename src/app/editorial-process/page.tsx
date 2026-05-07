import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  AlertCircle,
  RefreshCw,
  Scale,
  ChevronRight,
  ScrollText,
} from 'lucide-react';
import { MedicalDisclaimer } from '@/components/medical-disclaimer';

export const metadata: Metadata = {
  title: 'Editorial Process | How PeptiDex Researches and Cites Content',
  description:
    'PeptiDex is a one-person independent research project. This page explains how content is researched, cited, and corrected — and what the limitations of that model are.',
  alternates: { canonical: 'https://peptidex.app/editorial-process' },
  openGraph: {
    title: 'PeptiDex Editorial Process',
    description: 'How a one-person, independent research project handles citations, updates, and corrections.',
    url: 'https://peptidex.app/editorial-process',
    type: 'article',
  },
};

export default function EditorialProcessPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Editorial Process',
        item: 'https://peptidex.app/editorial-process',
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'PeptiDex Editorial Process',
    description: 'How a one-person, independent research project handles citations, updates, and corrections.',
    url: 'https://peptidex.app/editorial-process',
    publisher: {
      '@type': 'Organization',
      name: 'PeptiDex',
      logo: { '@type': 'ImageObject', url: 'https://peptidex.app/logo.png' },
    },
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">Editorial Process</span>
      </nav>

      <header className="space-y-4">
        <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">§ Editorial Process</p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          How PeptiDex Researches and Cites Content
        </h1>
        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
          PeptiDex is a one-person, independent research project. There is no editorial board and
          no medical reviewer. This page is honest about how the work gets done, what corners that
          cuts compared to a clinical-team operation, and the mitigations in place to keep the
          content accurate and useful anyway.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/team" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600/15 border border-violet-500/30 text-violet-300 hover:bg-violet-600/25 transition-colors">
            About the researcher <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/corrections" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/60 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">
            Corrections log
          </Link>
        </div>
      </header>

      <aside
        aria-label="Important limitation"
        className="rounded-xl bg-amber-950/30 border border-amber-500/30 p-5 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-sm text-amber-100/90 leading-relaxed">
          <strong className="text-amber-300">No medical review.</strong> PeptiDex content is not
          reviewed by a licensed clinician before publication. The researcher behind the site is
          not a medical professional. Treat everything here as a research aggregator and
          educational reference, not as a clinical resource — and verify everything important
          with a physician.
        </div>
      </aside>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold text-zinc-100">
          <BookOpen className="w-6 h-6 text-violet-400" /> 1. How Content Is Researched
        </h2>
        <div className="space-y-3 text-sm md:text-[15px] text-zinc-300 leading-relaxed">
          <p>
            Every peptide profile, stack page, and long-form article begins with a literature
            review against peer-reviewed primary sources. Mechanism statements, dosing references,
            half-life values, side-effect incidences, and clinical-trial outcomes are traceable to
            indexed publications — never to forum posts, vendor marketing pages, or AI-generated
            summaries.
          </p>
          <p>
            <strong className="text-zinc-100">Acceptable primary sources</strong> include
            PubMed/MEDLINE-indexed journals, ClinicalTrials.gov registry entries, FDA drug-approval
            documents, EMA assessment reports, and the Cochrane Database of Systematic Reviews.
            Studies whose methodology or sample size cannot be evaluated, or that are published in
            non-indexed venues, are not used as primary support for factual claims.
          </p>
          <p>
            <strong className="text-zinc-100">Recency.</strong> Where two sources contradict, the
            more recent peer-reviewed publication is given more weight, with systematic reviews
            and meta-analyses preferred over individual trials. Studies older than ten years are
            cited only when they remain the foundational reference for a given mechanism, or are
            still the largest available trial in their domain.
          </p>
          <p>
            <strong className="text-zinc-100">Evidence grading.</strong> Each cited study is
            tagged with a transparent evidence level — Clinical Trial, Animal Study, In-Vitro,
            Case Report, or Review/Meta-Analysis — so a reader can see at a glance whether a
            claim is supported by human data or extrapolated from preclinical work.
            Extrapolations from animal data to human outcomes are explicitly flagged.
          </p>
          <p>
            <strong className="text-zinc-100">Direct linking.</strong> Every cited study includes
            a direct PubMed, ClinicalTrials.gov, or DOI link. If a paper sits behind a paywall,
            the abstract URL is provided and the paywall noted. The goal is for any reader to
            verify any claim in two clicks.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold text-zinc-100">
          <ScrollText className="w-6 h-6 text-blue-400" /> 2. What a Solo Operation Means
        </h2>
        <div className="space-y-3 text-sm md:text-[15px] text-zinc-300 leading-relaxed">
          <p>
            Established medical publications run a multi-step review: a clinician reads each draft
            for clinical accuracy, an independent fact-checker re-verifies every citation, and an
            editor signs off. PeptiDex does not have that. There is one researcher, and that
            researcher is not a clinician.
          </p>
          <p>
            What that means in practice:
          </p>
          <ul className="space-y-2 ml-2">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
              <span>
                Content is best treated as a starting point for further reading, not as a final
                clinical reference.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
              <span>
                Every numeric or mechanistic claim is linked to its primary source, so readers can
                independently judge whether the in-text summary fairly represents the source.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
              <span>
                Errors will happen. The {' '}
                <Link href="/corrections" className="text-violet-400 underline hover:text-violet-300">corrections page</Link>{' '}
                is the public record of every fix, retraction, and material clarification.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 flex-shrink-0" />
              <span>
                Decisions that involve actual peptide use need to go through a licensed physician.
                The site cannot stand in for one.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold text-zinc-100">
          <Scale className="w-6 h-6 text-amber-400" /> 3. Conflict-of-Interest Disclosure
        </h2>
        <div className="space-y-3 text-sm md:text-[15px] text-zinc-300 leading-relaxed">
          <p>
            PeptiDex is partly supported by affiliate relationships with research-chemical
            vendors — when a reader clicks through to a vendor and makes a purchase, the site may
            receive a commission. Pages that contain affiliate links display an inline affiliate
            disclosure at the point the link appears.
          </p>
          <p>
            <strong className="text-zinc-100">Vendor independence.</strong> No vendor pays for
            placement, ranking, or favorable editorial coverage. Vendor reviews and price
            comparisons are produced independently, without contact with vendor sales channels.
            If a vendor relationship existed at the time content was written — sponsorship,
            sample provision, paid travel — that relationship is disclosed inline.
          </p>
          <p>
            <strong className="text-zinc-100">No clinical relationships.</strong> The researcher
            does not hold equity in any peptide manufacturer or vendor, is not a paid speaker for
            any party, and is not party to any consulting arrangement that could compromise
            objectivity. If that ever changes, this page and the {' '}
            <Link href="/team" className="text-violet-400 underline hover:text-violet-300">about page</Link>{' '}
            will be updated and the change recorded in the corrections log.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold text-zinc-100">
          <RefreshCw className="w-6 h-6 text-blue-400" /> 4. Review Cadence
        </h2>
        <div className="space-y-3 text-sm md:text-[15px] text-zinc-300 leading-relaxed">
          <p>
            <strong className="text-zinc-100">Six-month re-review.</strong> Every published peptide
            profile, stack page, and evergreen article is re-read against the current literature
            at least every six months. If the page still reflects the available evidence, the
            &ldquo;reviewed&rdquo; date is bumped. If the literature has shifted, the page is revised, and
            the change is logged.
          </p>
          <p>
            <strong className="text-zinc-100">Out-of-cycle triggers.</strong> Some events trigger
            an immediate update outside the six-month cycle: an FDA scheduling change, a study
            retraction, a major safety signal in published pharmacovigilance data, or a clinical-
            trial result that materially changes the safety or efficacy picture for a covered
            compound.
          </p>
          <p>
            <strong className="text-zinc-100">Date stamps.</strong> Every page renders three
            visible dates: published, last modified, and last reviewed. These are also embedded
            in the page&apos;s structured-data so readers and search engines can assess freshness.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold text-zinc-100">
          <AlertCircle className="w-6 h-6 text-rose-400" /> 5. Corrections
        </h2>
        <div className="space-y-3 text-sm md:text-[15px] text-zinc-300 leading-relaxed">
          <p>
            Errors will happen. The standard is that they get corrected quickly, transparently,
            and visibly — not silently overwritten.
          </p>
          <p>
            <strong className="text-zinc-100">Reporting an error.</strong> Anyone can report an
            inaccuracy through the contact form on the {' '}
            <Link href="/about" className="text-violet-400 underline hover:text-violet-300">About</Link>{' '}
            page. Reports are triaged within one business day.
          </p>
          <p>
            <strong className="text-zinc-100">How a correction is logged.</strong> If an error is
            confirmed, the page is corrected within 48 hours. The original incorrect statement is
            preserved in the {' '}
            <Link href="/corrections" className="text-violet-400 underline hover:text-violet-300">corrections log</Link>{' '}
            alongside the corrected statement and the date of the change. Pages with active
            corrections show a small banner pointing to the log entry.
          </p>
          <p>
            <strong className="text-zinc-100">Retracted citations.</strong> If a study cited on
            PeptiDex is retracted from its journal, the citation is removed within one business
            day, and any claim that depended on it is either supported by an alternative source
            or revised. The retraction event is recorded in the corrections log.
          </p>
          <p>
            <strong className="text-zinc-100">No silent edits.</strong> Substantive claims are not
            silently revised. If a page&apos;s clinical conclusion changes — for example, a previous
            warning is moderated based on new data — the change is logged, dated, and explained.
          </p>
        </div>
      </section>

      <MedicalDisclaimer variant="callout" />

      <div className="rounded-xl bg-zinc-900/40 border border-zinc-800 p-6 text-sm text-zinc-400 space-y-2">
        <p>
          Questions or concerns about how PeptiDex content is produced can be sent through the
          contact form on the {' '}
          <Link href="/about" className="text-violet-400 underline hover:text-violet-300">About</Link>{' '}
          page. Material updates to this editorial process document are themselves logged in the
          {' '}
          <Link href="/corrections" className="text-violet-400 underline hover:text-violet-300">corrections log</Link>.
        </p>
      </div>
    </main>
  );
}
