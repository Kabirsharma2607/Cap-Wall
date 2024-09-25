"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function GetBalance() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/getbalance?walletAddress=${address}`);
      //console.log(res);
      if (res.status === 200) {
        setBalance(res.data.balance);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch balance");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="bg-white w-[25em] h-[25em] rounded-xl flex flex-col justify-center items-center">
          <Label
            htmlFor="address"
            className="text-black font-semibold text-xl p-10"
          >
            Wallet Address
          </Label>
          <Input
            className="p-5 border-2 border-black w-[25em] text-black"
            placeholder="Enter Wallet Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <Label
            htmlFor="balance"
            className="text-black font-semibold text-xl p-10 mt-10"
          >
            Your SOL Balance is {balance}
          </Label>
          <Button className="w-[15em]" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Get Balance"
            )}
          </Button>
        </div>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
}
