"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { stacks } from "@/data/stacks";
import {
    Target, Zap, Syringe, Clock, DollarSign,
    ChevronRight, ChevronLeft, RotateCcw,
    FlaskConical, ArrowRight, Sparkles, CheckCircle2
} from "lucide-react";
import { ShareModal } from "@/components/share-card/share-modal";
import type { QuizCardData } from "@/components/share-card/card-templates";
import { aminoClubProductMapping } from "@/data/affiliates";
import { ShoppingBag, ShieldCheck } from "lucide-react";
import { getPeptideByName } from "@/data/peptides";
import { AffiliateLink } from "@/components/affiliate-link";
import { buildAffiliateUrl } from "@/lib/promos/affiliateUrl";
import { PRIMARY_PROMO } from "@/lib/promos/config";

/* ──────── Quiz Data ──────── */

type QuizQuestion = {
    id: string;
    question: string;
    subtitle: string;
    icon: React.ReactNode;
    options: { label: string; emoji: string; tags: string[] }[];
};

const questions: QuizQuestion[] = [
    {
        id: "goal",
        question: "What's your primary goal?",
        subtitle: "Pick the one that matters most right now",
        icon: <Target className="w-5 h-5" />,
        options: [
            { label: "Fat Loss / Body Recomp", emoji: "🔥", tags: ["fat-loss", "body-recomp", "metabolic"] },
            { label: "Injury Recovery / Healing", emoji: "🩹", tags: ["healing", "recovery"] },
            { label: "Muscle Growth", emoji: "💪", tags: ["muscle", "growth-hormone"] },
            { label: "Mental Clarity / Focus", emoji: "🧠", tags: ["cognitive", "nootropic"] },
            { label: "Sleep & Recovery", emoji: "🌙", tags: ["sleep", "recovery"] },
            { label: "Anti-Aging / Longevity", emoji: "⏳", tags: ["longevity", "anti-aging"] },
            { label: "Immune Support", emoji: "🛡️", tags: ["immune"] },
            { label: "Skin & Aesthetics", emoji: "✨", tags: ["skin", "aesthetics"] },
            { label: "Gut Health", emoji: "🫁", tags: ["gut", "healing"] },
            { label: "Hormonal Optimization", emoji: "⚡", tags: ["hormonal", "growth-hormone"] },
        ],
    },
    {
        id: "experience",
        question: "What's your experience level?",
        subtitle: "This helps us calibrate complexity",
        icon: <Zap className="w-5 h-5" />,
        options: [
            { label: "Complete Beginner", emoji: "🌱", tags: ["beginner"] },
            { label: "Some Research Done", emoji: "📚", tags: ["intermediate"] },
            { label: "Experienced User", emoji: "🔬", tags: ["advanced"] },
        ],
    },
    {
        id: "comfort",
        question: "Injection comfort level?",
        subtitle: "Some peptides are available as nasal sprays or oral",
        icon: <Syringe className="w-5 h-5" />,
        options: [
            { label: "No injections please", emoji: "🚫", tags: ["oral-nasal"] },
            { label: "Fine with subcutaneous", emoji: "👌", tags: ["subq"] },
            { label: "I'll do whatever works best", emoji: "💉", tags: ["any-route"] },
        ],
    },
    {
        id: "timeline",
        question: "How soon do you need results?",
        subtitle: "Realistic timelines help set expectations",
        icon: <Clock className="w-5 h-5" />,
        options: [
            { label: "Next 2-4 weeks", emoji: "⚡", tags: ["fast"] },
            { label: "1-3 months", emoji: "📈", tags: ["medium"] },
            { label: "Long-term optimization", emoji: "♾️", tags: ["long-term"] },
        ],
    },
    {
        id: "budget",
        question: "Monthly budget range?",
        subtitle: "Helps us recommend the right stack size",
        icon: <DollarSign className="w-5 h-5" />,
        options: [
            { label: "Under $100/month", emoji: "💵", tags: ["budget"] },
            { label: "$100 - $250/month", emoji: "💰", tags: ["mid-range"] },
            { label: "$250+/month", emoji: "🏆", tags: ["premium"] },
        ],
    },
];

