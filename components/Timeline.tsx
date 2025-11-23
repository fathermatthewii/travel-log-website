'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Day {
  id: string
  day: number
  location: string
  landmark: string
  title: string
}

interface TimelineProps {
  days: Day[]
}

export default function Timeline({ days }: TimelineProps) {
  const [activeDay, setActiveDay] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      days.forEach((day, index) => {
        const element = document.getElementById(day.id)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          const absoluteTop = top + window.scrollY
          const absoluteBottom = bottom + window.scrollY
          
          if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
            setActiveDay(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [days])

  const scrollToDay = (dayId: string) => {
    const element = document.getElementById(dayId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="sticky top-8 z-50 px-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/50 rounded-full shadow-xl hover:shadow-2xl transition-shadow duration-300 px-6 py-4">
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
            {days.map((day, index) => (
              <motion.button
                key={day.id}
                onClick={() => scrollToDay(day.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDay === index
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-sand-100/50'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-sans uppercase tracking-wider">
                    Day {day.day}
                  </span>
                  <span className="text-sm font-serif hidden md:block">
                    {day.landmark}
                  </span>
                </div>
                
                {activeDay === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-sand-200 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            
            {/* Works Cited Link */}
            <Link href="/works-cited">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 px-4 py-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-sage-100/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-sans uppercase tracking-wider">
                    Sources
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
