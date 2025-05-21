"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MotionHeading } from "@/components/ui/motion-heading";
import CheckboxItem from "@/components/CheckboxItem";
import { useState, useCallback } from "react";
import { WalletType } from "@kabir.26/uniwall-commons";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { useElegibleWallets } from "@/lib/swr";
import { useAppContext } from "@/lib/AppContext";

export default function SelectWalletPage() {
  const { username } = useAppContext();
  const router = useRouter();

  const [selectedWallets, setSelectedWallets] = useState<WalletType[]>([]);

  const { data, isLoading, isValidating } = useElegibleWallets();

  const toggleWallet = useCallback(
    (walletType: WalletType) => {
      console.log("toggleWallet called");
      setSelectedWallets((prevSelected) => {
        const isSelected = prevSelected.includes(walletType);
        return isSelected
          ? prevSelected.filter((type) => type !== walletType)
          : [...prevSelected, walletType];
      });
    },
    [setSelectedWallets]
  );

  const handleButtonClick = useCallback(async () => {
    try {
      console.log(selectedWallets);
      if (username) {
        axiosInstance.patch(`/auth/update-user-state/${username}`);
      }
      const res = await axiosInstance.post("/wallet/select-wallet", {
        wallets: selectedWallets,
      });
      if (res.data.success) {
        router.push(res.data.deeplink);
      }
      //@ts-ignore
    } catch (e) {}
  }, [router, selectedWallets]);

  const getWalletName = useCallback(
    (walletType: WalletType) => {
      console.log(data?.data);
      switch (walletType) {
        case "SOL":
          return "Solana";
        case "ETH":
          return "Ethereum";
        case "PALO":
          return "Polkadot";
        case "BTC":
          return "Bitcoin";
        default:
          return "Unknown";
      }
    },
    [data]
  );

  if (isLoading || !data || isValidating) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex items-center justify-center">
        <Logo />
      </div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <MotionHeading>Choose which wallets you want</MotionHeading>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {data.data?.map((wallet: WalletType) => (
            <CheckboxItem
              key={wallet}
              handleToggle={() => toggleWallet(wallet)}
              walletName={getWalletName(wallet)}
            />
          ))}
        </motion.div>
      </motion.div>
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <Button
          variant="default"
          onClick={handleButtonClick}
          className="bg-[#487de7] hover:bg-[#5b8ae8]"
        >
          Create Wallet
        </Button>
      </div>
    </div>
  );
}
