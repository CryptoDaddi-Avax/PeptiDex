"use client";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Peptide } from "@/data/types";
import {
    ShieldCheck, Beaker, FlaskConical, HelpCircle, Filter, Share2, Code2, X, Copy, Check,
    ExternalLink, ChevronDown, Flame, Dumbbell, HeartPulse, Brain, Moon, Sparkles, Shield,
    Pill, Clock, Activity
} from "lucide-react";

// ── Evidence Tier Logic ──────────────────────────────────────────────
type EvidenceTier = "fda-approved" | "strong-clinical" | "moderate-preclinical" | "emerging";

const TIER_CONFIG: Record<EvidenceTier, { label: string; color: string; border: string; bg: string; icon: React.ReactNode; description: string }> = {
    "fda-approved": {
        label: "FDA Approved",
        color: "text-emerald-400",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/8",
        icon: <ShieldCheck className="w-4 h-4" />,
        description: "Approved by the U.S. FDA for at least one clinical indication"
    },
    "strong-clinical": {
        label: "Strong Clinical Evidence",
        color: "text-blue-400",
        border: "border-blue-500/30",
        bg: "bg-blue-500/8",
        icon: <Beaker className="w-4 h-4" />,
        description: "Published Phase 2/3 human trials with significant efficacy data"
    },
    "moderate-preclinical": {
        label: "Moderate / Preclinical Evidence",
        color: "text-amber-400",
        border: "border-amber-500/30",
        bg: "bg-amber-500/8",
        icon: <FlaskConical className="w-4 h-4" />,
        description: "Animal models, early human data, or strong mechanistic studies"
    },
    "emerging": {
        label: "Emerging / Limited Evidence",
        color: "text-zinc-400",
        border: "border-zinc-600",
        bg: "bg-zinc-800/50",
        icon: <HelpCircle className="w-4 h-4" />,
        description: "Limited published data, preliminary research, or anecdotal evidence"
    },
};

const TIER_ORDER: EvidenceTier[] = ["fda-approved", "strong-clinical", "moderate-preclinical", "emerging"];

function computeTier(peptide: Peptide): EvidenceTier {
    if (peptide.is_fda_approved) return "fda-approved";
    const levels = peptide.key_studies.map(s => s.evidence_level);
    if (levels.includes("very-strong") || levels.includes("strong")) return "strong-clinical";
    if (levels.includes("moderate-strong") || levels.includes("moderate") || levels.includes("preclinical")) return "moderate-preclinical";
    return "emerging";
}

// ── Goal Filter Logic ────────────────────────────────────────────────
type GoalFilter = "all" | "fat-loss" | "muscle-growth" | "recovery" | "longevity" | "cognitive" | "immune" | "sleep" | "metabolic" | "skin" | "gut-health" | "hormonal";

const GOAL_FILTERS: { id: GoalFilter; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "All", icon: <Filter className="w-3.5 h-3.5" /> },
    { id: "fat-loss", label: "Fat Loss", icon: <Flame className="w-3.5 h-3.5" /> },
    { id: "muscle-growth", label: "Muscle Growth", icon: <Dumbbell className="w-3.5 h-3.5" /> },
    { id: "recovery", label: "Recovery", icon: <HeartPulse className="w-3.5 h-3.5" /> },
    { id: "longevity", label: "Longevity", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "cognitive", label: "Cognitive", icon: <Brain className="w-3.5 h-3.5" /> },
    { id: "immune", label: "Immune", icon: <Shield className="w-3.5 h-3.5" /> },
    { id: "sleep", label: "Sleep", icon: <Moon className="w-3.5 h-3.5" /> },
    { id: "metabolic", label: "Metabolic", icon: <Activity className="w-3.5 h-3.5" /> },
    { id: "skin", label: "Skin", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "gut-health", label: "Gut Health", icon: <Pill className="w-3.5 h-3.5" /> },
];

