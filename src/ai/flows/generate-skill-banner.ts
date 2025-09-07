
'use server';
/**
 * @fileOverview Generates a banner image for a skill category.
 *
 * - generateSkillBanner - A function that generates an image data URI.
 * - GenerateSkillBannerInput - The input type for the generateSkillBanner function.
 * - GenerateSkillBannerOutput - The return type for the generateSkillBanner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSkillBannerInputSchema = z.object({
  skillTitle: z.string().describe('The title of the skill category.'),
});
export type GenerateSkillBannerInput = z.infer<typeof GenerateSkillBannerInputSchema>;

const GenerateSkillBannerOutputSchema = z.object({
    imageDataUri: z.string().describe("The generated image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateSkillBannerOutput = z.infer<typeof GenerateSkillBannerOutputSchema>;

export async function generateSkillBanner(input: GenerateSkillBannerInput): Promise<GenerateSkillBannerOutput> {
  return generateSkillBannerFlow(input);
}

const generateSkillBannerFlow = ai.defineFlow(
  {
    name: 'generateSkillBannerFlow',
    inputSchema: GenerateSkillBannerInputSchema,
    outputSchema: GenerateSkillBannerOutputSchema,
  },
  async ({ skillTitle }) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate an abstract, visually appealing banner image representing the skill of "${skillTitle}". The image should be artistic and metaphorical, not literal. Use a modern, tech-focused aesthetic. Aspect ratio 16:9.`,
    });

    if (!media?.url) {
      throw new Error('Image generation failed.');
    }

    return { imageDataUri: media.url };
  }
);
