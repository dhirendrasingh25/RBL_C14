import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LifeBuoy, LogOut, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FaComputer } from 'react-icons/fa6'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import DashboardIcon from '@mui/icons-material/Dashboard'
import COMP_LOGO from '@/assets/COMP_LOGO.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import GroupIcon from '@mui/icons-material/Group'
import ChatIcon from '@mui/icons-material/Chat'
import ComputerIcon from '@mui/icons-material/Computer'
import EventIcon from '@mui/icons-material/Event'
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import { useSelector } from 'react-redux'
const SideBarOptions = [
  { name: 'DashBoard', icon: <StackedBarChartIcon />, link: '/dashboard' },
  { name: 'Labs', icon: <ComputerIcon />, link: '/labs' },
  { name: 'Classrooms', icon: <MeetingRoomIcon />, link: '/classrooms' },
  { name: 'Events', icon: <EventIcon />, link: '/events' },
  { name: 'Lab Incharges', icon: <Person />, link: '/lab-incharges' },
  { name: 'Messages', icon: <ChatIcon />,link:"/messages" },
  
  // {name:"GroupChat",icon:<QuestionAnswerIcon />,link:"/group-chat"},

  // {name:"Google Map",icon:<AddLocationAltIcon />,link:"/maps"},
  // {name:"Quiz",icon:<QuizIcon  />,link:"/quiz"}
]
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/Redux/Reducers/authSlice'
import { useGetFriendsListQuery } from '@/RTK/api'
import { Person } from '@mui/icons-material'

const SideBar = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const { user } = useSelector((state) => state.auth)
  // console.log(user?.friends);

  // console.log(friendsData?.friendNames);

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div className="">
      <nav className="sticky z-50 top-0 bg-comp  w-full border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center  justify-start rtl:justify-end">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              <img
                src={COMP_LOGO}
                className="h-12 w-full me-3"
                alt="FlowBite Logo"
              />
            </div>
            <div className="flex items-center">
              <div className="flex items-center text-[#640D14] ms-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <AccountCircleIcon />
                      <p className="px-2"> {user?.name || 'Profile'}</p>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-2">
                    <DropdownMenuLabel className="text-[#640D14]">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4 text-[#640D14]" />
                        <span className="text-[#640D14]">Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4 text-[#640D14]" />
                        <span className="text-[#640D14]">Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuItem>
                      <LifeBuoy className="mr-2 h-4 w-4 text-[#640D14]" />
                      <span className="text-[#640D14] ">Support</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4 text-[#640D14]" />
                      <button onClick={handleLogout} className="text-[#640D14]">
                        Log out
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col justify-between bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {SideBarOptions.map((option, index) => (
              <li key={index}>
                {
                  <Link to={option.link}>
                    <div
                      className={`flex items-center p-2 text-[#640D14] rounded-lg text-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${location.pathname === option.link ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                    >
                      {option.icon}
                      <span className="ms-3">{option.name}</span>
                    </div>
                  </Link>
                }
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className=" h-full p-4 sm:ml-64">{children}</div>
    </div>
  )
}

export default SideBar
