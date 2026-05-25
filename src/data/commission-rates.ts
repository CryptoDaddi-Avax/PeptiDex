/**
 * Affiliate Commission Rates — Manually Maintained
 * =================================================
 * These are YOUR commission rates from vendors — what you earn per sale.
 * NOT the customer discount rates (those live in vendors.ts).
 *
 * Update when rates change or are renegotiated.
 * confirmedDate: ISO date when you last verified the rate with the vendor.
 *
 * BASIS NOTE:
 * "pre_discount" = commission on the order value BEFORE the customer's
 *                  discount code is applied (higher payout to you).
 * "post_discount" = commission on what the customer actually pays
 *                   (lower payout to you).
 * Confirmed for: amino-club (post_discount, confirmed 2026-05-24).
 * Still unconfirmed for: bio-longevity-labs, limitless-life, ascension-peptides,
 *   pantheon-peptides, lvlup-health. Verify directly with each affiliate program.
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
   * Set to 'post_discount' or 'pre_discount' only when confirmed with the vendor.
   * Use 'unconfirmed' until then — estimateRevenue() treats unconfirmed as
   * pre-discount (upper-bound conservative estimate).
   */
  basis: 'post_discount' | 'pre_discount' | 'unconfirmed';
  /**
   * For post_discount basis vendors: the customer discount percentage applied
   * before commission is calculated. Set only when basis is confirmed.
   * e.g. 20 means the customer pays 80% of list price before your commission
   * applies. estimateRevenue() uses this to compute accurate payouts.
   */
  confirmedCustomerDiscountPct?: number;
  /** ISO date (YYYY-MM-DD) when you last confirmed the rate with the vendor. */
  confirmedDate: string;
  /** Affiliate program context, postback status, open questions. */
  notes: string;
}

export const commissionRates: Record<string, CommissionRate> = {
  'amino-club': {
    // Split rate confirmed by Amino Club affiliate manager (2026-05-24):
    //   20% commission on a customer's FIRST order
    //   10% commission on REPEAT orders
    // ratePercent = conservative floor (returning rate) so estimateRevenue()
    // never overstates revenue by assuming all orders are first-time.
    ratePercent: 10,
    newCustomerRatePercent: 20,
    returningCustomerRatePercent: 10,
    // BASIS CONFIRMED post-discount: commission is calculated on what the
    // customer actually pays AFTER the PEPTIDEX 20% discount is applied.
    // Customer pays 80% of list price → commission applies to that 80%.
    // Effective rates on list price:
    //   New customer:     20% × 0.80 = 16% of list price
    //   Repeat customer:  10% × 0.80 =  8% of list price
    basis: 'post_discount',
    confirmedCustomerDiscountPct: 20,
    confirmedDate: '2026-05-24',
    notes: [
      'CONFIRMED by Amino Club affiliate manager (2026-05-24).',
      'SPLIT RATE: 20% commission on first order, 10% on repeat orders.',
      'BASIS: post-discount — commission is on the amount the customer actually pays after the PEPTIDEX 20% discount.',
      'Effective payout on $100 list price: $16 (new) / $8 (repeat).',
      'No S2S postback support — conversion/revenue data is manual-dashboard-only.',
      'Estimated revenue (from this file) is the everyday proxy;',
      'confirmed conversions must be read manually from Amino Club affiliate dashboard.',
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
    basis: 'post_discount',
    confirmedCustomerDiscountPct: 50,
    confirmedDate: '2026-05-24',
    notes: [
      'DEACTIVATED 2026-05-24: 10% commission on post-discount basis + 50% customer discount = ~$5 per $100 order, worst economics of any vendor. Reactivate only if commission rate renegotiated.',
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
 * Uses ratePercent (the conservative floor rate). For split-rate vendors
 * like Amino Club, this applies the lower returning-customer rate so the
 * estimate never overstates revenue.
 *
 * BASIS HANDLING:
 * - Vendors with confirmed post_discount basis + confirmedCustomerDiscountPct:
 *   applies the customer discount before computing commission.
 *   e.g. Amino Club (post_discount, 20% customer discount):
 *     effectiveOrderValue = avgOrderValue × 0.80
 *     estimatedRevenue = effectiveOrderValue × ratePercent%
 *
 * - Vendors with 'unconfirmed' basis:
 *   treated as pre-discount (commission on full list price).
 *   This is the UPPER BOUND — actual payout will be ≤ this figure.
 *   Estimates are clearly provisional until basis is confirmed.
 *
 * @param vendorSlug - vendor slug from vendors.ts
 * @param clicks - number of affiliate clicks in the period
 * @param avgOrderValue - average order value in USD (pre-discount, list price)
 * @param conversionRate - fraction of clicks that convert (default: 0.03 = 3%)
 * @returns estimated revenue in USD, or null if rate or date not set
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

  // For confirmed post-discount vendors, reduce the order value by the
  // customer discount before applying the commission rate.
  let effectiveOrderValue = avgOrderValue;
  if (
    rate.basis === 'post_discount' &&
    rate.confirmedCustomerDiscountPct !== undefined
  ) {
    effectiveOrderValue = avgOrderValue * (1 - rate.confirmedCustomerDiscountPct / 100);
  }
  // 'unconfirmed' basis falls through here — uses full list price (upper bound).

  return Math.round(estimatedOrders * effectiveOrderValue * (rate.ratePercent / 100) * 100) / 100;
}

/**
 * Amino Club-specific revenue estimate that respects the split new/returning rate.
 * Use this instead of estimateRevenue() when you have a breakdown of new vs
 * returning customers, or when estimating new-customer-only revenue.
 *
 * Both rates apply post-discount (20% customer discount confirmed).
 *
 * @param clicks - total affiliate clicks from Amino Club
 * @param avgOrderValue - average order value in USD (pre-discount, list price)
 * @param newCustomerFraction - estimated fraction of orders from new customers (default: 0.3)
 * @param conversionRate - fraction of clicks that convert (default: 0.03 = 3%)
 * @returns { newCustomer, returning, total } revenue estimates in USD
 */
export function estimateAminoClubRevenue(
  clicks: number,
  avgOrderValue: number,
  newCustomerFraction = 0.3,
  conversionRate = 0.03
): { newCustomer: number; returning: number; total: number } {
  const rate = commissionRates['amino-club'];
  const newRate = rate.newCustomerRatePercent ?? 20;
  const retRate = rate.returningCustomerRatePercent ?? 10;
  const customerDiscountPct = rate.confirmedCustomerDiscountPct ?? 20;
  const effectiveOrderValue = avgOrderValue * (1 - customerDiscountPct / 100);

  const estimatedOrders = clicks * conversionRate;
  const newOrders = estimatedOrders * newCustomerFraction;
  const returningOrders = estimatedOrders * (1 - newCustomerFraction);

  const newCustomerRevenue = Math.round(newOrders * effectiveOrderValue * (newRate / 100) * 100) / 100;
  const returningRevenue = Math.round(returningOrders * effectiveOrderValue * (retRate / 100) * 100) / 100;

  return {
    newCustomer: newCustomerRevenue,
    returning: returningRevenue,
    total: Math.round((newCustomerRevenue + returningRevenue) * 100) / 100,
  };
}
