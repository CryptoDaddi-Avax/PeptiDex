"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { StackCard } from "@/components/stack-card";
import { StackPriceAggregator } from "@/components/stack-price-aggregator";
import { stacks } from "@/data/stacks";
import { goals, getStackNamesForGoals } from "@/data/goals";
import { GoalId } from "@/data/types";
import { useSavedStacks } from "@/hooks/useSavedStacks";
import { SHORT_DISCLAIMER } from "@/data/constants";
import { ArrowLeft, Target, ShieldAlert } from "lucide-react";
import Link from "next/link";

function ResultsContent() {
    const searchParams = useSearchParams();
    const selectedGoalIds = searchParams.getAll("goals") as GoalId[];
    const { saveStack, removeStack, isStackSaved } = useSavedStacks();

    const stackNames = getStackNamesForGoals(selectedGoalIds);
    const matchedStacks = stacks.filter((s) => stackNames.includes(s.stack_name));
    const selectedGoals = goals.filter((g) => selectedGoalIds.includes(g.id));

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" /> Change goals
            </Link>

            {/* Disclaimer */}
            <div className="rounded-2xl bg-amber-950/25 border border-amber-500/20 p-3 mb-6">
                <div className="flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-400/80 leading-relaxed">{SHORT_DISCLAIMER}</p>
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-violet-400" />
                    <h2 className="text-2xl font-bold text-zinc-100">Your Recommended Stacks</h2>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedGoals.map((g) => (
                        <span key={g.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/10 text-xs text-violet-300">
                            {g.icon} {g.label}
                        </span>
                    ))}
                </div>
            </motion.div>

            {matchedStacks.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-zinc-400">No stacks found for the selected goals. Try different goals.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {matchedStacks.map((stack, i) => (
                        <div key={stack.stack_name}>
                            <StackCard
                                stack={stack}
                                index={i}
                                isSaved={isStackSaved(stack.stack_name)}
                                onSave={saveStack}
                                onRemove={removeStack}
                            />
                            <StackPriceAggregator
                                peptides={stack.peptides}
                                stackName={stack.stack_name}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-zinc-500">Loading...</div>}>
            <ResultsContent />
        </Suspense>
    );
}
