"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import type { ShareCardData, CardFormat } from "./card-templates";
import {
    renderQuizCard,
    renderCompareCard,
    renderCalculatorCard,
    renderCycleCard,
    renderEvidenceCard,
} from "./card-templates";

/* ═══════════════════════════════════════════════════════════════════════
   ShareCardRenderer — Renders a branded share card onto a hidden canvas,
   returns a preview URL + download/share helpers.
   ═══════════════════════════════════════════════════════════════════════ */

interface UseShareCardReturn {
    previewUrl: string | null;
    isGenerating: boolean;
    generate: (format: CardFormat) => Promise<void>;
    downloadPng: () => void;
    getBlob: () => Promise<Blob | null>;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function useShareCard(data: ShareCardData | null): UseShareCardReturn {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const logoRef = useRef<HTMLImageElement | null>(null);

    // Preload logo
    useEffect(() => {
        if (typeof window === "undefined") return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = "/logo.png";
        img.onload = () => { logoRef.current = img; };
        img.onerror = () => { logoRef.current = null; };
    }, []);

    const generate = useCallback(async (format: CardFormat) => {
        if (!data || !canvasRef.current) return;
        setIsGenerating(true);

        const canvas = canvasRef.current;
        const [w, h] = format === "story" ? [1080, 1920] : [1080, 1080];
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        if (!ctx) { setIsGenerating(false); return; }

        // Clear
        ctx.clearRect(0, 0, w, h);

        // Render template
        const logo = logoRef.current;
        switch (data.type) {
            case "quiz": renderQuizCard(ctx, data, format, logo); break;
            case "compare": renderCompareCard(ctx, data, format, logo); break;
            case "calculator": renderCalculatorCard(ctx, data, format, logo); break;
            case "cycle": renderCycleCard(ctx, data, format, logo); break;
            case "evidence": renderEvidenceCard(ctx, data, format, logo); break;
        }

        // Create preview URL
        const url = canvas.toDataURL("image/png");
        setPreviewUrl(url);
        setIsGenerating(false);
    }, [data]);

    const downloadPng = useCallback(() => {
        if (!previewUrl) return;
        const a = document.createElement("a");
        a.href = previewUrl;
        const toolName = data?.type || "peptidex";
        a.download = `peptidex-${toolName}-results.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Track
        trackShareEvent(data?.type || "unknown", "download");
    }, [previewUrl, data]);

    const getBlob = useCallback(async (): Promise<Blob | null> => {
        if (!canvasRef.current) return null;
        return new Promise((resolve) => {
            canvasRef.current!.toBlob((blob) => resolve(blob), "image/png");
        });
    }, []);

    return { previewUrl, isGenerating, generate, downloadPng, getBlob, canvasRef };
}

function trackShareEvent(tool: string, action: string) {
    try {
        if (typeof window !== "undefined" && "gtag" in window) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const w = window as Record<string, any>;
            if (typeof w.gtag === "function") {
                w.gtag("event", "share_card", {
                    event_category: "engagement",
                    event_label: `${tool}_${action}`,
                    tool_name: tool,
                    share_action: action,
                });
            }
        }
    } catch {
        // silent
    }
}

export { trackShareEvent };
