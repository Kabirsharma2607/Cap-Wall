"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useAppContext } from "@/lib/AppContext";
import { MotionHeading } from "@/components/ui/motion-heading";
import { useRecoveryPhrase } from "@/lib/swr";
import toast from "react-hot-toast";

export default function RecoveryPage() {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { username } = useAppContext();
  const { data, error, isLoading } = useRecoveryPhrase(username);

  const handleCopyPhraseClicked = useCallback(async () => {
    if (!data?.data) {
      toast.error("No recovery phrase available");
      return;
    }
    navigator.clipboard.writeText(data?.data?.join(" "));
    setCopied(true);
    toast.success("Recovery phrase copied to clipboard");
    if (username) {
      try {
        const res = await axiosInstance.patch(
          `/auth/update-user-state/${username}`
        );
        if (res.data.success) {
          setTimeout(() => router.push("/select-wallet"), 2000);
        }
        //@ts-ignore
      } catch (e) {
        toast.error("Failed to update user state");
      }
    }
  }, [data?.data, router, username]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!username) {
    console.error("No username found in context");
    toast.error("Session expired. Please sign up again.");
    router.push("/signup");
    return null;
  }

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading recovery phrase...</div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching recovery phrase:", error);
    toast.error("Failed to load recovery phrase");
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg text-center"
      >
        <MotionHeading className="text-2xl text-red-500 mb-8">
          Warning: do not loose this phrase!
        </MotionHeading>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-4 gap-3 p-6 bg-slate-100 shadow-lg border border-slate-200 rounded-lg mb-6"
        >
          {data?.data?.map((word: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="px-3 py-2 bg-gray-200 rounded text-gray-700 font-mono text-sm"
            >
              {word}
            </motion.div>
          ))}
        </motion.div>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={handleCopyPhraseClicked}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 w-full"
        >
          {copied ? <Check className="w-5 h-5" /> : "Copy Recovery Phrase"}
        </motion.button>
      </motion.div>
    </div>
  );
}
