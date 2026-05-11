/**
 * Resend email client + transactional email templates
 * Server-side only — never import from client components
 */
import { Resend } from "resend";

const FROM_ADDRESS = "PeptiDex <noreply@peptidex.app>";

let resendClient: Resend | null = null;

function getClient(): Resend | null {
    if (resendClient) return resendClient;
    const key = process.env.RESEND_API_KEY;
    if (!key || key === "re_placeholder") return null;
    resendClient = new Resend(key);
    return resendClient;
}

// ─── Shared Styles ──────────────────────────────────────────
const styles = {
    wrapper: `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0b; color: #e8e4de; padding: 32px;`,
    card: `background: #141416; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 28px; max-width: 540px; margin: 0 auto;`,
    h1: `font-size: 22px; font-weight: 600; color: #c9a961; margin: 0 0 16px;`,
    p: `font-size: 14px; line-height: 1.6; color: #a8a196; margin: 0 0 16px;`,
    badge: (color: string) => `display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; background: ${color}20; color: ${color}; text-transform: uppercase;`,
    btn: `display: inline-block; padding: 12px 28px; border-radius: 8px; background: linear-gradient(135deg, #c9a961, #d4832a); color: #0a0a0b; font-weight: 600; font-size: 14px; text-decoration: none;`,
    footer: `font-size: 11px; color: #5a564f; margin-top: 24px; text-align: center;`,
    stat: (label: string, value: string, color = "#c9a961") => `<div style="text-align:center;"><div style="font-size:10px;color:#5a564f;text-transform:uppercase;letter-spacing:0.1em;">${label}</div><div style="font-size:24px;font-weight:700;color:${color};">${value}</div></div>`,
};

// ─── Template: Log Submitted ────────────────────────────────
export function logSubmittedEmail(data: {
    displayName: string;
    peptideNames: string[];
    vendorName: string;
    efficacy: number;
    sideEffects: number;
    logId: string;
}) {
    return {
        subject: `Protocol Logged: ${data.peptideNames.join(" + ")}`,
        html: `<div style="${styles.wrapper}"><div style="${styles.card}">
            <h1 style="${styles.h1}">🧪 Protocol Logged</h1>
            <p style="${styles.p}">Hey ${data.displayName}, your protocol log is now live and contributing to the aggregate dataset.</p>
            <div style="display:flex;gap:24px;justify-content:center;margin:20px 0;">
                ${styles.stat("Peptide(s)", data.peptideNames.join(" + "))}
                ${styles.stat("Vendor", data.vendorName, "#a8a196")}
            </div>
            <div style="display:flex;gap:24px;justify-content:center;margin:20px 0;">
                ${styles.stat("Efficacy", `${data.efficacy}/10`)}
                ${styles.stat("Side FX", `${data.sideEffects}/10`, data.sideEffects <= 3 ? "#7fb77e" : "#d4832a")}
            </div>
            <div style="text-align:center;margin:24px 0;">
                <span style="${styles.badge("#a8a196")}">Self-Reported</span>
            </div>
            <p style="${styles.p}">Upload a purchase receipt to upgrade to <strong style="color:#7fb77e;">Verified Buyer</strong> status. Your log carries 2× weight in aggregate calculations.</p>
            <div style="text-align:center;">
                <a href="https://peptidex.app/profile" style="${styles.btn}">View Your Profile →</a>
            </div>
            <p style="${styles.footer}">PeptiDex · Peptide Research Intelligence<br/>You're receiving this because you submitted a protocol log.</p>
        </div></div>`,
    };
}

