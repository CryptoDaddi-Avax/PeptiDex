"use client";

import { useState, useMemo, useEffect, useCallback, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { peptides } from "@/data/peptides";
import { stacks } from "@/data/stacks";
import { EvidenceBadge } from "@/components/peptide-card";
import { SHORT_DISCLAIMER, EVIDENCE_SCALE } from "@/data/constants";
import {
    GitCompare, ChevronDown, ShieldAlert, Clock, Syringe, Activity,
    Share2, Link2, Check, AlertTriangle, Layers, FlaskConical,
    ArrowRight, Sparkles, X, Search, Beaker, ChevronRight, Zap,
    ShoppingBag, ShieldCheck, Crown, ExternalLink
} from "lucide-react";
import { aminoClubProductMapping } from "@/data/affiliates";
import { getCategoryIcon } from "@/data/category-icons";
import { ShareModal } from "@/components/share-card/share-modal";
import type { CompareCardData } from "@/components/share-card/card-templates";
import type { Peptide } from "@/data/types";
import RedesignLayout from '@/components/redesign/RedesignLayout';
import './compare-redesign.css';

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */
function generateComparisonSummary(compared: Peptide[]): string {
    if (compared.length < 2) return "";
    const names = compared.map((p) => p.name);
    const cats = compared.map((p) => p.category);
    const sameCat = cats.every((c) => c === cats[0]);
    const allBenefits = compared.map((p) => p.primary_benefits.toLowerCase()).join(", ");
    const evidenceLevels = compared.map(
        (p) => EVIDENCE_SCALE[p.key_studies[0]?.evidence_level]?.label || "Preclinical"
    );

    const synergyPairs: string[] = [];
    compared.forEach((p) => {
        compared.forEach((q) => {
            if (
                p.slug !== q.slug &&
                p.interactions?.synergies.includes(q.name) &&
                !synergyPairs.includes(`${q.name} + ${p.name}`)
            ) {
                synergyPairs.push(`${p.name} + ${q.name}`);
            }
        });
    });

    let summary = "";
    if (compared.length === 2) {
        const [a, b] = compared;
        const halfA = a.half_life_hours ? (a.half_life_hours >= 24 ? `${Math.round(a.half_life_hours / 24)} days` : `${a.half_life_hours} hours`) : "unknown";
        const halfB = b.half_life_hours ? (b.half_life_hours >= 24 ? `${Math.round(b.half_life_hours / 24)} days` : `${b.half_life_hours} hours`) : "unknown";

        summary = `${a.name} and ${b.name} are${sameCat ? ` both ${cats[0]} peptides` : ` from different classes (${a.category} vs ${b.category})`} commonly compared in peptide research. `;
        summary += `${a.name} is primarily used for ${a.primary_benefits.toLowerCase()}, while ${b.name} focuses on ${b.primary_benefits.toLowerCase()}. `;
        summary += `Their half-lives differ significantly \u2014 ${a.name} at ${halfA} vs ${b.name} at ${halfB} \u2014 which affects dosing frequency and protocol design. `;
        summary += `Evidence levels are ${evidenceLevels[0]} for ${a.name} and ${evidenceLevels[1]} for ${b.name}. `;
    } else {
        summary = `This comparison examines ${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}, covering ${sameCat ? `the ${cats[0]} category` : `multiple categories (${[...new Set(cats)].join(", ")})`}. `;
        summary += `Together they address: ${allBenefits}. `;
    }

    if (synergyPairs.length > 0) {
        summary += `Notably, ${synergyPairs.join(" and ")} ${synergyPairs.length === 1 ? "is a" : "are"} recognized synergistic ${synergyPairs.length === 1 ? "combination" : "combinations"} frequently used together in research protocols.`;
    }

    return summary;
}

function getStacksForPeptide(peptideName: string) {
    return stacks.filter((s) => s.peptides.some((sp) => sp.name === peptideName));
}

function formatHalfLife(hours?: number): string {
    if (!hours) return "N/A";
    if (hours >= 168) return `${Math.round(hours / 168)}w`;
    if (hours >= 24) return `${Math.round(hours / 24)}d`;
    if (hours >= 1) return `${hours}h`;
    return `${Math.round(hours * 60)}min`;
}

/* ═══════════════════════════════════════════════════════════
   DROPDOWN
   ═══════════════════════════════════════════════════════════ */
function PeptideDropdown({ value, onChange, onRemove, exclude, index }: { value: string; onChange: (slug: string) => void; onRemove: () => void; exclude: string[]; index: number; }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapRef = useRef<HTMLDivElement>(null);

    const filtered = useMemo(() => {
        const available = peptides.filter((p) => !exclude.includes(p.slug) || p.slug === value);
        if (!search) return available;
        const q = search.toLowerCase();
        return available.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.aliases?.some((a) => a.toLowerCase().includes(q)));
    }, [search, exclude, value]);

    const selected = peptides.find((p) => p.slug === value);

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', clickOutside);
        return () => document.removeEventListener('mousedown', clickOutside);
    }, []);

    return (
        <div className="cmp-dropdown" ref={wrapRef}>
            <button
                onClick={() => { setOpen(!open); setSearch(""); }}
                className={`cmp-dropdown-btn ${value ? "active" : ""}`}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selected && <span style={{ fontSize: '18px' }}>{getCategoryIcon(selected.category)}</span>}
                    <span style={{flex: 1}}>{selected?.name || `Select Peptide ${index + 1}`}</span>
                </div>
                <ChevronDown style={{ width: '16px', height: '16px', transform: open ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>
            <button onClick={onRemove} className="cmp-dropdown-remove"><X style={{width: 12, height:12}} /></button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}
                        className="cmp-dropdown-menu"
                    >
                        <div className="cmp-dropdown-search">
                            <div className="cmp-dropdown-search-inner">
                                <Search style={{width: 14, height: 14, color: 'var(--ink-mute)'}} />
                                <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} autoFocus />
                            </div>
                        </div>
                        <div className="cmp-dropdown-list">
                            {filtered.length === 0 && <div style={{padding: '16px', textAlign:'center', color:'var(--ink-dim)', fontSize:'12px'}}>No matches</div>}
                            {filtered.map((p) => (
                                <button
                                    key={p.slug}
                                    onClick={() => { onChange(p.slug); setOpen(false); setSearch(""); }}
                                    className={`cmp-dropdown-item ${p.slug === value ? "selected" : ""}`}
                                >
                                    <span style={{fontSize: 16}}>{getCategoryIcon(p.category)}</span>
                                    <div style={{flex:1}}>
                                        <div style={{fontWeight: 600, fontSize: '13px'}}>{p.name}</div>
                                        <div style={{fontSize: '10px', color: 'var(--ink-dim)'}}>{p.category}</div>
                                    </div>
                                    {p.slug === value && <Check style={{width: 14, height: 14, color: '#a78bfa'}} />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   ROW COMPONENT
   ═══════════════════════════════════════════════════════════ */
function ComparisonRow({ label, icon, children, count, highlight }: { label: string; icon: React.ReactNode; children: React.ReactNode; count: number; highlight?: boolean; }) {
    return (
        <div className={`cmp-row ${highlight ? "highlight" : ""}`} style={{ "--cols": count } as React.CSSProperties}>
            <div className="cmp-row-label-wrap">
                {icon}
                <span className="cmp-row-label">{label}</span>
            </div>
            {children}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN INNER CLIENT
   ═══════════════════════════════════════════════════════════ */
function CompareClientInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selected, setSelected] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const p = searchParams.get("p");
        if (p) {
            const slugs = p.split(",").filter((s) => peptides.some((pep) => pep.slug === s)).slice(0, 3);
            if (slugs.length >= 2) setSelected(slugs);
        }
    }, [searchParams]);

    const syncUrl = useCallback((slugs: string[]) => {
        const validSlugs = slugs.filter(Boolean);
        if (validSlugs.length >= 2) {
            router.replace(`/tools/compare?p=${validSlugs.join(",")}`, { scroll: false });
        } else {
            router.replace("/tools/compare", { scroll: false });
        }
    }, [router]);

    const compared = useMemo(() => selected.map((slug) => peptides.find((p) => p.slug === slug)).filter(Boolean) as Peptide[], [selected]);
    const summary = useMemo(() => generateComparisonSummary(compared), [compared]);

    const compareShareData: CompareCardData | null = useMemo(() => {
        if (compared.length < 2) return null;
        return {
            type: "compare",
            peptides: compared.map(p => ({
                name: p.name,
                category: p.category,
                evidence: EVIDENCE_SCALE[p.key_studies[0]?.evidence_level]?.label || "Preclinical",
                benefits: p.primary_benefits,
            })),
            synergies: compared.flatMap(p => compared.filter(q => q.slug !== p.slug && p.interactions?.synergies.includes(q.name)).map(q => `${p.name} + ${q.name}`)).filter((v, i, a) => a.indexOf(v) === i),
        };
    }, [compared]);

    const addSlot = () => { if (selected.length < 3) setSelected([...selected, ""]); };
    const removeSlot = (i: number) => { const next = selected.filter((_, idx) => idx !== i); setSelected(next); syncUrl(next); };
    const setSlot = (i: number, slug: string) => { const next = [...selected]; next[i] = slug; setSelected(next); syncUrl(next); };

    const handleShare = async () => {
        const validSlugs = selected.filter(Boolean);
        if (validSlugs.length < 2) return;
        const url = `https://peptidex.app/tools/compare?p=${validSlugs.join(",")}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true); setTimeout(() => setCopied(false), 2500);
        } catch {
            const input = document.createElement("input"); input.value = url; document.body.appendChild(input);
            input.select(); document.execCommand("copy"); document.body.removeChild(input);
            setCopied(true); setTimeout(() => setCopied(false), 2500);
        }
    };

    return (
        <RedesignLayout>
            <div className="cmp-wrap">
                <div className="cmp-disclaimer">
                    <ShieldAlert />
                    <p>{SHORT_DISCLAIMER}</p>
                </div>

                <div className="cmp-header">
                    <div>
                        <h1 className="cmp-title">
                            <div className="cmp-icon-wrap"><GitCompare /></div>
                            Peptide Comparison Tool
                        </h1>
                        <p className="cmp-subtitle">Select 2-3 peptides \u00b7 Compare research data side-by-side</p>
                    </div>
                    <div className="cmp-header-actions">
                        {compared.length >= 2 && compareShareData && (
                            <ShareModal
                                data={compareShareData}
                                shareUrl={`https://peptidex.app/tools/compare?p=${compared.map(p => p.slug).join(",")}`}
                                shareText={`Comparing ${compared.map(p => p.name).join(" vs ")} on PeptiDex \uD83E\uDDEC`}
                                buttonLabel="Share Results"
                            />
                        )}
                        {compared.length >= 2 && (
                            <button onClick={handleShare} className={`cmp-btn ${copied ? "success" : ""}`}>
                                {copied ? <><Check style={{width: 14}}/> Copied!</> : <><Share2 style={{width:14}}/> Copy Link</>}
                            </button>
                        )}
                    </div>
                </div>

                <div className="cmp-selectors-wrap">
                    {selected.map((slug, i) => (
                        <PeptideDropdown key={i} value={slug} onChange={(s) => setSlot(i, s)} onRemove={() => removeSlot(i)} exclude={selected} index={i} />
                    ))}
                    {selected.length < 3 && (
                        <button onClick={addSlot} className="cmp-dropdown-add"><Beaker style={{width:16}} /> Add Peptide</button>
                    )}
                </div>

                {compared.length < 2 && (
                    <div className="cmp-presets">
                        <div className="cmp-presets-title">Popular Comparisons</div>
                        <div className="cmp-presets-list">
                            {[
                                ["bpc-157", "tb-500"], ["semaglutide", "tirzepatide"],
                                ["cjc-1295", "ipamorelin"], ["ghk-cu", "bpc-157"],
                                ["bpc-157", "tb-500", "ghk-cu"],
                            ].map((combo) => {
                                const names = combo.map((s) => peptides.find((p) => p.slug === s)?.name).filter(Boolean);
                                return (
                                    <button key={combo.join(",")} onClick={() => { setSelected(combo); syncUrl(combo); }} className="cmp-preset-btn">
                                        <Zap style={{width:12, color: '#a78bfa'}} /> {names.join(" vs ")}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {compared.length < 2 && (
                    <div className="cmp-empty">
                        <div className="cmp-empty-icon"><GitCompare /></div>
                        <h2>Select at least 2 peptides</h2>
                        <p>Use the dropdowns or click a popular comparison to start building your side-by-side analysis.</p>
                    </div>
                )}

                {compared.length >= 2 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="cmp-grid">
                        <div className="cmp-summary">
                            <div className="cmp-summary-title"><Sparkles style={{width: 14}}/> Comparison Summary</div>
                            <p>{summary}</p>
                        </div>

                        <div className="cmp-grid-header" style={{ "--cols": compared.length } as React.CSSProperties}>
                            <div />
                            {compared.map((p) => (
                                <Link href={`/library/${p.slug}`} key={p.slug} className="cmp-card-header">
                                    <span className="icon">{getCategoryIcon(p.category)}</span>
                                    <h3>{p.name}</h3>
                                    <span className="cat">{p.category}</span>
                                </Link>
                            ))}
                        </div>

                        <ComparisonRow label="Primary Benefits" icon={<Activity style={{width:14, color: '#34d399'}} />} count={compared.length}>
                            {compared.map((p) => <div className="cmp-row-content" key={p.slug}>{p.primary_benefits}</div>)}
                        </ComparisonRow>

                        <ComparisonRow label="Evidence Level" icon={<FlaskConical style={{width:14, color: '#a78bfa'}} />} count={compared.length} highlight>
                            {compared.map((p) => (
                                <div className="cmp-row-content" key={p.slug}>
                                    <EvidenceBadge level={p.key_studies[0]?.evidence_level || "preclinical"} />
                                    <div className="cmp-val-sub" style={{marginTop: 4}}>{p.key_studies.length} studies</div>
                                </div>
                            ))}
                        </ComparisonRow>

                        <ComparisonRow label="Half-Life" icon={<Clock style={{width:14, color: '#fbbf24'}} />} count={compared.length}>
                            {compared.map((p) => (
                                <div className="cmp-row-content" key={p.slug}>
                                    <span className="cmp-val-main">{formatHalfLife(p.half_life_hours)}</span>
                                    <span className="cmp-val-sub">{p.half_life_hours ? `${p.half_life_hours} hours` : "Not char."}</span>
                                </div>
                            ))}
                        </ComparisonRow>

                        <ComparisonRow label="Route" icon={<Syringe style={{width:14, color: '#2dd4bf'}} />} count={compared.length}>
                            {compared.map((p) => <div className="cmp-row-content" key={p.slug}><span className="cmp-badge">{p.dosing?.route || "N/A"}</span></div>)}
                        </ComparisonRow>

                        <ComparisonRow label="Dose Range" icon={<Syringe style={{width:14, color: '#2dd4bf'}} />} count={compared.length}>
                            {compared.map((p) => <div className="cmp-row-content" key={p.slug}>{p.dosing ? `${p.dosing.typical_dose_mcg[0]}-${p.dosing.typical_dose_mcg[1]} mcg` : "N/A"}</div>)}
                        </ComparisonRow>

                        <ComparisonRow label="Frequency" icon={<Clock style={{width:14, color: '#fbbf24'}} />} count={compared.length}>
                            {compared.map((p) => <div className="cmp-row-content" key={p.slug}>{p.dosing?.frequency || "N/A"}</div>)}
                        </ComparisonRow>

                        <ComparisonRow label="Legal Status" icon={<ShieldAlert style={{width:14, color: '#34d399'}} />} count={compared.length} highlight>
                            {compared.map((p) => (
                                <div className="cmp-row-content" key={p.slug}>
                                    {p.is_fda_approved ? <span className="cmp-badge" style={{color: '#34d399', background: 'rgba(52, 211, 153, 0.1)'}}><Check style={{width:10}}/> FDA Auth</span> : <span className="cmp-badge" style={{color: '#f87171', background: 'rgba(248, 113, 113, 0.1)'}}><X style={{width:10}}/> Research</span>}
                                </div>
                            ))}
                        </ComparisonRow>

                        <ComparisonRow label="Side Effects" icon={<AlertTriangle style={{width:14, color: '#f87171'}} />} count={compared.length}>
                            {compared.map((p) => (
                                <div className="cmp-row-content" key={p.slug}>
                                    {p.side_effects?.length ? p.side_effects.map(se => (
                                        <div key={se.name} style={{marginBottom: 4}}>• {se.name} <span className="cmp-val-sub">({se.incidence})</span></div>
                                    )) : <span className="cmp-val-sub">Minimal</span>}
                                </div>
                            ))}
                        </ComparisonRow>

                        <ComparisonRow label="Synergies" icon={<Zap style={{width:14, color: '#facc15'}} />} count={compared.length}>
                            {compared.map((p) => (
                                <div className="cmp-row-content" key={p.slug} style={{display:'flex', flexWrap:'wrap', gap: 4}}>
                                    {p.interactions?.synergies?.length ? p.interactions.synergies.map(s => {
                                        const inCmp = compared.some(c => c.name === s);
                                        return <span key={s} className="cmp-badge" style={inCmp ? {backgroundColor: 'rgba(52, 211, 153, 0.15)', color: '#34d399'} : {}}>{s} {inCmp && "✓"}</span>;
                                    }) : <span className="cmp-val-sub">None documented</span>}
                                </div>
                            ))}
                        </ComparisonRow>

                        <ComparisonRow label="Safety Notes" icon={<ShieldAlert style={{width:14, color: '#f87171'}} />} count={compared.length}>
                            {compared.map((p) => <div className="cmp-row-content" key={p.slug} style={{color: 'var(--ink-dim)'}}>{p.safety_notes}</div>)}
                        </ComparisonRow>

                        <div className="cmp-cta-block">
                            <div className="cmp-cta-header">
                                <ShoppingBag style={{width: 24, height: 24, color: '#34d399'}} />
                                <h2 className="cmp-cta-title">Source These Peptides</h2>
                            </div>
                            <div className="cmp-cta-grid" style={{ "--cols": compared.length } as React.CSSProperties}>
                                {compared.map((p, i) => {
                                    const baseSlug = aminoClubProductMapping[p.slug] || "https://aminoclub.com";
                                    const ctaParams = baseSlug.includes("?") ? "&utm_source=affiliate_marketing&code=PEPTIDEX" : "?utm_source=affiliate_marketing&code=PEPTIDEX";
                                    return (
                                        <div key={p.slug} className={`cmp-cta-card ${i === 0 ? "winner" : ""}`}>
                                            <h4>{p.name}</h4>
                                            <p>{p.primary_benefits}</p>
                                            <a href={`${baseSlug}${ctaParams}`} target="_blank" rel="noopener noreferrer" className="cmp-cta-btn">Buy {p.name} <ExternalLink style={{width: 14}}/></a>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="cmp-cta-footer">
                                <span className="strong"><ShieldCheck style={{width:14}}/> Premium Sourcing from Amino Club — Editors Choice</span>
                                <span className="legal">PeptiDex may earn a commission from purchases made through affiliate links.</span>
                            </div>
                        </div>

                        <div className="cmp-share-bar">
                            <h3>Share This Comparison</h3>
                            <p>Copy a direct link to this exact side-by-side view.</p>
                            <div className="cmp-share-input-wrap">
                                <div className="cmp-share-input">peptidex.app/tools/compare?p={selected.filter(Boolean).join(",")}</div>
                                <button onClick={handleShare} className="cmp-share-copy">{copied ? "Copied!" : "Copy Link"}</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </RedesignLayout>
    );
}

export default function CompareClient() {
    return (
        <Suspense fallback={<RedesignLayout><div className="cmp-empty">Loading...</div></RedesignLayout>}>
            <CompareClientInner />
        </Suspense>
    );
}
