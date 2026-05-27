"use client";
import Link from 'next/link';
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { peptides } from "@/data/peptides";
import { peptideBlends, PeptideBlend } from "@/data/blends";
import { SHORT_DISCLAIMER } from "@/data/constants";
import { Calculator, ShieldAlert, ChevronDown, Droplets, FlaskConical, ShoppingBag, ShieldCheck, ArrowRight, ExternalLink, Info, Beaker, GraduationCap, TestTubeDiagonal, AlertTriangle, Copy, Check } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";
import { EmbedModal } from "@/components/embed-modal";
import { ShareModal } from "@/components/share-card/share-modal";
import type { CalculatorCardData } from "@/components/share-card/card-templates";
import { aminoClubProductMapping } from "@/data/affiliates";
import { trackOutboundClick } from "@/lib/ga4-events";
import { trackClick } from "@/lib/tracking/click";
import { vendorPricing } from "@/data/vendor-pricing";
import { DisclaimerCard, InlineDisclaimer } from "@/components/ui/DisclaimerCard";

import { ToolPageConversionBlock } from "@/components/promos/ToolPageConversionBlock";
import {
    SYRINGE_PROFILES,
    getSyringeProfile,
    calculateReconstitution,
    validateReconstitutionInputs,
    formatConcentration,
    RECONSTITUTION_ERROR_MESSAGES,
} from "@/lib/calc/reconstitution";

type SelectionType = "peptide" | "blend";

interface Selection {
    type: SelectionType;
    slug: string;
}

interface CalculatorClientProps {
    initialPeptideSlug?: string;
    initialVialMg?: string;
    initialBacWaterMl?: string;
    initialTargetConcentrationMcg?: string;
}

