"use client";

import { Tag } from "lucide-react";

interface DiscountBadgeProps {
  code: string;
  percent: number;
  className?: string;
}

export function DiscountBadge({ code, percent, className = "" }: DiscountBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-amber-500/30 bg-amber-500/10 text-amber-400 ${className}`}
    >
      <Tag className="w-2.5 h-2.5" />
      -{percent}% · {code}
    </span>
  );
}
