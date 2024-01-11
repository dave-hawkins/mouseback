import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

import type { Database } from "@repo/dashboard/lib/database.types"
import { Table } from "@repo/dashboard/lib/tables"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
    const user = await supabase.auth.getUser()
    const userDetails = user.data.user
    if(userDetails){
     const team =  await supabase.from(Table.Members).select('*').eq("user_id",userDetails.id)
     // URL to redirect to after sign in process completes
     if(team.data?.length){
      return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
     }
     return NextResponse.redirect(`${requestUrl.origin}/onboarding`)
    }
  }
}
