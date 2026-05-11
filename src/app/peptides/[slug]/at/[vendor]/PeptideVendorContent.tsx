/**
 * PeptideVendorContent — Data-merged content template for pSEO pages.
 * Server component. No client-side JS. Pure data merge.
 *
 * Editorial promise: research lives in /library/, sourcing lives here.
 * Side effects + timeline are truncated to 100-150 words with link to /library/.
 *
 * Created: 2026-05-11 — pSEO route architecture
 */

import Link from "next/link";
import type { PseoPair } from "@/lib/pseo-pairs";
import { getVendorsForPeptide } from "@/lib/pseo-pairs";
import { vendorVerifications } from "@/data/verification-data";
import { vendorEditorial } from "@/data/vendorEditorial";
import { comparisons } from "@/data/comparisons";
import { vendorCartConfigs } from "@/data/vendor-cart-config";

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function tierLabel(tier: string): string {
  const map: Record<string, string> = {
    gold: "Gold — Triple-verified",
    silver: "Silver — Vendor COA + independent data",
    bronze: "Bronze — Vendor COA only",
    unverified: "Unverified",
  };
  return map[tier] || tier;
}

function tierEmoji(tier: string): string {
  return { gold: "🥇", silver: "🥈", bronze: "🥉", unverified: "❓" }[tier] || "❓";
}

/** Compute vials needed for a standard cycle */
function computeVials(pair: PseoPair): { vials: number; totalMcg: number } | null {
  const d = pair.peptide.dosing;
  if (!d?.typical_dose_mcg || !d?.cycle_weeks) return null;
  const doseMcg = d.typical_dose_mcg[1]; // high end
  const weeks = d.cycle_weeks[1];
  const freqPerWeek = d.frequency?.toLowerCase().includes("daily") ? 7
    : d.frequency?.toLowerCase().includes("2x") ? 2
    : d.frequency?.toLowerCase().includes("3x") ? 3
    : d.frequency?.toLowerCase().includes("5 on") ? 5
    : 7;
  const totalMcg = doseMcg * freqPerWeek * weeks * 1.1; // 10% buffer
  const vialMcg = pair.pricing.vial_mg * 1000;
  return { vials: Math.ceil(totalMcg / vialMcg), totalMcg };
}

// ── Styles ───────────────────────────────────────────────────────────────────

const sectionStyle: React.CSSProperties = {
  marginBottom: 32,
  padding: "24px 28px",
  background: "var(--bg-card)",
  border: "1px solid var(--line)",
  borderRadius: 16,
};

const h2Style: React.CSSProperties = {
  fontFamily: "var(--serif)",
  fontSize: 20,
  fontWeight: 600,
  color: "var(--ink)",
  marginBottom: 16,
  letterSpacing: "-0.01em",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 10,
  color: "var(--ink-mute)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
};

const valueStyle: React.CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 14,
  color: "var(--ink)",
  lineHeight: 1.6,
};

const linkStyle: React.CSSProperties = {
  color: "var(--gold)",
  textDecoration: "none",
  fontWeight: 500,
};

// ── Component ────────────────────────────────────────────────────────────────

interface Props {
  pair: PseoPair;
}

