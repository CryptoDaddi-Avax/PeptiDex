"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PeptideCard } from "@/components/peptide-card";
import { peptides, searchPeptides } from "@/data/peptides";
import { peptideBlends } from "@/data/blends";
import { Search, BookOpen, FlaskConical, ChevronRight } from "lucide-react";

const categories = [...new Set(peptides.map((p) => p.category))];

export default function LibraryPage() {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filtered = useMemo(() => {
        let results = query ? searchPeptides(query) : peptides;
        if (selectedCategory) {
            results = results.filter((p) => p.category === selectedCategory);
        }
        return results;
    }, [query, selectedCategory]);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Peptide Research Library',
        description: 'An indexed directory of synthetic peptides, metabolic profiles, and pharmacokinetic data.',
        url: 'https://peptidex.app/library'
    };

    return (
        <div className="max-w-5xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 md:mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Peptide Library</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">{peptides.length} compounds • Tap any card for details</p>
            </motion.div>

            {/* Blends Banner */}
            <Link href="/library/blends">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 }}
                    className="group mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border border-violet-500/20 hover:border-violet-500/40 transition-all cursor-pointer"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                <FlaskConical className="w-4 h-4 text-violet-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-violet-300 group-hover:text-violet-200 transition-colors">
                                    Peptide Blends
                                </h3>
                                <p className="text-[10px] text-zinc-500">
                                    {peptideBlends.length} popular combinations — BPC/TB-500, CJC/Ipa & more
                                </p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-violet-400 transition-colors" />
                    </div>
                </motion.div>
            </Link>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search peptides, benefits, categories..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors"
                />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${!selectedCategory ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                        }`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${selectedCategory === cat ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((peptide, i) => (
                    <PeptideCard key={peptide.slug} peptide={peptide} index={i} />
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-zinc-400">No peptides match your search.</p>
                </div>
            )}

            {filtered.length > 0 && (
                <div className="mt-12 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50">
                    <h3 className="text-sm font-bold text-zinc-100 mb-2">About the Peptide Directory</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                        This comprehensive library indexes synthetic amino acid sequences specifically formulated for in-vitro laboratory research. It aggregates pharmacokinetic data, half-life degradation metrics, and clinical trial outcomes for educational referencing. By providing structured, peer-reviewed data vectors on compounds ranging from BPC-157 tissue repair to advanced GLP-1 metabolic agonists, researchers can efficiently map mechanism-of-action hypotheses. None of the listed compounds are FDA approved for human therapeutic consumption. Always verify chemical purity via rigorous third-party HPLC/MS Certificates of Analysis prior to experimental utilization.
                    </p>
                </div>
            )}
        </div>
    );
}
