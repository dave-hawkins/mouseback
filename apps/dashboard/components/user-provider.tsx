"use client"

import React, { PropsWithChildren, createContext, useEffect } from "react"
import supabase from "@repo/dashboard/lib/supabaseClient"
import { Table, USERS, UserRole } from "@repo/dashboard/lib/tables"
import { User } from "@supabase/supabase-js"

export type TeamProps = {
  id: string
  created_at: string
  team_name: string
  created_by: string
  api_key: string
}

export type TeamDetailsProps = {
  teams: TeamProps
}

type UserContextType = {
  user: User | null
  teamDetails: TeamDetailsProps[] | null
  handleTeamDetails: (memberData: TeamDetailsProps[]) => void
}

const intialValues: UserContextType = {
  user: null,
  teamDetails: null,
  handleTeamDetails: () => null,
}

const UserContext = createContext(intialValues)

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [teamDetails, setTeamDetails] = React.useState<
    TeamDetailsProps[] | null
  >([])

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error("Failed to get the logged in user info", error)
    }
    setUser(data.user)
  }

  useEffect(() => {
    const getUserMetadata = async (userId: string, userObject: User) => {
      const {
        data: user,
        error,
        status,
      } = await supabase
        .from(USERS)
        .select("id, full_name, avatar_url,email,role")
        .eq("id", userId)
        .single()

      if (error && status !== 406) {
        console.error("Error fetching user metadata:", error)
        return null
      }

      // if an existing user doesn't have role assigned
      // set their role as commentor
      if (user && user.role && status !== 406) {
        const { data: updateUser, error: updateError } = await supabase
          .from(USERS)
          .update([
            {
              role: UserRole.Editor,
            },
          ])
          .eq("id", userId)
          .select()
        if (updateError) {
          console.error("Error updating user into the database:", updateError)
          return null
        }
        return updateUser
      }

      if (status === 406) {
        const { data: newUser, error } = await supabase
          .from(USERS)
          .insert([
            {
              id: userId,
              full_name: userObject.user_metadata.full_name,
              avatar_url: userObject.user_metadata.avatar_url,
              email: userObject.user_metadata.email,
              role: UserRole.Editor,
            },
          ])
          .single()

        if (error) {
          console.error("Error inserting user into the database:", error)
          return null
        }
        return newUser
      }

      return user
    }

    supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        const userMetadata = await getUserMetadata(
          session.user.id,
          session.user
        )
        setUser({
          ...session.user,
          ...(userMetadata ? { user_metadata: userMetadata } : {}),
        })
      } else {
        setUser(null)
      }
    })
  }, [])

  const fetchUserTeam = async () => {
    if (!user) return
    const { data, error } = await supabase
      .from(Table.Members)
      .select("*,teams(*)")
      .eq("user_id", user.id)
    if (error) {
      return console.error("Failed to get the logged in user info", error)
    }
    setTeamDetails(data)
  }

  const handleTeamDetails = (data: TeamDetailsProps[]) => {
    setTeamDetails(data)
  }

  React.useEffect(() => {
    if (user) return
    fetchUser()
  }, [user])

  React.useEffect(() => {
    fetchUserTeam()
  }, [user])

  const userValue = React.useMemo(
    () => ({ user, teamDetails, handleTeamDetails }),
    [user, teamDetails]
  )

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  )
}

export default UserContext
