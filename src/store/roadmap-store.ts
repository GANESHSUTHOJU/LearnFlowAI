import { create } from 'zustand';
import type { Roadmap } from '@/ai/flows/generate-personalized-roadmap';

interface RoadmapState {
  topic: string;
  roadmap: Roadmap | null;
  isLoading: boolean;
  error: string | null;
  setTopic: (topic: string) => void;
  setRoadmap: (roadmap: Roadmap | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useRoadmapStore = create<RoadmapState>((set) => ({
  topic: '',
  roadmap: null,
  isLoading: false,
  error: null,
  setTopic: (topic) => set({ topic }),
  setRoadmap: (roadmap) => set({ roadmap }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
