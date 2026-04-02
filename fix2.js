const fs = require('fs');
let c = fs.readFileSync('src/data/peptides.ts', 'utf8');

const icons = {
  'Body Protective Compound': '🛡️',
  'Thymosin Beta-4 Fragment': '🧬',
  'GHRH Analog': '💉',
  'GHRP': '⚡',
  'Cognitive Peptide': '🧠',
  'Anxiolytic Peptide': '🌟',
  'Copper Peptide': '✨',
  'GH Fragment': '🔬',
  'Mitochondrial Peptide': '⚡',
  'Telomerase Activator': '🧬',
  'Immune Peptide': '🛡️',
  'Melanocortin Agonist': '🎨',
  'Sleep Peptide': '💤',
  'Triple Agonist (GLP-1/GIP/Glucagon)': '🔥',
  'Dual Agonist (GLP-1/GIP)': '🔥',
  'GLP-1 Agonist': '🔥',
  'Anti-Inflammatory': '🩹',
  'Neurotrophic': '🧠',
  'Myostatin Inhibitor': '💪',
  'Growth Factor': '💉',
  'Longevity': '⚡',
  'Antioxidant': '🛡️',
  'Metabolic': '⚖️'
};

for (let [cat, emoji] of Object.entries(icons)) {
    // Escape special characters in category name
    let escapedCat = cat.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let regex = new RegExp(`(category:\\s*"${escapedCat}",\\s*category_icon:\\s*)".*?"`, 'g');
    c = c.replace(regex, `$1"${emoji}"`);
}

// Fix other text mojibakes safely
c = c.replace(/TÎ²4/g, 'Tβ4');
c = c.replace(/TÎ±1/g, 'Tα1');
c = c.replace(/ÃƒÂ¢Ã¢Â€Â Ã¢Â€Â™/g, '→');
c = c.replace(/IL-1ÃƒÂŽÃ‚Â², IL-6, TNF-ÃƒÂŽÃ‚Â±/g, 'IL-1β, IL-6, TNF-α');
c = c.replace(/IL-1Î², IL-6, IL-12, TNF-Î±, and IFN-Î³/g, 'IL-1β, IL-6, IL-12, TNF-α, and IFN-γ');
c = c.replace(/1993â€“2024/g, '1993-2024');

fs.writeFileSync('src/data/peptides.ts', c);
console.log('Fixed categories!');
