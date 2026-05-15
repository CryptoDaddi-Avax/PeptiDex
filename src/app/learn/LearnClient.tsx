"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { learningModules, LearningModule } from "@/data/learning-modules";
import { BookOpen, Clock, CheckCircle, ChevronRight, ChevronLeft, Award, RotateCcw } from "lucide-react";
import { DisclaimerCard } from "@/components/ui/DisclaimerCard";

const PROGRESS_KEY = "PeptiDex-learn-progress";

function getProgress(): Record<string, boolean> {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}"); } catch { return {}; }
}
function saveProgress(p: Record<string, boolean>) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

export default function LearnClient() {
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState(0);
    const [quizMode, setQuizMode] = useState(false);
    const [quizIndex, setQuizIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [progress, setProgress] = useState<Record<string, boolean>>({});

    useEffect(() => { setProgress(getProgress()); }, []);

    const module = learningModules.find((m) => m.id === activeModule);
    const completedCount = Object.values(progress).filter(Boolean).length;

    const completeModule = (id: string) => {
        const next = { ...progress, [id]: true };
        setProgress(next);
        saveProgress(next);
    };
    const resetProgress = () => { setProgress({}); saveProgress({}); };

    const startQuiz = () => { setQuizMode(true); setQuizIndex(0); setQuizScore(0); setSelectedAnswer(null); setShowExplanation(false); setQuizComplete(false); };

    const answerQuiz = (i: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(i);
        setShowExplanation(true);
        if (module && i === module.quiz[quizIndex].correctIndex) setQuizScore((s) => s + 1);
    };

    const nextQuestion = () => {
        if (!module) return;
        if (quizIndex + 1 < module.quiz.length) {
            setQuizIndex((i) => i + 1); setSelectedAnswer(null); setShowExplanation(false);
        } else {
            setQuizComplete(true);
            completeModule(module.id);
        }
    };

    const goBack = () => {
        if (quizMode) { setQuizMode(false); return; }
        if (activeSection > 0) { setActiveSection((s) => s - 1); return; }
        setActiveModule(null); setActiveSection(0); setQuizMode(false);
    };

    // Module List
    if (!activeModule) {
        return (
            <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-5 h-5 text-violet-400" />
                        <h2 className="text-xl md:text-2xl font-bold text-zinc-100">Peptide 101</h2>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-400">5 modules · {learningModules.reduce((a, m) => a + m.estimatedMinutes, 0)} min total · {completedCount}/{learningModules.length} completed</p>
                </motion.div>

                <DisclaimerCard variant="educational" className="mb-6" />

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(completedCount / learningModules.length) * 100}%` }}
                            className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full" transition={{ duration: 0.5 }} />
                    </div>
                    {completedCount === learningModules.length && (
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-emerald-400 font-medium">🎉 All modules complete!</p>
                            <button onClick={resetProgress} className="text-[10px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Reset</button>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    {learningModules.map((mod, i) => {
                        const isCompleted = progress[mod.id];
                        const isLocked = i > 0 && !progress[learningModules[i - 1].id] && !isCompleted;
                        return (
                            <motion.button key={mod.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                onClick={() => { if (!isLocked) { setActiveModule(mod.id); setActiveSection(0); setQuizMode(false); } }}
                                disabled={isLocked}
                                className={`w-full text-left rounded-2xl border p-5 transition-all ${isCompleted ? "border-emerald-500/30 bg-emerald-500/5" : isLocked ? "border-zinc-800/40 bg-zinc-900/30 opacity-50 cursor-not-allowed" : "border-zinc-800 bg-zinc-900/50 hover:border-violet-500/30"}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${isCompleted ? "bg-emerald-500/15" : "bg-zinc-800"}`}>
                                        {isCompleted ? <CheckCircle className="w-6 h-6 text-emerald-400" /> : mod.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-bold text-zinc-100">{mod.title}</h3>
                                            <ChevronRight className="w-4 h-4 text-zinc-600" />
                                        </div>
                                        <p className="text-xs text-zinc-400 mt-0.5">{mod.subtitle}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="flex items-center gap-1 text-[10px] text-zinc-500"><Clock className="w-3 h-3" />{mod.estimatedMinutes} min</span>
                                            <span className="text-[10px] text-zinc-500">{mod.sections.length} lessons · {mod.quiz.length} quiz questions</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Quiz Complete
    if (module && quizComplete) {
        const passed = quizScore >= Math.ceil(module.quiz.length * 0.67);
        return (
            <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                    <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${passed ? "bg-emerald-500/15" : "bg-amber-500/15"}`}>
                        <Award className={`w-10 h-10 ${passed ? "text-emerald-400" : "text-amber-400"}`} />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-100 mb-2">{passed ? "Module Complete! 🎉" : "Keep Learning!"}</h2>
                    <p className="text-sm text-zinc-400 mb-4">You scored {quizScore}/{module.quiz.length}</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => { setActiveModule(null); setQuizMode(false); setQuizComplete(false); }}
                            className="px-6 py-3 rounded-xl bg-violet-500 text-white text-sm font-semibold hover:bg-violet-400 transition-colors">
                            Back to Modules
                        </button>
                        {!passed && (
                            <button onClick={startQuiz} className="px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-zinc-600 transition-colors">
                                Retry Quiz
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    }

    // Quiz Mode
    if (module && quizMode) {
        const q = module.quiz[quizIndex];
        return (
            <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">
                <button onClick={goBack} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200 mb-6"><ChevronLeft className="w-4 h-4" /> Back to lesson</button>
                <div className="mb-4"><span className="text-xs text-zinc-500">Question {quizIndex + 1} of {module.quiz.length}</span></div>
                <h2 className="text-lg font-bold text-zinc-100 mb-6">{q.question}</h2>
                <div className="space-y-3 mb-6">
                    {q.options.map((opt, i) => {
                        let cls = "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700";
                        if (selectedAnswer !== null) {
                            if (i === q.correctIndex) cls = "border-emerald-500/50 bg-emerald-500/10";
                            else if (i === selectedAnswer) cls = "border-red-500/50 bg-red-500/10";
                        }
                        return (
                            <button key={i} onClick={() => answerQuiz(i)}
                                className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition-all ${cls} ${selectedAnswer !== null ? "cursor-default" : ""}`}>
                                <span className={`font-medium ${selectedAnswer !== null && i === q.correctIndex ? "text-emerald-300" : selectedAnswer === i ? "text-red-300" : "text-zinc-200"}`}>{opt}</span>
                            </button>
                        );
                    })}
                </div>
                <AnimatePresence>
                    {showExplanation && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-zinc-800/50 border border-zinc-700 p-4 mb-6">
                            <p className="text-xs text-zinc-300 leading-relaxed">{q.explanation}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
                {selectedAnswer !== null && (
                    <button onClick={nextQuestion} className="w-full py-3 rounded-xl bg-violet-500 text-white text-sm font-semibold hover:bg-violet-400 transition-colors">
                        {quizIndex + 1 < module.quiz.length ? "Next Question →" : "See Results"}
                    </button>
                )}
            </div>
        );
    }

    // Lesson Content
    if (module) {
        const section = module.sections[activeSection];
        return (
            <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">
                <button onClick={goBack} className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-200 mb-6"><ChevronLeft className="w-4 h-4" /> {activeSection === 0 ? "Back to modules" : "Previous"}</button>

                {/* Progress */}
                <div className="flex gap-1.5 mb-6">
                    {module.sections.map((_, i) => (
                        <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= activeSection ? "bg-violet-500" : "bg-zinc-800"}`} />
                    ))}
                    <div className={`flex-1 h-1.5 rounded-full ${quizMode ? "bg-violet-500" : "bg-zinc-800"}`} />
                </div>

                <motion.div key={activeSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{module.title} · Lesson {activeSection + 1}/{module.sections.length}</span>
                    <h2 className="text-xl font-bold text-zinc-100 mt-1 mb-4">{section.title}</h2>
                    <div className="prose prose-sm prose-invert max-w-none">
                        {section.content.split("\n\n").map((para, i) => (
                            <p key={i} className="text-sm text-zinc-300 leading-relaxed mb-4 whitespace-pre-line">
                                {para.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                                    if (part.startsWith("**") && part.endsWith("**")) {
                                        return <strong key={j} className="text-zinc-100 font-semibold">{part.slice(2, -2)}</strong>;
                                    }
                                    return part;
                                })}
                            </p>
                        ))}
                    </div>
                </motion.div>

                <div className="mt-8">
                    {activeSection < module.sections.length - 1 ? (
                        <button onClick={() => setActiveSection((s) => s + 1)}
                            className="w-full py-3 rounded-xl bg-violet-500 text-white text-sm font-semibold hover:bg-violet-400 transition-colors">
                            Next Lesson →
                        </button>
                    ) : (
                        <button onClick={startQuiz}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-semibold hover:from-violet-400 hover:to-purple-400 transition-all">
                            🧠 Take the Quiz
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return null;
}
