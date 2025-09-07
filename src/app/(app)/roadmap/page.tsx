
'use client';

import { useState, useEffect } from "react";
import GeneratorForm from "@/components/roadmap/generator-form";
import RoadmapDisplay from "@/components/roadmap/roadmap-display";
import { generatePersonalizedRoadmap, type GeneratePersonalizedRoadmapOutput } from "@/ai/flows/generate-personalized-roadmap";
import { generateQuiz, type GenerateQuizOutput } from "@/ai/flows/generate-quiz";
import { useSearchParams } from "next/navigation";
import { Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { roadmapToSpeech, RoadmapToSpeechOutput } from "@/ai/flows/roadmap-to-speech";
import { useToast } from "@/hooks/use-toast";
import { GlassCard } from "@/components/ui/glass-card";
import { CardContent } from "@/components/ui/card";

type QuizQuestion = GenerateQuizOutput['quiz'][0];

export default function RoadmapPage() {
  const searchParams = useSearchParams();
  const goalParam = searchParams.get("goal");
  const skillLevelParam = searchParams.get("skillLevel");

  const [roadmapData, setRoadmapData] = useState<GeneratePersonalizedRoadmapOutput | null>(null);
  const [quizData, setQuizData] = useState<QuizQuestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [audioData, setAudioData] = useState<RoadmapToSpeechOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (goal: string, skillLevel: string) => {
    setIsLoading(true);
    setIsGeneratingQuiz(false);
    setError(null);
    setRoadmapData(null);
    setQuizData(null);
    try {
      const roadmapResponse = await generatePersonalizedRoadmap({
        goal: goal,
        currentSkillLevel: skillLevel,
        skillOntology: "Web Development: HTML, CSS, JavaScript, React, Node.js, Databases",
      });
      setRoadmapData(roadmapResponse);

      // Now generate the quiz
      setIsGeneratingQuiz(true);
      toast({
        title: "Generating Your Quiz...",
        description: "The roadmap is ready. Now the AI is creating your questions.",
      });
      const quizResponse = await generateQuiz({
          goal: goal,
          currentSkillLevel: skillLevel,
      });
      setQuizData(quizResponse.quiz);

    } catch (e) {
      console.error(e);
      setError("Could not generate the roadmap or quiz. Please try again.");
    } finally {
      setIsLoading(false);
      setIsGeneratingQuiz(false);
    }
  }
  
  const handleReadAloud = async () => {
    if (!roadmapData) return;
    
    setIsReadingAloud(true);
    try {
      const roadmapText = roadmapData.roadmap.map(step => `Step ${step.step}: ${step.title}. ${step.description}`).join('\n');
      const response = await roadmapToSpeech({ roadmapText });
      setAudioData(response);
    } catch(e) {
      console.error(e);
      setError("Could not generate audio for the roadmap.");
    } finally {
      setIsReadingAloud(false);
    }
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Roadmap Generator</h1>
        <p className="text-muted-foreground">
          Generate a personalized learning roadmap based on your goals.
        </p>
      </div>

      <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
      
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Generating your personalized roadmap...</p>
        </div>
      )}

      {roadmapData && (
        <div className="space-y-4">
            <Button onClick={handleReadAloud} disabled={isReadingAloud}>
                {isReadingAloud ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                )}
                Read Aloud
            </Button>
            {audioData && (
                 <audio controls src={audioData.audioDataUri} className="w-full">
                    Your browser does not support the audio element.
                </audio>
            )}
          <RoadmapDisplay 
            roadmap={roadmapData} 
            quiz={quizData} 
            isGeneratingQuiz={isGeneratingQuiz}
          />
        </div>
      )}
      {error && <p className="text-destructive">{error}</p>}
    </div>
  );
}
