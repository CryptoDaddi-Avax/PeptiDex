import Link from 'next/link';
import { ShoppingCart, ArrowRight, BookOpen } from 'lucide-react';

interface ComparisonVendorBlockProps {
  nameA: string;
  slugA: string;
  nameB: string;
  slugB: string;
}

const BUY_SLUGS = new Set([
  'bpc-157','tb-500','ghk-cu','semaglutide','tirzepatide',
  'retatrutide','cjc-1295','ipamorelin','mk-677','sermorelin',
  'tesamorelin','mots-c',
]);

function VendorCard({ name, slug }: { name: string; slug: string }) {
  const hasBuyPage = BUY_SLUGS.has(slug);
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
      <h4 className="font-bold text-zinc-100 mb-3">{name}</h4>
      <div className="flex flex-col gap-2">
        {hasBuyPage && (
          <Link
            href={`/buy/${slug}`}
            className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-colors"
          >
            <span className="flex items-center gap-1.5"><ShoppingCart className="w-4 h-4" /> Where to Buy {name}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
        <Link
          href={`/library/${slug}`}
          className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-violet-500/40 text-zinc-300 hover:text-violet-400 font-semibold text-sm transition-colors"
        >
          <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Full Research Profile</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export function ComparisonVendorBlock({ nameA, slugA, nameB, slugB }: ComparisonVendorBlockProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-zinc-100 mb-4">Where to Buy</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VendorCard name={nameA} slug={slugA} />
        <VendorCard name={nameB} slug={slugB} />
      </div>
      <p className="text-xs text-zinc-500 mt-3">
        Affiliate disclosure: PeptiDex may earn commissions from purchases via vendor links. See{' '}
        <Link href="/about/methodology" className="text-violet-400 hover:underline">our methodology</Link>.
      </p>
    </section>
  );
}
