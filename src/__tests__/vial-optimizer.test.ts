/**
 * vial-optimizer.test.ts
 * ======================
 * Unit tests for the vial optimizer — the engine behind the "Build a vendor
 * cart" section on /tools/pricing. The user picks a peptide and a total
 * quantity (mg); the optimizer works out how many vials each vendor needs to
 * ship and ranks vendors by price after the PEPTIDEX discount.
 *
 * Tests are pinned to real vendor-pricing.ts data so any upstream
 * price/discount change that breaks math will surface here.
 *
 *   TC-01  Single peptide, single vendor
 *   TC-02  Single peptide, multi-vendor — sort order
 *   TC-03  Multi-peptide cart — independent math + rollup
 *   TC-04  Vial rounding — whole vials only, no hidden overage
 *   TC-05  Vendor missing a peptide — graceful exclusion
 *   TC-06  Per-vendor discount rates (one assertion per vendor)
 *   TC-07  Edge: zero / negative quantity
 *   TC-08  Edge: peptide carried by exactly 1 vendor
 *   TC-09  Action URLs — deep links and affiliate roots
 *   TC-10  Cartable peptide list
 */

import { describe, test, expect } from "vitest";
import { optimizeVials, optimizeCartVials, getCartablePeptides } from "@/lib/vial-optimizer";

// ─── Shared helper ────────────────────────────────────────────────────────────

/** Round to 2 decimal places (matches optimizer's parseFloat toFixed(2)) */
const r2 = (n: number) => parseFloat(n.toFixed(2));

// ─── TC-01: Single peptide, single vendor ─────────────────────────────────────
//
// BPC-157 from Amino Club, 20 mg requested:
//   vial size = 10 mg → ceil(20/10) = 2 vials
//   subtotal raw = 2 × $39.99 = $79.98
//   discounted (20%) = $79.98 × 0.80 = $63.984 → $63.98

describe("TC-01 — Single peptide, single vendor (BPC-157 / Amino Club, 20 mg)", () => {
  const result = optimizeVials({
    peptideSlug: "bpc-157",
    peptideName: "BPC-157",
    quantityMg: 20,
  });

  const aminoPlan = result.vendorPlans.find((p) => p.vendorSlug === "amino-club");

  test("finds Amino Club plan", () => {
    expect(aminoPlan).toBeDefined();
  });

  test("echoes requested quantityMg", () => {
    expect(result.quantityMg).toBe(20);
  });

  test("vialsNeeded = ceil(20 / 10) = 2", () => {
    expect(aminoPlan!.vialsNeeded).toBe(2);
  });

  test("subtotal raw = 2 × $39.99 = $79.98", () => {
    expect(aminoPlan!.subtotal).toBe(79.98);
  });

  test("discountPercent = 20 (Amino Club canonical rate)", () => {
    expect(aminoPlan!.discountPercent).toBe(20);
  });

  test("subtotalAfterDiscount = $79.98 × 0.80 = $63.98", () => {
    expect(aminoPlan!.subtotalAfterDiscount).toBe(r2(79.98 * 0.80));
  });
});

// ─── TC-02: Single peptide, multi-vendor — sort order ─────────────────────────
//
// BPC-157 carried by several vendors in vendor-pricing.ts.
// For 20 mg, expected discounted subtotals:
//   Elyria Bio:       2 × $29.99 × 0.90 = $53.98  (10mg vials; prices checked 2026-11-02)
//   Amino Club:       2 × $39.99 × 0.80 = $63.98  (10mg vials)
//   Bio Longevity:    2 × $99.97 × 0.85 = $169.95 (10mg vials)
//   Limitless Life:   4 × $49.99 × 0.85 = $169.97 (5mg vials → ceil(20/5)=4)
//
// Sort must be strictly ascending by discountedTotal.

describe("TC-02 — Single peptide, multi-vendor — cost-ascending sort (BPC-157, 20 mg)", () => {
  const result = optimizeVials({
    peptideSlug: "bpc-157",
    peptideName: "BPC-157",
    quantityMg: 20,
  });

  test("returns at least 2 vendor plans", () => {
    expect(result.vendorPlans.length).toBeGreaterThanOrEqual(2);
  });

  test("vendor plans are sorted by subtotalAfterDiscount ascending", () => {
    const costs = result.vendorPlans.map((p) => p.subtotalAfterDiscount);
    for (let i = 1; i < costs.length; i++) {
      expect(costs[i]).toBeGreaterThanOrEqual(costs[i - 1]);
    }
  });

  test("Elyria Bio is cheapest, then Amino Club (lowest discounted subtotals)", () => {
    expect(result.vendorPlans[0].vendorSlug).toBe("elyria-bio");
    expect(result.vendorPlans[1].vendorSlug).toBe("amino-club");
  });

  test("Limitless Life uses 5mg vials → needs 4 vials (not 2)", () => {
    const limitless = result.vendorPlans.find((p) => p.vendorSlug === "limitless-life");
    expect(limitless).toBeDefined();
    expect(limitless!.vialSizeMg).toBe(5);
    expect(limitless!.vialsNeeded).toBe(4); // ceil(20 / 5)
  });
});

