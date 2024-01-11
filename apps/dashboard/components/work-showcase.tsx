/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
"use client"

import { useEffect, useRef, useState } from "react"
import {
  FlagTriangleLeft,
  Mail,
  MessageCircle,
  MoreHorizontal,
  ShoppingCart,
  UserPlus,
  UserX,
} from "lucide-react"

import Cursor from "./demo/cursor"
import { Button } from "./ui/button"
// Import the Cursor component

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

export function WorkShowcase() {
  const [showCursor, setShowCursor] = useState(false) // State to toggle custom cursor
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isFloating, setIsFloating] = useState(true)
  const messageCircleRef = useRef(null)
  const [clickPositions, setClickPositions] = useState([
    { x: 100, y: 100 },
    { x: 200, y: 200 },
  ])
  const [commentsArray, setCommentsArray] = useState([
    ["Typo here, should be `sign in`"],
    ["I think the text here could be larger?"],
  ])
  const [showDiv, setShowDiv] = useState([false, false])
  const [showInput, setShowInput] = useState(true)
  const [inputValues, setInputValues] = useState([""])
  const [error, setError] = useState("") // State to store error message
  const [hasMoved, setHasMoved] = useState(false) // Add this line
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      if (e.currentTarget instanceof Element) {
        const rect = e.currentTarget.getBoundingClientRect()
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
    const workShowcaseElement = document.querySelector(".work-showcase")
    workShowcaseElement.addEventListener("mousemove", updateCursorPosition)

    return () => {
      workShowcaseElement.removeEventListener("mousemove", updateCursorPosition)
    }
  }, [])

  // ...
  useEffect(() => {
    const updateHasMoved = () => {
      setHasMoved(true)
    }
    const workShowcaseElement = document.querySelector(".work-showcase")
    workShowcaseElement.addEventListener("mousemove", updateHasMoved)

    return () => {
      workShowcaseElement.removeEventListener("mousemove", updateHasMoved)
    }
  }, [])
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowCursor(false)
      }
    }
    document.addEventListener("keydown", handleEsc)

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [])

  useEffect(() => {
    console.log("showCursor updated:", showCursor)
  }, [showCursor])
  const handleClick = (e) => {
    if (e.type === "mousemove") return

    if (!showCursor) return

    const rect = e.currentTarget.getBoundingClientRect()
    const newPosition = { x: e.clientX - rect.left, y: e.clientY - rect.top }

    // Check if a dot already exists at the clicked position
    const dotIndex = clickPositions.findIndex(
      (position) =>
        Math.abs(position.x - newPosition.x) < 10 &&
        Math.abs(position.y - newPosition.y) < 10
    )

    if (messageCircleRef.current.contains(e.target)) {
      setShowCursor((prevShowCursor) => !prevShowCursor)
    } else {
      setShowCursor(false)
    }

    if (dotIndex !== -1) {
      setShowDiv([
        ...showDiv.slice(0, dotIndex),
        true,
        ...showDiv.slice(dotIndex + 1),
      ])
    } else {
      setClickPositions([...clickPositions, newPosition])
      setCommentsArray([...commentsArray, []]) // Add a new array for the new comment area
      setInputValues([...inputValues, ""]) // Add a new input for the new comment area
      setShowDiv([...showDiv, true])
    }

    setShowInput(false)
    setShowInput(true)
  }
  const handleAddClick = (index) => {
    if (inputValues[index].trim() === "") {
      setError("Please add some feedback")
      return
    }
    setCommentsArray([
      ...commentsArray.slice(0, index),
      [...commentsArray[index], inputValues[index]],
      ...commentsArray.slice(index + 1),
    ])
    setInputValues([
      ...inputValues.slice(0, index),
      "",
      ...inputValues.slice(index + 1),
    ])
    setError("")
    console.log("showCursor after:", showCursor)
  }
  return (
    <>
      <div
        className={`mx-auto -mb-4 text-xs text-muted-foreground  ${
          isFloating ? "animate-float !shadow-none" : "animate-stopFloat"
        }`}
        onMouseEnter={() => setIsFloating(false)}
        onClick={() => setIsFloating(false)}
        style={{ opacity: isFloating ? 1 : 0 }}
      >
        Psst, try the demo!
      </div>
      <div className="relative flex flex-col gap-4">
        <div className="absolute inset-x-1/2 -top-8">
          <div className=" flex w-full justify-center">
            <div
              className={`my-4 inline-flex gap-2 rounded-full border bg-background/80 p-1 backdrop-blur-sm ${
                isFloating ? "animate-float" : "animate-stopFloat"
              }`}
              onMouseEnter={() => setIsFloating(false)}
              onClick={() => setIsFloating(false)}
            >
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <div className="flex -space-x-1 pl-2 opacity-50">
                      <div className="flex h-6 w-6 items-center rounded-full bg-gradient-to-r  from-red-400 to-blue-700 text-[13px] shadow ring-1 ring-background"></div>
                      <div className="flex h-6 w-6 items-center rounded-full bg-gradient-to-r  from-orange-400 to-purple-700 text-[13px] shadow ring-1 ring-background"></div>
                      <div className="flex h-6 w-6 items-center rounded-full bg-gradient-to-r  from-rose-400 to-yellow-700 text-[13px] shadow ring-1 ring-background"></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex items-center gap-1">
                      <p>Your team</p>
                      <p className="opacity-50">(Offline)</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="my-auto flex h-5 w-px items-center bg-muted-foreground/20 text-muted-foreground"></span>
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <div className="ml-1 cursor-pointer rounded-full  shadow">
                      <div className="flex h-6 w-6 items-center rounded-full bg-gradient-to-r  from-green-400 to-teal-700 text-[13px] shadow ring-1 ring-background"></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <div
                      className="group cursor-pointer rounded-full bg-muted  p-2 hover:bg-pink-500 "
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log("MessageCircle click", showCursor)
                        setShowCursor(true)
                      }}
                    >
                      <MessageCircle
                        ref={messageCircleRef}
                        className="h-4 w-4 group-hover:text-background"
                      />{" "}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add a comment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <div className="cursor-pointer rounded-full p-2 hover:bg-muted">
                      <MoreHorizontal className="h-4 w-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[100px] py-0.5">
                      You're playing with a demo of Mouseback, the feedback tool
                      for software teams.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="group mx-auto flex min-h-[600px] w-full space-x-20  ">
          <div className="flex w-full flex-col overflow-hidden rounded-xl bg-background shadow-[0_1px_0_0_rgba(0,0,0,0.1),0_1px_3px_0_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-lg dark:border  ">
            <div className="flex w-full flex-col overflow-hidden    bg-background transition-all duration-500 ">
              <div className="flex h-12 w-full grow items-center border-b border-border/50 px-4 py-2 ">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-foreground/10"></div>
                  <div className="h-3 w-3 rounded-full bg-foreground/10"></div>
                  <div className="h-3 w-3 rounded-full bg-foreground/10"></div>
                </div>
                <div className="flex grow items-center justify-center">
                  {/* <div className="justify-center rounded border bg-background px-2 py-1 text-center text-[10px] text-muted-foreground/80">
                  https://my-ephermeral-deploy.example.com
                </div> */}
                </div>
              </div>
            </div>
            <div
              className={`work-showcase relative flex h-full w-full grow flex-col  items-start justify-center bg-background ${
                showCursor ? "cursor-none" : ""
              }`}
              onClick={handleClick}
              style={showInput ? { position: "relative" } : {}}
            >
              <div className="relative h-full w-full">
                <div className="h-full w-full bg-muted/50 p-8 dark:bg-foreground/5">
                  <div className="w-full pb-8 text-center text-xs font-bold text-muted-foreground/50">
                    Acme Inc - new onboarding flow
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="mx-auto h-3 w-4/12 rounded-full bg-foreground/10"></div>
                    <div className="mx-auto h-3 w-3/12 rounded-full bg-foreground/10"></div>
                  </div>
                  <div className="mt-20">
                    <div className="mx-auto flex max-w-md gap-8">
                      <div className="h-32 w-4/12 rounded-xl bg-foreground/5"></div>
                      <div className="my-auto flex w-8/12 flex-col gap-2">
                        <div className="h-3 w-full rounded-full bg-foreground/5"></div>
                        <div className="h-3 w-5/12 rounded-full bg-foreground/5"></div>
                        <div className="h-3 w-11/12 rounded-full bg-foreground/5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-20">
                    <div className="mx-auto flex max-w-md gap-8 rounded-full bg-foreground/5 p-1 text-xs">
                      <p className="w-full text-center text-muted-foreground/50">
                        Sign up
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {showInput &&
                clickPositions.map((position, index) => (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      pointerEvents: showDiv[index] ? "auto" : "none",
                    }}
                  >
                    <div
                      className="dot -my-2 -ml-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full rounded-bl-none border border-foreground/20 bg-pink-500 p-1 text-xs  shadow backdrop-blur-sm "
                      style={{ pointerEvents: "auto" }}
                      onClick={(e) => {
                        setShowDiv([
                          ...showDiv.slice(0, index),
                          !showDiv[index],
                          ...showDiv.slice(index + 1),
                        ])
                      }}
                    ></div>
                    {showDiv[index] && (
                      <div className="absolute z-50 -mt-6 ml-5 flex w-[150px] flex-col overflow-hidden rounded-lg bg-background text-sm shadow dark:border dark:border-foreground/20">
                        {commentsArray[index].map((comment, commentIndex) => (
                          <div
                            key={commentIndex}
                            className="border-b border-border/20  p-2 text-xs"
                          >
                            <div className="flex gap-2 text-xs">
                              <div
                                className={`mb-1 flex h-4 w-4 items-center justify-center rounded-full ${
                                  index < 2
                                    ? "bg-gradient-to-r from-rose-400 to-orange-700"
                                    : "bg-gradient-to-r from-green-400 to-teal-700"
                                }`}
                              ></div>
                              <div className="mt-px text-[10px] font-medium tracking-tight">
                                {index < 2 ? "Product manager" : "You "}
                              </div>
                            </div>
                            <div className="my-1 text-muted-foreground">
                              {comment}
                            </div>
                          </div>
                        ))}
                        <input
                          value={inputValues[index]}
                          onChange={(e) =>
                            setInputValues([
                              ...inputValues.slice(0, index),
                              e.target.value,
                              ...inputValues.slice(index + 1),
                            ])
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleAddClick(index)
                            }
                          }}
                          placeholder="Add feedback"
                          className="border-b border-border/20 bg-muted p-2 text-xs focus:outline-none "
                          type="text"
                          autoFocus
                        />
                        <div className="bg-muted p-2">
                          <Button
                            variant={"outline"}
                            size={"xs"}
                            className="bg-background shadow-sm dark:border dark:border-white/20"
                            onClick={() => handleAddClick(index)}
                          >
                            Add
                          </Button>
                          {error && (
                            <div
                              className="mt-1 max-w-[120px]
              text-[11px] leading-[13px] text-red-500"
                            >
                              {error}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              {showCursor && <Cursor UserImage="" position={cursorPosition} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
