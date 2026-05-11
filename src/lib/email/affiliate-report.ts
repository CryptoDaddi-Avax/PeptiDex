/**
 * Daily Affiliate Analytics Email Template
 * Follows the existing email.ts design system.
 */

const styles = {
  wrapper: `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e8e4de; padding: 32px;`,
  card: `background: #141416; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 28px; max-width: 580px; margin: 0 auto;`,
  h1: `font-size: 20px; font-weight: 700; color: #c9a961; margin: 0 0 4px;`,
  sub: `font-size: 13px; color: #5a564f; margin: 0 0 24px;`,
  label: `font-size: 10px; color: #5a564f; text-transform: uppercase; letter-spacing: 0.1em;`,
  statVal: (color = "#e8e4de") =>
    `font-size: 28px; font-weight: 700; color: ${color}; font-family: monospace;`,
  delta: (positive: boolean | null) =>
    positive === null
      ? `font-size: 11px; color: #5a564f;`
      : positive
      ? `font-size: 11px; color: #4ade80; font-weight: 600;`
      : `font-size: 11px; color: #f87171; font-weight: 600;`,
  sectionTitle: `font-size: 10px; color: #5a564f; text-transform: uppercase; letter-spacing: 0.12em; margin: 20px 0 10px;`,
  row: `padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.04); display: flex; justify-content: space-between; align-items: center;`,
  btn: `display: inline-block; padding: 12px 28px; border-radius: 8px; background: linear-gradient(135deg, #c9a961, #d4832a); color: #0a0a0b; font-weight: 700; font-size: 14px; text-decoration: none;`,
  footer: `font-size: 11px; color: #3a3832; margin-top: 24px; text-align: center; line-height: 1.6;`,
};

export interface DailyEmailStats {
  yesterday: { clicks: number; conversions: number };
  dayBefore: { clicks: number; conversions: number };
  topPeptides: { key: string; clicks: number }[];
  topVendors: { key: string; clicks: number }[];
}

function deltaPct(curr: number, prev: number): string {
  if (prev === 0) return curr > 0 ? "new" : "—";
  const d = Math.round(((curr - prev) / prev) * 100);
  return d >= 0 ? `+${d}%` : `${d}%`;
}

function isPositive(curr: number, prev: number): boolean | null {
  if (prev === 0) return null;
  return curr >= prev;
}

export function dailyAffiliateEmail(stats: DailyEmailStats): {
  subject: string;
  html: string;
} {
  const { yesterday, dayBefore } = stats;
  const clickDelta = deltaPct(yesterday.clicks, dayBefore.clicks);
  const convDelta = deltaPct(yesterday.conversions, dayBefore.conversions);
  const clickPos = isPositive(yesterday.clicks, dayBefore.clicks);
  const convPos = isPositive(yesterday.conversions, dayBefore.conversions);

  const yesterdayStr = new Date(
    Date.now() - 86400000
  ).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const peptideRows = stats.topPeptides
    .slice(0, 5)
    .map(
      (p, i) =>
        `<div style="${styles.row}">
          <span style="font-size:13px;color:#a8a196;">${i + 1}. ${p.key}</span>
          <span style="font-size:13px;color:#c9a961;font-weight:600;font-family:monospace;">${p.clicks} clicks</span>
        </div>`
    )
    .join("");

  const vendorRows = stats.topVendors
    .slice(0, 5)
    .map(
      (v, i) =>
        `<div style="${styles.row}">
          <span style="font-size:13px;color:#a8a196;">${i + 1}. ${v.key}</span>
          <span style="font-size:13px;color:#c9a961;font-weight:600;font-family:monospace;">${v.clicks} clicks</span>
        </div>`
    )
    .join("");

  const conversionRate =
    yesterday.clicks > 0
      ? ((yesterday.conversions / yesterday.clicks) * 100).toFixed(2)
      : "0.00";

  return {
    subject: `📊 PeptiDex Affiliate Report — ${yesterdayStr} · ${yesterday.clicks} clicks`,
    html: `<div style="${styles.wrapper}">
      <div style="${styles.card}">
        <h1 style="${styles.h1}">📊 Daily Affiliate Report</h1>
        <p style="${styles.sub}">${yesterdayStr} · vs prior day</p>

        <!-- KPI Row -->
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:24px;">

          <div style="flex:1;min-width:120px;background:rgba(201,169,97,0.06);border:1px solid rgba(201,169,97,0.15);border-radius:10px;padding:14px;">
            <div style="${styles.label}">Clicks</div>
            <div style="${styles.statVal("#c9a961")}">${yesterday.clicks.toLocaleString()}</div>
            <div style="${styles.delta(clickPos)}">${clickDelta} vs prior day</div>
          </div>

          <div style="flex:1;min-width:120px;background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.15);border-radius:10px;padding:14px;">
            <div style="${styles.label}">Conversions</div>
            <div style="${styles.statVal("#4ade80")}">${yesterday.conversions}</div>
            <div style="${styles.delta(convPos)}">${convDelta} vs prior day</div>
          </div>

          <div style="flex:1;min-width:120px;background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.15);border-radius:10px;padding:14px;">
            <div style="${styles.label}">Conv. Rate</div>
            <div style="${styles.statVal("#8b5cf6")}">${conversionRate}%</div>
            <div style="font-size:11px;color:#5a564f;">click → postback</div>
          </div>

        </div>

        <!-- Top Peptides -->
        <div style="${styles.sectionTitle}">🧪 Top Peptides Yesterday</div>
        ${peptideRows || '<div style="font-size:13px;color:#5a564f;padding:8px 0;">No peptide clicks yet</div>'}

        <!-- Top Vendors -->
        <div style="${styles.sectionTitle}">🏪 Top Vendors Yesterday</div>
        ${vendorRows || '<div style="font-size:13px;color:#5a564f;padding:8px 0;">No vendor clicks yet</div>'}

        <!-- CTA -->
        <div style="text-align:center;margin-top:28px;">
          <a href="https://peptidex.app/admin/analytics" style="${styles.btn}">
            View Full Dashboard →
          </a>
        </div>

        <p style="${styles.footer}">
          PeptiDex · Affiliate Analytics<br/>
          Privacy-safe tracking: no IP, no user-agent, no PII stored.<br/>
          <a href="https://peptidex.app/privacy" style="color:#3a3832;">Privacy Policy</a>
        </p>
      </div>
    </div>`,
  };
}
