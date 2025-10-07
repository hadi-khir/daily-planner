import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const location = searchParams.get("location")

    if (!location) {
        return NextResponse.json({ error: "Location is required" }, { status: 400 })
    }

    // You'll need to add WEATHER_API_KEY to your environment variables
    const apiKey = process.env.WEATHER_API_KEY

    if (!apiKey) {
        return NextResponse.json({ error: "Weather API key not configured" }, { status: 500 })
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=1&aqi=no`,
        )

        if (!response.ok) {
            throw new Error("Failed to fetch weather data")
        }

        const data = await response.json()

        // Transform the API response to match our interface
        const weatherData = {
            location: `${data.location.name}, ${data.location.region}`,
            temperature: Math.round(data.current.temp_c),
            feelsLike: Math.round(data.current.feelslike_c),
            condition: data.current.condition.text,
            humidity: data.current.humidity,
            windSpeed: Math.round(data.current.wind_mph),
            highTemp: Math.round(data.forecast.forecastday[0].day.maxtemp_c),
            lowTemp: Math.round(data.forecast.forecastday[0].day.mintemp_c),
        }

        return NextResponse.json(weatherData)
    } catch (error) {
        console.error("Weather API error:", error)
        return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
    }
}
