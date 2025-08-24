
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";

export default function Home() {
  const features = [
    "Personalized Learning Roadmaps",
    "Adaptive Quizzes & Feedback",
    "AI-Powered Tutoring",
    "Comprehensive Skill Catalog"
  ];

  return (
    <main className="flex flex-col min-h-[calc(100vh-40px)] items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      
      {/* Decorative Floating Bars */}
      <div className="absolute top-1/4 left-0 w-32 h-2 bg-primary/30 rounded-full animate-float-x-slow-1 opacity-50" />
      <div className="absolute top-1/2 right-0 w-24 h-2 bg-accent/30 rounded-full animate-float-x-slow-2 opacity-50" />
      <div className="absolute bottom-1/4 left-1/4 w-16 h-1 bg-secondary rounded-full animate-float-x-fast-1 opacity-60" />
      <div className="absolute bottom-1/3 right-1/4 w-20 h-1.5 bg-primary/40 rounded-full animate-float-x-fast-2 opacity-50" />

      <div className="z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
        
        {/* Left Side: Headline and Description */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-bold font-headline pb-2 text-gradient">
            LearnFlowAI
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
            Your personal AI-powered guide to mastering new skills. Generate
            learning roadmaps, take adaptive quizzes, and track your progress
            like never before.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
             <Button asChild size="lg" className="group">
              <Link href="/login">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/skills">
                Explore Skills
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Side: Floating Card */}
        <div className="relative animate-float-slow hidden lg:block">
            <div className="bg-card/60 backdrop-blur-lg border border-white/5 shadow-2xl rounded-2xl p-8 transform transition-transform duration-500 hover:scale-105">
                <div className="flex items-center gap-4">
                    <Logo className="w-12 h-12 text-primary" />
                    <div>
                        <h2 className="text-2xl font-bold font-headline">Unlock Your Potential</h2>
                        <p className="text-muted-foreground text-sm">Join today and start your journey.</p>
                    </div>
                </div>
                <ul className="mt-6 space-y-3">
                    {features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-accent" />
                            <span className="text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </main>
  );
}
