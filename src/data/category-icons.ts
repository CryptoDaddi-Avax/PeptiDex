/**
 * Category icon mapping — uses Unicode escape sequences to avoid file encoding issues.
 * These are resolved at compile time by TypeScript, so encoding of this file doesn't matter
 * as long as the escape sequences (pure ASCII) are preserved.
 */

const CATEGORY_ICONS: Record<string, string> = {
    "Body Protective Compound": "\u{1F6E1}\uFE0F",   // 🛡️
    "Thymosin Beta-4 Fragment": "\u{1F9EC}",           // 🧬
    "GHRH Analog": "\u{1F489}",                        // 💉
    "GHRP": "\u{26A1}",                                // ⚡
    "Cognitive Peptide": "\u{1F9E0}",                   // 🧠
    "Anxiolytic Peptide": "\u{1F31F}",                  // 🌟
    "Copper Peptide": "\u{2728}",                       // ✨
    "GH Fragment": "\u{1F52C}",                         // 🔬
    "Mitochondrial Peptide": "\u{26A1}",                // ⚡
    "Telomerase Activator": "\u{1F9EC}",                // 🧬
    "Immune Peptide": "\u{1F6E1}\uFE0F",               // 🛡️
    "Melanocortin Agonist": "\u{1F3A8}",                // 🎨
    "Sleep Peptide": "\u{1F4A4}",                       // 💤
    "Triple Agonist (GLP-1/GIP/Glucagon)": "\u{1F525}", // 🔥
    "Dual Agonist (GLP-1/GIP)": "\u{1F525}",            // 🔥
    "GLP-1 Agonist": "\u{1F525}",                       // 🔥
    "Growth Factor": "\u{1F489}",                        // 💉
    "Anti-Inflammatory": "\u{1FA79}",                    // 🩹
    "Longevity": "\u{26A1}",                             // ⚡
    "Neurotrophic": "\u{1F9E0}",                         // 🧠
    "Myostatin Inhibitor": "\u{1F4AA}",                  // 💪
    "Antioxidant": "\u{1F6E1}\uFE0F",                   // 🛡️
    "Metabolic": "\u{2696}\uFE0F",                       // ⚖️
    // Blend categories
    "Healing & Recovery": "\u{1FA79}",                   // 🩹
    "Growth Hormone": "\u{1F489}",                       // 💉
    "Cognitive Enhancement": "\u{1F9E0}",                // 🧠
    "Gut Health": "\u{1F6E1}\uFE0F",                    // 🛡️
    "Anti-Aging & Longevity": "\u{1F9EC}",               // 🧬
    "Immune Support": "\u{1F6E1}\uFE0F",                // 🛡️
    "Energy & Mitochondrial": "\u{26A1}",                // ⚡
    "Sleep & Recovery": "\u{1F4A4}",                     // 💤
};

/** Get the icon for a category, with fallback */
export function getCategoryIcon(category: string): string {
    return CATEGORY_ICONS[category] || "\u{1F9EC}"; // default: 🧬
}

export default CATEGORY_ICONS;
