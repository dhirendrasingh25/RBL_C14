"use client"

import { useState, useMemo } from "react"
import { Clock, MapPin, Users, BookOpen, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"

import { seminarHallsData } from "@/lib/data"
import { eventsList } from "@/lib/data"

export default function HallPage() {
  const [activeTab, setActiveTab] = useState("halls")
  const [selectedHall, setSelectedHall] = useState(null)
  const [events, setEvents] = useState(eventsList)
  const [isAllocateDialogOpen, setIsAllocateDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [seminarHalls, setSeminarHalls] = useState(seminarHallsData)

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date()
    return events.reduce(
      (acc, event) => {
        const eventDate = new Date(event.date)
        if (eventDate > now) {
          acc.upcomingEvents.push(event)
        } else {
          acc.pastEvents.push(event)
        }
        return acc
      },
      { upcomingEvents: [], pastEvents: [] },
    )
  }, [events])

  const handleAllocateEvent = () => {
    if (selectedEvent && selectedHall) {
      // Update the event with the selected seminar hall
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id ? { ...event, seminarHallId: selectedHall.id } : event,
      )
      setEvents(updatedEvents)

      // Update seminar hall availability
      const updatedHalls = seminarHalls.map((hall) =>
        hall.id === selectedHall.id ? { ...hall, availability: "Booked" } : hall,
      )
      setSeminarHalls(updatedHalls)

      setIsAllocateDialogOpen(false)
      setSelectedEvent(null)
    }
  }

  const getHallById = (hallId) => {
    return seminarHalls.find((hall) => hall.id === hallId) || { name: "Not assigned" }
  }

  const getEventsByHallId = (hallId) => {
    return events.filter((event) => event.seminarHallId === hallId)
  }

  const getAvailableEvents = () => {
    return upcomingEvents.filter((event) => !event.seminarHallId || event.seminarHallId === 0)
  }

  return (
    <div className="container mx-auto p-4 text-comp">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Seminar Hall Management</h1>

      <Tabs defaultValue="halls" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="halls" className="py-2 px-1 text-xs sm:text-sm">
            Seminar Halls
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="py-2 px-1 text-xs sm:text-sm">
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger value="past" className="py-2 px-1 text-xs sm:text-sm">
            Past Events
          </TabsTrigger>
        </TabsList>

        {/* Seminar Halls Tab */}
        <TabsContent value="halls" className="space-y-4">
          <div className="grid grid-cols-1   sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {seminarHalls.map((hall) => (
              <Card key={hall.id} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-comp sm:text-xl">{hall.name}</CardTitle>
                    <Badge
                      className={
                        hall.availability === "Available"
                          ? "bg-green-500"
                          : hall.availability === "Booked"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }
                    >
                      {hall.availability}
                    </Badge>
                  </div>
                  <CardDescription>Capacity: {hall.capacity} people</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{hall.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {hall.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedHall(hall)
                      setActiveTab("upcoming")
                    }}
                    className="w-full"
                  >
                    View Events
                  </Button>
                  <Dialog
                    open={isAllocateDialogOpen && selectedHall?.id === hall.id}
                    onOpenChange={setIsAllocateDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        disabled={hall.availability !== "Available" || getAvailableEvents().length === 0}
                        onClick={() => setSelectedHall(hall)}
                        className="w-full bg-comp text-white"
                      >
                        Allocate Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-md mx-auto">
                      <DialogHeader>
                        <DialogTitle>Allocate Event to {hall.name}</DialogTitle>
                        <DialogDescription>Select an event to allocate to this seminar hall.</DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Label htmlFor="event">Select Event</Label>
                        <Select
                          onValueChange={(value) => {
                            if (value) {
                              const event = upcomingEvents.find((e) => e && e.id === Number(value))
                              setSelectedEvent(event || null)
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an event" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableEvents()?.map(
                              (event) =>
                                event && (
                                  <SelectItem key={event.id} value={event.id?.toString()}>
                                    {event.name || "Unnamed Event"} - {event.date || "No date"}
                                  </SelectItem>
                                ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAllocateDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAllocateEvent}>Allocate</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Upcoming Events Tab */}
        <TabsContent value="upcoming">
          <div className="mb-4">
            {selectedHall ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-semibold">Events for {selectedHall.name}</h2>
                <Button
                  variant="outline"
                  onClick={() => setSelectedHall(null)}
                  size="sm"
                  className="self-end sm:self-auto bg-comp text-white"
                >
                  Show All Events
                </Button>
              </div>
            ) : (
              <h2 className="text-2xl font-semibold">All Upcoming Events</h2>
            )}
          </div>

          <div className="space-y-4">
            {(selectedHall ? upcomingEvents.filter((event) => event.seminarHallId === selectedHall.id) : upcomingEvents)
              .length === 0 ? (
              <Alert>
                <AlertTitle>No upcoming events</AlertTitle>
                <AlertDescription>
                  There are no upcoming events {selectedHall ? `for ${selectedHall.name}` : ""} at this time.
                </AlertDescription>
              </Alert>
            ) : (
              (selectedHall
                ? upcomingEvents.filter((event) => event.seminarHallId === selectedHall.id)
                : upcomingEvents
              ).map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{event.name}</CardTitle>
                        <CardDescription>
                          {event.date} ({event.day})
                        </CardDescription>
                      </div>
                      <Badge>Upcoming</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {event.start_time} - {event.end_time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{getHallById(event.seminarHallId).name}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{event.facultyIncharge}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {event.no_of_students} students ({event.year})
                        </span>
                      </div>
                      <div className="flex items-center sm:grid-cols-2">
                        <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Organized by: {event.organized_by}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Past Events Tab */}
        <TabsContent value="past">
          <div className="mb-4">
            {selectedHall ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-semibold">Past Events for {selectedHall.name}</h2>
                <Button
                  variant="outline"
                  onClick={() => setSelectedHall(null)}
                  size="sm"
                  className="self-end sm:self-auto"
                >
                  Show All Events
                </Button>
              </div>
            ) : (
              <h2 className="text-2xl font-semibold">All Past Events</h2>
            )}
          </div>

          <ScrollArea className="h-[400px] sm:h-[600px] rounded-md border p-2 sm:p-4">
            <div className="space-y-4">
              {(selectedHall ? pastEvents.filter((event) => event.seminarHallId === selectedHall.id) : pastEvents)
                .length === 0 ? (
                <Alert>
                  <AlertTitle>No past events</AlertTitle>
                  <AlertDescription>
                    There are no past events {selectedHall ? `for ${selectedHall.name}` : ""} to display.
                  </AlertDescription>
                </Alert>
              ) : (
                (selectedHall ? pastEvents.filter((event) => event.seminarHallId === selectedHall.id) : pastEvents).map(
                  (event) => (
                    <Card key={event.id} className="overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{event.name}</CardTitle>
                            <CardDescription>
                              {event.date} ({event.day})
                            </CardDescription>
                          </div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">
                              {event.start_time} - {event.end_time}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{getHallById(event.seminarHallId).name}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{event.facultyIncharge}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">
                              {event.no_of_students} students ({event.year})
                            </span>
                          </div>
                          <div className="flex items-center sm:grid-cols-2">
                            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Organized by: {event.organized_by}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

