/**
 * GET /api/cron/bll-price-check
 * ─────────────────────────────────────────────────────────────
 * Daily Bio Longevity Labs price check: snapshot BLL's public catalog,
 * diff it against vendor-pricing.ts, write the snapshot + report to
 * PRICE_REPORT_DIR (default <cwd>/price-reports) and email the report to
 * ANALYTICS_EMAIL_TO. Never edits prices — publishing stays manual.
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
} from "@/lib/pricing/bll-price-check";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || req.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const checkedAt = new Date().toISOString();
    const day = checkedAt.slice(0, 10);
    const catalog = await fetchBllCatalog();
    const report = diffBllPrices(catalog, checkedAt);

    const dir = process.env.PRICE_REPORT_DIR || path.join(process.cwd(), "price-reports");
    await mkdir(dir, { recursive: true });
    const snapshotFile = path.join(dir, `bll-catalog-${day}.json`);
    const reportFile = path.join(dir, `bll-price-check-${day}.md`);
    await writeFile(snapshotFile, JSON.stringify(catalog, null, 2));
    await writeFile(path.join(dir, `bll-price-check-${day}.json`), JSON.stringify(report, null, 2));
    await writeFile(reportFile, reportToMarkdown(report));

    const to = process.env.ANALYTICS_EMAIL_TO;
    const emailed = to ? await sendEmail(to, reportToEmailHtml(report)) : false;

    return NextResponse.json({
      success: true,
      catalog_products: catalog.length,
      our_rows: report.rows.length,
      price_changes: report.changed.length,
      stock_changes: report.stockChanged.length,
      unmatched: report.unmatched.length,
      fuzzy: report.fuzzy.length,
      report_file: reportFile,
      emailed,
    });
  } catch (err) {
    console.error("[cron/bll-price-check]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
