import React, { useState, useMemo } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

import { eventsList } from '@/lib/data'

export default function Events() {
  const [showUpcoming, setShowUpcoming] = useState(true)

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date()
    console.log(now);
    return eventsList.reduce((acc, event) => {
      const eventDate = new Date(event.date)
      
      if (eventDate > now) {
        acc.upcomingEvents.push(event)
      } else {
        acc.pastEvents.push(event)
      }
      return acc
    }, { upcomingEvents: [], pastEvents: [] })
  }, [])

  const displayEvents = showUpcoming ? upcomingEvents : pastEvents

  return (
    <div className="container mx-auto p-4 text-comp">
      <div className="flex justify-center w-full space-x-4 mb-6">
        <Button
          onClick={() => setShowUpcoming(true)}
          className={showUpcoming ? "bg-comp text-white w-full border border-comp" : "bg-white w-full border border-comp hover:bg-comp hover:text-white text-comp font-semibold"}
        >
          Upcoming Events
        </Button>
        <Button
          onClick={() => setShowUpcoming(false)}
          className={!showUpcoming ? "bg-comp text-white w-full border border-comp" : "bg-white w-full border border-comp hover:bg-comp hover:text-white text-comp font-semibold"}
        >
          Past Events
        </Button>
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
        displayEvents.map((event, id) => (
          <Alert key={id} className="mt-4 border border-comp">
            <Calendar className="h-4 w-4 mr-2" />
            <AlertTitle>{event.name}</AlertTitle>
            <AlertDescription>
              <p><strong>Date:</strong> {event.date} ({event.day})</p>
              <p><strong>Time:</strong> {event.start_time} - {event.end_time}</p>
              <p><strong>Location:</strong> Lab {event.lab_no}</p>
              <p><strong>Faculty In-charge:</strong> {event.facultyIncharge}</p>
              <p><strong>Year:</strong> {event.year}</p>
              <p><strong>Number of Students:</strong> {event.no_of_students}</p>
              <p><strong>Organized by:</strong> {event.organized_by}</p>
            </AlertDescription>
          </Alert>
        ))
      )}
    </div>
  )
}