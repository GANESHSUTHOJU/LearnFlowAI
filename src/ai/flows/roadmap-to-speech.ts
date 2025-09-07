'use server';
/**
 * @fileOverview Converts roadmap text content to speech.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';
import { googleAI } from '@genkit-ai/googleai';

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

const roadmapToSpeechFlow = ai.defineFlow(
  {
    name: 'roadmapToSpeechFlow',
    inputSchema: z.string(),
    outputSchema: z.string().describe("A data URI of the WAV audio file."),
  },
  async (textToSpeak) => {
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
        prompt: textToSpeak,
      });

    if (!media || !media.url) {
      throw new Error('Audio generation failed.');
    }

    const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
    const wavBase64 = await toWav(audioBuffer);
    
    return `data:audio/wav;base64,${wavBase64}`;
  }
);

export async function roadmapToSpeech(text: string): Promise<string> {
    if (!text) {
        throw new Error("Text to convert to speech cannot be empty.");
    }
    return await roadmapToSpeechFlow(text);
}
