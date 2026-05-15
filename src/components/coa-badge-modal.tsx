"use client";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Activity, ShieldCheck, FileSearch, Mail, ExternalLink, FlaskConical, Microscope } from "lucide-react";
import { trackOutboundClick, trackCTAClick } from "@/lib/ga4-events";
import { InlineDisclaimer } from "@/components/ui/DisclaimerCard";

interface COAModalProps {
    vendorName: string;
    coaUrl?: string;
    lastTestedDate?: string;
    testingMethods?: string[];
    purity?: string;
    vendorEmail?: string;  // fallback mailto
}

/**
 * Interactive COA Badge + Modal.
 * - If coaUrl exists: badge opens a modal with embedded PDF viewer + HPLC details
 * - If no coaUrl: badge opens a "Request Data" modal with mailto CTA
 * - All badges have aria-labels for E-E-A-T accessibility
 */
export function COABadge({
    vendorName,
    coaUrl,
    lastTestedDate,
    testingMethods = ["HPLC", "Mass Spec"],
    purity = "99%+",
    vendorEmail,
}: COAModalProps) {
    const [open, setOpen] = useState(false);

    const hasCoa = Boolean(coaUrl || lastTestedDate);
    const dateDisplay = lastTestedDate || "On file";

    const handleOpen = useCallback(() => {
        setOpen(true);
        trackCTAClick(`COA Badge - ${vendorName}`, coaUrl || "request_data");
    }, [vendorName, coaUrl]);

    const handleClose = useCallback(() => setOpen(false), []);

    // Determine badge label text
    const badgeText = lastTestedDate
        ? `Lab Purity Verified (${lastTestedDate})`
        : hasCoa
            ? "Lab Purity Verified (View COA)"
            : "Testing Pending";

    const ariaLabel = hasCoa
        ? `${vendorName} lab purity verified. Click to view Certificate of Analysis report showing HPLC and mass spectrometry results.`
        : `${vendorName} lab testing pending. Click to request Certificate of Analysis data.`;

    return (
        <>
            {/* ═══ THE BADGE ═══ */}
            {hasCoa ? (
                <button
                    onClick={handleOpen}
                    aria-label={ariaLabel}
                    role="button"
                    className="inline-flex items-center gap-1 px-2.5 py-1 min-h-[44px] text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                >
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {badgeText}
                </button>
            ) : (
                <button
                    onClick={handleOpen}
                    aria-label={ariaLabel}
                    role="button"
                    className="inline-flex items-center gap-1 px-2.5 py-1 min-h-[44px] text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-zinc-800/50 text-zinc-400 rounded-md border border-zinc-700/50 hover:bg-zinc-700/50 transition-colors cursor-pointer"
                >
                    <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-50" />
                    Testing Pending
                </button>
            )}

            {/* ═══ THE MODAL (portal to body) ═══ */}
            {typeof window !== "undefined" && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            key="coa-modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                            onClick={handleClose}
                            aria-modal="true"
                            role="dialog"
                            aria-label={`Certificate of Analysis for ${vendorName}`}
                        >
                            <motion.div
                                key="coa-modal-content"
                                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-sm rounded-t-2xl">
                                    <div className="flex items-center gap-2">
                                        <Microscope className="w-5 h-5 text-emerald-400" />
                                        <h2 className="text-lg font-bold text-zinc-100">
                                            {vendorName} — COA Report
                                        </h2>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                                        aria-label="Close modal"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {hasCoa ? (
                                    /* ═══ COA AVAILABLE ═══ */
                                    <div className="p-5 space-y-5">
                                        <InlineDisclaimer type="coa" className="!mb-0" />
                                        {/* Verification Summary */}
                                        <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/20 p-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                                <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                                                    Verification Summary
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 text-xs">
                                                <div className="rounded-lg bg-zinc-800/50 p-3">
                                                    <p className="text-zinc-500 mb-0.5">Vendor</p>
                                                    <p className="text-zinc-200 font-semibold">{vendorName}</p>
                                                </div>
                                                <div className="rounded-lg bg-zinc-800/50 p-3">
                                                    <p className="text-zinc-500 mb-0.5">Purity</p>
                                                    <p className="text-emerald-400 font-bold text-sm">{purity}</p>
                                                </div>
                                                <div className="rounded-lg bg-zinc-800/50 p-3">
                                                    <p className="text-zinc-500 mb-0.5">Last Tested</p>
                                                    <p className="text-zinc-200 font-semibold">{dateDisplay}</p>
                                                </div>
                                                <div className="rounded-lg bg-zinc-800/50 p-3">
                                                    <p className="text-zinc-500 mb-0.5">Methods</p>
                                                    <div className="flex flex-wrap gap-1 mt-0.5">
                                                        {testingMethods.map(m => (
                                                            <span key={m} className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/15 text-emerald-400 rounded border border-emerald-500/20">
                                                                {m}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Embedded PDF / Document Viewer */}
                                        {coaUrl && (
                                            <div className="rounded-xl border border-zinc-700 overflow-hidden">
                                                <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-zinc-700">
                                                    <FileSearch className="w-4 h-4 text-blue-400" />
                                                    <span className="text-xs font-semibold text-zinc-300">HPLC / Mass Spec Report</span>
                                                    <a
                                                        href={coaUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={() => trackOutboundClick(vendorName, coaUrl, "coa_modal_external")}
                                                        className="ml-auto text-[10px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors"
                                                    >
                                                        Open Full Report <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                </div>
                                                {/* PDF embed — works for .pdf URLs; shows as image for .png/.jpg */}
                                                {coaUrl.endsWith(".pdf") ? (
                                                    <iframe
                                                        src={`${coaUrl}#toolbar=0&navpanes=0&view=FitH`}
                                                        className="w-full h-[400px] bg-white"
                                                        title={`Certificate of Analysis report for ${vendorName}`}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="relative bg-zinc-950 flex items-center justify-center p-4">
                                                        <img
                                                            src={coaUrl}
                                                            alt={`HPLC purity analysis report for ${vendorName}`}
                                                            className="max-w-full max-h-[400px] rounded-lg object-contain"
                                                            loading="lazy"
                                                            referrerPolicy="no-referrer"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* What to look for */}
                                        <div className="rounded-xl bg-blue-950/20 border border-blue-500/15 p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FlaskConical className="w-4 h-4 text-blue-400" />
                                                <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">How to Read a COA</h4>
                                            </div>
                                            <ul className="space-y-1.5 text-[11px] text-zinc-400 leading-relaxed">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-emerald-400 mt-0.5">✓</span>
                                                    <span><strong className="text-zinc-300">Purity %</strong> — Look for ≥98% via HPLC. Top vendors hit 99%+.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-emerald-400 mt-0.5">✓</span>
                                                    <span><strong className="text-zinc-300">Molecular Weight</strong> — Should match the peptide&apos;s known MW (confirms correct sequence).</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-emerald-400 mt-0.5">✓</span>
                                                    <span><strong className="text-zinc-300">Batch Number</strong> — Ensures the COA is batch-specific, not generic.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-emerald-400 mt-0.5">✓</span>
                                                    <span><strong className="text-zinc-300">Lab Name</strong> — Third-party labs (not in-house) provide unbiased results.</span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* View full report CTA */}
                                        <a
                                            href={coaUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => trackOutboundClick(vendorName, coaUrl!, "coa_modal_full_report")}
                                            className="flex items-center justify-center gap-2 w-full py-3 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-500/15"
                                        >
                                            <FileSearch className="w-4 h-4" /> View Full COA Report <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                ) : (
                                    /* ═══ NO COA – REQUEST DATA ═══ */
                                    <div className="p-5 space-y-5">
                                        <div className="rounded-xl bg-amber-950/20 border border-amber-500/15 p-5 text-center">
                                            <Activity className="w-10 h-10 text-amber-400/60 mx-auto mb-3" />
                                            <h3 className="text-lg font-bold text-zinc-200 mb-2">COA Not Yet Available</h3>
                                            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
                                                We have not yet received a Certificate of Analysis from <strong className="text-zinc-300">{vendorName}</strong>. You can request their latest HPLC and Mass Spec data directly.
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-zinc-800/40 border border-zinc-700/50 p-4">
                                            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Why COAs Matter</h4>
                                            <p className="text-[11px] text-zinc-400 leading-relaxed">
                                                A Certificate of Analysis (COA) is the only objective proof that a peptide meets purity, identity, and sterility specifications. Without one, there is no way to verify what is actually in a vial. Always request batch-specific COAs before purchasing research-grade compounds.
                                            </p>
                                        </div>

                                        {/* Request Data CTA */}
                                        <a
                                            href={vendorEmail
                                                ? `mailto:${vendorEmail}?subject=COA Request for ${vendorName} Peptides&body=Hello,%0D%0A%0D%0AI am requesting your latest Certificate of Analysis (COA) reports, specifically HPLC purity and Mass Spectrometry data for your peptide catalog.%0D%0A%0D%0AThank you.`
                                                : `mailto:info@${vendorName.toLowerCase().replace(/\s+/g, '')}.com?subject=COA Request&body=Hello,%0D%0A%0D%0AI am requesting your latest Certificate of Analysis (COA) reports.%0D%0A%0D%0AThank you.`
                                            }
                                            onClick={() => trackCTAClick(`Request COA - ${vendorName}`, "mailto")}
                                            className="flex items-center justify-center gap-2 w-full py-3 min-h-[44px] rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-all shadow-lg shadow-amber-500/15"
                                        >
                                            <Mail className="w-4 h-4" /> Request COA Data from {vendorName}
                                        </a>

                                        <p className="text-[10px] text-zinc-600 text-center italic">
                                            PeptiDex independently verifies COA documentation. Vendors with verified reports receive the green &quot;Lab Purity Verified&quot; badge.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
