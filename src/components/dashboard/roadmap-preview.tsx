import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CircleDot, GitMerge } from "lucide-react";
import Link from "next/link";

const roadmapSteps = [
    { title: "HTML Fundamentals", completed: true },
    { title: "CSS Basics", completed: true },
    { title: "JavaScript Essentials", completed: false },
    { title: "React Core Concepts", completed: false },
]

export default function RoadmapPreview() {
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
                <div className="space-y-4">
                    {roadmapSteps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-6 h-6">
                                {step.completed ? 
                                    <CircleDot className="w-4 h-4 text-primary" /> : 
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                                }
                            </div>
                            <span className={`${step.completed ? 'text-muted-foreground' : 'text-foreground'}`}>
                                {step.title}
                            </span>
                        </div>
                    ))}
                </div>
                <Button variant="outline" className="w-full mt-6 group" asChild>
                    <Link href="/roadmap">
                        View Full Roadmap <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </CardContent>
        </GlassCard>
    )
}
