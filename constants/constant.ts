import { WalletType } from "@/app/types";

export const walletMetaDataMap: Record<
  WalletType,
  {
    name: string;
    color: string;
    icon: string;
  }
> = {
  [WalletType.SOL]: {
    name: "Solana",
    color: "bg-gradient-to-r from-purple-300 to-purple-400",
    icon: "/images/sol.png",
  },
  [WalletType.ETH]: {
    name: "Ethereum",
    color: "bg-gradient-to-r from-gray-500 to-gray-600",
    icon: "/images/eth.png",
  },
  [WalletType.PALO]: {
    name: "Polkadot",
    color: "bg-gradient-to-r from-pink-300 to-pink-400",
    icon: "/images/palo.png",
  },
  [WalletType.BTC]: {
    name: "Bitcoin",
    color: "bg-gradient-to-r from-orange-200 to-orange-300",
    icon: "/images/btc.png",
  },
};
