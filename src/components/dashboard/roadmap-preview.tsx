import { GlassCard, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, GitMerge } from "lucide-react";
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
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-muted-foreground" />}
                            </div>
                            <span className={`${step.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
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
