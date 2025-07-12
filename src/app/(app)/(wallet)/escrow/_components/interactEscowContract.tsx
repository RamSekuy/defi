"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";

export default function InteractEscowContract() {
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;
    router.push(`escrow/${address}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
      <CardTitle>Enter Escort Contract Address</CardTitle>
      <Input
        placeholder="0xZXc741aSd852Qwe963"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <Button className="w-full" type="submit">
        Go
      </Button>
    </form>
  );
}
