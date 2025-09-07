
"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Progress } from "@/components/ui/progress"
  import { useProgressStore } from "@/store/progress-store";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
  
  export function ProgressTracker() {
    const { skills } = useProgressStore();
    const completedSkills = skills.filter(s => s.completed).length;
    const totalSkills = skills.length;
    const progressPercentage = totalSkills > 0 ? (completedSkills / totalSkills) * 100 : 0;
  
    return (
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            You have completed {completedSkills} out of {totalSkills} skills.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <Progress value={progressPercentage} className="w-full" />
        </CardContent>
        <CardFooter>
            <Button asChild variant="secondary" className="w-full">
                <Link href="/skills">
                    Start a New Skill
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardFooter>
      </Card>
    )
  }
  
