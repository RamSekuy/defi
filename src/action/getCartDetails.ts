"use server";

import { getTokenDecimals } from "@/lib/utils";
import { SELECTED_NETWORK } from "@/smartContract/config";

export default async function getCartDetails(
  tokenAddress: string,
  money: number
) {
  try {
    const rate = await priceRate(tokenAddress);
    const fee =
      money < 5000
        ? money * 0.1
        : money >= 50000
        ? money * 0.05
        : money * 0.075;
    const totalToken = money / rate;
    console.log(fee);
    const decimals = await getTokenDecimals(tokenAddress);
    return { rate, fee, totalToken, decimals };
  } catch (error) {}
}

async function priceRate(tokenAddress: string): Promise<number> {
  const tokenF =
    "https://api.coingecko.com/api/v3/simple/token_price/polygon-pos";
  const polF =
    "https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token&vs_currencies=idr";
  const url =
    tokenAddress == "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904" &&
    SELECTED_NETWORK == "amoy"
      ? `${tokenF}?contract_addresses=0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39&vs_currencies=idr`
      : tokenAddress === "0x000000000"
      ? polF
      : `${tokenF}?contract_addresses=${tokenAddress}&vs_currencies=idr`;
  const response = await fetch(url, {
    headers: {
      "x-cg-api-key": process.env.COINGECKO_APIKEY || "-",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    console.log(`Coingecko error: ${response.status} ${response.statusText}`);
    throw new Error(
      `Coingecko error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  console.log(data);
  return tokenAddress === "0x000000000"
    ? data["polygon-ecosystem-token"].idr
    : tokenAddress == "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904" &&
      SELECTED_NETWORK == "amoy"
    ? data["0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39"].idr
    : data[tokenAddress].idr;
}