// map each peptide slug to its applicable goals
const PEPTIDE_GOALS: Record<string, GoalFilter[]> = {
    "semaglutide": ["fat-loss", "metabolic"],
    "tirzepatide": ["fat-loss", "metabolic"],
    "retatrutide": ["fat-loss", "metabolic"],
    "aod-9604": ["fat-loss"],
    "tesamorelin": ["fat-loss", "muscle-growth"],
    "mots-c": ["fat-loss", "longevity", "metabolic"],
    "cjc-1295": ["muscle-growth", "hormonal"],
    "ipamorelin": ["muscle-growth", "sleep"],
    "sermorelin": ["muscle-growth"],
    "igf-1-lr3": ["muscle-growth"],
    "follistatin-344": ["muscle-growth"],
    "mk-677": ["muscle-growth", "sleep"],
    "ghrp-2": ["muscle-growth"],
    "ghrp-6": ["muscle-growth"],
    "hexarelin": ["muscle-growth"],
    "bpc-157": ["recovery", "gut-health", "skin"],
    "tb-500": ["recovery"],
    "ghk-cu": ["skin", "longevity", "recovery"],
    "kpv": ["gut-health", "recovery", "immune"],
    "ss-31": ["longevity", "recovery"],
    "epitalon": ["longevity", "sleep"],
    "semax": ["cognitive"],
    "selank": ["cognitive", "sleep"],
    "dsip": ["sleep"],
    "thymosin-alpha-1": ["immune"],
    "ll-37": ["immune"],
    "pt-141": ["hormonal"],
    "kisspeptin-10": ["hormonal"],
    "melanotan-ii": ["skin"],
    "nad": ["longevity", "metabolic"],
    "glutathione": ["longevity", "immune"],
    "cagrilintide": ["fat-loss", "metabolic"],
    "tesofensine": ["fat-loss"],
};

