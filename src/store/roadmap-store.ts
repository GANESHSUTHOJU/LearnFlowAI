
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Course {
  title: string;
  progress: number;
}

interface RoadmapState {
  startedCourses: Course[];
  startCourse: (course: Course) => void;
  updateProgress: (title: string, progress: number) => void;
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set) => ({
      startedCourses: [],
      startCourse: (course) =>
        set((state) => {
          // Avoid adding duplicates
          if (state.startedCourses.some(c => c.title === course.title)) {
            return state;
          }
          return { startedCourses: [...state.startedCourses, course] };
        }),
      updateProgress: (title, progress) =>
        set((state) => ({
          startedCourses: state.startedCourses.map((course) =>
            course.title === title ? { ...course, progress } : course
          ),
        })),
    }),
    {
      name: 'roadmap-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
