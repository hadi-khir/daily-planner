import { createClient } from "../supabase/server";

export async function getScheduleEvents() {

    const supabase = await createClient()
    const { data: events, error } = await supabase.from('schedule').select()
    if (error) {
        console.error('Error fetching schedule events:', error)
        return []
    }
    return events
}