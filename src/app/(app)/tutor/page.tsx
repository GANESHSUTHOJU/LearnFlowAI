import ChatClient from "@/components/tutor/chat-client";

export default function TutorPage() {
  return (
    <div className="space-y-8 h-[calc(100vh-10rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Tutor</h1>
        <p className="text-muted-foreground">
          Get daily guidance and motivation from your personal AI tutor.
        </p>
      </div>

      <ChatClient />
    </div>
  );
}
