'use client'

import React, { useState } from 'react'
import { classList } from '@/lib/data'
import { motion } from 'framer-motion'
import {
  AccessTime,
  AccessTimeFilled,
  ComputerOutlined,
  PeopleAltOutlined,
  Person,
  Edit,
  Add,
  Delete,
} from '@mui/icons-material'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import { FaFan } from 'react-icons/fa'
import { TbAirConditioning } from 'react-icons/tb'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function Classroom() {
  const [classes, setClasses] = useState(classList)
  const [selectedClass, setSelectedClass] = useState(classes[0])
  const [editingClass, setEditingClass] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isTimetableDialogOpen, setIsTimetableDialogOpen] = useState(false)
  const [editingTimetable, setEditingTimetable] = useState([])
  const [newTimetableEntry, setNewTimetableEntry] = useState({
    subject: '',
    timeSt: '',
    timeEnd: '',
    facultyIncharge: '',
    year: '',
    class: '',
  })

  const handleEditClass = (classroom) => {
    setEditingClass({ ...classroom })
    setIsDialogOpen(true)
  }

  const handleEditTimetable = (classroom) => {
    setEditingTimetable([...classroom.timeTable])
    setIsTimetableDialogOpen(true)
  }

  const handleSaveEdit = () => {
    setClasses(
      classes.map((classroom) =>
        classroom.name === editingClass.name ? editingClass : classroom,
      ),
    )
    setSelectedClass(editingClass)
    setIsDialogOpen(false)
  }

  const handleSaveTimetable = () => {
    const updatedClass = { ...selectedClass, timeTable: editingTimetable }
    setClasses(
      classes.map((classroom) =>
        classroom.name === selectedClass.name ? updatedClass : classroom,
      ),
    )
    setSelectedClass(updatedClass)
    setIsTimetableDialogOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditingClass((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name) => {
    setEditingClass((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleTimetableEntryChange = (index, field, value) => {
    const updatedTimetable = [...editingTimetable]
    updatedTimetable[index][field] = value
    setEditingTimetable(updatedTimetable)
  }

  const handleNewTimetableEntryChange = (field, value) => {
    setNewTimetableEntry((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddTimetableEntry = () => {
    setEditingTimetable([...editingTimetable, newTimetableEntry])
    setNewTimetableEntry({
      subject: '',
      timeSt: '',
      timeEnd: '',
      facultyIncharge: '',
      year: '',
      class: '',
    })
  }

  const handleRemoveTimetableEntry = (index) => {
    const updatedTimetable = editingTimetable.filter((_, i) => i !== index)
    setEditingTimetable(updatedTimetable)
  }

  return (
    <div className="h-full w-full text-comp">
      <div className="text-xl md:text-2xl text-center font-bold p-2">
        Computer Department Classrooms
      </div>
      <div className="w-full rounded-md border flex overflow-x-auto">
        <div className="w-full p-2 md:p-4 flex flex-row justify-start md:justify-around">
          {classes.map((classroom, index) => (
            <motion.button
              key={index}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-md w-full text-xs md:text-sm font-medium transition-colors mr-1 md:mr-2 ${
                selectedClass === classroom
                  ? 'bg-comp text-white'
                  : 'bg-secondary text-secondary-foreground text-comp hover:bg-secondary/80'
              }`}
              onClick={() => setSelectedClass(classroom)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {classroom.name}
            </motion.button>
          ))}
        </div>
      </div>

      {selectedClass && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4"
        >
          <div className="p-4 md:p-6 h-full border bg-white shadow-md rounded-md">
            <div className="pb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-0">
                {selectedClass.name} Class Details
              </h2>
              <div className="flex flex-col md:flex-row gap-2">
                <Button
                  className="bg-comp w-full md:w-auto"
                  onClick={() => handleEditClass(selectedClass)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit Classroom
                </Button>
                <Button
                  className="bg-comp w-full md:w-auto"
                  onClick={() => handleEditTimetable(selectedClass)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit Timetable
                </Button>
              </div>
            </div>
            <div className="h-full p-2 md:p-4 border rounded-md">
              <div className="flex flex-col md:flex-row w-full">
                <div className="flex flex-col w-full md:w-1/2">
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <PeopleAltOutlined />
                    </div>
                    <div className="text-sm md:text-lg">
                      <span className="font-semibold">Capacity: </span>
                      {selectedClass.capacity}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <ComputerOutlined />
                    </div>
                    <div className="text-sm md:text-lg font-semibold">
                      Computer Working:&nbsp;
                      {selectedClass.computer_working ? '✅' : '❌'}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <LiveTvIcon />
                    </div>
                    <div className="text-sm md:text-lg font-semibold">
                      Projector Working:&nbsp;
                      {selectedClass.projector_working ? '✅' : '❌'}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-2">
                      <TbAirConditioning />
                    </div>
                    <div className="text-sm md:text-lg font-semibold">
                      Air Conditioner Working:&nbsp;
                      {selectedClass.air_conditioner_working ? '✅' : '❌'}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-2">
                      <FaFan />
                    </div>
                    <div className="text-sm md:text-lg font-semibold">
                      Fans Working:&nbsp;
                      {selectedClass.fans_working ? '✅' : '❌'}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <AccessTime />
                    </div>
                    <div className="text-sm md:text-lg font-semibold">
                      Lights Working:&nbsp;
                      {selectedClass.lights_working ? '✅' : '❌'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full md:w-1/2 mt-4 md:mt-0">
                  <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <AccessTime />
                    </div>
                    <div className="text-sm md:text-lg">
                      <span className="font-semibold">Open Time: </span>
                      {selectedClass.open_time}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <AccessTimeFilled />
                    </div>
                    <div className="text-sm md:text-lg">
                      <span className="font-semibold">Close Time: </span>
                      {selectedClass.close_time}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-lg md:text-xl text-center font-semibold p-2">
                  Time Table
                </div>
                <div className="w-full rounded-md border overflow-x-auto">
                  <div className="h-[300px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="whitespace-nowrap">
                            Subject
                          </TableHead>
                          <TableHead className="whitespace-nowrap">
                            Time
                          </TableHead>
                          <TableHead className="whitespace-nowrap">
                            Faculty
                          </TableHead>
                          <TableHead className="whitespace-nowrap">
                            Year & Class
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedClass.timeTable.map((slot, index) => (
                          <TableRow key={index}>
                            <TableCell className="whitespace-nowrap">
                              {slot.subject}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {slot.timeSt} - {slot.timeEnd}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {slot.facultyIncharge}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {slot.year}, Class: {slot.class}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] text-comp">
          <DialogHeader>
            <DialogTitle className="text-comp">
              Edit Classroom Details
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                name="capacity"
                value={editingClass?.capacity}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="computer_working"
                checked={editingClass?.computer_working}
                onCheckedChange={() => handleSwitchChange('computer_working')}
              />
              <Label htmlFor="computer_working">Computer Working</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="projector_working"
                checked={editingClass?.projector_working}
                onCheckedChange={() => handleSwitchChange('projector_working')}
              />
              <Label htmlFor="projector_working">Projector Working</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="air_conditioner_working"
                checked={editingClass?.air_conditioner_working}
                onCheckedChange={() =>
                  handleSwitchChange('air_conditioner_working')
                }
              />
              <Label htmlFor="air_conditioner_working">
                Air Conditioner Working
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="fans_working"
                checked={editingClass?.fans_working}
                onCheckedChange={() => handleSwitchChange('fans_working')}
              />
              <Label htmlFor="fans_working">Fans Working</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="lights_working"
                checked={editingClass?.lights_working}
                onCheckedChange={() => handleSwitchChange('lights_working')}
              />
              <Label htmlFor="lights_working">Lights Working</Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="open_time" className="text-right">
                Open Time
              </Label>
              <Input
                id="open_time"
                name="open_time"
                value={editingClass?.open_time}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="close_time" className="text-right">
                Close Time
              </Label>
              <Input
                id="close_time"
                name="close_time"
                value={editingClass?.close_time}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <Button className="bg-comp" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isTimetableDialogOpen}
        onOpenChange={setIsTimetableDialogOpen}
      >
        <DialogContent className="w-full max-w-[95vw] md:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-comp">Edit Timetable</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Subject</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Time Start
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Time End</TableHead>
                  <TableHead className="whitespace-nowrap">Faculty</TableHead>
                  <TableHead className="whitespace-nowrap">Year</TableHead>
                  <TableHead className="whitespace-nowrap">Class</TableHead>
                  <TableHead className="whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editingTimetable.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={entry.subject}
                        onChange={(e) =>
                          handleTimetableEntryChange(
                            index,
                            'subject',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.timeSt}
                        onChange={(e) =>
                          handleTimetableEntryChange(
                            index,
                            'timeSt',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.timeEnd}
                        onChange={(e) =>
                          handleTimetableEntryChange(
                            index,
                            'timeEnd',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.facultyIncharge}
                        onChange={(e) =>
                          handleTimetableEntryChange(
                            index,
                            'facultyIncharge',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.year}
                        onChange={(e) =>
                          handleTimetableEntryChange(
                            index,
                            'year',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.class}
                        onChange={(e) =>
                          handleTimetableEntryChange(
                            index,
                            'class',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleRemoveTimetableEntry(index)}
                        variant="destructive"
                      >
                        <Delete className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="space-y-2 text-comp">
              <h3 className="font-semibold">Add New Entry</h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                <Input
                  placeholder="Subject"
                  value={newTimetableEntry.subject}
                  onChange={(e) =>
                    handleNewTimetableEntryChange('subject', e.target.value)
                  }
                />
                <Input
                  placeholder="Time Start"
                  value={newTimetableEntry.timeSt}
                  onChange={(e) =>
                    handleNewTimetableEntryChange('timeSt', e.target.value)
                  }
                />
                <Input
                  placeholder="Time End"
                  value={newTimetableEntry.timeEnd}
                  onChange={(e) =>
                    handleNewTimetableEntryChange('timeEnd', e.target.value)
                  }
                />
                <Input
                  placeholder="Faculty"
                  value={newTimetableEntry.facultyIncharge}
                  onChange={(e) =>
                    handleNewTimetableEntryChange(
                      'facultyIncharge',
                      e.target.value,
                    )
                  }
                />
                <Input
                  placeholder="Year"
                  value={newTimetableEntry.year}
                  onChange={(e) =>
                    handleNewTimetableEntryChange('year', e.target.value)
                  }
                />
                <Input
                  placeholder="Class"
                  value={newTimetableEntry.class}
                  onChange={(e) =>
                    handleNewTimetableEntryChange('class', e.target.value)
                  }
                />
              </div>
              <Button
                onClick={handleAddTimetableEntry}
                className="w-full bg-comp md:w-auto"
              >
                <Add className="mr-2 h-4 w-4" /> Add Entry
              </Button>
            </div>
          </div>
          <Button className="bg-comp" onClick={handleSaveTimetable}>
            Save Timetable
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
