import React, { useState } from 'react'
import COMP_HEADER from '../../assets/COMP_HEADER.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const credentials = {
      username,
      password,
    }
    console.log(credentials)

    // try {
    //   const response = await fetch('/api/authenticate', { // Replace with your actual backend API endpoint
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(credentials),
    //   });

    //   if (response.ok) {
    //     // Handle successful authentication, maybe redirect or show a message
    //     console.log("Authentication successful");
    //   } else {
    //     // Handle failed authentication, maybe show an error message
    //     console.log("Authentication failed");
    //   }
    // } catch (error) {
    //   console.error("Error during authentication:", error);
    // }

    navigate('/dashboard')
  }

  return (
    <div className="h-full">
      <AuroraBackground>
        <div className="flex items-start justify-center mt-10 ">
          <img src={COMP_HEADER} alt="COMP_HEADER" className="" />
        </div>
        <div className="flex z-50 items-center h-full w-full justify-center">
          <Card className="">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                {' '}
                Welcome to Resource Allocation System!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Username
                  </label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Authenticate
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </AuroraBackground>
    </div>
  )
}

export default Landing
