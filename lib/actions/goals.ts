"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server"

export async function addGoal(formData: FormData) {
    const goal = formData.get("goal") as string

    if (!goal?.trim()) {
        console.error("Goal is required")
        return // Don't return an object
    }

    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        console.error("User not authenticated")
        return // Don't return an object
    }

    const { error } = await supabase.from("goals").insert([{ goal: goal.trim(), user_id: user.id }])

    if (error) {
        console.error("Error adding goal:", error)
        return // Don't return an object
    }

    revalidatePath("/")
    // No return statement needed here
}

export async function deleteGoal(formData: FormData) {
    const id = formData.get("id") as string

    if (!id) {
        console.error("Goal ID is required")
        return // Don't return an object
    }

    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        console.error("User not authenticated")
        return // Don't return an object
    }

    const { error } = await supabase.from("goals").delete().eq("id", Number.parseInt(id)).eq("user_id", user.id)

    if (error) {
        console.error("Error deleting goal:", error)
        return // Don't return an object
    }

    revalidatePath("/")
    // No return statement needed here
}

export async function getGoals() {
    const supabase = await createClient()

    const { data: goals, error } = await supabase.from("goals").select("*").order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching goals:", error)
        return []
    }

    return goals || []
}