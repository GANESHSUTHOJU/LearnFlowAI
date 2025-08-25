
"use client";

import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Youtube, Play, CheckCircle, HelpCircle, Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRoadmapStore } from "@/store/roadmap-store";
import { useToast } from "@/hooks/use-toast";
import QuizClient from "../quiz/quiz-client";

interface RoadmapStep {
    step: number;
    title: string;
    description: string;
    youtubeSearchQuery: string;
}

interface RoadmapDisplayProps {
  roadmapSteps: RoadmapStep[];
}

export default function RoadmapDisplay({ roadmapSteps }: RoadmapDisplayProps) {
  const { toast } = useToast();
  const { startedCourses, startCourse, completeCourse, completedCourses } = useRoadmapStore();
  const startedCourseTitles = startedCourses.map(c => c.title);

  const allStepsCompleted = roadmapSteps.every(step => completedCourses.includes(step.title));

  const handleStartCourse = (step: RoadmapStep) => {
    startCourse({ title: step.title });
    toast({
      title: "Course Started!",
      description: `"${step.title}" has been added to your dashboard.`,
    })
  }

  const handleCompleteCourse = (step: RoadmapStep) => {
    completeCourse(step.title);
    toast({
      title: "Course Completed!",
      description: `Great job on finishing "${step.title}"!`,
    })
  }

  const handleQuizClick = () => {
     if (!allStepsCompleted) {
        toast({
            variant: "destructive",
            title: "Quiz Locked",
            description: "Please complete all modules to unlock the quiz.",
        });
     }
  }

  const getYoutubeLink = (query: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
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
                {roadmapSteps.map((step) => {
                  const isStarted = startedCourseTitles.includes(step.title);
                  const isCompleted = completedCourses.includes(step.title);

                  return (
                    <div key={step.step} className="flex items-start gap-4">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg flex-shrink-0", isCompleted && "bg-green-500/20 text-green-400")}>
                        {isCompleted ? <Check className="w-5 h-5" /> : step.step}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg font-headline">{step.title}</h3>
                        {step.description && <p className="text-muted-foreground mt-1 whitespace-pre-line text-sm">{step.description}</p>}
                        <div className="mt-3 flex flex-wrap gap-2">
                             {!isStarted && !isCompleted && (
                                <Button 
                                    onClick={() => handleStartCourse(step)} 
                                    size="sm"
                                >
                                    <Play className="mr-2 h-4 w-4" /> Start Course
                                </Button>
                             )}
                             {(isStarted || isCompleted) && (
                               <>
                                 <Button asChild variant="outline" size="sm">
                                   <Link href={getYoutubeLink(step.youtubeSearchQuery)} target="_blank">
                                     <Youtube className="mr-2 h-4 w-4" /> Watch on YouTube
                                   </Link>
                                </Button>
                                 <Button 
                                    onClick={() => handleCompleteCourse(step)} 
                                    size="sm"
                                    variant="outline"
                                    disabled={isCompleted}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" /> {isCompleted ? 'Completed' : 'Mark as Complete'}
                                </Button>
                               </>
                             )}

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
                <QuizClient />
            ) : (
                 <GlassCard>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                       <Lock className="w-12 h-12 text-muted-foreground mb-4" />
                       <h3 className="font-bold text-xl">Quiz Locked</h3>
                       <p className="text-muted-foreground mt-2">You must complete all roadmap steps to unlock the final quiz.</p>
                       <Button onClick={handleQuizClick} variant="outline" className="mt-4">
                           Unlock Quiz
                       </Button>
                    </CardContent>
                </GlassCard>
            )}
        </div>
    </div>
  );
}
