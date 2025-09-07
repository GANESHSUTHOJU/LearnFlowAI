
"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useProgressStore } from "@/store/progress-store"

const chartConfig = {
  lessons: {
    label: "Lessons",
    color: "hsl(var(--primary))",
  },
}

export function ProgressChart() {
  const { learningActivity, activityTrend } = useProgressStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Activity</CardTitle>
        <CardDescription>Your lesson completions over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={learningActivity}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="lessons" fill="var(--color-lessons)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {activityTrend > 0 ? (
            <>
              Trending up by {activityTrend.toFixed(1)}% this month <TrendingUp className="h-4 w-4" />
            </>
          ) : activityTrend < 0 ? (
            <>
              Trending down by {Math.abs(activityTrend).toFixed(1)}% this month <TrendingUp className="h-4 w-4 rotate-180" />
            </>
          ) : (
            "Activity is stable this month."
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total lessons completed in the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
