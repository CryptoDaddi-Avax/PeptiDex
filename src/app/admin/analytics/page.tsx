/**
 * /admin/analytics — Affiliate Click Analytics Dashboard
 * Protected by ADMIN_SECRET env var.
 * Server Component — all data fetched at request time.
 */
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getAnalyticsSummary } from "@/lib/analytics/affiliate-stats";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Analytics — Admin",
  robots: { index: false, follow: false },
};

// Force dynamic so data is fresh on every request
export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; days?: string }>;
}) {
  const params = await searchParams;

  // ── Auth gate ──────────────────────────────────────────────────────────────
  const adminSecret = process.env.ADMIN_ANALYTICS_SECRET;
  if (adminSecret) {
    const provided = params.key;
    if (provided !== adminSecret) {
      // Also check Authorization header for programmatic access
      const headersList = await headers();
      const authHeader = headersList.get("authorization");
      if (authHeader !== `Bearer ${adminSecret}`) {
        redirect("/");
      }
    }
  }

  const days = Math.min(Math.max(parseInt(params.days ?? "30", 10), 1), 90);

  let summary = null;
  let error: string | null = null;

  try {
    summary = await getAnalyticsSummary(days);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load analytics";
    console.error("[admin/analytics]", err);
  }

  return <AnalyticsDashboard summary={summary} error={error} days={days} />;
}
