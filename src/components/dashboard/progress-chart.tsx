
"use client"

import { RadialBar, RadialBarChart, Legend, ResponsiveContainer, PolarAngleAxis, Tooltip } from "recharts"
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { skill: "JavaScript", progress: 75, fill: "var(--color-javascript)" },
  { skill: "React", progress: 85, fill: "var(--color-react)" },
  { skill: "CSS", progress: 55, fill: "var(--color-css)" },
  { skill: "Node.js", progress: 40, fill: "var(--color-nodejs)" },
  { skill: "TypeScript", progress: 60, fill: "var(--color-typescript)" },
  { skill: "SQL", progress: 25, fill: "var(--color-sql)" },
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
  typescript: {
    label: "TypeScript",
    color: "hsl(var(--chart-5))",
  },
  sql: {
    label: "SQL",
    color: "hsl(var(--chart-1) / 0.7)",
  }
}

export default function ProgressChart() {
  const allZero = chartData.every(item => item.progress === 0);

  return (
    <div className="w-full max-w-lg h-[450px] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold font-headline mb-2">Overall Progress</h2>
        <p className="text-muted-foreground mb-4">Your progress across all skills.</p>
        <div className="w-full h-full">
            {allZero ? (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                Start a course to see your progress.
                </div>
            ) : (
            <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer>
                <RadialBarChart 
                    data={chartData} 
                    innerRadius="25%" 
                    outerRadius="100%" 
                    startAngle={90}
                    endAngle={-270}
                    barSize={12}
                >
                    <PolarAngleAxis type="number" domain={[0, 100]} dataKey="progress" tick={false} />
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <RadialBar 
                        dataKey="progress" 
                        background={{ fill: 'hsl(var(--muted) / 0.5)' }}
                        cornerRadius={10}
                    />
                    <Legend
                        iconSize={12}
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{
                            bottom: 0,
                            left: 0,
                            padding: "10px",
                            fontSize: "12px",
                        }}
                    />
                </RadialBarChart>
                </ResponsiveContainer>
            </ChartContainer>
            )}
      </div>
    </div>
  )
}
