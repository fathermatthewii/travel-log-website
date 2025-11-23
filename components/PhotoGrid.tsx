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

  return (
    <div className="grid grid-cols-2 auto-rows-[180px] gap-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.7, 
            delay: index * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{ scale: 1.03, y: -5 }}
          onClick={() => handleImageClick(image.creditUrl)}
          className={`
            relative overflow-hidden rounded-2xl bg-gradient-to-br from-sand-200 to-sage-200
            ${getBentoLayout(images.length, index)}
            group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300
          `}
        >
          {image.src ? (
            <>
              {/* Actual Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay on hover with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/0 via-slate-900/0 to-slate-900/0 group-hover:from-slate-900/30 group-hover:via-slate-900/10 group-hover:to-transparent transition-all duration-500" />
              
              {/* Image credit */}
              {image.credit && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-3 z-20">
                  {image.creditUrl ? (
                    <a 
                      href={image.creditUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] text-white/90 font-sans tracking-wide hover:text-white transition-colors underline decoration-white/40 hover:decoration-white"
                    >
                      {image.credit}
                    </a>
                  ) : (
                    <p className="text-[10px] text-white/90 font-sans tracking-wide">
                      {image.credit}
                    </p>
                  )}
                </div>
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
          
          {/* Day number badge with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-sans text-slate-700 opacity-0 group-hover:opacity-100 shadow-lg z-10"
          >
            Day {dayNumber}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
