"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ReferenceLine
} from "recharts";
import { peptides } from "@/data/peptides";
import { Activity, ChevronDown } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

// PK data for peptides with known half-lives
const pkData: Record<string, { halfLifeHours: number; peakHours: number; bioavailability: string; model: "mono" | "biexp" }> = {
    "bpc-157": { halfLifeHours: 1, peakHours: 0.5, bioavailability: "~70%", model: "mono" },
    "tb-500": { halfLifeHours: 16, peakHours: 2, bioavailability: "~90%", model: "mono" },
    "cjc-1295": { halfLifeHours: 168, peakHours: 3, bioavailability: "~90%", model: "biexp" },
    "ipamorelin": { halfLifeHours: 2, peakHours: 0.5, bioavailability: "~70%", model: "mono" },
    "semax": { halfLifeHours: 0.5, peakHours: 0.3, bioavailability: "~60%", model: "mono" },
    "selank": { halfLifeHours: 0.5, peakHours: 0.3, bioavailability: "~60%", model: "mono" },
    "ghk-cu": { halfLifeHours: 1, peakHours: 0.5, bioavailability: "~75%", model: "mono" },
    "tesamorelin": { halfLifeHours: 0.6, peakHours: 0.3, bioavailability: "~85%", model: "mono" },
    "aod-9604": { halfLifeHours: 1, peakHours: 0.5, bioavailability: "~70%", model: "mono" },
    "mots-c": { halfLifeHours: 6, peakHours: 1, bioavailability: "~80%", model: "mono" },
    "epitalon": { halfLifeHours: 3, peakHours: 0.5, bioavailability: "~75%", model: "mono" },
    "thymosin-alpha-1": { halfLifeHours: 2, peakHours: 0.5, bioavailability: "~90%", model: "mono" },
    "melanotan-ii": { halfLifeHours: 22, peakHours: 2, bioavailability: "~80%", model: "mono" },
    "pt-141": { halfLifeHours: 22, peakHours: 2, bioavailability: "~80%", model: "mono" },
    "dsip": { halfLifeHours: 1.5, peakHours: 0.5, bioavailability: "~75%", model: "mono" },
    "retatrutide": { halfLifeHours: 168, peakHours: 24, bioavailability: "~90%", model: "biexp" },
    "tirzepatide": { halfLifeHours: 120, peakHours: 8, bioavailability: "~88%", model: "biexp" },
    "semaglutide": { halfLifeHours: 168, peakHours: 24, bioavailability: "~89%", model: "biexp" },
    "sermorelin": { halfLifeHours: 0.3, peakHours: 0.2, bioavailability: "~70%", model: "mono" },
    "kpv": { halfLifeHours: 1, peakHours: 0.3, bioavailability: "~60%", model: "mono" },
    "ss-31": { halfLifeHours: 3, peakHours: 0.5, bioavailability: "~70%", model: "mono" },
    "follistatin-344": { halfLifeHours: 12, peakHours: 2, bioavailability: "~70%", model: "mono" },
    "igf-1-lr3": { halfLifeHours: 20, peakHours: 3, bioavailability: "~80%", model: "mono" },
};

function generateCurve(
    halfLifeHours: number,
    peakHours: number,
    doseMcg: number,
    freqHours: number,
    model: "mono" | "biexp"
) {
    const totalHours = Math.min(halfLifeHours * 6, 200);
    const step = Math.max(0.1, totalHours / 200);
    const points: { time: number; concentration: number; label: string }[] = [];

    const ka = Math.log(2) / peakHours;
    const ke = Math.log(2) / halfLifeHours;
    const Cmax = doseMcg;

    for (let t = 0; t <= totalHours; t += step) {
        let c: number;
        if (model === "biexp") {
            // Biexponential (slow absorption + slow elimination)
            c = Cmax * (Math.exp(-ke * t) - Math.exp(-ka * t));
        } else {
            c = Cmax * (1 - Math.exp(-ka * t)) * Math.exp(-ke * t);
        }

        // Add multiple doses
        let accumulated = c;
        if (freqHours > 0) {
            for (let dose = 1; dose <= 4; dose++) {
                const tShifted = t - dose * freqHours;
                if (tShifted > 0) {
                    let dc: number;
                    if (model === "biexp") {
                        dc = Cmax * (Math.exp(-ke * tShifted) - Math.exp(-ka * tShifted));
                    } else {
                        dc = Cmax * (1 - Math.exp(-ka * tShifted)) * Math.exp(-ke * tShifted);
                    }
                    accumulated += Math.max(0, dc);
                }
            }
        }

        const timeH = Math.round(t * 10) / 10;
        let label = `${timeH}h`;
        if (timeH >= 24 && timeH % 24 === 0) label = `Day ${timeH / 24}`;

        points.push({ time: timeH, concentration: Math.max(0, Math.round(accumulated * 100) / 100), label });
    }
    return points;
}

const freqOptions = [
    { label: "Single dose", hours: 0 },
    { label: "Every 12h", hours: 12 },
    { label: "Daily", hours: 24 },
    { label: "Every 48h", hours: 48 },
    { label: "Weekly", hours: 168 },
];

// Custom tooltip
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-zinc-900 border border-violet-500/30 rounded-xl px-3 py-2 text-xs shadow-xl">
            <p className="text-zinc-400 mb-1">Ã¢ÂÂ± {label}</p>
            <p className="text-violet-300 font-bold">{payload[0]?.value?.toFixed(1)} relative units</p>
        </div>
    );
}

