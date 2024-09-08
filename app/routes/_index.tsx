import type { MetaFunction } from '@remix-run/node'
import { useState, useEffect } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'India vs USA Timezone' },
    {
      name: 'description',
      content: 'Difference between India & USA Timezone!',
    },
  ]
}

interface TimeOptions extends Intl.DateTimeFormatOptions {
  timeZone: string
}

export default function Index() {
  const [indiaTime, setIndiaTime] = useState<string>('')
  const [americaTime, setAmericaTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      // India time (IST)
      const indiaOptions: TimeOptions = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      }
      setIndiaTime(now.toLocaleString('en-US', indiaOptions))

      // America time (EST)
      const americaOptions: TimeOptions = {
        timeZone: 'America/Denver',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      }
      setAmericaTime(now.toLocaleString('en-US', americaOptions))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-8">World Clock</h1>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">India (IST)</h2>
        <p className="text-xl text-gray-300">{indiaTime}</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">America (EST)</h2>
        <p className="text-xl text-gray-300">{americaTime}</p>
      </div>
    </div>
  )
}
