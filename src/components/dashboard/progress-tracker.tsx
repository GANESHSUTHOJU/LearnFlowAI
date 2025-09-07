import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Progress } from "@/components/ui/progress"
  
  export function ProgressTracker() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            You have completed 4 out of 10 skills.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={40} className="w-full" />
        </CardContent>
      </Card>
    )
  }
  
