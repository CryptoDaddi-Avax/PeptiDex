"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Store, Shield, ExternalLink, Search, Star, MapPin, CheckCircle, Percent, FlaskConical } from "lucide-react";

interface Supplier {
    name: string;
    url: string;
    affiliateUrl?: string;
    affiliateCommission?: string;
    rating: number;
    thirdPartyTested: boolean;
    coaAvailable: boolean;
    testingMethod: string[];
    shipsTo: string[];
    specialties: string[];
    minPurity: string;
    notes: string;
    badge?: string;
}

const suppliers: Supplier[] = [
    {
        name: "Amino Club",
        url: "https://aminoclub.com",
        affiliateUrl: "https://aminoclub.com?utm_source=affiliate_marketing&code=PEPTIDEX",
        affiliateCommission: "Affiliate partner",
        rating: 4.9,
        thirdPartyTested: true,
        coaAvailable: true,
        testingMethod: ["HPLC", "Mass Spec", "Endotoxin"],
        shipsTo: ["USA", "International"],
        specialties: ["BPC-157", "TB-500", "GHK-Cu", "CJC-1295/Ipamorelin", "AOD-9604", "Tesamorelin", "Retatrutide", "KPV", "MOTS-c", "Semax", "Selank", "DSIP", "NAD+", "Glutathione", "Cagrilintide"],
        minPurity: "99%+",
        notes: "Premium vendor with 99%+ purity guaranteed on every product. COA included with every batch. 60-day money-back guarantee and free shipment protection. Active research community on Discord. One of the most competitive prices in the market.",
        badge: "Editor's Pick",
    },
    {
        name: "Limitless Life Nootropics",
        url: "https://limitlesslifenootropics.com",
        affiliateUrl: "https://limitlesslifenootropics.com?ref=PeptiDex",
        affiliateCommission: "15% per sale",
        rating: 4.8,
        thirdPartyTested: true,
        coaAvailable: true,
        testingMethod: ["Janoshik HPLC", "Mass Spec", "Endotoxin"],
        shipsTo: ["USA", "International"],
        specialties: ["BPC-157", "TB-500", "Epitalon", "Semax", "Selank", "GHK-Cu", "Thymosin Alpha-1"],
        minPurity: "99%+",
        notes: "One of the most respected vendors in the research peptide space. Every batch is independently tested by Janoshik Analytical. Full HPLC and mass spec COAs are publicly linked on each product page.",
        badge: "Editor's Pick",
    },

    {
        name: "Core Peptides",
        url: "https://corepeptides.com",
        affiliateUrl: "https://corepeptides.com?ref=PeptiDex",
        affiliateCommission: "12% per sale",
        rating: 4.8,
        thirdPartyTested: true,
        coaAvailable: true,
        testingMethod: ["Janoshik HPLC", "Mass Spec"],
        shipsTo: ["USA"],
        specialties: ["BPC-157", "TB-500", "KPV", "Follistatin-344", "IGF-1 LR3", "Thymosin Alpha-1", "Tesamorelin"],
        minPurity: "98%+",
        notes: "US-based vendor with fast domestic shipping. All products independently tested by Janoshik. Popular in longevity and healing protocol circles for their consistent purity and reliable stock levels.",
    },
    {
        name: "Amino Asylum",
        url: "https://aminoasylum.shop",
        affiliateUrl: "https://aminoasylum.shop?ref=PeptiDex",
        affiliateCommission: "10% per sale",
        rating: 4.5,
        thirdPartyTested: true,
        coaAvailable: true,
        testingMethod: ["HPLC", "Mass Spec"],
        shipsTo: ["USA", "International"],
        specialties: ["BPC-157", "Ipamorelin", "CJC-1295", "GHK-Cu", "AOD-9604", "DSIP", "Melanotan II", "PT-141"],
        minPurity: "98%+",
        notes: "Long-standing research vendor with a large product catalog. Competitive pricing with published batch testing. Good option for combination orders of multiple peptides.",
        badge: "Best Selection",
    },
    {
        name: "Ascension Peptides",
        url: "https://ascensionpeptides.com",
        affiliateUrl: "https://ascensionpeptides.com/ref/PeptiDex/",
        affiliateCommission: "10% + 10% lifetime",
        rating: 4.7,
        thirdPartyTested: true,
        coaAvailable: true,
        testingMethod: ["HPLC", "Mass Spec"],
        shipsTo: ["USA"],
        specialties: ["BPC-157", "TB-500", "NAD+", "MOTS-c", "KPV", "Semax", "Selank", "AOD-9604", "DSIP", "Epitalon", "Thymosin Alpha-1", "GHK-Cu", "SS-31", "Tesamorelin", "Ipamorelin", "PT-141", "Melanotan II", "Glutathione", "Sermorelin"],
        minPurity: "98%+",
        notes: "Wide selection of 50+ research peptides with competitive pricing. COAs available for all batches. Offers 10% lifetime recurring commissions through their affiliate program. Use code PEPTIDEX for your first purchase.",
    },
    {
        name: "Pure Lab Peptides",
        url: "https://purelabpeptides.com",
        affiliateUrl: "https://purelabpeptides.com/?ref=PeptiDex",
        affiliateCommission: "20% first + 15% lifetime",
        rating: 4.6,
        thirdPartyTested: true,
        coaAvailable: true,
        testingMethod: ["HPLC", "Mass Spec", "Endotoxin"],
        shipsTo: ["USA", "International"],
        specialties: ["BPC-157", "TB-500", "NAD+", "Ipamorelin", "Tesamorelin", "AOD-9604", "PT-141", "MOTS-c", "GHK-Cu", "Semax", "Selank"],
        minPurity: "99%+",
        notes: "Massive catalog of 117+ research peptides including hard-to-find compounds. Third-party tested with COAs on every batch. Net-30 payouts via PayPal for affiliates.",
    },
    {
        name: "Swiss Chems",
        url: "https://swisschems.is",
        affiliateUrl: "https://swisschems.is?ref=PeptiDex",
        affiliateCommission: "10% per sale",
        rating: 4.4,
        thirdPartyTested: true,
        coaAvailable: true,
        testingMethod: ["HPLC", "Mass Spec"],
        shipsTo: ["USA", "EU", "UK", "International"],
        specialties: ["Selank", "Semax", "Epitalon", "DSIP", "BPC-157", "TB-500", "GHK-Cu"],
        minPurity: "98%+",
        notes: "Best option for international buyers   ships to the EU and UK where options are limited. Batch-specific COAs available. Strong reputation for nootropic peptides like Semax and Selank.",
        badge: "Best for International",
    },
];

