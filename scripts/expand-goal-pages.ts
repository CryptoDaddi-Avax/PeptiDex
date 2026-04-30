import { Project, SyntaxKind, ObjectLiteralExpression } from 'ts-morph';
import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: '.env.local' });
if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  console.error("Missing GOOGLE_GENERATIVE_AI_API_KEY in .env.local");
  process.exit(1);
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
});

const COST_PER_1M_INPUT = 1.25;
const COST_PER_1M_OUTPUT = 5.00;

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const goalContentSchema = z.object({
  deepDive: z.string().describe("500+ words explaining the science, biological mechanisms, and physiology related to this goal. Use high-authority, clinical tone. Return as HTML string with <h2>, <p>, and <ul> tags."),
  clinicalEvidence: z.string().describe("500+ words summarizing top clinical data, trials, and findings for the featured peptides. Reference real science. No absolute health claims. Return as HTML string."),
  protocolGuidelines: z.string().describe("300+ words outlining typical research protocols, synergies, and how these peptides are commonly studied together. Emphasize research-only nature. Return as HTML string.")
});

async function generateGoalContent(goal: any) {
  try {
    const { object, usage } = await generateObject({
      model: google('gemini-2.5-flash'), // Switched to flash to bypass Pro quota
      schema: goalContentSchema,
      prompt: `You are an expert scientific medical writer for PeptiDex. Your task is to write 1500+ words of high-authority, SEO-optimized, hype-free content for the "${goal.title}" goal page.
      
Goal Details:
- Intro: ${goal.intro}
- Peptides Featured: ${goal.peptideSlugs.join(", ")}
- Target Keywords: ${goal.keywords.join(", ")}
- Existing FAQs: ${goal.faqs.map((f: any) => f.question).join(", ")}

Generate three detailed sections as raw HTML strings (use h2, h3, p, ul, li).
Ensure the tone is objective, strictly scientific, and avoids illegal medical claims. Use terms like "demonstrated in trials", "researchers observed", etc.

IMPORTANT: Make it extremely detailed. The combined word count should exceed 1200 words at minimum.`
    });
    return { object, usage };
  } catch (error) {
    console.error(`AI Generation failed for Goal ${goal.title}`, error);
    return null;
  }
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  const targetGoal = isDryRun ? "fat-loss" : null;

  console.log("Loading ts-morph project...");
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath("src/data/goal-pages.ts");
  
  const goalPagesVar = sourceFile.getVariableDeclarationOrThrow("goalPages");
  const goalPagesArray = goalPagesVar.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
  
  const report: any[] = [];
  let totalPromptTokens = 0;
  let totalCompletionTokens = 0;

  for (const element of goalPagesArray.getElements()) {
    if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
    
    const obj = element as ObjectLiteralExpression;
    
    // Extract existing properties
    const slugProp = obj.getProperty("slug");
    const titleProp = obj.getProperty("title");
    const introProp = obj.getProperty("intro");
    const peptideSlugsProp = obj.getProperty("peptideSlugs");
    const keywordsProp = obj.getProperty("keywords");
    const faqsProp = obj.getProperty("faqs");
    
    // Check if we already have deepDive
    const deepDiveProp = obj.getProperty("deepDive");
    
    if (!slugProp || !titleProp) continue;
    
    const slugStr = slugProp.getText().replace(/['"A-Za-z0-9_]*:\s*/, '').replace(/['"]/g, '');
    const titleStr = titleProp.getText().replace(/['"A-Za-z0-9_]*:\s*/, '').replace(/['"]/g, '');
    
    if (targetGoal && slugStr !== targetGoal) continue;
    
    if (deepDiveProp) {
        console.log(`Skipping: ${slugStr} (already has deepDive)`);
        continue;
    }
    
    console.log(`\nGenerating content for: ${slugStr}...`);
    
    // Quick parse of arrays for prompt
    const peptideSlugs = peptideSlugsProp ? peptideSlugsProp.getFirstDescendantByKind(SyntaxKind.ArrayLiteralExpression)?.getElements().map(e => e.getText().replace(/['"]/g, '')) || [] : [];
    const keywords = keywordsProp ? keywordsProp.getFirstDescendantByKind(SyntaxKind.ArrayLiteralExpression)?.getElements().map(e => e.getText().replace(/['"]/g, '')) || [] : [];
    const introStr = introProp ? introProp.getText().replace(/['"A-Za-z0-9_]*:\s*/, '').replace(/['"]/g, '') : "";
    
    let faqs: any[] = [];
    if (faqsProp) {
       const faqsArray = faqsProp.getFirstDescendantByKind(SyntaxKind.ArrayLiteralExpression);
       if (faqsArray) {
           faqs = faqsArray.getElements().map(e => {
               if (e.getKind() === SyntaxKind.ObjectLiteralExpression) {
                   const q = (e as ObjectLiteralExpression).getProperty("question")?.getText() || "";
                   return { question: q };
               }
               return { question: "" };
           });
       }
    }
    
    const goalData = {
        title: titleStr,
        intro: introStr,
        peptideSlugs,
        keywords,
        faqs
    };
    
    const result = await generateGoalContent(goalData);
    
    if (result) {
        totalPromptTokens += result.usage.promptTokens;
        totalCompletionTokens += result.usage.completionTokens;
        
        // Add properties to the object literal
        obj.addPropertyAssignment({ name: "deepDive", initializer: JSON.stringify(result.object.deepDive) });
        obj.addPropertyAssignment({ name: "clinicalEvidence", initializer: JSON.stringify(result.object.clinicalEvidence) });
        obj.addPropertyAssignment({ name: "protocolGuidelines", initializer: JSON.stringify(result.object.protocolGuidelines) });
        
        console.log(`  + Generated content (${result.usage.completionTokens} output tokens)`);
        
        const cost = (result.usage.promptTokens * COST_PER_1M_INPUT + result.usage.completionTokens * COST_PER_1M_OUTPUT) / 1000000;
        
        report.push({
            slug: slugStr,
            promptTokens: result.usage.promptTokens,
            completionTokens: result.usage.completionTokens,
            cost: cost
        });
        
        // Save AST
        await project.save();
        console.log(`  => CHECKPOINT SAVED to disk for ${slugStr}.`);
        
        if (isDryRun) {
            console.log("\n================ DRY RUN ESTIMATE (PHASE B) ================");
            console.log(`Cost for ${slugStr}: $${cost.toFixed(4)}`);
            console.log(`Projected Cost for 16 Goal Pages: $${(cost * 16).toFixed(4)}`);
            console.log("==========================================================");
            return;
        }
    }
    
    await delay(3000); // Buffer delay
  }
  
  if (!isDryRun) {
      console.log("\n================ PHASE B REPORT ================\n");
      console.table(report);
      const totalCost = report.reduce((sum, r) => sum + r.cost, 0);
      console.log(`Total Cost: $${totalCost.toFixed(4)}`);
      console.log("Check src/data/goal-pages.ts for the changes.");
  }
}

main().catch(console.error);
