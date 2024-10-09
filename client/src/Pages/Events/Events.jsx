import React, { useState, useMemo } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Plus, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { eventsList } from '@/lib/data'

export default function Events() {
  const [showUpcoming, setShowUpcoming] = useState(true)
  const [events, setEvents] = useState(eventsList)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    day: '',
    start_time: '',
    end_time: '',
    lab_no: '',
    facultyIncharge: '',
    year: '',
    no_of_students: '',
    organized_by: ''
  })
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, eventId: null })

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date()
    return events.reduce((acc, event) => {
      const eventDate = new Date(event.date)
      if (eventDate > now) {
        acc.upcomingEvents.push(event)
      } else {
        acc.pastEvents.push(event)
      }
      return acc
    }, { upcomingEvents: [], pastEvents: [] })
  }, [events])

  const displayEvents = showUpcoming ? upcomingEvents : pastEvents

  const handleAddEvent = () => {
    const newEventWithId = { ...newEvent, id: Date.now() }
    setEvents([...events, newEventWithId])
    setNewEvent({
      name: '',
      date: '',
      day: '',
      start_time: '',
      end_time: '',
      lab_no: '',
      facultyIncharge: '',
      year: '',
      no_of_students: '',
      organized_by: ''
    })
    setIsAddEventOpen(false)
  }

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id))
    setDeleteConfirmation({ isOpen: false, eventId: null })
  }

  return (
    <div className="container mx-auto p-4 text-comp">
      <div className="flex flex-col sm:flex-row justify-center w-full space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
        <Button
          onClick={() => setShowUpcoming(true)}
          className={`${showUpcoming ? "bg-comp text-white" : "bg-white text-comp hover:bg-comp hover:text-white"} w-full border border-comp font-semibold`}
        >
          Upcoming Events
        </Button>
        <Button
          onClick={() => setShowUpcoming(false)}
          className={`${!showUpcoming ? "bg-comp text-white" : "bg-white text-comp hover:bg-comp hover:text-white"} w-full border border-comp font-semibold`}
        >
          Past Events
        </Button>
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button className="bg-comp text-white w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="day" className="text-right">
                  Day
                </Label>
                <Input
                  id="day"
                  value={newEvent.day}
                  onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="start_time" className="text-right">
                  Start Time
                </Label>
                <Input
                  id="start_time"
                  type="time"
                  value={newEvent.start_time}
                  onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="end_time" className="text-right">
                  End Time
                </Label>
                <Input
                  id="end_time"
                  type="time"
                  value={newEvent.end_time}
                  onChange={(e) => setNewEvent({ ...newEvent, end_time: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lab_no" className="text-right">
                  Lab No
                </Label>
                <Input
                  id="lab_no"
                  value={newEvent.lab_no}
                  onChange={(e) => setNewEvent({ ...newEvent, lab_no: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="facultyIncharge" className="text-right">
                  Faculty In-charge
                </Label>
                <Input
                  id="facultyIncharge"
                  value={newEvent.facultyIncharge}
                  onChange={(e) => setNewEvent({ ...newEvent, facultyIncharge: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Input
                  id="year"
                  value={newEvent.year}
                  onChange={(e) => setNewEvent({ ...newEvent, year: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="no_of_students" className="text-right">
                  Number of Students
                </Label>
                <Input
                  id="no_of_students"
                  type="number"
                  value={newEvent.no_of_students}
                  onChange={(e) => setNewEvent({ ...newEvent, no_of_students: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="organized_by" className="text-right">
                  Organized by
                </Label>
                <Input
                  id="organized_by"
                  value={newEvent.organized_by}
                  onChange={(e) => setNewEvent({ ...newEvent, organized_by: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddEvent} className="bg-comp text-white">Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">
        {showUpcoming ? "Upcoming Events" : "Past Events"}
      </h2>
      {displayEvents.length === 0 ? (
        <Alert>
          <AlertTitle>No events to display</AlertTitle>
          <AlertDescription>
            There are no {showUpcoming ? "upcoming" : "past"} events at this time.
          </AlertDescription>
        </Alert>
      ) : (
        displayEvents.map((event) => (
          <Alert key={event.id} className="mt-4 border border-comp">
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <AlertTitle>{event.name}</AlertTitle>
                </div>
                <AlertDescription>
                  <p><strong>Date:</strong> {event.date} ({event.day})</p>
                  <p><strong>Time:</strong> {event.start_time} - {event.end_time}</p>
                  <p><strong>Location:</strong> Lab {event.lab_no}</p>
                  <p><strong>Faculty In-charge:</strong> {event.facultyIncharge}</p>
                  <p><strong>Year:</strong> {event.year}</p>
                  <p><strong>Number of Students:</strong> {event.no_of_students}</p>
                  <p><strong>Organized by:</strong> {event.organized_by}</p>
                </AlertDescription>
              </div>
              <Button
                onClick={() => setDeleteConfirmation({ isOpen: true, eventId: event.id })}
                variant="destructive"
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Alert>
        ))
      )}

      <Dialog open={deleteConfirmation.isOpen} onOpenChange={(isOpen) => setDeleteConfirmation({ ...deleteConfirmation, isOpen })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this event?</p>
          <DialogFooter>
            <Button onClick={() => setDeleteConfirmation({ isOpen: false, eventId: null })} variant="outline">Cancel</Button>
            <Button onClick={() => handleDeleteEvent(deleteConfirmation.eventId)} className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}