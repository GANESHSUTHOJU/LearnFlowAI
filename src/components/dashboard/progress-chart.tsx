
"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 18 },
  { month: "February", desktop: 30 },
  { month: "March", desktop: 45 },
  { month: "April", desktop: 60 },
  { month: "May", desktop: 75 },
  { month: "June", desktop: 90 },
]

const chartConfig = {
  desktop: {
    label: "Progress",
    color: "hsl(var(--primary))",
  },
}

export default function ProgressChart() {
  return (
    <div className="h-64 w-full">
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
    </div>
  )
}
