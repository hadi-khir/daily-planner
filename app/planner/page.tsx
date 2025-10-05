import { Button } from "@/components/ui/button"
import { ScheduleComponent } from "@/components/schedule-component"
import { DailyGoals } from "@/components/daily-goals"
import { NotesComponent } from "@/components/notes-component"
import { WeatherWidget } from "@/components/weather-widget"
import { LogOut, User } from "lucide-react"
import { redirect } from "next/navigation"
import { Hydration } from "@/components/hydration"
import { createClient } from "@/lib/supabase/server"
import { getUserPreferences } from "@/lib/actions/preferences"

export default async function DailyPlannerPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // get user_preference weather if set
  const userLocation = await getUserPreferences().then((res) => res.data?.location || "San Francisco")

  const now = new Date()
  const currentDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  })

  const quotes = [
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "Life is what happens to you while you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  ]

  const todaysQuote = quotes[new Date().getDate() % quotes.length]

  async function logout() {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/signup")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with user info and logout button */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          {user.email}
        </div>
        <form action={logout}>
          <Button type="submit" variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </form>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 pb-8">
        {/* Centered title and quote */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{currentDate}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{todaysQuote}</p>
        </div>

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
      </main>
    </div>
  )
}
