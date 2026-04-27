"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { goals } from "@/data/goals";
import { stacks } from "@/data/stacks";
import { peptides } from "@/data/peptides";
import { SHORT_DISCLAIMER } from "@/data/constants";
import {
    getDefaultConfig,
    calculateCycle,
    generateShoppingList,
    CyclePeptideConfig,
    CyclePeptideResult,
    ShoppingListSummary,
} from "@/lib/cycle-engine";
import { generateCycleIcs } from "@/lib/ics-generator";
import {
    ShieldAlert, ChevronRight, ChevronDown, ChevronUp,
    ShoppingCart, Package, Syringe, Clock, Droplets, DollarSign,
    ExternalLink, ArrowLeft, ArrowRight, ToggleRight, ToggleLeft, Calendar,
} from "lucide-react";
import { Goal, Stack } from "@/data/types";
import { ShareModal } from "@/components/share-card/share-modal";
import type { CycleCardData } from "@/components/share-card/card-templates";
import RedesignLayout from '@/components/redesign/RedesignLayout';
import './cycle-planner-redesign.css';

const STEP_LABELS = ["Choose Goal", "Review Stack", "Configure", "Shopping List"];

export default function CyclePlannerClient() {
    const [step, setStep] = useState(0);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [selectedStack, setSelectedStack] = useState<Stack | null>(null);
    const [enabledPeptides, setEnabledPeptides] = useState<Set<string>>(new Set());
    const [configs, setConfigs] = useState<Map<string, CyclePeptideConfig>>(new Map());
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [includeSupplies, setIncludeSupplies] = useState(true);
    const [globalCycleLength, setGlobalCycleLength] = useState<number>(8);

    const handleGoalSelect = useCallback((goal: Goal) => {
        setSelectedGoal(goal);
        const stackName = goal.stackNames[0];
        const stack = stacks.find(s => s.stack_name === stackName);
        if (stack) {
            setSelectedStack(stack);
            const names = new Set(stack.peptides.map(p => p.name));
            setEnabledPeptides(names);

            const newConfigs = new Map<string, CyclePeptideConfig>();
            stack.peptides.forEach(sp => {
                newConfigs.set(sp.name, { ...getDefaultConfig(sp.name), cycleWeeks: 8 });
            });
            setConfigs(newConfigs);
        }
        setStep(1);
    }, []);

    const togglePeptide = useCallback((name: string) => {
        setEnabledPeptides(prev => {
            const next = new Set(prev);
            if (next.has(name)) next.delete(name);
            else next.add(name);
            return next;
        });
    }, []);

    const updateConfig = useCallback((name: string, field: keyof CyclePeptideConfig, value: number) => {
        setConfigs(prev => {
            const next = new Map(prev);
            const existing = next.get(name);
            if (existing) {
                next.set(name, { ...existing, [field]: value });
            }
            return next;
        });
    }, []);

    const results: CyclePeptideResult[] = useMemo(() => {
        return Array.from(enabledPeptides)
            .map(name => {
                const config = configs.get(name);
                if (!config) return null;
                return calculateCycle(config);
            })
            .filter((r): r is CyclePeptideResult => r !== null);
    }, [enabledPeptides, configs]);

    const updateGlobalCycleLength = useCallback((weeks: number) => {
        setGlobalCycleLength(weeks);
        setConfigs(prev => {
            const next = new Map(prev);
            for (const [name, config] of next.entries()) {
                next.set(name, { ...config, cycleWeeks: weeks });
            }
            return next;
        });
    }, []);

    const shoppingList: ShoppingListSummary = useMemo(() => generateShoppingList(results, includeSupplies), [results, includeSupplies]);

    const handleDownloadIcs = useCallback(() => {
        if (results.length === 0) return;
        const icsString = generateCycleIcs(results);
        const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Peptidex_Cycle_Schedule.ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [results]);

    return (
        <RedesignLayout>
            <div className="cycle-wrap">
                <div className="cycle-disclaimer">
                    <ShieldAlert />
                    <p>{SHORT_DISCLAIMER}</p>
                </div>

                <div className="cycle-header">
                    <h1 className="cycle-title">
                        <div className="cycle-icon-wrap"><ShoppingCart /></div> 
                        Cycle Planner
                    </h1>
                    <p className="cycle-subtitle">Plan your full cycle &amp; know exactly what to order.</p>
                </div>

                <div className="cycle-steps">
                    {STEP_LABELS.map((label, i) => (
                        <div key={label} className="cycle-step-item">
                            <div className={`cycle-step-pill ${i <= step ? "active" : ""}`}>
                                {i < step ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                ) : (
                                    <span className="cycle-step-num">{i + 1}</span>
                                )}
                                <span>{label}</span>
                            </div>
                            {i < STEP_LABELS.length - 1 && <ChevronRight className="cycle-step-arrow w-4 h-4" />}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* STEP 0: GOAL SELECTION */}
                    {step === 0 && (
                        <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="cycle-subheading">What's your goal?</h2>
                            <div className="cycle-goals-grid">
                                {goals.map(goal => (
                                    <button
                                        key={goal.id}
                                        onClick={() => handleGoalSelect(goal)}
                                        className={`cycle-goal-card ${selectedGoal?.id === goal.id ? "selected" : ""}`}
                                    >
                                        <span className="cycle-goal-icon">{goal.icon}</span>
                                        <h3 className="cycle-goal-label">{goal.label}</h3>
                                        <p className="cycle-goal-desc">{goal.description}</p>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 1: REVIEW STACK */}
                    {step === 1 && selectedStack && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <button onClick={() => setStep(0)} className="cycle-goback-btn">
                                <ArrowLeft className="w-3 h-3" /> Change Goal
                            </button>

                            <div className="cycle-stack-promo">
                                <h2>{selectedGoal?.icon} {selectedStack.stack_name}</h2>
                                <p>{selectedStack.goal}</p>
                                <p className="accent">✨ All peptides in this stack are available from our recommended source, Amino Club.</p>
                            </div>

                            <h3 className="cycle-subheading">Toggle peptides for your cycle</h3>
                            <div className="cycle-toggle-list">
                                {selectedStack.peptides.map(sp => {
                                    const enabled = enabledPeptides.has(sp.name);
                                    const pep = peptides.find(p => p.name === sp.name);
                                    return (
                                        <div key={sp.name} className={`cycle-toggle-item ${enabled ? "enabled" : ""}`}>
                                            <div className="cycle-toggle-info">
                                                <h4>
                                                    {sp.name} 
                                                    {pep?.dosing && <span className="cycle-toggle-route">{pep.dosing.route}</span>}
                                                </h4>
                                                <p className="cycle-toggle-role">{sp.role_in_stack}</p>
                                            </div>
                                            <button onClick={() => togglePeptide(sp.name)} className="cycle-toggle-btn">
                                                {enabled ? <ToggleRight className="w-8 h-8" style={{color:"var(--green)"}} /> : <ToggleLeft className="w-8 h-8" style={{color:"var(--ink-mute)"}} />}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <button onClick={() => setStep(2)} disabled={enabledPeptides.size === 0} className="cycle-main-btn">
                                Configure Cycle <ArrowRight className="w-4 h-4" style={{verticalAlign:"text-bottom"}} />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 2: CONFIGURE */}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <button onClick={() => setStep(1)} className="cycle-goback-btn">
                                <ArrowLeft className="w-3 h-3" /> Review Stack
                            </button>

                            <h2 className="cycle-subheading">Configure Cycle</h2>

                            <div className="cycle-global-opts">
                                <div className="cycle-global-field">
                                    <label className="cycle-field-label"><Calendar /> Cycle Length</label>
                                    <select 
                                        value={globalCycleLength}
                                        onChange={(e) => updateGlobalCycleLength(parseInt(e.target.value))}
                                        className="cycle-select"
                                    >
                                        <option value={4}>4 Weeks</option>
                                        <option value={6}>6 Weeks</option>
                                        <option value={8}>8 Weeks</option>
                                        <option value={10}>10 Weeks</option>
                                        <option value={12}>12 Weeks</option>
                                    </select>
                                </div>
                                <div className="cycle-global-field">
                                    <label className="cycle-field-label"><Package /> Include Supplies in Cost</label>
                                    <button 
                                        onClick={() => setIncludeSupplies(!includeSupplies)}
                                        className={`cycle-toggle-supply-btn ${includeSupplies ? "enabled" : ""}`}
                                    >
                                        <span>BAC Water, Syringes &amp; Swabs</span>
                                        {includeSupplies ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <h3 className="cycle-subheading">Individual Peptide Protocols</h3>
                            <div className="cycle-pep-config-list">
                                {Array.from(enabledPeptides).map(name => {
                                    const config = configs.get(name);
                                    const result = results.find(r => r.peptideName === name);
                                    const isExpanded = expandedCard === name;
                                    if (!config || !result) return null;

                                    return (
                                        <div key={name} className="cycle-pep-config-card">
                                            <button onClick={() => setExpandedCard(isExpanded ? null : name)} className="cycle-pcc-header">
                                                <div>
                                                    <span className="cycle-pcc-title">{name}</span>
                                                    <div className="cycle-pcc-meta">
                                                        <span>{config.doseMcg}mcg × {config.injectionsPerWeek}x/wk</span>
                                                        <span>•</span>
                                                        <span>{config.cycleWeeks} weeks</span>
                                                        <span>•</span>
                                                        <span className="accent">{result.vialsNeeded} vials</span>
                                                    </div>
                                                </div>
                                                {isExpanded ? <ChevronUp className="w-5 h-5" style={{color:"var(--ink-mute)"}} /> : <ChevronDown className="w-5 h-5" style={{color:"var(--ink-mute)"}} />}
                                            </button>

                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                        <div className="cycle-pcc-body">
                                                            <div className="cycle-warning">
                                                                <ShieldAlert />
                                                                <p><strong>Titration Protocol:</strong> The dose below is your target dose. You should start with a much smaller dose and titrate up by 50% each week until safely reached.</p>
                                                            </div>

                                                            <div className="cycle-input-grid">
                                                                <ConfigInput label="Target Dose (mcg)" icon={<Syringe />} value={config.doseMcg} onChange={v => updateConfig(name, "doseMcg", v)} min={10} max={50000} />
                                                                <ConfigInput label="Injections / Wk" icon={<Clock />} value={config.injectionsPerWeek} onChange={v => updateConfig(name, "injectionsPerWeek", v)} min={1} max={14} />
                                                                <ConfigInput label="Cycle Length (wks)" icon={<Calendar />} value={config.cycleWeeks} onChange={v => updateConfig(name, "cycleWeeks", v)} min={1} max={52} />
                                                                <ConfigInput label="Vial Size (mg)" icon={<Package />} value={config.vialMg} onChange={v => updateConfig(name, "vialMg", v)} min={1} max={100} />
                                                                <ConfigInput label="BAC Water (ml)" icon={<Droplets />} value={config.bacWaterMl} onChange={v => updateConfig(name, "bacWaterMl", v)} min={0.5} max={10} step={0.5} />
                                                            </div>

                                                            <div className="cycle-results-grid">
                                                                <ResultStat label="Syringe Draw" value={`${result.syringeUnits}`} unit="units" />
                                                                <ResultStat label="Doses/Vial" value={`${result.dosesPerVial}`} unit="injections" />
                                                                <ResultStat label="Vial Lasts" value={`~${result.vialDaysLast}`} unit="days" />
                                                                <ResultStat label="Total Inj." value={`${result.totalInjections}`} unit="for cycle" />
                                                                <ResultStat label="Concentration" value={`${Math.round(result.concentration).toLocaleString()}`} unit="mcg/ml" />
                                                                <ResultStat label="Vials Need" value={`${result.vialsNeeded}`} unit="vials" accent />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>

                            <button onClick={() => setStep(3)} className="cycle-main-btn">
                                View Shopping List <ArrowRight className="w-4 h-4" style={{verticalAlign:"text-bottom"}} />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 3: COST BREAKDOWN */}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div className="cycle-summary-header hide-on-print">
                                <button onClick={() => setStep(2)} className="cycle-goback-btn" style={{marginBottom:0}}>
                                    <ArrowLeft className="w-3 h-3" /> Adjust
                                </button>
                                <button onClick={() => window.print()} className="cycle-print-btn">
                                    Save as PDF <ExternalLink className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="cycle-summary-promo">
                                <h2><DollarSign style={{width:"20px", height:"20px"}} /> Cost Breakdown</h2>
                                <p>{selectedGoal?.icon} {selectedStack?.stack_name} — {shoppingList.maxCycleWeeks} Weeks</p>
                            </div>

                            <div className="cycle-shopping-list hide-on-print-bg">
                                {results.map(r => {
                                    const pepSlug = r.peptideName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                                    const productUrl = `https://www.aminoclub.com/us/products/${pepSlug}?utm_source=affiliate_marketing&code=PEPTIDEX`;
                                    
                                    return (
                                        <div key={r.peptideName} className="cycle-shop-item">
                                            <div className="cycle-shop-info">
                                                <h3>{r.peptideName} <span className="cycle-shop-badge">{r.vialsNeeded}x vials</span></h3>
                                                <p className="cycle-shop-desc">{r.vialMg}mg vial • {r.doseMcg}mcg {r.injectionsPerWeek}x/wk for {r.cycleWeeks}wks</p>
                                            </div>
                                            <div className="cycle-shop-actions">
                                                <p className="cycle-shop-price">${r.totalCost?.toFixed(2)} <span>est.</span></p>
                                                <a href={productUrl} target="_blank" rel="noopener noreferrer" className="cycle-shop-btn hide-on-print">
                                                    Buy Source <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}

                                {includeSupplies && (
                                    <>
                                        <div className="cycle-shop-item">
                                            <div className="cycle-shop-info">
                                                <h3>Bacteriostatic Water <span className="cycle-shop-badge">{shoppingList.supplies.bacWater.quantity}x 30ml</span></h3>
                                            </div>
                                            <div className="cycle-shop-actions">
                                                <p className="cycle-shop-price">${shoppingList.supplies.bacWater.subtotal.toFixed(2)} <span>est.</span></p>
                                                <a href="https://aminoclub.com/collections/accessories" target="_blank" rel="noopener noreferrer" className="cycle-shop-btn hide-on-print">Buy Source <ExternalLink className="w-3 h-3" /></a>
                                            </div>
                                        </div>
                                        <div className="cycle-shop-item">
                                            <div className="cycle-shop-info">
                                                <h3>Insulin Syringes <span className="cycle-shop-badge">{shoppingList.supplies.syringes.quantity}x Box</span></h3>
                                            </div>
                                            <div className="cycle-shop-actions">
                                                <p className="cycle-shop-price">${shoppingList.supplies.syringes.subtotal.toFixed(2)} <span>est.</span></p>
                                                <a href="https://aminoclub.com/collections/accessories" target="_blank" rel="noopener noreferrer" className="cycle-shop-btn hide-on-print">Buy Source <ExternalLink className="w-3 h-3" /></a>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="cycle-grand-total hide-on-print-bg">
                                <div className="cycle-gt-left">
                                    <p>Estimated Grand Total</p>
                                    <h3>${shoppingList.grandTotal.toFixed(2)}</h3>
                                    <span className="hide-on-print">Prices are estimates</span>
                                </div>
                                <div className="cycle-gt-right">
                                    <p>Prorated Cost</p>
                                    <span>${shoppingList.costPerWeek.toFixed(2)}/wk</span>
                                </div>
                            </div>

                            <div className="cycle-full-order-cta hide-on-print">
                                <h3>Ready to start?</h3>
                                <p>Purchase all peptides and supplies directly from Amino Club. Use code <strong>PEPTIDEX</strong> at checkout to apply your 20% discount.</p>
                                <a href="https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX" target="_blank" rel="noopener noreferrer" className="cycle-buy-all">
                                    Order Full Cycle from Amino Club <ArrowRight className="w-5 h-5" />
                                </a>
                                <div className="cycle-features">
                                    <span>✓ COA-verified</span> • <span>✓ 99%+ purity</span> • <span>✓ US shipping</span>
                                </div>
                            </div>

                            <div className="cycle-export hide-on-print">
                                <label><Calendar /> Injection Reminders</label>
                                <p>Download your protocol to Calendar to receive push notifications when it's time to pin.</p>
                                <button onClick={handleDownloadIcs}>Add to Calendar (.ics)</button>
                            </div>

                            {results.length > 0 && (() => {
                                const cycleData: CycleCardData = {
                                    type: "cycle",
                                    stackName: selectedStack?.stack_name || "Custom Cycle",
                                    goalName: selectedGoal?.label || "Peptide Research",
                                    peptides: results.map(r => ({
                                        name: r.peptideName,
                                        doseMcg: r.doseMcg,
                                        cycleWeeks: r.cycleWeeks,
                                        vialsNeeded: r.vialsNeeded,
                                    })),
                                    totalVials: results.reduce((sum, r) => sum + r.vialsNeeded, 0),
                                    totalCost: shoppingList.grandTotal,
                                    maxWeeks: shoppingList.maxCycleWeeks,
                                };
                                return (
                                    <div style={{display:"flex", justifyContent:"center"}} className="hide-on-print">
                                        <ShareModal
                                            data={cycleData}
                                            shareUrl="https://peptidex.app/tools/cycle-planner"
                                            shareText={`My ${shoppingList.maxCycleWeeks}-week ${selectedStack?.stack_name || "peptide"} cycle plan — built on PeptiDex \uD83E\uDDEC`}
                                            buttonLabel="Share My Cycle"
                                        />
                                    </div>
                                );
                            })()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </RedesignLayout>
    );
}

function ConfigInput({ label, icon, value, onChange, min, max, step = 1 }: {
    label: string;
    icon: React.ReactNode;
    value: number;
    onChange: (v: number) => void;
    min: number;
    max: number;
    step?: number;
}) {
    return (
        <div className="cycle-input-wrap">
            <label>{icon} {label}</label>
            <input
                type="number"
                value={value}
                onChange={e => onChange(parseFloat(e.target.value) || 0)}
                min={min} max={max} step={step}
            />
        </div>
    );
}

function ResultStat({ label, value, unit, accent }: { label: string; value: string; unit: string; accent?: boolean }) {
    return (
        <div>
            <p className="cycle-stat-label">{label}</p>
            <p className={`cycle-stat-val ${accent ? "accent" : ""}`}>{value}</p>
            <p className="cycle-stat-unit">{unit}</p>
        </div>
    );
}
