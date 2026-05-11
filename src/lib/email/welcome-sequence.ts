/**
 * Welcome Sequence Email Templates
 * =================================
 * 7-email funnel for new Peptide Brief subscribers.
 * Plain-text feel, one CTA per email, affiliate disclosure footer.
 * 
 * Provider: Resend (resend.com) — already wired via src/lib/email.ts
 * Triggered by: /api/subscribe → schedules via Supabase cron rows
 * 
 * Schedule:
 *   Email 1  — Day 0:  Welcome + Cheat Sheet
 *   Email 2  — Day 2:  How to Read a COA
 *   Email 3  — Day 4:  The 6 Vendors We Trust
 *   Email 4  — Day 7:  Your First Cycle Walkthrough
 *   Email 5  — Day 10: Smart Vendor Picker Quiz
 *   Email 6  — Day 14: Deal of the Week
 *   Email 7  — Day 21: Log Your Protocol
 */

import { Resend } from "resend";

const FROM   = "PeptiDex Research <brief@peptidex.app>";
const REPLY  = "reply@peptidex.app";

const FOOTER = `
---
You're receiving this because you subscribed to The Peptide Brief at peptidex.app.

Affiliate disclosure: Some links in this email may be affiliate links. If you click and purchase, PeptiDex may earn a commission at no extra cost to you. We only recommend vendors we have independently reviewed. All peptides mentioned are for research purposes only and are not intended to diagnose, treat, cure, or prevent any disease.

Unsubscribe: https://peptidex.app/unsubscribe?email={{email}}
PeptiDex · For research use only · Not medical advice
`;

// ─── Shared HTML wrapper (plain-text feel) ─────────────────────────────────

