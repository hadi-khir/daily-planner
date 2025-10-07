interface QuoteResponse {
  statusCode: number
  message: string
  pagination: {
    currentPage: number
    nextPage: number | null
    totalPages: number
  }
  totalQuotes: number
  data: Array<{
    _id: string
    quoteText: string
    quoteAuthor: string
    quoteGenre: string
    __v: number
  }>
}

export async function QuoteComponent() {
  let quote = "The way to get started is to quit talking and begin doing. - Walt Disney"
  let author = ""

  // Calculate seconds until midnight
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  const secondsUntilMidnight = Math.floor((midnight.getTime() - now.getTime()) / 1000)

  try {
    const response = await fetch("https://quote-garden.onrender.com/api/v3/quotes/random", {
      next: { revalidate: secondsUntilMidnight }, // Cache until midnight
    })

    if (response.ok) {
      const data: QuoteResponse = await response.json()
      if (data.data && data.data.length > 0) {
        quote = data.data[0].quoteText
        author = data.data[0].quoteAuthor
      }
    }
  } catch (error) {
    // Fall back to default quote on error
    console.error("Failed to fetch quote:", error)
  }

  return (
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
      {quote} {author && `- ${author}`}
    </p>
  )
}
