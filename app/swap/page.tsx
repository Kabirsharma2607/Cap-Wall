"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TransactionContent from "@/components/TransactionContent";
import { useAppContext } from "@/lib/AppContext";
import { useRouter } from "next/navigation";
import { useConversionRates } from "@/lib/swr";
import { SwapCoinSchema, WalletType } from "@kabir.26/uniwall-commons";
import { walletMetaDataMap } from "@/constants/constant";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export default function SwapTokens() {
  const [payAmount, setPayAmount] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  // const [usdValue, setUsdValue] = useState<number>(0);

  const [payCrypto, setPayCrypto] = useState<WalletType | null>(null);
  const [receiveCrypto, setReceiveCrypto] = useState<WalletType | null>(null);

  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);

  const { username } = useAppContext();
  const router = useRouter();

  const { data, isLoading } = useConversionRates();

  useEffect(() => {
    if (!username) {
      router.replace("/login");
    }
  }, [username, router]);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (data?.balances?.length > 0) {
      setPayCrypto(data.balances[0].walletType);
      if (data.balances.length > 1)
        setReceiveCrypto(data.balances[1].walletType);
    }
  }, [data]);

  // useEffect(() => {
  //   if (!data) {
  //     return;
  //   }
  //   if (payCrypto && payAmount && data?.balances) {
  //     const rate = parseFloat(data.balances[0]?.balance) || 0;
  //     setUsdValue(parseFloat(payAmount) * rate);
  //   }
  // }, [payCrypto, payAmount, data]);

  if (isLoading || !data || !payCrypto || !receiveCrypto) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const handleSelectPayCrypto = (walletType: WalletType) => {
    const selected = data.balances.find(
      (crypto) => crypto.walletType === walletType
    );
    if (selected) {
      setPayCrypto(selected.walletType);
      setPayDialogOpen(false);
      if (receiveCrypto === selected.walletType) {
        setReceiveDialogOpen(true);
      }
    }
  };

  const handleSelectReceiveCrypto = (walletType: WalletType) => {
    const selected = data.balances.find(
      (crypto) => crypto.walletType === walletType
    );
    if (selected) {
      setPayAmount("0");
      setReceiveAmount("0");
      setReceiveCrypto(selected.walletType);
      setReceiveDialogOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body: SwapCoinSchema = {
        amount: payAmount,
        fromWalletType: payCrypto,
        toWalletType: receiveCrypto,
      };
      const res = await axiosInstance.post("/wallet/swap-coin", body);
      if (res.data.success) {
        toast.success("Transaction succesfull");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        toast.error("Transaction Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayAmount = (e: string) => {
    setPayAmount(e);
    const payBalance = parseFloat(
      data?.balances.find((it) => it.walletType === payCrypto)?.balance ?? "0"
    );
    const receiveBalance = parseFloat(
      data?.balances.find((it) => it.walletType === receiveCrypto)?.balance ??
        "0"
    );
    const inputAmount = parseFloat(e);

    const convertedAmount = (payBalance * inputAmount) / receiveBalance;
    setReceiveAmount(convertedAmount.toString());
  };

  return (
    <TransactionContent
      title="Swap"
      description="Seamlessly exchange your favorite cryptocurrencies. Fast, secure, and transparent trading—right at your fingertips."
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
                    onChange={(e) => handlePayAmount(e.target.value)}
                    placeholder="0.00"
                    className="text-xl font-medium border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                  />
                  {/* <div className="text-sm text-gray-500">
                    USD${usdValue.toFixed(2)}
                  </div> */}
                </div>

                <Dialog open={payDialogOpen} onOpenChange={setPayDialogOpen}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 bg-[#e6eeff] text-[#3F75E0] px-2 py-1.5 rounded-full"
                    >
                      <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                        <Image
                          src={walletMetaDataMap[payCrypto].icon}
                          alt={payCrypto}
                          width={16}
                          height={16}
                        />
                      </div>
                      {payCrypto}
                      <ChevronDown size={16} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xs">
                    <h3 className="text-lg font-medium mb-4">
                      Select Cryptocurrency to Pay with
                    </h3>
                    <div className="space-y-2">
                      {data.balances.map((crypto, index) => (
                        <button
                          key={index}
                          className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-100 transition-colors"
                          onClick={() =>
                            handleSelectPayCrypto(crypto.walletType)
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
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center py-1">
              <button
                type="button"
                className="w-10 h-10 bg-[#3F75E0] rounded-full flex items-center justify-center shadow-md"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
                    disabled={true}
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
                          src={walletMetaDataMap[receiveCrypto].icon}
                          alt={receiveCrypto}
                          width={16}
                          height={16}
                        />
                      </div>
                      {receiveCrypto}
                      <ChevronDown size={16} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xs">
                    <h3 className="text-lg font-medium mb-4">
                      Select Cryptocurrency you want to Receive
                    </h3>
                    <div className="space-y-2">
                      {data.balances
                        .filter((crypto) => crypto.walletType !== payCrypto)
                        .map((crypto) => (
                          <button
                            key={crypto.walletType}
                            className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() =>
                              handleSelectReceiveCrypto(crypto.walletType)
                            }
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <Image
                                src={walletMetaDataMap[crypto.walletType].icon}
                                alt={crypto.walletType}
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
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <div className="mt-5 bg-[#3F75E0] text-white p-3 rounded-lg text-sm flex items-center justify-between">
            <span>
              You will get {receiveAmount} {receiveCrypto} for {payAmount}{" "}
              {payCrypto}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
