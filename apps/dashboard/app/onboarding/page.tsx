"use client"

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@repo/dashboard/components/theme-toggle"
import { Button } from "@repo/dashboard/components/ui/button"
import { Input } from "@repo/dashboard/components/ui/input"
import { Label } from "@repo/dashboard/components/ui/label"
import UserContext from "@repo/dashboard/components/user-provider"
import { Table } from "@repo/dashboard/lib/tables"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const OnboardingPage = () => {
  const [loading, setLoading] = useState(false)
  const [teamName, setTeamName] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { teamDetails, handleTeamDetails } = useContext(UserContext)

  useEffect(() => {
    if (teamDetails && teamDetails[0]?.teams) {
      return router.push("/dashboard")
    }
  }, [teamDetails])

  const handleCreateTeam = async () => {
    if (!teamName) return
    setLoading(true)
    const { data } = await supabase.auth.getUser()

    // create team
    const { data: teams, error: teamError } = await supabase
      .from(Table.Teams)
      .insert([
        {
          team_name: teamName,
        },
      ])
      .select()

    if (teamError || !teams.length) {
      console.error("Failed to create a new team", { teamError })
      setLoading(false)
      return
    }

    const newTeam = teams[0]

    // create team admin member
    const { data: memberData, error: memberError } = await supabase
      .from(Table.Members)
      .insert([
        {
          team_id: newTeam.id,
          is_owner: true,
          user_id: data.user?.id || "",
        },
      ])
      .select("*,teams(*)")

    if (memberError) {
      console.error("Failed to create the team member", { memberError })
      setLoading(false)
      return
    }
    handleTeamDetails(memberData)
    setTeamName("")
    setLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 ">
          <h1 className="mb-2 text-2xl font-semibold">Create a team</h1>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email">Team name</Label>
            <Input
              placeholder="e.g Acme Ltd"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">mouseback.app/</p>
        </div>
        <p className="text-sm text-muted-foreground">
          You can always change this later if you need to.
        </p>

        <Button className="w-full" onClick={handleCreateTeam}>
          {loading ? "Creating..." : "Continue"}
        </Button>
      </div>
      <div className="absolute bottom-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default OnboardingPage
