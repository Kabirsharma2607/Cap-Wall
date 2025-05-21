"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import TransactionContent from "@/components/TransactionContent";
import { useReceiveData } from "@/lib/swr";
import { WalletType } from "@kabir.26/uniwall-commons";
import { walletMetaDataMap } from "@/constants/constant";
import toast from "react-hot-toast";

export default function CryptoReceive() {
  const [cryptoDialogOpen, setCryptoDialogOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<WalletType | null>(null);
  const { data, isLoading } = useReceiveData();

  useEffect(() => {
    if (data && data.wallets.length > 0) {
      setSelectedCrypto(data.wallets[0].walletType);
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  console.log(data);

  const handleSelectCrypto = (symbol: WalletType) => {
    setSelectedCrypto(symbol);
    setCryptoDialogOpen(false);
  };

  const selectedCryptoData =
    data.wallets.find((c) => c.walletType === selectedCrypto) ||
    data.wallets[0];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedCryptoData.walletAddress);
    toast.success("Address coped to clipboard");
  };

  return (
    <TransactionContent
      title="Receive"
      description="Share your wallet address and start accepting payments or transfers in seconds"
    >
      <div className="p-2 w-full max-w-md min-h-[450px] flex flex-col justify-between">
        <div className="flex flex-col justify-center items-center gap-2 text-center">
          <h1 className="text-[#3F75E0] text-2xl font-semibold mb-4 flex ">
            Receive Address
            <Dialog open={cryptoDialogOpen} onOpenChange={setCryptoDialogOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center justify-center ml-2 px-3 py-1 bg-white rounded-lg text-[#3F75E0] font-semibold border-2 border-[#3F75E0]/30 hover:bg-gray-50 text-sm">
                  <div>{selectedCrypto}</div>
                  <ChevronDown size={16} />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-xs">
                <h3 className="text-lg font-medium mb-4">
                  Select Cryptocurrency
                </h3>
                <div className="space-y-2">
                  {data.wallets.map((crypto, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => handleSelectCrypto(crypto.walletType)}
                    >
                      {/* <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"> */}
                      <Image
                        src={walletMetaDataMap[crypto.walletType].icon}
                        alt={walletMetaDataMap[crypto.walletType].name}
                        width={200}
                        height={200}
                        className="w-8 h-8 bg-black-100 rounded-full flex items-center justify-center"
                      />
                      {/* </div> */}
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
          </h1>

          <div className="relative mb-2">
            <div className="w-48 h-48 bg-white p-2 rounded-lg">
              <div className="w-full h-full bg-white flex items-center justify-center">
                <div className="w-48 h-48 bg-white relative">
                  {/* QR code image fills the container */}
                  <Image
                    src={selectedCryptoData?.qrCodeUrl}
                    alt={
                      walletMetaDataMap[selectedCryptoData?.walletType]?.name
                    }
                    fill
                    sizes="100%"
                    className="object-cover rounded-lg"
                  />

                  {/* Crypto logo in center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#e7edf7]">
                      <Image
                        src={
                          walletMetaDataMap[selectedCryptoData?.walletType]
                            ?.icon
                        }
                        alt={
                          walletMetaDataMap[selectedCryptoData?.walletType]
                            ?.name
                        }
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#3F75E0] mb-4">
            Scan the QR to Receive {selectedCryptoData?.walletType} in your
            Wallet.
          </p>

          <div className="w-full max-w-xs mb-2">
            <div className="relative">
              <Input
                value={selectedCryptoData?.walletAddress}
                readOnly
                className="pr-10 bg-white text-center text-sm font-mono truncate"
                disabled={true}
              />
              <button
                onClick={handleCopyAddress}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Copy address"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <Button
            onClick={handleCopyAddress}
            className="w-full max-w-xs bg-[#3F75E0] hover:bg-[#3F75E0]/90 mb-4"
          >
            Copy
          </Button>

          <p className="text-xs text-[#3F75E0]/70 text-center max-w-xs">
            The address can only be used to receive compatible crypto assets
          </p>
        </div>
      </div>
    </TransactionContent>
  );
}
