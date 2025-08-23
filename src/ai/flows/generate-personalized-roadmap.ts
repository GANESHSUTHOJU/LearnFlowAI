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

const GeneratePersonalizedRoadmapOutputSchema = z.object({
  roadmap: z.string().describe('The generated learning roadmap.'),
});
export type GeneratePersonalizedRoadmapOutput = z.infer<typeof GeneratePersonalizedRoadmapOutputSchema>;

export async function generatePersonalizedRoadmap(input: GeneratePersonalizedRoadmapInput): Promise<GeneratePersonalizedRoadmapOutput> {
  return generatePersonalizedRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedRoadmapPrompt',
  input: {schema: GeneratePersonalizedRoadmapInputSchema},
  output: {schema: GeneratePersonalizedRoadmapOutputSchema},
  prompt: `You are an expert learning roadmap generator. Based on the user's goal and current skill level, generate a personalized learning roadmap.

Goal: {{{goal}}}
Current Skill Level: {{{currentSkillLevel}}}

Here is the skill ontology: {{{skillOntology}}}

Roadmap:`, 
});

const generatePersonalizedRoadmapFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRoadmapFlow',
    inputSchema: GeneratePersonalizedRoadmapInputSchema,
    outputSchema: GeneratePersonalizedRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