// ── Component ────────────────────────────────────────────────────────
export function EvidenceMapClient({ peptides }: { peptides: Peptide[] }) {
    const [goalFilter, setGoalFilter] = useState<GoalFilter>("all");
    const [tierFilter, setTierFilter] = useState<EvidenceTier | "all">("all");
    const [showEmbed, setShowEmbed] = useState(false);
    const [copied, setCopied] = useState<"share" | "embed" | null>(null);

    // compute tiers for all peptides
    const peptidesWithTier = useMemo(() =>
        peptides.map(p => ({ ...p, tier: computeTier(p) })),
        [peptides]
    );

    // filter
    const filtered = useMemo(() => {
        return peptidesWithTier.filter(p => {
            if (tierFilter !== "all" && p.tier !== tierFilter) return false;
            if (goalFilter !== "all") {
                const goals = PEPTIDE_GOALS[p.slug] || [];
                if (!goals.includes(goalFilter)) return false;
            }
            return true;
        });
    }, [peptidesWithTier, goalFilter, tierFilter]);

    // group by tier
    const grouped = useMemo(() => {
        const map: Record<EvidenceTier, typeof filtered> = {
            "fda-approved": [],
            "strong-clinical": [],
            "moderate-preclinical": [],
            "emerging": [],
        };
        filtered.forEach(p => map[p.tier].push(p));
        return map;
    }, [filtered]);

    // counts
    const tierCounts = useMemo(() => {
        const c: Record<EvidenceTier, number> = { "fda-approved": 0, "strong-clinical": 0, "moderate-preclinical": 0, "emerging": 0 };
        peptidesWithTier.forEach(p => c[p.tier]++);
        return c;
    }, [peptidesWithTier]);

    const handleShare = useCallback(async () => {
        const url = "https://peptidex.app/tools/evidence-map";
        try {
            if (navigator.share) {
                await navigator.share({ title: "Peptide Evidence Map — PeptiDex", url });
            } else {
                await navigator.clipboard.writeText(url);
                setCopied("share");
                setTimeout(() => setCopied(null), 2000);
            }
        } catch {
            await navigator.clipboard.writeText(url);
            setCopied("share");
            setTimeout(() => setCopied(null), 2000);
        }
    }, []);

    const embedCode = `<iframe src="https://peptidex.app/tools/evidence-map" width="100%" height="800" style="border:none;border-radius:12px;" title="Peptide Evidence Map — PeptiDex"></iframe>`;

    const handleCopyEmbed = useCallback(async () => {
        await navigator.clipboard.writeText(embedCode);
        setCopied("embed");
        setTimeout(() => setCopied(null), 2000);
    }, [embedCode]);

    return (
        <div className="space-y-8">
            {/* ── Tier Summary Cards ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TIER_ORDER.map(tier => {
                    const cfg = TIER_CONFIG[tier];
                    const active = tierFilter === tier;
                    return (
                        <button
                            key={tier}
                            onClick={() => setTierFilter(active ? "all" : tier)}
                            className={`relative p-4 rounded-xl border transition-all text-left group ${active ? `${cfg.border} ${cfg.bg} ring-1 ring-${tier === "fda-approved" ? "emerald" : tier === "strong-clinical" ? "blue" : tier === "moderate-preclinical" ? "amber" : "zinc"}-500/20` : "border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60"}`}
                        >
                            <div className={`flex items-center gap-2 mb-1 ${cfg.color}`}>
                                {cfg.icon}
                                <span className="text-xs font-bold uppercase tracking-wider">{cfg.label}</span>
                            </div>
                            <div className="text-2xl font-extrabold text-zinc-100">{tierCounts[tier]}</div>
                            <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{cfg.description}</p>
                            {active && <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${tier === "fda-approved" ? "bg-emerald-400" : tier === "strong-clinical" ? "bg-blue-400" : tier === "moderate-preclinical" ? "bg-amber-400" : "bg-zinc-400"}`} />}
                        </button>
                    );
                })}
            </div>

            {/* ── Goal Filters ── */}
            <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-2">Filter by Research Goal</p>
                <div className="flex flex-wrap gap-2">
                    {GOAL_FILTERS.map(g => (
                        <button
                            key={g.id}
                            onClick={() => setGoalFilter(g.id === goalFilter ? "all" : g.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${goalFilter === g.id ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border border-zinc-700/50"}`}
                        >
                            {g.icon} {g.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Share / Embed Buttons ── */}
            <div className="flex flex-wrap gap-3">
                <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold hover:bg-zinc-700 transition-colors">
                    {copied === "share" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    {copied === "share" ? "Link Copied!" : "Share this Map"}
                </button>
                <button onClick={() => setShowEmbed(!showEmbed)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold hover:bg-zinc-700 transition-colors">
                    <Code2 className="w-3.5 h-3.5" /> Embed this Visualization
                </button>
            </div>

            {/* ── Embed Code Modal ── */}
            <AnimatePresence>
                {showEmbed && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-zinc-300">Embed Code — Copy &amp; Paste into your site</p>
                            <button onClick={() => setShowEmbed(false)} className="text-zinc-500 hover:text-zinc-300"><X className="w-4 h-4" /></button>
                        </div>
                        <pre className="bg-zinc-950 rounded-lg p-3 text-[11px] text-violet-300 overflow-x-auto font-mono border border-zinc-800">{embedCode}</pre>
                        <button onClick={handleCopyEmbed} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 transition-colors">
                            {copied === "embed" ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Embed Code</>}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Results Count ── */}
            <p className="text-xs text-zinc-500">Showing <span className="text-zinc-300 font-bold">{filtered.length}</span> of {peptides.length} peptides</p>

            {/* ── Evidence Tiers ── */}
            {TIER_ORDER.map(tier => {
                const items = grouped[tier];
                if (items.length === 0) return null;
                const cfg = TIER_CONFIG[tier];

                return (
                    <section key={tier} className="space-y-4">
                        {/* Tier Header */}
                        <div className={`flex items-center gap-3 pb-2 border-b ${cfg.border}`}>
                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${cfg.bg} ${cfg.color}`}>
                                {cfg.icon}
                            </div>
                            <div>
                                <h2 className={`text-base font-bold ${cfg.color}`}>{cfg.label}</h2>
                                <p className="text-[10px] text-zinc-500">{items.length} compound{items.length !== 1 ? "s" : ""}</p>
                            </div>
                        </div>

                        {/* Peptide Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {items.map((p, i) => (
                                <motion.div
                                    key={p.slug}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                >
                                    <Link
                                        href={`/library/${p.slug}`}
                                        className={`block p-4 rounded-xl border ${cfg.border} ${cfg.bg} hover:brightness-125 transition-all group`}
                                    >
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="text-sm font-bold text-zinc-100 group-hover:text-violet-300 transition-colors">{p.name}</h3>
                                            <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-violet-400 transition-colors flex-shrink-0 mt-0.5" />
                                        </div>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mb-1.5">{p.category}</p>
                                        <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">{p.primary_benefits}</p>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-[10px] font-bold ${cfg.color} flex items-center gap-1`}>
                                                {cfg.icon} {cfg.label}
                                            </span>
                                            <span className="text-[10px] text-zinc-500 font-medium">{p.key_studies.length} studies</span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                );
            })}

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-zinc-500 text-sm">No peptides match the current filters.</p>
                    <button onClick={() => { setGoalFilter("all"); setTierFilter("all"); }} className="mt-3 text-xs text-violet-400 hover:text-violet-300 font-semibold">
                        Clear all filters
                    </button>
                </div>
            )}

            {/* ── Methodology ── */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 md:p-6 space-y-3">
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">Methodology: How Evidence Tiers Are Assigned</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-400 leading-relaxed">
                    <div>
                        <p className="text-zinc-300 font-semibold mb-1 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> FDA Approved</p>
                        <p>Peptides that have received U.S. FDA approval for at least one clinical indication, confirmed by the FDA Orange Book or drug label database.</p>
                    </div>
                    <div>
                        <p className="text-zinc-300 font-semibold mb-1 flex items-center gap-1.5"><Beaker className="w-3.5 h-3.5 text-blue-400" /> Strong Clinical</p>
                        <p>Peptides with published Phase 2 or Phase 3 randomized controlled trials in humans, indexed on PubMed with statistically significant efficacy endpoints.</p>
                    </div>
                    <div>
                        <p className="text-zinc-300 font-semibold mb-1 flex items-center gap-1.5"><FlaskConical className="w-3.5 h-3.5 text-amber-400" /> Moderate / Preclinical</p>
                        <p>Peptides with robust animal model data, in-vitro mechanistic evidence, or Phase 1 / early-phase human safety studies in peer-reviewed journals.</p>
                    </div>
                    <div>
                        <p className="text-zinc-300 font-semibold mb-1 flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-zinc-400" /> Emerging / Limited</p>
                        <p>Peptides with limited published research, preliminary mechanistic data, or where evidence is primarily anecdotal or based on case reports.</p>
                    </div>
                </div>
                <p className="text-[10px] text-zinc-600 pt-2 border-t border-zinc-800">
                    Evidence tiers are determined by the highest-quality study available for each peptide. Our editorial team reviews each classification monthly. Last updated: April 2026.
                </p>
            </div>

            {/* ── Affiliate Footer ── */}
            <div className="rounded-xl border border-violet-500/15 bg-gradient-to-r from-violet-900/10 to-transparent p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <p className="text-sm text-zinc-300">
                        Source COA-verified peptides from our recommended vendor
                    </p>
                </div>
                <a
                    href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition-colors shadow-lg shadow-violet-900/20 whitespace-nowrap"
                >
                    Visit Amino Club <ExternalLink className="w-4 h-4" />
                </a>
            </div>

            {/* ── Disclaimer ── */}
            <p className="text-[9px] text-zinc-600 text-center leading-relaxed max-w-2xl mx-auto">
                This evidence map is for educational and research purposes only. It does not constitute medical advice. Evidence tiers reflect published peer-reviewed literature as of April 2026. PeptiDex may earn a commission from affiliate links. This does not affect our editorial independence.
            </p>
        </div>
    );
}
