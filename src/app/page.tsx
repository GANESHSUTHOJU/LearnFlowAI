"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, BrainCircuit, Zap, CheckCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { GlassCard } from "@/components/ui/glass-card";

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } },
};

export default function HomePage() {
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <div className="flex flex-col min-h-[100vh] bg-[#222222] text-white font-sans">
       <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-indigo-400" />
          <h1 className="text-2xl font-bold font-display text-white">LearnFlowAI</h1>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/login" legacyBehavior passHref>
             <Button asChild variant="ghost" className="text-white hover:bg-white/10">
              <a>Login</a>
            </Button>
          </Link>
          <Link href="/signup" legacyBehavior passHref>
             <Button asChild className="bg-indigo-500 text-white hover:bg-indigo-600 rounded-full">
                <a>Sign Up</a>
             </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full pt-32 md:pt-48 lg:pt-56 pb-16 md:pb-24 lg:pb-32">
        <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-600 opacity-20 blur-[100px]"></div></div>

          <div className="container px-4 md:px-6">
            <div className="grid max-w-[1300px] mx-auto gap-8 md:grid-cols-2 md:gap-16">
              <motion.div
                initial="hidden"
                animate="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.15 } },
                }}
                className="flex flex-col items-start space-y-6"
              >
                <motion.h1
                  variants={FADE_UP_ANIMATION_VARIANTS}
                  className="font-display lg:leading-tight text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl"
                >
                  AI-Powered Learning,<br />
                  <span className="text-indigo-400">Personalized for You</span>
                </motion.h1>
                <motion.p
                  variants={FADE_UP_ANIMATION_VARIANTS}
                  className="mx-auto max-w-[700px] text-gray-300 md:text-xl"
                >
                  Generate dynamic roadmaps, get adaptive coaching, and predict your success. LearnFlowAI is your personal guide to mastering any skill.
                </motion.p>
                <motion.div
                  variants={FADE_UP_ANIMATION_VARIANTS}
                  className="w-full max-w-md space-y-2"
                >
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="What do you want to learn today?"
                      className="max-w-lg flex-1 bg-white/10 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 h-12 rounded-full px-6"
                    />
                    <Link href="/roadmap" passHref>
                      <Button asChild type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full h-12 px-8">
                          <a>
                            Start Learning
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                 <GlassCard className="relative">
                    <Image
                    src="https://picsum.photos/600/400"
                    data-ai-hint="abstract learning"
                    width="600"
                    height="400"
                    alt="Hero"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                    />
                    <div className="absolute -bottom-8 -left-12">
                        <GlassCard className="p-4">
                            <p className="text-sm font-bold">Personalized Roadmap</p>
                            <p className="text-xs text-gray-300">Generated in seconds</p>
                        </GlassCard>
                    </div>
                     <div className="absolute -top-8 -right-12">
                        <GlassCard className="p-4 flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-400"/>
                            <p className="text-sm font-bold">AI Tutor Ready</p>
                        </GlassCard>
                    </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section
          ref={featuresRef}
          initial="hidden"
          animate={featuresInView ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="w-full py-20 md:py-28 lg:py-32"
        >
          <div className="container space-y-16 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                variants={FADE_UP_ANIMATION_VARIANTS}
                className="inline-block rounded-full bg-indigo-500/20 text-indigo-300 text-sm px-4 py-1 font-medium"
              >
                Core Features
              </motion.div>
              <motion.h2
                variants={FADE_UP_ANIMATION_VARIANTS}
                className="text-3xl font-bold tracking-tighter sm:text-5xl font-display"
              >
                An Entirely New Way to Learn
              </motion.h2>
              <motion.p
                variants={FADE_UP_ANIMATION_VARIANTS}
                className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              >
                Our AI-driven platform adapts to your unique learning style, ensuring you achieve your goals faster and more effectively.
              </motion.p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
                <GlassCard className="grid gap-4 h-full">
                  <BrainCircuit className="h-8 w-8 text-indigo-400" />
                  <h3 className="text-xl font-bold font-display">Roadmap Generator</h3>
                  <p className="text-sm text-gray-300">
                    Generates personalized learning roadmaps using A* search, Beam Search, and Constraint Satisfaction.
                  </p>
                </GlassCard>
              </motion.div>
              <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
                <GlassCard className="grid gap-4 h-full">
                  <CheckCircle className="h-8 w-8 text-teal-400" />
                  <h3 className="text-xl font-bold font-display">Adaptive Quiz Coach</h3>
                  <p className="text-sm text-gray-300">
                    An RL-powered tool that uses quiz history and skill graph data to suggest the most relevant questions.
                  </p>
                </GlassCard>
              </motion.div>
              <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
                <GlassCard className="grid gap-4 h-full">
                  <Zap className="h-8 w-8 text-yellow-400" />
                  <h3 className="text-xl font-bold font-display">Performance Predictor</h3>
                  <p className="text-sm text-gray-300">
                    Predicts learner performance, difficulty level, and dropout risk using Bayesian Networks.
                  </p>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        <motion.section
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "show" : "hidden"}
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="w-full py-20 md:py-28 lg:py-32"
        >
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-5xl font-display">
                Ready to Unlock Your Potential?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed">
                Join LearnFlowAI today and start your personalized learning journey. It's free to get started.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Link href="/signup" passHref>
                <Button asChild size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full h-12 px-8 text-base">
                  <a>
                    Sign Up for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} LearnFlowAI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-400">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-400">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
