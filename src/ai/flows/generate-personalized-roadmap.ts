'use server';
/**
 * @fileOverview A flow for generating personalized learning roadmaps.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';

const RoadmapSchema = z.object({
  title: z.string().describe("A concise, engaging title for the learning roadmap. For example, 'Mastering TypeScript'."),
  introduction: z.string().describe('A brief, encouraging introduction to the learning journey, written in markdown format.'),
  steps: z.array(
    z.object({
      title: z.string().describe('A concise title for this step.'),
      description: z.string().describe('A detailed, beginner-friendly explanation of this step, written in markdown format.'),
      keyConcepts: z.array(z.string()).describe("A list of 3-5 key concepts or terms to learn in this step."),
      resources: z.array(z.object({
        title: z.string().describe('The title of the resource.'),
        url: z.string().url().describe('A URL to a relevant resource.'),
        description: z.string().describe('A brief description of why this resource is helpful.')
      })).describe('A list of 1-3 high-quality, free resources for this step.')
    })
  ).describe('A sequence of 3-7 learning steps.'),
  conclusion: z.string().describe('A concluding paragraph to motivate the learner to get started, written in markdown format.')
});

export type Roadmap = z.infer<typeof RoadmapSchema>;

const generateRoadmapFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRoadmapFlow',
    inputSchema: z.string(),
    outputSchema: RoadmapSchema,
  },
  async (topic) => {
    const prompt = `You are an expert educator and curriculum designer. Your goal is to create a comprehensive, step-by-step learning roadmap for a beginner to learn about "${topic}".

    The roadmap should be encouraging, easy to follow, and provide high-quality, free online resources.
    The structure should be logical, starting from fundamental concepts and progressing to more advanced topics.
    Each step must contain a description, key concepts to focus on, and a few links to excellent free resources.

    The output must be a valid JSON object that adheres to the provided schema. Ensure all descriptions are in markdown format for rich text rendering.

    Here is the topic: ${topic}`;

    const {output} = await ai.generate({
      model: googleAI.model('gemini-1.5-flash-latest'),
      prompt: prompt,
      output: {
        schema: RoadmapSchema,
      },
      config: {
        temperature: 0.5,
      }
    });

    return output!;
  }
);

export async function generatePersonalizedRoadmap(topic: string): Promise<Roadmap> {
  if (!topic) {
    throw new Error('Topic cannot be empty.');
  }
  return await generateRoadmapFlow(topic);
}
