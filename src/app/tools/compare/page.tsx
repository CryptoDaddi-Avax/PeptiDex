"use client";
import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { peptides } from "@/data/peptides";
import { stacks } from "@/data/stacks";
import { EvidenceBadge } from "@/components/peptide-card";
import { SHORT_DISCLAIMER, EVIDENCE_SCALE } from "@/data/constants";
import {
    GitCompare, ChevronDown, ShieldAlert, Clock, Syringe, Activity,
    Share2, Link2, Check, AlertTriangle, Layers, FlaskConical,
    ArrowRight, Sparkles, X, Search, Beaker, ChevronRight, Zap
} from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";
import type { Peptide } from "@/data/types";

/* ═══════════════════════════════════════════════════════════
   HELPER: Generate comparison summary
   ═══════════════════════════════════════════════════════════ */
function generateComparisonSummary(compared: Peptide[]): string {
    if (compared.length < 2) return "";
    const names = compared.map((p) => p.name);

    // Build category info
    const cats = compared.map((p) => p.category);
    const sameCat = cats.every((c) => c === cats[0]);

    // Build benefit areas
    const allBenefits = compared
        .map((p) => p.primary_benefits.toLowerCase())
        .join(", ");

    // Evidence levels
    const evidenceLevels = compared.map(
        (p) => EVIDENCE_SCALE[p.key_studies[0]?.evidence_level]?.label || "Preclinical"
    );

    // Synergy check
    const synergyPairs: string[] = [];
    compared.forEach((p) => {
        compared.forEach((q) => {
            if (
                p.slug !== q.slug &&
                p.interactions?.synergies.includes(q.name) &&
                !synergyPairs.includes(`${q.name} + ${p.name}`)
            ) {
                synergyPairs.push(`${p.name} + ${q.name}`);
            }
        });
    });

    let summary = "";

    if (compared.length === 2) {
        const [a, b] = compared;
        const halfA = a.half_life_hours
            ? a.half_life_hours >= 24
                ? `${Math.round(a.half_life_hours / 24)} days`
                : `${a.half_life_hours} hours`
            : "unknown";
        const halfB = b.half_life_hours
            ? b.half_life_hours >= 24
                ? `${Math.round(b.half_life_hours / 24)} days`
                : `${b.half_life_hours} hours`
            : "unknown";

        summary = `${a.name} and ${b.name} are${sameCat ? ` both ${cats[0]} peptides` : ` from different classes (${a.category} vs ${b.category})`} commonly compared in peptide research. `;
        summary += `${a.name} is primarily used for ${a.primary_benefits.toLowerCase()}, while ${b.name} focuses on ${b.primary_benefits.toLowerCase()}. `;
        summary += `Their half-lives differ significantly \u2014 ${a.name} at ${halfA} vs ${b.name} at ${halfB} \u2014 which affects dosing frequency and protocol design. `;
        summary += `Evidence levels are ${evidenceLevels[0]} for ${a.name} and ${evidenceLevels[1]} for ${b.name}. `;
    } else {
        summary = `This comparison examines ${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}, covering ${sameCat ? `the ${cats[0]} category` : `multiple categories (${[...new Set(cats)].join(", ")})`}. `;
        summary += `Together they address: ${allBenefits}. `;
    }

    if (synergyPairs.length > 0) {
        summary += `Notably, ${synergyPairs.join(" and ")} ${synergyPairs.length === 1 ? "is a" : "are"} recognized synergistic ${synergyPairs.length === 1 ? "combination" : "combinations"} frequently used together in research protocols.`;
    }

    return summary;
}

/* ═══════════════════════════════════════════════════════════
   HELPER: Get stacks containing a peptide
   ═══════════════════════════════════════════════════════════ */
function getStacksForPeptide(peptideName: string) {
    return stacks.filter((s) =>
        s.peptides.some((sp) => sp.name === peptideName)
    );
}

/* ═══════════════════════════════════════════════════════════
   HELPER: Format half-life
   ═══════════════════════════════════════════════════════════ */
function formatHalfLife(hours?: number): string {
    if (!hours) return "N/A";
    if (hours >= 168) return `${Math.round(hours / 168)}w`;
    if (hours >= 24) return `${Math.round(hours / 24)}d`;
    if (hours >= 1) return `${hours}h`;
    return `${Math.round(hours * 60)}min`;
}

