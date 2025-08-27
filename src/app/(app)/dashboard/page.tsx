
import ProgressChart from "@/components/dashboard/progress-chart";
import AiInsights from "@/components/dashboard/ai-insights";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import ProgressTracker from "@/components/dashboard/progress-tracker";
import CompletedCourses from "@/components/dashboard/completed-courses";

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
          <CompletedCourses />
        </div>
      </div>
    </div>
  );
}
