"use client";

import { useState } from "react";
import { GlassCard, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { receivePersonalizedFeedback } from "@/ai/flows/receive-personalized-feedback";
import { Loader2, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const quizQuestions = [
  {
    question: "What is the correct syntax for a React component?",
    options: [
      "function MyComponent() { return <div />; }",
      "class MyComponent extends React.Component { render() { return <div />; } }",
      "Both A and B are correct.",
      "Neither A nor B are correct.",
    ],
    answer: "Both A and B are correct.",
  },
  {
    question: "What is JSX?",
    options: [
      "A JavaScript library",
      "A syntax extension for JavaScript",
      "A database query language",
      "A CSS preprocessor",
    ],
    answer: "A syntax extension for JavaScript",
  },
  {
    question: "How do you pass data to a component from outside?",
    options: ["Using state", "Using props", "Using services", "Using context"],
    answer: "Using props",
  },
];

type Feedback = {
    feedback: string;
    difficultyAdjustment: string;
    relevantQuestionSuggestion: string;
} | null;

export default function QuizClient() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    setIsLoading(true);
    setIsSubmitted(true);
    try {
      const result = await receivePersonalizedFeedback({
        quizHistory: "User has answered 2 questions on React basics.",
        skillGraphStructure: "React -> Components -> Props -> State",
        assessmentData: "User seems to understand components but struggles with state.",
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
    const nextIndex = (currentQuestionIndex + 1) % quizQuestions.length;
    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer(null);
    setFeedback(null);
    setIsSubmitted(false);
  }

  const isCorrect = isSubmitted && selectedAnswer === currentQuestion.answer;

  return (
    <GlassCard>
      <CardHeader>
        <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
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
                isSubmitted && option === currentQuestion.answer
                  ? 'border-green-500 bg-green-500/10'
                  : isSubmitted && option === selectedAnswer && option !== currentQuestion.answer
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
                Next Question <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
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
