import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserPreferences } from "@/lib/actions/preferences"
import { CurrentDate } from "@/components/current-date"
import { QuoteComponent } from "@/components/quote-component"
import { PlannerClient } from "@/components/planner-client"

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
          <CurrentDate />
          <QuoteComponent />
        </div>

        <PlannerClient userLocation={userLocation} />
      </main>
    </div>
  )
}
