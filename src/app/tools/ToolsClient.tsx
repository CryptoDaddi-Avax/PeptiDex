'use client';

import { SITE_STATS } from "@/data/site-stats";

import Link from "next/link";
import {
  GitCompare, ShieldAlert, ArrowRight, GraduationCap,
  BookA, BarChart3, DollarSign, Store, Stethoscope,
  Sparkles, Users, TrendingDown, ShieldCheck, Timer,
  HelpCircle, ShoppingCart
} from "lucide-react";
import './tools-redesign.css';

const tools: { href: string; icon: typeof GitCompare; title: string; description: string; badge?: string }[] = [
    {
        href: "/tools/compare",
        icon: GitCompare,
        title: "Peptide Comparison",
        description: "Compare 2-3 peptides side-by-side: mechanisms, evidence, safety, and interactions.",
    },
    {
        href: "/tools/interactions",
        icon: ShieldAlert,
        title: "Interaction Checker",
        description: "Check for synergies, cautions, and contraindications between your peptide selections.",
    },
    {
        href: "/tools/evidence",
        icon: BarChart3,
        title: "Evidence Dashboard",
        description: `All ${SITE_STATS.peptides.count} peptides ranked by strength of clinical evidence with study counts.`,
    },
    {
        href: "/tools/pricing",
        icon: DollarSign,
        title: "Price Comparison",
        description: "Cost per vial and per mg, with PEPTIDEX discounts. Build a multi-peptide vendor cart.",
    },
    {
        href: "/tools/pk",
        icon: TrendingDown,
        title: "PK Plasma Graphs",
        description: "Visualize normalized pharmacokinetic plasma concentration curves: time to peak and half-life decay.",
    },
    {
        href: "/tools/coa",
        icon: ShieldCheck,
        title: "COA Analyzer",
        description: "Verify a supplier's Certificate of Analysis enter the reported MW and purity to get a Pass / Fail verdict against lab reference values.",
    },
    {
        href: "/tools/halflife",
        icon: Timer,
        title: "Half-Life Visualizer",
        description: "Compare how quickly multiple peptides' plasma levels decay, side-by-side on interactive curves.",
    },
];

export default function ToolsClient() {
    return (
            <>
            <div className="tools-wrap">
                <div className="tools-header">
                    <h1 className="tools-title">Power Tools</h1>
                    <p className="tools-subtitle">Research-grade utilities for your peptide journey</p>
                </div>

                {/* AI Advisor Hero */}
                <Link href="/advisor" className="tools-ai-promo">
                    <div className="tools-ai-badge">AI Powered</div>
                    <div className="tools-ai-content">
                        <div className="tools-ai-icon">
                            <Sparkles />
                        </div>
                        <div className="tools-ai-text">
                            <h2 className="tools-ai-title">
                                PeptiDex Advisor <ArrowRight />
                            </h2>
                            <p className="tools-ai-desc">
                                Chat with our AI advisor — explore peptide research, compare compounds, analyze stacks, and more.
                            </p>
                        </div>
                    </div>
                </Link>

                <div className="tools-grid">
                    {tools.map((tool) => (
                        <Link key={tool.href} href={tool.href} className="tool-card">
                            {tool.badge && <div className="tool-badge">{tool.badge}</div>}
                            <div className="tool-card-content">
                                <div className="tool-icon-wrap">
                                    <tool.icon />
                                </div>
                                <div className="tool-text">
                                    <h2 className="tool-title">{tool.title} <ArrowRight /></h2>
                                    <p className="tool-desc">{tool.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Learn Section */}
                <div>
                    <h2 className="tools-section-heading">Learn</h2>
                    <div className="tools-small-grid">
                        <Link href="/intro" className="tool-small-card">
                            <GraduationCap />
                            <h3 className="tool-small-title">Peptide 101</h3>
                            <p className="tool-small-desc">5 guided modules</p>
                        </Link>
                        <Link href="/glossary" className="tool-small-card">
                            <BookA />
                            <h3 className="tool-small-title">Glossary</h3>
                            <p className="tool-small-desc">82 terms explained</p>
                        </Link>
                    </div>
                </div>

                {/* Find Section */}
                <div>
                    <h2 className="tools-section-heading">Find</h2>
                    <div className="tools-small-grid four-cols">
                        <Link href="/suppliers" className="tool-small-card">
                            <Store />
                            <h3 className="tool-small-title">Suppliers</h3>
                            <p className="tool-small-desc">Vetted sources</p>
                        </Link>
                        <Link href="/where-to-buy" className="tool-small-card">
                            <ShoppingCart />
                            <h3 className="tool-small-title">Where to Buy</h3>
                            <p className="tool-small-desc">Compare prices</p>
                        </Link>
                        <Link href="/practitioners" className="tool-small-card">
                            <Stethoscope />
                            <h3 className="tool-small-title">Doctors</h3>
                            <p className="tool-small-desc">Find practitioners</p>
                        </Link>
                        <Link href="/stacks" className="tool-small-card">
                            <Users />
                            <h3 className="tool-small-title">Stacks</h3>
                            <p className="tool-small-desc">Community stacks</p>
                        </Link>
                        <Link href="/quiz" className="tool-small-card">
                            <HelpCircle />
                            <h3 className="tool-small-title">Find Your Stack</h3>
                            <p className="tool-small-desc">3-question quiz</p>
                        </Link>
                    </div>
                </div>
            </div>
            </>
    );
}
