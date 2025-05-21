import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const TransactionContent = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col md:flex-row items-stretch px-6 md:px-16 py-10 overflow-hidden">
        {/* Left Side */}
        <div className="flex flex-col flex-1 justify-center">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight md:leading-[1.1]">
            <span className="text-[#3F75E0]">{title}</span>
            <br />
            <span className="text-black">Crypto Instantly</span>
          </h1>

          <p className="text-gray-600 mt-6 mb-10 text-xl md:text-2xl max-w-xl">
            {description}
          </p>

          <div className="flex gap-4">
            <Button className="bg-[#3F75E0] hover:bg-[#3F75E0]/90 px-8 py-3 text-lg">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-[#3F75E0] text-[#3F75E0] px-8 py-3 text-lg"
            >
              Know More
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-end flex-1 mt-10 md:mt-0">
          <div className="bg-[#e7edf7] rounded-2xl shadow-lg p-8 w-full max-w-sm md:max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionContent;
