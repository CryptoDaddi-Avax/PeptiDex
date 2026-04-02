"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { peptides } from "@/data/peptides";
import { Activity, Plus, X, Clock, Info } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

/* ──────── Pharmacokinetics Engine ──────── */

const COLORS = [
    "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b",
    "#ef4444", "#ec4899", "#6366f1", "#14b8a6",
];

type SelectedPeptide = {
    name: string;
    halfLifeH: number;
    injectionHour: number;
    color: string;
};

/**
 * Exponential decay: C(t) = C0 * (0.5)^(t / t½)
 * Returns normalized concentration [0–1] at each hour
 */
function getConcentrationCurve(halfLifeH: number, injectionHour: number, hours: number): number[] {
    const curve: number[] = [];
    for (let h = 0; h < hours; h++) {
        const elapsed = h - injectionHour;
        if (elapsed < 0) {
            curve.push(0);
        } else {
            // Simple absorption: ramp up for first ~0.5h then decay
            const absorptionFactor = elapsed < 0.5 ? elapsed / 0.5 : 1;
            const decay = Math.pow(0.5, elapsed / halfLifeH);
            curve.push(absorptionFactor * decay);
        }
    }
    return curve;
}

/* ──────── SVG Chart ──────── */

function HalfLifeChart({ selected, totalHours }: { selected: SelectedPeptide[]; totalHours: number }) {
    const w = 800;
    const h = 300;
    const pad = { top: 20, right: 20, bottom: 40, left: 50 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;

    const curves = useMemo(
        () =>
            selected.map((s) => ({
                ...s,
                data: getConcentrationCurve(s.halfLifeH, s.injectionHour, totalHours),
            })),
        [selected, totalHours]
    );

    const xScale = (hour: number) => pad.left + (hour / totalHours) * cw;
    const yScale = (val: number) => pad.top + ch - val * ch;

    const toPath = (data: number[]) =>
        data
            .map((v, i) => `${i === 0 ? "M" : "L"} ${xScale(i).toFixed(1)} ${yScale(v).toFixed(1)}`)
            .join(" ");

    const toArea = (data: number[]) =>
        toPath(data) + ` L ${xScale(data.length - 1).toFixed(1)} ${yScale(0).toFixed(1)} L ${xScale(0).toFixed(1)} ${yScale(0).toFixed(1)} Z`;

    // Time labels
    const tickInterval = totalHours <= 24 ? 2 : totalHours <= 48 ? 4 : 6;
    const ticks = Array.from({ length: Math.floor(totalHours / tickInterval) + 1 }, (_, i) => i * tickInterval);

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1].map((v) => (
                <g key={v}>
                    <line
                        x1={pad.left} y1={yScale(v)}
                        x2={w - pad.right} y2={yScale(v)}
                        stroke="#27272a" strokeWidth={1} strokeDasharray="4 4"
                    />
                    <text x={pad.left - 8} y={yScale(v) + 4} textAnchor="end" fill="#52525b" fontSize={10}>
                        {Math.round(v * 100)}%
                    </text>
                </g>
            ))}

            {/* X-axis */}
            <line x1={pad.left} y1={yScale(0)} x2={w - pad.right} y2={yScale(0)} stroke="#3f3f46" strokeWidth={1} />
            {ticks.map((t) => (
                <text key={t} x={xScale(t)} y={h - 10} textAnchor="middle" fill="#52525b" fontSize={10}>
                    {t}h
                </text>
            ))}

            {/* Curves */}
            {curves.map((c) => (
                <g key={c.name}>
                    {/* Fill */}
                    <path d={toArea(c.data)} fill={c.color} fillOpacity={0.08} />
                    {/* Line */}
                    <path d={toPath(c.data)} fill="none" stroke={c.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    {/* Injection marker */}
                    <circle cx={xScale(c.injectionHour)} cy={yScale(c.data[c.injectionHour] ?? 0)} r={4} fill={c.color} />
                </g>
            ))}

            {/* Y-axis label */}
            <text
                x={12} y={pad.top + ch / 2}
                textAnchor="middle" fill="#71717a" fontSize={10}
                transform={`rotate(-90, 12, ${pad.top + ch / 2})`}
            >
                Plasma Level
            </text>
            <text x={pad.left + cw / 2} y={h - 0} textAnchor="middle" fill="#71717a" fontSize={10}>
                Hours After First Injection
            </text>
        </svg>
    );
}

/* ──────── Main Page ──────── */

