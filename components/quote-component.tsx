"use client"

import { useState, useEffect } from "react"

interface QuoteData {
  quoteText: string
  quoteAuthor: string
  quoteCategory?: string
}

/**
 * Component that displays a daily inspirational quote.
 */
export function QuoteComponent() {
  const [quote, setQuote] = useState("The way to get started is to quit talking and begin doing.")
  const [author, setAuthor] = useState("Walt Disney")

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch('/api/quote')

        if (res.ok) {
          const data: QuoteData = await res.json()
          setQuote(data.quoteText)
          setAuthor(data.quoteAuthor)
        }
      } catch (error) {
        console.error("Failed to fetch quote:", error)
      }
    }

    fetchQuote()
  }, [])

  return (
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
      {quote} {author && `- ${author}`}
    </p>
  )
}
