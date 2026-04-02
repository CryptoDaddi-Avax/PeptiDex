"use client";
import { motion } from "framer-motion";

function Pulse({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse rounded-xl bg-zinc-800/60 ${className}`} />
    );
}

export function LibrarySkeleton() {
    return (
        <div className="max-w-5xl mx-auto px-3 py-4 md:px-4 md:py-6">
            {/* Header */}
            <div className="mb-4 md:mb-6">
                <Pulse className="h-6 w-40 mb-2" />
                <Pulse className="h-4 w-56" />
            </div>
            {/* Search */}
            <Pulse className="h-11 w-full rounded-2xl mb-4" />
            {/* Category chips */}
            <div className="flex gap-2 mb-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Pulse key={i} className="h-8 w-20 rounded-xl flex-shrink-0" />
                ))}
            </div>
            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, i) => (
                    <Pulse key={i} className="h-36 rounded-2xl" />
                ))}
            </div>
        </div>
    );
}

export function BlendsSkeleton() {
    return (
        <div className="max-w-5xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <div className="mb-4 md:mb-6">
                <Pulse className="h-6 w-48 mb-2" />
                <Pulse className="h-4 w-72" />
            </div>
            <Pulse className="h-14 w-full rounded-xl mb-4" />
            <Pulse className="h-11 w-full rounded-2xl mb-4" />
            <div className="flex gap-2 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Pulse key={i} className="h-8 w-28 rounded-xl flex-shrink-0" />
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Pulse key={i} className="h-40 rounded-2xl" />
                ))}
            </div>
        </div>
    );
}

export function ToolsSkeleton() {
    return (
        <div className="max-w-3xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <div className="text-center mb-6">
                <Pulse className="h-8 w-48 mx-auto mb-2" />
                <Pulse className="h-4 w-64 mx-auto" />
            </div>
            <div className="space-y-3">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Pulse key={i} className="h-20 rounded-2xl" />
                ))}
            </div>
        </div>
    );
}

export function DetailSkeleton() {
    return (
        <div className="max-w-3xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <Pulse className="h-4 w-24 mb-4" />
            <div className="mb-6">
                <Pulse className="h-7 w-64 mb-2" />
                <Pulse className="h-4 w-48" />
            </div>
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Pulse key={i} className="h-28 rounded-2xl" />
                ))}
            </div>
        </div>
    );
}
