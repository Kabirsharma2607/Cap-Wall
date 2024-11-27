'use client'

import { motion } from 'framer-motion'
import { Logo } from '@/components/logo'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <Logo />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600 text-transparent bg-clip-text"
        >
          CryptoWallet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-gray-400 text-lg"
        >
          Secure. Simple. Sophisticated.
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12"
      >
        <Link
          href="/register"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Join Us
        </Link>
      </motion.div>
    </div>
  )
}

