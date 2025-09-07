
'use server';

/**
 * @fileOverview Generates a quiz based on a user's learning goal.
 *
 * - generateQuiz - A function that generates the quiz.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  goal: z.string().describe('The learning goal of the user.'),
  currentSkillLevel: z.string().describe('The current skill level of the user (e.g., beginner, intermediate, expert).'),
  skillOntology: z.string().optional().describe('A skill ontology to use as a reference.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuizQuestionSchema = z.object({
    question: z.string().describe("The quiz question."),
    options: z.array(z.string()).length(4).describe("An array of 4 multiple-choice options."),
    correctAnswer: z.string().describe("The correct answer from the options."),
    explanation: z.string().describe("A detailed explanation of why the correct answer is correct."),
});

const GenerateQuizOutputSchema = z.object({
  quiz: z.array(QuizQuestionSchema).describe('A comprehensive quiz with up to 25 multiple-choice questions related to the goal.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert quiz generator. Based on the user's goal and current skill level, generate a comprehensive quiz.

Goal: {{{goal}}}
Current Skill Level: {{{currentSkillLevel}}}

Here is the skill ontology: {{{skillOntology}}}

Generate a quiz with up to 25 multiple-choice questions that covers all the topics in the goal and ontology. For each question, you MUST provide:
1. The question text.
2. An array of exactly 4 options.
3. The correct answer text, which must be one of the 4 options.
4. A detailed explanation for why the correct answer is correct.
`, 
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