/* ═══════════════════════════════════════════════════════════
   SEARCHABLE DROPDOWN COMPONENT
   ═══════════════════════════════════════════════════════════ */
function PeptideDropdown({
    value,
    onChange,
    onRemove,
    exclude,
    index,
}: {
    value: string;
    onChange: (slug: string) => void;
    onRemove: () => void;
    exclude: string[];
    index: number;
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const available = peptides.filter(
            (p) => !exclude.includes(p.slug) || p.slug === value
        );
        if (!search) return available;
        const q = search.toLowerCase();
        return available.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.aliases?.some((a) => a.toLowerCase().includes(q))
        );
    }, [search, exclude, value]);

    const selected = peptides.find((p) => p.slug === value);

    return (
        <div className="relative">
            <button
                onClick={() => {
                    setOpen(!open);
                    setSearch("");
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm transition-all min-w-[180px] ${
                    value
                        ? "border-violet-500/40 bg-violet-500/5 text-zinc-100"
                        : "border-zinc-700 bg-zinc-900 text-zinc-400"
                } hover:border-violet-500/50`}
            >
                {selected && (
                    <span className="text-base">
                        {getCategoryIcon(selected.category)}
                    </span>
                )}
                <span className="flex-1 text-left font-medium truncate">
                    {selected?.name || `Peptide ${index + 1}`}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* Remove button */}
            <button
                onClick={onRemove}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-zinc-700 hover:bg-red-500 text-zinc-300 text-xs flex items-center justify-center transition-colors z-10"
            >
                <X className="w-3 h-3" />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 mt-2 w-72 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/50 overflow-hidden"
                    >
                        {/* Search */}
                        <div className="p-2 border-b border-zinc-800">
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800/80">
                                <Search className="w-3.5 h-3.5 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Search peptides..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="flex-1 bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* List */}
                        <div className="max-h-60 overflow-auto">
                            {filtered.length === 0 && (
                                <div className="px-4 py-6 text-center text-sm text-zinc-500">
                                    No peptides match &quot;{search}&quot;
                                </div>
                            )}
                            {filtered.map((p) => (
                                <button
                                    key={p.slug}
                                    onClick={() => {
                                        onChange(p.slug);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-zinc-800/50 last:border-0 flex items-center gap-2.5 ${
                                        p.slug === value
                                            ? "bg-violet-500/10 text-violet-300"
                                            : "text-zinc-300 hover:bg-violet-500/5"
                                    }`}
                                >
                                    <span className="text-sm">
                                        {getCategoryIcon(p.category)}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <span className="font-medium">{p.name}</span>
                                        <span className="text-[10px] text-zinc-500 ml-2">
                                            {p.category}
                                        </span>
                                    </div>
                                    {p.slug === value && (
                                        <Check className="w-3.5 h-3.5 text-violet-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Click-away overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   COMPARISON ROW COMPONENT
   ═══════════════════════════════════════════════════════════ */
function ComparisonRow({
    label,
    icon,
    children,
    count,
    highlight,
}: {
    label: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    count: number;
    highlight?: boolean;
}) {
    return (
        <div
            className={`grid gap-3 rounded-xl border p-3 md:p-4 transition-colors ${
                highlight
                    ? "bg-violet-500/5 border-violet-500/20"
                    : "bg-zinc-900/50 border-zinc-800/50"
            }`}
            style={{
                gridTemplateColumns: `140px repeat(${count}, 1fr)`,
            }}
        >
            <div className="flex items-start gap-2">
                {icon}
                <span className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider leading-tight">
                    {label}
                </span>
            </div>
            {children}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE (wrapped with Suspense)
   ═══════════════════════════════════════════════════════════ */
function ComparePageInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selected, setSelected] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    // Hydrate from URL params on mount
    useEffect(() => {
        const p = searchParams.get("p");
        if (p) {
            const slugs = p
                .split(",")
                .filter((s) => peptides.some((pep) => pep.slug === s))
                .slice(0, 3);
            if (slugs.length >= 2) setSelected(slugs);
        }
    }, [searchParams]);

    // Sync URL whenever selection changes (without full navigation)
    const syncUrl = useCallback(
        (slugs: string[]) => {
            const validSlugs = slugs.filter(Boolean);
            if (validSlugs.length >= 2) {
                router.replace(`/tools/compare?p=${validSlugs.join(",")}`, {
                    scroll: false,
                });
            } else {
                router.replace("/tools/compare", { scroll: false });
            }
        },
        [router]
    );

    const compared = useMemo(
        () =>
            selected
                .map((slug) => peptides.find((p) => p.slug === slug))
                .filter(Boolean) as Peptide[],
        [selected]
    );

    const summary = useMemo(
        () => generateComparisonSummary(compared),
        [compared]
    );

    const addSlot = () => {
        if (selected.length < 3) {
            const next = [...selected, ""];
            setSelected(next);
        }
    };

    const removeSlot = (i: number) => {
        const next = selected.filter((_, idx) => idx !== i);
        setSelected(next);
        syncUrl(next);
    };

    const setSlot = (i: number, slug: string) => {
        const next = [...selected];
        next[i] = slug;
        setSelected(next);
        syncUrl(next);
    };

    // Dynamic page title
    useEffect(() => {
        if (compared.length >= 2) {
            const names = compared.map((p) => p.name);
            document.title = `Compare ${names.join(" vs ")} \u2014 Side-by-Side Research Data | PeptiDex`;
            // Update meta description
            const meta = document.querySelector('meta[name="description"]');
            if (meta) {
                meta.setAttribute(
                    "content",
                    `Compare ${names.join(" vs ")} side-by-side: dosing, half-life, research evidence, side effects, and synergistic stacks. Data-driven peptide research comparison tool.`
                );
            }
            // Update OG tags
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute("content", `Compare ${names.join(" vs ")} | PeptiDex`);
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute("content", `Side-by-side comparison of ${names.join(", ")} including dosing protocols, evidence levels, and safety profiles.`);
        } else {
            document.title =
                "Peptide Comparison Tool \u2014 Side-by-Side Research Data | PeptiDex";
        }
    }, [compared]);

    const handleShare = async () => {
        const validSlugs = selected.filter(Boolean);
        if (validSlugs.length < 2) return;
        const url = `https://peptidex.app/tools/compare?p=${validSlugs.join(",")}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // Fallback
            const input = document.createElement("input");
            input.value = url;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    // Structured data
    const structuredData = compared.length >= 2
        ? {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: `Compare ${compared.map((p) => p.name).join(" vs ")} \u2014 PeptiDex`,
              url: `https://peptidex.app/tools/compare?p=${compared.map((p) => p.slug).join(",")}`,
              applicationCategory: "HealthApplication",
              description: `Side-by-side comparison of ${compared.map((p) => p.name).join(", ")} peptides including dosing, evidence, and safety data.`,
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              publisher: {
                  "@type": "Organization",
                  name: "PeptiDex",
                  url: "https://peptidex.app",
              },
          }
        : null;

    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://peptidex.app/" },
            { "@type": "ListItem", position: 2, name: "Tools", item: "https://peptidex.app/tools" },
            {
                "@type": "ListItem",
                position: 3,
                name: compared.length >= 2 ? `Compare ${compared.map((p) => p.name).join(" vs ")}` : "Compare",
                item: "https://peptidex.app/tools/compare",
            },
        ],
    };

    return (
        <div className="max-w-5xl mx-auto px-3 py-4 md:px-4 md:py-6">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            )}

            {/* Disclaimer */}
            <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-2.5 mb-4">
                <div className="flex items-start gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] md:text-[11px] text-amber-400/80 leading-relaxed">
                        {SHORT_DISCLAIMER}
                    </p>
                </div>
            </div>

            {/* Breadcrumbs */}
            <nav
                className="flex items-center gap-1.5 text-[11px] text-zinc-500 mb-4"
                aria-label="Breadcrumb"
            >
                <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/tools" className="hover:text-zinc-300 transition-colors">Tools</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-zinc-300 font-medium">Compare</span>
            </nav>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                        <div className="flex items-center gap-2.5 mb-1">
                            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                <GitCompare className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-extrabold text-zinc-100 tracking-tight">
                                    Peptide Comparison Tool
                                </h1>
                                <p className="text-xs text-zinc-500">
                                    Select 2\u20133 peptides \u00b7 Compare research data
                                    side-by-side
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Share button */}
                    {compared.length >= 2 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handleShare}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                copied
                                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                                    : "bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-violet-500/40 hover:text-violet-300"
                            }`}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" /> Link Copied!
                                </>
                            ) : (
                                <>
                                    <Share2 className="w-4 h-4" /> Share Comparison
                                </>
                            )}
                        </motion.button>
                    )}
                </div>
            </motion.div>

            {/* ═══ SELECTORS ═══ */}
            <div className="flex flex-wrap items-start gap-3 mb-6">
                {selected.map((slug, i) => (
                    <PeptideDropdown
                        key={i}
                        value={slug}
                        onChange={(s) => setSlot(i, s)}
                        onRemove={() => removeSlot(i)}
                        exclude={selected}
                        index={i}
                    />
                ))}
                {selected.length < 3 && (
                    <button
                        onClick={addSlot}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-zinc-700 text-sm text-zinc-500 hover:border-violet-500/40 hover:text-violet-400 transition-colors"
                    >
                        <Beaker className="w-4 h-4" />
                        Add Peptide
                    </button>
                )}
            </div>

            {/* ═══ QUICK PRESETS ═══ */}
            {compared.length < 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8"
                >
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                        Popular Comparisons
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            ["bpc-157", "tb-500"],
                            ["semaglutide", "tirzepatide"],
                            ["cjc-1295", "ipamorelin"],
                            ["mk-677", "ipamorelin"],
                            ["ghk-cu", "bpc-157"],
                            ["bpc-157", "tb-500", "ghk-cu"],
                        ].map((combo) => {
                            const names = combo
                                .map(
                                    (s) => peptides.find((p) => p.slug === s)?.name
                                )
                                .filter(Boolean);
                            return (
                                <button
                                    key={combo.join(",")}
                                    onClick={() => {
                                        setSelected(combo);
                                        syncUrl(combo);
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 hover:border-violet-500/30 hover:text-violet-300 transition-colors"
                                >
                                    <Zap className="w-3 h-3 text-violet-500" />
                                    {names.join(" vs ")}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            {/* ═══ EMPTY STATE ═══ */}
            {compared.length < 2 && (
                <div className="text-center py-16 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
                    <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                        <GitCompare className="w-8 h-8 text-violet-400/50" />
                    </div>
                    <h2 className="text-lg font-bold text-zinc-300 mb-1">
                        Select at least 2 peptides
                    </h2>
                    <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                        Use the dropdowns above or click a popular comparison to
                        start building your side-by-side analysis.
                    </p>
                </div>
            )}

            {/* ═══ COMPARISON TABLE ═══ */}
            {compared.length >= 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* ── AI SUMMARY ── */}
                    <div className="rounded-2xl bg-gradient-to-br from-violet-950/40 to-indigo-950/30 border border-violet-500/20 p-5 md:p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4.5 h-4.5 text-violet-400" />
                            <h2 className="text-sm font-bold text-violet-300 uppercase tracking-wider">
                                Comparison Summary
                            </h2>
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                            {summary}
                        </p>
                    </div>

                    {/* ── HEADER ROW ── */}
                    <div
                        className="grid gap-3"
                        style={{
                            gridTemplateColumns: `140px repeat(${compared.length}, 1fr)`,
                        }}
                    >
                        <div />
                        {compared.map((p) => (
                            <Link href={`/library/${p.slug}`} key={p.slug}>
                                <div className="text-center rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 hover:border-violet-500/30 transition-colors group">
                                    <span className="text-2xl block mb-1">
                                        {getCategoryIcon(p.category)}
                                    </span>
                                    <h3 className="text-base font-bold text-zinc-100 group-hover:text-violet-400 transition-colors">
                                        {p.name}
                                    </h3>
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                                        {p.category}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* ── DATA ROWS ── */}
                    <div className="space-y-2">
                        {/* Benefits */}
                        <ComparisonRow
                            label="Primary Benefits"
                            icon={<Activity className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                            count={compared.length}
                        >
                            {compared.map((p) => (
                                <div key={p.slug} className="text-xs text-zinc-300 leading-relaxed">
                                    {p.primary_benefits}
                                </div>
                            ))}
                        </ComparisonRow>

                        {/* Evidence Level */}
                        <ComparisonRow
                            label="Evidence Level"
                            icon={<FlaskConical className="w-4 h-4 text-violet-400 flex-shrink-0" />}
                            count={compared.length}
                            highlight
                        >
                            {compared.map((p) => (
                                <div key={p.slug} className="text-xs">
                                    <EvidenceBadge
                                        level={
                                            p.key_studies[0]?.evidence_level ||
                                            "preclinical"
                                        }
                                    />
                                    <p className="text-zinc-500 mt-1">
                                        {p.key_studies.length} published{" "}
                                        {p.key_studies.length === 1 ? "study" : "studies"} cited
                                    </p>
                                </div>
                            ))}
                        </ComparisonRow>

                        {/* Half Life */}
                        <ComparisonRow
                            label="Half-Life"
                            icon={<Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                            count={compared.length}
                        >
                            {compared.map((p) => (
                                <div key={p.slug}>
                                    <span className="text-lg font-black text-zinc-100">
                                        {formatHalfLife(p.half_life_hours)}
                                    </span>
                                    <p className="text-[10px] text-zinc-500">
                                        {p.half_life_hours
                                            ? p.half_life_hours >= 24
                                                ? `${p.half_life_hours} hours`
                                                : `${p.half_life_hours} hours`
                                            : "Not characterized"}
                                    </p>
                                </div>
                            ))}
                        </ComparisonRow>

                        {/* Dosing Route */}
                        <ComparisonRow
                            label="Route"
                            icon={<Syringe className="w-4 h-4 text-teal-400 flex-shrink-0" />}
                            count={compared.length}
                        >
                            {compared.map((p) => (
                                <div key={p.slug} className="text-xs text-zinc-300">
                                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold">
                                        {p.dosing?.route || "N/A"}
                                    </span>
                                </div>
                            ))}
                        </ComparisonRow>

                        {/* Dose Range */}
                        <ComparisonRow
                            label="Dose Range"
                            icon={<Syringe className="w-4 h-4 text-teal-400 flex-shrink-0" />}
                            count={compared.length}
                        >
                            {compared.map((p) => (
                                <div key={p.slug} className="text-xs text-zinc-300">
                                    {p.dosing
                                        ? `${p.dosing.typical_dose_mcg[0]}\u2013${p.dosing.typical_dose_mcg[1]} mcg`
                                        : "N/A"}
                                </div>
                            ))}
                        </ComparisonRow>

                        {/* Frequency */}
                        <ComparisonRow
                            label="Frequency"
                            icon={<Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                            count={compared.length}
                        >
                            {compared.map((p) => (
                                <div key={p.slug} className="text-xs text-zinc-300 font-medium">
                                    {p.dosing?.frequency || "N/A"}
                                </div>
                            ))}
                        </ComparisonRow>

                        {/* Cycle Length */}
                        <ComparisonRow
                            label="Cycle Length"
                            icon={<Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                            count={compared.length}
                        >
                            {compared.map((p) => (
                                <div key={p.slug} className="text-xs text-zinc-300">
                                    {p.dosing?.cycle_weeks
                                        ? `${p.dosing.cycle_weeks[0]}\u2013${p.dosing.cycle_weeks[1]} weeks`
                                        : "N/A"}
                                </div>
                            ))}
                        </ComparisonRow>

                        {/* FDA Status */}
                        <ComparisonRow
                            label="Legal Status"
                            icon={<ShieldAlert className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                            count={compared.length}
                            highlight
                        >
                            {compared.map((p) => (
                                <div key={p.slug} className="text-xs">
                                    {p.is_fda_approved ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                                            <Check className="w-3 h-3" /> FDA Approved
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-semibold">
                                            <X className="w-3 h-3" /> Research Only
                                        </span>
                                    )}
                                </div>
                            ))}
                        </ComparisonRow>

                        {/* Side Effects */}
                        <ComparisonRow
                            label="Side Effects"
                            icon={<AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                            count={compared.length}
                        >
                            {compared.map((p) => (
                                <div key={p.slug} className="space-y-1">
                                    {p.side_effects && p.side_effects.length > 0 ? (
                                        p.side_effects.map((se) => (
                                            <div
                                                key={se.name}
                                                className="flex items-start gap-1.5 text-[11px]"
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${
                                                        se.severity === "mild"
                                                            ? "bg-amber-500"
                                                            : se.severity === "moderate"
                                                            ? "bg-orange-500"
                                                            : "bg-zinc-600"
                                                    }`}
                                                />
                                                <span className="text-zinc-400">
                                                    <span className="text-zinc-300 font-medium">
                                                        {se.name}
                                                    </span>{" "}
                                                    \u2014{" "}
                                                    <span className="text-zinc-500">
                                                        {se.incidence}
                                                    </span>
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-[11px] text-zinc-500 italic">
                                            No significant side effects reported
                                        </span>
                                    )}
                                </div>
                            ))}
                        </ComparisonRow>

                        {/* Synergies */}
                        <ComparisonRow
                            label="Synergies"
                            icon={<Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
                            count={compared.length}
                        >
                            {compared.map((p) => (
                                <div key={p.slug} className="flex flex-wrap gap-1">
                                    {p.interactions?.synergies?.length ? (
                                        p.interactions.synergies.map((s) => {
                                            const inComparison = compared.some(
                                                (c) => c.name === s
                                            );
                                            return (
                                                <span
                                                    key={s}
                                                    className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                                                        inComparison
                                                            ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                                                            : "bg-zinc-800 border border-zinc-700 text-zinc-400"
                                                    }`}
                                                >
                                                    {s}
                                                    {inComparison && " \u2713"}
                                                </span>
                                            );
                                        })
                                    ) : (
                                        <span className="text-[11px] text-zinc-500 italic">
                                            None documented
                                        </span>
                                    )}
                                </div>
                            ))}
                        </ComparisonRow>

                        {/* Stacks */}
                        <ComparisonRow
                            label="Appears In"
                            icon={<Layers className="w-4 h-4 text-blue-400 flex-shrink-0" />}
                            count={compared.length}
                        >
                            {compared.map((p) => {
                                const pepStacks = getStacksForPeptide(p.name);
                                return (
                                    <div key={p.slug} className="space-y-1">
                                        {pepStacks.length > 0 ? (
                                            pepStacks.map((s) => (
                                                <Link
                                                    key={s.slug}
                                                    href={`/stacks/${s.slug}`}
                                                    className="flex items-center gap-1.5 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                                                >
                                                    <ArrowRight className="w-3 h-3" />
                                                    {s.stack_name}
                                                </Link>
                                            ))
                                        ) : (
                                            <span className="text-[11px] text-zinc-500 italic">
                                                No stacks
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </ComparisonRow>

                        {/* Safety Notes */}
                        <ComparisonRow
                            label="Safety Notes"
                            icon={<ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />}
                            count={compared.length}
                        >
                            {compared.map((p) => (
                                <div
                                    key={p.slug}
                                    className="text-[11px] text-zinc-400 leading-relaxed"
                                >
                                    {p.safety_notes}
                                </div>
                            ))}
                        </ComparisonRow>
                    </div>

                    {/* ── SHARE CTA ── */}
                    <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-5 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Link2 className="w-4 h-4 text-violet-400" />
                            <h3 className="text-sm font-bold text-zinc-200">
                                Share This Comparison
                            </h3>
                        </div>
                        <p className="text-xs text-zinc-500 mb-4 max-w-md mx-auto">
                            Copy a direct link to this exact comparison.
                            Recipients will see the same side-by-side view.
                        </p>
                        <div className="flex items-center gap-2 max-w-md mx-auto">
                            <div className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-400 font-mono truncate text-left">
                                peptidex.app/tools/compare?p=
                                {selected.filter(Boolean).join(",")}
                            </div>
                            <button
                                onClick={handleShare}
                                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                                    copied
                                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                        : "bg-violet-600 hover:bg-violet-500 text-white"
                                }`}
                            >
                                {copied ? "Copied!" : "Copy Link"}
                            </button>
                        </div>
                    </div>

                    {/* ── EXPLORE LIBRARY CTA ── */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                        {compared.map((p) => (
                            <Link
                                key={p.slug}
                                href={`/library/${p.slug}`}
                                className="flex-1 w-full text-center px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-violet-500/30 text-sm text-zinc-300 hover:text-violet-300 font-semibold transition-all"
                            >
                                View {p.name} Full Profile →
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   EXPORT WITH SUSPENSE BOUNDARY
   ═══════════════════════════════════════════════════════════ */
export default function ComparePage() {
    return (
        <Suspense
            fallback={
                <div className="max-w-5xl mx-auto px-3 py-4 md:px-4 md:py-6 text-center">
                    <div className="animate-pulse text-zinc-500 py-16">
                        Loading comparison tool...
                    </div>
                </div>
            }
        >
            <ComparePageInner />
        </Suspense>
    );
}
