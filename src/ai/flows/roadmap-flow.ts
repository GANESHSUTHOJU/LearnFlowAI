'use server';
/**
 * @fileOverview A flow for generating learning roadmaps.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { geminiPro } from '@genkit-ai/googleai';

const RoadmapSchema = z.object({
  introduction: z.string().describe('A brief, encouraging introduction to the learning journey.'),
  steps: z.array(
    z.object({
      title: z.string().describe('A concise title for this step.'),
      description: z.string().describe('A detailed, beginner-friendly explanation of this step, written in markdown format.'),
      resources: z.array(z.object({
        title: z.string().describe('The title of the resource.'),
        url: z.string().url().describe('A URL to a relevant resource.'),
        description: z.string().describe('A brief description of why this resource is helpful.')
      })).describe('A list of 1-3 high-quality, free resources for this step.')
    })
  ).describe('The sequence of learning steps.'),
  conclusion: z.string().describe('A concluding paragraph to motivate the learner to get started.')
});

export type Roadmap = z.infer<typeof RoadmapSchema>;

const roadmapTool = ai.defineTool(
  {
    name: 'roadmapTool',
    description: 'A tool for generating a learning roadmap for a given topic.',
    inputSchema: z.object({ topic: z.string() }),
    outputSchema: RoadmapSchema,
  },
  async (input) => {
    // This is a placeholder. In a real app, you might call another flow,
    // a database, or a third-party API. For now, we'll rely on the model's knowledge.
    console.log(`Generating roadmap for ${input.topic} using model knowledge.`);
    return {
      introduction: "",
      steps: [],
      conclusion: ""
    };
  }
);


const generateRoadmapFlow = ai.defineFlow(
  {
    name: 'generateRoadmapFlow',
    inputSchema: z.string(),
    outputSchema: RoadmapSchema,
  },
  async (topic) => {
    const prompt = `You are an expert educator and curriculum designer. Your goal is to create a comprehensive, step-by-step learning roadmap for a beginner to learn about "${topic}".

    The roadmap should be encouraging, easy to follow, and provide high-quality, free online resources.

    The output must be a valid JSON object that adheres to the provided schema. Ensure all descriptions are in markdown format.

    Here is the topic: ${topic}`;


    const {output} = await ai.generate({
      model: geminiPro,
      prompt: prompt,
      output: {
        schema: RoadmapSchema,
      },
    });

    return output!;
  }
);

export async function generateRoadmap(topic: string): Promise<Roadmap> {
  return await generateRoadmapFlow(topic);
}
