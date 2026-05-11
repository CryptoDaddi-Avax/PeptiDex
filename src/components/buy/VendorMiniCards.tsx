import { ExternalLink, Tag, ShieldCheck, ArrowRight } from 'lucide-react';
import type { PeptideVendorPricing } from '@/data/vendor-pricing';
import type { Vendor } from '@/data/vendors';
import Link from 'next/link';
import { AffiliateLink } from '@/components/affiliate-link';

export function VendorMiniCards({
  pricingEntry,
  allVendors,
  peptideName,
  peptideSlug = 'general',
}: {
  pricingEntry: PeptideVendorPricing | undefined;
  allVendors: Vendor[];
  peptideName: string;
  peptideSlug?: string;
}) {
  const hasPricing = pricingEntry && pricingEntry.vendors.length > 0;
  if (!hasPricing) {
    return (
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
        <p className="text-zinc-400 mb-4">Pricing data for {peptideName} is currently unavailable.</p>
        <Link href="/tools/pricing" className="inline-flex items-center gap-2 text-violet-400 font-semibold hover:text-violet-300">
          Search All Vendors <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const inStockVendors = pricingEntry.vendors.filter(v => v.inStock);
  const enrichedVendors = inStockVendors
    .map(vp => ({
      ...vp,
      vendorRecord: allVendors.find(v => v.name.toLowerCase() === vp.vendor.toLowerCase()),
    }))
    .sort((a, b) => {
      if (a.badge === "Editor's Pick") return -1;
      if (b.badge === "Editor's Pick") return 1;
      return a.price_usd - b.price_usd;
    })
    .slice(0, 4); // Only top 4 for mini cards

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {enrichedVendors.map(v => {
        const discount = v.vendorRecord?.discountPercent ?? 0;
        const discounted = discount > 0 ? (v.price_usd * (1 - discount / 100)) : null;
        
        return (
          <div key={v.vendor} className={`relative p-5 rounded-2xl border ${v.badge === "Editor's Pick" ? 'border-amber-500/50 bg-amber-500/5' : 'border-zinc-800 bg-zinc-900/40'} flex flex-col`}>
            {v.badge === "Editor's Pick" && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                Editor's Choice
              </span>
            )}
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-white text-lg">{v.vendor}</h3>
              <div className="flex items-center gap-1 bg-zinc-800 rounded-md px-2 py-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-semibold text-zinc-300">{v.vendorRecord?.purity ?? '98%+'}</span>
              </div>
            </div>
            
            <div className="flex-grow flex flex-col justify-center mb-4">
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold ${discounted ? 'text-zinc-500 line-through text-lg' : 'text-zinc-100'}`}>
                  ${v.price_usd.toFixed(2)}
                </span>
                {discounted && (
                  <span className="text-2xl font-bold text-emerald-400">${discounted.toFixed(2)}</span>
                )}
                <span className="text-xs text-zinc-500">/{v.vial_mg}mg</span>
              </div>
            </div>

            {v.vendorRecord?.discountCode && (
              <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-3 font-medium bg-amber-500/10 p-2 rounded-lg justify-center border border-amber-500/20">
                <Tag className="w-3 h-3" />
                Use code <strong className="uppercase font-mono">{v.vendorRecord.discountCode}</strong>
              </div>
            )}

            <AffiliateLink
              href={v.affiliateUrl}
              peptide={peptideSlug}
              source="buy_box"
              className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                v.badge === "Editor's Pick" 
                  ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400' 
                  : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              Shop Now <ExternalLink className="w-4 h-4" />
            </AffiliateLink>
          </div>
        );
      })}
    </div>
  );
}
