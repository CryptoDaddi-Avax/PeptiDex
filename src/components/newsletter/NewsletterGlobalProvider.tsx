'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { NewsletterStickyBanner } from '@/components/newsletter/NewsletterStickyBanner';
import { NewsletterExitModal } from '@/components/newsletter/NewsletterExitModal';
import { incrementPageCount } from '@/components/newsletter/newsletter-utils';

/**
 * NewsletterGlobalProvider
 * Mounts the sticky bottom banner and the exit-intent modal sitewide.
 * Also increments the per-session page visit counter used by the exit modal gates.
 *
 * ?testExitIntent=1 forces the exit modal open immediately for screenshot capture.
 */
export function NewsletterGlobalProvider() {
  const searchParams = useSearchParams();
  const forceExitModal = searchParams.get('testExitIntent') === '1';

  useEffect(() => {
    // Increment page visit count once per mount (i.e. per navigation)
    incrementPageCount();
  }, []);

  return (
    <>
      <NewsletterStickyBanner />
      <NewsletterExitModal forceOpen={forceExitModal} />
    </>
  );
}
