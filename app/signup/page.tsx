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
                        <Button variant="outline" size="default" className="gap-2">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Sign in with Google
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
                        A beautiful daily planner that helps you organize your schedule, track your goals, and stay hydrated—all in
                        one place.
                    </p>
                    <Link href="/auth/login">
                        <Button size="lg" className="gap-2 h-12 px-8 text-base">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Sign in with Google
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
                        <Button size="lg" className="gap-2 h-12 px-8 text-base">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Sign in with Google
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