/**
 * Elyria Bio price check
 * ─────────────────────────────────────────────────────────────
 * Reads Elyria Bio's own storefront data — the public price/stock rail its
 * product cards use (Supabase rpc/effective_tiers, called with the public
 * anon key from elyriabio.com/backend-config.js), the live/retired product
 * list (gated.js) and product names and default sizes (store.js) — matches it
 * to the "Elyria Bio" rows in src/data/vendor-pricing.ts and reports the
 * differences. Read-only: it never edits vendor-pricing.ts.
 */
import { vendorPricing, pricesCheckedFor } from "@/data/vendor-pricing";
import type { CatalogItem, PriceCheckReport, PriceCheckRow } from "@/lib/pricing/bll-price-check";

const SITE = "https://elyriabio.com";
const VENDOR_NAME = "Elyria Bio";
const UA = { "User-Agent": "PeptiDex-pricecheck/1.0 (+https://peptidex.app)" };

/**
 * Elyria product id → PeptiDex peptide slug. null = sold by Elyria but not
 * listed on PeptiDex (blends, reconstitution solution). GLP-class products are
 * dropped before matching (see isGlpClass) and are never mapped or linked.
 */
export const ELYRIA_PRODUCT_SLUGS: Record<string, string | null> = {
  bpc157: "bpc-157",
  tb500: "tb-500",
  tesa: "tesamorelin",
  kiss: "kisspeptin-10",
  motsc: "mots-c",
  ss31: "ss-31",
  cjcipa: null, // CJC-1295/Ipamorelin blend
  klow: null, // KLOW blend
  wolverine: null, // BPC-157/TB-500 blend
  bacwater: null, // reconstitution solution
};

/** GLP-class compounds: PeptiDex does not cover, map, link or snapshot them. */
const GLP_CLASS_IDS = new Set(["tirz", "reta"]);
function isGlpClass(id: string, name: string): boolean {
  return GLP_CLASS_IDS.has(id) || /\bglp|tirzepatide|retatrutide|semaglutide|cagrilintide/i.test(name);
}

export interface ElyriaCatalogItem extends CatalogItem {
  productId: string;
  mg: number | null;
}

interface RailRow {
  product_id: string;
  mg: number | null;
  qty: number;
  regular_total: number | string;
  effective_total: number | string;
  in_stock: boolean | null;
}

async function text(path: string): Promise<string> {
  const res = await fetch(`${SITE}/${path}`, { headers: UA, cache: "no-store" });
  if (!res.ok) throw new Error(`elyriabio.com/${path}: HTTP ${res.status}`);
  return res.text();
}

function jsonObject(src: string, key: string): Record<string, unknown> {
  const m = src.match(new RegExp(`\\b${key}:\\s*(\\{[^}]*\\})`));
  return m ? (JSON.parse(m[1]) as Record<string, unknown>) : {};
}

export async function fetchElyriaCatalog(): Promise<ElyriaCatalogItem[]> {
  const [config, gated, store] = await Promise.all([
    text("backend-config.js"),
    text("gated.js"),
    text("store.js"),
  ]);
  const url = config.match(/\burl:\s*"([^"]+)"/)?.[1];
  const anonKey = config.match(/\banonKey:\s*"([^"]+)"/)?.[1];
  if (!url || !anonKey) throw new Error("elyriabio.com/backend-config.js: Supabase url/anonKey not found");

  const rpc = await fetch(`${url}/rest/v1/rpc/effective_tiers`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: anonKey, Authorization: `Bearer ${anonKey}`, ...UA },
    body: "{}",
    cache: "no-store",
  });
  if (!rpc.ok) throw new Error(`Elyria rpc/effective_tiers: HTTP ${rpc.status}`);
  const rail = (await rpc.json()) as RailRow[];

  const notLive = jsonObject(gated, "map");
  const retired = jsonObject(gated, "variants");

  // store.js PRODUCTS: {id:"bpc157", name:"BPC-157", … size:"10 mg", …}
  const products = new Map<string, { name: string; sizeMg: number | null }>();
  for (const m of store.matchAll(/\{id:"(\w+)", name:"([^"]+)",[^{}\n]*?size:"([^"]*)"/g)) {
    const mg = m[3].match(/([\d.]+)\s*mg/i);
    products.set(m[1], { name: m[2], sizeMg: mg ? Number(mg[1]) : null });
  }
  if (!products.size) throw new Error("elyriabio.com/store.js: PRODUCTS not found");

  const items: ElyriaCatalogItem[] = [];
  for (const r of rail) {
    if (r.qty !== 1 || notLive[r.product_id] || retired[`${r.product_id}|${r.mg}`]) continue;
    const p = products.get(r.product_id);
    if (isGlpClass(r.product_id, p?.name ?? "")) continue;
    const mg = r.mg ?? p?.sizeMg ?? null;
    items.push({
      productId: r.product_id,
      name: `${p?.name ?? r.product_id}${mg ? ` ${mg}mg` : ""}`,
      permalink: SITE,
      mg,
      priceUsd: Number(r.effective_total),
      regularPriceUsd: Number(r.regular_total),
      inStock: r.in_stock,
    });
  }
  return items;
}

export function diffElyriaPrices(catalog: ElyriaCatalogItem[], checkedAt: string): PriceCheckReport {
  const rows: PriceCheckRow[] = [];
  for (const entry of vendorPricing) {
    for (const vp of entry.vendors) {
      if (vp.vendor !== VENDOR_NAME) continue;
      const candidates = catalog.filter((c) => ELYRIA_PRODUCT_SLUGS[c.productId] === entry.slug);
      const sameSize = candidates.find((c) => c.mg === vp.vial_mg);
      rows.push({
        peptideSlug: entry.slug,
        peptideName: entry.name,
        vialMg: vp.vial_mg,
        ourPrice: vp.price_usd,
        ourInStock: vp.inStock,
        match: sameSize ? "exact" : "none",
        product: sameSize,
        otherSizes: sameSize ? undefined : candidates.map((c) => ({ mg: c.mg ?? 0, priceUsd: c.priceUsd, name: c.name })),
      });
    }
  }

  const listed = new Set(rows.map((r) => `${r.peptideSlug}|${r.vialMg}`));
  const notListed = catalog.filter((c) => {
    const slug = ELYRIA_PRODUCT_SLUGS[c.productId];
    return slug !== null && !listed.has(`${slug}|${c.mg}`);
  });
  const stock = (c: ElyriaCatalogItem) => (c.inStock === null ? "stock unknown" : c.inStock ? "in stock" : "out of stock");

  return {
    vendor: VENDOR_NAME,
    checkedAt,
    pricesLastChecked: pricesCheckedFor(VENDOR_NAME),
    catalogSize: catalog.length,
    rows,
    changed: rows.filter((r) => r.product && Math.abs(r.product.priceUsd - r.ourPrice) >= 0.005),
    // null = Elyria's data didn't say; never reported as a change
    stockChanged: rows.filter((r) => r.product && r.product.inStock !== null && r.product.inStock !== r.ourInStock),
    unmatched: rows.filter((r) => r.match === "none"),
    fuzzy: [],
    notes: [
      {
        title: "Elyria sizes/products not in our data",
        items: notListed.map((c) =>
          ELYRIA_PRODUCT_SLUGS[c.productId] === undefined
            ? `${c.name} $${c.priceUsd.toFixed(2)} (${stock(c)}) — new Elyria product id "${c.productId}"; map it in ELYRIA_PRODUCT_SLUGS`
            : `${c.name} $${c.priceUsd.toFixed(2)} (${stock(c)})`
        ),
      },
    ],
  };
}
