"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, ExternalLink, ArrowRight, Beaker } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { aminoClubProductMapping } from "@/data/affiliates";
import { peptides } from "@/data/peptides";
import { AffiliateLink } from "@/components/affiliate-link";
import { buildAffiliateUrl } from "@/lib/promos/affiliateUrl";
import { PRIMARY_PROMO } from "@/lib/promos/config";

export function MobileSourcingBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true); // default true until we check sessionStorage on mount

  useEffect(() => {
    // Check session storage on mount
    const dismissed = sessionStorage.getItem("mobileSourcingDismissed") === "true";
    setIsDismissed(dismissed);
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    // Only allow on specific paths
    const validPaths = ["/research", "/stacks", "/blog", "/tools"];
    const isEligiblePage = validPaths.some((p) => pathname.startsWith(p));

    if (!isEligiblePage) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = total > 0 ? scrolled / total : 0;

      // Show after 40% scroll
      if (percentage >= 0.4 && !isVisible) {
        setIsVisible(true);
      } 
      // Hide when scrolled back near the top (< 10%)
      else if (percentage < 0.1 && isVisible) {
        setIsVisible(false);
      }
    };

    // Check on mount and add listener
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, isVisible, isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("mobileSourcingDismissed", "true");
  };

  // Content logic
  let displayName = "peptides";
  let targetUrl = "https://aminoclub.com?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=mobile_sourcing_bar&code=PEPTIDEX";
  // peptideSlug for AffiliateLink (uses aminoClubProductMapping internally)
  let peptideSlug: string | undefined = undefined;

  if (pathname.startsWith("/research/")) {
    const slug = pathname.split("/")[2];
    if (slug) {
      const peptide = peptides.find((p) => p.slug === slug);
      if (peptide) {
        displayName = peptide.name;
      } else {
        // Fallback title formatting from slug
        displayName = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      }
      if (aminoClubProductMapping[slug]) {
        peptideSlug = slug;
        const mapped = aminoClubProductMapping[slug];
        if (mapped) {
          targetUrl = mapped.includes("?")
            ? `${mapped}&utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=mobile_sourcing_bar&code=PEPTIDEX`
            : `${mapped}?utm_source=peptidex&utm_medium=affiliate&utm_campaign=peptidex_code&utm_content=mobile_sourcing_bar&code=PEPTIDEX`;
        }
      }
    }
  }

  // Also adjust for stacks if possible
  if (pathname.startsWith("/stacks/") && pathname.split("/").length > 2) {
    // Optional: Could grab the first peptide from the stack for a specific link,
    // but the prompt said "link to Amino Club homepage (or first peptide)".
    // Using homepage is fine and safe.
    displayName = "this stack";
  }

  // Build canonical affiliate URL — use per-peptide URL if available, else PRIMARY_PROMO homepage
  const baseUrl = (peptideSlug && aminoClubProductMapping[peptideSlug]) ?? PRIMARY_PROMO.shopUrl;
  const targetUrl = buildAffiliateUrl({ ...PRIMARY_PROMO, shopUrl: baseUrl }, "mobile_sourcing_bar");

  if (isDismissed || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        // Positioned 64px from bottom to sit exactly above the BottomNav on mobile
        className="fixed bottom-[64px] left-0 right-0 z-40 md:hidden px-3 pb-3 pointer-events-none"
      >
        <div className="relative overflow-hidden bg-zinc-950/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-[1px] pointer-events-auto shadow-2xl shadow-emerald-900/20">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-zinc-900/50 to-transparent pointer-events-none" />
          
          <div className="relative flex items-center justify-between px-3 py-2.5 bg-zinc-900/50 rounded-[15px]">
            <button 
              onClick={handleDismiss}
              className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors z-10 shadow-lg"
              aria-label="Dismiss banner"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 flex-shrink-0">
                <Beaker className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-0.5">
                  Top Rated Vendor
                </p>
                <p className="text-[13px] sm:text-[14px] font-bold text-white truncate leading-tight">
                  Source {displayName}
                </p>
              </div>
            </div>

            <AffiliateLink
              href={targetUrl}
              vendor="amino_club"
              peptide={peptideSlug}
              source="mobile_sourcing_bar"
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[12px] sm:text-[13px] font-bold transition-all whitespace-nowrap active:scale-95"
            >
              Shop Now <ArrowRight className="w-3.5 h-3.5" />
            </AffiliateLink>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
