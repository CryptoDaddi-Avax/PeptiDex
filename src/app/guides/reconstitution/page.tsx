"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    Droplets, Syringe, FlaskConical, AlertTriangle,
    CheckCircle2, ChevronRight, Calculator, Info,
    Thermometer, ShieldCheck, ArrowRight
} from "lucide-react";
import Link from "next/link";

/* ──────── Steps Data ──────── */

const steps = [
    {
        number: 1,
        title: "Gather Your Supplies",
        icon: <FlaskConical className="w-5 h-5" />,
        color: "violet",
        items: [
            "Lyophilized peptide vial (check mg on label)",
            "Bacteriostatic water (BAC water) — NOT sterile water",
            "Alcohol swabs (70% isopropyl)",
            "Insulin syringes (29-31 gauge, 0.5mL or 1mL)",
            "A separate mixing syringe (1-3mL) for reconstitution",
        ],
        tip: "Always use bacteriostatic water (contains 0.9% benzyl alcohol) for multi-use vials. Sterile water has no preservative and allows bacterial growth once opened.",
    },
    {
        number: 2,
        title: "Clean Everything",
        icon: <ShieldCheck className="w-5 h-5" />,
        color: "emerald",
        items: [
            "Wash hands thoroughly with soap and water",
            "Wipe the rubber stopper on the peptide vial with an alcohol swab",
            "Wipe the rubber stopper on the bacteriostatic water vial",
            "Let both dry for 10-15 seconds — don't blow on them",
        ],
        tip: "Contamination is the #1 risk with injectable peptides. Treat this like a sterile procedure every time.",
    },
    {
        number: 3,
        title: "Draw Bacteriostatic Water",
        icon: <Droplets className="w-5 h-5" />,
        color: "cyan",
        items: [
            "Decide your reconstitution volume (typically 1-2 mL)",
            "Pull air into the mixing syringe equal to the BAC water volume",
            "Insert needle into the BAC water vial and inject the air",
            "Invert the vial and slowly draw out the desired amount of BAC water",
            "Remove air bubbles by tapping the syringe gently",
        ],
        tip: "Use our Dosage Calculator to determine the ideal reconstitution volume for your target dose.",
    },
    {
        number: 4,
        title: "Add Water to Peptide Vial",
        icon: <Syringe className="w-5 h-5" />,
        color: "amber",
        items: [
            "Insert the needle into the peptide vial through the rubber stopper",
            "Aim the needle at the SIDE of the glass wall — NOT directly onto the powder",
            "Inject the BAC water SLOWLY — let it trickle down the glass wall",
            "Do NOT shake, swirl vigorously, or drop the vial",
            "Let gravity do the work — the powder will dissolve on its own",
        ],
        tip: "Peptides are fragile proteins. Direct impact from a water stream or shaking can denature (destroy) the peptide chains. Patience here = full potency.",
        warning: "NEVER shake a peptide vial. This denatures the peptide and can reduce potency by 30-80%.",
    },
    {
        number: 5,
        title: "Wait for Full Dissolution",
        icon: <Thermometer className="w-5 h-5" />,
        color: "blue",
        items: [
            "Place the vial upright on a flat surface",
            "Wait 5-10 minutes for the lyophilized powder to fully dissolve",
            "The solution should become completely clear with no visible particles",
            "If needed, gently roll the vial between your palms — do NOT shake",
        ],
        tip: "Some peptides dissolve faster than others. BPC-157 typically dissolves in 2-3 minutes. IGF-1 LR3 may take 10+ minutes. Don't rush it.",
    },
    {
        number: 6,
        title: "Store Properly",
        icon: <Thermometer className="w-5 h-5" />,
        color: "indigo",
        items: [
            "Store reconstituted peptide in the refrigerator (2-8°C / 36-46°F)",
            "NEVER freeze reconstituted peptides",
            "Use within 28-30 days of reconstitution",
            "Keep away from direct light — wrap in foil if your fridge has a light",
            "Unreconstituted peptides can be stored frozen for months",
        ],
        tip: "Label each vial with: peptide name, reconstitution date, concentration, and expiry (28 days from recon date).",
    },
];

/* ──────── Dose Math Helper ──────── */

