const fs = require('fs');

let content = fs.readFileSync('src/data/peptides.ts', 'utf8');

content = content.replace(/evidence_level:\s*["']mechanism["']/g, 'evidence_level: "preclinical"');
content = content.replace(/evidence_level:\s*["']review["']/g, 'evidence_level: "moderate"');
content = content.replace(/evidence_level:\s*["']case-study["']/g, 'evidence_level: "anecdotal"');
content = content.replace(/evidence_level:\s*["']clinical["']/g, 'evidence_level: "moderate"');

fs.writeFileSync('src/data/peptides.ts', content);
console.log('Fixed evidence levels.');
