import { ShoppingCart } from 'lucide-react';

export function BuyPageHero({
  peptideName,
  subhead,
}: {
  peptideName: string;
  subhead: string;
}) {
  const currentYear = new Date().getFullYear();
  return (
    <section className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800/50 pt-24 pb-12">
      <div className="absolute inset-0 bg-violet-900/10 mix-blend-screen" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-semibold mb-6">
          <ShoppingCart className="w-4 h-4" />
          <span>Vendor Guide {currentYear}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Where to Buy <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">{peptideName}</span> Online
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          {subhead}
        </p>
      </div>
    </section>
  );
}
