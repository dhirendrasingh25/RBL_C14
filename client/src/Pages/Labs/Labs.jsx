'use client'

import React, { useState } from 'react'
import { labList } from '@/lib/data'
import { motion } from 'framer-motion'
import {
  AccessTime,
  AccessTimeFilled,
  ComputerOutlined,
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

export default function Labs() {
  const [labs, setLabs] = useState(labList)
  const [selectedLab, setSelectedLab] = useState(labs[0])
  const [editingLab, setEditingLab] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isTimetableDialogOpen, setIsTimetableDialogOpen] = useState(false)
  const [editingTimetable, setEditingTimetable] = useState([])
  const [newTimetableEntry, setNewTimetableEntry] = useState({
    subject: '',
    timeSt: '',
    timeEnd: '',
    facultyIncharge1: '',
    facultyIncharge2: '',
    year: '',
    class: '',
  })

  const handleEditLab = (lab) => {
    setEditingLab({ ...lab })
    setIsDialogOpen(true)
  }

  const handleEditTimetable = (lab) => {
    setEditingTimetable([...lab.timeTable])
    setIsTimetableDialogOpen(true)
  }

  const handleSaveEdit = () => {
    setLabs(
      labs.map((lab) => (lab.name === editingLab.name ? editingLab : lab)),
    )
    setSelectedLab(editingLab)
    setIsDialogOpen(false)
  }

  const handleSaveTimetable = () => {
    const updatedLab = { ...selectedLab, timeTable: editingTimetable }
    setLabs(
      labs.map((lab) => (lab.name === selectedLab.name ? updatedLab : lab)),
    )
    setSelectedLab(updatedLab)
    setIsTimetableDialogOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditingLab((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name) => {
    setEditingLab((prev) => ({ ...prev, [name]: !prev[name] }))
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
      facultyIncharge1: '',
      facultyIncharge2: '',
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
        Computer Department Labs
      </div>
      <div className="w-full rounded-md border flex overflow-x-auto">
        <div className="w-full p-2 md:p-4 flex flex-row justify-start md:justify-around">
          {labs.map((lab, index) => (
            <motion.button
              key={index}
              className={`px-2 md:px-4 py-1 md:py-2 rounded-md w-full text-xs md:text-sm font-medium transition-colors mr-1 md:mr-2 ${
                selectedLab === lab
                  ? 'bg-comp text-white'
                  : 'bg-secondary text-secondary-foreground text-comp hover:bg-secondary/80'
              }`}
              onClick={() => setSelectedLab(lab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lab.name}
            </motion.button>
          ))}
        </div>
      </div>

      {selectedLab && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4"
        >
          <div className="p-4 md:p-6 h-full border bg-white shadow-md rounded-md">
            <div className="pb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-0">
                {selectedLab.name} Lab Details
              </h2>
              <div className="flex flex-col md:flex-row gap-2">
                <Button
                  className="bg-comp w-full md:w-auto"
                  onClick={() => handleEditLab(selectedLab)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit Details
                </Button>
                <Button
                  className="bg-comp w-full md:w-auto"
                  onClick={() => handleEditTimetable(selectedLab)}
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
                      <ComputerOutlined />
                    </div>
                    <div className="text-sm md:text-lg">
                      <span className="font-semibold">Total Computers: </span>
                      {selectedLab.computers}
                    </div>
                  </div>

                  {/* Lab Incharge Details */}
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <Person />
                    </div>
                    <div className="text-sm md:text-lg">
                      <span className="font-semibold">
                        Senior Lab Incharge:{' '}
                      </span>
                      {selectedLab.senior_Lab_Incharge}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <Person />
                    </div>
                    <div className="text-sm md:text-lg">
                      <span className="font-semibold">Jr Lab Incharge: </span>
                      {selectedLab.jr_Lab_Incharge}
                    </div>
                  </div>

                  {/* Status Indicators for lab equipment */}
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <ComputerOutlined />
                    </div>
                    <div className="text-sm md:text-lg">
                      <span className="font-semibold">Working Computers: </span>
                      {selectedLab.no_of_Computers_working}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <LiveTvIcon />
                    </div>
                    <div className="text-sm md:text-lg font-semibold">
                      Projector Working:&nbsp;
                      {selectedLab.projector_working ? '✅' : '❌'}{' '}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-2">
                      <FaFan />
                    </div>
                    <div className="text-sm md:text-lg font-semibold">
                      Fans Working:&nbsp;
                      {selectedLab.fans_working ? '✅' : '❌'}{' '}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-2">
                      <TbAirConditioning />
                    </div>
                    <div className="text-sm md:text-lg font-semibold">
                      Air Conditioner Working:&nbsp;
                      {selectedLab.air_conditioner_working ? '✅' : '❌'}{' '}
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
                      {selectedLab.open_time}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <AccessTimeFilled />
                    </div>
                    <div className="text-sm md:text-lg">
                      <span className="font-semibold">Close Time: </span>
                      {selectedLab.close_time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Table Section */}
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
                        {selectedLab.timeTable.map((slot, index) => (
                          <TableRow key={index}>
                            <TableCell className="whitespace-nowrap">
                              {slot.subject}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {slot.timeSt} - {slot.timeEnd}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {slot.facultyIncharge1}, {slot.facultyIncharge2}
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Lab Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="computers" className="text-right">
                Total Computers
              </Label>
              <Input
                id="computers"
                name="computers"
                value={editingLab?.computers}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="senior_Lab_Incharge" className="text-right">
                Senior Lab Incharge
              </Label>
              <Input
                id="senior_Lab_Incharge"
                name="senior_Lab_Incharge"
                value={editingLab?.senior_Lab_Incharge}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jr_Lab_Incharge" className="text-right">
                Jr Lab Incharge
              </Label>
              <Input
                id="jr_Lab_Incharge"
                name="jr_Lab_Incharge"
                value={editingLab?.jr_Lab_Incharge}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="no_of_Computers_working" className="text-right">
                Working Computers
              </Label>
              <Input
                id="no_of_Computers_working"
                name="no_of_Computers_working"
                value={editingLab?.no_of_Computers_working}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="projector_working"
                checked={editingLab?.projector_working}
                onCheckedChange={() => handleSwitchChange('projector_working')}
              />
              <Label htmlFor="projector_working">Projector Working</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="fans_working"
                checked={editingLab?.fans_working}
                onCheckedChange={() => handleSwitchChange('fans_working')}
              />
              <Label htmlFor="fans_working">Fans Working</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="air_conditioner_working"
                checked={editingLab?.air_conditioner_working}
                onCheckedChange={() =>
                  handleSwitchChange('air_conditioner_working')
                }
              />
              <Label htmlFor="air_conditioner_working">
                Air Conditioner Working
              </Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="open_time" className="text-right">
                Open Time
              </Label>
              <Input
                id="open_time"
                name="open_time"
                value={editingLab?.open_time}
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
                value={editingLab?.close_time}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleSaveEdit}>Save Changes</Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isTimetableDialogOpen}
        onOpenChange={setIsTimetableDialogOpen}
      >
        <DialogContent className="w-full max-w-[95vw] md:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className=" text-comp">Edit Timetable</DialogTitle>
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
                  <TableHead className="whitespace-nowrap">Faculty 1</TableHead>
                  <TableHead className="whitespace-nowrap">Faculty 2</TableHead>
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
                        value={entry.facultyIncharge1}
                        onChange={(e) =>
                          handleTimetableEntryChange(
                            index,
                            'facultyIncharge1',
                            e.target.value,
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.facultyIncharge2}
                        onChange={(e) =>
                          handleTimetableEntryChange(
                            index,
                            'facultyIncharge2',
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
            <div className="space-y-2">
              <h3 className="font-semibold text-comp">Add New Entry</h3>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
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
                  placeholder="Faculty 1"
                  value={newTimetableEntry.facultyIncharge1}
                  onChange={(e) =>
                    handleNewTimetableEntryChange(
                      'facultyIncharge1',
                      e.target.value,
                    )
                  }
                />
                <Input
                  placeholder="Faculty 2"
                  value={newTimetableEntry.facultyIncharge2}
                  onChange={(e) =>
                    handleNewTimetableEntryChange(
                      'facultyIncharge2',
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
