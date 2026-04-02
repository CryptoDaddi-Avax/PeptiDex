"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { peptides } from "@/data/peptides";
import { getCategoryIcon } from "@/data/category-icons";
import {
    Plus, Trash2, Printer, Download, Calendar,
    Clock, Syringe, FlaskConical, ChevronDown,
    CheckCircle2, AlertCircle, Copy, X
} from "lucide-react";

/* ──────── Types ──────── */

type ProtocolEntry = {
    id: string;
    peptideName: string;
    doseMcg: number;
    frequency: string;
    route: string;
    timing: string;
    daysOfWeek: string[];
    notes: string;
};

type Protocol = {
    name: string;
    durationWeeks: number;
    entries: ProtocolEntry[];
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FREQUENCIES = ["Daily", "2x/day", "3x/week", "EOD", "Weekly"];
const ROUTES = ["SubQ", "IM", "Nasal", "Oral", "Topical"];
const TIMINGS = ["Morning", "Evening", "Pre-bed", "Pre-workout", "Split AM/PM"];

function generateId() { return Math.random().toString(36).slice(2, 9); }

/* ──────── Main Component ──────── */

export default function ProtocolPage() {
    const [protocol, setProtocol] = useState<Protocol>({
        name: "My Peptide Protocol",
        durationWeeks: 8,
        entries: [],
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [copied, setCopied] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);

    const addEntry = (peptideName: string) => {
        const pep = peptides.find((p) => p.name === peptideName);
        const newEntry: ProtocolEntry = {
            id: generateId(),
            peptideName,
            doseMcg: pep?.dosing?.typical_dose_mcg?.[0] ?? 250,
            frequency: pep?.dosing?.frequency ?? "Daily",
            route: pep?.dosing?.route ?? "SubQ",
            timing: pep?.dosing?.timing ?? "Morning",
            daysOfWeek: ["Mon", "Wed", "Fri"],
            notes: "",
        };
        setProtocol((p) => ({ ...p, entries: [...p.entries, newEntry] }));
        setShowAddModal(false);
        setSearchTerm("");
    };

    const removeEntry = (id: string) => {
        setProtocol((p) => ({ ...p, entries: p.entries.filter((e) => e.id !== id) }));
    };

    const updateEntry = (id: string, field: keyof ProtocolEntry, value: any) => {
        setProtocol((p) => ({
            ...p,
            entries: p.entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
        }));
    };

    const toggleDay = (id: string, day: string) => {
        setProtocol((p) => ({
            ...p,
            entries: p.entries.map((e) => {
                if (e.id !== id) return e;
                const days = e.daysOfWeek.includes(day)
                    ? e.daysOfWeek.filter((d) => d !== day)
                    : [...e.daysOfWeek, day];
                return { ...e, daysOfWeek: days };
            }),
        }));
    };

    const handlePrint = () => {
        window.print();
    };

    const copyAsText = () => {
        const lines = [
            `=== ${protocol.name} ===`,
            `Duration: ${protocol.durationWeeks} weeks`,
            "",
            ...protocol.entries.map((e) =>
                `• ${e.peptideName}: ${e.doseMcg}mcg ${e.route} — ${e.frequency} (${e.timing}) — Days: ${e.daysOfWeek.join(", ")}${e.notes ? ` — Note: ${e.notes}` : ""}`
            ),
        ];
        navigator.clipboard.writeText(lines.join("\n"));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const filteredPeptides = peptides.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !protocol.entries.some((e) => e.peptideName === p.name)
    );

    return (
        <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-violet-400" /> Protocol Builder
                    </h1>
                    <p className="text-xs text-zinc-500 mt-0.5">Build, customize, and export your peptide protocol</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={copyAsText}
                        className="p-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
                        title="Copy as text"
                    >
                        {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={handlePrint}
                        className="p-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
                        title="Print protocol"
                    >
                        <Printer className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Protocol Meta */}
            <div className="grid grid-cols-2 gap-3 mb-6" ref={printRef}>
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">Protocol Name</label>
                    <input
                        value={protocol.name}
                        onChange={(e) => setProtocol((p) => ({ ...p, name: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 focus:border-violet-500/50 focus:outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 block">Duration (weeks)</label>
                    <select
                        value={protocol.durationWeeks}
                        onChange={(e) => setProtocol((p) => ({ ...p, durationWeeks: Number(e.target.value) }))}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 focus:border-violet-500/50 focus:outline-none transition-colors appearance-none"
                    >
                        {[4, 6, 8, 10, 12, 16, 20, 24].map((w) => (
                            <option key={w} value={w}>{w} weeks</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Entries */}
            <AnimatePresence mode="popLayout">
                {protocol.entries.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 rounded-2xl border-2 border-dashed border-zinc-800 mb-4"
                    >
                        <FlaskConical className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
                        <p className="text-sm text-zinc-500 mb-1">No peptides added yet</p>
                        <p className="text-xs text-zinc-600">Click below to start building your protocol</p>
                    </motion.div>
                ) : (
                    <div className="space-y-3 mb-4">
                        {protocol.entries.map((entry) => {
                            const pep = peptides.find((p) => p.name === entry.peptideName);
                            return (
                                <motion.div
                                    key={entry.id}
                                    layout
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800"
                                >
                                    {/* Top row */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">{getCategoryIcon(pep?.category || "")}</span>
                                            <h3 className="text-sm font-bold text-zinc-100">{entry.peptideName}</h3>
                                        </div>
                                        <button
                                            onClick={() => removeEntry(entry.id)}
                                            className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                            aria-label={`Remove ${entry.peptideName}`}
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Config grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                                        <div>
                                            <label className="text-[9px] uppercase tracking-wider text-zinc-600 block mb-0.5">Dose (mcg)</label>
                                            <input
                                                type="number"
                                                value={entry.doseMcg}
                                                onChange={(e) => updateEntry(entry.id, "doseMcg", Number(e.target.value))}
                                                className="w-full px-2 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 focus:border-violet-500/50 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[9px] uppercase tracking-wider text-zinc-600 block mb-0.5">Frequency</label>
                                            <select
                                                value={entry.frequency}
                                                onChange={(e) => updateEntry(entry.id, "frequency", e.target.value)}
                                                className="w-full px-2 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 focus:border-violet-500/50 focus:outline-none appearance-none"
                                            >
                                                {FREQUENCIES.map((f) => <option key={f} value={f}>{f}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[9px] uppercase tracking-wider text-zinc-600 block mb-0.5">Route</label>
                                            <select
                                                value={entry.route}
                                                onChange={(e) => updateEntry(entry.id, "route", e.target.value)}
                                                className="w-full px-2 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 focus:border-violet-500/50 focus:outline-none appearance-none"
                                            >
                                                {ROUTES.map((r) => <option key={r} value={r}>{r}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[9px] uppercase tracking-wider text-zinc-600 block mb-0.5">Timing</label>
                                            <select
                                                value={entry.timing}
                                                onChange={(e) => updateEntry(entry.id, "timing", e.target.value)}
                                                className="w-full px-2 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 focus:border-violet-500/50 focus:outline-none appearance-none"
                                            >
                                                {TIMINGS.map((t) => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Days of week */}
                                    <div>
                                        <label className="text-[9px] uppercase tracking-wider text-zinc-600 block mb-1">Active Days</label>
                                        <div className="flex gap-1">
                                            {DAYS.map((day) => (
                                                <button
                                                    key={day}
                                                    onClick={() => toggleDay(entry.id, day)}
                                                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                                                        entry.daysOfWeek.includes(day)
                                                            ? "bg-violet-500/20 border border-violet-500/40 text-violet-300"
                                                            : "bg-zinc-800/50 border border-zinc-800 text-zinc-600 hover:text-zinc-400"
                                                    }`}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <input
                                        placeholder="Add a note (optional)..."
                                        value={entry.notes}
                                        onChange={(e) => updateEntry(entry.id, "notes", e.target.value)}
                                        className="w-full mt-2 px-2 py-1.5 rounded-lg bg-zinc-800/40 border border-zinc-800/60 text-[11px] text-zinc-400 placeholder:text-zinc-700 focus:border-violet-500/30 focus:outline-none"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </AnimatePresence>

            {/* Add Button */}
            <button
                onClick={() => setShowAddModal(true)}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-zinc-700 text-zinc-500 hover:border-violet-500/40 hover:text-violet-400 transition-all flex items-center justify-center gap-2 text-sm font-medium"
            >
                <Plus className="w-4 h-4" /> Add Peptide
            </button>

            {/* Summary Card */}
            {protocol.entries.length > 0 && (
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-violet-500/5 to-cyan-500/5 border border-zinc-800">
                    <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">Protocol Summary</h3>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                            <p className="text-lg font-bold text-violet-400">{protocol.entries.length}</p>
                            <p className="text-[10px] text-zinc-500">Compounds</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-cyan-400">{protocol.durationWeeks}</p>
                            <p className="text-[10px] text-zinc-500">Weeks</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-emerald-400">
                                {protocol.entries.reduce((sum, e) => sum + e.daysOfWeek.length, 0)}
                            </p>
                            <p className="text-[10px] text-zinc-500">Injections/wk</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Peptide Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
                        onClick={() => setShowAddModal(false)}
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
                                <button onClick={() => setShowAddModal(false)} className="text-zinc-600 hover:text-zinc-300">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <input
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search peptides..."
                                className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 mb-3 focus:border-violet-500/50 focus:outline-none"
                            />
                            <div className="overflow-y-auto flex-1 space-y-1">
                                {filteredPeptides.map((pep) => (
                                    <button
                                        key={pep.slug}
                                        onClick={() => addEntry(pep.name)}
                                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-zinc-800 transition-colors flex items-center gap-2"
                                    >
                                        <span className="text-sm">{getCategoryIcon(pep.category)}</span>
                                        <div>
                                            <p className="text-sm text-zinc-200 font-medium">{pep.name}</p>
                                            <p className="text-[10px] text-zinc-500 line-clamp-1">{pep.primary_benefits}</p>
                                        </div>
                                    </button>
                                ))}
                                {filteredPeptides.length === 0 && (
                                    <p className="text-center text-xs text-zinc-600 py-6">
                                        {searchTerm ? "No peptides match your search" : "All peptides already added"}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
