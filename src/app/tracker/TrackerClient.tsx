"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { peptides } from "@/data/peptides";
import { requestNotificationPermission, getNotificationPermission, checkAndFireDueNotifications, type NotifPermission } from "@/lib/notifications";
import { Calendar, Plus, Syringe, X, ChevronLeft, ChevronRight, Clock, Trash2, Bell, BellOff } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

const STORAGE_KEY = "PeptiDex-protocol-tracker";

interface DoseLog {
    id: string;
    peptideName: string;
    doseMcg: number;
    route: string;
    time: string; // ISO date string
    notes?: string;
}

interface Protocol {
    id: string;
    peptideName: string;
    doseMcg: number;
    route: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    active: boolean;
}

interface TrackerData {
    doses: DoseLog[];
    protocols: Protocol[];
}

function loadData(): TrackerData {
    if (typeof window === "undefined") return { doses: [], protocols: [] };
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"doses":[],"protocols":[]}'); } catch { return { doses: [], protocols: [] }; }
}
function saveData(data: TrackerData) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

export default function TrackerClient() {
    const [data, setData] = useState<TrackerData>({ doses: [], protocols: [] });
    const [showAddDose, setShowAddDose] = useState(false);
    const [showAddProtocol, setShowAddProtocol] = useState(false);
    const [calMonth, setCalMonth] = useState(() => new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // Add dose form
    const [dosePeptide, setDosePeptide] = useState("");
    const [doseAmount, setDoseAmount] = useState("");
    const [doseRoute, setDoseRoute] = useState("SubQ");
    const [doseNotes, setDoseNotes] = useState("");

    // Add protocol form
    const [protPeptide, setProtPeptide] = useState("");
    const [protDose, setProtDose] = useState("");
    const [protRoute, setProtRoute] = useState("SubQ");
    const [protFreq, setProtFreq] = useState("Daily");
    const [protStart, setProtStart] = useState(() => new Date().toISOString().slice(0, 10));
    const [protEnd, setProtEnd] = useState("");

    useEffect(() => { setData(loadData()); }, []);

    // Notifications
    const [notifPermission, setNotifPermission] = useState<NotifPermission>("default");
    useEffect(() => {
        setNotifPermission(getNotificationPermission());
        const interval = setInterval(() => checkAndFireDueNotifications(), 60_000);
        return () => clearInterval(interval);
    }, []);
    const enableNotifications = async () => {
        const result = await requestNotificationPermission();
        setNotifPermission(result);
    };


    const update = useCallback((fn: (d: TrackerData) => TrackerData) => {
        setData((prev) => {
            const next = fn({ ...prev, doses: [...prev.doses], protocols: [...prev.protocols] });
            saveData(next);
            return next;
        });
    }, []);

    const addDose = () => {
        if (!dosePeptide || !doseAmount) return;
        const dose: DoseLog = { id: Date.now().toString(), peptideName: dosePeptide, doseMcg: Number(doseAmount), route: doseRoute, time: new Date().toISOString(), notes: doseNotes || undefined };
        update((d) => ({ ...d, doses: [dose, ...d.doses] }));
        setShowAddDose(false); setDoseAmount(""); setDoseNotes("");
    };

    const addProtocol = () => {
        if (!protPeptide || !protDose) return;
        const prot: Protocol = { id: Date.now().toString(), peptideName: protPeptide, doseMcg: Number(protDose), route: protRoute, frequency: protFreq, startDate: protStart, endDate: protEnd || undefined, active: true };
        update((d) => ({ ...d, protocols: [prot, ...d.protocols] }));
        setShowAddProtocol(false); setProtDose("");
    };

    const deleteDose = (id: string) => update((d) => ({ ...d, doses: d.doses.filter((x) => x.id !== id) }));
    const deleteProtocol = (id: string) => update((d) => ({ ...d, protocols: d.protocols.filter((x) => x.id !== id) }));
    const toggleProtocol = (id: string) => update((d) => ({ ...d, protocols: d.protocols.map((p) => p.id === id ? { ...p, active: !p.active } : p) }));

    // Calendar logic
    const calDays = useMemo(() => {
        const year = calMonth.getFullYear(), month = calMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days: (number | null)[] = Array(firstDay).fill(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(i);
        return days;
    }, [calMonth]);

    const dosesForDay = useCallback((day: number) => {
        const target = `${calMonth.getFullYear()}-${String(calMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return data.doses.filter((d) => d.time.slice(0, 10) === target);
    }, [data.doses, calMonth]);

    const selectedDayDoses = selectedDate ? data.doses.filter((d) => d.time.slice(0, 10) === selectedDate) : [];

    const today = new Date().toISOString().slice(0, 10);

    return (
        <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-5 h-5 text-violet-400" />
                            <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Protocol Tracker</h1>
                        </div>
                        <p className="text-xs text-zinc-400">{data.doses.length} dose{data.doses.length !== 1 ? "s" : ""} logged  {data.protocols.filter((p) => p.active).length} active protocol{data.protocols.filter((p) => p.active).length !== 1 ? "s" : ""}</p>
                    </div>
                </div>
            </motion.div>

            {/* Notification Banner */}
            {notifPermission !== "granted" && notifPermission !== "unsupported" && notifPermission !== "denied" && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3 mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-amber-400 shrink-0" />
                        <p className="text-[11px] text-amber-300/90">Enable reminders to get notified when it's time for your next dose</p>
                    </div>
                    <button onClick={enableNotifications} className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-semibold hover:bg-amber-500/25 transition-colors">Enable</button>
                </motion.div>
            )}
            {notifPermission === "denied" && (
                <div className="rounded-xl border border-zinc-800 p-3 mb-4 flex items-center gap-2">
                    <BellOff className="w-4 h-4 text-zinc-500" />
                    <p className="text-[11px] text-zinc-500">Notifications blocked   enable them in browser settings to receive dose reminders.</p>
                </div>
            )}
            {notifPermission === "granted" && (
                <div className="rounded-xl border border-emerald-500/15 bg-emerald-950/10 p-3 mb-4 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-emerald-400" />
                    <p className="text-[11px] text-emerald-400/80">? Dose reminders enabled   you'll be notified when it's time.</p>
                </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mb-6">
                <button onClick={() => setShowAddDose(true)} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/15 transition-colors">
                    <Plus className="w-4 h-4 text-emerald-400" /><span className="text-sm font-semibold text-emerald-300">Log Dose</span>
                </button>
                <button onClick={() => setShowAddProtocol(true)} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/15 transition-colors">
                    <Syringe className="w-4 h-4 text-violet-400" /><span className="text-sm font-semibold text-violet-300">Add Protocol</span>
                </button>
            </div>

            {/* Calendar */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1))} className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
                        <ChevronLeft className="w-4 h-4 text-zinc-400" />
                    </button>
                    <h3 className="text-sm font-semibold text-zinc-200">{calMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h3>
                    <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1))} className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <span key={d} className="text-[10px] text-zinc-500 font-medium">{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {calDays.map((day, i) => {
                        if (day === null) return <div key={`e-${i}`} />;
                        const dateStr = `${calMonth.getFullYear()}-${String(calMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                        const doses = dosesForDay(day);
                        const isToday = dateStr === today;
                        const isSelected = dateStr === selectedDate;
                        return (
                            <button key={day} onClick={() => setSelectedDate(dateStr === selectedDate ? null : dateStr)}
                                className={`relative h-10 rounded-lg text-xs font-medium transition-all ${isSelected ? "bg-violet-500 text-white" : isToday ? "bg-zinc-800 text-violet-400 ring-1 ring-violet-500/50" : "text-zinc-300 hover:bg-zinc-800"}`}>
                                {day}
                                {doses.length > 0 && <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-emerald-400"}`} />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Selected Day Doses */}
            <AnimatePresence>
                {selectedDate && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-6">
                        <h3 className="text-sm font-semibold text-zinc-200 mb-2">
                            {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                        </h3>
                        {selectedDayDoses.length === 0 ? (
                            <p className="text-xs text-zinc-500">No doses logged on this day.</p>
                        ) : (
                            <div className="space-y-2">
                                {selectedDayDoses.map((dose) => (
                                    <div key={dose.id} className="flex items-center justify-between rounded-xl bg-zinc-800/50 border border-zinc-700/40 p-3">
                                        <div>
                                            <span className="text-sm font-semibold text-zinc-100">{dose.peptideName}</span>
                                            <span className="text-xs text-zinc-400 ml-2">{dose.doseMcg} mcg  {dose.route}</span>
                                            {dose.notes && <p className="text-[10px] text-zinc-500 mt-0.5">{dose.notes}</p>}
                                        </div>
                                        <button onClick={() => deleteDose(dose.id)} className="p-1 text-zinc-600 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Active Protocols */}
            {data.protocols.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2"><Syringe className="w-4 h-4 text-violet-400" /> Active Protocols</h3>
                    <div className="space-y-2">
                        {data.protocols.map((prot) => (
                            <div key={prot.id} className={`rounded-xl border p-3 ${prot.active ? "border-violet-500/30 bg-violet-500/5" : "border-zinc-800 bg-zinc-900/30 opacity-60"}`}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-semibold text-zinc-100">{prot.peptideName}</span>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => toggleProtocol(prot.id)} className={`px-2 py-0.5 rounded text-[10px] font-semibold ${prot.active ? "bg-emerald-500/15 text-emerald-400" : "bg-zinc-800 text-zinc-500"}`}>
                                            {prot.active ? "Active" : "Paused"}
                                        </button>
                                        <button onClick={() => deleteProtocol(prot.id)} className="p-1 text-zinc-600 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 text-[10px] text-zinc-400">
                                    <span>{prot.doseMcg}mcg</span><span>{prot.route}</span><span>{prot.frequency}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{prot.startDate}{prot.endDate ? ` ? ${prot.endDate}` : ""}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Doses */}
            {data.doses.length > 0 && (
                <div>
                    <h3 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-400" /> Recent Doses</h3>
                    <div className="space-y-1.5">
                        {data.doses.slice(0, 10).map((dose) => (
                            <div key={dose.id} className="flex items-center justify-between rounded-lg bg-zinc-800/30 px-3 py-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-semibold text-zinc-100">{dose.peptideName}</span>
                                    <span className="text-[10px] text-zinc-500">{dose.doseMcg}mcg  {dose.route}</span>
                                </div>
                                <span className="text-[10px] text-zinc-500">{new Date(dose.time).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add Dose Modal */}
            <AnimatePresence>
                {showAddDose && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 flex items-end md:items-center justify-center">
                        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="bg-zinc-900 border border-zinc-800 rounded-t-2xl md:rounded-2xl w-full max-w-md p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-zinc-100">Log Dose</h3>
                                <button onClick={() => setShowAddDose(false)} className="p-1 text-zinc-500 hover:text-zinc-300"><X className="w-5 h-5" /></button>
                            </div>
                            <div className="space-y-3">
                                <select value={dosePeptide} onChange={(e) => { setDosePeptide(e.target.value); const pep = peptides.find((p) => p.name === e.target.value); if (pep?.dosing) { setDoseAmount(String(pep.dosing.typical_dose_mcg[0])); setDoseRoute(pep.dosing.route); } }}
                                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200">
                                    <option value="">Select peptide...</option>
                                    {peptides.map((p) => <option key={p.slug} value={p.name}>{getCategoryIcon(p.category)} {p.name}</option>)}
                                </select>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] text-zinc-500 uppercase block mb-1">Dose (mcg)</label>
                                        <input type="number" value={doseAmount} onChange={(e) => setDoseAmount(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-zinc-500 uppercase block mb-1">Route</label>
                                        <select value={doseRoute} onChange={(e) => setDoseRoute(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200">
                                            {["SubQ", "IM", "Intranasal", "Oral", "Topical"].map((r) => <option key={r}>{r}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <input type="text" placeholder="Notes (optional)" value={doseNotes} onChange={(e) => setDoseNotes(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500" />
                                <button onClick={addDose} disabled={!dosePeptide || !doseAmount} className="w-full py-3 rounded-xl bg-emerald-500 text-white text-sm font-semibold disabled:opacity-40 hover:bg-emerald-400 transition-colors">Log Dose</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add Protocol Modal */}
            <AnimatePresence>
                {showAddProtocol && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 flex items-end md:items-center justify-center">
                        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="bg-zinc-900 border border-zinc-800 rounded-t-2xl md:rounded-2xl w-full max-w-md p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-zinc-100">Add Protocol</h3>
                                <button onClick={() => setShowAddProtocol(false)} className="p-1 text-zinc-500 hover:text-zinc-300"><X className="w-5 h-5" /></button>
                            </div>
                            <div className="space-y-3">
                                <select value={protPeptide} onChange={(e) => { setProtPeptide(e.target.value); const pep = peptides.find((p) => p.name === e.target.value); if (pep?.dosing) { setProtDose(String(pep.dosing.typical_dose_mcg[0])); setProtRoute(pep.dosing.route); setProtFreq(pep.dosing.frequency); } }}
                                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200">
                                    <option value="">Select peptide...</option>
                                    {peptides.map((p) => <option key={p.slug} value={p.name}>{getCategoryIcon(p.category)} {p.name}</option>)}
                                </select>
                                <div className="grid grid-cols-3 gap-2">
                                    <div><label className="text-[10px] text-zinc-500 uppercase block mb-1">Dose (mcg)</label><input type="number" value={protDose} onChange={(e) => setProtDose(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200" /></div>
                                    <div><label className="text-[10px] text-zinc-500 uppercase block mb-1">Route</label><select value={protRoute} onChange={(e) => setProtRoute(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200">{["SubQ", "IM", "Intranasal", "Oral", "Topical"].map((r) => <option key={r}>{r}</option>)}</select></div>
                                    <div><label className="text-[10px] text-zinc-500 uppercase block mb-1">Frequency</label><select value={protFreq} onChange={(e) => setProtFreq(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200">{["Daily", "2x/day", "2x/week", "3x/week", "Weekly", "5 on / 2 off"].map((f) => <option key={f}>{f}</option>)}</select></div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div><label className="text-[10px] text-zinc-500 uppercase block mb-1">Start Date</label><input type="date" value={protStart} onChange={(e) => setProtStart(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200" /></div>
                                    <div><label className="text-[10px] text-zinc-500 uppercase block mb-1">End Date (opt)</label><input type="date" value={protEnd} onChange={(e) => setProtEnd(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-zinc-200" /></div>
                                </div>
                                <button onClick={addProtocol} disabled={!protPeptide || !protDose} className="w-full py-3 rounded-xl bg-violet-500 text-white text-sm font-semibold disabled:opacity-40 hover:bg-violet-400 transition-colors">Add Protocol</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

