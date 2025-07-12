import axios from "axios";
import { savePayment } from "./mysql2";

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "";
const MIDTRANS_BASE = "https://api.sandbox.midtrans.com/";

export interface CreatePaymentLinkRequest {
  transaction_details: {
    order_id: string;
    gross_amount: number;
    payment_link_id?: string;
  };
  item_details: {
    name: string;
    price: number;
    quantity: number;
  }[];
  custtomer_details: any;
}

export interface CreatePaymentLinkResponse {
  payment_url: string;
  order_id: string;
}

const authString = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString("base64");
export const axiosMidtrans = axios.create({
  baseURL: MIDTRANS_BASE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${authString}`,
  },
});

export async function createPaymentLink(_payload: CreatePaymentLinkRequest) {
  const payload = {
    customer_required: true,
    usage_limit: 1,
    callbacks: {
      finish:
        process.env.NEXT_PUBLIC_BASEURL +
        _payload.transaction_details.order_id.toUpperCase(),
    },

    ..._payload,
  };
  const { data } = await axiosMidtrans.post<CreatePaymentLinkResponse>(
    `/v1/payment-links`,
    payload
  );
  await savePayment(data.order_id, data.payment_url);
  return data;
}

export async function getHistory() {
  return await axiosMidtrans("/transaction-history-list");
}
export function convertStatus(status: string): string {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "Awaiting Payment";
    case "SETTLEMENT":
      return "Payment Successful";
    case "CANCEL":
      return "Cancelled";
    case "DENY":
      return "Denied";
    case "EXPIRE":
      return "Expired";
    case "FAILURE":
      return "Failed";
    case "REFUND":
      return "Refunded";
    case "CHARGEBACK":
      return "Chargeback / Dispute";
    default:
      return "Unknown Status";
  }
}
