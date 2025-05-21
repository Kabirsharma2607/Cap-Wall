"use client";

import React from "react";
import {
  RefreshCcw,
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  ShoppingCart,
  Clock,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useDashboardData } from "@/lib/swr";
import { ActionItemSchema, WalletDetailsSchema } from "@/lib/types";
import { walletMetaDataMap } from "@/constants/constant";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const { data, isLoading, isValidating, mutate } = useDashboardData();

  if (isLoading || !data || isValidating) {
    return <div>Loading...</div>;
  }

  const actionItemsMap: Record<
    ActionItemSchema["actionItemType"],
    {
      label: string;
      icon: React.JSX.Element;
    }
  > = {
    SEND: {
      label: "Send",
      icon: <ArrowUpRight className="w-5 h-5" />,
    },
    RECEIVE: {
      label: "Receive",
      icon: <ArrowDownLeft className="w-5 h-5" />,
    },
    SWAP: {
      label: "Swap",
      icon: <Repeat className="w-5 h-5" />,
    },
    BUY: {
      label: "Buy",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
  };

  const handleClick = (action: ActionItemSchema["actionItemType"]) => {
    switch (action) {
      case "SEND":
        router.push("/send");
        break;
      case "RECEIVE":
        router.push("/receive");
        break;
      case "SWAP":
        router.push("/swap");
        break;
      case "BUY":
        router.push("/buy");
        break;
      default:
        toast.error("Action not supported");
        break;
    }
  };

  console.log(data);

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
              {data?.data?.walletDetails?.map(
                (wallet: WalletDetailsSchema, index) =>
                  wallet.isEnabled ? (
                    <div
                      key={index}
                      className="bg-[#3F75E0] text-white rounded-xl p-6 flex flex-col items-center justify-center gap-3"
                    >
                      <div className="w-14 h-14">
                        <Image
                          src={walletMetaDataMap[wallet.walletType].icon}
                          alt={walletMetaDataMap[wallet.walletType].name}
                          width={56}
                          height={56}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-xl font-bold">{wallet.balance}</p>
                      <p className="text-sm opacity-80">{wallet.walletType}</p>
                    </div>
                  ) : (
                    <div
                      className="bg-[#e7edf7] border-[#3F75E0] border-2 rounded-xl p-6 flex flex-col items-center justify-center gap-3"
                      key={index}
                    >
                      <button
                        className="w-12 h-12 flex items-center justify-center border-[#3F75E0] border-2 rounded-full"
                        onClick={() => router.push("/select-wallet")}
                      >
                        <Plus className="w-8 h-8 text-[#3F75E0]" />
                      </button>
                    </div>
                  )
              )}
            </div>

            {/* Action Buttons - Responsive and Auto-Sizing */}
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
              {data?.data?.actionItems?.map((button: ActionItemSchema, index) =>
                button.isEnabled ? (
                  <button
                    key={index}
                    className="bg-white text-[#3F75E0] border border-[#3F75E0] rounded-xl py-5 flex flex-col items-center justify-center gap-2 text-sm font-semibold hover:bg-[#3F75E0]/10 transition-all"
                    onClick={() => handleClick(button.actionItemType)}
                  >
                    {actionItemsMap[button.actionItemType].icon}
                    <span>{actionItemsMap[button.actionItemType].label}</span>
                  </button>
                ) : null
              )}
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-wrap justify-end gap-4">
            <button
              onClick={() => {
                mutate();
              }}
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
