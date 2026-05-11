"use client";

/**
 * AuthModal — lightweight sign-in modal for protocol log submission.
 * Supports anonymous (one click) and magic link (email) sign-in.
 */
import React, { useState } from "react";
import { useAuth } from "./AuthProvider";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAuthenticated?: () => void;
    context?: string; // e.g. "log your protocol"
}

export function AuthModal({ isOpen, onClose, onAuthenticated, context }: AuthModalProps) {
    const { signInAnonymously, signInWithMagicLink } = useAuth();
    const [email, setEmail] = useState("");
    const [mode, setMode] = useState<"choice" | "email" | "sent">("choice");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleAnonymous = async () => {
        setLoading(true);
        await signInAnonymously();
        setLoading(false);
        onAuthenticated?.();
        onClose();
    };

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signInWithMagicLink(email);
        setLoading(false);

        if (result.success) {
            setMode("sent");
        } else {
            setError(result.error || "Failed to send login link");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative w-full max-w-md mx-4 rounded-xl overflow-hidden"
                style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--line-strong)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 pb-4 border-b" style={{ borderColor: "var(--line)" }}>
                    <div className="flex items-center justify-between">
                        <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 300, color: "var(--ink)" }}>
                            {mode === "sent" ? "Check Your Email" : "Sign In to Continue"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-2xl leading-none opacity-40 hover:opacity-80 transition-opacity"
                            style={{ color: "var(--ink)" }}
                        >
                            ×
                        </button>
                    </div>
                    {context && mode === "choice" && (
                        <p className="mt-2 text-sm" style={{ color: "var(--ink-dim)", fontFamily: "var(--sans)" }}>
                            Sign in to {context}. Your identity stays private — we only display pseudonyms.
                        </p>
                    )}
                </div>

                {/* Body */}
                <div className="p-6">
                    {mode === "choice" && (
                        <div className="space-y-3">
                            {/* Anonymous option */}
                            <button
                                onClick={handleAnonymous}
                                disabled={loading}
                                className="w-full py-3 px-4 rounded-lg text-left transition-all hover:scale-[1.01]"
                                style={{
                                    background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)",
                                    color: "#0a0a0b",
                                    fontFamily: "var(--sans)",
                                    fontWeight: 600,
                                    fontSize: 15,
                                    opacity: loading ? 0.6 : 1,
                                }}
                            >
                                <div>Continue Anonymously</div>
                                <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.7, marginTop: 2 }}>
                                    Quick start — no email needed. You get a random pseudonym.
                                </div>
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 py-1">
                                <div className="flex-1 h-px" style={{ background: "var(--line)" }} />
                                <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                    or
                                </span>
                                <div className="flex-1 h-px" style={{ background: "var(--line)" }} />
                            </div>

                            {/* Email option */}
                            <button
                                onClick={() => setMode("email")}
                                className="w-full py-3 px-4 rounded-lg text-left transition-all hover:scale-[1.01]"
                                style={{
                                    background: "var(--bg-soft)",
                                    border: "1px solid var(--line-strong)",
                                    color: "var(--ink)",
                                    fontFamily: "var(--sans)",
                                    fontWeight: 600,
                                    fontSize: 15,
                                }}
                            >
                                <div>Sign In with Email</div>
                                <div style={{ fontSize: 12, fontWeight: 400, color: "var(--ink-dim)", marginTop: 2 }}>
                                    Magic link — no password. Earn Verified Buyer badges.
                                </div>
                            </button>
                        </div>
                    )}

                    {mode === "email" && (
                        <form onSubmit={handleMagicLink} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="auth-email"
                                    style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)", fontWeight: 500 }}
                                >
                                    Email address
                                </label>
                                <input
                                    id="auth-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="researcher@example.com"
                                    required
                                    autoFocus
                                    className="mt-1 w-full px-4 py-3 rounded-lg text-sm outline-none transition-all focus:ring-2"
                                    style={{
                                        background: "var(--bg-soft)",
                                        border: "1px solid var(--line-strong)",
                                        color: "var(--ink)",
                                        fontFamily: "var(--sans)",
                                    }}
                                />
                            </div>

                            {error && (
                                <p className="text-sm" style={{ color: "#ef4444" }}>{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 rounded-lg font-semibold transition-all"
                                style={{
                                    background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)",
                                    color: "#0a0a0b",
                                    fontFamily: "var(--sans)",
                                    fontSize: 15,
                                    opacity: loading ? 0.6 : 1,
                                }}
                            >
                                {loading ? "Sending..." : "Send Magic Link"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setMode("choice")}
                                className="w-full text-center text-sm transition-opacity hover:opacity-80"
                                style={{ color: "var(--ink-dim)", fontFamily: "var(--sans)" }}
                            >
                                ← Back to options
                            </button>
                        </form>
                    )}

                    {mode === "sent" && (
                        <div className="text-center py-4">
                            <div className="text-4xl mb-4">📨</div>
                            <p style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--ink)", fontWeight: 300 }}>
                                We sent a login link to
                            </p>
                            <p style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--gold)", marginTop: 8 }}>
                                {email}
                            </p>
                            <p className="mt-4 text-sm" style={{ color: "var(--ink-dim)", fontFamily: "var(--sans)" }}>
                                Click the link in your email to sign in. You can close this modal.
                            </p>
                        </div>
                    )}
                </div>

                {/* Privacy footer */}
                <div className="px-6 py-3 border-t" style={{ borderColor: "var(--line)" }}>
                    <p style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        No PII displayed publicly · Pseudonyms only · Country optional
                    </p>
                </div>
            </div>
        </div>
    );
}
