import Link from 'next/link';
import { User, ArrowRight } from 'lucide-react';

const AUTHOR_DATA: Record<string, { title: string; bio: string }> = {
  'Dr. E. Vance': {
    title: 'Editorial Lead, PeptiDex',
    bio: 'Dr. E. Vance leads PeptiDex\'s editorial division, ensuring all published research summaries meet rigorous preclinical citation standards. With a background in molecular pharmacology, Dr. Vance oversees the platform\'s commitment to evidence-based peptide education.',
  },
  'Editorial Team': {
    title: 'Research Division, PeptiDex',
    bio: 'The PeptiDex Editorial Team is a cross-disciplinary group of researchers specializing in peptide pharmacology and clinical literature review. Every article undergoes multi-stage fact-checking against PubMed-indexed sources before publication.',
  },
  'Legal Dept': {
    title: 'Regulatory Analysis, PeptiDex',
    bio: 'PeptiDex\'s Legal Department monitors international research chemical regulations to keep researchers informed of evolving compliance frameworks. All regulatory summaries are reviewed quarterly against active government databases.',
  },
};

export function AuthorBio({ name }: { name: string }) {
  const data = AUTHOR_DATA[name] ?? {
    title: 'Contributor, PeptiDex',
    bio: 'A contributor to the PeptiDex research platform, dedicated to delivering evidence-based peptide education.',
  };

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: data.title,
    worksFor: {
      '@type': 'Organization',
      name: 'PeptiDex',
      url: 'https://peptidex.app',
    },
    description: data.bio,
    url: 'https://peptidex.app/about',
  };

  return (
    <section className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">About the Author</h3>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-violet-400">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold text-zinc-100">{name}</p>
          <p className="text-sm text-violet-400 font-medium mb-3">{data.title}</p>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">{data.bio}</p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors group"
          >
            Learn about our editorial standards
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
