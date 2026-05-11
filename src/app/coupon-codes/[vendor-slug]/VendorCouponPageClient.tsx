"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy, Check, Star, ExternalLink, ArrowRight, Tag,
  ShieldCheck, Package, Zap, RotateCcw, BadgePercent, ArrowLeft,
} from "lucide-react";
import type { VendorDeal, PeptideBestDeal } from "@/data/coupon-deals";
import type { Vendor } from "@/data/vendors";
import { AffiliateLink } from "@/components/affiliate-link";

function CopyButton({ code, large }: { code: string; large?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <button
      onClick={copy}
      className={`flex items-center gap-2 font-bold border rounded-xl transition-all
        ${large ? "px-5 py-3 text-sm" : "px-3 py-1.5 text-xs"}
        ${copied
          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
          : "bg-zinc-800 border-zinc-700 text-zinc-200 hover:border-amber-500/40 hover:text-amber-300"
        }`}
    >
      {copied ? <Check className={large ? "w-5 h-5" : "w-3.5 h-3.5"} /> : <Copy className={large ? "w-5 h-5" : "w-3.5 h-3.5"} />}
      {copied ? "Copied!" : code}
    </button>
  );
}

export function VendorCouponPageClient({
  deal,
  vendor,
  relevantPeptideDeals,
  otherDeals,
}: {
  deal: VendorDeal;
  vendor?: Vendor;
  relevantPeptideDeals: PeptideBestDeal[];
  otherDeals: VendorDeal[];
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs">
        <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors">Home</Link>
        <span className="text-zinc-700">/</span>
        <Link href="/coupon-codes" className="text-zinc-500 hover:text-amber-400 transition-colors">Coupon Codes</Link>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300 font-medium">{deal.vendorName}</span>
      </nav>

      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-amber-950/50 to-zinc-900 border border-amber-500/30 p-6 space-y-4"
      >
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-amber-400" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400">
            Verified May 2026
          </span>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-1">
            {deal.vendorName} Discount Code 2026
          </h1>
          <p className="text-zinc-400 text-sm">
            Use code <strong className="text-amber-300">PEPTIDEX</strong> at checkout for{" "}
            <strong className="text-amber-300">{deal.discountPercent}% off</strong> your order.{" "}
            {deal.stackNote ?? ""}
          </p>
        </div>

        {/* The code — big, copyable */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1 rounded-xl bg-zinc-900 border-2 border-dashed border-amber-500/40 px-6 py-3 flex items-center justify-between">
            <span className="text-2xl font-black tracking-widest text-amber-300 font-mono">
              PEPTIDEX
            </span>
            <span className="text-xl font-bold text-emerald-400 ml-4">
              {deal.discountPercent}% OFF
            </span>
          </div>
          <CopyButton code={deal.code} large />
        </div>

        <AffiliateLink
          href={deal.affiliateUrl}
          peptide="coupon-page"
          vendorSlug={deal.vendorSlug}
          source="buy_box"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors"
        >
          Shop {deal.vendorName} <ArrowRight className="w-4 h-4" />
        </AffiliateLink>
      </motion.div>

      {/* How to use */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 space-y-3">
        <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
          <BadgePercent className="w-4 h-4 text-amber-400" />
          How to Use This Code
        </h2>
        <ol className="space-y-2">
          {[
            `Click "Shop ${deal.vendorName}" above — link opens their site`,
            "Add your peptides to cart",
            `Enter code PEPTIDEX in the discount/coupon field at checkout`,
            `Your ${deal.discountPercent}% discount is applied instantly`,
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Deal details grid */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
        <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-4">Deal Details</h2>
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
          {[
            { icon: <BadgePercent className="w-4 h-4 text-amber-400" />, label: "Discount", value: `${deal.discountPercent}% off` },
            { icon: <RotateCcw className="w-4 h-4 text-zinc-400" />, label: "Expires", value: deal.expiresLabel },
            { icon: <Zap className={`w-4 h-4 ${deal.stackable ? "text-emerald-400" : "text-zinc-600"}`} />, label: "Stackable", value: deal.stackable ? "Yes — stacks with sales" : "No" },
            { icon: <Package className="w-4 h-4 text-zinc-400" />, label: "Free Shipping", value: deal.freeShippingThreshold ? `Orders over $${deal.freeShippingThreshold}` : "See site" },
            { icon: <ShieldCheck className="w-4 h-4 text-zinc-400" />, label: "Exclusions", value: deal.exclusions && deal.exclusions.length > 0 ? deal.exclusions.join(", ") : "None — applies sitewide" },
            { icon: <Star className="w-4 h-4 text-amber-400" />, label: "Rating", value: `${deal.rating}/5 (${vendor?.ratingCount ?? "200+"} reviews)` },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0">{icon}</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</p>
                <p className="text-xs text-zinc-300">{value}</p>
              </div>
            </div>
          ))}
        </div>
        {deal.stackNote && (
          <div className="mt-4 rounded-lg bg-emerald-950/30 border border-emerald-500/20 px-4 py-2">
            <p className="text-xs text-emerald-300">💡 {deal.stackNote}</p>
          </div>
        )}
      </div>

      {/* Pro tip */}
      {deal.proTip && (
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
          <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-2">
            💡 Pro Tip from Our Team
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">{deal.proTip}</p>
        </div>
      )}

      {/* Per-peptide prices at this vendor */}
      {relevantPeptideDeals.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-zinc-200 mb-3">
            Prices at {deal.vendorName} After Code
          </h2>
          <div className="rounded-xl border border-zinc-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/50">
                  {["Peptide", "List Price", "After PEPTIDEX", "Per mg", ""].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {relevantPeptideDeals.map((p) => (
                  <tr key={p.peptideSlug} className="border-b border-zinc-800/60 last:border-0">
                    <td className="px-4 py-3">
                      <Link href={`/peptides/${p.peptideSlug}`} className="text-sm text-zinc-200 hover:text-amber-400 transition-colors font-medium">
                        {p.peptideName}
                      </Link>
                      <p className="text-[10px] text-zinc-600">{p.vialMg}mg vial</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-zinc-500 line-through">${p.price.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-emerald-400">${p.discountedPrice.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-zinc-400">${p.perMg.toFixed(2)}/mg</span>
                    </td>
                    <td className="px-4 py-3">
                      <AffiliateLink
                        href={p.affiliateUrl}
                        peptide={p.peptideSlug}
                        vendorSlug={p.vendorSlug}
                        source="pricing_table"
                        className="flex items-center gap-1 text-xs text-amber-400 hover:underline whitespace-nowrap"
                      >
                        Buy <ExternalLink className="w-3 h-3" />
                      </AffiliateLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Vendor profile quick stats */}
      {vendor && (
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5">
          <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-3">
            About {deal.vendorName}
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
            {[
              { label: "Catalog", value: vendor.catalogSize },
              { label: "Purity", value: vendor.purity },
              { label: "Testing", value: vendor.testingMethods.join(", ") },
              { label: "Shipping", value: vendor.shippingSpeed },
              { label: "Ships To", value: vendor.shipsTo.join(", ") },
              { label: "Returns", value: vendor.returnPolicy },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg bg-zinc-800/60 px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">{label}</p>
                <p className="text-zinc-300">{value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Link
              href={`/vendors/${vendor.slug}-review`}
              className="text-xs text-amber-400 hover:underline"
            >
              Read our full {deal.vendorName} review →
            </Link>
          </div>
        </div>
      )}

      {/* Other vendors */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
            Other Vendor Codes
          </h2>
          <Link href="/coupon-codes" className="text-xs text-amber-400 hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> All codes
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {otherDeals.slice(0, 4).map((d) => (
            <Link
              key={d.vendorSlug}
              href={`/coupon-codes/${d.vendorSlug}`}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors group"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-200 group-hover:text-amber-400 transition-colors">
                  {d.vendorName}
                </p>
                <p className="text-xs text-zinc-500">PEPTIDEX → {d.discountPercent}% off</p>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-zinc-600 leading-relaxed">
        All peptides are sold for research purposes only and are not approved for human use by the FDA.
        PeptiDex receives affiliate compensation when you purchase through our links. Codes verified May 2026.
        Prices and availability subject to change without notice.
      </p>
    </div>
  );
}
