
"use client"

import { useRoadmapStore } from "@/store/roadmap-store"
import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/glass-card"
import { Progress } from "@/components/ui/progress"
import { BookOpen } from "lucide-react"

export default function ProgressChart() {
  const { startedCourses } = useRoadmapStore();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
      <GlassCard className="h-full">
        <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Your progress across all started courses.</CardDescription>
        </CardHeader>
        <CardContent>
            {startedCourses.length === 0 ? (
                 <div className="flex flex-col h-48 items-center justify-center text-center text-muted-foreground">
                    <BookOpen className="w-12 h-12" />
                    <p className="mt-4">Start a course from the roadmap to see your progress here.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {startedCourses.map((course, index) => (
                        <div key={index} className="animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-semibold">{course.title}</h4>
                                <span className="text-sm font-medium text-primary">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                             <p className="text-xs text-muted-foreground mt-1">Started on: {formatDate(course.startDate)}</p>
                        </div>
                    ))}
                </div>
            )}
        </CardContent>
    </GlassCard>
  )
}
