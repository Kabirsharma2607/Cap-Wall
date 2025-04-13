// lib/fetcher.ts
"use server";
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1";

const fetcher = async (url: string) => {
  const res = await fetch(`${BASE_URL}${url}`);
  console.log(res);
  if (!res.ok) {
    const error = new Error("Error fetching data");
    (error as any).info = await res.json();
    (error as any).status = res.status;
    throw error;
  }
  return res.json();
};

export default fetcher;
