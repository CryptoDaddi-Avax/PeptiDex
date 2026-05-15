import React from 'react';
import { isRecentlyVerified } from '@/lib/freshness/thresholds';

interface FreshnessBadgeProps {
  reviewedAt?: string | Date;
  className?: string;
}

export function FreshnessBadge({ reviewedAt, className = '' }: FreshnessBadgeProps) {
  if (!reviewedAt) return null;
  
  if (!isRecentlyVerified(reviewedAt)) {
    return null; // Only show positive signal
  }

  const dateObj = typeof reviewedAt === 'string' ? new Date(reviewedAt) : reviewedAt;
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 ${className}`}>
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Recently Verified {formattedDate}
    </div>
  );
}
