import { ExternalLink, ShieldCheck } from "lucide-react";

export function AffiliateSource({ peptideName }: { peptideName: string }) {
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

                <a
                    href="https://aminoclubs.com/?ref=peptidex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-colors mb-2 gap-2 shadow-lg shadow-violet-900/20"
                >
                    View COA-Verified {peptideName} <ExternalLink className="w-4 h-4" />
                </a>

                <p className="text-[11px] font-medium text-emerald-400/90 mb-3 flex items-center gap-2">
                    <span>✓ Third-party tested</span>
                    <span>·</span>
                    <span>✓ US shipping</span>
                    <span>·</span>
                    <span>✓ COA on every batch</span>
                </p>

                <div className="border-t border-zinc-800/50 pt-3">
                    <p className="text-[10px] text-zinc-500 italic">
                        PeptiDex may earn a commission from purchases made through affiliate links. This does not affect our editorial independence or recommendations.
                    </p>
                </div>
            </div>
        </div>
    );
}
