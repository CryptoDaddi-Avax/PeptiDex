"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  ExternalLink, ShoppingCart, Copy, Check, ChevronDown,
  Mail, Package, Tag, Plus, X,
} from "lucide-react";
import {
  optimizeCartVials,
  getCartablePeptides,
  type VialOptimizationInput,
} from "@/lib/vial-optimizer";
import "./shopping-list.css";

/* ── Props ─────────────────────────────────────────────── */

interface ShoppingListProps {
  /** Peptide preselected in the "add" form (falls back to the first stocked peptide) */
  defaultPeptideSlug?: string;
  /** Optional: max vendors to show (default 5, top by cost) */
  maxVendors?: number;
}

/** One line of the user's cart: a peptide and how many vials of a given size */
interface CartLine {
  peptideSlug: string;
  peptideName: string;
  vialSizeMg: number;
  vials: number;
}

const MAX_VIALS = 50;

/* ── Component ──────────────────────────────────────────── */

export function ShoppingList({ defaultPeptideSlug, maxVendors = 5 }: ShoppingListProps) {
  const cartable = useMemo(() => getCartablePeptides(), []);
  const initialPeptide =
    cartable.find((p) => p.slug === defaultPeptideSlug) ?? cartable[0];

  const [lines, setLines] = useState<CartLine[]>([]);
  const [formSlug, setFormSlug] = useState<string>(initialPeptide?.slug ?? "");
  const [formSize, setFormSize] = useState<number>(initialPeptide?.vialSizesMg[0] ?? 0);
  const [formVials, setFormVials] = useState<number>(1);

  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [overlayVendor, setOverlayVendor] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const formPeptide = cartable.find((p) => p.slug === formSlug);

  // Prefill from ?cart=slug1,slug2 (e.g. linked from the Interaction Checker):
  // one vial of each peptide's smallest stocked size.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("cart");
    if (!param) return;
    const prefill: CartLine[] = [];
    for (const slug of param.split(",")) {
      const p = cartable.find((c) => c.slug === slug.trim());
      if (p && !prefill.some((l) => l.peptideSlug === p.slug)) {
        prefill.push({ peptideSlug: p.slug, peptideName: p.name, vialSizeMg: p.vialSizesMg[0], vials: 1 });
      }
    }
    if (prefill.length > 0) setLines(prefill);
  }, [cartable]);

  // ── Cart editing ──
  const handlePeptideChange = useCallback((slug: string) => {
    setFormSlug(slug);
    const p = cartable.find((c) => c.slug === slug);
    setFormSize(p?.vialSizesMg[0] ?? 0);
  }, [cartable]);

  const addLine = useCallback(() => {
    if (!formPeptide || formSize <= 0) return;
    const vials = Math.min(MAX_VIALS, Math.max(1, Math.floor(formVials) || 1));
    setLines((prev) => {
      const idx = prev.findIndex(
        (l) => l.peptideSlug === formPeptide.slug && l.vialSizeMg === formSize
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], vials: Math.min(MAX_VIALS, next[idx].vials + vials) };
        return next;
      }
      return [
        ...prev,
        { peptideSlug: formPeptide.slug, peptideName: formPeptide.name, vialSizeMg: formSize, vials },
      ];
    });
  }, [formPeptide, formSize, formVials]);

  const removeLine = useCallback((idx: number) => {
    setLines((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const updateLineVials = useCallback((idx: number, vials: number) => {
    const clamped = Math.min(MAX_VIALS, Math.max(1, Math.floor(vials) || 1));
    setLines((prev) => prev.map((l, i) => (i === idx ? { ...l, vials: clamped } : l)));
  }, []);

  // ── Cart lines → VialOptimizationInputs (one per peptide, quantities summed) ──
  const optimizationInputs: VialOptimizationInput[] = useMemo(() => {
    const byPeptide = new Map<string, VialOptimizationInput>();
    for (const l of lines) {
      const mg = l.vialSizeMg * l.vials;
      const existing = byPeptide.get(l.peptideSlug);
      if (existing) existing.quantityMg += mg;
      else byPeptide.set(l.peptideSlug, { peptideSlug: l.peptideSlug, peptideName: l.peptideName, quantityMg: mg });
    }
    return Array.from(byPeptide.values());
  }, [lines]);

  // ── Run optimizer ──
  const { results, vendorTotals } = useMemo(
    () => optimizeCartVials(optimizationInputs),
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
  const handleCartClick = useCallback((plan: typeof vendorTotals[0]) => {
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
          quantityMg: r.quantityMg,
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
  }, [email, vendorTotals, results, getVendorPeptideBreakdown]);


  // ── Guard: nothing stocked ──
  if (cartable.length === 0) return null;

  const visibleVendors = vendorTotals.slice(0, maxVendors);
  const hasCart = lines.length > 0;

  return (
    <div className="shopping-list" id="shopping-list">
      {/* Header */}
      <div className="shopping-list-header">
        <h3 className="shopping-list-title">
          <em>Build</em> a vendor cart
        </h3>
        <span className="shopping-list-subtitle">
          {hasCart
            ? `${results.length} peptide${results.length !== 1 ? "s" : ""} • ${vendorTotals.length} vendor${vendorTotals.length !== 1 ? "s" : ""}`
            : "Pick peptides and vial counts"}
        </span>
      </div>

      {/* Cart builder */}
      <div className="cart-builder" id="cart-builder">
        <label className="cart-builder-field cart-builder-peptide">
          <span className="cart-builder-label">Peptide</span>
          <select
            className="cart-builder-input"
            value={formSlug}
            onChange={(e) => handlePeptideChange(e.target.value)}
            id="cart-builder-peptide"
          >
            {cartable.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </label>
        <label className="cart-builder-field">
          <span className="cart-builder-label">Vial size</span>
          <select
            className="cart-builder-input"
            value={formSize}
            onChange={(e) => setFormSize(Number(e.target.value))}
            id="cart-builder-size"
          >
            {(formPeptide?.vialSizesMg ?? []).map((s) => (
              <option key={s} value={s}>{s} mg</option>
            ))}
          </select>
        </label>
        <label className="cart-builder-field">
          <span className="cart-builder-label">Vials</span>
          <input
            type="number"
            min={1}
            max={MAX_VIALS}
            step={1}
            className="cart-builder-input"
            value={formVials}
            onChange={(e) => setFormVials(Number(e.target.value))}
            onKeyDown={(e) => e.key === "Enter" && addLine()}
            id="cart-builder-vials"
          />
        </label>
        <button
          type="button"
          className="vendor-cta cta-cart cart-builder-add"
          onClick={addLine}
          disabled={!formPeptide || formSize <= 0}
          id="cart-builder-add"
        >
          <Plus size={14} /> Add to cart
        </button>
      </div>

      {hasCart ? (
        <div className="cart-lines">
          {lines.map((l, idx) => (
            <div key={`${l.peptideSlug}-${l.vialSizeMg}`} className="cart-line">
              <span className="cart-line-name">{l.peptideName}</span>
              <span className="cart-line-detail">
                <input
                  type="number"
                  min={1}
                  max={MAX_VIALS}
                  step={1}
                  className="cart-line-qty"
                  value={l.vials}
                  onChange={(e) => updateLineVials(idx, Number(e.target.value))}
                  aria-label={`Number of ${l.vialSizeMg}mg ${l.peptideName} vials`}
                />
                × {l.vialSizeMg}mg vial{l.vials !== 1 ? "s" : ""}
              </span>
              <button
                type="button"
                className="cart-line-remove"
                onClick={() => removeLine(idx)}
                aria-label={`Remove ${l.peptideName}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="cart-empty">
          Add one or more peptides to compare the total cost across vendors, with each
          vendor&apos;s PEPTIDEX discount applied.
        </p>
      )}

      {hasCart && vendorTotals.length === 0 && (
        <p className="cart-empty">No in-stock vendor carries these items right now.</p>
      )}

      {hasCart && vendorTotals.length > 0 && (
        <>
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
                        onClick={() => handleCartClick(vendor)}
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
                Per-Peptide Breakdown (cheapest vendor)
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
                  <span className="pep-detail">{r.quantityMg} mg total</span>
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

          {/* Vial size note */}
          <div className="vial-size-note">
            <strong>Vial sizes differ by vendor.</strong> Each vendor&apos;s total covers at
            least the same total mg as your cart, rounded up to whole vials.
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
        </>
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
