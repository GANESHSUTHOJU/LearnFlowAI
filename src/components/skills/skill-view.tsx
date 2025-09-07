
"use client";

import { useProgressStore } from "@/store/progress-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ArrowRight, BookOpen, BrainCircuit, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import Image from "next/image";

const SkillView = ({ skillId }: { skillId: string }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { skills, loading, addSkill } = useProgressStore();
  const [isAdding, setIsAdding] = useState(false);
  const skill = skills.find((s) => s.id === skillId);
  
  // A simple way to generate topics based on skill name. 
  // In a real app, this would come from a database.
  const generateTopics = (skillName: string) => {
    return [
      { id: "1", title: `Introduction to ${skillName}`, completed: true },
      { id: "2", title: `Core Concepts of ${skillName}`, completed: false },
      { id: "3", title: `Advanced Techniques in ${skillName}`, completed: false },
      { id: "4", title: `Practicing ${skillName}`, completed: false },
      { id: "5", title: `Mastering ${skillName}`, completed: false },
    ]
  }

  const handleStartSkill = async () => {
    if (user) {
      setIsAdding(true);
      await addSkill(user.uid, skillId);
      setIsAdding(false);
    }
  }


  if (loading) {
    return (
        <div className="flex items-center justify-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-4 text-muted-foreground">Loading skill details...</p>
        </div>
    );
  }

  if (!skill) {
    return (
        <Card className="text-center">
            <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    <BookOpen className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="mt-4 text-3xl font-bold">Start Learning {skillId}</CardTitle>
                <CardDescription className="text-lg">
                    This skill isn&apos;t in your learning plan yet. Add it to begin your journey.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground max-w-md mx-auto">
                    By adding this skill, you can track your progress, get personalized recommendations, and receive guidance from our AI Tutor.
                </p>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button size="lg" onClick={handleStartSkill} disabled={isAdding}>
                    {isAdding ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adding...
                        </>
                    ) : (
                        <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Start Learning Skill
                        </>
                    )}
                </Button>
                <Button variant="outline" onClick={() => router.push('/roadmap')}>
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    Generate a Custom Roadmap
                </Button>
            </CardFooter>
        </Card>
    );
  }
  
  const topics = generateTopics(skill.name);
  const completedTopics = topics.filter(t => t.completed).length;
  const progress = (completedTopics / topics.length) * 100;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{skill.name}</CardTitle>
          <CardDescription className="text-lg">
            Master the core concepts of {skill.name} to build your expertise.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Progress
              </span>
              <span className="text-sm font-bold">{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button asChild>
            <Link href={`/tutor?skill=${skill.name}`}>
              Start Learning Session <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learning Topics</CardTitle>
          <CardDescription>
            Complete all topics to master this skill.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="flex items-center p-4 rounded-md bg-secondary"
              >
                {topic.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-500 mr-4" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground mr-4" />
                )}
                <span
                  className={`flex-grow font-medium ${
                    topic.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {topic.title}
                </span>
                {!topic.completed && (
                  <Button variant="ghost" size="sm" onClick={() => router.push(`/tutor?skill=${skill.name}&topic=${topic.title}`)}>
                    Start
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillView;
