"use client";

import { useState, useRef, useEffect } from "react";
import { GlassCard, CardContent, CardFooter } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatbotTutorGuidance } from "@/ai/flows/chatbot-tutor-guidance";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Loader2, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessage: Message = {
    role: "assistant",
    content: "Hello! I'm your AI Tutor. What skill are you working on today, and how can I help you?"
}

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await chatbotTutorGuidance({
        skill: "React Development", // This could be dynamic based on user context
        question: input,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: `${result.answer}\n\n**Tip:** ${result.tip}`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
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
                    "p-4 rounded-lg max-w-lg whitespace-pre-line",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-background/80 rounded-bl-none"
                  )}
                >
                  {message.content}
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
            placeholder="Ask a question about your current skill..."
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
