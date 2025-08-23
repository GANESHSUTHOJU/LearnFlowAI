
"use client";

import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/glass-card";
import { Check, Rocket } from "lucide-react";

interface RoadmapDisplayProps {
  roadmap: string;
}

const parseRoadmap = (roadmapText: string) => {
    // Improved parsing to handle numbered lists.
    const steps = roadmapText.split(/\n(?=\d+\.\s)/).filter(step => step.trim() !== "");
    
    if (steps.length > 0) {
        return steps.map((step) => {
            const match = step.trim().match(/(\d+)\.\s(.*?):\s(.*)/);
            if (match) {
                const [, stepNumber, title, description] = match;
                return { title: title.trim(), description: description.trim(), stepNumber };
            }
            // Fallback for simple lines
            const simpleMatch = step.trim().match(/(\d+)\.\s(.*)/);
            if (simpleMatch) {
                 const [, stepNumber, title] = simpleMatch;
                 return { title: title.trim(), description: "", stepNumber };
            }
            return { title: step.trim(), description: "", stepNumber: "" };
        });
    }

    // Fallback for simple newline-separated text
    return roadmapText.split('\n').filter(line => line.trim() !== "").map((line, index) => ({ title: line.replace(/^- /, '').trim(), description: "", stepNumber: (index + 1).toString() }));
};


export default function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  const roadmapSteps = parseRoadmap(roadmap);

  return (
    <GlassCard>
      <CardHeader>
        <CardTitle>Your Personalized Roadmap</CardTitle>
        <CardDescription>Follow these steps to achieve your learning goal.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {roadmapSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                {step.stepNumber || index + 1}
              </div>
              <div>
                <h3 className="font-bold text-lg font-headline">{step.title}</h3>
                {step.description && <p className="text-muted-foreground mt-1 whitespace-pre-line text-sm">{step.description}</p>}
              </div>
            </div>
          ))}
          <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
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
  );
}