// ─── Template: Receipt Verified ─────────────────────────────
export function receiptVerifiedEmail(data: {
    displayName: string;
    peptideNames: string[];
    vendorName: string;
}) {
    return {
        subject: `✅ Verified Buyer — ${data.peptideNames.join(" + ")}`,
        html: `<div style="${styles.wrapper}"><div style="${styles.card}">
            <h1 style="${styles.h1}">✅ Verified Buyer Badge Earned</h1>
            <p style="${styles.p}">Congrats ${data.displayName}! Your receipt from <strong style="color:#e8e4de;">${data.vendorName}</strong> has been verified.</p>
            <div style="text-align:center;margin:20px 0;">
                <span style="${styles.badge("#7fb77e")}">✅ Verified Buyer</span>
            </div>
            <p style="${styles.p}">Your protocol log for <strong style="color:#c9a961;">${data.peptideNames.join(" + ")}</strong> now carries <strong>2× weight</strong> in aggregate efficacy and side-effect calculations.</p>
            <div style="text-align:center;">
                <a href="https://peptidex.app/profile" style="${styles.btn}">View Your Profile →</a>
            </div>
            <p style="${styles.footer}">PeptiDex · Peptide Research Intelligence</p>
        </div></div>`,
    };
}

// ─── Template: Follow-Up Reminder ───────────────────────────
export function followUpReminderEmail(data: {
    displayName: string;
    peptideNames: string[];
    vendorName: string;
    weeksAgo: number;
    logId: string;
}) {
    return {
        subject: `How's your ${data.peptideNames.join(" + ")} protocol going?`,
        html: `<div style="${styles.wrapper}"><div style="${styles.card}">
            <h1 style="${styles.h1}">📋 Protocol Check-In</h1>
            <p style="${styles.p}">Hey ${data.displayName}, it's been <strong style="color:#c9a961;">${data.weeksAgo} weeks</strong> since you logged your ${data.peptideNames.join(" + ")} protocol from ${data.vendorName}.</p>
            <p style="${styles.p}">Would you like to update your outcomes? Updated logs help the community build a more accurate dataset.</p>
            <div style="text-align:center;margin:24px 0;">
                <a href="https://peptidex.app/log-protocol" style="${styles.btn}">Update Your Log →</a>
            </div>
            <p style="${styles.footer}">PeptiDex · Peptide Research Intelligence<br/>You can disable reminders from your <a href="https://peptidex.app/profile" style="color:#5a564f;">profile settings</a>.</p>
        </div></div>`,
    };
}

// ─── Template: Flag Adjudicated ─────────────────────────────
export function flagAdjudicatedEmail(data: {
    displayName: string;
    action: "dismissed" | "upheld";
    peptideNames: string[];
}) {
    const kept = data.action === "dismissed";
    return {
        subject: kept ? `Your protocol log has been reviewed` : `Protocol log removed after review`,
        html: `<div style="${styles.wrapper}"><div style="${styles.card}">
            <h1 style="${styles.h1}">${kept ? "✓ Log Retained" : "⚠ Log Removed"}</h1>
            <p style="${styles.p}">Hey ${data.displayName}, your <strong style="color:#c9a961;">${data.peptideNames.join(" + ")}</strong> protocol log was flagged for review by a vendor.</p>
            <p style="${styles.p}">${kept
                ? "After editorial review, your log has been <strong style=\"color:#7fb77e;\">retained</strong>. No action is needed on your part."
                : "After editorial review, your log has been <strong style=\"color:#ef4444;\">removed</strong> as it did not meet our verification standards. If you believe this was in error, please contact us."
            }</p>
            <div style="text-align:center;">
                <a href="https://peptidex.app/profile" style="${styles.btn}">View Profile →</a>
            </div>
            <p style="${styles.footer}">PeptiDex · Peptide Research Intelligence</p>
        </div></div>`,
    };
}

// ─── Template: Shopping List (Procurement Bridge) ───────
export interface ShoppingListEmailVendor {
    vendorName: string;
    vendorSlug: string;
    total: number;
    totalAfterDiscount: number;
    discountPercent: number;
    actionUrl: string;
    actionType: "cart" | "deeplink" | "affiliate";
    items: { peptideName: string; vialsNeeded: number; vialSizeMg: number; subtotal: number }[];
}

export interface ShoppingListEmailPeptide {
    peptideName: string;
    bufferedMg: number;
    vialsNeeded: number;
    vialSizeMg: number;
    cheapestPrice: number;
}

