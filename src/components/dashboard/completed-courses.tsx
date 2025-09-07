
"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useProgressStore } from "@/store/progress-store";
import { format } from "date-fns";
  
export function CompletedCourses() {
    const { completedCourses } = useProgressStore();
    return (
      <Card>
        <CardHeader>
          <CardTitle>Completed Courses</CardTitle>
          <CardDescription>
            You have successfully completed these courses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {completedCourses.length > 0 ? (
            <ul className="space-y-4">
              {completedCourses.map((course) => (
                <li
                  key={course.title}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium">{course.title}</span>
                  <Badge variant="secondary">{format(new Date(course.date), 'yyyy-MM-dd')}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">You haven't completed any courses yet. Keep learning!</p>
          )}
        </CardContent>
      </Card>
    )
  }
  
