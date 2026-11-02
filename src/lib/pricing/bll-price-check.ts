/**
 * Bio Longevity Labs price check
 * ─────────────────────────────────────────────────────────────
 * Pulls BLL's public WooCommerce Store API catalog, matches it to the
 * "Bio Longevity Labs" rows in src/data/vendor-pricing.ts and reports the
 * differences. Read-only: it never edits vendor-pricing.ts. A human applies
 * any change after reviewing the report.
 */
import { vendorPricing, PRICES_LAST_CHECKED } from "@/data/vendor-pricing";
import { getPeptideBySlug } from "@/data/peptides";

const STORE_API = "https://biolongevitylabs.com/wp-json/wc/store/v1/products";
const VENDOR_NAME = "Bio Longevity Labs";

/** One vendor product at one vial size, as the vendor's own catalog reports it. */
export interface CatalogItem {
  name: string;
  permalink: string;
  priceUsd: number;
  regularPriceUsd: number;
  /** null when the vendor's data does not say */
  inStock: boolean | null;
}

export interface BllCatalogItem extends CatalogItem {
  id: number;
  slug: string;
  inStock: boolean;
}

interface StoreApiProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  is_in_stock: boolean;
  prices: { price: string; regular_price: string; currency_minor_unit: number };
}

export async function fetchBllCatalog(): Promise<BllCatalogItem[]> {
  const items: BllCatalogItem[] = [];
  for (let page = 1, totalPages = 1; page <= totalPages && page <= 20; page++) {
    const res = await fetch(`${STORE_API}?per_page=100&page=${page}`, {
      headers: { "User-Agent": "PeptiDex-pricecheck/1.0 (+https://peptidex.app)" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`BLL Store API page ${page}: HTTP ${res.status}`);
    totalPages = Number(res.headers.get("x-wp-totalpages") ?? "1");
    for (const p of (await res.json()) as StoreApiProduct[]) {
      const div = 10 ** (p.prices.currency_minor_unit ?? 2);
      items.push({
        id: p.id,
        name: decodeEntities(p.name),
        slug: p.slug,
        permalink: p.permalink,
        priceUsd: Number(p.prices.price) / div,
        regularPriceUsd: Number(p.prices.regular_price) / div,
        inStock: p.is_in_stock,
      });
    }
  }
  return items;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'");
}

/** "BPC-157 (10mg)" → { base: "bpc157", mg: 10 }; blends/strips/capsules → null.
 *  A spaced " + " marks a blend; "NAD+" is a single compound. */
export function parseProductName(name: string): { base: string; mg: number } | null {
  if (/blend|strip|capsule|\s\+\s|\/|,/i.test(name)) return null;
  const mg = name.match(/(\d+(?:\.\d+)?)\s*mg\b/i);
  if (!mg) return null;
  const base = normalize(name.replace(/\([^)]*\)/g, " ").replace(/\d+(?:\.\d+)?\s*mg\b/gi, " "));
  return base ? { base, mg: Number(mg[1]) } : null;
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export interface PriceCheckRow {
  peptideSlug: string;
  peptideName: string;
  vialMg: number;
  ourPrice: number;
  ourInStock: boolean;
  match: "exact" | "fuzzy" | "none";
  product?: CatalogItem;
  /** Same peptide found at the vendor but only in other vial sizes */
  otherSizes?: { mg: number; priceUsd: number; name: string }[];
}

export interface PriceCheckReport {
  vendor: string;
  checkedAt: string;
  pricesLastChecked: string;
  catalogSize: number;
  rows: PriceCheckRow[];
  changed: PriceCheckRow[];
  stockChanged: PriceCheckRow[];
  unmatched: PriceCheckRow[];
  fuzzy: PriceCheckRow[];
  /** Extra vendor-specific sections, e.g. catalog products we don't list */
  notes?: { title: string; items: string[] }[];
}

export function diffBllPrices(catalog: BllCatalogItem[], checkedAt: string): PriceCheckReport {
  const parsed = catalog
    .map((item) => ({ item, parsed: parseProductName(item.name) }))
    .filter((x): x is { item: BllCatalogItem; parsed: { base: string; mg: number } } => x.parsed !== null);

  const rows: PriceCheckRow[] = [];
  for (const entry of vendorPricing) {
    for (const vp of entry.vendors) {
      if (vp.vendor !== VENDOR_NAME) continue;
      const keys = new Set(
        [entry.name, entry.slug, ...(getPeptideBySlug(entry.slug)?.aliases ?? [])].map(normalize).filter(Boolean)
      );
      const exact = parsed.filter((p) => keys.has(p.parsed.base));
      // Fuzzy: product name contains the peptide name, e.g. "N-Acetyl Semax Amidate" for "Semax"
      const fuzzy = exact.length
        ? []
        : parsed.filter((p) => [...keys].some((k) => k.length >= 3 && p.parsed.base.includes(k)));
      const candidates = exact.length ? exact : fuzzy;
      const sameSize = candidates.find((p) => p.parsed.mg === vp.vial_mg);

      rows.push({
        peptideSlug: entry.slug,
        peptideName: entry.name,
        vialMg: vp.vial_mg,
        ourPrice: vp.price_usd,
        ourInStock: vp.inStock,
        match: sameSize ? (exact.length ? "exact" : "fuzzy") : "none",
        product: sameSize?.item,
        otherSizes: sameSize
          ? undefined
          : candidates.map((p) => ({ mg: p.parsed.mg, priceUsd: p.item.priceUsd, name: p.item.name })),
      });
    }
  }

  return {
    vendor: VENDOR_NAME,
    checkedAt,
    pricesLastChecked: PRICES_LAST_CHECKED,
    catalogSize: catalog.length,
    rows,
    changed: rows.filter((r) => r.product && Math.abs(r.product.priceUsd - r.ourPrice) >= 0.005),
    stockChanged: rows.filter((r) => r.product && r.product.inStock !== r.ourInStock),
    unmatched: rows.filter((r) => r.match === "none"),
    fuzzy: rows.filter((r) => r.match === "fuzzy"),
  };
}

const usd = (n: number) => `$${n.toFixed(2)}`;

export function reportToMarkdown(r: PriceCheckReport): string {
  const lines = [
    `# ${r.vendor} price check — ${r.checkedAt.slice(0, 10)}`,
    "",
    `Catalog products: ${r.catalogSize} · Our ${r.vendor} rows: ${r.rows.length} · Prices last checked on site: ${r.pricesLastChecked}`,
    "",
    `## Price changes (${r.changed.length})`,
    ...r.changed.map((x) => {
      const pct = ((x.product!.priceUsd - x.ourPrice) / x.ourPrice) * 100;
      return `- ${x.peptideName} ${x.vialMg}mg: ours ${usd(x.ourPrice)} → ${r.vendor} ${usd(x.product!.priceUsd)} (${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%)${x.match === "fuzzy" ? ` [fuzzy match: "${x.product!.name}"]` : ""}`;
    }),
    "",
    `## Stock changes (${r.stockChanged.length})`,
    ...r.stockChanged.map((x) => `- ${x.peptideName} ${x.vialMg}mg: ours ${x.ourInStock ? "in stock" : "out of stock"} → ${r.vendor} ${x.product!.inStock ? "in stock" : "out of stock"}`),
    "",
    `## Not found at this vial size (${r.unmatched.length})`,
    ...r.unmatched.map((x) => `- ${x.peptideName} ${x.vialMg}mg (ours ${usd(x.ourPrice)})${x.otherSizes?.length ? ` — ${r.vendor} has: ${x.otherSizes.map((o) => `${o.name} ${usd(o.priceUsd)}`).join("; ")}` : " — no matching product"}`),
    "",
    `## Fuzzy matches to confirm (${r.fuzzy.length})`,
    ...r.fuzzy.map((x) => `- ${x.peptideName} ${x.vialMg}mg ↔ "${x.product!.name}"`),
    ...(r.notes ?? []).flatMap((n) => ["", `## ${n.title} (${n.items.length})`, ...n.items.map((i) => `- ${i}`)]),
    "",
    "Nothing was published. Apply changes to src/data/vendor-pricing.ts by hand and update the vendor's checked date (PRICES_LAST_CHECKED or PRICES_CHECKED_BY_VENDOR).",
  ];
  return lines.join("\n");
}

const summary = (r: PriceCheckReport) =>
  `${r.changed.length} price change(s), ${r.stockChanged.length} stock change(s), ${r.unmatched.length} unmatched`;

/** One email for one or more vendor reports from the same run. */
export function reportToEmailHtml(...reports: PriceCheckReport[]): { subject: string; html: string } {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const md = reports.map(reportToMarkdown).join("\n\n---\n\n");
  const day = reports[0]?.checkedAt.slice(0, 10) ?? "";
  const subject =
    reports.length === 1
      ? `${reports[0].vendor} price check ${day}: ${summary(reports[0])}`
      : `Price check ${day}: ${reports.map((r) => `${r.vendor} ${summary(r)}`).join(" · ")}`;
  const html = `<pre style="font-family:ui-monospace,Menlo,monospace;font-size:13px;white-space:pre-wrap">${esc(md)}</pre>`;
  return { subject, html };
}
