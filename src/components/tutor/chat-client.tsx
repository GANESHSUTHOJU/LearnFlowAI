
"use client";

import { useState, useRef, useEffect } from "react";
import { GlassCard, CardContent, CardFooter } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatbotTutorGuidance } from "@/ai/flows/chatbot-tutor-guidance";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Loader2, Send, Link as LinkIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRoadmapStore } from "@/store/roadmap-store";

interface Message {
  role: "user" | "assistant";
  content: string;
  searchResults?: {
      title: string;
      link: string;
      snippet: string;
  }[];
}

const initialMessage: Message = {
    role: "assistant",
    content: "Hello! I'm your AI Tutor. Ask me anything about programming, and I'll do my best to help you."
}

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { courses, completedCourses } = useRoadmapStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const activeCourses = courses.filter(c => !c.isCompleted);
      const progress = `Active Courses: ${activeCourses.map(c => c.title).join(', ') || 'None'}. Completed Courses: ${completedCourses.join(', ') || 'None'}.`;

      const result = await chatbotTutorGuidance({
        question: input,
        roadmapProgress: progress,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: `${result.answer}\n\n**Tip:** ${result.tip}`,
        searchResults: result.searchResults,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector("div[data-radix-scroll-area-viewport]");
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages])

  return (
    <GlassCard className="flex flex-col flex-1">
      <CardContent className="p-6 flex-1">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-4",
                  message.role === "user" ? "justify-end" : ""
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "p-4 rounded-lg max-w-lg",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-background/80 rounded-bl-none"
                  )}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  {message.searchResults && message.searchResults.length > 0 && (
                      <div className="mt-4 space-y-2 border-t pt-2">
                          <h4 className="font-bold text-sm">Sources:</h4>
                          {message.searchResults.map((result, i) => (
                              <div key={i} className="text-xs">
                                  <Link href={result.link} target="_blank" className="flex items-center gap-2 hover:underline">
                                    <LinkIcon className="w-3 h-3" />
                                    <span>{result.title}</span>
                                  </Link>
                              </div>
                          ))}
                      </div>
                  )}
                </div>
                 {message.role === "user" && (
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="user avatar"/>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-5 h-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="p-4 rounded-lg bg-background/80 rounded-bl-none">
                       <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </GlassCard>
  );
}
