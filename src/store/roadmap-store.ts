
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
  userId: string | null;
  setUser: (userId: string | null) => void;
  startCourse: (course: { title: string, totalModules: number }) => void;
  completeModule: (courseTitle: string, moduleTitle: string) => void;
  completeCourse: (courseTitle: string) => void;
  updateQuizScore: (courseTitle: string, score: number) => void;
}

// Define the initial state outside of the create call to reset it easily
const initialState = {
  courses: [],
  completedCourses: [],
  userId: null,
};

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUser: (userId) => {
        // When the user changes, reset the state to initial and set the new userId.
        // The persist middleware will then automatically rehydrate from the new user's storage.
        if (get().userId !== userId) {
            set({...initialState, userId}); 
        }
      },
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

            const updatedCourses = state.courses.map(course =>
                course.title === courseTitle
                    ? { 
                        ...course, 
                        completedModules: newCompletedModules,
                        modulesCompleted: newModulesCompleted,
                      }
                    : course
            );

            return { courses: updatedCourses };
        }),
      
      completeCourse: (courseTitle) => 
        set((state) => {
            const isAlreadyCompleted = state.completedCourses.includes(courseTitle);
            if (isAlreadyCompleted) return state;

            return {
                courses: state.courses.map(course =>
                    course.title === courseTitle
                        ? { ...course, isCompleted: true }
                        : course
                ),
                completedCourses: [...state.completedCourses, courseTitle],
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
      storage: createJSONStorage(() => {
          // Dynamically get the user ID for the storage key
          const userId = useRoadmapStore.getState().userId;
          
          if (!userId) {
              // If there's no user, we can use a dummy storage that does nothing
              return {
                  getItem: () => null,
                  setItem: () => {},
                  removeItem: () => {},
              };
          }

          // Return user-specific storage
          return {
              getItem: (name: string): string | null => {
                  return localStorage.getItem(`${name}-${userId}`);
              },
              setItem: (name: string, value: string): void => {
                  localStorage.setItem(`${name}-${userId}`, value);
              },
              removeItem: (name: string): void => {
                  localStorage.removeItem(`${name}-${userId}`);
              },
          };
      }),
      skipHydration: false, // Allow automatic hydration
      onRehydrateStorage: (state) => {
        console.log("Hydration finished for user:", state?.userId);
      },
    }
  )
);
