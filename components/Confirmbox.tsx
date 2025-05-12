"use client"

import { Button } from "@/components/ui/button"
import { LockIcon } from "lucide-react"
import Image from "next/image";

interface CryptoOption {
  symbol: string;
  name: string;
  image: string;
}

const cryptoOptions: CryptoOption[] = [
  { symbol: "ETH", name: "Ethereum", image: "/images/eth.png" },
  { symbol: "BTC", name: "Bitcoin", image: "/images/btc.png" },
  { symbol: "SOL", name: "Solana", image: "/images/sol.png" },
  { symbol: "PALO", name: "Palo", image: "/images/palo.png" },
]

interface ConfirmSendProps {
  address: string;
  cryptoType: string;
  amount: number;
  setConfirmSend: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmSend({
  setConfirmSend, 
  address, 
  cryptoType, 
  amount,
}: ConfirmSendProps) {
  const networkFee =
    cryptoType === "ETH" ? "0.00007" :
    cryptoType === "BTC" ? "0.00001" :
    cryptoType === "SOL" ? "0.000001" :
    "0.00005";

  const currentCrypto = cryptoOptions.find(crypto => crypto.symbol === cryptoType) || cryptoOptions[0];

  const handleCancel = () => {
    setConfirmSend(false);
  };

  return (
    <div className="p-5 w-full max-w-md min-h-[450px] flex flex-col justify-between">
      <div className="flex justify-center items-center gap-2 text-center mb-4">
        <h1 className="text-[#3F75E0] text-2xl font-semibold">Confirm Send</h1>
        <div className="mt-1 px-4 py-1 bg-white rounded-lg text-[#3F75E0] font-semibold border-2 border-[#3F75E0]/30">
          {cryptoType}
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-[#627dea6e] rounded-full flex items-center justify-center shadow-sm">
          <Image src={currentCrypto.image} alt={`${currentCrypto.name} logo`} width={32} height={32}/>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">To</span>
            <span className="font-medium">
              {address.substring(0, 6)}...{address.substring(address.length - 6)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium">
              {amount} {cryptoType}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Network</span>
            <span className="font-medium">{currentCrypto.name} Network</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Network Fee</span>
            <span className="font-medium">
              {networkFee} {cryptoType}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-5">
        <Button type="button" variant="outline" className="w-[25%] border-[#3F75E0] text-[#3F75E0]" onClick={handleCancel}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path d="M8 16L9.41 14.59L3.83 9H16V7H3.83L9.41 1.41L8 0L0 8L8 16Z" fill="#3F75E0" />
          </svg>
        </Button>
        <Button type="button" className="w-[75%] bg-[#3F75E0] hover:bg-[#3F75E0]/90">
          Confirm
        </Button>
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex items-center text-xs text-gray-500">
          <LockIcon size={12} className="mr-1" />
          Your Privacy is our Commitment.
        </div>
      </div>
    </div>
  )
}
