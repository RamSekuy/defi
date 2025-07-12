// app/payment-link/[inv]/page.tsx
import revalidate from "@/action/revalidate";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { axiosMidtrans, convertStatus } from "@/lib/midtrans";
import { getPaymentByInvoice } from "@/lib/mysql2";
import Link from "next/link";

type Props = {
  params: Promise<{ inv: string }>;
};

export default async function PaymentLinkPage({ params }: Props) {
  const { inv } = await params;

  const { data } = await axiosMidtrans(`/v1/payment-links/${inv}`);

  const {
    order_id,
    payment_link_url,
    gross_amount,
    last_snap_transaction_status,
  } = data as { [k: string]: string };
  const { item_details } = data;
  console.log(data);
  const db = await getPaymentByInvoice(order_id);
  return (
    <div className="flex justify-center items-center w-full">
      <Card className="my-4 h-max w-full max-w-lg">
        <CardContent>
          <CardTitle className="text-center mb-4">
            Transaction Details
          </CardTitle>
          <CardDescription className="text-white">
            <p>Order ID: {order_id}</p>
            <p>Item: {item_details[0]?.name}</p>
            <p>
              Price:{" "}
              {Number(gross_amount).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p>Status: {convertStatus(last_snap_transaction_status)}</p>
            {}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <form action={revalidate}>
            <input type="text" hidden name="path" value={`/${inv}`} />
            <Button type="submit">🔄 Update Status</Button>
          </form>
          {last_snap_transaction_status == "PENDING" && (
            <Link href={payment_link_url} target="_blank">
              <Button>Pay</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
