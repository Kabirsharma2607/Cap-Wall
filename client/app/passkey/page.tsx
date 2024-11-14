"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { ToastProvider, Toast, ToastViewport } from '@radix-ui/react-toast';
import { Button } from '@radix-ui/react-button';
import toast, { Toaster } from "react-hot-toast";

const generatePasskey = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 24; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const PasskeyPage = () => {
  const [passkey, setPasskey] = useState(generatePasskey());
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(passkey);
    toast.success("Passkey copied to clipboard");
    setTimeout(() => {
      router.push("/choose-wallet");
    }, 3000);
  };

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
        <h1>Generated Passkey</h1>
        <div style={{ marginBottom: "10px", wordBreak: "break-all", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
          <p>{passkey}</p>
        </div>
        <button onClick={handleCopy} style={{ padding: "10px 20px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px" }}>
          Copy Passkey
        </button>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default PasskeyPage;