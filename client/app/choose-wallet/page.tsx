
"use client";

import React from "react";
import { useRouter } from 'next/navigation';

const ChooseWalletPage = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    router.push("/wallet/" + e.target.innerText)
  }
  return (
    <div>
      <h1>Choose Wallet Page</h1>
      <button onClick={handleSubmit}>solana</button><br/>
      <button onClick={handleSubmit}>bitcoin</button><br/>
      <button onClick={handleSubmit}>polygon</button><br/>
      <button onClick={handleSubmit}>palo</button><br/>
    </div>
  )
}

export default ChooseWalletPage;