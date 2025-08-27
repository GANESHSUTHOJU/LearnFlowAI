
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
    <main className="flex flex-col min-h-[calc(100vh-40px)] items-center justify-center p-4 sm:p-8 relative">
       <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -left-40 -top-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float-x-slow-1"></div>
        <div className="absolute -right-40 -bottom-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-float-x-slow-2"></div>
        <div className="absolute left-1/3 top-1/4 h-40 w-40 rounded-full bg-primary/10 blur-2xl animate-float-x-fast-1"></div>
        <div className="absolute right-1/3 bottom-1/4 h-40 w-40 rounded-full bg-accent/10 blur-2xl animate-float-x-fast-2"></div>
      </div>
      
      <div className="z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
        
        {/* Left Side: Headline and Description */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-bold font-headline pb-2 text-foreground">
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
