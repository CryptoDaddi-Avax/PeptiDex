"use client";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

export function Header() {
    return (
        <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
            <div className="max-w-5xl mx-auto flex items-center justify-between px-3 py-2 md:px-4 md:py-3">
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="PeptiDex Logo"
                        width={36}
                        height={36}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl object-contain"
                        priority
                    />
                    <div>
                        <span className="block text-base md:text-lg font-bold tracking-tight text-zinc-100 leading-none">PeptiDex</span>
                        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-zinc-500 font-medium">Peptide Research Index</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <BadgeCheck className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-400" />
                    <span className="text-[9px] md:text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Research-backed</span>
                </div>
            </div>
        </header>
    );
}
