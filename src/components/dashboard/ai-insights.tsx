"use client";

import { Lightbulb } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const insights = [
    "You excel at frontend frameworks. Consider diving deeper into state management with Zustand.",
    "Your progress in Python is steady. Try a small data analysis project to solidify your skills.",
    "Based on your interest in UI/UX, learning Figma could be a great next step."
]

export const AiInsights = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
          <span>AI-Powered Insights</span>
        </CardTitle>
        <CardDescription>
          Personalized recommendations to guide your learning journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3 list-disc pl-5 text-sm text-muted-foreground">
            {insights.map((insight, index) => (
                <li key={index}>{insight}</li>
            ))}
        </ul>
        <Button variant="outline" size="sm">
            Generate New Insights
        </Button>
      </CardContent>
    </Card>
  );
};
