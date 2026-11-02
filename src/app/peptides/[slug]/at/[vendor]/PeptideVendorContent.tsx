/**
 * PeptideVendorContent — Data-merged content template for pSEO pages.
 * Server component. No client-side JS. Pure data merge.
 *
 * Editorial promise: research lives in /library/, sourcing lives here.
 * No outcome/timeline claims here: research is summarized as a cited-study count
 * linking to /library/. RUO DisclaimerCard renders at the top of the content.
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
import { DisclaimerCard } from "@/components/ui/DisclaimerCard";
import { TrackedOutboundLink } from "@/components/tracked-outbound-link";
import { FounderOwnershipDisclosure } from "@/components/disclosures/FounderOwnershipDisclosure";

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

      {/* ── Research-use-only notice (above pricing) ── */}
      <DisclaimerCard variant="vendor" />

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

      {/* ── Section 2: Vendor Quality Profile ── */}
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

      {/* ── Section 3: COA & Purity Data (Conditional) ── */}
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

      {/* ── Section 4: Research pointer (no outcome claims on sourcing pages) ── */}
      {peptide.key_studies?.length > 0 && (
        <section style={sectionStyle} id="research-summary">
          <h2 style={h2Style}>
            Published research on {peptide.name}: {peptide.key_studies.length} cited studies
          </h2>
          <p style={valueStyle}>
            Study models, endpoints, and evidence levels for {peptide.name} are summarized on its research profile.
            This page covers sourcing only.
          </p>
          <Link href={`/library/${peptide.slug}`} style={{ ...linkStyle, display: "inline-block", marginTop: 12, fontSize: 13 }}>
            {peptide.name} research profile — {peptide.key_studies.length} cited studies →
          </Link>
        </section>
      )}

      {/* ── Section 5: Key Research (top 2 studies) ── */}
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

      {/* ── Section 6: Vendor Comparison Strip ── */}
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
                      <td style={{ padding: "10px 12px", color: "var(--ink)" }}>
                        {alt.vendor.name}
                        <FounderOwnershipDisclosure vendorSlug={alt.vendorSlug} variant="inline" />
                      </td>
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

      {/* ── Section 7: Internal Links ── */}
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
          <Link href={`/tools/pk?peptide=${peptide.slug}`} style={{ ...linkStyle, fontSize: 13 }}>
            📈 {peptide.name} half-life &amp; PK reference →
          </Link>
          {relatedComparisons.slice(0, 2).map(comp => (
            <Link key={comp.slug} href={`/compare/${comp.slug}`} style={{ ...linkStyle, fontSize: 13 }}>
              ⚖️ {comp.slug.replace(/-/g, " ").replace(/\bvs\b/, "vs.")} →
            </Link>
          ))}
        </div>
      </section>

      {/* ── Section 8: Primary + Alternate CTAs ── */}
      <section style={{ ...sectionStyle, textAlign: "center", background: "linear-gradient(135deg, rgba(201,169,97,0.08) 0%, rgba(201,169,97,0.02) 100%)" }} id="buy-cta">
        <TrackedOutboundLink
          href={pricing.affiliateUrl || vendor.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          vendorSlug={vendor.slug}
          peptideSlug={peptide.slug}
          surface="pxv_page"
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
        </TrackedOutboundLink>
        {vendor.discountCode && (
          <p style={{ ...valueStyle, fontSize: 12, color: "var(--ink-dim)", marginTop: 8 }}>
            Use code <strong>{vendor.discountCode}</strong> for {discountPct}% off
          </p>
        )}

        {altVendors.length > 0 && (
          <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {altVendors.slice(0, 2).map(alt => (
              <TrackedOutboundLink
                key={alt.vendorSlug}
                href={alt.pricing.affiliateUrl || alt.vendor.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                vendorSlug={alt.vendorSlug}
                peptideSlug={peptide.slug}
                surface="pxv_alternative"
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
                <FounderOwnershipDisclosure vendorSlug={alt.vendorSlug} variant="inline" />
              </TrackedOutboundLink>
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
