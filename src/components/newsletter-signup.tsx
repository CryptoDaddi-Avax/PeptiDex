"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle, Loader2, FlaskConical } from "lucide-react";

// â”€â”€â”€ Beehiiv Configuration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Uses the free Beehiiv embed endpoint   no API key required.
const BEEHIIV_PUBLICATION_ID = "pub_40e0b818-633b-4705-b254-36237b65b043";
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€


interface Props {
    variant?: "banner" | "inline";
    source?: string; // utm_source tracking
}

export function NewsletterSignup({ variant = "inline", source = "website" }: Props) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email || status === "loading") return;

        setStatus("loading");
        setErrorMsg("");

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("publication_id", BEEHIIV_PUBLICATION_ID);
            formData.append("utm_source", source);
            formData.append("utm_medium", "website");
            formData.append("utm_campaign", "newsletter_signup");
            formData.append("reactivate_existing", "true");

            const res = await fetch("https://embeds.beehiiv.com/subscribe", {
                method: "POST",
                body: formData,
                mode: "no-cors", // Beehiiv embed endpoint requires no-cors
            });

            // no-cors always returns "opaque" response   treat as success
            void res;
            setStatus("success");
        } catch {
            setStatus("error");
            setErrorMsg("Something went wrong. Please try again.");
        }
    }

    if (variant === "banner") {
        return (
            <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-zinc-900/60 to-purple-950/30 p-4 md:p-5">
                <AnimatePresence mode="wait">
                    {status === "success" ? (
                        <motion.div key="success"
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-2 py-2 text-center">
                            <CheckCircle className="w-8 h-8 text-emerald-400" />
                            <p className="text-base font-bold text-zinc-100">You&apos;re in!</p>
                            <p className="text-xs text-zinc-400">Weekly research updates coming your way.</p>
                        </motion.div>
                    ) : (
                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                                    <FlaskConical className="w-4 h-4 text-violet-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-zinc-100">Weekly Peptide Research</p>
                                    <p className="text-[10px] text-zinc-500">New studies · vendor alerts · protocol tips</p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/60"
                                />
                                <button type="submit" disabled={!email || status === "loading"}
                                    className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold disabled:opacity-50 hover:opacity-90 transition-opacity">
                                    {status === "loading"
                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                        : <><span>Subscribe</span><ArrowRight className="w-3.5 h-3.5" /></>
                                    }
                                </button>
                            </form>
                            {status === "error" && <p className="text-[10px] text-red-400 mt-1.5">{errorMsg}</p>}
                            <p className="text-[9px] text-zinc-600 mt-2">No spam. Unsubscribe anytime. Research use only.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // â”€â”€ Inline (home page) variant â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 md:mt-8 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 via-zinc-900/50 to-purple-950/30 p-4 md:p-6 relative overflow-hidden"
        >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-violet-600/10 blur-[60px] pointer-events-none" />

            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div key="success"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-3 py-4 text-center">
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}>
                            <CheckCircle className="w-10 h-10 text-emerald-400" />
                        </motion.div>
                        <div>
                            <p className="text-base font-bold text-zinc-100">You&apos;re subscribed! ðŸŽ‰</p>
                            <p className="text-xs text-zinc-400 mt-1">Weekly peptide research updates are on the way.</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="flex items-center gap-2 mb-1">
                            <Mail className="w-4 h-4 text-violet-400" />
                            <span className="text-[10px] font-semibold text-violet-400 uppercase tracking-wider">Free Newsletter</span>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-zinc-100 mb-1">
                            Stay ahead of the research
                        </h3>
                        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                            Weekly digest of new clinical studies, vendor COA alerts, protocol tips, and peptide news   straight to your inbox.
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="flex-1 px-3.5 py-3 rounded-xl bg-zinc-900/80 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!email || status === "loading"}
                                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:opacity-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>Get the digest <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </form>
                        {status === "error" && (
                            <p className="text-[11px] text-red-400 mt-2">{errorMsg}</p>
                        )}
                        <p className="text-[9px] text-zinc-600 mt-2.5">
                            No spam ever. Unsubscribe anytime. For research & educational purposes only.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
