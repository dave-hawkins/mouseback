"use client"

import { useContext } from "react"
import Head from "next/head"
import Link from "next/link"
import { Navbar } from "@repo/dashboard/components/app/navbar"
import { ThemeToggle } from "@repo/dashboard/components/theme-toggle"
import { InputWithCopy } from "@repo/dashboard/components/ui/input"
import UserContext from "@repo/dashboard/components/user-provider"

const OnboardingPage = () => {
  const { teamDetails } = useContext(UserContext)
  const WIDGET_URL = process.env.NEXT_PUBLIC_MOUSEBACK_WIDGET_URL
  return (
    <>
      <Head>
        <title>Your New Title</title>
      </Head>
      <div className="flex h-screen w-screen ">
        <Navbar />
        <div className="relative flex w-full bg-muted  dark:bg-background">
          <div className="mx-auto flex w-full items-center justify-center border-l bg-background dark:bg-muted/50 ">
            <div className="rounded-xl border bg-background p-8 shadow-sm sm:w-[380px]">
              <div className="mx-auto flex w-full flex-col justify-center space-y-4 ">
                <div className="flex flex-col space-y-2  ">
                  <div className="mb-2">
                    <h1 className="mb-2 text-center text-2xl font-semibold">
                      Welcome to Mouseback
                    </h1>
                    <p className="text-center text-sm text-muted-foreground">
                      Here&apos;s your Mouseback instance for installing onto
                      projects:
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <InputWithCopy
                      readOnly
                      value={
                        teamDetails && teamDetails[0]
                          ? `<script src="${WIDGET_URL}?apiKey=${teamDetails[0]?.teams?.api_key}" defer></script>`
                          : "Loading..."
                      }
                      copyValue={
                        teamDetails && teamDetails[0]
                          ? `<script src="${WIDGET_URL}?apiKey=${teamDetails[0]?.teams?.api_key}" defer></script>`
                          : "Loading..."
                      }
                    />
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Ask your devs to copy it into the head of any project and
                  Mouseback should appear.
                </p>
                <Link
                  className="text-center text-sm text-muted-foreground underline underline-offset-4"
                  href="https://docs.mouseback.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Need help installing? Try our docs
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  )
}

export default OnboardingPage
