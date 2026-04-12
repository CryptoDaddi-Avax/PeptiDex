"use client";

import { Download } from "lucide-react";

export function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors shadow-lg shadow-violet-900/20"
        >
            <Download className="w-4 h-4" /> Print / Save as PDF
        </button>
    );
}
