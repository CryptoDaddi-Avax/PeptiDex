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
 *   Email 4  — Day 7:  How to Verify a Vendor Before You Order (key "first_cycle")
 *   Email 5  — Day 10: Smart Vendor Picker Quiz
 *   Email 6  — Day 14: Deal of the Week
 *   Email 7  — Day 21: Log Your Protocol
 */

import { Resend } from "resend";
import { PRIMARY_PROMO } from "@/lib/promos/config";
import { FOUNDER_OWNERSHIP_DISCLOSURE, isFounderOwned } from "@/components/disclosures/FounderOwnershipDisclosure";
import { buildAffiliateUrl } from "@/lib/promos/affiliateUrl";
import { vendorsSorted, vendorBySlug } from "@/data/vendors";
import { RANKING_DISCLOSURE } from "@/lib/vendor-criteria";

/** One-line notes for email 3; order and scores come from the published criteria. */
const EMAIL3_NOTES: Record<string, string> = {
  "amino-club": "Batch COAs from named third-party labs (HPLC + MS + endotoxin, per vendor). 60-day money-back guarantee. Ships internationally.",
  "bio-longevity-labs": "HPLC + LC-MS + endotoxin COAs (per vendor). 80+ compounds. PEPTIDEX stacks with their sales.",
  "limitless-life": "USA-manufactured (per vendor). 90+ compounds — largest catalog in the index. US only.",
  "elyria-bio": "COAs from ILS Labs and BT Labs with HPLC purity, identity and endotoxin, lot-traceable (per vendor). Venmo, Cash App, X Money, crypto. US only.",
  "pantheon-peptides": "COAs available. 50+ compounds. US only.",
  "lvlup-health": "Oral peptide specialist. Capsules + sublingual formats.",
};

const FROM   = "PeptiDex Research <brief@peptidex.app>";
const REPLY  = "reply@peptidex.app";

