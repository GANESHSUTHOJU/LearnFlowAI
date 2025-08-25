
'use server';

/**
 * @fileOverview Generates a project plan based on a user's description.
 *
 * - generateProjectPlan - A function that generates the plan.
 * - GenerateProjectPlanInput - The input type for the generateProjectPlan function.
 * - GenerateProjectPlanOutput - The return type for the generateProjectPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectPlanInputSchema = z.object({
  projectDescription: z.string().describe('A description of the project the user wants to build.'),
});
export type GenerateProjectPlanInput = z.infer<typeof GenerateProjectPlanInputSchema>;

const ProjectStepSchema = z.object({
    step: z.number().describe("The step number."),
    title: z.string().describe("The title of the project step."),
    description: z.string().describe("A brief description of what to do in this step."),
    technologies: z.array(z.string()).describe("A list of technologies or skills relevant to this step."),
});

const GenerateProjectPlanOutputSchema = z.object({
  projectName: z.string().describe("A catchy name for the project."),
  projectSummary: z.string().describe("A one-paragraph summary of the project."),
  plan: z.array(ProjectStepSchema).describe('The generated project plan as a list of steps.'),
});
export type GenerateProjectPlanOutput = z.infer<typeof GenerateProjectPlanOutputSchema>;

export async function generateProjectPlan(input: GenerateProjectPlanInput): Promise<GenerateProjectPlanOutput> {
  return generateProjectPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectPlanPrompt',
  input: {schema: GenerateProjectPlanInputSchema},
  output: {schema: GenerateProjectPlanOutputSchema},
  prompt: `You are an expert project planner and software architect. Based on the user's project description, generate a detailed, step-by-step project plan.

Project Description: {{{projectDescription}}}

Generate a catchy name and a brief summary for the project. Then create a clear, step-by-step plan. Each step must have a step number, a title, a detailed description of the tasks involved, and a list of relevant technologies or skills.
`, 
});

const generateProjectPlanFlow = ai.defineFlow(
  {
    name: 'generateProjectPlanFlow',
    inputSchema: GenerateProjectPlanInputSchema,
    outputSchema: GenerateProjectPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
