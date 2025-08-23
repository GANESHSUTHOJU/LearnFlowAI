
"use client"

import { RadialBar, RadialBarChart, Legend, ResponsiveContainer, PolarGrid, PolarAngleAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { skill: "JavaScript", progress: 65, fill: "var(--color-javascript)" },
  { skill: "React", progress: 80, fill: "var(--color-react)" },
  { skill: "CSS", progress: 45, fill: "var(--color-css)" },
  { skill: "Node.js", progress: 30, fill: "var(--color-nodejs)" },
]

const chartConfig = {
  progress: {
    label: "Progress",
  },
  javascript: {
    label: "JavaScript",
    color: "hsl(var(--chart-1))",
  },
  react: {
    label: "React",
    color: "hsl(var(--chart-2))",
  },
  css: {
    label: "CSS",
    color: "hsl(var(--chart-3))",
  },
  nodejs: {
    label: "Node.js",
    color: "hsl(var(--chart-4))",
  },
}

export default function ProgressChart() {
  const allZero = chartData.every(item => item.progress === 0);

  return (
    <div className="h-80 w-full -mt-4">
      {allZero ? (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          Start a course to see your progress.
        </div>
      ) : (
      <ChartContainer config={chartConfig} className="w-full h-full">
        <ResponsiveContainer>
          <RadialBarChart 
            data={chartData} 
            innerRadius="20%" 
            outerRadius="80%" 
            startAngle={90}
            endAngle={-270}
            barSize={15}
          >
             <PolarAngleAxis type="number" domain={[0, 100]} dataKey="progress" tick={false} />
            <PolarGrid gridType="circle" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <RadialBar 
              dataKey="progress" 
              background={{ fill: 'hsl(var(--muted))' }}
              cornerRadius={10}
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </ChartContainer>
      )}
    </div>
  )
}
