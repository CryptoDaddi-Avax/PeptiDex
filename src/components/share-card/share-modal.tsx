"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Download, Share2, X, Image as ImageIcon, Smartphone,
    Copy, Check, Loader2,
} from "lucide-react";
import type { ShareCardData, CardFormat } from "./card-templates";
import { useShareCard, trackShareEvent } from "./share-card-renderer";

/* ═══════════════════════════════════════════════════════════════════════
   ShareModal — Modal UI for generating & sharing branded result cards.
   Reused across Quiz, Compare, Calculator, Cycle Planner, Evidence.
   ═══════════════════════════════════════════════════════════════════════ */

interface ShareModalProps {
    data: ShareCardData | null;
    /** The page URL to share alongside the image */
    shareUrl: string;
    /** Pre-populated share text */
    shareText?: string;
    /** Tool-specific label for the share button, e.g. "Share My Stack" */
    buttonLabel?: string;
}

// Social share config
const REDDIT_BASE = "https://www.reddit.com/submit?url=";
const TWITTER_BASE = "https://twitter.com/intent/tweet?text=";
const FACEBOOK_BASE = "https://www.facebook.com/sharer/sharer.php?u=";

export function ShareModal({ data, shareUrl, shareText, buttonLabel = "Share My Results" }: ShareModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [format, setFormat] = useState<CardFormat>("square");
    const [copied, setCopied] = useState(false);
    const { previewUrl, isGenerating, generate, downloadPng, getBlob, canvasRef } = useShareCard(data);

    // Generate whenever modal opens or format changes
    useEffect(() => {
        if (isOpen && data) {
            generate(format);
        }
    }, [isOpen, format, data, generate]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen]);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
        trackShareEvent(data?.type || "unknown", "modal_open");
    }, [data]);

    const handleNativeShare = useCallback(async () => {
        if (!data) return;
        trackShareEvent(data.type, "native_share");

        const blob = await getBlob();
        const shareData: ShareData = {
            title: "My PeptiDex Results",
            text: shareText || `Check out my results on PeptiDex! ${shareUrl}`,
            url: shareUrl,
        };

        // Try sharing with file if possible
        if (blob && navigator.canShare) {
            const file = new File([blob], "peptidex-results.png", { type: "image/png" });
            const fileShareData = { ...shareData, files: [file] };
            if (navigator.canShare(fileShareData)) {
                try {
                    await navigator.share(fileShareData);
                    return;
                } catch {
                    // Fallback to URL-only share
                }
            }
        }

        // URL-only share
        try {
            await navigator.share(shareData);
        } catch {
            // User cancelled
        }
    }, [data, shareText, shareUrl, getBlob]);

    const handleCopyLink = useCallback(async () => {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        trackShareEvent(data?.type || "unknown", "copy_link");
        setTimeout(() => setCopied(false), 2000);
    }, [shareUrl, data]);

    const handleSocialShare = useCallback((platform: string) => {
        trackShareEvent(data?.type || "unknown", `share_${platform}`);
        const text = encodeURIComponent(shareText || `Check out my results on PeptiDex!`);
        const url = encodeURIComponent(shareUrl);

        switch (platform) {
            case "reddit":
                window.open(`${REDDIT_BASE}${url}&title=${text}`, "_blank");
                break;
            case "twitter":
                window.open(`${TWITTER_BASE}${text}%20${url}`, "_blank");
                break;
            case "facebook":
                window.open(`${FACEBOOK_BASE}${url}`, "_blank");
                break;
        }
    }, [shareUrl, shareText, data]);

    const supportsNativeShare = typeof navigator !== "undefined" && "share" in navigator;

    if (!data) return null;

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={handleOpen}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold shadow-lg shadow-violet-900/30 hover:shadow-violet-500/30 hover:brightness-110 transition-all active:scale-95"
            >
                <Share2 className="w-4 h-4" />
                {buttonLabel}
                <span className="text-base ml-0.5">{"\u{1F9EC}"}</span>
            </button>

            {/* Hidden canvas for rendering */}
            <canvas
                ref={canvasRef}
                style={{ position: "absolute", left: -9999, top: -9999, pointerEvents: "none" }}
            />

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        />

                        {/* Modal Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[560px] md:max-h-[90vh] z-50 overflow-y-auto rounded-3xl bg-zinc-900 border border-zinc-700/50 shadow-2xl shadow-black/50"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                                <div>
                                    <h2 className="text-lg font-bold text-zinc-100">Share Your Results</h2>
                                    <p className="text-xs text-zinc-500 mt-0.5">Generate a branded card to share</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Format Tabs */}
                            <div className="flex gap-2 px-5 pt-4">
                                <button
                                    onClick={() => setFormat("square")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                        format === "square"
                                            ? "bg-violet-600 text-white"
                                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                    }`}
                                >
                                    <ImageIcon className="w-3.5 h-3.5" />
                                    Square (1:1)
                                </button>
                                <button
                                    onClick={() => setFormat("story")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                        format === "story"
                                            ? "bg-violet-600 text-white"
                                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                    }`}
                                >
                                    <Smartphone className="w-3.5 h-3.5" />
                                    Story (9:16)
                                </button>
                            </div>

                            {/* Preview */}
                            <div className="px-5 py-4">
                                <div className={`relative rounded-2xl overflow-hidden border border-zinc-700/50 bg-zinc-950 ${
                                    format === "story" ? "aspect-[9/16] max-h-[400px]" : "aspect-square"
                                }`}>
                                    {isGenerating ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
                                        </div>
                                    ) : previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Share card preview"
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-zinc-600 text-sm">
                                            Generating...
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="px-5 pb-5 space-y-3">
                                {/* Primary actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={downloadPng}
                                        disabled={!previewUrl}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download PNG
                                    </button>
                                    {supportsNativeShare && (
                                        <button
                                            onClick={handleNativeShare}
                                            disabled={!previewUrl}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Share
                                        </button>
                                    )}
                                </div>

                                {/* Social Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleSocialShare("reddit")}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-orange-600/15 border border-orange-500/30 text-orange-400 text-xs font-semibold hover:bg-orange-600/25 transition-colors"
                                    >
                                        Reddit
                                    </button>
                                    <button
                                        onClick={() => handleSocialShare("twitter")}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:bg-blue-600/25 transition-colors"
                                    >
                                        X / Twitter
                                    </button>
                                    <button
                                        onClick={() => handleSocialShare("facebook")}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-blue-700/15 border border-blue-600/30 text-blue-300 text-xs font-semibold hover:bg-blue-700/25 transition-colors"
                                    >
                                        Facebook
                                    </button>
                                    <button
                                        onClick={handleCopyLink}
                                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                                            copied
                                                ? "bg-emerald-600/15 border border-emerald-500/30 text-emerald-400"
                                                : "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700"
                                        }`}
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                        {copied ? "Copied!" : "Link"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
