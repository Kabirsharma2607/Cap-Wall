"use client";
import Image from "next/image";
import TransactionContent from "@/components/TransactionContent";
import { Button } from "@/components/ui/button";
import {
  DialogContent as DialogContentAlias,
  DialogTrigger as DialogTriggerAlias,
} from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { useConversionRates } from "@/lib/swr";
import { walletMetaDataMap } from "@/constants/constant";
import { BuyCoinSchema, WalletType } from "@kabir.26/uniwall-commons";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { useAppContext } from "@/lib/AppContext";

const Buy = () => {
  const [cryptoDialogOpen, setCryptoDialogOpen] = useState<boolean>(false);
  const [cryptoType, setCryptoType] = useState<WalletType | null>(null);
  const [amount, setAmount] = useState<string>("0");
  const router = useRouter();
  const { username } = useAppContext();

  if (!username) {
    router.replace("/login");
  }

  const { data, isLoading } = useConversionRates();

  useEffect(() => {
    if (data && data.balances.length > 0) {
      setCryptoType(data.balances[0].walletType);
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const handleCancel = () => {
    router.push("/dashboard");
  };

  const handleSelectCrypto = (symbol: WalletType) => {
    setCryptoType(symbol);
    setCryptoDialogOpen(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cryptoType) return;

    const body: BuyCoinSchema = {
      walletType: cryptoType,
      amount: amount,
    };

    const res = await axiosInstance.post("/wallet/buy-coin", body);

    if (res.data.success) {
      toast.success("Transaction successfull");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      toast.error("Transaction Failed");
    }
  };

  const selectedCryptoData =
    data.balances.find((crypto) => crypto.walletType === cryptoType) ||
    data.balances[0];

  return (
    <div>
      <TransactionContent
        title="Buy"
        description="Buy crypto with your debit or credit card. Fast and easy."
      >
        <div className="p-5 w-full max-w-md min-h-[450px] flex flex-col justify-between">
          <div className="flex justify-center items-center gap-2 text-center mb-4">
            <h1 className="text-[#3F75E0] text-2xl font-semibold">
              Buy Crypto
            </h1>
            <Dialog open={cryptoDialogOpen} onOpenChange={setCryptoDialogOpen}>
              <DialogTriggerAlias asChild>
                <button className="flex justify-center items-center mt-1 px-4 py-1 bg-white rounded-lg text-[#3F75E0] font-semibold border-2 border-[#3F75E0]/30 hover:bg-gray-50">
                  {cryptoType}
                  <ChevronDown size={16} />
                </button>
              </DialogTriggerAlias>
              <DialogContentAlias className="max-w-xs">
                <h3 className="text-lg font-medium mb-4">
                  Select Cryptocurrency
                </h3>
                <div className="space-y-2">
                  {data.balances.map((crypto, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() =>
                        handleSelectCrypto(crypto.walletType as WalletType)
                      }
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Image
                          src={walletMetaDataMap[crypto.walletType].icon}
                          alt={walletMetaDataMap[crypto.walletType].name}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">
                          {walletMetaDataMap[crypto.walletType].name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {crypto.walletType}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </DialogContentAlias>
            </Dialog>
          </div>

          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 bg-[#627dea6e] rounded-full flex items-center justify-center shadow-sm">
              <Image
                src={walletMetaDataMap[selectedCryptoData.walletType].icon}
                alt={selectedCryptoData.walletType}
                width={32}
                height={32}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM12 12H4C4 9.8 6.2 8 8.5 8C10.8 8 13 9.8 13 12H12Z"
                      fill="#3F75E0"
                    />
                  </svg>
                  <label className="text-sm text-gray-500">
                    Recipient Wallet Number
                  </label>
                </div>
                <Input
                  name="recipient"
                  value={selectedCryptoData.walletAddress}
                  className="w-full h-10 bg-white"
                  disabled={true}
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="8" cy="8" r="8" fill="#3F75E0" />
                    <path
                      d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                      fill="white"
                    />
                  </svg>
                  <label className="text-sm text-gray-500">
                    Amount of Crypto
                  </label>
                </div>
                <div className="relative">
                  <Input
                    name="amount"
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    className="w-full h-10 pr-16 bg-white"
                  />
                </div>
                <span className="text-sm text-gray-500">
                  1 {selectedCryptoData.walletType}
                  {" = "}
                  {selectedCryptoData.balance} USD
                </span>
              </div>

              <div className="mt-5 bg-[#3F75E0] text-white p-3 rounded-lg text-sm flex items-center justify-between">
                <span>
                  You will get {amount} {selectedCryptoData.walletType} for USD{" "}
                  {Number(selectedCryptoData.balance) * Number(amount)}
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
                  Buy
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
      </TransactionContent>
    </div>
  );
};

export default Buy;