const FOOTER = `
---
You're receiving this because you subscribed to The Peptide Brief at peptidex.app.

Affiliate disclosure: Some links in this email may be affiliate links. If you click and purchase, PeptiDex may earn a commission at no extra cost to you. PeptiDex's founder owns Elyria Bio; vendors are ranked only on our published criteria. All peptides mentioned are for research purposes only and are not intended to diagnose, treat, cure, or prevent any disease.

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
        <strong>Affiliate disclosure:</strong> Some links may be affiliate links. PeptiDex may earn a commission if you purchase — at no extra cost to you. PeptiDex's founder owns Elyria Bio; vendors are ranked only on our published criteria.<br><br>
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
/** Hidden inbox preview text (shown after the subject line in most clients). */
function preheader(text: string) {
  return `<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${text}</div>`;
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
    ${p(`You just joined a research-focused newsletter built for people who follow peptide research seriously. No hype, no "miracle cure" headlines — just clean summaries of what the published studies actually say.`)}
    ${p(`First things first: here's the cheat sheet you were promised.`)}
    ${divider()}
    <p style="font-size:13px;font-weight:700;letter-spacing:0.06em;color:#6b7280;text-transform:uppercase;margin:0 0 12px;">Peptide Research Cheat Sheet</p>
    ${p(`We pulled together 8 of the most-researched peptides and summarized what each has been studied for, along with its evidence grade:`)}
    ${ul([
      "<strong>BPC-157</strong> — studied in tissue-repair and GI models, mostly animal data",
      "<strong>TB-500</strong> — thymosin beta-4 fragment studied in tissue-repair models",
      "<strong>Ipamorelin</strong> — growth hormone secretagogue studied in animal and early human research",
      "<strong>CJC-1295 no DAC</strong> — GHRH analog studied in growth hormone research",
      "<strong>GHK-Cu</strong> — copper peptide studied in skin and wound-healing models",
      "<strong>MOTS-c</strong> — mitochondrial-derived peptide studied in metabolic research",
      "<strong>Semax</strong> — ACTH-derived peptide studied in cognitive and neurological research",
      "<strong>Epitalon</strong> — studied in telomere and pineal-gland research",
    ])}
    ${p(`The full reference page for each is on PeptiDex — with cited studies, evidence grades, and vendor-supplied COA data.`)}
    ${cta("Open the full peptide library", "https://peptidex.app/learn")}
    ${divider()}
    ${p(`Over the next few weeks I'll walk you through how to read a COA, which vendors we actually trust, and how to verify a vendor before you order. Next email lands in 2 days.`)}
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
    ${p(`Next email: the vendors in our index and how they score on our published criteria.`)}
    ${p(`— The PeptiDex Research Team`)}
  `);
  return { subject, html, text: textFallback(subject, "https://peptidex.app/tools/coa") };
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL 3 — Day 4: The 6 Vendors We Trust
// ══════════════════════════════════════════════════════════════════════════════

export function email3_vendors(firstName = "there") {
  const subject = "The peptide vendors in our index — and how they score";
  const html = wrap(`
    ${h1(`The ${vendorsSorted.length} vendors in the PeptiDex index — and how they score`)}
    ${p(`We score every vendor out of 100 on six published criteria: COA availability, third-party lab testing, price per mg, shipping, payment options and returns. Scores use each vendor's own published information and our checked list prices — PeptiDex does not test products. Here's the current order:`)}
    ${ul(vendorsSorted.map((v, i) =>
      `<strong>#${i + 1} ${v.name}</strong>${v.ownedByFounder ? " (owned by PeptiDex's founder)" : ""} — ${v.criteria.total}/100. ${EMAIL3_NOTES[v.slug] ?? v.tagline}${v.discountCode ? ` Code <strong>${v.discountCode}</strong> = ${v.discountPercent}% off.` : ""}`
    ))}
    ${p(`<strong>Disclosure:</strong> ${FOUNDER_OWNERSHIP_DISCLOSURE}`)}
    ${p(`Scores change when a vendor's published information or our checked prices change. The full rules are at <a href="https://peptidex.app/about/methodology#vendor-ranking" style="color:#16a34a;">peptidex.app/about/methodology</a>.`)}
    ${cta("Read the full vendor comparison", "https://peptidex.app/vendors")}
    ${divider()}
    ${p(`One thing I want to be transparent about: ${RANKING_DISCLOSURE} Commission is how the site stays free.`)}
    ${p(`Next email in 3 days: how to verify a vendor before you order.`)}
    ${p(`— The PeptiDex Research Team`)}
  `);
  return { subject, html, text: textFallback(subject, "https://peptidex.app/vendors") };
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL 4 — Day 7: How to Verify a Vendor Before You Order
// ══════════════════════════════════════════════════════════════════════════════

// Sequence key ("first_cycle") is kept stable so already-queued email_queue
// rows resolve to this template instead of failing with "Unknown email key".
export const EMAIL4_SUBJECT = "How to verify a peptide vendor before you order";

export function email4_verifyVendor(firstName = "there") {
  const subject = EMAIL4_SUBJECT;
  const promo = PRIMARY_PROMO;
  const promoUrl = buildAffiliateUrl(promo, "email_welcome_verify_vendor");
  const html = wrap(`
    ${preheader(`COAs, batch numbers, and the red flags that should stop an order — plus this month's ${promo.vendorName} code.`)}
    ${h1(`How to verify a peptide vendor before you order`)}
    ${p(`Hey ${firstName} — a polished storefront tells you nothing about what's in the vial. Before you place an order with any research peptide vendor, run through this checklist:`)}
    ${ul([
      `<strong>Third-party COAs</strong> — look for a Certificate of Analysis from an independent lab, ideally HPLC (purity) plus mass spectrometry (identity). Vendor self-testing is not verification.`,
      `<strong>Matching batch numbers</strong> — the lot number on the COA should match the lot on the product you receive. A generic or undated COA is a warning sign.`,
      `<strong>Run the COA through our checker</strong> — the PeptiDex COA checker flags missing fields, low purity values, and weak testing methods.`,
      `<strong>Read the vendor reviews</strong> — our vendor pages summarize testing methodology, COA transparency, and shipping reliability for each vendor in the index.`,
    ])}
    ${cta("Check a COA", "https://peptidex.app/tools/coa")}
    ${divider()}
    <p style="font-size:13px;font-weight:700;letter-spacing:0.06em;color:#6b7280;text-transform:uppercase;margin:0 0 12px;">Red flags</p>
    ${ul([
      `No COA available, or a COA that won't name the testing lab`,
      `Products marketed for human use or consumption`,
      `Dosing, injection, or "protocol" advice on product pages — legitimate research suppliers don't give it`,
    ])}
    ${p(`Compare vendors side by side on the <a href="https://peptidex.app/vendors" style="color:#16a34a;">PeptiDex vendor reviews</a> page.`)}
    ${divider()}
    ${p(`Comparing prices? The <a href="https://peptidex.app/tools/pricing" style="color:#16a34a;">PeptiDex price comparison</a> shows each vendor's price with current coupon codes applied, and its cart optimizer finds the lowest-cost vendor and vial mix for the vials you add.`)}
    ${p(`Current coupon: <strong>${promo.vendorName}</strong> — code <strong>${promo.code}</strong> takes ${promo.discountPercent}% off at checkout. <a href="${promoUrl}" rel="sponsored nofollow" style="color:#16a34a;">Shop ${promo.vendorName}</a> (affiliate link).`)}
    ${isFounderOwned(promo.vendorSlug) ? p(`<strong>Disclosure:</strong> ${FOUNDER_OWNERSHIP_DISCLOSURE}`) : ""}
    ${p(`— The PeptiDex Research Team`)}
  `);
  return { subject, html, text: textFallback(subject, "https://peptidex.app/tools/coa") };
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
      "Do you pay by card or crypto?",
      "Is price, shipping speed, or testing quality your priority?",
    ])}
    ${p(`It cross-references our vendor index, catalog data, and current pricing to give you a ranked list — not a generic "all are good" answer.`)}
    ${cta("Take the 4-question picker", "https://peptidex.app/tools/vendor-picker")}
    ${divider()}
    ${p(`Quick note: if you're outside the US, your options are limited. Amino Club and Bio Longevity Labs are the only vendors in our index that ship internationally. Elyria Bio ships US only.`)}
    ${p(`<strong>Disclosure:</strong> ${FOUNDER_OWNERSHIP_DISCLOSURE}`)}
    ${p(`If your priority is value, Bio Longevity Labs lets you stack code <strong>PEPTIDEX</strong> (15% off) with their site-wide sales — the only vendor in our index where the code stacks with existing promotions. Total savings can exceed 30% during sales.`)}
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
    ${p(`Every two weeks I'll drop a value buy from the vendors in our index. This week:`)}
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:20px;margin:0 0 24px;">
      <p style="font-size:13px;font-weight:700;color:#15803d;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 8px;">Featured Deal</p>
      <p style="font-size:18px;font-weight:700;color:#111827;margin:0 0 4px;">Bio Longevity Labs — 15% off, stackable with sales</p>
      <p style="font-size:14px;color:#374151;margin:0 0 12px;">Use code <strong>PEPTIDEX</strong> at checkout. Stacks with site-wide sale prices — the only vendor in our index where this works. HPLC + LC-MS + endotoxin testing (per vendor).</p>
      <p style="font-size:13px;color:#6b7280;margin:0;">When stacked with a 20% site sale: BPC-157 10mg → <strong>~$27</strong> after combined discount | 80+ compound catalog available.</p>
    </div>
    ${p(`What makes BLL unique in the index: their PEPTIDEX code stacks with sitewide sales. Every other vendor treats the code as a standalone discount. At BLL, during a sale you can combine both — routinely hitting 30%+ total off.`)}
    ${cta("Shop Bio Longevity Labs (code: PEPTIDEX)", "https://biolongevitylabs.com/ref/PeptiDex/")}
    ${divider()}
    ${p(`Bio Longevity Labs ranks #${vendorBySlug["bio-longevity-labs"].sortOrder} on our published criteria (${vendorBySlug["bio-longevity-labs"].criteria.total}/100) and carries 80+ compounds.`)}
    ${p(`<strong>Disclosure:</strong> ${FOUNDER_OWNERSHIP_DISCLOSURE}`)}
    ${p(`Affiliate disclosure: PeptiDex earns a commission on Bio Longevity Labs purchases through our link. This deal is featured because of the stackable discount mechanic — it's the only vendor in the index where you can combine the PEPTIDEX code with sale pricing.`)}
    ${p(`— The PeptiDex Research Team`)}
  `);
  return { subject, html, text: textFallback(subject, "https://biolongevitylabs.com/ref/PeptiDex/") };
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL 7 — Day 21: Log Your Protocol
// ══════════════════════════════════════════════════════════════════════════════

export function email7_logProtocol(firstName = "there") {
  const subject = "One ask: log your protocol (it helps everyone)";
  const html = wrap(`
    ${h1(`Want to help other researchers? Log your protocol.`)}
    ${p(`If you have outcome data from a research protocol, it's exactly the kind of data other researchers need.`)}
    ${p(`The PeptiDex protocol log is a structured form where you record:`)}
    ${ul([
      "Which peptide(s) were researched",
      "Which vendor and batch",
      "Subjective efficacy and side effect ratings",
      "Final outcome notes",
    ])}
    ${p(`Anonymous logs are aggregated into the PeptiDex community dataset — the efficacy and side effect scores you see on each peptide page come directly from contributor logs.`)}
    ${p(`You don't have to be an expert. A basic log — compound, vendor, batch, and an outcome rating — is more useful than nothing.`)}
    ${cta("Log a protocol", "https://peptidex.app/log-protocol")}
    ${divider()}
    ${p(`You can start a log now and come back later to add outcome notes. The form saves your progress.`)}
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
  { delayDays: 7,  key: "first_cycle",   fn: email4_verifyVendor, subject: EMAIL4_SUBJECT },
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
