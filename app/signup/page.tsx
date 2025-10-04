import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, Cloud, Droplets } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-6 w-6" />
                        <span className="text-xl font-semibold">DailyFlow</span>
                    </div>
                    <Link href="/auth/login">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-24 md:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
                        Plan your day with clarity and purpose
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto leading-relaxed">
                        A beautiful daily auth/login that helps you organize your schedule, track your goals, and stay hydrated—all in
                        one place.
                    </p>
                    <Link href="/auth/login">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-24 border-t border-border">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance">
                        Everything you need to stay organized
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col gap-3">
                            <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold">Daily Schedule</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Time-block your day with an intuitive schedule view. Add events with start and end times.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold">Daily Goals</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Set and track your daily goals. Check them off as you accomplish them throughout the day.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                                <Droplets className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold">Hydration Tracker</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Stay healthy by tracking your water intake. Simple counter to help you reach your daily goal.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                                <Cloud className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold">Weather Widget</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Check today's weather at a glance. Plan your day with the forecast in mind.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-24 border-t border-border">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Start planning your best day yet</h2>
                    <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
                        Sign in with Google to get started. Your data is securely stored and synced across all your devices.
                    </p>
                    <Link href="/auth/login">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-8">
                <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
                    <p>Built with Next.js, Supabase, and shadcn/ui</p>
                </div>
            </footer>
        </div>
    )
}
