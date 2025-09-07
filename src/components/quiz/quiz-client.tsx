"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, ChevronRight, RefreshCw } from "lucide-react"

type Question = {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

const dummyQuestions: Question[] = [
  {
    question: "What is JSX?",
    options: [
      "A JavaScript library",
      "A syntax extension for JavaScript",
      "A CSS preprocessor",
      "A database query language",
    ],
    correctAnswer: "A syntax extension for JavaScript",
    explanation: "JSX stands for JavaScript XML. It allows you to write HTML-like syntax in your JavaScript code, which makes creating React elements more intuitive.",
  },
  {
    question: "How do you pass data to a component?",
    options: ["Using state", "Using props", "Using methods", "Using context"],
    correctAnswer: "Using props",
    explanation: "Props (short for properties) are used to pass data from a parent component to a child component in a uni-directional flow.",
  },
]

export default function QuizClient() {
  const [questions, setQuestions] = React.useState<Question[]>(dummyQuestions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null)
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null)
  const [score, setScore] = React.useState(0)
  const [quizFinished, setQuizFinished] = React.useState(false)

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    const correct = answer === questions[currentQuestionIndex].correctAnswer
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
    } else {
      setQuizFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setScore(0)
    setQuizFinished(false)
  }

  const currentQuestion = questions[currentQuestionIndex]

  if (quizFinished) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl">
            You scored{" "}
            <span className="font-bold text-primary">
              {score} out of {questions.length}
            </span>
          </p>
          <Button onClick={handleRestart}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          Question {currentQuestionIndex + 1} / {questions.length}
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
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
