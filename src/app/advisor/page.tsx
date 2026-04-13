"use client";
import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, Trash2, AlertCircle } from "lucide-react";

const quickPrompts = [
    "I'm new to peptides",
    "What's good for healing?",
    "Best peptide for fat loss?",
    "Tell me about BPC-157",
    "CJC-1295 dosing info",
    "Compare BPC-157 vs TB-500",
    "Can I stack Semax and Selank?",
    "What's the cheapest peptide?",
];

export default function AdvisorPage() {
    const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, append, error } = useChat({
        api: '/api/chat',
    });
    
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { 
        bottomRef.current?.scrollIntoView({ behavior: "smooth" }); 
    }, [messages, isLoading]);

    const clearChat = () => { setMessages([]); };

    const handleQuickPrompt = (prompt: string) => {
        append({ role: 'user', content: prompt });
    };

    const renderContent = (text: string) => {
        return text.split("\n").map((line, i) => {
            const processFormatting = (str: string) => {
                // Combined regex for bold and markdown links
                const combinedRegex = /\*\*(.*?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
                let lastIdx = 0;
                let match;
                const result: React.ReactNode[] = [];
                while ((match = combinedRegex.exec(str)) !== null) {
                    if (match.index > lastIdx) result.push(str.slice(lastIdx, match.index));
                    if (match[1] !== undefined) {
                        // Bold match
                        result.push(<strong key={`b-${match.index}`} className="text-zinc-100 font-bold">{match[1]}</strong>);
                    } else if (match[2] !== undefined && match[3] !== undefined) {
                        // Link match [text](url)
                        result.push(
                            <a key={`a-${match.index}`} href={match[3]} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors">{match[2]}</a>
                        );
                    }
                    lastIdx = match.index + match[0].length;
                }
                if (lastIdx < str.length) result.push(str.slice(lastIdx));
                return result.length ? result : [str];
            };

            if (line.startsWith("### ")) return <h3 key={i} className="text-sm font-bold text-zinc-100 mt-2 mb-1">{processFormatting(line.replace("### ", ""))}</h3>;
            if (line.startsWith("## ")) return <h2 key={i} className="text-md font-bold text-zinc-100 mt-3 mb-1">{processFormatting(line.replace("## ", ""))}</h2>;
            if (line.startsWith("# ")) return <h1 key={i} className="text-lg font-bold text-zinc-100 mt-3 mb-1">{processFormatting(line.replace("# ", ""))}</h1>;
            
            if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
                return (
                    <div key={i} className="flex gap-2 my-1">
                        <span className="text-violet-400 mt-[2px]">•</span>
                        <span>{processFormatting(line.replace(/^\s*[-*]\s/, ""))}</span>
                    </div>
                );
            }

            if (line.startsWith("---")) return <hr key={i} className="border-zinc-700/50 my-3" />;
            if (line.trim() === "") return <br key={i} />;
            
            return <p key={i} className="leading-relaxed mb-1">{processFormatting(line)}</p>;
        });
    };

    return (
        <div className="flex flex-col h-[calc(100dvh-120px)] max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-zinc-100">PeptiDex AI Advisor</h1>
                        <p className="text-[10px] text-zinc-400">Powered by Gemini &middot; RAG Context Engine</p>
                    </div>
                </div>
                {messages.length > 0 && (
                    <button onClick={clearChat} className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-zinc-800/50 transition-colors" title="Clear Chat">
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
                {messages.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
                            <Bot className="w-8 h-8 text-violet-400" />
                        </div>
                        <h2 className="text-lg font-bold text-zinc-200 mb-1">Ask me anything about peptides</h2>
                        <p className="text-xs text-zinc-500 mb-6">Goals, exact dosages, stacks, interactions, and comparisons.</p>
                        <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                            {quickPrompts.map((prompt) => (
                                <button key={prompt} onClick={() => handleQuickPrompt(prompt)}
                                    className="text-left px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/50 text-[11px] text-zinc-400 hover:border-violet-500/30 hover:text-zinc-200 transition-all">
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {messages.map((msg) => (
                    <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[90%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-violet-600 text-white" : "bg-zinc-900 border border-zinc-800 text-zinc-300"}`}>
                            {msg.role === "assistant" && (
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-violet-400">Advisor</span>
                                </div>
                            )}
                            <div className="text-[13px]">{renderContent(msg.content)}</div>
                        </div>
                    </motion.div>
                ))}

                {error && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
                        <div className="max-w-[90%] rounded-xl px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex gap-2 items-center">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>
                                {(() => {
                                    try {
                                        const parsed = JSON.parse(error.message);
                                        return parsed.error || error.message;
                                    } catch {
                                        return error.message && error.message.length < 100 
                                            ? error.message 
                                            : "Connection error. Please check your internet connection.";
                                    }
                                })()}
                            </span>
                        </div>
                    </motion.div>
                )}

                <AnimatePresence>
                    {isLoading && messages[messages.length - 1]?.role === 'user' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-start">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 flex items-center gap-1.5">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-violet-500/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1.5 h-1.5 bg-violet-500/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1.5 h-1.5 bg-violet-500/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md relative z-10">
                <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
                    <input ref={inputRef} type="text" placeholder="Design a protocol for..." value={input} onChange={handleInputChange} disabled={isLoading}
                        className="flex-1 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 shadow-inner transition-all disabled:opacity-50" />
                    <button type="submit" disabled={!input.trim() || isLoading}
                        className="w-11 h-11 rounded-xl bg-violet-600 flex items-center justify-center disabled:opacity-40 hover:bg-violet-500 transition-colors shadow-lg shadow-violet-500/20 flex-shrink-0">
                        <Send className="w-4 h-4 text-white ml-0.5" />
                    </button>
                </form>
                <p className="text-[10px] text-zinc-500 text-center mt-2">Educational AI tool. Not medical advice. Hallucinations may occur.</p>
                <p className="text-[9px] text-zinc-600 text-center mt-1">Sourcing recommendations powered by PeptiDex&apos;s independent vendor evaluation. We may earn a commission.</p>
            </div>
        </div>
    );
}
