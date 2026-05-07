import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import { ChevronRight, AlertCircle, FileWarning, RotateCcw, ScrollText } from 'lucide-react';
import { getAuthorBySlug } from '@/lib/authors';
import { MedicalDisclaimer } from '@/components/medical-disclaimer';

export const metadata: Metadata = {
  title: 'Corrections Log | PeptiDex',
  description:
    'Public log of corrections, retractions, and disclosure updates for PeptiDex peptide research content. Maintained as part of our editorial process.',
  alternates: { canonical: 'https://peptidex.app/corrections' },
};

type CorrectionType =
  | 'factual-error'
  | 'retracted-citation'
  | 'disclosure-update'
  | 'clarification'
  | 'log-opened';

interface CorrectionEntry {
  id: string;
  date: string;
  page: string;
  pageTitle: string;
  type: CorrectionType;
  summary: string;
  originalStatement?: string;
  correctedStatement?: string;
  loggedBy: string;
}

const TYPE_META: Record<
  CorrectionType,
  { label: string; icon: typeof AlertCircle; bgClass: string; borderClass: string; textClass: string }
> = {
  'factual-error': {
    label: 'Factual Correction',
    icon: AlertCircle,
    bgClass: 'bg-amber-500/15',
    borderClass: 'border-amber-500/30',
    textClass: 'text-amber-400',
  },
  'retracted-citation': {
    label: 'Retracted Citation',
    icon: FileWarning,
    bgClass: 'bg-rose-500/15',
    borderClass: 'border-rose-500/30',
    textClass: 'text-rose-400',
  },
  'disclosure-update': {
    label: 'Disclosure Update',
    icon: ScrollText,
    bgClass: 'bg-blue-500/15',
    borderClass: 'border-blue-500/30',
    textClass: 'text-blue-400',
  },
  clarification: {
    label: 'Clarification',
    icon: RotateCcw,
    bgClass: 'bg-violet-500/15',
    borderClass: 'border-violet-500/30',
    textClass: 'text-violet-400',
  },
  'log-opened': {
    label: 'Log Opened',
    icon: ScrollText,
    bgClass: 'bg-emerald-500/15',
    borderClass: 'border-emerald-500/30',
    textClass: 'text-emerald-400',
  },
};

function loadCorrections(): CorrectionEntry[] {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), 'src', 'content', 'corrections.json'),
      'utf8'
    );
    const data = JSON.parse(raw) as { entries?: CorrectionEntry[] };
    return (data.entries ?? []).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CorrectionsPage() {
  const entries = loadCorrections();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptidex.app/' },
      { '@type': 'ListItem', position: 2, name: 'Corrections', item: 'https://peptidex.app/corrections' },
    ],
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="flex items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-zinc-300">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-300 font-medium">Corrections</span>
      </nav>

      <header className="space-y-4">
        <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">§ Corrections</p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
          Corrections Log
        </h1>
        <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
          A public, chronological record of every correction, retracted citation, and disclosure
          update on PeptiDex. We log changes here rather than silently overwriting pages — see
          our {' '}
          <Link href="/editorial-process" className="text-violet-400 underline hover:text-violet-300">editorial process</Link>{' '}
          for the full corrections protocol.
        </p>
        <p className="text-sm text-zinc-500">
          To report an inaccuracy, contact us through the {' '}
          <Link href="/about" className="text-violet-400 hover:text-violet-300 underline">About</Link>{' '}
          page. Reports are triaged within one business day.
        </p>
      </header>

      {entries.length === 0 ? (
        <div className="rounded-xl bg-zinc-900/40 border border-zinc-800 p-8 text-center">
          <p className="text-sm text-zinc-500">No entries yet.</p>
        </div>
      ) : (
        <ol className="space-y-4">
          {entries.map((entry) => {
            const meta = TYPE_META[entry.type] ?? TYPE_META.clarification;
            const Icon = meta.icon;
            const logger = getAuthorBySlug(entry.loggedBy);
            return (
              <li
                key={entry.id}
                id={entry.id}
                className="rounded-xl bg-zinc-900/40 border border-zinc-800 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${meta.bgClass} border ${meta.borderClass} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${meta.textClass}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      <span className={`font-bold uppercase tracking-wider ${meta.textClass}`}>
                        {meta.label}
                      </span>
                      <span className="text-zinc-500">{formatDate(entry.date)}</span>
                      <Link
                        href={entry.page}
                        className="text-violet-400 hover:text-violet-300 underline"
                      >
                        {entry.pageTitle}
                      </Link>
                    </div>
                    <p className="text-sm text-zinc-200 leading-relaxed">{entry.summary}</p>
                    {entry.originalStatement && (
                      <div className="text-xs text-zinc-400 space-y-1.5 pt-2 border-t border-zinc-800/80">
                        <div>
                          <span className="font-bold text-rose-400">Original: </span>
                          <span className="line-through">{entry.originalStatement}</span>
                        </div>
                        {entry.correctedStatement && (
                          <div>
                            <span className="font-bold text-emerald-400">Corrected: </span>
                            <span>{entry.correctedStatement}</span>
                          </div>
                        )}
                      </div>
                    )}
                    {logger && (
                      <p className="text-[11px] text-zinc-500 pt-1">
                        Logged by{' '}
                        <Link href={`/team/${logger.slug}`} className="text-zinc-400 hover:text-violet-400 underline">
                          {logger.name}
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      <MedicalDisclaimer variant="compact" />
    </main>
  );
}
