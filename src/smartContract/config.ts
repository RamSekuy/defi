import { ethers, Signer } from "ethers";
import escrowF_ABI from "@abi/escrowFactory.abi.json";
import bondedEscrow_ABI from "@abi/bondedEscrow.abi.json";

import { NetworkRPC } from "@/types/NetworkRPC";
import { Token } from "@/types/token";
import { BondedEscrow, EscrowFactory } from "@/types";

const amoy: NetworkRPC = {
  name: "Amoy",
  rpc: "https://polygon-amoy.g.alchemy.com/v2/" + process.env.ALCHEMY_KEY,
  chainID: "0x13882",
  blockExplorer: "https://amoy.polygonscan.com/",
  tokens: [
    new Token("Link", "LINK", "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904"),
  ],
};

const polygon: NetworkRPC = {
  name: "Polygon",
  rpc: "https://polygon-mainnet.g.alchemy.com/v2/" + process.env.ALCHEMY_KEY,
  blockExplorer: "https://polygonscan.com/",
  chainID: "0x89",
  tokens: [
    new Token(
      "TetherUSD",
      "USDT",
      "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
    ),
  ],
};

const networks = { polygon, amoy };

export const SELECTED_NETWORK = process.env
  .NEXT_PUBLIC_SELECTED_NETWORK as keyof typeof networks;
const config = networks[SELECTED_NETWORK];
export default config;

const escrowFactoryAddresses = {
  polygon: "0xd2d701cA094bDbCCfF36E49d7A25656854D3B7E4",
  amoy: "0xE28aE028dbf2777bdC8b9B2d40063597E36B6Dd4",
};
export const escrowFactoryAddress = escrowFactoryAddresses[SELECTED_NETWORK];
const escrowRPC = networks[SELECTED_NETWORK].rpc;
const provider = new ethers.JsonRpcProvider(escrowRPC);

export const escrowFactoryConnect = (s: Signer) =>
  new ethers.Contract(
    escrowFactoryAddress,
    escrowF_ABI,
    s
  ) as unknown as EscrowFactory;

export const escrowContract = (s: Signer, address: string) => {
  return new ethers.Contract(
    address,
    bondedEscrow_ABI,
    s
  ) as unknown as BondedEscrow;
};

export const escrowFactoryReadOnly = () => {
  return new ethers.Contract(
    escrowFactoryAddress,
    escrowF_ABI,
    provider
  ) as unknown as EscrowFactory;
};

export const escrowContractReadOnly = (address: string) => {
  return new ethers.Contract(
    address,
    bondedEscrow_ABI,
    provider
  ) as unknown as BondedEscrow;
};
