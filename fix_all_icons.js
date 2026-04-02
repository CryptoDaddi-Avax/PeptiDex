// Comprehensive fix: Update ALL component files to use getCategoryIcon()
// instead of p.category_icon, AND fix other mojibake text in UI files.
const fs = require('fs');
const path = require('path');

// List of all files that reference category_icon in components
const componentFiles = [
    'src/app/tools/pk/page.tsx',
    'src/app/tools/halflife/page.tsx',
    'src/app/tools/interactions/page.tsx',
    'src/app/tools/compare/page.tsx',
    'src/app/tools/coa/page.tsx',
    'src/app/tools/calculator/page.tsx',
    'src/app/tools/bloodwork/page.tsx',
    'src/app/tracker/page.tsx',
    'src/app/protocol/page.tsx',
    'src/app/library/blends/[slug]/page.tsx',
    'src/app/library/blends/page.tsx',
    'src/app/glossary/page.tsx',
    'src/app/best/[slug]/page.tsx',
];

// Also fix the peptide-card and advisor-engine
const dataFiles = [
    'src/components/peptide-card.tsx',
    'src/data/advisor-engine.ts',
];

const allFiles = [...componentFiles, ...dataFiles];

let totalChanges = 0;

for (const file of allFiles) {
    if (!fs.existsSync(file)) {
        console.log(`  SKIP: ${file} not found`);
        continue;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    const origContent = content;
    
    // 1. Add import for getCategoryIcon if not already present
    if (content.includes('category_icon') && !content.includes('getCategoryIcon')) {
        // Find the last import line
        const lines = content.split('\n');
        let lastImportIdx = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import ')) {
                lastImportIdx = i;
            }
        }
        if (lastImportIdx >= 0) {
            lines.splice(lastImportIdx + 1, 0, 'import { getCategoryIcon } from "@/data/category-icons";');
            content = lines.join('\n');
            changed = true;
        }
    }
    
    // 2. Replace common patterns of category_icon usage
    const replacements = [
        // Pattern: {p.category_icon}  or  {peptide.category_icon}  or  {pep.category_icon}  or {pep?.category_icon}
        [/\{(\w+)\.category_icon\}/g, '{getCategoryIcon($1.category)}'],
        [/\{(\w+)\?\.category_icon\}/g, '{getCategoryIcon($1?.category || "")}'],
        // Pattern: ${peptide.category_icon || "..."} in template literals
        [/\$\{(\w+)\.category_icon\s*\|\|\s*"[^"]*"\}/g, '${getCategoryIcon($1.category)}'],
        [/\$\{(\w+)\.category_icon\s*\|\|\s*""\}/g, '${getCategoryIcon($1.category)}'],
        // Pattern: ${p.category_icon} in template literals
        [/\$\{(\w+)\.category_icon\}/g, '${getCategoryIcon($1.category)}'],
        // Pattern: {pep?.category_icon ?? "..."}
        [/\{(\w+)\?\.category_icon\s*\?\?\s*"[^"]*"\}/g, '{getCategoryIcon($1?.category || "")}'],
    ];
    
    for (const [regex, replacement] of replacements) {
        const before = content;
        content = content.replace(regex, replacement);
        if (content !== before) changed = true;
    }
    
    // 3. Fix other mojibake patterns found in various files
    const mojibakeFixes = [
        ['Ã¢ÂÂ±', '\u{23F1}\uFE0F'],  // ⏱️ 
        ['Ã°Å¸âË', '\u{1F4C8}'],       // 📈
        ['Ã°Å¸ââ', '\u{1F504}'],       // 🔄
        ['Ã¢Åâ¦', '\u{2705}'],          // ✅
        ['ÃƒÂ¢Ã¢Â€Â Ã¢Â€Â™', '\u2192'], // →
        ['âš ï¸', '\u26A0\uFE0F'],       // ⚠️
        ['ðŸ"‹', '\u{1F4CB}'],            // 📋
        // em-dash and special chars
        ['Ã¢ÂÂ', '\u2014'],              // —
    ];
    
    for (const [bad, good] of mojibakeFixes) {
        if (content.includes(bad)) {
            content = content.split(bad).join(good);
            changed = true;
        }
    }
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        totalChanges++;
        console.log(`  FIXED: ${file}`);
    } else {
        console.log(`  OK: ${file} (no changes needed)`);
    }
}

console.log(`\nDone! Fixed ${totalChanges} files.`);