function wrap(body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="background:#ffffff;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <div style="margin-bottom:32px;">
      <span style="font-size:13px;font-weight:700;letter-spacing:0.08em;color:#16a34a;text-transform:uppercase;">The Peptide Brief</span>
    </div>
    ${body}
    <div style="margin-top:48px;padding-top:24px;border-top:1px solid #e5e7eb;">
      <p style="font-size:11px;line-height:1.6;color:#9ca3af;margin:0;">
        You're receiving this because you subscribed to The Peptide Brief at <a href="https://peptidex.app" style="color:#9ca3af;">peptidex.app</a>.<br><br>
        <strong>Affiliate disclosure:</strong> Some links may be affiliate links. PeptiDex may earn a commission if you purchase — at no extra cost to you. We only recommend vendors we've independently reviewed.<br><br>
        All peptides are for research purposes only. Not medical advice.<br><br>
        <a href="https://peptidex.app/unsubscribe?email={{email}}" style="color:#9ca3af;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

function p(text: string) {
  return `<p style="font-size:15px;line-height:1.7;color:#1f2937;margin:0 0 20px;">${text}</p>`;
}
function h1(text: string) {
  return `<h1 style="font-size:22px;font-weight:700;color:#111827;margin:0 0 24px;line-height:1.3;">${text}</h1>`;
}
function cta(label: string, href: string) {
  return `<div style="margin:32px 0;">
    <a href="${href}" style="display:inline-block;padding:14px 28px;background:#16a34a;color:#ffffff;font-weight:600;font-size:15px;text-decoration:none;border-radius:8px;">${label} →</a>
  </div>`;
}
function ul(items: string[]) {
  return `<ul style="font-size:15px;line-height:1.9;color:#1f2937;margin:0 0 20px;padding-left:20px;">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
}
function divider() {
  return `<hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;">`;
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL 1 — Day 0: Welcome + Cheat Sheet
// ══════════════════════════════════════════════════════════════════════════════

export function email1_welcome(firstName = "there") {
  const subject = "Your peptide cheat sheet is here 🧬";
  const html = wrap(`
    ${h1(`Hey ${firstName}, welcome to The Peptide Brief.`)}
    ${p(`You just joined a research-focused newsletter built for people who take peptides seriously. No hype, no "miracle cure" headlines — just clean summaries of what the research actually says.`)}
    ${p(`First things first: here's the cheat sheet you were promised.`)}
    ${divider()}
    <p style="font-size:13px;font-weight:700;letter-spacing:0.06em;color:#6b7280;text-transform:uppercase;margin:0 0 12px;">Your First Peptide Cheat Sheet</p>
    ${p(`We pulled together the 8 most-researched peptides and summarized the key facts for each — mechanism, typical dose, cycle length, and evidence grade:`)}
    ${ul([
      "<strong>BPC-157</strong> — gut + tissue repair, 250–500 mcg/day, strong animal data",
      "<strong>TB-500</strong> — systemic recovery, 2–2.5 mg/week, often stacked with BPC",
      "<strong>Ipamorelin</strong> — GH pulse trigger, 200–300 mcg/dose, clean profile",
      "<strong>CJC-1295 no DAC</strong> — GHRH analog, stacks with Ipamorelin",
      "<strong>GHK-Cu</strong> — skin/wound healing, topical or injectable",
      "<strong>Semaglutide</strong> — GLP-1, weight + metabolic research",
      "<strong>Tirzepatide</strong> — dual GIP/GLP-1, newer generation",
      "<strong>Epitalon</strong> — telomere + pineal research, 5–10 mg/cycle",
    ])}
    ${p(`The full reference page for each is on PeptiDex — with sourced half-life tables, evidence grades, and COA data from verified vendors.`)}
    ${cta("Open the full peptide library", "https://peptidex.app/learn")}
    ${divider()}
    ${p(`Over the next few weeks I'll walk you through how to read a COA, which vendors we actually trust, and how to structure your first cycle. Next email lands in 2 days.`)}
    ${p(`— The PeptiDex Research Team`)}
  `);
  return { subject, html, text: textFallback(subject, "https://peptidex.app/learn") };
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL 2 — Day 2: How to Read a COA
// ══════════════════════════════════════════════════════════════════════════════

export function email2_coa(firstName = "there") {
  const subject = "How to read a peptide COA (most people skip this)";
  const html = wrap(`
    ${h1(`How to read a Certificate of Analysis`)}
    ${p(`Most people who buy research peptides never open the COA. That's a mistake — it's the only document that tells you whether what's in the vial matches what's on the label.`)}
    ${p(`Here's what to look for in 60 seconds:`)}
    ${ul([
      `<strong>Purity %</strong> — Should be ≥98%. Anything below 95% is a red flag. Top vendors hit 99%+.`,
      `<strong>Testing method</strong> — HPLC alone is baseline. HPLC + Mass Spec (LC-MS) is gold standard — it confirms molecular identity, not just purity.`,
      `<strong>Batch/lot number</strong> — Make sure the lot on your vial label matches the lot on the COA. Generic "batch range" COAs are a sign of corner-cutting.`,
      `<strong>Testing lab</strong> — Should be an independent, accredited third party. Vendor self-testing is not verification.`,
      `<strong>Endotoxin test</strong> — Optional but significant. Tests for bacterial contamination. Only top-tier vendors include this.`,
    ])}
    ${p(`The PeptiDex COA Analyzer tool lets you upload a COA PDF and it'll flag missing fields, check the purity value, and tell you whether the testing methodology meets our editorial standard.`)}
    ${cta("Open the COA Analyzer", "https://peptidex.app/tools/coa")}
    ${divider()}
    ${p(`Quick tip: if a vendor doesn't have a publicly linked COA for the specific product you're buying, ask for one before ordering. Legitimate vendors have them ready.`)}
    ${p(`Next email: the 6 vendors we've vetted and why we ranked them the way we did.`)}
    ${p(`— The PeptiDex Research Team`)}
  `);
  return { subject, html, text: textFallback(subject, "https://peptidex.app/tools/coa") };
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL 3 — Day 4: The 6 Vendors We Trust
// ══════════════════════════════════════════════════════════════════════════════

export function email3_vendors(firstName = "there") {
  const subject = "The 6 peptide vendors we actually trust (and why)";
  const html = wrap(`
    ${h1(`The 6 vendors in the PeptiDex index — and how we ranked them`)}
    ${p(`We review vendors on five criteria: testing methodology, COA transparency, purity specification, shipping reliability, and community sentiment. Here's the current lineup:`)}
    ${ul([
      `<strong>#1 Amino Club</strong> — Editor's Choice. Triple-tested (HPLC + LC-MS + Endotoxin). 60-day MBG. Ships internationally. Code <strong>PEPTIDEX</strong> = 20% off.`,
      `<strong>#2 Bio Longevity Labs</strong> — Triple-tested. 80+ compounds. PEPTIDEX discount stacks with their sales — up to 40%+ combined. Code <strong>PEPTIDEX</strong> = 15% off.`,
      `<strong>#3 Limitless Life</strong> — USA-manufactured. 90+ compounds. Largest catalog in the index. Code <strong>PEPTIDEX</strong> = 15% off.`,
      `<strong>#4 Ascension Peptides</strong> — Best value deal in the index. 60+ compounds. Code <strong>PEPTIDEX</strong> = 50% off.`,
      `<strong>#5 Pantheon Peptides</strong> — Competitive pricing, solid COA. 50+ compounds.`,
      `<strong>#6 LVLUP Health</strong> — Oral peptide specialist. Capsules + sublingual formats. Code <strong>PEPTIDEX</strong> = 15% off.`,
    ])}
    ${p(`We update the rankings quarterly based on new COA data, Finnrick community reports, and our own verification testing.`)}
    ${cta("Read the full vendor comparison", "https://peptidex.app/vendors")}
    ${divider()}
    ${p(`One thing I want to be transparent about: PeptiDex earns an affiliate commission when you buy through our links. That's how the site stays free. It doesn't change our rankings — vendors are evaluated blind to their affiliate terms.`)}
    ${p(`Next email in 3 days: how to structure your first peptide cycle.`)}
    ${p(`— The PeptiDex Research Team`)}
  `);
  return { subject, html, text: textFallback(subject, "https://peptidex.app/vendors") };
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL 4 — Day 7: Your First Cycle
// ══════════════════════════════════════════════════════════════════════════════

export function email4_firstCycle(firstName = "there") {
  const subject = "Your first peptide cycle — a walkthrough";
  const html = wrap(`
    ${h1(`How to structure your first peptide cycle`)}
    ${p(`If you're starting with peptides for the first time, the most common mistake is doing too much at once. Here's the approach I'd recommend:`)}
    <p style="font-size:14px;font-weight:700;color:#16a34a;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Week 1–2: Foundation</p>
    ${p(`Start with a single peptide. BPC-157 is the most forgiving starting point — broad tissue repair applications, strong safety profile in animal literature, minimal reported side effects. Dose: 250–500 mcg/day subcutaneous, split AM/PM.`)}
    <p style="font-size:14px;font-weight:700;color:#16a34a;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Week 3–8: Core Cycle</p>
    ${p(`If week 1–2 goes well, continue for a full 6–8 week cycle. Log how you feel weekly — that data becomes useful for your next cycle. Common addition at week 3: TB-500 2x/week for systemic synergy with BPC.`)}
    <p style="font-size:14px;font-weight:700;color:#16a34a;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Week 9+: Off-cycle & Assessment</p>
    ${p(`4 weeks off minimum. Review your log. Decide whether to repeat, adjust dose, or switch peptides based on what you observed.`)}
    ${divider()}
    ${p(`The Cycle Planner tool on PeptiDex will walk you through this interactively — you input your goal and it outputs a suggested cycle with dose ranges, timing, and reconstitution math.`)}
    ${cta("Open the Cycle Planner", "https://peptidex.app/tools/cycle-planner")}
    ${p(`— The PeptiDex Research Team`)}
  `);
  return { subject, html, text: textFallback(subject, "https://peptidex.app/tools/cycle-planner") };
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL 5 — Day 10: Smart Vendor Picker
// ══════════════════════════════════════════════════════════════════════════════

export function email5_vendorPicker(firstName = "there") {
  const subject = "4 questions → the right vendor for you";
  const html = wrap(`
    ${h1(`Not sure which vendor to buy from? Answer 4 questions.`)}
    ${p(`We built a vendor picker tool that asks 4 questions and returns a ranked recommendation based on your specific situation:`)}
    ${ul([
      "What peptide are you researching?",
      "Are you in the US or outside the US?",
      "Is price or testing quality your priority?",
      "Do you prefer injectable or oral format?",
    ])}
    ${p(`It cross-references our vendor index, catalog data, and current pricing to give you a ranked list — not a generic "all are good" answer.`)}
    ${cta("Take the 4-question picker", "https://peptidex.app/tools/vendor-picker")}
    ${divider()}
    ${p(`Quick note: if you're outside the US, your options are limited. Amino Club and Bio Longevity Labs are the only two vendors in our index that ship internationally.`)}
    ${p(`If you're US-based and price is the main factor, Ascension Peptides with code <strong>PEPTIDEX</strong> is currently the best math — 50% off, 60+ compound catalog.`)}
    ${p(`— The PeptiDex Research Team`)}
  `);
  return { subject, html, text: textFallback(subject, "https://peptidex.app/tools/vendor-picker") };
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL 6 — Day 14: Deal of the Week
// ══════════════════════════════════════════════════════════════════════════════

export function email6_deal(firstName = "there") {
  const subject = "This week's best peptide deal";
  const html = wrap(`
    ${h1(`Deal of the week`)}
    ${p(`Every two weeks I'll drop the current best value buy across our verified vendor index. This week:`)}
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin:0 0 24px;">
      <p style="font-size:13px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 8px;">Featured Deal</p>
      <p style="font-size:18px;font-weight:700;color:#111827;margin:0 0 4px;">Ascension Peptides — 50% off everything</p>
      <p style="font-size:14px;color:#374151;margin:0 0 12px;">Use code <strong>PEPTIDEX</strong> at checkout. Applies to all 60+ compounds sitewide. No minimum order.</p>
      <p style="font-size:13px;color:#6b7280;margin:0;">Sample prices after code: BPC-157 10mg → <strong>~$35</strong> | Ipamorelin 5mg → <strong>~$25</strong> | Sermorelin 10mg → <strong>~$42.50</strong></p>
    </div>
    ${p(`For context: the next closest discount in our index is 20% (Amino Club). The 50% Ascension deal is the largest exclusive code we have.`)}
    ${cta("Shop Ascension Peptides (code: PEPTIDEX)", "https://ascensionpeptides.com/ref/PeptiDex/")}
    ${divider()}
    ${p(`If BPC-157 or Ipamorelin are on your list: the post-code prices at Ascension are roughly half what you'd pay at full price elsewhere. Worth running the math on your planned order.`)}
    ${p(`Affiliate disclosure: PeptiDex earns a commission on Ascension purchases through our link. This deal is featured because it's objectively the largest discount in our index — not because of commission rate.`)}
    ${p(`— The PeptiDex Research Team`)}
  `);
  return { subject, html, text: textFallback(subject, "https://ascensionpeptides.com/ref/PeptiDex/") };
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL 7 — Day 21: Log Your Protocol
// ══════════════════════════════════════════════════════════════════════════════

export function email7_logProtocol(firstName = "there") {
  const subject = "One ask: log your protocol (it helps everyone)";
  const html = wrap(`
    ${h1(`Want to help other researchers? Log your protocol.`)}
    ${p(`Three weeks in — if you've started a cycle, you're now sitting on data that other researchers need.`)}
    ${p(`The PeptiDex protocol log is a structured form where you record:`)}
    ${ul([
      "Which peptide(s) you're running",
      "Dose and frequency",
      "Which vendor and batch",
      "Weekly subjective efficacy and side effect ratings",
      "Final outcome notes at cycle end",
    ])}
    ${p(`Anonymous logs are aggregated into the PeptiDex community dataset — the efficacy and side effect scores you see on each peptide page come directly from contributor logs like yours.`)}
    ${p(`You don't have to be an expert. A basic log — "BPC-157, 500 mcg/day, 8 weeks, vendor X, efficacy 7/10" — is more useful than nothing.`)}
    ${cta("Log my protocol", "https://peptidex.app/log-protocol")}
    ${divider()}
    ${p(`If you haven't started a cycle yet, you can still log a planned protocol and come back to fill in the outcomes. The form saves your progress.`)}
    ${p(`Thanks for being part of this. The whole point of PeptiDex is to build a research dataset that's actually useful — and that only works if people like you contribute to it.`)}
    ${p(`— The PeptiDex Research Team`)}
    ${divider()}
    ${p(`P.S. — This is the last email in the welcome sequence. From here you'll just get The Peptide Brief weekly newsletter. If you have questions, just reply to this email.`)}
  `);
  return { subject, html, text: textFallback(subject, "https://peptidex.app/log-protocol") };
}

// ─── Plain text fallback ────────────────────────────────────────────────────

function textFallback(subject: string, ctaUrl: string): string {
  return `${subject}\n\nView this email in your browser or visit: ${ctaUrl}\n\n${FOOTER}`;
}

// ─── Sequence config ────────────────────────────────────────────────────────

export const WELCOME_SEQUENCE = [
  { delayDays: 0,  key: "welcome",       fn: email1_welcome,     subject: "Your peptide cheat sheet is here 🧬" },
  { delayDays: 2,  key: "coa",           fn: email2_coa,         subject: "How to read a peptide COA" },
  { delayDays: 4,  key: "vendors",       fn: email3_vendors,     subject: "The 6 vendors we actually trust" },
  { delayDays: 7,  key: "first_cycle",   fn: email4_firstCycle,  subject: "Your first peptide cycle" },
  { delayDays: 10, key: "vendor_picker", fn: email5_vendorPicker, subject: "4 questions → the right vendor" },
  { delayDays: 14, key: "deal",          fn: email6_deal,        subject: "Deal of the week" },
  { delayDays: 21, key: "log_protocol",  fn: email7_logProtocol, subject: "Log your protocol" },
];

// ─── Send a single sequence email ───────────────────────────────────────────

export async function sendSequenceEmail(
  resend: Resend,
  to: string,
  emailKey: string,
  firstName?: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const step = WELCOME_SEQUENCE.find(s => s.key === emailKey);
  if (!step) return { success: false, error: `Unknown email key: ${emailKey}` };

  const { subject, html, text } = step.fn(firstName);

  try {
    const result = await resend.emails.send({
      from: FROM,
      replyTo: REPLY,
      to,
      subject,
      html,
      text,
    });
    return { success: true, id: result.data?.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, error: msg };
  }
}
