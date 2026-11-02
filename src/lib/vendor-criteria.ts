/**
 * Vendor ranking criteria — the only input to vendor order on PeptiDex
 * =====================================================================
 * Every vendor is scored on the same published criteria (see /vendors and
 * /about/methodology). The inputs are the vendor's own published information
 * (src/data/vendors.ts) and the list prices in src/data/vendor-pricing.ts.
 * PeptiDex does not test products; nothing here is a lab result of ours.
 *
 * Affiliate commission and ownership are NOT inputs. Elyria Bio is owned by
 * PeptiDex's founder and is scored exactly like every other vendor.
 */
import type { Vendor } from "@/data/vendors";
import { vendorPricing } from "@/data/vendor-pricing";

export type CriterionKey = "coa" | "lab" | "price" | "shipping" | "payment" | "returns";

export interface Criterion {
  key: CriterionKey;
  label: string;
  max: number;
  /** How points are awarded — rendered verbatim on /vendors and /about/methodology */
  rule: string;
}

export const RANKING_CRITERIA: Criterion[] = [
  {
    key: "coa",
    label: "COA availability",
    max: 25,
    rule: "Batch-specific Certificate of Analysis published = 25; COA available but not stated to be batch-specific = 15; none = 0.",
  },
  {
    key: "lab",
    label: "Third-party lab testing",
    max: 20,
    rule: "Vendor states its COAs come from an independent third-party lab = 8; plus 4 each for HPLC purity, mass-spec identity (MS or LC-MS) and endotoxin testing listed on the COA.",
  },
  {
    key: "price",
    label: "Price per mg",
    max: 25,
    rule: "Across peptides priced by at least two ranked vendors, the average of (lowest list price per mg ÷ this vendor's list price per mg) × 25. Vendors without checked prices score 0 until their prices are checked.",
  },
  {
    key: "shipping",
    label: "Shipping",
    max: 15,
    rule: "Free-shipping threshold of $75 or less = 8, $100 or less = 6, $150 or less = 4, higher or none = 0; plus 7 if the vendor ships outside the US.",
  },
  {
    key: "payment",
    label: "Payment options",
    max: 10,
    rule: "One payment method = 3, two = 7, three or more = 10.",
  },
  {
    key: "returns",
    label: "Return policy",
    max: 5,
    rule: "Stated money-back guarantee = 5; stated return, refund or replacement policy = 3; none = 0.",
  },
];

export const RANKING_MAX_POINTS = RANKING_CRITERIA.reduce((s, c) => s + c.max, 0);

/** Accurate statement of how rankings relate to money. Used on /vendors, /disclaimers, /legal, /about. */
export const RANKING_DISCLOSURE =
  "Vendor rankings use only the published criteria on our methodology page. PeptiDex earns affiliate commission when you buy through vendor links on this site, and PeptiDex's founder owns Elyria Bio. Neither commission nor ownership is a ranking criterion.";

export interface CriterionScore {
  key: CriterionKey;
  label: string;
  points: number;
  max: number;
  /** The data the points came from, e.g. "Batch-specific COA" */
  basis: string;
}

export interface VendorCriteriaScore {
  total: number;
  max: number;
  parts: CriterionScore[];
}

type ScorableVendor = Pick<
  Vendor,
  "name" | "coaStatus" | "thirdPartyLab" | "testingMethods" | "shippingCost" | "shipsTo" | "paymentMethods" | "returnPolicy"
>;

function scoreCoa(v: ScorableVendor): [number, string] {
  if (/batch-specific/i.test(v.coaStatus)) return [25, v.coaStatus];
  if (/coa/i.test(v.coaStatus)) return [15, v.coaStatus];
  return [0, "No COA stated"];
}

