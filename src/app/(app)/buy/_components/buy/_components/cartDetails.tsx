"use client";
import getCartDetails from "@/action/getCartDetails";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import useDebounce from "@/hooks/useDebounce";
import { useCart } from "@/store/cart";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Details = {
  rate: number;
  fee: number;
  totalToken: number;
  decimals: number;
};

export default function CartDetails() {
  const { selectedToken, money, checkout } = useCart((state) => state);
  const [details, setDetails] = useState<Details | undefined>();
  const [pending, setPending] = useState(false);
  useDebounce(
    () => {
      if (!selectedToken || !money) setDetails(undefined);
      else {
        if (money < 2000)
          return toast.warning("Minimum transaction is Rp.2000");
        setPending(true);
        getCartDetails(selectedToken.id, money)
          .then(({ data }) => {
            setDetails(data);
            if (!data) toast.warning("something went wrong");
          })
          .catch(() => setDetails(undefined))
          .finally(() => setPending(false));
      }
    },
    [selectedToken, money],
    750
  );

  if (pending)
    return (
      <Card>
        <CardContent className="flex justify-center items-center min-h-[120px]">
          <Loader2 size={40} className="animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );

  if (!details || !selectedToken) return <></>;

  const decimals = 8;

  const totalToken = details.totalToken.toFixed(decimals);
  const tokenFee = (details.fee / details.rate).toFixed(decimals);
  const recived = (Number(totalToken) - Number(tokenFee)).toFixed(decimals);
  const rate = details.rate.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const idrFee = details.fee.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
  const router = useRouter();
  return (
    <>
      <Card>
        <CardContent className="px-4">
          <CardTitle className="mb-6 text-center">Details</CardTitle>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <th className="text-left font-medium w-1/3 py-1">Rate</th>
                <td>{rate} / token</td>
              </tr>
              <tr>
                <th className="text-left font-medium py-1">Total Token</th>
                <td>
                  {totalToken} {selectedToken?.symbol}
                </td>
              </tr>
              <tr>
                <th className="text-left font-medium py-1">Fee</th>
                <td>
                  {tokenFee} {selectedToken?.symbol}{" "}
                  <span className="text-muted-foreground">({idrFee})</span>
                </td>
              </tr>
              <tr>
                <th className="text-left font-medium py-1">Receive Token</th>
                <td>
                  {recived} {selectedToken?.symbol}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
      <Button
        variant="default"
        className="mt-8"
        onClick={() =>
          checkout(Number(recived), ({ payment_url }) => {
            router.push(payment_url);
          })
        }
      >
        Buy
      </Button>
    </>
  );
}
