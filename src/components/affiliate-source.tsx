import { ExternalLink, ShieldCheck } from "lucide-react";
import { AffiliateLink } from "@/components/affiliate-link";
import { aminoClubProductMapping } from "@/data/affiliates";
import { buildAffiliateUrl } from "@/lib/promos/affiliateUrl";
import { AMINO_PROMO } from "@/lib/promos/config";

export function AffiliateSource({ peptideName, slug }: { peptideName: string; slug: string }) {
    // 1. DATA-DRIVEN MAPPING — prefer per-peptide URL, fall back to homepage
    const baseUrl = aminoClubProductMapping[slug] ?? "https://aminoclub.com";

    // 2. Build canonical affiliate URL via central builder using Amino Club's promo (the destination)
    //    Produces: ?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=detail_sourcing&code=PEPTIDEX
    const promo = { ...AMINO_PROMO, shopUrl: baseUrl };
    const affiliateUrl = buildAffiliateUrl(promo, "detail_sourcing");

    return (
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/10 to-indigo-900/10 p-5 mb-8 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-violet-400" />
                    <h3 className="text-base font-bold text-zinc-100">
                        Where to Source {peptideName} for Research
                    </h3>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    Look for batch-specific COAs from a third-party lab. Amino Club states it provides HPLC, mass-spec and endotoxin COAs for every batch. PeptiDex does not test products.
                </p>

                {/* CTA — tracked with source="detail_sourcing" */}
                <AffiliateLink
                    href={affiliateUrl}
                    vendor="amino_club"
                    peptide={slug}
                    source="detail_sourcing"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors mb-2 gap-2 shadow-lg shadow-violet-900/20"
                    id={`affiliate-detail-${slug}`}
                    aria-label={`Shop ${peptideName} at ${AMINO_PROMO.vendorName}`}
                >
                    View {peptideName} at {AMINO_PROMO.vendorName} <ExternalLink className="w-4 h-4" />
                </AffiliateLink>

                {/* Trust badges */}
                <p className="text-[11px] font-medium text-emerald-400/90 mb-3 flex flex-wrap items-center gap-2">
                    <span>✓ Third-party COAs (per vendor)</span>
                    <span className="hidden sm:inline">·</span>
                    <span>✓ US shipping</span>
                    <span className="hidden sm:inline">·</span>
                    <span>✓ COA on every batch</span>
                </p>

                {/* Affiliate disclosure */}
                <div className="border-t border-zinc-800/50 pt-3 flex items-start gap-2">
                    <p className="text-[10px] text-zinc-500 italic">
                        <strong>Disclosure:</strong> PeptiDex earns a commission from purchases made through affiliate links. Vendors are ranked on our <a href="/about/methodology#vendor-ranking" className="underline">published criteria</a>; PeptiDex&apos;s founder owns Elyria Bio.
                    </p>
                </div>
            </div>
        </div>
    );
}
