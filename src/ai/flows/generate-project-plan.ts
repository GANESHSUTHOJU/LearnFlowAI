'use server';
/**
 * @fileOverview A flow for generating a project plan.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { geminiPro } from '@genkit-ai/googleai';

const ProjectPlanSchema = z.object({
  projectName: z.string().describe('A catchy and relevant name for the project.'),
  description: z.string().describe('A brief, motivating description of the project, in markdown format.'),
  learningGoals: z.array(z.string()).describe('A list of key skills the user will practice by completing this project.'),
  tasks: z.array(
    z.object({
      title: z.string().describe('The title of the task.'),
      description: z.string().describe('A detailed description of what needs to be done for this task.'),
      isDone: z.boolean().default(false),
    })
  ).describe('A list of actionable tasks to complete the project.'),
});

export type ProjectPlan = z.infer<typeof ProjectPlanSchema>;

const generateProjectPlanFlow = ai.defineFlow(
  {
    name: 'generateProjectPlanFlow',
    inputSchema: z.string(),
    outputSchema: ProjectPlanSchema,
  },
  async (topic) => {
    const prompt = `You are a senior software engineer and mentor. Generate a beginner-friendly project plan for a developer learning about "${topic}".
    
    The project should be simple enough for a beginner but comprehensive enough to apply core concepts.
    Create a catchy project name, a motivating description, key learning goals, and a list of actionable tasks.
    
    The output must be a valid JSON object that adheres to the provided schema.
    
    Topic: ${topic}`;

    const {output} = await ai.generate({
      model: geminiPro,
      prompt: prompt,
      output: {
        schema: ProjectPlanSchema,
      },
    });

    return output!;
  }
);

export async function generateProjectPlan(topic: string): Promise<ProjectPlan> {
  if (!topic) {
    throw new Error('Topic cannot be empty.');
  }
  return await generateProjectPlanFlow(topic);
}
