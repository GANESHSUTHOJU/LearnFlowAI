import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  
  const completedCourses = [
    { title: "React Basics", date: "2024-05-20" },
    { title: "Advanced CSS", date: "2024-04-15" },
    { title: "JavaScript Fundamentals", date: "2024-03-10" },
  ]
  
  export function CompletedCourses() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Completed Courses</CardTitle>
          <CardDescription>
            You have successfully completed these courses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {completedCourses.map((course) => (
              <li
                key={course.title}
                className="flex items-center justify-between"
              >
                <span className="font-medium">{course.title}</span>
                <Badge variant="secondary">{course.date}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }
  
