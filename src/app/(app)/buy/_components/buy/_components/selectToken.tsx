"use client";
import EachUtils from "@/components/eachUtils";
import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useCart } from "@/store/cart";
import { useState } from "react";
import { gasTokens } from "@/store/cart";
export function SelectTokenList() {
  const [search, setSearch] = useState<string>("");
  const [tokens, setTokens] = useState<string[]>(gasTokens);
  useDebounce(
    () => {
      setTokens(
        gasTokens.filter((token) =>
          token.toLowerCase().includes(search.toLowerCase())
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

function SelectTokenButton({ token }: { token: string }) {
  const { setSelectedToken, selectedToken } = useCart((s) => s);
  return (
    <DrawerClose asChild>
      <Button
        disabled={selectedToken?.name === token}
        className="w-full"
        variant="ghost"
        onClick={() => {
          setSelectedToken(token);
        }}
      >
        {token}
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
