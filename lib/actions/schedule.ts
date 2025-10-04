"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server"

export async function addScheduleEvent(formData: FormData) {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const startTime = formData.get("startTime") as string
    const endTime = formData.get("endTime") as string
    const eventDate = formData.get("eventDate") as string

    if (!title?.trim() || !startTime || !endTime || !eventDate) {
        console.error("All fields except description are required")
        return
    }

    const supabase = await createClient()

    // Get current user
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return
    }

    const { error } = await supabase.from("schedule").insert([
        {
            title: title.trim(),
            description: description?.trim() || null,
            start_time: startTime,
            end_time: endTime,
            event_date: eventDate,
            user_id: user.id,
        },
    ])

    if (error) {
        console.error("Error adding schedule event:", error)
        return
    }

    revalidatePath("/")
}

export async function deleteScheduleEvent(formData: FormData) {
    const id = formData.get("id") as string

    if (!id) {
        return
    }

    const supabase = await createClient()

    const { error } = await supabase.from("schedule").delete().eq("id", Number.parseInt(id))

    if (error) {
        console.error("Error deleting schedule event:", error)
        return
    }

    revalidatePath("/")
}

export async function getScheduleEvents() {
    const supabase = await createClient()

    // Get current user
    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        return []
    }

    const todayLocal = new Intl.DateTimeFormat('en-CA').format(new Date())

    const { data: events, error } = await supabase
        .from("schedule")
        .select("*")
        .eq("user_id", user.id)
        .eq("event_date", todayLocal)
        .order("start_time", { ascending: true })

    if (error) {
        console.error("Error fetching schedule events:", error)
        return []
    }

    return events || []
}
