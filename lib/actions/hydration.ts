"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

/**
 * Updates or creates a hydration record for the authenticated user.
 * @param formData - Form data containing cups count and optional clientDate
 */
export async function updateHydration(formData: FormData) {
    const cups = formData.get("cups") as string
    const clientDate = formData.get("clientDate") as string

    if (!cups) {
        return
    }

    const cupsCount = Number.parseInt(cups)
    if (isNaN(cupsCount) || cupsCount < 0) {
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

    const now = clientDate ? new Date(clientDate) : new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const todayStart = today.toISOString()
    const todayEnd = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()

    const { data: existingRecord } = await supabase
        .from("hydration")
        .select("*")
        .gte("created_at", todayStart)
        .lt("created_at", todayEnd)
        .limit(1)

    let error

    if (existingRecord && existingRecord.length > 0) {
        const result = await supabase.from("hydration").update({ cups: cupsCount }).eq("id", existingRecord[0].id).eq("user_id", user.id)
        error = result.error
    } else {
        const result = await supabase.from("hydration").insert([{ cups: cupsCount, user_id: user.id }])
        error = result.error
    }

    if (error) {
        console.error("Error updating hydration:", error)
        return
    }

    revalidatePath("/")
}

/**
 * Retrieves today's hydration record for the authenticated user.
 * @param clientDate - Optional date string from client to determine timezone context
 * @returns Hydration record or null if not found
 */
export async function getTodayHydration(clientDate?: string) {
    const supabase = await createClient()

    const now = clientDate ? new Date(clientDate) : new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const todayStart = today.toISOString()
    const todayEnd = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()

    const { data: hydration, error } = await supabase
        .from("hydration")
        .select("*")
        .gte("created_at", todayStart)
        .lt("created_at", todayEnd)
        .limit(1)

    if (error) {
        console.error("Error fetching hydration:", error)
        return null
    }

    return hydration?.[0] || null
}
