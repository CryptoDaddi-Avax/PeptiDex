"use client";

/**
 * FlagButton — allows any authenticated user to flag a suspicious protocol log.
 * Renders inline next to log cards.
 */
import React, { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

interface FlagButtonProps {
    logId: string;
    vendorSlug: string;
}

export function FlagButton({ logId, vendorSlug }: FlagButtonProps) {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");

    if (done) {
        return (
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)" }}>
                ✓ Flagged
            </span>
        );
    }

    const handleSubmit = async () => {
        if (!reason.trim() || reason.trim().length < 10) {
            setError("Please provide at least 10 characters explaining the issue.");
            return;
        }
        setSubmitting(true);
        setError("");

        const res = await fetch("/api/vendor-flags", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ log_id: logId, vendor_slug: vendorSlug, reason }),
        });

        const data = await res.json();
        setSubmitting(false);

        if (res.ok) {
            setDone(true);
            setOpen(false);
        } else {
            setError(data.error || "Failed to submit flag");
        }
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={() => { if (!user) return; setOpen(!open); }}
                title={user ? "Flag this log for review" : "Sign in to flag"}
                className="opacity-30 hover:opacity-70 transition-opacity text-xs"
                style={{ color: "var(--ink-mute)", fontFamily: "var(--mono)", cursor: user ? "pointer" : "not-allowed" }}
            >
                ⚑
            </button>

            {open && (
                <div
                    className="absolute right-0 bottom-6 z-20 w-72 rounded-lg p-4 shadow-xl"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--line-strong)" }}
                >
                    <p style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--ink)", fontWeight: 600, marginBottom: 8 }}>
                        Flag this log for editorial review
                    </p>
                    <textarea
                        value={reason}
                        onChange={e => setReason(e.target.value.slice(0, 1000))}
                        rows={3}
                        placeholder="Why is this log suspicious? (min 10 chars)"
                        className="w-full px-3 py-2 rounded text-xs outline-none"
                        style={{ background: "var(--bg-soft)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontFamily: "var(--sans)", resize: "vertical" }}
                    />
                    {error && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{error}</p>}
                    <div className="flex gap-2 mt-2">
                        <button onClick={handleSubmit} disabled={submitting}
                            className="px-3 py-1.5 rounded text-xs font-medium"
                            style={{ background: "var(--amber)", color: "#0a0a0b", fontFamily: "var(--sans)", opacity: submitting ? 0.5 : 1 }}>
                            {submitting ? "..." : "Submit Flag"}
                        </button>
                        <button onClick={() => setOpen(false)} className="px-3 py-1.5 rounded text-xs"
                            style={{ color: "var(--ink-dim)", fontFamily: "var(--sans)" }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
