'use client'

import Hero from '@/components/Hero'
import Timeline from '@/components/Timeline'
import DayEntry from '@/components/DayEntry'
import travelData from '@/data/travelLog.json'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Define color stops for each day
  const colorStops = [
    '#fef3c7', // Day 1 - Amber/Yellow
    '#dbeafe', // Day 2 - Blue
    '#f3e8ff', // Day 3 - Purple
    '#d1fae5', // Day 4 - Emerald
    '#fee2e2', // Day 5 - Red/Rose
  ]

  // Create smooth color transitions
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [colorStops[0], colorStops[0], colorStops[1], colorStops[2], colorStops[3], colorStops[4]]
  )

  return (
    <main className="relative">
      <Hero meta={travelData.meta} />
      
      <motion.div 
        ref={containerRef}
        style={{ backgroundColor }}
        className="relative transition-colors duration-1000"
      >
        <Timeline days={travelData.days} />
        {travelData.days.map((day, index) => (
          <DayEntry key={day.id} day={day} index={index} />
        ))}
      </motion.div>
      
      {/* Enhanced Footer with visual flair */}
      <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-sand-100 py-32 px-8 overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.15),transparent_50%)]"
            style={{ backgroundSize: '200% 200%' }}
          />
        </div>
        
        {/* Floating orbs */}
        <motion.div
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            opacity: [0.04, 0.09, 0.04],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-yellow-500 rounded-full blur-3xl"
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Decorative top element */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <motion.div
              animate={{ scaleX: [0, 1], opacity: [0, 1] }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-amber-600"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 shadow-lg shadow-amber-500/50"
            />
            <motion.div
              animate={{ scaleX: [0, 1], opacity: [0, 1] }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-px w-24 bg-gradient-to-l from-transparent via-amber-500 to-amber-600"
            />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-5xl mb-8 text-balance leading-tight"
          >
            The journey ends, but the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">pankration</span> continues.
          </motion.p>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-sand-400 to-transparent mx-auto mb-8"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm text-sand-300 opacity-75 mb-12 tracking-[0.2em] uppercase font-semibold"
          >
            {travelData.meta.year} — A time-traveling tale
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link 
              href="/works-cited"
              className="group inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 rounded-full border-2 border-sand-300/50 hover:border-amber-400 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 text-sm uppercase tracking-[0.25em] font-semibold text-sand-300 group-hover:text-amber-300 transition-colors">
                  Works Cited
                </span>
                {/* Hover background effect */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 origin-left"
                />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}
