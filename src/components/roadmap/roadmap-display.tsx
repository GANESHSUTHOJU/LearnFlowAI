"use client";

import { GlassCard, CardContent, CardHeader, CardTitle } from "@/components/ui/glass-card";
import { Check } from "lucide-react";

interface RoadmapDisplayProps {
  roadmap: string;
}

const parseRoadmap = (roadmapText: string) => {
    // Basic parsing assuming "Step X:" or "Module X:" format.
    const steps = roadmapText.split(/Step \d+:|Module \d+:/).filter(step => step.trim() !== "");
    if (steps.length > 1) {
        return steps.map((step, index) => {
            const [title, ...descriptionParts] = step.trim().split('\n');
            const description = descriptionParts.join('\n').trim();
            return { title: title.replace(/- /g, '').trim(), description };
        });
    }
    // Fallback for unstructured text
    return roadmapText.split('\n').filter(line => line.trim() !== "").map(line => ({ title: line, description: "" }));
};


export default function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  const roadmapSteps = parseRoadmap(roadmap);

  return (
    <GlassCard>
      <CardHeader>
        <CardTitle>Your Personalized Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
          {roadmapSteps.map((step, index) => (
            <div key={index} className="relative mb-8">
              <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-primary -translate-x-1/2"></div>
              <div className="pl-6">
                <h3 className="font-bold text-lg font-headline">{step.title}</h3>
                {step.description && <p className="text-muted-foreground mt-1 whitespace-pre-line">{step.description}</p>}
              </div>
            </div>
          ))}
           <div className="relative">
              <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-accent -translate-x-1/2"></div>
              <div className="pl-6">
                <h3 className="font-bold text-lg font-headline text-accent">Goal Achieved!</h3>
              </div>
            </div>
        </div>
      </CardContent>
    </GlassCard>
  );
}
