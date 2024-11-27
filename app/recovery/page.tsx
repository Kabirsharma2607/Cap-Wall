'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

export default function RecoveryPage() {
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  
  const recoveryPhrase = Array(20).fill(0).map(() => 
    Math.random().toString(36).substring(2, 6)
  )

  const handleCopy = () => {
    navigator.clipboard.writeText(recoveryPhrase.join(' '))
    setCopied(true)
    setTimeout(() => router.push('/select-wallet'), 1000)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg text-center"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl text-red-500 mb-8"
        >
          Warning: if you forget this your existence is a waste
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-3 p-6 bg-gray-900 rounded-lg mb-6"
        >
          {recoveryPhrase.map((word, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="px-3 py-2 bg-gray-800 rounded text-gray-300 font-mono text-sm"
            >
              {word}
            </motion.div>
          ))}
        </motion.div>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={handleCopy}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-orange-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 w-full"
        >
          {copied ? <Check className="w-5 h-5" /> : 'Copy Recovery Phrase'}
        </motion.button>
      </motion.div>
    </div>
  )
}

