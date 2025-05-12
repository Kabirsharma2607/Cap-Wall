"use client";

import React from "react";
import {
  RefreshCcw,
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  ShoppingCart,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

function fetchCryptoData() {
  return [
    { id: "btc", name: "BTC", balance: "0.03148", logo: "/images/btc.png" },
    { id: "eth", name: "ETH", balance: "1.66", logo: "/images/eth.png" },
    { id: "sol", name: "SOL", balance: "1.37", logo: "/images/sol.png" },
    { id: "palo", name: "PALO", balance: "0.37", logo: "/images/palo.png" },
  ];
}

function fetchActionButtons() {
  return [
    { id: "send", label: "Send", icon: <ArrowUpRight className="w-5 h-5" /> },
    {
      id: "receive",
      label: "Receive",
      icon: <ArrowDownLeft className="w-5 h-5" />,
    },
    { id: "swap", label: "Swap", icon: <Repeat className="w-5 h-5" /> },
    { id: "buy", label: "Buy", icon: <ShoppingCart className="w-5 h-5" /> },
  ];
}

export default function Dashboard() {
  const router = useRouter();
  const cryptoData = fetchCryptoData();
  const actionButtons = fetchActionButtons();

  const handleClick = (id: string) => {
    if (id === "send") {
      const cryptoDataArray = fetchCryptoData();
      cryptoDataArray[0].balance = (
        parseFloat(cryptoDataArray[0].balance) - 0.01
      ).toFixed(5);
      router.push("/send");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-[#F9FBFD] overflow-y-auto">
        <div className="bg-[#e7edf7] rounded-xl p-8 flex flex-col gap-10">
          {/* Top section */}
          <div>
            <h2 className="text-5xl font-bold text-slate-800 mb-8">
              Welcome To Dashboard
            </h2>

            {/* Crypto Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {cryptoData.map((crypto) => (
                <div
                  key={crypto.id}
                  className="bg-[#3F75E0] text-white rounded-xl p-6 flex flex-col items-center justify-center gap-3"
                >
                  <div className="w-14 h-14">
                    <Image
                      src={crypto.logo || "/placeholder.svg"}
                      alt={crypto.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-xl font-bold">{crypto.balance}</p>
                  <p className="text-sm opacity-80">{crypto.name}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons - Responsive and Auto-Sizing */}
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
              {actionButtons.map((button) => (
                <button
                  key={button.id}
                  className="bg-white text-[#3F75E0] border border-[#3F75E0] rounded-xl py-5 flex flex-col items-center justify-center gap-2 text-sm font-semibold hover:bg-[#3F75E0]/10 transition-all"
                  onClick={() => handleClick(button.id)}
                >
                  {button.icon}
                  <span>{button.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-wrap justify-end gap-4">
            <button
              onClick={() => console.log("Refreshing balance...")}
              className="border border-[#3F75E0] text-[#3F75E0] rounded-full px-6 py-2 flex items-center gap-2 text-sm hover:bg-[#3F75E0]/10 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Refresh Balance</span>
            </button>
            <button
              onClick={() => console.log("Viewing recent transactions...")}
              className="border border-[#3F75E0] text-[#3F75E0] rounded-full px-6 py-2 flex items-center gap-2 text-sm hover:bg-[#3F75E0]/10 transition-colors"
            >
              <Clock className="w-4 h-4" />
              <span>Recent Transaction</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
