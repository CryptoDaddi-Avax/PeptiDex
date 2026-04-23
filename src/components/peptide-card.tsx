"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Peptide, EvidenceLevel } from "@/data/types";
import { ExternalLink, BadgeCheck } from "lucide-react";

function EvidenceBadge({ level }: { level: EvidenceLevel }) {
    const styles: Record<string, string> = {
        "very-strong": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        strong: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        "moderate-strong": "bg-teal-500/15 text-teal-400 border-teal-500/30",
        moderate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        preclinical: "bg-blue-500/15 text-blue-400 border-blue-500/30",
        emerging: "bg-violet-500/15 text-violet-400 border-violet-500/30",
        anecdotal: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
    };
    const label = level.replace(/-/g, " ");
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${styles[level] || styles.preclinical}`}>
            {label}
        </span>
    );
}

export { EvidenceBadge };

export function PeptideCard({ peptide, index = 0, animate = true }: { peptide: Peptide; index?: number; animate?: boolean }) {
    const benefits = peptide.primary_benefits.split(",").map((b) => b.trim()).slice(0, 2);

    return (
        <motion.div
            // Only stagger on initial mount — skip animation during filter/search changes for instant INP
            initial={animate ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={animate ? { delay: index * 0.04, duration: 0.3 } : { duration: 0 }}
        >
            <Link href={`/library/${peptide.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm p-4 md:p-5 transition-all duration-300 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-0.5">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-500/5 to-transparent rounded-bl-full" />
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-zinc-100 group-hover:text-violet-300 transition-colors">
                                {peptide.name}
                            </h3>
                            {peptide.is_fda_approved && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30">
                                    <BadgeCheck className="w-3 h-3 text-emerald-400" />
                                    <span className="text-[9px] font-bold text-emerald-400 uppercase">FDA</span>
                                </span>
                            )}
                        </div>
                        <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 transition-colors flex-shrink-0 mt-1" />
                    </div>
                    <p className="text-xs font-medium text-violet-400/80 mb-3 uppercase tracking-wider">{peptide.category}</p>
                    <div className="space-y-1.5 mb-4">
                        {benefits.map((b, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <span className="text-violet-400 mt-0.5 text-xs">◆</span>
                                <span className="text-sm text-zinc-400 leading-tight">{b}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {peptide.key_studies.length > 0 && (
                            <EvidenceBadge level={peptide.key_studies[0].evidence_level} />
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
