'use client';

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { LockIcon } from "lucide-react"

interface CryptoOption {
  symbol: string
  name: string
  image: string
}

const cryptoOptions: CryptoOption[] = [
  { symbol: "ETH", name: "Ethereum", image: "/images/eth.png" },
  { symbol: "BTC", name: "Bitcoin", image: "/images/btc.png" },
  { symbol: "SOL", name: "Solana", image: "/images/sol.png" },
  { symbol: "PALO", name: "Palo", image: "/images/palo.png" },
]

interface SendFormProps {
  address: string
  amount: number
  cryptoType : string
  setCryptoType : React.Dispatch<React.SetStateAction<string>>
  setAddress: React.Dispatch<React.SetStateAction<string>>
  setAmount: React.Dispatch<React.SetStateAction<number>>
  setConfirmSend: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SendForm({ address, amount, cryptoType , setAddress, setAmount, setConfirmSend , setCryptoType}: SendFormProps) {
  const [cryptoDialogOpen, setCryptoDialogOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmSend(true)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value))
  }

  const handleSelectCrypto = (symbol: string) => {
    setCryptoType(symbol)
    setCryptoDialogOpen(false)
  }

  const handleMaxAmount = () => {
    setAmount(100)
  }

  const handleCancel = () => {
    setAddress("")
    setAmount(0)
    setCryptoType("ETH")
  }

  const selectedCryptoData = cryptoOptions.find((c) => c.symbol === cryptoType) || cryptoOptions[0]

  return (
    <div className="p-5 w-full max-w-md min-h-[450px] flex flex-col justify-between">
      <div className="flex justify-center items-center gap-2 text-center mb-4">
        <h1 className="text-[#3F75E0] text-2xl font-semibold">Send</h1>
        <Dialog open={cryptoDialogOpen} onOpenChange={setCryptoDialogOpen}>
          <DialogTrigger asChild>
            <button className="mt-1 px-4 py-1 bg-white rounded-lg text-[#3F75E0] font-semibold border-2 border-[#3F75E0]/30 hover:bg-gray-50">
              {cryptoType}
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-xs">
            <h3 className="text-lg font-medium mb-4">Select Cryptocurrency</h3>
            <div className="space-y-2">
              {cryptoOptions.map((crypto) => (
                <button
                  key={crypto.symbol}
                  className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => handleSelectCrypto(crypto.symbol)}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Image 
                      src={crypto.image} 
                      alt={crypto.name} 
                      width={24} 
                      height={24} 
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{crypto.name}</p>
                    <p className="text-sm text-gray-500">{crypto.symbol}</p>
                  </div>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-center mb-5">
        <div className="w-12 h-12 bg-[#627dea6e] rounded-full flex items-center justify-center shadow-sm">
          <Image 
            src={selectedCryptoData.image} 
            alt={selectedCryptoData.name} 
            width={32} 
            height={32} 
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM12 12H4C4 9.8 6.2 8 8.5 8C10.8 8 13 9.8 13 12H12Z"
                  fill="#3F75E0"
                />
              </svg>
              <label className="text-sm text-gray-500">Recipient Wallet Number</label>
            </div>
            <Input
              name="recipient"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter wallet address"
              className="w-full h-10 bg-white"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" fill="#3F75E0" />
                <path
                  d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                  fill="white"
                />
              </svg>
              <label className="text-sm text-gray-500">Amount</label>
            </div>
            <div className="relative">
              <Input
                name="amount"
                type="number"
                step="0.0001"
                value={amount || ""}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full h-10 pr-16 bg-white"
              />
              <button
                type="button"
                onClick={handleMaxAmount}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-100 text-[#3F75E0] px-2 py-1 rounded-md text-xs font-medium"
              >
                Max
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <Button
              type="button"
              variant="outline"
              className="w-[25%] border-[#3F75E0] text-[#3F75E0]"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-[75%] bg-[#3F75E0] hover:bg-[#3F75E0]/90"
            >
              Next
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2"
              >
                <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="white" />
              </svg>
            </Button>
          </div>
        </div>
      </form>

      <div className="flex justify-center mt-6">
        <div className="flex items-center text-xs text-gray-500">
          <LockIcon size={12} className="mr-1" />
          Your Privacy is our Commitment.
        </div>
      </div>
    </div>
  )
}
