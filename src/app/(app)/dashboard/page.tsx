
import ProgressChart from "@/components/dashboard/progress-chart";
import AiInsights from "@/components/dashboard/ai-insights";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import ProgressTracker from "@/components/dashboard/progress-tracker";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, let's continue your learning journey!</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        
        {/* Central Progress Chart */}
        <div className="xl:col-span-3">
          <ProgressChart />
        </div>

        {/* Side Cards */}
        <div className="xl:col-span-2 space-y-6">
          <AiInsights />
          <ProgressTracker />
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
