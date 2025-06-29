"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Token } from "@/types/token";
import config from "@/smartContract/config";

const TOKENS: Token[] = config.tokens;

export default function TokenSelector({
  onSelect,
  value,
}: {
  onSelect?: (token: Token) => void;
  value?: Token;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Token | undefined>(value);

  const filtered = TOKENS.filter(
    (t) =>
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (token: Token) => {
    onSelect?.(token);
    setSelected(token);
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-2 text-center">
        Select Token {selected && ": " + selected.symbol}
      </h2>
      <Input
        placeholder="Search token name, symbol, or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2"
        autoFocus
      />
      <div className="flex-col gap-2 flex max-h-80 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground">
            No tokens found
          </div>
        )}
        {filtered.map((token) => (
          <Button
            key={token.address}
            variant="outline"
            disabled={selected?.address == token.address}
            className={`w-full flex justify-between`}
            onClick={(e) => {
              e.preventDefault();
              handleSelect(token);
            }}
          >
            <span>{token.symbol}</span>
            <span className="text-muted-foreground">{token.name}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
