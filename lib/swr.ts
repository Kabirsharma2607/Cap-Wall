import useSWR from "swr";

export const useRecoveryPhrase = (username: string) => {
  // Only fetch if username is not empty
  return useSWR<any, Error>(
    username ? `/auth/words-secret/${username}` : null
  );
};


export const useElegibleWallets = () => {
  console.log("calling get eligble")
  return useSWR<any, Error>(
    "/wallet/get-eligible-wallets"
  )
}