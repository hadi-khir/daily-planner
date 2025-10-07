"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, Save } from "lucide-react"
import { getLatestNote, saveNote } from "@/lib/actions/notes"
import { useEffect, useState } from "react"
import { useCurrentDate } from "@/contexts/date-context"

export function NotesComponent() {
    const [defaultNotes, setDefaultNotes] = useState("")
    const currentDate = useCurrentDate()

    useEffect(() => {
        const fetchNote = async () => {
            const latestNote = await getLatestNote(currentDate)
            setDefaultNotes(latestNote?.note || "")
        }
        fetchNote()
    }, [currentDate])

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Notes
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form action={saveNote} className="space-y-4">
                    <input type="hidden" name="clientDate" value={currentDate} />
                    <Textarea
                        name="note"
                        value={defaultNotes}
                        onChange={(e) => setDefaultNotes(e.target.value)}
                        placeholder="Write your thoughts, ideas, or reminders here..."
                        className="min-h-[200px] resize-none"
                    />
                    <Button type="submit" size="sm" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Notes
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
