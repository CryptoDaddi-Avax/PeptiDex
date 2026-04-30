"use client";
import { useState, useEffect } from "react";
import { useSavedItems, type SavedItemType } from "@/hooks/useSavedItems";
import { Heart } from "lucide-react";

interface SaveButtonProps {
    type: SavedItemType;
    slug: string;
    title: string;
    /** CSS class override */
    className?: string;
}

export function SaveButton({ type, slug, title, className }: SaveButtonProps) {
    const { toggle, isSaved } = useSavedItems();
    const saved = isSaved(type, slug);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 1800);
        return () => clearTimeout(t);
    }, [toast]);

    const handleClick = () => {
        toggle(type, slug, title);
        setToast(saved ? "Removed from saved" : "Saved");
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={`save-btn ${saved ? "save-btn--active" : ""} ${className ?? ""}`}
                aria-label={saved ? "Remove from saved" : "Save"}
                title={saved ? "Remove from saved" : "Save"}
            >
                <Heart
                    size={18}
                    fill={saved ? "var(--gold)" : "none"}
                    stroke={saved ? "var(--gold)" : "currentColor"}
                    strokeWidth={1.5}
                />
            </button>

            {/* Toast */}
            {toast && (
                <div className="save-toast" role="status" aria-live="polite">
                    <Heart size={14} fill="var(--gold)" stroke="var(--gold)" />
                    <span>{toast}</span>
                </div>
            )}
        </>
    );
}
