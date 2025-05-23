"use client";

import { walletMetaDataMap } from "@/constants/constant";
import { useWallets } from "@/lib/swr";
import { WalletType } from "@kabir.26/uniwall-commons";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LogOut, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/lib/AppContext";

export default function ProfilePage() {
  const [wallets, setWallets] = useState<WalletType | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { data, isLoading, isValidating } = useWallets();
  const router = useRouter();
  const { setUsername } = useAppContext();

  useEffect(() => {
    if (!data) return;
    if (data.data.length > 0) {
      setWallets(data.data[0].walletType);
    }
  }, [data]);

  const selectedData =
    data?.data.find((crypto) => crypto.walletType === wallets) || data?.data[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading || !data || isValidating) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("username");
    setUsername("");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-800 relative">
      {/* Sidebar */}
      <aside
        className={`bg-[#3F75E0] text-white transition-all duration-300 flex flex-col justify-between ${
          isSidebarOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="p-4 flex flex-col h-full justify-between">
          <div>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="text-white mb-6 text-lg"
              title={isSidebarOpen ? "Collapse" : "Expand"}
            >
              {isSidebarOpen ? "«" : "»"}
            </button>
            {isSidebarOpen && (
              <h2 className="text-xl font-bold mb-4">Your Wallets</h2>
            )}
            <ul className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
              {data.data.map((wallet) => (
                <li
                  key={wallet.walletType}
                  onClick={() => setWallets(wallet.walletType)}
                  className={`cursor-pointer rounded-lg p-2 transition flex items-center gap-3 ${
                    selectedData?.walletType === wallet.walletType
                      ? "bg-white text-[#3F75E0] font-medium"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Image
                    src={walletMetaDataMap[wallet.walletType].icon}
                    alt={wallet.walletType}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  {isSidebarOpen && walletMetaDataMap[wallet.walletType].name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 bg-white/10 hover:bg-red-600 transition text-white w-full py-2 px-3 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && "Logout"}
            </button>
          </div>
        </div>
      </aside>

      {/* Right Content */}
      <section className="flex-1 p-10 bg-[#f9fbff] flex justify-center items-start">
        {selectedData ? (
          <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-10 border border-gray-200">
            <div className="flex items-center gap-4 mb-8">
              <Image
                src={walletMetaDataMap[selectedData.walletType].icon}
                alt="wallet icon"
                width={56}
                height={56}
              />
              <h1 className="text-3xl font-semibold text-[#3F75E0]">
                {walletMetaDataMap[selectedData.walletType].name} Wallet
              </h1>
            </div>
            <div className="space-y-6 text-lg">
              <p>
                <strong className="text-gray-700">Type:</strong>{" "}
                {selectedData.walletType}
              </p>
              <div className="flex items-start gap-2">
                <div>
                  <p className="text-gray-700 font-semibold">Public Address:</p>
                  <p className="break-all text-sm text-gray-600">
                    {selectedData.walletPublicAddress}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(selectedData.walletPublicAddress)}
                  className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                  title="Copy Public Address"
                >
                  <Copy className="w-4 h-4 text-[#3F75E0]" />
                </button>
              </div>
              <div className="flex items-start gap-2">
                <div>
                  <p className="text-gray-700 font-semibold">Private Key:</p>
                  <p className="break-all text-sm text-gray-600">
                    {selectedData.walletPrivateKey}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(selectedData.walletPrivateKey)}
                  className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                  title="Copy Private Key"
                >
                  <Copy className="w-4 h-4 text-[#3F75E0]" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-600">
            Select a wallet to view details.
          </p>
        )}
      </section>
    </div>
  );
}
