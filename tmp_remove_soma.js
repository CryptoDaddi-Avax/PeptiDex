const fs = require('fs');

const file = 'c:\\Users\\ender\\.gemini\\antigravity\\peptide-app\\src\\data\\pricing.ts';
let content = fs.readFileSync(file, 'utf8');

// The pattern to match the Soma Chems object, including the comma before it
const regex = /,\s*\{\s*vendor:\s*"Soma Chems"[^}]+\}/g;
content = content.replace(regex, '');

fs.writeFileSync(file, content);
console.log('Removed Soma Chems from pricing.ts');