/* ──────── Scoring Engine ──────── */

type StackScore = { stack: typeof stacks[0]; score: number; reasons: string[] };

function scoreStacks(answers: Record<string, string[]>): StackScore[] {
    const goalTags = answers.goal || [];

    const scored: StackScore[] = stacks.map((stack) => {
        let score = 0;
        const reasons: string[] = [];
        const sn = stack.stack_name.toLowerCase();

        // Goal matching (primary driver)
        if (goalTags.includes("fat-loss") && (sn.includes("fat") || sn.includes("recomp") || sn.includes("metabolic"))) { score += 10; reasons.push("Matches your fat loss goal"); }
        if (goalTags.includes("body-recomp") && sn.includes("recomp")) { score += 8; reasons.push("Ideal for body recomposition"); }
        if (goalTags.includes("healing") && (sn.includes("injury") || sn.includes("recovery") || sn.includes("gut"))) { score += 10; reasons.push("Optimized for healing & recovery"); }
        if (goalTags.includes("muscle") && sn.includes("muscle")) { score += 10; reasons.push("Designed for muscle growth"); }
        if (goalTags.includes("cognitive") && (sn.includes("mental") || sn.includes("cognit"))) { score += 10; reasons.push("Targets cognitive enhancement"); }
        if (goalTags.includes("sleep") && sn.includes("sleep")) { score += 10; reasons.push("Optimized for deep sleep & recovery"); }
        if (goalTags.includes("longevity") && (sn.includes("longevity") || sn.includes("anti-aging"))) { score += 10; reasons.push("Targets aging mechanisms"); }
        if (goalTags.includes("immune") && sn.includes("immune")) { score += 10; reasons.push("Strengthens immune function"); }
        if (goalTags.includes("skin") && (sn.includes("skin") || sn.includes("aesthet"))) { score += 10; reasons.push("Targets skin rejuvenation"); }
        if (goalTags.includes("gut") && sn.includes("gut")) { score += 10; reasons.push("Designed for gut healing"); }
        if (goalTags.includes("hormonal") && sn.includes("hormonal")) { score += 10; reasons.push("Supports hormonal balance"); }
        if (goalTags.includes("metabolic") && sn.includes("metabolic")) { score += 8; reasons.push("Improves metabolic health"); }
        if (goalTags.includes("growth-hormone") && (sn.includes("muscle") || sn.includes("hormonal"))) { score += 5; reasons.push("Includes GH optimization"); }
        if (goalTags.includes("recovery") && (sn.includes("recovery") || sn.includes("sleep"))) { score += 5; reasons.push("Enhances recovery"); }

        // Budget matching
        const budgetTags = answers.budget || [];
        if (budgetTags.includes("budget") && stack.peptides.length <= 3) { score += 3; reasons.push("Fits your budget (fewer compounds)"); }
        if (budgetTags.includes("premium") && stack.peptides.length >= 4) { score += 3; reasons.push("Comprehensive premium stack"); }
        if (budgetTags.includes("mid-range")) { score += 1; }

        // Experience level
        const expTags = answers.experience || [];
        if (expTags.includes("beginner") && stack.peptides.length <= 3) { score += 2; reasons.push("Beginner-friendly complexity"); }
        if (expTags.includes("advanced") && stack.peptides.length >= 4) { score += 2; reasons.push("Advanced multi-compound stack"); }

        return { stack, score, reasons };
    });

    return scored.sort((a, b) => b.score - a.score).filter((s) => s.score > 0);
}

/* ──────── Components ──────── */

function ProgressBar({ step, total }: { step: number; total: number }) {
    return (
        <div className="flex gap-1.5 mb-6">
            {Array.from({ length: total }).map((_, i) => (
                <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-zinc-800">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: i <= step ? "100%" : "0%" }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                    />
                </div>
            ))}
        </div>
    );
}

