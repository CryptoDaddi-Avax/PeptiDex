import Link from 'next/link';
import { BookOpen, ArrowRight, Beaker } from 'lucide-react';
import { peptides } from '@/data/peptides';

/**
 * "Research Context" sidebar for vendor/commercial pages.
 * Links back to /learn/[slug] educational articles,
 * signaling to Google that PeptiDex is both an authority (educational) and a utility (commercial).
 */

// Top peptides to feature — the most popular compounds
const FEATURED_SLUGS = [
  'bpc-157', 'tb-500', 'ipamorelin', 'semaglutide', 'tirzepatide',
  'ghk-cu', 'pt-141', 'cjc-1295', 'retatrutide', 'tesamorelin',
  'mots-c', 'mk-677',
];

export function ResearchContextSidebar({ className = '' }: { className?: string }) {
  const featured = FEATURED_SLUGS
    .map((slug) => peptides.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <aside className={`rounded-2xl bg-zinc-900/40 border border-zinc-800 p-5 md:p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4.5 h-4.5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-100">Research Context</h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Educational Guides</p>
        </div>
      </div>

      <p className="text-xs text-zinc-400 leading-relaxed mb-5">
        Before sourcing, read our neutral, evidence-based guides to understand each peptide&apos;s mechanism, published research, and safety data.
      </p>

      {/* Article Links */}
      <div className="space-y-2">
        {featured.map((p) => p && (
          <Link
            key={p.slug}
            href={`/learn/${p.slug}`}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-zinc-800/50 bg-zinc-950/30 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Beaker className="w-3.5 h-3.5 text-blue-400/80 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-zinc-200 truncate group-hover:text-blue-300 transition-colors">
                  What Is {p.name}?
                </p>
                <p className="text-[10px] text-zinc-500 truncate">{p.category}</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* View All */}
      <Link
        href="/intro"
        className="flex items-center justify-center gap-2 mt-5 py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-400 font-semibold text-xs hover:bg-blue-500/10 transition-colors"
      >
        View All Educational Guides <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </aside>
  );
}
