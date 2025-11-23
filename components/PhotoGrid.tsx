'use client'

import { motion } from 'framer-motion'
import { Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageData {
  alt: string
  aspectRatio: string
  src?: string
  credit?: string
  creditUrl?: string
}

interface PhotoGridProps {
  images: ImageData[]
  dayNumber: number
}

const getAspectRatioClass = (ratio: string) => {
  const map: { [key: string]: string } = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '3:4': 'aspect-[3/4]',
    '21:9': 'aspect-[21/9]',
    '4:5': 'aspect-[4/5]',
    '3:2': 'aspect-[3/2]',
  }
  return map[ratio] || 'aspect-video'
}

const getBentoLayout = (count: number, index: number) => {
  // Bento-grid pattern: varied sizes for visual interest
  if (count === 3) {
    if (index === 0) return 'col-span-2 row-span-2' // Large
    if (index === 1) return 'col-span-1 row-span-1' // Small
    if (index === 2) return 'col-span-1 row-span-1' // Small
  }
  
  if (count === 2) {
    if (index === 0) return 'col-span-2 row-span-2' // Large
    if (index === 1) return 'col-span-2 row-span-1' // Wide
  }
  
  if (count === 1) {
    return 'col-span-2 row-span-2'
  }
  
  return 'col-span-1 row-span-1'
}

export default function PhotoGrid({ images, dayNumber }: PhotoGridProps) {
  const handleImageClick = (url: string | undefined) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const getImagePath = (src: string | undefined) => {
    if (!src) return undefined
    const basePath = process.env.NODE_ENV === 'production' ? '/travel-log-website' : ''
    return `${basePath}${src}`
  }

  return (
    <div className="grid grid-cols-2 auto-rows-[180px] gap-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9, y: 30, rotateY: -10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: 'spring',
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.05, 
            y: -8,
            rotateY: 2,
            rotateX: 2,
            zIndex: 10
          }}
          onClick={() => handleImageClick(image.creditUrl)}
          className={`
            relative overflow-hidden rounded-2xl bg-gradient-to-br from-sand-200 via-amber-100 to-yellow-200
            ${getBentoLayout(images.length, index)}
            group cursor-pointer shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500
          `}
          style={{ perspective: '1000px' }}
        >
          {image.src ? (
            <>
              {/* Actual Image */}
              <Image
                src={getImagePath(image.src) || ''}
                alt={image.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Enhanced overlay with gradient and shimmer */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/0 via-slate-900/0 to-slate-900/0 group-hover:from-slate-900/40 group-hover:via-slate-900/15 group-hover:to-transparent transition-all duration-500" />
              
              {/* Shimmer effect on hover */}
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                whileHover={{ x: '100%', opacity: 0.3 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              />
              
              {/* Border glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 rounded-2xl ring-2 ring-amber-400/50 ring-inset"
              />
              
              {/* Image credit with enhanced styling */}
              {image.credit && (
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/70 to-transparent p-3 z-20 backdrop-blur-sm"
                >
                  {image.creditUrl ? (
                    <a 
                      href={image.creditUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] text-white/95 font-sans tracking-wide hover:text-amber-300 transition-colors underline decoration-white/40 hover:decoration-amber-300"
                    >
                      {image.credit}
                    </a>
                  ) : (
                    <p className="text-[10px] text-white/95 font-sans tracking-wide">
                      {image.credit}
                    </p>
                  )}
                </motion.div>
              )}
            </>
          ) : (
            <>
              {/* Placeholder with gradient and icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-sage-400 mx-auto mb-2 group-hover:text-sage-600 transition-colors" />
                  <p className="text-xs text-sage-600 font-sans px-4 leading-snug">
                    {image.alt}
                  </p>
                </div>
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-all duration-300" />
            </>
          )}
          
          {/* Enhanced day number badge with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -5 }}
            whileHover={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, type: 'spring' }}
            className="absolute top-3 right-3 bg-gradient-to-br from-white/95 to-amber-50/95 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-sans font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-700 opacity-0 group-hover:opacity-100 shadow-xl shadow-amber-500/20 border border-amber-200/50 z-10"
          >
            Day {dayNumber}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
