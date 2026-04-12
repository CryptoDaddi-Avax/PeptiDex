"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { peptides } from "@/data/peptides";
import { peptideBlends, PeptideBlend } from "@/data/blends";
import { SHORT_DISCLAIMER } from "@/data/constants";
import { Calculator, ShieldAlert, ChevronDown, Syringe, Droplets, FlaskConical } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";
import { EmbedModal } from "@/components/embed-modal";
import { ShareModal } from "@/components/share-card/share-modal";
import type { CalculatorCardData } from "@/components/share-card/card-templates";

type SelectionType = "peptide" | "blend";

interface Selection {
    type: SelectionType;
    slug: string;
}

export default function CalculatorPage() {
    const [selection, setSelection] = useState<Selection | null>(null);
    const [vialMg, setVialMg] = useState("");
    const [bacWaterMl, setBacWaterMl] = useState("");
    const [desiredDoseMcg, setDesiredDoseMcg] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

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
    function parseBlendDose(blend: PeptideBlend): number | null {
        const match = blend.typical_ratio.match(/(\d+(?:\.\d+)?)\s*mcg/i);
        return match ? parseFloat(match[1]) : null;
    }

    const concentration = useMemo(() => {
        const v = parseFloat(vialMg);
        const w = parseFloat(bacWaterMl);
        if (!v || !w || w === 0) return null;
        return (v * 1000) / w; // mcg per ml
    }, [vialMg, bacWaterMl]);

    const syringeUnits = useMemo(() => {
        const dose = parseFloat(desiredDoseMcg);
        if (!concentration || !dose) return null;
        const ml = dose / concentration;
        return Math.round(ml * 100); // 100-unit insulin syringe
    }, [concentration, desiredDoseMcg]);

    const selectPeptide = (slug: string) => {
        setSelection({ type: "peptide", slug });
        setDropdownOpen(false);
        setSearchQuery("");
        const p = peptides.find((x) => x.slug === slug);
        if (p?.dosing) {
            if (p.dosing.typical_vial_mg) setVialMg(String(p.dosing.typical_vial_mg));
            if (p.dosing.reconstitution_ml) setBacWaterMl(String(p.dosing.reconstitution_ml));
            setDesiredDoseMcg(String(p.dosing.typical_dose_mcg[0]));
        }
    };

    const selectBlend = (slug: string) => {
        setSelection({ type: "blend", slug });
        setDropdownOpen(false);
        setSearchQuery("");
        const b = peptideBlends.find((x) => x.slug === slug);
        if (b) {
            // Try to parse dose from typical_ratio
            const dose = parseBlendDose(b);
            if (dose) setDesiredDoseMcg(String(dose));
            // Reset vial/water — blends vary
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
        <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-2.5 mb-4">
                <div className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] md:text-[11px] text-amber-400/80 leading-relaxed">{SHORT_DISCLAIMER}</p>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Calculator className="w-5 h-5 text-emerald-400" />
                            <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Dosage Calculator</h1>
                        </div>
                        <p className="text-xs md:text-sm text-zinc-400">Calculate reconstitution and syringe units for peptides &amp; blends</p>
                    </div>
                    <div>
                        <EmbedModal title="Peptide Dosage Calculator" path="/tools/calculator" />
                    </div>
                </div>
            </motion.div>

            {/* Peptide / Blend Selector */}
            <div className="relative mb-6">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Select Peptide or Blend</label>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-sm text-zinc-200 hover:border-emerald-500/40 transition-colors">
                    <span>{selectedName || "Choose a peptide or blend..."}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full max-h-80 overflow-auto rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
                        {/* Search inside dropdown */}
                        <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-2">
                            <input
                                type="text"
                                placeholder="Search peptides & blends..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
                            />
                        </div>

                        {/* Individual Peptides */}
                        {filteredPeptides.length > 0 && (
                            <>
                                <div className="px-4 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900/80 sticky top-[52px] border-b border-zinc-800/50">
                                    Individual Peptides
                                </div>
                                {filteredPeptides.map((p) => (
                                    <button key={p.slug} onClick={() => selectPeptide(p.slug)}
                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-zinc-800/50 last:border-0 ${selection?.type === "peptide" && selection.slug === p.slug ? "bg-emerald-500/15 text-emerald-300" : "text-zinc-200 hover:bg-emerald-500/10"}`}>
                                        {getCategoryIcon(p.category)} {p.name} <span className="text-zinc-500 text-xs ml-1">({p.dosing?.route})</span>
                                    </button>
                                ))}
                            </>
                        )}

                        {/* Blends */}
                        {filteredBlends.length > 0 && (
                            <>
                                <div className="px-4 py-2 text-[10px] font-bold text-violet-400/80 uppercase tracking-widest bg-zinc-900/80 sticky top-[52px] border-b border-zinc-800/50 flex items-center gap-1.5">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Vial Size (mg)</label>
                    <input type="number" value={vialMg} onChange={(e) => setVialMg(e.target.value)} placeholder="e.g. 5"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
                <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">BAC Water (ml)</label>
                    <input type="number" value={bacWaterMl} onChange={(e) => setBacWaterMl(e.target.value)} placeholder="e.g. 2"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
                <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Desired Dose (mcg)</label>
                    <input type="number" value={desiredDoseMcg} onChange={(e) => setDesiredDoseMcg(e.target.value)} placeholder="e.g. 250"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                </div>
            </div>

            {/* Results */}
            {concentration && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mb-6">
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-900/30 to-emerald-950/20 border border-emerald-500/20 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Droplets className="w-5 h-5 text-emerald-400" />
                            <h3 className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Reconstitution Results</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-zinc-500 mb-1">Concentration</p>
                                <p className="text-xl font-bold text-emerald-400">{Math.round(concentration).toLocaleString()} mcg/ml</p>
                            </div>
                            {syringeUnits !== null && (
                                <div>
                                    <p className="text-xs text-zinc-500 mb-1">Syringe Units (U-100)</p>
                                    <p className="text-xl font-bold text-emerald-400">{syringeUnits} IU</p>
                                    <p className="text-[10px] text-zinc-500 mt-0.5">= {(syringeUnits / 100).toFixed(2)} ml</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Visual Syringe */}
                    {syringeUnits !== null && syringeUnits <= 100 && (
                        <div className="rounded-2xl bg-zinc-900/60 border border-emerald-500/20 p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <Syringe className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-semibold text-emerald-300">Visual Syringe Guide</span>
                                <span className="ml-auto text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">U-100 Insulin Syringe</span>
                            </div>

                            {/* SVG Syringe */}
                            <div className="relative w-full overflow-x-auto">
                                <svg viewBox="0 0 480 110" className="w-full max-w-lg mx-auto" preserveAspectRatio="xMidYMid meet">
                                    {/* Needle */}
                                    <rect x="14" y="47" width="26" height="16" rx="2" fill="#a1a1aa" />
                                    <polygon points="14,51 14,59 4,55" fill="#a1a1aa" />

                                    {/* Barrel outline */}
                                    <rect x="40" y="35" width="360" height="40" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />

                                    {/* Liquid fill */}
                                    <clipPath id="syringeClip">
                                        <rect x="41" y="36" width="358" height="38" rx="5" />
                                    </clipPath>
                                    <motion.rect
                                        x="41" y="36" height="38" rx="5"
                                        fill="url(#liquidGrad)"
                                        clipPath="url(#syringeClip)"
                                        initial={{ width: 0 }}
                                        animate={{ width: (Math.min(Math.max(syringeUnits, 0), 100) / 100) * 358 }}
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
                                        animate={{ x: (Math.min(Math.max(syringeUnits, 0), 100) / 100) * 358 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    >
                                        <rect x="399" y="30" width="8" height="50" rx="2" fill="#52525b" />
                                        <rect x="407" y="40" width="32" height="30" rx="3" fill="#3f3f46" />
                                        <rect x="439" y="36" width="8" height="38" rx="2" fill="#27272a" />
                                    </motion.g>

                                    {/* Dose callout */}
                                    <rect x="160" y="13" width="160" height="22" rx="6" fill="#065f46" fillOpacity="0.8" />
                                    <text x="240" y="28" textAnchor="middle" fontSize="11" fill="#34d399" fontWeight="bold">
                                        {`Draw to ${syringeUnits} units`}
                                    </text>

                                    {/* Arrow pointing to the level */}
                                    <motion.g
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        <motion.line
                                            x1={41 + (Math.min(Math.max(syringeUnits, 0), 100) / 100) * 358}
                                            y1={23}
                                            x2={41 + (Math.min(Math.max(syringeUnits, 0), 100) / 100) * 358}
                                            y2={35}
                                            stroke="#34d399"
                                            strokeWidth="1.5"
                                            strokeDasharray="3 2"
                                        />
                                    </motion.g>
                                </svg>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                                <span>0 units</span>
                                <div className="text-center">
                                    <span className="text-2xl font-black text-emerald-400">{syringeUnits}</span>
                                    <span className="text-zinc-400 ml-1">/ 100 units</span>
                                    <p className="text-[10px] text-zinc-500 mt-0.5">= {(syringeUnits / 100).toFixed(3)} ml</p>
                                </div>
                                <span>100 units</span>
                            </div>

                            {syringeUnits > 50 && (
                                <p className="text-[10px] text-amber-400/80 mt-3 text-center">&#x26A0;&#xFE0F; Large volume — consider splitting into 2 injection sites</p>
                            )}
                        </div>
                    )}

                </motion.div>
            )}

            {/* Share My Results */}
            {concentration && syringeUnits !== null && (() => {
                const pepName = peptide?.name || blend?.name || "Peptide";
                const vMg = parseFloat(vialMg) || 0;
                const bMl = parseFloat(bacWaterMl) || 0;
                const dMcg = parseFloat(desiredDoseMcg) || 0;
                const dosesPerVial = dMcg > 0 ? Math.floor((vMg * 1000) / dMcg) : 0;
                const shareData: CalculatorCardData = {
                    type: "calculator",
                    peptideName: pepName,
                    vialMg: vMg,
                    bacWaterMl: bMl,
                    doseMcg: dMcg,
                    syringeUnits: syringeUnits,
                    concentration: concentration,
                    dosesPerVial: dosesPerVial,
                };
                return (
                    <div className="mt-4 mb-6 flex justify-center">
                        <ShareModal
                            data={shareData}
                            shareUrl="https://peptidex.app/tools/calculator"
                            shareText={`My ${pepName} dosage protocol — calculated on PeptiDex \uD83E\uDDEC`}
                            buttonLabel="Share My Protocol"
                        />
                    </div>
                );
            })()}

            {/* Peptide Dosing Info */}
            {peptide?.dosing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-5">
                    <h3 className="text-sm font-semibold text-zinc-200 mb-3">&#x1F4CB; {peptide.name} Dosing Reference</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div><span className="text-zinc-500">Route:</span> <span className="text-zinc-300 ml-1">{peptide.dosing.route}</span></div>
                        <div><span className="text-zinc-500">Range:</span> <span className="text-zinc-300 ml-1">{peptide.dosing.typical_dose_mcg[0]}-{peptide.dosing.typical_dose_mcg[1]} mcg</span></div>
                        <div><span className="text-zinc-500">Frequency:</span> <span className="text-zinc-300 ml-1">{peptide.dosing.frequency}</span></div>
                        {peptide.dosing.timing && <div><span className="text-zinc-500">Timing:</span> <span className="text-zinc-300 ml-1">{peptide.dosing.timing}</span></div>}
                        {peptide.dosing.cycle_weeks && <div className="col-span-2"><span className="text-zinc-500">Cycle:</span> <span className="text-zinc-300 ml-1">{peptide.dosing.cycle_weeks[0]}-{peptide.dosing.cycle_weeks[1]} weeks</span></div>}
                        {peptide.dosing.notes && <div className="col-span-2 mt-2 p-2 rounded-lg bg-zinc-800/50"><span className="text-zinc-400">{peptide.dosing.notes}</span></div>}
                    </div>
                </motion.div>
            )}

            {/* Blend Dosing Info */}
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
                                <span className="text-zinc-500 font-semibold block mb-1">Dosing Notes:</span>
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
    );
}
