import useSWR from "swr";

export const useRecoveryPhrase = () => {
  return useSWR<any, Error>("/auth/words-secret/some");
};
