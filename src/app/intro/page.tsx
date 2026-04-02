"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    Dna, Zap, Flame, Brain, Shield, Sparkles, ChevronRight,
    CheckCircle, Circle, AlertTriangle, ArrowRight, BookOpen,
    FlaskConical, ShoppingCart, ChevronDown, Info, Star
} from "lucide-react";

// ─── Data ───

const categories = [
    {
        icon: "🩹", id: "healing", label: "Healing & Recovery",
        desc: "Accelerate tissue repair, tendon healing, and gut restoration. Best studied category with the strongest safety profile.",
        peptides: ["BPC-157", "TB-500", "KPV"],
        color: "from-emerald-500/20 to-emerald-900/10 border-emerald-500/20",
        badge: "Most Popular",
        href: "/library?category=healing",
    },
    {
        icon: "💉", id: "gh", label: "Growth Hormone",
        desc: "Stimulate natural GH pulses for lean mass, fat loss, sleep quality, and anti-aging — without the downsides of exogenous HGH.",
        peptides: ["CJC-1295", "Ipamorelin", "Sermorelin"],
        color: "from-blue-500/20 to-blue-900/10 border-blue-500/20",
        badge: "Most Stacked",
        href: "/library?category=gh",
    },
    {
        icon: "🔥", id: "fat-loss", label: "Fat Loss & Metabolic",
        desc: "From GLP-1 agonists driving 20%+ weight loss in trials to targeted lipolysis peptides. The fastest-growing research area.",
        peptides: ["Semaglutide", "Retatrutide", "AOD-9604"],
        color: "from-orange-500/20 to-orange-900/10 border-orange-500/20",
        badge: "Trending",
        href: "/library?category=fat-loss",
    },
    {
        icon: "🧠", id: "cognitive", label: "Cognitive & Mood",
        desc: "Russian-developed neuropeptides showing improvements in focus, memory, anxiety, and stress resilience in human trials.",
        peptides: ["Semax", "Selank"],
        color: "from-violet-500/20 to-violet-900/10 border-violet-500/20",
        badge: null,
        href: "/library?category=cognitive",
    },
    {
        icon: "🛡️", id: "immune", label: "Immune & Longevity",
        desc: "Modulate immune function, extend telomeres, activate mitochondrial pathways. Research targets include immune deficiency and aging.",
        peptides: ["Thymosin Alpha-1", "Epitalon", "MOTS-c"],
        color: "from-cyan-500/20 to-cyan-900/10 border-cyan-500/20",
        badge: null,
        href: "/library?category=immune",
    },
    {
        icon: "✨", id: "skin", label: "Skin & Anti-aging",
        desc: "Copper peptide complexes, melanocyte stimulators, and libido modulators. Topical and injectable options.",
        peptides: ["GHK-Cu", "Melanotan II", "PT-141"],
        color: "from-pink-500/20 to-pink-900/10 border-pink-500/20",
        badge: null,
        href: "/library?category=skin",
    },
];

const comparisonRows = [
    { label: "Mechanism", peptides: "Receptor signaling", steroids: "Hormone replacement", supps: "Nutritional support" },
    { label: "Legality (US)", peptides: "Research chemical ⚠️", steroids: "Schedule III 🚫", supps: "OTC Legal ✅" },
    { label: "Injections needed", peptides: "Usually", steroids: "Usually", supps: "No" },
    { label: "HPTA Suppression", peptides: "None", steroids: "Yes   often severe", supps: "None" },
    { label: "Reversibility", peptides: "High", steroids: "Low—Medium", supps: "N/A" },
    { label: "Side effects", peptides: "Generally mild", steroids: "Significant", supps: "Minimal" },
    { label: "Bloodwork needed", peptides: "Recommended", steroids: "Essential", supps: "No" },
    { label: "Research depth", peptides: "Growing — 1000s of papers", steroids: "Extensive", supps: "Varies widely" },
];

