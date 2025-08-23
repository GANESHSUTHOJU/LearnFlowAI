
import ChatClient from "@/components/tutor/chat-client";

export default function TutorPage() {
  return (
    <div className="space-y-8 h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex-shrink-0">
        <h1 className="text-3xl font-bold font-headline">AI Tutor</h1>
        <p className="text-muted-foreground">
          Ask me anything about programming.
        </p>
      </div>

      <ChatClient />
    </div>
  );
}
