"use client";
import Link from "next/link";
import { GitCompare, Calculator, ShieldAlert, ArrowRight, GraduationCap, BookA, BarChart3, DollarSign, Activity, Calendar, Store, Stethoscope, Sparkles, Users, TrendingDown, ShieldCheck, Timer, ClipboardList, HelpCircle, FlaskConical, ShoppingCart } from "lucide-react";

const tools = [
    {
        href: "/tools/cycle-planner",
        icon: ShoppingCart,
        iconColor: "text-orange-400",
        bgGradient: "from-orange-600/20 to-amber-800/10",
        borderColor: "border-orange-500/30",
        title: "Cycle Planner",
        description: "Plan your full cycle — get exact vial counts, dosing schedules, and order everything from a trusted vendor.",
        badge: "NEW",
    },
    {
        href: "/tools/compare",
        icon: GitCompare,
        iconColor: "text-violet-400",
        bgGradient: "from-violet-600/20 to-violet-800/10",
        borderColor: "border-violet-500/30",
        title: "Peptide Comparison",
        description: "Compare 2-3 peptides side-by-side: mechanisms, dosing, evidence, safety, and interactions.",
    },
    {
        href: "/tools/calculator",
        icon: Calculator,
        iconColor: "text-emerald-400",
        bgGradient: "from-emerald-600/20 to-emerald-800/10",
        borderColor: "border-emerald-500/30",
        title: "Dosage Calculator",
        description: "Calculate reconstitution volumes, syringe units, and dosing schedules for any peptide.",
    },
    {
        href: "/tools/interactions",
        icon: ShieldAlert,
        iconColor: "text-amber-400",
        bgGradient: "from-amber-600/20 to-amber-800/10",
        borderColor: "border-amber-500/30",
        title: "Interaction Checker",
        description: "Check for synergies, cautions, and contraindications between your peptide selections.",
    },
    {
        href: "/tools/evidence",
        icon: BarChart3,
        iconColor: "text-cyan-400",
        bgGradient: "from-cyan-600/20 to-cyan-800/10",
        borderColor: "border-cyan-500/30",
        title: "Evidence Dashboard",
        description: "All 33 peptides ranked by strength of clinical evidence with study counts.",
    },
    {
        href: "/tools/pricing",
        icon: DollarSign,
        iconColor: "text-lime-400",
        bgGradient: "from-lime-600/20 to-lime-800/10",
        borderColor: "border-lime-500/30",
        title: "Price Comparison",
        description: "Average cost per vial, per dose, and doses per vial for all peptides.",
    },
    {
        href: "/tools/bloodwork",
        icon: Activity,
        iconColor: "text-red-400",
        bgGradient: "from-red-600/20 to-red-800/10",
        borderColor: "border-red-500/30",
        title: "Blood Work Analyzer",
        description: "Input your lab results and get personalized peptide suggestions based on your biomarkers.",
    },
    {
        href: "/tools/pk",
        icon: TrendingDown,
        iconColor: "text-violet-400",
        bgGradient: "from-violet-600/20 to-violet-800/10",
        borderColor: "border-violet-500/30",
        title: "PK Plasma Graphs",
        description: "Visualize pharmacokinetic plasma concentration curves for any peptide   peaks, half-life decay, and multi-dose accumulation.",
    },
    {
        href: "/tools/coa",
        icon: ShieldCheck,
        iconColor: "text-emerald-400",
        bgGradient: "from-emerald-600/20 to-emerald-800/10",
        borderColor: "border-emerald-500/30",
        title: "COA Analyzer",
        description: "Verify a supplier's Certificate of Analysis   enter the reported MW and purity to get a Pass / Fail verdict against lab reference values.",
    },
    {
        href: "/tools/halflife",
        icon: Timer,
        iconColor: "text-cyan-400",
        bgGradient: "from-cyan-600/20 to-teal-800/10",
        borderColor: "border-cyan-500/30",
        title: "Half-Life Visualizer",
        description: "See how multiple peptides' plasma levels overlap throughout the day. Optimize injection timing with interactive curves.",
    },
];