// ─── TC-03: Multi-peptide cart — independent math + rollup ───────────────────
//
// BPC-157 (20 mg) + TB-500 (40 mg)
//   Amino Club TB-500: 10mg vials → ceil(40/10) = 4 vials
//
// Totals should aggregate per-vendor across both peptides, not collapse them.

describe("TC-03 — Multi-peptide cart — independent vial math + vendor rollup", () => {
  const { results, vendorTotals } = optimizeCartVials([
    { peptideSlug: "bpc-157", peptideName: "BPC-157", quantityMg: 20 },
    { peptideSlug: "tb-500", peptideName: "TB-500", quantityMg: 40 },
  ]);

  test("returns exactly 2 peptide results", () => {
    expect(results).toHaveLength(2);
  });

  test("each result keeps its own quantityMg", () => {
    expect(results.find((r) => r.peptideSlug === "bpc-157")!.quantityMg).toBe(20);
    expect(results.find((r) => r.peptideSlug === "tb-500")!.quantityMg).toBe(40);
  });

  test("TB-500 Amino Club: 4 vials at 10mg", () => {
    const tb = results.find((r) => r.peptideSlug === "tb-500")!;
    const aminoPlan = tb.vendorPlans.find((p) => p.vendorSlug === "amino-club");
    expect(aminoPlan).toBeDefined();
    expect(aminoPlan!.vialsNeeded).toBe(4);
    expect(aminoPlan!.vialSizeMg).toBe(10);
  });

  test("vendorTotals contains Amino Club entry covering both peptides", () => {
    const amino = vendorTotals.find((v) => v.vendorSlug === "amino-club");
    expect(amino).toBeDefined();
    expect(amino!.peptideCount).toBe(2);
  });

  test("Amino Club total = BPC-157 subtotal + TB-500 subtotal (pre-discount)", () => {
    const bpc = results.find((r) => r.peptideSlug === "bpc-157")!;
    const tb = results.find((r) => r.peptideSlug === "tb-500")!;
    const bpcAmino = bpc.vendorPlans.find((p) => p.vendorSlug === "amino-club")!;
    const tbAmino = tb.vendorPlans.find((p) => p.vendorSlug === "amino-club")!;
    const amino = vendorTotals.find((v) => v.vendorSlug === "amino-club")!;
    expect(amino.total).toBeCloseTo(bpcAmino.subtotal + tbAmino.subtotal, 2);
  });

  test("Amino Club discountedTotal = total × 0.80", () => {
    const amino = vendorTotals.find((v) => v.vendorSlug === "amino-club")!;
    expect(amino.totalAfterDiscount).toBeCloseTo(r2(amino.total * 0.80), 2);
  });

  test("vendorTotals sorted ascending by totalAfterDiscount", () => {
    const costs = vendorTotals.map((v) => v.totalAfterDiscount);
    for (let i = 1; i < costs.length; i++) {
      expect(costs[i]).toBeGreaterThanOrEqual(costs[i - 1]);
    }
  });
});

// ─── TC-04: Vial rounding ─────────────────────────────────────────────────────
//
// The optimizer rounds up to whole vials and adds nothing else:
//   20 mg at 10mg vials → exactly 2 (no overage)
//   25 mg at 10mg vials → 3;  at 5mg vials → 5

describe("TC-04 — Vial rounding: whole vials, no hidden overage", () => {
  test("exact multiple of vial size → no extra vial (20 mg → 2 × 10mg)", () => {
    const result = optimizeVials({ peptideSlug: "bpc-157", peptideName: "BPC-157", quantityMg: 20 });
    const amino = result.vendorPlans.find((p) => p.vendorSlug === "amino-club")!;
    expect(amino.vialsNeeded).toBe(2);
  });

  test("partial vial rounds up (25 mg → 3 × 10mg)", () => {
    const result = optimizeVials({ peptideSlug: "bpc-157", peptideName: "BPC-157", quantityMg: 25 });
    const amino = result.vendorPlans.find((p) => p.vendorSlug === "amino-club")!;
    expect(amino.vialsNeeded).toBe(3);
  });

  test("smaller vials scale independently (25 mg → 5 × 5mg at Limitless)", () => {
    const result = optimizeVials({ peptideSlug: "bpc-157", peptideName: "BPC-157", quantityMg: 25 });
    const limitless = result.vendorPlans.find((p) => p.vendorSlug === "limitless-life")!;
    expect(limitless.vialsNeeded).toBe(5);
  });

  test("every plan covers at least the requested quantity", () => {
    const result = optimizeVials({ peptideSlug: "bpc-157", peptideName: "BPC-157", quantityMg: 17 });
    result.vendorPlans.forEach((plan) => {
      expect(plan.vialsNeeded * plan.vialSizeMg).toBeGreaterThanOrEqual(17);
      expect((plan.vialsNeeded - 1) * plan.vialSizeMg).toBeLessThan(17);
    });
  });
});

