'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin } from 'lucide-react'
import PhotoGrid from './PhotoGrid'

interface DayData {
  id: string
  day: number
  location: string
  landmark: string
  mood: string
  title: string
  excerpt: string
  narrative: string
  keyMoments: string[]
  pullQuote: string
  sensoryDetails: {
    smell?: string
    sight?: string
    sound?: string
    taste?: string
    feeling?: string
  }
  images: Array<{
    alt: string
    aspectRatio: string
  }>
}

interface DayEntryProps {
  day: DayData
  index: number
}

export default function DayEntry({ day, index }: DayEntryProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const isEven = index % 2 === 0

  // Contextual color themes for each day
  const getThemeColors = (dayNum: number) => {
    const themes = {
      1: { // Acropolis - Golden & Marble
        gradient: 'from-amber-50 via-yellow-50 to-sand-50',
        accent: 'from-amber-400 via-yellow-500 to-amber-600',
        text: 'text-amber-700',
        glow: 'shadow-amber-200/50'
      },
      2: { // Agora - Democratic Blues & Earth
        gradient: 'from-blue-50 via-slate-50 to-stone-50',
        accent: 'from-blue-500 via-indigo-500 to-slate-600',
        text: 'text-blue-700',
        glow: 'shadow-blue-200/50'
      },
      3: { // Theatre - Dramatic Purples & Wine
        gradient: 'from-purple-50 via-violet-50 to-fuchsia-50',
        accent: 'from-purple-500 via-violet-600 to-fuchsia-600',
        text: 'text-purple-700',
        glow: 'shadow-purple-200/50'
      },
      4: { // Delphi Oracle - Mystical Greens & Smoke
        gradient: 'from-emerald-50 via-teal-50 to-cyan-50',
        accent: 'from-emerald-500 via-teal-600 to-cyan-600',
        text: 'text-emerald-700',
        glow: 'shadow-emerald-200/50'
      },
      5: { // Olympics - Victory Reds & Bronze
        gradient: 'from-orange-50 via-red-50 to-rose-50',
        accent: 'from-orange-500 via-red-600 to-rose-600',
        text: 'text-red-700',
        glow: 'shadow-red-200/50'
      }
    }
    return themes[dayNum as keyof typeof themes] || themes[1]
  }

  const theme = getThemeColors(day.day)

  return (
    <article
      id={day.id}
      ref={ref}
      className="relative px-8 py-24 overflow-hidden"
    >
      {/* Enhanced animated accent orbs with pulsing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { 
          opacity: [0.15, 0.25, 0.15], 
          scale: [0.95, 1.05, 0.95] 
        } : {}}
        transition={{ 
          opacity: { duration: 4, repeat: Infinity },
          scale: { duration: 6, repeat: Infinity },
          delay: 0.3 
        }}
        className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${theme.accent} rounded-full blur-3xl pointer-events-none`}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { 
          opacity: [0.1, 0.2, 0.1], 
          scale: [1, 0.9, 1] 
        } : {}}
        transition={{ 
          opacity: { duration: 5, repeat: Infinity },
          scale: { duration: 7, repeat: Infinity },
          delay: 0.5 
        }}
        className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br ${theme.accent} rounded-full blur-3xl pointer-events-none`}
      />
      {/* Additional ambient orb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { 
          opacity: [0.05, 0.15, 0.05],
          scale: [0.8, 1.2, 0.8],
        } : {}}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br ${theme.accent} rounded-full blur-3xl pointer-events-none`}
      />
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${
          isEven ? '' : 'lg:flex-row-reverse'
        }`}>
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${isEven ? '' : 'lg:order-2'}`}
          >
            {/* Day Header with enhanced styling */}
            <div className="mb-8 relative">
              {/* Animated side accent bar with glow */}
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.1, type: 'spring' }}
                className={`absolute -left-8 top-0 bottom-0 w-1.5 bg-gradient-to-b ${theme.accent} to-transparent origin-top rounded-full ${theme.glow} shadow-2xl`}
              />
              
              {/* Day number badge */}
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
                className="inline-block mb-4"
              >
                <div className={`relative px-5 py-2 rounded-full border-2 border-current ${theme.text} overflow-hidden`}>
                  <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-bold">
                    Day {day.day}
                  </span>
                  {/* Subtle gradient background */}
                  <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className={`absolute inset-0 bg-gradient-to-r ${theme.accent} opacity-10`}
                  />
                </div>
              </motion.div>
              
              {/* Title with text glow */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 mb-6 leading-tight relative"
              >
                <span className="relative inline-block">
                  {day.title}
                  {/* Subtle text glow */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: [0.1, 0.2, 0.1] } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                    className={`absolute inset-0 blur-xl bg-gradient-to-r ${theme.accent} -z-10`}
                  />
                </span>
              </motion.h2>
              
              {/* Location with icon */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`flex items-center gap-2 mb-6 ${theme.text} group`}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 12 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <MapPin className="w-5 h-5" />
                </motion.div>
                <span className="text-sm font-sans tracking-wide font-medium">{day.landmark}</span>
              </motion.div>
              
              {/* Excerpt with gradient text */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light"
              >
                {day.excerpt}
              </motion.p>
            </div>
          </motion.div>

          {/* Image Gallery Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${isEven ? '' : 'lg:order-1'}`}
          >
            <PhotoGrid images={day.images} dayNumber={day.day} />
          </motion.div>
        </div>

        {/* Full Narrative - Expandable with enhanced styling */}
        <motion.details
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 max-w-4xl mx-auto group relative"
        >
          {/* Decorative elements around the button */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <motion.div
              animate={{ scaleX: [0, 1, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className={`h-px w-12 bg-gradient-to-r ${theme.accent}`}
            />
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className={`w-2 h-2 rounded-full bg-gradient-to-br ${theme.accent}`}
            />
            <motion.div
              animate={{ scaleX: [0, 1, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 1 }}
              className={`h-px w-12 bg-gradient-to-l ${theme.accent}`}
            />
          </div>
          
          <summary className={`cursor-pointer text-center text-sm uppercase tracking-[0.2em] ${theme.text} hover:text-slate-900 transition-all py-8 border-t-2 border-b-2 border-slate-200 hover:border-current relative group`}>
            <span className="relative inline-block font-semibold">
              Read Full Entry
              {/* Animated underline */}
              <motion.span
                className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r ${theme.accent} opacity-0 group-hover:opacity-100`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, type: 'spring' }}
              />
              {/* Glow effect */}
              <motion.span
                className={`absolute inset-0 blur-lg bg-gradient-to-r ${theme.accent} opacity-0 group-hover:opacity-20 -z-10`}
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </span>
          </summary>
          <div className="prose-editorial mt-12 space-y-6">
            {day.narrative.split('\n\n').map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-slate-700 leading-relaxed text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.details>
      </div>
    </article>
  )
}
