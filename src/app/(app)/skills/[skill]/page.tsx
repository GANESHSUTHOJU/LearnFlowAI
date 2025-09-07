
"use client";

import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, BarChart, CheckCircle, HelpCircle, Lock, Youtube, Loader2, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRoadmapStore } from "@/store/roadmap-store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import QuizClient from "@/components/quiz/quiz-client";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo, useCallback } from "react";
import { generateSkillBanner } from "@/ai/flows/generate-skill-banner";
import { Skeleton } from "@/components/ui/skeleton";
import { generateQuiz, type GenerateQuizOutput } from "@/ai/flows/generate-quiz";

// Placeholder data - this would eventually come from a database
const coursesData: { [key: string]: any[] } = {
  "web-development": [
    {
      title: "React for Beginners",
      description: "Learn the fundamentals of React and build your first application.",
      duration: "4h 30m",
      level: "Beginner",
      youtubeLink: "https://www.youtube.com/watch?v=SqcY0GlETPk"
    },
    {
      title: "Advanced CSS and Sass",
      description: "Take your CSS skills to the next level with advanced techniques.",
      duration: "6h 15m",
      level: "Intermediate",
      youtubeLink: "https://www.youtube.com/watch?v=_kqN4hl9bGc&list=PL4cUxeGkcC9jxJX7vojNVK-o8ubDZEcNb"
    },
     {
      title: "Full-Stack with Next.js",
      description: "Build a complete full-stack application using the Next.js framework.",
      duration: "12h",
      level: "Advanced",
      youtubeLink: "https://youtu.be/nxK_TCt2pKw?si=4_M4A9Dt7dwv4G5C"
    },
  ],
  "data-science": [
    {
      title: "Introduction to Python for Data Science",
      description: "Get started with Python and the libraries you need for data analysis.",
      duration: "5h",
      level: "Beginner",
      youtubeLink: "https://www.youtube.com/watch?v=rvdkb2K-dMA"
    },
     {
      title: "Data Visualization with D3.js",
      description: "Create stunning interactive charts and graphs for the web.",
      duration: "7h",
      level: "Intermediate",
      youtubeLink: "https://www.youtube.com/watch?v=NlBt-7PuaLk"
    },
  ],
  "ai-machine-learning": [
    {
      title: "Neural Networks and Deep Learning",
      description: "An introduction to the foundational concepts of neural networks.",
      duration: "8h",
      level: "Intermediate",
      youtubeLink: "https://www.youtube.com/watch?v=aircAruvnKk"
    },
     {
      title: "Natural Language Processing with Transformers",
      description: "Understand and build models that can process and understand human language.",
      duration: "10h",
      level: "Advanced",
      youtubeLink: "https://www.youtube.com/watch?v=TQQlZhbC5ps"
    },
  ],
  "database-management": [
      {
          title: "SQL for Beginners",
          description: "Learn the basics of SQL for database manipulation.",
          duration: "4h",
          level: "Beginner",
          youtubeLink: "https://www.youtube.com/watch?v=HXV3zeQKqGY"
      },
      {
          title: "NoSQL Databases Explained",
          description: "Explore the world of NoSQL with MongoDB and others.",
          duration: "6h",
          level: "Intermediate",
          youtubeLink: "https://www.youtube.com/watch?v=0_plvOE0T6w"
      }
  ],
  "ui-ux-design": [
      {
          title: "Figma for UI/UX Design",
          description: "Learn how to design and prototype with Figma.",
          duration: "7h",
          level: "Beginner",
          youtubeLink: "https://www.youtube.com/watch?v=cKZEgt6182E"
      },
      {
          title: "User Research and Usability Testing",
          description: "Master the techniques for effective user research.",
          duration: "5h",
          level: "Intermediate",
          youtubeLink: "https://www.youtube.com/watch?v=s_U-s6DkEQU"
      }
  ],
  "backend-systems": [
      {
          title: "Building RESTful APIs with Node.js and Express",
          description: "Create robust and scalable APIs from scratch.",
          duration: "9h",
          level: "Intermediate",
          youtubeLink: "https://www.youtube.com/watch?v=pKd0Rpw7O48"
      },
      {
          title: "Microservices Architecture",
          description: "Learn how to design and build microservices-based applications.",
          duration: "11h",
          level: "Advanced",
          youtubeLink: "https://www.youtube.com/watch?v=CdBtNQZH8a4"
      }
  ]
};

