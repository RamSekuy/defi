import { ethers } from "ethers";
import coinGeckoTokens from "@/../public/coingeckoTokens.json";
export function devWallet(_name: string) {
  const token = coinGeckoTokens.find(({ name }) => name === name);
  if (!token) throw new Error("invalid token");
  const rpc =
    token.rpc + token.name.includes("testnet") ? process.env.ALCHEMY_KEY : "";
  const PRIVATE_KEY = process.env.WALLET_KEY as string;
  const provider = new ethers.JsonRpcProvider(token.rpc);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  // 3. Tes alamat
  console.log("Address:", wallet.address);
  return wallet;
}
