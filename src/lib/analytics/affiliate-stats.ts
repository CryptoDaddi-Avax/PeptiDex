/**
 * Affiliate Analytics Query Layer
 * Server-side only — uses service_role Supabase client.
 * Called by the /admin/analytics dashboard and the daily email cron.
 */
import { createServerClient } from "@/lib/supabase-server";

export interface ClicksByDimension {
  key: string;
  clicks: number;
  unique_sessions: number;
}

export interface DailyTotals {
  day: string;
  clicks: number;
  unique_sessions: number;
}

export interface FunnelStats {
  pageviews_approx: number; // not stored — use GA4 for pageviews
  clicks: number;
  conversions: number;
  click_rate_note: string;
}

export interface AnalyticsSummary {
  totalClicks: number;
  totalUniqueSessions: number;
  topPeptides: ClicksByDimension[];
  topVendors: ClicksByDimension[];
  topSurfaces: ClicksByDimension[];
  clicksByDay: DailyTotals[];
  conversions: number;
  deltaPct: {
    clicks: number | null;
    conversions: number | null;
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function utcDaysAgo(n: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Full analytics summary for the admin dashboard.
 * @param days - lookback window in days (default 30)
 */
export async function getAnalyticsSummary(days = 30): Promise<AnalyticsSummary> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = createServerClient() as any;
  const since = utcDaysAgo(days);
  const previousPeriodStart = utcDaysAgo(days * 2);

  // ── Current period clicks ─────────────────────────────────────────────────
  const { data: currentClicks, count: totalClicks } = await sb
    .from("affiliate_clicks")
    .select("session_id", { count: "exact" })
    .gte("timestamp", since);

  const uniqueSessions = new Set<string>(
    (currentClicks ?? []).map((r: { session_id: string }) => r.session_id)
  ).size;

  // ── Previous period for delta ─────────────────────────────────────────────
  const { count: prevClicks } = await sb
    .from("affiliate_clicks")
    .select("id", { count: "exact", head: true })
    .gte("timestamp", previousPeriodStart)
    .lt("timestamp", since);

  const clicksDelta =
    prevClicks && prevClicks > 0
      ? Math.round((((totalClicks ?? 0) - prevClicks) / prevClicks) * 100)
      : null;

  // ── Top peptides ──────────────────────────────────────────────────────────
  const { data: rawPeptides } = await sb
    .from("affiliate_clicks")
    .select("peptide_slug, session_id")
    .gte("timestamp", since)
    .neq("peptide_slug", "general")
    .neq("peptide_slug", "all")
    .neq("peptide_slug", "unknown");

  const topPeptides = aggregateByKey(rawPeptides ?? [], "peptide_slug");

  // ── Top vendors ───────────────────────────────────────────────────────────
  const { data: rawVendors } = await sb
    .from("affiliate_clicks")
    .select("vendor_slug, session_id")
    .gte("timestamp", since)
    .neq("vendor_slug", "unknown");

  const topVendors = aggregateByKey(rawVendors ?? [], "vendor_slug");

  // ── Top surfaces ──────────────────────────────────────────────────────────
  const { data: rawSurfaces } = await sb
    .from("affiliate_clicks")
    .select("surface, session_id")
    .gte("timestamp", since);

  const topSurfaces = aggregateByKey(rawSurfaces ?? [], "surface");

  // ── Clicks by day ─────────────────────────────────────────────────────────
  const { data: rawDays } = await sb
    .from("affiliate_clicks")
    .select("timestamp, session_id")
    .gte("timestamp", since)
    .order("timestamp", { ascending: true });

  const clicksByDay = aggregateByDay(rawDays ?? []);

  // ── Conversions ───────────────────────────────────────────────────────────
  const { count: conversions } = await sb
    .from("affiliate_conversions")
    .select("id", { count: "exact", head: true })
    .gte("timestamp", since);

  const { count: prevConversions } = await sb
    .from("affiliate_conversions")
    .select("id", { count: "exact", head: true })
    .gte("timestamp", previousPeriodStart)
    .lt("timestamp", since);

  const convDelta =
    prevConversions && prevConversions > 0
      ? Math.round(
          (((conversions ?? 0) - prevConversions) / prevConversions) * 100
        )
      : null;

  return {
    totalClicks: totalClicks ?? 0,
    totalUniqueSessions: uniqueSessions,
    topPeptides,
    topVendors,
    topSurfaces,
    clicksByDay,
    conversions: conversions ?? 0,
    deltaPct: {
      clicks: clicksDelta,
      conversions: convDelta,
    },
  };
}

// ── Yesterday vs day-before-yesterday for the daily email ────────────────────
export async function getDailyEmailStats(): Promise<{
  yesterday: { clicks: number; conversions: number };
  dayBefore: { clicks: number; conversions: number };
  topPeptides: ClicksByDimension[];
  topVendors: ClicksByDimension[];
}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = createServerClient() as any;

  const yesterdayStart = utcDaysAgo(1);
  const dayBeforeStart = utcDaysAgo(2);

  const [{ count: yClicks }, { count: dbClicks }] = await Promise.all([
    sb
      .from("affiliate_clicks")
      .select("id", { count: "exact", head: true })
      .gte("timestamp", yesterdayStart),
    sb
      .from("affiliate_clicks")
      .select("id", { count: "exact", head: true })
      .gte("timestamp", dayBeforeStart)
      .lt("timestamp", yesterdayStart),
  ]);

  const [{ count: yConv }, { count: dbConv }] = await Promise.all([
    sb
      .from("affiliate_conversions")
      .select("id", { count: "exact", head: true })
      .gte("timestamp", yesterdayStart),
    sb
      .from("affiliate_conversions")
      .select("id", { count: "exact", head: true })
      .gte("timestamp", dayBeforeStart)
      .lt("timestamp", yesterdayStart),
  ]);

  const { data: rawPeptides } = await sb
    .from("affiliate_clicks")
    .select("peptide_slug, session_id")
    .gte("timestamp", yesterdayStart)
    .neq("peptide_slug", "general");

  const { data: rawVendors } = await sb
    .from("affiliate_clicks")
    .select("vendor_slug, session_id")
    .gte("timestamp", yesterdayStart)
    .neq("vendor_slug", "unknown");

  return {
    yesterday: { clicks: yClicks ?? 0, conversions: yConv ?? 0 },
    dayBefore: { clicks: dbClicks ?? 0, conversions: dbConv ?? 0 },
    topPeptides: aggregateByKey(rawPeptides ?? [], "peptide_slug").slice(0, 5),
    topVendors: aggregateByKey(rawVendors ?? [], "vendor_slug").slice(0, 5),
  };
}

// ── Internal aggregation helpers ──────────────────────────────────────────────

function aggregateByKey(
  rows: Record<string, string>[],
  key: string
): ClicksByDimension[] {
  const map = new Map<string, { clicks: number; sessions: Set<string> }>();
  for (const row of rows) {
    const k = row[key] ?? "unknown";
    if (!map.has(k)) map.set(k, { clicks: 0, sessions: new Set() });
    const entry = map.get(k)!;
    entry.clicks++;
    if (row.session_id) entry.sessions.add(row.session_id);
  }
  return Array.from(map.entries())
    .map(([k, v]) => ({
      key: k,
      clicks: v.clicks,
      unique_sessions: v.sessions.size,
    }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 20);
}

function aggregateByDay(
  rows: { timestamp: string; session_id: string }[]
): DailyTotals[] {
  const map = new Map<string, { clicks: number; sessions: Set<string> }>();
  for (const row of rows) {
    const day = row.timestamp.slice(0, 10); // "YYYY-MM-DD"
    if (!map.has(day)) map.set(day, { clicks: 0, sessions: new Set() });
    const entry = map.get(day)!;
    entry.clicks++;
    if (row.session_id) entry.sessions.add(row.session_id);
  }
  return Array.from(map.entries())
    .map(([day, v]) => ({
      day,
      clicks: v.clicks,
      unique_sessions: v.sessions.size,
    }))
    .sort((a, b) => a.day.localeCompare(b.day));
}
