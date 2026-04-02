"use client";
import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

export function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Check if already dismissed
        if (typeof window !== "undefined" && localStorage.getItem("pwa-prompt-dismissed")) {
            setDismissed(true);
            return;
        }

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Show after 30s delay so it's not intrusive
            setTimeout(() => setShowPrompt(true), 30000);
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        (deferredPrompt as any).prompt();
        const result = await (deferredPrompt as any).userChoice;
        if (result.outcome === "accepted") {
            setShowPrompt(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        setDismissed(true);
        localStorage.setItem("pwa-prompt-dismissed", "1");
    };

    if (!showPrompt || dismissed) return null;

    return (
        <div
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-top-4 fade-in duration-300"
        >
            <div className="p-3.5 rounded-2xl bg-zinc-900/95 border border-violet-500/30 backdrop-blur-xl shadow-2xl shadow-violet-500/10">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                        <Download className="w-5 h-5 text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-100">Install PeptiDex</p>
                        <p className="text-xs text-zinc-400 mt-0.5">Add to your home screen for quick access — works offline!</p>
                        <div className="flex gap-2 mt-2.5">
                            <button
                                onClick={handleInstall}
                                className="px-3.5 py-1.5 rounded-lg bg-violet-500 text-white text-xs font-medium hover:bg-violet-400 transition-colors"
                            >
                                Install
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="px-3.5 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-medium hover:bg-zinc-700 transition-colors"
                            >
                                Not now
                            </button>
                        </div>
                    </div>
                    <button onClick={handleDismiss} className="text-zinc-600 hover:text-zinc-400 transition-colors" aria-label="Dismiss install prompt">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
