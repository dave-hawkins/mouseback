"use client"

import React, { useEffect, useState } from "react"

const TryMe: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  useEffect(() => {
    const hasHovered = localStorage.getItem("hasHovered")
    if (hasHovered) {
      setIsHovered(true)
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    localStorage.setItem("hasHovered", "true")
  }
  return (
    <div
      className={`fixed bottom-16 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 text-xs transition-opacity duration-300 ${
        isHovered ? "opacity-0" : "opacity-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
    >
      <div className="flex gap-1">
        <span className="mt-2 rounded-full bg-muted/90 px-4 py-1">
          Psst, give mouseback a try!
        </span>
        <div>
          <svg
            width="8"
            height="18"
            viewBox="0 0 8 18"
            fill="none"
            className="mt-4 text-foreground"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.58689 14.713C5.13997 14.4962 5.69307 14.2639 6.25999 14.0703C6.51579 13.9774 6.79231 13.9077 7.06193 13.9077C7.42835 13.9077 7.76023 14.2871 7.80862 14.6898C7.84319 14.9762 7.64268 15.4253 7.41453 15.4098C6.51577 15.3556 5.86589 15.9983 5.12613 16.37C4.497 16.6874 3.91628 17.121 3.28715 17.4385C2.83085 17.6708 2.34689 17.8875 1.85602 17.9727C0.687626 18.174 -0.176565 17.2371 0.0308421 15.9596C0.321213 14.1865 0.687632 12.4288 1.30985 10.7486C1.4343 10.4234 1.59332 10.0982 1.80073 9.83498C2.11875 9.43235 2.817 9.6569 2.88614 10.1912C2.94145 10.6402 2.89999 11.1125 2.87233 11.5771C2.83085 12.2895 2.75479 13.0018 2.69257 13.7761C2.90689 13.7684 3.0659 13.8148 3.14195 13.7451C4.40714 12.514 5.47182 11.0971 6.17701 9.38591C6.77158 7.95348 7.02739 6.4591 6.64023 4.87956C6.09406 2.65736 4.53157 1.18622 2.47132 1.03137C2.24317 1.01588 2.02195 1.03137 1.85602 1.03137C1.57948 0.69068 1.69702 0.450656 1.89751 0.319027C2.34689 0.0247991 2.83774 -0.0526256 3.36317 0.0325457C5.81058 0.458402 7.68418 2.6806 7.95381 5.46802C8.10591 7.09402 7.88467 8.65033 7.25554 10.137C6.73702 11.3603 6.05257 12.4521 5.27824 13.4819C5.01553 13.838 4.73897 14.1787 4.46934 14.5271C4.50391 14.5813 4.5454 14.6433 4.58689 14.713Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default TryMe
