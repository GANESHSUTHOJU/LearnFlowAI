import { genkit, configureGenkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// This check is commented out because it can cause issues in certain deployment
// environments where environment variables are set later in the build process.
// if (!process.env.GEMINI_API_KEY) {
//   throw new Error(
//     'GEMINI_API_KEY environment variable not set. Please create a .env.local file and add it.'
//   );
// }

configureGenkit({
  plugins: [
    googleAI({
      // The API key is loaded from the GEMINI_API_KEY environment variable.
    }),
  ],
  logLevel: 'debug',
  enableTracing: true,
  flowStateStore: 'dev-local'
});

export { genkit as ai };
