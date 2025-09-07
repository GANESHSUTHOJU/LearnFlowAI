
"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, ChevronRight, RefreshCw, Loader, Lightbulb } from "lucide-react"
import { generateQuiz, Quiz, QuizQuestion } from "@/ai/flows/generate-quiz"
import { useSearchParams, useRouter } from "next/navigation"
import { Skeleton } from "../ui/skeleton"
import AnimatedError from "../ui/animated-error"
import { toast } from "sonner"


export default function QuizClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topic = searchParams.get("topic");

  const [quiz, setQuiz] = React.useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null)
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null)
  const [score, setScore] = React.useState(0)
  const [quizFinished, setQuizFinished] = React.useState(false)

  const fetchQuiz = React.useCallback(async () => {
    if (!topic) {
        setIsLoading(false);
        return;
    }
    setIsLoading(true);
    setError(null);
    setQuiz(null);
    try {
      const generatedQuiz = await generateQuiz(topic);
      setQuiz(generatedQuiz);
      handleRestart(generatedQuiz.questions);
      toast.success(`Quiz for "${topic}" generated!`);
    } catch (e) {
      console.error("Error generating quiz:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(`Sorry, I had trouble generating a quiz. ${errorMessage}`);
      toast.error("Failed to generate quiz.");
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  React.useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);


  const handleAnswer = (answer: string) => {
    if (!quiz) return;
    setSelectedAnswer(answer)
    const correct = answer === quiz.questions[currentQuestionIndex].correctAnswer
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (!quiz) return;
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
    } else {
      setQuizFinished(true)
    }
  }

  const handleRestart = (questions?: QuizQuestion[]) => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setScore(0)
    setQuizFinished(false)
    if (questions && topic) {
      setQuiz({ topic, questions });
    }
  }

  if (!topic && !isLoading) {
    return (
        <Card className="w-full max-w-2xl mx-auto text-center">
            <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    <Lightbulb className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="mt-4 text-3xl font-bold">Choose a Topic</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg text-muted-foreground">
                    Please select a skill or generate a roadmap to start a quiz.
                </p>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => router.push('/skills')}>Explore Skills</Button>
                <Button size="lg" variant="outline" onClick={() => router.push('/roadmap')}>Generate a Roadmap</Button>
            </CardFooter>
        </Card>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <div className="flex justify-center items-center gap-2 text-muted-foreground">
          <Loader className="h-6 w-6 animate-spin" />
          <p className="text-lg">Generating your quiz on &quot;{topic}&quot;...</p>
        </div>
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <AnimatedError message={error} />
            <Button onClick={() => fetchQuiz()} className="mt-4">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
            </Button>
        </div>
    );
  }

  if (quizFinished || !quiz) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl">
            You scored{" "}
            <span className="font-bold text-primary">
              {score} out of {quiz?.questions.length || 0}
            </span>
          </p>
          <Button onClick={() => handleRestart(quiz?.questions)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          Question {currentQuestionIndex + 1} / {quiz.questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-xl font-semibold">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant={
                selectedAnswer === option
                  ? isCorrect
                    ? "default"
                    : "destructive"
                  : "outline"
              }
              className="w-full justify-start h-auto py-3 text-left"
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </Button>
          ))}
        </div>
        <AnimatePresence>
          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-md ${
                isCorrect ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
              }`}
            >
              <div className="flex items-center mb-2">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                )}
                <h4 className="font-bold">
                  {isCorrect ? "Correct!" : "Incorrect"}
                </h4>
              </div>
              <p className="text-sm">{currentQuestion.explanation}</p>
              <Button className="mt-4 w-full" onClick={handleNext}>
                {currentQuestionIndex < quiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
