"use client";
import EachUtils from "@/components/eachUtils";
import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import config from "@/smartContract/config";
import { useCart } from "@/store/cart";
import { Token } from "@/types/token";
import { useState } from "react";

const tokenList: Token[] = [
  { address: "0x000000000", name: "Polygon", symbol: "POL" },
  ...config.tokens,
];
export function SelectTokenList() {
  const [search, setSearch] = useState<string>("");
  const [tokens, setTokens] = useState<Token[]>(tokenList);
  useDebounce(
    () => {
      setTokens(
        tokenList.filter((token) =>
          token.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    },
    [search],
    500
  );
  return (
    <>
      <Input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="overflow-y-auto h-[calc(100dvh-6rem)]">
        <EachUtils
          of={tokens}
          render={(t) => <SelectTokenButton token={t} />}
        />
      </div>
    </>
  );
}

function SelectTokenButton({ token }: { token: Token }) {
  const { setSelectedToken, selectedToken } = useCart((s) => s);
  return (
    <DrawerClose asChild>
      <Button
        disabled={selectedToken === token}
        className="w-full"
        variant="ghost"
        onClick={() => {
          setSelectedToken(token);
        }}
      >
        {`${token.name} (${token.symbol})`}
      </Button>
    </DrawerClose>
  );
}

export function SelectTokenTrigger() {
  const selectedToken = useCart((s) => s.selectedToken);
  return (
    <Button className="w-full" variant="outline">
      {selectedToken?.name || "Select Token"}
    </Button>
  );
}
