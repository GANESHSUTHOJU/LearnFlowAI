
'use server';

/**
 * @fileOverview Converts roadmap text to speech.
 *
 * - roadmapToSpeech - A function that takes roadmap text and returns audio data.
 * - RoadmapToSpeechInput - The input type for the roadmapToSpeech function.
 * - RoadmapToSpeechOutput - The return type for the roadmapToSpeech function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

const RoadmapToSpeechInputSchema = z.object({
  roadmapText: z.string().describe('The text of the roadmap to be converted to speech.'),
});
export type RoadmapToSpeechInput = z.infer<typeof RoadmapToSpeechInputSchema>;

const RoadmapToSpeechOutputSchema = z.object({
  audioDataUri: z.string().describe("The generated audio as a data URI. Expected format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type RoadmapToSpeechOutput = z.infer<typeof RoadmapToSpeechOutputSchema>;

export async function roadmapToSpeech(input: RoadmapToSpeechInput): Promise<RoadmapToSpeechOutput> {
  return roadmapToSpeechFlow(input);
}

const roadmapToSpeechFlow = ai.defineFlow(
  {
    name: 'roadmapToSpeechFlow',
    inputSchema: RoadmapToSpeechInputSchema,
    outputSchema: RoadmapToSpeechOutputSchema,
  },
  async ({ roadmapText }) => {
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: roadmapText,
    });

    if (!media?.url) {
      throw new Error('Text-to-speech conversion failed.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavData = await toWav(audioBuffer);

    return {
      audioDataUri: 'data:audio/wav;base64,' + wavData,
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
