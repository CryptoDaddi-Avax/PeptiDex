import type { Metadata } from "next";
import Link from "next/link";
import {
    Dna, Settings, ShieldAlert, Activity,
    ArrowRight, Microscope, Info, GitMerge, FileText, Table as TableIcon, AlertTriangle
} from "lucide-react";

export const metadata: Metadata = {
    title: "TB-500: Research Overview, Benefits & Stack Guide",
    description: "TB-500 is a synthetic peptide studied for systemic healing, inflammation reduction, and recovery. Explore the science, dosing context, and stacks.",
};

export default function TB500ReferencePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">

            {/* Header Section */}
            <header className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
                    <Microscope className="w-3.5 h-3.5" /> Research Reference
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 mb-4 tracking-tight">
                    TB-500: Research Overview, Benefits & Stack Guide
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
                    Comprehensive scientific insights into TB-500 (Thymosin Beta-4), exploring its systemic action, experimental applications, and common research stacks.
                </p>
            </header>

            <article className="space-y-12">

                {/* SECTION 1: WHAT IS TB-500? */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Dna className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">What is TB-500?</h2>
                    </div>
                    <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed text-[15px] space-y-4">
                        <p>
                            TB-500 is a synthetic version of Thymosin Beta-4 (Tβ4), a naturally occurring peptide found in nearly all human and animal cells. Originally discovered during thymus gland research, Tβ4 plays a critical role in tissue repair, cell migration, and the regeneration of damaged tissues. Researchers study TB-500 specifically because of its unique ability to upregulate actin, a vital cellular protein essential for muscle contraction and cell mobility.
                        </p>
                        <p>
                            A key differentiator that makes TB-500 highly sought after in research settings is its <strong>systemic action</strong>. Unlike localized peptides such as BPC-157, TB-500 circulates throughout the entire body to actively seek out areas of inflammation, injury, or cellular stress. By promoting cell migration and angiogenesis (new blood vessel formation), TB-500 represents a promising frontier for whole-body cellular recovery and accelerated healing.
                        </p>
                    </div>
                </section>

                {/* SECTION 2: WHAT RESEARCHERS STUDY IT FOR */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                            <Activity className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">What Researchers Study It For</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { title: "Systemic tissue repair and wound healing", desc: "Studies suggest it accelerates the migration of reparative cells to injury sites across the entire body." },
                            { title: "Muscle recovery and flexibility", desc: "Research indicates it may reduce muscle spasm and improve overall tissue elasticity following acute trauma." },
                            { title: "Tendon and ligament repair", desc: "It is frequently investigated for its potential to support the structural integrity and healing of slow-healing connective tissues." },
                            { title: "Cardiovascular tissue protection", desc: "Early evidence points toward its ability to protect cardiac cells and promote capillary growth following ischemic events." },
                            { title: "Reduction of chronic inflammation", desc: "Trials suggest it downregulates inflammatory markers, offering relief in models of chronic systemic inflammation." },
                            { title: "Hair growth (emerging research)", desc: "Preliminary developmental studies observe that it may stimulate stem cells within hair follicles, extending the anagen (growth) phase." }
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/40 transition-colors">
                                <h3 className="text-zinc-100 font-semibold mb-1 flex items-center gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    {item.title}
                                </h3>
                                <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 3: HOW IT'S TYPICALLY USED IN RESEARCH */}
                <section className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                            <Settings className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-zinc-100">How It&apos;s Typically Used in Research</h2>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[15px]">
                        In preclinical and early clinical studies, researchers have primarily used subcutaneous (SubQ) or intramuscular (IM) injection routes to administer TB-500. Subcutaneous injection is the most commonly documented method, as the peptide&apos;s systemic nature means it does not strictly need to be administered adjacent to the site of injury to be structurally effective. Because TB-500 possesses a longer active half-life relative to other regenerative compounds, research protocols often utilize a heavier loading phase with frequent administration, followed by an extended maintenance phase. In these laboratory settings, lyophilized TB-500 powder is always reconstituted using bacteriostatic water to carefully preserve the peptide chains prior to injection.
                    </p>
                </section>

                {/* SECTION 4: TB-500 vs BPC-157: KEY DIFFERENCES */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                            <TableIcon className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">TB-500 vs BPC-157: Key Differences</h2>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-zinc-800 mb-6">
                        <table className="w-full text-left text-sm text-zinc-300">
                            <thead className="text-xs uppercase bg-zinc-900 text-zinc-400 border-b border-zinc-800">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Feature</th>
                                    <th className="px-6 py-4 font-bold text-amber-400">TB-500</th>
                                    <th className="px-6 py-4 font-bold text-cyan-400">BPC-157</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800 bg-zinc-900/30">
                                <tr className="hover:bg-zinc-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-zinc-200">Origin</td>
                                    <td className="px-6 py-4">Synthetic Thymosin Beta-4</td>
                                    <td className="px-6 py-4">Gastric juice peptide</td>
                                </tr>
                                <tr className="hover:bg-zinc-800/30 transition-colors bg-zinc-900/10">
                                    <td className="px-6 py-4 font-medium text-zinc-200">Action</td>
                                    <td className="px-6 py-4">Systemic (whole body)</td>
                                    <td className="px-6 py-4">Localized (targeted area)</td>
                                </tr>
                                <tr className="hover:bg-zinc-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-zinc-200">Primary research use</td>
                                    <td className="px-6 py-4">Recovery, inflammation</td>
                                    <td className="px-6 py-4">Tissue repair, gut healing</td>
                                </tr>
                                <tr className="hover:bg-zinc-800/30 transition-colors bg-zinc-900/10">
                                    <td className="px-6 py-4 font-medium text-zinc-200">Stack compatibility</td>
                                    <td className="px-6 py-4">Pairs with BPC-157</td>
                                    <td className="px-6 py-4">Pairs with TB-500</td>
                                </tr>
                                <tr className="hover:bg-zinc-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-zinc-200">WADA status</td>
                                    <td className="px-6 py-4 text-red-400 font-medium">Prohibited</td>
                                    <td className="px-6 py-4 text-red-400 font-medium">Prohibited</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="text-zinc-300 leading-relaxed text-[15px]">
                        TB-500 and BPC-157 are frequently studied together because they operate through highly complementary mechanisms. While BPC-157 excels at localized, rapid repair—particularly in tendons, ligaments, and the gut—TB-500 handles broad, systemic overall recovery. Together, they create a synergistic environment where BPC-157 targets the acute injury site while TB-500 supports the surrounding whole-body healing process.
                    </p>
                </section>

                {/* SECTION 5: TB-500 STACKS */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                            <GitMerge className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">TB-500 Stacks</h2>
                    </div>
                    <div className="p-6 rounded-2xl bg-cyan-900/10 border border-cyan-500/20 mb-4">
                        <p className="text-zinc-300 leading-relaxed text-[15px] mb-6">
                            The flagship combination in regenerative research is the <strong>TB-500 and BPC-157 stack</strong>. This represents the most extensively researched pairing for comprehensive injury recovery, as the localized tissue repair of BPC-157 synergizes perfectly with the systemic, anti-inflammatory reach of TB-500. Another prominent area of study involves stacking TB-500 with Ipamorelin. In this combination, researchers investigate the compounded effects of TB-500&apos;s tissue regeneration and Ipamorelin&apos;s gentle amplification of natural growth hormone pulses for sustained recovery support.
                        </p>
                        <Link
                            href="/stacks"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors text-sm"
                        >
                            Explore the full Injury Recovery Stack in the PeptiDex app <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>

                {/* SECTION 6: SAFETY & REGULATORY STATUS */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">Safety & Regulatory Status</h2>
                    </div>

                    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
                        <p className="text-zinc-300 text-[15px] leading-relaxed">
                            TB-500 is strictly an experimental compound and holds <strong>no FDA approval</strong> for human consumption or medical use. In competitive sports, the World Anti-Doping Agency (WADA) actively prohibits TB-500 at all times (including the 2026 prohibited list) due to its potential performance and recovery-enhancing properties.
                        </p>

                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex gap-3 my-4">
                            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                                <p>Because it is not regulated as a pharmaceutical, TB-500 is primarily available through grey-market research vendors. This presents severe quality control risks: a 2023 JAMA study found that <strong>42% of online peptide products had inaccurate quantities</strong> of the active ingredient.</p>
                            </div>
                        </div>

                        <p className="text-zinc-300 text-[15px] leading-relaxed">
                            There is extremely limited long-term human safety data regarding its use. From a clinical perspective, researchers are particularly cautious about its effects on angiogenesis. While new blood vessel growth (angiogenesis) aids rapid tissue repair, some studies suggest this mechanism could theoretically promote unwanted cellular proliferation, making its long-term implications in humans not fully understood.
                        </p>
                    </div>
                </section>

                {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-zinc-700/30 text-zinc-300">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">Frequently Asked Questions</h2>
                    </div>

                    <dl className="space-y-4">
                        {[
                            {
                                q: "What is TB-500?",
                                a: "TB-500 is a synthetic version of the naturally occurring peptide Thymosin Beta-4. It is primarily studied for its whole-body, systemic ability to upregulate cell-building proteins, promote blood vessel formation, and accelerate the healing of muscles and connective tissues."
                            },
                            {
                                q: "What is the difference between TB-500 and BPC-157?",
                                a: "The main difference lies in their mechanism of action. BPC-157 acts locally to rapidly heal specific, targeted injuries like tendon tears or gut inflammation, whereas TB-500 acts systemically throughout the entire body to improve cellular mobility and overall recovery."
                            },
                            {
                                q: "Is TB-500 legal?",
                                a: "TB-500 is not approved by the FDA for human use and is strictly sold for laboratory and research purposes only. Additionally, it is explicitly banned at all times by the World Anti-Doping Agency (WADA) for use in competitive sports."
                            },
                            {
                                q: "What does TB-500 do for recovery?",
                                a: "In research settings, TB-500 supports recovery by mitigating systemic inflammation and enhancing the migration of reparative cells to damaged areas. It also promotes angiogenesis, increasing blood flow and nutrient delivery to recovering muscle tissues and injuries."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/20">
                                <dt className="font-bold text-zinc-100 text-base mb-2">{faq.q}</dt>
                                <dd className="text-zinc-400 text-sm leading-relaxed">{faq.a}</dd>
                            </div>
                        ))}
                    </dl>
                </section>

            </article>
        </div>
    );
}
