"use client";

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
import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SkillTopic {
  id: string;
  title: string;
  completed: boolean;
}

interface Skill {
  id: string;
  name: string;
  description: string;
  progress: number;
  topics: SkillTopic[];
}

// Dummy data
const dummySkill: Skill = {
  id: "react",
  name: "React Fundamentals",
  description:
    "Master the core concepts of React, including components, state, props, and hooks, to build modern, interactive web applications.",
  progress: 40,
  topics: [
    { id: "1", title: "Introduction to JSX", completed: true },
    { id: "2", title: "Components and Props", completed: true },
    { id: "3", title: "State and Lifecycle", completed: false },
    { id: "4", title: "Handling Events", completed: false },
    { id: "5", title: "Conditional Rendering", completed: false },
  ],
};

const SkillView = ({ skillId }: { skillId: string }) => {
  // In a real app, you would fetch skill data based on skillId
  const skill = dummySkill;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{skill.name}</CardTitle>
          <CardDescription className="text-lg">
            {skill.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">
                Progress
              </span>
              <span className="text-sm font-bold">{skill.progress}%</span>
            </div>
            <Progress value={skill.progress} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button asChild>
            <Link href={`/tutor?skill=${skill.id}`}>
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
            {skill.topics.map((topic) => (
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
                  <Button variant="ghost" size="sm">
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
