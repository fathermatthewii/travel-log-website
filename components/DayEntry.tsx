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

  return (
    <article
      id={day.id}
      ref={ref}
      className={`relative px-8 py-24 ${
        isEven ? 'bg-sand-50' : 'bg-white'
      }`}
    >
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
            {/* Day Header */}
            <div className="mb-8 relative">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-sage-400 to-transparent origin-top"
              />
              <span className="inline-block text-xs uppercase tracking-widest text-sage-600 mb-3">
                Day {day.day}
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 mb-4 leading-tight">
                {day.title}
              </h2>
              
              <div className="flex items-center gap-2 text-slate-600 mb-6">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-sans">{day.landmark}</span>
              </div>
              
              <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                {day.excerpt}
              </p>
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

        {/* Full Narrative - Expandable */}
        <motion.details
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 max-w-4xl mx-auto group"
        >
          <summary className="cursor-pointer text-center text-sm uppercase tracking-widest text-sage-600 hover:text-sage-900 transition-all py-6 border-t border-b border-sand-300 hover:border-sage-400 relative">
            <span className="relative inline-block">
              Read Full Entry
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-px bg-sage-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
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
