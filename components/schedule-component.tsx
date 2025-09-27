import { getScheduleEvents } from "@/lib/actions/schedule";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock, Plus, X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export async function ScheduleComponent() {

    const events = await getScheduleEvents();

    return (
        <Card className="h-fit">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Today's Schedule
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Card className="border-dashed">
                    <CardContent className="pt-6 space-y-4">
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Event Title</Label>
                                <Input id="title" name="title" placeholder="Enter event title" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="startTime">Start Time</Label>
                                    <Input id="startTime" name="startTime" type="time" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endTime">End Time</Label>
                                    <Input id="endTime" name="endTime" type="time" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Textarea id="description" name="description" placeholder="Add event details" rows={2} />
                            </div>
                            <Button type="submit" size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Event
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-3">
                    {events.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No events scheduled for today</p>
                            <p className="text-sm">Add an event to get started</p>
                        </div>
                    ) : (
                        events.map((event) => (
                            <Card key={event.id} className="relative">
                                <CardContent className="pt-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                                    {event.start_time} - {event.end_time}
                                                </div>
                                                <h3 className="font-semibold">{event.title}</h3>
                                            </div>
                                            {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
                                        </div>
                                        <form className="inline">
                                            <input type="hidden" name="id" value={event.id} />
                                            <Button
                                                type="submit"
                                                variant="ghost"
                                                size="sm"
                                                className="text-muted-foreground hover:text-destructive"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}