import useSWR from "swr";

export const useRecoveryPhrase = (username : string) => {
  return useSWR<any, Error>(`/auth/words-secret/${username}`);
};
