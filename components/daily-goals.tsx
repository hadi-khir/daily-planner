"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Target, X } from "lucide-react"
import { addGoal, deleteGoal, getGoals } from "@/lib/actions/goals"
import { useEffect, useState } from "react"
import { useCurrentDate } from "@/contexts/date-context"

interface Goal {
    id: number
    goal: string
    user_id: string
    created_at: string
}

/**
 * Component for displaying and managing daily goals.
 */
export function DailyGoals() {
    const [goals, setGoals] = useState<Goal[]>([])
    const currentDate = useCurrentDate()

    useEffect(() => {
        const fetchGoals = async () => {
            const data = await getGoals(currentDate)
            setGoals(data)
        }
        fetchGoals()
    }, [currentDate])

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Daily Goals
                    <span className="text-sm font-normal text-muted-foreground">({goals.length})</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form action={addGoal} className="flex gap-2">
                    <Input name="goal" placeholder="Enter your goal" required />
                    <Button type="submit" size="sm">
                        <Plus className="h-4 w-4" />
                    </Button>
                </form>
                <div className="space-y-3">
                    {goals.length === 0 ? (
                        <div className="text-center py-6 text-muted-foreground">
                            <Target className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p>No goals set for today</p>
                            <p className="text-sm">Add your first goal to get started</p>
                        </div>
                    ) : (
                        goals.map((goal) => (
                            <div key={goal.id} className="flex items-center gap-3 group">
                                <span className="flex-1 text-foreground">{goal.goal}</span>
                                <form action={deleteGoal} className="inline">
                                    <input type="hidden" name="id" value={goal.id} />
                                    <Button
                                        type="submit"
                                        variant="ghost"
                                        size="sm"
                                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
