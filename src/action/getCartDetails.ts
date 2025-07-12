"use server";

import { getTokenDecimals } from "@/lib/utils";
import axios from "axios";

export default async function getCartDetails(
  tokenAddress: string,
  money: number
) {
  try {
    console.log("getting data...");
    const rate = await priceRate(tokenAddress);
    const fee = money * 0.05 + 1000;
    console.log(fee);
    const totalToken = money / rate;
    const decimals = await getTokenDecimals(tokenAddress);
    return { data: { rate, fee, totalToken, decimals } };
  } catch (error) {
    return { error };
  }
}

async function priceRate(id: string) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=idr`;
  const res = await axios.get(url, {
    headers: {
      accept: "application/json",
      "x-cg-api-key": process.env.COINGECKO_APIKEY as string,
    },
  });
  console.log(res.data);
  return res.data[id]["idr"] as number;
}