export default function CalculatorClient({
    initialPeptideSlug = "",
    initialVialMg = "",
    initialBacWaterMl = "",
    initialTargetConcentrationMcg = ""
}: CalculatorClientProps = {}) {
    const [selection, setSelection] = useState<Selection | null>(() => {
        if (initialPeptideSlug) {
            const isBlend = peptideBlends.some((b) => b.slug === initialPeptideSlug);
            return { type: isBlend ? "blend" : "peptide", slug: initialPeptideSlug };
        }
        return null;
    });
    const [vialMg, setVialMg] = useState(initialVialMg);
    const [bacWaterMl, setBacWaterMl] = useState(initialBacWaterMl);
    const [targetConcentrationMcg, setTargetConcentrationMcg] = useState(initialTargetConcentrationMcg);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showMathTooltip, setShowMathTooltip] = useState(false);
    // Bug 1 fix: syringe selector state
    const [syringeProfileId, setSyringeProfileId] = useState<string>('1mL_100u');

    const peptide = useMemo(() =>
        selection?.type === "peptide" ? peptides.find((p) => p.slug === selection.slug) : null,
        [selection]
    );

    const blend = useMemo(() =>
        selection?.type === "blend" ? peptideBlends.find((b) => b.slug === selection.slug) : null,
        [selection]
    );

    const selectedName = peptide ? `${getCategoryIcon(peptide.category)} ${peptide.name}` : blend ? `${getCategoryIcon(blend.category)} ${blend.name}` : null;

    // Parse first mcg value from blend's typical_ratio (e.g. "BPC-157 500mcg + TB-500 2.5mg")
    function parseBlendConcentration(blend: PeptideBlend): number | null {
        const match = blend.typical_ratio.match(/(\d+(?:\.\d+)?)\s*mcg/i);
        return match ? parseFloat(match[1]) : null;
    }

    // Bug 5 fix: safe numeric parser — rejects negatives, returns null for empty/invalid
    function safePositive(raw: string): number | null {
        const v = parseFloat(raw);
        if (isNaN(v) || v < 0) return null;
        return v;
    }

    const calcResult = useMemo(() => {
        const v = safePositive(vialMg);
        const w = safePositive(bacWaterMl);
        const d = parseFloat(targetConcentrationMcg);
        const syringe = getSyringeProfile(syringeProfileId);

        // FIX: use explicit null-check, not falsy (0 is a valid parsed value that should reach validation)
        if (v === null || w === null) return null;
        const validationError = validateReconstitutionInputs(v, w, isNaN(d) ? 0 : d);
        if (validationError) return { error: RECONSTITUTION_ERROR_MESSAGES[validationError] };

        const concentration = calculateReconstitution({ vialMg: v, bacWaterMl: w, targetDoseMcg: 0, syringe });
        if (isNaN(d) || d < 0) return { concentration: concentration.concentrationMcgPerMl };

        const full = calculateReconstitution({ vialMg: v, bacWaterMl: w, targetDoseMcg: d, syringe });
        return { concentration: full.concentrationMcgPerMl, full };
    }, [vialMg, bacWaterMl, targetConcentrationMcg, syringeProfileId]);

    // Derived display values
    const concentration   = calcResult && 'concentration' in calcResult ? calcResult.concentration ?? null : null;
    const calcFull        = calcResult && 'full' in calcResult ? calcResult.full ?? null : null;
    const dispenseMl      = calcFull?.dispenseMl ?? null;
    const graduatedUnits  = calcFull?.syringeUnitsRounded ?? null;
    const syringeUnits    = calcFull?.syringeUnits ?? null;
    const exceedsCapacity = calcFull?.exceedsCapacity ?? false;
    const calcError       = calcResult && 'error' in calcResult ? calcResult.error : null;
    const activeSyringe   = getSyringeProfile(syringeProfileId);

    // Copy result to clipboard
    const [copied, setCopied] = useState(false);
    const handleCopy = useCallback(() => {
        if (!concentration) return;
        const pepName = peptide?.name || blend?.name || 'Peptide';
        const lines = [
            `PeptiDex Reconstitution Result — ${pepName}`,
            `Vial: ${vialMg} mg  |  BAC Water: ${bacWaterMl} mL`,
            `Concentration: ${formatConcentration(concentration)} mcg/mL`,
        ];
        if (dispenseMl !== null) {
            lines.push(`Target Dose: ${targetConcentrationMcg} mcg`);
            lines.push(`Dispense: ${dispenseMl.toFixed(3)} mL  =  ${syringeUnits} units (${activeSyringe.label})`);
        }
        lines.push('Calculated at https://peptidex.app/tools/calculator');
        navigator.clipboard.writeText(lines.join('\n')).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [concentration, dispenseMl, syringeUnits, activeSyringe, vialMg, bacWaterMl, targetConcentrationMcg, peptide, blend]);

    const selectPeptide = (slug: string) => {
        setSelection({ type: "peptide", slug });
        setDropdownOpen(false);
        setSearchQuery("");
        const p = peptides.find((x) => x.slug === slug);
        if (p?.dosing) {
            if (p.dosing.typical_vial_mg) setVialMg(String(p.dosing.typical_vial_mg));
            if (p.dosing.reconstitution_ml) setBacWaterMl(String(p.dosing.reconstitution_ml));
            setTargetConcentrationMcg(String(p.dosing.typical_dose_mcg[0]));
        }
    };

    const selectBlend = (slug: string) => {
        setSelection({ type: "blend", slug });
        setDropdownOpen(false);
        setSearchQuery("");
        const b = peptideBlends.find((x) => x.slug === slug);
        if (b) {
            const conc = parseBlendConcentration(b);
            if (conc) setTargetConcentrationMcg(String(conc));
            setVialMg("");
            setBacWaterMl("");
        }
    };

    // Filter peptides and blends by search
    const filteredPeptides = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return peptides.filter((p) => p.dosing && (
            !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
        ));
    }, [searchQuery]);

    const filteredBlends = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return peptideBlends.filter((b) =>
            !q || b.name.toLowerCase().includes(q) || b.nickname.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.components.some(c => c.toLowerCase().includes(q))
        );
    }, [searchQuery]);

    return (
        <>

            <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 relative z-10">
                {/* Tool Disclaimer */}
                <DisclaimerCard variant="tool" className="mb-6" />

            {/* ═══════ DILUTION MATH TOOLTIP ═══════ */}
            <div className="mb-6">
                <button
                    onClick={() => setShowMathTooltip(!showMathTooltip)}
                    className="flex items-center gap-2 px-3 py-2.5 min-h-[44px] rounded-xl border border-zinc-700 bg-zinc-900/50 text-xs font-semibold text-zinc-300 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all w-full"
                >
                    <GraduationCap className="w-4 h-4 text-blue-400" />
                    <span>How Peptide Dilution Math Works</span>
                    <Info className="w-3.5 h-3.5 ml-auto text-zinc-500" />
                </button>
                <AnimatePresence>
                    {showMathTooltip && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-2 rounded-xl bg-zinc-900/80 border border-blue-500/20 p-5">
                                <h3 className="text-sm font-bold text-blue-300 mb-3 flex items-center gap-2">
                                    <TestTubeDiagonal className="w-4 h-4" /> Reconstitution Science
                                </h3>
                                <div className="space-y-3 text-xs text-zinc-400 leading-relaxed">
                                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 font-mono text-center">
                                        <p className="text-emerald-400 font-bold text-sm mb-1">Concentration (mcg/mL) = Peptide Mass (mg) × 1000 ÷ Diluent Volume (mL)</p>
                                    </div>
                                    <p>
                                        <strong className="text-zinc-300">Step 1 — Reconstitution:</strong> A lyophilized peptide arrives as a freeze-dried powder. Adding bacteriostatic water (BAC water) dissolves the peptide into a homogenous solution. The ratio of peptide mass to diluent volume determines the <em>solution concentration</em>.
                                    </p>
                                    <p>
                                        <strong className="text-zinc-300">Step 2 — Concentration Calculation:</strong> Example: A 5mg vial reconstituted with 2mL of BAC water produces a solution with a concentration of <span className="text-emerald-400 font-semibold">2,500 mcg/mL</span> (5 × 1000 ÷ 2).
                                    </p>
                                    <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 font-mono text-center">
                                        <p className="text-emerald-400 font-bold text-sm mb-1">Volume to Dispense (mL) = Target Amount (mcg) ÷ Concentration (mcg/mL)</p>
                                    </div>
                                    <p>
                                        <strong className="text-zinc-300">Step 3 — Volumetric Measurement:</strong> To dispense a specific amount of peptide, divide the target amount by the solution concentration. Example: To dispense 250 mcg from a 2,500 mcg/mL solution, measure <span className="text-emerald-400 font-semibold">0.10 mL</span> (250 ÷ 2,500).
                                    </p>
                                    <p>
                                        <strong className="text-zinc-300">Step 4 — Graduated Pipette Reading:</strong> On a standard 1mL graduated pipette with 100 tick marks, each tick = 0.01 mL. So 0.10 mL = <span className="text-emerald-400 font-semibold">10 tick marks</span>.
                                    </p>
                                    <p className="text-[10px] text-zinc-500 italic mt-2 pt-2 border-t border-zinc-800">
                                        All calculations are based on standard C₁V₁ = C₂V₂ dilution principles. Always verify concentrations with HPLC or mass spectrometry for critical research applications.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Compound Selector */}
            <div className="relative mb-6">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Select Research Compound</label>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 min-h-[44px] rounded-xl border border-zinc-700 bg-zinc-900 text-sm text-zinc-200 hover:border-emerald-500/40 transition-colors">
                    <span>{selectedName || "Choose a peptide or blend..."}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full max-h-80 overflow-auto rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
                        {/* Search inside dropdown */}
                        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-2">
                            <input
                                type="text"
                                placeholder="Search compounds..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
                            />
                        </div>

                        {/* Individual Peptides */}
                        {filteredPeptides.length > 0 && (
                            <>
                                {/* Bug 7 fix: unique top offsets per section prevent header overlap */}
                                <div className="px-4 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900/80 sticky top-[52px] z-10 border-b border-zinc-800/50">
                                    Individual Peptides
                                </div>
                                {filteredPeptides.map((p) => (
                                    <button key={p.slug} onClick={() => selectPeptide(p.slug)}
                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-zinc-800/50 last:border-0 ${selection?.type === "peptide" && selection.slug === p.slug ? "bg-emerald-500/15 text-emerald-300" : "text-zinc-200 hover:bg-emerald-500/10"}`}>
                                        {getCategoryIcon(p.category)} {p.name}
                                    </button>
                                ))}
                            </>
                        )}

                        {/* Blends */}
                        {filteredBlends.length > 0 && (
                            <>
                                <div className="px-4 py-2 text-[10px] font-bold text-violet-400/80 uppercase tracking-widest bg-zinc-900/80 sticky top-[84px] z-10 border-b border-zinc-800/50 flex items-center gap-1.5">
                                    <FlaskConical className="w-3 h-3" />
                                    Peptide Blends
                                </div>
                                {filteredBlends.map((b) => (
                                    <button key={b.slug} onClick={() => selectBlend(b.slug)}
                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-zinc-800/50 last:border-0 ${selection?.type === "blend" && selection.slug === b.slug ? "bg-violet-500/15 text-violet-300" : "text-zinc-200 hover:bg-violet-500/10"}`}>
                                        {getCategoryIcon(b.category)} {b.name}
                                        <span className="text-zinc-500 text-xs ml-1">({b.nickname})</span>
                                    </button>
                                ))}
                            </>
                        )}

                        {filteredPeptides.length === 0 && filteredBlends.length === 0 && (
                            <div className="px-4 py-6 text-center text-xs text-zinc-500">No results found</div>
                        )}
                    </div>
                )}
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Lyophilized Mass (mg)</label>
                    {/* Bug 5 fix: min="0" prevents negative values at browser level */}
                    <input type="number" min="0" value={vialMg} onChange={(e) => setVialMg(e.target.value)} placeholder="e.g. 5"
                        className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                    <p className="text-[9px] text-zinc-600 mt-1">Total peptide content per vial</p>
                </div>
                <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Diluent Volume (mL)</label>
                    <input type="number" min="0" value={bacWaterMl} onChange={(e) => setBacWaterMl(e.target.value)} placeholder="e.g. 2"
                        className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                    <p className="text-[9px] text-zinc-600 mt-1">BAC water or sterile water volume</p>
                </div>
                <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Target Amount (mcg)</label>
                    <input type="number" min="0" value={targetConcentrationMcg} onChange={(e) => setTargetConcentrationMcg(e.target.value)} placeholder="e.g. 250"
                        className="w-full px-4 py-3 min-h-[44px] rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                    <p className="text-[9px] text-zinc-600 mt-1">Desired amount of peptide to dispense</p>
                </div>
            </div>

            {/* Bug 1 fix: Syringe selector */}
            <div className="mb-6">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Syringe / Pipette Size</label>
                <div className="flex flex-wrap gap-2">
                    {SYRINGE_PROFILES.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setSyringeProfileId(s.id)}
                            className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-all min-h-[36px] ${
                                syringeProfileId === s.id
                                    ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300'
                                    : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500'
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bug 5 fix: validation error display */}
            {calcError && (
                <div className="flex items-center gap-2 px-4 py-3 mb-4 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    {calcError}
                </div>
            )}

            {/* Bug 3+4 fix: Results — only show full card when dispense is computed */}
            {concentration !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mb-6">
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-900/30 to-emerald-950/20 border border-emerald-500/20 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Droplets className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Reconstitution Results</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs text-zinc-500 mb-1">Concentration</p>
                                <p className="text-xl font-bold text-emerald-400">{formatConcentration(concentration)}</p>
                                <p className="text-[10px] text-zinc-600">mcg/mL</p>
                            </div>
                            {dispenseMl !== null ? (
                                <div>
                                    <p className="text-xs text-zinc-500 mb-1">Dispense Volume</p>
                                    <p className="text-xl font-bold text-emerald-400">{dispenseMl.toFixed(3)}</p>
                                    <p className="text-[10px] text-zinc-600">mL = {syringeUnits !== null ? (syringeUnits % 1 === 0 ? syringeUnits.toFixed(0) : syringeUnits.toFixed(1)) : '—'} U-100 units</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-xs text-zinc-500 mb-1">Dispense Volume</p>
                                    <p className="text-sm text-zinc-600 italic">Enter target dose</p>
                                </div>
                            )}
                            {dispenseMl !== null && parseFloat(vialMg) > 0 && parseFloat(targetConcentrationMcg) > 0 && (() => {
                                const totalMcg = parseFloat(vialMg) * 1000;
                                const doseMcg = parseFloat(targetConcentrationMcg);
                                const dosesPerVial = doseMcg > 0 ? Math.floor(totalMcg / doseMcg) : 0;
                                const freq = peptide?.dosing?.frequency?.toLowerCase() ?? '';
                                const perWeek = freq.includes('daily') || freq.includes('every day') ? 7 : freq.includes('2x') || freq.includes('twice') ? 14 : freq.includes('3x') ? 21 : freq.includes('eod') || freq.includes('every other') ? 3.5 : 7;
                                const daysSupply = perWeek > 0 ? Math.floor((dosesPerVial / perWeek) * 7) : dosesPerVial;
                                return (<>
                                    <div>
                                        <p className="text-xs text-zinc-500 mb-1">Doses / Vial</p>
                                        <p className="text-xl font-bold text-amber-400">{dosesPerVial}</p>
                                        <p className="text-[10px] text-zinc-600">at {doseMcg} mcg each</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500 mb-1">Days Supply</p>
                                        <p className="text-xl font-bold text-amber-400">{daysSupply}</p>
                                        <p className="text-[10px] text-zinc-600">{peptide?.dosing?.frequency ?? 'per protocol'}</p>
                                    </div>
                                </>);
                            })()}
                        </div>
                    </div>

                    {/* U-100 Insulin Syringe Visual */}
                    {graduatedUnits !== null && (
                        <div className="rounded-2xl bg-zinc-900/60 border border-emerald-500/20 p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <TestTubeDiagonal className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-semibold text-emerald-300">U-100 Insulin Syringe</span>
                                <span className="ml-auto text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">{activeSyringe.label}</span>
                            </div>
                            {exceedsCapacity ? (
                                <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm text-amber-300">
                                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Volume exceeds syringe capacity</p>
                                        <p className="text-xs text-amber-400/80 mt-1">
                                            {dispenseMl!.toFixed(3)} mL exceeds the {activeSyringe.maxMl} mL of a {activeSyringe.label} syringe. Switch syringe size above.
                                        </p>
                                    </div>
                                </div>
                            ) : (() => {
                                const fillPct = Math.min(Math.max((graduatedUnits ?? 0) / activeSyringe.maxUnits, 0), 1);
                                // barrel: x=60..390 (330px wide), y=38..78 (40px tall)
                                const barrelX = 60; const barrelW = 330; const barrelY = 38; const barrelH = 40;
                                const fillW = fillPct * barrelW;
                                const markX = barrelX + fillW;
                                // Tick mark positions: every 10 units
                                const ticks = Array.from({ length: activeSyringe.maxUnits / 10 + 1 }, (_, i) => i * 10);
                                return (
                                    <>
                                    <div className="relative w-full overflow-x-auto">
                                        <svg viewBox="0 0 480 120" className="w-full max-w-xl mx-auto" preserveAspectRatio="xMidYMid meet">
                                            <defs>
                                                <linearGradient id="syringeFluid" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#059669" stopOpacity="0.95" />
                                                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.95" />
                                                </linearGradient>
                                                <linearGradient id="barrelGrad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#27272a" />
                                                    <stop offset="100%" stopColor="#18181b" />
                                                </linearGradient>
                                                <clipPath id="fluidClip">
                                                    <rect x={barrelX + 1} y={barrelY + 1} width={barrelW - 2} height={barrelH - 2} rx="3" />
                                                </clipPath>
                                            </defs>

                                            {/* Needle hub */}
                                            <rect x="20" y="50" width="18" height="16" rx="2" fill="#52525b" />
                                            {/* Needle */}
                                            <line x1="38" y1="58" x2="60" y2="58" stroke="#a1a1aa" strokeWidth="2" />

                                            {/* Barrel body */}
                                            <rect x={barrelX} y={barrelY} width={barrelW} height={barrelH} rx="5" fill="url(#barrelGrad)" stroke="#3f3f46" strokeWidth="1.5" />

                                            {/* Fluid fill */}
                                            <motion.rect
                                                x={barrelX + 1} y={barrelY + 1} height={barrelH - 2} rx="3"
                                                fill="url(#syringeFluid)"
                                                clipPath="url(#fluidClip)"
                                                initial={{ width: 0 }}
                                                animate={{ width: Math.max(fillW - 2, 0) }}
                                                transition={{ duration: 0.9, ease: 'easeOut' }}
                                            />

                                            {/* Tick marks (from right = 0, left = max, fill left→right for fluid) */}
                                            {ticks.map(unit => {
                                                const x = barrelX + (unit / activeSyringe.maxUnits) * barrelW;
                                                const isMajor = unit % 20 === 0;
                                                const isTarget = Math.abs(unit - (graduatedUnits ?? 0)) < 5 && unit > 0;
                                                return (
                                                    <g key={unit}>
                                                        <line x1={x} y1={isMajor ? barrelY - 7 : barrelY - 4}
                                                              x2={x} y2={isMajor ? barrelY + barrelH + 7 : barrelY + barrelH + 4}
                                                              stroke={isTarget ? '#fbbf24' : isMajor ? '#71717a' : '#3f3f46'}
                                                              strokeWidth={isTarget ? 2 : isMajor ? 1.5 : 1} />
                                                        {isMajor && (
                                                            <text x={x} y={barrelY + barrelH + 18} textAnchor="middle" fontSize="8" fill="#71717a">{unit}</text>
                                                        )}
                                                    </g>
                                                );
                                            })}

                                            {/* Dose mark line */}
                                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                                                <motion.line
                                                    x1={markX} y1={barrelY - 12} x2={markX} y2={barrelY + barrelH + 12}
                                                    stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 3"
                                                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                                                    transition={{ duration: 0.4, delay: 0.85 }}
                                                />
                                                {/* Callout bubble */}
                                                <rect x={Math.min(markX - 44, 380)} y={barrelY - 30} width={88} height={18} rx="5" fill="#92400e" fillOpacity="0.9" />
                                                <text x={Math.min(markX, 424)} y={barrelY - 17} textAnchor="middle" fontSize="9" fill="#fcd34d" fontWeight="bold">
                                                    {`${syringeUnits ?? 0} units · ${dispenseMl!.toFixed(3)} mL`}
                                                </text>
                                            </motion.g>

                                            {/* Plunger rod */}
                                            <motion.g
                                                initial={{ x: -barrelW }}
                                                animate={{ x: -(barrelW - fillW) }}
                                                transition={{ duration: 0.9, ease: 'easeOut' }}
                                            >
                                                <rect x={barrelX + barrelW - 6} y={barrelY + 2} width="6" height={barrelH - 4} rx="1" fill="#3f3f46" />
                                                <rect x={barrelX + barrelW + 6} y={barrelY - 4} width="44" height={barrelH + 8} rx="3" fill="#27272a" stroke="#52525b" strokeWidth="1" />
                                                <rect x={barrelX + barrelW + 50} y={barrelY + 8} width="8" height={barrelH - 16} rx="2" fill="#3f3f46" />
                                            </motion.g>

                                            {/* Scale labels */}
                                            <text x={barrelX} y={barrelY + barrelH + 28} textAnchor="middle" fontSize="7" fill="#52525b">0</text>
                                            <text x={barrelX + barrelW} y={barrelY + barrelH + 28} textAnchor="middle" fontSize="7" fill="#52525b">{activeSyringe.maxUnits}u</text>
                                        </svg>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
                                        <span className="text-zinc-600">0u (empty)</span>
                                        <div className="text-center">
                                            <span className="text-2xl font-black text-amber-400">{syringeUnits}</span>
                                            <span className="text-zinc-400 ml-1 text-sm">units</span>
                                            <p className="text-[10px] text-zinc-500 mt-0.5">= {dispenseMl!.toFixed(3)} mL on a U-100 syringe</p>
                                        </div>
                                        <span className="text-zinc-600">{activeSyringe.maxUnits}u (full)</span>
                                    </div>
                                    </>
                                );
                            })()}
                        </div>
                    )}

                    {/* ── U-100 Syringe Conversion Table ── */}
                    {dispenseMl !== null && syringeUnits !== null && (
                        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-700 p-5 mt-3">
                            <div className="flex items-center gap-2 mb-3">
                                <Calculator className="w-4 h-4 text-amber-400" />
                                <span className="text-sm font-semibold text-zinc-200">U-100 Insulin Syringe Quick Reference</span>
                                <span className="ml-auto text-[10px] text-zinc-500 font-mono">100 units = 1 mL</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs font-mono">
                                    <thead>
                                        <tr className="border-b border-zinc-800">
                                            <th className="text-left py-1.5 pr-4 text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">Dose (mcg)</th>
                                            <th className="text-right py-1.5 pr-4 text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">Volume (mL)</th>
                                            <th className="text-right py-1.5 text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">Units (U-100)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(() => {
                                            const conc = concentration!;
                                            const doses = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map(mult => {
                                                const d = Math.round(parseFloat(targetConcentrationMcg) * mult);
                                                return d;
                                            }).filter((d, i, arr) => d > 0 && arr.indexOf(d) === i).slice(0, 6);
                                            const targetDose = parseFloat(targetConcentrationMcg);
                                            return doses.map(dose => {
                                                const vol = dose / conc;
                                                const units = vol * 100;
                                                const isTarget = Math.abs(dose - targetDose) < 0.5;
                                                return (
                                                    <tr key={dose} className={`border-b border-zinc-800/50 last:border-0 ${isTarget ? 'bg-amber-500/8' : ''}`}>
                                                        <td className={`py-1.5 pr-4 ${isTarget ? 'text-amber-300 font-bold' : 'text-zinc-400'}`}>{dose} mcg{isTarget ? ' ◀ target' : ''}</td>
                                                        <td className={`text-right pr-4 ${isTarget ? 'text-amber-300 font-bold' : 'text-zinc-400'}`}>{vol.toFixed(3)}</td>
                                                        <td className={`text-right ${isTarget ? 'text-amber-300 font-bold' : 'text-zinc-400'}`}>{units.toFixed(1)}</td>
                                                    </tr>
                                                );
                                            });
                                        })()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ── Copy Result Button ── */}
                    {concentration !== null && (
                        <div className="flex justify-end mt-3">
                            <button
                                onClick={handleCopy}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
                                    copied
                                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                        : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                                }`}
                                id="copy-result-btn"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? 'Copied!' : 'Copy Result'}
                            </button>
                        </div>
                    )}
                </motion.div>
            )}

            {/* Conversion block */}
            {concentration !== null && dispenseMl !== null && (
              <ToolPageConversionBlock
                surface="tool_calculator"
                peptide={peptide?.slug}
                className="mb-6"
              />
            )}

            {/* Share My Results */}
            {concentration && dispenseMl !== null && (() => {
                const pepName = peptide?.name || blend?.name || "Peptide";
                const vMg = parseFloat(vialMg) || 0;
                const bMl = parseFloat(bacWaterMl) || 0;
                const dMcg = parseFloat(targetConcentrationMcg) || 0;
                const dispensesPerVial = dMcg > 0 ? Math.floor((vMg * 1000) / dMcg) : 0;
                const shareData: CalculatorCardData = {
                    type: "calculator",
                    peptideName: pepName,
                    vialMg: vMg,
                    bacWaterMl: bMl,
                    doseMcg: dMcg,
                    syringeUnits: graduatedUnits || 0,
                    concentration: concentration,
                    dosesPerVial: dispensesPerVial,
                };
                return (
                    <div className="mt-4 mb-6 flex justify-center">
                        <ShareModal
                            data={shareData}
                            shareUrl="https://peptidex.app/tools/calculator"
                            shareText={`${pepName} reconstitution protocol — calculated on PeptiDex`}
                            buttonLabel="Share Reconstitution Protocol"
                        />
                    </div>
                );
            })()}

            {/* ── Where to Buy — multi-vendor CTA ── */}
            {concentration && dispenseMl !== null && (() => {
                const pepName = peptide?.name || blend?.name || 'Peptide';
                const pepSlug = peptide?.slug || blend?.slug || '';
                const vMg = parseFloat(vialMg) || 0;
                const dMcg = parseFloat(targetConcentrationMcg) || 0;
                const dispensesPerVial = dMcg > 0 ? Math.floor((vMg * 1000) / dMcg) : 0;

                // Top-3 vendors for this peptide from the pricing data layer
                const pricingEntry = vendorPricing.find(p => p.slug === pepSlug || p.name === pepName);
                const topVendors = (pricingEntry?.vendors ?? [])
                    .filter(v => v.inStock && v.price_usd > 0 && v.vial_mg > 0)
                    .sort((a, b) => (a.price_usd / a.vial_mg) - (b.price_usd / b.vial_mg))
                    .slice(0, 3);

                // Fallback: Amino Club generic link if no pricing data
                const fallbackUrl = (() => {
                    const base = aminoClubProductMapping[pepSlug] || 'https://aminoclub.com';
                    return base + (base.includes('?') ? '&' : '?') + 'utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=calculator_fallback&code=PEPTIDEX';
                })();

                let supplyEstimate = '';
                if (peptide?.dosing && dispensesPerVial > 0) {
                    const cycleLength = peptide.dosing.cycle_weeks?.[0] || 8;
                    const freq = (peptide.dosing.frequency || 'daily').toLowerCase();
                    const perWeek = freq.includes('daily') ? 7 : freq.includes('2x') ? 2 : freq.includes('5 on') ? 5 : 7;
                    const neededVials = Math.ceil((perWeek * cycleLength) / dispensesPerVial);
                    supplyEstimate = `${dispensesPerVial} doses/vial · ~${neededVials} vial${neededVials !== 1 ? 's' : ''} for a ${cycleLength}-week protocol`;
                }

                return (
                    <div className="mb-8">
                        <InlineDisclaimer type="affiliate" className="mb-2" />
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden"
                    >
                        <div className="flex items-center gap-2 px-5 py-4 border-b border-zinc-800">
                            <ShoppingBag className="w-4 h-4 text-emerald-400" />
                            <h2 className="text-sm font-bold text-zinc-100">Where to Buy {pepName}</h2>
                            {supplyEstimate && <span className="ml-auto text-[10px] text-emerald-400 font-mono">{supplyEstimate}</span>}
                        </div>

                        {topVendors.length > 0 ? (
                            <div className="divide-y divide-zinc-800/60">
                                {topVendors.map((v, i) => (
                                    <div key={v.vendor} className="flex items-center justify-between gap-4 px-5 py-3">
                                        <div>
                                            <span className="text-sm font-semibold text-zinc-200">{v.vendor}</span>
                                            {i === 0 && <span className="ml-2 text-[9px] font-bold text-emerald-400 border border-emerald-500/30 rounded px-1.5 py-0.5 uppercase tracking-wider">Best Price</span>}
                                            <div className="text-[10px] text-zinc-500 mt-0.5">{v.vial_mg}mg vial</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-base font-bold text-zinc-100">${v.price_usd.toFixed(2)}</span>
                                            <a
                                                href={v.affiliateUrl}
                                                target="_blank"
                                                rel="sponsored nofollow noopener"
                                                onClick={() => {
                                                    trackOutboundClick(v.vendor, v.affiliateUrl, 'calculator_where_to_buy');
                                                    trackClick({ peptide_slug: pepSlug || 'general', vendor_slug: v.vendor, page_path: typeof window !== 'undefined' ? window.location.pathname : '/', surface: 'tool_calculator' });
                                                }}
                                                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                                            >
                                                Shop <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between gap-4 px-5 py-4">
                                <div>
                                    <span className="text-sm font-semibold text-zinc-200">Amino Club</span>
                                    <span className="ml-2 text-[9px] font-bold text-amber-400 border border-amber-500/30 rounded px-1.5 py-0.5 uppercase tracking-wider">Editor&apos;s Pick</span>
                                    <div className="text-[10px] text-zinc-500 mt-0.5">COA-verified · Use code PEPTIDEX for 20% off</div>
                                </div>
                                <a
                                    href={fallbackUrl}
                                    target="_blank"
                                    rel="sponsored nofollow noopener"
                                    onClick={() => {
                                        trackOutboundClick('Amino Club', fallbackUrl, 'calculator_where_to_buy_fallback');
                                        trackClick({ peptide_slug: pepSlug || 'general', vendor_slug: 'amino-club', page_path: typeof window !== 'undefined' ? window.location.pathname : '/', surface: 'tool_calculator' });
                                    }}
                                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                                >
                                    Shop <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        )}

                        <div className="px-5 py-3 border-t border-zinc-800 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-600">
                            <span>⚠ Affiliate disclosure: PeptiDex earns a commission on qualifying purchases.</span>
                            <span>Prices verified from vendor sites — confirm at checkout.</span>
                        </div>

                        {/* Cycle Planner CTA */}
                        {pepSlug && (
                            <div className="px-5 py-4 border-t border-zinc-800 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-zinc-300">Ready to plan a full protocol?</p>
                                    <p className="text-[10px] text-zinc-500 mt-0.5">Cycle timing, off-weeks, and stack optimization — built around this compound.</p>
                                </div>
                                <Link
                                    href={`/tools/cycle-planner?peptide=${pepSlug}`}
                                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-bold hover:bg-emerald-500/20 transition-colors whitespace-nowrap"
                                >
                                    Plan a Cycle <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                    </div>
                );
            })()}

            {/* Compound Reference Data */}
            {peptide?.dosing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-5">
                    <h3 className="text-sm font-semibold text-zinc-200 mb-3">&#x1F4CB; {peptide.name} Research Reference</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div><span className="text-zinc-500">Delivery Method:</span> <span className="text-zinc-300 ml-1">{peptide.dosing.route}</span></div>
                        <div><span className="text-zinc-500">Typical Range:</span> <span className="text-zinc-300 ml-1">{peptide.dosing.typical_dose_mcg[0]}-{peptide.dosing.typical_dose_mcg[1]} mcg</span></div>
                        <div><span className="text-zinc-500">Frequency:</span> <span className="text-zinc-300 ml-1">{peptide.dosing.frequency}</span></div>
                        {peptide.dosing.timing && <div><span className="text-zinc-500">Timing:</span> <span className="text-zinc-300 ml-1">{peptide.dosing.timing}</span></div>}
                        {peptide.dosing.cycle_weeks && <div className="col-span-2"><span className="text-zinc-500">Protocol Duration:</span> <span className="text-zinc-300 ml-1">{peptide.dosing.cycle_weeks[0]}-{peptide.dosing.cycle_weeks[1]} weeks</span></div>}
                        {peptide.dosing.notes && <div className="col-span-2 mt-2 p-2 rounded-lg bg-zinc-800/50"><span className="text-zinc-400">{peptide.dosing.notes}</span></div>}
                    </div>
                </motion.div>
            )}

            {/* Blend Reference Data */}
            {blend && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="rounded-2xl bg-gradient-to-br from-violet-900/20 to-violet-950/10 border border-violet-500/20 p-5">
                        <div className="flex items-center gap-2 mb-1">
                            <FlaskConical className="w-4 h-4 text-violet-400" />
                            <h3 className="text-sm font-semibold text-violet-300">{getCategoryIcon(blend.category)} {blend.name}</h3>
                        </div>
                        <p className="text-[10px] text-zinc-500 mb-4 italic">&quot;{blend.nickname}&quot;</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="col-span-full">
                                <span className="text-zinc-500 font-semibold">Typical Ratio:</span>
                                <span className="text-violet-300 ml-1 font-medium">{blend.typical_ratio}</span>
                            </div>
                            <div className="col-span-full">
                                <span className="text-zinc-500 font-semibold">Components:</span>
                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    {blend.components.map((c) => (
                                        <span key={c} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20">{c}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-full mt-2 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                                <span className="text-zinc-500 font-semibold block mb-1">Protocol Notes:</span>
                                <span className="text-zinc-300 leading-relaxed">{blend.dosing_notes}</span>
                            </div>
                            <div className="col-span-full p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                                <span className="text-zinc-500 font-semibold block mb-1">Safety:</span>
                                <span className="text-zinc-400 leading-relaxed">{blend.safety_notes}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
        </>
    );
}
