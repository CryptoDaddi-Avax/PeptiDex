'use client';

import { SITE_STATS } from "@/data/site-stats";

import Link from "next/link";
import { 
  GitCompare, Calculator, ShieldAlert, ArrowRight, GraduationCap, 
  BookA, BarChart3, DollarSign, Activity, Calendar, Store, Stethoscope, 
  Sparkles, Users, TrendingDown, ShieldCheck, Timer, ClipboardList, 
  HelpCircle, FlaskConical, ShoppingCart 
} from "lucide-react";
import './tools-redesign.css';

const tools = [
    {
        href: "/tools/cycle-planner",
        icon: ShoppingCart,
        title: "Cycle Planner",
        description: "Plan your full cycle — get exact vial counts, dosing schedules, and order everything from a trusted vendor.",
        badge: "NEW",
    },
    {
        href: "/tools/compare",
        icon: GitCompare,
        title: "Peptide Comparison",
        description: "Compare 2-3 peptides side-by-side: mechanisms, dosing, evidence, safety, and interactions.",
    },
    {
        href: "/tools/calculator",
        icon: Calculator,
        title: "Reconstitution Calculator",
        description: "Calculate solution concentrations and volumetric measurements for peptide reconstitution protocols.",
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
        description: "Average cost per vial, per dose, and doses per vial for all peptides.",
    },
    {
        href: "/tools/bloodwork",
        icon: Activity,
        title: "Blood Work Analyzer",
        description: "Input your lab results and get personalized peptide suggestions based on your biomarkers.",
    },
    {
        href: "/tools/pk",
        icon: TrendingDown,
        title: "PK Plasma Graphs",
        description: "Visualize pharmacokinetic plasma concentration curves for any peptide peaks, half-life decay, and multi-dose accumulation.",
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
        description: "See how multiple peptides' plasma levels overlap throughout the day. Optimize injection timing with interactive curves.",
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
                                Chat with our AI advisor — get personalized peptide recommendations, dosing help, stack analysis, and more.
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
                        <Link href="/guides/reconstitution" className="tool-small-card">
                            <FlaskConical />
                            <h3 className="tool-small-title">Reconstitution</h3>
                            <p className="tool-small-desc">Step-by-step guide</p>
                        </Link>
                    </div>
                </div>

                {/* Track + Find Section */}
                <div>
                    <h2 className="tools-section-heading">Track &amp; Find</h2>
                    <div className="tools-small-grid four-cols">
                        <Link href="/tracker" className="tool-small-card">
                            <Calendar />
                            <h3 className="tool-small-title">Tracker</h3>
                            <p className="tool-small-desc">Log doses &amp; cycles</p>
                        </Link>
                        <Link href="/suppliers" className="tool-small-card">
                            <Store />
                            <h3 className="tool-small-title">Suppliers</h3>
                            <p className="tool-small-desc">Vetted sources</p>
                        </Link>
                        <Link href="/buy" className="tool-small-card">
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
                            <p className="tool-small-desc">Community protocols</p>
                        </Link>
                        <Link href="/quiz" className="tool-small-card">
                            <HelpCircle />
                            <h3 className="tool-small-title">Find Your Stack</h3>
                            <p className="tool-small-desc">5-question quiz</p>
                        </Link>
                        <Link href="/protocol" className="tool-small-card">
                            <ClipboardList />
                            <h3 className="tool-small-title">Protocol Builder</h3>
                            <p className="tool-small-desc">Build &amp; export</p>
                        </Link>
                    </div>
                </div>
            </div>
            </>
    );
}
