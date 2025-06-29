import { create } from "zustand";
import { BrowserProvider, ethers, Signer } from "ethers";
import config, {
  escrowContract as ecs,
  escrowFactoryConnect,
} from "@/smartContract/config";
import { BondedEscrow, EscrowFactory } from "@/types";

interface WalletState {
  provider?: BrowserProvider;
  signer?: Signer;
  connect: () => Promise<Signer | undefined>;
  escrowContractFactory: (s: Signer) => EscrowFactory | undefined;
  escrowContract: (s: Signer, address: string) => BondedEscrow | undefined;
  switch: () => Promise<void>;
}

export const useWallet = create<WalletState>((set) => ({
  provider: undefined,
  signer: undefined,
  escrowContractFactory: (s: Signer) =>
    s ? escrowFactoryConnect(s) : undefined,
  escrowContract: (s: Signer, address: string) =>
    s ? ecs(s, address) : undefined,
  connect: async () => {
    if (window.ethereum == null) {
      set({
        provider: ethers.getDefaultProvider() as BrowserProvider,
        signer: undefined,
      });
      return undefined;
    } else {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      await useWallet.getState().switch();
      set({
        provider,
        signer,
      });
      return signer;
    }
  },
  switch: async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: config.chainID }],
      });
    } catch (err) {
      throw err;
    }
  },
}));
