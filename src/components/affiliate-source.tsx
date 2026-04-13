import { ExternalLink, ShieldCheck } from "lucide-react";

export function AffiliateSource({ peptideName, slug }: { peptideName: string, slug: string }) {
    // 1. DATA-DRIVEN MAPPING INJECTED
    // When a new product URL is available on Amino Club, update this mapping.
    // The component reads from this mapping and auto-updates the page.
    const affiliateMapping: Record<string, string> = {
        "bpc-157": "https://www.aminoclub.com/us/products/bpc-157",
        "tb-500": "https://www.aminoclub.com/us/products/tb-500",
        "ghk-cu": "https://www.aminoclub.com/us/products/ghk-cu",
        "ipamorelin": "https://www.aminoclub.com/us/products/ipamorelin",
        "cjc-1295": "https://www.aminoclub.com/us/products/cjc-1295",
        "dsip": "https://www.aminoclub.com/us/products/dsip",
        "pt-141": "https://www.aminoclub.com/us/products/pt-141",
        "retatrutide": "https://www.aminoclub.com/us/products/glp-3",
        "semaglutide": "https://www.aminoclub.com/us/products/semaglutide",
        "tirzepatide": "https://www.aminoclub.com/us/products/tirzepatide",
        "thymosin-alpha-1": "https://www.aminoclub.com/us/products/thymosin-alpha-1"
    };

    // 2. FALLBACK TO HOMEPAGE FOR UNMAPPED PEPTIDES
    const baseSlug = affiliateMapping[slug] || "https://aminoclub.com";
    
    // 3. APPEND UTM/AFFILIATE PARAMETERS
    const ctaParams = baseSlug.includes("?") 
        ? "&utm_source=affiliate_marketing&code=PEPTIDEX" 
        : "?utm_source=affiliate_marketing&code=PEPTIDEX";
    const affiliateUrl = `${baseSlug}${ctaParams}`;

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
                    Finding verified, high-purity {peptideName} requires rigorous COA verification. We independently evaluate vendors based on third-party HPLC testing, purity thresholds (≥98%), and batch-specific documentation.
                </p>

                {/* 4. EXACT CTA TEXT ("View COA-Verified [Peptide Name]") */}
                <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors mb-2 gap-2 shadow-lg shadow-violet-900/20"
                >
                    View COA-Verified {peptideName} <ExternalLink className="w-4 h-4" />
                </a>

                {/* 4. EXACT TRUST BADGES */}
                <p className="text-[11px] font-medium text-emerald-400/90 mb-3 flex flex-wrap items-center gap-2">
                    <span>✓ Third-party tested</span>
                    <span className="hidden sm:inline">·</span>
                    <span>✓ US shipping</span>
                    <span className="hidden sm:inline">·</span>
                    <span>✓ COA on every batch</span>
                </p>

                {/* 4. AFFILIATE DISCLOSURE */}
                <div className="border-t border-zinc-800/50 pt-3 flex items-start gap-2">
                    <p className="text-[10px] text-zinc-500 italic">
                        <strong>Disclosure:</strong> PeptiDex may earn a commission from purchases made through affiliate links. This does not affect our editorial independence or recommendations. We exclusively feature vendors that pass our strict quality verification protocols.
                    </p>
                </div>
            </div>
        </div>
    );
}
