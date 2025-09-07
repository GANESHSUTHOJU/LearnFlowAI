
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
import { CheckCircle, Circle, ArrowRight, BookOpen, BrainCircuit, Loader2, PlusCircle, FileQuestion } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

interface Topic {
    id: string;
    title: string;
    completed: boolean;
}

const generateTopics = (skillId: string, skillName: string, total: number, completed: number): Topic[] => {
    const topicTemplates = [
        `Introduction to ${skillName}`,
        `Core Concepts of ${skillName}`,
        `Intermediate ${skillName}`,
        `Advanced Techniques in ${skillName}`,
        `Real-world Applications of ${skillName}`,
        `Best Practices in ${skillName}`,
        `Project with ${skillName}`,
        `Mastering ${skillName}`,
    ];

    return Array.from({ length: total }, (_, i) => {
        const title = topicTemplates[i] || `${skillName} - Topic ${i + 1}`;
        return {
            id: `${skillId}-${i + 1}`,
            title: title,
            completed: i < completed,
        }
    });
}

const SkillView = ({ skillId }: { skillId: string }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { skills, loading, addSkill } = useProgressStore();
  const [isAdding, setIsAdding] = useState(false);
  const skill = skills.find((s) => s.id === skillId);
  

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
                    This skill isn't in your learning plan yet. Add it to begin your journey.
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
  
  const topics = generateTopics(skill.id, skill.name, skill.totalTopics, skill.completedTopics);
  const progress = skill.totalTopics > 0 ? (skill.completedTopics / skill.totalTopics) * 100 : 0;

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
        <CardFooter className="flex justify-end gap-4">
          <Button asChild variant="outline">
            <Link href={`/quiz?topic=${encodeURIComponent(skill.name)}`}>
              Take a Quiz <FileQuestion className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/tutor?skill=${encodeURIComponent(skill.name)}`}>
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
                    topic.completed ? "text-muted-foreground" : ""
                  }`}
                >
                  {topic.title}
                </span>
                {!topic.completed && (
                  <Button variant="ghost" size="sm" onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(topic.title)}`, '_blank')}>
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
