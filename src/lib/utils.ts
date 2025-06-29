import { clsx, type ClassValue } from "clsx";
import { ethers, Signer } from "ethers";
import { twMerge } from "tailwind-merge";
import ERC20 from "@abi/ERC20.abi.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getTokenDecimals(
  tokenAddress: string,
  provider?: ethers.Provider
) {
  try {
    const _provider = provider;
    const contract = new ethers.Contract(tokenAddress, ERC20, _provider);
    const decimals = await contract.decimals();
    return Number(decimals);
  } catch {
    return 18;
  }
}

export function allowanceTokenContract(s: Signer, address: string) {
  return new ethers.Contract(
    address,
    [
      "function allowance(address owner, address spender) view returns (uint256)",
      "function approve(address spender, uint256 amount) returns (bool)",
    ],
    s
  );
}
