"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server"

/**
 * Saves or updates a note for the authenticated user for today's date.
 * @param formData - Form data containing note text and optional clientDate
 */
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

    const now = clientDate ? new Date(clientDate) : new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    const { data: existingNotes } = await supabase
        .from("notes")
        .select("*")
        .gte("created_at", startOfDay.toISOString())
        .lt("created_at", endOfDay.toISOString())
        .order("created_at", { ascending: false })
        .limit(1)

    let error

    if (existingNotes && existingNotes.length > 0) {
        const result = await supabase.from("notes").update({ note: note.trim(), user_id: user.id }).eq("id", existingNotes[0].id)
        error = result.error
    } else {
        const result = await supabase.from("notes").insert([{ note: note.trim(), user_id: user.id }])
        error = result.error
    }

    if (error) {
        console.error("Error saving note:", error)
        return
    }

    revalidatePath("/")
}

/**
 * Retrieves the latest note for today's date.
 * @param clientDate - Optional date string from client to determine timezone context
 * @returns Note record or null if not found
 */
export async function getLatestNote(clientDate?: string) {
    const supabase = await createClient()

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
