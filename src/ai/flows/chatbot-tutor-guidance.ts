'use server';
/**
 * @fileOverview A flow for providing AI tutor guidance.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { geminiPro } from '@genkit-ai/googleai';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const TutorGuidanceInputSchema = z.object({
  skill: z.string().describe('The skill the user is trying to learn.'),
  history: z.array(ChatMessageSchema).describe('The conversation history.'),
});

const TutorGuidanceOutputSchema = z.object({
  response: z.string().describe('The AI tutor\'s response, formatted in markdown.'),
  followUpQuestions: z.array(z.string()).describe('A list of 2-3 suggested follow-up questions for the user.'),
});

export type TutorGuidanceInput = z.infer<typeof TutorGuidanceInputSchema>;
export type TutorGuidanceOutput = z.infer<typeof TutorGuidanceOutputSchema>;

const chatbotTutorGuidanceFlow = ai.defineFlow(
  {
    name: 'chatbotTutorGuidanceFlow',
    inputSchema: TutorGuidanceInputSchema,
    outputSchema: TutorGuidanceOutputSchema,
  },
  async ({ skill, history }) => {
    const systemPrompt = `You are "LearnFlow AI", an expert, friendly, and encouraging AI tutor. Your goal is to help the user master the skill of: ${skill}.

- Keep your responses concise, clear, and easy to understand.
- Use markdown for formatting, including code snippets, lists, and bold text to improve readability.
- When explaining concepts, use analogies and simple examples.
- After each explanation, provide 2-3 relevant follow-up questions the user might have to guide the conversation.
- If the user asks a question unrelated to the skill, gently guide them back to the topic.
- Your tone should be patient, positive, and supportive.`;

    const {output} = await ai.generate({
      model: geminiPro,
      system: systemPrompt,
      history: history,
      prompt: "Generate a response and follow-up questions.",
      output: {
        schema: TutorGuidanceOutputSchema
      },
      config: {
        temperature: 0.7,
      },
    });

    return output!;
  }
);

export async function getTutorGuidance(input: TutorGuidanceInput): Promise<TutorGuidanceOutput> {
  return await chatbotTutorGuidanceFlow(input);
}
