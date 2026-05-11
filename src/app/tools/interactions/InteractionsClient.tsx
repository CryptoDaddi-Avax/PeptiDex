"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { peptides } from "@/data/peptides";
import {
  checkStackInteractions,
  stackSummary,
  SEVERITY_CONFIG,
  type StackInteraction,
} from "@/data/stack-interactions";
import { SHORT_DISCLAIMER } from "@/data/constants";
import {
  ShieldAlert, X, Search, CheckCircle, AlertTriangle,
  XCircle, Ban, ExternalLink, BookOpen, FlaskConical,
  ArrowRight, Bookmark, ChevronDown, ChevronUp,
} from "lucide-react";
import { getCategoryIcon } from "@/data/category-icons";

const MAX_PEPTIDES = 6;

function SeverityIcon({ severity }: { severity: string }) {
  if (severity === "SAFE")         return <CheckCircle  className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
  if (severity === "CAUTION")      return <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />;
  if (severity === "WARNING")      return <XCircle       className="w-4 h-4 text-orange-400 flex-shrink-0" />;
  if (severity === "DO_NOT_STACK") return <Ban           className="w-4 h-4 text-red-400 flex-shrink-0" />;
  return null;
}

function InteractionCard({ interaction }: { interaction: StackInteraction }) {
  const [expanded, setExpanded] = useState(true);
  const cfg = SEVERITY_CONFIG[interaction.severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border ${cfg.bg} ${cfg.border} overflow-hidden`}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-start gap-3 p-4 text-left"
      >
        <SeverityIcon severity={interaction.severity} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${cfg.badge}`}>
              {cfg.label}
            </span>
            <span className="text-xs font-semibold text-zinc-300">
              {interaction.peptideA} + {interaction.peptideB}
            </span>
          </div>
          <p className="text-xs text-zinc-400">{interaction.headline}</p>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
        )}
      </button>

      {/* Expanded Detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
              {/* Detail text */}
              <p className="text-xs leading-relaxed text-zinc-300">{interaction.detail}</p>

              {/* Citations */}
              {interaction.citations.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Sources</p>
                  {interaction.citations.map((cite, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {cite.type === "editorial" ? (
                        <FlaskConical className="w-3 h-3 text-zinc-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <BookOpen className="w-3 h-3 text-zinc-500 flex-shrink-0 mt-0.5" />
                      )}
                      {cite.url ? (
                        <a
                          href={cite.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1"
                        >
                          {cite.label}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-zinc-500 italic">{cite.label}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Alternatives */}
              {interaction.alternatives && interaction.alternatives.length > 0 && (
                <div className="rounded-lg bg-zinc-800/40 border border-zinc-700/40 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">
                    Consider Instead
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {interaction.alternatives.map((alt) => (
                      <span key={alt} className="px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-xs text-violet-300">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function InteractionsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const interactions = useMemo(() => checkStackInteractions(selected), [selected]);
  const summary = useMemo(() => stackSummary(interactions), [interactions]);

  // Pairs with no entry in the matrix at all
  const checkedPairCount = useMemo(() => {
    let n = 0;
    for (let i = 0; i < selected.length; i++)
      for (let j = i + 1; j < selected.length; j++) n++;
    return n;
  }, [selected]);
  const unknownPairs = checkedPairCount - interactions.length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q
      ? peptides.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      : peptides;
  }, [search]);

  const toggle = (name: string) => {
    setSelected((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name);
      if (prev.length >= MAX_PEPTIDES) return prev;
      return [...prev, name];
    });
  };

  const saveToPlanner = () => {
    const params = new URLSearchParams({ stack: selected.join(",") });
    window.location.href = `/tools/cycle-planner?${params}`;
  };

  // Group by severity for rendering
  const doNotStack = interactions.filter((i) => i.severity === "DO_NOT_STACK");
  const warnings   = interactions.filter((i) => i.severity === "WARNING");
  const cautions   = interactions.filter((i) => i.severity === "CAUTION");
  const safe       = interactions.filter((i) => i.severity === "SAFE");

  const hasConflicts = doNotStack.length + warnings.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 pt-2">
        <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Home</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <Link href="/tools" className="text-zinc-500 hover:text-amber-400 transition-colors text-xs">Tools</Link>
        <span className="text-zinc-700 text-xs">/</span>
        <span className="text-zinc-200 font-medium text-xs">Stack Conflict Checker</span>
      </nav>

      {/* Disclaimer */}
      <div className="rounded-xl bg-amber-950/25 border border-amber-500/20 p-2.5 mb-5">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] md:text-[11px] text-amber-400/80 leading-relaxed">{SHORT_DISCLAIMER}</p>
        </div>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Stack Conflict Checker</h1>
        </div>
        <p className="text-xs md:text-sm text-zinc-400">
          Add up to {MAX_PEPTIDES} peptides — get severity-graded conflict analysis with sourced citations.
        </p>
      </motion.div>

      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
        <AnimatePresence>
          {selected.map((name) => {
            const p = peptides.find((x) => x.name === name);
            return (
              <motion.button
                key={name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => toggle(name)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-500/15 border border-violet-500/30 text-sm text-violet-300 font-medium hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-300 transition-colors"
              >
                <span>{getCategoryIcon(p?.category || "")}</span>
                {name}
                <X className="w-3 h-3" />
              </motion.button>
            );
          })}
        </AnimatePresence>
        {selected.length === 0 && (
          <p className="text-sm text-zinc-600 py-1.5">No peptides selected — tap below to build your stack</p>
        )}
        {selected.length >= MAX_PEPTIDES && (
          <span className="text-xs text-amber-400/70 py-1.5">Maximum {MAX_PEPTIDES} peptides reached</span>
        )}
      </div>

      {/* Save + Clear row */}
      {selected.length >= 2 && (
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={saveToPlanner}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            Save Stack to Cycle Planner
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setSelected([])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Clear all
          </button>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search peptides..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 transition-colors"
        />
      </div>

      {/* Peptide Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
        {filtered.map((p) => {
          const isSelected = selected.includes(p.name);
          const isDisabled = !isSelected && selected.length >= MAX_PEPTIDES;
          return (
            <button
              key={p.slug}
              onClick={() => toggle(p.name)}
              disabled={isDisabled}
              className={`text-left px-3 py-2.5 rounded-xl border text-xs font-medium transition-all
                ${isSelected
                  ? "border-violet-500/40 bg-violet-500/10 text-violet-300"
                  : isDisabled
                    ? "border-zinc-800/50 bg-zinc-900/20 text-zinc-600 cursor-not-allowed"
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
            >
              <span className="mr-1">{getCategoryIcon(p.category)}</span>
              {p.name}
            </button>
          );
        })}
      </div>

      {/* ── Results ─────────────────────────────────────────────────────── */}
      {selected.length >= 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

          {/* Summary bar */}
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Stack Analysis — {selected.length} peptides · {checkedPairCount} pair{checkedPairCount !== 1 ? "s" : ""} checked
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { key: "doNotStack", label: "DO NOT STACK", count: summary.doNotStack, cfg: SEVERITY_CONFIG.DO_NOT_STACK },
                { key: "warnings",   label: "WARNING",      count: summary.warnings,   cfg: SEVERITY_CONFIG.WARNING      },
                { key: "cautions",   label: "CAUTION",      count: summary.cautions,   cfg: SEVERITY_CONFIG.CAUTION      },
                { key: "safe",       label: "SAFE",         count: summary.safe,        cfg: SEVERITY_CONFIG.SAFE         },
              ].map(({ key, label, count, cfg }) => (
                <div key={key} className={`rounded-lg p-2 text-center ${cfg.bg} border ${cfg.border}`}>
                  <p className={`text-lg font-bold ${cfg.text}`}>{count}</p>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
            {unknownPairs > 0 && (
              <p className="text-[10px] text-zinc-600 mt-2 text-center">
                {unknownPairs} pair{unknownPairs !== 1 ? "s" : ""} not yet in our interaction database — no known interaction found.
              </p>
            )}
          </div>

          {/* Overall verdict */}
          {hasConflicts ? (
            <div className="rounded-xl bg-red-950/20 border border-red-500/25 p-3 flex items-center gap-3">
              <Ban className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-300 font-semibold">
                This stack has {doNotStack.length > 0 ? "contraindicated combinations" : "documented warnings"}. Review before proceeding.
              </p>
            </div>
          ) : interactions.length > 0 ? (
            <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/25 p-3 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <p className="text-sm text-emerald-300 font-semibold">
                No contraindications found. {cautions.length > 0 ? `${cautions.length} caution(s) to review below.` : "Stack looks clean."}
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-zinc-500">No interactions found for this combination in our database.</p>
              <p className="text-xs text-zinc-600 mt-1">This doesn&apos;t confirm safety — it means we have no data for this pair.</p>
            </div>
          )}

          {/* DO NOT STACK */}
          {doNotStack.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-red-400">
                ⛔ Do Not Stack ({doNotStack.length})
              </h2>
              {doNotStack.map((i, idx) => <InteractionCard key={idx} interaction={i} />)}
            </div>
          )}

          {/* WARNING */}
          {warnings.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-orange-400">
                ⚠️ Warnings ({warnings.length})
              </h2>
              {warnings.map((i, idx) => <InteractionCard key={idx} interaction={i} />)}
            </div>
          )}

          {/* CAUTION */}
          {cautions.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">
                🟡 Cautions ({cautions.length})
              </h2>
              {cautions.map((i, idx) => <InteractionCard key={idx} interaction={i} />)}
            </div>
          )}

          {/* SAFE */}
          {safe.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                ✅ Known Safe Combinations ({safe.length})
              </h2>
              {safe.map((i, idx) => <InteractionCard key={idx} interaction={i} />)}
            </div>
          )}

          {/* Save CTA at bottom */}
          <div className="pt-2 pb-6">
            <button
              onClick={saveToPlanner}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-violet-900/30"
            >
              <Bookmark className="w-4 h-4" />
              Save This Stack to Cycle Planner
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
