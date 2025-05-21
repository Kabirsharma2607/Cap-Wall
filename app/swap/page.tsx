"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TransactionContent from "@/components/TransactionContent";

// Dummy crypto data with images
const cryptoOptions = [
  {
    name: "Ethereum",
    symbol: "ETH",
    image: "/images/eth.png",
    balance: 0.0091,
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    image: "/images/btc.png",
    balance: 0.00017,
  },
  {
    name: "Solana",
    symbol: "SOL",
    image: "/images/sol.png",
    balance: 1.25,
  },
  {
    name: "Palladium",
    symbol: "PALO",
    image: "/images/palo.png",
    balance: 0.5,
  },
];

export default function SwapTokens() {
  const [payAmount, setPayAmount] = useState<string>("0.0091");
  const [receiveAmount, setReceiveAmount] = useState<string>("0.00017");

  const [payCrypto, setPayCrypto] = useState(cryptoOptions[0]);
  const [receiveCrypto, setReceiveCrypto] = useState(cryptoOptions[1]);

  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);

  const usdValue = Number.parseFloat(payAmount || "0") * 1768;

  const handleSelectPayCrypto = (symbol: string) => {
    const selected = cryptoOptions.find((crypto) => crypto.symbol === symbol);
    if (selected) {
      setPayCrypto(selected);
      setPayDialogOpen(false);

      // If same as receive, force new receive selection
      if (selected.symbol === receiveCrypto.symbol) {
        setReceiveDialogOpen(true);
      }
    }
  };

  const handleSelectReceiveCrypto = (symbol: string) => {
    const selected = cryptoOptions.find((crypto) => crypto.symbol === symbol);
    if (selected) {
      setReceiveCrypto(selected);
      setReceiveDialogOpen(false);
    }
  };

  const handleSwap = () => {
    const tempCrypto = payCrypto;
    setPayCrypto(receiveCrypto);
    setReceiveCrypto(tempCrypto);

    const tempAmount = payAmount;
    setPayAmount(receiveAmount);
    setReceiveAmount(tempAmount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      `Swapping ${payAmount} ${payCrypto.symbol} for ${receiveAmount} ${receiveCrypto.symbol}`
    );
  };

  return (
    <TransactionContent
      title="Swap"
      description="Seamlessly exchange your favorite cryptocurrencies.
                Fast, secure, and transparent trading—right at your fingertips."
    >
      <div className="p-2 w-full h-full flex flex-col justify-between bg-[#e7edf7] rounded-xl">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-[#3F75E0] text-2xl font-semibold">Swap Crypto</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between flex-1"
        >
          <div className="space-y-1">
            {/* Pay Section */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">I Pay</label>
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    placeholder="0.00"
                    className="text-xl font-medium border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                  />
                  <div className="text-sm text-gray-500">
                    USD${usdValue.toFixed(2)}
                  </div>
                </div>

                <Dialog open={payDialogOpen} onOpenChange={setPayDialogOpen}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 bg-[#e6eeff] text-[#3F75E0] px-2 py-1.5 rounded-full"
                    >
                      <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                        <Image
                          src={payCrypto.image || "/placeholder.svg"}
                          alt={payCrypto.name}
                          width={16}
                          height={16}
                        />
                      </div>
                      {payCrypto.symbol}
                      <ChevronDown size={16} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xs">
                    <h3 className="text-lg font-medium mb-4">
                      Select Cryptocurrency to Pay with
                    </h3>
                    <div className="space-y-2">
                      {cryptoOptions.map((crypto) => (
                        <button
                          key={crypto.symbol}
                          className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-100 transition-colors"
                          onClick={() => handleSelectPayCrypto(crypto.symbol)}
                        >
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Image
                              src={crypto.image || "/placeholder.svg"}
                              alt={crypto.name}
                              width={24}
                              height={24}
                            />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">{crypto.name}</p>
                            <p className="text-sm text-gray-500">
                              {crypto.symbol}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center py-1">
              <button
                type="button"
                onClick={handleSwap}
                className="w-10 h-10 bg-[#3F75E0] rounded-full flex items-center justify-center shadow-md"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L9 5H11V11H9L12 14L15 11H13V5H15L12 2ZM4 5V11H6L3 14L0 11H2V5H0L3 2L6 5H4Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>

            {/* Receive Section */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                I Receive
              </label>
              <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={receiveAmount}
                    onChange={(e) => setReceiveAmount(e.target.value)}
                    placeholder="0.00"
                    className="text-xl font-medium border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                  />
                </div>

                <Dialog
                  open={receiveDialogOpen}
                  onOpenChange={setReceiveDialogOpen}
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 bg-[#e6eeff] text-[#3F75E0] px-2 py-1.5 rounded-full"
                    >
                      <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                        <Image
                          src={receiveCrypto.image || "/placeholder.svg"}
                          alt={receiveCrypto.name}
                          width={16}
                          height={16}
                        />
                      </div>
                      {receiveCrypto.symbol}
                      <ChevronDown size={16} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xs">
                    <h3 className="text-lg font-medium mb-4">
                      Select Cryptocurrency you want to Receive
                    </h3>
                    <div className="space-y-2">
                      {cryptoOptions
                        .filter((crypto) => crypto.symbol !== payCrypto.symbol)
                        .map((crypto) => (
                          <button
                            key={crypto.symbol}
                            className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() =>
                              handleSelectReceiveCrypto(crypto.symbol)
                            }
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <Image
                                src={crypto.image || "/placeholder.svg"}
                                alt={crypto.name}
                                width={24}
                                height={24}
                              />
                            </div>
                            <div className="text-left">
                              <p className="font-medium">{crypto.name}</p>
                              <p className="text-sm text-gray-500">
                                {crypto.symbol}
                              </p>
                            </div>
                          </button>
                        ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <div className="mt-5 bg-[#3F75E0] text-white p-3 rounded-lg text-sm flex items-center justify-between">
            <span>
              You will get {receiveAmount} {receiveCrypto.symbol} for{" "}
              {payAmount} {payCrypto.symbol}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM9 12H7V7H9V12ZM8 6C7.4 6 7 5.6 7 5C7 4.4 7.4 4 8 4C8.6 4 9 4.4 9 5C9 5.6 8.6 6 8 6Z"
                fill="white"
              />
            </svg>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-[#3F75E0] hover:bg-[#3F75E0]/90 text-white py-3"
            >
              Swap
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-center text-xs text-gray-500 text-center mt-4">
          <LockIcon size={12} className="mr-1" />
          Your Privacy is our Commitment.
        </div>
      </div>
    </TransactionContent>
  );
}
