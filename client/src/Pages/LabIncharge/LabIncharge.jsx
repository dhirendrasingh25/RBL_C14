import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, X, Plus, Minus } from 'lucide-react'

const LabsEnum = {
  LAB_304: '304',
  LAB_305: '305',
  LAB_306: '306',
  LAB_307: '307',
  LAB_324: '324',
  LAB_325: '325',
  LAB_326: '326',
}
import { labInchargeList as list } from '@/lib/data'

export default function LabIncharge() {
  const [labInchargeList, setLabInchargeList] = useState(list)
  const [editingIndex, setEditingIndex] = useState(null)
  const [editedIncharge, setEditedIncharge] = useState(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newIncharge, setNewIncharge] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    allotedLabs: [],
    photo: '/placeholder.svg?height=40&width=40'
  })

  const handleEdit = (index) => {
    setEditingIndex(index)
    setEditedIncharge({ ...labInchargeList[index] })
  }

  const handleSave = () => {
    if (editingIndex !== null && editedIncharge) {
      const updatedList = [...labInchargeList]
      updatedList[editingIndex] = editedIncharge
      setLabInchargeList(updatedList)
      setEditingIndex(null)
      setEditedIncharge(null)
    }
  }

  const handleCancel = () => {
    setEditingIndex(null)
    setEditedIncharge(null)
  }

  const handleChange = (e) => {
    if (editedIncharge) {
      setEditedIncharge({
        ...editedIncharge,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleLabAdd = (lab) => {
    if (editedIncharge && !editedIncharge.allotedLabs.includes(lab)) {
      setEditedIncharge({
        ...editedIncharge,
        allotedLabs: [...editedIncharge.allotedLabs, lab],
      })
    }
  }

  const handleLabRemove = (lab) => {
    if (editedIncharge) {
      setEditedIncharge({
        ...editedIncharge,
        allotedLabs: editedIncharge.allotedLabs.filter(l => l !== lab),
      })
    }
  }

  const handleNewInchargeChange = (e) => {
    setNewIncharge({
      ...newIncharge,
      [e.target.name]: e.target.value,
    })
  }

  const handleNewInchargeLabAdd = (lab) => {
    if (!newIncharge.allotedLabs.includes(lab)) {
      setNewIncharge({
        ...newIncharge,
        allotedLabs: [...newIncharge.allotedLabs, lab],
      })
    }
  }

  const handleNewInchargeLabRemove = (lab) => {
    setNewIncharge({
      ...newIncharge,
      allotedLabs: newIncharge.allotedLabs.filter(l => l !== lab),
    })
  }

  const handleAddNewIncharge = () => {
    setLabInchargeList([...labInchargeList, newIncharge])
    setNewIncharge({
      name: '',
      email: '',
      phone: '',
      designation: '',
      allotedLabs: [],
      photo: '/placeholder.svg?height=40&width=40'
    })
    setIsAddingNew(false)
  }

  return (
    <div className="container mx-auto p-4 text-comp">
        <div className='flex w-full flex-row justify-between'>
        <div className="text-3xl font-bold mb-6">Lab Incharges</div>
      <Dialog  open={isAddingNew} onOpenChange={setIsAddingNew}>
        <DialogTrigger asChild>
          <Button className="mb-6 bg-comp">
            <Plus className="mr-2 h-4 w-4" /> Add Lab Assistant
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-comp">
          <DialogHeader>
            <DialogTitle>Add New Lab Assistant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-name">Name</Label>
              <Input
                id="new-name"
                name="name"
                value={newIncharge.name}
                onChange={handleNewInchargeChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-email">Email</Label>
              <Input
                id="new-email"
                name="email"
                type="email"
                value={newIncharge.email}
                onChange={handleNewInchargeChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-phone">Phone</Label>
              <Input
                id="new-phone"
                name="phone"
                value={newIncharge.phone}
                onChange={handleNewInchargeChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-designation">Designation</Label>
              <Input
                id="new-designation"
                name="designation"
                value={newIncharge.designation}
                onChange={handleNewInchargeChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Alloted Labs</Label>
              <div className="flex flex-wrap gap-2">
                {newIncharge.allotedLabs.map((lab) => (
                  <Badge key={lab} variant="secondary">
                    {lab}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1"
                      onClick={() => handleNewInchargeLabRemove(lab)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <Select onValueChange={handleNewInchargeLabAdd}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Add Lab" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(LabsEnum).map((lab) => (
                    <SelectItem key={lab} value={lab}>
                      {lab}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddNewIncharge} className="w-full bg-comp">Add Lab Assistant</Button>
          </div>
        </DialogContent>
      </Dialog>

        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labInchargeList.map((incharge, index) => (
          <Card key={index} className="w-full text-comp border-comp">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={incharge.photo} alt={incharge.name} />
                  <AvatarFallback>{incharge.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-bold">{incharge.name}</CardTitle>
              </div>
              {editingIndex === index ? (
                <Button variant="ghost" size="icon" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => handleEdit(index)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {editingIndex === index && editedIncharge ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={editedIncharge.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={editedIncharge.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={editedIncharge.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      name="designation"
                      value={editedIncharge.designation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Alloted Labs</Label>
                    <div className="flex flex-wrap gap-2">
                      {editedIncharge.allotedLabs.map((lab) => (
                        <Badge key={lab} variant="secondary">
                          {lab}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 ml-1"
                            onClick={() => handleLabRemove(lab)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <Select onValueChange={handleLabAdd}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Add Lab" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(LabsEnum).map((lab) => (
                          <SelectItem key={lab} value={lab}>
                            {lab}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSave} className="w-full">Save</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Email:</p>
                    <p className="text-sm text-muted-foreground">{incharge.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone:</p>
                    <p className="text-sm text-muted-foreground">{incharge.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Designation:</p>
                    <p className="text-sm text-muted-foreground">{incharge.designation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Alloted Labs:</p>
                    <div className="flex flex-wrap gap-2">
                      {incharge.allotedLabs.map((lab, labIndex) => (
                        <Badge key={labIndex} variant="secondary">{lab}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}