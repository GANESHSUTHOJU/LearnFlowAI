
"use client";

import { useRoadmapStore } from "@/store/roadmap-store";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { CheckCircle, PieChart, Trophy } from "lucide-react";

export default function CompletedCourses() {
    const { courses } = useRoadmapStore();
    const completedCourses = courses.filter(c => c.isCompleted);

    return (
        <GlassCard>
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                        <CardTitle>Completed Courses</CardTitle>
                        <CardDescription>A record of your achievements.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {completedCourses.length > 0 ? (
                    <div className="space-y-4">
                        <ul className="space-y-4">
                            {completedCourses.map((course, index) => (
                                <li key={index} className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                       <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                       <p className="font-semibold">{course.title}</p>
                                    </div>
                                    {course.quizScore !== null && (
                                         <div className="flex items-center text-sm text-muted-foreground gap-2 flex-shrink-0">
                                            <PieChart className="w-4 h-4" />
                                            <span className="font-bold">{course.quizScore}%</span>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center justify-center h-20 text-center text-muted-foreground">
                            <p>You haven't completed any courses yet.</p>
                            <p className="text-sm">Finish a course to see it here!</p>
                        </div>
                    </>
                )}
            </CardContent>
        </GlassCard>
    )
}
