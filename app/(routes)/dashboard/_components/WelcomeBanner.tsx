import React from 'react'
import { Button } from '@/components/ui/button'
function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-xl p-6 shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-2">
        Welcome to HorizonAI
      </h2>
      <p className="text-lg font-medium">
        HorizonAI is your personalized AI career coach agent. Get tailored career roadmaps, expert advice, and resume scans designed just for you. Take the next step in your career journey with confidence and clarity.
      </p>
      <Button variant={'secondary'} className='mt-3 '>
        Get Started </Button>
    </div>
  )
}

export default WelcomeBanner