"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Stethoscope, Search, MapPin, Phone, Globe, Star, ExternalLink, CheckCircle } from "lucide-react";

interface Practitioner {
    name: string;
    type: "clinic" | "telehealth" | "naturopathic" | "integrative";
    location: string;
    website?: string;
    specialties: string[];
    peptideExperience: boolean;
    prescribesPeptides: boolean;
    rating: number;
    notes: string;
}

const practitioners: Practitioner[] = [
    { name: "Defy Medical", type: "telehealth", location: "Nationwide (USA)", website: "https://defymedical.com", specialties: ["Peptide Therapy", "TRT", "Anti-Aging"], peptideExperience: true, prescribesPeptides: true, rating: 4.5, notes: "One of the biggest telehealth peptide clinics. Online consultations, comprehensive bloodwork, and in-house compounding." },
    { name: "Marek Health", type: "telehealth", location: "Nationwide (USA)", website: "https://marekhealth.com", specialties: ["Peptide Therapy", "Hormone Optimization", "Health Optimization"], peptideExperience: true, prescribesPeptides: true, rating: 4.4, notes: "Health optimization clinic with extensive peptide knowledge. Founded by Derek (MPMD)." },
    { name: "The Restore Clinic", type: "integrative", location: "Austin, TX", specialties: ["Peptide Therapy", "IV Therapy", "Regenerative Medicine"], peptideExperience: true, prescribesPeptides: true, rating: 4.6, notes: "Integrative medicine clinic specializing in regenerative therapies including peptides." },
    { name: "Ways2Well", type: "telehealth", location: "Texas (telehealth)", website: "https://ways2well.com", specialties: ["Functional Medicine", "Peptide Therapy", "Longevity"], peptideExperience: true, prescribesPeptides: true, rating: 4.3, notes: "Functional medicine telehealth with peptide protocols. Monthly membership model." },
    { name: "The Peptide Clinic", type: "clinic", location: "Miami, FL", specialties: ["Peptide Therapy", "Weight Management", "Recovery"], peptideExperience: true, prescribesPeptides: true, rating: 4.7, notes: "Dedicated peptide therapy clinic. GH secretagogues, BPC-157, weight loss peptides." },
    { name: "SteadyMD", type: "telehealth", location: "Nationwide (USA)", website: "https://steadymd.com", specialties: ["Primary Care", "Functional Medicine", "Peptides"], peptideExperience: true, prescribesPeptides: true, rating: 4.2, notes: "Matched 1-on-1 doctor. Some providers specialize in peptide therapy. Subscription model." },
    { name: "Age Management Center", type: "clinic", location: "Portland, OR", specialties: ["Anti-Aging", "Hormone Therapy", "Peptides"], peptideExperience: true, prescribesPeptides: true, rating: 4.4, notes: "Age management clinic with peptide expertise. In-person visits with comprehensive labs." },
    { name: "BioteOptimal", type: "integrative", location: "Multiple US locations", specialties: ["Bioidentical Hormones", "Peptide Therapy", "Regenerative Medicine"], peptideExperience: true, prescribesPeptides: true, rating: 4.3, notes: "Integrative practice with multiple locations. Peptide therapy as part of comprehensive wellness." },
];

const typeColors: Record<string, string> = {
    clinic: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    telehealth: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    naturopathic: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    integrative: "bg-violet-500/15 text-violet-400 border-violet-500/30",
};
const typeLabels: Record<string, string> = { clinic: "In-Person Clinic", telehealth: "Telehealth", naturopathic: "Naturopathic", integrative: "Integrative Medicine" };

export default function PractitionersClient() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const filtered = useMemo(() => {
        let list = practitioners;
        if (typeFilter !== "all") list = list.filter((p) => p.type === typeFilter);
        if (search) { const q = search.toLowerCase(); list = list.filter((p) => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.specialties.some((s) => s.toLowerCase().includes(q))); }
        return list;
    }, [search, typeFilter]);

    return (
        <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 pt-2">
        <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Home</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <span className="text-zinc-200 font-medium text-xs">Find a Practitioner</span>
      </nav>
      
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <Stethoscope className="w-5 h-5 text-blue-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Practitioner Finder</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">Doctors and clinics experienced with peptide therapy</p>
            </motion.div>

            <div className="rounded-xl bg-blue-950/20 border border-blue-500/15 p-3 mb-4">
                <p className="text-[10px] text-blue-400/70">ℹ️ This directory is a starting point for finding peptide-experienced practitioners. Always verify credentials and licensing independently.</p>
            </div>

            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="text" placeholder="Search by name, location, or specialty..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500/50" />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {["all", "clinic", "telehealth", "integrative"].map((t) => (
                    <button key={t} onClick={() => setTypeFilter(t)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${typeFilter === t ? "border-violet-500/40 bg-violet-500/10 text-violet-300" : "border-zinc-800 text-zinc-500"}`}>
                        {t === "all" ? "All" : typeLabels[t]}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filtered.map((p, i) => (
                    <motion.div key={p.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-100">{p.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${typeColors[p.type]}`}>{typeLabels[p.type]}</span>
                                        <span className="flex items-center gap-1 text-[10px] text-zinc-500"><MapPin className="w-3 h-3" />{p.location}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                    <span className="text-xs text-zinc-300 font-semibold">{p.rating}</span>
                                </div>
                            </div>
                            <p className="text-xs text-zinc-400 mb-2 leading-relaxed">{p.notes}</p>
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {p.specialties.map((sp) => <span key={sp} className="px-1.5 py-0.5 rounded bg-zinc-800 text-[9px] text-zinc-400">{sp}</span>)}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                                {p.prescribesPeptides && <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> Prescribes Peptides</span>}
                                {p.website && (
                                    <a href={p.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-violet-400 hover:text-violet-300">
                                        <Globe className="w-3 h-3" /> Website <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

