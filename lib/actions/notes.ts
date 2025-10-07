"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server"

export async function saveNote(formData: FormData) {
    const note = formData.get("note") as string
    const clientDate = formData.get("clientDate") as string

    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        console.error("User not authenticated")
        return
    }

    // Get start and end of today
    const now = clientDate ? new Date(clientDate) : new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    // First, get today's note to update it, or create a new one
    const { data: existingNotes } = await supabase
        .from("notes")
        .select("*")
        .gte("created_at", startOfDay.toISOString())
        .lt("created_at", endOfDay.toISOString())
        .order("created_at", { ascending: false })
        .limit(1)

    let error

    if (existingNotes && existingNotes.length > 0) {
        // Update existing note
        const result = await supabase.from("notes").update({ note: note.trim(), user_id: user.id }).eq("id", existingNotes[0].id)
        error = result.error
    } else {
        // Create new note
        const result = await supabase.from("notes").insert([{ note: note.trim(), user_id: user.id }])
        error = result.error
    }

    if (error) {
        console.error("Error saving note:", error)
        return
    }

    revalidatePath("/")
}

export async function getLatestNote(clientDate?: string) {
    const supabase = await createClient()

    // Get start and end of today
    const now = clientDate ? new Date(clientDate) : new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    const { data: notes, error } = await supabase
        .from("notes")
        .select("*")
        .gte("created_at", startOfDay.toISOString())
        .lt("created_at", endOfDay.toISOString())
        .order("created_at", { ascending: false })
        .limit(1)

    if (error) {
        console.error("Error fetching note:", error)
        return null
    }

    return notes?.[0] || null
}
