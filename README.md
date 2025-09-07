# LearnFlowAI

Welcome to **LearnFlowAI**, your personal AI-powered guide to mastering new skills. This application is designed to help you create personalized learning roadmaps, get adaptive coaching from an AI tutor, and track your progress as you learn.

## Core Features

*   🚀 **AI Roadmap Generator**: Enter any skill you want to learn, and our AI will generate a step-by-step roadmap with curated resources to guide you.
*   🤖 **AI Tutor**: Get 24/7 assistance from an AI tutor. Ask questions, get explanations, and receive guidance on any topic within your learning path.
*   📊 **Skill & Progress Tracking**: Add skills to your personal dashboard to track your progress from beginner to master.
*   🧠 **Adaptive Quizzes**: Test your knowledge with quizzes that adapt to your skill level, helping you identify areas for improvement.
*   🛠️ **Project-Based Learning**: Apply what you've learned by tackling real-world projects tailored to your chosen skill.
*   ✨ **Personalized Dashboard**: Get an at-a-glance view of your overall progress, completed courses, and AI-powered insights to guide your next steps.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
*   **AI/Generative**: [Google Genkit](https://firebase.google.com/docs/genkit)
*   **Authentication & Database**: [Firebase](https://firebase.google.com/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

To get the application up and running locally, follow these steps.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Firebase Setup

1.  This project is configured to work with a Firebase project. Make sure you have a Firebase project created.
2.  The configuration details are located in `src/lib/firebase.ts`. You may need to update this with your own Firebase project credentials if you are not using the pre-configured backend.
3.  Enable **Email/Password** and **Google** sign-in methods in the Firebase Authentication console.
4.  Enable the **Firestore** database in your Firebase project.

### Environment Variables

This project uses Google's Gemini models for its AI capabilities. You will need a Gemini API key.

1.  Create a `.env.local` file in the root of the project.
2.  Add your Gemini API key to the file:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

### Running the Development Server

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

You can start by creating an account and then exploring the various features like the Roadmap Generator or the AI Tutor.
