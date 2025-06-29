"use client";
import IntInput from "@/components/input/intInput";
import { useCart } from "@/store/cart";

export default function MoneyInput() {
  const setMoney = useCart((s) => s.setmoney);
  return <IntInput onChange={(s) => setMoney(s)} />;
}
