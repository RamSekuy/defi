import { isAddress } from "ethers";
import mysql from "mysql2/promise";
import z from "zod";

type PaymentDetails = {
  invoice: `INV-${string}`;
  link: string;
  createdAt: Date;
  tx: null | string;
};

const db = mysql.createPool({
  host: process.env.FILESS_HOST as string,
  user: process.env.FILESS_USER as string,
  database: process.env.FILESS_DB as string,
  password: process.env.FILESS_PW as string,
  port: Number(process.env.FILESS_PORT),
  waitForConnections: true,
});

const schema = z.object({
  invoice: z
    .string()
    .startsWith("INV-")
    .max(("INV-" + Number(new Date())).length),
  link: z.string().includes("midtrans.com/payment-links/"),
});
export async function savePayment(invoice: string, link: string) {
  const input = schema.parse({ invoice, link });
  await db.query(`
    INSERT INTO buyTokenPayment (invoice, link)
    VALUES ('${input.invoice}', '${input.link}');
    `);
}

export async function sendingTokenTransactionUpdate(
  tx: string,
  invoice: string
) {
  console.log("UPDATING DATA FROM MIDTRANS");
  const isTx = isAddress(tx);
  if (!isTx) throw new Error("invalid transaction");
  await db.query(
    `
    UPDATE buyTokenPayment
    SET tx = '${tx}'
    WHERE invoice = '${invoice}'
    `
  );
}

export async function getPayments() {
  const [rows] = await db.query(
    `
    SELECT * FROM buyTokenPayment
    LIMIT 100
    `
  );

  return rows as PaymentDetails[];
}

export async function getPaymentByInvoice(invoice: string) {
  const [rows] = await db.query(
    `
    SELECT * FROM buyTokenPayment
    WHERE invoice = '${invoice}'
    LIMIT 100
    `
  );

  return Array.isArray(rows) && rows.length > 0
    ? (rows[0] as PaymentDetails)
    : null;
}
