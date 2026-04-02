"use client";
import { motion } from "framer-motion";
import { GoalId } from "@/data/types";

interface GoalChipProps {
    id: GoalId;
    label: string;
    icon: string;
    selected: boolean;
    onToggle: (id: GoalId) => void;
}

export function GoalChip({ id, label, icon, selected, onToggle }: GoalChipProps) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => onToggle(id)}
            className={`
        relative flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 text-sm font-medium
        transition-all duration-200 cursor-pointer select-none
        ${selected
                    ? "border-violet-500 bg-violet-500/15 text-violet-200 shadow-lg shadow-violet-500/20"
                    : "border-zinc-700/60 bg-zinc-800/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800"
                }
      `}
        >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
            {selected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center"
                >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>
            )}
        </motion.button>
    );
}
