export type LoginForm = {
  username: string;
  password: string;
};

export type SignupForm = {
  username: string;
  password: string;
  confirmPassword: string;
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
