// Shared types for all vendor review pages
export interface VendorFAQ { q: string; a: string; }
export interface PricingSample { peptide: string; slug: string; listPrice: string; withCode: string; vial: string; note?: string; }
export interface ProCon { point: string; detail?: string; }
export interface SentimentSource { platform: string; rating: string; count: string; summary: string; positives: string[]; negatives: string[]; url: string; }
export interface Alternative { name: string; slug: string; rating: number; bestFor: string; href: string; }
export interface ScoreBreakdown { category: string; score: string; note: string; }

export interface VendorReviewData {
  // Identity
  slug: string;
  name: string;
  tagline: string;
  affiliateUrl: string;
  discountCode: string;
  discountPercent: number;
  discountStackable: boolean;
  websiteDisplay: string;
  location: string;
  founded?: string;

  // Scores
  overallRating: number;
  coaScore: string;
  purityScore: string;
  shippingScore: string;
  valueScore: string;
  supportScore: string;

  // Quick verdict
  verdictHeadline: string;
  verdictBody: string; // 60-word GEO paragraph

  // Stats
  purity: string;
  coaType: string;
  testingMethods: string[];
  catalogSize: string;
  shippingSpeed: string;
  shippingCost: string;
  shipsTo: string[];
  paymentMethods: string[];
  returnPolicy: string;
  ratingCount: string;

  // Sections
  pros: ProCon[];
  cons: ProCon[];
  coaDescription: string; // 2-3 sentences about their testing
  coaUrl?: string;
  pricing: PricingSample[];
  sentiment: SentimentSource[];
  shippingDetail: string; // 2 paragraphs
  bestFor: string[]; // buyer personas
  alternatives: Alternative[];
  faqs: VendorFAQ[];
  scoreBreakdown: ScoreBreakdown[];
  finalVerdictBody: string;

  // SEO
  titleTag: string;
  metaDescription: string;
  datePublished: string;
  dateModified: string;

  // Internal links
  libraryLinks: { name: string; slug: string }[];
}
