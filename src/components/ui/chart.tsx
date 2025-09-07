"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend as LegendPrimitive,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Sector,
  Tooltip as TooltipPrimitive,
  XAxis,
  YAxis,
} from "recharts"
import {
  Color,
  getColor,
  cn,
  type ChartConfig,
} from "@/lib/utils"

// #region Chart Types
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof ResponsiveContainer
    >["children"]
  }
>(({ config, children, className, ...props }, ref) => {
  const [activeChart, setActiveChart] = React.useState(
    () => Object.keys(config)[0]
  )

  const chartRef = React.useRef<HTMLDivElement>(null)

  return (
    <ChartContext.Provider
      value={{
        config,
        chartRef,
        activeChart,
        setActiveChart,
      }}
    >
      <div
        data-chart
        ref={ref}
        className={cn(
          "flex aspect-video justify-center gap-4 text-xs sm:text-sm",
          className
        )}
        {...props}
      >
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"
// #endregion

// #region Chart Context
type ChartContextProps = {
  config: ChartConfig
  chartRef: React.RefObject<HTMLDivElement>
  activeChart: string
  setActiveChart: (chart: string) => void
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}
// #endregion

// #region Chart Legend
const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof LegendPrimitive> & {
    hide?: boolean
    onChartClick?: (chart: string) => void
  }
>(({ className, hide = false, onChartClick }, props) => {
  const { config, setActiveChart } = useChart()

  if (hide || !config) {
    return null
  }

  return (
    <LegendPrimitive
      verticalAlign="bottom"
      height={36}
      content={({ payload }) => {
        return (
          <div
            data-chart-legend
            className={cn(
              "flex items-center justify-center gap-4",
              className
            )}
          >
            {payload?.map(
              ({
                dataKey,
                color,
                value,
              }: {
                dataKey: string
                color?: Color | string
                value: string
              }) => (
                <button
                  data-chart-legend-item
                  key={value}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors",
                    config[dataKey] ? "cursor-pointer" : "cursor-default"
                  )}
                  onClick={() => {
                    onChartClick?.(dataKey)
                    if (config[dataKey]) {
                      setActiveChart(dataKey)
                    }
                  }}
                >
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                    style={{
                      backgroundColor: color,
                    }}
                  />
                  <div
                    className={cn(
                      "flex-1 text-nowrap",
                      config[dataKey]
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {config[dataKey]?.label || value}
                  </div>
                </button>
              )
            )}
          </div>
        )
      }}
      {...props}
    />
  )
})
ChartLegend.displayName = "ChartLegend"
// #endregion

// #region Chart Tooltip
const ChartTooltip = TooltipPrimitive

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof TooltipPrimitive>["content"] & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }
>(
  (
    {
      active,
      payload,
      label,
      className,
      hideLabel = false,
      hideIndicator = false,
      indicator = "dot",
      nameKey = "name",
      labelKey = "value",
    },
    ref
  ) => {
    const { config } = useChart()

    if (hideIndicator || !active || !payload || payload.length === 0) {
      return null
    }

    const P = payload[0].payload
    const L = label || (P && P[nameKey])

    return (
      <div
        ref={ref}
        data-chart-tooltip
        className={cn(
          "z-50 grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl sm:text-sm",
          className
        )}
      >
        {!hideLabel && L ? (
          <div className="font-medium">{L}</div>
        ) : null}
        <div className="grid gap-1.5">
          {payload.map((item, i) => {
            const key = `${item.name}-${item.value}-${i}`
            const itemConfig = config[item.name as keyof typeof config]
            const color = itemConfig?.color || item.color

            return (
              <div
                key={key}
                data-chart-tooltip-item
                className="flex w-full items-center gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground"
              >
                {itemConfig?.icon ? (
                  <itemConfig.icon />
                ) : !hideIndicator ? (
                  <div
                    className={cn("h-2.5 w-2.5 shrink-0 rounded-[2px]", {
                      "rounded-full": indicator === "dot",
                      "bg-transparent": indicator === "line",
                      "border-2 border-dashed": indicator === "dashed",
                    })}
                    style={{
                      background:
                        indicator === "dot" ? color : "transparent",
                      borderColor: color,
                    }}
                  />
                ) : null}
                <div className="flex flex-1 justify-between leading-none">
                  <div className="grid gap-1.5">
                    <span className="text-muted-foreground">
                      {itemConfig?.label || item.name}
                    </span>
                  </div>
                  {item.value ? (
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      {item.value.toLocaleString()}
                    </span>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"
// #endregion

export {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
}
