import type { Metadata } from 'next';
import Link from 'next/link';
import { stacks } from '@/data/stacks';
import { peptides } from '@/data/peptides';
import { ArrowRight, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { PrintButton } from '@/components/print-button';
import { EVIDENCE_SCALE } from '@/data/constants';

export const metadata: Metadata = {
    title: '2026 Peptide Stack Cheat Sheet',
    description: `${stacks.length} research peptide stacks organized by goal, with each compound's role, evidence level, and links to cited research. Your free printable reference guide.`,
    alternates: { canonical: 'https://peptidex.app/lead/cheat-sheet' },
};

function getEvidence(peptideName: string) {
    const p = peptides.find(pt => pt.name === peptideName);
    if (!p) return null;
    const level = p.key_studies[0]?.evidence_level;
    return {
        label: (level && EVIDENCE_SCALE[level]?.label) || 'Preclinical',
        studies: p.key_studies.length,
    };
}

const goalLabels: Record<string, string> = {
    "Body Recomposition Stack": "Body Recomposition",
    "Injury Recovery Stack": "Injury Recovery",
    "Mental Clarity & Cognitive Stack": "Cognition & Focus",
    "Muscle Growth Stack": "Muscle Growth",
    "Immune Support Stack": "Immune Defense",
    "Deep Sleep & Recovery Stack": "Sleep & Recovery",
    "Longevity & Anti-Aging Stack": "Longevity",
    "Skin & Aesthetic Rejuvenation Stack": "Skin & Aesthetics",
    "Gut Health & Recovery Stack": "Gut Health",
    "Hormonal Optimization Stack (Male)": "Male Hormonal Optimization",
};

export default function CheatSheetPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-10">
            {/* Header */}
            <header className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest">
                    <Download className="w-3.5 h-3.5" /> Free Research Reference
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
                    2026 Peptide Stack Cheat Sheet
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    All {stacks.length} curated research stacks organized by goal, with each compound&apos;s role, evidence level, and links to cited research. Print it, save it, reference it.
                </p>
            </header>

            {/* Print button */}
            <div className="flex justify-center gap-4 print:hidden">
                <PrintButton />
                <Link href="/stacks" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 font-semibold hover:bg-zinc-800 transition-colors">
                    View Full Stack Details <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Stacks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 print:grid-cols-2 print:gap-3">
                {stacks.map((stack) => (
                    <div key={stack.slug} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 print:p-3 print:border-zinc-300 print:bg-white space-y-3 break-inside-avoid">
                        {/* Stack Header */}
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest print:text-violet-700">
                                    {goalLabels[stack.stack_name] || stack.stack_name}
                                </span>
                                <h3 className="text-base font-bold text-zinc-100 print:text-zinc-900 mt-0.5">
                                    {stack.stack_name}
                                </h3>
                            </div>
                            <Link href={`/stacks/${stack.slug}`} className="text-xs text-violet-400 hover:text-violet-300 print:hidden flex-shrink-0">
                                Details &rarr;
                            </Link>
                        </div>

                        {/* Peptides Table */}
                        <div className="overflow-x-auto -mx-1">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="text-left text-[10px] text-zinc-500 print:text-zinc-600 uppercase tracking-wider border-b border-zinc-800 print:border-zinc-300">
                                        <th className="pb-1.5 px-1 font-semibold">Peptide</th>
                                        <th className="pb-1.5 px-1 font-semibold">Role in Stack</th>
                                        <th className="pb-1.5 px-1 font-semibold">Evidence</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50 print:divide-zinc-200">
                                    {stack.peptides.map((sp) => {
                                        const evidence = getEvidence(sp.name);
                                        return (
                                            <tr key={sp.name} className="text-zinc-300 print:text-zinc-800">
                                                <td className="py-1.5 px-1 font-semibold text-zinc-100 print:text-zinc-900">
                                                    <Link href={`/library/${sp.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="hover:text-violet-400 transition-colors print:text-zinc-900 print:no-underline">
                                                        {sp.name}
                                                    </Link>
                                                </td>
                                                <td className="py-1.5 px-1">{sp.role_in_stack.split(' — ')[0]}</td>
                                                <td className="py-1.5 px-1 whitespace-nowrap">
                                                    {evidence ? `${evidence.label} · ${evidence.studies} ${evidence.studies === 1 ? 'study' : 'studies'}` : '—'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sourcing Footer */}
            <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/10 to-transparent p-6 text-center print:border-violet-300 print:bg-violet-50">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-violet-400 print:text-violet-700" />
                    <h3 className="text-base font-bold text-zinc-100 print:text-zinc-900">Source COA-Verified Peptides</h3>
                </div>
                <p className="text-sm text-zinc-400 print:text-zinc-600 mb-4 max-w-lg mx-auto">
                    All compounds in these stacks should be sourced from vendors providing independent third-party COAs with ≥98% HPLC purity verification.
                </p>
                <a
                    href="https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=cheat_sheet_footer&code=PEPTIDEX"
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors shadow-lg shadow-violet-900/20 print:bg-violet-700 print:shadow-none"
                >
                    Visit Amino Club — COA-Verified Peptides <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-[10px] text-zinc-600 mt-3">
                    PeptiDex may earn a commission from purchases. This does not affect our editorial independence.
                </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5 text-center print:bg-gray-100 print:border-gray-300">
                <p className="text-[10px] text-zinc-500 print:text-zinc-600 leading-relaxed">
                    This reference guide is for educational and research purposes only. It does not constitute medical advice. Always consult a licensed healthcare provider before using any peptide compound. This sheet does not provide dosing guidance; doses studied in published research are in the papers cited on each compound&apos;s library page.
                </p>
            </div>
        </div>
    );
}
