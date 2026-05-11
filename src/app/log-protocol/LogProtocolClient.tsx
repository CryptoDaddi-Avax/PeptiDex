"use client";

import React, { useState, useMemo } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";
import { ReceiptUpload } from "@/components/logs/ReceiptUpload";
import { peptides } from "@/data/peptides";
import { vendors } from "@/data/vendors";
import { goals } from "@/data/goals";
import Link from "next/link";

const FREQUENCIES = ["daily", "5on2off", "2x_week", "eod", "3x_week", "weekly"];
const ROUTES = ["subq", "im", "oral", "nasal", "topical"];
const COMMON_SIDE_EFFECTS = [
  "injection_site_redness", "fatigue", "nausea", "headache", "water_retention",
  "insomnia", "vivid_dreams", "dizziness", "appetite_change", "mood_change",
];

type Step = 1 | 2 | 3 | 4;

export default function LogProtocolClient() {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedLogId, setSubmittedLogId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Step 1: Protocol
  const [selectedPeptides, setSelectedPeptides] = useState<string[]>([]);
  const [peptideSearch, setPeptideSearch] = useState("");
  const [vendorSlug, setVendorSlug] = useState("");
  const [doseMcg, setDoseMcg] = useState("");
  const [frequency, setFrequency] = useState("");
  const [route, setRoute] = useState("");
  const [durationWeeks, setDurationWeeks] = useState(8);
  const [goalSlug, setGoalSlug] = useState("");
  const [startDate, setStartDate] = useState("");

  // Step 2: Outcome
  const [efficacy, setEfficacy] = useState(5);
  const [sideEffectScore, setSideEffectScore] = useState(3);
  const [wouldRepeat, setWouldRepeat] = useState<boolean | null>(null);
  const [outcomeText, setOutcomeText] = useState("");
  const [sideEffects, setSideEffects] = useState<string[]>([]);

  const filteredPeptides = useMemo(() => {
    if (!peptideSearch.trim()) return [];
    const q = peptideSearch.toLowerCase();
    return peptides.filter(p => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)).slice(0, 8);
  }, [peptideSearch]);

  const addPeptide = (slug: string) => {
    if (!selectedPeptides.includes(slug)) setSelectedPeptides([...selectedPeptides, slug]);
    setPeptideSearch("");
  };

  const toggleSideEffect = (se: string) => {
    setSideEffects(prev => prev.includes(se) ? prev.filter(x => x !== se) : [...prev, se]);
  };

  const canAdvance = (s: Step): boolean => {
    if (s === 1) return selectedPeptides.length > 0 && !!vendorSlug;
    if (s === 2) return efficacy >= 1 && sideEffectScore >= 1 && wouldRepeat !== null;
    return true;
  };

  const handleSubmit = async () => {
    if (!user) { setShowAuth(true); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/protocol-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          peptide_slugs: selectedPeptides,
          vendor_slug: vendorSlug,
          dose_mcg: doseMcg ? parseInt(doseMcg) : null,
          frequency: frequency || null,
          route: route || null,
          duration_weeks: durationWeeks,
          goal_slug: goalSlug || null,
          efficacy_score: efficacy,
          side_effect_score: sideEffectScore,
          would_repeat: wouldRepeat,
          outcome_text: outcomeText || null,
          side_effects_noted: sideEffects,
          protocol_start_date: startDate || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Submission failed"); setSubmitting(false); return; }
      setSubmittedLogId(data.id);
      setSubmitted(true);
    } catch { setError("Network error"); }
    setSubmitting(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-mute)" }}>LOADING...</div>
    </div>
  );

  if (submitted) return (
    <div style={{ background: "var(--bg)" }}>
      <div className="page-header"><div className="page-header-grid" /><div className="page-header-wrap">
        <h1 className="page-title">Protocol <em>Logged</em></h1>
        <p className="page-subtitle">Thank you for contributing to the peptide research community.</p>
      </div></div>
      <div className="about-content" style={{ maxWidth: 700, paddingTop: 40 }}>
        <div className="text-center">
          <div className="text-5xl mb-6">🧪</div>
          <p style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--ink)", fontWeight: 300 }}>
            Your protocol log is now live and contributing to aggregate data.
          </p>
        </div>

        {submittedLogId && (
          <div className="mt-8 rounded-xl p-6" style={{ background: "var(--bg-card)", border: "1px solid var(--line)" }}>
            <p style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>
              📸 Upload your receipt to earn the <span style={{ color: "var(--green)" }}>Verified Buyer</span> badge
            </p>
            <ReceiptUpload logId={submittedLogId} vendorSlug={vendorSlug} />
          </div>
        )}

        <div className="flex gap-4 justify-center mt-8 flex-wrap">
          <Link href="/profile" className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)", color: "#0a0a0b", fontFamily: "var(--sans)", fontSize: 14 }}>
            View Your Profile →
          </Link>
          <button onClick={() => { setSubmitted(false); setSubmittedLogId(null); setStep(1); setSelectedPeptides([]); setVendorSlug(""); setEfficacy(5); setSideEffectScore(3); setWouldRepeat(null); setOutcomeText(""); setSideEffects([]); }}
            className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
            style={{ background: "var(--bg-card)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontFamily: "var(--sans)", fontSize: 14 }}>
            Log Another Protocol
          </button>
        </div>
      </div>
    </div>
  );

  const cardStyle = { background: "var(--bg-card)", border: "1px solid var(--line)", borderRadius: 12, padding: 24 };
  const labelStyle = { fontFamily: "var(--sans)" as const, fontSize: 13, color: "var(--ink-dim)", fontWeight: 500 as const, display: "block" as const, marginBottom: 6 };
  const inputStyle = { background: "var(--bg-soft)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontFamily: "var(--sans)", borderRadius: 8, padding: "10px 14px", width: "100%", fontSize: 14, outline: "none" };
  const chipStyle = (active: boolean) => ({ padding: "8px 16px", borderRadius: 8, fontSize: 13, fontFamily: "var(--sans)", fontWeight: 500, cursor: "pointer", transition: "all 0.15s", border: "1px solid", borderColor: active ? "var(--gold)" : "var(--line-strong)", background: active ? "rgba(201,169,97,0.15)" : "var(--bg-soft)", color: active ? "var(--gold)" : "var(--ink-dim)" });

  return (
    <div style={{ background: "var(--bg)" }}>
      <div className="page-header"><div className="page-header-grid" /><div className="page-header-wrap">
        <nav className="breadcrumb"><Link href="/">Home</Link><span className="sep">/</span><span className="current">Log Protocol</span></nav>
        <h1 className="page-title">Log Your <em>Protocol</em></h1>
        <p className="page-subtitle">Share your peptide protocol outcomes with the research community.</p>
      </div></div>

      <div className="about-content" style={{ maxWidth: 700 }}>
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {[1,2,3,4].map(s => (
            <React.Fragment key={s}>
              <div className="flex items-center justify-center rounded-full text-xs font-bold" style={{ width: 32, height: 32, fontFamily: "var(--sans)", background: step >= s ? "var(--gold)" : "var(--bg-card)", color: step >= s ? "#0a0a0b" : "var(--ink-mute)", border: `1px solid ${step >= s ? "var(--gold)" : "var(--line)"}`, transition: "all 0.2s" }}>{s}</div>
              {s < 4 && <div className="flex-1 h-px" style={{ background: step > s ? "var(--gold)" : "var(--line)", transition: "all 0.2s" }} />}
            </React.Fragment>
          ))}
        </div>
        <div className="mb-6" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-mute)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {step === 1 ? "Step 1 · Protocol Details" : step === 2 ? "Step 2 · Outcomes" : step === 3 ? "Step 3 · Verification" : "Step 4 · Review & Submit"}
        </div>

        {/* STEP 1: Protocol */}
        {step === 1 && (
          <div className="space-y-6">
            <div style={cardStyle}>
              <label style={labelStyle}>Peptide(s) used *</label>
              <div className="relative">
                <input type="text" value={peptideSearch} onChange={e => setPeptideSearch(e.target.value)} placeholder="Search peptides..." style={inputStyle} />
                {filteredPeptides.length > 0 && (
                  <div className="absolute z-10 left-0 right-0 mt-1 rounded-lg overflow-hidden max-h-48 overflow-y-auto" style={{ background: "var(--bg-card)", border: "1px solid var(--line-strong)" }}>
                    {filteredPeptides.map(p => (
                      <button key={p.slug} onClick={() => addPeptide(p.slug)} className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors" style={{ color: "var(--ink)", fontFamily: "var(--sans)" }}>{p.name}</button>
                    ))}
                  </div>
                )}
              </div>
              {selectedPeptides.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedPeptides.map(slug => (
                    <span key={slug} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(201,169,97,0.15)", color: "var(--gold)", fontFamily: "var(--sans)" }}>
                      {peptides.find(p => p.slug === slug)?.name || slug}
                      <button onClick={() => setSelectedPeptides(prev => prev.filter(s => s !== slug))} className="ml-1 opacity-60 hover:opacity-100">×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={cardStyle}>
              <label style={labelStyle}>Vendor *</label>
              <div className="flex flex-wrap gap-2">
                {vendors.map(v => (
                  <button key={v.slug} onClick={() => setVendorSlug(v.slug)} style={chipStyle(vendorSlug === v.slug)}>{v.name}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div style={cardStyle}>
                <label style={labelStyle}>Dose (mcg)</label>
                <input type="number" value={doseMcg} onChange={e => setDoseMcg(e.target.value)} placeholder="e.g. 250" style={inputStyle} />
              </div>
              <div style={cardStyle}>
                <label style={labelStyle}>Duration (weeks)</label>
                <input type="range" min={1} max={24} value={durationWeeks} onChange={e => setDurationWeeks(parseInt(e.target.value))} className="w-full accent-amber-500" />
                <div style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--gold)", textAlign: "center", marginTop: 4 }}>{durationWeeks} weeks</div>
              </div>
            </div>

            <div style={cardStyle}>
              <label style={labelStyle}>Frequency</label>
              <div className="flex flex-wrap gap-2">
                {FREQUENCIES.map(f => (<button key={f} onClick={() => setFrequency(f)} style={chipStyle(frequency === f)}>{f.replace(/_/g, "/")}</button>))}
              </div>
            </div>

            <div style={cardStyle}>
              <label style={labelStyle}>Route of administration</label>
              <div className="flex flex-wrap gap-2">
                {ROUTES.map(r => (<button key={r} onClick={() => setRoute(r)} style={chipStyle(route === r)}>{r.toUpperCase()}</button>))}
              </div>
            </div>

            <div style={cardStyle}>
              <label style={labelStyle}>Goal (optional)</label>
              <div className="flex flex-wrap gap-2">
                {goals.map(g => (<button key={g.id} onClick={() => setGoalSlug(goalSlug === g.id ? "" : g.id)} style={chipStyle(goalSlug === g.id)}>{g.icon} {g.label}</button>))}
              </div>
            </div>

            <div style={cardStyle}>
              <label style={labelStyle}>Protocol start date (optional)</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ ...inputStyle, maxWidth: 220 }} />
            </div>
          </div>
        )}

        {/* STEP 2: Outcomes */}
        {step === 2 && (
          <div className="space-y-6">
            <div style={cardStyle}>
              <label style={labelStyle}>Efficacy *</label>
              <input type="range" min={1} max={10} value={efficacy} onChange={e => setEfficacy(parseInt(e.target.value))} className="w-full accent-amber-500" />
              <div className="flex justify-between mt-1" style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)" }}>
                <span>No effect</span><span style={{ color: "var(--gold)", fontSize: 18, fontWeight: 700 }}>{efficacy}/10</span><span>Dramatic improvement</span>
              </div>
            </div>

            <div style={cardStyle}>
              <label style={labelStyle}>Side Effect Severity *</label>
              <input type="range" min={1} max={10} value={sideEffectScore} onChange={e => setSideEffectScore(parseInt(e.target.value))} className="w-full accent-amber-500" />
              <div className="flex justify-between mt-1" style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)" }}>
                <span>None</span><span style={{ color: sideEffectScore <= 3 ? "var(--green)" : "var(--amber)", fontSize: 18, fontWeight: 700 }}>{sideEffectScore}/10</span><span>Severe</span>
              </div>
            </div>

            <div style={cardStyle}>
              <label style={labelStyle}>Side effects experienced</label>
              <div className="flex flex-wrap gap-2">
                {COMMON_SIDE_EFFECTS.map(se => (<button key={se} onClick={() => toggleSideEffect(se)} style={chipStyle(sideEffects.includes(se))}>{se.replace(/_/g, " ")}</button>))}
              </div>
            </div>

            <div style={cardStyle}>
              <label style={labelStyle}>Would you repeat this protocol? *</label>
              <div className="flex gap-3">
                <button onClick={() => setWouldRepeat(true)} style={{ ...chipStyle(wouldRepeat === true), flex: 1, textAlign: "center" as const }}>✓ Yes</button>
                <button onClick={() => setWouldRepeat(false)} style={{ ...chipStyle(wouldRepeat === false), flex: 1, textAlign: "center" as const }}>✗ No</button>
              </div>
            </div>

            <div style={cardStyle}>
              <label style={labelStyle}>Additional notes (optional, 2000 chars max)</label>
              <textarea value={outcomeText} onChange={e => setOutcomeText(e.target.value.slice(0, 2000))} rows={4} placeholder="What did you notice? Any specific outcomes worth sharing?"
                style={{ ...inputStyle, resize: "vertical" as const }} />
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", textAlign: "right" as const, marginTop: 4 }}>{outcomeText.length}/2000</div>
            </div>
          </div>
        )}

        {/* STEP 3: Verification */}
        {step === 3 && (
          <div className="space-y-6">
            <div style={cardStyle}>
              <div className="text-center py-4">
                <div className="text-4xl mb-4">📸</div>
                <p style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--ink)", fontWeight: 300 }}>Receipt Verification</p>
                <p className="mt-2" style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-dim)" }}>
                  After submitting, you&apos;ll be able to upload your vendor receipt to earn the <strong style={{ color: "var(--green)" }}>Verified Buyer</strong> badge.
                  Images are OCR&apos;d for vendor name + date, then <strong>permanently discarded</strong> — never stored.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: "📤", label: "Upload receipt", desc: "JPEG, PNG, or WebP" },
                  { icon: "🔍", label: "OCR scan", desc: "Vendor + date extracted" },
                  { icon: "✅", label: "Badge earned", desc: "Verified Buyer status" },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 rounded-lg" style={{ background: "var(--bg-soft)" }}>
                    <div className="text-xl">{s.icon}</div>
                    <div style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>{s.label}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--ink-mute)", marginTop: 2 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg" style={{ background: "rgba(127,183,126,0.08)", border: "1px solid rgba(127,183,126,0.2)" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--green)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                ✓ You can skip this step. Upload a receipt after submission or from your profile.
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <div style={cardStyle}>
              <h3 style={{ fontFamily: "var(--sans)", fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}>Review Your Protocol Log</h3>
              <div className="space-y-3" style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-dim)" }}>
                <div className="flex justify-between"><span>Peptide(s)</span><span style={{ color: "var(--gold)" }}>{selectedPeptides.map(s => peptides.find(p => p.slug === s)?.name || s).join(" + ")}</span></div>
                <div className="flex justify-between"><span>Vendor</span><span style={{ color: "var(--ink)" }}>{vendors.find(v => v.slug === vendorSlug)?.name}</span></div>
                {doseMcg && <div className="flex justify-between"><span>Dose</span><span>{doseMcg} mcg</span></div>}
                {frequency && <div className="flex justify-between"><span>Frequency</span><span>{frequency}</span></div>}
                {route && <div className="flex justify-between"><span>Route</span><span>{route.toUpperCase()}</span></div>}
                <div className="flex justify-between"><span>Duration</span><span>{durationWeeks} weeks</span></div>
                <hr style={{ borderColor: "var(--line)" }} />
                <div className="flex justify-between"><span>Efficacy</span><span style={{ color: "var(--gold)", fontWeight: 700 }}>{efficacy}/10</span></div>
                <div className="flex justify-between"><span>Side Effects</span><span style={{ color: sideEffectScore <= 3 ? "var(--green)" : "var(--amber)", fontWeight: 700 }}>{sideEffectScore}/10</span></div>
                <div className="flex justify-between"><span>Would Repeat</span><span style={{ color: wouldRepeat ? "var(--green)" : "var(--ink-mute)" }}>{wouldRepeat ? "Yes" : "No"}</span></div>
                {outcomeText && <div className="pt-2 border-t" style={{ borderColor: "var(--line)" }}><p className="text-sm italic" style={{ color: "var(--ink-dim)" }}>&quot;{outcomeText.substring(0, 150)}{outcomeText.length > 150 ? "..." : ""}&quot;</p></div>}
              </div>
            </div>

            {!user && (
              <div className="p-4 rounded-lg" style={{ background: "rgba(201,169,97,0.08)", border: "1px solid rgba(201,169,97,0.2)" }}>
                <p style={{ fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink-dim)" }}>
                  You need to sign in to submit. <button onClick={() => setShowAuth(true)} className="underline" style={{ color: "var(--gold)" }}>Sign in now →</button>
                </p>
              </div>
            )}

            {error && <div className="p-3 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}><p style={{ color: "#ef4444", fontFamily: "var(--sans)", fontSize: 13 }}>{error}</p></div>}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t" style={{ borderColor: "var(--line)" }}>
          {step > 1 ? (
            <button onClick={() => setStep((step - 1) as Step)} className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-[1.02]" style={{ background: "var(--bg-card)", border: "1px solid var(--line-strong)", color: "var(--ink)", fontFamily: "var(--sans)", fontSize: 14 }}>
              ← Back
            </button>
          ) : <div />}

          {step < 4 ? (
            <button onClick={() => setStep((step + 1) as Step)} disabled={!canAdvance(step)} className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: canAdvance(step) ? "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)" : "var(--bg-card)", color: canAdvance(step) ? "#0a0a0b" : "var(--ink-mute)", fontFamily: "var(--sans)", fontSize: 14 }}>
              Continue →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting || !user} className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02] disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)", color: "#0a0a0b", fontFamily: "var(--sans)", fontSize: 14 }}>
              {submitting ? "Submitting..." : "Submit Protocol Log"}
            </button>
          )}
        </div>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} context="submit your protocol log" onAuthenticated={() => setShowAuth(false)} />
    </div>
  );
}
