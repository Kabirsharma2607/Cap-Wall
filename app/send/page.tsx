"use client";

import React from "react";
import { useState } from "react";
import Sendaddress from "@/components/Sendaddress";
import Confirmbox from "@/components/Confirmbox";
import TransactionContent from "@/components/TransactionContent";

const Send = () => {
  const [confirmSend, setConfirmSend] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [cryptoType, setCryptoType] = useState<string>("ETH");
  const [amount, setAmount] = useState<number>(0);
  return (
    <TransactionContent>
      <div>
        {!confirmSend ? (
          <Sendaddress
            address={address}
            amount={amount}
            cryptoType={cryptoType}
            setAddress={setAddress}
            setAmount={setAmount}
            setConfirmSend={setConfirmSend}
            setCryptoType={setCryptoType}
          />
        ) : (
          <Confirmbox
            address={address}
            amount={amount}
            cryptoType={cryptoType}
            setConfirmSend={setConfirmSend}
          />
        )}
      </div>
    </TransactionContent>
  );
};

export default Send;