// ─── TC-05: Vendor missing a peptide — graceful exclusion ─────────────────────
//
// Vendors without a pricing entry for a peptide must be excluded silently —
// no nulls, no zero-cost rows.

describe("TC-05 — Vendor missing a peptide is excluded (CJC-1295 single-vendor)", () => {
  const result = optimizeVials({
    peptideSlug: "cjc-1295",
    peptideName: "CJC-1295",
    quantityMg: 10,
  });

  test("does not crash", () => {
    expect(result).toBeDefined();
  });

  test("all vendorPlans have price > 0 (no zero/null rows)", () => {
    result.vendorPlans.forEach((plan) => {
      expect(plan.pricePerVial).toBeGreaterThan(0);
      expect(plan.subtotal).toBeGreaterThan(0);
      expect(plan.vialsNeeded).toBeGreaterThan(0);
    });
  });

  test("no undefined or null values in vendorPlans", () => {
    result.vendorPlans.forEach((plan) => {
      expect(plan.vendorSlug).toBeTruthy();
      expect(plan.vendorName).toBeTruthy();
      expect(plan.subtotalAfterDiscount).not.toBeNaN();
    });
  });

  test("unknown peptide → noVendorsAvailable", () => {
    const unknown = optimizeVials({ peptideSlug: "not-a-peptide", peptideName: "Not A Peptide", quantityMg: 10 });
    expect(unknown.noVendorsAvailable).toBe(true);
    expect(unknown.vendorPlans).toHaveLength(0);
  });
});

// ─── TC-06: Per-vendor discount rates ─────────────────────────────────────────
//
// One assertion per vendor confirming the correct discount % applies.
// Source of truth: vendor-cart-config.ts
// Amino Club: 20%, Ascension: 15%, Bio Longevity: 15%, Limitless: 15%, Pantheon: 10%
// BPC-157 chosen because it has the most vendor coverage.
//
// NOTE: "Ascension Peptides: 15% discount" also fails on main — Ascension is
// deactivated (isActive: false) so its plan is filtered out. Kept unchanged
// so the behaviour stays visible.

describe("TC-06 — Per-vendor discount rates match vendor-cart-config.ts registry", () => {
  const result = optimizeVials({
    peptideSlug: "bpc-157",
    peptideName: "BPC-157",
    quantityMg: 20,
  });

  const planFor = (slug: string) => result.vendorPlans.find((p) => p.vendorSlug === slug);

  test("Amino Club: 20% discount", () => {
    expect(planFor("amino-club")?.discountPercent).toBe(20);
  });

  test("Ascension Peptides: 15% discount", () => {
    expect(planFor("ascension-peptides")?.discountPercent).toBe(15);
  });

  test("Bio Longevity Labs: 15% discount", () => {
    expect(planFor("bio-longevity-labs")?.discountPercent).toBe(15);
  });

  test("Limitless Life: 15% discount", () => {
    expect(planFor("limitless-life")?.discountPercent).toBe(15);
  });

  // Pantheon not in BPC-157 pricing — use a peptide they carry or skip gracefully
  test("Pantheon Peptides: 10% discount (if they carry BPC-157) or plan is absent", () => {
    const pantheon = planFor("pantheon-peptides");
    if (pantheon) {
      expect(pantheon.discountPercent).toBe(10);
    } else {
      // Not in pricing data — acceptable, confirm no stale 0% row
      expect(pantheon).toBeUndefined();
    }
  });

  test("discount math: subtotalAfterDiscount = subtotal × (1 - discountPercent/100)", () => {
    result.vendorPlans.forEach((plan) => {
      const expected = r2(plan.subtotal * (1 - plan.discountPercent / 100));
      expect(plan.subtotalAfterDiscount).toBeCloseTo(expected, 2);
    });
  });

  test("every plan carries a discountDisplay string", () => {
    result.vendorPlans.forEach((plan) => {
      expect(plan.discountDisplay.length).toBeGreaterThan(0);
    });
  });
});

// ─── TC-07: Edge case — zero / negative quantity ──────────────────────────────

