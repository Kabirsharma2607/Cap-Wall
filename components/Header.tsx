"use client";

import { Logo } from "@/components/logo";
// import { useRouter } from "next/navigation";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-6 h-20 border-b shadow-sm">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12">
          <Logo />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">Capwall</h1>
      </div>

      {/* Right: Profile Button */}
      <button className="bg-[#3F75E0] text-white px-6 py-2 rounded-full flex items-center gap-2 text-base">
        <span>Profile</span>
      </button>
    </div>
  );
}
