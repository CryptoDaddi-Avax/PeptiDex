const fs = require('fs');
const content = fs.readFileSync('src/data/peptides.ts', 'utf-8');

const studiesRegex = /evidence_level:\s*["']([^"']+)["']/g;
let match;
let count = 0;
const distribution = {};

while ((match = studiesRegex.exec(content)) !== null) {
  count++;
  const level = match[1];
  distribution[level] = (distribution[level] || 0) + 1;
}

console.log("Total studies:", count);
console.log("Distribution:", distribution);
