
"use client";

import { CompletedCourses } from "@/components/dashboard/completed-courses";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { AiInsights } from "@/components/dashboard/ai-insights";
import { useProgressStore } from "@/store/progress-store";
import { Logo } from "@/components/logo";

export default function DashboardPage() {
    const { loading } = useProgressStore();

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center -mt-20">
                <div className="flex flex-col items-center gap-4">
                    <Logo className="h-10 w-10 animate-spin" />
                    <p className="text-muted-foreground">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

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
