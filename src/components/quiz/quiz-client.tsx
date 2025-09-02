
"use client";

import { useState } from "react";
import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, CheckCircle, XCircle, Trophy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  incorrectExplanations: string[];
};

interface QuizClientProps {
    quizQuestions: QuizQuestion[];
    courseTitle: string;
    onQuizComplete: (score: number) => void;
}

export default function QuizClient({ quizQuestions, courseTitle, onQuizComplete }: QuizClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = isSubmitted && selectedAnswer === currentQuestion.correctAnswer;

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    setIsSubmitted(true);
    if(selectedAnswer === currentQuestion.correctAnswer) {
        setScore(prev => prev + 1);
    }
  };
  
  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if(nextIndex < quizQuestions.length) {
        setCurrentQuestionIndex(nextIndex);
        setSelectedAnswer(null);
        setIsSubmitted(false);
    } else {
        const finalScore = Math.round((score / quizQuestions.length) * 100);
        onQuizComplete(finalScore);
        setQuizFinished(true);
    }
  }
  
  const getIncorrectExplanation = () => {
      if (!selectedAnswer || isCorrect) return "";
      
      // Find the index of the user's incorrect answer in the options array
      const selectedOptionIndex = currentQuestion.options.findIndex(opt => opt === selectedAnswer);
      
      // Map the index from the overall options array to the index in the incorrectExplanations array
      let incorrectIndex = 0;
      let count = -1;
      for (let i = 0; i < currentQuestion.options.length; i++) {
        if(currentQuestion.options[i] !== currentQuestion.correctAnswer) {
          count++;
        }
        if(i === selectedOptionIndex) {
          incorrectIndex = count;
          break;
        }
      }

      return currentQuestion.incorrectExplanations[incorrectIndex];
  }


  if(quizFinished) {
    const finalScore = Math.round((score / quizQuestions.length) * 100);
    return (
        <GlassCard>
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <Trophy className="w-16 h-16 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold font-headline">Quiz Completed!</h3>
                <p className="text-muted-foreground mt-2">You scored:</p>
                <p className="text-6xl font-bold my-4 text-primary">{finalScore}%</p>
                {finalScore >= 75 ? (
                    <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-8 h-8" />
                        <p className="text-xl font-semibold">Congratulations, you passed!</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-red-400">
                        <XCircle className="w-8 h-8" />
                        <p className="text-xl font-semibold">Keep trying! Review the material and try again.</p>
                    </div>
                )}
                 <Button onClick={() => window.location.reload()} className="mt-8">
                    Finish Review
                </Button>
            </CardContent>
        </GlassCard>
    )
  }

  return (
    <GlassCard>
      <CardHeader>
        <CardTitle>Question {currentQuestionIndex + 1} / {quizQuestions.length}</CardTitle>
        <CardDescription className="text-lg pt-2">{currentQuestion.question}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer ?? ""}
          onValueChange={setSelectedAnswer}
          disabled={isSubmitted}
        >
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-4 rounded-md border transition-colors ${
                isSubmitted && option === currentQuestion.correctAnswer
                  ? 'border-green-500 bg-green-500/10'
                  : isSubmitted && option === selectedAnswer && option !== currentQuestion.correctAnswer
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-border cursor-pointer hover:bg-muted/50'
              }`}
              onClick={() => !isSubmitted && setSelectedAnswer(option)}
            >
              <RadioGroupItem value={option} id={`r${index}`} />
              <Label htmlFor={`r${index}`} className="flex-1 text-base cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4">
        {!isSubmitted ? (
            <Button onClick={handleSubmit} disabled={!selectedAnswer}>
            Submit
            </Button>
        ) : (
            <Button onClick={handleNextQuestion} className="group">
                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
        )}

        {isSubmitted && (
          <Alert variant={isCorrect ? "default" : "destructive"} className={cn(isCorrect ? "border-green-500/50" : "", "animate-in fade-in")}>
             <AlertTitle className="flex items-center gap-2">
                {isCorrect ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </AlertTitle>
            <AlertDescription className="space-y-3 mt-3 pl-7">
                <p>{isCorrect ? currentQuestion.explanation : getIncorrectExplanation()}</p>
                {!isCorrect && (
                  <div className="p-4 bg-background/50 rounded-md border border-green-500/20">
                      <p className="font-bold">The correct answer is: <span className="font-semibold">{currentQuestion.correctAnswer}</span></p>
                      <p className="mt-2">{currentQuestion.explanation}</p>
                  </div>
                )}
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </GlassCard>
  );
}
