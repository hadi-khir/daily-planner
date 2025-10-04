"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateHydration(formData: FormData) {
    const cups = formData.get("cups") as string

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

    // Get today's hydration record
    const today = new Date().toISOString().split("T")[0]
    const { data: existingRecord } = await supabase
        .from("hydration")
        .select("*")
        .gte("created_at", `${today}T00:00:00.000Z`)
        .lt("created_at", `${today}T23:59:59.999Z`)
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

export async function getTodayHydration() {
    const supabase = await createClient()

    const today = new Date().toISOString().split("T")[0]
    const { data: hydration, error } = await supabase
        .from("hydration")
        .select("*")
        .gte("created_at", `${today}T00:00:00.000Z`)
        .lt("created_at", `${today}T23:59:59.999Z`)
        .limit(1)

    if (error) {
        console.error("Error fetching hydration:", error)
        return null
    }

    return hydration?.[0] || null
}
