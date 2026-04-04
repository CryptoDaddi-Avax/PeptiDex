const fs = require('fs');

const overrides = {
    'Retatrutide': { mcg: 2000, freq: '1x/wk', weeks: 12, bac: 2.5, vial: 10 },
    'Tirzepatide': { mcg: 2500, freq: '1x/wk', weeks: 12, bac: 2.5, vial: 10 },
    'Semaglutide': { mcg: 250, freq: '1x/wk', weeks: 12, bac: 2.5, vial: 5 },
    'AOD-9604': { mcg: 300, freq: '7x/wk', weeks: 12, bac: 2.5, vial: 5 },
    'SS-31': { mcg: 4000, freq: '7x/wk', weeks: 4, bac: 2.5, vial: 10 },
    'Ipamorelin': { mcg: 300, freq: '7x/wk', weeks: 8, bac: 2.5, vial: 5 },
    'Sermorelin': { mcg: 300, freq: '7x/wk', weeks: 12, bac: 2.5, vial: 2 },
    'IGF-1 LR3': { mcg: 50, freq: '5x/wk', weeks: 4, bac: 2.5, vial: 1 },
    'Follistatin-344': { mcg: 100, freq: '7x/wk', weeks: 4, bac: 2.5, vial: 1 },
    'MK-677': { mcg: 12500, freq: '7x/wk', weeks: 12, bac: 2.5, vial: 25 },
    'BPC-157': { mcg: 500, freq: '7x/wk', weeks: 8, bac: 2.5, vial: 5 },
    'TB-500': { mcg: 2500, freq: '2x/wk', weeks: 8, bac: 2.5, vial: 5 },
    'KPV': { mcg: 200, freq: '7x/wk', weeks: 8, bac: 2.5, vial: 5 },
    'GHK-Cu': { mcg: 2000, freq: '7x/wk', weeks: 8, bac: 2.5, vial: 50 },
    'Thymosin Alpha-1': { mcg: 1500, freq: '2x/wk', weeks: 12, bac: 2.5, vial: 5 },
    'LL-37': { mcg: 100, freq: '7x/wk', weeks: 6, bac: 2.5, vial: 2 },
    'Epitalon': { mcg: 1000, freq: '7x/wk', weeks: 4, bac: 2.5, vial: 10 },
    'NAD+': { mcg: 50000, freq: '3x/wk', weeks: 8, bac: 2.5, vial: 500 },
    'Semax': { mcg: 300, freq: '7x/wk', weeks: 8, bac: 2.5, vial: 5 },
    'Selank': { mcg: 300, freq: '7x/wk', weeks: 8, bac: 2.5, vial: 5 },
    'DSIP': { mcg: 100, freq: '7x/wk', weeks: 4, bac: 2.5, vial: 5 },
    'Kisspeptin-10': { mcg: 100, freq: '3x/wk', weeks: 8, bac: 2.5, vial: 5 },
    'PT-141': { mcg: 1500, freq: '2x/wk', weeks: 8, bac: 2.5, vial: 10 },
    'Melanotan II': { mcg: 250, freq: '7x/wk', weeks: 4, bac: 2.5, vial: 10 },
};

let content = fs.readFileSync('src/data/peptides.ts', 'utf-8');

for (const [name, data] of Object.entries(overrides)) {
    // Find the definition block for the specific peptide
    const regex = new RegExp(`name:\\s*"${name}"[\\s\\S]*?dosing:\\s*{([^}]+)}`, 'g');
    content = content.replace(regex, (match, dosingInner) => {
        // We matched the entire block up to the dosing object inner content
        // Let's replace the typical_dose_mcg, frequency, cycle_weeks, reconstitution_ml, and typical_vial_mg
        let newDosingInner = dosingInner
            .replace(/typical_dose_mcg:\s*\[\d+,\s*\d+\]/, `typical_dose_mcg: [${data.mcg}, ${data.mcg}]`)
            .replace(/frequency:\s*"[^"]+"/, `frequency: "${data.freq}"`)
            .replace(/cycle_weeks:\s*\[\d+,\s*\d+\]/, `cycle_weeks: [${data.weeks}, ${data.weeks}]`);

        if (newDosingInner.includes('reconstitution_ml:')) {
            newDosingInner = newDosingInner.replace(/reconstitution_ml:\s*[\d.]+/, `reconstitution_ml: ${data.bac}`);
        } else {
            // append before notes
            newDosingInner = newDosingInner.replace(/,\s*notes:/, `, reconstitution_ml: ${data.bac}, notes:`);
        }

        if (newDosingInner.includes('typical_vial_mg:')) {
            newDosingInner = newDosingInner.replace(/typical_vial_mg:\s*[\d.]+/, `typical_vial_mg: ${data.vial}`);
        } else {
            newDosingInner = newDosingInner.replace(/,\s*notes:/, `, typical_vial_mg: ${data.vial}, notes:`);
        }

        return match.replace(dosingInner, newDosingInner);
    });
}

fs.writeFileSync('src/data/peptides.ts', content, 'utf-8');
console.log("Updated dosing defaults in peptides.ts");
