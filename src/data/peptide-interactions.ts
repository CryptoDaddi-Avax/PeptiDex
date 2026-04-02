import { peptides } from "./peptides";

export interface InteractionResult {
    peptide_a: string;
    peptide_b: string;
    type: "synergy" | "caution" | "contraindicated";
    notes_a?: string;
    notes_b?: string;
}

export function checkInteractions(selectedNames: string[]): InteractionResult[] {
    const results: InteractionResult[] = [];
    const seen = new Set<string>();

    for (let i = 0; i < selectedNames.length; i++) {
        for (let j = i + 1; j < selectedNames.length; j++) {
            const nameA = selectedNames[i];
            const nameB = selectedNames[j];
            const key = [nameA, nameB].sort().join("|");
            if (seen.has(key)) continue;
            seen.add(key);

            const pepA = peptides.find((p) => p.name === nameA);
            const pepB = peptides.find((p) => p.name === nameB);
            if (!pepA || !pepB) continue;

            // Check A's interactions referencing B
            if (pepA.interactions) {
                if (pepA.interactions.synergies.includes(nameB)) {
                    results.push({ peptide_a: nameA, peptide_b: nameB, type: "synergy", notes_a: pepA.interactions.notes });
                    continue;
                }
                if (pepA.interactions.contraindicated.includes(nameB)) {
                    results.push({ peptide_a: nameA, peptide_b: nameB, type: "contraindicated", notes_a: pepA.interactions.notes });
                    continue;
                }
                if (pepA.interactions.cautions.includes(nameB)) {
                    results.push({ peptide_a: nameA, peptide_b: nameB, type: "caution", notes_a: pepA.interactions.notes });
                    continue;
                }
            }

            // Check B's interactions referencing A
            if (pepB.interactions) {
                if (pepB.interactions.synergies.includes(nameA)) {
                    results.push({ peptide_a: nameA, peptide_b: nameB, type: "synergy", notes_b: pepB.interactions.notes });
                    continue;
                }
                if (pepB.interactions.contraindicated.includes(nameA)) {
                    results.push({ peptide_a: nameA, peptide_b: nameB, type: "contraindicated", notes_b: pepB.interactions.notes });
                    continue;
                }
                if (pepB.interactions.cautions.includes(nameA)) {
                    results.push({ peptide_a: nameA, peptide_b: nameB, type: "caution", notes_b: pepB.interactions.notes });
                    continue;
                }
            }
        }
    }

    return results.sort((a, b) => {
        const order = { contraindicated: 0, caution: 1, synergy: 2 };
        return order[a.type] - order[b.type];
    });
}
