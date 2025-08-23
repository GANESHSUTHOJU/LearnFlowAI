'use server';

/**
 * @fileOverview Provides personalized feedback and difficulty adjustments based on quiz performance.
 *
 * - receivePersonalizedFeedback - A function that processes quiz data and returns personalized feedback.
 * - FeedbackInput - The input type for the receivePersonalizedFeedback function.
 * - FeedbackOutput - The return type for the receivePersonalizedFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FeedbackInputSchema = z.object({
  quizHistory: z.string().describe('The history of quizzes taken by the user.'),
  skillGraphStructure: z.string().describe('The structure of the skill graph.'),
  assessmentData: z.string().describe('Additional assessment data of the user.'),
  currentQuestion: z.string().describe('The current question being asked.'),
  userAnswer: z.string().describe('The answer given by the user to the current question.'),
});
export type FeedbackInput = z.infer<typeof FeedbackInputSchema>;

const FeedbackOutputSchema = z.object({
  feedback: z.string().describe('Personalized feedback for the user.'),
  difficultyAdjustment: z.string().describe('Suggested difficulty adjustment for the next question.'),
  relevantQuestionSuggestion: z.string().describe('Suggested relevant question based on performance.'),
});
export type FeedbackOutput = z.infer<typeof FeedbackOutputSchema>;

export async function receivePersonalizedFeedback(input: FeedbackInput): Promise<FeedbackOutput> {
  return receivePersonalizedFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'receivePersonalizedFeedbackPrompt',
  input: {schema: FeedbackInputSchema},
  output: {schema: FeedbackOutputSchema},
  prompt: `You are an AI quiz coach that provides personalized feedback and difficulty adjustments to users based on their quiz performance.

  Here is the user's quiz history:
  {{quizHistory}}

  Here is the structure of the skill graph:
  {{skillGraphStructure}}

  Here is additional assessment data of the user:
  {{assessmentData}}

  The user is currently answering this question:
  {{currentQuestion}}

  The user's answer is:
  {{userAnswer}}

  Based on this information, provide personalized feedback, suggest a difficulty adjustment for the next question, and suggest a relevant question to ask next.
  Make sure the output is valid JSON.
  `,
});

const receivePersonalizedFeedbackFlow = ai.defineFlow(
  {
    name: 'receivePersonalizedFeedbackFlow',
    inputSchema: FeedbackInputSchema,
    outputSchema: FeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
