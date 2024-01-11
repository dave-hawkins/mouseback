import * as React from "react"
import { cn } from "@repo/dashboard/lib/utils"
import { Check, Copy } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface InputWithCopyProps extends InputProps {
  copyValue?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "isolate flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm shadow-[0_1px_0_0_rgba(0,0,0,0.1),0_1px_3px_0_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)]  ring-offset-background file:border-0 file:bg-transparent  file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border focus-visible:outline  focus-visible:outline-0 focus-visible:outline-primary/10 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border dark:focus-visible:ring-primary",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const InputWithCopy = React.forwardRef<HTMLInputElement, InputWithCopyProps>(
  ({ copyValue, ...props }, ref) => {
    const [isCopied, setIsCopied] = React.useState(false)
    const [tooltipText, setTooltipText] = React.useState("Copy to clipboard")
    const handleCopy = () => {
      navigator.clipboard.writeText(copyValue || "")
      setIsCopied(true)
      setTooltipText("Copied!")

      // Reset after a delay
      setTimeout(() => {
        setIsCopied(false)
        setTooltipText("Copy to clipboard")
      }, 2000) // 2 seconds delay
    }

    return (
      <div className="relative">
        <Input className="font-mono tracking-tighter " ref={ref} {...props} />
        <div className="absolute right-2 top-2.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button onClick={handleCopy} className="bg-background pl-1">
                  {isCopied ? (
                    <Check className="h-5 w-5 text-green-600 hover:text-muted-foreground" />
                  ) : (
                    <Copy className="h-5 w-5 hover:text-muted-foreground" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    )
  }
)
InputWithCopy.displayName = "InputWithCopy"

export { Input, InputWithCopy }
