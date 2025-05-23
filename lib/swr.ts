import { WalletType } from "@/app/types";
import useSWR from "swr";
import {
  CurrencyRate,
  DashboardResponseSchema,
  WalletBalanceType,
  WalletQrType,
} from "./types";

export const useRecoveryPhrase = (username: string) => {
  // Only fetch if username is not empty
  return useSWR<
    {
      success: boolean;
      data: string[];
      message: string;
    },
    Error
  >(username ? `/auth/words-secret/${username}` : null);
};

export const useElegibleWallets = () => {
  return useSWR<
    {
      success: boolean;
      data: WalletType[];
      message: string;
    },
    Error
  >("/wallet/get-eligible-wallets");
};

export const useWallets = () => {
  // Only fetch if username is not empty
  return useSWR<
    {
      success: boolean;
      data: {
        walletPublicAddress: string;
        walletPrivateKey: string;
        walletType: WalletType;
      }[];
      message: string;
      deeplink: string;
    },
    Error
  >("/wallet/get-wallets");
};

export const useDashboardData = () => {
  return useSWR<DashboardResponseSchema, Error>("/dashboard");
};

export const useUserWalletsWithBalances = () => {
  return useSWR<
    {
      success: boolean;
      message: string;
      balances: WalletBalanceType[];
    },
    Error
  >("/wallet/get-wallets-with-balance");
};

export const useReceiveData = () => {
  return useSWR<
    {
      success: boolean;
      message: string;
      wallets: WalletQrType[];
    },
    Error
  >("/wallet/receive-coins");
};

export const useConversionRates = () => {
  return useSWR<
    {
      success: boolean;
      message: string;
      balances: CurrencyRate[];
    },
    Error
  >("/wallet/get-conversion-rates");
};
