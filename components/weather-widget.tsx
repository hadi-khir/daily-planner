"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Snowflake, MapPin } from "lucide-react"

interface WeatherData {
    location: string
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
}

export function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate API call - replace with actual weather API
        const fetchWeather = async () => {
            setLoading(true)
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Mock weather data
            setWeather({
                location: "San Francisco, CA",
                temperature: 72,
                condition: "Partly Cloudy",
                humidity: 65,
                windSpeed: 8,
            })
            setLoading(false)
        }

        fetchWeather()
    }, [])

    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case "sunny":
            case "clear":
                return <Sun className="h-8 w-8 text-yellow-500" />
            case "partly cloudy":
            case "cloudy":
                return <Cloud className="h-8 w-8 text-gray-500" />
            case "rainy":
            case "rain":
                return <CloudRain className="h-8 w-8 text-blue-500" />
            case "snowy":
            case "snow":
                return <Snowflake className="h-8 w-8 text-blue-300" />
            default:
                return <Cloud className="h-8 w-8 text-gray-500" />
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5" />
                    Weather
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="text-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <p className="text-sm text-muted-foreground">Loading weather...</p>
                    </div>
                ) : weather ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">{weather.temperature}°F</div>
                                <div className="text-sm text-muted-foreground">{weather.condition}</div>
                            </div>
                            {getWeatherIcon(weather.condition)}
                        </div>

                        <div className="text-sm text-muted-foreground">
                            <div className="flex items-center gap-1 mb-1">
                                <MapPin className="h-3 w-3" />
                                {weather.location}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-muted-foreground">Humidity</div>
                                <div className="font-medium">{weather.humidity}%</div>
                            </div>
                            <div>
                                <div className="text-muted-foreground">Wind</div>
                                <div className="font-medium">{weather.windSpeed} mph</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6 text-muted-foreground">
                        <Cloud className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Weather unavailable</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