export default function SuppliersPage() {
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        if (!search) return suppliers;
        const q = search.toLowerCase();
        return suppliers.filter(s =>
            s.name.toLowerCase().includes(q) ||
            s.specialties.some(sp => sp.toLowerCase().includes(q)) ||
            s.testingMethod.some(t => t.toLowerCase().includes(q))
        );
    }, [search]);

    return (
        <div className="max-w-2xl mx-auto px-3 py-4 md:px-4 md:py-6">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <Store className="w-5 h-5 text-emerald-400" />
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-100">Research Vendor Directory</h1>
                </div>
                <p className="text-xs md:text-sm text-zinc-400">Only the most reputable vendors with third-party COA verification</p>
            </motion.div>

            <div className="rounded-xl bg-amber-950/20 border border-amber-500/15 p-3 mb-4">
                <p className="text-[10px] text-amber-400/70">?? For research purposes only. All vendors listed sell for research use, not human consumption. PeptiDex may receive a commission from affiliate links at no cost to you.</p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input type="text" placeholder="Search by vendor or peptide name..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-violet-500/50" />
            </div>

            <div className="space-y-4">
                {filtered.map((s, i) => (
                    <motion.div key={s.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                        className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden">

                        {/* Header */}
                        <div className="p-4 border-b border-zinc-800/60">
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-base font-bold text-zinc-100">{s.name}</h3>
                                        {s.badge && (
                                            <span className="px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-[9px] font-bold text-violet-300 uppercase tracking-wider">{s.badge}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                            <span className="text-xs text-zinc-300 font-semibold">{s.rating}</span>
                                        </div>
                                        <span className="text-zinc-700"></span>
                                        <span className="text-[10px] text-emerald-400 font-medium">{s.minPurity} purity</span>
                                        <span className="text-zinc-700"></span>
                                        <span className="flex items-center gap-1 text-[10px] text-zinc-400"><MapPin className="w-3 h-3" />{s.shipsTo.join(", ")}</span>
                                    </div>
                                </div>
                                <a href={s.url} target="_blank" rel="noopener noreferrer"
                                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-[11px] text-zinc-300 font-medium">
                                    Visit <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                            <p className="text-[12px] text-zinc-400 leading-relaxed">{s.notes}</p>
                        </div>

                        {/* Details */}
                        <div className="p-4">
                            {/* Testing methods */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <FlaskConical className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                {s.testingMethod.map(t => (
                                    <span key={t} className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-medium">{t}</span>
                                ))}
                                {s.coaAvailable && <span className="flex items-center gap-1 text-[10px] text-emerald-400"><CheckCircle className="w-3 h-3" />COA</span>}
                                {s.thirdPartyTested && <span className="flex items-center gap-1 text-[10px] text-zinc-400"><Shield className="w-3 h-3 text-emerald-400" />3rd Party</span>}
                            </div>

                            {/* Specialties */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {s.specialties.map(sp => (
                                    <span key={sp} className="px-2 py-0.5 rounded-lg bg-zinc-800/80 text-[10px] text-zinc-400">{sp}</span>
                                ))}
                            </div>

                            {/* Affiliate CTA */}
                            {s.affiliateUrl && (
                                <a href={s.affiliateUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600/20 to-violet-800/10 border border-violet-500/25 hover:border-violet-500/50 transition-colors group">
                                    <div className="flex items-center gap-2">
                                        <Percent className="w-3.5 h-3.5 text-violet-400" />
                                        <span className="text-[11px] font-semibold text-violet-300">Shop via PeptiDex Link</span>
                                        {s.affiliateCommission && (
                                            <span className="text-[9px] text-zinc-500">({s.affiliateCommission} supports this app)</span>
                                        )}
                                    </div>
                                    <ExternalLink className="w-3.5 h-3.5 text-violet-400/60 group-hover:text-violet-300 transition-colors" />
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
