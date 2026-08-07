/**
 * PHASE 1 AUDIT: Map peptide profile claims to PMID citations.
 */
const fs = require('fs');

const content = fs.readFileSync('src/data/peptides.ts', 'utf8');
const blocks = content.split(/\n  p\(\{/).slice(1);

const report = [];
let totalClaims = 0;
let highConfidence = 0;
let mediumConfidence = 0;
let noneConfidence = 0;

function extractPmid(url) {
  const m = url.match(/\/(\d+)\/?$/);
  return m ? m[1] : null;
}

function tokenOverlap(text, studyText) {
  const words = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').split(/\s+/).filter(w => w.length > 4);
  const target = studyText.toLowerCase();
  const matches = words.filter(w => target.includes(w));
  return words.length > 0 ? matches.length / words.length : 0;
}

function extractField(block, field) {
  // Try multi-line quoted string
  const re = new RegExp(field + ':\\s*\\n?\\s*"([\\s\\S]*?)"\\s*,?\\s*\\n');
  const m = block.match(re);
  return m ? m[1].replace(/\\"/g, '"').replace(/\\n/g, ' ') : null;
}

for (const block of blocks) {
  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  if (!nameMatch) continue;
  const name = nameMatch[1];
  
  const slugMatch = block.match(/slug:\s*"([^"]+)"/);
  const slug = slugMatch ? slugMatch[1] : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const mechanism = extractField(block, 'mechanism') || '';
  const benefits = extractField(block, 'primary_benefits') || '';
  const safety = extractField(block, 'safety_notes') || '';
  const layperson = extractField(block, 'laypersonSummary') || '';
  
  const halfLifeMatch = block.match(/half_life_hours:\s*(\d+(?:\.\d+)?)/);
  const halfLife = halfLifeMatch ? halfLifeMatch[1] : null;
  
  // Extract studies
  const studies = [];
  const studyRe = /title:\s*"([^"]+)"[\s\S]*?pubmed_url:\s*"([^"]+)"[\s\S]*?summary:\s*\n?\s*"([\s\S]*?)"\s*,?\s*\n\s*evidence_level:\s*"([^"]+)"/g;
  let sm;
  while ((sm = studyRe.exec(block)) !== null) {
    studies.push({
      title: sm[1],
      url: sm[2],
      pmid: extractPmid(sm[2]),
      summary: sm[3].replace(/\\"/g, '"'),
      level: sm[4],
    });
  }
  
  // Timeline claims
  const timelineClaims = [];
  const tlRe = /(week_\w+|month_\w+|long_term):\s*"([^"]+)"/g;
  let tm;
  while ((tm = tlRe.exec(block)) !== null) {
    timelineClaims.push({ period: tm[1], claim: tm[2] });
  }
  
  const peptideClaims = [];
  
  function mapClaim(type, claim) {
    if (!claim || claim.length < 10) return;
    let bestStudy = null;
    let bestScore = 0;
    for (const s of studies) {
      const score = tokenOverlap(claim, s.title + ' ' + s.summary);
      if (score > bestScore) { bestScore = score; bestStudy = s; }
    }
    
    // For half-life, also check for PK keywords
    if (type === 'half_life') {
      for (const s of studies) {
        if (/half.?life|pharmacokinetic|clearance|elimination|plasma concentration/i.test(s.summary + ' ' + s.title)) {
          if (bestScore < 0.4) { bestScore = 0.4; bestStudy = s; }
        }
      }
    }
    
    const confidence = bestScore >= 0.30 ? 'HIGH' : bestScore >= 0.18 ? 'MEDIUM' : 'NONE';
    totalClaims++;
    if (confidence === 'HIGH') highConfidence++;
    else if (confidence === 'MEDIUM') mediumConfidence++;
    else noneConfidence++;
    
    peptideClaims.push({
      type,
      claim: claim.slice(0, 140),
      candidatePmid: bestStudy?.pmid || null,
      candidateTitle: bestStudy?.title?.slice(0, 80) || null,
      score: Math.round(bestScore * 100),
      confidence,
    });
  }
  
  mapClaim('mechanism', mechanism);
  mapClaim('primary_benefits', benefits);
  mapClaim('safety_notes', safety);
  mapClaim('laypersonSummary', layperson);
  if (halfLife) mapClaim('half_life', `Half-life: ${halfLife} hours`);
  for (const tc of timelineClaims) {
    mapClaim(`outcome_${tc.period}`, tc.claim);
  }
  
  report.push({ name, slug, studyCount: studies.length, claims: peptideClaims });
}

// ── SUMMARY ──
console.log('═══════════════════════════════════════════════════════');
console.log('  PEPTIDE PROFILE CITATION AUDIT — PHASE 1');
console.log('═══════════════════════════════════════════════════════');
console.log(`  Total peptides: ${report.length}`);
console.log(`  Total unsupported claims: ${totalClaims}`);
console.log(`  HIGH confidence (mappable): ${highConfidence} (${(highConfidence/totalClaims*100).toFixed(1)}%)`);
console.log(`  MEDIUM confidence (review): ${mediumConfidence} (${(mediumConfidence/totalClaims*100).toFixed(1)}%)`);
console.log(`  NONE (needs rewrite/remove): ${noneConfidence} (${(noneConfidence/totalClaims*100).toFixed(1)}%)`);
console.log('═══════════════════════════════════════════════════════\n');

for (const p of report) {
  const nc = p.claims.filter(c => c.confidence === 'NONE').length;
  const mc = p.claims.filter(c => c.confidence === 'MEDIUM').length;
  const hc = p.claims.filter(c => c.confidence === 'HIGH').length;
  
  console.log(`── ${p.name} (${p.studyCount} studies) — H:${hc} M:${mc} N:${nc} ──`);
  for (const c of p.claims) {
    const icon = c.confidence === 'HIGH' ? '✅' : c.confidence === 'MEDIUM' ? '⚠️' : '❌';
    const pmid = c.candidatePmid ? `PMID:${c.candidatePmid}` : '—';
    console.log(`  ${icon} [${c.type}] "${c.claim.slice(0,80)}${c.claim.length>80?'...':''}" → ${pmid} (${c.score}%)`);
  }
}

// Write JSON
fs.writeFileSync('scratch/citation-audit.json', JSON.stringify({ 
  summary: { totalPeptides: report.length, totalClaims, highConfidence, mediumConfidence, noneConfidence },
  peptides: report 
}, null, 2));
console.log('\n→ JSON: scratch/citation-audit.json');
