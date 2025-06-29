import React from "react";

type Props = {
  address: string;
};

export default function Address({ address }: Props) {
  const short = (addr: string) =>
    addr.length > 10 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
  };

  return (
    <div
      className="font-mono px-2 py-1 rounded transition"
      title="Click to copy"
      onClick={handleCopy}
    >
      {short(address)}
    </div>
  );
}
