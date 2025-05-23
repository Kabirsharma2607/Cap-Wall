"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Sendaddress from "@/components/Sendaddress";
import Confirmbox from "@/components/Confirmbox";
import TransactionContent from "@/components/TransactionContent";
import { useUserWalletsWithBalances } from "@/lib/swr";
import { WalletType } from "@kabir.26/uniwall-commons";
import { useAppContext } from "@/lib/AppContext";
import { useRouter } from "next/navigation";

const Send = () => {
  const [confirmSend, setConfirmSend] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [cryptoType, setCryptoType] = useState<WalletType | null>(null);
  const [amount, setAmount] = useState<string>("0");
  const { data, isLoading } = useUserWalletsWithBalances();
  const { username } = useAppContext();
  const router = useRouter();

  if (!username) {
    router.replace("/login");
  }

  useEffect(() => {
    if (data && data.balances.length > 0) {
      const defaultCrypto = data.balances[0].walletType;
      setCryptoType(defaultCrypto);
    }
  }, [data]);

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <TransactionContent
      title="Send"
      description="Transfer digital assets securely to anyone, anywhere in the world
            fast and fee efficient."
    >
      <div>
        {!confirmSend ? (
          <Sendaddress
            address={address}
            amount={amount}
            cryptoType={cryptoType}
            data={data}
            setAddress={(value: string) => {
              setAddress(value);
            }}
            setAmount={(value: string) => {
              setAmount(value);
            }}
            setConfirmSend={(value: boolean) => {
              setConfirmSend(value);
            }}
            setCryptoType={(value: string) => {
              setCryptoType(value as WalletType);
            }}
          />
        ) : (
          <Confirmbox
            data={data}
            address={address}
            amount={amount}
            cryptoType={cryptoType}
            setConfirmSend={(value: boolean) => {
              setConfirmSend(value);
            }}
          />
        )}
      </div>
    </TransactionContent>
  );
};

export default Send;
