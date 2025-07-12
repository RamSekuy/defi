"use client";
import { Input } from "@/components/ui/input";
import { useCart } from "@/store/cart";
import { useShallow } from "zustand/shallow";

export default function InputWallet() {
  const [address, setAddress] = useCart(
    useShallow((s) => [s.address, s.setAddress])
  );
  return (
    <Input
      defaultValue={address}
      placeholder="Wallet Address ( 0xZxC741aSD852QWE963 )"
      onChange={(e) => setAddress(e.target.value)}
    />
  );
}