const checklistItems = [
    { id: "goal", label: "I have a specific, measurable goal defined", detail: "e.g. 'Heal my knee injury' not 'improve health'" },
    { id: "blood", label: "I have baseline bloodwork done", detail: "At minimum: CBC, CMP, testosterone, IGF-1 if using GH peptides" },
    { id: "source", label: "I've sourced from a vendor with third-party COA testing", detail: "Janoshik HPLC + Mass Spec is the gold standard" },
    { id: "research", label: "I've read the research guide for my specific peptide", detail: "Including dosing, half-life, and known risks" },
    { id: "legal", label: "I understand the legal and research status", detail: "These are research chemicals   not FDA-approved for human use" },
    { id: "track", label: "I have a protocol tracking plan", detail: "Log every dose, date, and any subjective effects you notice" },
    { id: "health", label: "I don't have any contraindicated conditions", detail: "Active cancer history is a contraindication for GH secretagogues" },
    { id: "consult", label: "I've consulted or plan to consult a knowledgeable practitioner", detail: "Not all physicians are familiar with research peptides" },
];

const coaCallouts = [
    { id: "purity", x: "72%", y: "26%", label: "Purity %", detail: "Must be ≥98% by HPLC. Anything lower is a red flag.", color: "bg-emerald-500" },
    { id: "mw", x: "22%", y: "38%", label: "Molecular Weight", detail: "Cross-check with the published MW for this peptide. Off by >2 Da = problem.", color: "bg-blue-500" },
    { id: "vendor", x: "22%", y: "14%", label: "Testing Lab", detail: "Should be an independent third-party lab, not the vendor's own test.", color: "bg-violet-500" },
    { id: "date", x: "72%", y: "14%", label: "Test Date", detail: "Avoid COAs older than 12 months. Peptides degrade — retest matters.", color: "bg-amber-500" },
    { id: "method", x: "72%", y: "38%", label: "HPLC + MS Method", detail: "HPLC alone is table stakes. Mass spec confirmation removes all doubt.", color: "bg-pink-500" },
];

const beginnerPaths = [
    {
        goal: "🩹 Healing an injury",
        peptide: "BPC-157",
        slug: "bpc-157",
        why: "The most well-studied healing peptide. Exceptional safety profile, proven tendon/gut/muscle repair in animal and human research. Great starting point.",
        dose: "250–500mcg/day SubQ near injury site",
        cycle: "4–8 weeks",
    },
    {
        goal: "🔥 Losing body fat",
        peptide: "Semaglutide",
        slug: "semaglutide",
        why: "FDA-approved mechanism (as Ozempic/Wegovy), well-documented human trial data. Strong appetite suppression with weekly dosing   the most beginner-friendly fat-loss peptide.",
        dose: "0.25–1mg/week SubQ",
        cycle: "12–24 weeks",
    },
    {
        goal: "💉 Building muscle / GH",
        peptide: "CJC-1295 + Ipamorelin",
        slug: "cjc-1295",
        why: "The classic beginner GH stack. CJC stimulates GH release; Ipamorelin amplifies it selectively without cortisol spikes. Well-tolerated, no HPTA suppression.",
        dose: "100mcg Ipamorelin + 100mcg CJC-1295 pre-bed",
        cycle: "8–12 weeks on, 4 weeks off",
    },
    {
        goal: "🧠 Brain / focus / mood",
        peptide: "Semax",
        slug: "semax",
        why: "Nasal spray (no injection). Russian neuropeptide with clinical use for cognitive enhancement, ADHD, and stroke recovery. Fast onset, great safety profile.",
        dose: "200–600mcg/day intranasal",
        cycle: "2–4 weeks on, break",
    },
];

// ─── Sub-components ───

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }} className={className}>
            {children}
        </motion.div>
    );
}

function SectionLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex items-center gap-2 mb-2">
            {icon}
            <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-500">{text}</span>
        </div>
    );
}

// ─── Main Page ───

