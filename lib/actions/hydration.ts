"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

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

    // Get today's hydration record in local timezone
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
        // Update existing record
        const result = await supabase.from("hydration").update({ cups: cupsCount }).eq("id", existingRecord[0].id).eq("user_id", user.id)
        error = result.error
    } else {
        // Create new record
        const result = await supabase.from("hydration").insert([{ cups: cupsCount, user_id: user.id }])
        error = result.error
    }

    if (error) {
        console.error("Error updating hydration:", error)
        return
    }

    revalidatePath("/")
}

export async function getTodayHydration(clientDate?: string) {
    const supabase = await createClient()

    // Get today's hydration record in local timezone
    const now = clientDate ? new Date(clientDate) : new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const todayStart = today.toISOString()
    const todayEnd = new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString()

    console.log("Fetching hydration between", todayStart, "and", todayEnd)

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
