"use client";

interface InlinePriceTagProps {
  /** Final discounted price */
  finalPrice: number;
  /** Original list price (shown struck if different from final) */
  listPrice?: number;
  /** Vendor display name */
  vendorName: string;
  className?: string;
}

export function InlinePriceTag({ finalPrice, listPrice, vendorName, className = "" }: InlinePriceTagProps) {
  const hasDiscount = listPrice && listPrice > finalPrice;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${className}`}>
      {hasDiscount && (
        <span className="line-through text-zinc-500 font-mono">${listPrice.toFixed(2)}</span>
      )}
      <span className="font-mono font-bold text-amber-400">${finalPrice.toFixed(2)}</span>
      <span className="text-zinc-500">at {vendorName}</span>
    </span>
  );
}
