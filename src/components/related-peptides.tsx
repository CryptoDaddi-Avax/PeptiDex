import Link from 'next/link';
import { peptides, getPeptideBySlug } from '@/data/peptides';
import { ArrowRight, Beaker } from 'lucide-react';

interface RelatedPeptidesProps {
  currentSlug: string;
}

export function RelatedPeptides({ currentSlug }: RelatedPeptidesProps) {
  const currentPeptide = getPeptideBySlug(currentSlug);
  if (!currentPeptide) return null;

  const synergies = currentPeptide.interactions?.synergies || [];
  
  const related = peptides
    .filter((p) => p.slug !== currentPeptide.slug && (
      synergies.some(s => s.toLowerCase() === p.name.toLowerCase()) ||
      p.category === currentPeptide.category
    ))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-zinc-800/50">
      <div className="flex items-center gap-2 mb-6">
        <Beaker className="w-5 h-5 text-violet-400" />
        <h2 className="text-xl font-bold text-zinc-100">Related Research Profiles</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((peptide) => (
          <Link
            key={peptide.slug}
            href={`/peptides/${peptide.slug}`}
            className="group flex flex-col justify-between p-5 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 transition-all hover:border-violet-500/30"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                {peptide.category}
              </div>
              <h3 className="font-bold text-zinc-200 group-hover:text-violet-400 transition-colors line-clamp-1">
                {peptide.name}
              </h3>
              <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                {peptide.primary_benefits}
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-semibold text-violet-400">
              View target <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