export default function IntroPage() {
    const [checked, setChecked] = useState<Set<string>>(new Set());
    const [activeCallout, setActiveCallout] = useState<string | null>(null);
    const [selectedPath, setSelectedPath] = useState<number | null>(null);

    const toggleCheck = (id: string) =>
        setChecked(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });

    const readyCount = checked.size;
    const readyPct = Math.round((readyCount / checklistItems.length) * 100);

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 md:py-10 space-y-16 pb-24">

            {/* ─── Hero ─── */}
            <section>
                <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <Image
                        src="/logo.png"
                        alt="PeptiDex Logo"
                        width={120}
                        height={120}
                        className="mx-auto mb-6 w-24 h-24 md:w-32 md:h-32 rounded-2xl object-contain drop-shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                        priority
                    />
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4">
                        <Dna className="w-3.5 h-3.5 text-violet-400" />
                        <span className="text-[11px] font-semibold text-violet-300 uppercase tracking-wider">Start Here</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4 leading-tight">
                        Intro to{" "}
                        <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Peptides
                        </span>
                    </h1>
                    <p className="text-sm md:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed">
                        Everything you need to understand what peptides are, how they work, whether you&apos;re ready to use them, and where to start   in one place.
                    </p>
                    <div className="flex justify-center gap-3 mt-4 text-[11px] text-zinc-500">
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 8 min read</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><FlaskConical className="w-3 h-3" /> Research only</span>
                    </div>
                </motion.div >

                {/* Animated amino chain decoration */}
                < motion.div
                    initial={{ opacity: 0, scale: 0.9 }
                    }
                    animate={{ opacity: 1, scale: 1 }
                    }
                    transition={{ delay: 0.3 }}
                    className="mt-6 flex items-center justify-center gap-1 flex-wrap"
                >
                    {
                        ["Gly", "Pro", "Ala", "Ser", "Leu", "Val", "BPC", "→", "Peptide"].map((aa, i) => (
                            <motion.span key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + i * 0.07 }}
                                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold border ${aa === "→"
                                    ? "text-zinc-600 border-transparent"
                                    : aa === "BPC" || aa === "Peptide"
                                        ? "bg-violet-500/20 border-violet-500/30 text-violet-300"
                                        : "bg-zinc-800/60 border-zinc-700/50 text-zinc-400"
                                    }`}>
                                {aa}
                            </motion.span>
                        ))
                    }
                </motion.div >
                <p className="text-center text-[9px] text-zinc-700 mt-2">Peptides are short chains of amino acids — much smaller than proteins</p>
            </section >

            {/* ─── What is a Peptide ─── */}
            < FadeIn >
                <SectionLabel icon={<Dna className="w-3.5 h-3.5 text-violet-400" />} text="The Basics" />
                <h2 className="text-2xl font-bold text-zinc-100 mb-4">What is a peptide?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                        { icon: "⚛️", title: "Amino Acids", body: "The basic building blocks of life. Your body uses 20 standard amino acids." },
                        { icon: "🔗", title: "Peptides (2–50 AAs)", body: "Short chains of amino acids joined by peptide bonds. Small enough to signal cells directly." },
                        { icon: "🧬", title: "Proteins (50+ AAs)", body: "Longer chains that fold into complex 3D structures   enzymes, hormones, structural tissue." },
                    ].map(c => (
                        <div key={c.title} className="rounded-2xl bg-zinc-900/50 border border-zinc-800/60 p-4">
                            <div className="text-2xl mb-2">{c.icon}</div>
                            <p className="text-sm font-bold text-zinc-200 mb-1">{c.title}</p>
                            <p className="text-xs text-zinc-500 leading-relaxed">{c.body}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-4 rounded-2xl bg-violet-950/30 border border-violet-500/20 p-4">
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        <span className="font-semibold text-violet-300">The key insight:</span> Peptides work by binding to specific receptors and triggering natural biological cascades
                        telling your body to do something it already knows how to do, just more efficiently. Unlike steroids, they don&apos;t replace your hormones. They signal for more.
                    </p>
                </div>
            </FadeIn >

            {/* ─── 6 Categories ─── */}
            < FadeIn >
                <SectionLabel icon={<Sparkles className="w-3.5 h-3.5 text-violet-400" />} text="The 6 Categories" />
                <h2 className="text-2xl font-bold text-zinc-100 mb-4">What can they do?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map((cat, i) => (
                        <motion.div key={cat.id}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                            <Link href={cat.href}
                                className={`group flex flex-col h-full rounded-2xl bg-gradient-to-br ${cat.color} border p-4 hover:scale-[1.02] transition-transform`}>
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-2xl">{cat.icon}</span>
                                    {cat.badge && (
                                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">{cat.badge}</span>
                                    )}
                                </div>
                                <p className="text-sm font-bold text-zinc-100 mb-1">{cat.label}</p>
                                <p className="text-[11px] text-zinc-400 leading-relaxed flex-1">{cat.desc}</p>
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {cat.peptides.map(p => (
                                        <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-900/60 border border-zinc-700/50 text-zinc-500 font-mono">{p}</span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1 mt-2 text-[10px] text-zinc-500 group-hover:text-violet-400 transition-colors">
                                    <span>Explore →</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </FadeIn >

            {/* ─── Comparison Table ─── */}
            < FadeIn >
                <SectionLabel icon={<Zap className="w-3.5 h-3.5 text-amber-400" />} text="Comparison" />
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">Peptides vs. Steroids vs. Supplements</h2>
                <p className="text-xs text-zinc-500 mb-4">The most common question — answered in a table.</p>
                <div className="overflow-x-auto rounded-2xl border border-zinc-800/60">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-zinc-800/60">
                                <th className="text-left p-3 text-zinc-500 font-medium w-36">Aspect</th>
                                <th className="text-left p-3 text-violet-400 font-bold">🧬 Peptides</th>
                                <th className="text-left p-3 text-red-400 font-bold">💪 Steroids (AAS)</th>
                                <th className="text-left p-3 text-emerald-400 font-bold">💊 Supplements</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonRows.map((row, i) => (
                                <tr key={row.label} className={`border-b border-zinc-800/40 last:border-0 ${i % 2 === 0 ? "bg-zinc-900/20" : ""}`}>
                                    <td className="p-3 font-medium text-zinc-400">{row.label}</td>
                                    <td className="p-3 text-zinc-300">{row.peptides}</td>
                                    <td className="p-3 text-zinc-400">{row.steroids}</td>
                                    <td className="p-3 text-zinc-400">{row.supps}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-[9px] text-zinc-600 mt-2 text-center">This is a general overview. Individual peptides vary significantly. Always research your specific compound.</p>
            </FadeIn >

            {/* ─── COA Explainer ─── */}
            < FadeIn >
                <SectionLabel icon={<FlaskConical className="w-3.5 h-3.5 text-cyan-400" />} text="Quality & Safety" />
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">How to read a COA</h2>
                <p className="text-xs text-zinc-400 mb-4">A Certificate of Analysis is a vendor-provided lab report. Tap the markers below to learn what each section means.</p>

                {/* Mock COA document */}
                <div className="relative rounded-2xl bg-zinc-950 border border-zinc-700/50 p-4 md:p-6 overflow-visible">
                    {/* COA Header */}
                    <div className="border-b border-zinc-700/50 pb-3 mb-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Janoshik Analytical</p>
                                <p className="text-sm font-bold text-zinc-200 mt-1">Certificate of Analysis</p>
                                <p className="text-xs text-zinc-400 font-mono mt-0.5">Sample: BPC-157 · Lot #BPC2024-001</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-zinc-500">Test Date</p>
                                <p className="text-xs font-mono text-zinc-300">2024-11-12</p>
                                <button onClick={() => setActiveCallout(activeCallout === "date" ? null : "date")}
                                    className="mt-1 w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center hover:scale-110 transition-transform">A</button>
                            </div>
                        </div>
                    </div>

                    {/* COA Body */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-2">Sample Details</p>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] text-zinc-400">Molecular Weight</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-mono text-zinc-200">1419.53 Da</span>
                                        <button onClick={() => setActiveCallout(activeCallout === "mw" ? null : "mw")}
                                            className="w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center hover:scale-110 transition-transform">B</button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] text-zinc-400">Testing Lab</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-mono text-zinc-200">Janoshik</span>
                                        <button onClick={() => setActiveCallout(activeCallout === "vendor" ? null : "vendor")}
                                            className="w-4 h-4 rounded-full bg-violet-500 text-white text-[9px] font-bold flex items-center justify-center hover:scale-110 transition-transform">C</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-2">Test Results</p>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] text-zinc-400">HPLC Purity</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-mono font-bold text-emerald-400">99.2%</span>
                                        <button onClick={() => setActiveCallout(activeCallout === "purity" ? null : "purity")}
                                            className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center hover:scale-110 transition-transform">D</button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] text-zinc-400">MS Confirmed</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs font-mono text-emerald-400">✅ Yes</span>
                                        <button onClick={() => setActiveCallout(activeCallout === "method" ? null : "method")}
                                            className="w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center hover:scale-110 transition-transform">E</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HPLC Graph mockup */}
                    <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3">
                        <p className="text-[9px] text-zinc-600 mb-2 uppercase tracking-wider">HPLC Chromatogram</p>
                        <div className="h-12 flex items-end gap-px">
                            {[4, 3, 5, 8, 80, 90, 95, 88, 60, 20, 8, 4, 3, 2, 2, 2].map((h, i) => (
                                <div key={i} className={`flex-1 rounded-t ${h > 50 ? "bg-violet-500" : "bg-zinc-700"}`}
                                    style={{ height: `${h}%` }} />
                            ))}
                        </div>
                        <div className="flex justify-between text-[8px] text-zinc-700 mt-1">
                            <span>0 min</span><span>Retention time →</span><span>20 min</span>
                        </div>
                    </div>
                </div>

                {/* Callout tooltips */}
                <AnimatePresence>
                    {activeCallout && (() => {
                        const c = coaCallouts.find(c => c.id === activeCallout);
                        if (!c) return null;
                        return (
                            <motion.div key={activeCallout}
                                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                className="mt-3 rounded-xl border border-zinc-700 bg-zinc-900 p-3 flex items-start gap-3">
                                <span className={`w-5 h-5 rounded-full ${c.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5`}>
                                    {["A", "B", "C", "D", "E"][coaCallouts.indexOf(c)]}
                                </span>
                                <div>
                                    <p className="text-xs font-bold text-zinc-100">{c.label}</p>
                                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{c.detail}</p>
                                </div>
                            </motion.div>
                        );
                    })()}
                </AnimatePresence>

                <Link href="/tools/coa"
                    className="mt-3 inline-flex items-center gap-2 text-xs text-violet-400 hover:text-violet-300 transition-colors">
                    <FlaskConical className="w-3.5 h-3.5" /> Try the live COA Analyzer tool →
                </Link>
            </FadeIn >

            {/* ─── Am I Ready Checklist ─── */}
            < FadeIn >
                <SectionLabel icon={<CheckCircle className="w-3.5 h-3.5 text-emerald-400" />} text="Am I Ready?" />
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">Pre-flight checklist</h2>
                <p className="text-xs text-zinc-400 mb-4">Check off each item before starting any peptide protocol. Be honest with yourself.</p>

                {/* Progress bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-500">{readyCount}/{checklistItems.length} complete</span>
                        <span className={readyPct === 100 ? "text-emerald-400 font-bold" : "text-zinc-500"}>{readyPct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                        <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-500"
                            animate={{ width: `${readyPct}%` }} transition={{ duration: 0.4 }} />
                    </div>
                </div>

                <div className="space-y-2">
                    {checklistItems.map(item => {
                        const done = checked.has(item.id);
                        return (
                            <button key={item.id} onClick={() => toggleCheck(item.id)}
                                className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${done
                                    ? "bg-emerald-950/30 border-emerald-500/25"
                                    : "bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700"
                                    }`}>
                                <div className="mt-0.5 shrink-0">
                                    {done
                                        ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        : <Circle className="w-4 h-4 text-zinc-600" />
                                    }
                                </div>
                                <div className="min-w-0">
                                    <p className={`text-sm font-medium leading-snug ${done ? "text-zinc-300" : "text-zinc-300"}`}>{item.label}</p>
                                    <p className="text-[10px] text-zinc-600 mt-0.5">{item.detail}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {
                    readyPct === 100 && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="mt-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 p-4 text-center">
                            <p className="text-lg font-bold text-emerald-300">✅ You're ready!</p>
                            <p className="text-xs text-zinc-400 mt-1">Now pick your starting point below.</p>
                        </motion.div>
                    )
                }
                {
                    readyPct > 0 && readyPct < 100 && (
                        <div className="mt-3 rounded-xl bg-amber-950/30 border border-amber-500/20 p-3 flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-amber-400/80">{8 - readyCount} item{8 - readyCount !== 1 ? "s" : ""} remaining. Don&apos;t skip these   they protect you.</p>
                        </div>
                    )
                }
            </FadeIn >

            {/* ─── Beginner Path Picker ─── */}
            < FadeIn >
                <SectionLabel icon={<Star className="w-3.5 h-3.5 text-amber-400" />} text="Where to Start" />
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">Beginner path picker</h2>
                <p className="text-xs text-zinc-400 mb-4">Pick your primary goal   we&apos;ll show you the single best starting peptide for your situation.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {beginnerPaths.map((path, i) => (
                        <button key={i} onClick={() => setSelectedPath(selectedPath === i ? null : i)}
                            className={`text-left p-4 rounded-2xl border transition-all ${selectedPath === i
                                ? "bg-violet-950/40 border-violet-500/40"
                                : "bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700"
                                }`}>
                            <p className="text-sm font-bold text-zinc-200">{path.goal}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">Best for: <span className="text-violet-400">{path.peptide}</span></p>
                        </button>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedPath !== null && (() => {
                        const path = beginnerPaths[selectedPath];
                        return (
                            <motion.div key={selectedPath}
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                                className="rounded-2xl bg-violet-950/30 border border-violet-500/25 overflow-hidden">
                                <div className="p-4 border-b border-violet-500/15">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-[10px] text-violet-400 uppercase tracking-widest mb-1">Recommended for you</p>
                                            <h3 className="text-xl font-black text-zinc-100">{path.peptide}</h3>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-[10px] text-emerald-400 font-semibold">Beginner Friendly</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{path.why}</p>
                                </div>
                                <div className="p-4 grid grid-cols-2 gap-3">
                                    <div className="rounded-xl bg-zinc-900/60 p-3">
                                        <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-1">Typical Dose</p>
                                        <p className="text-xs font-mono text-zinc-300">{path.dose}</p>
                                    </div>
                                    <div className="rounded-xl bg-zinc-900/60 p-3">
                                        <p className="text-[9px] text-zinc-600 uppercase tracking-wider mb-1">Cycle Length</p>
                                        <p className="text-xs font-mono text-zinc-300">{path.cycle}</p>
                                    </div>
                                </div>
                                <div className="px-4 pb-4 flex gap-2">
                                    <Link href={`/library/${path.slug}`}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-bold hover:bg-violet-500 transition-colors">
                                        <BookOpen className="w-4 h-4" /> Full Research Guide
                                    </Link>
                                    <Link href="/suppliers"
                                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 text-sm hover:border-zinc-600 transition-colors">
                                        <ShoppingCart className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })()}
                </AnimatePresence>
            </FadeIn >

            {/* ─── What's Next ─── */}
            < FadeIn >
                <div className="rounded-2xl bg-gradient-to-br from-violet-950/40 to-zinc-900/60 border border-violet-500/20 p-6 text-center">
                    <Sparkles className="w-8 h-8 text-violet-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-zinc-100 mb-2">Ready to go deeper?</h3>
                    <p className="text-xs text-zinc-400 mb-5">You&apos;ve got the fundamentals. Now explore the tools built for serious researchers.</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <Link href="/library" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 hover:border-violet-500/40 hover:text-violet-300 transition-all">
                            <BookOpen className="w-4 h-4" /> Peptide Library
                        </Link>
                        <Link href="/tools/calculator" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 hover:border-violet-500/40 hover:text-violet-300 transition-all">
                            <FlaskConical className="w-4 h-4" /> Dosage Calculator
                        </Link>
                        <Link href="/stacks" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 hover:border-violet-500/40 hover:text-violet-300 transition-all">
                            <Flame className="w-4 h-4" /> Browse Stacks
                        </Link>
                        <Link href="/suppliers" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 hover:border-violet-500/40 hover:text-violet-300 transition-all">
                            <ShoppingCart className="w-4 h-4" /> Verified Suppliers
                        </Link>
                    </div>
                </div>
            </FadeIn >
        </div >
    );
}
