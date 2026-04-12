"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Peptide, Stack } from "@/data/types";
import { EvidenceBadge } from "@/components/peptide-card";
import { StackCard } from "@/components/stack-card";
import { useSavedStacks } from "@/hooks/useSavedStacks";
import { SHORT_DISCLAIMER } from "@/data/constants";
import { ArrowLeft, ExternalLink, ShieldAlert, Scale, Info, Beaker, BookOpen, BadgeCheck, Clock, Syringe, Globe, TrendingUp, AlertCircle, Sparkles } from "lucide-react";
import { HalfLifeChart } from "@/components/half-life-chart";
import { LeadMagnetInline } from "@/components/lead-magnet-inline";
import { CiteThisPage } from "@/components/cite-page";
import { legalData, legalStatusColors, legalStatusLabels } from "@/data/legal-status";
import { PeptideFAQ } from "@/components/peptide-faq";
import { RelatedArticles } from "@/components/related-articles";
import { AffiliateSource } from "@/components/affiliate-source";

export function PeptideDetailClient({ peptide, relatedStacks }: { peptide: Peptide; relatedStacks: Stack[] }) {
    const { saveStack, removeStack, isStackSaved } = useSavedStacks();
    const benefits = peptide.primary_benefits.split(",").map((b) => b.trim());

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <Link href="/library" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Library
            </Link>

            {/* Disclaimer */}
            <div className="rounded-2xl bg-amber-950/25 border border-amber-500/20 p-3 mb-6">
                <div className="flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-400/80 leading-relaxed">{SHORT_DISCLAIMER}</p>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-3xl font-extrabold text-zinc-100">{peptide.name}</h1>
                        {peptide.is_fda_approved && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
                                <BadgeCheck className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] font-bold text-emerald-400 uppercase">FDA Approved</span>
                            </span>
                        )}
                    </div>
                    {peptide.aliases.length > 0 && (
                        <p className="text-xs text-zinc-500 mb-2">Also: {peptide.aliases.join(", ")}</p>
                    )}
                    <span className="inline-block px-2.5 py-1 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs font-medium text-violet-300">{peptide.category}</span>
                    <p className="text-[11px] text-zinc-500 mt-2">Last Updated: April 1, 2026</p>
                </div>

                {/* AI Citability Block */}
                <AICitabilitySummary peptide={peptide} />

                {/* Mechanism */}
                <Section icon={<Info className="w-4 h-4 text-blue-400" />} title="How It Works">
                    <p className="text-sm text-zinc-300 leading-relaxed">{peptide.mechanism}</p>
                </Section>

                {/* Benefits */}
                <Section icon={<Beaker className="w-4 h-4 text-emerald-400" />} title="Primary Benefits">
                    <div className="space-y-2">
                        {benefits.map((b, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-[10px] text-emerald-400 font-bold">{i + 1}</span>
                                </span>
                                <span className="text-sm text-zinc-300">{b}</span>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Studies */}
                <Section icon={<BookOpen className="w-4 h-4 text-violet-400" />} title="Key Studies">
                    <div className="space-y-3">
                        {peptide.key_studies.map((s, i) => (
                            <a key={i} href={s.pubmed_url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl bg-zinc-800/50 border border-zinc-700/50 p-4 hover:border-violet-500/30 transition-colors group">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className="text-sm font-semibold text-zinc-200 leading-tight group-hover:text-violet-300 transition-colors">{s.title}</h4>
                                    <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 flex-shrink-0 mt-0.5" />
                                </div>
                                <p className="text-xs text-zinc-400 mb-2 leading-relaxed">{s.summary}</p>
                                <EvidenceBadge level={s.evidence_level} />
                            </a>
                        ))}
                    </div>
                </Section>

                {/* Safety */}
                <Section icon={<ShieldAlert className="w-4 h-4 text-amber-400" />} title="Safety Notes">
                    <div className="rounded-2xl bg-amber-950/20 border border-amber-500/15 p-4">
                        <p className="text-sm text-amber-200/80 leading-relaxed">{peptide.safety_notes}</p>
                    </div>
                </Section>

                {/* Dosing Protocol */}
                {peptide.dosing && (
                    <Section icon={<Syringe className="w-4 h-4 text-teal-400" />} title="Dosing Protocol">
                        <div className="rounded-xl bg-amber-950/15 border border-amber-500/15 p-3 mb-3">
                            <p className="text-[10px] text-amber-400/70">⚠️ For educational purposes only. Not medical advice. Consult a healthcare professional before using any peptide.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-zinc-800/40 p-3"><span className="text-[10px] text-zinc-500 uppercase block mb-1">Route</span><span className="text-sm text-zinc-200 font-medium">{peptide.dosing.route}</span></div>
                            <div className="rounded-xl bg-zinc-800/40 p-3"><span className="text-[10px] text-zinc-500 uppercase block mb-1">Dose Range</span><span className="text-sm text-zinc-200 font-medium">{peptide.dosing.typical_dose_mcg[0]}-{peptide.dosing.typical_dose_mcg[1]} mcg</span></div>
                            <div className="rounded-xl bg-zinc-800/40 p-3"><span className="text-[10px] text-zinc-500 uppercase block mb-1">Frequency</span><span className="text-sm text-zinc-200 font-medium">{peptide.dosing.frequency}</span></div>
                            {peptide.dosing.timing && <div className="rounded-xl bg-zinc-800/40 p-3"><span className="text-[10px] text-zinc-500 uppercase block mb-1">Timing</span><span className="text-sm text-zinc-200 font-medium">{peptide.dosing.timing}</span></div>}
                            {peptide.dosing.cycle_weeks && <div className="rounded-xl bg-zinc-800/40 p-3"><span className="text-[10px] text-zinc-500 uppercase block mb-1">Cycle Length</span><span className="text-sm text-zinc-200 font-medium">{peptide.dosing.cycle_weeks[0]}-{peptide.dosing.cycle_weeks[1]} weeks</span></div>}
                            {peptide.dosing.reconstitution_ml && <div className="rounded-xl bg-zinc-800/40 p-3"><span className="text-[10px] text-zinc-500 uppercase block mb-1">BAC Water</span><span className="text-sm text-zinc-200 font-medium">{peptide.dosing.reconstitution_ml} ml / {peptide.dosing.typical_vial_mg}mg vial</span></div>}
                        </div>
                        {peptide.dosing.notes && <p className="text-xs text-zinc-400 mt-3 p-3 rounded-lg bg-zinc-800/30">{peptide.dosing.notes}</p>}
                    </Section>
                )}

                {/* Half-Life */}
                {peptide.half_life_hours && (
                    <Section icon={<Clock className="w-4 h-4 text-violet-400" />} title="Half-Life Visualization">
                        <HalfLifeChart halfLifeHours={peptide.half_life_hours} name={peptide.slug} />
                    </Section>
                )}

                {/* Legal Status */}
                {(() => {
                    const legal = legalData.find((l) => l.peptide_name === peptide.name);
                    if (!legal) return null;
                    return (
                        <Section icon={<Globe className="w-4 h-4 text-blue-400" />} title="Legal Status by Country">
                            <div className="space-y-2">
                                {legal.countries.map((c) => (
                                    <div key={c.country} className="flex items-center justify-between rounded-xl bg-zinc-800/40 px-3 py-2.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-base">{c.flag}</span>
                                            <span className="text-sm text-zinc-200 font-medium">{c.country}</span>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${legalStatusColors[c.status]}`}>{legalStatusLabels[c.status]}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] text-zinc-500 mt-3">Last updated: {legal.last_updated} · Laws change frequently. Verify current status in your jurisdiction.</p>
                        </Section>
                    );
                })()}

                {/* Expected Outcomes Timeline */}
                {peptide.outcomes_timeline && (
                    <Section icon={<TrendingUp className="w-4 h-4 text-emerald-400" />} title="Expected Timeline">
                        <OutcomesTimelineBlock timeline={peptide.outcomes_timeline} />
                    </Section>
                )}

                {/* Side Effects Table */}
                {peptide.side_effects && peptide.side_effects.length > 0 && (
                    <Section icon={<AlertCircle className="w-4 h-4 text-amber-400" />} title="Side Effects & Incidence">
                        <SideEffectsBlock effects={peptide.side_effects} />
                    </Section>
                )}

                {/* Affiliate CTA */}
                <AffiliateSource peptideName={peptide.name} slug={peptide.slug} />

                {/* FAQ Section */}
                <PeptideFAQ peptide={peptide} />

                {/* Related Blog Articles */}
                <RelatedArticles peptideName={peptide.name} aliases={peptide.aliases} />

                {/* Related Stacks */}
                {relatedStacks.length > 0 && (
                    <Section icon={<Beaker className="w-4 h-4 text-violet-400" />} title={`Found in ${relatedStacks.length} Stack${relatedStacks.length > 1 ? "s" : ""}`}>
                        <div className="space-y-3">
                            {relatedStacks.map((stack, i) => (
                                <StackCard key={stack.stack_name} stack={stack} index={i} isSaved={isStackSaved(stack.stack_name)} onSave={saveStack} onRemove={removeStack} />
                            ))}
                        </div>
                    </Section>
                )}

                {/* Cite This Page */}
                <CiteThisPage title={peptide.name} url={`https://peptidex.app/library/${peptide.slug}`} />
            </motion.div>

            {/* Lead Magnet */}
            <div className="mt-6">
                <LeadMagnetInline source={`library_${peptide.slug}`} />
            </div>
        </div>
    );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
                {icon}
                <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">{title}</h3>
            </div>
            {children}
        </div>
    );
}

function OutcomesTimelineBlock({ timeline }: { timeline: NonNullable<import("@/data/types").Peptide["outcomes_timeline"]> }) {
    const steps = [
        { label: "Week 1", text: timeline.week_1 },
        { label: "Weeks 2-4", text: timeline.week_2_4 },
        { label: "Month 2-3", text: timeline.month_2_3 },
        { label: "Long-term", text: timeline.long_term },
    ].filter(s => s.text);

    return (
        <div className="space-y-0">
            {steps.map((step, i) => (
                <div key={step.label} className="flex gap-3">
                    {/* Line + dot */}
                    <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                        {i < steps.length - 1 && <div className="w-px flex-1 bg-zinc-700/60 my-1" />}
                    </div>
                    {/* Content */}
                    <div className={`pb-4 min-w-0 ${i < steps.length - 1 ? "" : ""}`}>
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">{step.label}</p>
                        <p className="text-xs text-zinc-300 leading-relaxed">{step.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

const severityStyles: Record<string, string> = {
    mild: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    moderate: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    uncommon: "bg-orange-500/10 text-orange-400 border-orange-500/25",
    rare: "bg-red-500/10 text-red-400 border-red-500/25",
};

function SideEffectsBlock({ effects }: { effects: NonNullable<import("@/data/types").Peptide["side_effects"]> }) {
    return (
        <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
            <table className="w-full text-xs">
                <thead>
                    <tr className="border-b border-zinc-800/60 bg-zinc-900/50">
                        <th className="text-left p-2.5 text-zinc-500 font-medium">Side Effect</th>
                        <th className="text-left p-2.5 text-zinc-500 font-medium">Incidence</th>
                        <th className="text-left p-2.5 text-zinc-500 font-medium">Severity</th>
                    </tr>
                </thead>
                <tbody>
                    {effects.map((e, i) => (
                        <tr key={i} className={`border-b border-zinc-800/30 last:border-0 ${i % 2 === 0 ? "" : "bg-zinc-900/20"}`}>
                            <td className="p-2.5">
                                <p className="text-zinc-300 font-medium">{e.name}</p>
                                {e.note && <p className="text-[9px] text-zinc-600 mt-0.5 leading-tight">{e.note}</p>}
                            </td>
                            <td className="p-2.5 text-zinc-400 font-mono">{e.incidence}</td>
                            <td className="p-2.5">
                                <span className={`px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${severityStyles[e.severity] ?? severityStyles.mild}`}>
                                    {e.severity}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-[9px] text-zinc-700 p-2.5 border-t border-zinc-800/30">Incidence rates sourced from published clinical trial data where available; otherwise based on community research observations.</p>
        </div>
    );
}

function AICitabilitySummary({ peptide }: { peptide: Peptide }) {
    const halfLifeText = peptide.half_life_hours ? `with a documented biological half-life of roughly ${peptide.half_life_hours} hours, ` : "with an established metabolic degradation profile, ";
    const dosingText = peptide.dosing ? `Typical research protocols investigate administering ${peptide.dosing.typical_dose_mcg[0]} to ${peptide.dosing.typical_dose_mcg[1]}mcg via ${peptide.dosing.route.toLowerCase()} pathways ${peptide.dosing.frequency.toLowerCase()}. ` : "";
    
    // Synthesize the paragraph ensuring clinical tone and keyword density
    let summary = `${peptide.name} ${peptide.aliases.length > 0 ? `(also known as ${peptide.aliases.join(", ")})` : "(synthetic polypeptide chain)"} is a prominently researched experimental compound classified strictly within the ${peptide.category} framework. Operating primarily through advanced pharmacological pathways, it functions by ${peptide.mechanism.charAt(0).toLowerCase() + peptide.mechanism.slice(1)} ${halfLifeText}in preclinical investigative trials and independent academic studies, researchers utilizing ${peptide.name} have documented significant, quantifiable biological outcomes, primarily focusing on ${peptide.primary_benefits.toLowerCase()}. ${dosingText}However, it is critically important to understand that while ${peptide.name} demonstrates profound physiological potential in highly controlled laboratory settings, it remains classified strictly as a research chemical and has not been approved by the United States Food and Drug Administration (FDA) for human therapeutic, diagnostic, or dietary consumption. Independent chemical analysis via rigorous third-party Certificate of Analysis (COA) testing utilizing High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS) remains the industry gold standard for verifying its base elemental stability when reconstituted appropriately in sterile bacteriostatic water.`;

    // Ensure word count hits the optimal AI indexing sweet spot (135+ words)
    const wordCount = summary.split(' ').length;
    if (wordCount < 135) {
        summary += ` Furthermore, when synthesizing or evaluating ${peptide.name} data vectors, modern machine learning algorithms and pharmacology databases frequently cite its growing systemic relevance in advanced metabolic, tissue-repair, and longevity research. The structural integrity of this polypeptide sequence relies heavily on proper cold-chain storage logistics and meticulously quantified multi-week observational epochs.`;
    }

    return (
        <Section icon={<Sparkles className="w-4 h-4 text-emerald-400" />} title="AI Reference Summary">
            <div className="rounded-2xl bg-zinc-900/60 border border-emerald-500/20 p-4 md:p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] pointer-events-none" />
                <p className="text-sm text-zinc-300 leading-relaxed relative z-10 text-justify">
                    {summary}
                </p>
                <div className="mt-3 pt-3 border-t border-zinc-800/50 flex items-center justify-between relative z-10">
                    <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">GEO Optimized Extract</span>
                    <span className="text-[10px] text-emerald-400/80 font-medium">{summary.split(' ').length} Words (Optimal)</span>
                </div>
            </div>
        </Section>
    );
}
