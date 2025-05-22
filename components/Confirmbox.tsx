"use client";

import { Button } from "@/components/ui/button";
import { walletMetaDataMap } from "@/constants/constant";
import axiosInstance from "@/lib/axios";
import { WalletBalanceType } from "@/lib/types";
import { SendCoinSchema, WalletType } from "@kabir.26/uniwall-commons";
import { LockIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ConfirmSendProps {
  address: string;
  data: {
    success: boolean;
    message: string;
    balances: WalletBalanceType[];
  };
  cryptoType: WalletType | null;
  amount: string;
  setConfirmSend: (value: boolean) => void;
}

export default function ConfirmSend({
  setConfirmSend,
  address,
  cryptoType,
  amount,
  data,
}: ConfirmSendProps) {
  const networkFee =
    cryptoType === "ETH"
      ? "0.00007"
      : cryptoType === "BTC"
      ? "0.00001"
      : cryptoType === "SOL"
      ? "0.000001"
      : "0.00005";

  const router = useRouter();

  const currentCrypto =
    data.balances.find((c) => c.walletType === cryptoType) || data.balances[0];

  const handleCancel = () => {
    setConfirmSend(false);
  };

  const handleConfirmSend = async () => {
    if (!cryptoType) return;
    const body: SendCoinSchema = {
      receiverPublicAddress: address,
      amount: amount,
      walletType: cryptoType,
    };

    const res = await axiosInstance.post("/wallet/send-coin", body);

    console.log(res);
    if (res.data.signature === "" || res.data.signature) {
      toast.success(res.data.message);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      toast.error(res.data.message);
    }
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
          <Image
            src={walletMetaDataMap[currentCrypto.walletType].icon}
            alt={walletMetaDataMap[currentCrypto.walletType].name}
            width={32}
            height={32}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">To</span>
            <span className="font-medium">
              {address.substring(0, 6)}...
              {address.substring(address.length - 6)}
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
            <span className="font-medium">
              {walletMetaDataMap[currentCrypto.walletType].name} Network
            </span>
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
        <Button
          type="button"
          variant="outline"
          className="w-[25%] border-[#3F75E0] text-[#3F75E0]"
          onClick={handleCancel}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M8 16L9.41 14.59L3.83 9H16V7H3.83L9.41 1.41L8 0L0 8L8 16Z"
              fill="#3F75E0"
            />
          </svg>
        </Button>
        <Button
          type="button"
          className="w-[75%] bg-[#3F75E0] hover:bg-[#3F75E0]/90"
          onClick={handleConfirmSend}
        >
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
  );
}
