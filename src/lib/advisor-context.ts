import { peptides } from "@/data/peptides";
import { peptideBlends } from "@/data/blends";
import { pricingData } from "@/data/pricing";
import { legalData, legalStatusLabels } from "@/data/legal-status";
import { checkInteractions } from "@/data/peptide-interactions";

/**
 * Compresses the entire database into a dense text format optimized for token-efficient LLM ingestion (RAG).
 */
export function generateSystemContext(): string {
    let context = "=== PEPTIDEX DATABASE ===\n\n";

    // 1. Peptides Database
    context += "=== INDIVIDUAL PEPTIDES ===\n";
    peptides.forEach((p) => {
        context += `[${p.name} (${p.category})]\n`;
        context += `Aliases: ${p.aliases.join(", ")}\n`;
        context += `Mechanisms: ${p.mechanism}\n`;
        context += `Benefits: ${p.primary_benefits.replace(/\n/g, ' ')}\n`;
        
        if (p.dosing) {
            context += `Dosing: ${p.dosing.route}, ${p.dosing.typical_dose_mcg[0]}-${p.dosing.typical_dose_mcg[1]}mcg, ${p.dosing.frequency}. Timing: ${p.dosing.timing || "N/A"}. Cycle: ${
                p.dosing.cycle_weeks ? p.dosing.cycle_weeks.join("-") + " weeks" : "N/A"
            }\n`;
            if (p.dosing.notes) context += `Dosing Notes: ${p.dosing.notes}\n`;
        }

        if (p.half_life_hours) {
            context += `Half-Life: ${p.half_life_hours} hours\n`;
        }

        context += `Safety: ${p.safety_notes}\n`;
        context += `FDA Approved: ${p.is_fda_approved ? "Yes" : "No"}\n`;

        // Attach pricing if available
        const price = pricingData.find(pr => pr.name === p.name);
        if (price) {
            context += `Avg Price: $${price.avg_price_usd} per ${price.typical_vial_mg}mg vial (Cost/dose: ~$${price.cost_per_dose_usd?.toFixed(2)})\n`;
        }

        // Attach legal if available
        const legal = legalData.find(l => l.peptide_name === p.name);
        if (legal) {
            const usLaw = legal.countries.find(c => c.country === "USA");
            if (usLaw) {
                context += `US Law Status: ${legalStatusLabels[usLaw.status]}\n`;
            }
        }
        
        context += "---\n";
    });

    // 2. Blends Database
    context += "\n=== POPULAR PEPTIDE BLENDS & STACKS ===\n";
    peptideBlends.forEach((b) => {
        context += `[${b.name}] (Category: ${b.category})\n`;
        context += `Nickname: ${b.nickname}\n`;
        context += `Components: ${b.components.join(" + ")}\n`;
        context += `Why stacked: ${b.primary_benefits}\n`;
        context += `Dosing Notes: ${b.dosing_notes}\n`;
        context += "---\n";
    });

    // 3. Global Interaction Rules (Pre-computed matrix summaries)
    // To save tokens, we might just include known cautions/contraindications.
    context += "\n=== DANGEROUS INTERACTIONS TO AVOID ===\n";
    const allNames = peptides.map(p => p.name);
    // Since checkInteractions needs 2+ names, we'll manually summarize hardcoded warnings from the DB
    context += "Avoid combining multiple GLP-1s (e.g., Semaglutide + Tirzepatide) due to extreme hypoglycemia risk.\n";
    context += "Avoid combining multiple secretagogues of the same class (e.g. two GHRPs like Ipamorelin + GHRP-6).\n";
    
    return context;
}
