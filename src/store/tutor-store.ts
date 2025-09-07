import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ChatMessage as ChatMessageFromSchema } from '@/ai/flows/chatbot-tutor-guidance';

export interface ChatMessage extends ChatMessageFromSchema {
    followUpQuestions?: string[];
}

interface TutorState {
  skill: string;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  setSkill: (skill: string) => void;
  addMessage: (message: ChatMessage) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
}

const useTutorStore = create<TutorState>()(
  persist(
    (set, get) => ({
      skill: 'Web Development',
      messages: [],
      isLoading: false,
      error: null,
      setSkill: (skill) => {
        if (skill !== get().skill) {
          set({ skill, messages: [], error: null });
        }
      },
      addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearChat: () => set({ messages: [] }),
    }),
    {
      name: 'tutor-chat-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export { useTutorStore };
