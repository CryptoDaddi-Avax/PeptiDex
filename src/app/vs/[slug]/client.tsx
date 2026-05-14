"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Matchup } from "@/data/matchups";
import type { Peptide } from "@/data/types";
import {
    Trophy, ArrowRight, HelpCircle, ChevronDown,
    Scale, CheckCircle2, AlertCircle, Minus, User as UserIcon
} from "lucide-react";
import { useState } from "react";

function WinnerIcon({ winner }: { winner?: "a" | "b" | "tie" }) {
    if (!winner || winner === "tie") return <Minus className="w-3 h-3 text-zinc-600" />;
    return null;
}

export default function VsPageClient({
    matchup, pepA, pepB
}: { matchup: Matchup; pepA?: Peptide; pepB?: Peptide }) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-3">
                    <Scale className="w-3.5 h-3.5" /> Head-to-Head Comparison
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-zinc-100 mb-2">{matchup.title}</h1>
                <p className="text-sm text-zinc-400 max-w-lg mx-auto">{matchup.metaDescription}</p>
            </div>

            {/* VS Header Cards */}
            <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-center mb-6">
                <Link href={pepA ? `/library/${pepA.slug}` : "#"} className="p-4 rounded-2xl bg-violet-500/5 border border-violet-500/20 text-center hover:border-violet-500/40 transition-colors">
                    <h2 className="text-base font-bold text-violet-300 mt-1">{matchup.peptideA}</h2>
                    {pepA && <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2">{pepA.primary_benefits}</p>}
                </Link>
                <div className="text-lg font-black text-zinc-700">VS</div>
                <Link href={pepB ? `/library/${pepB.slug}` : "#"} className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-center hover:border-cyan-500/40 transition-colors">
                    <h2 className="text-base font-bold text-cyan-300 mt-1">{matchup.peptideB}</h2>
                    {pepB && <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2">{pepB.primary_benefits}</p>}
                </Link>
            </div>

            {/* Verdict */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 border border-zinc-800 mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-bold text-zinc-100">Verdict</h3>
                </div>
                <p className="text-base font-semibold text-zinc-200 mb-1">{matchup.verdict}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{matchup.verdictDetail}</p>
            </div>

            {/* Comparison Table */}
            {matchup.dosingSourceType && (
                <div className={`mb-4 px-4 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-2 border ${
                    matchup.dosingSourceType === "human_clinical_trial" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                    matchup.dosingSourceType === "animal_extrapolation" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                    "bg-zinc-800 border-zinc-700 text-zinc-400"
                }`}>
                    <AlertCircle className="w-3.5 h-3.5" />
                    {matchup.dosingSourceType === "human_clinical_trial" ? "Dosing metrics derived from published human clinical trials." :
                     matchup.dosingSourceType === "animal_extrapolation" ? "Dosing metrics are research protocols derived from animal dose-extrapolation." :
                     "Dosing metrics derived from community vendor protocols."}
                </div>
            )}
            <div className="rounded-2xl border border-zinc-800 overflow-hidden mb-6">
                <div className="grid grid-cols-[1fr,1fr,1fr] bg-zinc-900/80 px-3 py-2 border-b border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-500 uppercase">Category</span>
                    <span className="text-[10px] font-semibold text-violet-400 uppercase text-center">{matchup.peptideA}</span>
                    <span className="text-[10px] font-semibold text-cyan-400 uppercase text-center">{matchup.peptideB}</span>
                </div>
                {matchup.comparisonPoints.map((cp, i) => (
                    <div key={i} className={`grid grid-cols-[1fr,1fr,1fr] px-3 py-2.5 ${i % 2 === 0 ? "bg-zinc-900/20" : "bg-zinc-900/40"} ${i < matchup.comparisonPoints.length - 1 ? "border-b border-zinc-800/50" : ""}`}>
                        <span className="text-[11px] font-medium text-zinc-300">{cp.category}</span>
                        <span className={`text-[11px] text-center leading-relaxed ${cp.winner === "a" ? "text-emerald-400 font-medium" : "text-zinc-400"}`}>
                            {cp.winner === "a" && "✓ "}{cp.a}
                        </span>
                        <span className={`text-[11px] text-center leading-relaxed ${cp.winner === "b" ? "text-emerald-400 font-medium" : "text-zinc-400"}`}>
                            {cp.winner === "b" && "✓ "}{cp.b}
                        </span>
                    </div>
                ))}
            </div>

            {/* Deep Dive Content (Programmatic SEO) */}
            {matchup.deepDiveHtml && (
                <div className="prose prose-invert max-w-none text-zinc-300 text-sm mb-8 leading-relaxed pb-6 border-b border-zinc-800">
                    <div dangerouslySetInnerHTML={{ __html: matchup.deepDiveHtml }} />
                </div>
            )}

            {/* E-E-A-T Note */}
            {matchup.eeatNote && (
                <div className="mb-8 p-5 rounded-2xl bg-zinc-900 border border-gold/30">
                    <h3 className="text-sm font-bold text-gold mb-2 flex items-center gap-2">
                        <UserIcon className="w-4 h-4" /> Protocol Notes (N=1)
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed italic">
                        &quot;{matchup.eeatNote}&quot;
                    </p>
                </div>
            )}

            {/* FAQs (with Schema) */}
            <div className="mb-6">
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2 mb-3">
                    <HelpCircle className="w-4 h-4 text-amber-400" /> Frequently Asked Questions
                </h3>
                <div className="space-y-2">
                    {matchup.faqs.map((faq, i) => (
                        <div key={i} className="rounded-xl border border-zinc-800 overflow-hidden">
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-zinc-900/40 transition-colors"
                            >
                                <span className="text-sm text-zinc-200 font-medium pr-4">{faq.question}</span>
                                <ChevronDown className={`w-4 h-4 text-zinc-600 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                            </button>
                            {openFaq === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="px-4 pb-3"
                                >
                                    <p className="text-xs text-zinc-400 leading-relaxed">{faq.answer}</p>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
                {pepA && (
                    <Link href={`/library/${pepA.slug}`} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium hover:bg-violet-500/15 transition-colors">
                        View {matchup.peptideA} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                )}
                {pepB && (
                    <Link href={`/library/${pepB.slug}`} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium hover:bg-cyan-500/15 transition-colors">
                        View {matchup.peptideB} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                )}
            </div>
        </div>
    );
}
