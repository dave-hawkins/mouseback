/* eslint-disable react/no-unescaped-entities */
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */

import { Metadata } from "next"
import Footer from "@repo/dashboard/components/marketing/footer"
import { SignupForm } from "@repo/dashboard/components/marketing/signup-form"
import { SiteHeader } from "@repo/dashboard/components/marketing/site-header"
import TryMe from "@repo/dashboard/components/marketing/try-me"
import { siteConfig } from "@repo/dashboard/config/site"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: "https://mouseback.app",
    type: "website",
    locale: "en_US",
    images: [{ url: "/Mouseback-OGIMG.png" }],
  },
}

export default function IndexPage() {
  return (
    <>
      <SiteHeader />
      <TryMe />
      <section className="container relative grid items-center gap-12 py-20 md:py-44">
        <div aria-hidden="true" className="relative">
          <div className="absolute -z-10 -mt-20 h-[580px] w-full overflow-hidden rounded-t-xl bg-gradient-to-b from-background via-background to-transparent dark:from-foreground/5 dark:via-foreground/5 dark:backdrop-blur-md ">
            <div className="flex h-8 w-full gap-2 bg-muted px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-foreground/10"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-foreground/10"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-foreground/10"></div>
            </div>
            <div className="h-full w-full">
              <div className="h-full w-full py-8">
                <div className="container">
                  <div className="flex w-full justify-between">
                    <div>
                      <div className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                      <div className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                      <div className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                    </div>
                  </div>
                </div>
                <div className="container flex w-full justify-between gap-20 py-16">
                  <div className="flex flex-col gap-4">
                    <div className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                    <div className="h-2 w-16 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                    <div className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                    <div className="h-2 w-16 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                    <div className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                    <div className="h-2 w-16 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                    <div className="h-2 w-12 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                    <div className="h-2 w-16 rounded-full bg-muted dark:bg-foreground/[8%]"></div>
                  </div>
                  <div className="grid w-full grid-cols-4 gap-2">
                    <div className="w-full rounded-xl border border-muted dark:border-foreground/5 dark:bg-muted/30"></div>
                    <div className="w-full rounded-xl border border-muted dark:border-foreground/5 dark:bg-muted/30"></div>
                    <div className="w-full rounded-xl border border-muted dark:border-foreground/5 dark:bg-muted/30"></div>
                    <div className="w-full rounded-xl border border-muted dark:border-foreground/5 dark:bg-muted/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="-z-10 hidden w-full md:absolute md:block   ">
            <div className="absolute -right-6 top-[-29px]  ">
              <div className="flex  items-center gap-1">
                <div className="rounded-full  rounded-bl-none bg-rose-500 p-2 shadow dark:bg-rose-600/80"></div>
                <div className="inline-flex rounded-md bg-pink-200 px-1.5 py-0.5 text-xs font-medium tracking-tight text-pink-500 backdrop-blur-sm dark:bg-pink-600/20 ">
                  Design engineer
                </div>
              </div>
            </div>
            <div className="- absolute -left-6 -top-[29px]">
              <div className="flex  items-center gap-1">
                <div className="inline-flex rounded-md bg-blue-200 px-1.5 py-0.5 text-xs font-medium tracking-tight text-blue-500 backdrop-blur-sm dark:bg-blue-600/20 ">
                  Designer
                </div>
                <div className="rounded-full  rounded-br-none bg-blue-500 p-2 shadow"></div>
              </div>
            </div>
            <div className="- absolute -left-24 top-[0rem] sm:top-40">
              <div className="flex  items-center gap-1">
                <div className="inline-flex rounded-md bg-violet-200 px-1.5 py-0.5 text-xs font-medium tracking-tight text-violet-500 backdrop-blur-sm dark:bg-violet-600/20 ">
                  Product manager
                </div>
                <div className="rounded-full  rounded-br-none bg-violet-500 p-2 shadow"></div>
              </div>
            </div>
            <div className="absolute -right-8 top-[16.5rem] sm:-right-12  sm:top-48">
              <div className="flex items-center gap-1">
                <div className="rounded-full  rounded-bl-none bg-green-500 p-2 shadow"></div>
                <div className="inline-flex rounded-md bg-green-200 px-1.5 py-0.5 text-xs font-medium tracking-tight text-green-500 backdrop-blur-sm dark:bg-green-600/20 ">
                  Product engineer
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto flex  max-w-lg flex-col items-center gap-6 py-12 text-center">
            <div className="absolute inset-0 -z-10 mx-auto max-w-lg bg-background/60 blur-3xl dark:bg-background/20"></div>

            <div className=" flex w-full max-w-lg flex-col gap-6">
              <h1 className="bg-gradient-to-b from-primary/70 via-primary to-primary bg-clip-text pb-1 text-7xl font-semibold text-transparent dark:from-primary/90 dark:to-primary">
                Build software together.
              </h1>
              <p className="mx-auto max-w-md  text-center text-lg text-muted-foreground">
                The quickest way to collaborate on staging and ephemeral
                environments.
              </p>
            </div>
            {/* <div className="flex w-full max-w-md items-center space-x-2">
              <SignupForm />
            </div> */}
          </div>
        </div>
      </section>
      <section className="container grid items-center gap-12 text-clip py-20 md:pb-44 md:pt-12">
        <div className="mx-auto flex flex-col gap-4">
          <h2 className=" text-center text-4xl font-semibold">
            Meet Mouseback.
          </h2>
          <p className="mx-auto max-w-lg text-center text-lg text-muted-foreground">
            Mouseback is a tiny widget you paste into any website to collaborate
            between software builders and stakeholders.
          </p>
          <p className="text-center text-lg text-muted-foreground">
            It's installed on this website, give it a go!
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4 rounded-lg bg-background/90 p-8  text-muted-foreground dark:bg-muted/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-200 text-green-700 dark:bg-green-600/20">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 20L14 4M18 8.00004L20.5858 10.5858C21.3668 11.3669 21.3668 12.6332 20.5858 13.4143L18 16M6 16L3.41421 13.4143C2.63316 12.6332 2.63317 11.3669 3.41421 10.5858L6 8.00004"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="font-medium text-foreground/80">
                Copy-paste our script
              </div>
              <div>
                Add our script onto any website or environment you wish to
                collaborate on.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-lg bg-background/90 p-8 text-muted-foreground dark:bg-muted/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-200 text-pink-600 dark:bg-pink-600/20">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 11.5L12 8.5L15 11.5M12 15.5V9.5M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="font-medium text-foreground/80">
                Share your URL
              </div>
              <div>
                Mouseback embeds itself into your website or environment with
                zero faff.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-lg bg-background/90 p-8 text-muted-foreground dark:bg-muted/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-blue-700 dark:bg-blue-600/20">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.9998 14H19.002C20.1065 14 21.002 13.1046 21.002 12V6C21.002 4.89543 20.1065 4 19.002 4H9.00195C7.89738 4 7.00195 4.89543 7.00195 6V8M15.002 8H5.00195C3.89738 8 3.00195 8.89543 3.00195 10V16C3.00195 17.1046 3.89738 18 5.00195 18H6.00195V20.5L10.502 18H15.002C16.1065 18 17.002 17.1046 17.002 16V10C17.002 8.89543 16.1065 8 15.002 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div className="font-medium text-foreground/80">
                Start iterating
              </div>
              <div>
                Your site transforms into a feedback canvas so you can start
                building together.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container grid items-center gap-12 text-clip py-20 md:pb-44 md:pt-12">
        <div className="flex flex-col  gap-8 md:flex-row md:gap-24">
          <div className="flex flex-col gap-4 md:w-1/3">
            <h2 className="text-4xl font-semibold">Why use mouseback?</h2>
            <p className="text-muted-foreground">
              Reasons why we built mouseback.
            </p>
          </div>
          <div className="md:w-2/3">
            <div className="flex flex-col gap-8 text-lg">
              <div className="flex flex-col gap-2 ">
                <div className="font-medium">
                  Get design feedback on the real product.
                </div>
                <div className="text-base text-muted-foreground">
                  Mouseback lets you give feedback and iterate on the actual
                  code that you're shipping to users, it's like Figma comments
                  but for the finished product, neat!
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-medium">An open source tool</div>
                <p className="text-base text-muted-foreground">
                  We're open source and platform agnostic, which means whether
                  you're building a Laravel, Remix, NextJS or any other app,
                  mouseback can slot right into your workflow with no platform
                  lock-in.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="font-medium">
                  For the modern development workflow
                </div>

                <div className="text-base text-muted-foreground">
                  Mouseback is designed to slot in perfectly with the modern
                  development workflow of ephemeral environments and quick
                  iteration cycles.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container grid items-center gap-12 text-clip py-20 md:pb-44 md:pt-12">
        <div className="flex  gap-24">
          <div className="mx-auto flex  max-w-lg flex-col gap-4 text-center">
            <h2 className="text-4xl font-semibold">Try the alpha today</h2>
            <p className="text-muted-foreground">
              Click the sign up button above to get started.
            </p>
            {/* <div className="py-8">
              <SignupForm />
            </div> */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
