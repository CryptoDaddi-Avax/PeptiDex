// ═══════════════════════════════════════════════════════
// AEO Alerts — Slack webhook + Resend email
// ═══════════════════════════════════════════════════════

export type AlertLevel = 'info' | 'warning' | 'critical';

/**
 * Send a Slack webhook alert.
 */
export async function sendSlackAlert(message: string, level: AlertLevel = 'info'): Promise<void> {
  const webhookUrl = process.env.SLACK_AEO_WEBHOOK;
  if (!webhookUrl) {
    console.warn('[AEO Alert] No SLACK_AEO_WEBHOOK configured. Alert:', message);
    return;
  }

  const emoji = level === 'critical' ? '🚨' : level === 'warning' ? '⚠️' : 'ℹ️';

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `${emoji} *AEO Monitor* — ${message}`,
    }),
  });
}

/**
 * Send an email alert via Resend.
 */
export async function sendEmailAlert(subject: string, htmlBody: string): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.AEO_ALERT_EMAIL ?? 'admin@peptidex.app';
  if (!resendKey) {
    console.warn('[AEO Alert] No RESEND_API_KEY configured. Email:', subject);
    return;
  }

  // Use verified shared sender as fallback until peptidex.app domain is verified in Resend.
  // Once domain is verified at resend.com/domains, switch from to: 'AEO Monitor <aeo@peptidex.app>'
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'AEO Monitor <onboarding@resend.dev>';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [toEmail],
      subject: `[PeptiDex AEO] ${subject}`,
      html: htmlBody,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    console.error('[AEO Alert] Resend failed:', res.status, JSON.stringify(body));
  }
}

/**
 * Alert: High-priority query lost PEPTIDEX mention.
 */
export async function alertMentionLost(queryText: string, engine: string): Promise<void> {
  const msg = `PEPTIDEX mention LOST on "${queryText}" (${engine}). Investigate content coverage.`;
  await sendSlackAlert(msg, 'critical');
}

/**
 * Alert: New competing code detected in >3 responses.
 */
export async function alertNewCompetitor(code: string, count: number): Promise<void> {
  const msg = `New competing code "${code}" detected in ${count} responses this week. Monitor for growth.`;
  await sendSlackAlert(msg, 'warning');
}

/**
 * Alert: peptidex.app dropped from cited sources.
 */
export async function alertCitationLost(queryText: string, engine: string): Promise<void> {
  const msg = `peptidex.app dropped from cited sources on "${queryText}" (${engine}).`;
  await sendSlackAlert(msg, 'critical');
}

/**
 * Alert: Engine budget paused.
 */
export async function alertEnginePaused(engine: string, spend: number, cap: number): Promise<void> {
  const msg = `Engine "${engine}" auto-paused: $${spend.toFixed(2)}/$${cap.toFixed(2)} daily cap (${((spend/cap)*100).toFixed(0)}%).`;
  await sendSlackAlert(msg, 'warning');
}

/**
 * Alert: Monthly burn rate exceeded threshold.
 */
export async function alertBurnRate(message: string): Promise<void> {
  await sendSlackAlert(message, 'critical');
  await sendEmailAlert('Monthly Budget Burn Rate Alert', `<p>${message}</p>`);
}
