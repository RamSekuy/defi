import WalletProvider from "@/components/provider/walletProvider";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <WalletProvider>{children}</WalletProvider>;
}
