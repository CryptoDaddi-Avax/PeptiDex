"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";

interface CopyCodeButtonProps {
  code: string;
  className?: string;
}

export function CopyCodeButton({ code, className = "" }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider border transition-all ${
        copied
          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
          : "border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:border-amber-500/30 hover:text-amber-400"
      } ${className}`}
      title={`Copy code: ${code}`}
      aria-label={`Copy discount code ${code}`}
    >
      {copied ? (
        <>
          <Check className="w-2.5 h-2.5" /> Copied!
        </>
      ) : (
        <>
          <Copy className="w-2.5 h-2.5" /> {code}
        </>
      )}
    </button>
  );
}