function scoreLab(v: ScorableVendor): [number, string] {
  const m = v.testingMethods.map((t) => t.toLowerCase());
  const hplc = m.some((t) => t.includes("hplc"));
  const ms = m.some((t) => t.includes("mass spec") || t.includes("lc-ms"));
  const endo = m.some((t) => t.includes("endotoxin"));
  const points = (v.thirdPartyLab ? 8 : 0) + (hplc ? 4 : 0) + (ms ? 4 : 0) + (endo ? 4 : 0);
  const basis = [
    v.thirdPartyLab ? `Third-party lab: ${v.thirdPartyLab}` : "No third-party lab stated",
    v.testingMethods.join(", "),
  ].join(" · ");
  return [points, basis];
}

function scoreShipping(v: ScorableVendor): [number, string] {
  const threshold = v.shippingCost.match(/\$(\d+)/);
  const t = threshold ? Number(threshold[1]) : Infinity;
  const free = t <= 75 ? 8 : t <= 100 ? 6 : t <= 150 ? 4 : 0;
  const intl = v.shipsTo.some((s) => !/^usa?$/i.test(s.trim())) ? 7 : 0;
  return [free + intl, `${v.shippingCost} · ships to ${v.shipsTo.join(", ")}`];
}

function scorePayment(v: ScorableVendor): [number, string] {
  const n = v.paymentMethods.length;
  return [n >= 3 ? 10 : n === 2 ? 7 : n === 1 ? 3 : 0, v.paymentMethods.join(", ") || "None stated"];
}

function scoreReturns(v: ScorableVendor): [number, string] {
  if (/money-back/i.test(v.returnPolicy)) return [5, v.returnPolicy];
  if (/return|refund|replacement|guarantee/i.test(v.returnPolicy)) return [3, v.returnPolicy];
  return [0, "None stated"];
}

/** Price score per vendor name: average of (cheapest $/mg ÷ vendor $/mg) on shared peptides. */
function priceScores(names: string[]): Map<string, { points: number; basis: string }> {
  const ratios = new Map<string, number[]>(names.map((n) => [n, []]));
  for (const entry of vendorPricing) {
    const rows = entry.vendors.filter(
      (vp) => ratios.has(vp.vendor) && vp.inStock && vp.price_usd > 0 && vp.vial_mg > 0
    );
    if (new Set(rows.map((r) => r.vendor)).size < 2) continue;
    // Per vendor, its lowest $/mg for this peptide
    const best = new Map<string, number>();
    for (const r of rows) {
      const perMg = r.price_usd / r.vial_mg;
      best.set(r.vendor, Math.min(best.get(r.vendor) ?? Infinity, perMg));
    }
    const lowest = Math.min(...best.values());
    for (const [vendor, perMg] of best) ratios.get(vendor)!.push(lowest / perMg);
  }
  const out = new Map<string, { points: number; basis: string }>();
  for (const [name, r] of ratios) {
    out.set(
      name,
      r.length
        ? {
            points: Math.round((r.reduce((s, x) => s + x, 0) / r.length) * 25),
            basis: `${r.length} peptides compared with other vendors' list prices`,
          }
        : { points: 0, basis: "No checked prices yet" }
    );
  }
  return out;
}

/** Score every vendor on RANKING_CRITERIA. Keyed by vendor name. */
export function scoreVendors(list: ScorableVendor[]): Map<string, VendorCriteriaScore> {
  const prices = priceScores(list.map((v) => v.name));
  const out = new Map<string, VendorCriteriaScore>();
  for (const v of list) {
    const raw: Record<CriterionKey, [number, string]> = {
      coa: scoreCoa(v),
      lab: scoreLab(v),
      price: [prices.get(v.name)!.points, prices.get(v.name)!.basis],
      shipping: scoreShipping(v),
      payment: scorePayment(v),
      returns: scoreReturns(v),
    };
    const parts = RANKING_CRITERIA.map((c) => ({
      key: c.key,
      label: c.label,
      points: Math.min(c.max, raw[c.key][0]),
      max: c.max,
      basis: raw[c.key][1],
    }));
    out.set(v.name, { total: parts.reduce((s, p) => s + p.points, 0), max: RANKING_MAX_POINTS, parts });
  }
  return out;
}
