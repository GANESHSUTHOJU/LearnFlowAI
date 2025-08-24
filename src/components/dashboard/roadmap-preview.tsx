
import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CircleDot, GitMerge } from "lucide-react";
import Link from "next/link";

const roadmapSteps = [
    { title: "HTML Fundamentals", completed: false },
    { title: "CSS Basics", completed: false },
    { title: "JavaScript Essentials", completed: false },
    { title: "React Core Concepts", completed: false },
]

export default function RoadmapPreview() {
    // In a real app, you would fetch the user's roadmap here.
    // For this prototype, we'll assume they don't have one yet
    // to show the prompt to generate one.
    const hasRoadmap = false;

    return (
        <GlassCard>
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        <GitMerge className="w-6 h-6" />
                    </div>
                    <div>
                        <CardTitle>Your Roadmap</CardTitle>
                        <CardDescription>Your personalized path to success.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {hasRoadmap ? (
                    <div className="space-y-4">
                        <ul className="space-y-3">
                            {roadmapSteps.slice(0, 4).map((step, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <CircleDot className="w-4 h-4 text-primary" />
                                    <span>{step.title}</span>
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" className="w-full group" asChild>
                            <Link href="/roadmap">
                                View Full Roadmap <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
                            <p>You haven't generated a roadmap yet.</p>
                            <p className="text-sm">Create one to start your journey!</p>
                        </div>
                        <Button variant="outline" className="w-full mt-6 group" asChild>
                            <Link href="/roadmap">
                                Generate a Roadmap <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </>
                )}
            </CardContent>
        </GlassCard>
    )
}
