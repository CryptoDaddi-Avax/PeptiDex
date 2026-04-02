import { Quote } from 'lucide-react';

export function CiteThisPage({ peptideName, slug }: { peptideName: string; slug: string }) {
  const year = new Date().getFullYear();
  const citation = `PeptiDex. (${year}). ${peptideName}: Research profile & clinical studies. PeptiDex Research Platform. https://peptidex.app/library/${slug}`;

  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Quote className="w-4 h-4 text-violet-400" />
        <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">Cite This Page</h3>
      </div>
      <div className="rounded-xl bg-zinc-800/40 border border-zinc-700/50 p-4">
        <p className="text-xs text-zinc-400 leading-relaxed font-mono select-all">{citation}</p>
        <p className="text-[10px] text-zinc-600 mt-3">APA 7th Edition format. For academic and research citation purposes.</p>
      </div>
    </section>
  );
}
