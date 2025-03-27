'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const wallets = ['Solana', 'Bitcoin', 'Palo', 'Polygon']

export default function SelectWalletPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl text-center text-gray-800 mb-8"
        >
          Choose which wallets you want
        </motion.h2>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {wallets.map((wallet, index) => (
            <motion.button
              key={wallet}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              onClick={() => router.push('/wallet')}
              className="w-full px-4 py-3 bg-slate-100 rounded-lg shadow-lg border border-slate-200 hover:bg-slate-200 text-gray-800 text-left transition-colors"
            >
              {wallet}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

