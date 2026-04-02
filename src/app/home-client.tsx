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
import { Sparkles, ArrowRight, ShieldAlert } from "lucide-react";
import { NewsletterSignup } from "@/components/newsletter-signup";

export default function HomePage() {
  const router = useRouter();

  // Get first mapped stack slug
  function getGoalStackRoute(goal: typeof goals[0]) {
    const mainStack = goals.find(g => g.id === goal.id)?.stackNames[0] || '';
    const slug = mainStack.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `/stacks/${slug}`;
  }


  // Collect all unique studies
  const totalStudies = peptides.reduce((acc, p) => acc + p.key_studies.length, 0);

  return (
    <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-8 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
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
      `}</style>
      {/* Disclaimer */}
      <div className="rounded-xl md:rounded-2xl bg-amber-950/25 border border-amber-500/20 p-2.5 md:p-3 mb-4 md:mb-6">
        <div className="flex items-start gap-2">
          <ShieldAlert className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] md:text-[11px] text-amber-400/80 leading-relaxed">{SHORT_DISCLAIMER}</p>
        </div>
      </div>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 md:mb-5">
          <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-violet-400" />
          <span className="text-[11px] md:text-xs font-medium text-violet-300">Research-backed peptide education</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4 leading-tight max-w-3xl mx-auto">
          Research-Grade Peptide Education, Stacks & Trusted Vendor Sourcing
        </h1>
        <p className="text-[13px] md:text-[15px] text-zinc-400 max-w-2xl mx-auto leading-relaxed px-2 md:px-0">
          PeptiDex is your independent research hub for peptide education. Explore 33 <strong className="text-zinc-300 font-medium">research peptides</strong>, 12 expert-curated <strong className="text-zinc-300 font-medium">peptide stacks</strong>, and 140+ peer-reviewed studies. Whether you're researching recovery, fat loss, or longevity, find the right peptide protocols and <strong className="text-zinc-300 font-medium">trusted vendors</strong>, all in one place. For educational purposes only.
        </p>
      </motion.div>

      {/* Goal Selector Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-100">What are your health goals?</h2>
      </motion.div>

      {/* Goal Chips */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2 md:gap-2.5 justify-center mb-6 md:mb-10 px-1 md:px-0">
        {goals.map((goal) => (
          <Link
            key={goal.id} 
            href={getGoalStackRoute(goal)}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl border transition-all text-sm md:text-base border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-300"
          >
            <span className="text-lg">{goal.icon}</span>
            <span className="font-semibold">{goal.label}</span>
          </Link>
        ))}
      </motion.div>

      {/* Stats Header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-12 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-100">What the Research Says</h2>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="grid grid-cols-3 gap-2.5 md:gap-4 pb-4 md:pb-0">
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
      </motion.div>

      {/* Vendors Teaser */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-10 md:mt-12 p-6 md:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-3">Trusted Peptide Vendors, Sourcing Guide</h2>
        <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed max-w-lg mx-auto mb-6">
          Finding a reliable source for your laboratory is critical. We independently review and recommend the best peptide vendors who provide transparent, third-party Certificate of Analysis (COA) testing.
        </p>
        <button 
          onClick={() => router.push('/vendors')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold transition-colors"
        >
          View Trusted Vendors <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* SEO Educational Block */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-16 mb-8 max-w-3xl mx-auto px-4 md:px-6 py-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
        <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-4">Advancing the Science of Peptide Research</h2>
        <div className="space-y-4 text-sm md:text-[15px] text-zinc-400 leading-relaxed">
          <p>
            The field of peptide research has expanded significantly over the past decade. Synthetic peptides are short chains of amino acids that serve as foundational tools for understanding cellular processes, molecular signaling, and systemic biological responses in laboratory environments. These compounds mimic naturally occurring proteins to probe complex metabolic pathways without the systemic interference often found in larger biologic macromolecules.
          </p>
          <p>
            At PeptiDex, our platform aggregates the latest peer-reviewed studies directly from authoritative scientific databases such as <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">PubMed</a> and independent clinical trials. By synthesizing complex pharmacokinetic data, we provide researchers with an accessible, robust framework for evaluating experimental protocols. Whether investigating the tissue-healing properties of Angiogenesis regulators like BPC-157 or exploring the metabolic insulin-modulating mechanisms of advanced GLP-1 agonists.
          </p>
          <p>
            Quality control remains the most critical variable in any experimental setup. Analyzing the purity of chemical compounds requires stringent High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS). Our vendor sourcing database strictly catalogs suppliers who provide transparent, third-party Certificates of Analysis (COAs), ensuring researchers have access to compounds exceeding 99% purity thresholds.
          </p>
          <p className="text-xs text-zinc-500 italic mt-4 pt-4 border-t border-zinc-800/50">
            Please note: The information indexed on PeptiDex is strictly for educational and referencing purposes. Peptides listed are strictly research chemicals and are not approved by the FDA for human consumption, diagnostic, or therapeutic use.
          </p>
        </div>
      </motion.div>

      {/* Newsletter */}
      <NewsletterSignup source="home_page" />
    </div>
  );
}
