"use client";
import { useState } from "react";
import { SITE_STATS } from "@/data/site-stats";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, CheckCircle, Loader2, FileText } from "lucide-react";

const BEEHIIV_PUBLICATION_ID = "pub_40e0b818-633b-4705-b254-36237b65b043";

interface Props {
    source?: string;
}

export function LeadMagnetInline({ source = "inline" }: Props) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email || status === "loading") return;
        setStatus("loading");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source,
                    utmSource: source,
                    utmMedium: "inline_card",
                    utmCampaign: "cheat_sheet_lead_magnet",
                }),
            });
            if (!res.ok) throw new Error("subscribe failed");

            setStatus("success");
            setTimeout(() => {
                window.location.href = "/lead/thank-you";
            }, 1500);
        } catch {
            setStatus("error");
        }
    }

    return (
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/30 via-zinc-900/60 to-purple-950/20 p-5 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-violet-500/10 blur-[40px] rounded-full pointer-events-none" />

            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-2 py-3 text-center">
                        <CheckCircle className="w-8 h-8 text-emerald-400" />
                        <p className="text-sm font-bold text-zinc-100">Check your inbox!</p>
                        <p className="text-[10px] text-zinc-500">Redirecting to your download&hellip;</p>
                    </motion.div>
                ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
                        <div className="flex items-center gap-2 mb-2.5">
                            <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-violet-400" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest block">Free Download</span>
                            </div>
                        </div>

                        <h4 className="text-sm font-bold text-zinc-100 mb-1 leading-snug">
                            2026 Peptide Stack Cheat Sheet
                        </h4>
                        <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
                            {SITE_STATS.stacks.count} stacks &bull; exact dosages &bull; cycle lengths &bull; printable reference
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <input
                                type="email"
                                required
                                placeholder="your@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/60"
                            />
                            <button
                                type="submit"
                                disabled={!email || status === "loading"}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold disabled:opacity-50 hover:opacity-90 transition-opacity"
                            >
                                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Download className="w-3.5 h-3.5" /> Get the Cheat Sheet</>}
                            </button>
                        </form>

                        {status === "error" && <p className="text-[10px] text-red-400 mt-1">Something went wrong. Try again.</p>}
                        <p className="text-[9px] text-zinc-600 mt-2">No spam. Unsubscribe anytime.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
