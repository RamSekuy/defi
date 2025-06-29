"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useWallet } from "@/store/wallet";
import { useShallow } from "zustand/shallow";
import { useState } from "react";
import { Loader2 } from "lucide-react";
export default function ConnectWalletButton() {
  const [connect, signer] = useWallet(useShallow((s) => [s.connect, s.signer]));
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  return (
    <Button
      className="cursor-pointer"
      onClick={() => {
        if (!signer) {
          setLoading(true);
          connect().finally(() => setLoading(false));
          return;
        } else router.refresh();
      }}
    >
      {isLoading ? <Loader2 /> : "Connect Wallet"}
    </Button>
  );
}
