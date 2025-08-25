
'use client';

import { useState } from "react";
import GeneratorForm from "@/components/roadmap/generator-form";
import RoadmapDisplay from "@/components/roadmap/roadmap-display";
import { generatePersonalizedRoadmap, type GeneratePersonalizedRoadmapOutput } from "@/ai/flows/generate-personalized-roadmap";
import { useSearchParams } from "next/navigation";
import { Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { roadmapToSpeech, RoadmapToSpeechOutput } from "@/ai/flows/roadmap-to-speech";

export default function RoadmapPage() {
  const searchParams = useSearchParams();
  const goal = searchParams.get("goal");
  const skillLevel = searchParams.get("skillLevel");

  const [roadmapData, setRoadmapData] = useState<GeneratePersonalizedRoadmapOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [audioData, setAudioData] = useState<RoadmapToSpeechOutput | null>(null);

  const handleGenerate = async (goal: string, skillLevel: string) => {
    setIsLoading(true);
    setError(null);
    setRoadmapData(null);
    try {
      const response = await generatePersonalizedRoadmap({
        goal: goal,
        currentSkillLevel: skillLevel,
        skillOntology: "Web Development: HTML, CSS, JavaScript, React, Node.js, Databases",
      });
      setRoadmapData(response);
    } catch (e) {
      console.error(e);
      setError("Could not generate roadmap. Please try again.");
    } finally {
      setIsLoading(false);
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
          <RoadmapDisplay roadmap={roadmapData} />
        </div>
      )}
      {error && <p className="text-destructive">{error}</p>}
    </div>
  );
}
