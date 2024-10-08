import React, { useState } from 'react'
import { classList } from '@/lib/data'
import { motion } from 'framer-motion'
import {
  AccessTime,
  AccessTimeFilled,
  ComputerOutlined,
  PeopleAltOutlined,
  Person,
} from '@mui/icons-material'
import LiveTvIcon from '@mui/icons-material/LiveTv' // Projector icon
import { FaFan } from 'react-icons/fa' // Fan icon
import { TbAirConditioning } from 'react-icons/tb' // Air Conditioning icon

export default function Classroom() {
  const [selectedClass, setSelectedClass] = useState(null)

  return (
    <div className="h-full w-full text-comp">
      <div className="text-2xl text-center font-bold p-2">
        Computer Department Classrooms
      </div>
      <div className="w-full rounded-md border flex overflow-y-auto">
        <div className="w-full overflow-x-scroll p-4 flex flex-row justify-around">
          {classList.map((classroom, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-md w-full text-sm font-medium transition-colors mr-2 ${
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
        >
          <div className="p-6 h-full border mt-4 bg-white shadow-md rounded-md">
            <div className="pb-4">
              <h2 className="text-2xl text-center font-semibold">
                {selectedClass.name} Class Details
              </h2>
            </div>
            <div className="h-full p-4 border rounded-md">
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-full">
                  {/* Capacity */}
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <PeopleAltOutlined />
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold">Capacity: </span>
                      {selectedClass.capacity}
                    </div>
                  </div>

                  {/* Computer Working */}
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <ComputerOutlined />
                    </div>
                    <div className="text-lg font-semibold">
                      Computer Working:&nbsp;
                      {selectedClass.computer_working ? '✅' : '❌'}
                    </div>
                  </div>

                  {/* Projector Working */}
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <LiveTvIcon />
                    </div>
                    <div className="text-lg font-semibold">
                      Projector Working:&nbsp;
                      {selectedClass.projector_working ? '✅' : '❌'}
                    </div>
                  </div>

                  {/* Air Conditioner Working */}
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-2">
                      <TbAirConditioning />
                    </div>
                    <div className="text-lg font-semibold">
                      Air Conditioner Working:&nbsp;
                      {selectedClass.air_conditioner_working ? '✅' : '❌'}
                    </div>
                  </div>

                  {/* Fans Working */}
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-2">
                      <FaFan />
                    </div>
                    <div className="text-lg font-semibold">
                      Fans Working:&nbsp;
                      {selectedClass.fans_working ? '✅' : '❌'}
                    </div>
                  </div>

                  {/* Lights Working */}
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <AccessTime />
                    </div>
                    <div className="text-lg font-semibold">
                      Lights Working:&nbsp;
                      {selectedClass.lights_working ? '✅' : '❌'}
                    </div>
                  </div>
                </div>

                {/* Open and Close Time */}
                <div className="flex flex-col w-full">
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <AccessTime />
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold">Open Time: </span>
                      {selectedClass.open_time}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="bg-gray-50 mr-2 border rounded-full p-1">
                      <AccessTimeFilled />
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold">Close Time: </span>
                      {selectedClass.close_time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Table */}
              <div>
                <div className="text-xl text-center font-semibold p-2">
                  Time Table
                </div>
                <div className="w-full rounded-md border">
                  <div className="h-[300px] overflow-y-auto">
                    <div className="min-w-full">
                      <div className="bg-gray-100 w-full sticky top-0">
                        <div className="flex border-b items-center justify-around w-full">
                          <div className="p-2 w-full sm:w-1/4 font-semibold">
                            Subject
                          </div>
                          <div className="w-full sm:w-1/4 p-2 font-semibold">
                            Time
                          </div>
                          <div className="w-full sm:w-1/4 p-2 font-semibold">
                            Faculty
                          </div>
                          <div className="w-full sm:w-1/4 p-2 font-semibold">
                            Year & Class
                          </div>
                        </div>
                      </div>
                      <div>
                        {selectedClass.timeTable.map((slot, index) => (
                          <div
                            key={index}
                            className="flex border-b justify-around hover:bg-gray-50"
                          >
                            <div className="w-full sm:w-1/4 p-2">
                              {slot.subject}
                            </div>
                            <div className="w-full sm:w-1/4 p-2 text-sm text-gray-600">
                              {slot.timeSt} - {slot.timeEnd}
                            </div>
                            <div className="w-full sm:w-1/4 p-2 text-sm">
                              {slot.facultyIncharge}
                            </div>
                            <div className="w-full sm:w-1/4 p-2 text-sm">
                              {slot.year}, Class: {slot.class}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
