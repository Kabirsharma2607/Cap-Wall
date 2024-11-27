"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { createTransaction, getTransactions } from "@/app/actions/transaction";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function WalletPage() {
  const [selectedCrypto, setSelectedCrypto] = useState("SOL");
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const { toast } = useToast();

  const handleTransaction = async () => {
    try {
      await createTransaction(parseFloat(amount), toAddress, selectedCrypto);
      toast({
        title: "Transaction initiated",
        description: "Your transaction has been submitted successfully",
      });
    } catch (error) {
      toast({
        title: "Transaction failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-gray-900 p-4 flex flex-col"
      >
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <nav className="space-y-2">
          {["SOL", "BTC", "PALO"].map((crypto, index) => (
            <motion.button
              key={crypto}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCrypto(crypto)}
              className={`w-full px-4 py-2 rounded-lg text-left transition-colors ${
                selectedCrypto === crypto
                  ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              {crypto}
            </motion.button>
          ))}
        </nav>
      </motion.aside>
      <main className="flex-1 p-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              {selectedCrypto} Wallet
            </h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-orange-500">
                  Send {selectedCrypto}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
                <DialogHeader>
                  <DialogTitle>Send {selectedCrypto}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label>Amount</label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label>To Address</label>
                    <Input
                      value={toAddress}
                      onChange={(e) => setToAddress(e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <Button
                    onClick={handleTransaction}
                    className="bg-gradient-to-r from-purple-600 to-orange-500"
                  >
                    Send Transaction
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-gray-400 mb-2">Balance</h3>
                  <p className="text-2xl text-white">0.00 {selectedCrypto}</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-gray-400 mb-2">Value (USD)</h3>
                  <p className="text-2xl text-white">$0.00</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Recent Transactions
              </h2>
              <div className="space-y-4">
                {/* Transactions will be populated here */}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
