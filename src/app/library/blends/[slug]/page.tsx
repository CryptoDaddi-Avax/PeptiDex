"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { peptideBlends } from "@/data/blends";
import { ArrowLeft, FlaskConical, Clock, Beaker, AlertTriangle, BookOpen, TrendingUp, ExternalLink, ShieldCheck } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

export default function BlendDetailPage() {
    const params = useParams();
    const blend = peptideBlends.find((b) => b.slug === params.slug);

    if (!blend) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-12 text-center">
                <p className="text-zinc-400">Blend not found.</p>
                <Link href="/library/blends" className="text-violet-400 underline mt-2 inline-block">
                    ← Back to Blends
                </Link>
            </div>
        );
    }

    const timelineSteps = [
        { key: "week_1", label: "Week 1", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
        { key: "week_2_4", label: "Weeks 2–4", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
        { key: "month_2_3", label: "Months 2–3", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
        { key: "long_term", label: "Long-term", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    ] as const;

    return (
        <div className="max-w-3xl mx-auto px-3 py-4 md:px-4 md:py-6">
            {/* Back Link */}
            <Link href="/library/blends" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-violet-400 transition-colors mb-4">
                <ArrowLeft className="w-3 h-3" /> All Blends
            </Link>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{getCategoryIcon(blend.category)}</span>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-zinc-100">{blend.name}</h1>
                        <p className="text-xs text-zinc-500 italic">&quot;{blend.nickname}&quot;</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {blend.components.map((comp) => (
                        <span key={comp} className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-medium text-violet-300">
                            {comp}
                        </span>
                    ))}
                    <span className="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-zinc-400">
                        {blend.category}
                    </span>
                </div>
            </motion.div>

            {/* Benefits */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} className="mb-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Benefits</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{blend.primary_benefits}</p>
            </motion.div>

            {/* Why This Blend? */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-4 p-4 rounded-2xl bg-violet-500/5 border border-violet-500/15">
                <div className="flex items-center gap-2 mb-2">
                    <FlaskConical className="w-4 h-4 text-violet-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Why This Blend?</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{blend.why_blend}</p>
            </motion.div>

            {/* Mechanism */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                    <Beaker className="w-4 h-4 text-cyan-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Mechanism of Action</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{blend.mechanism}</p>
            </motion.div>

            {/* Dosing */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
                <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Dosing Protocol</h2>
                </div>
                <div className="space-y-1.5">
                    <p className="text-xs text-zinc-400"><strong className="text-zinc-300">Typical Ratio:</strong> {blend.typical_ratio}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{blend.dosing_notes}</p>
                </div>
            </motion.div>

            {/* Outcomes Timeline */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mb-4">
                <h2 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-violet-400" />
                    Expected Timeline
                </h2>
                <div className="space-y-2">
                    {timelineSteps.map(({ key, label, color, bg }) => {
                        const text = blend.outcomes_timeline[key];
                        if (!text) return null;
                        return (
                            <div key={key} className={`p-3 rounded-xl ${bg} border`}>
                                <p className={`text-xs font-semibold ${color} mb-0.5`}>{label}</p>
                                <p className="text-xs text-zinc-300">{text}</p>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Studies */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Supporting Studies</h2>
                </div>
                <div className="space-y-2">
                    {blend.key_studies.map((study, i) => (
                        <a key={i} href={study.pubmed_url} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-blue-500/30 transition-colors group">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-xs font-medium text-zinc-200 group-hover:text-blue-300 transition-colors">{study.title}</p>
                                    <p className="text-[10px] text-zinc-500 mt-0.5">{study.summary}</p>
                                </div>
                                <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                            </div>
                            <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-medium bg-blue-500/10 text-blue-400 mt-1.5">
                                {study.evidence_level}
                            </span>
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* Safety */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mb-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <h2 className="text-sm font-semibold text-zinc-200">Safety Notes</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{blend.safety_notes}</p>
            </motion.div>

            {/* Component Links */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-6">
                <h2 className="text-sm font-semibold text-zinc-200 mb-3">📚 Individual Peptide Profiles</h2>
                <div className="flex flex-wrap gap-2">
                    {blend.components.map((comp) => {
                        const compSlug = comp.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                        return (
                            <Link key={comp} href={`/library/${compSlug}`} className="px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-medium text-violet-300 hover:bg-violet-500/10 hover:border-violet-500/30 transition-colors">
                                {comp} →
                            </Link>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
