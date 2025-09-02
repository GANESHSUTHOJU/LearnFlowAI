
"use client";

import { useState } from "react";
import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { receivePersonalizedFeedback } from "@/ai/flows/receive-personalized-feedback";
import { Loader2, ArrowRight, CheckCircle, XCircle, Trophy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  incorrectExplanations: string[];
};

type Feedback = {
    feedback: string;
    difficultyAdjustment: string;
    relevantQuestionSuggestion: string;
} | null;

interface QuizClientProps {
    quizQuestions: QuizQuestion[];
    courseTitle: string;
    onQuizComplete: (score: number) => void;
}

export default function QuizClient({ quizQuestions, courseTitle, onQuizComplete }: QuizClientProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    setIsLoading(true);
    setIsSubmitted(true);
    if(selectedAnswer === currentQuestion.correctAnswer) {
        setScore(prev => prev + 1);
    }
    
    try {
      const result = await receivePersonalizedFeedback({
        quizHistory: `User is taking a quiz for ${courseTitle}.`,
        skillGraphStructure: "N/A for this quiz type",
        assessmentData: `User is on question ${currentQuestionIndex + 1} of ${quizQuestions.length}.`,
        currentQuestion: currentQuestion.question,
        userAnswer: selectedAnswer,
      });
      setFeedback(result);
    } catch (error) {
      console.error(error);
      setFeedback({
        feedback: "Sorry, there was an error getting your feedback.",
        difficultyAdjustment: "No change.",
        relevantQuestionSuggestion: "No suggestion available.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if(nextIndex < quizQuestions.length) {
        setCurrentQuestionIndex(nextIndex);
        setSelectedAnswer(null);
        setFeedback(null);
        setIsSubmitted(false);
    } else {
        const finalScore = Math.round((score / quizQuestions.length) * 100);
        onQuizComplete(finalScore);
        setQuizFinished(true);
    }
  }

  const isCorrect = isSubmitted && selectedAnswer === currentQuestion.answer;

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
                  : 'border-border'
              }`}
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
            <Button onClick={handleSubmit} disabled={!selectedAnswer || isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
            </Button>
        ) : (
            <Button onClick={handleNextQuestion} className="group">
                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
        )}

        {isSubmitted && feedback && (
          <Alert variant={isCorrect ? "default" : "destructive"} className={isCorrect ? "border-green-500/50" : ""}>
            <AlertTitle>{isCorrect ? 'Correct!' : 'Incorrect'}</AlertTitle>
            <AlertDescription className="space-y-2">
                <p>{feedback.feedback}</p>
                <p><strong>Difficulty Adjustment:</strong> {feedback.difficultyAdjustment}</p>
                <p><strong>Suggested Next Question:</strong> {feedback.relevantQuestionSuggestion}</p>
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </GlassCard>
  );
}
