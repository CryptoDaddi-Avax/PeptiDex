/**
 * VendorRankCard — Individual vendor section card for /vendors listicle.
 * =======================================================================
 * Renders a full ranked vendor section: rank badge, H2, editorial blurb,
 * pros/cons, COA badge, and dual affiliate CTAs (above + below fold).
 *
 * Pulls from:
 *   - vendors.ts  (Vendor)         → data fields
 *   - vendorEditorial.ts           → shortPitch, pros, cons, blurb
 *   - verification-data.ts         → verification tier badge
 *
 * Design: vn-* + vrk-* CSS namespace.
 */

import Link from "next/link";
import {
  ShieldCheck,
  FlaskConical,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { type Vendor } from "@/data/vendors";
import { vendorEditorial } from "@/data/vendorEditorial";
import { verificationBySlug, getTierLabel, getTierColor } from "@/data/verification-data";
import { VendorOutboundLink } from "@/app/vendors/vendor-outbound-link";

// ── Ordinal suffix helper ─────────────────────────────────────────────────────

function ordinalLabel(n: number): string {
  if (n === 1) return "#1 Editor's Choice";
  if (n === 2) return "#2 Runner-Up";
  return `#${n}`;
}

// ── Badge class helper ────────────────────────────────────────────────────────

function badgeClass(style: Vendor["badgeStyle"]): string {
  const map: Record<string, string> = {
    gold: "vn-tag solid-gold",
    premium: "vn-tag solid-premium",
    green: "vn-tag green",
    blue: "vn-tag solid-blue",
    orange: "vn-tag solid-orange",
  };
  return map[style] ?? "vn-tag green";
}

// ── COA Badge ─────────────────────────────────────────────────────────────────

/**
 * Converts an ISO date string ("2026-04-10") to a locale-invariant label
 * like "Apr 2026". Using toLocaleDateString() here causes a hydration
 * mismatch because Node.js and the browser can produce different strings
 * depending on their respective ICU locale data builds.
 */
function formatVerifiedDate(iso: string): string {
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun",
                  "Jul","Aug","Sep","Oct","Nov","Dec"];
  const [year, month] = iso.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  return `${MONTHS[monthIndex] ?? month} ${year}`;
}

function CoaBadge({ vendor }: { vendor: Vendor }) {
  const inner = (
    <span className="vrk-coa-badge">
      <ShieldCheck size={14} />
      {vendor.coaStatus} — {vendor.testingMethods.join(", ")}
      {vendor.lastTestedDate && (
        <span className="vrk-coa-date">
          &nbsp;· Verified {formatVerifiedDate(vendor.lastTestedDate)}
        </span>
      )}
    </span>
  );

  if (vendor.coaUrl) {
    return (
      <a
        href={vendor.coaUrl}
        target="_blank"
        rel="nofollow noopener"
        className="vrk-coa-link"
        aria-label={`View ${vendor.name} sample COA`}
      >
        {inner}
        <ExternalLink size={11} className="vrk-coa-ext" />
      </a>
    );
  }
  return <div className="vrk-coa-link static">{inner}</div>;
}

// ── Affiliate CTA ─────────────────────────────────────────────────────────────

