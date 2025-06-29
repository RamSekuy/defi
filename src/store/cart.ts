import { Token } from "@/types/token";
import { create } from "zustand";

interface CartState {
  selectedToken?: Token;
  money?: number;
  setSelectedToken: (token: Token) => void;
  setmoney: (money: number) => void;
}

export const useCart = create<CartState>((set) => ({
  setSelectedToken: (token: Token) => set({ selectedToken: token }),
  setmoney: (money: number) => set({ money }),
}));
