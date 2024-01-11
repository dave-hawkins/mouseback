import { Metadata } from "next"
import Link from "next/link"
import { LoginButtons } from "@repo/dashboard/components/app/log-in"
import Logo from "@repo/dashboard/components/logo"
import { ThemeToggle } from "@repo/dashboard/components/theme-toggle"
import { buttonVariants } from "@repo/dashboard/components/ui/button"
import { cn } from "@repo/dashboard/lib/utils"

export const metadata: Metadata = {
  title: "Sign Up | Mouseback",
  description: "Sign up to Mouseback.",
}

export default function LoginPage() {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none  lg:px-0">
        <div className="absolute right-6 flex gap-4 lg:top-4">
          <Link
            href="/signup"
            className={cn(buttonVariants({ variant: "ghost" }), "mt-4")}
          >
            No account? Sign up
          </Link>
        </div>
        <div className="absolute bottom-4 right-4">
          <ThemeToggle />
        </div>

        <div className="py-12 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <Link href={"/"}>
              <div className="mx-auto flex items-center justify-center gap-2">
                <Logo />

                <div className="text-sm font-semibold">Mouseback</div>
              </div>
            </Link>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold">Welcome back!</h1>
            </div>
            <LoginButtons />
          </div>
        </div>
      </div>
    </>
  )
}
