
'use server';
/**
 * @fileOverview An AI agent to provide chatbot tutor guidance, with web search capabilities.
 *
 * - chatbotTutorGuidance - A function that provides tips and answers questions.
 * - ChatbotTutorGuidanceInput - The input type for the chatbotTutorGuidance function.
 * - ChatbotTutorGuidanceOutput - The return type for the chatbotTutorGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotTutorGuidanceInputSchema = z.object({
  question: z.string().describe('The question the learner is asking.'),
  roadmapProgress: z.string().optional().describe("The user's current roadmap progress, for context."),
});
export type ChatbotTutorGuidanceInput = z.infer<typeof ChatbotTutorGuidanceInputSchema>;

const ChatbotTutorGuidanceOutputSchema = z.object({
  answer: z.string().describe("The answer to the learner's question."),
  tip: z.string().describe('A helpful tip related to the topic of the question.'),
  searchResults: z.array(z.object({
    title: z.string(),
    link: z.string(),
    snippet: z.string(),
  })).optional().describe('Web search results that were used to answer the question.'),
});
export type ChatbotTutorGuidanceOutput = z.infer<typeof ChatbotTutorGuidanceOutputSchema>;

export async function chatbotTutorGuidance(input: ChatbotTutorGuidanceInput): Promise<ChatbotTutorGuidanceOutput> {
  return chatbotTutorGuidanceFlow(input);
}

// Define a tool for web search
const webSearchTool = ai.defineTool(
  {
    name: 'webSearch',
    description: 'Searches the web for the most current information, documentation, or tutorials on a given topic.',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: z.any(),
  },
  async ({ query }) => {
    // In a real app, you would implement a call to a search API like Google Search API.
    // For this prototype, we'll return mock data.
    console.log(`Searching web for: ${query}`);
    return [
        { title: `Documentation for ${query}`, link: `https://example.com/docs/${query}`, snippet: `The official documentation for ${query}.`},
        { title: `A tutorial on ${query}`, link: `https://example.com/tutorials/${query}`, snippet: `A step-by-step guide to learning ${query}.`},
    ];
  }
);


const prompt = ai.definePrompt({
  name: 'chatbotTutorGuidancePrompt',
  input: {schema: ChatbotTutorGuidanceInputSchema},
  output: {schema: ChatbotTutorGuidanceOutputSchema},
  tools: [webSearchTool],
  prompt: `You are a helpful and friendly AI tutor for programming.

If the user's question requires up-to-date information or specific documentation, use the webSearch tool to find relevant links and information.

If available, consider the user's current roadmap progress for context:
{{{roadmapProgress}}}

Learner's question: {{{question}}}

Answer the learner's question in a clear and concise way. Provide a relevant, helpful tip. If you used the webSearch tool, include the search results in your response. Use the output schema descriptions to format your response.`,
});

const chatbotTutorGuidanceFlow = ai.defineFlow(
  {
    name: 'chatbotTutorGuidanceFlow',
    inputSchema: ChatbotTutorGuidanceInputSchema,
    outputSchema: ChatbotTutorGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
