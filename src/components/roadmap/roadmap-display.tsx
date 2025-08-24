
"use client";

import { useState } from "react";
import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Youtube, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [startedSteps, setStartedSteps] = useState<number[]>([]);

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((s) => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const startStep = (stepNumber: number) => {
    setStartedSteps((prev) => [...prev, stepNumber]);
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
            {roadmapSteps.map((step) => (
                <div key={step.step} className="flex items-start gap-4">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg flex-shrink-0", completedSteps.includes(step.step) && "bg-green-500/20 text-green-400")}>
                    {completedSteps.includes(step.step) ? <Check /> : step.step}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg font-headline">{step.title}</h3>
                    {step.description && <p className="text-muted-foreground mt-1 whitespace-pre-line text-sm">{step.description}</p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                        {!startedSteps.includes(step.step) ? (
                             <Button onClick={() => startStep(step.step)} size="sm">
                                <Play className="mr-2" /> Start Course
                            </Button>
                        ) : (
                            <div className="flex flex-wrap gap-2 animate-in fade-in duration-300">
                                <Button asChild variant="outline" size="sm">
                                <Link href={getYoutubeLink(step.youtubeSearchQuery)} target="_blank">
                                    <Youtube className="mr-2" /> Watch on YouTube
                                </Link>
                                </Button>
                                <Button onClick={() => toggleStep(step.step)} variant={completedSteps.includes(step.step) ? "secondary" : "default"} size="sm">
                                    <Check className="mr-2" /> {completedSteps.includes(step.step) ? 'Mark as Incomplete' : 'Mark as Complete'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                </div>
            ))}
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