export default function ToolsPage() {
    return (
        <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-100 mb-2">Power Tools</h1>
                <p className="text-sm text-zinc-400">Research-grade utilities for your peptide journey</p>
            </div>

            {/* AI Advisor Hero */}
            <div className="mb-6">
                <Link href="/advisor" className="block rounded-2xl border border-violet-500/40 bg-gradient-to-r from-violet-600/25 via-purple-600/20 to-pink-600/15 p-5 md:p-6 hover:scale-[1.01] transition-all group relative overflow-hidden">
                    <div className="absolute top-2 right-3 px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-[9px] font-bold text-violet-300 uppercase tracking-wider">AI Powered</div>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/25">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">PeptiDex Advisor</h2>
                                <ArrowRight className="w-5 h-5 text-violet-400 group-hover:text-white transition-colors" />
                            </div>
                            <p className="text-sm text-zinc-400 mt-1 leading-relaxed">Chat with our AI advisor   get personalized peptide recommendations, dosing help, stack analysis, and more.</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="space-y-4">
                {tools.map((tool, i) => (
                    <div key={tool.href}>
                        <Link href={tool.href} className={`block rounded-2xl border ${tool.borderColor} bg-gradient-to-br ${tool.bgGradient} p-5 md:p-6 hover:scale-[1.01] transition-all duration-200 group relative overflow-hidden`}>
                            {(tool as any).badge && (
                                <div className="absolute top-2 right-3 px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-[9px] font-bold text-orange-300 uppercase tracking-wider">{(tool as any).badge}</div>
                            )}
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl bg-zinc-900/80 flex items-center justify-center flex-shrink-0`}>
                                    <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">{tool.title}</h2>
                                        <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                                    </div>
                                    <p className="text-sm text-zinc-400 mt-1 leading-relaxed">{tool.description}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Learn Section */}
            <div className="mt-10 animate-[fadeIn_0.5s_ease-out_0.4s_backwards]">
                <h2 className="text-lg font-bold text-zinc-100 mb-4 text-center">Learn</h2>
                <div className="grid grid-cols-3 gap-3">
                    <Link href="/learn" className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/15 to-blue-900/10 p-4 hover:scale-[1.02] transition-all group">
                        <GraduationCap className="w-6 h-6 text-blue-400 mb-2" />
                        <h3 className="text-sm font-bold text-zinc-100">Peptide 101</h3>
                        <p className="text-[11px] text-zinc-400 mt-1">5 guided modules</p>
                    </Link>
                    <Link href="/glossary" className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-600/15 to-pink-900/10 p-4 hover:scale-[1.02] transition-all group">
                        <BookA className="w-6 h-6 text-pink-400 mb-2" />
                        <h3 className="text-sm font-bold text-zinc-100">Glossary</h3>
                        <p className="text-[11px] text-zinc-400 mt-1">82 terms explained</p>
                    </Link>
                    <Link href="/guides/reconstitution" className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-600/15 to-emerald-900/10 p-4 hover:scale-[1.02] transition-all group">
                        <FlaskConical className="w-6 h-6 text-emerald-400 mb-2" />
                        <h3 className="text-sm font-bold text-zinc-100">Reconstitution</h3>
                        <p className="text-[11px] text-zinc-400 mt-1">Step-by-step guide</p>
                    </Link>
                </div>
            </div>

            {/* Track + Find */}
            <div className="mt-8 animate-[fadeIn_0.5s_ease-out_0.5s_backwards]">
                <h2 className="text-lg font-bold text-zinc-100 mb-4 text-center">Track & Find</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <Link href="/tracker" className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-600/15 to-emerald-900/10 p-4 hover:scale-[1.02] transition-all">
                        <Calendar className="w-6 h-6 text-emerald-400 mb-2" />
                        <h3 className="text-sm font-bold text-zinc-100">Tracker</h3>
                        <p className="text-[10px] text-zinc-400 mt-1">Log doses & cycles</p>
                    </Link>
                    <Link href="/suppliers" className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-600/15 to-amber-900/10 p-4 hover:scale-[1.02] transition-all">
                        <Store className="w-6 h-6 text-amber-400 mb-2" />
                        <h3 className="text-sm font-bold text-zinc-100">Suppliers</h3>
                        <p className="text-[10px] text-zinc-400 mt-1">Vetted sources</p>
                    </Link>
                    <Link href="/buy" className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-600/15 to-green-900/10 p-4 hover:scale-[1.02] transition-all">
                        <ShoppingCart className="w-6 h-6 text-green-400 mb-2" />
                        <h3 className="text-sm font-bold text-zinc-100">Where to Buy</h3>
                        <p className="text-[10px] text-zinc-400 mt-1">Compare prices</p>
                    </Link>
                    <Link href="/practitioners" className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-600/15 to-cyan-900/10 p-4 hover:scale-[1.02] transition-all">
                        <Stethoscope className="w-6 h-6 text-cyan-400 mb-2" />
                        <h3 className="text-sm font-bold text-zinc-100">Doctors</h3>
                        <p className="text-[10px] text-zinc-400 mt-1">Find practitioners</p>
                    </Link>
                    <Link href="/stacks" className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-600/15 to-pink-900/10 p-4 hover:scale-[1.02] transition-all">
                        <Users className="w-6 h-6 text-pink-400 mb-2" />
                        <h3 className="text-sm font-bold text-zinc-100">Stacks</h3>
                        <p className="text-[10px] text-zinc-400 mt-1">Community protocols</p>
                    </Link>
                    <Link href="/quiz" className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-600/15 to-violet-900/10 p-4 hover:scale-[1.02] transition-all">
                        <HelpCircle className="w-6 h-6 text-violet-400 mb-2" />
                        <h3 className="text-sm font-bold text-zinc-100">Find Your Stack</h3>
                        <p className="text-[10px] text-zinc-400 mt-1">5-question quiz</p>
                    </Link>
                    <Link href="/protocol" className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-600/15 to-teal-900/10 p-4 hover:scale-[1.02] transition-all">
                        <ClipboardList className="w-6 h-6 text-teal-400 mb-2" />
                        <h3 className="text-sm font-bold text-zinc-100">Protocol Builder</h3>
                        <p className="text-[10px] text-zinc-400 mt-1">Build & export</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
