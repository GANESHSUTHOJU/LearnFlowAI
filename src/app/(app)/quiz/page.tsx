import QuizClient from "@/components/quiz/quiz-client";

export default function QuizPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Adaptive Quiz</h1>
        <p className="text-muted-foreground">
          Test your knowledge and get personalized feedback.
        </p>
      </div>

      <QuizClient />
    </div>
  );
}
