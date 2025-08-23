
'use server';
/**
 * @fileOverview An AI agent to provide chatbot tutor guidance.
 *
 * - chatbotTutorGuidance - A function that provides tips and answers questions related to the learner's current skill or project.
 * - ChatbotTutorGuidanceInput - The input type for the chatbotTutorGuidance function.
 * - ChatbotTutorGuidanceOutput - The return type for the chatbotTutorGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotTutorGuidanceInputSchema = z.object({
  question: z.string().describe('The question the learner is asking.'),
});
export type ChatbotTutorGuidanceInput = z.infer<typeof ChatbotTutorGuidanceInputSchema>;

const ChatbotTutorGuidanceOutputSchema = z.object({
  answer: z.string().describe("The answer to the learner's question."),
  tip: z.string().describe('A helpful tip related to the topic of the question.'),
});
export type ChatbotTutorGuidanceOutput = z.infer<typeof ChatbotTutorGuidanceOutputSchema>;

export async function chatbotTutorGuidance(input: ChatbotTutorGuidanceInput): Promise<ChatbotTutorGuidanceOutput> {
  return chatbotTutorGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotTutorGuidancePrompt',
  input: {schema: ChatbotTutorGuidanceInputSchema},
  output: {schema: ChatbotTutorGuidanceOutputSchema},
  prompt: `You are a helpful and friendly AI tutor for programming.

Learner's question: {{{question}}}

Answer the learner's question in a clear and concise way. Provide a relevant, helpful tip. Use the output schema descriptions to format your response.`,
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
