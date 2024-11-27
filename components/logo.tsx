'use client'

import { motion } from 'framer-motion'

export function Logo() {
  return (
    <motion.div
      className="relative w-12 h-12 md:w-16 md:h-16"
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: 360 }}
      transition={{ type: "spring", duration: 1.5 }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-600 to-orange-500"
        animate={{
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute inset-1 bg-black rounded-lg flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 text-transparent bg-clip-text">
          CW
        </span>
      </motion.div>
    </motion.div>
  )
}

