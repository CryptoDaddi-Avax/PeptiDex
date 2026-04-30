const fs = require('fs');
const path = require('path');
const https = require('https');

const API_DELAY = 350;

async function fetchPubMedStudies(term, maxResults = 20) {
  return new Promise((resolve, reject) => {
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmode=json&retmax=${maxResults}&sort=relevance`;
    https.get(searchUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const ids = parsed.esearchresult.idlist;
          if (!ids || ids.length === 0) return resolve([]);
          
          const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
          setTimeout(() => {
            https.get(summaryUrl, (sumRes) => {
              let sumData = '';
              sumRes.on('data', (chunk) => { sumData += chunk; });
              sumRes.on('end', () => {
                try {
                  const sumParsed = JSON.parse(sumData);
                  const studies = [];
                  for (const id of ids) {
                    const doc = sumParsed.result[id];
                    if (doc) {
                      studies.push({
                        title: doc.title || 'Untitled Study',
                        pubmed_url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
                        summary: `A study published in ${doc.fulljournalname || doc.source} investigating the effects and mechanisms.`,
                        evidence_level: determineEvidenceLevel(doc.title)
                      });
                    }
                  }
                  resolve(studies);
                } catch (e) {
                  reject(e);
                }
              });
            }).on('error', reject);
          }, API_DELAY);
          
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function determineEvidenceLevel(title) {
  title = title.toLowerCase();
  if (title.includes('review') || title.includes('meta-analysis')) return 'review';
  if (title.includes('clinical') || title.includes('trial') || title.includes('patient') || title.includes('human')) return 'clinical';
  if (title.includes('case')) return 'case-study';
  if (title.includes('mice') || title.includes('rat') || title.includes('animal') || title.includes('in vitro') || title.includes('model')) return 'preclinical';
  return 'mechanism';
}

function extractStudiesCount(studiesBlock) {
  return (studiesBlock.match(/pubmed_url/g) || []).length;
}

async function processPeptides() {
  const filePath = path.join(__dirname, '../src/data/peptides.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  const peptideBlocks = content.split(/p\(\s*\{/);
  const head = peptideBlocks[0]; // before the first p({
  
  const updates = [];
  
  for (let i = 1; i < peptideBlocks.length; i++) {
    let block = peptideBlocks[i];
    
    // Extract name
    const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
    if (!nameMatch) continue;
    const name = nameMatch[1];
    
    // Find key_studies array
    const studiesMatch = block.match(/key_studies:\s*\[([\s\S]*?)\]/);
    if (!studiesMatch) continue;
    
    const studiesBlock = studiesMatch[1];
    const count = extractStudiesCount(studiesBlock);
    
    if (count < 14) {
      console.log(`Need to fetch for ${name} (${count} studies)`);
      updates.push({ index: i, name, currentCount: count, block, studiesBlock, studiesMatchStart: studiesMatch.index, studiesMatchEnd: studiesMatch.index + studiesMatch[0].length });
    } else {
      console.log(`Skipping ${name} (${count} studies)`);
    }
  }

  for (const update of updates) {
    console.log(`Fetching studies for ${update.name}...`);
    try {
      const searchTerm = `"${update.name}" AND (peptide OR clinical OR mechanism OR trial)`;
      const studies = await fetchPubMedStudies(searchTerm, 20);
      
      console.log(`Found ${studies.length} studies for ${update.name}`);
      
      const newStudiesStrings = studies.slice(update.currentCount).map(s => {
        return `
      {
        title: "${s.title.replace(/"/g, '\\"')}",
        pubmed_url: "${s.pubmed_url}",
        summary: "${s.summary}",
        evidence_level: "${s.evidence_level}"
      }`;
      });
      
      if (newStudiesStrings.length > 0) {
        let newBlock = update.studiesBlock;
        if (newBlock.trim() !== '') {
          if (!newBlock.trim().endsWith(',')) {
            newBlock += ',';
          }
        }
        newBlock += newStudiesStrings.join(',');
        
        const newFullMatch = update.block.replace(update.studiesBlock, newBlock);
        peptideBlocks[update.index] = newFullMatch;
      }
      
    } catch (e) {
      console.error(`Error processing ${update.name}:`, e.message);
    }
    
    await new Promise(r => setTimeout(r, API_DELAY));
  }

  content = head + peptideBlocks.slice(1).map(b => 'p({' + b).join('');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Finished updating peptides.ts');
}

processPeptides().catch(console.error);
