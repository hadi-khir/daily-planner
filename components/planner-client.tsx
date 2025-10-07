"use client"

import { ScheduleComponent } from "@/components/schedule-component"
import { DailyGoals } from "@/components/daily-goals"
import { NotesComponent } from "@/components/notes-component"
import { WeatherWidget } from "@/components/weather-widget"
import { Hydration } from "@/components/hydration"
import { DateProvider } from "@/contexts/date-context"

export function PlannerClient({ userLocation }: { userLocation: string }) {
    return (
        <DateProvider>
            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* Left column - Schedule */}
                <div className="space-y-6">
                    <ScheduleComponent />
                </div>

                {/* Right column - Widgets */}
                <div className="space-y-6">
                    <DailyGoals />
                    <NotesComponent />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Hydration />
                        <WeatherWidget userLocation={userLocation} />
                    </div>
                </div>
            </div>
        </DateProvider>
    )
}
