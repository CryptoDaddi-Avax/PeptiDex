"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_STATS } from "@/data/site-stats";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy, Check, Tag, Star, ExternalLink, Zap, ChevronDown,
  ChevronUp, Mail, ArrowRight, BadgePercent, Flame, Package,
  ShieldCheck, RotateCcw,
} from "lucide-react";
import type { VendorDeal, PeptideBestDeal } from "@/data/coupon-deals";
import { AffiliateLink } from "@/components/affiliate-link";

// ── Copy button ────────────────────────────────────────────────────────────────
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <button
      onClick={copy}
      id={`copy-${code}`}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all
        ${copied
          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
          : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-amber-500/40 hover:text-amber-300"
        }`}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : code}
    </button>
  );
}

// ── Savings badge ──────────────────────────────────────────────────────────────
function SavingsBadge({ pct }: { pct: number }) {
  const color = pct >= 50
    ? "bg-red-500/20 border-red-500/30 text-red-300"
    : pct >= 20
      ? "bg-amber-500/20 border-amber-500/30 text-amber-300"
      : "bg-violet-500/20 border-violet-500/30 text-violet-300";
  return (
    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${color}`}>
      {pct}% OFF
    </span>
  );
}

// ── Master table row ───────────────────────────────────────────────────────────
function VendorTableRow({
  deal, isDeal, idx,
}: {
  deal: VendorDeal;
  isDeal: boolean;
  idx: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className={`border-b border-zinc-800/60 transition-colors
          ${isDeal ? "bg-amber-500/5" : idx % 2 === 0 ? "bg-zinc-900/40" : ""}`}
      >
        {/* Rank / DOTW */}
        <td className="px-3 py-3 w-8">
          {isDeal ? (
            <Flame className="w-4 h-4 text-amber-400" />
          ) : (
            <span className="text-xs text-zinc-600">{idx + 1}</span>
          )}
        </td>

        {/* Vendor */}
        <td className="px-3 py-3">
          <div className="flex items-center gap-2">
            <div>
              <Link
                href={`/coupon-codes/${deal.vendorSlug}`}
                className="text-sm font-semibold text-zinc-100 hover:text-amber-400 transition-colors"
              >
                {deal.vendorName}
              </Link>
              <p className="text-[10px] text-zinc-500 hidden sm:block">{deal.headline}</p>
            </div>
          </div>
        </td>

        {/* Code */}
        <td className="px-3 py-3">
          <CopyButton code={deal.code} />
        </td>

        {/* Savings */}
        <td className="px-3 py-3">
          <SavingsBadge pct={deal.discountPercent} />
          {deal.stackable && (
            <span className="ml-1 text-[9px] font-bold uppercase text-emerald-400 hidden sm:inline">
              Stackable
            </span>
          )}
        </td>

        {/* Expires */}
        <td className="px-3 py-3 hidden md:table-cell">
          <span className="text-xs text-zinc-400">{deal.expiresLabel}</span>
        </td>

        {/* CTA */}
        <td className="px-3 py-3">
          <div className="flex items-center gap-2">
            <AffiliateLink
              href={deal.affiliateUrl}
              peptide="coupon-hub"
              vendorSlug={deal.vendorSlug}
              source="pricing_table"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors whitespace-nowrap"
            >
              Use Code <ArrowRight className="w-3 h-3" />
            </AffiliateLink>
            <button
              onClick={() => setExpanded((e) => !e)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
              aria-label="More details"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded detail row */}
      <AnimatePresence>
        {expanded && (
          <tr>
            <td colSpan={6} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-zinc-900/60 border-b border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Pro tip */}
                  {deal.proTip && (
                    <div className="bg-zinc-800/60 rounded-lg p-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">
                        💡 Pro Tip
                      </p>
                      <p className="text-xs text-zinc-300 leading-relaxed">{deal.proTip}</p>
                    </div>
                  )}

                  {/* Details grid */}
                  <div className="space-y-2">
                    {deal.stackNote && (
                      <div className="flex items-start gap-2">
                        <Zap className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-emerald-300">{deal.stackNote}</p>
                      </div>
                    )}
                    {deal.freeShippingThreshold && (
                      <div className="flex items-start gap-2">
                        <Package className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-zinc-400">
                          Free shipping on orders over ${deal.freeShippingThreshold}
                        </p>
                      </div>
                    )}
                    {deal.exclusions && deal.exclusions.length > 0 && (
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-zinc-500">
                          Excludes: {deal.exclusions.join(", ")}
                        </p>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <RotateCcw className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-zinc-500">Expires: {deal.expiresLabel}</p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/coupon-codes/${deal.vendorSlug}`}
                        className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                      >
                        Full {deal.vendorName} coupon guide <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Per-peptide best deal card ─────────────────────────────────────────────────
function PeptideDealCard({ deal }: { deal: PeptideBestDeal }) {
  const savings = deal.price - deal.discountedPrice;
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors p-4">
      <div className="flex items-start justify-between mb-2">
        <Link
          href={`/peptides/${deal.peptideSlug}`}
          className="text-sm font-bold text-zinc-100 hover:text-amber-400 transition-colors"
        >
          {deal.peptideName}
        </Link>
        <span className="text-xs font-bold text-emerald-400">
          -${savings.toFixed(0)} saved
        </span>
      </div>
      <p className="text-xs text-zinc-500 mb-3">
        Best price after code at{" "}
        <Link
          href={`/coupon-codes/${deal.vendorSlug}`}
          className="text-zinc-400 hover:text-amber-400 transition-colors"
        >
          {deal.vendorName}
        </Link>
      </p>
      <div className="flex items-end justify-between mb-3">
        <div>
          <span className="text-xl font-bold text-zinc-100">
            ${deal.discountedPrice.toFixed(2)}
          </span>
          <span className="text-xs text-zinc-600 ml-1 line-through">${deal.price.toFixed(2)}</span>
          <p className="text-[10px] text-zinc-500">{deal.vialMg}mg vial · ${deal.perMg.toFixed(2)}/mg</p>
        </div>
        <div className="flex items-center gap-1.5">
          <CopyButton code={deal.code} />
        </div>
      </div>
      <AffiliateLink
        href={deal.affiliateUrl}
        peptide={deal.peptideSlug}
        vendorSlug={deal.vendorSlug}
        source="goal_page"
        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs font-bold text-amber-300 hover:bg-amber-500/25 transition-colors"
      >
        Buy with code {deal.code} <ExternalLink className="w-3 h-3" />
      </AffiliateLink>
    </div>
  );
}

// ── Email capture ──────────────────────────────────────────────────────────────
function EmailCapture() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "coupon-codes" }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-violet-950/40 to-purple-950/40 border border-violet-500/20 p-6 text-center">
      <Mail className="w-8 h-8 text-violet-400 mx-auto mb-3" />
      <h3 className="text-lg font-bold text-zinc-100 mb-1">
        Get notified when new deals drop
      </h3>
      <p className="text-sm text-zinc-400 mb-4">
        We alert subscribers first when vendors run flash sales or add new codes. Usually 1–2 emails/month.
      </p>
      {state === "done" ? (
        <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold">
          <Check className="w-5 h-5" /> You&apos;re on the list — deals incoming.
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 transition-colors"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {state === "loading" ? "Adding…" : "Notify Me"}
          </button>
        </form>
      )}
      {state === "error" && (
        <p className="text-xs text-red-400 mt-2">Something went wrong — try again.</p>
      )}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export function CouponHubClient({
  vendorDeals,
  peptideBestDeals,
  dealOfTheWeek,
  refreshedDate,
}: {
  vendorDeals: VendorDeal[];
  peptideBestDeals: PeptideBestDeal[];
  dealOfTheWeek: VendorDeal;
  refreshedDate: string;
}) {
  // Sort: deal of week first, then by discountPercent desc
  const sorted = [...vendorDeals].sort((a, b) => {
    if (a.vendorSlug === dealOfTheWeek.vendorSlug) return -1;
    if (b.vendorSlug === dealOfTheWeek.vendorSlug) return 1;
    return b.discountPercent - a.discountPercent;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs">
        <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors">Home</Link>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300 font-medium">Coupon Codes</span>
      </nav>

      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Tag className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            All Codes Verified May 2026
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 leading-tight">
          Peptide Vendor Coupon Codes
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
          Every active discount code across all {SITE_STATS.vendors.count} verified vendors — one code (PEPTIDEX) works everywhere.
          Up to 40%+ off when stacked. No hidden minimums.
        </p>
      </div>

      {/* Deal of the Week banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-r from-amber-950/50 to-orange-950/40 border border-amber-500/30 p-5"
      >
        <div className="flex items-start gap-3">
          <Flame className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-amber-500/20 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full">
                Deal of the Week
              </span>
              <span className="text-[10px] text-zinc-500">
                Updated {new Date(refreshedDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
              </span>
            </div>
            <h2 className="text-lg font-bold text-zinc-100 mb-0.5">
              {dealOfTheWeek.vendorName} — {dealOfTheWeek.discountPercent}% off with PEPTIDEX
            </h2>
            <p className="text-sm text-zinc-400">{dealOfTheWeek.proTip}</p>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <CopyButton code={dealOfTheWeek.code} />
            <AffiliateLink
              href={dealOfTheWeek.affiliateUrl}
              peptide="coupon-hub"
              vendorSlug={dealOfTheWeek.vendorSlug}
              source="buy_box"
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors"
            >
              Shop Now <ArrowRight className="w-3 h-3" />
            </AffiliateLink>
          </div>
        </div>
      </motion.div>

      {/* Master code summary */}
      <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-3">
          <BadgePercent className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
            The Code: PEPTIDEX
          </h2>
        </div>
        <p className="text-xs text-zinc-400 mb-4">
          One code, {SITE_STATS.vendors.count} vendors. Works at checkout on all orders — no minimum purchase required at most vendors.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {sorted.map((deal) => (
            <div key={deal.vendorSlug} className="flex items-center justify-between rounded-lg bg-zinc-800/60 px-3 py-2">
              <Link
                href={`/coupon-codes/${deal.vendorSlug}`}
                className="text-xs text-zinc-300 hover:text-amber-400 transition-colors truncate mr-2"
              >
                {deal.vendorName}
              </Link>
              <SavingsBadge pct={deal.discountPercent} />
            </div>
          ))}
        </div>
      </div>

      {/* Master table */}
      <div>
        <h2 className="text-lg font-bold text-zinc-100 mb-4">All Active Coupon Codes</h2>
        <div className="rounded-xl border border-zinc-800 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/50">
                <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500 w-8"></th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">Vendor</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">Code</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">Savings</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500 hidden md:table-cell">Expires</th>
                <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((deal, idx) => (
                <VendorTableRow
                  key={deal.vendorSlug}
                  deal={deal}
                  isDeal={deal.vendorSlug === dealOfTheWeek.vendorSlug}
                  idx={idx}
                />
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-zinc-600 mt-2">
          * All codes verified by the PeptiDex team. We receive a commission when you use our links — this funds our research. Prices shown are pre-discount.
        </p>
      </div>

      {/* Per-peptide best deals — hidden if no valid deals are available */}
      {peptideBestDeals.filter((d) => d.discountedPrice > 0 && d.price > 0).length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100">Cheapest Price Per Peptide</h2>
          </div>
          <p className="text-sm text-zinc-400 mb-5">
            Best price after applying PEPTIDEX — updated May 2026.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {peptideBestDeals
              .filter((d) => d.discountedPrice > 0 && d.price > 0)
              .map((deal) => (
                <PeptideDealCard key={deal.peptideSlug} deal={deal} />
              ))}
          </div>
        </div>
      )}

      {/* Email capture */}
      <EmailCapture />

      {/* Per-vendor quick links */}
      <div>
        <h2 className="text-base font-bold text-zinc-200 mb-3">
          Vendor-Specific Coupon Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {vendorDeals.map((deal) => (
            <Link
              key={deal.vendorSlug}
              href={`/coupon-codes/${deal.vendorSlug}`}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors group"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-200 group-hover:text-amber-400 transition-colors">
                  {deal.vendorName} Coupon Code
                </p>
                <p className="text-xs text-zinc-500">
                  {deal.discountPercent}% off with PEPTIDEX
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-base font-bold text-zinc-200 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            {
              q: "Do I need different codes for each vendor?",
              a: `No — the code PEPTIDEX works at all ${SITE_STATS.vendors.count} vendors we list. Enter it at checkout on any vendor's site for the discount shown in the table above.`,
            },
            {
              q: "Can I stack the code with vendor sales?",
              a: "Only at Bio Longevity Labs. Their PEPTIDEX code stacks on top of their active sitewide sales, often resulting in 40%+ total savings. All other vendors: the code applies as a standalone discount.",
            },
            {
              q: "Which vendor has the biggest discount?",
              a: "Amino Club offers 20% off and is our Editor's Choice for quality. Bio Longevity Labs offers 15% that stacks with sales — the only vendor where your code stacks with site-wide promotions.",
            },
            {
              q: "Are these codes for research use only?",
              a: "Yes. All peptides sold by these vendors are for research purposes only and are not approved for human use by the FDA. PeptiDex does not provide medical advice.",
            },
          ].map((faq, i) => (
            <details key={i} className="group rounded-xl bg-zinc-900 border border-zinc-800 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-zinc-200 list-none flex items-center justify-between">
                {faq.q}
                <ChevronDown className="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
