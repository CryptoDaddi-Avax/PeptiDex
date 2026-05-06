"use client";
import Link from 'next/link';
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { peptides } from "@/data/peptides";
import { ShieldCheck, ShieldAlert, AlertTriangle, ChevronDown, Search, Info } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";
import { buildSoftwareApplicationSchema } from "@/lib/schema";

// Molecular weights and expected mass spec data for all 33 peptides
// All MW in g/mol (Daltons)
const peptideMolecularData: Record<string, {
    mw_mono: number;       // Monoisotopic molecular weight
    mw_avg: number;        // Average molecular weight
    formula: string;       // Molecular formula
    sequence?: string;     // Amino acid sequence
    acceptable_purity: number;  // Minimum acceptable purity %
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

export default function CoacAnalyzerPage() {
    const [selectedSlug, setSelectedSlug] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [reportedMW, setReportedMW] = useState("");
    const [reportedPurity, setReportedPurity] = useState("");
    const [result, setResult] = useState<Result>(null);
    const [analyzed, setAnalyzed] = useState(false);

    const peptide = useMemo(() => peptides.find(p => p.slug === selectedSlug), [selectedSlug]);
    const molData = selectedSlug ? peptideMolecularData[selectedSlug] : null;

    const analyze = () => {
        if (!molData || !reportedMW || !reportedPurity) return;
        const mw = parseFloat(reportedMW);
        const purity = parseFloat(reportedPurity);
        const mwDeviation = Math.abs(mw - molData.mw_avg) / molData.mw_avg * 100;
        const isMWAcceptable = mwDeviation <= 1.0; // 1% tolerance
        const isPurityAcceptable = purity >= molData.acceptable_purity;

        if (isMWAcceptable && isPurityAcceptable) setResult("pass");
        else if (!isMWAcceptable || purity < molData.acceptable_purity - 3) setResult("fail");
        else setResult("warning");
        setAnalyzed(true);
    };

    const mwDeviation = molData && reportedMW
        ? Math.abs(parseFloat(reportedMW) - molData.mw_avg)
        : null;

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
                <p className="text-xs md:text-sm text-zinc-400">Verify your supplier's Certificate of Analysis against expected values</p>
            </motion.div>

            <div className="rounded-xl bg-blue-950/20 border border-blue-500/15 p-3 mb-5">
                <p className="text-[11px] text-blue-400/80">
                    <Info className="w-3 h-3 inline mr-1 relative -top-px" />
                    Enter the molecular weight and purity % from your supplier's COA (Certificate of Analysis) to verify authenticity.
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
                        <div><span className="text-zinc-500">Min. Purity:</span> <span className="text-emerald-400 font-semibold ml-1">Ã¢â°Â¥{molData.acceptable_purity}%</span></div>
                        {molData.sequence && <div><span className="text-zinc-500">Sequence:</span> <span className="text-zinc-400 font-mono ml-1 text-[10px]">{molData.sequence}</span></div>}
                    </div>
                </motion.div>
            )}

            {/* COA Inputs */}
            {selectedSlug && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 mb-5">
                    <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">Reported Molecular Weight (Da)</label>
                        <input type="number" step="0.01" value={reportedMW} onChange={e => { setReportedMW(e.target.value); setAnalyzed(false); }}
                            placeholder={`Expected: ${molData?.mw_avg.toFixed(2)} Da`}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5 block">Reported Purity (%)</label>
                        <input type="number" step="0.1" min="0" max="100" value={reportedPurity} onChange={e => { setReportedPurity(e.target.value); setAnalyzed(false); }}
                            placeholder={`Minimum required: ${molData?.acceptable_purity}%`}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors" />
                    </div>
                    <button onClick={analyze} disabled={!reportedMW || !reportedPurity}
                        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-white font-bold text-sm transition-colors">
                        Analyze COA
                    </button>
                </motion.div>
            )}

            {/* Result */}
            <AnimatePresence>
                {analyzed && result && molData && (
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <div className={`rounded-2xl border p-5 mb-4 ${result === "pass" ? "border-emerald-500/30 bg-emerald-950/25" :
                                result === "warning" ? "border-amber-500/30 bg-amber-950/25" :
                                    "border-red-500/30 bg-red-950/25"
                            }`}>
                            <div className="flex items-center gap-3 mb-4">
                                {result === "pass" && <ShieldCheck className="w-7 h-7 text-emerald-400" />}
                                {result === "warning" && <AlertTriangle className="w-7 h-7 text-amber-400" />}
                                {result === "fail" && <ShieldAlert className="w-7 h-7 text-red-400" />}
                                <div>
                                    <p className={`font-bold text-base ${result === "pass" ? "text-emerald-300" : result === "warning" ? "text-amber-300" : "text-red-300"}`}>
                                        {result === "pass" ? "Ã¢Åâ¦ COA Passes Verification" :
                                            result === "warning" ? "Ã¢Å¡Â Ã¯Â¸Â Minor Deviation Detected" :
                                                "🚫 COA Fails Verification   Do Not Use"}
                                    </p>
                                    <p className="text-xs text-zinc-400 mt-0.5">
                                        {result === "pass" ? "Values are within acceptable ranges for premium-grade peptides." :
                                            result === "warning" ? "Values are slightly outside optimal range. Proceed with caution." :
                                                "Critical discrepancy detected. This may indicate a fake, degraded, or mislabeled product."}
                                    </p>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-2.5 text-xs">
                                <div className={`flex justify-between items-center p-2.5 rounded-lg ${Math.abs(parseFloat(reportedMW) - molData.mw_avg) / molData.mw_avg * 100 <= 1 ? "bg-emerald-900/30" : "bg-red-900/30"}`}>
                                    <span className="text-zinc-300">Molecular Weight</span>
                                    <div className="text-right">
                                        <span className={`font-bold ${Math.abs(parseFloat(reportedMW) - molData.mw_avg) / molData.mw_avg * 100 <= 1 ? "text-emerald-400" : "text-red-400"}`}>
                                            {parseFloat(reportedMW).toFixed(2)} Da
                                        </span>
                                        {mwDeviation !== null && <span className="text-zinc-500 ml-2">(Ãâ {mwDeviation.toFixed(2)} Da)</span>}
                                    </div>
                                </div>
                                <div className={`flex justify-between items-center p-2.5 rounded-lg ${parseFloat(reportedPurity) >= molData.acceptable_purity ? "bg-emerald-900/30" : "bg-red-900/30"}`}>
                                    <span className="text-zinc-300">Purity</span>
                                    <span className={`font-bold ${parseFloat(reportedPurity) >= molData.acceptable_purity ? "text-emerald-400" : "text-red-400"}`}>
                                        {parseFloat(reportedPurity).toFixed(1)}% {parseFloat(reportedPurity) >= molData.acceptable_purity ? "Ã¢Åâ" : `(min ${molData.acceptable_purity}%)`}
                                    </span>
                                </div>
                            </div>

                            {/* Red Flags */}
                            {result !== "pass" && (
                                <div className="mt-4 pt-4 border-t border-zinc-800/50">
                                    <p className="text-xs font-semibold text-zinc-400 mb-2">Common red flags for {peptide?.name}:</p>
                                    <ul className="space-y-1">
                                        {molData.coa_red_flags.map(flag => (
                                            <li key={flag} className="text-[11px] text-red-400/80 flex items-center gap-1.5">
                                                <span className="text-red-500">Ã¢â¬Â¢</span> {flag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
