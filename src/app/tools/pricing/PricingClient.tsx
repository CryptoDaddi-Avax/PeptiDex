"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { pricingData } from "@/data/pricing";
import { DollarSign, ArrowUpDown, Info } from "lucide-react";
import RedesignLayout from '@/components/redesign/RedesignLayout';
import './pricing-redesign.css';

type SortKey = "name" | "avg_price" | "cost_per_dose" | "doses";

export default function PricingClient() {
    const [sortKey, setSortKey] = useState<SortKey>("name");
    const [sortAsc, setSortAsc] = useState(true);

    const sorted = useMemo(() => {
        const list = [...pricingData];
        list.sort((a, b) => {
            let cmp = 0;
            if (sortKey === "name") cmp = a.name.localeCompare(b.name);
            else if (sortKey === "avg_price") cmp = a.avg_price_usd - b.avg_price_usd;
            else if (sortKey === "cost_per_dose") cmp = (a.cost_per_dose_usd || 0) - (b.cost_per_dose_usd || 0);
            else if (sortKey === "doses") cmp = (b.doses_per_vial || 0) - (a.doses_per_vial || 0);
            return sortAsc ? cmp : -cmp;
        });
        return list;
    }, [sortKey, sortAsc]);

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) setSortAsc(!sortAsc);
        else { setSortKey(key); setSortAsc(true); }
    };

    return (
        <RedesignLayout>
            <div className="prc-wrap">
                <div className="prc-header">
                    <h1 className="prc-title">
                        <div className="prc-icon-wrap"><DollarSign /></div>
                        Price Comparison
                    </h1>
                    <p className="prc-subtitle">Average research-grade pricing for all {pricingData.length} peptides</p>
                </div>

                <div className="prc-disclaimer">
                    <Info />
                    <p>Prices are estimates based on publicly available research-grade suppliers. Actual prices vary by supplier, quantity, and region. Prescription peptides (via doctor/pharmacy) may differ significantly.</p>
                </div>

                <div className="prc-controls">
                    {([["name", "Name"], ["avg_price", "Vial Price"], ["cost_per_dose", "Cost/Dose"], ["doses", "Doses/Vial"]] as [SortKey, string][]).map(([key, label]) => (
                        <button 
                            key={key} 
                            onClick={() => toggleSort(key)}
                            className={`prc-control-btn ${sortKey === key ? "active" : ""}`}
                        >
                            {label}
                            {sortKey === key && <ArrowUpDown style={{width:12, height:12}}/>}
                        </button>
                    ))}
                </div>

                <div className="prc-list">
                    {sorted.map((p, i) => (
                        <motion.div key={p.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                            <div className="prc-card">
                                <div className="prc-card-top">
                                    <Link href={`/peptides/${p.slug}`} className="prc-card-title">{p.name}</Link>
                                    <span className="prc-card-badge">{p.typical_vial_mg}mg vial</span>
                                </div>

                                <div className="prc-metrics">
                                    <div className="prc-metric-box">
                                        <div className="prc-metric-label">Avg Price</div>
                                        <div className="prc-metric-val">${p.avg_price_usd}</div>
                                    </div>
                                    <div className="prc-metric-box">
                                        <div className="prc-metric-label">Per Dose</div>
                                        <div className="prc-metric-val alt1">{p.cost_per_dose_usd ? `$${p.cost_per_dose_usd.toFixed(2)}` : "N/A"}</div>
                                    </div>
                                    <div className="prc-metric-box">
                                        <div className="prc-metric-label">Doses/Vial</div>
                                        <div className="prc-metric-val alt2">{p.doses_per_vial || "-"}</div>
                                    </div>
                                </div>

                                <div className="prc-vendors">
                                    <div className="prc-vend-header">
                                        <div>Verified Vendor</div>
                                        <div style={{textAlign: "center"}}>Unit Price</div>
                                        <div style={{textAlign: "right"}}>Action</div>
                                    </div>
                                    {p.vendors?.map((v, vIdx) => (
                                        <div key={vIdx} className="prc-vend-row">
                                            <div className="prc-vend-name">
                                                {v.vendor === "Ascension Peptides" && <span className="prc-vend-dot ascension" />}
                                                {v.vendor === "Amino Club" && <span className="prc-vend-dot amino" />}
                                                {v.vendor}
                                            </div>
                                            <div className="prc-vend-price">${v.price_usd}</div>
                                            <Link href={v.link} rel={v.link.startsWith('http') ? "nofollow noopener sponsored" : ""} target={v.link.startsWith('http') ? "_blank" : "_self"} className="prc-vend-action">
                                                Check Price
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                {p.notes && (
                                    <div className="prc-notes">
                                        <Info /> {p.notes}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </RedesignLayout>
    );
}
