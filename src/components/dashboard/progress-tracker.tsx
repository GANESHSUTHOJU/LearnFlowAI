
"use client";

import { useRoadmapStore } from "@/store/roadmap-store";
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, GitMerge, CheckCircle, PieChart } from "lucide-react";
import Link from "next/link";
import { Progress } from "../ui/progress";

export default function ProgressTracker() {
    const { courses } = useRoadmapStore();
    const activeCourses = courses.filter(c => !c.isCompleted);

    return (
        <GlassCard>
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <GitMerge className="w-6 h-6" />
                    </div>
                    <div>
                        <CardTitle>Active Learning</CardTitle>
                        <CardDescription>Your current learning activities.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {activeCourses.length > 0 ? (
                    <div className="space-y-4">
                        <ul className="space-y-4">
                            {activeCourses.slice(0, 3).map((course, index) => (
                                <li key={index} className="space-y-2">
                                    <p className="font-semibold">{course.title}</p>
                                    <div className="flex items-center gap-4">
                                        <Progress value={course.modulesCompleted / course.totalModules * 100} className="w-[70%]" />
                                        <span className="text-xs text-muted-foreground">{course.modulesCompleted}/{course.totalModules} Modules</span>
                                    </div>
                                    {course.quizScore !== null && (
                                         <div className="flex items-center text-sm text-muted-foreground gap-2">
                                            <PieChart className="w-4 h-4" />
                                            <span>Quiz Score: {course.quizScore}%</span>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center justify-center h-20 text-center text-muted-foreground">
                            <p>You don't have any active courses.</p>
                            <p className="text-sm">Start a new skill to begin!</p>
                        </div>
                    </>
                )}
                 <Button variant="outline" className="w-full mt-6 group" asChild>
                    <Link href="/skills">
                        Explore Skills <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </CardContent>
        </GlassCard>
    )
}
