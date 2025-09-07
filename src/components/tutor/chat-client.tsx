"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTutorStore } from '@/store/tutor-store';
import { getTutorGuidance } from '@/ai/flows/chatbot-tutor-guidance';
import { motion, AnimatePresence } from 'framer-motion';
import { marked } from 'marked';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const ChatClient = () => {
  const searchParams = useSearchParams();
  const initialSkill = searchParams.get("skill") || "Web Development";

  const { skill, setSkill, messages, addMessage, isLoading, setIsLoading, error, setError } = useTutorStore();
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<React.ElementRef<typeof ScrollArea>>(null);

  useEffect(() => {
    setSkill(initialSkill);
  }, [initialSkill, setSkill]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      // @ts-ignore
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage = { role: 'user' as const, content: messageText };
    addMessage(userMessage);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await getTutorGuidance({ skill, history: [...messages, userMessage] });
      addMessage({ role: 'model', content: response.response, followUpQuestions: response.followUpQuestions });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(`Sorry, I ran into a problem. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  }

  return (
    <div className="flex flex-col h-full bg-secondary/50 rounded-lg border">
      <header className="bg-background border-b p-4 shadow-sm rounded-t-lg">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <span>AI Tutor</span>
        </h1>
        <p className="text-muted-foreground">
          I'm here to help you master: <span className='font-semibold text-foreground'>{skill}</span>
        </p>
      </header>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'flex items-start gap-4',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'model' && (
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[85%] rounded-lg p-4 text-sm prose dark:prose-invert prose-p:my-0 prose-headings:my-2',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted shadow-sm'
                  )}
                  dangerouslySetInnerHTML={{ __html: marked(message.content) }}
                />
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
            
            {messages.length > 0 && messages[messages.length - 1].role === 'model' && messages[messages.length - 1].followUpQuestions && (
              <div className="flex justify-start gap-2 flex-wrap pl-14">
                  {messages[messages.length - 1].followUpQuestions?.map((q, i) => (
                      <Button key={i} variant="outline" size="sm" onClick={() => handleSendMessage(q)} disabled={isLoading}>
                          {q}
                      </Button>
                  ))}
              </div>
            )}

             {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4 justify-start">
                <Avatar>
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="bg-muted shadow-sm rounded-lg p-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse delay-0"></span>
                    <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse delay-150"></span>
                    <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse delay-300"></span>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
                <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

          </div>
        </ScrollArea>
      </div>

      <footer className="bg-background border-t p-4 rounded-b-lg">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me a question or describe what you'd like to learn..."
              className="pr-12 h-12 text-base"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default ChatClient;
