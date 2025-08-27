
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Course {
  title: string;
  totalModules: number;
  modulesCompleted: number;
  completedModules: string[];
  quizScore: number | null;
  isCompleted: boolean;
  startDate: string;
}

interface RoadmapState {
  courses: Course[];
  completedCourses: string[]; // Keep track of completed course titles
  startCourse: (course: { title: string, totalModules: number }) => void;
  completeModule: (courseTitle: string, moduleTitle: string) => void;
  updateQuizScore: (courseTitle: string, score: number) => void;
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set, get) => ({
      courses: [],
      completedCourses: [],
      startCourse: ({ title, totalModules }) =>
        set((state) => {
          if (state.courses.some(c => c.title === title)) {
            return state;
          }
          const newCourse: Course = {
              title,
              totalModules,
              modulesCompleted: 0,
              completedModules: [],
              quizScore: null,
              isCompleted: false,
              startDate: new Date().toISOString(),
          }
          return { courses: [...state.courses, newCourse] };
        }),
        
      completeModule: (courseTitle, moduleTitle) =>
        set((state) => {
            const courseToUpdate = state.courses.find(c => c.title === courseTitle);
            if (!courseToUpdate) return state;

            if (courseToUpdate.completedModules.includes(moduleTitle)) {
                return state; 
            }

            const newCompletedModules = [...courseToUpdate.completedModules, moduleTitle];
            const newModulesCompleted = newCompletedModules.length;
            const isCourseCompleted = newModulesCompleted === courseToUpdate.totalModules;

            const updatedCourses = state.courses.map(course =>
                course.title === courseTitle
                    ? { 
                        ...course, 
                        completedModules: newCompletedModules,
                        modulesCompleted: newModulesCompleted,
                        isCompleted: isCourseCompleted,
                      }
                    : course
            );
            
            let updatedCompletedCourses = state.completedCourses;
            if (isCourseCompleted && !state.completedCourses.includes(courseTitle)) {
                updatedCompletedCourses = [...state.completedCourses, courseTitle];
            }

            return {
                courses: updatedCourses,
                completedCourses: updatedCompletedCourses,
            };
        }),
      
      updateQuizScore: (courseTitle, score) =>
        set((state) => ({
            courses: state.courses.map(course => 
                course.title === courseTitle ? { ...course, quizScore: score } : course
            ),
        }))
    }),
    {
      name: 'roadmap-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
