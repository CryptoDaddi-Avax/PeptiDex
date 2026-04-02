const fs = require('fs');
let c = fs.readFileSync('src/data/peptides.ts', 'utf8');
const r = {
    'â”€â”€â”€': '───',
    'ðŸ›¡ï¸ ': '🛡️',
    'ðŸ§¬': '🧬',
    'ðŸ’‰': '💉',
    'âš¡': '⚡',
    'ðŸ§ ': '🧠',
    'ðŸ§ ': '🧠',
    'ðŸŒŸ': '🌟',
    'âœ¨': '✨',
    'ðŸ”¬': '🔬',
    'ðŸŽ¨': '🎨',
    'ðŸ’¤': '💤',
    'ðŸ”¥': '🔥',
    'ðŸ©¹': '🩹',
    'ðŸ’ª': '💪',
    'TÎ²4': 'Tβ4',
    'TÎ±1': 'Tα1',
    'Î±': 'α',
    'Î²': 'β',
    'Î³': 'γ',
    'Âµ': 'µ',
    'ÃƒÂ¢Ã¢Â€Â Ã¢Â€Â™': '→',
    'ÃƒÂŽÃ‚Â²': 'β',
    'ÃƒÂŽÃ‚Â±': 'α',
    'â€”': '—'
};
for (const [b, g] of Object.entries(r)) {
    c = c.split(b).join(g);
}
fs.writeFileSync('src/data/peptides.ts', c);
console.log('Fixed strings!');
