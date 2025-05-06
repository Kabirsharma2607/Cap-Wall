'use client';

import React, { useCallback } from 'react'
import { motion } from 'framer-motion'

interface CheckboxItemProps {
  handleToggle: () => void;
  walletName: string;
}

const CheckboxItem = ({ handleToggle, walletName }: CheckboxItemProps) => {
  const [selected, setSelected] = React.useState(false)

  const toggleSelection = useCallback ( () => {
    setSelected(!selected)
    handleToggle() 
  } , [handleToggle, selected]);

  return (
    <motion.button
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      onClick={toggleSelection} 
      className={`w-full px-4 py-3 ${selected ? 'bg-[#5b8ae8] text-white' : 'bg-slate-100'} rounded-lg shadow-lg border border-slate-200 hover:bg-[#5b8ae8] hover:text-white text-gray-800 text-left transition-colors flex justify-between`}
    >
      {walletName}
      {selected ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
      ) : null}
    </motion.button>
  )
}

export default CheckboxItem
