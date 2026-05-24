import { peptides } from "@/data/peptides";
import { Peptide } from "@/data/types";
import { pricingData } from "@/data/pricing";
import { legalData, legalStatusLabels } from "@/data/legal-status";
import { checkInteractions } from "@/data/peptide-interactions";
import { getCategoryIcon } from "@/data/category-icons";
import { SITE_STATS } from "@/data/site-stats";

// --- Intent Detection ---

type Intent =
    | "goal_recommendation"
    | "peptide_info"
    | "dosing_help"
    | "stack_advice"
    | "interaction_check"
    | "side_effects"
    | "comparison"
    | "legal_status"
    | "pricing"
    | "beginner"
    | "greeting"
    | "unknown";

interface ParsedQuery {
    intent: Intent;
    peptideNames: string[];
    goalKeywords: string[];
    raw: string;
}

const goalKeywordMap: Record<string, string[]> = {
    healing: ["heal", "injury", "recover", "repair", "tendon", "ligament", "joint", "muscle tear", "wound", "surgery", "broken"],
    fat_loss: ["fat", "weight", "lose", "slim", "lean", "obesity", "appetite", "ozempic", "wegovy", "diet"],
    muscle: ["muscle", "gain", "bulk", "strength", "hypertrophy", "anabolic", "grow"],
    cognitive: ["brain", "cognitive", "focus", "memory", "mental", "concentration", "study", "nootropic", "smart", "think"],
    sleep: ["sleep", "insomnia", "rest", "circadian", "deep sleep"],
    longevity: ["longevity", "anti-aging", "aging", "lifespan", "healthspan", "telomere"],
    immune: ["immune", "immunity", "sick", "infection", "virus", "cold", "flu"],
    anxiety: ["anxiety", "stress", "calm", "anxious", "relax", "mood"],
    skin: ["skin", "hair", "collagen", "wrinkle", "complexion", "wound heal"],
    gut: ["gut", "stomach", "ibs", "colitis", "intestin", "digestive", "bloat"],
    sexual: ["sexual", "libido", "erectile", "desire", "arousal"],
    inflammation: ["inflam", "swelling", "crp", "autoimmune", "chronic pain"],
    mitochondria: ["mitochond", "energy", "fatigue", "atp", "endurance"],
};

const goalToPeptides: Record<string, string[]> = {
    healing: ["BPC-157", "TB-500", "GHK-Cu"],
    fat_loss: ["Semaglutide", "Tirzepatide", "AOD-9604", "Retatrutide", "MOTS-c"],
    muscle: ["IGF-1 LR3", "Follistatin-344", "CJC-1295", "Ipamorelin"],
    cognitive: ["Semax", "Selank"],
    sleep: ["DSIP", "CJC-1295", "Ipamorelin", "Epitalon"],
    longevity: ["Epitalon", "MOTS-c", "SS-31", "GHK-Cu"],
    immune: ["Thymosin Alpha-1", "BPC-157", "KPV"],
    anxiety: ["Selank", "Semax", "DSIP"],
    skin: ["GHK-Cu", "BPC-157", "Epitalon"],
    gut: ["BPC-157", "KPV"],
    sexual: ["PT-141", "Melanotan II"],
    inflammation: ["BPC-157", "KPV", "TB-500", "Thymosin Alpha-1"],
    mitochondria: ["MOTS-c", "SS-31"],
};

function findMentionedPeptides(text: string): Peptide[] {
    const lower = text.toLowerCase();
    return peptides.filter((p) => {
        if (lower.includes(p.name.toLowerCase())) return true;
        if (lower.includes(p.slug)) return true;
        return p.aliases.some((a) => lower.includes(a.toLowerCase()));
    });
}

function detectGoals(text: string): string[] {
    const lower = text.toLowerCase();
    const goals: string[] = [];
    for (const [goal, keywords] of Object.entries(goalKeywordMap)) {
        if (keywords.some((kw) => lower.includes(kw))) goals.push(goal);
    }
    return goals;
}

