import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplets, Plus, Minus } from "lucide-react"
import { updateHydration, getTodayHydration } from "@/lib/actions/hydration"

export async function Hydration() {
    const todayHydration = await getTodayHydration()
    const glasses = todayHydration?.cups || 0
    const dailyGoal = 8

    const progressPercentage = Math.min((glasses / dailyGoal) * 100, 100)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Hydration
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{glasses}</div>
                    <div className="text-sm text-muted-foreground">of {dailyGoal} glasses</div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Progress</span>
                        <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-2">
                    <form action={updateHydration} className="inline">
                        <input type="hidden" name="cups" value={Math.max(glasses - 1, 0)} />
                        <Button type="submit" variant="outline" size="sm" disabled={glasses === 0}>
                            <Minus className="h-4 w-4" />
                        </Button>
                    </form>
                    <form action={updateHydration} className="inline">
                        <input type="hidden" name="cups" value={glasses + 1} />
                        <Button type="submit" size="sm" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Glass
                        </Button>
                    </form>
                </div>

                {glasses >= dailyGoal && (
                    <div className="text-center text-sm text-green-600 font-medium">🎉 Daily goal achieved!</div>
                )}
            </CardContent>
        </Card>
    )
}
