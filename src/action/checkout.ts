"use server";
import { createPaymentLink } from "@/lib/midtrans";
import addressSchema from "@/lib/zod/address.schema";
import { AxiosError } from "axios";

export default async function checkout(
  amount: number,
  item: { name: string; amount: number },
  _address: string
) {
  try {
    const address = addressSchema.parse(_address);
    const invoice = `INV-${Number(new Date())}`;
    const res = await createPaymentLink({
      transaction_details: {
        gross_amount: amount,
        order_id: invoice,
      },
      custtomer_details: { first_name: address },
      item_details: [
        {
          name: item.name + "-" + item.amount,
          price: amount,
          quantity: 1,
        },
        {
          name: address,
          price: 0,
          quantity: 1,
        },
      ],
    });
    return { data: res };
  } catch (e) {
    if (e instanceof AxiosError) console.log(e.response?.data);
    if (e instanceof Error) console.log(e.message);
    return { error: e as Error };
  }
}
