"use client"

import { useContext, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Database } from "@repo/dashboard/lib/database.types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import Logo from "../logo"
import { Button } from "../ui/button"
import UserContext from "../user-provider"

const allTabs = [
  { id: "home", name: "Home", path: "/" },
  { id: "blog", name: "Work", path: "/work" },
  { id: "projects", name: "Gallery", path: "/gallery" },
  { id: "arts", name: "Contact", path: "/contact" },
]

export function SiteHeader() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const pathname = usePathname()
  const tabsRef = useRef<(HTMLElement | null)[]>([])
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null)
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const newActiveTabIndex = allTabs.findIndex((tab) => tab.path === pathname)
    setActiveTabIndex(newActiveTabIndex !== -1 ? newActiveTabIndex : null)
  }, [pathname])

  useEffect(() => {
    if (activeTabIndex === null) {
      return
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0)
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0)
    }

    setTabPosition()
  }, [activeTabIndex])

  const handlePrimaryActionClick = () => {
    if (user) return router.push("/dashboard")
    return router.push("/signup")
  }

  return (
    <header className="from-bg-white via-bg-white sticky top-0 z-40 w-full bg-gradient-to-b from-white to-transparent pt-4 dark:from-black/50">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <Link href={"/"}>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Logo />
            <p className="text-base font-semibold">Mouseback</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {!user && (
            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={() => router.push("/login")}
            >
              Log in
            </Button>
          )}
          <Button size={"sm"} onClick={handlePrimaryActionClick}>
            {user ? "Dashboard ↗" : "Sign up"}
          </Button>
        </div>
      </div>
    </header>
  )
}
