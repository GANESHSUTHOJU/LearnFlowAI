
import { create } from 'zustand';
import { getUserProgress, listenToUserProgress } from '@/services/progress-service';
import type { Unsubscribe } from 'firebase/firestore';

interface Skill {
    id: string;
    name: string;
    completed: boolean;
    totalTopics: number;
    completedTopics: number;
}

interface CompletedCourse {
    title: string;
    date: string;
}

interface LearningActivity {
    month: string;
    lessons: number;
}

export interface ProgressState {
  skills: Skill[];
  completedCourses: CompletedCourse[];
  learningActivity: LearningActivity[];
  activityTrend: number;
  loading: boolean;
  error: string | null;
  fetchProgress: (userId: string) => Promise<void>;
  listenForProgress: (userId: string) => Unsubscribe;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  skills: [],
  completedCourses: [],
  learningActivity: [],
  activityTrend: 0,
  loading: true,
  error: null,
  
  fetchProgress: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const progressData = await getUserProgress(userId);
      if (progressData) {
        set({
          skills: progressData.skills || [],
          completedCourses: progressData.completedCourses || [],
          learningActivity: progressData.learningActivity || [],
          activityTrend: progressData.activityTrend || 0,
          loading: false,
        });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      set({ error: errorMessage, loading: false });
    }
  },

  listenForProgress: (userId: string) => {
    set({ loading: true });
    const unsubscribe = listenToUserProgress(userId, (progressData) => {
      set({
        skills: progressData.skills || [],
        completedCourses: progressData.completedCourses || [],
        learningActivity: progressData.learningActivity || [],
        activityTrend: progressData.activityTrend || 0,
        loading: false,
        error: null,
      });
    });
    return unsubscribe;
  }
}));
