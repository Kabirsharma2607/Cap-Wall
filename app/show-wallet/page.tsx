"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Image from "next/image";
import "./cardcontainer.css"; // Import your CSS file for card styles
import { useWallets } from "@/lib/swr";
import { walletMetaDataMap } from "@/constants/constant";
import { WalletType } from "../types";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useAppContext } from "@/lib/AppContext";

export default function WalletKeysPage() {
  const router = useRouter();
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const { data, isLoading, isValidating } = useWallets();
  const { username } = useAppContext();

  if (!username) {
    router.replace("/login");
  }

  useEffect(() => {
    if (data && username) {
      axiosInstance.patch(`/auth/update-user-state/${username}`);
    }
  }, [data, username]);

  if (isLoading || !data || isValidating) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  console.log(data);

  const toggleFlip = (index: number) => {
    if (flippedCards.includes(index)) {
      setFlippedCards(flippedCards.filter((cardId) => cardId !== index));
    } else {
      setFlippedCards([...flippedCards, index]);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`, {
      style: {
        border: "1px solid #10b981",
        padding: "16px",
        color: "#333",
      },
      iconTheme: {
        primary: "#10b981",
        secondary: "#FFFAEE",
      },
    });
  };

  const handleNext = () => {
    // This would navigate to the next page in your flow
    toast.success("Moving to the next step in the wallet setup process", {
      icon: "👉",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    router.push(data?.deeplink ?? "/");
  };

  console.log(walletMetaDataMap[WalletType.SOL]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-center mb-8">Your Wallet Keys</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {data?.data?.map((wallet, index) => (
          <div
            key={index}
            className="card-container"
            onClick={() => toggleFlip(index)}
          >
            <div
              className={`card ${
                flippedCards.includes(index) ? "flipped" : ""
              }`}
            >
              {/* Front of card */}
              <div
                className={twMerge(
                  clsx(
                    `card-face card-front 
                  shadow-lg backdrop-blur-md flex items-center justify-center p-6`,
                    walletMetaDataMap[wallet.walletType].color
                  )
                )}
              >
                <div className="w-24 h-24 relative drop-shadow-2xl">
                  <Image
                    src={walletMetaDataMap[wallet.walletType].icon}
                    alt={`${wallet.walletType} logo`}
                    className="w-full h-full object-contain filter drop-shadow-xl"
                    height={96}
                    width={96}
                  />
                </div>
              </div>

              {/* Back of card */}
              <div className="card-face card-back bg-white/90 shadow-lg backdrop-blur-md p-6">
                <div className="flex flex-col h-full justify-between">
                  <h3 className="text-xl font-bold text-center mb-2">
                    {wallet.walletType} Keys
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">
                          Public Key
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(
                              wallet.walletPublicAddress,
                              "Public key"
                            );
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="bg-gray-100 p-2 rounded text-xs font-mono break-all">
                        {wallet.walletPublicAddress}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">
                          Private Key
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(
                              wallet.walletPrivateKey,
                              "Private key"
                            );
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="bg-gray-100 p-2 rounded text-xs font-mono break-all">
                        {wallet.walletPrivateKey}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button onClick={handleNext} className="px-8">
          Next
        </Button>
      </div>
    </div>
  );
}
