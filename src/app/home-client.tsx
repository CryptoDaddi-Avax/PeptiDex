"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { goals } from "@/data/goals";
import { peptides } from "@/data/peptides";
import { stacks } from "@/data/stacks";
import { GoalId } from "@/data/types";
import { SHORT_DISCLAIMER } from "@/data/constants";
import {
  Sparkles, ArrowRight, ShieldAlert, Crown, ShieldCheck, ExternalLink,
  GraduationCap, Store, Beaker, BarChart3, BookOpen, FlaskConical,
  CheckCircle2, Search, Zap
} from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { trackAffiliateClick, trackOutboundClick, trackCTAClick } from "@/lib/ga4-events";

export default function HomePage() {
  const router = useRouter();

  function getGoalStackRoute(goal: typeof goals[0]) {
    const mainStack = goals.find(g => g.id === goal.id)?.stackNames[0] || '';
    const slug = mainStack.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `/stacks/${slug}`;
  }

  const totalStudies = peptides.reduce((acc, p) => acc + p.key_studies.length, 0);

  return (
    <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-8 relative overflow-hidden">
      {/* Gradient Background — pure CSS, zero JS layout impact */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/15 blur-[100px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute top-[10%] right-[-15%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[80px] animate-[float_12s_ease-in-out_infinite_reverse]" />
        <div className="absolute bottom-[20%] left-[20%] w-[35%] h-[35%] rounded-full bg-indigo-500/10 blur-[90px] animate-[float_10s_ease-in-out_2s_infinite]" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.15); }
          50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.3); }
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fi1 { animation: fadein 0.35s ease both 0s; }
        .fi2 { animation: fadein 0.35s ease both 0.06s; }
        .fi3 { animation: fadein 0.35s ease both 0.12s; }
        .fi4 { animation: fadein 0.35s ease both 0.18s; }
        .fi5 { animation: fadein 0.35s ease both 0.24s; }
        .fi6 { animation: fadein 0.35s ease both 0.30s; }
      `}</style>

      {/* Disclaimer */}
      <div className="rounded-xl md:rounded-2xl bg-amber-950/25 border border-amber-500/20 p-2.5 md:p-3 mb-4 md:mb-6 fi1">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] md:text-[11px] text-amber-400/80 leading-relaxed">{SHORT_DISCLAIMER}</p>
        </div>
      </div>

      {/* Hero — min-height reserved to prevent desktop CLS */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-center mb-6 md:mb-10"
        style={{ minHeight: "200px" }}
      >
        <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 md:mb-5">
          <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-violet-400" />
          <span className="text-[11px] md:text-xs font-medium text-violet-300">Research-backed peptide education</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4 leading-tight max-w-3xl mx-auto">
          Research-Grade Peptide Education, Stacks &amp; Trusted Vendor Sourcing
        </h1>
        <p className="text-[13px] md:text-[15px] text-zinc-400 max-w-2xl mx-auto leading-relaxed px-2 md:px-0">
          PeptiDex is your independent research hub for peptide education. Explore 33{" "}
          <strong className="text-zinc-300 font-medium">research peptides</strong>, 12 expert-curated{" "}
          <strong className="text-zinc-300 font-medium">peptide stacks</strong>, and 140+ peer-reviewed studies.
        </p>
      </motion.div>

      {/* ═══════ QUICK ACTION BAR ═══════ */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 fi2">
        <Link
          href="/vendors"
          onClick={() => trackCTAClick("Compare Prices", "/vendors")}
          className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold hover:bg-emerald-600/25 transition-all"
        >
          <BarChart3 className="w-4 h-4" /> Compare Prices
        </Link>
        <Link
          href="/library"
          onClick={() => trackCTAClick("Browse Library", "/library")}
          className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-violet-600/15 border border-violet-500/30 text-violet-400 text-sm font-semibold hover:bg-violet-600/25 transition-all"
        >
          <Search className="w-4 h-4" /> Browse Library
        </Link>
        <Link
          href="/quiz"
          onClick={() => trackCTAClick("Find Your Stack", "/quiz")}
          className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-pink-600/15 border border-pink-500/30 text-pink-400 text-sm font-semibold hover:bg-pink-600/25 transition-all"
        >
          <Zap className="w-4 h-4" /> Find Your Stack
        </Link>
      </div>

      {/* ═══════ TWO PATHS SECTION ═══════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 fi3">
        <Link href="/intro" className="group block p-5 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-blue-900/5 hover:border-blue-500/40 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">I want to learn</h3>
              <p className="text-xs text-zinc-500">Educational Hub</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-blue-400" /> Peptide 101 Guides</li>
            <li className="flex items-center gap-2"><FlaskConical className="w-3.5 h-3.5 text-blue-400" /> Evidence Dashboard</li>
            <li className="flex items-center gap-2"><Beaker className="w-3.5 h-3.5 text-blue-400" /> Clinical Studies</li>
          </ul>
        </Link>

        <Link href="/vendors" className="group block p-5 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/10 to-emerald-900/5 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Store className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">I want to source</h3>
              <p className="text-xs text-zinc-500">Commercial Tools</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex items-center gap-2"><BarChart3 className="w-3.5 h-3.5 text-emerald-400" /> Vendor Price Comparison</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> COA-Verified Sources</li>
            <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Lab Purity Reports</li>
          </ul>
        </Link>
      </div>

      {/* Beginners Guide CTA */}
      <div className="mb-10 max-w-xl mx-auto px-2 fi3">
        <Link href="/beginners-guide" className="block relative group overflow-hidden rounded-2xl p-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative flex flex-col md:flex-row items-center gap-4 bg-zinc-950/90 backdrop-blur-xl rounded-[15px] p-5 border border-white/5 group-hover:bg-zinc-900/90 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
              <Sparkles className="w-6 h-6 text-violet-400" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white mb-1">New to Peptides?</h3>
              <p className="text-sm text-zinc-400">Read our Complete Beginner&apos;s Guide on reconstitution, pinning, and supplies.</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 min-w-[44px] min-h-[44px] rounded-full bg-white/5 group-hover:bg-violet-500/20 text-zinc-400 group-hover:text-violet-300 transition-colors mt-2 md:mt-0">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </Link>
      </div>

      {/* Goal Selector Header */}
      <div className="text-center mb-5 fi4">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-100">What are your health goals?</h2>
      </div>

      {/* Goal Chips */}
      <div className="flex flex-wrap gap-2 md:gap-2.5 justify-center mb-6 md:mb-10 px-1 md:px-0 fi4">
        {goals.map((goal) => (
          <Link
            key={goal.id}
            href={getGoalStackRoute(goal)}
            className="flex items-center gap-2 px-3 py-2.5 md:px-4 md:py-2.5 min-h-[44px] rounded-xl border transition-all text-sm md:text-base border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300"
          >
            <span className="text-lg">{goal.icon}</span>
            <span className="font-semibold">{goal.label}</span>
          </Link>
        ))}
      </div>

      {/* Stats Header */}
      <div className="text-center mt-12 mb-4 fi5">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-100">What the Research Says</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 md:gap-4 pb-4 md:pb-0 fi5">
        {[
          { value: "33", label: "Peptides" },
          { value: "12", label: "Stacks" },
          { value: "140+", label: "Studies" },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
            <p className="text-xl md:text-2xl font-bold text-violet-400">{stat.value}</p>
            <p className="text-[10px] md:text-xs text-zinc-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ═══════ VENDORS TEASER ═══════ */}
      <div className="mt-10 md:mt-12 fi5">
        <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-3">Trusted Peptide Vendors</h2>
          <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed max-w-lg mx-auto mb-6">
            Finding a reliable source for your laboratory is critical. We independently review and recommend the best peptide vendors who provide transparent, third-party Certificate of Analysis (COA) testing.
          </p>

          <div className="max-w-md mx-auto mb-6 p-[1px] rounded-2xl bg-gradient-to-b from-emerald-500/30 to-zinc-800" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
            <div className="bg-zinc-950 rounded-[15px] p-6 border border-emerald-500/10 shadow-xl shadow-emerald-500/5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-[10px] font-bold text-white uppercase tracking-wider mb-4 shadow-md">
                <Crown className="w-3 h-3" /> Our #1 Rated Source for 2026
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-1">Amino Club</h3>
              <p className="text-xs text-emerald-400 font-semibold mb-4">4.9/5 — PeptiDex Rating</p>

              <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-[11px] text-zinc-300 font-medium mb-6">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> COA-verified</span>
                <span className="hidden sm:inline text-zinc-700 font-black">&middot;</span>
                <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-emerald-500" /> 99%+ purity</span>
                <span className="hidden sm:inline text-zinc-700 font-black">&middot;</span>
                <span className="flex items-center gap-1"><ArrowRight className="w-3.5 h-3.5 text-emerald-500" /> Fast US shipping</span>
              </div>

              <a
                href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX"
                target="_blank"
                rel="nofollow noopener sponsored"
                onClick={() => trackAffiliateClick({ vendor: "amino_club", peptide: "general", source_component: "vendor_card", url: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" })}
                className="flex items-center justify-center gap-2 w-full py-3.5 min-h-[48px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-500/20 mb-2"
                id="affiliate-home-vendor-card-amino-club"
              >
                Compare Prices <ExternalLink className="w-4 h-4 text-emerald-200" />
              </a>
              <a
                href="https://aminoclub.com/coa/bpc-157-latest.pdf"
                target="_blank"
                rel="nofollow noopener sponsored"
                onClick={() => trackAffiliateClick({ vendor: "amino_club", peptide: "bpc-157", source_component: "vendor_card", url: "https://aminoclub.com/coa/bpc-157-latest.pdf" })}
                className="flex items-center justify-center gap-2 w-full py-2.5 min-h-[44px] rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-sm font-semibold transition-all"
                id="affiliate-home-vendor-card-amino-club-coa"
              >
                <Beaker className="w-4 h-4" /> View Lab Test Results (COA)
              </a>
              <p className="text-[9px] text-zinc-500 italic mt-3">Disclosure: PeptiDex may earn a commission from purchases made through this link.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/50">
            <Link
              href="/vendors"
              onClick={() => trackCTAClick("Compare All Vendor Reviews", "/vendors")}
              className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
            >
              Compare All Vendor Reviews <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* SEO Educational Block */}
      <div className="mt-16 mb-8 max-w-3xl mx-auto px-4 md:px-6 py-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 fi6">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-4">Advancing the Science of Peptide Research</h2>
        <div className="space-y-4 text-sm md:text-[15px] text-zinc-400 leading-relaxed">
          <p>
            The field of peptide research has expanded significantly over the past decade. Synthetic peptides are short chains of amino acids that serve as foundational tools for understanding cellular processes, molecular signaling, and systemic biological responses in laboratory environments. These compounds mimic naturally occurring proteins to probe complex metabolic pathways without the systemic interference often found in larger biologic macromolecules.
          </p>
          <p>
            At PeptiDex, our platform aggregates the latest peer-reviewed studies directly from authoritative scientific databases such as{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">PubMed</a>{" "}
            and independent clinical trials. By synthesizing complex pharmacokinetic data, we provide researchers with an accessible, robust framework for evaluating experimental protocols.
          </p>
          <p>
            Quality control remains the most critical variable in any experimental setup. Our vendor sourcing database strictly catalogs suppliers who provide transparent, third-party Certificates of Analysis (COAs), ensuring researchers have access to compounds exceeding 99% purity thresholds.
          </p>
          <p className="text-xs text-zinc-500 italic mt-4 pt-4 border-t border-zinc-800/50">
            Please note: The information indexed on PeptiDex is strictly for educational and referencing purposes. Peptides listed are strictly research chemicals and are not approved by the FDA for human consumption, diagnostic, or therapeutic use.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSignup source="home_page" />
    </div>
  );
}
