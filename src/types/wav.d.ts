
declare module 'wav' {
  import { Transform } from 'stream';

  export class Writer extends Transform {
    constructor(options?: WriterOptions);
  }

  export interface WriterOptions {
    format?: 'lpcm' | 'alaw' | 'ulaw';
    channels?: number;
    sampleRate?: number;
    bitDepth?: number;
  }
}
