import { NextResponse, type NextRequest } from "next/server"
import type { Database } from "@repo/dashboard/lib/database.types"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const user = await supabase.auth.getSession()
  if (!user.data.session) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return res
}

export const config = {
  matcher: ["/dashboard", "/onboarding"],
}
