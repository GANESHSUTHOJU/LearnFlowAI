import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import ProgressChart from "@/components/dashboard/progress-chart";
import RoadmapPreview from "@/components/dashboard/roadmap-preview";
import AiInsights from "@/components/dashboard/ai-insights";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Lightbulb } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, let's continue your learning journey!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Your progress across all skills.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart />
          </CardContent>
        </GlassCard>

        <AiInsights />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RoadmapPreview />
        
        <GlassCard>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                        <CardTitle>Continue Learning</CardTitle>
                        <CardDescription>Jump back into your last lesson.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Advanced CSS Techniques</h3>
                    <p className="text-sm text-muted-foreground">You are 75% through this module. Keep up the great work!</p>
                    <Button className="w-full group">
                        Continue Lesson <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </CardContent>
        </GlassCard>
      </div>
    </div>
  );
}
