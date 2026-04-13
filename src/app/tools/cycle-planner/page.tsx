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
    ExternalLink, ArrowLeft, ArrowRight, CheckCircle2, ToggleRight, ToggleLeft, Calendar,
} from "lucide-react";
import { Goal, GoalId, Stack } from "@/data/types";
import { ShareModal } from "@/components/share-card/share-modal";
import type { CycleCardData } from "@/components/share-card/card-templates";

/* ═══════════════════════════════════════════════════════════ */

const STEP_LABELS = ["Choose Goal", "Review Stack", "Configure", "Shopping List"];

export default function CyclePlannerPage() {
    const [step, setStep] = useState(0);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [selectedStack, setSelectedStack] = useState<Stack | null>(null);
    const [enabledPeptides, setEnabledPeptides] = useState<Set<string>>(new Set());
    const [configs, setConfigs] = useState<Map<string, CyclePeptideConfig>>(new Map());
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [includeSupplies, setIncludeSupplies] = useState(true);
    const [globalCycleLength, setGlobalCycleLength] = useState<number>(8);

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
                newConfigs.set(sp.name, { ...getDefaultConfig(sp.name), cycleWeeks: 8 });
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

    const updateGlobalCycleLength = useCallback((weeks: number) => {
        setGlobalCycleLength(weeks);
        setConfigs(prev => {
            const next = new Map(prev);
            for (const [name, config] of next.entries()) {
                next.set(name, { ...config, cycleWeeks: weeks });
            }
            return next;
        });
    }, []);

    const shoppingList: ShoppingListSummary = useMemo(() => generateShoppingList(results, includeSupplies), [results, includeSupplies]);

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
                            <p className="text-xs text-emerald-400/80 mt-2 font-medium">✨ All peptides in this stack are available from our recommended source, Amino Club.</p>
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

                        <h2 className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wider">Configure Cycle</h2>

                        {/* Global Settings */}
                        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 mb-5">
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                                        <Calendar className="w-3.5 h-3.5 text-orange-400" /> Cycle Length
                                    </label>
                                    <select 
                                        value={globalCycleLength}
                                        onChange={(e) => updateGlobalCycleLength(parseInt(e.target.value))}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-orange-500"
                                    >
                                        <option value={4}>4 Weeks</option>
                                        <option value={6}>6 Weeks</option>
                                        <option value={8}>8 Weeks</option>
                                        <option value={10}>10 Weeks</option>
                                        <option value={12}>12 Weeks</option>
                                    </select>
                                </div>
                                <div className="flex-[1.5]">
                                    <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                                        <Package className="w-3.5 h-3.5 text-blue-400" /> Include Supplies in Cost
                                    </label>
                                    <button 
                                        onClick={() => setIncludeSupplies(!includeSupplies)}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all ${
                                            includeSupplies ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300" : "border-zinc-700 bg-zinc-800 text-zinc-500"
                                        }`}
                                    >
                                        <span className="text-sm font-medium">BAC Water, Syringes &amp; Swabs</span>
                                        {includeSupplies ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Individual Peptide Protocols</h3>
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

                {/* ═══════════ STEP 3: COST BREAKDOWN ═══════════ */}
                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div className="flex justify-between items-center mb-3">
                            <button onClick={() => setStep(2)} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors hide-on-print">
                                <ArrowLeft className="w-3 h-3" /> Adjust Configuration
                            </button>
                            <button onClick={() => window.print()} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors hide-on-print">
                                Save as PDF <ExternalLink className="w-3 h-3" />
                            </button>
                        </div>

                        <div className="rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-900/20 to-amber-950/10 p-4 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="w-5 h-5 text-orange-400" />
                                <h2 className="text-base font-bold text-orange-300">Cost Breakdown & Order Summary</h2>
                            </div>
                            <p className="text-xs text-zinc-400">{selectedGoal?.icon} {selectedStack?.stack_name} — {shoppingList.maxCycleWeeks} Weeks</p>
                        </div>

                        <div className="space-y-3 mb-6">
                            {results.map(r => {
                                const pepSlug = r.peptideName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                                const productUrl = `https://www.aminoclub.com/us/products/${pepSlug}?utm_source=affiliate_marketing&code=PEPTIDEX`;
                                
                                return (
                                    <div key={r.peptideName} className="p-4 sm:p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hide-on-print-bg">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-base font-bold text-zinc-100">{r.peptideName}</h3>
                                                <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs font-semibold text-orange-400">{r.vialsNeeded}x vials</span>
                                            </div>
                                            <p className="text-xs text-zinc-400">{r.vialMg}mg vial • {r.doseMcg}mcg {r.injectionsPerWeek}x/wk for {r.cycleWeeks}wks</p>
                                            <p className="text-xs font-semibold text-zinc-300 mt-1 sm:hidden">Est. Total: ${r.totalCost?.toFixed(2)}</p>
                                        </div>
                                        <div className="flex flex-col sm:items-end gap-2 shrink-0">
                                            <p className="text-sm font-bold text-zinc-200 hidden sm:block">${r.totalCost?.toFixed(2)} <span className="text-[10px] text-zinc-500 font-normal ml-1">est.</span></p>
                                            <a 
                                                href={productUrl}
                                                target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-colors w-full sm:w-auto"
                                            >
                                                Buy from Amino Club <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}

                            {includeSupplies && (
                                <>
                                    <div className="p-4 sm:p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hide-on-print-bg">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-sm font-bold text-zinc-100">Bacteriostatic Water</h3>
                                                <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-400">{shoppingList.supplies.bacWater.quantity}x 30ml</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:items-end gap-2 shrink-0">
                                            <p className="text-sm font-bold text-zinc-300 hidden sm:block">${shoppingList.supplies.bacWater.subtotal.toFixed(2)} <span className="text-[10px] text-zinc-500 font-normal ml-1">est.</span></p>
                                            <a href="https://aminoclub.com/collections/accessories?utm_source=affiliate_marketing&code=PEPTIDEX" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 text-xs font-semibold transition-colors w-full sm:w-auto">
                                                Buy from Amino Club <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hide-on-print-bg">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-sm font-bold text-zinc-100">Insulin Syringes</h3>
                                                <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-400">{shoppingList.supplies.syringes.quantity}x Box</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:items-end gap-2 shrink-0">
                                            <p className="text-sm font-bold text-zinc-300 hidden sm:block">${shoppingList.supplies.syringes.subtotal.toFixed(2)} <span className="text-[10px] text-zinc-500 font-normal ml-1">est.</span></p>
                                            <a href="https://aminoclub.com/collections/accessories?utm_source=affiliate_marketing&code=PEPTIDEX" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 text-xs font-semibold transition-colors w-full sm:w-auto">
                                                Buy from Amino Club <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hide-on-print-bg">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-sm font-bold text-zinc-100">Alcohol Swabs</h3>
                                                <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-400">{shoppingList.supplies.swabs.quantity}x Box</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:items-end gap-2 shrink-0">
                                            <p className="text-sm font-bold text-zinc-300 hidden sm:block">${shoppingList.supplies.swabs.subtotal.toFixed(2)} <span className="text-[10px] text-zinc-500 font-normal ml-1">est.</span></p>
                                            <a href="https://aminoclub.com/collections/accessories?utm_source=affiliate_marketing&code=PEPTIDEX" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 text-xs font-semibold transition-colors w-full sm:w-auto">
                                                Buy from Amino Club <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Grand Total Box */}
                        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-5 mb-8 flex justify-between items-center hide-on-print-bg">
                            <div>
                                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Estimated Grand Total</div>
                                <div className="text-2xl font-black text-emerald-400">${shoppingList.grandTotal.toFixed(2)}</div>
                                <p className="text-[10px] text-zinc-600 mt-1 hide-on-print">Prices are estimates based on default market averages.</p>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Prorated Cost</div>
                                <div className="text-sm font-semibold text-zinc-400">${shoppingList.costPerWeek.toFixed(2)} / wk</div>
                            </div>
                        </div>

                        {/* Order Full Cycle CTA */}
                        <div className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-950 border border-emerald-500/20 text-center relative overflow-hidden mb-6 hide-on-print">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />
                            
                            <h2 className="text-2xl font-bold text-zinc-100 mb-2 relative z-10">Ready to start?</h2>
                            <p className="text-zinc-400 text-sm mb-6 relative z-10 max-w-md mx-auto">Purchase all peptides and supplies directly from Amino Club. Use code <span className="font-bold text-emerald-400">PEPTIDEX</span> at checkout to apply your 20% discount.</p>
                            
                            <a 
                                href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white font-bold transition-all shadow-lg shadow-emerald-500/20 text-lg w-full relative z-10"
                            >
                                Order Full Cycle from Amino Club <ArrowRight className="w-5 h-5" />
                            </a>

                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-6 text-xs font-medium text-emerald-400/80 relative z-10">
                                <span>✓ COA-verified</span>
                                <span className="hidden sm:inline">&middot;</span>
                                <span>✓ 99%+ purity</span>
                                <span className="hidden sm:inline">&middot;</span>
                                <span>✓ Fast US shipping</span>
                                <span className="hidden sm:inline">&middot;</span>
                                <span>✓ PeptiDex Editor's Choice 2026</span>
                            </div>

                            <p className="text-[10px] text-zinc-600 mt-6 max-w-lg mx-auto leading-relaxed relative z-10">
                                <strong>Disclosure:</strong> PeptiDex may earn a commission from purchases. This does not affect our recommendations.
                            </p>
                        </div>
                        
                        {/* Apple/Google Calendar Export Box */}
                        <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-4 mb-4 text-center hide-on-print">
                            <h3 className="text-sm font-bold text-blue-300 mb-1 flex items-center justify-center gap-2"><Calendar className="w-4 h-4" /> Injection Reminders</h3>
                            <p className="text-[10px] md:text-xs text-blue-400/70 mb-3 px-4">Download your protocol to Calendar to receive push notifications when it&apos;s time to pin.</p>
                            <button onClick={handleDownloadIcs} className="py-2 px-6 rounded-lg bg-blue-600/80 hover:bg-blue-500 text-white font-bold text-xs transition-colors">
                                Add to Calendar (.ics)
                            </button>
                        </div>

                        {/* Share My Cycle */}
                        {results.length > 0 && (() => {
                            const cycleData: CycleCardData = {
                                type: "cycle",
                                stackName: selectedStack?.stack_name || "Custom Cycle",
                                goalName: selectedGoal?.label || "Peptide Research",
                                peptides: results.map(r => ({
                                    name: r.peptideName,
                                    doseMcg: r.doseMcg,
                                    cycleWeeks: r.cycleWeeks,
                                    vialsNeeded: r.vialsNeeded,
                                })),
                                totalVials: results.reduce((sum, r) => sum + r.vialsNeeded, 0),
                                totalCost: shoppingList.grandTotal,
                                maxWeeks: shoppingList.maxCycleWeeks,
                            };
                            return (
                                <div className="mb-4 flex justify-center hide-on-print">
                                    <ShareModal
                                        data={cycleData}
                                        shareUrl="https://peptidex.app/tools/cycle-planner"
                                        shareText={`My ${shoppingList.maxCycleWeeks}-week ${selectedStack?.stack_name || "peptide"} cycle plan — built on PeptiDex \uD83E\uDDEC`}
                                        buttonLabel="Share My Cycle"
                                    />
                                </div>
                            );
                        })()}
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
