import fs from 'fs';
import path from 'path';

// Simple recursive directory walk
const walkSync = (dir: string, filelist: string[] = []): string[] => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      filelist.push(filepath);
    }
  }
  return filelist;
};

const NEXT_SERVER_APP_DIR = path.join(process.cwd(), '.next', 'server', 'app');

function extractJsonLdBlocks(html: string): any[] {
  const blocks: any[] = [];
  const regex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch (e) {
      console.error(`Error parsing JSON-LD block: ${e}`);
      console.error(`Raw block: ${match[1].substring(0, 100)}...`);
    }
  }
  return blocks;
}

function validateSchema(schema: any, filepath: string) {
  let errors: string[] = [];

  if (schema['@context'] !== 'https://schema.org') {
    errors.push('Missing or incorrect @context');
  }

  if (!schema['@type']) {
    errors.push('Missing @type');
    return errors;
  }

  switch (schema['@type']) {
    case 'Organization':
      if (!schema.name) errors.push('Organization missing name');
      if (!schema.url) errors.push('Organization missing url');
      break;
    case 'WebSite':
      if (!schema.name) errors.push('WebSite missing name');
      if (!schema.url) errors.push('WebSite missing url');
      break;
    case 'Article':
      if (!schema.headline) errors.push('Article missing headline');
      if (!schema.datePublished) errors.push('Article missing datePublished');
      if (!schema.author) errors.push('Article missing author');
      break;
    case 'MedicalWebPage':
      if (!schema.name) errors.push('MedicalWebPage missing name');
      if (!schema.url) errors.push('MedicalWebPage missing url');
      if (!schema.lastReviewed) errors.push('MedicalWebPage missing lastReviewed');
      if (!schema.reviewedBy) errors.push('MedicalWebPage missing reviewedBy');
      if (!schema.about) errors.push('MedicalWebPage missing about');
      if (schema.about && schema.about['@type'] === 'Drug') {
         if (!schema.about.name) errors.push('Drug missing name');
         if (!schema.about.legalStatus) errors.push('Drug missing legalStatus');
         else if (schema.about.legalStatus !== "Research chemical, not approved for human use") {
            errors.push('Drug missing exact required legalStatus string');
         }
      }
      break;
    case 'FAQPage':
      if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) errors.push('FAQPage missing mainEntity array');
      break;
    case 'BreadcrumbList':
      if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) errors.push('BreadcrumbList missing itemListElement array');
      break;
    case 'HowTo':
      if (!schema.name) errors.push('HowTo missing name');
      if (!schema.step || !Array.isArray(schema.step)) errors.push('HowTo missing steps array');
      break;
    case 'SoftwareApplication':
      if (!schema.name) errors.push('SoftwareApplication missing name');
      if (!schema.applicationCategory) errors.push('SoftwareApplication missing applicationCategory');
      break;
  }

  return errors;
}

async function run() {
  console.log('Starting site-wide schema validation...\n');
  
  if (!fs.existsSync(NEXT_SERVER_APP_DIR)) {
    console.error('Error: .next/server/app directory not found. Please run `npm run build` first.');
    process.exit(1);
  }

  const htmlFiles = walkSync(NEXT_SERVER_APP_DIR).filter(f => f.endsWith('.html'));
  console.log(`Found ${htmlFiles.length} HTML files to scan.\n`);

  let totalPages = 0;
  let pagesWithSchema = 0;
  let totalSchemas = 0;
  let schemasWithErrors = 0;
  let allErrors: { file: string, type: string, errors: string[] }[] = [];
  
  // For outputting samples
  let samplePeptide: any = null;
  let sampleStack: any = null;
  let sampleBlog: any = null;
  let sampleTool: any = null;

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const relativePath = file.replace(NEXT_SERVER_APP_DIR, '');
    const blocks = extractJsonLdBlocks(html);
    
    totalPages++;

    if (blocks.length > 0) {
      pagesWithSchema++;
      totalSchemas += blocks.length;
      
      let pageHasError = false;
      
      // Collect samples
      if (!samplePeptide && relativePath.includes('peptides/') && !relativePath.includes('index.html')) samplePeptide = blocks;
      if (!sampleStack && relativePath.includes('stacks/') && !relativePath.includes('index.html')) sampleStack = blocks;
      if (!sampleBlog && relativePath.includes('blog/') && !relativePath.includes('index.html')) sampleBlog = blocks;
      if (!sampleTool && relativePath.includes('tools/') && !relativePath.includes('index.html') && relativePath.includes('calculator')) sampleTool = blocks;

      for (const block of blocks) {
        const errors = validateSchema(block, relativePath);
        if (errors.length > 0) {
          allErrors.push({ file: relativePath, type: block['@type'] || 'Unknown', errors });
          pageHasError = true;
          schemasWithErrors++;
        }
      }
    }
  }

  console.log(`Scanned ${totalPages} total pages.`);
  console.log(`Found schema on ${pagesWithSchema} pages.`);
  console.log(`Validated ${totalSchemas} individual JSON-LD blocks.`);
  
  if (allErrors.length === 0) {
    console.log('\n✅ SUCCESS: All JSON-LD schemas validated without errors.\n');
  } else {
    console.log(`\n❌ FAILED: Found ${schemasWithErrors} schemas with errors across ${new Set(allErrors.map(e => e.file)).size} files:\n`);
    for (const error of allErrors) {
      console.log(`File: ${error.file} (@type: ${error.type})`);
      for (const msg of error.errors) {
        console.log(`  - ${msg}`);
      }
      console.log('');
    }
  }

  console.log('--- SAMPLE JSON-LD BLOCKS ---\n');
  if (samplePeptide) console.log('PEPTIDE PAGE SCHEMA:\n', JSON.stringify(samplePeptide, null, 2), '\n');
  if (sampleStack) console.log('STACK PAGE SCHEMA:\n', JSON.stringify(sampleStack, null, 2), '\n');
  if (sampleBlog) console.log('BLOG POST SCHEMA:\n', JSON.stringify(sampleBlog, null, 2), '\n');
  if (sampleTool) console.log('TOOL PAGE SCHEMA:\n', JSON.stringify(sampleTool, null, 2), '\n');

  if (allErrors.length > 0) {
    process.exit(1);
  }
}

run().catch(console.error);
