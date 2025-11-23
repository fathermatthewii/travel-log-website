'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

interface HeroProps {
  meta: {
    title: string
    subtitle: string
    author: string
    dateRange: string
    year: string
    theme: string
  }
}

// Floating particle component for visual magic
const FloatingParticle = ({ delay = 0, duration = 20, size = 4 }: { delay?: number; duration?: number; size?: number }) => {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  
  return (
    <motion.div
      initial={{ opacity: 0, x: `${randomX}vw`, y: `${randomY}vh` }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [`${randomY}vh`, `${randomY - 50}vh`, `${randomY - 100}vh`],
        x: [`${randomX}vw`, `${randomX + 10}vw`, `${randomX - 5}vw`],
        scale: [0, 1, 0.5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 shadow-lg shadow-amber-500/50"
      style={{ width: size, height: size }}
    />
  )
}

export default function Hero({ meta }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98])
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 5])
  
  // Transition from white/sand to Day 1 amber/yellow - more gradual
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['rgb(254, 249, 240)', 'rgb(254, 246, 220)', 'rgb(254, 245, 210)', 'rgb(254, 243, 199)'] // sand-50 → amber-100
  )

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-8 py-24 overflow-hidden"
    >
      {/* Dynamic gradient background with mesh effect */}
      <motion.div
        style={{ backgroundColor }}
        className="absolute inset-0 -z-10"
      />
      
      {/* Animated gradient mesh overlay */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-amber-200/40 via-transparent to-yellow-200/40"
          style={{
            backgroundSize: '400% 400%',
          }}
        />
      </div>
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <FloatingParticle 
          key={i} 
          delay={i * 1.5} 
          duration={15 + Math.random() * 10}
          size={2 + Math.random() * 4}
        />
      ))}
      
      <motion.div 
        style={{ 
          opacity, 
          scale, 
          y,
          rotateX,
          x: mousePosition.x * 10,
        }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* Decorative top accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, type: 'spring' }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.05em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 font-sans font-semibold"
          >
            {meta.dateRange} • {meta.year}
          </motion.span>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3, 
            type: 'spring',
            stiffness: 100
          }}
          className="text-5xl md:text-7xl lg:text-9xl font-serif text-slate-900 mb-8 leading-[0.95] text-balance relative"
        >
          <span className="relative inline-block">
            {meta.title}
            {/* Subtle glow effect behind text */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 blur-2xl bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 -z-10"
            />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="relative max-w-3xl mx-auto mb-6"
        >
          <p className="text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 font-light text-balance leading-relaxed">
            {meta.subtitle}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-base md:text-lg text-slate-600 italic max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {meta.theme}
        </motion.p>

        {/* Enhanced decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-16 px-8">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            className="h-px bg-gradient-to-r from-transparent via-amber-400 to-amber-600 flex-1 max-w-xs origin-right"
          />
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 1, type: 'spring' }}
            className="w-2 h-2 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 shadow-lg shadow-amber-500/50"
          />
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            className="h-px bg-gradient-to-l from-transparent via-amber-400 to-amber-600 flex-1 max-w-xs origin-left"
          />
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            type: 'spring',
            stiffness: 200
          }}
          whileHover={{ 
            scale: 1.15, 
            y: -8,
          }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            const dayOne = document.getElementById('day-1')
            if (dayOne) {
              dayOne.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }}
          className="group relative px-10 py-5 cursor-pointer mx-auto"
        >
          {/* Animated border ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-[2px]"
          >
            <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-sand-50 to-amber-50 group-hover:from-amber-50 group-hover:to-yellow-100 transition-colors duration-300" />
          </motion.div>
          
          {/* Content */}
          <div className="relative flex flex-col items-center gap-2">
            <span className="text-sm uppercase tracking-[0.25em] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800 group-hover:from-amber-600 group-hover:via-yellow-600 group-hover:to-orange-600 transition-all">
              Begin Journey
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut'
              }}
            >
              <ChevronDown className="w-5 h-5 text-amber-600 group-hover:text-orange-600 transition-colors" />
            </motion.div>
          </div>
          
          {/* Pulsing glow effect */}
          <motion.div
            animate={{ 
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-yellow-400/30 to-orange-400/30 rounded-full blur-2xl -z-10 group-hover:blur-3xl"
          />
          
          {/* Shimmer effect on hover */}
          <motion.div
            initial={{ x: '-200%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
          />
        </motion.button>
      </motion.div>

      {/* Enhanced ambient light orbs with parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-amber-300 via-yellow-200 to-orange-300 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 10, delay: 1, repeat: Infinity }}
        style={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
        }}
        className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-gradient-to-br from-yellow-200 via-amber-200 to-sand-300 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.25, 0.1],
          scale: [0.8, 1, 0.8],
        }}
        transition={{ duration: 12, delay: 2, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-amber-200 via-transparent to-yellow-200 rounded-full blur-3xl pointer-events-none"
      />

      {/* Enhanced texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
      </div>
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-soft-light">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }} />
      </div>
    </section>
  )
}
