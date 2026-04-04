import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateSystemContext } from '@/lib/advisor-context';
import { searchPubMed } from '@/lib/pubmed';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
});

// Basic Memory Rate Limiter
const rateLimitMap = new Map<string, { count: number, resetAt: number }>();
const RATE_LIMIT_COUNT = 15; // 15 requests
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // per 10 minutes

export async function POST(req: Request) {
  try {
    // 1. IP Tracking & Rate Limiting
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown-ip';
    const now = Date.now();
    
    let userLimit = rateLimitMap.get(ip);
    if (!userLimit || userLimit.resetAt < now) {
      userLimit = { count: 1, resetAt: now + RATE_LIMIT_WINDOW };
      rateLimitMap.set(ip, userLimit);
    } else {
      userLimit.count += 1;
      if (userLimit.count > RATE_LIMIT_COUNT) {
         return new Response(JSON.stringify({ 
           error: "You have exceeded your usage limit for the AI Advisor. Please try again in a few minutes.",
           rateLimited: true
         }), {
           status: 429,
           headers: { "Content-Type": "application/json" }
         });
      }
    }

    const { messages } = await req.json();

    const systemPrompt = `
You are the "PeptiDex Advisor", an expert, highly clinical, and strictly educational AI assistant specialized in synthetic peptides.

CRITICAL RULES:
1. You MUST prioritize scientific accuracy. Speak in a confident, clinical, yet accessible tone. Use markdown formatting to make your responses highly readable.
2. If a user asks about a peptide, condition, or stack that IS found in the PRELOADED PEPTIDEX DATABASE below, answer confidently using ONLY that data.
3. **TOOL FALLBACK**: If a user asks about a peptide, medical condition, or bioregulator that is NOT in the database, DO NOT REJECT THEM immediately. Instead, seamlessly CALL YOUR \`searchPubMed\` tool to gather clinical literature to answer them.
4. If you used the PubMed tool, append a strict disclaimer that the peptide/therapy is "not currently tracked by the PeptiDex database, but clinical literature suggests..."
5. Under no circumstances should you provide "medical advice" or recommend using peptides for human consumption.
6. **EXTREME STRICTNESS ON TOPIC**: You must ONLY answer questions directly related to peptides, health, bioregulators, performance lab research, and synthetic stacks. If a user asks a general question completely unrelated to biology or health (e.g., "Write me a poem," "How to bake a cake," "Write code"), you MUST refuse and state: *"I am the PeptiDex AI Advisor. I am strictly programmed to answer questions related to peptide research and biology."*

${generateSystemContext()}
`;

    const result = await streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages,
      temperature: 0.3,
      tools: {
        searchPubMed
      },
      maxSteps: 3, // Allow the model to execute the search tool and then respond
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

