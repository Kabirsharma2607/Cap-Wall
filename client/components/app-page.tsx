"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export function Solana() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await axios.get("/api/getBalance");
    console.log(res);
    // Simulate transaction process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success/failure (50% chance of success)
    const isSuccess = Math.random() < 0.5;

    if (isSuccess) {
      toast.success("Transaction successful!");
    } else {
      toast.error("Transaction failed. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Solana Wallet Transfer</CardTitle>
          <CardDescription>Send SOL to another wallet address</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sender">Sender Address</Label>
              <Input
                id="sender"
                placeholder="Enter senders Solana address"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receiver">Receiver Address</Label>
              <Input
                id="receiver"
                placeholder="Enter receivers Solana address"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount(SOL)</Label>
              <Input
                id="amount"
                type="number"
                step="0.000000001"
                min="0"
                placeholder="Enter amount to send"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Send SOL"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster position="bottom-center" />
    </div>
  );
}
