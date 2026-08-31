import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "corner-squircle w-full rounded-xl border px-4 py-3 font-primary text-sm outline-none transition-[background-color,border-color,box-shadow] duration-150 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      // `inverted` is the counterpart to the button variant of the same name:
      // the field sitting on a dark surface rather than on the page ground.
      tone: {
        default:
          "border-border bg-card text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/20",
        inverted:
          "border-white/10 bg-white/5 text-white placeholder:text-white/40 focus-visible:border-white/40 focus-visible:ring-white/15",
      },
      invalid: {
        true: "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, tone, invalid, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(inputVariants({ tone, invalid }), className)}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input, inputVariants }
