
"use client";

import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/glass-card";
import { Check, Rocket } from "lucide-react";

interface RoadmapDisplayProps {
  roadmap: string;
}

const parseRoadmap = (roadmapText: string) => {
    // Improved parsing to handle more complex structures.
    const steps = roadmapText.split(/\n(?=(?:Step|Module|Week) \d+:)/).filter(step => step.trim() !== "");
    
    if (steps.length > 0) {
        return steps.map((step) => {
            const lines = step.trim().split('\n');
            const title = lines[0].replace(/(?:Step|Module|Week) \d+:/, '').trim();
            const description = lines.slice(1).join('\n').trim();
            return { title, description };
        });
    }

    // Fallback for simple newline-separated text
    return roadmapText.split('\n').filter(line => line.trim() !== "").map(line => ({ title: line.replace(/^- /, '').trim(), description: "" }));
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
        <div className="relative pl-6">
          <div className="absolute left-[1.125rem] top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
          {roadmapSteps.map((step, index) => (
            <div key={index} className="relative mb-8 pl-8">
              <div className="absolute left-0 top-1">
                <div className="w-9 h-9 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center -translate-x-1/2">
                  <Check className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="pl-6 pt-1">
                <h3 className="font-bold text-lg font-headline">{step.title}</h3>
                {step.description && <p className="text-muted-foreground mt-1 whitespace-pre-line text-sm">{step.description}</p>}
              </div>
            </div>
          ))}
           <div className="relative pl-8">
               <div className="absolute left-0 top-1">
                <div className="w-9 h-9 rounded-full bg-accent/20 border-4 border-background flex items-center justify-center -translate-x-1/2">
                    <Rocket className="w-4 h-4 text-accent" />
                </div>
              </div>
              <div className="pl-6 pt-1">
                <h3 className="font-bold text-lg font-headline text-accent">Goal Achieved!</h3>
                <p className="text-muted-foreground mt-1 text-sm">Congratulations on completing your learning journey!</p>
              </div>
            </div>
        </div>
      </CardContent>
    </GlassCard>
  );
}
