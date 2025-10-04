"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getUserPreferences() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { data: null, error: "Not authenticated" }
    }

    const { data, error } = await supabase.from("user_preference").select("*").eq("user_id", user.id).single()

    if (error && error.code !== "PGRST116") {
        // PGRST116 is "not found" error
        return { data: null, error: error.message }
    }

    return { data, error: null }
}

export async function updateUserLocation(formData: FormData) {
    const location = formData.get("location") as string

    if (!location) {
        return { error: "Location is required" }
    }

    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Not authenticated" }
    }

    // Try to update first
    const { data: existing } = await supabase.from("user_preference").select("id").eq("user_id", user.id).single()

    if (existing) {
        // Update existing preference
        const { error } = await supabase
            .from("user_preference")
            .update({ location, updated_at: new Date().toISOString() })
            .eq("user_id", user.id)

        if (error) {
            return { error: error.message }
        }
    } else {
        // Insert new preference
        const { error } = await supabase.from("user_preference").insert({ user_id: user.id, location })

        if (error) {
            return { error: error.message }
        }
    }

    revalidatePath("/planner")
    return { error: null }
}
