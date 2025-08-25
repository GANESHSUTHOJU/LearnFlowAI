
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Course {
  title: string;
  progress: number;
  startDate: string;
}

interface RoadmapState {
  startedCourses: Course[];
  completedCourses: string[]; // Array of completed course titles
  quizScore: number | null;
  startCourse: (course: Pick<Course, 'title'>) => void;
  updateProgress: (title: string, progress: number) => void;
  completeCourse: (title: string) => void;
  updateQuizScore: (score: number) => void;
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set, get) => ({
      startedCourses: [],
      completedCourses: [],
      quizScore: null,
      startCourse: (course) =>
        set((state) => {
          // Avoid adding duplicates
          if (state.startedCourses.some(c => c.title === course.title)) {
            return state;
          }
          const newCourse: Course = {
              ...course,
              progress: 0,
              startDate: new Date().toISOString(),
          }
          return { startedCourses: [...state.startedCourses, newCourse] };
        }),
      updateProgress: (title, progress) =>
        set((state) => ({
          startedCourses: state.startedCourses.map((course) =>
            course.title === title ? { ...course, progress: Math.min(100, progress) } : course
          ),
        })),
      completeCourse: (title) =>
        set((state) => {
            if (!state.startedCourses.some(c => c.title === title)) {
                 const newCourse: Course = {
                  title,
                  progress: 100,
                  startDate: new Date().toISOString(),
                }
                if (state.completedCourses.includes(title)) {
                    return {
                         startedCourses: [...state.startedCourses, newCourse],
                    }
                }
                return { 
                    startedCourses: [...state.startedCourses, newCourse],
                    completedCourses: [...state.completedCourses, title]
                }
            }

            // Avoid adding duplicates to completed list
            if (state.completedCourses.includes(title)) {
                return {
                     startedCourses: state.startedCourses.map((course) =>
                        course.title === title ? { ...course, progress: 100 } : course
                    ),
                };
            }
            return {
                startedCourses: state.startedCourses.map((course) =>
                    course.title === title ? { ...course, progress: 100 } : course
                ),
                completedCourses: [...state.completedCourses, title]
            }
        }),
      updateQuizScore: (score: number) =>
        set(() => ({
            quizScore: score,
        }))
    }),
    {
      name: 'roadmap-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
