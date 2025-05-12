import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MotionHeadingProps {
  children: ReactNode
  className?: string
}

export function MotionHeading({ 
  children, 
  className = "text-2xl text-center text-gray-800 mb-8" 
}: MotionHeadingProps) {
  return (
    <motion.h2
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={className}
    >
      {children}
    </motion.h2>
  )
} 