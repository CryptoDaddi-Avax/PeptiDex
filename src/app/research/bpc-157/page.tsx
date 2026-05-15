import type { Metadata } from "next";
import Link from "next/link";
import { 
    Microscope, Dna, Activity, Settings, GitMerge, 
    ShieldAlert, FileText, ArrowRight, AlertTriangle 
} from "lucide-react";
import { DisclaimerCard } from "@/components/ui/DisclaimerCard";

export const metadata: Metadata = {
    title: "BPC-157: Research Overview, Benefits & Stack Guide",
    description: "BPC-157 is a research peptide studied for tissue repair, gut healing, and injury recovery. Explore the science, dosing context, and stacks.",
};

export default function BPC157ReferencePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
            
            {/* Header Section */}
            <header className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
                    <Microscope className="w-3.5 h-3.5" /> Research Reference
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-100 mb-4 tracking-tight">
                    BPC-157: Research Overview, Benefits & Stack Guide
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
                    A comprehensive look at BPC-157, a gastric-derived pentadecapeptide central to modern preclinical research in localized tissue repair and GI healing.
                </p>
                <DisclaimerCard variant="educational" className="mt-6" />
            </header>

            <article className="space-y-12">
                
                {/* SECTION 1: WHAT IS BPC-157? */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Dna className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">What is BPC-157?</h2>
                    </div>
                    <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed text-[15px] space-y-4">
                        <p>
                            BPC-157, which stands for Body Protection Compound 157, is a synthetic pentadecapeptide consisting of 15 amino acids. It is derived from a protective protein naturally found in human gastric juice, where its biological role is believed to involve mucosal protection and gastrointestinal healing. Researchers study BPC-157 primarily for its profound regenerative potential, particularly its ability to accelerate the healing of tendons, ligaments, and the endothelial lining.
                        </p>
                        <p>
                            It is important to emphasize that BPC-157 remains strictly in the preclinical and research stage, with no large-scale human trials confirming its efficacy or safety profiles for widespread medical use. Despite this experimental status, its unique mechanism of promoting rapid, localized angiogenesis—the vital formation of new blood vessels—continues to drive significant scientific interest. By enhancing robust blood flow directly to injured tissues, this compound represents one of the most actively studied frontiers in accelerated injury recovery and localized cellular repair.
                        </p>
                    </div>
                </section>

                {/* SECTION 2: WHAT RESEARCHERS STUDY IT FOR */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                            <Activity className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">What Researchers Study It For</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { title: "Tissue and tendon repair", desc: "Studies suggest it accelerates the healing of torn or damaged tendons by increasing fibroblast survival and cellular migration." },
                            { title: "Gut healing and GI tract protection", desc: "Research indicates it protects the stomach endothelium and promotes the healing of ulcers or inflammatory bowel conditions." },
                            { title: "Injury recovery (muscle, ligament, bone)", desc: "It is widely investigated for its potential to stimulate osteogenesis and repair severe musculoskeletal trauma." },
                            { title: "Neurological and brain health", desc: "Emerging evidence points toward its neuroprotective properties, potentially aiding in recovery from nerve damage or traumatic brain injury." },
                            { title: "Anti-inflammatory effects", desc: "Preclinical trials observe a reduction in localized inflammation, assisting in the management of chronic pain in experimental models." }
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/40 transition-colors">
                                <h3 className="text-zinc-100 font-semibold mb-1 flex items-center gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
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
                        In preclinical studies, researchers have used varied administration routes for BPC-157, primarily focusing on subcutaneous injection and oral administration. Because the peptide originates from gastric juices, it remains highly stable in acidic environments, making oral dosing a viable area of research—especially for gastrointestinal healing studies. Subcutaneous injections are commonly utilized when targeting specific, localized musculoskeletal injuries. While human dosing protocols do not formally exist, much of the foundational research is extrapolated from animal models. For example, a widely cited oral dosage estimate in rat models is <strong>10 μg/kg</strong>, which translates via allometric scaling to approximately a <strong>1.6 μg/kg human equivalent dose</strong>. These parameters continuously guide <em>in vivo</em> laboratory investigations.
                    </p>
                </section>

                {/* SECTION 4: BPC-157 STACKS */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                            <GitMerge className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">BPC-157 Stacks</h2>
                    </div>
                    <div className="p-6 rounded-2xl bg-blue-900/10 border border-blue-500/20 mb-4">
                        <p className="text-zinc-300 leading-relaxed text-[15px] mb-6">
                            BPC-157 is most commonly studied alongside <strong>TB-500</strong> to observe synergistic recovery effects. The rationale behind this prominent stack lies in their highly complementary mechanisms of action: BPC-157 excels at delivering rapid, localized repair (specifically in tendons, ligaments, and the gut), whereas TB-500 provides broad, systemic healing and inflammation reduction by improving cellular mobility body-wide. Together, they create a comprehensive experimental protocol for full-spectrum injury recovery.
                        </p>
                        <Link 
                            href="/stacks" 
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors text-sm"
                        >
                            Explore the full Injury Recovery Stack in the PeptiDex app <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>

                {/* SECTION 5: SAFETY & REGULATORY STATUS */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-100">Safety & Regulatory Status</h2>
                    </div>
                    
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
                        <p className="text-zinc-300 text-[15px] leading-relaxed">
                            BPC-157 is an experimental compound. The FDA currently classifies it under <strong>Category 2</strong> bulk drug substances, meaning it is explicitly not approved for human use or pharmacy compounding. Furthermore, the World Anti-Doping Agency (WADA) prohibits BPC-157 at all times, including on its 2026 prohibited list. Within the United States, its sale is strictly restricted to laboratory and research purposes only.
                        </p>
                        
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex gap-3 my-4">
                            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-zinc-300 leading-relaxed space-y-2">
                                <p>Because it operates entirely outside the regulated pharmaceutical supply chain, securing BPC-157 presents severe quality control risks. A 2023 study published in JAMA evaluating online research peptide products found that <strong>42% contained inaccurate quantities</strong> of the active ingredient, and several contained completely substituted compounds.</p>
                            </div>
                        </div>

                        <p className="text-zinc-300 text-[15px] leading-relaxed">
                            Most crucially, there is extremely <strong>limited long-term human safety data</strong> regarding BPC-157. The long-term physiological impact of repeated exposure to artificially accelerated, localized angiogenesis (blood vessel growth) remains entirely unknown, underscoring the substantial risks of non-clinical application.
                        </p>
                    </div>
                </section>

                {/* SECTION 6: FREQUENTLY ASKED QUESTIONS */}
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
                                q: "What is BPC-157?",
                                a: "BPC-157 is a synthetic, 15-amino acid sequence derived from a naturally occurring protective protein found in human gastric juice. Researchers study it for its powerful ability to accelerate tissue repair and protect the gastrointestinal tract."
                            },
                            {
                                q: "Is BPC-157 legal?",
                                a: "BPC-157 is not approved by the FDA for human consumption and is classified as a Category 2 substance barred from compounding. It is strictly sold for research purposes only and is entirely prohibited by WADA for competitive athletes."
                            },
                            {
                                q: "What does BPC-157 do?",
                                a: "In scientific studies, BPC-157 promotes rapid, localized healing by stimulating angiogenesis (the formation of new blood vessels). This increased blood flow helps accelerate the repair of tendons, ligaments, muscles, and gut linings."
                            },
                            {
                                q: "Is BPC-157 safe?",
                                a: "BPC-157 lacks comprehensive long-term human safety data, as most insights rely on short-term animal models. Additionally, because it is unregulated, grey-market sourcing carries significant risks of product contamination and inaccurate dosing."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 transition-colors">
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