export default function QuizPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string[]>>({});
    const [showResults, setShowResults] = useState(false);

    const current = questions[step];

    const handleSelect = (tags: string[]) => {
        const updated = { ...answers, [current.id]: tags };
        setAnswers(updated);

        if (step < questions.length - 1) {
            setTimeout(() => setStep(step + 1), 200);
        } else {
            setTimeout(() => setShowResults(true), 200);
        }
    };

    const goBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const reset = () => {
        setStep(0);
        setAnswers({});
        setShowResults(false);
    };

    const results = showResults ? scoreStacks(answers) : [];

    // Build share card data from the top result
    const shareCardData: QuizCardData | null = useMemo(() => {
        if (!results.length) return null;
        const top = results[0];
        const goalAnswer = answers.goal?.[0] || "";
        const emojiMap: Record<string, string> = {
            "fat-loss": "🔥", "body-recomp": "🔥", "healing": "🩹", "recovery": "🩹",
            "muscle": "💪", "cognitive": "🧠", "nootropic": "🧠", "sleep": "🌙",
            "longevity": "⌛", "anti-aging": "⌛", "immune": "🛡️", "skin": "✨",
            "gut": "🫁", "hormonal": "⚡",
        };
        return {
            type: "quiz" as const,
            stackName: top.stack.stack_name,
            peptides: top.stack.peptides.map(p => p.name),
            matchPercent: Math.round((top.score / 13) * 100),
            goalEmoji: emojiMap[goalAnswer] || "🧬",
            goalLabel: top.stack.goal.length > 60 ? top.stack.goal.substring(0, 58) + "..." : top.stack.goal,
        };
    }, [results, answers]);

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
            <AnimatePresence mode="wait">
                {!showResults ? (
                    <motion.div
                        key={`step-${step}`}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* Progress */}
                        <ProgressBar step={step} total={questions.length} />

                        <p className="text-xs text-zinc-500 mb-1">
                            Question {step + 1} of {questions.length}
                        </p>

                        {/* Question */}
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-violet-400">{current.icon}</span>
                            <h1 className="text-xl font-bold text-zinc-100">{current.question}</h1>
                        </div>
                        <p className="text-sm text-zinc-400 mb-6">{current.subtitle}</p>

                        {/* Options */}
                        <div className="space-y-2.5">
                            {current.options.map((opt) => {
                                const isSelected = answers[current.id]?.join() === opt.tags.join();
                                return (
                                    <motion.button
                                        key={opt.label}
                                        onClick={() => handleSelect(opt.tags)}
                                        className={`w-full text-left px-4 py-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-3 ${
                                            isSelected
                                                ? "bg-violet-500/15 border-violet-500/40 ring-1 ring-violet-500/20"
                                                : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/60 hover:border-zinc-700"
                                        }`}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="text-xl">{opt.emoji}</span>
                                        <span className="text-sm font-medium text-zinc-200">{opt.label}</span>
                                        <ChevronRight className="w-4 h-4 text-zinc-600 ml-auto" />
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Back button */}
                        {step > 0 && (
                            <button
                                onClick={goBack}
                                className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                <ChevronLeft className="w-3.5 h-3.5" /> Back
                            </button>
                        )}
                    </motion.div>
                ) : (
                    /* Results */
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
                                <Sparkles className="w-3.5 h-3.5" /> Your Personalized Results
                            </div>
                            <h1 className="text-2xl font-bold text-zinc-100 mb-2">
                                {results.length > 0 ? "We Found Your Ideal Stack" : "No Perfect Match"}
                            </h1>
                            <p className="text-sm text-zinc-400">
                                {results.length > 0
                                    ? `Based on your answers, here ${results.length === 1 ? "is" : "are"} your top ${Math.min(results.length, 3)} recommendation${results.length > 1 ? "s" : ""}`
                                    : "Try adjusting your goals for more specific results"
                                }
                            </p>
                        </div>

                        <div className="space-y-4">
                            {results.slice(0, 3).map((r, i) => (
                                <motion.div
                                    key={r.stack.stack_name}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="relative p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors"
                                >
                                    {i === 0 && (
                                        <div className="absolute -top-2.5 left-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-[10px] font-bold text-white uppercase tracking-wider">
                                            Best Match
                                        </div>
                                    )}

                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-base font-bold text-zinc-100">{r.stack.stack_name}</h3>
                                            <p className="text-xs text-zinc-400 mt-0.5 line-clamp-2">{r.stack.goal}</p>
                                        </div>
                                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold flex-shrink-0">
                                            {Math.round((r.score / 13) * 100)}% match
                                        </div>
                                    </div>

                                    {/* Match Reasons */}
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {r.reasons.slice(0, 3).map((reason) => (
                                            <span key={reason} className="inline-flex items-center gap-1 text-[10px] text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-800/80">
                                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" /> {reason}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Peptides in stack */}
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {r.stack.peptides.map((p) => (
                                            <span key={p.name} className="text-[11px] px-2 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 font-medium">
                                                {p.name}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href="/stacks"
                                        className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors"
                                    >
                                        View Full Stack Details <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Source Your Stack */}
                        {results.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-emerald-500/20 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none" />
                                
                                <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
                                    <ShoppingBag className="w-8 h-8 text-emerald-400" />
                                </div>
                                
                                <h2 className="text-2xl font-bold text-zinc-100 mb-2 relative z-10 text-center">
                                    Get started with your {results[0].stack.stack_name.replace('Stack', '').trim()} stack
                                </h2>
                                <p className="text-[15px] text-zinc-400 max-w-lg mx-auto mb-8 relative z-10 text-center leading-relaxed">
                                    Sourcing is everything. Here are the exact products we recommend to confidently run your personalized protocol.
                                </p>
                                
                                <div className="space-y-3 mb-8 relative z-10">
                                    {results[0].stack.peptides.map(p => {
                                        const fullPeptide = getPeptideByName(p.name);
                                        const slug = fullPeptide?.slug || p.name.toLowerCase().replace(/\s+/g, '-');
                                        const benefits = fullPeptide?.primary_benefits || p.role_in_stack;
                                        
                                        const baseUrl = aminoClubProductMapping[slug] || PRIMARY_PROMO.shopUrl;
                                        const affiliateUrl = buildAffiliateUrl({ ...PRIMARY_PROMO, shopUrl: baseUrl }, "quiz_sourcing");

                                        return (
                                            <div key={slug} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 gap-4 hover:border-emerald-500/30 transition-colors">
                                                <div>
                                                    <h4 className="font-bold text-zinc-200">{p.name}</h4>
                                                    <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{benefits}</p>
                                                </div>
                                                <AffiliateLink
                                                    href={affiliateUrl}
                                                    vendor="amino_club"
                                                    peptide={slug}
                                                    source="quiz_sourcing"
                                                    className="inline-flex items-center justify-center whitespace-nowrap gap-2 px-5 py-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold transition-colors text-sm border border-emerald-500/20 shrink-0"
                                                >
                                                    Buy from Amino Club <ArrowRight className="w-4 h-4" />
                                                </AffiliateLink>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                <div className="relative z-10 space-y-4 pt-4 border-t border-zinc-800/50">
                                    <AffiliateLink
                                        href={buildAffiliateUrl(PRIMARY_PROMO, "quiz_full_stack_cta")}
                                        vendor="amino_club"
                                        source="quiz_full_stack_cta"
                                        className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold transition-all shadow-lg hover:shadow-emerald-500/20 hover:brightness-110 text-base"
                                    >
                                        Order Full Stack from Amino Club <ArrowRight className="w-5 h-5" />
                                    </AffiliateLink>
                                    <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 font-medium pb-2 text-center">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400/70" />
                                        Amino Club — PeptiDex Editor's Choice 2026 · COA verified · 99%+ purity
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Share Card */}
                        {shareCardData && (
                            <div className="mt-8 flex justify-center pb-4">
                                <ShareModal
                                    data={shareCardData}
                                    shareUrl="https://peptidex.app/quiz"
                                    shareText={`I just found my ideal peptide stack on PeptiDex: ${shareCardData.stackName} \uD83E\uDDEC`}
                                    buttonLabel="Share My Stack"
                                />
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/stacks"
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-semibold hover:brightness-110 transition-all"
                            >
                                <FlaskConical className="w-4 h-4" /> Explore All Stacks
                            </Link>
                            <button
                                onClick={reset}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-medium hover:bg-zinc-700 transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" /> Retake Quiz
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
