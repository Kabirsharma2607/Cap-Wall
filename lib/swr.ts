import { WalletType } from "@/app/types";
import useSWR from "swr";

export const useRecoveryPhrase = (username: string) => {
  // Only fetch if username is not empty
  return useSWR<any, Error>(username ? `/auth/words-secret/${username}` : null);
};

export const useElegibleWallets = () => {
  return useSWR<any, Error>("/wallet/get-eligible-wallets");
};

export const useWallets = () => {
  // Only fetch if username is not empty
  return useSWR<
    {
      success: boolean;
      data: {
        wallet_address: string;
        wallet_private_key: string;
        wallet_type: WalletType;
      }[];
      message: string;
      deeplink: string;
    },
    Error
  >("/wallet/get-wallets");
};
