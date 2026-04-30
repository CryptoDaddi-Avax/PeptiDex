"use client";
import { useState, useEffect, useCallback } from "react";

export type SavedItemType = "peptide" | "stack" | "goal" | "blog";

export interface SavedItem {
    type: SavedItemType;
    slug: string;
    title: string;
    savedAt: string; // ISO date
}

const STORAGE_KEY = "peptidex_saved";

function readStorage(): SavedItem[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function writeStorage(items: SavedItem[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch { /* quota exceeded — fail silently */ }
}

export function useSavedItems() {
    const [items, setItems] = useState<SavedItem[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Hydrate from localStorage once
    useEffect(() => {
        setItems(readStorage());
        setLoaded(true);
    }, []);

    // Persist on change
    useEffect(() => {
        if (loaded) writeStorage(items);
    }, [items, loaded]);

    // Listen for cross-tab changes
    useEffect(() => {
        const handler = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                setItems(readStorage());
            }
        };
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    const toggle = useCallback(
        (type: SavedItemType, slug: string, title: string) => {
            setItems((prev) => {
                const exists = prev.some((i) => i.type === type && i.slug === slug);
                if (exists) {
                    return prev.filter((i) => !(i.type === type && i.slug === slug));
                }
                return [...prev, { type, slug, title, savedAt: new Date().toISOString() }];
            });
        },
        [],
    );

    const isSaved = useCallback(
        (type: SavedItemType, slug: string) =>
            items.some((i) => i.type === type && i.slug === slug),
        [items],
    );

    const remove = useCallback(
        (type: SavedItemType, slug: string) => {
            setItems((prev) => prev.filter((i) => !(i.type === type && i.slug === slug)));
        },
        [],
    );

    const count = items.length;

    return { items, toggle, isSaved, remove, count, loaded };
}
