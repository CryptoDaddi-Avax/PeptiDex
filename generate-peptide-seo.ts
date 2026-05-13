import * as fs from 'fs';
import * as path from 'path';
import { peptides } from './src/data/peptides';

interface PeptideSEO {
  title: string;
  metaDescription: string;
  h1: string;
  faq: {
    q: string;
    a: string;
  }[];
}

const seoData: Record<string, PeptideSEO> = {};
const flagged: string[] = [];

// Helper to truncate safely
function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.substring(0, max - 3).trim() + '...';
}

for (const peptide of peptides) {
  const name = peptide.name;
  let flagReason = '';

  // 1. Title
  let title = `${name}: Research Profile, Dosage & Studies | PeptiDex`;
  if (title.length > 60) {
    title = `${name}: Research Profile & Dosage | PeptiDex`;
  }
  if (title.length > 60) {
    title = `${name}: Research Profile | PeptiDex`;
  }

  // 2. Meta description (140-155 chars)
  const isStr = peptide.category.toLowerCase();
  const researchStr = peptide.primary_benefits ? peptide.primary_benefits.toLowerCase() : 'therapeutic applications';
  
  const angle = "Use our free reconstitution calculator, check half-life data, and compare COA-verified vendors.";
  
  let desc = `${name} is a ${isStr} researched for ${researchStr}. ${angle}`;
  
  if (desc.length < 140) {
    desc = `${name} is a ${isStr} primarily researched for ${researchStr}. ${angle} For educational reference.`;
  } else if (desc.length > 155) {
    // try shorter angle
    const shortAngle = "Use our free reconstitution calculator & compare verified vendors.";
    desc = `${name} is a ${isStr} researched for ${researchStr}. ${shortAngle}`;
    if (desc.length > 155) {
        desc = truncate(desc, 155);
    }
  }

  // 3. H1
  const h1 = `${name}: Research Profile & Mechanism`;

  // 4. FAQ
  // Q1
  let a1 = `${name} is classified as a ${peptide.category.toLowerCase()}. Its mechanism of action involves: ${peptide.mechanism.charAt(0).toLowerCase() + peptide.mechanism.slice(1)}`;
  if (!a1.endsWith('.')) a1 += '.';
  
  // Q2
  let a2 = `In laboratory and preclinical settings, ${name} is researched for its potential effects on ${researchStr}. It is strictly for experimental study and not intended for human consumption.`;
  if (!peptide.primary_benefits) {
    flagReason += 'Missing primary_benefits for Q2. ';
  }

  // Q3
  let a3 = '';
  if (peptide.dosing && peptide.dosing.reconstitution_ml && peptide.dosing.typical_vial_mg) {
    a3 = `Standard research protocol involves reconstituting the ${peptide.dosing.typical_vial_mg}mg vial with ${peptide.dosing.reconstitution_ml}ml of bacteriostatic water. Refer to our reconstitution calculator for precise syringe measurements.`;
  } else {
    a3 = `Reconstitution volume depends on the vial size and desired concentration. Bacteriostatic water is standard. Use our reconstitution calculator to determine exact syringe measurements.`;
    flagReason += 'Missing specific reconstitution data for Q3. ';
  }

  // Q4
  let a4 = '';
  if (peptide.is_fda_approved) {
    a4 = `Yes, ${name} is FDA-approved for specific clinical indications. However, research-grade variants available from peptide vendors are sold strictly for laboratory use and are not approved for human medical use.`;
  } else {
    a4 = `No, ${name} is not FDA-approved. It is classified exclusively as a research chemical and is legally available solely for in-vitro and laboratory experimentation, not for human or animal consumption.`;
  }

  const faq = [
    { q: `What is ${name}?`, a: a1 },
    { q: `What is ${name} researched for?`, a: a2 },
    { q: `How is ${name} reconstituted?`, a: a3 },
    { q: `Is ${name} FDA-approved?`, a: a4 }
  ];

  seoData[peptide.slug] = {
    title,
    metaDescription: desc,
    h1,
    faq
  };

  if (flagReason) {
    flagged.push(`- **${name}**: ${flagReason}`);
  }
}

const outDir = path.join(process.cwd(), 'content');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

fs.writeFileSync(path.join(outDir, 'peptide-seo.json'), JSON.stringify(seoData, null, 2), 'utf-8');

let report = `# Peptide SEO Generation Report\n\nGenerated metadata and FAQs for ${peptides.length} peptides.\n\n`;
if (flagged.length > 0) {
  report += `## Peptides Requiring Human Review (${flagged.length})\n\nThe following peptides lacked sufficient data in the source to generate highly specific FAQ answers and fell back to generalized responses:\n\n${flagged.join('\n')}\n`;
} else {
  report += `All peptides had sufficient source data.\n`;
}

fs.writeFileSync('peptide-seo-report.md', report, 'utf-8');
console.log('Done!');
