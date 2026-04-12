import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export function BlogVendorCallout() {
    return (
        <div className="my-10 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/10 to-transparent p-6 sm:p-8 relative overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 blur-[60px] rounded-full pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-bold text-violet-400 uppercase tracking-wider">
                            <ShieldCheck className="w-3 h-3" /> Trusted Vendor
                        </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-zinc-100 mb-2">
                        Amino Club &mdash; COA-Verified Research Peptides
                    </h3>
                    
                    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm font-medium text-emerald-400/90">
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Third-party tested</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> 99%+ purity</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> US shipping</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Batch-specific COAs</li>
                    </ul>

                    <p className="text-[11px] text-zinc-500 max-w-xl">
                        PeptiDex may earn a commission from purchases made through affiliate links. This does not affect our editorial independence or rigorous vetting standards.
                    </p>
                </div>

                <div className="w-full sm:w-auto flex-shrink-0">
                    <a
                        href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-lg hover:shadow-violet-900/50 group-hover:-translate-y-0.5 gap-2"
                    >
                        Shop Research Peptides <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    );
}
