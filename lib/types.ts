import { WalletType } from "@kabir.26/uniwall-commons";

export type DashboardResponseSchema = {
  success: boolean;
  data: DashboardWalletDetailsSchema;
  message: string;
};

export type WalletDetailsSchema = {
  walletType: WalletType;
  isEnabled: boolean;
  balance: string | null;
};

export type ActionItemSchema = {
  actionItemType: "SEND" | "RECEIVE" | "SWAP" | "BUY";
  isEnabled: boolean;
};

export type DashboardWalletDetailsSchema = {
  username: string;
  walletDetails: WalletDetailsSchema[];
  actionItems: ActionItemSchema[];
};

export type Wallet = {
  walletType: WalletType;
  walletPublicAddress: string;
  walletPrivateKey: string;
};

export type WalletBalanceType = {
  walletType: WalletType;
  balance: string;
};

export type WalletQrType = {
  walletAddress: string;
  walletType: WalletType;
  qrCodeUrl: string;
};

export type CurrencyRate = {
  walletType: WalletType;
  balance: string;
  walletAddress: string;
};