export function shoppingListEmail(data: {
    vendors: ShoppingListEmailVendor[];
    peptides: ShoppingListEmailPeptide[];
    cycleDuration: number;
    totalPeptides: number;
}) {
    const cheapest = data.vendors[0]; // already sorted by cost-ascending

    const vendorRows = data.vendors.slice(0, 3).map((v, idx) => {
        const isBest = idx === 0;
        const savings = v.total - v.totalAfterDiscount;
        const savingsBadge = savings > 0
            ? `<span style="display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;background:rgba(74,222,128,0.15);color:#4ade80;margin-left:8px;">Save $${savings.toFixed(2)}</span>`
            : "";

        const ctaLabel =
            v.actionType === "cart" ? `Build Cart at ${v.vendorName} →`
                : v.actionType === "deeplink" ? `Shop at ${v.vendorName} →`
                    : `Visit ${v.vendorName} →`;

        const itemRows = v.items.map(item =>
            `<tr>
                <td style="padding:6px 12px;font-size:13px;color:#e8e4de;border-bottom:1px solid rgba(255,255,255,0.04);">${item.peptideName}</td>
                <td style="padding:6px 12px;font-size:13px;color:#a8a196;text-align:center;border-bottom:1px solid rgba(255,255,255,0.04);">${item.vialsNeeded}× ${item.vialSizeMg}mg</td>
                <td style="padding:6px 12px;font-size:13px;color:#c9a961;text-align:right;border-bottom:1px solid rgba(255,255,255,0.04);">$${item.subtotal.toFixed(2)}</td>
            </tr>`
        ).join("");

        return `
            <div style="background:${isBest ? 'rgba(201,169,97,0.06)' : '#141416'};border:1px solid ${isBest ? 'rgba(201,169,97,0.3)' : 'rgba(255,255,255,0.06)'};border-radius:12px;padding:20px;margin-bottom:16px;">
                ${isBest ? '<div style="display:inline-block;padding:3px 10px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;background:rgba(201,169,97,0.15);color:#c9a961;margin-bottom:12px;">Best Deal</div>' : ''}
                <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
                    <div style="font-size:18px;font-weight:600;color:#e8e4de;">${v.vendorName}</div>
                    <div>
                        <span style="font-size:22px;font-weight:700;color:${isBest ? '#c9a961' : '#e8e4de'};">$${v.totalAfterDiscount.toFixed(2)}</span>
                        ${savings > 0 ? `<span style="font-size:13px;color:#5a564f;text-decoration:line-through;margin-left:8px;">$${v.total.toFixed(2)}</span>` : ''}
                        ${savingsBadge}
                    </div>
                </div>
                ${v.discountPercent > 0 ? `<div style="font-size:12px;color:#a8a196;margin-top:6px;">💰 Use code <strong style="color:#c9a961;letter-spacing:0.05em;">PEPTIDEX</strong> for ${v.discountPercent}% off</div>` : ''}
                <table style="width:100%;border-collapse:collapse;margin:16px 0 0;" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                            <th style="padding:6px 12px;font-size:10px;color:#5a564f;text-transform:uppercase;letter-spacing:0.1em;text-align:left;">Peptide</th>
                            <th style="padding:6px 12px;font-size:10px;color:#5a564f;text-transform:uppercase;letter-spacing:0.1em;text-align:center;">Vials</th>
                            <th style="padding:6px 12px;font-size:10px;color:#5a564f;text-transform:uppercase;letter-spacing:0.1em;text-align:right;">Cost</th>
                        </tr>
                    </thead>
                    <tbody>${itemRows}</tbody>
                </table>
                <div style="text-align:center;margin-top:16px;">
                    <a href="${v.actionUrl}" style="${styles.btn};display:inline-block;padding:12px 28px;" target="_blank">${ctaLabel}</a>
                </div>
            </div>`;
    }).join("");

    const peptideSummary = data.peptides.map(p =>
        `<tr>
            <td style="padding:6px 12px;font-size:13px;color:#e8e4de;border-bottom:1px solid rgba(255,255,255,0.04);">${p.peptideName}</td>
            <td style="padding:6px 12px;font-size:13px;color:#a8a196;text-align:center;border-bottom:1px solid rgba(255,255,255,0.04);">${p.bufferedMg.toFixed(1)} mg</td>
            <td style="padding:6px 12px;font-size:13px;color:#a8a196;text-align:center;border-bottom:1px solid rgba(255,255,255,0.04);">${p.vialsNeeded}× ${p.vialSizeMg}mg</td>
            <td style="padding:6px 12px;font-size:13px;color:#c9a961;text-align:right;border-bottom:1px solid rgba(255,255,255,0.04);">from $${p.cheapestPrice.toFixed(2)}</td>
        </tr>`
    ).join("");

    return {
        subject: `Your Cycle Shopping List — ${data.totalPeptides} Peptide${data.totalPeptides !== 1 ? 's' : ''}, ${data.cycleDuration} Weeks`,
        html: `<div style="${styles.wrapper}"><div style="${styles.card};max-width:600px;">
            <h1 style="${styles.h1}">🧪 Your Procurement List</h1>
            <p style="${styles.p}">Here's your optimized shopping list from the PeptiDex Cycle Planner. All quantities include a <strong style="color:#c9a961;">10% safety buffer</strong> to prevent mid-cycle shortfall.</p>

            <div style="display:flex;gap:24px;justify-content:center;margin:20px 0;flex-wrap:wrap;">
                ${styles.stat("Peptides", String(data.totalPeptides))}
                ${styles.stat("Duration", `${data.cycleDuration} wk`, "#a8a196")}
                ${styles.stat("Best Price", `$${cheapest?.totalAfterDiscount.toFixed(2) ?? '—'}`, "#4ade80")}
            </div>

            <div style="margin:24px 0;">
                <div style="font-size:10px;color:#5a564f;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:12px;">Top Vendors by Cost</div>
                ${vendorRows}
            </div>

            <div style="margin:24px 0;">
                <div style="font-size:10px;color:#5a564f;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:12px;">Per-Peptide Requirements (10% Buffer)</div>
                <table style="width:100%;border-collapse:collapse;" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                            <th style="padding:6px 12px;font-size:10px;color:#5a564f;text-transform:uppercase;letter-spacing:0.1em;text-align:left;">Peptide</th>
                            <th style="padding:6px 12px;font-size:10px;color:#5a564f;text-transform:uppercase;letter-spacing:0.1em;text-align:center;">Need</th>
                            <th style="padding:6px 12px;font-size:10px;color:#5a564f;text-transform:uppercase;letter-spacing:0.1em;text-align:center;">Vials</th>
                            <th style="padding:6px 12px;font-size:10px;color:#5a564f;text-transform:uppercase;letter-spacing:0.1em;text-align:right;">Best Price</th>
                        </tr>
                    </thead>
                    <tbody>${peptideSummary}</tbody>
                </table>
            </div>

            <div style="background:rgba(201,169,97,0.06);border:1px solid rgba(201,169,97,0.15);border-radius:8px;padding:14px 16px;font-size:12px;color:#a8a196;margin:20px 0;">
                <strong style="color:#c9a961;">10% safety buffer included.</strong> Quantities include a non-negotiable 10% overage to prevent mid-cycle shortfall from reconstitution loss, dose rounding, and vial retention.
            </div>

            <div style="text-align:center;margin-top:28px;">
                <a href="https://peptidex.app/tools/cycle-planner" style="${styles.btn}">Open Cycle Planner →</a>
            </div>

            <p style="${styles.footer}">
                PeptiDex · Peptide Research Intelligence<br/>
                You're receiving this because you requested a shopping list from the Cycle Planner.<br/>
                Prices verified ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}. Always confirm at checkout.<br/>
                <a href="https://peptidex.app" style="color:#5a564f;">peptidex.app</a>
            </p>
        </div></div>`,
    };
}

// ─── Send Utility ───────────────────────────────────────────
export async function sendEmail(to: string, template: { subject: string; html: string }): Promise<boolean> {
    const client = getClient();
    if (!client) {
        console.warn("[email] Resend not configured — skipping email to", to);
        return false;
    }

    try {
        const { error } = await client.emails.send({
            from: FROM_ADDRESS,
            to,
            subject: template.subject,
            html: template.html,
        });

        if (error) {
            console.error("[email] Send failed:", error);
            return false;
        }
        return true;
    } catch (err) {
        console.error("[email] Send error:", err);
        return false;
    }
}
