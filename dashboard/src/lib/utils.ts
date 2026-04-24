import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(value?: string) {
  if (!value) {
    return "N/A"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value))
}

export function formatScore(score?: number | null) {
  if (score === null || score === undefined) {
    return "N/A"
  }

  return `${Math.round(score)}`
}
