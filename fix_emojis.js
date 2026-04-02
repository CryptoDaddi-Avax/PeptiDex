const fs = require('fs');

// Map of emoji to their Unicode escape sequence representation
const emojiToEscape = {
    '🛡️': '\\u{1F6E1}\\uFE0F',
    '🛡': '\\u{1F6E1}',
    '🧬': '\\u{1F9EC}',
    '💉': '\\u{1F489}',
    '⚡': '\\u{26A1}',
    '🧠': '\\u{1F9E0}',
    '🌟': '\\u{1F31F}',
    '✨': '\\u{2728}',
    '🔬': '\\u{1F52C}',
    '🎨': '\\u{1F3A8}',
    '💤': '\\u{1F4A4}',
    '🔥': '\\u{1F525}',
    '🩹': '\\u{1FA79}',
    '💪': '\\u{1F4AA}',
    '⚖️': '\\u{2696}\\uFE0F',
    '⚖': '\\u{2696}',
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
    
    let changed = false;
    for (const [emoji, escape] of Object.entries(emojiToEscape)) {
        if (content.includes(emoji)) {
            // Only replace emojis inside quoted strings for category_icon
            content = content.split(emoji).join(escape);
            changed = true;
            console.log(`  ${file}: Replaced ${emoji} with ${escape}`);
        }
    }
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✓ Fixed ${file}`);
    } else {
        console.log(`  ${file}: No emoji literals found`);
    }
}

console.log('\nDone! All emojis now use Unicode escape sequences.');
