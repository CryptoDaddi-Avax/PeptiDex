/**
 * GET /api/cron/bll-price-check
 * ─────────────────────────────────────────────────────────────
 * Daily vendor price check (route name kept for the existing crontab line):
 *   - Bio Longevity Labs: public WooCommerce catalog
 *   - Elyria Bio: its storefront's own price/stock data
 * Each vendor's catalog is snapshotted and diffed against vendor-pricing.ts;
 * snapshots + reports go to PRICE_REPORT_DIR (default <cwd>/price-reports)
 * and one email goes to ANALYTICS_EMAIL_TO. Never edits prices — publishing
 * stays manual. One vendor failing does not stop the other.
 *
 * Security: requires Authorization: Bearer <CRON_SECRET> (called via
 * scripts/cron-call.sh, so the secret stays out of the crontab).
 */
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import {
  diffBllPrices,
  fetchBllCatalog,
  reportToEmailHtml,
  reportToMarkdown,
  type PriceCheckReport,
} from "@/lib/pricing/bll-price-check";
import { diffElyriaPrices, fetchElyriaCatalog } from "@/lib/pricing/elyria-price-check";

export const dynamic = "force-dynamic";

const CHECKS: { key: string; run: (checkedAt: string) => Promise<{ catalog: unknown[]; report: PriceCheckReport }> }[] = [
  {
    key: "bll",
    run: async (checkedAt) => {
      const catalog = await fetchBllCatalog();
      return { catalog, report: diffBllPrices(catalog, checkedAt) };
    },
  },
  {
    key: "elyria",
    run: async (checkedAt) => {
      const catalog = await fetchElyriaCatalog();
      return { catalog, report: diffElyriaPrices(catalog, checkedAt) };
    },
  },
];

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || req.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checkedAt = new Date().toISOString();
  const day = checkedAt.slice(0, 10);
  const dir = process.env.PRICE_REPORT_DIR || path.join(process.cwd(), "price-reports");
  const results: Record<string, unknown> = {};
  const reports: PriceCheckReport[] = [];

  for (const check of CHECKS) {
    try {
      const { catalog, report } = await check.run(checkedAt);
      await mkdir(dir, { recursive: true });
      const reportFile = path.join(dir, `${check.key}-price-check-${day}.md`);
      await writeFile(path.join(dir, `${check.key}-catalog-${day}.json`), JSON.stringify(catalog, null, 2));
      await writeFile(path.join(dir, `${check.key}-price-check-${day}.json`), JSON.stringify(report, null, 2));
      await writeFile(reportFile, reportToMarkdown(report));
      reports.push(report);
      results[check.key] = {
        catalog_products: catalog.length,
        our_rows: report.rows.length,
        price_changes: report.changed.length,
        stock_changes: report.stockChanged.length,
        unmatched: report.unmatched.length,
        fuzzy: report.fuzzy.length,
        report_file: reportFile,
      };
    } catch (err) {
      console.error(`[cron/bll-price-check] ${check.key}`, err);
      results[check.key] = { error: err instanceof Error ? err.message : "Unknown error" };
    }
  }

  const to = process.env.ANALYTICS_EMAIL_TO;
  const emailed = to && reports.length ? await sendEmail(to, reportToEmailHtml(...reports)) : false;
  const ok = reports.length === CHECKS.length;

  return NextResponse.json({ success: ok, ...results, emailed }, { status: ok ? 200 : 500 });
}
