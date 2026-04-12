"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ArrowRight, Loader2, CheckCircle, FileText } from "lucide-react";

const BEEHIIV_PUBLICATION_ID = "pub_40e0b818-633b-4705-b254-36237b65b043";

interface Props {
    source?: string;
}

export function LeadMagnetPopup({ source = "popup" }: Props) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    // --- Exit Intent + Timer Logic ---
    useEffect(() => {
        // Only show once per session
        if (sessionStorage.getItem("peptidex_lead_shown")) return;

        let timer: ReturnType<typeof setTimeout>;

        // Timer trigger: 45 seconds
        timer = setTimeout(() => {
            if (!sessionStorage.getItem("peptidex_lead_shown")) {
                setShow(true);
                sessionStorage.setItem("peptidex_lead_shown", "1");
            }
        }, 45000);

        // Exit intent trigger: mouse moves above viewport
        function handleMouseLeave(e: MouseEvent) {
            if (e.clientY <= 0 && !sessionStorage.getItem("peptidex_lead_shown")) {
                setShow(true);
                sessionStorage.setItem("peptidex_lead_shown", "1");
            }
        }

        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const dismiss = useCallback(() => {
        setShow(false);
        sessionStorage.setItem("peptidex_lead_shown", "1");
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email || status === "loading") return;
        setStatus("loading");

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("publication_id", BEEHIIV_PUBLICATION_ID);
            formData.append("utm_source", source);
            formData.append("utm_medium", "popup");
            formData.append("utm_campaign", "cheat_sheet_lead_magnet");
            formData.append("reactivate_existing", "true");

            await fetch("https://embeds.beehiiv.com/subscribe", {
                method: "POST",
                body: formData,
                mode: "no-cors",
            });

            setStatus("success");

            // Redirect to thank-you after a brief delay
            setTimeout(() => {
                window.location.href = "/lead/thank-you";
            }, 1500);
        } catch {
            setStatus("error");
        }
    }

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={dismiss}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg z-[101] rounded-2xl border border-violet-500/30 bg-gradient-to-br from-zinc-900 via-zinc-900 to-violet-950/40 p-6 md:p-8 shadow-2xl shadow-violet-900/30"
                    >
                        {/* Close button */}
                        <button onClick={dismiss} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors">
                            <X className="w-5 h-5" />
                        </button>

                        {/* Decorative glow */}
                        <div className="absolute -top-12 -right-12 w-40 h-40 bg-violet-500/15 blur-[60px] rounded-full pointer-events-none" />

                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4 py-6 text-center relative z-10">
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <CheckCircle className="w-14 h-14 text-emerald-400" />
                                    </motion.div>
                                    <div>
                                        <p className="text-xl font-bold text-zinc-100">Your cheat sheet is ready!</p>
                                        <p className="text-sm text-zinc-400 mt-2">Redirecting you to your download&hellip;</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
                                    {/* Badge */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-violet-400" />
                                        </div>
                                        <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Free Download</span>
                                    </div>

                                    <h2 className="text-xl md:text-2xl font-extrabold text-zinc-100 mb-2 leading-tight">
                                        2026 Peptide Stack Cheat Sheet
                                    </h2>
                                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                                        12 research-backed stacks with dosages, timing, and trusted sources &mdash; in one printable reference.
                                    </p>

                                    {/* Benefits */}
                                    <ul className="grid grid-cols-2 gap-x-3 gap-y-2 mb-6 text-xs text-zinc-300 font-medium">
                                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> 12 curated stacks</li>
                                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Exact dosages</li>
                                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Cycle lengths</li>
                                        <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /> Verified sources</li>
                                    </ul>

                                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                                        <input
                                            type="email"
                                            required
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="flex-1 px-4 py-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500/60 transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!email || status === "loading"}
                                            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 disabled:opacity-50 transition-all"
                                        >
                                            {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Download className="w-4 h-4" /> Get the Cheat Sheet</>}
                                        </button>
                                    </form>

                                    {status === "error" && <p className="text-xs text-red-400 mt-2">Something went wrong. Try again.</p>}

                                    <button onClick={dismiss} className="block mx-auto mt-4 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                                        No thanks, I&apos;ll figure it out myself
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
