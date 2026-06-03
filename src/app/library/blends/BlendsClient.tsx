"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { peptideBlends, searchBlends } from "@/data/blends";
import { Search, Layers, ArrowRight, FlaskConical, ChevronRight } from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

const categories = [...new Set(peptideBlends.map((b) => b.category))];

const categoryColors: Record<string, string> = {
    "Healing & Recovery": "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
    "Growth Hormone": "from-violet-500/20 to-purple-500/10 border-violet-500/30",
    "Cognitive Enhancement": "from-cyan-500/20 to-blue-500/10 border-cyan-500/30",
    "Gut Health": "from-green-500/20 to-emerald-500/10 border-green-500/30",
    "Anti-Aging & Longevity": "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    "Immune Support": "from-red-500/20 to-rose-500/10 border-red-500/30",
    "Energy & Mitochondrial": "from-yellow-500/20 to-amber-500/10 border-yellow-500/30",
    "Sleep & Recovery": "from-indigo-500/20 to-blue-500/10 border-indigo-500/30",
};

export default function BlendsClient() {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filtered = useMemo(() => {
        let results = query ? searchBlends(query) : peptideBlends;
        if (selectedCategory) {
            results = results.filter((b) => b.category === selectedCategory);
        }
        return results;
    }, [query, selectedCategory]);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Peptide Blends & Combination Stacks',
        description: 'An indexed directory of synthetic peptide blends, multi-compound synergistic protocols, and pharmacokinetic data.',
        url: 'https://peptidex.app/library/blends'
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 pt-2">
        <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Home</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <Link href="/library" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Library</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <span className="text-zinc-200 font-medium text-xs">Peptide Blends</span>
      </nav>
      
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 md:mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <FlaskConical className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Peptide Blends</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">
                    {peptideBlends.length} popular combinations • Multi-peptide stacks for targeted goals
                </p>
            </motion.div>

            {/* Info Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-4 p-3 rounded-xl bg-violet-500/5 border border-violet-500/20"
            >
                <p className="text-xs text-violet-300/80 leading-relaxed">
                    💡 <strong>Blends</strong> combine multiple peptides for synergistic effects. Each component targets a different pathway, amplifying results beyond what individual peptides achieve alone.
                </p>
            </motion.div>

            {/* Search */}
            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search blends, peptides, benefits..."
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

            {/* Blend Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filtered.map((blend, i) => (
                    <motion.div
                        key={blend.slug}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Link href={`/library/blends/${blend.slug}`}>
                            <div className={`group relative p-4 rounded-2xl bg-gradient-to-br ${categoryColors[blend.category] || "from-zinc-800/50 to-zinc-900/50 border-zinc-700/50"} border backdrop-blur-sm hover:scale-[1.01] transition-all duration-200 cursor-pointer`}>
                                {/* Header */}
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{getCategoryIcon(blend.category)}</span>
                                        <div>
                                            <h3 className="text-sm font-bold text-zinc-100 group-hover:text-violet-300 transition-colors">
                                                {blend.name}
                                            </h3>
                                            <p className="text-[10px] text-zinc-500 italic">&quot;{blend.nickname}&quot;</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 transition-colors" />
                                </div>

                                {/* Components */}
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {blend.components.map((comp) => (
                                        <span
                                            key={comp}
                                            className="px-2 py-0.5 rounded-full bg-zinc-900/60 border border-zinc-700/50 text-[10px] font-medium text-zinc-300"
                                        >
                                            {comp}
                                        </span>
                                    ))}
                                </div>

                                {/* Benefits */}
                                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-2">
                                    {blend.primary_benefits}
                                </p>

                                {/* Category Tag */}
                                <span className="px-2 py-0.5 rounded-lg bg-zinc-900/40 text-[10px] text-zinc-500">
                                    {blend.category}
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-zinc-400">No blends match your search.</p>
                </div>
            )}

            {filtered.length > 0 && (
                <div className="mt-12 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50">
                    <h3 className="text-sm font-bold text-zinc-100 mb-2">Understanding Peptide Blends</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                        Peptide blends represent an advanced vector of laboratory research where multiple synthetic amino acid sequences are combined into a single reconstituted vial to trigger synergistic molecular pathways. Classic examples like the synergistic pairing of Angiogenesis regulators (BPC-157) with actin-binding proteins (TB-500) demonstrate compounded efficacy in tissue healing models compared to isolated administration. Similarly, researchers frequently combine Growth Hormone Releasing Hormones (GHRH) like CJC-1295 with Growth Hormone Releasing Peptides (GHRP) like Ipamorelin to maximize pituitary pulsatility while minimizing somatostatin feedback loops. All blends are strictly for pre-clinical laboratory evaluation and educational purposes, necessitating rigorous HPLC analysis to ensure the components do not degrade or cross-react in suspension.
                    </p>
                </div>
            )}
        </div>
    );
}

