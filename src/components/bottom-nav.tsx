"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Bookmark, Wrench, Dna, Newspaper } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/library", label: "Library", icon: BookOpen },
    { href: "/blog", label: "Blog", icon: Newspaper },
    { href: "/intro", label: "Start", icon: Dna },
    { href: "/tools", label: "Tools", icon: Wrench },
    { href: "/saved", label: "Saved", icon: Bookmark },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/60" aria-label="Main navigation">
            <div className="max-w-lg mx-auto flex items-center justify-around py-2.5 md:py-2 px-4">
                {navItems.map((item) => {
                    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center gap-0.5 py-1.5 px-3 min-w-[60px] min-h-[44px]"
                            aria-label={item.label}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-violet-500"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <item.icon
                                className={`w-5 h-5 transition-colors ${isActive ? "text-violet-400" : "text-zinc-500"}`}
                                aria-hidden="true"
                            />
                            <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-violet-400" : "text-zinc-500"}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
            {/* Safe area spacer for iOS */}
            <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
    );
}
