
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot, DocumentData } from 'firebase/firestore';
import type { ProgressState } from '@/store/progress-store';

const initialProgressData: Omit<ProgressState, 'loading' | 'error' | 'fetchProgress'> = {
  skills: [
    { id: "react", name: "React", completed: true, totalTopics: 5, completedTopics: 5 },
    { id: "css", name: "Advanced CSS", completed: true, totalTopics: 8, completedTopics: 8 },
    { id: "js", name: "JavaScript", completed: true, totalTopics: 10, completedTopics: 10 },
    { id: "ts", name: "TypeScript", completed: true, totalTopics: 7, completedTopics: 4 },
    { id: "nextjs", name: "Next.js", completed: false, totalTopics: 6, completedTopics: 1 },
    { id: "python", name: "Python", completed: false, totalTopics: 12, completedTopics: 2 },
    { id: "ml", name: "Machine Learning", completed: false, totalTopics: 15, completedTopics: 0 },
    { id: "ds", name: "Data Science", completed: false, totalTopics: 20, completedTopics: 0 },
    { id: "pm", name: "Project Management", completed: false, totalTopics: 8, completedTopics: 3 },
    { id: "gd", name: "Graphic Design", completed: false, totalTopics: 9, completedTopics: 9 },
  ],
  completedCourses: [
    { title: "React Basics", date: "2024-05-20" },
    { title: "Advanced CSS", date: "2024-04-15" },
    { title: "JavaScript Fundamentals", date: "2024-03-10" },
  ],
  learningActivity: [
    { month: "January", lessons: 186 },
    { month: "February", lessons: 305 },
    { month: "March", lessons: 237 },
    { month: "April", lessons: 73 },
    { month: "May", lessons: 209 },
    { month: "June", lessons: 214 },
  ],
  activityTrend: 5.2,
};


export const getUserProgress = async (userId: string): Promise<DocumentData | null> => {
  const docRef = doc(db, 'progress', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // If no progress data exists, create it with initial data
    await setDoc(docRef, initialProgressData);
    return initialProgressData;
  }
};

export const listenToUserProgress = (userId: string, callback: (data: DocumentData) => void) => {
  const docRef = doc(db, 'progress', userId);
  const unsubscribe = onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    } else {
      // If doc doesn't exist, create it and then the listener will fire again.
      setDoc(docRef, initialProgressData);
    }
  });
  return unsubscribe;
};
