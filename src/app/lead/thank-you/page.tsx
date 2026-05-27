import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Download, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Your Cheat Sheet is Ready',
    description: 'Download your 2026 Peptide Stack Cheat Sheet — 12 research-backed stacks with exact dosages and timing.',
    robots: { index: false, follow: false },
};

export default function ThankYouPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-12 md:py-20 space-y-10">
            {/* Success Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100">
                    Your Cheat Sheet is Ready!
                </h1>
                <p className="text-zinc-400">
                    We&apos;ve also sent a copy to your inbox. Save it, print it, reference it anytime.
                </p>
            </div>

            {/* Download Card */}
            <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/10 to-zinc-900 p-6 md:p-8 text-center space-y-4">
                <h2 className="text-lg font-bold text-zinc-100">2026 Peptide Stack Cheat Sheet</h2>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                    12 curated stacks &bull; exact dosages &bull; cycle lengths &bull; timing protocols &bull; verified sources
                </p>
                <Link
                    href="/lead/cheat-sheet"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors shadow-lg shadow-violet-900/20 text-lg"
                >
                    <Download className="w-5 h-5" /> View & Print Your Cheat Sheet
                </Link>
                <p className="text-[10px] text-zinc-600">Tip: Use &quot;Print to PDF&quot; in your browser to save a permanent copy.</p>
            </div>

            {/* Affiliate Recommendation */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/10 blur-[50px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck className="w-5 h-5 text-violet-400" />
                        <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">While You&apos;re Here</span>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">
                        Ready to Source These Peptides?
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                        Every stack in the cheat sheet requires verified, high-purity compounds. Our #1 recommended vendor, <strong className="text-zinc-200">Amino Club</strong>, provides batch-specific third-party COAs with ≥99% purity on every product.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=thank_you_cta&code=PEPTIDEX"
                            target="_blank"
                            rel="noopener noreferrer nofollow sponsored"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors shadow-lg shadow-violet-900/20"
                        >
                            Visit Amino Club <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link
                            href="/blog/best-peptide-vendor-2026"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-700 text-zinc-300 font-semibold hover:bg-zinc-800 transition-colors"
                        >
                            See All Reviewed Vendors <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Continue Exploring */}
            <div className="text-center space-y-3">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Continue Exploring</p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/stacks" className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                        Browse All Stacks
                    </Link>
                    <Link href="/library" className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                        Peptide Library
                    </Link>
                    <Link href="/tools/compare" className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                        Compare Tool
                    </Link>
                </div>
            </div>

            {/* Affiliate disclosure */}
            <p className="text-[10px] text-zinc-600 text-center max-w-md mx-auto">
                PeptiDex may earn a commission from purchases made through affiliate links. This does not affect our editorial independence or recommendations.
            </p>
        </div>
    );
}