function AffiliateCta({
  vendor,
  position,
  size = "primary",
}: {
  vendor: Vendor;
  position: "above" | "below";
  size?: "primary" | "secondary";
}) {
  const label = position === "above" ? `Shop ${vendor.name}` : `Visit ${vendor.name}`;
  return (
    <div className={`vrk-cta vrk-cta-${position}`}>
      <VendorOutboundLink
        href={vendor.affiliateUrl}
        vendorName={vendor.name}
        location={`rank_card_${vendor.slug}_${position}`}
        className={size === "primary" ? "vn-btn-primary vrk-cta-btn" : "vn-btn-ghost vrk-cta-btn"}
      >
        {label} <ArrowRight size={14} />
      </VendorOutboundLink>
      {vendor.discountCode && (
        <span className="vrk-cta-code">
          Use code <strong>{vendor.discountCode}</strong> — {vendor.discountPercent}% off
          {vendor.discountStackable && <em> (stacks with sales)</em>}
        </span>
      )}
      <span className="vrk-cta-disclosure">
        Affiliate link — PeptiDex may earn a commission at no cost to you.
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface VendorRankCardProps {
  vendor: Vendor;
  rank: number;
}

export function VendorRankCard({ vendor, rank }: VendorRankCardProps) {
  const editorial = vendorEditorial[vendor.slug];
  const vData = verificationBySlug[vendor.slug];
  const tierColor = vendor.verificationTier
    ? getTierColor(vendor.verificationTier)
    : undefined;

  const isFeatured = rank <= 2;
  const isBLL = vendor.slug === "bio-longevity-labs";

  // Blurb paragraphs — split on \n\n
  const paragraphs = editorial?.blurb?.split("\n\n") ?? [vendor.tagline];

  return (
    <article
      id={vendor.slug}
      className={`vrk-card${isFeatured ? " vrk-card-featured" : ""}${isBLL ? " vrk-card-bll" : ""}`}
      aria-label={`${ordinalLabel(rank)}: ${vendor.name}`}
    >
      {/* ── Rank strip ─────────────────────────────────────────────────── */}
      <div className="vrk-rank-strip">
        <span className="vrk-rank-num">{ordinalLabel(rank)}</span>
        <div className="vrk-badges">
          <span className={badgeClass(vendor.badgeStyle)}>{vendor.badge}</span>
          <span className="vn-tag green">✓ COA Verified</span>
          {vendor.verificationTier && tierColor && (
            <Link
              href={`/coa#verify-${vendor.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 10px",
                borderRadius: "99px",
                fontSize: "10px",
                fontFamily: "var(--mono)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: `${tierColor}18`,
                border: `1px solid ${tierColor}40`,
                color: tierColor,
                textDecoration: "none",
              }}
            >
              <ShieldCheck size={10} />
              {getTierLabel(vendor.verificationTier)}
              {vData && ` · ${vData.stats.totalIndependentTests} tests`}
            </Link>
          )}
        </div>
      </div>

      {/* ── H2 Vendor name + short pitch ───────────────────────────────── */}
      <h2 className="vrk-h2">
        {vendor.name}
      </h2>
      {editorial?.shortPitch ? (
        <p className="vrk-short-pitch">{editorial.shortPitch}</p>
      ) : (
        /* TODO: Add shortPitch to vendorEditorial.ts for this vendor */
        <p className="vrk-short-pitch">{vendor.tagline}</p>
      )}

      {/* ── Rating + Purity row ─────────────────────────────────────────── */}
      <div className="vrk-stats-row">
        <div className="vrk-stat">
          <div className="vrk-stat-value vrk-stat-gold">★ {vendor.rating}<span className="vrk-stat-max">/5</span></div>
          <div className="vrk-stat-label">{vendor.ratingCount} reviews</div>
        </div>
        <div className="vrk-stat">
          <div className="vrk-stat-value vrk-stat-green">{vendor.purity}</div>
          <div className="vrk-stat-label">Purity verified</div>
        </div>
        <div className="vrk-stat">
          <div className="vrk-stat-value">{vendor.catalogSize}</div>
          <div className="vrk-stat-label">Catalog</div>
        </div>
        <div className="vrk-stat">
          <div className="vrk-stat-value">{vendor.shippingSpeed.replace(" (US)", "")}</div>
          <div className="vrk-stat-label">Shipping (US)</div>
        </div>
      </div>

      {/* ── Stackable discount callout (BLL special) ────────────────────── */}
      {isBLL && vendor.discountStackable && (
        <div className="vn-discount-callout">
          <Sparkles size={14} />
          <span>
            Use code <strong>PEPTIDEX</strong> for {vendor.discountPercent}% off —{" "}
            <em>stacks with any active sale</em> for up to 40%+ savings
          </span>
        </div>
      )}
      {!isBLL && vendor.discountCode && (
        <div className="vn-discount-callout simple">
          <span>
            Use code <strong>{vendor.discountCode}</strong> for {vendor.discountPercent}% off
          </span>
        </div>
      )}

      {/* ── CTA: ABOVE the fold ─────────────────────────────────────────── */}
      <AffiliateCta vendor={vendor} position="above" size="primary" />

      {/* ── COA Badge ──────────────────────────────────────────────────── */}
      <CoaBadge vendor={vendor} />

      {/* ── Editorial blurb ─────────────────────────────────────────────── */}
      <div className="vrk-blurb">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* ── Pros / Cons ─────────────────────────────────────────────────── */}
      <div className="vrk-proscons">
        <div className="vrk-pros">
          <div className="vrk-proscons-label vrk-proscons-label-pros">
            <CheckCircle2 size={14} /> Pros
          </div>
          <ul className="vrk-list">
            {(editorial?.pros ?? [vendor.tagline]).map((pro, i) => (
              <li key={i} className="vrk-list-item vrk-list-pro">
                <CheckCircle2 size={12} className="vrk-icon-pro" />
                {pro}
              </li>
            ))}
            {/* TODO: Add pros[] to vendorEditorial.ts if missing */}
          </ul>
        </div>
        <div className="vrk-cons">
          <div className="vrk-proscons-label vrk-proscons-label-cons">
            <XCircle size={14} /> Cons
          </div>
          <ul className="vrk-list">
            {(editorial?.cons ?? ["No cons data available"]).map((con, i) => (
              <li key={i} className="vrk-list-item vrk-list-con">
                <XCircle size={12} className="vrk-icon-con" />
                {con}
              </li>
            ))}
            {/* TODO: Add cons[] to vendorEditorial.ts if missing */}
          </ul>
        </div>
      </div>

      {/* ── Spec grid (shipping, payment, returns) ──────────────────────── */}
      <div className="vrk-spec-grid">
        <div className="vrk-spec-item">
          <span className="vrk-spec-key">Ships To</span>
          <span className="vrk-spec-val">{vendor.shipsTo.join(", ")}</span>
        </div>
        <div className="vrk-spec-item">
          <span className="vrk-spec-key">Shipping Cost</span>
          <span className="vrk-spec-val">{vendor.shippingCost}</span>
        </div>
        <div className="vrk-spec-item">
          <span className="vrk-spec-key">Payment</span>
          <span className="vrk-spec-val">{vendor.paymentMethods.join(", ")}</span>
        </div>
        <div className="vrk-spec-item">
          <span className="vrk-spec-key">Returns</span>
          <span className="vrk-spec-val">{vendor.returnPolicy}</span>
        </div>
      </div>

      {/* ── Verification dashboard link ─────────────────────────────────── */}
      {vData && (
        <Link
          href={`/coa#verify-${vendor.slug}`}
          className="vrk-verify-link"
          aria-label={`View ${vendor.name} verification dashboard`}
        >
          <FlaskConical size={13} />
          View full verification dashboard →
        </Link>
      )}

      {/* ── CTA: BELOW the fold ─────────────────────────────────────────── */}
      <AffiliateCta vendor={vendor} position="below" size="secondary" />
    </article>
  );
}