function DoseCalculatorQuick() {
    const [vialMg, setVialMg] = useState(5);
    const [waterMl, setWaterMl] = useState(2);
    const [targetMcg, setTargetMcg] = useState(250);

    const concentrationMcg = (vialMg * 1000) / waterMl; // mcg per mL
    const doseVolumeMl = targetMcg / concentrationMcg;
    const syringeUnits = Math.round(doseVolumeMl * 100); // 100 units = 1 mL

    return (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2 mb-3">
                <Calculator className="w-4 h-4 text-emerald-400" /> Quick Dose Calculator
            </h3>
            <div className="grid grid-cols-3 gap-2 mb-3">
                <div>
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-1">Vial Size (mg)</label>
                    <input
                        type="number" value={vialMg} onChange={(e) => setVialMg(Number(e.target.value))}
                        className="w-full px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 focus:border-emerald-500/50 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-1">Water (mL)</label>
                    <input
                        type="number" step="0.5" value={waterMl} onChange={(e) => setWaterMl(Number(e.target.value))}
                        className="w-full px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 focus:border-emerald-500/50 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-1">Dose (mcg)</label>
                    <input
                        type="number" value={targetMcg} onChange={(e) => setTargetMcg(Number(e.target.value))}
                        className="w-full px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 focus:border-emerald-500/50 focus:outline-none"
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
                <div className="px-2 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <p className="text-lg font-bold text-emerald-400">{concentrationMcg.toLocaleString()}</p>
                    <p className="text-[9px] text-zinc-500">mcg/mL</p>
                </div>
                <div className="px-2 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <p className="text-lg font-bold text-cyan-400">{doseVolumeMl.toFixed(3)}</p>
                    <p className="text-[9px] text-zinc-500">mL per dose</p>
                </div>
                <div className="px-2 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <p className="text-lg font-bold text-violet-400">{syringeUnits}</p>
                    <p className="text-[9px] text-zinc-500">syringe units</p>
                </div>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2 text-center">
                Draw to the <strong className="text-zinc-300">{syringeUnits}-unit mark</strong> on a U-100 insulin syringe
            </p>
        </div>
    );
}

/* ──────── Main Page ──────── */

export default function ReconstitutionGuidePage() {
    const colorMap: Record<string, string> = {
        violet: "border-violet-500/30 bg-violet-500/5",
        emerald: "border-emerald-500/30 bg-emerald-500/5",
        cyan: "border-cyan-500/30 bg-cyan-500/5",
        amber: "border-amber-500/30 bg-amber-500/5",
        blue: "border-blue-500/30 bg-blue-500/5",
        indigo: "border-indigo-500/30 bg-indigo-500/5",
    };
    const iconColorMap: Record<string, string> = {
        violet: "text-violet-400 bg-violet-500/15",
        emerald: "text-emerald-400 bg-emerald-500/15",
        cyan: "text-cyan-400 bg-cyan-500/15",
        amber: "text-amber-400 bg-amber-500/15",
        blue: "text-blue-400 bg-blue-500/15",
        indigo: "text-indigo-400 bg-indigo-500/15",
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-zinc-100 mb-2">How to Reconstitute Peptides</h1>
                <p className="text-sm text-zinc-400">Step-by-step guide for safe and proper peptide preparation</p>
            </div>

            {/* Warning Banner */}
            <div className="mb-6 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                    <strong className="text-amber-300">For research purposes only.</strong> This guide is educational.
                    Always consult a healthcare professional before using any peptide.
                    Proper sterile technique is critical to prevent infection.
                </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 mb-8">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`p-4 rounded-2xl border ${colorMap[step.color]}`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColorMap[step.color]}`}>
                                {step.icon}
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Step {step.number}</p>
                                <h2 className="text-sm font-bold text-zinc-100">{step.title}</h2>
                            </div>
                        </div>

                        <ul className="space-y-1.5 mb-3">
                            {step.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/60 flex-shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {step.warning && (
                            <div className="p-2 rounded-lg bg-red-500/5 border border-red-500/20 flex items-start gap-2 mb-2">
                                <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                                <p className="text-[10px] text-red-300 font-medium">{step.warning}</p>
                            </div>
                        )}

                        <div className="p-2 rounded-lg bg-zinc-900/40 flex items-start gap-2">
                            <Info className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0 mt-0.5" />
                            <p className="text-[10px] text-zinc-500 leading-relaxed">{step.tip}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Calculator */}
            <DoseCalculatorQuick />

            {/* CTA */}
            <div className="mt-6 text-center">
                <Link
                    href="/tools/calculator"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-sm font-semibold hover:brightness-110 transition-all"
                >
                    Full Dosage Calculator <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