describe("TC-07 — Edge: zero or negative quantity does not crash", () => {
  test("returns without throwing", () => {
    expect(() =>
      optimizeVials({ peptideSlug: "bpc-157", peptideName: "BPC-157", quantityMg: 0 })
    ).not.toThrow();
  });

  test("zero quantity → 0 vials and $0 at every vendor", () => {
    const result = optimizeVials({ peptideSlug: "bpc-157", peptideName: "BPC-157", quantityMg: 0 });
    expect(result.quantityMg).toBe(0);
    result.vendorPlans.forEach((plan) => {
      expect(plan.vialsNeeded).toBe(0);
      expect(plan.subtotal).toBe(0);
    });
  });

  test("negative quantity is clamped to 0", () => {
    const result = optimizeVials({ peptideSlug: "bpc-157", peptideName: "BPC-157", quantityMg: -10 });
    expect(result.quantityMg).toBe(0);
  });
});

// ─── TC-08: Edge case — peptide carried by exactly 1 vendor ──────────────────
//
// CJC-1295 has only Amino Club in vendor-pricing.ts.
// Sort must not fail, no empty vendorTotals, no crashes.

describe("TC-08 — Edge: peptide carried by exactly 1 vendor — sort does not fail", () => {
  const { results, vendorTotals, cheapestVendor } = optimizeCartVials([
    { peptideSlug: "cjc-1295", peptideName: "CJC-1295", quantityMg: 10 },
  ]);

  test("returns 1 peptide result", () => {
    expect(results).toHaveLength(1);
  });

  test("vendorTotals has exactly 1 entry", () => {
    expect(vendorTotals).toHaveLength(1);
  });

  test("cheapestVendor is not null", () => {
    expect(cheapestVendor).not.toBeNull();
  });

  test("single vendor plan is Amino Club", () => {
    expect(vendorTotals[0].vendorSlug).toBe("amino-club");
  });

  test("totalAfterDiscount < total (discount applied)", () => {
    const v = vendorTotals[0];
    expect(v.totalAfterDiscount).toBeLessThan(v.total);
  });

  test("empty cart → no vendors, cheapestVendor null", () => {
    const empty = optimizeCartVials([]);
    expect(empty.results).toHaveLength(0);
    expect(empty.vendorTotals).toHaveLength(0);
    expect(empty.cheapestVendor).toBeNull();
  });
});

// ─── TC-09: Action URLs — deep links and affiliate roots ─────────────────────
//
// Amino Club (Tier 2, mapped product) → product deep link.
// Phase 1B vendors (Limitless, Bio Longevity) → affiliateRootUrl from
// vendor-cart-config.ts.

describe("TC-09 — Action URLs for cart / deep-link / affiliate CTAs", () => {
  const result = optimizeVials({ peptideSlug: "bpc-157", peptideName: "BPC-157", quantityMg: 10 });
  const planFor = (slug: string) => result.vendorPlans.find((p) => p.vendorSlug === slug);

  test("Amino Club → deeplink to the mapped product page", () => {
    const amino = planFor("amino-club")!;
    expect(amino.actionType).toBe("deeplink");
    expect(amino.actionUrl).toBe("https://www.aminoclub.com/us/products/bpc-157");
  });

  test("Limitless Life (Phase 1B) → affiliate root URL", () => {
    const limitless = planFor("limitless-life")!;
    expect(limitless.actionType).toBe("affiliate");
    expect(limitless.actionUrl).toBe("https://www.kb6dp3dq.com/PEPTIDEX/");
  });

  test("Bio Longevity Labs (Phase 1B) → affiliate root URL", () => {
    const bio = planFor("bio-longevity-labs")!;
    expect(bio.actionType).toBe("affiliate");
    expect(bio.actionUrl).toBe("https://go.biolongevitylabs.com/aff_c?offer_id=1&aff_id=2443");
  });

  test("every plan has a non-empty action URL", () => {
    result.vendorPlans.forEach((plan) => {
      expect(plan.actionUrl).toBeTruthy();
    });
  });
});

// ─── TC-10: Cartable peptide list ─────────────────────────────────────────────

describe("TC-10 — getCartablePeptides()", () => {
  const list = getCartablePeptides();

  test("is non-empty and sorted by name", () => {
    expect(list.length).toBeGreaterThan(0);
    const names = list.map((p) => p.name);
    expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names);
  });

  test("BPC-157 is listed with its in-stock vial sizes ascending", () => {
    const bpc = list.find((p) => p.slug === "bpc-157");
    expect(bpc).toBeDefined();
    expect(bpc!.vialSizesMg).toEqual(expect.arrayContaining([5, 10]));
    const sorted = [...bpc!.vialSizesMg].sort((a, b) => a - b);
    expect(bpc!.vialSizesMg).toEqual(sorted);
  });

  test("every listed peptide has at least one vial size", () => {
    list.forEach((p) => expect(p.vialSizesMg.length).toBeGreaterThan(0));
  });
});
