export type ContentType = 
  | 'PRICE_VENDOR_COUPON'
  | 'PEPTIDE_PROFILE'
  | 'EDUCATIONAL_GUIDE'
  | 'TIMELESS_REFERENCE';

export const FRESHNESS_THRESHOLDS: Record<ContentType, number> = {
  PRICE_VENDOR_COUPON: 15,
  PEPTIDE_PROFILE: 45,
  EDUCATIONAL_GUIDE: 60,
  TIMELESS_REFERENCE: Infinity,
};

export function isContentStale(reviewedAt: string | Date, type: ContentType): boolean {
  if (type === 'TIMELESS_REFERENCE') return false;
  
  const reviewedDate = typeof reviewedAt === 'string' ? new Date(reviewedAt) : reviewedAt;
  const daysSinceReview = (Date.now() - reviewedDate.getTime()) / (1000 * 60 * 60 * 24);
  
  return daysSinceReview > FRESHNESS_THRESHOLDS[type];
}

export function isRecentlyVerified(reviewedAt: string | Date): boolean {
  const reviewedDate = typeof reviewedAt === 'string' ? new Date(reviewedAt) : reviewedAt;
  const daysSinceReview = (Date.now() - reviewedDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceReview <= 14;
}