export default function HalfLifePage() {
    const [selected, setSelected] = useState<SelectedPeptide[]>([]);
    const [showPicker, setShowPicker] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalHours, setTotalHours] = useState(24);

    const peptidesWithHL = peptides.filter((p) => p.half_life_hours && p.half_life_hours > 0);

    const addPeptide = (name: string, halfLifeH: number) => {
        if (selected.length >= 8) return;
        setSelected((s) => [
            ...s,
            {
                name,
                halfLifeH,
                injectionHour: 0,
                color: COLORS[s.length % COLORS.length],
            },
        ]);
        setShowPicker(false);
        setSearchTerm("");
    };

    const removePeptide = (name: string) => {
        setSelected((s) => s.filter((p) => p.name !== name));
    };

    const updateInjectionHour = (name: string, hour: number) => {
        setSelected((s) =>
            s.map((p) => (p.name === name ? { ...p, injectionHour: hour } : p))
        );
    };

    const filteredPeptides = peptidesWithHL.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !selected.some((s) => s.name === p.name)
    );

    return (
        <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
            {/* Header */}
            <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2 mb-1">
                <Activity className="w-5 h-5 text-cyan-400" /> Half-Life Visualizer
            </h1>
            <p className="text-xs text-zinc-500 mb-6">
                See how multiple peptides&apos; active levels overlap throughout the day. Adjust injection times to optimize your protocol timing.
            </p>

            {/* Time Range Selector */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-zinc-500">Time range:</span>
                {[24, 48, 72].map((h) => (
                    <button
                        key={h}
                        onClick={() => setTotalHours(h)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            totalHours === h
                                ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                                : "bg-zinc-800 border border-zinc-700 text-zinc-500 hover:text-zinc-300"
                        }`}
                    >
                        {h}h
                    </button>
                ))}
            </div>

            {/* Chart */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 mb-4">
                {selected.length === 0 ? (
                    <div className="text-center py-16">
                        <Activity className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                        <p className="text-sm text-zinc-500 mb-1">No peptides selected</p>
                        <p className="text-xs text-zinc-600">Add peptides below to visualize their half-life curves</p>
                    </div>
                ) : (
                    <HalfLifeChart selected={selected} totalHours={totalHours} />
                )}
            </div>

            {/* Legend & Controls */}
            {selected.length > 0 && (
                <div className="space-y-2 mb-4">
                    {selected.map((s) => (
                        <div key={s.name} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
                            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-200">{s.name}</p>
                                <p className="text-[10px] text-zinc-500">t½ = {s.halfLifeH}h</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-[10px] text-zinc-500 whitespace-nowrap">Inject at:</label>
                                <select
                                    value={s.injectionHour}
                                    onChange={(e) => updateInjectionHour(s.name, Number(e.target.value))}
                                    className="px-2 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 appearance-none focus:outline-none"
                                >
                                    {Array.from({ length: Math.min(totalHours, 24) }, (_, i) => (
                                        <option key={i} value={i}>
                                            {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={() => removePeptide(s.name)}
                                className="p-1 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                aria-label={`Remove ${s.name}`}
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Button */}
            <button
                onClick={() => setShowPicker(true)}
                disabled={selected.length >= 8}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-zinc-700 text-zinc-500 hover:border-cyan-500/40 hover:text-cyan-400 transition-all flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <Plus className="w-4 h-4" /> Add Peptide {selected.length > 0 && `(${selected.length}/8)`}
            </button>

            {/* Info box */}
            <div className="mt-6 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <div className="text-[11px] text-zinc-400 leading-relaxed">
                    <p className="font-medium text-zinc-300 mb-1">How to read this chart</p>
                    <p>Each curve shows the relative plasma concentration after injection. The <strong className="text-zinc-300">peak</strong> represents maximum absorption, and the curve drops to 50% at the half-life mark. Use injection time selectors to see how your peptides overlap and find optimal timing windows.</p>
                </div>
            </div>

            {/* Picker Modal */}
            <AnimatePresence>
                {showPicker && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
                        onClick={() => setShowPicker(false)}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-4 max-h-[70vh] overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-bold text-zinc-100">Select Peptide</h2>
                                <button onClick={() => setShowPicker(false)} className="text-zinc-600 hover:text-zinc-300">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <input
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search peptides..."
                                className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 mb-3 focus:border-cyan-500/50 focus:outline-none"
                            />
                            <div className="overflow-y-auto flex-1 space-y-1">
                                {filteredPeptides.map((pep) => (
                                    <button
                                        key={pep.slug}
                                        onClick={() => addPeptide(pep.name, pep.half_life_hours!)}
                                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">{getCategoryIcon(pep.category)}</span>
                                            <div>
                                                <p className="text-sm text-zinc-200 font-medium">{pep.name}</p>
                                                <p className="text-[10px] text-zinc-500">{pep.category}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs text-cyan-400 font-mono">t½ {pep.half_life_hours}h</span>
                                    </button>
                                ))}
                                {filteredPeptides.length === 0 && (
                                    <p className="text-center text-xs text-zinc-600 py-6">No matching peptides with half-life data</p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
