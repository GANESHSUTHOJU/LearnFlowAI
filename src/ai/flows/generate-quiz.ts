
'use server';
/**
 * @fileOverview A flow for generating a quiz on a given topic.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';

const QuizQuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).length(4).describe('An array of 4 possible answers.'),
  correctAnswer: z.string().describe('The correct answer from the options.'),
  explanation: z.string().describe('A brief and clear explanation of why the answer is correct.'),
});

const QuizSchema = z.object({
  topic: z.string(),
  questions: z.array(QuizQuestionSchema).min(5).max(10).describe('An array of 5 to 10 quiz questions.'),
});

export type Quiz = z.infer<typeof QuizSchema>;
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: z.string(),
    outputSchema: QuizSchema,
  },
  async (topic) => {
    const prompt = `You are an expert educator. Create a multiple-choice quiz about "${topic}".

The quiz should consist of 5-10 questions designed to test a beginner's understanding of the core concepts.
For each question, provide 4 options, with one clear correct answer.
Also provide a concise explanation for why the correct answer is correct.

The output must be a valid JSON object that adheres to the provided schema.

Topic: ${topic}`;

    const {output} = await ai.generate({
      model: googleAI.model('gemini-1.5-flash-latest'),
      prompt: prompt,
      output: {
        schema: QuizSchema,
      },
    });

    return output!;
  }
);

export async function generateQuiz(topic: string): Promise<Quiz> {
  if (!topic) {
    throw new Error('Topic cannot be empty.');
  }
  return await generateQuizFlow(topic);
}
