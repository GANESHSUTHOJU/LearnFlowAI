
'use server';

/**
 * @fileOverview Generates a personalized learning roadmap based on user goals and skill level.
 *
 * - generatePersonalizedRoadmap - A function that generates the roadmap.
 * - GeneratePersonalizedRoadmapInput - The input type for the generatePersonalizedRoadmap function.
 * - GeneratePersonalizedRoadmapOutput - The return type for the generatePersonalizedRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedRoadmapInputSchema = z.object({
  goal: z.string().describe('The learning goal of the user.'),
  currentSkillLevel: z.string().describe('The current skill level of the user (e.g., beginner, intermediate, expert).'),
  skillOntology: z.string().optional().describe('A skill ontology to use as a reference.'),
});
export type GeneratePersonalizedRoadmapInput = z.infer<typeof GeneratePersonalizedRoadmapInputSchema>;

const RoadmapStepSchema = z.object({
    step: z.number().describe("The step number."),
    title: z.string().describe("The title of the learning step."),
    description: z.string().describe("A brief description of the learning step."),
    youtubeSearchQuery: z.string().describe("A concise search query for finding relevant tutorials on YouTube for this step."),
});

const QuizQuestionSchema = z.object({
    question: z.string().describe("The quiz question."),
    options: z.array(z.string()).length(4).describe("An array of 4 multiple-choice options."),
    correctAnswer: z.string().describe("The correct answer from the options."),
    explanation: z.string().describe("A detailed explanation of why the correct answer is correct."),
    incorrectExplanations: z.array(z.string()).length(3).describe("An array of explanations for the three incorrect options."),
});

const GeneratePersonalizedRoadmapOutputSchema = z.object({
  roadmap: z.array(RoadmapStepSchema).describe('The generated learning roadmap as a list of steps.'),
  quiz: z.array(QuizQuestionSchema).min(25).describe('A quiz with at least 25 multiple-choice questions related to the roadmap.'),
});
export type GeneratePersonalizedRoadmapOutput = z.infer<typeof GeneratePersonalizedRoadmapOutputSchema>;

export async function generatePersonalizedRoadmap(input: GeneratePersonalizedRoadmapInput): Promise<GeneratePersonalizedRoadmapOutput> {
  return generatePersonalizedRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedRoadmapPrompt',
  input: {schema: GeneratePersonalizedRoadmapInputSchema},
  output: {schema: GeneratePersonalizedRoadmapOutputSchema},
  prompt: `You are an expert learning roadmap and quiz generator. Based on the user's goal and current skill level, generate a personalized learning roadmap and a comprehensive quiz.

Goal: {{{goal}}}
Current Skill Level: {{{currentSkillLevel}}}

Here is the skill ontology: {{{skillOntology}}}

Generate a clear, step-by-step list for the roadmap. Each step must have a step number, a title, a brief description, and a concise YouTube search query.

After the roadmap, generate a quiz with at least 25 multiple-choice questions that covers all the topics in the roadmap. For each question, you MUST provide:
1. The question text.
2. An array of exactly 4 options.
3. The correct answer text, which must be one of the 4 options.
4. A detailed explanation for why the correct answer is correct.
5. An array of 3 detailed explanations for why the other three options are incorrect. The order of these explanations should correspond to the order of the incorrect options.
`, 
});

const generatePersonalizedRoadmapFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRoadmapFlow',
    inputSchema: GeneratePersonalizedRoadmapInputSchema,
    outputSchema: GeneratePersonalizedRoadmapOutputSchema,
  },
  async input => {
    // For the prototype, we can use a generic quiz if the goal is not specific
    if (input.goal.toLowerCase().includes('generic')) {
         const {output} = await prompt({
            ...input,
            goal: "Learn about Web Development fundamentals (HTML, CSS, JavaScript)"
        });
        return output!;
    }
    const {output} = await prompt(input);
    return output!;
  }
);