export function PeptideVendorContent({ pair }: Props) {
  const { peptide, vendor, pricing } = pair;
  const discountPct = vendor.discountPercent ?? 0;
  const discountedPrice = pricing.price_usd * (1 - discountPct / 100);
  const verification = vendorVerifications.find(v => v.vendorSlug === vendor.slug);
  const editorial = vendorEditorial[vendor.slug];
  const cartConfig = vendorCartConfigs[vendor.slug];
  const vialCalc = computeVials(pair);
  const altVendors = getVendorsForPeptide(pair.peptideSlug).filter(
    p => p.vendorSlug !== pair.vendorSlug
  );

  // Find related comparisons
  const relatedComparisons = comparisons.filter(c =>
    c.slug.includes(peptide.slug)
  );

  // COA for this specific pair
  const pairCOA = verification?.vendorCOAs.find(
    c => c.peptide.toLowerCase().replace(/[\s-]+/g, "-") === peptide.slug ||
         c.peptide.toLowerCase() === peptide.name.toLowerCase()
  );

  return (
    <div className="about-content" style={{ maxWidth: 900 }}>

      {/* ── Section 1: Product Overview ── */}
      <section style={sectionStyle} id="product-overview">
        <h2 style={h2Style}>
          Buying {peptide.name} from {vendor.name}
        </h2>
        <p style={valueStyle}>
          {vendor.name} carries {peptide.name} in <strong>{pricing.vial_mg}mg vials</strong> at{" "}
          <strong>${fmt(pricing.price_usd)}</strong> per vial
          {discountPct > 0 && (
            <> (${fmt(discountedPrice)} with code <strong>{vendor.discountCode}</strong> for{" "}
            {discountPct}% off)</>
          )}.
          {!pricing.inStock && <em> Currently out of stock.</em>}
        </p>
        <p style={{ ...valueStyle, marginTop: 8 }}>
          {peptide.name}{peptide.aliases?.length > 0 && <> ({peptide.aliases[0]})</>} is
          a {peptide.category} peptide researched for: {peptide.primary_benefits}.
        </p>
        {peptide.laypersonSummary && (
          <p style={{ ...valueStyle, marginTop: 8, fontStyle: "italic", color: "var(--ink-dim)" }}>
            {peptide.laypersonSummary}
          </p>
        )}
      </section>

      {/* ── Section 2: Dosing & Vial Calculator ── */}
      {peptide.dosing && (
        <section style={sectionStyle} id="dosing-protocol">
          <h2 style={h2Style}>
            Standard Research Protocol for {peptide.name}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 16 }}>
            {[
              { label: "Route", value: peptide.dosing.route },
              { label: "Dose Range", value: `${peptide.dosing.typical_dose_mcg[0]}–${peptide.dosing.typical_dose_mcg[1]} mcg` },
              { label: "Frequency", value: peptide.dosing.frequency },
              ...(peptide.dosing.cycle_weeks ? [{ label: "Cycle Length", value: `${peptide.dosing.cycle_weeks[0]}–${peptide.dosing.cycle_weeks[1]} weeks` }] : []),
              ...(peptide.dosing.timing ? [{ label: "Timing", value: peptide.dosing.timing }] : []),
              ...(peptide.half_life_hours ? [{ label: "Half-life", value: `${peptide.half_life_hours} hours` }] : []),
            ].map(item => (
              <div key={item.label} style={{ padding: "10px 14px", background: "var(--bg-soft)", borderRadius: 10, border: "1px solid var(--line)" }}>
                <div style={labelStyle}>{item.label}</div>
                <div style={{ ...valueStyle, fontWeight: 600, marginTop: 4 }}>{item.value}</div>
              </div>
            ))}
          </div>

          {vialCalc && (
            <div style={{ padding: 16, background: "rgba(201,169,97,0.06)", borderRadius: 12, border: "1px solid rgba(201,169,97,0.15)" }}>
              <p style={{ ...valueStyle, fontSize: 13 }}>
                <strong>Estimated procurement:</strong> At {peptide.dosing.typical_dose_mcg[1]} mcg{" "}
                {peptide.dosing.frequency?.toLowerCase()} for {peptide.dosing.cycle_weeks?.[1]} weeks,
                you would need approximately <strong>{vialCalc.vials} × {pricing.vial_mg}mg vials</strong> from{" "}
                {vendor.name} — <strong>${fmt(vialCalc.vials * pricing.price_usd)}</strong> before discount,{" "}
                <strong>${fmt(vialCalc.vials * discountedPrice)}</strong> after {discountPct}% off.
              </p>
            </div>
          )}

          {peptide.dosing.notes && (
            <p style={{ ...valueStyle, fontSize: 12, color: "var(--ink-mute)", marginTop: 12 }}>
              Note: {peptide.dosing.notes}
            </p>
          )}
        </section>
      )}

      {/* ── Section 3: Vendor Quality Profile ── */}
      <section style={sectionStyle} id="vendor-quality">
        <h2 style={h2Style}>
          {vendor.name} Quality Profile
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
          {[
            { label: "Rating", value: `${vendor.rating}/5 (${vendor.ratingCount} reviews)` },
            { label: "Purity Claim", value: vendor.purity },
            { label: "Testing Methods", value: vendor.testingMethods.join(", ") },
            { label: "Verification Tier", value: `${tierEmoji(vendor.verificationTier ?? '')} ${tierLabel(vendor.verificationTier ?? '')}` },
            ...(verification?.stats.averagePurity ? [{ label: "Independent Avg Purity", value: `${verification.stats.averagePurity}%` }] : []),
            ...(verification?.stats.overallPassRate ? [{ label: "Pass Rate", value: `${verification.stats.overallPassRate}%` }] : []),
            ...(verification?.independentTests[0]?.vendorScore ? [{ label: "Finnrick Score", value: verification.independentTests[0].vendorScore }] : []),
            { label: "Shipping", value: `${vendor.shippingSpeed} · ${vendor.shippingCost}` },
            { label: "Returns", value: vendor.returnPolicy },
            { label: "COA Status", value: vendor.coaStatus },
          ].map(item => (
            <div key={item.label} style={{ padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
              <span style={labelStyle}>{item.label}</span>
              <div style={{ ...valueStyle, fontSize: 13, marginTop: 2 }}>{item.value}</div>
            </div>
          ))}
        </div>

        {editorial && (
          <div style={{ marginTop: 20 }}>
            <p style={{ ...valueStyle, fontSize: 13, marginBottom: 8 }}>
              <strong>Strengths:</strong> {editorial.pros.slice(0, 3).join(" · ")}
            </p>
            <p style={{ ...valueStyle, fontSize: 13 }}>
              <strong>Limitations:</strong> {editorial.cons.slice(0, 2).join(" · ")}
            </p>
          </div>
        )}
      </section>

      {/* ── Section 4: COA & Purity Data (Conditional) ── */}
      <section style={sectionStyle} id="coa-data">
        <h2 style={h2Style}>
          Certificate of Analysis — {peptide.name} from {vendor.name}
        </h2>
        {pairCOA ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
              {[
                { label: "Batch", value: pairCOA.batchId },
                { label: "Test Date", value: pairCOA.testDate },
                { label: "Purity", value: `${pairCOA.purity}%` },
                ...(pairCOA.molecularWeight ? [{ label: "Molecular Weight", value: pairCOA.molecularWeight }] : []),
                { label: "Methods", value: pairCOA.methods.join(", ") },
                { label: "Source", value: pairCOA.sourceDetail },
              ].map(item => (
                <div key={item.label} style={{ padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
                  <span style={labelStyle}>{item.label}</span>
                  <div style={{ ...valueStyle, fontSize: 13, marginTop: 2 }}>{item.value}</div>
                </div>
              ))}
            </div>
            {pairCOA.annotation && (
              <p style={{ ...valueStyle, fontSize: 12, color: "var(--ink-dim)", marginTop: 12, fontStyle: "italic" }}>
                {pairCOA.annotation}
              </p>
            )}
            {pairCOA.documentUrl && (
              <a href={pairCOA.documentUrl} target="_blank" rel="noopener noreferrer"
                style={{ ...linkStyle, display: "inline-block", marginTop: 12, fontSize: 13 }}>
                View COA document →
              </a>
            )}
          </>
        ) : (
          <p style={{ ...valueStyle, color: "var(--ink-dim)" }}>
            No batch-specific COA data is currently on file for {peptide.name} from {vendor.name}.
            {" "}{vendor.name} claims {vendor.purity} purity verified
            by {vendor.testingMethods.join(" + ")}.
          </p>
        )}
      </section>

      {/* ── Section 5: Research Summary (truncated) ── */}
      {peptide.outcomes_timeline && (
        <section style={sectionStyle} id="research-summary">
          <h2 style={h2Style}>
            What to Expect on {peptide.name}
          </h2>
          <div style={{ display: "grid", gap: 8 }}>
            {peptide.outcomes_timeline.week_1 && (
              <p style={valueStyle}><strong>Week 1:</strong> {peptide.outcomes_timeline.week_1}</p>
            )}
            {peptide.outcomes_timeline.week_2_4 && (
              <p style={valueStyle}><strong>Weeks 2–4:</strong> {peptide.outcomes_timeline.week_2_4}</p>
            )}
          </div>
          <Link href={`/library/${peptide.slug}`} style={{ ...linkStyle, display: "inline-block", marginTop: 12, fontSize: 13 }}>
            Full {peptide.name} research profile — outcomes, side effects, studies →
          </Link>
        </section>
      )}

      {/* ── Section 6: Key Research (top 2 studies) ── */}
      {peptide.key_studies?.length > 0 && (
        <section style={sectionStyle} id="key-research">
          <h2 style={h2Style}>Key Research</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {peptide.key_studies.slice(0, 2).map((study, i) => (
              <div key={i} style={{ padding: "12px 16px", background: "var(--bg-soft)", borderRadius: 10, border: "1px solid var(--line)" }}>
                <a href={study.pubmed_url} target="_blank" rel="noopener noreferrer"
                  style={{ ...linkStyle, fontSize: 13, fontFamily: "var(--sans)" }}>
                  {study.title}
                </a>
                <p style={{ ...valueStyle, fontSize: 12, color: "var(--ink-dim)", marginTop: 4 }}>
                  {study.summary}
                </p>
                <span style={{ ...labelStyle, marginTop: 4, display: "inline-block" }}>
                  Evidence: {study.evidence_level}
                </span>
              </div>
            ))}
          </div>
          <Link href={`/library/${peptide.slug}`} style={{ ...linkStyle, display: "inline-block", marginTop: 12, fontSize: 13 }}>
            View all {peptide.key_studies.length} studies →
          </Link>
        </section>
      )}

      {/* ── Section 7: Vendor Comparison Strip ── */}
      {altVendors.length > 0 && (
        <section style={sectionStyle} id="vendor-comparison">
          <h2 style={h2Style}>
            Compare {peptide.name} Across Vendors
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sans)", fontSize: 13 }}>
              <thead>
                <tr>
                  {["Vendor", "Vial", "Price", "After Discount", ""].map(h => (
                    <th key={h} style={{ ...labelStyle, padding: "8px 12px", textAlign: "left", borderBottom: "2px solid var(--line)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Current vendor row (highlighted) */}
                <tr style={{ background: "rgba(201,169,97,0.06)" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: "var(--gold)" }}>
                    {vendor.name} <span style={{ fontSize: 10 }}>✦ viewing</span>
                  </td>
                  <td style={{ padding: "10px 12px" }}>{pricing.vial_mg}mg</td>
                  <td style={{ padding: "10px 12px" }}>${fmt(pricing.price_usd)}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 700 }}>${fmt(discountedPrice)}</td>
                  <td style={{ padding: "10px 12px" }}>—</td>
                </tr>
                {altVendors.map(alt => {
                  const altDisc = alt.pricing.price_usd * (1 - (alt.vendor.discountPercent ?? 0) / 100);
                  return (
                    <tr key={alt.vendorSlug} style={{ borderBottom: "1px solid var(--line)" }}>
                      <td style={{ padding: "10px 12px", color: "var(--ink)" }}>{alt.vendor.name}</td>
                      <td style={{ padding: "10px 12px" }}>{alt.pricing.vial_mg}mg</td>
                      <td style={{ padding: "10px 12px" }}>${fmt(alt.pricing.price_usd)}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 600 }}>${fmt(altDisc)}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <Link href={`/peptides/${peptide.slug}/at/${alt.vendorSlug}`} style={{ ...linkStyle, fontSize: 12 }}>
                          Compare →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link href={`/where-to-buy/${peptide.slug}`} style={{ ...linkStyle, display: "inline-block", marginTop: 12, fontSize: 13 }}>
            Full price comparison for {peptide.name} →
          </Link>
        </section>
      )}

      {/* ── Section 8: Internal Links ── */}
      <section style={sectionStyle} id="related-pages">
        <h2 style={h2Style}>Related Pages</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <Link href={`/library/${peptide.slug}`} style={{ ...linkStyle, fontSize: 13 }}>
            📚 Full {peptide.name} research profile →
          </Link>
          <Link href={`/learn/${peptide.slug}`} style={{ ...linkStyle, fontSize: 13 }}>
            🎓 Learn about {peptide.name} →
          </Link>
          <Link href={`/where-to-buy/${peptide.slug}`} style={{ ...linkStyle, fontSize: 13 }}>
            🛒 Compare all {peptide.name} vendors →
          </Link>
          <Link href="/tools/cycle-planner" style={{ ...linkStyle, fontSize: 13 }}>
            📐 Plan a {peptide.name} cycle →
          </Link>
          {relatedComparisons.slice(0, 2).map(comp => (
            <Link key={comp.slug} href={`/vs/${comp.slug}`} style={{ ...linkStyle, fontSize: 13 }}>
              ⚖️ {comp.slug.replace(/-/g, " ").replace(/\bvs\b/, "vs.")} →
            </Link>
          ))}
        </div>
      </section>

      {/* ── Section 9: Primary + Alternate CTAs ── */}
      <section style={{ ...sectionStyle, textAlign: "center", background: "linear-gradient(135deg, rgba(201,169,97,0.08) 0%, rgba(201,169,97,0.02) 100%)" }} id="buy-cta">
        <a
          href={pricing.affiliateUrl || vendor.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            background: "linear-gradient(135deg, var(--gold) 0%, var(--amber) 100%)",
            color: "#0a0a0b",
            fontFamily: "var(--sans)",
            fontSize: 15,
            fontWeight: 700,
            borderRadius: 12,
            textDecoration: "none",
            transition: "transform 0.15s",
          }}
        >
          Buy {peptide.name} from {vendor.name} →
        </a>
        {vendor.discountCode && (
          <p style={{ ...valueStyle, fontSize: 12, color: "var(--ink-dim)", marginTop: 8 }}>
            Use code <strong>{vendor.discountCode}</strong> for {discountPct}% off
          </p>
        )}

        {altVendors.length > 0 && (
          <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {altVendors.slice(0, 2).map(alt => (
              <a
                key={alt.vendorSlug}
                href={alt.pricing.affiliateUrl || alt.vendor.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  background: "var(--bg-soft)",
                  border: "1px solid var(--line-strong)",
                  color: "var(--ink)",
                  fontFamily: "var(--sans)",
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 10,
                  textDecoration: "none",
                }}
              >
                {alt.vendor.name} — ${fmt(alt.pricing.price_usd * (1 - (alt.vendor.discountPercent ?? 0) / 100))}
              </a>
            ))}
          </div>
        )}
      </section>

      {/* ── Disclaimer ── */}
      <div style={{ padding: 16, borderRadius: 12, background: "rgba(201,169,97,0.04)", border: "1px solid rgba(201,169,97,0.12)", marginBottom: 32 }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-mute)", lineHeight: 1.7 }}>
          ⚠ PeptiDex earns affiliate commissions on purchases made through links on this page.
          Pricing last verified: {pricing.lastTestedDate || vendor.lastTestedDate || "—"}.
          Vendor rating reflects {vendor.name}&apos;s overall reputation across all products, not a per-peptide score.
          This is not medical advice. Peptides are sold for research purposes only.
        </p>
      </div>
    </div>
  );
}
