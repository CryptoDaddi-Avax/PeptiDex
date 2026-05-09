"use client";

/** Colored dot indicator for each vendor */
const DOT_COLORS: Record<string, string> = {
  "amino-club": "#f59e0b",
  "bio-longevity-labs": "#3b82f6",
  "limitless-life": "#22c55e",
  "ascension-peptides": "#a855f7",
  "pantheon-peptides": "#ef4444",
  "lvlup-health": "#06b6d4",
};

interface VendorDotProps {
  vendorSlug: string;
  size?: number;
  className?: string;
}

export function VendorDot({ vendorSlug, size = 8, className = "" }: VendorDotProps) {
  const color = DOT_COLORS[vendorSlug] ?? "#71717a";
  return (
    <span
      className={`inline-block rounded-full shrink-0 ${className}`}
      style={{ width: size, height: size, backgroundColor: color }}
      aria-hidden="true"
    />
  );
}
