import { create } from "zustand";
import checkout from "@/action/checkout";
import { toast } from "sonner";
import coinGeckoTokens from "@/../public/coingeckoTokens.json";
import addressSchema from "@/lib/zod/address.schema";
import { ZodError } from "zod";
import { CreatePaymentLinkResponse } from "@/lib/midtrans";

export const gasTokens = coinGeckoTokens.map(({ name }) => name);

type Token = (typeof coinGeckoTokens)[number];

interface CartState {
  selectedToken?: Token;
  money?: number;
  address?: string;
  setAddress: (address: string) => void;
  setSelectedToken: (token: string) => void;
  setmoney: (money: number) => void;
  checkout: (
    tokenAmount: number,
    successCallback?: (data: CreatePaymentLinkResponse) => void
  ) => string;
}

export const useCart = create<CartState>((set) => ({
  setAddress: (address: string) => set({ address }),
  setSelectedToken: (token: string) => {
    const t = coinGeckoTokens.find((e) => e.name === token);
    if (t) set((s) => ({ ...s, selectedToken: t }));
  },
  setmoney: (money: number) => set({ money }),
  checkout: (amount, successCallback) => {
    let url: string | undefined;
    try {
      let item: string | undefined;
      let money: number | undefined;
      let _address: string | undefined;
      set((s) => {
        _address = s.address;
        item = s.selectedToken?.name;
        money = s.money;
        return s;
      });
      const address = addressSchema.parse(_address);
      if (!item) throw new Error("Please Select Token");
      if (!money) throw new Error("minimum transaction 2000");
      const errorMSG = {
        message: "something went wrong!",
        style: { backgroundColor: "red", color: "white" },
      };
      const act = async (money: number, name: string, address: string) => {
        const res = checkout(money, { name, amount }, address);
        if (!res) throw new Error("Something went wrong!");
        return res;
      };
      toast.promise(act(money, item, address), {
        loading: "generating payment link...",
        success: ({ error, data }) => {
          if (error) return error.message;
          successCallback?.(data);
          return "Success: " + data.order_id;
        },
        error: errorMSG,
      });
    } catch (e) {
      if (e instanceof ZodError)
        toast.error(e.issues[0].message + " " + e.issues[0].path);
      else if (e instanceof Error) toast.error(e.message);
    }
    return url || "ERROR";
  },
}));
