"use client"

import type React from "react"

import { useState, useEffect, use } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Snowflake, MapPin, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { updateUserLocation } from "@/lib/actions/preferences"

interface WeatherData {
    location: string
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    feelsLike: number
}

interface WeatherWidgetProps {
    userLocation?: string
}

export function WeatherWidget({ userLocation = "Ottawa" }: WeatherWidgetProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [locationInput, setLocationInput] = useState(userLocation)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const fetchWeather = async (location: string) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`)

            if (!response.ok) {
                throw new Error("Failed to fetch weather data")
            }

            const data = await response.json()
            setWeather(data)
        } catch (err) {
            console.error("Weather fetch error:", err)
            setError("Unable to load weather data")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWeather(userLocation)
    }, [userLocation])

    const handleLocationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const result = await updateUserLocation(formData)

        if (result.error) {
            console.error("Failed to update user location:", result.error)
            setError(result.error)
        } else {
            setIsEditing(false)
            fetchWeather(locationInput)
            router.refresh()
        }
    }

    const getWeatherIcon = (condition: string) => {
        const lowerCondition = condition.toLowerCase()

        if (lowerCondition.includes("sunny") || lowerCondition.includes("clear")) {
            return <Sun className="h-8 w-8 text-yellow-500" />
        } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
            return <CloudRain className="h-8 w-8 text-blue-500" />
        } else if (lowerCondition.includes("snow")) {
            return <Snowflake className="h-8 w-8 text-blue-300" />
        } else {
            return <Cloud className="h-8 w-8 text-gray-500" />
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Weather
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(!isEditing)}>
                        <Settings className="h-4 w-4" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <form onSubmit={handleLocationSubmit} className="space-y-3">
                        <div>
                            <Input
                                name="location"
                                placeholder="Enter city name"
                                value={locationInput}
                                onChange={(e) => setLocationInput(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" size="sm" className="flex-1">
                                Save Location
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setIsEditing(false)
                                    setLocationInput(userLocation)
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : loading ? (
                    <div className="text-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <p className="text-sm text-muted-foreground">Loading weather...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-6 text-muted-foreground">
                        <Cloud className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">{error}</p>
                    </div>
                ) : weather ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">{weather.temperature}°C</div>
                                <div className="text-sm text-muted-foreground">Feels like {weather.feelsLike}°C</div>
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
