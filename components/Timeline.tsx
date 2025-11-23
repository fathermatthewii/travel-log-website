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
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-white/95 backdrop-blur-2xl border border-slate-200/60 rounded-full shadow-2xl hover:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 px-6 py-4"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/30 via-transparent to-yellow-50/30 rounded-full pointer-events-none" />
          
          {/* Animated shimmer effect */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full pointer-events-none"
          />
          
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide relative">
            {days.map((day, index) => (
              <motion.button
                key={day.id}
                onClick={() => scrollToDay(day.id)}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.93 }}
                className={`relative flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDay === index
                    ? 'text-slate-900'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-gradient-to-br hover:from-sand-100/70 hover:to-amber-100/50'
                }`}
              >
                <div className="flex flex-col items-center gap-1 relative z-10">
                  <span className="text-xs font-sans uppercase tracking-wider font-semibold">
                    Day {day.day}
                  </span>
                  <span className="text-sm font-serif hidden md:block">
                    {day.landmark}
                  </span>
                </div>
                
                {activeDay === index && (
                  <>
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-br from-amber-200 via-yellow-100 to-sand-200 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-r from-amber-300/30 via-yellow-300/30 to-amber-300/30 rounded-full blur-md -z-20"
                    />
                  </>
                )}
              </motion.button>
            ))}
            
            {/* Works Cited Link with special styling */}
            <Link href="/works-cited">
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.93 }}
                className="flex-shrink-0 px-4 py-2 rounded-full text-slate-500 hover:text-amber-700 hover:bg-gradient-to-br hover:from-amber-100/70 hover:to-yellow-100/50 transition-all duration-300 cursor-pointer relative group"
              >
                <div className="flex flex-col items-center gap-1 relative z-10">
                  <span className="text-xs font-sans uppercase tracking-wider font-semibold">
                    Sources
                  </span>
                </div>
                {/* Hover glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-amber-300/20 via-yellow-300/20 to-amber-300/20 rounded-full blur-md -z-10"
                />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}
