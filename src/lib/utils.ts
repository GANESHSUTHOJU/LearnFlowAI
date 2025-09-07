import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { extendTailwindMerge } from "tailwind-merge"
import { type Color, type ChartConfig as ChartConfigPrimitive } from "recharts"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// #----------- RADIX THEME COLORS -----------#
// We need to add all Radix a-prefixed colors to tailwind-merge
const aColors = [
  "gray",
  "gold",
  "bronze",
  "brown",
  "yellow",
  "amber",
  "orange",
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "lime",
  "mint",
  "sky",
] as const

// We need to add all Radix a-prefixed colors to tailwind-merge
const radixColors = [
  "accent",
  "gray",
  "gold",
  "bronze",
  "brown",
  "yellow",
  "amber",
  "orange",
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "lime",
  "mint",
  "sky",
] as const

const twMergeConfig = {
  classGroups: {
    "font-size": [
      {
        text: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "xs",
          "sm",
          "base",
          "lg",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl",
          "7xl",
          "8xl",
          "9xl",
        ],
      },
    ],
    "text-color": radixColors.flatMap((color) => [
      `text-${color}-1`,
      `text-${color}-2`,
      `text-${color}-3`,
      `text-${color}-4`,
      `text-${color}-5`,
      `text-${color}-6`,
      `text-${color}-7`,
      `text-${color}-8`,
      `text-${color}-9`,
      `text-${color}-10`,
      `text-${color}-11`,
      `text-${color}-12`,
      `text-a${color}-1`,
      `text-a${color}-2`,
      `text-a${color}-3`,
      `text-a${color}-4`,
      `text-a${color}-5`,
      `text-a${color}-6`,
      `text-a${color}-7`,
      `text-a${color}-8`,
      `text-a${color}-9`,
      `text-a${color}-10`,
      `text-a${color}-11`,
      `text-a${color}-12`,
    ]),
    "bg-color": radixColors.flatMap((color) => [
      `bg-${color}-1`,
      `bg-${color}-2`,
      `bg-${color}-3`,
      `bg-${color}-4`,
      `bg-${color}-5`,
      `bg-${color}-6`,
      `bg-${color}-7`,
      `bg-${color}-8`,
      `bg-${color}-9`,
      `bg-${color}-10`,
      `bg-${color}-11`,
      `bg-${color}-12`,
      `bg-a${color}-1`,
      `bg-a${color}-2`,
      `bg-a${color}-3`,
      `bg-a${color}-4`,
      `bg-a${color}-5`,
      `bg-a${color}-6`,
      `bg-a${color}-7`,
      `bg-a${color}-8`,
      `bg-a${color}-9`,
      `bg-a${color}-10`,
      `bg-a${color}-11`,
      `bg-a${color}-12`,
    ]),
    "border-color": radixColors.flatMap((color) => [
      `border-${color}-1`,
      `border-${color}-2`,
      `border-${color}-3`,
      `border-${color}-4`,
      `border-${color}-5`,
      `border-${color}-6`,
      `border-${color}-7`,
      `border-${color}-8`,
      `border-${color}-9`,
      `border-${color}-10`,
      `border-${color}-11`,
      `border-${color}-12`,
      `border-a${color}-1`,
      `border-a${color}-2`,
      `border-a${color}-3`,
      `border-a${color}-4`,
      `border-a${color}-5`,
      `border-a${color}-6`,
      `border-a${color}-7`,
      `border-a${color}-8`,
      `border-a${color}-9`,
      `border-a${color}-10`,
      `border-a${color}-11`,
      `border-a${color}-12`,
    ]),
    "stroke-color": radixColors.flatMap((color) => [
      `stroke-${color}-1`,
      `stroke-${color}-2`,
      `stroke-${color}-3`,
      `stroke-${color}-4`,
      `stroke-${color}-5`,
      `stroke-${color}-6`,
      `stroke-${color}-7`,
      `stroke-${color}-8`,
      `stroke-${color}-9`,
      `stroke-${color}-10`,
      `stroke-${color}-11`,
      `stroke-${color}-12`,
      `stroke-a${color}-1`,
      `stroke-a${color}-2`,
      `stroke-a${color}-3`,
      `stroke-a${color}-4`,
      `stroke-a${color}-5`,
      `stroke-a${color}-6`,
      `stroke-a${color}-7`,
      `stroke-a${color}-8`,
      `stroke-a${color}-9`,
      `stroke-a${color}-10`,
      `stroke-a${color}-11`,
      `stroke-a${color}-12`,
    ]),
    "fill-color": radixColors.flatMap((color) => [
      `fill-${color}-1`,
      `fill-${color}-2`,
      `fill-${color}-3`,
      `fill-${color}-4`,
      `fill-${color}-5`,
      `fill-${color}-6`,
      `fill-${color}-7`,
      `fill-${color}-8`,
      `fill-${color}-9`,
      `fill-${color}-10`,
      `fill-${color}-11`,
      `fill-${color}-12`,
      `fill-a${color}-1`,
      `fill-a${color}-2`,
      `fill-a${color}-3`,
      `fill-a${color}-4`,
      `fill-a${color}-5`,
      `fill-a${color}-6`,
      `fill-a${color}-7`,
      `fill-a${color}-8`,
      `fill-a${color}-9`,
      `fill-a${color}-10`,
      `fill-a${color}-11`,
      `fill-a${color}-12`,
    ]),
  },
}

export const tw = extendTailwindMerge(twMergeConfig)

// #----------- CHART COLORS -----------#
export const CHART_COLORS = [
  "blue",
  "purple",
  "red",
  "orange",
  "yellow",
  "green",
  "gray",
  "cyan",
  "indigo",
] as const

export type ChartColor = (typeof CHART_COLORS)[number]

export const chartColorValues: Record<ChartColor, string> = {
  blue: "var(--color-blue)",
  purple: "var(--color-purple)",
  red: "var(--color-red)",
  orange: "var(--color-orange)",
  yellow: "var(--color-yellow)",
  green: "var(--color-green)",
  gray: "var(--color-gray)",
  cyan: "var(--color-cyan)",
  indigo: "var(--color-indigo)",
}

export const getColor = (color?: string | Color) => {
  if (typeof color !== "string") {
    return color
  }

  if (color.startsWith("var")) {
    return color
  }

  if (color in chartColorValues) {
    return chartColorValues[color as ChartColor]
  }

  return color
}

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | {
        color?: string
        theme?: never
      }
    | {
        color?: never
        theme: ChartConfigPrimitive["theme"]
      }
  )
}
