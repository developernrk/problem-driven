import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GOOGLE_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateIdeaRecommendations(userQuery: string, categories: string[]) {
  try {
    const prompt = `
      Based on the user query: "${userQuery}"
      And available categories: ${categories.join(', ')}

      Generate 3 relevant manufacturing business idea recommendations.

      For each idea, provide:
      1. Title (concise and catchy)
      2. Short description (max 200 characters)
      3. Category (from the provided list)
      4. 3-4 relevant tags
      5. Investment range estimate
      6. Market potential (Low/Medium/High)
      7. Difficulty level (Easy/Medium/Hard)
      8. Sustainability rating (Low/Medium/High)

      Format the response as JSON array.
    `;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      
return [];
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
    
return [];
  }
}

export async function generateSearchResults(query: string, existingIdeas: any[]) {
  try {
    const prompt = `
      User search query: "${query}"

      Based on this query, analyze and rank the following manufacturing ideas by relevance:
      ${JSON.stringify(existingIdeas.map(idea => ({
        id: idea._id,
        title: idea.title,
        description: idea.shortDescription,
        category: idea.category,
        tags: idea.tags
      })))}

      Return an array of idea IDs ranked by relevance (most relevant first).
      Also provide a relevance score (0-100) for each.

      Format: [{"id": "idea_id", "score": 95}, ...]
    `;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse search results:', parseError);
      
return [];
    }
  } catch (error) {
    console.error('Error generating search results:', error);
    
return [];
  }
}
