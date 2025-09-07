'use server';
/**
 * @fileOverview A flow for receiving personalized feedback on a user's work.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';

const FeedbackInputSchema = z.object({
  topic: z.string().describe("The topic or skill the user is learning."),
  submission: z.string().describe("The user's work or answer to a prompt."),
  criteria: z.string().describe("The criteria for evaluating the submission."),
});

const FeedbackOutputSchema = z.object({
  feedback: z.string().describe("Constructive, personalized feedback on the user's submission, in markdown format."),
  score: z.number().min(0).max(100).describe("A score from 0-100 representing how well the submission meets the criteria."),
  suggestions: z.array(z.string()).describe("A list of specific, actionable suggestions for improvement."),
});

export type FeedbackInput = z.infer<typeof FeedbackInputSchema>;
export type FeedbackOutput = z.infer<typeof FeedbackOutputSchema>;


const receivePersonalizedFeedbackFlow = ai.defineFlow(
  {
    name: 'receivePersonalizedFeedbackFlow',
    inputSchema: FeedbackInputSchema,
    outputSchema: FeedbackOutputSchema,
  },
  async ({ topic, submission, criteria }) => {
    const prompt = `You are an expert instructor for the topic: "${topic}".
    A student has submitted the following work for feedback:
    ---
    ${submission}
    ---
    
    Please evaluate the submission based on these criteria: "${criteria}".
    
    Provide constructive, positive, and personalized feedback.
    - Start with what the student did well.
    - Then, provide specific, actionable suggestions for improvement.
    - Assign a score from 0-100 based on the criteria.
    - The feedback should be in markdown format.

    The output must be a valid JSON object adhering to the schema.`;

    const {output} = await ai.generate({
      model: googleAI.model('gemini-1.5-flash-latest'),
      prompt: prompt,
      output: {
        schema: FeedbackOutputSchema,
      },
    });

    return output!;
  }
);

export async function receivePersonalizedFeedback(input: FeedbackInput): Promise<FeedbackOutput> {
  return await receivePersonalizedFeedbackFlow(input);
}
