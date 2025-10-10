"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server"

/**
 * Adds a new goal for the authenticated user.
 * @param formData - Form data containing the goal text
 */
export async function addGoal(formData: FormData) {
    const goal = formData.get("goal") as string

    if (!goal?.trim()) {
        console.error("Goal is required")
        return
    }

    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        console.error("User not authenticated")
        return
    }

    const { error } = await supabase.from("goals").insert([{ goal: goal.trim(), user_id: user.id }])

    if (error) {
        console.error("Error adding goal:", error)
        return
    }

    revalidatePath("/")
}

/**
 * Deletes a goal by ID for the authenticated user.
 * @param formData - Form data containing the goal ID
 */
export async function deleteGoal(formData: FormData) {
    const id = formData.get("id") as string

    if (!id) {
        console.error("Goal ID is required")
        return
    }

    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        console.error("User not authenticated")
        return
    }

    const { error } = await supabase.from("goals").delete().eq("id", Number.parseInt(id)).eq("user_id", user.id)

    if (error) {
        console.error("Error deleting goal:", error)
        return
    }

    revalidatePath("/")
}

/**
 * Retrieves all goals for the authenticated user for today's date.
 * @param clientDate - Optional date string from client to determine timezone context
 * @returns Array of goals or empty array if none found
 */
export async function getGoals(clientDate?: string) {
    const supabase = await createClient()

    const now = clientDate ? new Date(clientDate) : new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    const { data: goals, error } = await supabase
        .from("goals")
        .select("*")
        .gte("created_at", startOfDay.toISOString())
        .lt("created_at", endOfDay.toISOString())
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching goals:", error)
        return []
    }

    return goals || []
}