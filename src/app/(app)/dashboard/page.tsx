import { CompletedCourses } from "@/components/dashboard/completed-courses";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { AiInsights } from "@/components/dashboard/ai-insights";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-primary">
                    Dashboard
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Welcome back! Here's a summary of your learning journey.
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ProgressChart />
                </div>
                <div className="space-y-8">
                    <ProgressTracker />
                    <CompletedCourses />
                </div>
            </div>
            <div>
                <AiInsights />
            </div>
        </div>
    )
}
