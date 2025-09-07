"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generatePersonalizedRoadmap } from "@/ai/flows/generate-personalized-roadmap";
import { useRoadmapStore } from "@/store/roadmap-store";
import { RoadmapDisplay } from "@/components/roadmap/roadmap-display";
import { generateQuiz, Quiz } from "@/ai/flows/generate-quiz";
import { generateProjectPlan, ProjectPlan } from "@/ai/flows/generate-project-plan";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedError from "@/components/ui/animated-error";
import { toast } from "sonner";


export default function RoadmapPage() {
  const { 
    topic, setTopic, 
    roadmap, setRoadmap,
    isLoading, setIsLoading,
    error, setError
  } = useRoadmapStore();
  
  const router = useRouter();


  const handleGenerate = async () => {
    if (!topic) return;
    setIsLoading(true);
    setRoadmap(null);
    setError(null);
    try {
      const result = await generatePersonalizedRoadmap(topic);
      setRoadmap(result);
      toast.success(`Roadmap for "${topic}" generated!`);
    } catch (e) {
      console.error("Error generating roadmap:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Sorry, I had trouble generating that roadmap. ${errorMessage}`);
      toast.error("Failed to generate roadmap.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTakeQuiz = (quizTopic: string) => {
    // For now, we just navigate. In a real app, you might generate and pass the quiz.
    router.push(`/quiz?topic=${encodeURIComponent(quizTopic)}`);
  };

  const handleStartProject = (projectTopic: string) => {
    // For now, we just navigate.
    router.push(`/projects?topic=${encodeURIComponent(projectTopic)}`);
  };


  return (
    <main>
      <div className="max-w-4xl mx-auto">
        {!roadmap && !isLoading && !error && (
            <div className="text-center py-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              Create Your Learning Roadmap
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Enter any topic you want to master, and our AI will generate a
              personalized, step-by-step learning plan for you.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'Learn React Native' or 'Master Sourdough Baking'"
            className="flex-grow text-base h-12"
            disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <Button onClick={handleGenerate} disabled={isLoading || !topic} size="lg">
            {isLoading ? "Generating..." : "Generate Roadmap"}
          </Button>
        </div>

        {isLoading && (
          <div className="space-y-8">
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-8 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        )}

        {error && <AnimatedError message={error} />}

        {roadmap && (
            <RoadmapDisplay 
                roadmap={roadmap}
                onTakeQuiz={handleTakeQuiz}
                onStartProject={handleStartProject}
            />
        )}
      </div>
    </main>
  );
}
