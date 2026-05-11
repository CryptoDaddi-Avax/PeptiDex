'use client';

import Link from 'next/link';
import { ShoppingCart, ExternalLink, Tag, CheckCircle, ArrowRight } from 'lucide-react';
import { vendorPricing, VendorPrice } from '@/data/vendor-pricing';

interface PricingCardProps {
  name: string;
  slug: string;
  vendors: VendorPrice[];
}

const BADGE_STYLES: Record<string, string> = {
  "Editor's Pick":  'bg-violet-500/20 text-violet-300 border-violet-500/40',
  "Best Price":     'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  "Best for Intl":  'bg-blue-500/20 text-blue-300 border-blue-500/40',
  "Triple-Tested":  'bg-amber-500/20 text-amber-300 border-amber-500/40',
};

const BUY_SLUGS = new Set([
  'bpc-157','tb-500','ghk-cu','semaglutide','tirzepatide',
  'retatrutide','cjc-1295','ipamorelin','mk-677','sermorelin',
  'tesamorelin','mots-c','kpv','epitalon','semax','selank',
  'aod-9604','hexarelin','ghrp-2','ghrp-6','pt-141','melanotan-ii',
  'mots-c','ll-37','thymosin-alpha-1','nad','dsip',
]);

function PricingCard({ name, slug, vendors }: PricingCardProps) {
  const hasBuyPage = BUY_SLUGS.has(slug);
  const inStockVendors = vendors.filter(v => v.inStock);
  const cheapest = inStockVendors.length
    ? inStockVendors.reduce((a, b) => (a.price_usd / a.vial_mg) < (b.price_usd / b.vial_mg) ? a : b)
    : null;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="font-bold text-zinc-100 text-base">{name}</h3>
        {inStockVendors.length > 0 && (
          <span className="text-xs text-zinc-400">{inStockVendors.length} vendor{inStockVendors.length > 1 ? 's' : ''}</span>
        )}
      </div>

      {/* Vendor rows */}
      {inStockVendors.length > 0 ? (
        <div className="divide-y divide-zinc-800/60">
          {inStockVendors.map((v) => {
            const pricePerMg = v.price_usd / v.vial_mg;
            const isCheapest = cheapest && v.vendor === cheapest.vendor;
            return (
              <div key={v.vendor} className={`px-5 py-3.5 flex items-center justify-between gap-3 ${isCheapest ? 'bg-emerald-500/5' : ''}`}>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-zinc-200 truncate">{v.vendor}</span>
                    {v.badge && (
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${BADGE_STYLES[v.badge] ?? 'bg-zinc-700 text-zinc-300 border-zinc-600'}`}>
                        {v.badge}
                      </span>
                    )}
                    {isCheapest && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border bg-emerald-500/20 text-emerald-300 border-emerald-500/40 flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" /> Best Value
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-500">{v.vial_mg}mg vial · ${pricePerMg.toFixed(2)}/mg</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-base font-bold text-zinc-100">${v.price_usd.toFixed(2)}</span>
                  <a
                    href={v.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors whitespace-nowrap"
                  >
                    Buy <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-5 py-6 text-center text-zinc-500 text-sm">
          Pricing coming soon
        </div>
      )}

      {/* Footer CTA */}
      {hasBuyPage && (
        <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-900/30">
          <Link
            href={`/buy/${slug}`}
            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Full vendor comparison for {name}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}

interface ComparisonPricingBoxProps {
  nameA: string;
  slugA: string;
  nameB: string;
  slugB: string;
  isSamePeptide?: boolean;
}

export function ComparisonPricingBox({ nameA, slugA, nameB, slugB, isSamePeptide }: ComparisonPricingBoxProps) {
  const pricingA = vendorPricing.find(p => p.slug === slugA);
  const pricingB = vendorPricing.find(p => p.slug === slugB);

  const vendorsA = pricingA?.vendors ?? [];
  const vendorsB = pricingB?.vendors ?? [];

  return (
    <section>
      <div className="flex items-center gap-2 mb-5">
        <Tag className="w-5 h-5 text-zinc-400" />
        <h2 className="text-xl font-bold text-zinc-100">Vendor Pricing</h2>
        <span className="text-xs text-zinc-500 ml-1">· Affiliate links · Prices verified {new Date().getFullYear()}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <PricingCard name={nameA} slug={slugA} vendors={vendorsA} />
        {!isSamePeptide && <PricingCard name={nameB} slug={slugB} vendors={vendorsB} />}
      </div>
      <p className="text-xs text-zinc-600 mt-3">
        Affiliate disclosure: PeptiDex may earn a commission from purchases via vendor links at no extra cost to you.{' '}
        <Link href="/about/methodology" className="text-zinc-500 hover:text-violet-400 underline transition-colors">See our methodology</Link>.
      </p>
    </section>
  );
}
