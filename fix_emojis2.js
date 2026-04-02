// This script fixes emoji encoding by writing ACTUAL Unicode bytes
// instead of escape sequences or literal emojis that get mangled.
const fs = require('fs');

const ICONS = {
    "Body Protective Compound": String.fromCodePoint(0x1F6E1, 0xFE0F),
    "Thymosin Beta-4 Fragment": String.fromCodePoint(0x1F9EC),
    "GHRH Analog": String.fromCodePoint(0x1F489),
    "GHRP": String.fromCodePoint(0x26A1),
    "Cognitive Peptide": String.fromCodePoint(0x1F9E0),
    "Anxiolytic Peptide": String.fromCodePoint(0x1F31F),
    "Copper Peptide": String.fromCodePoint(0x2728),
    "GH Fragment": String.fromCodePoint(0x1F52C),
    "Mitochondrial Peptide": String.fromCodePoint(0x26A1),
    "Telomerase Activator": String.fromCodePoint(0x1F9EC),
    "Immune Peptide": String.fromCodePoint(0x1F6E1, 0xFE0F),
    "Melanocortin Agonist": String.fromCodePoint(0x1F3A8),
    "Sleep Peptide": String.fromCodePoint(0x1F4A4),
    "Triple Agonist (GLP-1/GIP/Glucagon)": String.fromCodePoint(0x1F525),
    "Dual Agonist (GLP-1/GIP)": String.fromCodePoint(0x1F525),
    "GLP-1 Agonist": String.fromCodePoint(0x1F525),
    "Growth Factor": String.fromCodePoint(0x1F489),
    "Anti-Inflammatory": String.fromCodePoint(0x1FA79),
    "Longevity": String.fromCodePoint(0x26A1),
    "Neurotrophic": String.fromCodePoint(0x1F9E0),
    "Myostatin Inhibitor": String.fromCodePoint(0x1F4AA),
    "Antioxidant": String.fromCodePoint(0x1F6E1, 0xFE0F),
    "Metabolic": String.fromCodePoint(0x2696, 0xFE0F),
    // Blend categories
    "Healing & Recovery": String.fromCodePoint(0x1FA79),
    "Growth Hormone": String.fromCodePoint(0x1F489),
    "Cognitive Enhancement": String.fromCodePoint(0x1F9E0),
    "Gut Health": String.fromCodePoint(0x1F6E1, 0xFE0F),
    "Anti-Aging & Longevity": String.fromCodePoint(0x1F9EC),
    "Immune Support": String.fromCodePoint(0x1F6E1, 0xFE0F),
    "Energy & Mitochondrial": String.fromCodePoint(0x26A1),
    "Sleep & Recovery": String.fromCodePoint(0x1F4A4),
};

const files = [
    'src/data/peptides.ts',
    'src/data/blends.ts',
];

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove BOM if present
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    
    let changeCount = 0;
    
    for (const [category, emoji] of Object.entries(ICONS)) {
        // Escape category for regex
        const escapedCat = category.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        // Match: category: "XXX", followed by category_icon: "ANYTHING"
        const regex = new RegExp(
            `(category:\\s*"${escapedCat}",\\s*category_icon:\\s*)"[^"]*"`,
            'g'
        );
        const before = content;
        content = content.replace(regex, `$1"${emoji}"`);
        if (content !== before) {
            changeCount++;
        }
    }
    
    // Write as UTF-8 with BOM to force correct encoding
    fs.writeFileSync(file, '\uFEFF' + content, 'utf8');
    console.log(`${file}: ${changeCount} categories fixed`);
}

// Verify by reading back
for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/category_icon:\s*"([^"]*)"/g) || [];
    console.log(`\n${file} icons:`);
    matches.forEach(m => {
        const val = m.match(/"([^"]*)"/)[1];
        const hex = [...val].map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ');
        console.log(`  ${m}  =>  codepoints: ${hex}`);
    });
}
