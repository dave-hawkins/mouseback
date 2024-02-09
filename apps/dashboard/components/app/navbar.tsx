"use client"

import { useContext } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/dashboard/components/ui/dropdown-menu"
import { Lightbulb, LogOut, Sailboat } from "lucide-react"

import supabase from "../../lib/supabaseClient"
import Logo from "../logo"
import UserContext from "../user-provider"

export const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useContext(UserContext)

  return (
    <aside
      id="sidebar"
      className="flex h-screen w-64 shrink-0 transition-transform"
      aria-label="Sidebar"
    >
      <div className="flex h-full w-full flex-col overflow-y-auto bg-muted  dark:bg-background  ">
        <div className="mb-4 flex items-center rounded-lg px-[26px] py-8 text-slate-900 dark:text-white">
          <Logo />
          <span className="ml-3 text-sm font-semibold">Mouseback</span>
        </div>
        <ul className="space-y-2 px-3 text-sm font-medium">
          <li>
            <a
              href="#"
              className={`flex items-center rounded-lg px-3 py-2 text-foreground hover:bg-muted-foreground/20 dark:hover:bg-muted ${
                pathname === "/dashboard"
                  ? "bg-muted-foreground/10 dark:bg-muted"
                  : ""
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-foreground"
              >
                <path
                  d="M13.2897 2.02983C12.5448 1.40127 11.4552 1.40127 10.7103 2.02983L3.71026 7.93608C3.25988 8.31609 3 8.87538 3 9.46466V19C3 20.1046 3.89543 21 5 21H8C9.10457 21 10 20.1046 10 19V14H14V19C14 20.1046 14.8954 21 16 21H19C20.1046 21 21 20.1046 21 19V9.46466C21 8.87538 20.7401 8.31609 20.2897 7.93608L13.2897 2.02983Z"
                  fill="currentColor"
                />
              </svg>

              <span className="ml-3 flex-1 whitespace-nowrap text-sm">
                Dashboard
              </span>
            </a>
          </li>
        </ul>
        <div className="mt-auto flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full hover:bg-muted-foreground/10 dark:hover:bg-muted">
              <div className="flex w-full justify-between border-t border-border/80 px-2 py-3">
                <span className="text-sm font-medium text-black dark:text-white">
                  {user?.user_metadata?.name || user?.email}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-roledescription="more menu"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5 text-black dark:text-white"
                  strokeLinecap="round"
                  stroke-Linejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={4}>
              <DropdownMenuItem
                onClick={async () => {
                  const { error } = await supabase.auth.signOut()
                  if (!error) {
                    router.replace("/")
                  }
                }}
              >
                <LogOut className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                Sign out
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Link
                  target="blank"
                  href={"https://github.com/dave-hawkins/mouseback/issues"}
                  className="flex items-center"
                >
                  <Lightbulb className="break mr-2 h-3.5 w-3.5 truncate text-muted-foreground" />
                  Feedback
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  )
}
