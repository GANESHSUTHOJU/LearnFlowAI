
"use client";

import { useState } from "react";
import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Youtube, Play, CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRoadmapStore } from "@/store/roadmap-store";
import { useToast } from "@/hooks/use-toast";

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
  const { startedCourses, startCourse, completeCourse } = useRoadmapStore();
  const startedCourseTitles = startedCourses.map(c => c.title);
  const completedCourseTitles = startedCourses.filter(c => c.progress === 100).map(c => c.title);

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

  const getYoutubeLink = (query: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
        <GlassCard>
        <CardHeader>
            <CardTitle>Your Personalized Roadmap</CardTitle>
            <CardDescription>Follow these steps to achieve your learning goal.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
            {roadmapSteps.map((step) => {
              const isStarted = startedCourseTitles.includes(step.title);
              const isCompleted = completedCourseTitles.includes(step.title);

              return (
                <div key={step.step} className="flex items-start gap-4">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg flex-shrink-0", isCompleted && "bg-green-500/20 text-green-400")}>
                    {isCompleted ? <Check className="w-5 h-5" /> : step.step}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg font-headline">{step.title}</h3>
                    {step.description && <p className="text-muted-foreground mt-1 whitespace-pre-line text-sm">{step.description}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                         {!isStarted && (
                            <Button 
                                onClick={() => handleStartCourse(step)} 
                                size="sm"
                            >
                                <Play className="mr-2 h-4 w-4" /> Start Course
                            </Button>
                         )}
                         {isStarted && (
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
                    <p className="text-muted-foreground mt-1 text-sm">Congratulations on completing your learning journey!</p>
                </div>
                </div>
            </div>
        </CardContent>
        </GlassCard>
    </div>
  );
}
