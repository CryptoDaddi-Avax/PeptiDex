"use client";
import { SHORT_DISCLAIMER } from "@/data/constants";
import { ShieldAlert } from "lucide-react";

export function DisclaimerBanner() {
    return (
        <div className="w-full bg-amber-950/40 border-t border-amber-500/20 px-4 py-2.5 pointer-events-none" role="status" aria-label="Educational disclaimer">
            <div className="max-w-5xl mx-auto flex items-start gap-2 pointer-events-auto">
                <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-[11px] text-amber-400/80 leading-relaxed">{SHORT_DISCLAIMER}</p>
            </div>
        </div>
    );
}
