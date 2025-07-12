import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { devWallet } from "@/lib/ethers";
import { sendingTokenTransactionUpdate } from "@/lib/mysql2";

interface MidtransNotification {
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  payment_type: string;
  order_id: string;
  merchant_id: string;
  masked_card?: string;
  gross_amount: string;
  fraud_status?: string;
  eci?: string;
  currency: string;
  channel_response_message?: string;
  channel_response_code?: string;
  card_type?: string;
  bank?: string;
  approval_code?: string;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as MidtransNotification;
  const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "";
  const rawSignature = `${body.order_id}${body.status_code}${body.gross_amount}${MIDTRANS_SERVER_KEY}`;
  const expectedSignature = crypto
    .createHash("sha512")
    .update(rawSignature)
    .digest("hex");

  if (expectedSignature !== body.signature_key) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  const isComplete = body.transaction_status == "settlement";

  if (isComplete) {
    const a = devWallet("POL (amoy testnet)").address;
    sendingTokenTransactionUpdate(a, body.order_id);
  }

  return NextResponse.json({ message: "Notification handled successfully" });
}
