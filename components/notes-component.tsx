import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileText, Save } from "lucide-react"
import { getLatestNote, saveNote } from "@/lib/actions/notes"

export async function NotesComponent() {
    const latestNote = await getLatestNote()
    const defaultNotes = latestNote?.note || ""

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
                    <Textarea
                        name="note"
                        defaultValue={defaultNotes}
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
