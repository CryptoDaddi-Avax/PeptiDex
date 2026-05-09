"use client";

import { useState, useMemo, useCallback } from "react";
import { Bell, ChevronDown, Check, AlertCircle } from "lucide-react";
import { getCheapestVendor } from "@/lib/affiliate";
import { peptides as allPeptides } from "@/data/peptides";
import type { PromoSurface } from "@/lib/promos/affiliateUrl";

// ── Props ───────────────────────────────────────────────────────────────────

interface PriceDropAlertCaptureProps {
  peptideSlug?: string;
  peptideName?: string;
  currentPrice?: number;
  surface?: PromoSurface;
}

type FormState = "idle" | "expanded" | "submitting" | "success" | "error";

// ── Component ───────────────────────────────────────────────────────────────

export function PriceDropAlertCapture({
  peptideSlug,
  peptideName,
  currentPrice: currentPriceProp,
  surface = "price_drop_alert",
}: PriceDropAlertCaptureProps) {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(peptideSlug ?? "");
  const [targetPrice, setTargetPrice] = useState<number>(0);

  const cheapest = useMemo(() => {
    if (!selectedSlug) return null;
    return getCheapestVendor(selectedSlug, surface);
  }, [selectedSlug, surface]);

  const currentPrice = currentPriceProp ?? cheapest?.discount.finalPrice ?? 0;

  // Initialize target price when current price becomes available
  useMemo(() => {
    if (currentPrice > 0 && targetPrice === 0) {
      setTargetPrice(Math.round(currentPrice * 0.85 * 100) / 100); // 15% below current
    }
  }, [currentPrice, targetPrice]);

  const resolvedName = peptideName
    ?? allPeptides.find(p => p.slug === selectedSlug)?.name
    ?? selectedSlug;

  const handleSubmit = useCallback(async () => {
    if (!email || !selectedSlug || targetPrice <= 0) return;
    setState("submitting");
    try {
      const res = await fetch("/api/price-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          peptideSlug: selectedSlug,
          targetPrice,
          currentPrice,
          createdAt: new Date().toISOString(),
        }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }, [email, selectedSlug, targetPrice, currentPrice]);

  // Don't render if no peptide and no current price
  if (!peptideSlug && !currentPrice && state === "idle") return null;

  // ── Success state ────────────────────────────────────────────────────────
  if (state === "success") {
    return (
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4 flex items-center gap-3">
        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
        <p className="text-xs text-emerald-400/90">
          We&apos;ll notify you at <strong>{email}</strong> when{" "}
          <strong>{resolvedName}</strong> drops below ${targetPrice.toFixed(2)}.
        </p>
      </div>
    );
  }

  // ── Idle state (teaser) ──────────────────────────────────────────────────
  if (state === "idle") {
    return (
      <button
        onClick={() => setState("expanded")}
        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 flex items-center gap-3 hover:border-amber-500/20 transition-colors text-left"
      >
        <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="text-xs text-zinc-400">
          Get notified when{" "}
          <strong className="text-zinc-300">{resolvedName || "this peptide"}</strong>
          {currentPrice > 0 && (
            <> drops below <strong className="text-amber-400">${(currentPrice * 0.85).toFixed(2)}</strong></>
          )}
        </span>
        <ChevronDown className="w-3 h-3 text-zinc-600 ml-auto shrink-0" />
      </button>
    );
  }

  // ── Expanded / Submitting / Error state ──────────────────────────────────
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-300">
          Price Drop Alert
        </span>
      </div>

      <div className="space-y-3">
        {/* Peptide selector (if not pre-filled) */}
        {!peptideSlug && (
          <div>
            <label className="block text-[10px] text-zinc-500 font-mono mb-1">Peptide</label>
            <select
              value={selectedSlug}
              onChange={e => setSelectedSlug(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-2 text-xs text-zinc-200 font-mono focus:border-amber-500/30 outline-none"
            >
              <option value="">Select peptide…</option>
              {allPeptides
                .filter(p => p.slug && p.name)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(p => (
                  <option key={p.slug} value={p.slug}>{p.name}</option>
                ))}
            </select>
          </div>
        )}

        {/* Current price display */}
        {currentPrice > 0 && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">Current lowest:</span>
            <span className="font-mono text-zinc-300">${currentPrice.toFixed(2)}</span>
          </div>
        )}

        {/* Target price */}
        <div>
          <label className="block text-[10px] text-zinc-500 font-mono mb-1">
            Alert me below ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="1"
            max={currentPrice > 0 ? currentPrice : 9999}
            value={targetPrice || ""}
            onChange={e => setTargetPrice(parseFloat(e.target.value) || 0)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-2 text-xs text-zinc-200 font-mono focus:border-amber-500/30 outline-none"
            placeholder="e.g. 35.00"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[10px] text-zinc-500 font-mono mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="researcher@example.com"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-2 text-xs text-zinc-200 font-mono focus:border-amber-500/30 outline-none"
            required
          />
        </div>

        {state === "error" && (
          <div className="flex items-center gap-2 text-[10px] text-red-400">
            <AlertCircle className="w-3 h-3" /> Something went wrong. Try again.
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={state === "submitting" || !email || !selectedSlug || targetPrice <= 0}
          className="w-full py-2.5 rounded-lg text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {state === "submitting" ? "Setting alert…" : "🔔 Set Price Alert"}
        </button>

        <button
          onClick={() => setState("idle")}
          className="w-full text-center text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
