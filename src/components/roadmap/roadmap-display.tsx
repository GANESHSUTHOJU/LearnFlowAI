
"use client";

import { useState, useEffect } from "react";
import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Youtube, Lock, AlertTriangle, ArrowRight, XCircle, CheckCircle, Trophy } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRoadmapStore } from "@/store/roadmap-store";
import { useToast } from "@/hooks/use-toast";
import type { GeneratePersonalizedRoadmapOutput } from "@/ai/flows/generate-personalized-roadmap";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import QuizClient from "../quiz/quiz-client";

interface RoadmapDisplayProps {
  roadmap: GeneratePersonalizedRoadmapOutput;
}

export default function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  const { toast } = useToast();
  const { courses, completeModule, updateQuizScore, startCourse, completeCourse } = useRoadmapStore();
  
  const roadmapTitle = "Generated Roadmap"; // Or derive from roadmap.goal
  
  useEffect(() => {
    startCourse({
        title: roadmapTitle,
        totalModules: roadmap.roadmap.length,
    })
  }, [roadmap, startCourse, roadmapTitle]);

  const currentCourse = courses.find(c => c.title === roadmapTitle);
  const completedModules = currentCourse?.completedModules || [];
  const isCourseCompleted = currentCourse?.isCompleted || false;
  const allStepsCompleted = roadmap.roadmap.every(step => completedModules.includes(step.title));


  const [quizFinished, setQuizFinished] = useState(false);

  const handleCompleteModule = (title: string) => {
    completeModule(roadmapTitle, title);
    toast({
      title: "Module Completed!",
      description: `Great job on finishing "${title}"!`,
    })
  }

  const handleQuizClick = () => {
     if (!allStepsCompleted) {
        toast({
            variant: "destructive",
            title: "Quiz Locked",
            description: "You cannot attempt the quiz yet. Please complete all modules first.",
        });
     }
  }

  const getYoutubeLink = (query: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  }
  
  const handleCompleteCourse = () => {
    completeCourse(roadmapTitle);
    toast({
        title: "Roadmap Completed!",
        description: `Congratulations! You've completed your generated roadmap.`,
        variant: 'default',
    });
  }
  

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-8">
        <GlassCard>
            <CardHeader>
                <CardTitle>Your Personalized Roadmap</CardTitle>
                <CardDescription>Follow these steps to achieve your learning goal.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                {roadmap.roadmap.map((step) => {
                  const isCompleted = completedModules.includes(step.title);

                  return (
                    <div key={step.step} className="flex items-start gap-4">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg flex-shrink-0", isCompleted && "bg-green-500/20 text-green-400")}>
                        {isCompleted ? <Check className="w-5 h-5" /> : step.step}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg font-headline">{step.title}</h3>
                        {step.description && <p className="text-muted-foreground mt-1 whitespace-pre-line text-sm">{step.description}</p>}
                        <div className="mt-3 flex flex-wrap gap-2">
                             <Button asChild variant="outline" size="sm">
                                <Link href={getYoutubeLink(step.youtubeSearchQuery)} target="_blank">
                                    <Youtube className="mr-2 h-4 w-4" /> Watch on YouTube
                                </Link>
                            </Button>
                            <Button 
                                onClick={() => handleCompleteModule(step.title)} 
                                size="sm"
                                disabled={isCompleted}
                                >
                                {isCompleted ? (
                                    <>
                                        <CheckCircle className="mr-2 h-4 w-4" /> Completed
                                    </>
                                ) : (
                                    <>
                                        Mark as Complete
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                    </div>
                  )
                })}
                <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent flex-shrink-0">
                        <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg font-headline text-accent">Goal Achieved!</h3>
                        <p className="text-muted-foreground mt-1 text-sm">Congratulations on completing your learning journey! Now, test your knowledge.</p>
                    </div>
                    </div>
                </div>
            </CardContent>
        </GlassCard>

        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Final Quiz</h2>
            {allStepsCompleted ? (
                <QuizClient 
                    quizQuestions={roadmap.quiz}
                    courseTitle={roadmapTitle}
                    onQuizComplete={(score) => updateQuizScore(roadmapTitle, score)}
                    onQuizFinish={() => setQuizFinished(true)}
                />
            ) : (
                 <GlassCard>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                       <Lock className="w-12 h-12 text-muted-foreground mb-4" />
                       <h3 className="font-bold text-xl">Quiz Locked</h3>
                       <p className="text-muted-foreground mt-2">You cannot attempt the quiz yet. Please complete all modules first.</p>
                       <Button onClick={handleQuizClick} variant="outline" className="mt-4">
                           Take the Quiz
                       </Button>
                    </CardContent>
                </GlassCard>
            )}
        </div>
        
        {quizFinished && !isCourseCompleted && (
          <GlassCard className="mt-8 text-center animate-in fade-in">
              <CardContent className="p-8">
                  <Trophy className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
                  <CardTitle className="text-2xl">Final Step!</CardTitle>
                  <CardDescription className="mt-2 mb-6">You've finished the quiz. Mark the roadmap as complete to save your achievement.</CardDescription>
                  <Button size="lg" onClick={handleCompleteCourse}>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Mark Roadmap as Complete
                  </Button>
              </CardContent>
          </GlassCard>
        )}
        
        {isCourseCompleted && (
             <GlassCard className="mt-8 text-center animate-in fade-in border-green-500/50">
              <CardContent className="p-8">
                  <CheckCircle className="w-12 h-12 mx-auto text-green-400 mb-4" />
                  <CardTitle className="text-2xl text-green-400">Roadmap Completed!</CardTitle>
                  <CardDescription className="mt-2">Amazing work! You can see your achievement on the dashboard.</CardDescription>
              </CardContent>
          </GlassCard>
        )}
    </div>
  );
}
