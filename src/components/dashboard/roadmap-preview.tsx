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
                 <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
                    <p>You haven't generated a roadmap yet.</p>
                    <p className="text-sm">Create one to start your journey!</p>
                </div>
                <Button variant="outline" className="w-full mt-6 group" asChild>
                    <Link href="/roadmap">
                        Generate a Roadmap <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </CardContent>
        </GlassCard>
    )
}
