
"use client"

import { RadialBar, RadialBarChart, Legend, ResponsiveContainer, PolarAngleAxis, Tooltip } from "recharts"
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart"
import { useRoadmapStore } from "@/store/roadmap-store"
import { useMemo } from "react";

const chartConfigBase = {
  progress: {
    label: "Progress",
  },
  '1': { color: "hsl(var(--chart-1))" },
  '2': { color: "hsl(var(--chart-2))" },
  '3': { color: "hsl(var(--chart-3))" },
  '4': { color: "hsl(var(--chart-4))" },
  '5': { color: "hsl(var(--chart-5))" },
  '6': { color: "hsl(var(--chart-1) / 0.7)" },
  '7': { color: "hsl(var(--chart-2) / 0.7)" },
  '8': { color: "hsl(var(--chart-3) / 0.7)" },
  '9': { color: "hsl(var(--chart-4) / 0.7)" },
  '10': { color: "hsl(var(--chart-5) / 0.7)" },
};

export default function ProgressChart() {
  const { startedCourses } = useRoadmapStore();

  const { chartData, chartConfig } = useMemo(() => {
    const data = startedCourses.map((course, index) => ({
      skill: course.title,
      progress: 10, // All courses start at 10%
      fill: `var(--color-${(index % 10) + 1})`,
    }));

    const config = data.reduce((acc, course, index) => {
      acc[course.skill] = {
        label: course.title,
        color: `hsl(var(--chart-${(index % 10) + 1}))`,
      };
      return acc;
    }, { ...chartConfigBase } as any);
    
    return { chartData: data, chartConfig: config };

  }, [startedCourses]);

  const allZero = chartData.every(item => item.progress === 0);

  return (
    <div className="w-full max-w-lg h-[450px] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold font-headline mb-2">Overall Progress</h2>
        <p className="text-muted-foreground mb-4">Your progress across all skills.</p>
        <div className="w-full h-full">
            {chartData.length === 0 ? (
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
