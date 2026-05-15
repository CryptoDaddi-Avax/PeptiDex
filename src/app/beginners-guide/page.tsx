import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, Droplet, ThermometerSnowflake, Syringe, Info, AlertTriangle, Crosshair, ArrowRight, ShieldCheck, HelpCircle, BookOpen, Calculator } from "lucide-react";
import { SHORT_DISCLAIMER } from "@/data/constants";

export const metadata: Metadata = {
    title: "Beginner's Guide to Peptides: Dosage, Syringes, & Reconstitution",
    description: "Learn how to properly reconstitute, store, and safely research peptides. A comprehensive guide to BAC water, insulin syringes (U-100), and subcutaneous administration.",
    alternates: {
        canonical: 'https://peptidex.app/beginners-guide',
    },
    openGraph: {
        title: "Beginner's Guide to Peptides: Dosage & Reconstitution",
        description: "Learn how to properly reconstitute, store, and safely research peptides. Comprehensive guide to BAC water, syringes, and SubQ injection.",
        url: 'https://peptidex.app/beginners-guide',
        type: 'article',
        images: [{ url: 'https://peptidex.app/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Beginner's Guide to Peptides | PeptiDex",
        description: "Everything you need to know about reconstitution, syringes, and subcutaneous injection for peptide research.",
        images: ['https://peptidex.app/og-image.png'],
    },
};

export default function BeginnersGuidePage() {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "Can I mix different peptides in the same vial?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. You should never reconstitute two different lyophilized powders into the same vial. The chemical stability is unknown and they can degrade each other."
        }
      }, {
        "@type": "Question",
        "name": "Can I draw multiple peptides into the same syringe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, but it is highly discouraged for beginners. While you can physically draw them into the same syringe to avoid multiple pins, doing so introduces a severe risk of cross-contamination. If you accidentally push a drop of Peptide A from your syringe into the vial of Peptide B, you can degrade the entire vial. Play it safe and pin separately."
        }
      }, {
        "@type": "Question",
        "name": "How much does the injection hurt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Virtually zero. A 31G insulin needle is arguably as thin as a human hair. You are injecting into the fat, not the muscle. Most users do not even feel the needle piece the skin."
        }
      }, {
        "@type": "Question",
        "name": "Can I travel with peptides?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unmixed powder easily survives travel. Reconstituted fluid must be kept cold. You can use an insulated diabetic travel case with an ice pack, which is fully TSA approved for carry-on luggage."
        }
      }]
    };

    return (
        <main id="main-content">
      <header className="page-header">
        <div className="page-header-grid" />
        <div className="page-header-wrap">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">Beginner's Guide</span>
          </nav>
          <div className="section-label">§ Guide</div>
          <h1 className="page-title">
            Beginner's Guide<br /><em>to Peptides</em>.
          </h1>
          <p className="page-subtitle">Everything you need to know to start your peptide research journey, from mechanisms to safety.</p>
        </div>
      </header>

      <div className="about-content reveal space-y-16">

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            {/* Header */}
            <div className="text-center mb-10 md:mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 mb-6">
                    <ShieldAlert className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-semibold text-violet-300 tracking-wider uppercase">Educational Resource</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                    The Complete Beginner's Guide to Peptides
                </h1>
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    A step-by-step walkthrough of reconstitution, proper supplies, SubQ injection protocol, and safe storage practices for laboratory research.
                </p>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 mb-12 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm text-amber-500/80 leading-relaxed font-medium">
                    {SHORT_DISCLAIMER} The information presented below is strictly clinical theory and educational material. Never self-administer research chemicals meant for laboratory use.
                </p>
            </div>

            <div className="space-y-16">
                {/* Section 1: Introduction */}
                <section>
                    <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3 mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 text-sm">1</span>
                        Lyophilized Powder vs. Liquid
                    </h2>
                    <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed space-y-4">
                        <p>
                            When you order a peptide from a vendor, it almost universally arrives as a <strong>lyophilized (freeze-dried) powder</strong> in a small glass vial. It does not arrive as an injectable liquid.
                        </p>
                        <p>
                            Why? Lyophilization heavily preserves the extremely delicate amino acid chains, allowing them to survive shipping and extended temperature fluctuations without degrading.
                        </p>
                        <p>
                            In order to utilize the peptide for testing, you must first dissolve this powder into a liquid solution. This specific process is known as <strong>reconstitution</strong>.
                        </p>
                    </div>
                </section>

                {/* Section 2: Supply Checklist */}
                <section>
                    <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3 mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm">2</span>
                        The Essential Supply Checklist
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                                <Droplet className="w-5 h-5 text-blue-400" />
                                <h3 className="font-bold text-zinc-200">Bacteriostatic (BAC) Water</h3>
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                                You <strong>must</strong> use Bacteriostatic Water to reconstitute peptides if the vial will be used for more than one single dose. BAC water contains 0.9% benzyl alcohol.
                            </p>
                            <div className="bg-blue-950/30 border border-blue-500/20 rounded-lg p-3 mt-auto">
                                <p className="text-[11px] text-blue-300">
                                    <strong className="text-blue-200">Why not sterile water?</strong> Sterile water has no preservatives. BAC water's alcohol content prevents bacterial growth, allowing the vial to safely endure multiple draws over 28-30 days.
                                </p>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                                <Syringe className="w-5 h-5 text-fuchsia-400" />
                                <h3 className="font-bold text-zinc-200">Reconstitution Syringes</h3>
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                                You need a larger, thicker needle to transfer the BAC water into the powder vial. Pulling multiple MLs of liquid through a tiny insulin needle takes far too long and blunts the delicate tip.
                            </p>
                            <ul className="text-xs text-zinc-300 space-y-2 mb-4 list-disc list-inside mt-auto">
                                <li><strong>Volume:</strong> 3ml or 5ml standard syringe.</li>
                                <li><strong>Needle Gauge:</strong> 22G to 25G (thicker for rapid fluid transfer).</li>
                                <li><strong>Usage:</strong> Strictly for mixing the powder with water. Never used to inject into yourself.</li>
                            </ul>
                        </div>

                        <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                                <Syringe className="w-5 h-5 text-orange-400" />
                                <h3 className="font-bold text-zinc-200">Insulin Syringes (U-100)</h3>
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                                For subcutaneous delivery into the body, standard <strong>1ml (1cc) U-100 Insulin Syringes</strong> are the absolute standard. 
                            </p>
                            <ul className="text-xs text-zinc-300 space-y-2 mb-4 list-disc list-inside mt-auto">
                                <li><strong>Volume:</strong> 1ml (holds exactly 100 insulin units).</li>
                                <li><strong>Needle Gauge:</strong> 29G, 30G, or 31G (the higher the number, the thinner the needle). 31G is nearly painless.</li>
                                <li><strong>Needle Length:</strong> 5/16" (8mm) or 1/2" (12.7mm). 5/16" is ideal for SubQ to avoid hitting muscle.</li>
                            </ul>
                        </div>

                        <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                <h3 className="font-bold text-zinc-200">Alcohol Prep Pads (70% Iso)</h3>
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                                Sterility in a non-clinical environment is non-negotiable. You must use 70% Isopropyl Alcohol pads to rigorously sterilize the environment prior to any needle insertion to prevent infection.
                            </p>
                            <ul className="text-xs text-zinc-300 space-y-2 mb-4 list-disc list-inside mt-auto">
                                <li><strong>Stoppers:</strong> Vigorously wipe the BAC water and peptide vial rubber stoppers before <i>every single</i> puncture.</li>
                                <li><strong>Skin:</strong> Swab your injection site and let it dry completely before pinning.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section 3: Proper Reconstitution */}
                <section>
                    <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3 mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 text-sm">3</span>
                        Proper Reconstitution Protocol
                    </h2>
                    
                    <div className="bg-orange-950/20 border border-orange-500/20 rounded-xl p-4 mb-6">
                        <p className="text-sm text-orange-400/90 font-medium">
                            <ShieldAlert className="inline w-4 h-4 mr-1.5 -mt-0.5" />
                            <strong>Critical Warning:</strong> Peptide bonds are extremely fragile and physically easily broken. If you forcefully shoot BAC water directly onto the powder, or shake the vial violently, you will destroy the peptide and render it inert.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { step: "1", title: "Sanitize Everything", desc: "Pop the plastic caps off both the BAC water and the Peptide vial. Vigorously wipe the exposed rubber stoppers of *both* vials with a fresh alcohol pad. Let them air dry." },
                            { step: "2", title: "Determine Reconstitution Volume", desc: "Use a reconstitution calculator. Generally, adding 2ml or 3ml of BAC water is standard for a 5mg or 10mg vial. Calculate your concentration before starting." },
                            { step: "3", title: "Draw Air, Equalize Pressure", desc: "Using your larger Reconstitution Syringe, pull air into your syringe matching the amount of BAC water you plan to pull (e.g., if you need 2ml, pull 2ml of air). Inject this air into the BAC water vial. This equalizes the vacuum pressure and makes drawing the water much easier." },
                            { step: "4", title: "Draw the BAC Water", desc: "Turn the BAC water vial upside down and draw the exact required amount of BAC water into the thick-needled reconstitution syringe." },
                            { step: "5", title: "Inject Slowly Down The Glass (CRITICAL)", desc: "Insert the needle into the Peptide vial. Angle the needle so the tip is touching the glass wall of the vial. Slowly push the plunger, allowing the water to trickle gently down the glass and merge with the powder. Do not blast it directly onto the powder puck." },
                            { step: "6", title: "Roll, Never Shake", desc: "Once the water is added, gently roll the vial between your palms, or gently swirl it in circular motions on a table. The powder will dissolve completely clear within a few minutes. If it's cloudy after 20 minutes, the peptide may be degraded." }
                        ].map((s) => (
                            <div key={s.step} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 font-bold flex items-center justify-center border border-zinc-700">
                                    {s.step}
                                </div>
                                <div className="pt-1.5">
                                    <h4 className="font-bold text-zinc-200 mb-1">{s.title}</h4>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 4: Syringe Math & Reading the Ticks */}
                <section>
                    <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3 mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 text-sm">4</span>
                        Syringe Math & Reading the Ticks
                    </h2>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
                                <Calculator className="w-5 h-5 text-pink-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-200 mb-2">The Golden Rule: 100 Units = 1 ML</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                                    The number one cause of extreme overdosing is confusing <i>Units</i> with <i>ML</i>. A standard U-100 Insulin syringe holds exactly 1 ML of fluid, which is divided into 100 "Units" (the tiny tick marks).
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                                        <div className="text-pink-400 font-bold mb-1">10 Units</div>
                                        <div className="text-xs text-zinc-500">= 0.1 ML</div>
                                    </div>
                                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                                        <div className="text-pink-400 font-bold mb-1">20 Units</div>
                                        <div className="text-xs text-zinc-500">= 0.2 ML</div>
                                    </div>
                                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                                        <div className="text-pink-400 font-bold mb-1">50 Units</div>
                                        <div className="text-xs text-zinc-500">= 0.5 ML</div>
                                    </div>
                                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                                        <div className="text-pink-400 font-bold mb-1">100 Units</div>
                                        <div className="text-xs text-zinc-500">= 1.0 ML</div>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-red-950/20 border border-red-500/20 rounded-lg text-sm text-red-400">
                                    If your protocol calls for <strong>0.1ml</strong> of fluid, you are pulling the plunger to the <strong>10 mark</strong> on the syringe. Taking "1 ML" means taking the entire syringe!
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Subcutaneous Injection */}
                <section>
                    <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3 mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 text-sm">5</span>
                        Subcutaneous (SubQ) Pinning
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 text-sm leading-relaxed">
                            <p>
                                <strong>Subcutaneous</strong> refers to injecting into the fatty tissue layer just beneath the skin, and well above the muscle. The high vascularity of the fat allows for steady, even absorption of the peptide into the bloodstream.
                            </p>
                            <p>
                                It is the exact same method used by diabetics for insulin, and is generally painless when performed with a 31G needle.
                            </p>
                            <h4 className="text-zinc-200 font-bold mt-4">Ideal Injection Sites:</h4>
                            <ul>
                                <li><strong>Lower Abdomen:</strong> The most common site. Pinch the fat at least 2 inches away from the belly button (navel). Do not inject directly around the navel.</li>
                                <li><strong>Upper Thigh:</strong> The fatty outer area of the thigh.</li>
                                <li><strong>Love Handles / Glutes:</strong> Another excellent high-fat area.</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5">
                            <h4 className="text-zinc-200 font-bold mb-4 flex items-center gap-2">
                                <Crosshair className="w-4 h-4 text-violet-400" /> Note on Technique
                            </h4>
                            <ol className="text-sm text-zinc-400 space-y-3 list-decimal list-inside">
                                <li>Swab the chosen injection site with alcohol and let it dry.</li>
                                <li>Pinch an inch of fat between your thumb and index finger to separate the fat from the muscle.</li>
                                <li>Holding the syringe like a dart, insert the needle in one swift, smooth motion at a 45° to 90° angle.</li>
                                <li>Push the plunger down steadily to inject the fluid.</li>
                                <li>Remove the needle straight out to prevent bruising.</li>
                                <li>Never re-use a needle. Throw it in a designated sharps container immediately.</li>
                            </ol>
                        </div>
                    </div>
                </section>

                {/* Section 6: Storage & Shelf-Life */}
                <section>
                    <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3 mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm">6</span>
                        Storage & Shelf-Life
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 text-center">
                            <div className="w-10 h-10 mx-auto rounded-full bg-zinc-800 flex items-center justify-center mb-3">
                                <ThermometerSnowflake className="w-5 h-5 text-zinc-400" />
                            </div>
                            <h4 className="font-bold text-zinc-200 mb-2">Unmixed Powder</h4>
                            <p className="text-sm text-zinc-400">
                                Can be stored in the <strong>Freezer</strong> for 2-3 years, or the <strong>Fridge</strong> for up to a year. Keep away from direct sunlight entirely.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-zinc-900 border border-cyan-500/20 p-5 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
                            <div className="w-10 h-10 mx-auto rounded-full bg-cyan-500/10 flex items-center justify-center mb-3">
                                <Droplet className="w-5 h-5 text-cyan-400" />
                            </div>
                            <h4 className="font-bold text-cyan-300 mb-2">Reconstituted Liquid</h4>
                            <p className="text-sm text-zinc-400">
                                <strong>Must be refrigerated immediately.</strong> Once mixed with BAC water, the peptide degrades and loses its potency after 28-30 days.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 7: Rapid-Fire FAQs */}
                <section>
                    <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3 mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm">7</span>
                        Rapid-Fire FAQ
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                            <h3 className="font-bold text-zinc-200 mb-2 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" /> Can I mix different peptides in the same vial?
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                No. You should never reconstitute two different lyophilized powders into the same vial. The chemical stability is unknown and they can degrade each other.
                            </p>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                            <h3 className="font-bold text-zinc-200 mb-2 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" /> Can I draw multiple peptides into the same syringe?
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Yes, but it is <strong>highly discouraged for beginners.</strong><br/><br/>
                                While you can physically draw them into the same syringe to avoid multiple pins, doing so introduces a severe risk of cross-contamination. If you accidentally push a drop of Peptide A from your syringe into the vial of Peptide B, you can degrade the entire vial. Play it safe and pin separately.
                            </p>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                            <h3 className="font-bold text-zinc-200 mb-2 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" /> How much does the injection hurt?
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Virtually zero. A 31G insulin needle is arguably as thin as a human hair. You are injecting into the fat, not the muscle. Most users do not even feel the needle piece the skin.
                            </p>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                            <h3 className="font-bold text-zinc-200 mb-2 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" /> Can I travel with peptides?
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Unmixed powder easily survives travel. Reconstituted fluid must be kept cold. You can use an insulated diabetic travel case with an ice pack, which is fully TSA approved for carry-on luggage.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 8: Glossary of Terms */}
                <section>
                    <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3 mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-sm">8</span>
                        Glossary of Key Terms
                    </h2>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <h4 className="text-teal-400 font-bold text-sm mb-1">Lyophilized</h4>
                                <p className="text-xs text-zinc-400">The freeze-drying process used to convert water-based peptide chains into a stable dry powder puck for long-term survival.</p>
                            </div>
                            <div>
                                <h4 className="text-teal-400 font-bold text-sm mb-1">SubQ (Subcutaneous)</h4>
                                <p className="text-xs text-zinc-400">Injection into the fatty tissue layer just beneath the skin. The standard administration route for 99% of peptides.</p>
                            </div>
                            <div>
                                <h4 className="text-teal-400 font-bold text-sm mb-1">IM (Intramuscular)</h4>
                                <p className="text-xs text-zinc-400">Injection deep into the muscle. Unnecessary for almost all peptides, and generally painful.</p>
                            </div>
                            <div>
                                <h4 className="text-teal-400 font-bold text-sm mb-1">Half-Life</h4>
                                <p className="text-xs text-zinc-400">The amount of time it takes for half of the compound to break down and leave your system. Determines whether a peptide is taken daily or weekly.</p>
                            </div>
                            <div>
                                <h4 className="text-teal-400 font-bold text-sm mb-1">COA / HPLC</h4>
                                <p className="text-xs text-zinc-400">Certificate of Analysis / High-Performance Liquid Chromatography. The laboratory test that verifies the purity of the peptide (always look for &gt;99% purity).</p>
                            </div>
                            <div>
                                <h4 className="text-teal-400 font-bold text-sm mb-1">Reconstitution</h4>
                                <p className="text-xs text-zinc-400">The physical act of dissolving the dry lyophilized powder back into a liquid state using bacteriostatic water.</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* Final CTA */}
            <div className="mt-16 pt-8 border-t border-zinc-800 text-center">
                <p className="text-zinc-400 mb-4">Now that you understand the mechanics, dial in your dosages perfectly.</p>
                <Link href="/tools/cycle-planner" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors shadow-lg shadow-violet-500/20">
                    Go to the Cycle Planner <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
      </div>
      
    </main>
  );
}
