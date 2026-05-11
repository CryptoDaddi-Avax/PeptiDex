"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ExternalLink, ShoppingCart, Copy, Check, ChevronDown,
  Mail, Package, Tag,
} from "lucide-react";
import {
  optimizeCycleVials,
  type VialOptimizationInput,
  type VialOptimizationResult,
  type VendorPlan,
} from "@/lib/vial-optimizer";
import type { CyclePeptideResult } from "@/lib/cycle-engine";
import "./shopping-list.css";

/* ── Props ─────────────────────────────────────────────── */

interface ShoppingListProps {
  /** Cycle results from the cycle planner engine */
  cycleResults: CyclePeptideResult[];
  /** Optional: max vendors to show (default 5, top by cost) */
  maxVendors?: number;
}

/* ── Component ──────────────────────────────────────────── */

export function ShoppingList({ cycleResults, maxVendors = 5 }: ShoppingListProps) {
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [overlayVendor, setOverlayVendor] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // ── Transform CyclePeptideResults → VialOptimizationInputs ──
  const optimizationInputs: VialOptimizationInput[] = useMemo(() =>
    cycleResults.map((r) => ({
      peptideSlug: r.peptideName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      peptideName: r.peptideName,
      doseMcg: r.doseMcg,
      injectionsPerWeek: r.injectionsPerWeek,
      cycleWeeks: r.cycleWeeks,
    })),
    [cycleResults]
  );

  // ── Run optimizer ──
  const { results, vendorTotals } = useMemo(
    () => optimizeCycleVials(optimizationInputs),
    [optimizationInputs]
  );

  // ── Build per-vendor peptide breakdown for overlay ──
  const getVendorPeptideBreakdown = useCallback(
    (vendorSlug: string) => {
      return results
        .map((r) => {
          const plan = r.vendorPlans.find((vp) => vp.vendorSlug === vendorSlug);
          if (!plan) return null;
          return {
            peptideName: r.peptideName,
            vialsNeeded: plan.vialsNeeded,
            vialSizeMg: plan.vialSizeMg,
            subtotal: plan.subtotalAfterDiscount,
          };
        })
        .filter(Boolean) as {
          peptideName: string;
          vialsNeeded: number;
          vialSizeMg: number;
          subtotal: number;
        }[];
    },
    [results]
  );

  // ── Copy list to clipboard ──
  const copyList = useCallback(
    (vendorSlug: string) => {
      const items = getVendorPeptideBreakdown(vendorSlug);
      const vendor = vendorTotals.find((v) => v.vendorSlug === vendorSlug);
      const text = items
        .map((item) => `${item.peptideName} — ${item.vialsNeeded}× (${item.vialSizeMg}mg)`)
        .join("\n");
      const footer = vendor
        ? `\nTotal: $${vendor.totalAfterDiscount.toFixed(2)} (with ${vendor.discountPercent}% off)`
        : "";
      navigator.clipboard.writeText(text + footer);
      setCopiedId(vendorSlug);
      setTimeout(() => setCopiedId(null), 2000);
    },
    [getVendorPeptideBreakdown, vendorTotals]
  );

  // ── CTA handlers ──
  const handleCartClick = useCallback((plan: typeof vendorTotals[0], items: ReturnType<typeof getVendorPeptideBreakdown>) => {
    // For Tier 1 vendors, find the first result with this vendor and open cart URL
    for (const r of results) {
      const vp = r.vendorPlans.find((p) => p.vendorSlug === plan.vendorSlug);
      if (vp?.actionType === "cart") {
        window.open(vp.actionUrl, "_blank", "noopener,noreferrer");
        return;
      }
    }
    // Fallback: affiliate root
    window.open("#", "_blank");
  }, [results]);

  const handleDeeplinkClick = useCallback((vendorSlug: string) => {
    // Open vendor's first product page and show overlay
    for (const r of results) {
      const vp = r.vendorPlans.find((p) => p.vendorSlug === vendorSlug);
      if (vp) {
        window.open(vp.actionUrl, "_blank", "noopener,noreferrer");
        break;
      }
    }
    setOverlayVendor(vendorSlug);
  }, [results]);

  // ── Email handler ──
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailSubmit = useCallback(async () => {
    if (!email || !email.includes("@")) return;
    setEmailLoading(true);
    setEmailError(null);

    try {
      // Build per-vendor item breakdown for the email template
      const emailVendors = vendorTotals.slice(0, 3).map((v) => {
        const items = getVendorPeptideBreakdown(v.vendorSlug);
        // Resolve action URL from the first matching plan
        let actionUrl = "#";
        for (const r of results) {
          const vp = r.vendorPlans.find((p) => p.vendorSlug === v.vendorSlug);
          if (vp) { actionUrl = vp.actionUrl; break; }
        }
        return {
          vendorName: v.vendorName,
          vendorSlug: v.vendorSlug,
          total: v.total,
          totalAfterDiscount: v.totalAfterDiscount,
          discountPercent: v.discountPercent,
          actionUrl,
          actionType: v.actionType,
          items: items.map((it) => ({
            peptideName: it.peptideName,
            vialsNeeded: it.vialsNeeded,
            vialSizeMg: it.vialSizeMg,
            subtotal: it.subtotal,
          })),
        };
      });

      // Build per-peptide summary
      const emailPeptides = results.map((r) => {
        const cheapestPlan = r.vendorPlans[0];
        return {
          peptideName: r.peptideName,
          bufferedMg: r.bufferedMg,
          vialsNeeded: cheapestPlan?.vialsNeeded ?? 0,
          vialSizeMg: cheapestPlan?.vialSizeMg ?? 0,
          cheapestPrice: cheapestPlan?.subtotalAfterDiscount ?? 0,
        };
      });

      const res = await fetch("/api/shopping-list/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          vendors: emailVendors,
          peptides: emailPeptides,
          cycleDuration: cycleResults[0]?.cycleWeeks ?? 0,
          totalPeptides: results.length,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed (${res.status})`);
      }

      setEmailSent(true);
      setEmail("");
      setTimeout(() => setEmailSent(false), 4000);
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Failed to send. Try again.");
      setTimeout(() => setEmailError(null), 5000);
    } finally {
      setEmailLoading(false);
    }
  }, [email, vendorTotals, results, getVendorPeptideBreakdown, cycleResults]);


  // ── Guard: no results ──
  if (cycleResults.length === 0 || vendorTotals.length === 0) return null;

  const visibleVendors = vendorTotals.slice(0, maxVendors);

  return (
    <div className="shopping-list" id="shopping-list">
      {/* Header */}
      <div className="shopping-list-header">
        <h3 className="shopping-list-title">
          <em>Procurement</em> Bridge
        </h3>
        <span className="shopping-list-subtitle">
          {results.length} peptide{results.length !== 1 ? "s" : ""} • {vendorTotals.length} vendor{vendorTotals.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Vendor Cards — sorted by discounted cost ASC */}
      <div className="vendor-cards">
        {visibleVendors.map((vendor, idx) => {
          const isBestDeal = idx === 0;
          const isDeferred = vendor.actionType === "affiliate";
          const items = getVendorPeptideBreakdown(vendor.vendorSlug);
          const totalVials = items.reduce((sum, item) => sum + item.vialsNeeded, 0);

          return (
            <div
              key={vendor.vendorSlug}
              className={`vendor-card${isBestDeal ? " best-deal" : ""}${isDeferred ? " deferred" : ""}`}
              id={`vendor-card-${vendor.vendorSlug}`}
            >
              {/* Left: Info */}
              <div className="vendor-card-info">
                <div className="vendor-card-name">
                  {vendor.vendorName}
                  {vendor.actionType === "cart" && (
                    <span className="vendor-tier-badge tier-1">Cart Pre-fill</span>
                  )}
                  {vendor.actionType === "deeplink" && (
                    <span className="vendor-tier-badge tier-2">Deep Link</span>
                  )}
                </div>

                <div className="vendor-card-meta">
                  <span>
                    <Package size={12} />
                    {totalVials} vial{totalVials !== 1 ? "s" : ""} • {vendor.peptideCount}/{results.length} peptides
                  </span>
                  {vendor.discountPercent > 0 && (
                    <span>
                      <Tag size={12} />
                      {vendor.discountPercent}% off w/ PEPTIDEX
                    </span>
                  )}
                </div>

                {/* CTA */}
                {vendor.actionType === "cart" && (
                  <button
                    className="vendor-cta cta-cart"
                    onClick={() => handleCartClick(vendor, items)}
                    id={`cta-cart-${vendor.vendorSlug}`}
                  >
                    <ShoppingCart size={14} />
                    Build cart at {vendor.vendorName} →
                  </button>
                )}
                {vendor.actionType === "deeplink" && (
                  <button
                    className="vendor-cta cta-deeplink"
                    onClick={() => handleDeeplinkClick(vendor.vendorSlug)}
                    id={`cta-deeplink-${vendor.vendorSlug}`}
                  >
                    <ExternalLink size={14} />
                    Shop at {vendor.vendorName} →
                  </button>
                )}
                {vendor.actionType === "affiliate" && (
                  <span className="vendor-cta cta-deferred">
                    Coming soon — Phase 1B
                  </span>
                )}
              </div>

              {/* Right: Pricing */}
              <div className="vendor-card-cost">
                <span className="vendor-cost-total">
                  ${vendor.totalAfterDiscount.toFixed(2)}
                </span>
                {vendor.discountPercent > 0 && vendor.total !== vendor.totalAfterDiscount && (
                  <>
                    <span className="vendor-cost-original">
                      ${vendor.total.toFixed(2)}
                    </span>
                    <span className="vendor-discount-badge">
                      Save ${(vendor.total - vendor.totalAfterDiscount).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Peptide Breakdown (expandable) */}
      <div className="peptide-breakdown">
        <div
          className="peptide-breakdown-header"
          onClick={() => setBreakdownOpen(!breakdownOpen)}
          id="peptide-breakdown-toggle"
        >
          <span className="peptide-breakdown-title">
            Per-Peptide Vial Requirements (with 10% safety buffer)
          </span>
          <ChevronDown
            size={14}
            className={`peptide-breakdown-toggle${breakdownOpen ? " open" : ""}`}
          />
        </div>
        <div className={`peptide-breakdown-rows${breakdownOpen ? " open" : ""}`}>
          {results.map((r) => (
            <div key={r.peptideSlug} className="peptide-breakdown-row">
              <span className="pep-name">{r.peptideName}</span>
              <span className="pep-detail">{r.bufferedMg.toFixed(1)} mg needed</span>
              <span className="pep-detail">
                {r.vendorPlans.length > 0
                  ? `${r.vendorPlans[0].vialsNeeded}× ${r.vendorPlans[0].vialSizeMg}mg vials`
                  : "No vendors"}
              </span>
              <span className="pep-detail">
                {r.vendorPlans.length > 0
                  ? `from $${r.vendorPlans[0].subtotalAfterDiscount.toFixed(2)}`
                  : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Buffer Note */}
      <div className="safety-buffer-note">
        <strong>10% safety buffer included.</strong> Quantities include a non-negotiable
        10% overage to prevent mid-cycle shortfall from reconstitution loss, dose rounding,
        and vial retention.
      </div>

      {/* Email Capture */}
      <div className="email-capture" id="email-capture">
        <input
          type="email"
          className="email-capture-input"
          placeholder="Email me this shopping list..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
          disabled={emailLoading}
          id="email-capture-input"
        />
        <button
          className="email-capture-btn"
          onClick={handleEmailSubmit}
          disabled={emailSent || emailLoading || !email.includes("@")}
          id="email-capture-btn"
        >
          {emailSent ? (
            <>
              <Check size={14} /> Sent!
            </>
          ) : emailLoading ? (
            <>
              <Mail size={14} className="spin" /> Sending…
            </>
          ) : (
            <>
              <Mail size={14} /> Send List
            </>
          )}
        </button>
      </div>
      {emailError && (
        <div className="email-error" role="alert">{emailError}</div>
      )}


      {/* Deep Link Copy Overlay */}
      {overlayVendor && (
        <div className="copy-overlay" onClick={() => setOverlayVendor(null)}>
          <div className="copy-overlay-card" onClick={(e) => e.stopPropagation()}>
            <h4 className="copy-overlay-title">
              Your shopping list for{" "}
              {vendorTotals.find((v) => v.vendorSlug === overlayVendor)?.vendorName}
            </h4>
            <p className="copy-overlay-sub">
              Add these items manually — then apply your discount code at checkout.
            </p>

            <div className="copy-overlay-list">
              {getVendorPeptideBreakdown(overlayVendor).map((item) => (
                <div key={item.peptideName} className="copy-overlay-item">
                  <span className="item-name">{item.peptideName}</span>
                  <span className="item-qty">
                    {item.vialsNeeded}× ({item.vialSizeMg}mg)
                  </span>
                </div>
              ))}
            </div>

            <div className="copy-overlay-code">
              Use code <strong>PEPTIDEX</strong> at checkout for{" "}
              {vendorTotals.find((v) => v.vendorSlug === overlayVendor)?.discountPercent}% off
            </div>

            <div className="copy-overlay-actions">
              <button
                className="vendor-cta cta-cart"
                onClick={() => copyList(overlayVendor)}
                style={{ flex: 1, justifyContent: "center" }}
              >
                {copiedId === overlayVendor ? (
                  <>
                    <Check size={14} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy list
                  </>
                )}
              </button>
              <button
                className="copy-overlay-close"
                onClick={() => setOverlayVendor(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
