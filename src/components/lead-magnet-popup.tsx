"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, Gift, Zap, ShieldCheck, FlaskConical, ArrowRight, Sparkles } from "lucide-react";

const BEEHIIV_PUBLICATION_ID = "pub_40e0b818-633b-4705-b254-36237b65b043";
const STORAGE_KEY = "peptidex_newsletter_dismissed";
const DISCLAIMER_KEY = "PeptiDex-disclaimer-seen";

interface Props {
    source?: string;
}

export function LeadMagnetPopup({ source = "welcome_popup" }: Props) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [discountCode] = useState("PEPTIDEX");

    useEffect(() => {
        // Don't show if already dismissed or subscribed
        if (localStorage.getItem(STORAGE_KEY)) return;

        // Wait for the disclaimer modal to be accepted first
        function tryShow() {
            // Check if disclaimer has been seen (means user accepted it)
            const disclaimerSeen = localStorage.getItem(DISCLAIMER_KEY);
            if (disclaimerSeen) {
                // Short delay after disclaimer closes so it doesn't feel like a barrage
                setTimeout(() => {
                    if (!localStorage.getItem(STORAGE_KEY)) {
                        setShow(true);
                    }
                }, 2000);
            } else {
                // Disclaimer not yet seen — poll for it
                const interval = setInterval(() => {
                    if (localStorage.getItem(DISCLAIMER_KEY)) {
                        clearInterval(interval);
                        setTimeout(() => {
                            if (!localStorage.getItem(STORAGE_KEY)) {
                                setShow(true);
                            }
                        }, 2000);
                    }
                }, 500);
                // Cleanup after 60 seconds max
                setTimeout(() => clearInterval(interval), 60000);
                return () => clearInterval(interval);
            }
        }

        tryShow();
    }, []);

    const dismiss = useCallback(() => {
        setShow(false);
        localStorage.setItem(STORAGE_KEY, "dismissed");
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email || status === "loading") return;
        setStatus("loading");

        try {
            // POST to our API — this queues the welcome sequence AND syncs to Beehiiv
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source,
                    utmSource: source,
                    utmMedium: "popup",
                    utmCampaign: "welcome_discount_popup",
                }),
            });

            if (!res.ok) throw new Error("subscribe failed");

            setStatus("success");
            localStorage.setItem(STORAGE_KEY, "subscribed");

            // Track conversion
            if (typeof window !== "undefined" && window.gtag) {
                (window.gtag as (...args: unknown[]) => void)("event", "newsletter_signup", {
                    event_category: "conversion",
                    event_label: "welcome_popup_discount",
                });
            }
        } catch {
            setStatus("error");
        }
    }

    function handleCopyCode() {
        navigator.clipboard.writeText(discountCode);
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[480px] z-[101] rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/20"
                    >
                        {/* Top accent bar */}
                        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />

                        <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/30 p-6 md:p-8 relative border border-emerald-500/20 border-t-0 rounded-b-3xl">
                            {/* Close button */}
                            <button
                                onClick={dismiss}
                                className="absolute top-4 right-4 p-1 text-zinc-500 hover:text-zinc-300 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Decorative glows */}
                            <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
                            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-teal-500/8 blur-[60px] rounded-full pointer-events-none" />

                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    /* ──── SUCCESS STATE ──── */
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-center gap-5 py-4 text-center relative z-10"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                                                <CheckCircle className="w-8 h-8 text-emerald-400" />
                                            </div>
                                        </motion.div>
                                        <div>
                                            <p className="text-xl font-bold text-zinc-100 mb-1">You&apos;re in! 🎉</p>
                                            <p className="text-sm text-zinc-400">Check your inbox — your welcome email is on the way.</p>
                                        </div>

                                        {/* Discount Code Reveal */}
                                        <div className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-5">
                                            <p className="text-xs text-emerald-400/80 uppercase tracking-widest font-semibold mb-3">Your Exclusive Discount</p>
                                            <div className="flex items-center justify-center gap-3">
                                                <span className="text-3xl font-black text-emerald-400 tracking-wider font-mono">{discountCode}</span>
                                                <button
                                                    onClick={handleCopyCode}
                                                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold hover:bg-emerald-500/30 transition-colors"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-zinc-500 mt-3">Use at checkout on Amino Club for 20% off your first order.</p>
                                        </div>

                                        <a
                                            href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-emerald-900/30"
                                        >
                                            Shop Amino Club Now <ArrowRight className="w-4 h-4" />
                                        </a>
                                        <button onClick={dismiss} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                                            I&apos;ll use it later
                                        </button>
                                    </motion.div>
                                ) : (
                                    /* ──── FORM STATE ──── */
                                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">
                                        {/* Badge */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                                                <Gift className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Welcome Offer</span>
                                        </div>

                                        <h2 className="text-2xl md:text-[26px] font-extrabold text-zinc-100 mb-3 leading-tight tracking-tight">
                                            Join our Newsletter & receive <span className="text-emerald-400">20% off</span> your purchase from Amino Club!
                                        </h2>
                                        <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                                            Plus, get instant access to our <span className="text-zinc-200 font-semibold">2026 Peptide Stack Cheat Sheet</span> — featuring 12 research-backed stacks with exact dosages and cycle lengths.
                                        </p>

                                        {/* Benefits grid */}
                                        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 mb-6">
                                            <div className="flex items-center gap-2 text-xs text-zinc-300">
                                                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                                    <Zap className="w-3 h-3 text-emerald-400" />
                                                </div>
                                                <span>Weekly research drops</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-zinc-300">
                                                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                                    <FlaskConical className="w-3 h-3 text-emerald-400" />
                                                </div>
                                                <span>New study alerts</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-zinc-300">
                                                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                                </div>
                                                <span>Vendor COA updates</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-zinc-300">
                                                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                                    <Sparkles className="w-3 h-3 text-emerald-400" />
                                                </div>
                                                <span>Exclusive discounts</span>
                                            </div>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-3">
                                            <input
                                                type="email"
                                                required
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="w-full px-4 py-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!email || status === "loading"}
                                                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all"
                                            >
                                                {status === "loading" ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <>Unlock 20% Off + Subscribe</>
                                                )}
                                            </button>
                                        </form>

                                        {status === "error" && <p className="text-xs text-red-400 mt-2">Something went wrong. Please try again.</p>}

                                        <p className="text-[9px] text-zinc-600 mt-3 text-center">
                                            No spam. Unsubscribe anytime. For research &amp; educational purposes only.
                                        </p>

                                        <button onClick={dismiss} className="block mx-auto mt-3 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                                            No thanks, continue browsing
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
