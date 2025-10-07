"use client"

import { useEffect, useState } from "react"

export function CurrentDate() {
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const now = new Date()
    const formatted = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    setCurrentDate(formatted)
  }, [])

  if (!currentDate) {
    return <div className="h-10" /> // Placeholder to prevent layout shift
  }

  return <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{currentDate}</h1>
}
