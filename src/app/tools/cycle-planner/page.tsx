"use client";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { goals } from "@/data/goals";
import { stacks } from "@/data/stacks";
import { peptides } from "@/data/peptides";
import { SHORT_DISCLAIMER } from "@/data/constants";
import {
    getDefaultConfig,
    calculateCycle,
    generateShoppingList,
    CyclePeptideConfig,
    CyclePeptideResult,
    ShoppingListSummary,
} from "@/lib/cycle-engine";
import { generateCycleIcs } from "@/lib/ics-generator";
import {
    ShieldAlert, Target, ChevronRight, ChevronDown, ChevronUp,
    ShoppingCart, Package, Syringe, Clock, Droplets, DollarSign,
    ExternalLink, ArrowLeft, CheckCircle2, ToggleRight, ToggleLeft, Calendar,
} from "lucide-react";
import { Goal, GoalId, Stack } from "@/data/types";

/* ═══════════════════════════════════════════════════════════ */

const STEP_LABELS = ["Choose Goal", "Review Stack", "Configure", "Shopping List"];

export default function CyclePlannerPage() {
    const [step, setStep] = useState(0);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [selectedStack, setSelectedStack] = useState<Stack | null>(null);
    const [enabledPeptides, setEnabledPeptides] = useState<Set<string>>(new Set());
    const [configs, setConfigs] = useState<Map<string, CyclePeptideConfig>>(new Map());
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    /* ──── Step 1: Goal Selection ──── */
    const handleGoalSelect = useCallback((goal: Goal) => {
        setSelectedGoal(goal);
        const stackName = goal.stackNames[0];
        const stack = stacks.find(s => s.stack_name === stackName);
        if (stack) {
            setSelectedStack(stack);
            const names = new Set(stack.peptides.map(p => p.name));
            setEnabledPeptides(names);

            const newConfigs = new Map<string, CyclePeptideConfig>();
            stack.peptides.forEach(sp => {
                newConfigs.set(sp.name, getDefaultConfig(sp.name));
            });
            setConfigs(newConfigs);
        }
        setStep(1);
    }, []);

    /* ──── Toggle peptide on/off ──── */
    const togglePeptide = useCallback((name: string) => {
        setEnabledPeptides(prev => {
            const next = new Set(prev);
            if (next.has(name)) next.delete(name);
            else next.add(name);
            return next;
        });
    }, []);

    /* ──── Update a config field ──── */
    const updateConfig = useCallback((name: string, field: keyof CyclePeptideConfig, value: number) => {
        setConfigs(prev => {
            const next = new Map(prev);
            const existing = next.get(name);
            if (existing) {
                next.set(name, { ...existing, [field]: value });
            }
            return next;
        });
    }, []);

    /* ──── Compute results ──── */
    const results: CyclePeptideResult[] = useMemo(() => {
        return Array.from(enabledPeptides)
            .map(name => {
                const config = configs.get(name);
                if (!config) return null;
                return calculateCycle(config);
            })
            .filter((r): r is CyclePeptideResult => r !== null);
    }, [enabledPeptides, configs]);

    const shoppingList: ShoppingListSummary = useMemo(() => generateShoppingList(results), [results]);

    const handleDownloadIcs = useCallback(() => {
        if (results.length === 0) return;
        const icsString = generateCycleIcs(results);
        const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Peptidex_Cycle_Schedule.ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [results]);

    /* ════════════════════════ RENDER ═══════════════════════ */
    return (
        <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">
            {/* Disclaimer */}
            <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-2.5 mb-4">
                <div className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] md:text-[11px] text-amber-400/80 leading-relaxed">{SHORT_DISCLAIMER}</p>
                </div>
            </div>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <ShoppingCart className="w-5 h-5 text-orange-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Cycle Planner</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">Plan your full cycle &amp; know exactly what to order</p>
            </motion.div>

            {/* Progress Steps */}
            <div className="flex items-center gap-1 mb-6">
                {STEP_LABELS.map((label, i) => (
                    <div key={label} className="flex items-center gap-1 flex-1">
                        <div className={`flex items-center gap-1.5 flex-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                            i <= step
                                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                : "bg-zinc-900 text-zinc-600 border border-zinc-800"
                        }`}>
                            {i < step ? <CheckCircle2 className="w-3 h-3" /> : <span className="w-3 h-3 rounded-full border border-current flex items-center justify-center text-[8px]">{i + 1}</span>}
                            <span className="hidden sm:inline">{label}</span>
                        </div>
                        {i < STEP_LABELS.length - 1 && <ChevronRight className="w-3 h-3 text-zinc-700 flex-shrink-0" />}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* ═══════════ STEP 0: GOAL SELECTION ═══════════ */}
                {step === 0 && (
                    <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h2 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">What&apos;s your goal?</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {goals.map(goal => (
                                <button
                                    key={goal.id}
                                    onClick={() => handleGoalSelect(goal)}
                                    className={`rounded-xl border p-3 text-left transition-all hover:scale-[1.02] ${
                                        selectedGoal?.id === goal.id
                                            ? "border-orange-500/50 bg-orange-500/15"
                                            : "border-zinc-800 bg-zinc-900/60 hover:border-orange-500/30"
                                    }`}
                                >
                                    <span className="text-lg">{goal.icon}</span>
                                    <p className="text-xs font-semibold text-zinc-200 mt-1.5 leading-tight">{goal.label}</p>
                                    <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{goal.description}</p>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ═══════════ STEP 1: REVIEW STACK ═══════════ */}
                {step === 1 && selectedStack && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <button onClick={() => setStep(0)} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 mb-3 transition-colors">
                            <ArrowLeft className="w-3 h-3" /> Change Goal
                        </button>

                        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-orange-950/10 p-4 mb-4">
                            <h2 className="text-base font-bold text-orange-300 mb-1">{selectedGoal?.icon} {selectedStack.stack_name}</h2>
                            <p className="text-xs text-zinc-400 leading-relaxed">{selectedStack.goal}</p>
                        </div>

                        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Toggle peptides for your cycle</h3>
                        <div className="space-y-2">
                            {selectedStack.peptides.map(sp => {
                                const enabled = enabledPeptides.has(sp.name);
                                const pep = peptides.find(p => p.name === sp.name);
                                return (
                                    <div key={sp.name} className={`rounded-xl border p-3 transition-all ${
                                        enabled ? "border-emerald-500/30 bg-emerald-950/15" : "border-zinc-800 bg-zinc-900/40 opacity-50"
                                    }`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 mr-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-zinc-100">{sp.name}</span>
                                                    {pep?.dosing && (
                                                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-500">{pep.dosing.route}</span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{sp.role_in_stack}</p>
                                            </div>
                                            <button onClick={() => togglePeptide(sp.name)} className="flex-shrink-0">
                                                {enabled
                                                    ? <ToggleRight className="w-7 h-7 text-emerald-400" />
                                                    : <ToggleLeft className="w-7 h-7 text-zinc-600" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            disabled={enabledPeptides.size === 0}
                            className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-sm hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Configure Cycle →
                        </button>
                    </motion.div>
                )}

                {/* ═══════════ STEP 2: CONFIGURE ═══════════ */}
                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <button onClick={() => setStep(1)} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 mb-3 transition-colors">
                            <ArrowLeft className="w-3 h-3" /> Review Stack
                        </button>

                        <h2 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">Configure Each Peptide</h2>

                        <div className="space-y-3">
                            {Array.from(enabledPeptides).map(name => {
                                const config = configs.get(name);
                                const result = results.find(r => r.peptideName === name);
                                const isExpanded = expandedCard === name;
                                if (!config || !result) return null;

                                return (
                                    <div key={name} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
                                        {/* Collapsed header */}
                                        <button
                                            onClick={() => setExpandedCard(isExpanded ? null : name)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/30 transition-colors"
                                        >
                                            <div>
                                                <span className="text-sm font-bold text-zinc-100">{name}</span>
                                                <div className="flex items-center gap-3 mt-1 text-[10px] text-zinc-500">
                                                    <span>{config.doseMcg}mcg × {config.injectionsPerWeek}x/wk</span>
                                                    <span>•</span>
                                                    <span>{config.cycleWeeks} weeks</span>
                                                    <span>•</span>
                                                    <span className="text-orange-400 font-semibold">{result.vialsNeeded} vials</span>
                                                </div>
                                            </div>
                                            {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                                        </button>

                                        {/* Expanded config */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 pb-4 border-t border-zinc-800 pt-3">
                                                        {/* Titration Disclaimer */}
                                                        <div className="mb-4 p-2.5 rounded-xl border border-blue-500/20 bg-blue-900/10 flex items-start gap-2">
                                                            <ShieldAlert className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                                                            <p className="text-[10px] text-blue-300/80 leading-relaxed">
                                                                <span className="font-bold text-blue-300">Titration Protocol:</span> The dose below is your <span className="font-semibold">target dose</span>. You should start with a much smaller dose and titrate up by 50% each week until you safely reach the suggested target.
                                                            </p>
                                                        </div>

                                                        {/* Input Grid */}
                                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                                            <ConfigInput label="Cycle Length (weeks)" icon={<Calendar className="w-3 h-3" />}
                                                                value={config.cycleWeeks} onChange={v => updateConfig(name, "cycleWeeks", v)} min={1} max={52} />
                                                            <ConfigInput label="Dose (mcg)" icon={<Syringe className="w-3 h-3" />}
                                                                value={config.doseMcg} onChange={v => updateConfig(name, "doseMcg", v)} min={10} max={50000} />
                                                            <ConfigInput label="Injections / Week" icon={<Clock className="w-3 h-3" />}
                                                                value={config.injectionsPerWeek} onChange={v => updateConfig(name, "injectionsPerWeek", v)} min={1} max={14} />
                                                            <ConfigInput label="BAC Water (ml)" icon={<Droplets className="w-3 h-3" />}
                                                                value={config.bacWaterMl} onChange={v => updateConfig(name, "bacWaterMl", v)} min={0.5} max={10} step={0.5} />
                                                            <ConfigInput label="Vial Size (mg)" icon={<Package className="w-3 h-3" />}
                                                                value={config.vialMg} onChange={v => updateConfig(name, "vialMg", v)} min={1} max={100} />
                                                        </div>

                                                        {/* Computed Results */}
                                                        <div className="rounded-xl bg-gradient-to-br from-emerald-900/25 to-emerald-950/15 border border-emerald-500/20 p-3">
                                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                                                                <ResultStat label="Concentration" value={`${Math.round(result.concentration).toLocaleString()}`} unit="mcg/ml" />
                                                                <ResultStat label="Syringe Draw" value={`${result.syringeUnits}`} unit="units" />
                                                                <ResultStat label="Doses/Vial" value={`${result.dosesPerVial}`} unit="injections" />
                                                                <ResultStat label="Vial Lasts" value={`~${result.vialDaysLast}`} unit="days" />
                                                                <ResultStat label="Total Injections" value={`${result.totalInjections}`} unit="for cycle" />
                                                                <ResultStat label="Vials Needed" value={`${result.vialsNeeded}`} unit="vials" accent />
                                                            </div>
                                                        </div>

                                                        {result.cycleNotes && (
                                                            <p className="mt-2 text-[10px] text-zinc-500 italic px-1">📋 {result.cycleNotes}</p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setStep(3)}
                            className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-sm hover:brightness-110 transition-all"
                        >
                            View Shopping List →
                        </button>
                    </motion.div>
                )}

                {/* ═══════════ STEP 3: SHOPPING LIST ═══════════ */}
                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <button onClick={() => setStep(2)} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 mb-3 transition-colors">
                            <ArrowLeft className="w-3 h-3" /> Adjust Configuration
                        </button>

                        <div className="rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-900/20 to-amber-950/10 p-4 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <ShoppingCart className="w-5 h-5 text-orange-400" />
                                <h2 className="text-base font-bold text-orange-300">Your Full Cycle Order</h2>
                            </div>
                            <p className="text-xs text-zinc-400">{selectedGoal?.icon} {selectedStack?.stack_name} — {results.length} peptide{results.length !== 1 ? "s" : ""}</p>
                        </div>

                        {/* Per-Peptide Breakdown */}
                        <div className="space-y-2 mb-5">
                            {results.map(r => (
                                <div key={r.peptideName} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-bold text-zinc-100">{r.peptideName}</span>
                                        <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">{r.vialsNeeded} vial{r.vialsNeeded !== 1 ? "s" : ""}</span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-1 text-[10px] text-zinc-400">
                                        <div><span className="text-zinc-600">Dose:</span> <span className="text-zinc-300">{r.doseMcg}mcg</span></div>
                                        <div><span className="text-zinc-600">Freq:</span> <span className="text-zinc-300">{r.injectionsPerWeek}x/wk</span></div>
                                        <div><span className="text-zinc-600">Cycle:</span> <span className="text-zinc-300">{r.cycleWeeks}wk</span></div>
                                        <div><span className="text-zinc-600">Draw:</span> <span className="text-zinc-300">{r.syringeUnits}u</span></div>
                                    </div>

                                    {/* Cycle timeline bar */}
                                    <div className="mt-2 h-4 rounded-full bg-zinc-800 overflow-hidden relative">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((r.cycleWeeks / 16) * 100, 100)}%` }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        />
                                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white drop-shadow-sm">
                                            {r.cycleWeeks} weeks on-cycle
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Vendor Comparison */}
                        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Order from a Trusted Vendor</h3>
                        <div className="space-y-2 mb-4">
                            {shoppingList.vendorTotals.map((vt, i) => (
                                <a
                                    key={vt.vendor}
                                    href={vt.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block rounded-xl border p-4 transition-all hover:scale-[1.01] ${
                                        i === 0
                                            ? "border-emerald-500/30 bg-gradient-to-r from-emerald-900/20 to-emerald-950/10"
                                            : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                                    }`}
                                >
                                    <div className="flex items-center justify-between gap-1">
                                        <div className="flex items-start gap-3">
                                            <DollarSign className={`w-5 h-5 mt-0.5 flex-shrink-0 ${i === 0 ? "text-emerald-400" : "text-zinc-500"}`} />
                                            <div className="flex flex-col items-start gap-1.5">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className={`text-sm font-bold ${i === 0 ? "text-emerald-300" : "text-zinc-200"}`}>{vt.vendor}</span>
                                                    {i === 0 && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase">Best Price</span>}
                                                </div>
                                                {vt.discountCode && <span className="text-[10px] px-2 py-0.5 rounded-md border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 font-mono font-bold">Use Code: {vt.discountCode} (-20%)</span>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            {vt.originalTotal && (
                                                <span className="text-[10px] text-red-500/90 line-through font-semibold mb-0.5">
                                                    ${vt.originalTotal.toFixed(2)}
                                                </span>
                                            )}
                                            <div className="flex items-center gap-1.5">
                                                <span className={`text-lg font-black ${i === 0 ? "text-emerald-400" : "text-zinc-300"}`}>${vt.total.toFixed(2)}</span>
                                                <ExternalLink className="w-3.5 h-3.5 text-zinc-600 mb-0.5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Per-peptide breakdown for this vendor */}
                                    <div className="mt-2 pt-2 border-t border-zinc-800/50 grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px] text-zinc-500">
                                        {results.map(r => {
                                            const vp = r.vendorPrices.find(v => v.vendor === vt.vendor);
                                            return vp ? (
                                                <span key={r.peptideName}>{r.peptideName}: {r.vialsNeeded}× ${vp.pricePerVial} = <span className="text-zinc-400">${vp.totalCost.toFixed(2)}</span></span>
                                            ) : null;
                                        })}
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Apple/Google Calendar Export Box */}
                        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-blue-950/10 p-4 mb-4 text-center">
                            <div className="flex justify-center mb-2">
                                <div className="p-2 bg-blue-500/20 rounded-full">
                                    <Calendar className="w-5 h-5 text-blue-400" />
                                </div>
                            </div>
                            <h3 className="text-sm font-bold text-blue-300 mb-1">Set Up Injection Reminders</h3>
                            <p className="text-[10px] md:text-xs text-blue-400/70 mb-3 px-4">Download your protocol to Apple or Google Calendar to receive native push notifications when it&apos;s time to pin.</p>
                            <button onClick={handleDownloadIcs} className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-lg shadow-blue-900/20">
                                Add to Calendar (.ics)
                            </button>
                        </div>

                        {/* Summary Box */}
                        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-4 mb-4">
                            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 text-center">Cycle Supply Summary</h3>
                            <div className="grid grid-cols-3 gap-2 text-center divide-x divide-zinc-800">
                                <div>
                                    <p className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Peptide Vials</p>
                                    <p className="text-xl sm:text-2xl font-black text-orange-400">{results.reduce((sum, r) => sum + r.vialsNeeded, 0)}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest mb-1">BAC Water</p>
                                    <p className="text-xl sm:text-2xl font-black text-emerald-400">{shoppingList.totalBacWaterMl}<span className="text-xs font-bold text-emerald-400/50 ml-0.5">ml</span></p>
                                </div>
                                <div>
                                    <p className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Syringes</p>
                                    <p className="text-xl sm:text-2xl font-black text-blue-400">{shoppingList.totalSyringes}</p>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-zinc-800 text-center text-[10px] text-zinc-500 leading-relaxed">
                                You need <span className="font-bold text-zinc-300">{Math.ceil(shoppingList.totalBacWaterMl / 30)}</span> standard 30ml bottle(s) of BAC water and at least <span className="font-bold text-zinc-300">{shoppingList.totalSyringes}</span> 1ml (U-100) insulin syringes.
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ──────────── Reusable Config Input ──────────── */
function ConfigInput({ label, icon, value, onChange, min, max, step = 1 }: {
    label: string;
    icon: React.ReactNode;
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
    step?: number;
}) {
    return (
        <div>
            <label className="flex items-center gap-1 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                {icon} {label}
            </label>
            <input
                type="number"
                value={value}
                onChange={e => onChange(parseFloat(e.target.value) || 0)}
                min={min} max={max} step={step}
                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
        </div>
    );
}

/* ──────────── Reusable Stat Display ──────────── */
function ResultStat({ label, value, unit, accent }: { label: string; value: string; unit: string; accent?: boolean }) {
    return (
        <div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-wider">{label}</p>
            <p className={`text-base font-black ${accent ? "text-orange-400" : "text-emerald-400"}`}>{value}</p>
            <p className="text-[9px] text-zinc-600">{unit}</p>
        </div>
    );
}
