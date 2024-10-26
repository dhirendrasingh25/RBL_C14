import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Clock,
  Calendar,
  Users,
  Monitor,
  Projector,
  Fan,
  Snowflake,
  AlertCircle,
} from 'lucide-react'
import { labList, classList, eventsList } from '@/lib/data'

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [availableLabs, setAvailableLabs] = useState([])
  const [availableClassrooms, setAvailableClassrooms] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    updateAvailability()
    updateUpcomingEvents()
  }, [currentTime])

  const updateAvailability = () => {
    const currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()
    const currentTimeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`

    const parseTime = (timeString) => {
      const [time, period] = timeString.split(' ')
      let [hours, minutes] = time.split(':').map(Number)
      if (period === 'PM' && hours !== 12) hours += 12
      if (period === 'AM' && hours === 12) hours = 0
      return hours * 60 + minutes
    }

    const currentTimeMinutes = parseTime(currentTimeString)

    const isTimeInRange = (start, end, current) => {
      const startMinutes = parseTime(start)
      const endMinutes = parseTime(end)
      return current >= startMinutes && current < endMinutes
    }

    const isAvailable = (item) => {
      return !item.timeTable.some((slot) =>
        isTimeInRange(slot.timeSt, slot.timeEnd, currentTimeMinutes),
      )
    }

    const availableLabs = labList.filter(isAvailable)
    const availableClassrooms = classList.filter(isAvailable)

    setAvailableLabs(availableLabs)
    setAvailableClassrooms(availableClassrooms)
  }

  const updateUpcomingEvents = () => {
    const today = new Date()
    const upcomingEvents = eventsList
      .filter((event) => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5)
    setUpcomingEvents(upcomingEvents)
  }

  const getTotalAndWorkingCount = (items, type) => {
    const total = items.length
    const working = items.filter((item) => {
      if (type === 'lab') {
        return (
          item.projector_working &&
          item.fans_working &&
          item.air_conditioner_working &&
          parseInt(item.no_of_Computers_working) === parseInt(item.computers)
        )
      } else {
        return (
          item.computer_working &&
          item.projector_working &&
          item.air_conditioner_working &&
          item.fans_working &&
          item.lights_working
        )
      }
    }).length
    return { total, working }
  }

  const labStats = getTotalAndWorkingCount(labList, 'lab')
  const classroomStats = getTotalAndWorkingCount(classList, 'classroom')

  const hasIssues = (lab) => {
    return (
      !lab.projector_working ||
      !lab.fans_working ||
      !lab.air_conditioner_working ||
      parseInt(lab.no_of_Computers_working) !== parseInt(lab.computers)
    )
  }

  return (
    <div className="container mx-auto p-4  text-comp">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className=" text-comp">
          <CardHeader>
            <CardTitle>Current Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {currentTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </div>
          </CardContent>
        </Card>
        <Card className=" text-comp">
          <CardHeader>
            <CardTitle>Available Labs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{availableLabs.length}</div>
            <div className="mt-2">
              {availableLabs.map((lab) => (
                <Badge key={lab.name} variant="secondary" className="mr-2 mb-2">
                  {lab.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className=" text-comp">
          <CardHeader>
            <CardTitle>Available Classrooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {availableClassrooms.length}
            </div>
            <div className="mt-2">
              {availableClassrooms.map((classroom) => (
                <Badge
                  key={classroom.name}
                  variant="secondary"
                  className="mr-2 mb-2"
                >
                  {classroom.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="events" className="mt-6 text-comp">
        <TabsList className="text-comp">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="labs">Labs</TabsTrigger>
          <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
        </TabsList>
        <TabsContent value="labs" className="text-comp">
          <Card className="text-comp">
            <CardHeader>
              <CardTitle>Lab Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-comp">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Total Labs: {labStats.total}</span>
                    <span>Fully Functional Labs: {labStats.working}</span>
                  </div>
                  <Progress value={(labStats.working / labStats.total) * 100} />
                </div>
                {labList.map((lab) => (
                  <Card key={lab.name} className="text-comp border-comp">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {hasIssues(lab) && (
                          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                        )}
                        Lab {lab.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className={
                            parseInt(lab.no_of_Computers_working) !==
                            parseInt(lab.computers)
                              ? 'text-red-500'
                              : ''
                          }
                        >
                          <Monitor className="inline-block mr-2" />
                          Computers: {lab.no_of_Computers_working}/
                          {lab.computers}
                        </div>
                        <div
                          className={
                            !lab.projector_working ? 'text-red-500' : ''
                          }
                        >
                          <Projector className="inline-block mr-2" />
                          Projector:{' '}
                          {lab.projector_working ? 'Working' : 'Not Working'}
                        </div>
                        <div
                          className={!lab.fans_working ? 'text-red-500' : ''}
                        >
                          <Fan className="inline-block mr-2" />
                          Fans: {lab.fans_working ? 'Working' : 'Not Working'}
                        </div>
                        <div
                          className={
                            !lab.air_conditioner_working ? 'text-red-500' : ''
                          }
                        >
                          <Snowflake className="inline-block mr-2" />
                          AC:{' '}
                          {lab.air_conditioner_working
                            ? 'Working'
                            : 'Not Working'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="classrooms">
          <Card className="text-comp">
            <CardHeader>
              <CardTitle>Classroom Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-comp">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Total Classrooms: {classroomStats.total}</span>
                    <span>
                      Fully Functional Classrooms: {classroomStats.working}
                    </span>
                  </div>
                  <Progress
                    value={
                      (classroomStats.working / classroomStats.total) * 100
                    }
                  />
                </div>
                {classList.map((classroom) => (
                  <Card key={classroom.name} className="text-comp ">
                    <CardHeader>
                      <CardTitle>Classroom {classroom.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Users className="inline-block mr-2" />
                          Capacity: {classroom.capacity}
                        </div>
                        <div
                          className={
                            !classroom.computer_working ? 'text-red-500' : ''
                          }
                        >
                          <Monitor className="inline-block mr-2" />
                          Computer:{' '}
                          {classroom.computer_working
                            ? 'Working'
                            : 'Not Working'}
                        </div>
                        <div
                          className={
                            !classroom.projector_working ? 'text-red-500' : ''
                          }
                        >
                          <Projector className="inline-block mr-2" />
                          Projector:{' '}
                          {classroom.projector_working
                            ? 'Working'
                            : 'Not Working'}
                        </div>
                        <div
                          className={
                            !classroom.air_conditioner_working
                              ? 'text-red-500'
                              : ''
                          }
                        >
                          <Snowflake className="inline-block mr-2" />
                          AC:{' '}
                          {classroom.air_conditioner_working
                            ? 'Working'
                            : 'Not Working'}
                        </div>
                        <div
                          className={
                            !classroom.fans_working ? 'text-red-500' : ''
                          }
                        >
                          <Fan className="inline-block mr-2" />
                          Fans:{' '}
                          {classroom.fans_working ? 'Working' : 'Not Working'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="events">
          <Card className="text-comp">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="text-comp">
              <div className="space-y-4 text-comp">
                {upcomingEvents.map((event) => (
                  <Card key={event.name} className="text-comp ">
                    <CardHeader>
                      <CardTitle>{event.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-comp ">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Calendar className="inline-block mr-2" />
                          Date: {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div>
                          <Clock className="inline-block mr-2" />
                          Time: {event.start_time} - {event.end_time}
                        </div>
                        <div>
                          <Monitor className="inline-block mr-2" />
                          Lab: {event.lab_no}
                        </div>
                        <div>
                          <Users className="inline-block mr-2" />
                          Students: {event.no_of_students}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
