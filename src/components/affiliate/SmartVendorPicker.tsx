"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { X, ChevronRight, Trophy, Star, Zap, DollarSign, Shield, MapPin, CreditCard, Target } from "lucide-react";
import {
  getAllVendorsForPeptide,
  scoreVendorForUser,
  type EnrichedVendorOffer,
  type PickerAnswers,
  AFFILIATE_LINK_ATTRS,
  trackClick,
} from "@/lib/affiliate";
import { peptides as allPeptides } from "@/data/peptides";
import type { PromoSurface } from "@/lib/promos/affiliateUrl";
import { VendorDot } from "./atoms/VendorDot";
import { CopyCodeButton } from "./atoms/CopyCodeButton";

// ── Props ───────────────────────────────────────────────────────────────────

interface SmartVendorPickerProps {
  initialPeptide?: string;
  trigger?: React.ReactNode;
  surface?: PromoSurface;
}

type Step = "peptide" | "region" | "payment" | "priority" | "result";

const STEPS: Step[] = ["peptide", "region", "payment", "priority", "result"];

// ── Component ───────────────────────────────────────────────────────────────

export function SmartVendorPicker({
  initialPeptide,
  trigger,
  surface = "smart_vendor_picker",
}: SmartVendorPickerProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(initialPeptide ? "region" : "peptide");
  const [answers, setAnswers] = useState<Partial<PickerAnswers>>({
    peptideSlug: initialPeptide,
  });

  const reset = useCallback(() => {
    setStep(initialPeptide ? "region" : "peptide");
    setAnswers({ peptideSlug: initialPeptide });
  }, [initialPeptide]);

  const openModal = useCallback(() => {
    reset();
    setOpen(true);
  }, [reset]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const advance = useCallback((key: string, value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }, [answers, step]);

  // ── Compute result ────────────────────────────────────────────────────────
  const result = useMemo(() => {
    if (step !== "result" || !answers.peptideSlug || !answers.region || !answers.payment || !answers.priority) {
      return null;
    }
    const fullAnswers = answers as PickerAnswers;
    const offers = getAllVendorsForPeptide(fullAnswers.peptideSlug, surface);
    const scored = offers
      .map(offer => ({ offer, score: scoreVendorForUser(offer, fullAnswers) }))
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored;
  }, [step, answers, surface]);

  const peptideName = useMemo(() => {
    if (!answers.peptideSlug) return "";
    return allPeptides.find(p => p.slug === answers.peptideSlug)?.name ?? answers.peptideSlug;
  }, [answers.peptideSlug]);

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex) / (STEPS.length - 1)) * 100;

  if (!open) {
    return trigger ? (
      <div onClick={openModal} style={{ cursor: "pointer" }}>{trigger}</div>
    ) : (
      <button
        onClick={openModal}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition-colors"
      >
        <Target className="w-3.5 h-3.5" /> Find Your Vendor
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0" onClick={() => setOpen(false)}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden md:max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <div>
            <h3 className="text-sm font-bold text-zinc-200">Smart Vendor Picker</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">4 questions → 1 recommendation</p>
          </div>
          <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-zinc-800">
          <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        {/* Content */}
        <div className="p-5 min-h-[280px]">
          {/* Step: Peptide */}
          {step === "peptide" && (
            <StepContent
              title="What peptide are you researching?"
              icon={<Zap className="w-4 h-4 text-amber-400" />}
            >
              <div className="max-h-[300px] overflow-y-auto space-y-1 pr-1">
                {allPeptides
                  .filter(p => p.slug && p.name)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(p => (
                    <button
                      key={p.slug}
                      onClick={() => advance("peptideSlug", p.slug)}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-zinc-300 hover:bg-zinc-800 hover:text-amber-400 transition-colors font-mono"
                    >
                      {p.name}
                    </button>
                  ))}
              </div>
            </StepContent>
          )}

          {/* Step: Region */}
          {step === "region" && (
            <StepContent
              title="Where are you located?"
              icon={<MapPin className="w-4 h-4 text-amber-400" />}
            >
              <OptionGrid
                options={[
                  { value: "us", label: "United States", icon: "🇺🇸" },
                  { value: "eu", label: "Europe / UK", icon: "🇪🇺" },
                  { value: "intl", label: "International", icon: "🌍" },
                ]}
                onSelect={v => advance("region", v)}
              />
            </StepContent>
          )}

          {/* Step: Payment */}
          {step === "payment" && (
            <StepContent
              title="Payment preference?"
              icon={<CreditCard className="w-4 h-4 text-amber-400" />}
            >
              <OptionGrid
                options={[
                  { value: "card", label: "Credit Card", icon: "💳" },
                  { value: "crypto", label: "Cryptocurrency", icon: "₿" },
                  { value: "any", label: "No preference", icon: "✓" },
                ]}
                onSelect={v => advance("payment", v)}
              />
            </StepContent>
          )}

          {/* Step: Priority */}
          {step === "priority" && (
            <StepContent
              title="What matters most?"
              icon={<Star className="w-4 h-4 text-amber-400" />}
            >
              <OptionGrid
                options={[
                  { value: "price", label: "Lowest Price", icon: "💰" },
                  { value: "purity", label: "Highest Purity", icon: "🧪" },
                  { value: "speed", label: "Fastest Shipping", icon: "⚡" },
                ]}
                onSelect={v => advance("priority", v)}
              />
            </StepContent>
          )}

          {/* Step: Result */}
          {step === "result" && result && (
            <div>
              {result.length > 0 ? (
                <>
                  <div className="text-center mb-4">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-1">
                      Our pick for {peptideName}
                    </p>
                  </div>

                  {/* Winner */}
                  <VendorResultCard
                    offer={result[0].offer}
                    score={result[0].score}
                    isWinner
                    peptideSlug={answers.peptideSlug!}
                  />

                  {/* Runner-up */}
                  {result.length > 1 && (
                    <div className="mt-3">
                      <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-600 mb-2">Runner-up</p>
                      <VendorResultCard
                        offer={result[1].offer}
                        score={result[1].score}
                        peptideSlug={answers.peptideSlug!}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-zinc-400 mb-2">No perfect match found</p>
                  <p className="text-xs text-zinc-600">
                    Try adjusting your region or payment preferences.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer: back/restart */}
        {step !== "peptide" && step !== "result" && (
          <div className="px-5 py-3 border-t border-zinc-800 flex justify-between">
            <button
              onClick={() => setStep(STEPS[Math.max(0, stepIndex - 1)])}
              className="text-[11px] text-zinc-500 hover:text-zinc-300 font-mono transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={reset}
              className="text-[11px] text-zinc-600 hover:text-zinc-400 font-mono transition-colors"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Subcomponents ───────────────────────────────────────────────────────────

function StepContent({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h4 className="text-sm font-medium text-zinc-200">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function OptionGrid({
  options,
  onSelect,
}: {
  options: { value: string; label: string; icon: string }[];
  onSelect: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-800/30 hover:border-amber-500/30 hover:bg-amber-500/[0.04] text-left transition-all group"
        >
          <span className="text-lg">{opt.icon}</span>
          <span className="text-sm text-zinc-300 group-hover:text-amber-400 transition-colors">{opt.label}</span>
          <ChevronRight className="w-3 h-3 text-zinc-600 ml-auto group-hover:text-amber-400 transition-colors" />
        </button>
      ))}
    </div>
  );
}

function VendorResultCard({
  offer,
  score,
  isWinner = false,
  peptideSlug,
}: {
  offer: EnrichedVendorOffer;
  score: number;
  isWinner?: boolean;
  peptideSlug: string;
}) {
  const { vendor, discount } = offer;

  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: isWinner ? "rgba(201,169,97,0.3)" : "rgba(255,255,255,0.06)",
        background: isWinner ? "rgba(201,169,97,0.04)" : "rgba(255,255,255,0.02)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <VendorDot vendorSlug={vendor.slug} />
        <span className="text-sm font-bold text-zinc-200">{vendor.name}</span>
        {isWinner && (
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
        )}
        <span className="ml-auto text-[10px] font-mono text-zinc-500">
          {Math.round(score)}pts
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-3 text-[10px] font-mono">
        <div>
          <span className="text-zinc-600 block">Price</span>
          <span className="text-zinc-300">${discount.finalPrice.toFixed(2)}</span>
        </div>
        <div>
          <span className="text-zinc-600 block">Purity</span>
          <span className="text-zinc-300">{vendor.purity}</span>
        </div>
        <div>
          <span className="text-zinc-600 block">Ships</span>
          <span className="text-zinc-300">{vendor.shippingSpeed.split("(")[0].trim()}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2">
        {vendor.discountCode && <CopyCodeButton code={vendor.discountCode} />}
        <a
          href={offer.trackedUrl}
          onClick={() => trackClick(offer, "smart_picker", peptideSlug)}
          {...AFFILIATE_LINK_ATTRS}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
        >
          <Shield className="w-3 h-3" /> Shop {vendor.name}
        </a>
      </div>
    </div>
  );
}
