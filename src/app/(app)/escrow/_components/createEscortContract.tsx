"use client";
import { useWallet } from "@/store/wallet";
import { useShallow } from "zustand/shallow";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TokenAmountInput from "@/components/input/tokenAmountInput";
import TokenSelector from "@/components/input/tokenSelector";
import { Token } from "@/types/token";
import Address from "@/components/address";
import { parseUnits } from "ethers";
import { useRouter } from "next/navigation";
import { allowanceTokenContract, getTokenDecimals } from "@/lib/utils";

export default function CreateEscortContract() {
  const [signer, getFactory] = useWallet(
    useShallow((s) => [s.signer, s.escrowContractFactory])
  );
  if (!signer) return <></>;
  const factory = getFactory(signer);
  const [step, setStep] = useState(1);

  // Form states
  const [buyer, setBuyer] = useState("");
  const [token, setToken] = useState<Token | undefined>();
  const [price, setPrice] = useState("");
  const [sellerBond, setSellerBond] = useState("");
  const [buyerBond, setBuyerBond] = useState("");
  const [feePercent, setFeePercent] = useState("");
  const [loading, setLoading] = useState(false);
  const [finalReceived, setFinalReceived] = useState(0);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer) return;
    if (!factory) return;
    const seller = await signer?.getAddress();
    if (!seller) return;
    if (!token) return;
    setLoading(true);
    try {
      const allowanceContract = allowanceTokenContract(signer, token.address);
      const allowance = await allowanceContract.allowance(
        seller,
        factory.target
      );
      const decimals = await getTokenDecimals(token.address);
      const totalAmount = parseUnits(sellerBond, decimals);
      const approveAmount = (totalAmount * BigInt(11)) / BigInt(10);
      if (allowance <= totalAmount) {
        const approveTx = await allowanceContract.approve(
          factory.target,
          approveAmount
        );
        await approveTx.wait();
      }
      const toToken = async (amount: string) =>
        parseUnits(amount, await getTokenDecimals(token.address));
      const txF = async () =>
        await factory.createEscrow(
          buyer,
          seller,
          token.address,
          await toToken(price),
          await toToken(sellerBond),
          await toToken(buyerBond),
          parseUnits(feePercent, 2)
        );
      const tx = await txF();
      const receipt = await tx.wait();
      if (!receipt) throw new Error("Transaction failed or not confirmed.");
      const event = receipt.logs
        .map((log) => factory.interface.parseLog(log))
        .find((e) => e && e.name === "EscrowCreated");
      const escrowAddress = event?.args?.[2];
      router.push("escrow/" + escrowAddress);
      setStep(1);
    } catch (err) {
      console.log((err as Error).message);
      alert("Failed: " + (err as Error).message);
    }
    setLoading(false);
  };
  // Step 1: Buyer address & token
  if (step === 1) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!buyer || !token) return;
          setStep(2);
        }}
        className="flex flex-col gap-2"
      >
        <Input
          placeholder="Buyer Address: 0xZXC741aSd852qWe963"
          value={buyer}
          onChange={(e) => setBuyer(e.target.value)}
          required
        />
        <div>
          <TokenSelector value={token} onSelect={(t) => setToken(t)} />
        </div>
        <div className="flex gap-2 mt-4">
          <Button type="submit" disabled={!buyer || !token}>
            Next
          </Button>
        </div>
      </form>
    );
  }

  // Step 2: Amount, bond, fee
  if (step === 2) {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!token) return;
          if (!price || !sellerBond || !buyerBond || !feePercent) return;
          const decimal = await getTokenDecimals(token.address);
          const amount = (Number(price) / 100) * (100 - Number(feePercent));
          setFinalReceived(amount);
          setStep(3);
        }}
        className="flex flex-col gap-2"
      >
        <TokenAmountInput
          placeholder="Token Amount"
          value={price}
          onChange={setPrice}
        />
        <TokenAmountInput
          placeholder="Seller Bond"
          value={sellerBond}
          onChange={setSellerBond}
        />
        <TokenAmountInput
          placeholder="Buyer Bond"
          value={buyerBond}
          onChange={setBuyerBond}
        />
        <Input
          placeholder="Fee Percent"
          type="number"
          value={feePercent}
          onChange={(e) => setFeePercent(e.target.value)}
          required
        />
        <div className="flex gap-2 mt-4">
          <Button
            type="button"
            className="text-primary"
            variant="secondary"
            onClick={() => setStep(1)}
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={!price || !sellerBond || !buyerBond || !feePercent}
          >
            Next
          </Button>
        </div>
      </form>
    );
  }

  // Step 3: Review

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="border rounded p-4 mb-2">
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="font-semibold py-1 pr-2">Buyer</td>
              <Address address={buyer || "0xerrrrrr0orr"} />
            </tr>
            <tr>
              <td className="font-semibold py-1 pr-2">Token Address</td>
              <td>
                <Address address={token?.address || "0xerrrrrr0orr"} />
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-1 pr-2">Price</td>
              <td>
                {price} {token?.symbol}
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-1 pr-2">Seller Bond</td>
              <td>
                {sellerBond} {token?.symbol}
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-1 pr-2">Buyer Bond</td>
              <td>
                {buyerBond} {token?.symbol}
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-1 pr-2">Fee Percent</td>
              <td>{feePercent} %</td>
            </tr>
            <tr>
              <td className="font-semibold py-1 pr-2">Seller will recieve</td>
              <td>
                {finalReceived.toLocaleString("en-US", {
                  maximumFractionDigits: 6,
                })}{" "}
                {token?.symbol}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          className="text-primary"
          onClick={() => setStep(2)}
        >
          Back
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Escrow"}
        </Button>
      </div>
    </form>
  );
}
