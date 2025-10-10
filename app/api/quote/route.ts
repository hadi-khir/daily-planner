import { NextResponse } from "next/server"

/**
 * API route handler for fetching daily inspirational quotes.
 * @returns Quote data or error response
 */
export async function GET() {
    const apiKey = process.env.QUOTE_API_KEY

    if (!apiKey) {
        return NextResponse.json({ error: "Quote API key not configured" }, { status: 500 })
    }

    try {
        const response = await fetch(
            `https://api.api-ninjas.com/v1/quotes`,
            {
                headers: {
                    'X-Api-Key': apiKey
                }
            }
        )

        if (!response.ok) {
            throw new Error("Failed to fetch quote data")
        }

        const data = await response.json()

        const quoteData = {
            quoteText: data[0].quote,
            quoteAuthor: data[0].author,
            quoteCategory: data[0].category,
        }

        return NextResponse.json(quoteData)
    } catch (error) {
        console.error("Quote API error:", error)
        return NextResponse.json({ error: "Failed to fetch quote data" }, { status: 500 })
    }
}
