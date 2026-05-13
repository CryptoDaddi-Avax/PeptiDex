export { aminoClubReview } from './amino-club';
export { bioLongevityLabsReview } from './bio-longevity-labs';
export { limitlessLifeReview } from './limitless-life';
export { ascensionPeptidesReview } from './ascension-peptides';
export { pantheonPeptidesReview } from './pantheon-peptides';
export { lvlupHealthReview } from './lvlup-health';

import { aminoClubReview } from './amino-club';
import { bioLongevityLabsReview } from './bio-longevity-labs';
import { limitlessLifeReview } from './limitless-life';
import { ascensionPeptidesReview } from './ascension-peptides';
import { pantheonPeptidesReview } from './pantheon-peptides';
import { lvlupHealthReview } from './lvlup-health';
import type { VendorReviewData } from '../vendor-review-types';

export const allVendorReviews: VendorReviewData[] = [
  aminoClubReview,
  bioLongevityLabsReview,
  limitlessLifeReview,
  ascensionPeptidesReview,
  pantheonPeptidesReview,
  lvlupHealthReview,
];

export function getVendorReview(slug: string): VendorReviewData | undefined {
  return allVendorReviews.find(r => r.slug === slug);
}