export default function PKPage() {
    const [selectedSlug, setSelectedSlug] = useState("bpc-157");
    const [doseMcg, setDoseMcg] = useState(250);
    const [freqHours, setFreqHours] = useState(24);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const peptide = useMemo(() => peptides.find(p => p.slug === selectedSlug), [selectedSlug]);
    const pk = pkData[selectedSlug];

    const chartData = useMemo(() => {
        if (!pk) return [];
        return generateCurve(pk.halfLifeHours, pk.peakHours, doseMcg, freqHours, pk.model);
    }, [pk, doseMcg, freqHours]);

    const peakPoint = useMemo(() => chartData.reduce((max, p) => p.concentration > max.concentration ? p : max, chartData[0] || { time: 0, concentration: 0 }), [chartData]);

    const halfLifeLabel = pk
        ? pk.halfLifeHours >= 24
            ? `${(pk.halfLifeHours / 24).toFixed(1)} days`
            : `${pk.halfLifeHours}h`
        : " ";

    return (
        <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-5 h-5 text-violet-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">PK Plasma Graphs</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">Visualize plasma concentration over time for any peptide</p>
            </motion.div>

            {/* Peptide Selector */}
            <div className="relative mb-4">
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-sm text-zinc-200 hover:border-violet-500/40 transition-colors">
                    <span>{peptide ? `${getCategoryIcon(peptide.category)} ${peptide.name}` : "Choose a peptide..."}</span>
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                </button>
                {dropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full max-h-64 overflow-auto rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
                        {peptides.map(p => (
                            <button key={p.slug} onClick={() => { setSelectedSlug(p.slug); if (p.dosing) setDoseMcg(p.dosing.typical_dose_mcg[0]); setDropdownOpen(false); }}
                                className="w-full text-left px-4 py-2.5 text-sm text-zinc-200 hover:bg-violet-500/10 transition-colors border-b border-zinc-800/50 last:border-0">
                                {getCategoryIcon(p.category)} {p.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Dose (mcg)</label>
                    <input type="number" value={doseMcg} onChange={e => setDoseMcg(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/50 transition-colors" />
                </div>
                <div>
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Frequency</label>
                    <select value={freqHours} onChange={e => setFreqHours(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/50 transition-colors">
                        {freqOptions.map(o => <option key={o.hours} value={o.hours}>{o.label}</option>)}
                    </select>
                </div>
            </div>

            {/* PK Stats */}
            {pk && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                        { label: "Half-Life", value: halfLifeLabel, color: "text-violet-400" },
                        { label: "Time to Peak", value: pk.peakHours >= 1 ? `${pk.peakHours}h` : `${Math.round(pk.peakHours * 60)}min`, color: "text-cyan-400" },
                        { label: "Bioavailability", value: pk.bioavailability, color: "text-emerald-400" },
                    ].map(stat => (
                        <div key={stat.label} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-center">
                            <p className={`text-base md:text-lg font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">{stat.label}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Chart */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-zinc-200">Plasma Concentration Curve</h3>
                    {peakPoint && <span className="text-[10px] text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">Peak at {peakPoint.time}h</span>}
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="pkGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="label" tick={{ fontSize: 9, fill: "#71717a" }} tickLine={false} interval="preserveStartEnd" />
                        <YAxis tick={{ fontSize: 9, fill: "#71717a" }} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        {freqHours > 0 && (() => {
                            const lines = [];
                            for (let d = freqHours; d < chartData[chartData.length - 1]?.time; d += freqHours) {
                                lines.push(<ReferenceLine key={d} x={d} stroke="#6d28d9" strokeDasharray="4 4" strokeOpacity={0.4} />);
                            }
                            return lines;
                        })()}
                        <Area type="monotone" dataKey="concentration" stroke="#8b5cf6" strokeWidth={2.5}
                            fill="url(#pkGrad)" dot={false} activeDot={{ r: 5, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }} />
                    </AreaChart>
                </ResponsiveContainer>
                {freqHours > 0 && <p className="text-[9px] text-zinc-600 text-center mt-1">Dashed lines = repeat doses</p>}
            </motion.div>

            {/* Interpretation */}
            {pk && (
                <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/20 p-4 space-y-1.5 text-[12px] text-zinc-400">
                    <p>Ã°Å¸âË <strong className="text-zinc-300">Peak concentration</strong> reached at ~{pk.peakHours >= 1 ? `${pk.peakHours}h` : `${Math.round(pk.peakHours * 60)} minutes`} post-injection.</p>
                    <p>Ã¢ÂÂ± <strong className="text-zinc-300">50% clearance</strong> occurs at {halfLifeLabel}. Effectively cleared in ~{pk.halfLifeHours >= 24 ? `${((pk.halfLifeHours * 5) / 24).toFixed(1)} days` : `${Math.round(pk.halfLifeHours * 5)}h`}.</p>
                    {freqHours > 0 && freqHours < pk.halfLifeHours * 3 && (
                        <p>Ã°Å¸ââ <strong className="text-zinc-300">Accumulation</strong> is expected   trough levels will build up over repeated doses.</p>
                    )}
                    {freqHours > 0 && freqHours >= pk.halfLifeHours * 3 && (
                        <p>Ã¢Åâ¦ <strong className="text-zinc-300">Full clearance</strong> between doses expected. No significant accumulation.</p>
                    )}
                </div>
            )}
        </div>
    );
}
