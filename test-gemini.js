const { createGoogleGenerativeAI } = require('@ai-sdk/google');
const { generateText } = require('ai');
const fs = require('fs');

async function main() {
  try {
    const envFile = fs.readFileSync('.env.local', 'utf8');
    const apiKeyLine = envFile.split('\n').find(line => line.startsWith('GOOGLE_GENERATIVE_AI_API_KEY='));
    const apiKey = apiKeyLine.split('=')[1].replace(/"/g, '').trim();

    const google = createGoogleGenerativeAI({
      apiKey: apiKey,
    });
    
    console.log("Testing API Key:", apiKey.substring(0, 8) + "...");
    
    const result = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: 'Say hello world',
    });
    
    console.log("SUCCESS:", result.text);
  } catch (err) {
    console.error("ERROR:", err.message);
    if (err.data) console.error(JSON.stringify(err.data, null, 2));
  }
}

main();
