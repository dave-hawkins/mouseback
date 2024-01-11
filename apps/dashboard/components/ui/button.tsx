import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@repo/dashboard/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background dark:focus-visible:ring-primary",
  {
    variants: {
      variant: {
        default:
          // "bg-gradient-to-b from-primary/90 to-primary ring-1 ring-primary border-white/30 dark:border-primary/20 border-t text-primary-foreground hover:bg-primary/90",
          "relative isolate inline-flex rounded-md border border-transparent bg-foreground/90 px-[calc(theme(padding.5)-1px)] py-[calc(theme(padding.2)-1px)] text-background before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.md)-1px)] before:bg-foreground before:shadow after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.md)-1px)] after:shadow-[inset_0_1px_#ffffff50] dark:border-foreground-10",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium border bg-background shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        xs: "h-6 px-2 text-xs rounded-md",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
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
