
"use client";

import { useState, useEffect } from "react";
import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Youtube, Lock, AlertTriangle, ArrowRight, XCircle, CheckCircle as CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRoadmapStore } from "@/store/roadmap-store";
import { useToast } from "@/hooks/use-toast";
import type { GeneratePersonalizedRoadmapOutput } from "@/ai/flows/generate-personalized-roadmap";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RoadmapDisplayProps {
  roadmap: GeneratePersonalizedRoadmapOutput;
}

export default function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  const { toast } = useToast();
  const { courses, completeModule, updateQuizScore, startCourse } = useRoadmapStore();
  
  const roadmapTitle = "Generated Roadmap"; // Or derive from roadmap.goal
  
  useEffect(() => {
    startCourse({
        title: roadmapTitle,
        totalModules: roadmap.roadmap.length,
    })
  }, [roadmap, startCourse, roadmapTitle]);

  const currentCourse = courses.find(c => c.title === roadmapTitle);
  const completedModules = currentCourse?.completedModules || [];
  const allStepsCompleted = roadmap.roadmap.every(step => completedModules.includes(step.title));


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = roadmap.quiz[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  const handleCompleteModule = (title: string) => {
    completeModule(roadmapTitle, title);
    toast({
      title: "Module Completed!",
      description: `Great job on finishing "${title}"!`,
    })
  }

  const handleQuizClick = () => {
     if (!allStepsCompleted) {
        toast({
            variant: "destructive",
            title: "Quiz Locked",
            description: "You cannot attempt the quiz yet. Please complete all modules first.",
        });
     }
  }

  const getYoutubeLink = (query: string) => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  }
  
  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setShowFeedback(true);
  }

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    if (currentQuestionIndex < roadmap.quiz.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      const finalScore = Math.round(((score + (isCorrect ? 1 : 0)) / roadmap.quiz.length) * 100);
      updateQuizScore(roadmapTitle, finalScore);
      setQuizFinished(true);
    }
  }

  const getIncorrectExplanation = () => {
      const incorrectOptionIndex = currentQuestion.options.findIndex(opt => opt === selectedOption && opt !== currentQuestion.correctAnswer);
      let explanationIndex = 0;
      let incorrectCount = -1;
      for(let i=0; i<currentQuestion.options.length; i++){
          if(currentQuestion.options[i] !== currentQuestion.correctAnswer){
              incorrectCount++;
          }
          if(i === incorrectOptionIndex){
              explanationIndex = incorrectCount;
              break;
          }
      }
      return currentQuestion.incorrectExplanations[explanationIndex];
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-8">
        <GlassCard>
            <CardHeader>
                <CardTitle>Your Personalized Roadmap</CardTitle>
                <CardDescription>Follow these steps to achieve your learning goal.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                {roadmap.roadmap.map((step) => {
                  const isCompleted = completedModules.includes(step.title);

                  return (
                    <div key={step.step} className="flex items-start gap-4">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg flex-shrink-0", isCompleted && "bg-green-500/20 text-green-400")}>
                        {isCompleted ? <Check className="w-5 h-5" /> : step.step}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg font-headline">{step.title}</h3>
                        {step.description && <p className="text-muted-foreground mt-1 whitespace-pre-line text-sm">{step.description}</p>}
                        <div className="mt-3 flex flex-wrap gap-2">
                             <Button asChild variant="outline" size="sm">
                                <Link href={getYoutubeLink(step.youtubeSearchQuery)} target="_blank">
                                    <Youtube className="mr-2 h-4 w-4" /> Watch on YouTube
                                </Link>
                            </Button>
                            <Button 
                                onClick={() => handleCompleteModule(step.title)} 
                                size="sm"
                                disabled={isCompleted}
                                >
                                {isCompleted ? (
                                    <>
                                        <CheckCircleIcon className="mr-2 h-4 w-4" /> Completed
                                    </>
                                ) : (
                                    <>
                                        Mark as Complete
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                    </div>
                  )
                })}
                <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent flex-shrink-0">
                        <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg font-headline text-accent">Goal Achieved!</h3>
                        <p className="text-muted-foreground mt-1 text-sm">Congratulations on completing your learning journey! Now, test your knowledge.</p>
                    </div>
                    </div>
                </div>
            </CardContent>
        </GlassCard>

        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Final Quiz</h2>
            {allStepsCompleted ? (
                 <GlassCard>
                    {!quizFinished ? (
                      <>
                        <CardHeader>
                            <CardTitle>Question {currentQuestionIndex + 1} of {roadmap.quiz.length}</CardTitle>
                            <CardDescription className="text-lg pt-2">{currentQuestion.question}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {currentQuestion.options.map((option, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-center space-x-3 p-4 rounded-md border transition-colors cursor-pointer",
                                        "hover:bg-muted/50",
                                        selectedOption === option && "bg-muted",
                                        showFeedback && option === currentQuestion.correctAnswer && "border-green-500 bg-green-500/10",
                                        showFeedback && selectedOption === option && option !== currentQuestion.correctAnswer && "border-red-500 bg-red-500/10"
                                    )}
                                    onClick={() => !showFeedback && setSelectedOption(option)}
                                >
                                    <p className="flex-1 text-base">{option}</p>
                                </div>
                            ))}
                        </CardContent>
                        <CardContent>
                           {showFeedback && (
                                <Alert variant={isCorrect ? "default" : "destructive"} className={cn(isCorrect ? "border-green-500/50" : "", "animate-in fade-in")}>
                                     {isCorrect ? <CheckCircleIcon className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                                    <AlertTitle>{isCorrect ? 'Correct!' : 'Incorrect'}</AlertTitle>
                                    <AlertDescription className="space-y-2 mt-2">
                                        <p>{isCorrect ? currentQuestion.explanation : getIncorrectExplanation()}</p>
                                        {!isCorrect && (
                                            <div className="p-4 bg-background/50 rounded-md">
                                                <p className="font-bold">The correct answer is:</p>
                                                <p className="font-semibold">{currentQuestion.correctAnswer}</p>
                                                <p className="mt-2">{currentQuestion.explanation}</p>
                                            </div>
                                        )}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                        <CardContent>
                             {!showFeedback ? (
                                <Button className="w-full" onClick={handleAnswerSubmit} disabled={selectedOption === null}>Submit</Button>
                            ) : (
                                <Button className="w-full group" onClick={handleNextQuestion}>
                                    {currentQuestionIndex < roadmap.quiz.length - 1 ? "Next Question" : "Finish Quiz"}
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                            )}
                        </CardContent>
                      </>
                    ) : (
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                            <h3 className="text-2xl font-bold font-headline">Quiz Completed!</h3>
                            <p className="text-muted-foreground mt-2">You scored:</p>
                            <p className="text-6xl font-bold my-4 text-primary">{currentCourse?.quizScore}%</p>
                            {(currentCourse?.quizScore ?? 0) >= 75 ? (
                                <div className="flex items-center gap-2 text-green-400">
                                    <CheckCircleIcon className="w-8 h-8" />
                                    <p className="text-xl font-semibold">Congratulations, you passed!</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-red-400">
                                    <XCircle className="w-8 h-8" />
                                    <p className="text-xl font-semibold">Keep trying! You can do better.</p>
                                </div>
                            )}
                        </CardContent>
                    )}
                </GlassCard>
            ) : (
                 <GlassCard>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                       <Lock className="w-12 h-12 text-muted-foreground mb-4" />
                       <h3 className="font-bold text-xl">Quiz Locked</h3>
                       <p className="text-muted-foreground mt-2">You cannot attempt the quiz yet. Please complete all modules first.</p>
                       <Button onClick={handleQuizClick} variant="outline" className="mt-4">
                           Take the Quiz
                       </Button>
                    </CardContent>
                </GlassCard>
            )}
        </div>
    </div>
  );
}
