import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateSystemContext } from '@/lib/advisor-context';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
});

// Basic Memory Rate Limiter
// Note: In a true multi-server/serverless edge deployment, use Redis (e.g. Upstash). 
// For typical instances, an in-memory map handles rapid-fire spam.
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
      // Reset or initialize limits
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
You are directly integrated into the PeptiDex platform.

CRITICAL RULES:
1. You may ONLY recommend, discuss, or pull facts from the "PEPTIDEX DATABASE" context provided below. If a user asks about a peptide not in the database, explicitly state you do not have data on it.
2. You MUST prioritize scientific accuracy. Speak in a confident, clinical, yet accessible tone. Use markdown formatting to make your responses highly readable (bullet points, bold text).
3. Under no circumstances should you provide "medical advice" or recommend using peptides for human consumption. Use phrases like "in clinical models," "pharmacokinetic data suggests," or "for laboratory research."
4. If asked about dosing, use the precise data in the context. Emphasize that dosing is for theoretical/research protocol design.
5. If requested to "compare", present a highly structured side-by-side comparison.
6. When discussing stacks or blends, reference data from the BLENDS section of the database.
7. Always cite specific data points (dose ranges, half-lives, prices) when available rather than being vague.
8. For interaction questions, flag any known dangerous combinations from the database.
9. **EXTREME STRICTNESS ON TOPIC**: You must ONLY answer questions directly related to peptides, bioregulators, performance lab research, and synthetic stacks. If a user asks a general question (e.g., "Write me a poem," "How to bake a cake," "Write code," "Who is the president"), you MUST refuse to answer and state: *"I am the PeptiDex AI Advisor. I am strictly programmed to only answer questions related to peptide research, protocols, and data."*

${generateSystemContext()}
`;

    const result = await streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages,
      temperature: 0.3,
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
