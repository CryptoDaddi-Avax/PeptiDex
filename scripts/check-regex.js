const fs = require('fs');
const content = fs.readFileSync('src/data/peptides.ts', 'utf8');

// The file exports an array `export const peptides: PeptideData[] = [`
// We need a robust regex or we can just parse it using ts-node if available.
// Let's try simple regex just to list names and counts.
const peptideRegex = /slug:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"][\s\S]*?key_studies:\s*\[([\s\S]*?)\]/g;
let match;
const peptides = [];

while ((match = peptideRegex.exec(content)) !== null) {
  const name = match[2];
  const studiesBlock = match[3];
  const count = (studiesBlock.match(/\{/g) || []).length;
  peptides.push(`${name}: ${count}`);
}

console.log(peptides.join('\n'));
