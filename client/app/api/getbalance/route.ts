import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const walletAddress = searchParams.get("walletAddress");

  if (!walletAddress) {
    return NextResponse.json(
      {
        message: "No wallet address provided.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // Fetch balance from Solana API
    const response = await axios.post("https://api.devnet.solana.com", {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [walletAddress],
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch balance");
    }

    const { data } = response;
    // Wrong
    if (data.result && data.result.value !== undefined) {
      const balance = data.result.value; // Balance in lamports
      return NextResponse.json({
        message: "Transaction successful!",
        balance,
      });
    }

    return NextResponse.json(
      {
        message: "Transaction failed. Balance not found.",
      },
      {
        status: 400,
      }
    );
  } catch (error) {
    //console.error("Error fetching balance:", error);
    return NextResponse.json(
      {
        message: "Transaction failed. Please try again.",
      },
      {
        status: 400,
      }
    );
  }
}
