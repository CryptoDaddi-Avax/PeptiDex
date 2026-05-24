/**
 * Affiliate Commission Rates — Manually Maintained
 * =================================================
 * Populate from each vendor's affiliate dashboard.
 * Update when rates change or are renegotiated.
 *
 * ratePercent: your commission as a percentage (e.g., 10 = 10%)
 * basis: whether commission is calculated on pre-discount list price
 *        or post-discount price the customer actually pays
 * confirmedDate: ISO date when you verified this rate with the vendor
 * notes: any relevant context
 */

export interface CommissionRate {
  ratePercent: number;
  basis: 'post_discount' | 'pre_discount';
  confirmedDate: string;
  notes: string;
}

export const commissionRates: Record<string, CommissionRate> = {
  'amino-club': {
    ratePercent: 0, // TODO: fill in from Amino Club affiliate dashboard
    basis: 'post_discount',
    confirmedDate: '',
    notes: 'Affiliate system: custom UTM. Inquired about S2S postback support.',
  },
  'bio-longevity-labs': {
    ratePercent: 0, // TODO: fill in from BLL PostAffiliatePro dashboard
    basis: 'post_discount',
    confirmedDate: '',
    notes: 'Affiliate system: PostAffiliatePro (aff_id=2443). S2S postback to be configured — commission per conversion will flow automatically.',
  },
  'limitless-life': {
    ratePercent: 0, // TODO: fill in from Limitless Life affiliate dashboard
    basis: 'post_discount',
    confirmedDate: '',
    notes: 'Affiliate system: redirect domain kb6dp3dq.com. Inquired about postback support.',
  },
  'ascension-peptides': {
    ratePercent: 0, // TODO: CRITICAL — confirm AND verify basis. Customer gets 50% off, so basis (pre vs post-discount) is significant.
    basis: 'post_discount',
    confirmedDate: '',
    notes: 'CRITICAL: Verify rate basis. 50% customer discount means pre- vs post-discount commission is 2x difference on a $70 vial.',
  },
  'pantheon-peptides': {
    ratePercent: 0, // TODO: fill in from Pantheon affiliate dashboard
    basis: 'post_discount',
    confirmedDate: '',
    notes: 'Affiliate system: simple partner path. Likely no S2S postback.',
  },
  'lvlup-health': {
    ratePercent: 0, // TODO: fill in from LVLUP Health affiliate dashboard
    basis: 'post_discount',
    confirmedDate: '',
    notes: 'Affiliate system: ref param. Likely no S2S postback.',
  },
};

export function getCommissionRate(vendorSlug: string): CommissionRate | null {
  return commissionRates[vendorSlug] ?? null;
}
