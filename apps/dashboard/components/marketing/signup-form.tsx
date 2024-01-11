"use client"

import { useState } from "react"
import { useToast } from "@repo/dashboard/components/ui/use-toast"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

export const SignupForm = () => {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false) // Add this line

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
      if (res.status === 200) {
        toast({
          title: "🎉 Signup complete",
          description: "Thank you for signing up to the Mouseback waitlist!",
        })
        setCompleted(true) // Set completed to true when the request is successful
      } else {
        toast({
          title: "Error",
          description: "Please check your email address.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="flex w-full gap-2" onSubmit={submitForm}>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="Email"
        id="Email"
        placeholder="Email"
        disabled={loading || completed} // Disable the input when loading or completed
      />
      <Button
        type="submit"
        className="whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-100"
        disabled={loading || completed}
      >
        {completed
          ? "Thank you!"
          : loading
          ? "Signing up..."
          : "Join the waitlist"}
      </Button>
    </form>
  )
}
