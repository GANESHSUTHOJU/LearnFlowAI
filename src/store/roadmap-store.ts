
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
        if (get().userId !== userId) {
            // This forces a re-hydration from localStorage with the new user's key
            // First, reset the state to avoid data leakage from previous user
            set({...initialState, userId}); 
            // The `onRehydrateStorage` middleware in `persist` will then load the new user's data.
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
            const isCourseCompleted = newCompletedModules.length === courseToUpdate.totalModules;

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
      // Dynamically set the storage key based on the user ID
      getStorage: () => {
          const { userId } = useRoadmapStore.getState();
          const userSpecificStorage = {
              getItem: (name: string) => {
                  const strg = localStorage.getItem(`${name}-${userId}`);
                  return strg;
              },
              setItem: (name: string, value: string) => {
                  if (userId) {
                      localStorage.setItem(`${name}-${userId}`, value);
                  }
              },
              removeItem: (name: string) => {
                  localStorage.removeItem(`${name}-${userId}`);
              },
          };

          if (userId) {
              return userSpecificStorage;
          }
          
          // Return a dummy storage if no user is logged in to prevent writing to a generic key
          return {
              getItem: () => null,
              setItem: () => undefined,
              removeItem: () => undefined,
          };
      },
      onRehydrateStorage: () => {
        // This function is called when the store is rehydrated from storage.
        // We can use it to log or perform actions after data is loaded.
        return (state, error) => {
          if (error) {
            console.error('An error happened during storage rehydration', error);
          }
        };
      },
       // Important: This prevents the store from being rehydrated until a user is set.
      skipHydration: true,
    }
  )
);
