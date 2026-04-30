import { Project, SyntaxKind, ArrayLiteralExpression, ObjectLiteralExpression } from 'ts-morph';
import * as cheerio from 'cheerio';
import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import * as dotenv from 'dotenv';
import { z } from 'zod';
import * as fs from 'fs';

// Load env vars
dotenv.config({ path: '.env.local' });
if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  console.error("Missing GOOGLE_GENERATIVE_AI_API_KEY in .env.local");
  process.exit(1);
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
});

// Configure E-Utilities API key if available
const NCBI_API_KEY = process.env.NCBI_API_KEY || '';
const NCBI_RATE_LIMIT_MS = NCBI_API_KEY ? 110 : 350; // Max 10/s or 3/s

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchFromNCBI(url: string) {
  await delay(NCBI_RATE_LIMIT_MS);
  const finalUrl = NCBI_API_KEY ? `${url}&api_key=${NCBI_API_KEY}` : url;
  const res = await fetch(finalUrl);
  if (!res.ok) {
    if (res.status === 429) {
      console.warn("NCBI Rate limited! Waiting 5s...");
      await delay(5000);
      return fetchFromNCBI(url); // Retry once
    }
    throw new Error(`NCBI fetch failed: ${res.status} ${res.statusText}`);
  }
  return res;
}

async function searchPubMed(query: string, maxResults: number = 30): Promise<string[]> {
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query + ' AND ("1999/01/01"[Date - Publication] : "3000"[Date - Publication]) AND hasabstract[text]')}&retmax=${maxResults}&retmode=json`;
  const res = await fetchFromNCBI(url);
  const data = await res.json();
  return data.esearchresult.idlist || [];
}

async function fetchAbstracts(pmids: string[]) {
  if (pmids.length === 0) return [];
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmids.join(',')}&retmode=xml`;
  const res = await fetchFromNCBI(url);
  const xml = await res.text();
  const $ = cheerio.load(xml, { xmlMode: true });
  
  const results: any[] = [];
  $('PubmedArticle').each((_, article) => {
    const pmid = $(article).find('MedlineCitation > PMID').text();
    const title = $(article).find('ArticleTitle').text();
    const abstract = $(article).find('AbstractText').text();
    
    // Extract year
    let year = $(article).find('PubDate > Year').text();
    if (!year) {
      year = $(article).find('ArticleDate > Year').text();
    }
    if (!year) {
      year = $(article).find('DateCompleted > Year').text();
    }
    
    // Extract pub type to help with evidence level
    const pubTypes: string[] = [];
    $(article).find('PublicationType').each((_, pt) => {
      pubTypes.push($(pt).text());
    });
    
    if (abstract && abstract.length > 50) {
      results.push({ pmid, title, abstract, year, pubTypes: pubTypes.join(', ') });
    }
  });
  return results;
}

const studySchema = z.object({
  summary: z.string().describe("A 1-2 sentence (25-50 words max) summary. Lead with the finding. NO health claims. Include the year. Cite the actual finding."),
  evidence_level: z.enum(["very-strong", "strong", "moderate", "moderate-strong", "preclinical", "emerging", "anecdotal"])
});

async function summarizeStudy(article: any) {
  try {
    const { object, usage } = await generateObject({
      model: google('gemini-3.1-pro-preview'), // Use a robust model
      schema: studySchema,
      prompt: `Analyze the following PubMed abstract and generate a summary for a research peptide database.
      
Rules:
- 1-2 sentences maximum (25-50 words).
- Lead with the finding, not the methodology.
- NEVER make health claims (use "found that", "demonstrated", "investigated").
- Include the year (${article.year}) in the summary (e.g., "In a ${article.year} study...").
- Assign evidence level: 'very-strong' (meta-analysis/RCT), 'strong' (human trial), 'moderate' (small human/pilot), 'preclinical' (animal/in-vitro), 'emerging' (mechanism/early).
- Publication types listed: ${article.pubTypes}
      
Title: ${article.title}
Abstract: ${article.abstract}`
    });
    return { object, usage };
  } catch (error) {
    console.error(`AI Summarization failed for PMID ${article.pmid}`, error);
    return null;
  }
}

const COST_PER_1M_INPUT = 1.25;
const COST_PER_1M_OUTPUT = 5.00;

