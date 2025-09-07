import QuizClient from "@/components/quiz/quiz-client";
import { Suspense } from "react";

function QuizTaker() {
    return (
        <main>
            <QuizClient />
        </main>
    )
}

export default function QuizPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QuizTaker />
        </Suspense>
    )
}
