import type { Metadata } from 'next';
import { ascensionPeptidesReview as review } from '@/data/reviews/ascension-peptides';
import { VendorReviewTemplate } from '@/components/vendors/VendorReviewTemplate';
import { buildVendorReviewSchema, buildVendorFAQSchema } from '@/lib/seo/schema/vendor';
import { buildBreadcrumbSchema } from '@/lib/seo/schema';

const CANONICAL = `https://peptidex.app/vendors/${review.slug}-review`;

export const metadata: Metadata = {
  title: review.titleTag,
  description: review.metaDescription,
  alternates: { canonical: CANONICAL },
  openGraph: { title: review.titleTag, description: review.metaDescription, url: CANONICAL, type: 'article' },
  twitter: { card: 'summary_large_image', title: review.titleTag, description: review.metaDescription },
};

export default function AscensionPeptidesReviewPage() {
  const reviewSchema = buildVendorReviewSchema({
    vendorName: review.name,
    vendorUrl: `https://${review.websiteDisplay}`,
    ratingValue: review.overallRating,
    reviewBody: review.verdictBody,
    canonical: CANONICAL,
    datePublished: review.datePublished,
    dateModified: review.dateModified,
  });
  const faqSchema = buildVendorFAQSchema(review.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://peptidex.app/' },
    { name: 'Vendors', url: 'https://peptidex.app/vendors' },
    { name: `${review.name} Review`, url: CANONICAL },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <VendorReviewTemplate review={review} />
    </>
  );
}