const skillDetails: { [key: string]: { name: string, description: string } } = {
  "web-development": { name: "Web Development", description: "Courses to help you master HTML, CSS, JavaScript, React, and Node.js." },
  "data-science": { name: "Data Science", description: "Courses to learn Python, Pandas, and machine learning algorithms." },
  "ai-machine-learning": { name: "AI & Machine Learning", description: "Courses to dive into neural networks, NLP, and computer vision." },
  "database-management": { name: "Database Management", description: "Courses to explore SQL, NoSQL, and database design principles." },
  "ui-ux-design": { name: "UI/UX Design", description: "Courses to create stunning user interfaces and experiences." },
  "backend-systems": { name: "Backend Systems", description: "Courses to build robust server-side applications and APIs." },
};

type QuizQuestion = GenerateQuizOutput['quiz'][0];

export default function SkillCoursesPage() {
  const params = useParams();
  const skill = params.skill as string;
  const { toast } = useToast();
  const { courses, startCourse, completeModule, updateQuizScore, completeCourse } = useRoadmapStore();
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [courseImages, setCourseImages] = useState<Record<string, string>>({});
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const skillInfo = useMemo(() => skillDetails[skill] || { name: "Courses", description: "Explore the available courses." }, [skill]);
  const courseList = useMemo(() => coursesData[skill] || [], [skill]);

  const roadmapForSkill = courses.find(c => c.title === skillInfo.name);
  const completedCoursesForSkill = roadmapForSkill?.completedModules || [];
  const isCourseCompleted = roadmapForSkill?.isCompleted || false;


  useEffect(() => {
    // When the component mounts, ensure the "skill" itself is treated as a course/roadmap
    // with each course in it being a module.
    if(skillInfo.name && courseList.length > 0) {
        startCourse({
            title: skillInfo.name,
            totalModules: courseList.length,
        });
    }

    const fetchCourseBanners = async () => {
      if (!courseList || courseList.length === 0) {
        setIsLoadingImages(false);
        return;
      };
      
      setIsLoadingImages(true);
      const imagePromises = courseList.map(course => 
        generateSkillBanner({ skillTitle: course.title })
          .then(result => ({ title: course.title, url: result.imageDataUri }))
          .catch(() => ({ title: course.title, url: 'https://placehold.co/600x400' })) // Fallback
      );
      
      const results = await Promise.all(imagePromises);
      const imageMap = results.reduce((acc, result) => {
        acc[result.title] = result.url;
        return acc;
      }, {} as Record<string, string>);

      setCourseImages(imageMap);
      setIsLoadingImages(false);
    };

    fetchCourseBanners();
  }, [skill, skillInfo.name, courseList.length, startCourse, courseList]);

  const allCoursesCompleted = courseList.every(course => completedCoursesForSkill.includes(course.title));

  const handleGenerateQuiz = useCallback(async () => {
    if (!allCoursesCompleted || isGeneratingQuiz) return;

    setIsGeneratingQuiz(true);
    toast({
        title: "Generating Your Quiz...",
        description: "Please wait a moment while the AI creates your questions.",
    });

    try {
        const result = await generateQuiz({
            goal: skillInfo.name,
            currentSkillLevel: 'intermediate', // Assume intermediate for quiz generation
            skillOntology: courseList.map(c => c.title).join(', '),
        });
        setQuizQuestions(result.quiz);
    } catch (e) {
        console.error("Failed to generate quiz:", e);
        toast({
            variant: "destructive",
            title: "Quiz Generation Failed",
            description: "Sorry, there was an error creating your quiz. Please try again.",
        });
    } finally {
        setIsGeneratingQuiz(false);
    }

  }, [allCoursesCompleted, isGeneratingQuiz, skillInfo.name, courseList, toast]);


  useEffect(() => {
    if (allCoursesCompleted && quizQuestions.length === 0 && !isGeneratingQuiz) {
        handleGenerateQuiz();
    }
  }, [allCoursesCompleted, quizQuestions.length, isGeneratingQuiz, handleGenerateQuiz]);


  const handleMarkModuleComplete = (title: string) => {
    completeModule(skillInfo.name, title);
    toast({
        title: "Module Completed!",
        description: `Great job on finishing "${title}"!`,
    });
  }

  const handleCompleteCourse = () => {
    completeCourse(skillInfo.name);
    toast({
        title: "Course Completed!",
        description: `Congratulations! You've completed the ${skillInfo.name} course.`,
        variant: 'default',
    });
  }

  const handleWatchVideo = (title: string) => {
    setWatchedVideos(prev => [...prev, title]);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">{skillInfo.name}</h1>
        <p className="text-muted-foreground">{skillInfo.description}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courseList.length > 0 ? (
          courseList.map((course) => {
            const isCompleted = completedCoursesForSkill.includes(course.title);
            const hasWatched = watchedVideos.includes(course.title);
            return (
              <GlassCard key={course.title} className="flex flex-col">
                <CardContent className="p-0">
                  {isLoadingImages ? (
                    <Skeleton className="h-[230px] w-full rounded-t-lg" />
                  ) : (
                    <Image 
                      src={courseImages[course.title] || "https://placehold.co/600x400"} 
                      alt={course.title}
                      width={600}
                      height={400}
                      className="rounded-t-lg object-cover"
                    />
                  )}
                </CardContent>
                <div className="p-6 flex flex-col flex-1">
                  <CardHeader className="p-0">
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="pt-2">{course.description}</CardDescription>
                  </CardHeader>
                  <div className="flex-grow" />
                  <div className="flex justify-between items-center text-sm text-muted-foreground mt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart className="w-4 h-4" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button asChild variant="outline" className="w-full" onClick={() => handleWatchVideo(course.title)}>
                      <Link href={course.youtubeLink} target="_blank">
                        <Youtube className="mr-2 h-4 w-4" />
                        Watch on YouTube
                      </Link>
                    </Button>
                    <Button 
                        className="w-full"
                        onClick={() => handleMarkModuleComplete(course.title)}
                        disabled={isCompleted || !hasWatched}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" /> Completed
                          </>
                        ) : (
                          <>
                           Mark as Complete
                          </>
                        )}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            )
          })
        ) : (
          <div className="col-span-full min-h-[40vh] flex flex-col items-center justify-center text-center">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No courses available for this skill yet. Please check back later!</p>
          </div>
        )}
      </div>

       {courseList.length > 0 && (
         <div className="space-y-8">
            <h2 className="text-2xl font-bold font-headline">Final Quiz</h2>
            {allCoursesCompleted ? (
                isGeneratingQuiz ? (
                    <GlassCard>
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-48">
                            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                            <h3 className="font-bold text-xl">Generating Your Quiz...</h3>
                            <p className="text-muted-foreground mt-2">The AI is preparing your questions. Please wait.</p>
                        </CardContent>
                    </GlassCard>
                ) : quizQuestions.length > 0 ? (
                    <QuizClient 
                        quizQuestions={quizQuestions} 
                        courseTitle={skillInfo.name}
                        onQuizComplete={(score) => updateQuizScore(skillInfo.name, score)}
                        onQuizFinish={() => setQuizFinished(true)}
                    />
                ) : (
                    <GlassCard>
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-48">
                            <h3 className="font-bold text-xl">Ready for your quiz?</h3>
                            <p className="text-muted-foreground mt-2">Click the button below to generate your questions.</p>
                            <Button onClick={handleGenerateQuiz} className="mt-4">
                                Generate Quiz
                            </Button>
                        </CardContent>
                    </GlassCard>
                )
            ) : (
                 <GlassCard>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                       <Lock className="w-12 h-12 text-muted-foreground mb-4" />
                       <h3 className="font-bold text-xl">Quiz Locked</h3>
                       <p className="text-muted-foreground mt-2">You haven't completed all modules yet.</p>
                       <Button onClick={() => toast({ variant: 'destructive', title: 'Quiz is locked.', description: 'Please complete all courses in this skill category to unlock the final quiz.'})} variant="outline" className="mt-4">
                           Take the Quiz
                       </Button>
                    </CardContent>
                </GlassCard>
            )}
        </div>
       )}

       {quizFinished && !isCourseCompleted && (
          <GlassCard className="mt-8 text-center animate-in fade-in">
              <CardContent className="p-8">
                  <Trophy className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
                  <CardTitle className="text-2xl">Final Step!</CardTitle>
                  <CardDescription className="mt-2 mb-6">You've finished the quiz. Mark the course as complete to save your achievement.</CardDescription>
                  <Button size="lg" onClick={handleCompleteCourse}>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Mark Course as Complete
                  </Button>
              </CardContent>
          </GlassCard>
        )}
        
        {isCourseCompleted && (
             <GlassCard className="mt-8 text-center animate-in fade-in border-green-500/50">
              <CardContent className="p-8">
                  <CheckCircle className="w-12 h-12 mx-auto text-green-400 mb-4" />
                  <CardTitle className="text-2xl text-green-400">Course Completed!</CardTitle>
                  <CardDescription className="mt-2">Amazing work! You can see your achievement on the dashboard.</CardDescription>
              </CardContent>
          </GlassCard>
        )}
    </div>
  );
}
