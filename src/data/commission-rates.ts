/**
 * Affiliate Commission Rates — Manually Maintained
 * =================================================
 * These are YOUR commission rates from vendors — what you earn per sale.
 * NOT the customer discount rates (those live in vendors.ts).
 *
 * Update when rates change or are renegotiated.
 * confirmedDate: ISO date when you last verified the rate with the vendor.
 *
 * BASIS NOTE (applies to all vendors — UNCONFIRMED):
 * "pre_discount" = commission on the order value BEFORE the customer's
 *                  discount code is applied (higher payout to you).
 * "post_discount" = commission on what the customer actually pays
 *                   (lower payout to you).
 * This is unconfirmed for all vendors. Verify directly with each affiliate
 * program before relying on revenue estimates.
 */

export interface CommissionRate {
  /**
   * Your affiliate commission as a percentage of the order value.
   * For vendors with split new/returning rates (e.g. Amino Club), this is the
   * conservative floor (returning-customer rate). Use newCustomerRatePercent
   * and returningCustomerRatePercent for precise calculations.
   */
  ratePercent: number;
  /** For split-rate vendors: commission on a customer's FIRST order. */
  newCustomerRatePercent?: number;
  /** For split-rate vendors: commission on REPEAT orders. */
  returningCustomerRatePercent?: number;
  /**
   * Whether commission is calculated on pre-discount list price or
   * post-discount price the customer actually pays.
   * UNCONFIRMED for all vendors — verify before using for revenue math.
   */
  basis: 'post_discount' | 'pre_discount' | 'unconfirmed';
  /** ISO date (YYYY-MM-DD) when you last confirmed the rate with the vendor. */
  confirmedDate: string;
  /** Affiliate program context, postback status, open questions. */
  notes: string;
}

export const commissionRates: Record<string, CommissionRate> = {
  'amino-club': {
    // Split rate: 20% on first order, 10% on repeat orders.
    // ratePercent = conservative floor (returning rate) to avoid overestimating revenue.
    ratePercent: 10,
    newCustomerRatePercent: 20,
    returningCustomerRatePercent: 10,
    basis: 'unconfirmed',
    confirmedDate: '2026-05-24',
    notes: [
      'SPLIT RATE: 20% commission on a customer\'s first order; 10% on repeat orders.',
      'ratePercent is set to 10 (the returning/floor rate) — do not assume 20% across all sales.',
      'BASIS UNCONFIRMED: verify whether commission applies before or after the 20% customer discount.',
      'Affiliate system: custom UTM (utm_source=peptidex). S2S postback capability unconfirmed — awaiting response from affiliate team.',
    ].join(' '),
  },

  'bio-longevity-labs': {
    ratePercent: 15,
    basis: 'unconfirmed',
    confirmedDate: '2026-05-24',
    notes: [
      'BASIS UNCONFIRMED: verify whether commission applies before or after the 15% customer discount.',
      'Affiliate system: PostAffiliatePro (aff_c?offer_id=1&aff_id=2443).',
      'S2S postback infrastructure confirmed — configure postback URL in BLL merchant dashboard to activate conversion tracking.',
    ].join(' '),
  },

  'limitless-life': {
    ratePercent: 15,
    basis: 'unconfirmed',
    confirmedDate: '2026-05-24',
    notes: [
      'BASIS UNCONFIRMED: verify whether commission applies before or after the 15% customer discount.',
      'Affiliate system: redirect domain kb6dp3dq.com/PEPTIDEX/.',
      'S2S postback capability unconfirmed — inquire with Limitless Life affiliate team.',
    ].join(' '),
  },

  'ascension-peptides': {
    ratePercent: 10,
    basis: 'unconfirmed',
    confirmedDate: '2026-05-24',
    notes: [
      'CRITICAL — BASIS UNCONFIRMED: 10% commission rate confirmed.',
      'However: Ascension\'s customer discount is 50% (vs 15-20% at all other vendors).',
      'Pre-discount basis: 10% of $70 list price = $7.00 per vial.',
      'Post-discount basis: 10% of $35 (after 50% off) = $3.50 per vial — half the revenue.',
      'Verify pre vs post-discount basis before continuing to feature Ascension as deal-of-the-week.',
      'Affiliate system: simple ref path /ref/PeptiDex/. Likely no S2S postback.',
    ].join(' '),
  },

  'pantheon-peptides': {
    ratePercent: 10,
    basis: 'unconfirmed',
    confirmedDate: '2026-05-24',
    notes: [
      'BASIS UNCONFIRMED: verify whether commission applies before or after the 15% customer discount.',
      'Affiliate system: simple partner path /partner/PeptiDex/. Likely no S2S postback.',
    ].join(' '),
  },

  'lvlup-health': {
    ratePercent: 10,
    basis: 'unconfirmed',
    confirmedDate: '2026-05-24',
    notes: [
      'BASIS UNCONFIRMED: verify whether commission applies before or after the 15% customer discount.',
      'Affiliate system: ref param ?ref=PEPTIDEX. Likely no S2S postback.',
      'Oral peptides specialist — smaller catalog (20+ compounds) may mean lower total order values vs injectables.',
    ].join(' '),
  },
};

/**
 * Get commission rate config for a vendor slug.
 * Returns null if vendor not found.
 */
export function getCommissionRate(vendorSlug: string): CommissionRate | null {
  return commissionRates[vendorSlug] ?? null;
}

/**
 * Estimate revenue from clicks for a vendor.
 *
 * Uses ratePercent (the conservative floor rate). For Amino Club, this
 * applies the returning-customer rate (10%) — use newCustomerRatePercent
 * for new-customer-only estimates.
 *
 * IMPORTANT: All estimates are pending basis confirmation. This function
 * defaults to pre-discount basis since that's the higher (more conservative
 * upper-bound) scenario. Actual payout may be lower if basis is post-discount.
 *
 * @param vendorSlug - vendor slug from vendors.ts
 * @param clicks - number of affiliate clicks in the period
 * @param avgOrderValue - average order value in USD (pre-discount, from vendor dashboard)
 * @param conversionRate - fraction of clicks that convert (default: 0.03 = 3%)
 * @returns estimated revenue in USD, or null if rate is unconfirmed/zero
 */
export function estimateRevenue(
  vendorSlug: string,
  clicks: number,
  avgOrderValue: number,
  conversionRate = 0.03
): number | null {
  const rate = commissionRates[vendorSlug];
  if (!rate || rate.ratePercent === 0 || !rate.confirmedDate) return null;
  const estimatedOrders = clicks * conversionRate;
  return Math.round(estimatedOrders * avgOrderValue * (rate.ratePercent / 100) * 100) / 100;
}
