"use client";

import React, { useState, useRef } from "react";

interface ReceiptUploadProps {
    logId: string;
    vendorSlug: string;
    onVerified?: () => void;
}

interface VerifyResult {
    success: boolean;
    auto_verified: boolean;
    vendor_match: boolean;
    vendor_detected: string | null;
    vendor_expected: string;
    date_detected: string | null;
    ocr_confidence: number;
    message: string;
}

export function ReceiptUpload({ logId, vendorSlug, onVerified }: ReceiptUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<VerifyResult | null>(null);
    const [error, setError] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const processFile = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            setError("Only image files accepted (JPEG, PNG, WebP)");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setError("File must be under 10MB");
            return;
        }

        setUploading(true);
        setError("");
        setResult(null);

        const formData = new FormData();
        formData.append("receipt", file);
        formData.append("log_id", logId);
        formData.append("vendor_slug", vendorSlug);

        try {
            const res = await fetch("/api/receipt-verify", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (res.ok) {
                setResult(data);
                if (data.auto_verified && onVerified) onVerified();
            } else {
                setError(data.error || "Upload failed");
            }
        } catch {
            setError("Network error — please try again");
        }
        setUploading(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    };

    if (result) {
        return (
            <div className="rounded-xl p-5" style={{
                background: result.auto_verified ? "rgba(127,183,126,0.06)" : "rgba(212,131,42,0.06)",
                border: `1px solid ${result.auto_verified ? "rgba(127,183,126,0.25)" : "rgba(212,131,42,0.25)"}`,
            }}>
                <div className="flex items-start gap-3">
                    <span className="text-2xl">{result.auto_verified ? "✅" : "⏳"}</span>
                    <div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: result.auto_verified ? "var(--green)" : "var(--amber)" }}>
                            {result.auto_verified ? "Verified Buyer" : "Manual Review Queued"}
                        </p>
                        <p className="mt-1" style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink-dim)" }}>
                            {result.message}
                        </p>
                        <div className="mt-2 flex gap-4" style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)" }}>
                            <span>OCR confidence: {result.ocr_confidence}%</span>
                            {result.date_detected && <span>Date: {result.date_detected}</span>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div
                className="rounded-xl p-8 text-center cursor-pointer transition-all"
                style={{
                    border: `2px dashed ${dragOver ? "var(--gold)" : "var(--line-strong)"}`,
                    background: dragOver ? "rgba(201,169,97,0.05)" : "var(--bg-soft)",
                }}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
            >
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) processFile(e.target.files[0]); }} />

                {uploading ? (
                    <div>
                        <div className="text-3xl mb-3 animate-pulse">🔍</div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--gold)" }}>
                            Processing receipt with OCR...
                        </p>
                        <p className="mt-1" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>
                            Image is processed in memory and never stored
                        </p>
                    </div>
                ) : (
                    <div>
                        <div className="text-3xl mb-3">📸</div>
                        <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink)" }}>
                            Drop your receipt here or <span style={{ color: "var(--gold)", textDecoration: "underline" }}>browse</span>
                        </p>
                        <p className="mt-2" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)" }}>
                            JPEG, PNG, or WebP · Max 10MB · Deleted after processing
                        </p>
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-3 p-3 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
                    <p style={{ color: "#ef4444", fontFamily: "var(--sans)", fontSize: 13 }}>{error}</p>
                </div>
            )}

            <div className="mt-3 p-3 rounded-lg" style={{ background: "rgba(127,183,126,0.06)", border: "1px solid rgba(127,183,126,0.15)" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--green)", lineHeight: 1.5 }}>
                    🔒 PRIVACY: Your receipt image is OCR&apos;d in memory for vendor name and date only. The image is <strong>never stored</strong> and is permanently discarded after processing.
                </p>
            </div>
        </div>
    );
}
