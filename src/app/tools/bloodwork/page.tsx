"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { peptides } from "@/data/peptides";
import { Activity, AlertTriangle, ArrowRight, Info, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

interface Biomarker {
    id: string;
    name: string;
    unit: string;
    optimalRange: [number, number];
    description: string;
    relatedPeptides: { name: string; slug: string; reason: string }[];
}

const biomarkers: Biomarker[] = [
    {
        id: "igf1", name: "IGF-1", unit: "ng/mL", optimalRange: [115, 300], description: "Insulin-like Growth Factor 1. Indicator of GH activity. Low = potential for GH-boosting peptides.",
        relatedPeptides: [
            { name: "CJC-1295", slug: "cjc-1295", reason: "GHRH analog   stimulates pituitary GH release, directly raises IGF-1" },
            { name: "Ipamorelin", slug: "ipamorelin", reason: "Selective GHRP   clean GH pulse without cortisol/prolactin increase" },
            { name: "Sermorelin", slug: "sermorelin", reason: "Natural GHRH analog   gentler GH stimulation" },
            { name: "Tesamorelin", slug: "tesamorelin", reason: "FDA-approved GHRH analog   significant IGF-1 elevation" },
        ]
    },
    {
        id: "crp", name: "CRP (hs-CRP)", unit: "mg/L", optimalRange: [0, 1.0], description: "C-Reactive Protein   systemic inflammation marker. Elevated = chronic inflammation.",
        relatedPeptides: [
            { name: "BPC-157", slug: "bpc-157", reason: "Potent NF-κB inhibitor   reduces systemic inflammation" },
            { name: "KPV", slug: "kpv", reason: "Anti-inflammatory tripeptide   targets NF-κB and TNF-α" },
            { name: "Thymosin Alpha-1", slug: "thymosin-alpha-1", reason: "Immune modulator   reduces excessive inflammatory response" },
            { name: "TB-500", slug: "tb-500", reason: "Thymosin Beta-4 fragment   systemic anti-inflammatory and tissue repair" },
        ]
    },
    {
        id: "glucose", name: "Fasting Glucose", unit: "mg/dL", optimalRange: [70, 99], description: "Blood sugar after fasting. High = prediabetes risk. Peptides targeting glucose metabolism may help.",
        relatedPeptides: [
            { name: "Semaglutide", slug: "semaglutide", reason: "GLP-1 agonist   FDA-approved for diabetes, improves insulin sensitivity" },
            { name: "Tirzepatide", slug: "tirzepatide", reason: "Dual GIP/GLP-1 agonist   superior glucose control in trials" },
            { name: "MOTS-c", slug: "mots-c", reason: "Mitochondrial peptide   activates AMPK, enhances glucose uptake" },
            { name: "Retatrutide", slug: "retatrutide", reason: "Triple agonist   GLP-1/GIP/glucagon   investigational but promising" },
        ]
    },
    {
        id: "hba1c", name: "HbA1c", unit: "%", optimalRange: [4.0, 5.6], description: "3-month average blood sugar. Above 5.7% = prediabetes. Above 6.5% = diabetes.",
        relatedPeptides: [
            { name: "Semaglutide", slug: "semaglutide", reason: "Reduces HbA1c by 1-2% in clinical trials" },
            { name: "Tirzepatide", slug: "tirzepatide", reason: "Superior HbA1c reduction vs. semaglutide in SURPASS trials" },
            { name: "MOTS-c", slug: "mots-c", reason: "Improves metabolic flexibility and glucose handling" },
        ]
    },
    {
        id: "testosterone", name: "Testosterone (Total)", unit: "ng/dL", optimalRange: [400, 1000], description: "Primary male hormone. Low T can affect energy, recovery, mood, and body composition.",
        relatedPeptides: [
            { name: "CJC-1295", slug: "cjc-1295", reason: "GH elevation indirectly supports testosterone production" },
            { name: "Ipamorelin", slug: "ipamorelin", reason: "Clean GH pulse supports hormonal balance" },
            { name: "Sermorelin", slug: "sermorelin", reason: "Studies show GH therapy can improve testosterone" },
        ]
    },
    {
        id: "tsh", name: "TSH", unit: "mIU/L", optimalRange: [0.5, 4.0], description: "Thyroid Stimulating Hormone   reflects thyroid function. Out of range can affect metabolism.",
        relatedPeptides: [
            { name: "MOTS-c", slug: "mots-c", reason: "Mitochondrial peptide   supports overall metabolic function" },
            { name: "Tesamorelin", slug: "tesamorelin", reason: "GH normalization can support thyroid axis" },
        ]
    },
    {
        id: "vitd", name: "Vitamin D (25-OH)", unit: "ng/mL", optimalRange: [40, 80], description: "Critical for immune function, bone health, and hormone production. Most people are deficient.",
        relatedPeptides: [
            { name: "Thymosin Alpha-1", slug: "thymosin-alpha-1", reason: "Immune support while optimizing Vitamin D" },
        ]
    },
    {
        id: "ferritin", name: "Ferritin", unit: "ng/mL", optimalRange: [30, 200], description: "Iron storage marker. Low = potential iron deficiency and fatigue.",
        relatedPeptides: [
            { name: "BPC-157", slug: "bpc-157", reason: "Supports gut healing which can improve nutrient absorption" },
        ]
    },
];

type MarkerStatus = "optimal" | "low" | "high";

function getStatus(value: number, range: [number, number]): MarkerStatus {
    if (value < range[0]) return "low";
    if (value > range[1]) return "high";
    return "optimal";
}

export default function BloodworkPage() {
    const [values, setValues] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);

    const results = useMemo(() => {
        if (!showResults) return [];
        return biomarkers.filter((b) => values[b.id]).map((b) => {
            const val = Number(values[b.id]);
            const status = getStatus(val, b.optimalRange);
            return { ...b, value: val, status };
        });
    }, [showResults, values]);

    const outOfRange = results.filter((r) => r.status !== "optimal");
    const recommendations = useMemo(() => {
        const pepMap = new Map<string, { slug: string; reasons: string[] }>();
        outOfRange.forEach((r) => {
            r.relatedPeptides.forEach((p) => {
                const existing = pepMap.get(p.name);
                if (existing) existing.reasons.push(`${r.name}: ${p.reason}`);
                else pepMap.set(p.name, { slug: p.slug, reasons: [`${r.name}: ${p.reason}`] });
            });
        });
        return Array.from(pepMap.entries())
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.reasons.length - a.reasons.length);
    }, [outOfRange]);

    return (
        <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 pt-2">
        <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Home</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <Link href="/tools" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Tools</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <span className="text-zinc-200 font-medium text-xs">Bloodwork Analyzer</span>
      </nav>
      
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-5 h-5 text-red-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Blood Work Analyzer</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">Input your lab results to get personalized peptide insights</p>
            </motion.div>

            <div className="rounded-xl bg-amber-950/20 border border-amber-500/15 p-3 mb-6">
                <div className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-400/70">For educational purposes only. This tool does not diagnose conditions. Always consult a healthcare professional before making changes to your health regimen.</p>
                </div>
            </div>

            {/* Input Grid */}
            <div className="space-y-3 mb-6">
                {biomarkers.map((b) => (
                    <div key={b.id} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-zinc-200">{b.name}</span>
                            <span className="text-[10px] text-zinc-500">Optimal: {b.optimalRange[0]}-{b.optimalRange[1]} {b.unit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" step="any" placeholder={`Enter ${b.unit}`} value={values[b.id] || ""}
                                onChange={(e) => setValues({ ...values, [b.id]: e.target.value })}
                                className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500/50" />
                            <span className="text-xs text-zinc-500 w-12">{b.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => setShowResults(true)} disabled={Object.values(values).filter(Boolean).length === 0}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-semibold disabled:opacity-40 hover:from-red-400 hover:to-rose-400 transition-all mb-6">
                Analyze Results
            </button>

            {/* Results */}
            <AnimatePresence>
                {showResults && results.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        {/* Status Overview */}
                        <h3 className="text-sm font-bold text-zinc-200 mb-3">Your Results</h3>
                        <div className="space-y-2 mb-6">
                            {results.map((r) => (
                                <div key={r.id} className={`rounded-xl border p-3 flex items-center justify-between ${r.status === "optimal" ? "border-emerald-500/30 bg-emerald-500/5" : r.status === "low" ? "border-blue-500/30 bg-blue-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                                    <div className="flex items-center gap-2">
                                        {r.status === "optimal" ? <Minus className="w-4 h-4 text-emerald-400" /> : r.status === "low" ? <TrendingDown className="w-4 h-4 text-blue-400" /> : <TrendingUp className="w-4 h-4 text-red-400" />}
                                        <span className="text-sm font-semibold text-zinc-100">{r.name}: {r.value} {r.unit}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.status === "optimal" ? "bg-emerald-500/15 text-emerald-400" : r.status === "low" ? "bg-blue-500/15 text-blue-400" : "bg-red-500/15 text-red-400"}`}>
                                        {r.status === "optimal" ? "Optimal" : r.status === "low" ? "Below Range" : "Above Range"}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Recommendations */}
                        {recommendations.length > 0 ? (
                            <>
                                <h3 className="text-sm font-bold text-zinc-200 mb-3">Suggested Peptides Based on Your Results</h3>
                                <div className="space-y-2">
                                    {recommendations.map((rec) => {
                                        const pep = peptides.find((p) => p.slug === rec.slug);
                                        return (
                                            <Link key={rec.name} href={`/library/${rec.slug}`}
                                                className="block rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 hover:border-violet-500/40 transition-colors group">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-bold text-zinc-100 group-hover:text-white">
                                                        {getCategoryIcon(pep?.category || "")} {rec.name}
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        <span className="px-1.5 py-0.5 rounded bg-violet-500/15 text-[10px] font-bold text-violet-400">{rec.reasons.length} match{rec.reasons.length > 1 ? "es" : ""}</span>
                                                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-violet-400" />
                                                    </div>
                                                </div>
                                                {rec.reasons.map((reason, i) => (
                                                    <p key={i} className="text-[11px] text-zinc-400 leading-relaxed">• {reason}</p>
                                                ))}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-6">
                                <p className="text-sm text-emerald-400 font-medium">✅ All markers within optimal range!</p>
                                <p className="text-xs text-zinc-500 mt-1">No specific peptide interventions suggested at this time.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
