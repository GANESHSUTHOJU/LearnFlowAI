
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-40px)] items-center justify-center p-8">
      <div className="z-10 flex flex-col items-center text-center max-w-2xl">
        <Logo className="w-20 h-20 mb-6 text-primary" />
        <h1 className="text-5xl md:text-7xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 pb-2">
          LearnFlowAI
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          Your personal AI-powered guide to mastering new skills. Generate
          learning roadmaps, take adaptive quizzes, and track your progress
          like never before.
        </p>
        <div className="mt-8 flex gap-4">
          <Button asChild size="lg" className="group">
            <Link href="/login">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
