
"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 0 },
  { month: "February", desktop: 0 },
  { month: "March", desktop: 0 },
  { month: "April", desktop: 0 },
  { month: "May", desktop: 0 },
  { month: "June", desktop: 0 },
]

const chartConfig = {
  desktop: {
    label: "Progress",
    color: "hsl(var(--primary))",
  },
}

export default function ProgressChart() {
  const allZero = chartData.every(item => item.desktop === 0);
  return (
    <div className="h-64 w-full">
      {allZero ? (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          Start a course to see your progress.
        </div>
      ) : (
      <ChartContainer config={chartConfig} className="w-full h-full">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      )}
    </div>
  )
}
