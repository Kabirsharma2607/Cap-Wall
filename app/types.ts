export type SignupError = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type LoginError = {
  username: string;
  password: string;
};

export enum WalletType {
  SOL = "SOL",
  BTC = "BTC",
  ETH = "ETH",
  PALO = "PALO",
}

export type Wallet = {
  walletType: "SOL" | "ETH" | "PALO" | "BTC";
};
