"use client";
import { useState, useEffect, useCallback } from "react";
import { Stack } from "@/data/types";

const STORAGE_KEY = "PeptiDex-saved-stacks";

export function useSavedStacks() {
    const [savedStacks, setSavedStacks] = useState<Stack[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) setSavedStacks(JSON.parse(stored));
        } catch { }
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStacks));
        }
    }, [savedStacks, loaded]);

    const saveStack = useCallback((stack: Stack) => {
        setSavedStacks((prev) => {
            if (prev.some((s) => s.stack_name === stack.stack_name)) return prev;
            return [...prev, stack];
        });
    }, []);

    const removeStack = useCallback((stackName: string) => {
        setSavedStacks((prev) => prev.filter((s) => s.stack_name !== stackName));
    }, []);

    const isStackSaved = useCallback(
        (stackName: string) => savedStacks.some((s) => s.stack_name === stackName),
        [savedStacks]
    );

    return { savedStacks, saveStack, removeStack, isStackSaved, loaded };
}
