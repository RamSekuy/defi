"use client";

import { useWallet } from "@/store/wallet";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useShallow } from "zustand/shallow";

export default function WalletProvider({ children }: { children: ReactNode }) {
  const { signer, connect } = useWallet(
    useShallow(({ connect, signer }) => ({ connect, signer }))
  );
  const router = useRouter();
  useEffect(() => {
    if (!signer) connect().then(() => router.refresh());
  }, [signer]);

  return !signer ? (
    <div className="h-dvh flex items-center justify-center flex-col">
      <h1>Connecting to Wallet</h1>
      <Loader2 className="animate-spin" size={64} />
    </div>
  ) : (
    children
  );
}
