"use client";
import Link from 'next/link';
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { peptides } from "@/data/peptides";
import { peptideBlends, PeptideBlend } from "@/data/blends";
import { SHORT_DISCLAIMER } from "@/data/constants";
import { Calculator, ShieldAlert, ChevronDown, Droplets, FlaskConical, ShoppingBag, ShieldCheck, ArrowRight, ExternalLink, Info, Beaker, GraduationCap, TestTubeDiagonal, AlertTriangle } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";
import { EmbedModal } from "@/components/embed-modal";
import { ShareModal } from "@/components/share-card/share-modal";
import type { CalculatorCardData } from "@/components/share-card/card-templates";
import { aminoClubProductMapping } from "@/data/affiliates";
import { trackOutboundClick } from "@/lib/ga4-events";
import { buildHowToSchema, buildSoftwareApplicationSchema } from "@/lib/seo/schema";
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

export default function CalculatorPage() {
    const [selection, setSelection] = useState<Selection | null>(null);
    const [vialMg, setVialMg] = useState("");
    const [bacWaterMl, setBacWaterMl] = useState("");
    const [targetConcentrationMcg, setTargetConcentrationMcg] = useState("");
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

    // Bug 1+2+3 fix: single calculation block using pure function
    const calcResult = useMemo(() => {
        const v = safePositive(vialMg);
        const w = safePositive(bacWaterMl);
        const d = parseFloat(targetConcentrationMcg);
        const syringe = getSyringeProfile(syringeProfileId);

        if (!v || !w) return null;
        // Input validation (Bug 5)
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

    const softwareSchema = buildSoftwareApplicationSchema({
        name: "PeptiDex Reconstitution Calculator",
        description: "Calculate solution concentrations and volumetric measurements for peptide reconstitution.",
        url: "https://peptidex.app/tools/calculator",
        applicationCategory: "UtilityApplication"
    });

    const howToSchema = buildHowToSchema({
        name: "How to Reconstitute Peptides",
        description: "Step-by-step guide to calculating and measuring peptide reconstitution.",
        totalTime: "PT5M",
        supply: ["Lyophilized Peptide", "Bacteriostatic Water"],
        tool: ["Graduated Pipette"],
        steps: [
            { name: "Step 1: Reconstitution", text: "Add bacteriostatic water to the lyophilized peptide. The ratio determines the concentration." },
            { name: "Step 2: Concentration Calculation", text: "Divide total peptide mass by diluent volume to find the concentration in mcg/mL." },
            { name: "Step 3: Volumetric Measurement", text: "Divide the target dose by the concentration to find the volume to dispense in mL." }
        ]
    });

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            {/* Editorial Page Header */}
            <header className="cmp-hero" style={{ position: 'relative', overflow: 'hidden', padding: '64px 24px 48px', background: 'var(--bg)', borderBottom: '1px solid var(--line)' }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    maskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at 70% 30%, black 0%, transparent 70%)',
                    opacity: 0.4, pointerEvents: 'none' as const
                }} />
                <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
                    <div style={{
                        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em',
                        textTransform: 'uppercase' as const, color: 'var(--ink-mute)',
                        marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <Link href="/" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Home</Link>
                        <span style={{ color: 'var(--line-strong)' }}>/</span>
                        <Link href="/tools" style={{ color: 'var(--ink-mute)', textDecoration: 'none' }}>Tools</Link>
                        <span style={{ color: 'var(--line-strong)' }}>/</span>
                        <span style={{ color: 'var(--gold)' }}>Calculator</span>
                    </div>
                    <div style={{
                        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
                        textTransform: 'uppercase' as const, color: 'var(--gold)',
                        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12
                    }}>
                        <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                        § Interactive Tool
                    </div>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <h1 style={{
                            fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 6vw, 64px)',
                            fontWeight: 300, lineHeight: 1, letterSpacing: '-0.03em',
                            margin: 0, maxWidth: 600
                        }}>
                            Reconstitution <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Calculator</em>.
                        </h1>
                        <div className="mt-2 hidden sm:block">
                            <EmbedModal title="Peptide Reconstitution Calculator" path="/tools/calculator" />
                        </div>
                    </div>
                    <p style={{ fontSize: 18, color: 'var(--ink-dim)', maxWidth: 680, lineHeight: 1.6 }}>
                        Calculate solution concentrations and volumetric measurements for peptide reconstitution. Need a trusted source for your research? Compare <Link href="/where-to-buy" style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: 2 }}>where to buy peptides online</Link> from our verified vendors.
                    </p>
                    
                    <div className="sm:hidden mt-6">
                        <EmbedModal title="Peptide Reconstitution Calculator" path="/tools/calculator" />
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 relative z-10">
                {/* Research-Only Disclaimer */}
                <div style={{ display: 'flex', gap: 12, padding: 16, background: 'rgba(212, 131, 42, 0.05)', border: '1px solid rgba(212, 131, 42, 0.2)', borderRadius: 12, marginBottom: 24 }}>
                    <ShieldAlert style={{ width: 16, height: 16, color: 'var(--amber)', flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: 13, color: 'var(--amber)', margin: 0, lineHeight: 1.5 }}>{SHORT_DISCLAIMER}</p>
                </div>

                {/* Lab Context Banner */}
                <div style={{ display: 'flex', gap: 12, padding: 16, background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: 12, marginBottom: 32 }}>
                    <Beaker style={{ width: 16, height: 16, color: '#38bdf8', flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: 13, color: '#bae6fd', margin: 0, lineHeight: 1.5 }}>
                        <strong style={{ color: '#38bdf8' }}>Laboratory Use Only.</strong> This tool calculates reconstitution concentrations for research-grade lyophilized peptides. All values are intended for in-vitro and authorized laboratory applications only. Not for human or animal use.
                    </p>
                </div>

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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-zinc-500 mb-1">Solution Concentration</p>
                                {/* Bug 3 fix: formatConcentration preserves meaningful decimals */}
                                <p className="text-xl font-bold text-emerald-400">{formatConcentration(concentration)} mcg/mL</p>
                            </div>
                            {dispenseMl !== null ? (
                                <div>
                                    <p className="text-xs text-zinc-500 mb-1">Volume to Dispense</p>
                                    <p className="text-xl font-bold text-emerald-400">{dispenseMl.toFixed(3)} mL</p>
                                    {syringeUnits !== null && (
                                        <p className="text-[10px] text-zinc-500 mt-0.5">
                                            = {syringeUnits % 1 === 0 ? syringeUnits.toFixed(0) : syringeUnits.toFixed(1)} units ({activeSyringe.label})
                                        </p>
                                    )}
                                </div>
                            ) : (
                                // Bug 4 fix: explicit prompt when dose not yet entered
                                <div>
                                    <p className="text-xs text-zinc-500 mb-1">Volume to Dispense</p>
                                    <p className="text-sm text-zinc-600 italic">Enter target dose above</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bug 6 fix: pipette with fallback when volume exceeds capacity */}
                    {graduatedUnits !== null && (
                        <div className="rounded-2xl bg-zinc-900/60 border border-emerald-500/20 p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <TestTubeDiagonal className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-semibold text-emerald-300">Visual Pipette Guide</span>
                                <span className="ml-auto text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">{activeSyringe.label} Syringe</span>
                            </div>
                            {exceedsCapacity ? (
                                <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm text-amber-300">
                                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold">Volume exceeds syringe capacity</p>
                                        <p className="text-xs text-amber-400/80 mt-1">
                                            {dispenseMl!.toFixed(3)} mL exceeds the {activeSyringe.maxMl} mL capacity of a {activeSyringe.label} syringe.
                                            Switch to a larger syringe above, or reduce your target dose.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                {/* SVG Graduated Pipette */}
                                <div className="relative w-full overflow-x-auto">
                                    <svg viewBox="0 0 480 110" className="w-full max-w-lg mx-auto" preserveAspectRatio="xMidYMid meet">
                                        {/* Pipette tip */}
                                        <rect x="14" y="47" width="26" height="16" rx="2" fill="#a1a1aa" />
                                        <polygon points="14,51 14,59 4,55" fill="#a1a1aa" />

                                        {/* Barrel outline */}
                                        <rect x="40" y="35" width="360" height="40" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />

                                        {/* Liquid fill */}
                                        <clipPath id="pipetteClip">
                                            <rect x="41" y="36" width="358" height="38" rx="5" />
                                        </clipPath>
                                        <motion.rect
                                            x="41" y="36" height="38" rx="5"
                                            fill="url(#liquidGrad)"
                                            clipPath="url(#pipetteClip)"
                                            initial={{ width: 0 }}
                                            animate={{ width: (Math.min(Math.max(graduatedUnits ?? 0, 0), activeSyringe.maxUnits) / activeSyringe.maxUnits) * 358 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        />
                                        <defs>
                                            <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                                                <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
                                            </linearGradient>
                                        </defs>

                                        {/* Tick marks every 10 units */}
                                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(unit => {
                                            const x = 41 + (unit / 100) * 358;
                                            const isMajor = unit % 20 === 0;
                                            return (
                                                <g key={unit}>
                                                    <line
                                                        x1={x} y1={isMajor ? 30 : 33}
                                                        x2={x} y2={isMajor ? 75 : 72}
                                                        stroke={isMajor ? "#a1a1aa" : "#52525b"}
                                                        strokeWidth={isMajor ? 1.5 : 1}
                                                    />
                                                    {isMajor && (
                                                        <text x={x} y={86} textAnchor="middle" fontSize="8" fill="#71717a">{unit}</text>
                                                    )}
                                                </g>
                                            );
                                        })}

                                        {/* Plunger */}
                                        <motion.g
                                            initial={{ x: 0 }}
                                            animate={{ x: (Math.min(Math.max(graduatedUnits ?? 0, 0), activeSyringe.maxUnits) / activeSyringe.maxUnits) * 358 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        >
                                            <rect x="399" y="30" width="8" height="50" rx="2" fill="#52525b" />
                                            <rect x="407" y="40" width="32" height="30" rx="3" fill="#3f3f46" />
                                            <rect x="439" y="36" width="8" height="38" rx="2" fill="#27272a" />
                                        </motion.g>

                                        {/* Measurement callout */}
                                        <rect x="150" y="13" width="180" height="22" rx="6" fill="#065f46" fillOpacity="0.8" />
                                        <text x="240" y="28" textAnchor="middle" fontSize="11" fill="#34d399" fontWeight="bold">
                                            {`Measure to ${syringeUnits ?? 0} units (${dispenseMl!.toFixed(2)} mL)`}
                                        </text>

                                        {/* Arrow pointing to the level */}
                                        <motion.g
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.9 }}
                                        >
                                            <motion.line
                                                x1={41 + (Math.min(Math.max(graduatedUnits ?? 0, 0), activeSyringe.maxUnits) / activeSyringe.maxUnits) * 358}
                                                y1={23}
                                                x2={41 + (Math.min(Math.max(graduatedUnits ?? 0, 0), activeSyringe.maxUnits) / activeSyringe.maxUnits) * 358}
                                                y2={35}
                                                stroke="#34d399"
                                                strokeWidth="1.5"
                                                strokeDasharray="3 2"
                                            />
                                        </motion.g>
                                    </svg>
                                </div>

                                <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                                    <span>0.00 mL</span>
                                    <div className="text-center">
                                        <span className="text-2xl font-black text-emerald-400">{dispenseMl!.toFixed(3)}</span>
                                        <span className="text-zinc-400 ml-1">mL</span>
                                        <p className="text-[10px] text-zinc-500 mt-0.5">= {syringeUnits} units ({activeSyringe.label})</p>
                                    </div>
                                    <span>{activeSyringe.maxMl.toFixed(2)} mL</span>
                                </div>
                                </>
                            )}
                        </div>
                    )}

                </motion.div>
            )}

            {/* Conversion block — appears after result is computed */}
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

            {/* Source These Compounds — Affiliate Block */}
            {concentration && dispenseMl !== null && (() => {
                const pepName = peptide?.name || blend?.name || "Peptide";
                const slug = peptide?.slug || blend?.slug || "";
                const vMg = parseFloat(vialMg) || 0;
                const dMcg = parseFloat(targetConcentrationMcg) || 0;
                const dispensesPerVial = dMcg > 0 ? Math.floor((vMg * 1000) / dMcg) : 0;
                
                let supplyEstimate = "";

                if (peptide?.dosing && dispensesPerVial > 0) {
                    const cycleLength = peptide.dosing.cycle_weeks?.[0] || 8;
                    const freq = (peptide.dosing.frequency || "daily").toLowerCase();
                    const perWeek = freq.includes('daily') ? 7 : freq.includes('2x/week') ? 2 : freq.includes('5 on') ? 5 : 7;
                    const totalNeeded = perWeek * cycleLength;
                    const neededVials = Math.ceil(totalNeeded / dispensesPerVial);
                    
                    supplyEstimate = `${dispensesPerVial} measurements per vial. For a ${cycleLength}-week research protocol, approximately ${neededVials} vial${neededVials !== 1 ? 's' : ''} required.`;
                }

                const baseSlug = aminoClubProductMapping[slug] || "https://aminoclub.com";
                const ctaParams = baseSlug.includes("?") 
                    ? "&utm_source=affiliate_marketing&code=PEPTIDEX" 
                    : "?utm_source=affiliate_marketing&code=PEPTIDEX";
                const affiliateUrl = `${baseSlug}${ctaParams}`;

                return (
                    <motion.div 
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-emerald-500/20 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />
                        
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <ShoppingBag className="w-5 h-5 text-emerald-400" />
                            <h2 className="text-lg font-bold text-zinc-100">
                                Source {pepName} for Research
                            </h2>
                        </div>
                        
                        <div className="relative z-10 grid gap-4 p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/20 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h4 className="font-bold text-zinc-100 text-[15px]">COA-verified {pepName}</h4>
                                    {supplyEstimate && (
                                        <p className="text-xs font-semibold text-emerald-400 mt-1">
                                            {supplyEstimate}
                                        </p>
                                    )}
                                </div>
                                <a 
                                    href={affiliateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackOutboundClick("Amino Club", affiliateUrl, "calculator_source_cta")}
                                    className="inline-flex items-center justify-center shrink-0 w-full md:w-auto gap-2 px-5 py-2.5 min-h-[44px] rounded-xl font-bold transition-all text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                                >
                                    Source from Amino Club <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                            
                            <div className="pt-4 mt-2 border-t border-zinc-800 flex items-center flex-wrap gap-2 text-xs font-semibold">
                                <span className="text-zinc-500">Lab supplies:</span>
                                <a 
                                    href="https://aminoclub.com/us/products/bacteriostatic-water?utm_source=affiliate_marketing&code=PEPTIDEX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackOutboundClick("Amino Club", "https://aminoclub.com/us/products/bacteriostatic-water", "calculator_bac_water")}
                                    className="px-3 py-1.5 min-h-[44px] flex items-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
                                >
                                    Bacteriostatic Water <ExternalLink className="w-3 h-3 inline ml-1 align-text-bottom" />
                                </a>
                                <a 
                                    href="https://aminoclub.com/us/products/graduated-pipettes?utm_source=affiliate_marketing&code=PEPTIDEX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackOutboundClick("Amino Club", "https://aminoclub.com/us/products/graduated-pipettes", "calculator_pipettes")}
                                    className="px-3 py-1.5 min-h-[44px] flex items-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
                                >
                                    Graduated Pipettes <ExternalLink className="w-3 h-3 inline ml-1 align-text-bottom" />
                                </a>
                            </div>
                        </div>
                        
                        <div className="mt-5 relative z-10">
                            <div className="flex items-center gap-1.5 text-xs text-zinc-200 font-semibold mb-1">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                Amino Club — PeptiDex Editor&apos;s Choice 2026
                            </div>
                            <p className="text-[10px] font-medium text-emerald-400/80 mb-2 flex items-center gap-2">
                                <span>&#x2713; COA verified</span>
                                <span>&middot;</span>
                                <span>&#x2713; 99%+ purity</span>
                            </p>
                            <p className="text-[10px] text-zinc-600 italic">
                                <strong>Disclosure:</strong> PeptiDex may earn a commission from purchases made through affiliate links.
                            </p>
                        </div>
                    </motion.div>
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
