const fs = require('fs');

let content = fs.readFileSync('src/data/blog.ts', 'utf8');

// 1. Add imageAlt to interface
content = content.replace(
  '  image: string | null;    // path to featured image or null\n  tags: string[];',
  '  image: string | null;    // path to featured image or null\n  imageAlt?: string;       // Descriptive alt text with primary keyword\n  tags: string[];'
);

const altTexts = {
  'semaglutide-vs-tirzepatide': 'Scientific comparison diagram of semaglutide and tirzepatide peptide molecular structures for weight loss research',
  'retatrutide-explained': 'Futuristic triple-helix molecular structure representing the retatrutide triple agonist peptide mechanism',
  'are-peptides-safe': 'Laboratory safety concept showing a protected peptide solution highlighting research peptide safety and purity',
  'best-peptides-for-muscle-growth': 'Anatomical silhouette with growth hormone pathways demonstrating the best peptides for muscle growth like CJC-1295 and Ipamorelin',
  'mk-677-vs-ipamorelin': 'Comparison of a pill capsule and syringe representing oral MK-677 vs injectable Ipamorelin growth hormone secretagogues',
  'cjc-1295-vs-sermorelin': 'Pituitary gland receiving different growth hormone releasing signals demonstrating CJC-1295 vs Sermorelin mechanisms',
  'peptide-stacking-guide': 'Glowing molecular test tubes visualizing a peptide stacking protocol for safe combination research',
  'mots-c-mitochondrial-peptide': 'Glowing mitochondria emitting energy waves demonstrating the MOTS-c mitochondrial peptide mechanism',
  'oral-vs-injectable-peptides': 'Split visualization comparing oral pill absorption barriers versus injectable peptide bloodstream delivery',
  'fda-peptide-reclassification-2026': 'Scales of justice intertwined with peptide molecular structures representing the FDA peptide reclassification 2026 regulation',
  'bpc-157-vs-tb-500': 'Molecular comparison diagram of BPC-157 and TB-500 peptide structures for tissue repair research',
  'best-peptides-for-fat-loss': 'Lipid oxidation molecular pathways representing the best peptides for fat loss like GLP-1 and AOD-9604',
  'how-to-read-a-peptide-coa': 'HPLC and Mass spectrometry readouts illustrating how to read a peptide COA for quality sourcing',
  'ipamorelin-vs-cjc-1295': 'Endogenous growth hormone pulses representing the Ipamorelin and CJC-1295 peptide stack comparison',
  'best-peptide-vendors-2026': 'Secure scientific crate representing safe sourcing from the best peptide vendors 2026'
};

for (const [slug, alt] of Object.entries(altTexts)) {
    const slugRegex = new RegExp(`slug:\\s*'${slug}'.*?image:\\s*('[^']+'|null),`, 's');
    content = content.replace(slugRegex, (match, imageVal) => {
        return match + `\n    imageAlt: '${alt}',`;
    });
}

fs.writeFileSync('src/data/blog.ts', content);
console.log('Updated blog.ts with imageAlt fields.');
