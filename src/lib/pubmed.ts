import { tool } from 'ai';
import { z } from 'zod';

export const searchPubMed = tool({
  description: 'Search the NCBI PubMed clinical trials and literature database. Use this automatically if a user asks about a peptide, disease, condition, or mechanism that is NOT found in the PEPTIDEX DATABASE, so you can synthesize a medically accurate summary without hallucinating.',
  parameters: z.object({
    query: z.string().describe('The name of the chemical, peptide, or condition to search for on PubMed.'),
  }),
  execute: async ({ query }) => {
    try {
      console.log(`[PubMed Tool] Searching for: ${query}`);
      // 1. Fetch top 3 IDs
      const searchRes = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmode=json&retmax=3`);
      const searchData = await searchRes.json();
      const ids = searchData.esearchresult?.idlist || [];
      
      if (ids.length === 0) {
        return { error: `No clinical research found on PubMed for '${query}'.` };
      }

      // 2. Fetch full XML data for abstracts
      const fetchRes = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids.join(',')}&retmode=xml`);
      const xml = await fetchRes.text();

      // 3. Simple RegEx parser for the XML to extract Title and Abstract
      // (Using RegEx instead of full XML parser for edge/serverless compatibility and speed)
      const articles = xml.split(/<PubmedArticle>/i).slice(1);
      const results = articles.map(article => {
        const titleMatch = article.match(/<ArticleTitle[^>]*>([\s\S]*?)<\/ArticleTitle>/i);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Unknown Title';
        
        let abstract = '';
        // Some abstracts are split into multiple <AbstractText> tags natively
        const abstractMatches = [...article.matchAll(/<AbstractText[^>]*>([\s\S]*?)<\/AbstractText>/gi)];
        if (abstractMatches.length > 0) {
           abstract = abstractMatches.map(m => m[1].replace(/<[^>]+>/g, '')).join(' ');
        } else {
           abstract = "No abstract available.";
        }

        return { title, abstract };
      });

      return {
        query,
        literature_results: results
      };
    } catch (e) {
      console.error("[PubMed Tool] Fetch Error:", e);
      return { error: `Failed to fetch literature from PubMed: ${(e as Error).message}` };
    }
  }
});
