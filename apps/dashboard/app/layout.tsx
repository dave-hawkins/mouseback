import "@repo/dashboard/styles/globals.css"
import { Metadata } from "next"
import Mouseback from "@repo/dashboard/components/mouseback"
import { ThemeProvider } from "@repo/dashboard/components/theme-provider"
import { Toaster } from "@repo/dashboard/components/ui/toaster"
import { UserProvider } from "@repo/dashboard/components/user-provider"
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
        <Mouseback />
        <body
          className={cn(
            "min-h-screen bg-muted/50 font-sans antialiased dark:bg-background",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <UserProvider>{children}</UserProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
