"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stack } from "@/data/types";
import { ChevronDown, Bookmark, BookmarkCheck, ExternalLink, Beaker } from "lucide-react";
import Link from "next/link";
import { peptides as allPeptides } from "@/data/peptides";

interface StackCardProps {
    stack: Stack;
    index?: number;
    isSaved?: boolean;
    onSave?: (stack: Stack) => void;
    onRemove?: (name: string) => void;
}

export function StackCard({ stack, index = 0, isSaved, onSave, onRemove }: StackCardProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-sm overflow-hidden"
        >
            <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-zinc-100 mb-1">{stack.stack_name}</h3>
                        <p className="text-sm text-zinc-400">{stack.goal}</p>
                    </div>
                    {onSave && onRemove && (
                        <button
                            onClick={() => isSaved ? onRemove(stack.stack_name) : onSave(stack)}
                            className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-zinc-800 transition-colors"
                        >
                            {isSaved
                                ? <BookmarkCheck className="w-5 h-5 text-violet-400" />
                                : <Bookmark className="w-5 h-5 text-zinc-500 hover:text-violet-400" />
                            }
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {stack.peptides.map((p) => {
                        const found = allPeptides.find((ap) => p.name.toLowerCase().includes(ap.name.toLowerCase()));
                        return (
                            <Link
                                key={p.name}
                                href={found ? `/library/${found.slug}` : "#"}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium hover:bg-violet-500/20 transition-colors"
                            >
                                <Beaker className="w-3.5 h-3.5" />
                                {p.name}
                            </Link>
                        );
                    })}
                </div>

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors w-full"
                >
                    <span>{expanded ? "Hide details" : "Why these work together"}</span>
                    <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </button>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 border-t border-zinc-800/50 pt-4 space-y-4">
                            <div>
                                <h4 className="text-sm font-semibold text-zinc-200 mb-2">🧬 Synergy Rationale</h4>
                                <p className="text-sm text-zinc-400 leading-relaxed">{stack.synergy_rationale}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-zinc-200 mb-2">ðŸ”¬ Peptide Roles</h4>
                                <div className="space-y-2">
                                    {stack.peptides.map((p) => (
                                        <div key={p.name} className="bg-zinc-800/40 rounded-xl p-3">
                                            <span className="text-sm font-semibold text-violet-300">{p.name}</span>
                                            <p className="text-xs text-zinc-400 mt-1">{p.role_in_stack}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-zinc-200 mb-2">ðŸ“š Supporting Studies</h4>
                                <div className="space-y-2">
                                    {stack.supporting_studies.map((s, i) => (
                                        <a
                                            key={i}
                                            href={s.pubmed_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-start gap-2 text-sm text-zinc-400 hover:text-violet-300 transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-violet-500" />
                                            <span className="leading-tight">{s.description}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
