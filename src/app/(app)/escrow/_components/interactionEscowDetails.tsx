"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/store/wallet";
import { ethers } from "ethers";
import bondedEscrowAbi from "@/smartContract/abi/bondedEscrow.abi.json";
import { useRouter } from "next/navigation";
import { escrowContract } from "@/smartContract/config";

type Props = {
  address: string;
  details: EscrowDetails;
  decimal?: number;
};

type EscrowDetails = {
  buyer: string;
  seller: string;
  token: string;
  price: string;
  sellerBond: string;
  buyerBond: string;
  feePercent: string;
  isReleased: boolean;
  isPaid: boolean;
};

export default function InteractionEscowDetails({
  address,
  details,
  decimal = 18,
}: Props) {
  const signer = useWallet((s) => s.signer);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const contract = useMemo(
    () => (!signer ? null : escrowContract(signer, address)),
    [signer]
  );

  // Handler untuk cancel
  const handleCancel = async () => {
    if (!signer) return alert("Wallet not connected");
    if (!contract) return alert("Contract not connected");
    setLoading(true);
    try {
      const tx = await contract.cancelEscrow();
      await tx.wait();
      alert("Escrow canceled!");
      router.refresh();
    } catch (err: any) {
      alert(err?.reason || err?.message || "Cancel gagal");
    }
    setLoading(false);
  };

  // Handler untuk bayar
  const handlePay = async () => {
    if (!signer) return alert("Wallet not connected");
    if (!contract) return alert("Contract not connected");
    setLoading(true);
    try {
      const tokenContract = new ethers.Contract(
        details.token,
        [
          "function allowance(address owner, address spender) view returns (uint256)",
          "function approve(address spender, uint256 amount) returns (bool)",
        ],
        signer
      );
      const owner = await signer.getAddress();
      const amount =
        ethers.parseUnits(details.price, decimal) +
        ethers.parseUnits(details.buyerBond, decimal);
      const allowance = await tokenContract.allowance(owner, address);

      // Allowance dilebihkan 10%
      const approveAmount = amount + amount / BigInt(10);

      if (allowance <= amount) {
        const approveTx = await tokenContract.approve(address, approveAmount);
        await approveTx.wait();
      }

      const tx = await contract.buyerPay();
      await tx.wait();
      alert("Success !");
      router.refresh();
    } catch (err: any) {
      alert(err?.reason || err?.message || "Transaksi gagal");
    }
    setLoading(false);
  };

  const handleComplete = async () => {
    if (!signer) return alert("Wallet not connected");
    setLoading(true);
    try {
      const contract = new ethers.Contract(address, bondedEscrowAbi, signer);
      const tx = await contract.confirmReceived();
      await tx.wait();
      alert("Escrow completed!");
      router.refresh();
    } catch (err: any) {
      alert(err?.reason || err?.message || "Complete gagal");
    }
    setLoading(false);
  };

  const showPayButton = !details.isPaid;
  const showCancelButton = !details.isPaid;
  const showCompleteButton = details.isPaid && !details.isReleased;

  return (
    <Card className="w-full max-w-lg mx-auto p-6">
      <CardTitle className="mb-4">Escrow Contract Details</CardTitle>
      <table className="w-full text-sm">
        <tbody>
          <DetailRow label="Buyer" value={details.buyer} mono />
          <DetailRow label="Seller" value={details.seller} mono />
          <DetailRow label="Token" value={details.token} mono />
          <DetailRow label="Price" value={details.price} />
          <DetailRow label="Seller Bond" value={details.sellerBond} />
          <DetailRow label="Buyer Bond" value={details.buyerBond} />
          <DetailRow
            label="Fee Percent"
            value={details.feePercent ? `${details.feePercent} %` : undefined}
          />
          <DetailRow label="Paid" value={details.isPaid ? "Yes" : "No"} />
          <DetailRow
            label="Completed"
            value={details.isReleased ? "Yes" : "No"}
          />
        </tbody>
      </table>
      {showPayButton && (
        <Button className="mt-6 w-full" onClick={handlePay} disabled={loading}>
          {loading ? "Processing..." : "PAY"}
        </Button>
      )}
      {showCancelButton && (
        <Button
          className="mt-2 w-full"
          variant="destructive"
          onClick={handleCancel}
          disabled={loading}
        >
          {loading ? "Processing..." : "Cancel Escrow"}
        </Button>
      )}
      {showCompleteButton && (
        <Button
          className="mt-2 w-full"
          onClick={handleComplete}
          disabled={loading}
        >
          {loading ? "Processing..." : "Finsish Escrow"}
        </Button>
      )}
    </Card>
  );
}
function DetailRow({
  label,
  value,
  mono,
}: {
  label: string;
  value?: string;
  mono?: boolean;
}) {
  return (
    <tr>
      <td className="font-semibold py-1 pr-2">{label}</td>
      <td className={mono ? "font-mono" : undefined}>{value}</td>
    </tr>
  );
}
