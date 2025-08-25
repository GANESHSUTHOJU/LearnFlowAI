
'use client';

import { useState } from "react";
import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Wand2, Lightbulb, Code } from "lucide-react";
import { generateProjectPlan, type GenerateProjectPlanOutput } from "@/ai/flows/generate-project-plan";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  const [description, setDescription] = useState("");
  const [projectPlan, setProjectPlan] = useState<GenerateProjectPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    setIsLoading(true);
    setError(null);
    setProjectPlan(null);

    try {
      const result = await generateProjectPlan({ projectDescription: description });
      setProjectPlan(result);
    } catch (err) {
      setError("Sorry, I couldn't generate a project plan. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Project Planner</h1>
        <p className="text-muted-foreground">
          Describe your project idea, and I'll generate a step-by-step plan for you.
        </p>
      </div>

      <GlassCard>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label htmlFor="description">Project Idea</Label>
              <Textarea
                id="description"
                placeholder="e.g., 'A mobile app that tracks personal reading habits and suggests new books.'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardContent className="p-6 pt-0">
            <Button type="submit" className="w-full" disabled={isLoading || !description}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Plan
            </Button>
          </CardContent>
        </form>
      </GlassCard>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {projectPlan && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <GlassCard>
            <CardHeader>
              <CardTitle>{projectPlan.projectName}</CardTitle>
              <CardDescription>{projectPlan.projectSummary}</CardDescription>
            </CardHeader>
          </GlassCard>
          
          <h2 className="text-2xl font-bold font-headline">Your Project Plan</h2>

          <div className="space-y-6">
            {projectPlan.plan.map((step) => (
              <GlassCard key={step.step}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg flex-shrink-0">
                        {step.step}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <CardDescription className="pt-2">{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-muted-foreground" />
                      <h4 className="font-semibold">Suggested Tech:</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {step.technologies.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                    </div>
                </CardContent>
              </GlassCard>
            ))}
             <GlassCard>
                <CardHeader className="text-center">
                    <Lightbulb className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
                    <CardTitle>Happy Building!</CardTitle>
                    <CardDescription>This plan is a guide. Feel free to adapt it to your needs.</CardDescription>
                </CardHeader>
             </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}
