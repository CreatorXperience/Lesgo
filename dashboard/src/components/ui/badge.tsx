import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        neutral: "bg-slate-100 text-slate-700",
        green: "bg-brand-50 text-brand-600",
        blue: "bg-sky-50 text-sky-500",
        yellow: "bg-sand-50 text-sand-500",
        red: "bg-coral-50 text-coral-500"
      }
    },
    defaultVariants: {
      variant: "neutral"
    }
  }
)

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