function detectIntent(text: string, mentioned: Peptide[], goals: string[]): Intent {
    const lower = text.toLowerCase();
    if (/^(hi|hello|hey|sup|yo|what's up|good morning|good evening)/i.test(lower.trim())) return "greeting";
    if (/beginner|start|new to|first time|getting started|where.*begin/i.test(lower)) return "beginner";
    if (/compare|vs\.?|versus|difference|better/i.test(lower) && mentioned.length >= 2) return "comparison";
    if (/interact|combine|stack.*togeth|mix|together|pair|with/i.test(lower) && mentioned.length >= 2) return "interaction_check";
    if (/stack|combo|combin|protocol|regimen/i.test(lower)) return "stack_advice";
    if (/dos(e|ing|age)|how much|inject|reconstitut|syringe|mcg|mg/i.test(lower)) return "dosing_help";
    if (/side effect|safe|danger|risk|warn/i.test(lower)) return "side_effects";
    if (/legal|fda|approved|ban|law|country|regulated/i.test(lower)) return "legal_status";
    if (/price|cost|cheap|expensive|afford|buy|how much.*\$/i.test(lower)) return "pricing";
    if (mentioned.length > 0 && goals.length === 0) return "peptide_info";
    if (goals.length > 0) return "goal_recommendation";
    return "unknown";
}

export function parseQuery(text: string): ParsedQuery {
    const mentioned = findMentionedPeptides(text);
    const goals = detectGoals(text);
    const intent = detectIntent(text, mentioned, goals);
    return { intent, peptideNames: mentioned.map((p) => p.name), goalKeywords: goals, raw: text };
}

// --- Response Generation ---

function formatPeptideCard(p: Peptide): string {
    const lines = [`**${getCategoryIcon(p.category)} ${p.name}**`];
    lines.push(`${p.primary_benefits}`);
    if (p.half_life_hours) {
        const hl = p.half_life_hours >= 24 ? `${(p.half_life_hours / 24).toFixed(1)} days` : `${p.half_life_hours}h`;
        lines.push(`? Half-life: ${hl}`);
    }
    if (p.dosing) {
        lines.push(`?? ${p.dosing.typical_dose_mcg[0]}-${p.dosing.typical_dose_mcg[1]}mcg ${p.dosing.route}, ${p.dosing.frequency}`);
    }
    lines.push(`?? Evidence: ${p.key_studies.length} studies`);
    if (p.is_fda_approved) lines.push(`? FDA Approved`);
    return lines.join("\n");
}

export function generateResponse(query: ParsedQuery): string {
    const { intent, peptideNames, goalKeywords } = query;

    switch (intent) {
        case "greeting":
            return "Hey! ?? I'm the PeptiDex Advisor. I can help you with:\n\n• **Finding the right peptide** for your goals (healing, fat loss, cognition, etc.)\n• **Dosing information** for any peptide\n• **Stacking advice** and interaction checks\n• **Comparing** peptides side-by-side\n• **Legal status** and pricing info\n\nJust tell me what you're looking for!";

        case "beginner":
            return "Welcome to the peptide world! ?? Here's where most beginners start:\n\n**?? Best First Peptide: BPC-157**\nExcellent safety profile, well-studied, versatile for healing and gut health. 250-500mcg/day SubQ.\n\n**?? Runner-Up: CJC-1295 + Ipamorelin**\nThe classic GH stack for better sleep, recovery, and body composition. Take before bed.\n\n**?? For Fat Loss: Semaglutide**\nFDA-approved, proven results. Requires a prescription.\n\n**?? Pro Tips for Beginners:**\n1. Start with ONE peptide to see how your body responds\n2. Get baseline blood work first\n3. Always buy from tested sources with COAs\n4. Check out our **Peptide 101** course in the Learn section!\n\nWhat's your main goal? I can give you a more specific recommendation.";

        case "goal_recommendation": {
            const allRecs = new Set<string>();
            goalKeywords.forEach((g) => goalToPeptides[g]?.forEach((name) => allRecs.add(name)));
            const recs = Array.from(allRecs).slice(0, 5);
            const goalNames = goalKeywords.join(", ").replace(/_/g, " ");
            const cards = recs.map((name) => { const p = peptides.find((pp) => pp.name === name); return p ? formatPeptideCard(p) : ""; }).filter(Boolean);
            return `Based on your interest in **${goalNames}**, here are my top recommendations:\n\n${cards.join("\n\n---\n\n")}\n\n?? Want me to compare any of these, check interactions for a stack, or dive deeper into dosing for a specific one?`;
        }

        case "peptide_info": {
            const pepData = peptides.filter((p) => peptideNames.includes(p.name));
            if (pepData.length === 0) return "I couldn't find that peptide. Try searching by common name (e.g., BPC-157, Semaglutide, Semax).";
            const cards = pepData.map((p) => {
                const lines = [formatPeptideCard(p)];
                lines.push(`\n**Mechanism:** ${p.mechanism}`);
                lines.push(`**Safety:** ${p.safety_notes}`);
                const legal = legalData.find((l) => l.peptide_name === p.name);
                if (legal) {
                    const usStatus = legal.countries.find((c) => c.country === "USA");
                    if (usStatus) lines.push(`???? US Status: ${legalStatusLabels[usStatus.status]}`);
                }
                const price = pricingData.find((pr) => pr.name === p.name);
                if (price) lines.push(`?? Avg price: $${price.avg_price_usd}/vial (~$${price.cost_per_dose_usd?.toFixed(2)}/dose)`);
                return lines.join("\n");
            });
            return cards.join("\n\n---\n\n") + "\n\nAnything else you'd like to know about " + (pepData.length > 1 ? "these" : "this") + "?";
        }

        case "dosing_help": {
            const pepData = peptides.filter((p) => peptideNames.includes(p.name));
            if (pepData.length === 0) return "Which peptide do you need dosing info for? Just name it and I'll pull up the protocol.";
            const cards = pepData.map((p) => {
                const lines = [`**?? ${p.name}   Dosing Protocol**`];
                if (p.dosing) {
                    lines.push(`Route: ${p.dosing.route}`);
                    lines.push(`Dose: ${p.dosing.typical_dose_mcg[0]}-${p.dosing.typical_dose_mcg[1]} mcg`);
                    lines.push(`Frequency: ${p.dosing.frequency}`);
                    if (p.dosing.timing) lines.push(`Timing: ${p.dosing.timing}`);
                    if (p.dosing.cycle_weeks) lines.push(`Cycle: ${p.dosing.cycle_weeks[0]}-${p.dosing.cycle_weeks[1]} weeks`);
                    if (p.dosing.reconstitution_ml && p.dosing.typical_vial_mg) lines.push(`Reconstitution: ${p.dosing.reconstitution_ml}ml BAC water for ${p.dosing.typical_vial_mg}mg vial`);
                    if (p.dosing.notes) lines.push(`?? ${p.dosing.notes}`);
                } else {
                    lines.push("Detailed dosing data not yet available for this peptide.");
                }
                lines.push(`\n?? *Start low and titrate up. This is educational only   consult a healthcare professional.*`);
                return lines.join("\n");
            });
            return cards.join("\n\n---\n\n");
        }

        case "stack_advice": {
            if (peptideNames.length === 0) {
                return "**Popular Peptide Stacks:**\n\n**??? Recovery Stack**\nBPC-157 + TB-500\n? Local healing + systemic repair\n\n**?? GH / Sleep Stack**\nCJC-1295 + Ipamorelin (pre-bed)\n? 3-5x GH pulse, better sleep and recovery\n\n**?? Cognitive Stack**\nSemax (AM) + Selank (PM)\n? BDNF boost + calm focus\n\n**? Weight Loss Stack**\nSemaglutide + AOD-9604\n? Appetite reduction + targeted fat metabolism\n\n**?? Longevity Stack**\nEpitalon + MOTS-c + SS-31\n? Telomeres + mitochondria optimization\n\nTell me your goals and I can suggest a custom stack!";
            }
            const mentioned = peptides.filter((p) => peptideNames.includes(p.name));
            if (mentioned.length >= 2) {
                const results = checkInteractions(peptideNames);
                const synergies = results.filter((r) => r.type === "synergy");
                const cautions = results.filter((r) => r.type === "caution");
                const contras = results.filter((r) => r.type === "contraindicated");
                const lines = [`**Stack Analysis: ${peptideNames.join(" + ")}**\n`];
                if (synergies.length > 0) {
                    lines.push("? **Synergies:**");
                    synergies.forEach((s) => lines.push(`• ${s.peptide_a} + ${s.peptide_b}: ${s.notes_a || s.notes_b || "Good pairing"}`));
                }
                if (cautions.length > 0) {
                    lines.push("\n?? **Cautions:**");
                    cautions.forEach((c) => lines.push(`• ${c.peptide_a} + ${c.peptide_b}: ${c.notes_a || c.notes_b || "Use with care"}`));
                }
                if (contras.length > 0) {
                    lines.push("\n?? **Contraindicated:**");
                    contras.forEach((c) => lines.push(`• ${c.peptide_a} + ${c.peptide_b}: ${c.notes_a || c.notes_b || "Avoid combining"}`));
                }
                if (results.length === 0) {
                    lines.push("No known interactions between these peptides. They should be safe to stack.");
                }
                return lines.join("\n");
            }
            const p = mentioned[0];
            const pSynergies = p.interactions?.synergies || [];
            return `**Stacking options for ${p.name}:**\n\n${pSynergies.length > 0 ? `Best pairings: ${pSynergies.join(", ")}\n\n` : ""}${p.interactions?.notes || "No specific stacking notes."}\n\nWant me to analyze a specific combination?`;
        }

        case "interaction_check": {
            if (peptideNames.length < 2) return "Name at least 2 peptides to check interactions (e.g., \"Can I combine BPC-157 and TB-500?\")";
            const results = checkInteractions(peptideNames);
            const synergies = results.filter((r) => r.type === "synergy");
            const cautions = results.filter((r) => r.type === "caution");
            const contras = results.filter((r) => r.type === "contraindicated");
            const lines = [`**?? Interaction Report: ${peptideNames.join(" + ")}**\n`];
            if (synergies.length > 0) {
                lines.push("? **Synergies:**");
                synergies.forEach((s) => lines.push(`• ${s.peptide_a} ? ${s.peptide_b}: ${s.notes_a || s.notes_b || "Good pairing"}`));
            }
            if (cautions.length > 0) {
                lines.push("\n?? **Use with caution:**");
                cautions.forEach((c) => lines.push(`• ${c.peptide_a} ? ${c.peptide_b}: ${c.notes_a || c.notes_b || "Use with care"}`));
            }
            if (contras.length > 0) {
                lines.push("\n?? **Avoid combining:**");
                contras.forEach((c) => lines.push(`• ${c.peptide_a} ? ${c.peptide_b}: ${c.notes_a || c.notes_b || "Avoid combining"}`));
            }
            if (results.length === 0) {
                lines.push("? No known negative interactions. These can likely be used together safely.");
            }
            return lines.join("\n");
        }

        case "comparison": {
            if (peptideNames.length < 2) return "Name 2-3 peptides to compare (e.g., \"Compare BPC-157 and TB-500\").";
            const compared = peptides.filter((p) => peptideNames.includes(p.name)).slice(0, 3);
            const lines = [`**?? Comparison: ${compared.map((p) => p.name).join(" vs ")}**\n`];
            compared.forEach((p) => {
                lines.push(`**${getCategoryIcon(p.category)} ${p.name}**`);
                lines.push(`Category: ${p.category}`);
                lines.push(`Benefits: ${p.primary_benefits}`);
                lines.push(`Evidence: ${p.key_studies.length} studies (${p.key_studies[0]?.evidence_level || "N/A"})`);
                if (p.dosing) lines.push(`Dosing: ${p.dosing.typical_dose_mcg[0]}-${p.dosing.typical_dose_mcg[1]}mcg ${p.dosing.route} ${p.dosing.frequency}`);
                const price = pricingData.find((pr) => pr.name === p.name);
                if (price) lines.push(`Cost: ~$${price.cost_per_dose_usd?.toFixed(2)}/dose`);
                lines.push("");
            });
            lines.push("Use the **Comparison Tool** for a full side-by-side view with all details!");
            return lines.join("\n");
        }

        case "side_effects": {
            if (peptideNames.length === 0) return "Which peptide are you asking about? I can look up safety info for any peptide in the database.";
            const pepData = peptides.filter((p) => peptideNames.includes(p.name));
            const cards = pepData.map((p) => `**?? ${p.name}   Safety Profile**\n${p.safety_notes}\n\n${p.is_fda_approved ? "? This peptide is FDA-approved, meaning it has passed rigorous safety testing." : "?? Not FDA-approved. Use caution and consult a healthcare provider."}`);
            return cards.join("\n\n---\n\n");
        }

        case "legal_status": {
            if (peptideNames.length === 0) return `Which peptide do you need legal status for? I have data for All ${SITE_STATS.peptides.count} peptides across USA, Canada, UK, EU, and Australia.`;
            const results = peptideNames.map((name) => {
                const legal = legalData.find((l) => l.peptide_name === name);
                if (!legal) return `**${name}**: No legal data available.`;
                const rows = legal.countries.map((c) => `${c.flag} ${c.country}: **${legalStatusLabels[c.status]}**${c.notes ? `   ${c.notes}` : ""}`);
                return `**?? ${name}   Legal Status**\n${rows.join("\n")}`;
            });
            return results.join("\n\n---\n\n") + "\n\n*Laws change frequently. Verify current status in your jurisdiction.*";
        }

        case "pricing": {
            if (peptideNames.length === 0) {
                const sorted = [...pricingData].sort((a, b) => (a.cost_per_dose_usd || 99) - (b.cost_per_dose_usd || 99));
                const top5 = sorted.slice(0, 5);
                const lines = ["**?? Most Affordable Peptides (by dose cost):**\n"];
                top5.forEach((p) => lines.push(`• **${p.name}**   $${p.cost_per_dose_usd?.toFixed(2)}/dose ($${p.avg_price_usd}/vial, ${p.doses_per_vial} doses)`));
                lines.push("\nCheck the **Price Comparison** tool for the full breakdown!");
                return lines.join("\n");
            }
            const results = peptideNames.map((name) => {
                const price = pricingData.find((p) => p.name === name);
                if (!price) return `**${name}**: Pricing data not available.`;
                return `**?? ${name}**\nVial: ${price.typical_vial_mg}mg   $${price.avg_price_usd} (range: $${price.price_range_usd[0]}-$${price.price_range_usd[1]})\nPer dose: ~$${price.cost_per_dose_usd?.toFixed(2)} (${price.doses_per_vial} doses/vial)${price.notes ? `\n?? ${price.notes}` : ""}`;
            });
            return results.join("\n\n---\n\n");
        }

        case "unknown":
        default:
            return "I'm not sure I understood that. I can help with:\n\n• **\"What's good for healing?\"**   Goal-based recommendations\n• **\"Tell me about BPC-157\"**   Peptide deep-dives\n• **\"BPC-157 dosing\"**   Dosing protocols\n• **\"Compare BPC-157 vs TB-500\"**   Side-by-side comparison\n• **\"Can I stack Semax and Selank?\"**   Interaction checks\n• **\"Is Semaglutide legal?\"**   Legal status by country\n• **\"What's the cheapest peptide?\"**   Pricing info\n\nTry asking about a specific peptide or goal!";
    }
}
