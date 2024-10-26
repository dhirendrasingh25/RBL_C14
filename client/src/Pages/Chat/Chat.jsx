import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send } from 'lucide-react'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const scrollAreaRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (message.trim()) {
      const newMessage = {
        sender: 'current_user@example.com',
        message: message.trim(),
        timestamp: new Date(),
        avatar: '/currentUserAvatar.png',
      }
      setMessages([...messages, newMessage])
      setMessage('')
      scrollToBottom()
    }
  }

  return (
    <div className="flex flex-col bg-gray-100">
      <main className="">
        <Card className="h-full flex text-comp flex-col">
          <CardHeader className="border-b">
            <CardTitle>Brodcast Instructions</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <ScrollArea
              className="h-[calc(100vh-300px)] p-4"
              ref={scrollAreaRef}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start mb-4 ${msg?.sender === 'current_user@example.com' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg?.sender !== 'current_user@example.com' && (
                    <img
                      height={40}
                      width={40}
                      src={msg?.avatar}
                      alt={msg?.sender}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  )}
                  <div
                    className={`p-3 rounded-lg max-w-[70%] ${msg?.sender === 'current_user@example.com' ? 'bg-green-500 text-white' : 'bg-zinc-100'}`}
                  >
                    {msg?.sender !== 'current_user@example.com' && (
                      <p className="font-semibold text-sm mb-1">
                        {msg?.sender}
                      </p>
                    )}
                    <p className="text-sm">{msg?.message}</p>
                    <p className="text-xs text-right mt-1 opacity-70">
                      {new Date(msg?.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {msg?.sender === 'current_user@example.com' && (
                    <img
                      height={40}
                      width={40}
                      src={msg?.avatar}
                      alt={msg?.sender}
                      className="w-10 h-10 rounded-full ml-3"
                    />
                  )}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form
              onSubmit={handleSubmit}
              className="w-full flex space-x-2 items-center"
            >
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button type="submit" className="bg-comp" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
