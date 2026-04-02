"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DISCLAIMER_TEXT } from "@/data/constants";
import { ShieldAlert, X } from "lucide-react";

const STORAGE_KEY = "PeptiDex-disclaimer-seen";

export function FirstVisitModal() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem(STORAGE_KEY);
        if (!seen) setShow(true);
    }, []);

    function handleAccept() {
        localStorage.setItem(STORAGE_KEY, "true");
        setShow(false);
    }

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-lg rounded-3xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl"
                    >
                        <button onClick={handleAccept} className="absolute top-4 right-4 p-1 text-zinc-500 hover:text-zinc-300">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center">
                                <ShieldAlert className="w-6 h-6 text-amber-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-zinc-100">Important Disclaimer</h2>
                                <p className="text-sm text-zinc-400">Please read before continuing</p>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-zinc-800/50 border border-zinc-700/50 p-4 mb-5 max-h-60 overflow-y-auto">
                            <p className="text-sm text-zinc-300 leading-relaxed">{DISCLAIMER_TEXT}</p>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={handleAccept}
                                className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors"
                            >
                                I Understand   Continue
                            </button>
                            <p className="text-center text-[10px] text-zinc-500 uppercase tracking-wider">
                                For educational & research purposes only
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
