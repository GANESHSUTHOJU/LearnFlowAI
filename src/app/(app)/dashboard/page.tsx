import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import ProgressChart from "@/components/dashboard/progress-chart";
import RoadmapPreview from "@/components/dashboard/roadmap-preview";
import AiInsights from "@/components/dashboard/ai-insights";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, let's continue your learning journey!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <GlassCard>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>Your progress across all skills.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressChart />
            </CardContent>
          </GlassCard>
          <RoadmapPreview />
        </div>
        <div className="space-y-6">
          <AiInsights />
          <GlassCard>
              <CardHeader>
                  <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                          <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                          <CardTitle>Start Learning</CardTitle>
                          <CardDescription>Begin your journey by picking a new skill.</CardDescription>
                      </div>
                  </div>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Explore the Skill Catalog</h3>
                      <p className="text-sm text-muted-foreground">Browse our available skills and choose what you want to learn next.</p>
                      <Button className="w-full group" asChild>
                          <Link href="/skills">
                            Explore Skills <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </Link>
                      </Button>
                  </div>
              </CardContent>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
