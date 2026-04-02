"use client";
import { motion } from "framer-motion";
import { StackCard } from "@/components/stack-card";
import { useSavedStacks } from "@/hooks/useSavedStacks";
import { Bookmark, BookmarkX } from "lucide-react";

export default function SavedPage() {
    const { savedStacks, saveStack, removeStack, isStackSaved, loaded } = useSavedStacks();

    if (!loaded) {
        return <div className="p-8 text-center text-zinc-500">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <Bookmark className="w-5 h-5 text-violet-400" />
                    <h2 className="text-2xl font-bold text-zinc-100">Saved Stacks</h2>
                </div>
                <p className="text-sm text-zinc-400">
                    {savedStacks.length} stack{savedStacks.length !== 1 ? "s" : ""} saved locally
                </p>
            </motion.div>

            {savedStacks.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                        <BookmarkX className="w-8 h-8 text-zinc-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-300 mb-2">No saved stacks yet</h3>
                    <p className="text-sm text-zinc-500 max-w-xs mx-auto">
                        Browse stack recommendations and tap the bookmark icon to save them here for quick access.
                    </p>
                </motion.div>
            ) : (
                <div className="space-y-4">
                    {savedStacks.map((stack, i) => (
                        <StackCard
                            key={stack.stack_name}
                            stack={stack}
                            index={i}
                            isSaved={isStackSaved(stack.stack_name)}
                            onSave={saveStack}
                            onRemove={removeStack}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