async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  const targetPeptide = isDryRun ? "BPC-157" : null;

  console.log("Loading ts-morph project...");
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath("src/data/peptides.ts");
  
  const peptidesVar = sourceFile.getVariableDeclarationOrThrow("peptides");
  const peptidesArray = peptidesVar.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
  
  const report: any = [];

  for (const element of peptidesArray.getElements()) {
    if (element.getKind() !== SyntaxKind.CallExpression) continue;
    
    // Extract the object literal argument from p({...})
    const args = (element as any).getArguments();
    if (args.length === 0 || args[0].getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
    
    const obj = args[0] as ObjectLiteralExpression;
    
    // Get basic peptide info
    const nameProp = obj.getProperty("name");
    const aliasesProp = obj.getProperty("aliases");
    const studiesProp = obj.getProperty("key_studies");
    
    if (!nameProp || !studiesProp) {
        console.log("Missing properties. Props:", obj.getProperties().map(p => {
          // Some might be shorthand or method, just wrap in try catch
          try { return (p as any).getName(); } catch(e) { return "unknown"; }
        }));
        continue;
    }
    
    // Quick and dirty value extraction
    const nameStr = nameProp.getText().match(/['"]([^'"]+)['"]/)?.[1] || "";
    const aliasesArray = aliasesProp ? aliasesProp.getFirstDescendantByKind(SyntaxKind.ArrayLiteralExpression) : null;
    let aliases: string[] = [];
    if (aliasesArray) {
       aliases = aliasesArray.getElements().map(e => e.getText().replace(/['"]/g, ''));
    }
    
    if (targetPeptide && nameStr !== targetPeptide) {
        continue;
    }
    
    const peptideQueryTerms = [nameStr, ...aliases].map(a => `"${a}"`).join(" OR ");
    
    console.log(`\nProcessing: ${nameStr}...`);
    
    const existingStudiesArray = studiesProp.getFirstDescendantByKind(SyntaxKind.ArrayLiteralExpression);
    if (!existingStudiesArray) continue;
    
    const existingUrls = existingStudiesArray.getElements().map(e => {
        const urlProp = (e as ObjectLiteralExpression).getProperty("pubmed_url");
        return urlProp ? urlProp.getText() : "";
    });
    
    const currentCount = existingStudiesArray.getElements().length;
    const targetCount = 20;
    const needed = targetCount - currentCount;
    
    if (needed <= 0) {
      console.log(`  Already has ${currentCount} studies. Skipping.`);
      report.push({ name: nameStr, added: 0, total: currentCount });
      continue;
    }
    
    console.log(`  Needs ${needed} studies. Searching NCBI...`);
    let pmids: string[] = [];
    try {
        pmids = await searchPubMed(peptideQueryTerms, needed * 2 + 10);
    } catch (err: any) {
        console.error(`  Error searching NCBI: ${err.message}`);
        report.push({ name: nameStr, error: err.message, added: 0, total: currentCount });
        continue;
    }
    
    // Filter out existing PMIDs
    const newPmids = pmids.filter(pmid => {
      return !existingUrls.some(url => url.includes(pmid));
    }).slice(0, needed);
    
    if (newPmids.length === 0) {
      console.log(`  No new PMIDs found.`);
      report.push({ name: nameStr, added: 0, total: currentCount, note: "Gap: Not enough studies" });
      continue;
    }
    
    console.log(`  Fetching ${newPmids.length} abstracts...`);
    let articles: any[] = [];
    try {
        articles = await fetchAbstracts(newPmids);
    } catch (err: any) {
        console.error(`  Error fetching abstracts: ${err.message}`);
        continue;
    }
    
    console.log(`  Summarizing ${articles.length} articles via Gemini...`);
    let addedCount = 0;
    let totalPromptTokens = 0;
    let totalCompletionTokens = 0;
    
    for (const article of articles) {
      const summaryResult = await summarizeStudy(article);
      if (summaryResult) {
        totalPromptTokens += summaryResult.usage.promptTokens;
        totalCompletionTokens += summaryResult.usage.completionTokens;
        
        // Create new node text
        const newStudyNode = `{
        title: ${JSON.stringify(article.title)},
        pubmed_url: "https://pubmed.ncbi.nlm.nih.gov/${article.pmid}/",
        summary: ${JSON.stringify(summaryResult.object.summary)},
        evidence_level: "${summaryResult.object.evidence_level}"
    }`;
        // Insert node into AST
        existingStudiesArray.addElement(newStudyNode);
        addedCount++;
        
        // Log to console
        console.log(`    + [${summaryResult.object.evidence_level}] PMID ${article.pmid}`);
      }
      
      // Delay slightly for AI limits
      await delay(1000);
    }
    
    const peptideCost = (totalPromptTokens * COST_PER_1M_INPUT + totalCompletionTokens * COST_PER_1M_OUTPUT) / 1000000;
    console.log(`  -> Used ${totalPromptTokens} in, ${totalCompletionTokens} out. Cost: $${peptideCost.toFixed(4)}`);
    
    const finalCount = currentCount + addedCount;
    report.push({ 
        name: nameStr, 
        added: addedCount, 
        total: finalCount,
        cost: peptideCost,
        note: finalCount < 20 ? "Gap documented: Exhausted available PMIDs" : undefined 
    });
    
    // Save periodically to avoid losing everything
    await project.save();
    console.log(`  => CHECKPOINT SAVED to disk for ${nameStr}.`);
    
    if (isDryRun) {
        console.log("\n================ DRY RUN ESTIMATE ================");
        console.log(`Cost for ${nameStr}: $${peptideCost.toFixed(4)}`);
        console.log(`Projected Cost for 33 Peptides: $${(peptideCost * 33).toFixed(4)}`);
        console.log("==================================================");
        return;
    }
  }
  
  console.log("\n================ PHASE A REPORT ================\n");
  console.table(report);
  console.log("\nTotal studies added:", report.reduce((sum: number, r: any) => sum + r.added, 0));
  console.log("Check src/data/peptides.ts for the changes.");
}

main().catch(console.error);
