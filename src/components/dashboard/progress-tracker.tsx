
"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Progress } from "@/components/ui/progress"
  import { useProgressStore } from "@/store/progress-store";
  
  export function ProgressTracker() {
    const { skills } = useProgressStore();
    const completedSkills = skills.filter(s => s.completed).length;
    const totalSkills = skills.length;
    const progressPercentage = totalSkills > 0 ? (completedSkills / totalSkills) * 100 : 0;
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            You have completed {completedSkills} out of {totalSkills} skills.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="w-full" />
        </CardContent>
      </Card>
    )
  }
  
