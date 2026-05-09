"use client";
import Link from 'next/link';
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { peptides } from "@/data/peptides";
import { vendorPricing } from "@/data/vendor-pricing";
import { ShieldCheck, ShieldAlert, AlertTriangle, ChevronDown, Search, Info, FlaskConical, ExternalLink } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";
import { buildSoftwareApplicationSchema } from "@/lib/seo/schema";
import { ToolPageConversionBlock } from "@/components/promos/ToolPageConversionBlock";
import { lookupLab, TIER_STYLES, type LabTier } from "@/data/coa-labs";
import { trackOutboundClick } from "@/lib/ga4-events";

// Molecular weights and expected mass spec data for all 51 peptides
// All MW in g/mol (Daltons)
const peptideMolecularData: Record<string, {
    mw_mono: number;
    mw_avg: number;
    formula: string;
    sequence?: string;
    acceptable_purity: number;
    coa_red_flags: string[];
}> = {
    "bpc-157": { mw_mono: 1419.53, mw_avg: 1419.56, formula: "C62H98N16O22", sequence: "GEPPPGKPADDAGLV", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "MW deviation > 0.5 Da", "Endotoxin > 1 EU/mg"] },
    "tb-500": { mw_mono: 4963.49, mw_avg: 4963.50, formula: "C212H350N56O78S", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Water content > 10%", "Unknown peaks on HPLC"] },
    "cjc-1295": { mw_mono: 3647.19, mw_avg: 3647.28, formula: "C152H252N44O42S", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Missing DAC modification", "Incorrect retention time"] },
    "ipamorelin": { mw_mono: 711.85, mw_avg: 711.87, formula: "C38H49N9O5", sequence: "Aib-His-D-2Nal-D-Phe-Lys-NH2", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "MW deviation > 0.2 Da"] },
    "semax": { mw_mono: 813.94, mw_avg: 813.96, formula: "C37H51N9O10S", sequence: "Met-Glu-His-Phe-Pro-Gly-Pro", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Oxidized Met peak present"] },
    "selank": { mw_mono: 751.85, mw_avg: 751.87, formula: "C33H57N9O14", sequence: "Thr-Lys-Pro-Arg-Pro-Gly-Pro", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Aggregation on HPLC"] },
    "ghk-cu": { mw_mono: 340.39, mw_avg: 340.41, formula: "C14H23CuN6O4", sequence: "Gly-His-Lys", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Missing Cu chelation", "Free peptide detected"] },
    "tesamorelin": { mw_mono: 5135.87, mw_avg: 5135.90, formula: "C221H366N74O65S", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Incorrect disulfide bonds"] },
    "aod-9604": { mw_mono: 1815.12, mw_avg: 1815.15, formula: "C78H123N23O23S2", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "MW deviation > 0.5 Da", "Missing disulfide bridge"] },
    "mots-c": { mw_mono: 2174.39, mw_avg: 2174.43, formula: "C95H163N33O30", acceptable_purity: 95, coa_red_flags: ["Purity < 95%", "Aggregation detected", "Storage at wrong temp"] },
    "epitalon": { mw_mono: 390.39, mw_avg: 390.41, formula: "C14H22N4O9", sequence: "Ala-Glu-Asp-Gly", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Incorrect sequence detected"] },
    "thymosin-alpha-1": { mw_mono: 3107.56, mw_avg: 3107.60, formula: "C129H215N33O55S", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "N-terminal acetylation missing"] },
    "melanotan-ii": { mw_mono: 1024.18, mw_avg: 1024.21, formula: "C50H69N15O9", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Racemic impurities detected"] },
    "pt-141": { mw_mono: 1024.18, mw_avg: 1024.21, formula: "C50H69N15O9", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Bremelanotide vs PT-141 confusion"] },
    "dsip": { mw_mono: 848.86, mw_avg: 848.88, formula: "C35H48N10O15", sequence: "Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu", acceptable_purity: 95, coa_red_flags: ["Purity < 95%", "Degradation products visible"] },
    "retatrutide": { mw_mono: 4751.38, mw_avg: 4751.42, formula: "C208H316N58O64", acceptable_purity: 95, coa_red_flags: ["Purity < 95%", "Incorrect GIP/GLP sequence", "Missing fatty acid chain"] },
    "tirzepatide": { mw_mono: 4813.48, mw_avg: 4813.53, formula: "C225H348N48O68", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Missing C18 fatty diacid", "Incorrect sequence"] },
    "semaglutide": { mw_mono: 4113.58, mw_avg: 4113.63, formula: "C187H291N45O59", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Missing fatty acid modification", "Incorrect GLP-1 analog sequence"] },
    "sermorelin": { mw_mono: 3357.96, mw_avg: 3357.99, formula: "C149H246N44O42S", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Truncated sequence detected"] },
    "kpv": { mw_mono: 356.39, mw_avg: 356.41, formula: "C16H28N4O6", sequence: "Lys-Pro-Val", acceptable_purity: 98, coa_red_flags: ["Purity < 98%", "Tripeptide contamination"] },
    "ss-31": { mw_mono: 639.76, mw_avg: 639.78, formula: "C28H41N9O7", sequence: "D-Arg-dimethylTyr-Lys-Phe-NH2", acceptable_purity: 95, coa_red_flags: ["Purity < 95%", "Missing D-amino acids", "No dimethylation"] },
    "follistatin-344": { mw_mono: 37538.0, mw_avg: 37538.0, formula: "Large glycoprotein", acceptable_purity: 95, coa_red_flags: ["Purity < 95%", "Incorrect glycosylation pattern", "Degradation on SDS-PAGE"] },
    "igf-1-lr3": { mw_mono: 9117.61, mw_avg: 9117.65, formula: "C400H620N106O115S8", acceptable_purity: 95, coa_red_flags: ["Purity < 95%", "Missing N-terminal Met-Glu extension", "Incorrect disulfide mapping"] },
};

type Result = "pass" | "warning" | "fail" | null;

interface CheckResult { pass: boolean; warning: boolean; label: string; detail: string; }

export default function CoacAnalyzerPage() {
    const [selectedSlug, setSelectedSlug] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [reportedMW, setReportedMW] = useState("");
    const [reportedPurity, setReportedPurity] = useState("");
    const [labName, setLabName] = useState("");
    const [batchId, setBatchId] = useState("");
    const [result, setResult] = useState<Result>(null);
    const [analyzed, setAnalyzed] = useState(false);

    const peptide = useMemo(() => peptides.find(p => p.slug === selectedSlug), [selectedSlug]);
    const molData = selectedSlug ? peptideMolecularData[selectedSlug] : null;

    // Absolute Da deviation checks (not % — spec: ±0.5 PASS, ±2 WARNING, else FAIL)
    const mwDeviationDa = molData && reportedMW ? Math.abs(parseFloat(reportedMW) - molData.mw_avg) : null;

    const mwCheck = useMemo((): CheckResult | null => {
        if (!molData || !reportedMW) return null;
        const dev = Math.abs(parseFloat(reportedMW) - molData.mw_avg);
        if (dev <= 0.5) return { pass: true,  warning: false, label: "Molecular Weight", detail: `Δ ${dev.toFixed(3)} Da — within ±0.5 Da tolerance` };
        if (dev <= 2.0) return { pass: false, warning: true,  label: "Molecular Weight", detail: `Δ ${dev.toFixed(3)} Da — outside ±0.5 Da ideal, within ±2 Da caution range` };
        return           { pass: false, warning: false, label: "Molecular Weight", detail: `Δ ${dev.toFixed(3)} Da — exceeds ±2 Da. Possible wrong compound or degradation.` };
    }, [reportedMW, molData]);

    const purityCheck = useMemo((): CheckResult | null => {
        if (!molData || !reportedPurity) return null;
        const p = parseFloat(reportedPurity);
        const min = molData.acceptable_purity;
        if (p >= 98)      return { pass: true,  warning: false, label: "Purity", detail: `${p.toFixed(1)}% — meets ≥98% threshold` };
        if (p >= 95)      return { pass: false, warning: true,  label: "Purity", detail: `${p.toFixed(1)}% — below 98% ideal, above 95% caution floor` };
        if (p >= min)     return { pass: false, warning: true,  label: "Purity", detail: `${p.toFixed(1)}% — meets compound minimum (${min}%) but below 98%` };
        return              { pass: false, warning: false, label: "Purity", detail: `${p.toFixed(1)}% — below minimum acceptable purity of ${min}%` };
    }, [reportedPurity, molData]);

    const labProfile = useMemo(() => labName.trim().length > 1 ? lookupLab(labName) : null, [labName]);

    const analyze = () => {
        if (!molData || !mwCheck || !purityCheck) return;
        const allPass = mwCheck.pass && purityCheck.pass;
        const anyFail = !mwCheck.pass && !mwCheck.warning || !purityCheck.pass && !purityCheck.warning;
        setResult(allPass ? "pass" : anyFail ? "fail" : "warning");
        setAnalyzed(true);
    };

    // Top-3 vendors for this peptide, sorted by cost-per-mg
    const topVendors = useMemo(() => {
        if (!selectedSlug) return [];
        const entry = vendorPricing.find(p => p.slug === selectedSlug);
        return (entry?.vendors ?? [])
            .filter(v => v.inStock && v.price_usd > 0 && v.vial_mg > 0)
            .sort((a, b) => (a.price_usd / a.vial_mg) - (b.price_usd / b.vial_mg))
            .slice(0, 3);
    }, [selectedSlug]);

    // Build schema (unused in render but kept for parity)
    const _schema = buildSoftwareApplicationSchema({
        name: "PeptiDex COA Analyzer",
        description: "Verify peptide Certificate of Analysis against expected molecular weight and purity values.",
        url: "https://peptidex.app/tools/coa",
        applicationCategory: "UtilityApplication",
    });

    return (
        <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 pt-2">
                <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Home</Link>
                <span className="text-zinc-700 text-xs">/</span>
                <Link href="/tools" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Tools</Link>
                <span className="text-zinc-700 text-xs">/</span>
                <span className="text-zinc-200 font-medium text-xs">COA Verification</span>
            </nav>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">COA Analyzer</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">Verify your supplier&apos;s Certificate of Analysis against expected values</p>
            </motion.div>

            <div className="rounded-xl bg-blue-950/20 border border-blue-500/15 p-3 mb-5">
                <p className="text-[11px] text-blue-400/80">
                    <Info className="w-3 h-3 inline mr-1 relative -top-px" />
                    Enter the molecular weight and purity % from your supplier&apos;s COA (Certificate of Analysis) to verify authenticity.
                </p>
            </div>

            {/* Peptide Selector */}
            <div className="relative mb-5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Select Peptide</label>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-sm text-zinc-200 hover:border-emerald-500/40 transition-colors">
                    <span>{peptide ? `${getCategoryIcon(peptide.category)} ${peptide.name}` : "Choose a peptide..."}</span>
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                </button>
                {dropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full max-h-64 overflow-auto rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
                        {peptides.map(p => (
                            <button key={p.slug} onClick={() => { setSelectedSlug(p.slug); setDropdownOpen(false); setAnalyzed(false); setResult(null); }}
                                className="w-full text-left px-4 py-2.5 text-sm text-zinc-200 hover:bg-emerald-500/10 transition-colors border-b border-zinc-800/50 last:border-0">
                                {getCategoryIcon(p.category)} {p.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Expected Values */}
            {molData && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-4 mb-5">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5" /> Expected Reference Values
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div><span className="text-zinc-500">Avg. MW:</span> <span className="text-zinc-200 font-semibold ml-1">{molData.mw_avg.toLocaleString()} Da</span></div>
                        <div><span className="text-zinc-500">Formula:</span> <span className="text-zinc-200 font-mono ml-1 text-[10px]">{molData.formula}</span></div>
                        <div><span className="text-zinc-500">Min. Purity:</span> <span className="text-emerald-400 font-semibold ml-1">≥{molData.acceptable_purity}%</span></div>
                        {molData.sequence && <div><span className="text-zinc-500">Sequence:</span> <span className="text-zinc-400 font-mono ml-1 text-[10px]">{molData.sequence}</span></div>}
                    </div>
                </motion.div>
            )}

            {/* COA Inputs */}
            {selectedSlug && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 mb-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">Reported MW (Da)</label>
                            <input type="number" step="0.01" value={reportedMW} onChange={e => { setReportedMW(e.target.value); setAnalyzed(false); }}
                                placeholder={`Expected ~${molData?.mw_avg.toFixed(2)}`}
                                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                            {mwDeviationDa !== null && reportedMW && (
                                <p className={`text-[10px] mt-1 ${mwDeviationDa <= 0.5 ? 'text-emerald-400' : mwDeviationDa <= 2 ? 'text-amber-400' : 'text-red-400'}`}>
                                    Δ {mwDeviationDa.toFixed(3)} Da from reference
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">Reported Purity (%)</label>
                            <input type="number" step="0.1" min="0" max="100" value={reportedPurity} onChange={e => { setReportedPurity(e.target.value); setAnalyzed(false); }}
                                placeholder={`Min: ${molData?.acceptable_purity}%`}
                                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">Testing Lab <span className="text-zinc-600 normal-case font-normal">(optional)</span></label>
                            <input type="text" value={labName} onChange={e => setLabName(e.target.value)}
                                placeholder="e.g. Janoshik, MZ Biolabs"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors" />
                            {labName.trim().length > 1 && (() => {
                                const tier: LabTier = labProfile?.tier ?? 'unverified';
                                const s = TIER_STYLES[tier];
                                return (
                                    <div className={`mt-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] ${s.border} ${s.bg}`}>
                                        <span className={`font-semibold ${s.color}`}>{s.label}</span>
                                        {labProfile && <span className="text-zinc-400 ml-1.5">{labProfile.note}</span>}
                                        {!labProfile && <span className="text-zinc-500 ml-1.5">Not in verified lab registry. Treat results with caution.</span>}
                                    </div>
                                );
                            })()}
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">Batch ID <span className="text-zinc-600 normal-case font-normal">(optional)</span></label>
                            <input type="text" value={batchId} onChange={e => setBatchId(e.target.value)}
                                placeholder="e.g. BPC-2024-0412"
                                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors" />
                        </div>
                    </div>
                    <button onClick={analyze} disabled={!reportedMW || !reportedPurity}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-sm transition-colors">
                        Analyze COA
                    </button>
                </motion.div>
            )}

            {/* Result */}
            <AnimatePresence>
                {analyzed && result && molData && mwCheck && purityCheck && (
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                        {/* Verdict header */}
                        <div className={`rounded-2xl border p-5 ${
                            result === 'pass' ? 'border-emerald-500/30 bg-emerald-950/25' :
                            result === 'warning' ? 'border-amber-500/30 bg-amber-950/25' :
                            'border-red-500/30 bg-red-950/25'
                        }`}>
                            <div className="flex items-center gap-3 mb-4">
                                {result === 'pass'    && <ShieldCheck  className="w-7 h-7 text-emerald-400" />}
                                {result === 'warning' && <AlertTriangle className="w-7 h-7 text-amber-400" />}
                                {result === 'fail'    && <ShieldAlert   className="w-7 h-7 text-red-400" />}
                                <div>
                                    <p className={`font-bold text-base ${
                                        result === 'pass' ? 'text-emerald-300' :
                                        result === 'warning' ? 'text-amber-300' : 'text-red-300'
                                    }`}>
                                        {result === 'pass'    ? '✅ COA Passes Verification' :
                                         result === 'warning' ? '⚠️ Minor Deviation Detected' :
                                                               '🚫 COA Fails Verification'}
                                    </p>
                                    {batchId && <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">Batch: {batchId}</p>}
                                </div>
                            </div>

                            {/* Per-check breakdown */}
                            <div className="space-y-2 text-xs">
                                {[mwCheck, purityCheck].map(chk => (
                                    <div key={chk.label} className={`flex items-start justify-between gap-3 p-2.5 rounded-lg ${
                                        chk.pass ? 'bg-emerald-900/30' : chk.warning ? 'bg-amber-900/30' : 'bg-red-900/30'
                                    }`}>
                                        <span className="text-zinc-300 font-semibold shrink-0">{chk.label}</span>
                                        <span className={`text-right ${
                                            chk.pass ? 'text-emerald-400' : chk.warning ? 'text-amber-400' : 'text-red-400'
                                        }`}>{chk.detail}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Red flags on non-pass */}
                            {result !== 'pass' && (
                                <div className="mt-4 pt-4 border-t border-zinc-800/50">
                                    <p className="text-xs font-semibold text-zinc-400 mb-2">Known red flags for {peptide?.name}:</p>
                                    <ul className="space-y-1">
                                        {molData.coa_red_flags.map(flag => (
                                            <li key={flag} className="text-[11px] text-red-400/80 flex items-center gap-1.5">
                                                <span className="text-red-500">•</span> {flag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Verified vendor CTA */}
                        {topVendors.length > 0 && (
                            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden">
                                <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-800">
                                    <FlaskConical className="w-4 h-4 text-emerald-400" />
                                    <h2 className="text-sm font-bold text-zinc-100">Vendors verified for {peptide?.name}</h2>
                                    <span className="ml-auto text-[10px] text-zinc-500">Sorted by $/mg</span>
                                </div>
                                <div className="divide-y divide-zinc-800/60">
                                    {topVendors.map((v, i) => (
                                        <div key={v.vendor} className="flex items-center justify-between gap-4 px-5 py-3">
                                            <div>
                                                <span className="text-sm font-semibold text-zinc-200">{v.vendor}</span>
                                                {i === 0 && <span className="ml-2 text-[9px] font-bold text-emerald-400 border border-emerald-500/30 rounded px-1.5 py-0.5 uppercase">Best $/mg</span>}
                                                <div className="text-[10px] text-zinc-500 mt-0.5">{v.vial_mg}mg · ${(v.price_usd / v.vial_mg).toFixed(2)}/mg</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-sm font-bold text-zinc-100">${v.price_usd.toFixed(2)}</span>
                                                <a href={v.affiliateUrl} target="_blank" rel="sponsored nofollow noopener"
                                                    onClick={() => trackOutboundClick(v.vendor, v.affiliateUrl, 'coa_vendor_cta')}
                                                    className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors">
                                                    Shop <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-5 py-2 border-t border-zinc-800 text-[10px] text-zinc-600">
                                    ⚠ Affiliate disclosure. Prices verified from vendor sites — confirm at checkout.
                                </div>
                            </div>
                        )}

                        {/* Conversion block */}
                        <ToolPageConversionBlock surface="tool_coa" className="mt-2" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
