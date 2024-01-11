import "@repo/dashboard/styles/globals.css"
import { Metadata } from "next"
import { SiteHeader } from "@repo/dashboard/components/marketing/site-header"
import Mouseback from "@repo/dashboard/components/mouseback"
import { TailwindIndicator } from "@repo/dashboard/components/tailwind-indicator"
import { ThemeProvider } from "@repo/dashboard/components/theme-provider"
import { Toaster } from "@repo/dashboard/components/ui/toaster"
import { siteConfig } from "@repo/dashboard/config/site"
import { fontSans } from "@repo/dashboard/lib/fonts"
import { cn } from "@repo/dashboard/lib/utils"

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

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />

        <body
          className={cn(
            "min-h-screen bg-muted/50 font-sans antialiased dark:bg-background",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <div className="absolute -z-50 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-[15%] [mask-image:radial-gradient(ellipse_50%_100%_at_50%_0%,#000_60%,transparent_100%)]">
              <div className="h-full w-full ">
                <svg
                  width="100%"
                  height="100%"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted-foreground"
                >
                  <defs>
                    <pattern
                      id="blueprintPattern"
                      patternUnits="userSpaceOnUse"
                      width="40"
                      height="40"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#blueprintPattern)"
                  />
                </svg>
              </div>
            </div>

            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
          <Mouseback />
        </body>
      </html>
    </>
  )
}
