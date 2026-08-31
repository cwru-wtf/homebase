import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "corner-squircle inline-flex shrink-0 cursor-pointer touch-manipulation items-center justify-center gap-2 whitespace-nowrap rounded-xl border font-primary font-medium tracking-[-0.01em] outline-none transition-[background-color,border-color,color,box-shadow,transform] duration-150 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25 active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.16)] hover:border-primary-hover hover:bg-primary-hover active:border-primary-active active:bg-primary-active",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.16)] hover:border-destructive/90 hover:bg-destructive/90",
        outline:
          "border-border bg-card text-foreground shadow-[0_1px_2px_hsl(var(--foreground)/0.06)] hover:border-muted-foreground/35 hover:bg-secondary",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-accent",
        ghost:
          "border-transparent bg-transparent text-muted-foreground shadow-none hover:bg-secondary hover:text-foreground",
        inverted:
          "border-white/20 bg-white text-neutral-900 shadow-[0_1px_2px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.7)] hover:bg-white/90 focus-visible:border-white focus-visible:ring-white/40",
        link: "border-transparent text-link underline-offset-4 shadow-none hover:underline active:translate-y-0",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-sm",
        xl: "h-12 px-6 text-base",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
