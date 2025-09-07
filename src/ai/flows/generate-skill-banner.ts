'use server';
/**
 * @fileOverview A flow for generating a skill banner image.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';

const generateSkillBannerFlow = ai.defineFlow(
  {
    name: 'generateSkillBannerFlow',
    inputSchema: z.string(),
    outputSchema: z.string().describe("A data URI of the generated PNG image."),
  },
  async (topic) => {
    const prompt = `Create a visually appealing, abstract, and modern banner image for a learning skill.
    Topic: "${topic}".
    Style: Minimalist, digital art, with a professional and inspiring feel. Use a palette of cool colors.`;

    const { media } = await ai.generate({
        model: googleAI.model('imagen-4.0-fast-generate-001'),
        prompt: prompt,
    });

    if (!media.url) {
        throw new Error('Image generation failed to return a URL.');
    }
    
    return media.url;
  }
);

export async function generateSkillBanner(topic: string): Promise<string> {
    if (!topic) {
        throw new Error("Topic cannot be empty.");
    }
    return await generateSkillBannerFlow(topic);
}
