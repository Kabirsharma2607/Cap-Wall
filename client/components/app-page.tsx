"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function InitComponent() {
  const [senderAddress, setSenderAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/send-solana", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderAddress, receiverAddress, amount }),
      });
      console.log(response);
      if (response.ok) {
        toast({
          title: "Transaction Submitted",
          description:
            "Your Solana transaction has been submitted successfully.",
        });
        // Reset form fields
        setSenderAddress("");
        setReceiverAddress("");
        setAmount("");
      } else {
        throw new Error("Failed to submit transaction");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit the transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto mt-10">
      <div className="space-y-2">
        <Label htmlFor="senderAddress">Sender's Wallet Address</Label>
        <Input
          id="senderAddress"
          value={senderAddress}
          onChange={(e) => setSenderAddress(e.target.value)}
          required
          placeholder="Enter sender's Solana wallet address"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="receiverAddress">Receiver's Wallet Address</Label>
        <Input
          id="receiverAddress"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          required
          placeholder="Enter receiver's Solana wallet address"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount (SOL)</Label>
        <Input
          id="amount"
          type="number"
          step="0.000000001"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="Enter amount of SOL to send"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Solana"}
      </Button>
    </form>
  );
}
