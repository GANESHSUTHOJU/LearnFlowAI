
"use client"

import { useRoadmapStore } from "@/store/roadmap-store"
import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/glass-card"
import { BookOpen, CheckCircle, PieChart, Star } from "lucide-react"

export default function ProgressChart() {
  const { courses } = useRoadmapStore();

  const startedCount = courses.length;
  const completedCount = courses.filter(c => c.isCompleted).length;
  const completedWithScores = courses.filter(c => c.isCompleted && c.quizScore !== null);
  
  const averageQuizScore = completedWithScores.length > 0
    ? Math.round(completedWithScores.reduce((acc, course) => acc + (course.quizScore ?? 0), 0) / completedWithScores.length)
    : null;

  return (
      <GlassCard className="h-full">
        <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Your progress across all started courses.</CardDescription>
        </CardHeader>
        <CardContent>
            {startedCount === 0 && completedCount === 0 ? (
                 <div className="flex flex-col h-48 items-center justify-center text-center text-muted-foreground">
                    <BookOpen className="w-12 h-12" />
                    <p className="mt-4">Start a course from the skills catalog or generate a roadmap to see your progress here.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-around text-center">
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                           <div className="flex items-center justify-center gap-2">
                             <Star className="w-6 h-6 text-yellow-400" />
                             <p className="text-3xl font-bold">{startedCount}</p>
                           </div>
                           <p className="text-sm text-muted-foreground">Courses Started</p>
                        </div>
                         <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                           <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-6 h-6 text-green-400" />
                            <p className="text-3xl font-bold">{completedCount}</p>
                           </div>
                           <p className="text-sm text-muted-foreground">Courses Completed</p>
                        </div>
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
                             <div className="flex items-center justify-center gap-2">
                                <PieChart className="w-6 h-6 text-blue-400" />
                                <p className="text-3xl font-bold">{averageQuizScore !== null ? `${averageQuizScore}%` : 'N/A'}</p>
                             </div>
                           <p className="text-sm text-muted-foreground">Average Quiz Score</p>
                        </div>
                    </div>
                </div>
            )}
        </CardContent>
    </GlassCard>
  )
}
