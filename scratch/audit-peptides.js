const fs = require('fs');
const content = fs.readFileSync('src/data/peptides.ts', 'utf8');

// Extract peptide blocks
const blocks = content.split(/\n  p\(\{/).slice(1);
const peptides = [];

for (const block of blocks) {
  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  const catMatch = block.match(/category:\s*"([^"]+)"/);
  const hlMatch = block.match(/half_life_hours:\s*(\d+(?:\.\d+)?)/);
  const hasDosing = /dosing:\s*\{/.test(block);
  const hasInteractions = /interactions:\s*\{/.test(block);
  const studyCount = (block.match(/pubmed_url:/g) || []).length;
  const hasMech = /mechanism:/.test(block);
  const hasBenefits = /primary_benefits:/.test(block);
  const hasSideEffects = /side_effects:\s*\[/.test(block);
  const hasLayperson = /laypersonSummary:/.test(block);
  
  if (nameMatch) {
    peptides.push({
      name: nameMatch[1],
      category: catMatch ? catMatch[1] : '?',
      halfLife: hlMatch ? hlMatch[1] : null,
      dosing: hasDosing,
      interactions: hasInteractions,
      studies: studyCount,
      mechanism: hasMech,
      benefits: hasBenefits,
      sideEffects: hasSideEffects,
      layperson: hasLayperson,
    });
  }
}

console.log(`Total peptides: ${peptides.length}\n`);
console.log('Name | Category | Half-Life | Dosing | Interactions | Studies | Mechanism | SideEffects');
console.log('-'.repeat(120));
peptides.forEach(p => {
  console.log(`${p.name.padEnd(20)} | ${p.category.padEnd(18)} | ${(p.halfLife||'?').toString().padEnd(9)} | ${p.dosing?'Y':'N'}      | ${p.interactions?'Y':'N'}            | ${String(p.studies).padEnd(7)} | ${p.mechanism?'Y':'N'}         | ${p.sideEffects?'Y':'N'}`);
});

// Summary
const withHL = peptides.filter(p => p.halfLife).length;
const withDosing = peptides.filter(p => p.dosing).length;
const withInteractions = peptides.filter(p => p.interactions).length;
const withSE = peptides.filter(p => p.sideEffects).length;
const withLayperson = peptides.filter(p => p.layperson).length;
const rich = peptides.filter(p => p.halfLife && p.dosing && p.studies >= 2 && p.mechanism && p.sideEffects);

console.log('\n--- FIELD COVERAGE ---');
console.log(`Half-life: ${withHL}/${peptides.length}`);
console.log(`Dosing: ${withDosing}/${peptides.length}`);
console.log(`Interactions: ${withInteractions}/${peptides.length}`);
console.log(`Side effects: ${withSE}/${peptides.length}`);
console.log(`Layperson: ${withLayperson}/${peptides.length}`);
console.log(`"Rich" (HL+dosing+2+studies+mech+SE): ${rich.length}/${peptides.length}`);
console.log('\nRich peptides:');
rich.forEach(p => console.log(`  ${p.name} (${p.category}, ${p.studies} studies)`));
